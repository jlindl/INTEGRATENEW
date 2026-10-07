/**
 * Service hub pages (/services/<id>). One pillar page per service in
 * seo-engine/data/services.json. Each hub explains the service in plain terms
 * and gathers every blog post written about it, so the engine's posts link up
 * to one strong page instead of competing with each other.
 *
 * `postService` must match the `service:` frontmatter the engine writes.
 * Copy follows the engine's rules: no invented stats, results or client names.
 */
import { getAllPosts, type Post } from "./blog";

export type ServiceHub = {
  id: string;
  postService: string;
  /** Short name for nav and cards. */
  name: string;
  /** Page <title> (kept under 60 characters with " | Integrate"). */
  title: string;
  h1: string;
  description: string;
  intro: string[];
  steps: { title: string; text: string }[];
  goodSigns: string[];
  faqs: { q: string; a: string }[];
  /** Also include location posts (they all describe the full lead generation system). */
  includeLocationPosts?: boolean;
};

export const SERVICE_HUBS: ServiceHub[] = [
  {
    id: "lead-generation",
    postService: "Lead generation",
    name: "Lead generation for trades",
    title: "Lead generation for trades and local businesses",
    h1: "Lead generation for trades and local businesses",
    description:
      "How Integrate's lead generation works: local Facebook and Instagram ads, an instant lead form and an AI WhatsApp agent that qualifies and books jobs.",
    intro: [
      "Most tradespeople do not need more clicks. They need more of the right enquiries, answered quickly, from people in the area they actually cover.",
      "Integrate's lead generation system joins three pieces together: ads shown to people near you, a short form that captures the job details, and an AI agent on WhatsApp that replies straight away, asks the questions you would ask, and books the good ones into your calendar.",
    ],
    steps: [
      { title: "Local ads", text: "Facebook and Instagram ads shown only to people in your service area, built around the jobs you want more of." },
      { title: "Instant lead form", text: "Interested people fill in a short form without leaving the app, so the enquiry arrives with a name, number, postcode and job type." },
      { title: "AI follow-up on WhatsApp", text: "Within moments, an AI agent messages the lead, asks about budget, location, timing and the job itself, and filters out poor fits." },
      { title: "Booked into your calendar", text: "Qualified leads are booked straight into your diary, so you turn up to quotes rather than chasing people who went cold." },
    ],
    goodSigns: [
      "Enquiries come from postcodes you actually cover.",
      "Most leads get a reply within minutes, even when you are on a job.",
      "You can see how many leads became booked quotes, not just how many came in.",
    ],
    faqs: [
      { q: "Do I need a website for this to work?", a: "No. The ads send people to an instant form inside Facebook or Instagram. A good website helps people who look you up afterwards, but it is not required to start." },
      { q: "Will the AI agent pretend to be me?", a: "It replies on your behalf in your business's name and tone, asks the qualifying questions you agree on, and hands over to you for anything it should not answer." },
      { q: "How quickly can it be set up?", a: "It depends on your trade, area and calendar setup. The best way to get a clear answer is a short call, where we look at what you want more of." },
    ],
    includeLocationPosts: true,
  },
  {
    id: "facebook-ads",
    postService: "Meta ads",
    name: "Facebook ads for trades",
    title: "Facebook and Instagram ads for tradespeople",
    h1: "Facebook and Instagram ads for tradespeople",
    description:
      "Local Facebook and Instagram ads for trades: targeted to your service area and sent to an instant lead form, so enquiries arrive with the details you need.",
    intro: [
      "Facebook and Instagram are where homeowners in your area spend time. The trick is showing them the right job, in the right postcodes, and making it effortless to enquire.",
      "Integrate runs Meta ads for trades and local businesses that point to an instant lead form rather than a generic homepage, so every enquiry arrives with the details you need to follow up.",
    ],
    steps: [
      { title: "Pick the jobs worth paying for", text: "Ads focus on the work you want more of, not everything you do." },
      { title: "Target your real service area", text: "Ads are shown to people in the towns and postcodes you cover." },
      { title: "Capture the details", text: "An instant form asks for the job type, postcode and timing up front." },
      { title: "Follow up fast", text: "Leads go straight to you, or to an AI WhatsApp agent that replies and books them in." },
    ],
    goodSigns: [
      "Cost per enquiry is tracked, and so is cost per booked quote.",
      "Ads are refreshed regularly with real photos of your work.",
      "Poor-fit enquiries are filtered before they reach your phone.",
    ],
    faqs: [
      { q: "Do Facebook ads work for trades?", a: "They can, when they are shown to the right local audience and paired with fast follow-up. Slow replies are the most common reason leads from ads go nowhere." },
      { q: "Should ads go to my website or a form?", a: "For most trades an instant form inside Facebook or Instagram brings more enquiries, because people do not have to leave the app." },
      { q: "How much should I spend?", a: "It depends on your area, trade and the jobs you want. We talk it through on a call before anything is spent." },
    ],
  },
  {
    id: "ai-whatsapp-assistant",
    postService: "AI WhatsApp lead qualification",
    name: "AI WhatsApp assistant",
    title: "AI WhatsApp assistant for tradespeople",
    h1: "An AI WhatsApp assistant that qualifies your leads",
    description:
      "An AI agent on WhatsApp that replies to every new lead within moments, asks about budget, location, job and timing, and books qualified jobs into your calendar.",
    intro: [
      "The first business to reply usually wins the job. That is hard when you are up a ladder, under a sink or driving between sites.",
      "Integrate's AI WhatsApp assistant messages every new lead within moments, asks the questions you would ask, filters out poor fits and books the good ones straight into your calendar.",
    ],
    steps: [
      { title: "Instant reply", text: "Every new enquiry gets a WhatsApp message within moments, day or night." },
      { title: "Qualifying questions", text: "It asks about budget, location, job type and timing, using the questions you agree on." },
      { title: "Filters poor fits", text: "Jobs outside your area or budget are politely turned away or flagged for you." },
      { title: "Books the job", text: "Qualified leads pick a slot that is free in your calendar." },
    ],
    goodSigns: [
      "No lead waits hours for a first reply.",
      "You see a short summary of each lead before you call.",
      "You can step in and take over a conversation at any time.",
    ],
    faqs: [
      { q: "Does it use my WhatsApp number?", a: "It runs on a WhatsApp Business number set up for your business, so customers see your business name." },
      { q: "What happens if a customer asks something it cannot answer?", a: "It tells them you will follow up and passes the conversation to you with the details so far." },
      { q: "Can it book into my existing calendar?", a: "Yes, it books into the calendar you already use, only into the times you make available." },
    ],
  },
  {
    id: "ai-chatbot",
    postService: "AI website assistant",
    name: "AI website chatbot",
    title: "AI chatbot for trade and local business websites",
    h1: "An AI chatbot for your website that books jobs",
    description:
      "An AI assistant on your website that answers common questions, qualifies visitors and books them in, so website visits turn into enquiries outside working hours.",
    intro: [
      "Most people who visit a trade website leave without getting in touch. Many visit in the evening, when you cannot answer.",
      "Integrate adds an AI assistant to your website that answers common questions, qualifies visitors the same way the WhatsApp agent does, and books them in, so visits turn into enquiries even after hours.",
    ],
    steps: [
      { title: "Answers questions", text: "Areas covered, types of job, how quotes work and what happens next." },
      { title: "Qualifies the visitor", text: "It asks about the job, location, budget and timing." },
      { title: "Books or captures", text: "Good fits are booked in or passed to you with their details." },
      { title: "Hands over cleanly", text: "You get a summary, so your first call starts from where the chat ended." },
    ],
    goodSigns: [
      "Evening and weekend visitors become enquiries.",
      "Answers match what you would actually say.",
      "It never invents prices or promises you would not make.",
    ],
    faqs: [
      { q: "Will a chatbot annoy my visitors?", a: "Not when it is quiet until asked, gives straight answers and makes booking easy. A pushy pop-up is what puts people off." },
      { q: "Does it work on any website?", a: "It can be added to most websites. If your site needs work, Integrate also builds websites for trades." },
      { q: "Can it quote prices?", a: "Only the price guidance you approve. For anything that needs a site visit, it books one rather than guessing." },
    ],
  },
  {
    id: "websites-for-trades",
    postService: "Websites",
    name: "Websites for trades",
    title: "Websites for tradespeople that win enquiries",
    h1: "Websites for tradespeople that win enquiries",
    description:
      "Fast, mobile-first websites for trades and local businesses: clear services and areas, real photos, reviews and obvious ways to get in touch.",
    intro: [
      "A trade website has one job: help someone in your area decide you are the right person and get in touch. Everything else is decoration.",
      "Integrate builds fast, mobile-first websites for tradespeople with clear services, the areas you cover, real photos of your work, reviews and obvious ways to enquire.",
    ],
    steps: [
      { title: "Clear services and areas", text: "Visitors see straight away what you do and where you work." },
      { title: "Proof", text: "Real photos of your jobs and genuine reviews, front and centre." },
      { title: "Easy to enquire", text: "Call, WhatsApp and quote buttons that work on a phone." },
      { title: "Found on Google", text: "Built with the technical basics search engines need from day one." },
    ],
    goodSigns: [
      "Pages load quickly on a phone signal.",
      "Every page has a clear next step.",
      "You can see how many enquiries the site brings in.",
    ],
    faqs: [
      { q: "How much does a trade website cost?", a: "See our web design pricing page for current packages. Bigger builds with portals or integrations are quoted per project." },
      { q: "Can you work with my existing domain?", a: "Yes. We can rebuild on your current domain and redirect old pages so you keep any search visibility you already have." },
      { q: "Do you write the content?", a: "We help shape it from what you tell us about your work, and use your real photos wherever possible." },
    ],
  },
  {
    id: "ai-automation",
    postService: "AI automation",
    name: "AI automation",
    title: "AI automation for small businesses and trades",
    h1: "AI automation that takes the admin off your plate",
    description:
      "AI and automation for trades and small businesses: quote follow-ups, appointment reminders, review requests and passing information between your tools.",
    intro: [
      "Quotes that never get chased, reminders that never get sent, reviews you never ask for: small admin jobs quietly cost work.",
      "Integrate sets up AI and automation that handles the repetitive parts, using the tools you already have wherever possible.",
    ],
    steps: [
      { title: "Quote follow-ups", text: "Polite, timed follow-ups so quotes do not go cold." },
      { title: "Reminders", text: "Appointment reminders that cut no-shows and wasted trips." },
      { title: "Review requests", text: "A request after each finished job, sent while the customer is happy." },
      { title: "Joined-up tools", text: "Information passed between your calendar, forms, CRM and messages automatically." },
    ],
    goodSigns: [
      "You stop copying the same details between apps.",
      "Every quote gets followed up without you remembering.",
      "Reviews arrive steadily rather than in bursts.",
    ],
    faqs: [
      { q: "Do I need new software?", a: "Usually not. We start with what you already use and only add tools where they clearly save time." },
      { q: "Is my customer data safe?", a: "Automations are set up on reputable platforms with access limited to what each step needs. We walk you through what is stored where." },
      { q: "Where should I start?", a: "With the admin task that costs you most work when it is missed, often quote follow-ups." },
    ],
  },
];

export function getHub(id: string) {
  return SERVICE_HUBS.find((h) => h.id === id);
}

export function hubForService(service?: string) {
  if (!service) return undefined;
  return SERVICE_HUBS.find((h) => h.postService.toLowerCase() === service.toLowerCase());
}

export function postsForHub(hub: ServiceHub): Post[] {
  return getAllPosts().filter(
    (p) => hubForService(p.service)?.id === hub.id || (hub.includeLocationPosts && p.type === "location"),
  );
}
