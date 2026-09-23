/**
 * Rewrites the LinkedIn caption for an existing post, e.g. after it failed the
 * checks during the daily run.
 *
 *   npm run seo:caption -- <slug>             writes seo-engine/linkedin/<slug>.json
 *   npm run seo:caption -- <slug> --dry-run   writes to a temp folder instead
 *
 * Refuses to touch a post that has already been posted to LinkedIn.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import matter from "gray-matter";
import { config } from "./config";
import { costUsd } from "./lib/claude";
import { buildLinkedInState, readLinkedInState, writeLinkedInState } from "./lib/linkedin";

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: { "dry-run": { type: "boolean", default: false } },
});

async function main() {
  const slug = positionals[0];
  if (!slug) throw new Error("Usage: npm run seo:caption -- <slug> [--dry-run]");
  const postFile = path.join(config.paths.blog, `${slug}.mdx`);
  if (!fs.existsSync(postFile)) throw new Error(`No post at ${path.relative(config.paths.root, postFile)}`);
  if (readLinkedInState(slug)?.status === "posted") throw new Error(`${slug} is already posted to LinkedIn; leaving it alone.`);
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) throw new Error("ANTHROPIC_API_KEY is not set.");

  const { data, content } = matter(fs.readFileSync(postFile, "utf8"));
  console.log(`seo:caption ${slug}${args["dry-run"] ? " (dry run)" : ""}`);
  const { state, usage, problems } = await buildLinkedInState({
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    targetKeyword: String(data.targetKeyword),
    body: content,
    place: data.location ? [data.location, data.region].filter(Boolean).join(", ") : undefined,
  });

  const dir = args["dry-run"] ? path.join(os.tmpdir(), "seo-engine", "caption") : config.paths.linkedin;
  console.log(`  wrote ${writeLinkedInState(state, dir)}`);
  for (const p of problems) console.log(`  problem: ${p}`);
  console.log(`Approx cost $${costUsd(usage).toFixed(3)}`);
  process.exit(problems.length ? 1 : 0);
}

main().catch((e) => {
  console.error(`seo:caption: ${(e as Error).message}`);
  process.exit(1);
});
