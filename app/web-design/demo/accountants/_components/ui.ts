/**
 * Meridian & Co demo: shared tokens as class strings.
 * paper #f3f0e8 | paper-2 #ebe6d9 | ink #13201b | sub #4f5a54 | hairline #d6cfbf
 * ledger green #1b4a3a | deep green #0f2b22 | brass #a7834b (decorative) | brass-light #d6b97f (on dark)
 */

export const wrap = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12";

export const serif = "font-[family-name:var(--font-mc-serif)]";
export const mono = "font-[family-name:var(--font-mc-mono)]";

export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4a3a]";

export const focusRingLight =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f3f0e8]";

export const label =
  "font-[family-name:var(--font-mc-mono)] text-[0.7rem] uppercase tracking-[0.16em]";

export const btnPrimary = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#1b4a3a] pl-6 pr-5 text-[0.95rem] font-medium text-[#f3f0e8] transition-colors duration-300 hover:bg-[#13382c] ${focusRing}`;

export const btnGhost = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#13201b]/20 px-6 text-[0.95rem] font-medium text-[#13201b] transition-colors duration-300 hover:border-[#13201b]/50 ${focusRing}`;

/** Consistent grade on every photograph: a touch desaturated and warm. */
export const photo = "[filter:saturate(0.78)_contrast(1.04)_sepia(0.06)]";

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#month-end", label: "Month-end" },
  { href: "#fees", label: "Fees" },
  { href: "#clients", label: "Clients" },
  { href: "#insights", label: "Insights" },
];
