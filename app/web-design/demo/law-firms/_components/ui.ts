/**
 * Halstead Law demo: shared design tokens as class strings.
 * Palette: paper #f6f4ef · surface #ffffff · hairline #e4ddd0 · ink #1a1712
 * muted #5a544a · oxblood #7c2d2d · brass #9c7c4a (decorative only)
 * Serif-led editorial voice — gravitas without the chill.
 */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const display = "font-[family-name:var(--font-hl-display)]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c2d2d]";

export const focusRingOnDark =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f4ef]";

export const eyebrowRow =
  "flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5a544a]";

export const eyebrowDot = "h-1.5 w-1.5 shrink-0 rounded-full bg-[#9c7c4a]";

export const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-full bg-[#7c2d2d] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#682525] ${focusRing}`;

export const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-full border border-[#1a1712]/20 px-6 py-2.5 text-sm font-semibold text-[#1a1712] transition-colors duration-200 hover:border-[#1a1712]/40 hover:bg-white ${focusRing}`;

export const quietLink = `inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[#7c2d2d] underline-offset-4 transition-colors duration-200 hover:underline ${focusRing}`;

export const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#approach", label: "Approach" },
  { href: "#people", label: "People" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];
