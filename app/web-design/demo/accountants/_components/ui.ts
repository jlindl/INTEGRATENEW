/**
 * Meridian & Co demo: shared design tokens as class strings.
 * Palette: paper #f4f2ec · surface #ffffff · hairline #e2ded2 · ink #15201c
 * muted #565f59 · ledger green #1f5c46 · brass #b08d57 (decorative only)
 */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const display = "font-[family-name:var(--font-mc-display)]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f5c46]";

export const focusRingOnGreen =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f2ec]";

export const eyebrowRow =
  "flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#565f59]";

export const eyebrowDot = "h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08d57]";

export const btnPrimary = `inline-flex min-h-11 items-center justify-center rounded-full bg-[#1f5c46] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#184a38] ${focusRing}`;

export const btnSecondary = `inline-flex min-h-11 items-center justify-center rounded-full border border-[#15201c]/20 px-6 py-2.5 text-sm font-semibold text-[#15201c] transition-colors duration-200 hover:border-[#15201c]/40 hover:bg-white ${focusRing}`;

export const quietLink = `inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[#1f5c46] underline-offset-4 transition-colors duration-200 hover:underline ${focusRing}`;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#who", label: "Who we help" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];
