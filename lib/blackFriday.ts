/**
 * Black Friday 2026 offer: every fact /black-friday and the homepage banner
 * state, in one place. Change a value here and both pages follow.
 *
 * UK advertising rules (CAP Code, DMCC Act 2024) need the urgency and the
 * prices on the page to be true at all times, so:
 *  - SPOTS_REMAINING is set by hand when a spot is taken. Never count it down
 *    automatically and never lower it to create pressure.
 *  - WAS_PRICE must be a price this bundle has genuinely been sold at. It is
 *    null at launch, which hides it everywhere.
 *  - The page switches itself to the "ended" state at DEADLINE (server time),
 *    or as soon as SPOTS_REMAINING reaches 0.
 */

/** The offer price, per month, all in. */
export const PRICE_MONTHLY: number = 299;

/**
 * The struck-through "usually" price, shown as "Usually £1,000/mo".
 * null hides it on the page, the final band and the share image.
 *
 * Only set it if the bundle has genuinely been sold at this price for a
 * reasonable period (CAP Code 3.39). Launch value if that is confirmed:
 *   export const WAS_PRICE: string | null = "£1,000/mo";
 */
export const WAS_PRICE: string | null = null;

/** How many spots the offer has in total. Used in "All 10 spots have gone." */
export const TOTAL_SPOTS: number = 10;

/** Spots still open. Update by hand as clients sign up. 0 ends the offer. */
export const SPOTS_REMAINING: number = 10;

/**
 * 23:59 on Cyber Monday, 30 November 2026, Europe/London. The UK is on GMT
 * in November, so London time and UTC are the same.
 */
export const DEADLINE_ISO = "2026-11-30T23:59:00+00:00";
export const DEADLINE_MS = Date.parse(DEADLINE_ISO);

/** Schema.org priceValidUntil (a date, not a time). */
export const PRICE_VALID_UNTIL = "2026-11-30";

/** GoHighLevel tag and source for leads from the page. */
export const LEAD_TAG = "black-friday-299";
export const LEAD_SOURCE = "BF page";

export const PAGE_PATH = "/black-friday";

/**
 * Typical UK agency prices: the low end of published 2026 ranges, from
 * Whito's UK pricing research.
 */
export const AGENCY = {
  website: "£3,000+",
  seo: "£500+",
  social: "£250+",
  monthlyTotal: "£750+",
  upfrontTotal: "£3,000+",
  source: "Agency prices are the low end of published UK 2026 price ranges, from Whito's UK pricing research.",
} as const;

/** What the £299 covers. Short bullets, used on the cards and the table. */
export const INCLUDED = {
  website: ["Up to 5 pages, custom designed", "Mobile-first", "Hosting, SSL and edits included"],
  seo: ["On-page SEO", "4 blog posts a month", "Google Business Profile set-up and optimisation"],
  stories: ["30 branded stories a month", "Designed for your business", "Ready to post"],
} as const;

/** The worked example. Integrate built the site, the SEO and the stories. */
export const EXAMPLE = {
  name: "A La Parrilla Kitchen",
  kind: "BBQ restaurant in Birmingham",
  category: "Barbecue restaurant",
  area: "Birmingham",
  domain: "alaparrilla.co.uk",
  href: "https://www.alaparrilla.co.uk/",
} as const;

export type OfferState = "live" | "ended" | "sold-out";

/** Where the offer stands at a given moment. Pass server time where you can. */
export function offerState(now: number = Date.now()): OfferState {
  if (SPOTS_REMAINING <= 0) return "sold-out";
  if (now >= DEADLINE_MS) return "ended";
  return "live";
}

/** Splits the time left into whole days, hours and minutes (never negative). */
export function timeLeft(ms: number) {
  const total = Math.max(0, Math.floor(ms / 60_000));
  return { days: Math.floor(total / 1440), hours: Math.floor((total % 1440) / 60), minutes: total % 60 };
}

/** "Only 10 spots left" / "Only 1 spot left". */
export function spotsLabel(n: number = SPOTS_REMAINING) {
  return `Only ${n} ${n === 1 ? "spot" : "spots"} left`;
}

/**
 * UK phone check. Accepts the usual ways people type a number:
 * "07700 900123", "+44 7700 900123", "+44 (0)121 496 0000", "0044...".
 * Mobiles (07) need 10 digits after the 0, landlines (01, 02, 03) 9 or 10.
 */
export function ukPhoneDigits(value: string): string | null {
  const s = value.replace(/[\s\-().]/g, "");
  let national: string | null = null;
  const intl = s.match(/^(?:\+44|0044|44)0?(\d+)$/);
  if (intl) national = intl[1];
  else if (/^0\d+$/.test(s)) national = s.slice(1);
  if (!national) return null;
  return /^(?:7\d{9}|[1-3]\d{8,9}|8\d{8,9})$/.test(national) ? national : null;
}

export function isUkPhone(value: string): boolean {
  return ukPhoneDigits(value) !== null;
}

/** E.164 for GoHighLevel, e.g. "+447700900123". */
export function toE164(value: string): string {
  const national = ukPhoneDigits(value);
  return national ? `+44${national}` : value.trim();
}
