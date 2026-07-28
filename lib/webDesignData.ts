/**
 * Integrate Web Design — the single source of truth for the portfolio hub.
 *
 * Everything the hub and the niche detail template render is driven from the
 * `NICHES` array below. Adding a new niche in Phase 2 is a *content* task:
 * append one typed object here (and, when ready, point `cover` at a real
 * screenshot) — no component code changes required.
 *
 * Until real screenshots exist, each niche ships a `mock`: a small, real
 * homepage rendered procedurally by <NicheMockup>. It's clearly labelled as a
 * representative mockup, but it lets an electrician's site and an accountant's
 * site look meaningfully different — proof of range, not a reskinned template.
 */

/* ---------------------------------------------------------------- */
/*  Taxonomy                                                         */
/* ---------------------------------------------------------------- */

export type CategoryId =
  | "trades"
  | "professional"
  | "health"
  | "hospitality";

export type Category = { id: CategoryId; label: string };

/** Real niche categories. The hub filter prepends a synthetic "All". */
export const CATEGORIES: Category[] = [
  { id: "trades", label: "Trades" },
  { id: "professional", label: "Professional Services" },
  { id: "health", label: "Health & Wellness" },
  { id: "hospitality", label: "Hospitality" },
];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/* ---------------------------------------------------------------- */
/*  Mockup model                                                     */
/* ---------------------------------------------------------------- */

/** Which layout archetype the procedural mockup arranges itself into. */
export type Archetype = "spotlight" | "editorial" | "split";

/** Colour story for a single niche's mock homepage. Kept deliberately small
 *  so each niche reads as its own brand, not a hue-swapped template. */
export type MockPalette = {
  /** true when the mock homepage itself is a light design (dark gallery frame
   *  still surrounds it) — drives a couple of contrast choices in the frame. */
  light: boolean;
  bg: string;
  surface: string;
  line: string;
  ink: string;
  sub: string;
  accent: string;
  accentInk: string;
  /** soft radial bloom behind the mock hero */
  glow: string;
};

export type MockContent = {
  brand: string;
  domain: string;
  nav: string[];
  eyebrow: string;
  /** headline split into rendered lines for typographic control */
  headlineLines: string[];
  sub: string;
  cta: string;
  ctaSecondary: string;
  /** three proof points (spotlight/split use these as a strip) */
  proof: { v: string; k: string }[];
  /** three feature cards (editorial archetype uses these) */
  features: { title: string; note: string }[];
};

/* ---------------------------------------------------------------- */
/*  Detail model                                                     */
/* ---------------------------------------------------------------- */

export type DetailSection = { title: string; body: string };

export type Niche = {
  slug: string;
  /** Bare noun, e.g. "Electricians". */
  name: string;
  /** Singular form, e.g. "Electrician" — used in "your electrician business".
   *  Explicit (not auto-derived) so irregular plurals stay correct. */
  singular: string;
  /** Card/hero label, e.g. "For Electricians". */
  forLabel: string;
  category: CategoryId;
  /** One line, the angle taken for this niche. Used on cards + detail. */
  positioning: string;
  /** Flagship niches carry the richest detail write-up. */
  featured: boolean;
  /** Human name for the accent, e.g. "Signal Amber" — a nice detail-page note. */
  accentName: string;

  /** Procedural mock (until a real screenshot is supplied). */
  archetype: Archetype;
  palette: MockPalette;
  mock: MockContent;

  /**
   * Real cover screenshot. Left undefined in Phase 1 → the procedural mock is
   * shown. In Phase 2, set `{ src, width, height, blurDataURL }` and the card
   * + detail hero switch to an optimised next/image automatically.
   */
  cover?: { src: string; width: number; height: number; blurDataURL?: string };

  /**
   * Route of this niche's standalone live demo site (e.g.
   * "/web-design/demo/electricians"). When set, the portfolio card opens the
   * demo in a new tab and the detail page gains a "Visit the live demo" CTA.
   */
  demo?: string;

  /* Detail page copy */
  brief: string;
  audience: string;
  rationale: string;
  sections: DetailSection[];
  /** Illustrative outcome figures — clearly framed as design intent, not
   *  audited client results. */
  metrics: { value: string; label: string }[];
};

/* ---------------------------------------------------------------- */
/*  The niches                                                       */
/* ---------------------------------------------------------------- */

export const NICHES: Niche[] = [
  /* ---- FLAGSHIP: Electricians ---------------------------------- */
  {
    slug: "electricians",
    name: "Electricians",
    singular: "Electrician",
    forLabel: "For Electricians",
    category: "trades",
    positioning:
      "The site an electrician needs for the moment someone's fuse box has just died and they're phoning whoever answers first.",
    featured: true,
    accentName: "Signal Amber",
    demo: "/web-design/demo/electricians",
    cover: { src: "/portfolio/electricians.jpg", width: 1440, height: 900 },
    archetype: "spotlight",
    palette: {
      light: false,
      bg: "#0e1116",
      surface: "#161b23",
      line: "#232a35",
      ink: "#f4f7fb",
      sub: "#93a0b1",
      accent: "#ffb020",
      accentInk: "#12151b",
      glow: "rgba(255,176,32,0.18)",
    },
    mock: {
      brand: "Voltedge",
      domain: "voltedge.co.uk",
      nav: ["Services", "Emergency", "Areas", "Reviews"],
      eyebrow: "NICEIC Approved · 24/7 Emergency",
      headlineLines: ["Power you can count on,", "wired right the first time."],
      sub: "Fully certified electricians across the county. Same-day callouts, upfront pricing, and work that passes inspection every time.",
      cta: "Get a fast quote",
      ctaSecondary: "Call now",
      proof: [
        { v: "18 min", k: "avg. callout" },
        { v: "4.9★", k: "320 reviews" },
        { v: "10yr", k: "workmanship warranty" },
      ],
      features: [
        { title: "Emergency", note: "24/7 fault-finding" },
        { title: "Rewires", note: "Whole-home, certified" },
        { title: "EV charging", note: "OZEV approved installs" },
      ],
    },
    brief:
      "When someone's power cuts out they don't shop around, they call the first electrician who looks legitimate and free. So the whole site is built to answer 'are you real, and can you come now?' quickly, and to make calling the easiest thing on the page.",
    audience:
      "Mostly homeowners and landlords, usually on a phone, usually already a bit stressed. Nobody in that state reads a paragraph. They're scanning for a number, a review score, and something that says you won't take them for a ride.",
    rationale:
      "We went dark and high-contrast with a single hi-vis amber, so it feels like the trade rather than a lifestyle brand. The NICEIC badge, the review score and a call button all stay above the fold, so the reassurance and the way to act on it never leave the screen.",
    sections: [
      {
        title: "The hero is a phone number",
        body: "The main action is a tap-to-call button, thumb-sized and impossible to miss. The quote form sits underneath for jobs that can wait, so it's there without getting in front of the urgent ones.",
      },
      {
        title: "Reassurance in one strip",
        body: "Average callout time, the Google score and the workmanship guarantee run in a single band under the hero. It's the fastest way to answer what someone's already wondering before they'll dial.",
      },
      {
        title: "Separate doors for the big jobs",
        body: "A rewire or an EV charger is worth far more than a tripped breaker, so those get their own tiles instead of being buried in a services list. The work that pays gets its own way in.",
      },
    ],
    metrics: [
      { value: "Tap to call", label: "The main action, always in reach" },
      { value: "Above the fold", label: "Badge, reviews and phone before any scroll" },
      { value: "AA contrast", label: "Legible on a cheap phone in bright sun" },
    ],
  },

  /* ---- FLAGSHIP: Recruiters ------------------------------------ */
  {
    slug: "recruiters",
    name: "Recruiters",
    singular: "Recruiter",
    forLabel: "For Recruiters",
    category: "professional",
    positioning:
      "The anti-spam recruitment site: it reads like a firm you'd actually hand a brief to, not another agency filling your inbox.",
    featured: true,
    accentName: "Ember Coral",
    demo: "/web-design/demo/recruiters",
    cover: { src: "/portfolio/recruiters.jpg", width: 1440, height: 900 },
    archetype: "editorial",
    palette: {
      light: true,
      bg: "#f7f5f1",
      surface: "#ffffff",
      line: "#e7e2d8",
      ink: "#16181d",
      sub: "#5c5f68",
      accent: "#ff5a3c",
      accentInk: "#ffffff",
      glow: "rgba(255,90,60,0.12)",
    },
    mock: {
      brand: "Ascend Talent",
      domain: "ascendtalent.com",
      nav: ["Employers", "Candidates", "Sectors", "About"],
      eyebrow: "Executive & Technology Search",
      headlineLines: ["The shortlist you", "actually wanted,", "in days, not weeks."],
      sub: "Specialist recruiters for scaling technology teams. Pre-vetted candidates, transparent process, and a replacement guarantee on every placement.",
      cta: "Hire better, faster",
      ctaSecondary: "Browse roles",
      proof: [
        { v: "11 days", k: "avg. time to shortlist" },
        { v: "92%", k: "offer acceptance" },
        { v: "1,400+", k: "placements made" },
      ],
      features: [
        { title: "Employers", note: "Retained & contingent search" },
        { title: "Candidates", note: "Roles that actually fit" },
        { title: "Insight", note: "Live salary benchmarking" },
      ],
    },
    brief:
      "Recruiters have an image problem: too many inboxes hit with the same generic CV. The job here was a site that feels like the opposite of that, considered and a little premium, and one that lets employers and candidates each find their own path without one talking over the other.",
    audience:
      "Two groups that don't overlap much. Hiring managers who've been let down by agencies that fire over twenty CVs and hope one sticks. And senior candidates who aren't about to hand their details to just anyone. Both need to feel the firm is picky in a good way.",
    rationale:
      "Light background, big editorial type, one warm coral. It reads as a firm that puts people first and isn't trying too hard. Right at the top there's a clean Employers / Candidates split, so each side gets one click to their own content and neither has to sit through the other's pitch.",
    sections: [
      {
        title: "A door each",
        body: "Employers and candidates get their own entry point, weighted the same. Nobody scrolls past a pitch aimed at someone else to reach the part that's for them.",
      },
      {
        title: "Lead with the numbers",
        body: "Time to shortlist and offer-acceptance rate go near the top. When a company hires a recruiter what they're really buying is speed and a candidate who says yes, so the site opens with exactly that.",
      },
      {
        title: "Real faces, not stock",
        body: "The layout holds room for the actual consultants and named client quotes. The moment real photos exist they become the thing you notice, with no smiling-handshake stock standing in for people.",
      },
    ],
    metrics: [
      { value: "Two paths", label: "Each audience, one click from the top" },
      { value: "No stock", label: "Space held for the real team" },
      { value: "Easy on the eye", label: "Set at a comfortable reading width" },
    ],
  },

  /* ---- FLAGSHIP: Accountants ----------------------------------- */
  {
    slug: "accountants",
    name: "Accountants",
    singular: "Accountant",
    forLabel: "For Accountants",
    category: "professional",
    positioning:
      "Calm and precise, so a founder handing over their books feels like they've finally picked the grown-up option.",
    featured: true,
    accentName: "Ledger Green",
    demo: "/web-design/demo/accountants",
    cover: { src: "/portfolio/accountants.jpg", width: 1440, height: 900 },
    archetype: "split",
    palette: {
      light: true,
      bg: "#f4f2ec",
      surface: "#ffffff",
      line: "#e2ded2",
      ink: "#15201c",
      sub: "#565f59",
      accent: "#1f5c46",
      accentInk: "#ffffff",
      glow: "rgba(31,92,70,0.12)",
    },
    mock: {
      brand: "Meridian & Co",
      domain: "meridian.cpa",
      nav: ["Services", "Industries", "Insights", "Contact"],
      eyebrow: "Chartered Accountants",
      headlineLines: ["Numbers handled.", "So you can build", "what's next."],
      sub: "Proactive accounting and tax for founders and established firms. Fixed fees, real-time dashboards, and an advisor who actually picks up the phone.",
      cta: "Book a consultation",
      ctaSecondary: "See our services",
      proof: [
        { v: "£3.2m", k: "tax saved for clients" },
        { v: "48 hr", k: "response guarantee" },
        { v: "300+", k: "businesses supported" },
      ],
      features: [
        { title: "Tax", note: "Planning, not just filing" },
        { title: "Advisory", note: "Board-ready reporting" },
        { title: "Cloud", note: "Live Xero dashboards" },
      ],
    },
    brief:
      "An accountant is asking you to trust them with the numbers that keep the lights on, so the site has to feel calm and sure of itself. We wanted 'established' without the dated beige, and the cloud-first, advisory side of the firm made obvious rather than left to a services list.",
    audience:
      "Founders and finance leads deciding who gets their books. They're weighing whether the firm is rigorous, whether it'll actually reply, and whether it's a step up from whoever did the accounts last year.",
    rationale:
      "The hero splits in two: a plain, confident line on one side, a live-looking figures panel on the other, so the cloud-first bit is shown rather than claimed. Deep ledger green on warm paper feels trustworthy and adult, and stays well clear of the tired corporate blue every other firm reaches for.",
    sections: [
      {
        title: "The headline sits next to the numbers",
        body: "Straight-talking copy on one side, a tidy figures panel on the other. 'Numbers handled' is a lot easier to believe when there's a dashboard right beside it proving the point.",
      },
      {
        title: "Fixed fees, said early",
        body: "The main reason people bounce off an accountant's site is wondering what it'll cost. So the fixed-fee message gets room near the top rather than hiding behind a 'contact us for pricing'.",
      },
      {
        title: "Pick your sector",
        body: "Founders, trades and professional-services firms each get their own way in, so a visitor lands on proof about businesses like theirs instead of a one-size pitch.",
      },
    ],
    metrics: [
      { value: "Fixed fee", label: "The cost question, answered up top" },
      { value: "Live figures", label: "A real dashboard, not a stock spreadsheet" },
      { value: "Uncluttered", label: "Calm palette, nothing shouting for attention" },
    ],
  },

  /* ---- Plumbers ------------------------------------------------ */
  {
    slug: "plumbers",
    name: "Plumbers",
    singular: "Plumber",
    forLabel: "For Plumbers",
    category: "trades",
    positioning:
      "Same-day reassurance for a homeowner watching water spread across the floor.",
    featured: false,
    accentName: "Mains Teal",
    demo: "/web-design/demo/plumbers",
    cover: { src: "/portfolio/plumbers.jpg", width: 1440, height: 900 },
    archetype: "spotlight",
    palette: {
      light: false,
      bg: "#0c1420",
      surface: "#13202f",
      line: "#1f3346",
      ink: "#eef5fb",
      sub: "#8ba3ba",
      accent: "#23c1a6",
      accentInk: "#08110f",
      glow: "rgba(35,193,166,0.18)",
    },
    mock: {
      brand: "Northline",
      domain: "northlineplumbing.com",
      nav: ["Services", "Emergency", "Boilers", "Contact"],
      eyebrow: "Gas Safe Registered · Same Day",
      headlineLines: ["Leaks stopped.", "Homes protected.", "Same day."],
      sub: "Local plumbing and heating you can actually get hold of. No call-out fee, fixed quotes, and engineers who tidy up after themselves.",
      cta: "Book an engineer",
      ctaSecondary: "Emergency line",
      proof: [
        { v: "No fee", k: "for call-outs" },
        { v: "4.9★", k: "on Google" },
        { v: "Gas Safe", k: "registered" },
      ],
      features: [
        { title: "Emergency", note: "Burst & leak repair" },
        { title: "Boilers", note: "Service & install" },
        { title: "Bathrooms", note: "Full fit-outs" },
      ],
    },
    brief:
      "This one's built for the 'emergency plumber near me' search, made at the worst possible moment. At that point nobody cares how slick the site is. They want to know you'll come today, roughly what it'll cost, and that a real person will pick up.",
    audience:
      "Two kinds of visitor. Someone standing over a spreading leak right now, and someone calmly planning a new bathroom who's judging you on whether you'll turn up on time and clean up after yourself.",
    rationale:
      "Deep navy with a teal accent reads as water and a steady pair of hands. Both jobs, the burst pipe now and the bathroom next month, sit one tap away, so the site works whether someone's panicking or just browsing.",
    sections: [
      {
        title: "A hero for the worst moment",
        body: "A big emergency number and a 'no call-out fee' line handle the two things running through someone's head, can I get hold of anyone and is this about to cost me a fortune, before they've scrolled an inch.",
      },
      {
        title: "Repairs and installs kept apart",
        body: "Emergencies, boilers and bathrooms each get their own space, so the boiler swaps and bathroom fit-outs, the jobs worth real money, don't get lost under a pile of leak repairs.",
      },
    ],
    metrics: [
      { value: "One tap", label: "Emergency line, never off the screen" },
      { value: "No call-out fee", label: "The money worry, gone before the scroll" },
    ],
  },

  /* ---- Law Firms ----------------------------------------------- */
  {
    slug: "law-firms",
    name: "Law Firms",
    singular: "Law Firm",
    forLabel: "For Law Firms",
    category: "professional",
    positioning:
      "Serious enough for a bet-the-company decision, human enough that you'd actually want to phone them.",
    featured: false,
    accentName: "Oxblood",
    demo: "/web-design/demo/law-firms",
    cover: { src: "/portfolio/law-firms.jpg", width: 1440, height: 900 },
    archetype: "editorial",
    palette: {
      light: true,
      bg: "#f6f4ef",
      surface: "#ffffff",
      line: "#e4ddd0",
      ink: "#1a1712",
      sub: "#5a544a",
      accent: "#7c2d2d",
      accentInk: "#ffffff",
      glow: "rgba(124,45,45,0.1)",
    },
    mock: {
      brand: "Halstead Law",
      domain: "halsteadlaw.com",
      nav: ["Expertise", "People", "Insights", "Contact"],
      eyebrow: "Commercial & Private Client",
      headlineLines: ["Decisive counsel", "for high-stakes", "moments."],
      sub: "A modern firm with old-fashioned judgement. Clear advice, senior attention on every matter, and fees agreed before we start.",
      cta: "Request a consultation",
      ctaSecondary: "Our expertise",
      proof: [
        { v: "40 yrs", k: "combined practice" },
        { v: "Tier 1", k: "ranked team" },
        { v: "Fixed", k: "fees agreed upfront" },
      ],
      features: [
        { title: "Corporate", note: "Deals & disputes" },
        { title: "Property", note: "Commercial & residential" },
        { title: "Private", note: "Wills, trusts, estates" },
      ],
    },
    brief:
      "Law firm sites tend to be either stuffy or cold, sometimes both. We wanted one that still feels weighty and serious about results but comes across as a firm you could phone without bracing yourself first.",
    audience:
      "People at a genuine fork in the road: a business deal, a dispute, an estate to sort out. They're quietly sizing the firm up on credibility and discretion, and on whether the lawyers will talk to them like adults.",
    rationale:
      "Serif type on warm paper with a restrained oxblood accent does the 'established and confident' work on its own. Naming the actual people and laying the practice areas out plainly keeps it from sliding into faceless corporate.",
    sections: [
      {
        title: "A measured opening",
        body: "A calm headline and plenty of breathing room set the tone before a line of copy does. The 'request a consultation' button is always there, but it never nags.",
      },
      {
        title: "Straight to the right practice",
        body: "Each practice area is a clear route in, so a property client and a corporate client both reach relevant work fast, without hunting through a drop-down maze.",
      },
    ],
    metrics: [
      { value: "Senior attention", label: "Signalled from the first line" },
      { value: "Fees agreed first", label: "Cost certainty, not a nasty surprise" },
    ],
  },

  /* ---- Dental Practices ---------------------------------------- */
  {
    slug: "dental-practices",
    name: "Dental Practices",
    singular: "Dental Practice",
    forLabel: "For Dental Practices",
    category: "health",
    positioning:
      "For the practice that's genuinely good with nervous patients: a site that lowers the blood pressure and makes booking painless.",
    featured: false,
    accentName: "Clinic Teal",
    demo: "/web-design/demo/dental-practices",
    cover: { src: "/portfolio/dental-practices.jpg", width: 1440, height: 900 },
    archetype: "split",
    palette: {
      light: true,
      bg: "#f4faf9",
      surface: "#ffffff",
      line: "#dceeeb",
      ink: "#13201f",
      sub: "#4f6360",
      accent: "#12b3a6",
      accentInk: "#ffffff",
      glow: "rgba(18,179,166,0.14)",
    },
    mock: {
      brand: "Brightwell",
      domain: "brightwelldental.com",
      nav: ["Treatments", "New Patients", "Prices", "Book"],
      eyebrow: "Private & NHS · Anxious-Patient Friendly",
      headlineLines: ["A calmer kind", "of dental care."],
      sub: "Gentle, modern dentistry in a spa-like setting. Transparent prices, easy online booking, and a team that's genuinely good with nervous patients.",
      cta: "Book online",
      ctaSecondary: "See prices",
      proof: [
        { v: "Same week", k: "new-patient appts" },
        { v: "0% finance", k: "on treatment plans" },
        { v: "1,100+", k: "5-star reviews" },
      ],
      features: [
        { title: "General", note: "Check-ups & hygiene" },
        { title: "Cosmetic", note: "Whitening & aligners" },
        { title: "Implants", note: "Permanent solutions" },
      ],
    },
    brief:
      "Two things keep people out of the dentist's chair: nerves, and the faff of booking. The whole site is built to take the edge off both, calm to look at and only a few clicks from landing to an appointment.",
    audience:
      "Nervous patients who've been putting it off, and busy parents fitting checkups around everything else. They choose on how calm the place feels, whether the prices are upfront, and how little effort booking takes.",
    rationale:
      "Plenty of white space and a soft teal keep it clean and calm, so you trust it without that cold clinical shiver. Online booking and visible prices get pushed to the front, because that's exactly where a nervous patient gives up and closes the tab.",
    sections: [
      {
        title: "Reassurance before treatments",
        body: "A gentle headline and an 'anxious-patient friendly' badge speak to the real reason someone's hesitating, before the site starts listing crowns and implants at them.",
      },
      {
        title: "Booking without the phone call",
        body: "A 'book online' button that's always in reach, and prices you can see without filling in a form. That's the two biggest hesitations dealt with: the awkward call and the fear of a mystery bill.",
      },
    ],
    metrics: [
      { value: "Book online", label: "No awkward phone call required" },
      { value: "Prices shown", label: "Out in the open, not behind a form" },
    ],
  },

  /* ---- Kitchens ------------------------------------------------ */
  {
    slug: "kitchens",
    name: "Kitchens",
    singular: "Kitchen",
    forLabel: "For Kitchens",
    category: "hospitality",
    positioning:
      "Makes the food impossible to resist, then takes the order direct, so the kitchen keeps the margin a delivery app would have skimmed.",
    featured: false,
    accentName: "Ember",
    demo: "https://a-la-parrilla-kitchen.vercel.app/",
    cover: { src: "/portfolio/kitchens.jpg", width: 1440, height: 900 },
    archetype: "spotlight",
    palette: {
      light: false,
      bg: "#17110e",
      surface: "#211812",
      line: "#33261d",
      ink: "#f7ece0",
      sub: "#bfa793",
      accent: "#e0663b",
      accentInk: "#1a0f08",
      glow: "rgba(224,102,59,0.2)",
    },
    mock: {
      brand: "A La Parrilla",
      domain: "alaparrilla.co.uk",
      nav: ["Menu", "Order", "How it works", "Find us"],
      eyebrow: "Colombian Smokehouse · Birmingham",
      headlineLines: ["Real fire.", "Real smoke.", "Colombian soul."],
      sub: "Slow-smoked brisket, crispy pork belly and Colombian empanadas, cooked over real fire. Delivery and collection only. Order direct and skip the extra fees.",
      cta: "Order online",
      ctaSecondary: "See the menu",
      proof: [
        { v: "Order direct", k: "skip the app fees" },
        { v: "4.9★", k: "on Google" },
        { v: "Wed–Sun", k: "from 5pm" },
      ],
      features: [
        { title: "Menu", note: "Smokehouse favourites" },
        { title: "Order", note: "Delivery & collection" },
        { title: "Direct", note: "No middleman fees" },
      ],
    },
    brief:
      "People decide what to eat tonight on their phone, already hungry. For a delivery-and-collection kitchen the site has one job: make the food impossible to scroll past, then take the order directly, so the kitchen keeps the margin a delivery app would have skimmed off the top.",
    audience:
      "Hungry locals ordering for tonight, mostly mid-scroll on the sofa. They decide in under a minute, and given the choice they'd rather order straight from the kitchen than pay a delivery app's mark-up.",
    rationale:
      "A warm, low-lit palette and an ember accent make the food the whole page. Ordering is the single hero action. There's no table to book, just the shortest possible path from a photo of the brisket to a placed order.",
    sections: [
      {
        title: "Appetite-first hero",
        body: "A full-bleed hero built to hold real photography of the food coming off the grill, with 'order online' sitting on top as the one thing you can't miss.",
      },
      {
        title: "Order direct, skip the fees",
        body: "The menu and the order flow stay a thumb's reach away the whole way down, and the site nudges people to order direct rather than through an app, so more of every order stays with the kitchen.",
      },
    ],
    metrics: [
      { value: "Order direct", label: "No third-party commission skimmed" },
      { value: "Photo-first", label: "Built around real food, not clip art" },
    ],
  },
];

/* ---------------------------------------------------------------- */
/*  Lookups                                                          */
/* ---------------------------------------------------------------- */

export function getNiche(slug: string): Niche | undefined {
  return NICHES.find((n) => n.slug === slug);
}

export function allSlugs(): string[] {
  return NICHES.map((n) => n.slug);
}

/** Prev/next neighbours (wrapping) for the detail pager. */
export function adjacentNiches(slug: string): { prev: Niche; next: Niche } | null {
  const i = NICHES.findIndex((n) => n.slug === slug);
  if (i === -1) return null;
  const prev = NICHES[(i - 1 + NICHES.length) % NICHES.length];
  const next = NICHES[(i + 1) % NICHES.length];
  return { prev, next };
}
