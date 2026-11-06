-- Integrate Tap: NFC review plates (see spec/tap-plates.md).
--
-- Access model: only the Next.js server talks to these tables, using the
-- service role key. RLS is on with no policies, and anon/authenticated have
-- no grants, so the publishable key can't read or write anything here.

/* ---------------------------------------------------------------- tables -- */

create table public.tap_businesses (
  id text primary key,
  slug text not null unique,
  name text not null,
  tagline text not null default '',
  -- The app lowercases emails before storing and looking them up.
  email text not null unique check (email = lower(email)),
  password_hash text not null,
  contact_name text not null default '',
  phone text not null default '',
  marketing_consent boolean not null default false,
  consent_at timestamptz,
  logo text,
  mode text not null default 'page' check (mode in ('page', 'redirect')),
  redirect_link_id text,
  links jsonb not null default '[]'::jsonb check (jsonb_typeof(links) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tap_plates (
  code text primary key,
  setup_code text not null,
  status text not null default 'unencoded'
    check (status in ('unencoded', 'ready', 'claimed', 'disabled')),
  batch text not null,
  business_id text references public.tap_businesses (id) on delete set null,
  label text not null default '',
  serial text unique,
  locked boolean not null default false,
  encoded_at timestamptz,
  claimed_at timestamptz,
  taps integer not null default 0,
  last_tap_at timestamptz,
  daily_taps jsonb not null default '{}'::jsonb check (jsonb_typeof(daily_taps) = 'object'),
  failed_claims integer not null default 0,
  created_at timestamptz not null default now()
);

-- Dashboard lists a business's plates; the FK also needs an index.
create index tap_plates_business_id_idx on public.tap_plates (business_id);
-- Admin filters and the encoder queue filter by batch and status.
create index tap_plates_batch_status_idx on public.tap_plates (batch, status);
create index tap_plates_status_idx on public.tap_plates (status);

/* ------------------------------------------------------------ updated_at -- */

create function public.tap_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger tap_businesses_set_updated_at
  before update on public.tap_businesses
  for each row execute function public.tap_set_updated_at();

/* ------------------------------------------------------------------ RPCs -- */

-- Atomic tap counter. Matches the file store: bump the total, stamp
-- last_tap_at, bump today's count (UTC date) and keep only the last 90 days.
create function public.tap_record(p_code text)
returns void
language sql
security invoker
set search_path = ''
as $$
  update public.tap_plates p
     set taps = p.taps + 1,
         last_tap_at = now(),
         daily_taps = (
           select coalesce(jsonb_object_agg(d.key, d.value), '{}'::jsonb)
             from jsonb_each(
                    p.daily_taps || jsonb_build_object(
                      to_char(now() at time zone 'utc', 'YYYY-MM-DD'),
                      coalesce((p.daily_taps ->> to_char(now() at time zone 'utc', 'YYYY-MM-DD'))::int, 0) + 1
                    )
                  ) d
            where d.key >= to_char((now() at time zone 'utc') - interval '90 days', 'YYYY-MM-DD')
         )
   where p.code = p_code;
$$;

-- Atomic wrong-setup-code counter, so parallel guesses can't undercount.
-- Returns the new count (null if the plate doesn't exist).
create function public.tap_fail_claim(p_code text)
returns integer
language sql
security invoker
set search_path = ''
as $$
  update public.tap_plates
     set failed_claims = failed_claims + 1
   where code = p_code
  returning failed_claims;
$$;

/* --------------------------------------------------------------- access -- */

alter table public.tap_businesses enable row level security;
alter table public.tap_plates enable row level security;

revoke all on table public.tap_businesses, public.tap_plates from public, anon, authenticated;
grant select, insert, update, delete on table public.tap_businesses, public.tap_plates to service_role;

revoke execute on function public.tap_record(text), public.tap_fail_claim(text), public.tap_set_updated_at()
  from public, anon, authenticated;
grant execute on function public.tap_record(text), public.tap_fail_claim(text) to service_role;
