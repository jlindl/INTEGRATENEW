/**
 * Northline design tokens as complete, static Tailwind class strings
 * (Tailwind v4 only picks up literal class names, so never interpolate).
 *
 * Palette: bright and calm, with one loud signature colour.
 *  paper   #f3f6f5   page background
 *  white   #ffffff   cards
 *  ink     #0b1a28   text and navy sections
 *  navy-2  #12263a   panels on navy
 *  sub     #4b5d6b   secondary text on light
 *  line    #d8e1e3   hairlines on light
 *  teal    #1ed3b0   "Mains Teal", fills only (text on it is ink)
 *  teal-dk #0a7a66   teal for text on light backgrounds
 *  signal  #ff5a36   live dot only
 */

export const PHONE_DISPLAY = "0113 496 0230";
export const PHONE_HREF = "tel:01134960230";
export const EMAIL = "help@northlineplumbing.co.uk";

export const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-12";

/** Archivo stretched wide: the sturdy display voice */
export const display = "font-[family-name:var(--font-nl-sans)] [font-stretch:118%]";
/** Archivo pulled narrow: labels and small caps */
export const narrow = "font-[family-name:var(--font-nl-sans)] [font-stretch:80%]";
export const mono = "font-[family-name:var(--font-nl-mono)]";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#0a7a66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f6f5]";
export const focusRingDark =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#1ed3b0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a28]";

export const kicker = `${narrow} text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#0a7a66]`;
export const kickerDark = `${narrow} text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#1ed3b0]`;

export const h2 = `${display} text-[clamp(2.1rem,4.3vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em]`;

export const btnTeal =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1ed3b0] px-6 py-3.5 text-[0.98rem] font-bold text-[#0b1a28] transition-[background-color,transform] duration-200 hover:bg-[#46e0c2] active:translate-y-px";
export const btnInk =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0b1a28] px-6 py-3.5 text-[0.98rem] font-bold text-white transition-[background-color,transform] duration-200 hover:bg-[#1b3550] active:translate-y-px";
export const btnOutline =
  "inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#0b1a28] px-6 py-3 text-[0.98rem] font-bold text-[#0b1a28] transition-colors duration-200 hover:bg-[#0b1a28] hover:text-white";
