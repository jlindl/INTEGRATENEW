# Integrate Tap: NFC review plates

Customers set up and manage their own plates from any phone, with no app.

## How it works

1. **Plates are pre-encoded.** Each plate has a permanent link, `https://www.integrate-tech.co.uk/t/CODE`,
   written to the chip and locked. The plate never needs reprogramming.
2. **No setup code.** The plate's own link is what makes it unique. Whoever opens an unclaimed
   plate first (in practice the buyer, who is holding it) claims it. Once claimed it can't be
   claimed again; if someone else got there first, admin hits **Release** and it's claimable again.
3. **First tap** on an unclaimed plate opens `/tap/setup/CODE`. The customer enters their
   business name, Google review link, their name, email, phone and password, plus an optional
   (unticked) marketing consent box. They can change these or withdraw consent from the dashboard;
   the time of the last change is stored. `/tap/admin` → Customers CSV exports them all.
4. **Every tap after that** goes wherever the business chose in `/tap/dashboard`:
   - straight to one link (default when they only add a review link), or
   - their hosted page `/b/SLUG` (logo, short line, review button first, then socials).
5. Taps are counted per plate. More plates join the same account by tapping them while logged in.

## Pages

| Route | Who | What |
| --- | --- | --- |
| `/t/[code]` | anyone | The link on the plate. 302 to setup, the chosen link or `/b/slug`. Never cached. |
| `/tap` | customer | Enter a code by hand, how it works |
| `/tap/setup/[code]` | customer | Claim a plate: sign up (or, if logged in, add it to the account) |
| `/tap/login`, `/tap/dashboard` | customer | Tap mode, logo, links, plate names, tap counts, website badge |
| `/b/[slug]` | anyone | Hosted business page |
| `/tap/admin` | Integrate | Make batches, see each plate's link, search, disable/enable, release, CSV |
| `/tap/admin/encode` | Integrate | Android Chrome writer: write + lock + record chip serial; "check a plate" mode |
| `/tap/admin/export` | Integrate | Plates CSV (code + link to write on each tag). `?type=customers` exports contacts; only market to `marketing_consent = yes`. |

All `/tap`, `/t`, `/b` routes are `noindex` and disallowed in robots.txt.

## Website badge (backlinks)

The dashboard's **Add to your website** section gives each business a copy-paste "Review us on
Google" (or Tripadvisor) button for their own site, with a small "Made with Integrate Tap" link
under it. Tap's own pages live on integrate-tech.co.uk, so their credit links are internal and `/b`
is noindex anyway: a badge on the business's own domain is where real backlinks come from.

- The button goes to their page `/b/SLUG` by default (it keeps working when they change their
  links) or straight to their review link. The credit link goes to the homepage.
- UTM tags (`utm_source=integrate-tap&utm_medium=website-badge&utm_content=SLUG`) go on our own
  URLs only, never on a Google or Tripadvisor link.
- Inline styles only, no `<style>` or `<script>`, and it paints its own backgrounds, so it reads on
  light and dark sites and inside iframe embeds like Wix's. Code: `components/tap/WebsiteBadge.tsx`.
- Keep the credit link visible, followed and branded. Hidden or keyword-rich links in widgets are
  against Google's spam policies.

## Encoding a batch

1. `/tap/admin` → make a batch (e.g. "Amazon Nov 2026", 200 plates). Each plate's link is shown
   under its code; the Plates CSV lists them too.
2. Write one link per tag:
   - **Android (fastest):** open `/tap/admin/encode` in Chrome with NFC on, pick the batch, press
     **Start writing**, hold each plate to the phone until it buzzes. It locks the tag, records the
     chip serial and marks the plate `ready`.
   - **iPhone:** NFC Tools app → Write → Add a record → URL → paste the plate's link → Write.
     The plate stays `unencoded` in admin (only the Android Encoder updates that), but it works.
     Lock tags (NFC Tools → Other → Lock tag) only once tested: locking is permanent.

Web NFC only exists in Chrome on Android. iPhones can't write from a web page, but they read the
finished plates fine.

## Security

- Plate codes are 6 random characters (887 million combinations), so plates can't be guessed.
  An unclaimed plate is claimed by whoever opens it first; admin can **Release** a wrongly
  claimed plate.
- Passwords are hashed with scrypt; sessions and admin access are HMAC-signed httpOnly cookies.
- Links are forced to http(s) so a plate can't be pointed at `javascript:` or similar.
- Password reset is manual for now (customer emails hello@integrate.agency, admin releases the plate
  or we reset it).
- Database: Supabase tables have RLS on with no policies and no grants for `anon`/`authenticated`,
  so the publishable key gets "permission denied". Only the server, with the service role key,
  can read or write. Tap counting (`tap_record`) and wrong-code counting (`tap_fail_claim`) are
  atomic RPCs, also service-role only.

## Environment

See `.env.example`: `TAP_SECRET` (required in production), `TAP_ADMIN_PASSWORD`, optional
`TAP_BASE_URL`, plus `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for the database.

## Database (done)

Runs on Supabase project **Integrate** (ref `xudrespgzcgrutluicgx`, eu-west-1).

- Schema: `supabase/migrations/20261106120546_tap_plates.sql` (applied). `spec/tap-plates.sql` is the
  original draft, kept for reference; the migration is the source of truth.
- Code: `lib/tap/supabase-store.ts` implements `TapStore`; `getStore()` uses it whenever
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are both set, otherwise it falls back to the JSON
  file store (`.data/tap.json`, dev only; production refuses it unless `TAP_ALLOW_FILE_STORE=1`).
- Types: `lib/tap/database.types.ts`, generated from the database. Regenerate after schema changes.

### Setting it up on Vercel

Project → Settings → Environment Variables, for **Production** (and Preview if previews should work):

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | `https://xudrespgzcgrutluicgx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API Keys → secret / service_role. Mark it **Sensitive**. |
| `TAP_SECRET` | 32+ random characters (already required). |
| `TAP_ADMIN_PASSWORD` | Admin password for `/tap/admin` (no default in production). |

Never prefix the service role key with `NEXT_PUBLIC_` and never set `TAP_ALLOW_FILE_STORE` on
Vercel. Redeploy after adding the variables; `/tap` stops showing "Almost ready" once they're set.

### Still to do

- Logos to Supabase Storage (they're data URLs in `tap_businesses.logo` today).
- Email password reset (needs an email provider decision).
