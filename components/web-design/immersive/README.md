# Immersive demos: the kit

Ten scroll-driven homepage demos live at `/web-design/immersive/<slug>`, one per trade, each for a made-up business. They are listed in `lib/immersiveDemos.ts` and shown in the "Immersive homepages" section of `/web-design`.

`app/web-design/immersive/layout.tsx` wraps every demo in `<div class="imm" data-imm-root>` and adds the scroll engine (`ImmersiveDirector`) and the "Demo by Integrate" pill (`ImmersiveCredit`). A demo supplies only its own `page.tsx`, stylesheet and components.

## A demo's files

```
app/web-design/immersive/<slug>/
  page.tsx          server component: fonts (next/font/local), metadata, the sections
  <slug>.css        every style for the demo, scoped under one root class
  _components/*.tsx client components for the few interactive parts
```

Reference demo to copy the structure from: `app/web-design/immersive/roofers/`.

## The one rule: finished by default

With no script, or under `prefers-reduced-motion`, the page must be complete, designed and readable: every element in its finished state, nothing at opacity 0, nothing waiting on scroll.

Motion is opt-in. The director sets `data-imm="on"` on the root only once it is running, so every scroll-driven state is written under that selector:

```css
/* finished state: always */
.rf-slate { opacity: 1; }
/* scroll-driven state: only while the director runs */
[data-imm="on"] .rf-slate { opacity: var(--p); }
```

## Scroll progress: `data-scrub`

Put `data-scrub` on an element and the director writes its scroll progress to it as the CSS custom property `--p`, from 0 to 1. Custom properties inherit, so every descendant can use `var(--p)` in `calc()`.

| Attribute | Progress runs |
| --- | --- |
| `data-scrub` (or `"through"`) | while the element travels through the screen |
| `data-scrub="pin"` | from its top reaching the top of the screen until its bottom reaches the bottom (use with a pinned stage) |
| `data-scrub="enter"` | as the element arrives and settles |
| `data-scrub="exit"` | as the element leaves the top (heroes; the finished state is `--p: 0`) |
| `data-start` / `data-end` | override with any ScrollTrigger position, e.g. `data-start="top 80%"` |
| `data-ease="inout"` \| `"out"` \| `"soft"` | ease `--p` (default linear) |
| `data-steps="4"` | also sets `data-step="0".."3"` on the element, for discrete states in CSS |

Staggering children from one `--p` is plain CSS:

```css
.row { --rp: clamp(0, calc(var(--p) * var(--rows) - var(--i)), 1); }
```

For the rare thing CSS cannot do (changing a number on screen), a client component calls `useScrub(ref, (p) => { el.textContent = ... })` from `components/web-design/immersive/useScrub.ts`. Write to the DOM in the callback; never `setState` on scroll.

## Pinned stages

```html
<section class="imm-pin" data-scrub="pin" style="--pin: 2.5">
  <div class="imm-stage">...</div>
</section>
```

Static: a normal block. Running: the section is `--pin` screens tall and the stage sticks for `--pin - 1` screens. Keep `--pin` at 2.5 or less: no visitor is held for more than about 1.5 screens. A stage must work at 375 x 667 and at 1440 x 900.

## Reveals and loops

- `data-reveal` (also `="left"`, `"right"`, `"scale"`, `"clip"`; delay with `style="--d: 120ms"`) fades supporting content in once. Never on a primary button.
- `data-loop` on a section gets `data-live` while it is on screen. Pause CSS loops by default and run them under `[data-live]`.

## Rules every demo keeps

1. **It is a demo.** The business is made up. No real company names, no real people, no real accreditation or registration numbers, no real review platforms' ratings. Phone numbers come from Ofcom's drama ranges (`01632 960xxx`, `07700 900xxx`, `0808 157 0xxx`). Reviews, if any, sit under a visible "Sample reviews" label.
2. **Photography is generated** and lives in `public/media/demos/<slug>/`. Use `next/image` with real `sizes`. No text or logos are baked into images; all type is live HTML.
3. **First screen sells.** At 1440 x 900 and 375 x 667 the visitor sees who the business is, what it does, and the primary action, without scrolling.
4. **The primary action is always one tap away:** in the header, in the hero, at each decision point, and in a slim fixed bar on phones. The demo pill is a sibling of your root, not a child, so lift it above your bar with `.imm:has(.your-root) { --imm-bar: 4rem; }` inside a phone media query.
5. **Keep the bottom-left corner clear** of your own fixed UI on desktop: the demo pill lives there.
6. **No sideways scroll**, not one pixel, from 320px up. Long words in grids need `min-width: 0`.
7. **Forms do not submit anywhere.** Prevent default and show a short "This is a demo" confirmation.
8. **Dense, not sparse.** Every section is built around something to look at: a real-looking object, a diagram, a piece of working UI, with labels, tags and small data around it. See the memory note "design density bar".
9. **Scope everything.** One root class per demo and a two or three letter prefix on every class and keyframe, so no demo can leak into another.
