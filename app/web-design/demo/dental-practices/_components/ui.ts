/**
 * Brightwell dental demo: shared design tokens as class strings.
 *
 * Palette ("oat and fern"): milk #f6f1ea · paper #fffcf7 · oat #ece3d6
 * ink #1c2a26 · sub #55625c · fern #2d5547 (primary) · fern-deep #22433a
 * sage #a9bfae · mist #e3ebe4 · blush #f2d6c6 · clay #a4553a (accent text)
 *
 * Warm, skincare-brand calm rather than clinic blue. Fraunces (soft) for
 * display, Figtree for everything else.
 */

export const container = "mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-10";

export const display =
  "font-[family-name:var(--font-bw-display)] [font-variation-settings:'SOFT'_100,'WONK'_0]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#2d5547]";

export const focusRingLight =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f2d6c6]";

export const eyebrow =
  "inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#55625c]";

export const eyebrowLight =
  "inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#d5e0d7]";

export const btnPrimary = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2d5547] px-7 py-3 text-[0.95rem] font-semibold text-[#fffcf7] shadow-[0_14px_30px_-16px_rgba(34,67,58,0.7)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#22433a] hover:shadow-[0_18px_36px_-16px_rgba(34,67,58,0.8)] ${focusRing}`;

export const btnGhost = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1c2a26]/15 bg-[#fffcf7]/60 px-7 py-3 text-[0.95rem] font-semibold text-[#1c2a26] backdrop-blur-sm transition-colors duration-300 hover:border-[#1c2a26]/35 hover:bg-[#fffcf7] ${focusRing}`;

export const btnLight = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fffcf7] px-7 py-3 text-[0.95rem] font-semibold text-[#22433a] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#f2d6c6] ${focusRingLight}`;

export const navLinks = [
  { href: "#nervous", label: "Nervous patients" },
  { href: "#first-visit", label: "First visit" },
  { href: "#treatments", label: "Treatments" },
  { href: "#prices", label: "Prices" },
  { href: "#reviews", label: "Reviews" },
];

export const phone = { display: "0113 496 0612", href: "tel:+441134960612" };

export const address = {
  line1: "18 Wellspring Road",
  line2: "Leeds LS1 4HG",
};
