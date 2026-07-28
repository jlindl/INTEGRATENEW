/**
 * Data for the /testimonials page — the real clients we've built for. One list
 * powers both the "brands we've worked with" logo wall and the reviews; each
 * card links out to that client's live website.
 *
 * NOTE: the `quote` text is illustrative placeholder copy (the on-page note
 * flags it) — Jack, swap each one for the client's own words before launch.
 * The names, industries, and links are real.
 */

/* A logo mark shape id, drawn in components/testimonials/marks.tsx. */
export type ClientMark = "shield" | "sparkle" | "tree" | "cloud" | "cart" | "pulse" | "sun";

export type Client = {
  name: string;
  /** Live site — the whole lockup and review card link here (opens in a new tab). */
  url: string;
  industry: string;
  mark: ClientMark;
  /** Wordmark voice — a different face per brand for a believable logo wall. */
  voice: "sans" | "serif" | "mono";
  /** What we built for them — a small mono tag on the review card. */
  tag: string;
  /** ILLUSTRATIVE placeholder — replace with the client's real words. */
  quote: string;
  /** Studio-voice outcome (what we built + the result). Used by the Web Design
   *  hub in place of a client quote, so nothing is presented as their words.
   *  Set for web-design clients; the main /testimonials page still uses `quote`. */
  outcome?: string;
  /** Promotes this client to the large featured pull-quote. */
  featured?: boolean;
};

export const CLIENTS: Client[] = [
  {
    name: "Allied Insurance",
    url: "https://www.alliedinsurance.co.uk/",
    industry: "Commercial Insurance",
    mark: "shield",
    voice: "serif",
    tag: "Web Design + Automation",
    quote:
      "The new site finally matches the calibre of cover we offer. Quote requests come in cleaner, route to the right desk on their own, and nothing slips through the cracks anymore.",
    outcome:
      "Rebuilt the site to match the calibre of cover they write, then wired the quote forms into their workflow. Requests now arrive cleaner and route themselves to the right desk.",
    featured: true,
  },
  {
    name: "Polished Insurance",
    url: "https://www.polished-insurance.co.uk/",
    industry: "Insurance Broking",
    mark: "sparkle",
    voice: "sans",
    tag: "Web Design",
    quote:
      "Cleaners get an instant quote and buy their cover in minutes, at any hour. The site does the explaining for us now, so the phone only rings when it really needs to.",
    outcome:
      "Built an instant-quote flow that lets cleaners price and buy cover in minutes, at any hour. The site does the explaining, so the phone rings mostly when it genuinely needs to.",
  },
  {
    name: "Ramsay Timber",
    url: "https://www.ramsaytimber.co.uk/",
    industry: "Timber Supply",
    mark: "tree",
    voice: "serif",
    tag: "Web Design",
    quote:
      "Forty years of craft finally has a shopfront to match. Trade customers find exactly the product they need, and the enquiries reaching us are far better qualified.",
    outcome:
      "Gave forty years of trade a shopfront to match. Trade buyers find the exact product fast, and the enquiries coming through are far better qualified than before.",
  },
  {
    name: "CloudKicks",
    url: "https://www.cloudkicks.store/",
    industry: "Footwear",
    mark: "cloud",
    voice: "sans",
    tag: "E-commerce",
    quote:
      "Our store looks as good as the product feels. Checkout is fast, the drops sell through, and the number of customers coming back keeps climbing.",
  },
  {
    name: "PoundMart",
    url: "https://www.poundmart.co.uk/",
    industry: "Value Retail",
    mark: "cart",
    voice: "sans",
    tag: "E-commerce + Automation",
    quote:
      "Thousands of lines, and the whole catalogue stays in sync without us lifting a finger. Orders just flow, and the storefront keeps pace with everything we list.",
  },
  {
    name: "ModelMentions",
    url: "https://www.modelmentions.co.uk/",
    industry: "AI Analytics",
    mark: "pulse",
    voice: "mono",
    tag: "Web Design",
    quote:
      "They turned a genuinely technical product into something people understand in seconds. Sign-ups jumped the week we launched, and it still feels effortless to use.",
    outcome:
      "Turned a genuinely technical product into something people grasp in seconds. Sign-ups climbed the week it launched, and the product still feels effortless to move through.",
  },
  {
    name: "Golden Days",
    url: "https://www.golden-days.co.uk/",
    industry: "Benefits Advisory",
    mark: "sun",
    voice: "serif",
    tag: "Outbound SMS + Email Hosting",
    quote:
      "The outbound messaging keeps us in front of the people who need us and reaches them where they actually read. Rock-solid email hosting to match, so nothing bounces and every reply lands.",
  },
];

/**
 * Clients whose engagement was specifically a web design build — used for the
 * Integrate Web Design hub's testimonials. E-commerce-only projects (CloudKicks,
 * PoundMart) and non-web work (Golden Days — SMS + email hosting) are
 * intentionally excluded there, so the hub speaks only to web design.
 */
export function webDesignClients(): Client[] {
  return CLIENTS.filter((c) => /web design/i.test(c.tag));
}
