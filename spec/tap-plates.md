# Integrate Tap: NFC review plates

Customers set up and manage their own plates from any phone, with no app.

## How it works

1. **Plates are pre-encoded.** Each plate has a permanent link, `https://www.integrate-tech.co.uk/t/CODE`,
   written to the chip and locked. The plate never needs reprogramming.
2. **An insert card in the box** carries the plate code, a secret setup code and a QR code
   (the `setup_url` column in the CSV), so only the buyer can claim the plate.
3. **First tap** on an unclaimed plate opens `/tap/setup/CODE`. The customer enters the setup code,
   business name, Google review link, email and password.
4. **Every tap after that** goes wherever the business chose in `/tap/dashboard`:
   - straight to one link (default when they only add a review link), or
   - their hosted page `/b/SLUG` (logo, short line, review button first, then socials).
5. Taps are counted per plate. More plates join the same account by tapping them while logged in.

## Pages

| Route | Who | What |
| --- | --- | --- |
| `/t/[code]` | anyone | The link on the plate. 302 to setup, the chosen link or `/b/slug`. Never cached. |
| `/tap` | customer | Enter a code by hand, how it works |
| `/tap/setup/[code]` | customer | Claim a plate (`?s=SETUP-CODE` pre-fills from the card QR) |
| `/tap/login`, `/tap/dashboard` | customer | Tap mode, logo, links, plate names, tap counts |
| `/b/[slug]` | anyone | Hosted business page |
| `/tap/admin` | Integrate | Make batches, search, disable/enable, release, unlock claims, CSV |
| `/tap/admin/encode` | Integrate | Android Chrome writer: write + lock + record chip serial; "check a plate" mode |
| `/tap/admin/export` | Integrate | CSV for printing insert cards. Secret: contains setup codes. |

All `/tap`, `/t`, `/b` routes are `noindex` and disallowed in robots.txt.

## Encoding a batch

1. `/tap/admin` → make a batch (e.g. "Amazon Nov 2026", 200 plates) → download the CSV.
2. Print insert cards from the CSV: plate code, setup code and a QR of `setup_url`.
3. On an Android phone (NFC on), open `/tap/admin/encode`, pick the batch, press **Start writing**,
   hold each plate to the phone until it buzzes. Put the matching card in the box.
   Plates come off the queue in code order, so print cards in the same order.

Web NFC only exists in Chrome on Android. iPhones can't write from a web page, but they read the
finished plates fine.

## Security

- Setup codes are 8 random characters; 10 wrong tries locks the plate (admin can unlock).
- Passwords are hashed with scrypt; sessions and admin access are HMAC-signed httpOnly cookies.
- Links are forced to http(s) so a plate can't be pointed at `javascript:` or similar.
- Password reset is manual for now (customer emails hello@integrate.agency, admin releases the plate
  or we reset it). Email-based reset comes with the database stage.

## Environment

See `.env.example`: `TAP_SECRET` (required in production), `TAP_ADMIN_PASSWORD`, optional `TAP_BASE_URL`.

## Status and next stage: database

Built and tested locally on a JSON file store (`.data/tap.json`, gitignored). **Production refuses
to run on the file store** (Vercel's filesystem doesn't persist), so `/tap` shows an "Almost ready"
notice until the database exists.

Next stage, deliberately left for later:

1. Create a Supabase project (or reuse one) and run `spec/tap-plates.sql`.
2. Add a `SupabaseStore` implementing `TapStore` in `lib/tap/store.ts` and pick it when
   `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are set. No page changes needed.
3. Optional: move logos to Supabase Storage, add email password reset, move tap counting to an
   `increment` RPC so it's atomic.
