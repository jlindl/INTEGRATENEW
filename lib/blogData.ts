/**
 * Blog content, data-driven like the rest of the site. Adding a post is a
 * content task: append a typed `Post` object below. The index and the
 * `/blog/[slug]` template render entirely from this array.
 *
 * NOTE (Jack): these are SAMPLE posts with placeholder copy so the blog looks
 * real pre-launch. Replace them with your own writing before going live — the
 * index carries a small "sample posts" note until you do.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Machine date for <time datetime>. */
  date: string;
  /** Human label shown on the page. */
  dateLabel: string;
  readMinutes: number;
  author: string;
  featured?: boolean;
  body: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "hidden-cost-of-manual-operations",
    title: "The hidden cost of running your operations by hand",
    excerpt:
      "Manual work rarely shows up as a line item, but it quietly caps how fast you can grow. Here is how to find it and what to do about it.",
    category: "Operations",
    date: "2026-06-24",
    dateLabel: "June 24, 2026",
    readMinutes: 6,
    author: "Integrate",
    featured: true,
    body: [
      {
        type: "p",
        text: "Every growing business hits the same wall. Revenue climbs, the team scales, and somewhere along the way the work that used to take an afternoon now eats entire weeks. The cost never appears on a balance sheet, which is exactly why it is so dangerous.",
      },
      { type: "h2", text: "The tax you never see" },
      {
        type: "p",
        text: "Copying a lead from one tool to another. Chasing an overdue invoice. Re-formatting the same report for the third time this month. Individually these tasks feel trivial. In aggregate they become a tax on every hour your best people work, and that tax compounds as you grow.",
      },
      {
        type: "quote",
        text: "If a task is done the same way more than a handful of times a week, it is a candidate for automation.",
      },
      { type: "h2", text: "Where to look first" },
      {
        type: "p",
        text: "Start with the handoffs. The moments where work moves from one person or system to another are where information gets lost, delayed, or duplicated. Map those seams and you have found the highest-leverage automations in your business.",
      },
      {
        type: "p",
        text: "You do not need to automate everything at once. Pick the single most repetitive, most error-prone handoff and remove it. Then do it again. Momentum, not a big-bang rebuild, is what makes this stick.",
      },
    ],
  },
  {
    slug: "highest-roi-automation",
    title: "How to spot the highest-ROI automation in your business",
    excerpt:
      "Not all automations are worth building. A simple framework for deciding what to automate first, and what to leave alone.",
    category: "Playbooks",
    date: "2026-06-10",
    dateLabel: "June 10, 2026",
    readMinutes: 5,
    author: "Integrate",
    body: [
      {
        type: "p",
        text: "The temptation, once you start automating, is to automate everything. That is how teams end up with brittle systems nobody understands. The better approach is to be ruthless about what actually deserves the effort.",
      },
      { type: "h2", text: "Three questions" },
      {
        type: "p",
        text: "For any candidate task, ask: how often does it happen, how long does it take each time, and how costly is a mistake? A task that is frequent, slow, and error-prone is a clear win. A task that is rare or high-judgement usually is not.",
      },
      {
        type: "quote",
        text: "Automate the boring and repeatable. Keep humans on the ambiguous and relational.",
      },
      { type: "h2", text: "Score, then sequence" },
      {
        type: "p",
        text: "Rank your candidates by that rough score and start at the top. The goal of the first automation is not just the time it saves, but the confidence it builds. A quick, visible win buys you the room to tackle the bigger, messier processes next.",
      },
    ],
  },
  {
    slug: "ai-agents-vs-simple-automation",
    title: "AI agents vs. simple automations: which do you actually need?",
    excerpt:
      "“AI agent” is the phrase of the moment, but plenty of problems are better solved with a boring, reliable workflow. How to tell the difference.",
    category: "AI Agents",
    date: "2026-05-28",
    dateLabel: "May 28, 2026",
    readMinutes: 7,
    author: "Integrate",
    body: [
      {
        type: "p",
        text: "There is a real difference between a deterministic automation and an AI agent, and picking the wrong one is a common and expensive mistake.",
      },
      { type: "h2", text: "When a simple workflow wins" },
      {
        type: "p",
        text: "If the steps are known in advance and the rules do not change, a straightforward workflow is faster, cheaper, and far easier to trust. Moving data between systems, sending a templated follow-up, generating an invoice: these want reliability, not reasoning.",
      },
      { type: "h2", text: "When an agent earns its keep" },
      {
        type: "p",
        text: "Agents shine when a task requires judgement across messy, unstructured inputs. Triaging inbound messages, drafting a tailored response, deciding which of several paths to take. The value is in the reasoning, and that is exactly what a well-scoped agent provides.",
      },
      {
        type: "quote",
        text: "Use an agent where you would otherwise need a person to read, decide, and act. Use a workflow everywhere else.",
      },
      {
        type: "p",
        text: "The best systems combine both: agents at the points that need judgement, reliable workflows connecting everything around them.",
      },
    ],
  },
  {
    slug: "bespoke-vs-off-the-shelf",
    title: "Why bespoke beats off-the-shelf for growing teams",
    excerpt:
      "Template tools get you started fast, then quietly become the ceiling. When it pays to build a system around how you actually work.",
    category: "Strategy",
    date: "2026-05-14",
    dateLabel: "May 14, 2026",
    readMinutes: 5,
    author: "Integrate",
    body: [
      {
        type: "p",
        text: "Off-the-shelf tools are a gift early on. They are cheap, quick to set up, and get you moving. The trouble starts when your process no longer fits the tool, and you find yourself bending your business to the software instead of the other way around.",
      },
      { type: "h2", text: "The ceiling effect" },
      {
        type: "p",
        text: "Every template product encodes assumptions about how work should happen. For a while those assumptions are close enough. Then you grow, your process gets specific, and the gaps turn into manual workarounds, the very thing the tool was supposed to remove.",
      },
      {
        type: "quote",
        text: "A bespoke system fits your operation exactly, because it is built from it.",
      },
      { type: "h2", text: "Build where it is a moat" },
      {
        type: "p",
        text: "You do not need bespoke everything. Keep buying commodity tools for commodity problems. But the workflows that are unique to how you win customers are worth building around, because that is precisely where a system tailored to you becomes a durable advantage.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
