/**
 * Halstead Law demo: shared design tokens as class strings.
 * Palette: stone paper #f3efe7, deep stone #e7e0d3, ink #17130f,
 * night #0f0d0b, muted #5b5348, oxblood #74272a, brass #a2865a (decorative).
 * Type: Instrument Serif (display), Inter Tight (text), IBM Plex Mono (marks).
 */

export const wrap = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12";

export const serif = "font-[family-name:var(--font-hl-serif)] font-normal";
export const mono = "font-[family-name:var(--font-hl-mono)]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#74272a]";
export const focusRingLight =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3efe7]";

/** Small-caps style label used for section numbering. */
export const label = `${mono} text-[0.68rem] uppercase tracking-[0.2em]`;

export const btnInk = `group inline-flex min-h-12 items-center justify-center gap-3 bg-[#17130f] px-7 text-[0.82rem] font-medium tracking-[0.04em] text-[#f3efe7] transition-colors duration-300 hover:bg-[#74272a] ${focusRing}`;

export const btnLight = `group inline-flex min-h-12 items-center justify-center gap-3 bg-[#f3efe7] px-7 text-[0.82rem] font-medium tracking-[0.04em] text-[#17130f] transition-colors duration-300 hover:bg-white ${focusRingLight}`;

export const linkUnderline = `relative inline-flex items-center gap-2 pb-1 text-[0.82rem] font-medium tracking-[0.04em] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-[0.35]`;

export const navLinks = [
  { href: "#practice", label: "Practice" },
  { href: "#people", label: "People" },
  { href: "#approach", label: "Approach & fees" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export const IMG = "/web-design/demo/law-firms";
