/**
 * The LinkedIn caption for a post, generated in one Claude call.
 *
 * The model writes two literal tokens, [ARTICLE] and [CONTACT], where the
 * links go, and returns hashtags separately. Code swaps in the article URL and
 * the /contact URL (both UTM-tagged) and appends the hashtags, so every
 * caption is guaranteed to link to both. The article link comes first so
 * LinkedIn builds its preview card from the post.
 *
 * The caption and its publish status live in seo-engine/linkedin/<slug>.json,
 * so recording a publish never touches the blog content (and never triggers a
 * site rebuild).
 */
import fs from "node:fs";
import path from "node:path";
import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { config } from "../config";
import { addUsage, emptyUsage, generateStructured, GenerationError, type Usage } from "./claude";
import { findForbiddenText } from "./gate";

export const ARTICLE_TOKEN = "[ARTICLE]";
export const CONTACT_TOKEN = "[CONTACT]";
const TOKENS = [ARTICLE_TOKEN, CONTACT_TOKEN];

export const CaptionSchema = z.object({
  text: z.string(),
  hashtags: z.array(z.string()),
});

export type CaptionDraft = z.infer<typeof CaptionSchema>;

export type LinkedInState = {
  slug: string;
  title: string;
  /** Live post URL, checked before anything is posted. */
  postUrl: string;
  /** Final caption, link and hashtags included. Null if caption generation failed. */
  caption: string | null;
  status: "pending" | "posted" | "failed";
  /** Set by the publisher once posted. */
  postId?: string;
  postedUrl?: string;
  postedAt?: string;
  error?: string;
  generatedAt: string;
};

const li = config.linkedin;

export const LINKEDIN_SYSTEM_PROMPT = `You write LinkedIn posts for Integrate's company page. Integrate is a UK agency that helps trades and local businesses win more work (Meta ads, an AI WhatsApp agent that qualifies and books leads, premium websites, AI automation). Each request gives you a blog article; you write a LinkedIn post that makes the reader want to read it or get in touch.

<voice>
Restrained, confident, editorial. Plain and practical. No hype, no clickbait, no emoji. UK English spelling. Use single quotation marks for any quotes ('like this'); never type a straight double quotation mark, because it cuts the post off. Write for busy owners of trades and local businesses.
</voice>

<hard_rules>
Checked by code; breaking any of them gets the post rejected.
1. Never use an em dash or any long dash as punctuation. Do not use " - " or " -- " as a dash either. Use commas, colons, full stops or brackets.
2. Never invent statistics, percentages, prices, client names, testimonials, results or quotes. Only say what the article supports. Do not claim first-hand experience or a track record ("the sites we see", "our clients"); make general points instead.
3. Never use these words or phrases: ${config.bannedPhrases.map((p) => `"${p}"`).join(", ")}.
4. text must contain each of these tokens exactly once, and code replaces them with the real links:
   - ${ARTICLE_TOKEN}: the link to the article. Put it early, within the first three paragraphs, where you point readers to the full piece (for example 'The full guide: ${ARTICLE_TOKEN}').
   - ${CONTACT_TOKEN}: the link to the contact form. Put it near the end, in a sentence inviting the reader to get in touch.
   Follow each token with a space, a line break, the end of the text, or one punctuation mark. Do not write any other URL or web address.
5. Do not put hashtags inside the text. Return them in the hashtags list instead, each as a single word starting with # (letters and numbers only, e.g. #Roofing, #ChorleyBusiness).
</hard_rules>

<format>
- text: ${li.minWords} to ${li.maxWords} words (not counting the link tokens), aiming for about ${Math.round((li.minWords + li.maxWords) / 2 / 10) * 10}. Professional. The first line is the hook: one short sentence of at most ${li.maxHookChars} characters (roughly 20 words) that stands on its own, followed by a blank line. Checked by code; long hooks are the most common failure. Short paragraphs separated by blank lines. ${ARTICLE_TOKEN} early, ${CONTACT_TOKEN} near the end.
- hashtags: ${li.minHashtags} to ${li.maxHashtags}, relevant to the trade, the place (if any) and small business.
</format>`;

export function captionUserPrompt(post: { title: string; excerpt: string; targetKeyword: string; body: string; place?: string }): string {
  return `Write the LinkedIn post for this article.

Title: ${post.title}
Summary: ${post.excerpt}
Target keyword: ${post.targetKeyword}${post.place ? `\nPlace: ${post.place}` : ""}

<article>
${post.body}
</article>`;
}

function utm(slug: string): string {
  return new URLSearchParams({
    utm_source: "linkedin",
    utm_medium: li.utm.medium,
    utm_campaign: li.utm.campaign,
    utm_content: slug,
  }).toString();
}

export function articleUrl(slug: string): string {
  return `${config.site.url}/blog/${slug}?${utm(slug)}`;
}

export function contactUrl(slug: string): string {
  return `${config.site.url}${config.site.contactPath}?${utm(slug)}`;
}

const words = (t: string) => TOKENS.reduce((s, tok) => s.split(tok).join(" "), t).split(/\s+/).filter(Boolean).length;

/** Code checks for the caption. Returns failure messages (empty = pass). */
export function checkCaption(c: CaptionDraft): string[] {
  const failures = findForbiddenText([["text", c.text]]);

  for (const token of TOKENS) {
    const count = c.text.split(token).length - 1;
    const at = c.text.indexOf(token);
    // Anything glued to a link (e.g. "[CONTACT].n") would break the URL.
    const after = c.text.slice(at + token.length);
    if (count !== 1) failures.push(`text must contain ${token} exactly once (found ${count}).`);
    else if (!/^[.,!?:;)]?(\s|$)/.test(after)) {
      failures.push(`text has characters stuck to the end of ${token}. Follow it with a space, a line break, or one punctuation mark.`);
    }
  }
  if (c.text.includes(ARTICLE_TOKEN) && c.text.includes(CONTACT_TOKEN) && c.text.indexOf(ARTICLE_TOKEN) > c.text.indexOf(CONTACT_TOKEN)) {
    failures.push(`${ARTICLE_TOKEN} must come before ${CONTACT_TOKEN} (the first link becomes LinkedIn's preview card).`);
  }
  if (/https?:\/\/|www\./i.test(c.text)) failures.push(`text contains a URL. Use ${ARTICLE_TOKEN} and ${CONTACT_TOKEN} only.`);
  if (/(^|\s)#\w/.test(c.text)) failures.push("text contains hashtags. Put them in the hashtags list.");

  const n = words(c.text);
  if (n < li.minWords || n > li.maxWords) failures.push(`text is ${n} words; it must be ${li.minWords} to ${li.maxWords}.`);
  const hook = c.text.trim().split("\n")[0] ?? "";
  if (hook.length > li.maxHookChars) failures.push(`the hook (first line) is ${hook.length} characters; keep it to ${li.maxHookChars}.`);

  if (c.hashtags.length < li.minHashtags || c.hashtags.length > li.maxHashtags) {
    failures.push(`hashtags has ${c.hashtags.length}; it needs ${li.minHashtags} to ${li.maxHashtags}.`);
  }
  const bad = c.hashtags.filter((h) => !/^#[A-Za-z0-9]+$/.test(h));
  if (bad.length) failures.push(`hashtags must be single words like #Roofing: fix ${bad.join(", ")}.`);
  if (new Set(c.hashtags.map((h) => h.toLowerCase())).size !== c.hashtags.length) failures.push("hashtags contains duplicates.");
  return failures;
}

/** Final caption, with both UTM links and the hashtags in place. */
export function composeCaption(c: CaptionDraft, slug: string): string {
  const text = c.text.trim().replace(ARTICLE_TOKEN, articleUrl(slug)).replace(CONTACT_TOKEN, contactUrl(slug));
  return `${text}\n\n${c.hashtags.join(" ")}`;
}

export type CaptionInput = { slug: string; title: string; excerpt: string; targetKeyword: string; body: string; place?: string };

/**
 * Writes and checks the caption, retrying once with the failure reasons.
 * Never throws for a bad caption: the post still publishes, and the LinkedIn
 * state is marked "failed" so the publisher skips it.
 */
export async function buildLinkedInState(input: CaptionInput): Promise<{ state: LinkedInState; usage: Usage; problems: string[] }> {
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: captionUserPrompt(input) }];
  let usage = emptyUsage();
  let caption: string | null = null;
  let problems: string[] = [];

  for (let attempt = 0; attempt <= config.maxRetries && caption === null; attempt++) {
    try {
      const { data, usage: u, assistant } = await generateStructured(CaptionSchema, LINKEDIN_SYSTEM_PROMPT, messages);
      usage = addUsage(usage, u);
      problems = checkCaption(data);
      console.log(`  linkedin caption attempt ${attempt + 1}: ${problems.length ? `FAIL (${problems.length})` : "PASS"}`);
      for (const f of problems) console.log(`    - ${f}`);
      if (problems.length === 0) caption = composeCaption(data, input.slug);
      else {
        messages.push(assistant, {
          role: "user",
          content: `That post failed these automated checks:\n${problems.map((f) => `- ${f}`).join("\n")}\n\nWrite it again, fixing all of them.`,
        });
      }
    } catch (e) {
      if (e instanceof GenerationError) usage = addUsage(usage, e.usage);
      problems = [(e as Error).message];
      console.log(`  linkedin caption attempt ${attempt + 1}: ERROR ${(e as Error).message}`);
    }
  }

  const base = {
    slug: input.slug,
    title: input.title,
    postUrl: `${config.site.url}/blog/${input.slug}`,
    generatedAt: new Date().toISOString(),
  };
  const state: LinkedInState = caption
    ? { ...base, caption, status: "pending" }
    : { ...base, caption: null, status: "failed", error: "caption failed the checks" };

  return { state, usage, problems: caption ? [] : problems.map((p) => `linkedin caption: ${p}`) };
}

export function linkedInFile(slug: string, dir: string = config.paths.linkedin): string {
  return path.join(dir, `${slug}.json`);
}

export function readLinkedInState(slug: string, dir?: string): LinkedInState | null {
  const file = linkedInFile(slug, dir);
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as LinkedInState) : null;
}

export function writeLinkedInState(state: LinkedInState, dir: string = config.paths.linkedin): string {
  fs.mkdirSync(dir, { recursive: true });
  const file = linkedInFile(state.slug, dir);
  fs.writeFileSync(file, JSON.stringify(state, null, 2) + "\n");
  return file;
}
