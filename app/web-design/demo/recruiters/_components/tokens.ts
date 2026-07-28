/**
 * Ascend Talent — shared class recipes for the demo.
 *
 * Palette (all applied via Tailwind arbitrary values):
 *   paper    #f7f5f1   page ground
 *   surface  #ffffff   cards / bands
 *   hairline #e7e2d8   rules, borders
 *   ink      #16181d   primary text
 *   muted    #5c5f68   secondary text (5.8:1 on paper)
 *   coral    #ff5a3c   brand accent — decorative marks + on-ink usage only
 *   ember    #c43a10   deep coral — AA-safe as text or under white on light grounds
 *
 * Contrast notes: white on #ff5a3c is only 3.1:1, so filled coral CTAs use
 * ink text (5.7:1). Small coral text on paper uses #c43a10 (4.9:1).
 */

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const displayFont = "font-[family-name:var(--font-at-display)]";

/* System mono stack — deliberately NOT the host's font-mono token. */
export const monoStack =
  "font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

export const monoKicker = `${monoStack} text-[0.7rem] font-medium uppercase tracking-[0.18em]`;

/* The host sets an unlayered global :focus-visible outline, so brand focus
   rings need important utilities to win the cascade. */
export const focusRing =
  "focus-visible:outline-2! focus-visible:outline-[#c43a10]!";

export const focusRingDark =
  "focus-visible:outline-2! focus-visible:outline-[#ff5a3c]!";

/* Pill CTAs — the one place corners go fully round. Ink text on coral: 5.7:1. */
export const pillPrimary = `inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a3c] px-6 py-3 text-sm font-semibold text-[#16181d] transition-colors duration-200 hover:bg-[#16181d] hover:text-white ${focusRing}`;

export const pillPrimarySm = `inline-flex items-center justify-center gap-2 rounded-full bg-[#ff5a3c] px-4 py-2 text-[0.8rem] font-semibold text-[#16181d] transition-colors duration-200 hover:bg-[#16181d] hover:text-white ${focusRing}`;

export const pillGhost = `inline-flex items-center justify-center gap-2 rounded-full border border-[#16181d]/25 px-6 py-3 text-sm font-semibold text-[#16181d] transition-colors duration-200 hover:border-[#16181d] hover:bg-[#16181d] hover:text-white ${focusRing}`;

/* Ghost pill for ink (#16181d) grounds. */
export const pillGhostDark = `inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#16181d] ${focusRingDark}`;

export const navLinks = [
  { href: "#hire", label: "Employers" },
  { href: "#candidates", label: "Candidates" },
  { href: "#sectors", label: "Sectors" },
  { href: "#roles", label: "Live roles" },
] as const;
