/**
 * Homepage film: every word, link and media reference in one place.
 *
 * Headlines mark their one accent word with *asterisks*; <Em> renders it in
 * Fraunces italic.
 *
 * HONESTY RULES (see direction.md):
 *  - No stats, timescales, reply speeds, guarantees or contract terms unless
 *    Jack has confirmed them. Statements here either describe what the system
 *    does, or repeat what the site already publishes (/contact, /services/*).
 *  - Conversations, times, dashboards and forms are EXAMPLES of how the
 *    system works, and the page labels them as examples. None is a real
 *    customer, a real message or a result.
 *  - GENERATED MEDIA: everything under /media/film/ was generated with
 *    Higgsfield and is a STAND-IN for atmosphere only (tools, materials, a
 *    bench). None of it shows real work, a real client or a real result.
 *  - REAL MEDIA: everything under /media/proof/ is a real screenshot of a live
 *    client site, captured 2026-11-10. /portfolio/plumbers.jpg is Integrate's
 *    own published demo build, labelled as a demo.
 */

export const CONTACT = {
  bookHref: "/contact#book",
  bookLabel: "Book a free call",
  email: "sales@integrate.co.uk",
  whatsappHref:
    "https://wa.me/447765977085?text=" +
    encodeURIComponent("Hi Integrate, I'd like to talk about my business."),
  whatsappDisplay: "07765 977085",
};

/** Generated stand-ins. `generated: true` is the marker the brief asks for. */
export const MEDIA = {
  phoneWide: { src: "/media/film/hero-phone-16x9.webp", w: 2400, h: 1357, generated: true },
  phoneTall: { src: "/media/film/hero-phone-tall.webp", w: 1200, h: 1600, generated: true },
  orderWide: { src: "/media/film/bench-order-16x9.webp", w: 2400, h: 1357, generated: true },
  orderTall: { src: "/media/film/bench-order-9x16.webp", w: 1200, h: 2122, generated: true },
  /** Used inside example conversations and ad mock-ups as "a photo of the job". */
  jobPhoto: { src: "/media/film/trade-plumbing-4x5.webp", w: 1200, h: 1500, generated: true },
  adPhoto: { src: "/media/film/trade-electrical-16x9.webp", w: 2400, h: 1357, generated: true },
} as const;

/** Generated loops (image-to-video from the stills above). Stand-ins too. */
export const LOOPS = {
  phone: {
    wide: { mp4: "/media/film/hero-phone-16x9.mp4", webm: "/media/film/hero-phone-16x9.webm" },
    tall: { mp4: "/media/film/hero-phone-tall.mp4", webm: "/media/film/hero-phone-tall.webm" },
  },
  order: {
    wide: { mp4: "/media/film/bench-order-16x9.mp4", webm: "/media/film/bench-order-16x9.webm" },
    tall: { mp4: "/media/film/bench-order-9x16.mp4", webm: "/media/film/bench-order-9x16.webm" },
  },
} as const;

/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "AI automation · Lead generation · Web design",
  h1: ["Missed calls answered.", "Quotes sent.", "Jobs *booked.*"],
  sub: "Integrate builds the systems that pick up what slips while you are on the tools. For trades and service businesses across the UK.",
  facts: ["WhatsApp, website and calendar", "Built and managed for you", "Call back within one business day"],
  /** Example conversation on the hero phone. */
  phone: {
    business: "Your business",
    status: "AI assistant · online",
    note: "Example conversation",
    pill: "Missed call · 07:48",
    thread: [
      { from: "us", text: "Sorry we missed you, we're on a job. What do you need doing?" },
      { from: "them", text: "Boiler's stopped. No hot water." },
      { from: "them", photo: true },
      { from: "us", text: "Thanks for the photo. Is it a combi?" },
      { from: "them", text: "Yes, combi" },
      { from: "us", text: "I can book an engineer to take a look. Thursday 9am or Friday 2pm?" },
      { from: "them", text: "Thursday please" },
    ],
    booked: "Booked · Thu 09:00 · Survey visit",
  },
  cards: {
    missed: { kind: "Missed call", text: "Replied on WhatsApp" },
    checks: { title: "Lead qualified", items: ["Job type", "Area covered", "Timing", "Photo"] },
    calendar: { day: "Thu", time: "09:00", text: "Survey visit", by: "Booked by your assistant" },
  },
};

/** Illustrative phone clutter. Scenario props, not claims. */
export const NOISE = {
  eyebrow: "The noise",
  title: ["You're on the tools.", "The phone *isn't.*"],
  body: "Calls ring out. WhatsApps sit unread. The quote you meant to send is still in your head, and last month's invoice is still unpaid. None of it is hard. There's just nobody to do it.",
  chips: [
    { kind: "Missed call", text: "Unknown number" },
    { kind: "WhatsApp", text: "Are you free to quote this week?" },
    { kind: "Voicemail", text: "New message" },
    { kind: "To do", text: "Send the quote" },
    { kind: "Invoice", text: "Still unpaid" },
    { kind: "Missed call", text: "Same number again" },
    { kind: "Enquiry", text: "Website form" },
    { kind: "WhatsApp", text: "Did you get my message?" },
  ],
  /**
   * One illustrative working day. The times are scenery, not a claim about
   * anyone's business: they set the clock that runs down the beat.
   */
  status: "On site · Phone face down",
  tallyLabel: "Unanswered",
  dayStart: "07:00",
  dayEnd: "18:30",
  day: [
    { time: "07:48", kind: "Missed call", text: "Unknown number", icon: "call" },
    { time: "08:15", kind: "WhatsApp", text: "Are you free to quote this week?", icon: "chat" },
    { time: "10:02", kind: "Voicemail", text: "New message", icon: "voicemail" },
    { time: "11:37", kind: "Enquiry", text: "Website form", icon: "form" },
    { time: "13:10", kind: "Missed call", text: "Same number again", icon: "call" },
    { time: "15:26", kind: "WhatsApp", text: "Did you get my message?", icon: "chat" },
    { time: "17:55", kind: "Invoice", text: "Last month's, still unpaid", icon: "invoice" },
  ],
} as const;

export const TURN = {
  before: "Every one of these could be a job.",
  eyebrow: "The turn",
  title: "Integrate turns the mess into a *system.*",
  status: "System running",
  /**
   * The same day, handled. Each step shows what came in, what the system
   * did, and an example of it. Examples, not results.
   */
  ordered: [
    { was: "Missed call", label: "Call answered", demo: "reply", text: "Sorry we missed you. What's the job?" },
    { was: "Quote request", label: "Quote sent", demo: "quote", text: "Quote ready to send" },
    { was: "Website form", label: "Job booked", demo: "calendar", text: "Survey visit" },
    { was: "Unpaid invoice", label: "Invoice chased", demo: "reminder", text: "Reminder sent" },
  ],
  /** The noise beat's day, replayed as a system log. */
  log: [
    ["07:48", "Missed call", "WhatsApp reply sent"],
    ["08:15", "Quote request", "Questions asked"],
    ["10:02", "Voicemail", "Call-back booked"],
    ["11:37", "Website form", "Survey booked"],
    ["13:10", "Missed call", "Matched to enquiry"],
    ["15:26", "Follow-up", "Answered"],
    ["17:55", "Invoice", "Reminder sent"],
  ],
} as const;

export const SYSTEM = {
  eyebrow: "The system",
  title: "Three systems. *One line* from enquiry to booked job.",
  stations: [
    {
      id: "SYS.01",
      slug: "integrate/agents",
      name: "AI automation *and agents.*",
      body: "An AI agent replies on WhatsApp and your website in your business's name, asks the questions you would ask, and books the good ones into your calendar. Quotes, follow-ups and invoice chasers go out without you.",
      tags: ["WhatsApp", "Website chat", "Calendar", "Hands over to you"],
      href: "/services/ai-automation",
      linkLabel: "How AI automation works",
      more: [
        { label: "AI WhatsApp assistant", href: "/services/ai-whatsapp-assistant" },
        { label: "AI website chatbot", href: "/services/ai-chatbot" },
      ],
    },
    {
      id: "SYS.02",
      slug: "integrate/leads",
      name: "Lead *generation.*",
      body: "Facebook and Instagram ads shown to people in the area you cover, sent to a short form, then followed up on WhatsApp straight away. You turn up to quotes rather than chasing people who went cold.",
      tags: ["Facebook", "Instagram", "Instant form", "WhatsApp follow-up"],
      href: "/services/lead-generation",
      linkLabel: "How lead generation works",
      more: [{ label: "Facebook ads for trades", href: "/services/facebook-ads" }],
    },
    {
      id: "SYS.03",
      slug: "integrate/web",
      name: "Web *design.*",
      body: "A fast site built around the jobs you want more of, with the enquiry routes wired into the same system. So the people who look you up can book, not just browse.",
      tags: ["Design", "Build", "Enquiry routing", "Managed for you"],
      href: "/services/websites-for-trades",
      linkLabel: "Websites for trades",
      more: [
        { label: "Integrate Web Design", href: "/web-design" },
        { label: "Web design pricing", href: "/web-design/pricing" },
      ],
    },
  ],
  /** SYS.01 example: the assistant's inbox. Labelled as an example. */
  inbox: {
    title: "Inbox",
    note: "Example inbox",
    rows: [
      { who: "Boiler, no hot water", via: "WhatsApp", state: "Booked", strong: true },
      { who: "Bathroom refit quote", via: "Website chat", state: "Qualifying" },
      { who: "Leaking radiator valve", via: "WhatsApp", state: "Booked", strong: true },
      { who: "Can you do it cheaper?", via: "WhatsApp", state: "Handed to you" },
      { who: "Landlord safety check", via: "Website form", state: "Qualifying" },
    ],
    handover: { kind: "Handed to you", text: "A question only you should answer" },
    live: { kind: "Website chat", text: "Answered in your business's name" },
  },
  /** SYS.02 example: ad, form, follow-up. Labelled as an example. */
  ad: {
    note: "Example ad and form",
    page: "Your business",
    sponsored: "Sponsored",
    copy: "Electrics playing up? Tell us the job and we'll get back to you today.",
    headline: "Get a quote",
    cta: "Get quote",
    form: [
      ["Name", "Sam"],
      ["Area", "Inside your service area"],
      ["Job", "Consumer unit swap"],
    ],
    follow: "Hi Sam, thanks for the enquiry. When suits for a visit?",
    booked: "Booked into your calendar",
  },
  /** SYS.03 example: an Integrate demo build already published on the site. */
  site: {
    src: "/portfolio/plumbers.jpg",
    label: "Demo build: plumbers",
    href: "/web-design/plumbers",
    toast: { kind: "New enquiry", text: "Sent to your assistant" },
    tags: ["Fast on phones", "Every enquiry routed"],
  },
};

export const TRADES = {
  eyebrow: "Who it is for",
  title: "Built around how your *trade* works.",
  cuts: [
    {
      name: "Plumbers",
      line: "Leaks, boilers and bathrooms, answered while you're under a sink.",
      jobs: ["Leaks", "Bathroom installs", "Radiators", "Emergency call-outs"],
      href: "/web-design/plumbers",
      wide: "/media/film/trade-plumbing-16x9.webp",
      tall: "/media/film/trade-plumbing-4x5.webp",
      /* Where the subject's horizontal line sits in each crop (0 to 1). */
      horizonWide: 0.57,
      horizonTall: 0.5,
    },
    {
      name: "Electricians",
      line: "Rewires, EV chargers and EICRs, booked without the back and forth.",
      jobs: ["Rewires", "Consumer units", "EV chargers", "EICRs"],
      href: "/web-design/electricians",
      wide: "/media/film/trade-electrical-16x9.webp",
      tall: "/media/film/trade-electrical-4x5.webp",
      horizonWide: 0.49,
      horizonTall: 0.5,
    },
    {
      name: "Kitchen fitters",
      line: "Bigger jobs, longer decisions, followed up until they say yes or no.",
      jobs: ["Full installs", "Worktops", "Refurbishments"],
      href: "/web-design/kitchens",
      wide: "/media/film/trade-kitchens-16x9.webp",
      tall: "/media/film/trade-kitchens-4x5.webp",
      horizonWide: 0.53,
      horizonTall: 0.5,
    },
  ],
  alsoLabel: "Also built for",
  also: ["Roofers", "Builders", "Heating engineers", "Joiners", "Landscapers", "Bathroom fitters"],
  alsoHref: "/trades",
  alsoLink: "See how it works for your trade",
};

/** Real clients, real live sites. Descriptions are Integrate's own words. */
export const PROOF = {
  eyebrow: "Real builds",
  title: "Live now, for *real* businesses.",
  body: "These are sites and systems we have built for UK businesses, across insurance, retail, timber supply and more. Each one opens the live site.",
  clients: [
    { name: "Allied Insurance", industry: "Commercial insurance", built: "Web design and automation", url: "https://www.alliedinsurance.co.uk/", host: "alliedinsurance.co.uk", img: "/media/proof/allied-insurance.webp" },
    { name: "Polished Insurance", industry: "Insurance broking", built: "Web design", url: "https://www.polished-insurance.co.uk/", host: "polished-insurance.co.uk", img: "/media/proof/polished-insurance.webp" },
    { name: "Ramsay Timber", industry: "Timber supply", built: "Web design", url: "https://www.ramsaytimber.co.uk/", host: "ramsaytimber.co.uk", img: "/media/proof/ramsay-timber.webp" },
    { name: "CloudKicks", industry: "Footwear", built: "E-commerce", url: "https://www.cloudkicks.store/", host: "cloudkicks.store", img: "/media/proof/cloudkicks.webp" },
    { name: "PoundMart", industry: "Value retail", built: "E-commerce and automation", url: "https://www.poundmart.co.uk/", host: "poundmart.co.uk", img: "/media/proof/poundmart.webp" },
    { name: "ModelMentions", industry: "AI analytics", built: "Web design", url: "https://www.modelmentions.co.uk/", host: "modelmentions.co.uk", img: "/media/proof/modelmentions.webp" },
    { name: "Golden Days", industry: "Benefits advisory", built: "Outbound SMS and email hosting", url: "https://www.golden-days.co.uk/", host: "golden-days.co.uk", img: "/media/proof/golden-days.webp" },
  ],
  allHref: "/testimonials",
  allLabel: "All client work",
};

export const PROCESS = {
  eyebrow: "How it works",
  title: "From first call to a system that *runs.*",
  phases: [
    {
      id: "PHASE 01",
      name: "The call",
      body: "Leave your details and we call you back within one business day to set up a 30-minute call. No pitch, no pressure, just a clear plan.",
      art: "call",
    },
    {
      id: "PHASE 02",
      name: "The plan",
      body: "We look at where enquiries, quotes and admin slip in your business, and show you what we would build first.",
      art: "plan",
    },
    {
      id: "PHASE 03",
      name: "The build",
      body: "We design and build the system and connect it to what you already use: your phone, your WhatsApp, your calendar, your website.",
      art: "build",
    },
    {
      id: "PHASE 04",
      name: "Running",
      body: "We manage and maintain it, so it keeps working while you are on site.",
      art: "run",
    },
  ],
  planItems: ["Missed calls", "Quote follow-ups", "Booking", "Invoice chasing"],
  buildItems: ["Phone", "WhatsApp", "Calendar", "Website"],
  /** Answers taken from what the service pages already publish. */
  questions: [
    {
      q: "What does it cost?",
      a: "It depends on what you need. Web design pricing is published on the site. For automation and lead generation, we talk through cost on the call once we know the job.",
      link: { label: "Web design pricing", href: "/web-design/pricing" },
    },
    {
      q: "How long does it take?",
      a: "It depends on your trade, your area and how your calendar is set up. The call is the quickest way to get a clear answer.",
    },
    {
      q: "Do I need a website first?",
      a: "No. The ads send people to a form inside Facebook or Instagram. A good website helps people who look you up afterwards, but it is not needed to start.",
    },
    {
      q: "Will the AI pretend to be me?",
      a: "It replies on your behalf, in your business's name and tone, asks the questions you agree on, and hands over to you for anything it should not answer.",
    },
  ],
};

export const PAYOFF = {
  eyebrow: "The payoff",
  title: "Book a free *call.*",
  body: "Thirty minutes. We'll look at what's slipping and show you what we would build first.",
  promises: ["Call back within one business day", "30 minutes", "No pitch, no pressure"],
  formSource: "Homepage film: final call",
};
