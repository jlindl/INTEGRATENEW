# Integrate — homepage

Flagship marketing homepage for **Integrate**, an elite AI automation agency.
Light, engineered, editorial — warm paper surfaces, one brushed-silver accent,
Fraunces display type, and a custom 3D "automation lattice" hero.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens live in [app/globals.css](app/globals.css) (`@theme` block)
- **Framer Motion 12** — scroll-linked transforms + entrance choreography
  (shared vocabulary in [lib/motion.ts](lib/motion.ts))
- **React Three Fiber + drei** — hero 3D object, lazy-loaded with a static SVG
  fallback for reduced motion / low-end hardware / no WebGL / small viewports

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

`app/page.tsx` sets the running order; every section owns its own scroll
choreography in `components/sections/`:

Nav · Hero (3D) · ServiceMarquee · Services (3 chapters) · WorkflowAutomation
(connected-system diagram) · DigitalExperiences (free-audit CTA) · Capabilities
(diagram-free ledger) · WebDesignPromo (dark band teasing `/web-design`) ·
Integrations (marquees) · Stats (counters) · Process (scroll-drawn timeline) ·
ClosingCTA · Footer.

The header's "Integrate Web Design" CTA is a dark pill with a rotating purple
"snake" border light (`WebDesignButton` in `Nav.tsx`; keyframe `wd-spin` in
globals). The desktop nav collapses to the hamburger below `lg` (not `md`) to
fit the longer label.

Nav IA: About · Our Systems (`/#case-studies`) · Our Process (`/#process`) ·
Blog (`/blog`) — hashes are root-relative so Nav/Footer work from any page.

Shared primitives: `components/ui/Reveal.tsx` (reduced-motion-safe reveals),
`components/ui/MagneticButton.tsx` (cursor-magnetic CTA). The design contract
used to build the sections is in [spec/DESIGN.md](spec/DESIGN.md).

## Blog (`/blog`)

Light-theme blog that reuses the main Nav + Footer. Index at `app/blog/page.tsx`
(featured post + grid); posts served by `app/blog/[slug]/page.tsx` from
[lib/blogData.ts](lib/blogData.ts) (`generateStaticParams`, prerendered). Adding
a post is a content task: append a typed `Post`. Ships with **sample posts**
(placeholder copy, flagged with an on-page note) for Jack to replace.

## Integrate Web Design — dark portfolio hub (`/web-design`)

A second, standalone experience: a **dark "gallery" theme** showcasing bespoke
web design by industry (general websites, not just homepages). Reached from a
secondary "Web Design" button in the main nav (opens in a new tab — a
deliberate light→dark second room).

- **Route group:** `app/web-design/` has its own `layout.tsx` (dark theme,
  nav, footer, metadata). The hub is `page.tsx`; every case study is served by
  the single dynamic template `app/web-design/[niche]/page.tsx`
  (`generateStaticParams` → each niche is prerendered as static HTML).
- **Hub running order:** the work itself is the opener (no hero) — the
  `PortfolioGrid` leads with `lead` (extra top padding to clear the fixed nav),
  followed by `AnyNiche` (any business, any niche — a two-row industry
  marquee), `Craft` (frontend + backend capabilities, e.g. Shopify/Stripe/CRM),
  `Testimonials`, `StudioNote`, then the shared `ContactBand`.
- **Interaction layer** (`components/web-design/interactions/`): a spring-based
  motion pass over the hub, all reduced-motion-safe. `CustomCursor` (dot + lag
  ring, morphs to a "View" disc over cards via `data-cursor`; hides the native
  cursor with a `:has(#wd-cursor)` rule; fine-pointer only). `NicheCard` cards
  tilt to the cursor and their `NicheMockup` runs a **live-scroll preview** on
  hover — the browser chrome stays pinned while the page body scrolls to a
  below-the-fold section (`preview` prop + `.wd-mock-track` driven by a
  `--wd-mock` group-hover var, pure CSS so the mockup stays a server component).
  `PortfolioGrid` filter uses a shared-layout sliding pill (`layoutId`) + a
  rolling project count + FLIP reflow. `KineticHeading` reveals the lead heading
  once on load. `useMagnetic`/`MagneticLink` add cursor-lean to the CTAs.
  `ScrollProgress` (top accent bar) and `AmbientBackdrop` (slow purple blooms,
  scroll-parallaxed) mount in the segment layout. **Not built:** a
  shared-element card→detail route morph (needs View Transitions / a routing
  change, flagged for a separate decision).
- **Data-driven:** everything renders from [lib/webDesignData.ts](lib/webDesignData.ts).
  **Adding a niche in Phase 2 is a content task** — append one typed `Niche`
  object; no component changes. Components live in `components/web-design/`
  (`NicheCard`, `PortfolioGrid`, `NicheMockup`, `NicheDetailHero`, …).
- **Placeholder imagery:** until real screenshots exist, each niche renders a
  procedural, per-industry homepage via `NicheMockup` (clearly tagged
  "Representative mockup"). Set a niche's `cover` field to a real screenshot
  and the card + detail hero switch to an optimised `next/image` automatically.
- **Theme tokens:** the dark palette (`carbon`, `graphite`, `mist`, `ivory`,
  `halo`) and its utilities (`glass-dark`, `text-platinum`, `glow-halo`,
  `grain-dark`) live alongside the light tokens in
  [app/globals.css](app/globals.css), scoped under `.theme-portfolio`.
  Platinum (`halo`) is the dominant accent; the purple sub-brand tokens
  (`iris`, `iris-soft`, `glow-iris` — matching the nav pill's "snake light")
  are threaded through sparingly (active filter chip, small dots, hover states,
  faint blooms) as a secondary accent.

Phase 1 ships the shell + 3 flagship niches (electricians, recruiters,
accountants) plus 4 more for scale/filtering. Phase 2 = add the remaining
industries as data + real screenshots.

## Before launch — placeholders to replace (Jack)

- [ ] **Stats figures** in `components/sections/Stats.tsx` are placeholders
      (marked in code + a visible footnote). Swap in audited figures and
      remove the footnote.
- [ ] **Booking link** — CTAs point at `#book-call` / a placeholder
      `mailto:hello@integrate.agency`. Swap in the real Cal.com/Calendly URL
      in `ClosingCTA.tsx` and `Footer.tsx`.
- [ ] **Contact email + Social Hub URL** in `Footer.tsx`.
- [ ] **Nav anchors** — About / Our Systems / Our Process resolve to homepage
      sections (`/#services`, `/#case-studies`, `/#process`); Blog is a real
      route. Point About/Systems/Process at dedicated pages if/when they exist
      (`components/sections/Nav.tsx`).
- [ ] **Blog posts** — `lib/blogData.ts` ships sample posts with placeholder
      copy (flagged by an on-page note). Replace with real articles before
      launch; add more by appending `Post` objects.
- [ ] **Web Design testimonials** — `components/web-design/Testimonials.tsx`
      ships illustrative placeholder quotes (flagged by an on-page note). Swap
      in real, attributable client testimonials before launch.
- [ ] **Web Design screenshots** — each niche in `lib/webDesignData.ts` shows a
      procedural mockup until you set its `cover` (`{ src, width, height,
      blurDataURL }`) to a real, optimised screenshot. Phase 2 also adds the
      remaining industries as new `Niche` entries.

## Accessibility & performance notes

- Full `prefers-reduced-motion` path: all content visible with zero motion;
  marquees pause; the 3D hero swaps to a static SVG.
- Semantic landmarks, h1→h2→h3 hierarchy, skip link, visible focus states.
- three.js is code-split out of the critical path (~170 kB first-load JS);
  the hero render loop pauses entirely when scrolled off-screen.
- `npm audit` currently reports a moderate advisory in `postcss` via Next's
  own dependency pin — dev-time tooling only; clears when Next ships a patch.
