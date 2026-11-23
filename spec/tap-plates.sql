-- Integrate Tap: schema for the Supabase stage (see spec/tap-plates.md).
-- Accessed only from the server with the service role key, so RLS is on with no policies.

create table if not exists tap_businesses (
  id text primary key,
  slug text not null unique,
  name text not null,
  tagline text not null default '',
  email text not null unique,
  password_hash text not null,
  contact_name text not null default '',
  phone text not null default '',
  marketing_consent boolean not null default false,
  consent_at timestamptz,
  logo text,
  mode text not null default 'page' check (mode in ('page', 'redirect')),
  redirect_link_id text,
  links jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tap_plates (
  code text primary key,
  setup_code text not null,
  status text not null default 'unencoded' check (status in ('unencoded', 'ready', 'claimed', 'disabled')),
  batch text not null,
  business_id text references tap_businesses (id) on delete set null,
  label text not null default '',
  serial text unique,
  locked boolean not null default false,
  encoded_at timestamptz,
  claimed_at timestamptz,
  taps integer not null default 0,
  last_tap_at timestamptz,
  daily_taps jsonb not null default '{}',
  failed_claims integer not null default 0,
  sent_to_amazon_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists tap_plates_business on tap_plates (business_id);
create index if not exists tap_plates_batch on tap_plates (batch, status);

-- Atomic tap counter.
create or replace function tap_record(p_code text) returns void language sql as $$
  update tap_plates
     set taps = taps + 1,
         last_tap_at = now(),
         daily_taps = jsonb_set(
           daily_taps,
           array[to_char(now() at time zone 'utc', 'YYYY-MM-DD')],
           to_jsonb(coalesce((daily_taps ->> to_char(now() at time zone 'utc', 'YYYY-MM-DD'))::int, 0) + 1)
         )
   where code = p_code;
$$;

alter table tap_businesses enable row level security;
alter table tap_plates enable row level security;
