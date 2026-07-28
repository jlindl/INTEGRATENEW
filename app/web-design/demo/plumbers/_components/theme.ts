/**
 * Northline demo: shared class-string constants.
 *
 * Tailwind v4 scans source files for complete literal class names, so every
 * constant here is a full, static string (never interpolate colour values).
 *
 * Palette
 *  dark:  navy #0c1420 · panel #13202f · hairline #1f3346 · ink #eef5fb · muted #8ba3ba
 *  light: bg #f6f9fb · surface #ffffff · hairline #dde8ee · ink #12212e · muted #4e6274
 *  accent: teal #23c1a6 (text on teal #08110f) · deep teal for text-on-light #0d6e5d
 */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const displayFont = "font-[family-name:var(--font-nl-display)]";

export const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6e5d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f9fb]";

export const focusDark =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23c1a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1420]";

export const eyebrowLight =
  "text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0d6e5d]";

export const eyebrowDark =
  "text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#23c1a6]";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#23c1a6] px-6 py-3.5 text-[0.95rem] font-bold text-[#08110f] shadow-[0_14px_28px_-14px_rgba(35,193,166,0.7)] transition-colors duration-200 hover:bg-[#31d6b9]";

export const btnPrimarySm =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#23c1a6] px-4 py-2.5 text-sm font-bold text-[#08110f] transition-colors duration-200 hover:bg-[#31d6b9]";

export const btnGhostDark =
  "inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#1f3346] bg-[#13202f]/80 px-6 py-3.5 text-[0.95rem] font-semibold text-[#eef5fb] transition-colors duration-200 hover:border-[#23c1a6]/50 hover:bg-[#13202f]";

export const linkTeal =
  "inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-[#0d6e5d] transition-colors duration-200 hover:text-[#094f42]";

export const h2Light =
  "font-[family-name:var(--font-nl-display)] text-[clamp(1.85rem,3.6vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.015em] text-[#12212e]";

export const h2Dark =
  "font-[family-name:var(--font-nl-display)] text-[clamp(1.85rem,3.6vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.015em] text-[#eef5fb]";

export const PHONE_DISPLAY = "0113 496 0230";
export const PHONE_HREF = "tel:01134960230";
export const EMAIL = "hello@northlineplumbing.com";
