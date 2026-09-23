/**
 * SEO engine configuration. Every tunable (model, word ranges, thresholds,
 * banned phrases, schedule, platforms) lives here so behaviour can be changed
 * without touching engine code.
 */
import path from "node:path";

const ROOT = process.cwd();

export const config = {
  site: {
    url: (process.env.SITE_URL || "https://integrate-tech.co.uk").replace(/\/$/, ""),
    contactPath: "/contact",
    author: "Integrate",
  },

  paths: {
    root: ROOT,
    engine: path.join(ROOT, "seo-engine"),
    data: path.join(ROOT, "seo-engine", "data"),
    ledger: path.join(ROOT, "seo-engine", "data", "ledger.json"),
    blog: path.join(ROOT, "content", "blog"),
    images: path.join(ROOT, "public", "blog"),
    logs: path.join(ROOT, "seo-engine", "logs"),
  },

  /** Claude settings for article generation. */
  model: {
    id: "claude-sonnet-5",
    effort: "high" as const,
    maxTokens: 16000,
    /** USD per million tokens, for the run log's cost estimate. */
    pricing: { inputPerMTok: 2, outputPerMTok: 10, cacheReadPerMTok: 0.2, cacheWritePerMTok: 2.5 },
  },

  topics: {
    /** Each place in a tier gets this many posts before the next tier starts; then the cycle repeats. */
    locationRoundSize: 3,
    /** Extra "uses" counted against non-trade audiences so trades (the Meta ads target) are picked first. */
    localBusinessPenalty: 2,
    /** A topic that fails the gate this many times is retired. */
    maxFailuresPerTopic: 2,
  },

  /** Retries after a failed quality gate (the brief asks for one). */
  maxRetries: 1,

  article: {
    location: { minWords: 900, maxWords: 1400, category: "Local guides" },
    service: { minWords: 1200, maxWords: 1800, category: "Playbooks" },
    metaDescription: { min: 140, max: 160 },
    excerpt: { max: 220 },
    heroImageAlt: { max: 150 },
    slug: { maxLength: 70 },
    minInternalLinks: 2,
    minH2: 3,
    faq: { heading: "Frequently asked questions", minQuestions: 3, maxQuestions: 5 },
    /** External links can't be verified at generation time, so they're off by default. */
    allowExternalLinks: false,
    /** Location posts must mention at least this many nearby towns from locations.json. */
    minNearbyTownMentions: 2,
    /** ...and the town name itself at least this many times in the body. */
    minLocationMentions: 3,
  },

  similarity: {
    /** Word n-gram size for shingling post bodies. */
    shingleSize: 5,
    /** Reject a post whose body shingle Jaccard with any existing post exceeds this. */
    maxBodyJaccard: 0.3,
    /** Reject a post whose title token Jaccard with any existing title exceeds this. */
    maxTitleJaccard: 0.75,
    /** Skip a topic candidate whose working title overlaps an existing title/slug this much. */
    maxTopicJaccard: 0.7,
  },

  /** Characters that must never appear in generated text. */
  forbiddenChars: [
    { char: "\u2014", name: "em dash" },
    { char: "\u2015", name: "horizontal bar" },
  ],
  /** Patterns that sneak an em dash in by another route. */
  forbiddenPatterns: [
    { pattern: / \u2013 /, name: "spaced en dash used as a dash" },
    { pattern: / -- /, name: "double hyphen used as a dash" },
    { pattern: /\S - \S/, name: "spaced hyphen used as a dash" },
  ],

  /** Case-insensitive. Matched on word boundaries against every generated field. */
  bannedPhrases: [
    "in today's fast-paced world",
    "in today's digital age",
    "in today's competitive landscape",
    "in the ever-evolving",
    "ever-changing landscape",
    "navigating the landscape",
    "navigate the complexities",
    "delve",
    "delves",
    "delving",
    "game-changer",
    "game changer",
    "unlock",
    "unlocking",
    "elevate",
    "elevating",
    "look no further",
    "supercharge",
    "revolutionise",
    "revolutionize",
    "cutting-edge",
    "seamless",
    "seamlessly",
    "leverage the power",
    "harness the power",
    "take it to the next level",
    "next level",
    "it's no secret",
    "at the end of the day",
    "a testament to",
    "tapestry",
    "embark",
    "realm",
    "robust",
    "synergy",
    "paradigm",
    "whether you're a",
    "in conclusion",
    "in summary",
    "ultimately,",
    "rest assured",
    "without further ado",
    "stand out from the crowd",
    "one-stop shop",
    "best-kept secret",
  ],

  /** Publishing mode for the scheduled job: "pr" opens a pull request, "auto" commits to main. */
  publishMode: (process.env.PUBLISH_MODE === "auto" ? "auto" : "pr") as "pr" | "auto",

  /** Social platforms (used from Phase 3 on). */
  platforms: ["linkedin", "facebook", "instagram"] as const,

  /** GitHub issue settings for failures. */
  issues: { label: "seo-engine" },
} as const;

export type EngineConfig = typeof config;
