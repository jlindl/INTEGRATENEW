/**
 * The quality gate. Pure code: every rule here is checked mechanically and a
 * post that fails any of them is rejected. Failure messages are written to be
 * fed straight back to the model on a retry.
 */
import { compile } from "@mdx-js/mdx";
import { countWords } from "../../lib/blog";
import { config } from "../config";
import type { Article } from "./claude";
import type { ExistingPost } from "./site";
import { contentTokens, escapeRegExp, jaccard, normalise, plainText, shingles } from "./text";

/** The parts of a topic the gate needs. Any `Topic` fits; so does a hand-written post. */
export type GateTopic =
  | { type: "location"; location: { name: string; nearby: string[] } }
  | { type: "service" };

export type GateContext = {
  /** Posts the new one must not duplicate (existing site posts plus earlier posts from this run). */
  existing: ExistingPost[];
  /** Slugs already used, including ones recorded in the ledger but not yet merged. */
  takenSlugs: Set<string>;
  /** Internal paths that resolve to real pages. */
  validPaths: Set<string>;
};

export type GateResult = {
  pass: boolean;
  failures: string[];
  stats: {
    words: number;
    metaLength: number;
    internalLinks: string[];
    contactLinks: number;
    faqQuestions: number;
    maxBodySimilarity: { slug: string; score: number } | null;
  };
};

const ALLOWED_COMPONENT = /<ContactCta\s*\/>/g;
const LINK_RE = /\[([^\]]+)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;

/** Every text field the model produced, for rules that apply everywhere. */
function textFields(a: Article): [string, string][] {
  return [
    ["title", a.title],
    ["slug", a.slug],
    ["metaDescription", a.metaDescription],
    ["excerpt", a.excerpt],
    ["targetKeyword", a.targetKeyword],
    ["heroImageAlt", a.heroImageAlt],
    ["body", a.body],
  ];
}

export function findForbiddenText(fields: [string, string][]): string[] {
  const failures: string[] = [];
  for (const [name, value] of fields) {
    for (const { char, name: what } of config.forbiddenChars) {
      if (value.includes(char)) failures.push(`${name} contains an ${what} ("${char}"). Rewrite those sentences with commas, colons, full stops or brackets.`);
    }
    for (const { pattern, name: what } of config.forbiddenPatterns) {
      if (pattern.test(value)) failures.push(`${name} contains a ${what}. Rewrite those sentences without it.`);
    }
    const straight = value.replace(/[\u2018\u2019]/g, "'");
    const hits = config.bannedPhrases.filter((p) =>
      new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(p)}(?![\\p{L}\\p{N}])`, "iu").test(straight),
    );
    if (hits.length) failures.push(`${name} uses banned phrase(s): ${hits.map((h) => `"${h}"`).join(", ")}.`);
  }
  return failures;
}

/** Root-relative path for a link href, or null if it is external. */
function internalPath(href: string): string | null {
  let h = href.trim();
  if (h.startsWith(config.site.url)) h = h.slice(config.site.url.length) || "/";
  if (!h.startsWith("/")) return null;
  const path = h.split(/[?#]/)[0].replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

function blocks(body: string): string[] {
  return body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
}

/** Checks that the body is plain markdown plus the one allowed component, then that it compiles. */
async function checkMdx(body: string): Promise<string[]> {
  const failures: string[] = [];
  const withoutAllowed = body.replace(ALLOWED_COMPONENT, "");
  if (/^\s*(import|export)\s/m.test(body)) failures.push("body contains an import or export statement. Remove it.");
  if (/[{}]/.test(body)) failures.push("body contains curly braces, which break MDX. Remove them.");
  if (/<!--/.test(body)) failures.push("body contains an HTML comment. Remove it.");
  if (/<[A-Za-z/!]/.test(withoutAllowed)) failures.push("body contains an HTML tag or component other than <ContactCta />. Use plain markdown only.");
  if ((body.match(ALLOWED_COMPONENT) ?? []).length > 1) failures.push("body uses <ContactCta /> more than once. Use it at most once.");
  if (/^```/m.test(body)) failures.push("body contains a code block. Remove it.");
  if (/!\[[^\]]*\]\(/.test(body)) failures.push("body contains an image. Remove it.");
  if (/^\s*\|.*\|\s*$/m.test(body)) failures.push("body contains a table. Use a list instead.");
  if (failures.length === 0) {
    try {
      await compile(body);
    } catch (e) {
      failures.push(`body is not valid MDX: ${(e as Error).message.split("\n")[0]}`);
    }
  }
  return failures;
}

export async function runGate(a: Article, topic: GateTopic, ctx: GateContext): Promise<GateResult> {
  const failures: string[] = [];
  const range = topic.type === "location" ? config.article.location : config.article.service;
  const rules = config.article;

  // Dashes and banned phrases, everywhere.
  failures.push(...findForbiddenText(textFields(a)));

  // Word count.
  const words = countWords(a.body);
  if (words < range.minWords || words > range.maxWords) {
    failures.push(`body is ${words} words; it must be ${range.minWords} to ${range.maxWords}.`);
  }

  // Meta description and excerpt.
  const metaLength = a.metaDescription.trim().length;
  if (metaLength < rules.metaDescription.min || metaLength > rules.metaDescription.max) {
    failures.push(`metaDescription is ${metaLength} characters; it must be ${rules.metaDescription.min} to ${rules.metaDescription.max}.`);
  }
  if (!a.excerpt.trim() || a.excerpt.length > rules.excerpt.max) {
    failures.push(`excerpt must be 1 to ${rules.excerpt.max} characters (it is ${a.excerpt.length}).`);
  }
  if (!a.heroImageAlt.trim() || a.heroImageAlt.length > rules.heroImageAlt.max) {
    failures.push(`heroImageAlt must be present and at most ${rules.heroImageAlt.max} characters (it is ${a.heroImageAlt.length}).`);
  }

  // Slug and title uniqueness.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) failures.push(`slug "${a.slug}" must be lowercase words separated by single hyphens.`);
  if (a.slug.length > rules.slug.maxLength) failures.push(`slug is ${a.slug.length} characters; the maximum is ${rules.slug.maxLength}.`);
  if (ctx.takenSlugs.has(a.slug)) failures.push(`slug "${a.slug}" is already used by another post. Choose a different title and slug.`);
  const titleTokens = contentTokens(a.title);
  for (const p of ctx.existing) {
    if (normalise(p.title) === normalise(a.title)) {
      failures.push(`title duplicates the existing post "${p.title}".`);
    } else if (jaccard(titleTokens, contentTokens(p.title)) > config.similarity.maxTitleJaccard) {
      failures.push(`title is too similar to the existing post "${p.title}". Take a clearly different angle.`);
    }
  }

  // Target keyword placement.
  const kw = normalise(a.targetKeyword);
  const has = (s: string) => ` ${normalise(s)} `.includes(` ${kw} `);
  const bodyBlocks = blocks(a.body);
  const firstParagraph = bodyBlocks.find((b) => !b.startsWith("#") && !b.startsWith("<")) ?? "";
  const h2s = a.body.split("\n").filter((l) => /^##\s/.test(l));
  if (!kw) failures.push("targetKeyword is empty.");
  else {
    if (!has(a.title)) failures.push(`title must contain the target keyword "${a.targetKeyword}" exactly.`);
    if (!has(plainText(firstParagraph))) failures.push(`the first paragraph must contain the target keyword "${a.targetKeyword}" exactly.`);
    if (!h2s.some(has)) failures.push(`at least one "## " heading must contain the target keyword "${a.targetKeyword}" exactly.`);
    if (!has(a.metaDescription)) failures.push(`metaDescription must contain the target keyword "${a.targetKeyword}" exactly.`);
  }

  // Structure: headings and FAQ.
  if (/^#\s/m.test(a.body)) failures.push('body must not use "# " headings; start sections at "## ".');
  const faqIndex = h2s.findIndex((h) => normalise(h).startsWith(normalise(rules.faq.heading)));
  if (h2s.length - (faqIndex === -1 ? 0 : 1) < rules.minH2) {
    failures.push(`body needs at least ${rules.minH2} "## " sections before the FAQ.`);
  }
  let faqQuestions = 0;
  if (faqIndex === -1) {
    failures.push(`body must end with a "## ${rules.faq.heading}" section.`);
  } else if (faqIndex !== h2s.length - 1) {
    failures.push(`the "## ${rules.faq.heading}" section must be the last section.`);
  } else {
    const faqText = a.body.slice(a.body.lastIndexOf(h2s[faqIndex]));
    const questions = faqText.split("\n").filter((l) => /^###\s/.test(l));
    faqQuestions = questions.length;
    if (faqQuestions < rules.faq.minQuestions || faqQuestions > rules.faq.maxQuestions) {
      failures.push(`the FAQ has ${faqQuestions} questions; it needs ${rules.faq.minQuestions} to ${rules.faq.maxQuestions}, each as a "### " heading.`);
    }
    if (questions.some((q) => !q.trim().endsWith("?"))) failures.push("every FAQ question heading must end with a question mark.");
  }

  // Links.
  const internal = new Set<string>();
  let contactLinks = 0;
  for (const m of a.body.matchAll(LINK_RE)) {
    const href = m[2];
    if (href.startsWith("#")) continue;
    const path = internalPath(href);
    if (path === null) {
      if (!rules.allowExternalLinks) failures.push(`external link "${href}" is not allowed. Link only to paths from the link list.`);
      continue;
    }
    if (!ctx.validPaths.has(path)) {
      failures.push(`link "${href}" does not resolve to a real page. Use only paths from the link list.`);
      continue;
    }
    if (path === config.site.contactPath) contactLinks++;
    else internal.add(path);
  }
  if (contactLinks === 0) failures.push(`body must include at least one contextual link to ${config.site.contactPath}.`);
  if (internal.size < rules.minInternalLinks) {
    failures.push(`body has ${internal.size} internal link(s) to other pages; it needs at least ${rules.minInternalLinks} (blog posts or service pages from the link list, not counting ${config.site.contactPath}).`);
  }

  // Local specificity for location posts.
  if (topic.type === "location") {
    const prose = ` ${normalise(plainText(a.body))} `;
    const count = (name: string) => prose.split(` ${normalise(name)} `).length - 1;
    const townMentions = count(topic.location.name);
    if (townMentions < rules.minLocationMentions) {
      failures.push(`body mentions ${topic.location.name} ${townMentions} time(s); it needs at least ${rules.minLocationMentions} and must be specific to the place.`);
    }
    const nearby = topic.location.nearby.filter((n) => count(n) > 0);
    if (nearby.length < rules.minNearbyTownMentions) {
      failures.push(`body names ${nearby.length} nearby town(s); it needs at least ${rules.minNearbyTownMentions} of: ${topic.location.nearby.join(", ")}.`);
    }
  }

  // Near-duplicate content.
  const mine = shingles(a.body, config.similarity.shingleSize);
  let maxBodySimilarity: GateResult["stats"]["maxBodySimilarity"] = null;
  for (const p of ctx.existing) {
    const score = jaccard(mine, shingles(p.body, config.similarity.shingleSize));
    if (!maxBodySimilarity || score > maxBodySimilarity.score) maxBodySimilarity = { slug: p.slug, score };
    if (score > config.similarity.maxBodyJaccard) {
      failures.push(`body is too similar to the existing post "${p.title}" (similarity ${score.toFixed(2)}, limit ${config.similarity.maxBodyJaccard}). Write it fresh with a different structure and examples.`);
    }
  }

  // MDX safety and validity.
  failures.push(...(await checkMdx(a.body)));

  return {
    pass: failures.length === 0,
    failures,
    stats: { words, metaLength, internalLinks: [...internal], contactLinks, faqQuestions, maxBodySimilarity },
  };
}
