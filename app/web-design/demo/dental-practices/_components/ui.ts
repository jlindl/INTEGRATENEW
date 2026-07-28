/**
 * Brightwell dental demo: shared design tokens as class strings.
 * Palette: paper #f4faf9 · surface #ffffff · hairline #dceeeb · ink #13201f
 * muted #4f6360 · clinic teal #12b3a6 · deep teal #0f9c91 (hover)
 * Calm, clean and reassuring — clinical trust without the clinical chill.
 */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const display = "font-[family-name:var(--font-bw-display)]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12b3a6]";

export const focusRingOnTeal =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const eyebrowRow =
  "flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#4f6360]";

export const eyebrowDot = "h-1.5 w-1.5 shrink-0 rounded-full bg-[#12b3a6]";

export const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-full bg-[#12b3a6] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f9c91] ${focusRing}`;

export const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-full border border-[#13201f]/15 px-6 py-2.5 text-sm font-semibold text-[#13201f] transition-colors duration-200 hover:border-[#13201f]/30 hover:bg-white ${focusRing}`;

export const quietLink = `inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[#0f9c91] underline-offset-4 transition-colors duration-200 hover:underline ${focusRing}`;

export const navLinks = [
  { href: "#treatments", label: "Treatments" },
  { href: "#new-patients", label: "New patients" },
  { href: "#prices", label: "Prices" },
  { href: "#reviews", label: "Reviews" },
];
