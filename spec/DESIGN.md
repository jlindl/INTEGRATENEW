# Integrate — homepage design system (READ FULLY BEFORE WRITING CODE)

Elite AI automation agency for high-growth B2B. **Light theme**: bright,
engineered, surgical, premium — Apple product page / high-end architecture
studio, NOT SaaS dashboard, NOT dark cyberpunk. Every section is a considered
"beat" in a story.

## Stack
Next.js 15 App Router + TypeScript (strict) + Tailwind CSS v4 + framer-motion v12.
NO other libraries. three.js/R3F is reserved for the hero only — do not use it.

## Color tokens (Tailwind classes exist for each: `bg-paper`, `text-ink-2`, `border-line`, `bg-accent`, `text-accent`, …)
- `paper` #f7f5f0 — page background (warm off-white)
- `paper-2` #efece4 / `paper-3` #e7e3d8 — warm grey washes for alternating bands
- `card` #fdfcfa — raised surfaces
- `ink` #1b1a16 (primary text) / `ink-2` #565349 (secondary) / `ink-3` #8d897c (tertiary)
- `line` #dedacd / `line-2` #cfcaba — hairline borders
- `accent` #6b6f77 (brushed silver/graphite — THE one accent; AA-legible on paper, used for solid fills/markers/small text)
- `accent-deep` #45484e, `accent-tint` #eceef1
- Showpiece metallic moments use the `text-silver` (gradient display words) and
  `silver-sheen` (chrome fills) utilities rather than a flat hue.
- Copy style: no em dashes — use commas/periods.
- Shadows: `shadow-lift` (subtle) and `shadow-float` (elevated) — soft, warm, layered.
- NEVER use default Tailwind palette colors (no `gray-500`, `blue-600`, etc.).

## Typography
- `font-display` + the `font-display-tuned` utility → Fraunces (editorial serif).
  Headlines: `font-display-tuned font-medium text-ink leading-[1.05]` with
  `text-[clamp(...)]` scale jumps. Italic Fraunces is loaded — an italic accent
  word inside a headline (often `text-accent italic`) is a house move.
- `font-sans` → Instrument Sans. Body: `text-ink-2 leading-relaxed`.
- `font-mono` → IBM Plex Mono. Used via the `eyebrow` utility (mono, uppercase,
  tracked-out label) and for numbers/system readouts.
- Section header pattern: `<p class="eyebrow">` label, then display headline,
  optional lede `text-ink-2 max-w-[52ch]`.

## Custom utilities (defined in app/globals.css — USE THESE)
- `container-x` — page gutter + 82rem max width. Every section's inner wrapper.
- `eyebrow` — mono uppercase label style.
- `font-display-tuned` — Fraunces with tuned optical axes + tracking.
- `glass` — frosted light panel (blur + hairline inset).
- `glow-accent` — soft radial accent wash (absolute-position a div with this).
- `mask-fade-x` — fades left/right edges (for marquees).
- `hairline`, `hairline-t`, `hairline-b` — 1px `line`-colored borders.
- `animate-marquee` / `animate-marquee-slow` — infinite translateX(-50%) loop
  (content must be duplicated once; reverse with `[animation-direction:reverse]`).
  CSS already pauses these under prefers-reduced-motion.
- Custom easings: `[transition-timing-function:var(--ease-out-expo)]`.

## Motion rules (framer-motion)
- Import shared tokens: `import { EASE, VIEWPORT } from "@/lib/motion";`
  EASE = [0.16, 1, 0.3, 1]. Viewport config = { once: true, margin: "-12% 0px" }.
- Reveal primitives exist — prefer them for entrances:
  `import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";`
  (They handle prefers-reduced-motion automatically.)
- Scroll-LINKED transforms (not just fades) are the point of this page:
  `useScroll({ target: ref, offset: [...] })` + `useTransform` for parallax
  drift, scale, tracked progress lines. Always gate scroll-linked `style`
  props behind `useReducedMotion()` (pass `undefined` when reduced).
- Durations 0.7–1.0s, ease EASE, stagger 0.06–0.12s. Nothing linear, nothing
  bouncy-cartoonish. Hovers: 300ms, ease-out-expo.
- Everything must be readable and complete with JS animations disabled
  (initial state must not hide content permanently when reduced motion is on —
  the Reveal primitives already guarantee this; replicate the pattern for any
  raw motion.* usage).

## CTAs
`import { MagneticButton } from "@/components/ui/MagneticButton";`
`<MagneticButton href="#book-call" variant="primary|secondary">Label</MagneticButton>`
— cursor-magnetic pill with arrow. Primary = ink→accent fill; secondary = hairline.

## Code rules
- One file per section in `components/sections/<Name>.tsx`, named export.
- `"use client"` as the FIRST line if (and only if) the file uses hooks/motion.
- Semantic HTML: `<section>` with `aria-label` or labelled heading; heading
  hierarchy h2 → h3 within sections (h1 lives in the hero).
- Hash anchors use plain `<a>`, not next/link.
- No emojis as icons — inline SVG only (stroke `currentColor`, 1.5px).
- The brand mark is `components/ui/LogoMark.tsx` (layered chevron with a
  metallic sheen) — always import it; never redraw the logo inline.
- No stock images / remote assets. "Imagery" = procedural CSS/SVG: layered
  gradients (conic metallic sheens, soft radial glows), hairline geometry.
- Comments: explain constraints/intent, sparingly. Match existing file idiom
  (see components/sections/Hero.tsx).
- File must compile under `strict` TS with no unused imports.

## Page order (already wired in app/page.tsx)
Hero → ServiceMarquee → Services (#services) → WorkflowAutomation →
DigitalExperiences → Capabilities (#case-studies) → Integrations (#integrations)
→ Stats → Process (#process) → ClosingCTA (#book-call) → Footer.
