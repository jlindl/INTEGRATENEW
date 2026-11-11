/**
 * Every fact the page states, in one place.
 *
 * Source of truth: the live Integrate site (read 11 November 2026) —
 * the /web-design portal, /web-design/pricing, the sector pages, /contact and
 * the company details in the site footer. Nothing here is invented: if a
 * figure, client or sentence is not published there, it is not on this page.
 *
 * Two deliberate omissions:
 *  - Client quotes. The live /testimonials page marks its quotes as
 *    placeholders "replaced with each client's own words before launch", so
 *    none are repeated here, and neither are the result claims paraphrased
 *    from them. Client cards say what was built, which the live site shows.
 *  - Golden Days. A real Integrate client, but the work was outbound SMS and
 *    email hosting rather than web design, so it is not in this showcase.
 */

/** Paths are site-relative: the portal is served from the live site itself. */
export const LIVE_SITE = "";

/* ------------------------------------------------------------------ Contact */

export const CONTACT = {
  email: "sales@integrate.co.uk",
  whatsappDisplay: "07765 977085",
  whatsappHref:
    "https://wa.me/447765977085?text=Hi%20Integrate%2C%20I'd%20like%20to%20talk%20about%20a%20project.",
  /** The live call-back form. This page has no backend of its own. */
  bookHref: `${LIVE_SITE}/contact#book`,
  mainSite: "/",
  instagram: "https://www.instagram.com/integrate_tech",
  linkedin: "https://www.linkedin.com/company/integrate-tech/",
  tiktok: "https://www.tiktok.com/@integrate.ai",
} as const;

export const COMPANY = {
  legalName: "Integrate AI Solutions Limited",
  registration:
    "Registered in England and Wales, company no. 17340859. Registered office: 6 Aycliffe Drive, Chorley PR7 7GD.",
  legalLinks: [
    { label: "Privacy Policy", href: `${LIVE_SITE}/legal/privacy` },
    { label: "Terms & Conditions", href: `${LIVE_SITE}/legal/terms` },
    { label: "Cookie Policy", href: `${LIVE_SITE}/legal/cookies` },
    { label: "Accessibility", href: `${LIVE_SITE}/legal/accessibility` },
  ],
} as const;

/* ------------------------------------------------------------------ Pricing */

export const PRICING = {
  buildFrom: 200,
  monthly: 30,
  editMinutes: 30,
  build: [
    "A design built around how your business actually sells",
    "Works properly on phones, and loads quickly",
    "A hand with the words and layout so it reads well from day one",
    "Set up, launched, and handed over ready to go",
  ],
  care: [
    "Fast, secure hosting, with SSL, backups and updates included",
    "Up to 30 minutes of edits every month",
    "Small changes done for you: new hours, prices, photos, text",
    "Someone on hand when something needs updating",
  ],
  finePrint:
    "The £200 is a starting point; the exact build fee depends on how many pages and features you need. Anything beyond the 30 monthly minutes is always quoted up front, so there are never surprise charges.",
  bigger: [
    {
      title: "Mobile apps",
      body: "Native iOS & Android or installable web apps for ordering, loyalty, booking and live tracking.",
    },
    {
      title: "Client portals",
      body: "Secure logins, dashboards, documents and payments for your customers or your team.",
    },
    {
      title: "Integrated systems & complex sites",
      body: "Bookings, CRMs, stock, payments and automations wired together into one place.",
    },
  ],
} as const;

/* ------------------------------------------------------- Live client builds */

export type ClientBuild = {
  name: string;
  /** What the client does. */
  sector: string;
  /** What Integrate did for them, as labelled on the live site. */
  service: string;
  domain: string;
  href: string;
  /** Screenshot of the live site, from integrate-tech.co.uk/media/proof. */
  image: string;
  /** What was built — no outcome claims (see the note at the top). */
  blurb: string;
};

export const CLIENTS: ClientBuild[] = [
  {
    name: "Allied Insurance",
    sector: "Commercial insurance",
    service: "Web design + automation",
    domain: "alliedinsurance.co.uk",
    href: "https://www.alliedinsurance.co.uk/",
    image: "/media/proof/allied-insurance.webp",
    blurb:
      "Rebuilt the site to match the calibre of cover they write, then wired the quote forms into their workflow.",
  },
  {
    name: "Polished Insurance",
    sector: "Insurance broking",
    service: "Web design",
    domain: "polished-insurance.co.uk",
    href: "https://www.polished-insurance.co.uk/",
    image: "/media/proof/polished-insurance.webp",
    blurb:
      "An instant-quote flow that lets cleaners price and buy cover in minutes, at any hour.",
  },
  {
    name: "Ramsay Timber",
    sector: "Timber supply",
    service: "Web design",
    domain: "ramsaytimber.co.uk",
    href: "https://www.ramsaytimber.co.uk/",
    image: "/media/proof/ramsay-timber.webp",
    blurb:
      "Gave forty years of trade a shopfront to match, where trade buyers find the exact product fast.",
  },
  {
    name: "CloudKicks",
    sector: "Footwear",
    service: "E-commerce",
    domain: "cloudkicks.store",
    href: "https://www.cloudkicks.store/",
    image: "/media/proof/cloudkicks.webp",
    blurb: "An e-commerce storefront for a streetwear and footwear brand.",
  },
  {
    name: "PoundMart",
    sector: "Value retail",
    service: "E-commerce + automation",
    domain: "poundmart.co.uk",
    href: "https://www.poundmart.co.uk/",
    image: "/media/proof/poundmart.webp",
    blurb: "E-commerce and automation for a value retailer.",
  },
  {
    name: "ModelMentions",
    sector: "AI analytics",
    service: "Web design",
    domain: "modelmentions.co.uk",
    href: "https://www.modelmentions.co.uk/",
    image: "/media/proof/modelmentions.webp",
    blurb:
      "Turned a genuinely technical product into something people grasp in seconds.",
  },
];

/* -------------------------------------------------------- Builds by sector */

export const SECTOR_FILTERS = [
  "All work",
  "Trades",
  "Professional",
  "Health",
  "Hospitality",
  "Clothing",
] as const;

export type SectorFilter = (typeof SECTOR_FILTERS)[number];

export type SectorBuild = {
  name: string;
  /** e.g. "Electrician website" */
  kind: string;
  group: Exclude<SectorFilter, "All work">;
  /**
   * "demo" — a working demo Integrate built to show what it would make for
   * that sector; the business is fictional. "client" — a real client's site.
   */
  status: "demo" | "client";
  /** One line on the thinking, from the build's own page on the live site. */
  pitch: string;
  /** Where the build actually lives (shown in the card's address bar). */
  address: string;
  href: string;
  /** The write-up of the brief, where one exists. */
  brief?: string;
  image: string;
};

const demo = (slug: string) => ({
  address: `integrate-tech.co.uk/web-design/demo/${slug}`,
  href: `${LIVE_SITE}/web-design/demo/${slug}`,
  brief: `${LIVE_SITE}/web-design/${slug}`,
  image: `/portfolio/${slug}.jpg`,
});

export const SECTOR_BUILDS: SectorBuild[] = [
  {
    name: "Voltedge",
    kind: "Electrician website",
    group: "Trades",
    status: "demo",
    pitch:
      "The site an electrician needs for the moment someone's fuse box has just died and they're phoning whoever answers first.",
    ...demo("electricians"),
  },
  {
    name: "Ascend Talent",
    kind: "Recruiter website",
    group: "Professional",
    status: "demo",
    pitch:
      "The anti-spam recruitment site: it reads like a firm you'd actually hand a brief to, not another agency filling your inbox.",
    ...demo("recruiters"),
  },
  {
    name: "Meridian & Co",
    kind: "Accountant website",
    group: "Professional",
    status: "demo",
    pitch:
      "Calm and precise, so a founder handing over their books feels like they've finally picked the grown-up option.",
    ...demo("accountants"),
  },
  {
    name: "Northline",
    kind: "Plumber website",
    group: "Trades",
    status: "demo",
    pitch:
      "Same-day reassurance for a homeowner watching water spread across the floor.",
    ...demo("plumbers"),
  },
  {
    name: "Halstead Law",
    kind: "Law firm website",
    group: "Professional",
    status: "demo",
    pitch:
      "Serious enough for a bet-the-company decision, human enough that you'd actually want to phone them.",
    ...demo("law-firms"),
  },
  {
    name: "Brightwell",
    kind: "Dental practice website",
    group: "Health",
    status: "demo",
    pitch:
      "For the practice that's genuinely good with nervous patients: a site that lowers the blood pressure and makes booking painless.",
    ...demo("dental-practices"),
  },
  {
    name: "A La Parrilla",
    kind: "Kitchen website",
    group: "Hospitality",
    status: "demo",
    pitch:
      "Makes the food impossible to resist, then takes the order direct, so the kitchen keeps the margin a delivery app would have skimmed.",
    address: "a-la-parrilla-kitchen.vercel.app",
    href: "https://a-la-parrilla-kitchen.vercel.app/",
    brief: `${LIVE_SITE}/web-design/kitchens`,
    image: "/portfolio/kitchens.jpg",
  },
  {
    name: "Cloud Kicks",
    kind: "Streetwear & footwear store",
    group: "Clothing",
    status: "client",
    pitch: "A live e-commerce store — the one client build in this set.",
    address: "cloudkicks.store",
    href: "https://www.cloudkicks.store/",
    image: "/portfolio/cloud-kicks.jpg",
  },
];

/** "We build websites and mobile apps for pretty much any business." */
export const ANY_BUSINESS: [string[], string[]] = [
  [
    "Electricians",
    "Recruiters",
    "Accountants",
    "Plumbers",
    "Law Firms",
    "Dental Practices",
    "Kitchens",
    "Roofers",
    "Landscapers",
    "Gyms & Studios",
    "Hair & Beauty",
    "Estate Agents",
    "Architects",
    "Consultants",
  ],
  [
    "Physiotherapists",
    "Opticians",
    "Veterinary",
    "Cafés & Bars",
    "Removals",
    "Cleaning Services",
    "HVAC",
    "Solar Installers",
    "Driving Schools",
    "Wedding Venues",
    "Coaches",
    "Ecommerce Brands",
    "SaaS Startups",
  ],
];

/* ------------------------------------------------------------ Front & back */

export const FRONTEND = [
  {
    title: "Custom, responsive design",
    body: "Layouts built by hand, never a template, and right on every screen size.",
  },
  {
    title: "Motion & interaction",
    body: "Just enough animation to guide the eye, never the kind that makes a page feel heavy.",
  },
  {
    title: "Core Web Vitals",
    body: "Built to load quickly. A fast site keeps people around; a slow one loses them before they start.",
  },
  {
    title: "Accessible by default",
    body: "Semantic, keyboard-friendly and WCAG-minded from the very first line.",
  },
  {
    title: "Editable content",
    body: "A clean CMS so your team can update copy and images without a developer.",
  },
  {
    title: "SEO-ready markup",
    body: "Clean structure, metadata and schema that search engines actually reward.",
  },
] as const;

export const BACKEND = [
  {
    title: "Shopify & commerce",
    body: "Custom storefronts, headless Shopify and checkout flows tuned to convert.",
  },
  {
    title: "Payments & subscriptions",
    body: "Stripe, recurring billing, invoicing and secure, compliant checkout.",
  },
  {
    title: "Bookings & scheduling",
    body: "Real-time availability, calendars and automated confirmations end to end.",
  },
  {
    title: "CRM & automation",
    body: "Leads routed straight into your CRM, with follow-up handled automatically.",
  },
  {
    title: "Custom APIs & integrations",
    body: "Connect the tools you already run into one system that talks to itself.",
  },
  {
    title: "Portals, databases & auth",
    body: "Accounts, client dashboards and admin tools built on solid foundations.",
  },
] as const;

/* --------------------------------------------------------------- The studio */

export const STUDIO = [
  {
    title: "Start From How the Business Wins",
    body: "Every layout begins with how that particular company actually gets customers. The polish comes after, once the structure is doing its job.",
  },
  {
    title: "Let the Work Carry the Page",
    body: "Fast-loading, image-led pages with room to breathe. We keep the interface quiet so the design itself is the thing you notice.",
  },
  {
    title: "Part of Integrate",
    body: "The same team that builds custom AI systems for growing B2B companies, now designing the websites that sit in front of them.",
  },
] as const;

/* ---------------------------------------------------------------------- FAQ */

export const FAQ = [
  {
    q: "How much does a website cost?",
    a: "From a £200 one-off build fee, then £30 a month. The exact build fee depends on how many pages and features you need. Bigger builds with portals or integrations are quoted per project.",
  },
  {
    q: "What does the £30 a month cover?",
    a: "Fast, secure hosting with SSL, backups and updates, plus up to 30 minutes of edits every month — new hours, prices, photos, text. Anything beyond the 30 minutes is always quoted up front.",
  },
  {
    q: "Can you work with my existing domain?",
    a: "Yes. We can rebuild on your current domain and redirect old pages so you keep any search visibility you already have.",
  },
  {
    q: "Do you write the content?",
    a: "We help shape it from what you tell us about your work, and use your real photos wherever possible.",
  },
  {
    q: "Do you only build for trades?",
    a: "No. We build websites and mobile apps for pretty much any business, shaped around how your customers actually decide and buy.",
  },
  {
    q: "What happens on the call?",
    a: "Leave your details and we call you back within one business day to set up a 30-minute call. No pitch, no pressure, just a clear plan.",
  },
] as const;
