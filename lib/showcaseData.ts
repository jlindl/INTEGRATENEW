/**
 * showcaseData — the single list that feeds both the #work coverflow carousel
 * and the "Browse by industry" filter grid beneath it.
 *
 * Most items are derived from the niche builds in webDesignData; extra one-off
 * client sites (e.g. Cloud Kicks) are appended below. Each item carries an
 * `industry` id used by the grid's filter chips.
 */
import { NICHES } from "./webDesignData";

export type ShowcaseItem = {
  id: string;
  /** Brand shown as the card/caption title, e.g. "Voltedge". */
  brand: string;
  /** Short descriptor, e.g. "Electrician website". */
  descriptor: string;
  /** Industry id — must match an INDUSTRIES entry (minus the synthetic "all"). */
  industry: string;
  /** Screenshot in /public/portfolio. */
  image: string;
  /** URL bar text on the browser frame, e.g. "voltedge.co.uk". */
  domain: string;
  /** Where the card opens — the live demo / site. */
  href: string;
  /** Internal case-study route, when this build has one. */
  caseStudy?: string;
  /** "For Electricians"-style label. */
  forLabel: string;
};

export type Industry = { id: string; label: string };

/** Filter row. "all" is synthetic and shows everything. */
export const INDUSTRIES: Industry[] = [
  { id: "all", label: "All work" },
  { id: "trades", label: "Trades" },
  { id: "professional", label: "Professional" },
  { id: "health", label: "Health" },
  { id: "hospitality", label: "Hospitality" },
  { id: "retail", label: "Clothing" },
];

const nicheItems: ShowcaseItem[] = NICHES.map((n) => ({
  id: n.slug,
  brand: n.mock.brand,
  descriptor: `${n.singular} website`,
  industry: n.category,
  image: `/portfolio/${n.slug}.jpg`,
  domain: n.mock.domain,
  href: n.demo ?? `/web-design/${n.slug}`,
  caseStudy: `/web-design/${n.slug}`,
  forLabel: n.forLabel,
}));

/* One-off client builds that aren't niche templates. */
const extraItems: ShowcaseItem[] = [
  {
    id: "cloud-kicks",
    brand: "Cloud Kicks",
    descriptor: "Streetwear & footwear store",
    industry: "retail",
    image: "/portfolio/cloud-kicks.jpg",
    domain: "cloudkicks.store",
    href: "https://www.cloudkicks.store/",
    forLabel: "For Clothing Brands",
  },
];

export const SHOWCASE: ShowcaseItem[] = [...nicheItems, ...extraItems];

/** Only the industries actually represented (keeps empty chips out of the row). */
export const ACTIVE_INDUSTRIES: Industry[] = INDUSTRIES.filter(
  (ind) => ind.id === "all" || SHOWCASE.some((s) => s.industry === ind.id),
);

/** How many builds the "All work" grid shows (a tidy two rows of three).
 *  Individual industry filters still show every build in that sector. */
export const ALL_WORK_LIMIT = 6;

export function itemsByIndustry(industry: string): ShowcaseItem[] {
  return industry === "all"
    ? SHOWCASE.slice(0, ALL_WORK_LIMIT)
    : SHOWCASE.filter((i) => i.industry === industry);
}
