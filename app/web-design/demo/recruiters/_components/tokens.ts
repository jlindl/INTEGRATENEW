/**
 * Ascend Talent: shared class recipes.
 *
 * Palette
 *   paper    #f3efe7   page ground (warm newsprint)
 *   card     #fbf9f4   raised surfaces
 *   line     #ddd6c8   hairlines
 *   ink      #121317   primary text + dark sections
 *   muted    #575a62   secondary text (6.4:1 on paper)
 *   coral    #ff5a3c   accent: marks, fills, on-ink text
 *   ember    #b8360d   AA-safe coral for small text on paper (5.4:1)
 *
 * White on coral is only 3.1:1, so filled coral buttons carry ink text.
 */

export const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-12";

export const display = "font-[family-name:var(--font-at-display)]";
export const serif = "font-[family-name:var(--font-at-serif)] font-normal";
export const mono = "font-[family-name:var(--font-at-mono)]";

export const kicker = `${mono} text-[0.7rem] font-medium uppercase tracking-[0.16em]`;

/* Host sets an unlayered global :focus-visible outline, so these need !important. */
export const focusRing =
  "focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-[#b8360d]!";
export const focusRingDark =
  "focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-[#ff5a3c]!";

/* One consistent photographic grade across the site: slightly muted, warm. */
export const grade = "[filter:saturate(0.78)_contrast(1.05)_sepia(0.1)]";

export const btnPrimary = `inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ff5a3c] px-6 py-3.5 text-[0.92rem] font-semibold text-[#121317] transition-[background-color,color,transform] duration-300 hover:bg-[#121317] hover:text-white ${focusRing}`;

export const btnPrimaryOnInk = `inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ff5a3c] px-6 py-3.5 text-[0.92rem] font-semibold text-[#121317] transition-[background-color,color] duration-300 hover:bg-white ${focusRingDark}`;

export const btnLine = `inline-flex items-center justify-center gap-2.5 rounded-full border border-[#121317]/25 px-6 py-3.5 text-[0.92rem] font-semibold text-[#121317] transition-colors duration-300 hover:border-[#121317] hover:bg-[#121317] hover:text-white ${focusRing}`;

export const btnLineOnInk = `inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#121317] ${focusRingDark}`;

export const navLinks = [
  { href: "#hiring", label: "Hiring" },
  { href: "#looking", label: "Looking" },
  { href: "#method", label: "Method" },
  { href: "#sectors", label: "Sectors" },
  { href: "#roles", label: "Live roles" },
  { href: "#desk", label: "The desk" },
] as const;
