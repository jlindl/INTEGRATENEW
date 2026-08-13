# Self-hosted fonts

These are the `latin`-subset woff2 files for every face the site uses, pulled
from Google Fonts and committed here so builds never fetch them.

They used to come from `next/font/google`, which downloads at build time.
Google's CDN intermittently serves `fonts.gstatic.com` URLs that 404, which
fails the production build — and it fails per-family, so a different font broke
each retry. Self-hosting removes that dependency entirely; it also drops a
third-party request at runtime.

Declared with `next/font/local` in:

| File | Faces |
| --- | --- |
| `app/layout.tsx` | Fraunces, Instrument Sans, IBM Plex Mono |
| `app/web-design/demo/accountants/page.tsx` | Newsreader, Public Sans |
| `app/web-design/demo/dental-practices/page.tsx` | Plus Jakarta Sans, Inter |
| `app/web-design/demo/electricians/page.tsx` | Barlow, Barlow Condensed |
| `app/web-design/demo/law-firms/page.tsx` | Spectral, Inter |
| `app/web-design/demo/plumbers/page.tsx` | Plus Jakarta Sans, Manrope |
| `app/web-design/demo/recruiters/page.tsx` | Schibsted Grotesk, Figtree |
| `components/web-design/gallery/PortfolioShowcase.tsx` | Inter Tight |

## Naming

`<family>-<weight>.woff2`, where the weight is either a single value (a static
instance, e.g. `barlow-400`) or a range (a variable font covering the whole
axis, e.g. `figtree-300-900`). The range in the filename must match the `weight`
string in the `next/font/local` `src` entry.

Most families here are variable: Google serves one file for every weight you
ask for, so requesting 400/500/600 returns the same bytes three times. Those
are stored once and declared with their full `wght` range, letting the browser
interpolate.

## Refreshing a face

1. Open `https://fonts.googleapis.com/css2?family=<Family>:wght@<range>&display=swap`
   with a browser User-Agent (curl's default UA gets you ttf, not woff2).
2. Take the `src: url(...)` from the block commented `/* latin */`.
3. Download it to the family's folder using the naming above.
4. Update the matching `next/font/local` entry if the weight range changed.
