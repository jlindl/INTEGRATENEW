/**
 * Daily article generation.
 *
 *   npm run seo:generate                      picks and writes today's two posts
 *   npm run seo:generate -- --dry-run         writes to a temp folder, no ledger, no issues
 *   npm run seo:generate -- --plan            prints the topics it would pick, then stops (free)
 *   npm run seo:generate -- --only service    just one of the two posts
 *   npm run seo:generate -- --location chorley --audience roofers [--angle leads]
 *   npm run seo:generate -- --service meta-ads --audience plumbers
 *   npm run seo:generate -- --date 2026-10-01
 *
 * Each post is generated, run through the quality gate, and retried once with
 * the failure reasons if it fails. A post that fails twice is skipped, logged
 * in the ledger and reported in a GitHub issue.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import type Anthropic from "@anthropic-ai/sdk";
import { config } from "./config";
import { addUsage, costUsd, emptyUsage, generateArticle, GenerationError, type Article, type Usage } from "./lib/claude";
import { loadLedger, loadLocations, loadServiceData, saveLedger, type LedgerEntry } from "./lib/data";
import { runGate, type GateResult } from "./lib/gate";
import { openIssue } from "./lib/github";
import { buildPostFile } from "./lib/post-file";
import { retryPrompt, userPrompt } from "./lib/prompts";
import { loadExistingPosts, sitePages, validPaths, type ExistingPost } from "./lib/site";
import { ukToday } from "./lib/text";
import { locationTopic, pickLocationTopic, pickServiceTopic, serviceTopic, type Topic } from "./lib/topics";

type PostResult = {
  type: Topic["type"];
  topicKey: string;
  status: "generated" | "failed";
  slug?: string;
  title?: string;
  targetKeyword?: string;
  file?: string;
  attempts: { failures: string[]; stats?: GateResult["stats"] }[];
  usage: Usage;
  costUsd: number;
  error?: string;
};

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    plan: { type: "boolean", default: false },
    only: { type: "string" },
    location: { type: "string" },
    service: { type: "string" },
    audience: { type: "string" },
    angle: { type: "string" },
    date: { type: "string" },
  },
});

function fail(msg: string): never {
  console.error(`seo:generate: ${msg}`);
  process.exit(2);
}

function chooseTopics(date: string, ledger: LedgerEntry[], existing: ExistingPost[]): Topic[] {
  const locations = loadLocations();
  const { services, audiences, locationAngles, excludePairs } = loadServiceData();
  const byId = <T extends { id: string }>(list: T[], id: string | undefined, what: string): T => {
    const hit = list.find((x) => x.id === id);
    if (!hit) fail(`unknown ${what} "${id}". Valid: ${list.map((x) => x.id).join(", ")}`);
    return hit;
  };

  // Forced single topics.
  if (args.location) {
    const angle = args.angle ? byId(locationAngles, args.angle, "angle") : locationAngles[0];
    return [locationTopic(byId(locations, args.location, "location"), byId(audiences, args.audience, "audience"), angle)];
  }
  if (args.service) {
    return [serviceTopic(byId(services, args.service, "service"), byId(audiences, args.audience, "audience"))];
  }

  // Daily picks, skipping any type already generated for this date (safe re-runs).
  const doneToday = (type: Topic["type"]) =>
    ledger.some((e) => e.date === date && e.type === type && e.status === "generated");
  const ctx = { date, ledger, existing };
  const topics: Topic[] = [];

  if (args.only !== "service" && !doneToday("location")) {
    const t = pickLocationTopic(ctx, locations, audiences, locationAngles);
    if (t) topics.push(t);
    else console.warn("No location topics left. Add places to locations.json or audiences to services.json.");
  }
  if (args.only !== "location" && !doneToday("service")) {
    const avoid = topics[0]?.audience.id;
    const t = pickServiceTopic(ctx, services, audiences, excludePairs, avoid);
    if (t) topics.push(t);
    else console.warn("No service topics left. Add services or audiences to services.json.");
  }
  return topics;
}

async function generateOne(
  topic: Topic,
  existing: ExistingPost[],
  takenSlugs: Set<string>,
): Promise<{ result: PostResult; article?: Article }> {
  const result: PostResult = { type: topic.type, topicKey: topic.key, status: "failed", attempts: [], usage: emptyUsage(), costUsd: 0 };
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: userPrompt(topic, sitePages(), existing) }];
  const ctx = { existing, takenSlugs, validPaths: validPaths(existing) };

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const { article, usage, assistant } = await generateArticle(messages);
      result.usage = addUsage(result.usage, usage);
      const gate = await runGate(article, topic, ctx);
      result.attempts.push({ failures: gate.failures, stats: gate.stats });
      console.log(
        `  attempt ${attempt + 1}: ${gate.pass ? "PASS" : `FAIL (${gate.failures.length})`}, ` +
          `${gate.stats.words} words, meta ${gate.stats.metaLength} chars, ` +
          `${gate.stats.internalLinks.length} internal links, ${usage.outputTokens} output tokens`,
      );
      for (const f of gate.failures) console.log(`    - ${f}`);

      if (gate.pass) {
        Object.assign(result, { status: "generated", slug: article.slug, title: article.title, targetKeyword: article.targetKeyword });
        return { result, article };
      }
      messages.push(assistant, { role: "user", content: retryPrompt(gate.failures) });
    } catch (e) {
      const err = e as Error;
      if (e instanceof GenerationError) result.usage = addUsage(result.usage, e.usage);
      result.attempts.push({ failures: [err.message] });
      result.error = err.message;
      console.log(`  attempt ${attempt + 1}: ERROR ${err.message}`);
    }
  }
  return { result };
}

async function main() {
  const dryRun = args["dry-run"];
  const date = args.date ?? ukToday();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`--date must be YYYY-MM-DD`);

  const ledger = loadLedger();
  const existing = loadExistingPosts();
  const topics = chooseTopics(date, ledger.entries, existing);
  if (args.plan) {
    for (const t of topics) console.log(`${t.type.padEnd(8)} ${t.key.padEnd(40)} "${t.suggestedKeyword}"`);
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) fail("ANTHROPIC_API_KEY is not set.");

  const outDir = dryRun ? path.join(os.tmpdir(), "seo-engine", date) : config.paths.blog;
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`seo:generate ${date}${dryRun ? " (dry run)" : ""}, mode ${config.publishMode}, model ${config.model.id}`);
  if (topics.length === 0) console.log("Nothing to generate.");

  const takenSlugs = new Set([
    ...existing.map((p) => p.slug),
    ...ledger.entries.filter((e) => e.slug).map((e) => e.slug!),
  ]);
  const results: PostResult[] = [];

  for (const topic of topics) {
    console.log(`\n[${topic.type}] ${topic.key}  (keyword: "${topic.suggestedKeyword}")`);
    const { result, article } = await generateOne(topic, existing, takenSlugs);
    result.costUsd = costUsd(result.usage);
    results.push(result);

    if (article) {
      const file = path.join(outDir, `${article.slug}.mdx`);
      fs.writeFileSync(file, buildPostFile(article, topic, date));
      result.file = path.relative(config.paths.root, file);
      console.log(`  wrote ${result.file}`);
      // Later posts in this run must not duplicate this one, and may link to it.
      existing.push({ slug: article.slug, title: article.title, body: article.body, type: topic.type });
      takenSlugs.add(article.slug);
    } else if (!dryRun) {
      const last = result.attempts.at(-1)?.failures ?? [];
      await openIssue(
        `SEO engine: ${topic.type} post skipped on ${date} (${topic.key})`,
        `The ${topic.type} post for **${topic.key}** failed the quality gate ${result.attempts.length} time(s) and was skipped.\n\n` +
          `**Final failures:**\n${last.map((f) => `- ${f}`).join("\n")}\n\n` +
          `The topic stays available and will be retried on a later day (it is retired after ${config.topics.maxFailuresPerTopic} failures).\n\n` +
          `Approximate cost of the attempts: $${result.costUsd.toFixed(3)}`,
      );
    }

    if (!dryRun) {
      ledger.entries.push({
        date,
        type: topic.type,
        key: topic.key,
        status: result.status,
        ...(topic.type === "location" ? { angle: topic.angle.id } : {}),
        ...(result.slug ? { slug: result.slug, title: result.title, targetKeyword: result.targetKeyword } : {}),
        ...(result.status === "failed" ? { reasons: result.attempts.at(-1)?.failures ?? [] } : {}),
      });
      saveLedger(ledger);
    }
  }

  const total = results.reduce((u, r) => addUsage(u, r.usage), emptyUsage());
  const summary = {
    date,
    dryRun,
    mode: config.publishMode,
    model: config.model.id,
    posts: results,
    usage: total,
    costUsd: Number(costUsd(total).toFixed(4)),
  };
  const logDir = dryRun ? outDir : config.paths.logs;
  fs.mkdirSync(logDir, { recursive: true });
  const logFile = path.join(logDir, `generate-${date}.json`);
  fs.writeFileSync(logFile, JSON.stringify(summary, null, 2) + "\n");

  console.log(
    `\nDone: ${results.filter((r) => r.status === "generated").length} generated, ` +
      `${results.filter((r) => r.status === "failed").length} skipped. ` +
      `Tokens in ${total.inputTokens + total.cacheReadTokens + total.cacheWriteTokens}, out ${total.outputTokens}. ` +
      `Approx cost $${summary.costUsd.toFixed(3)}. Log: ${logFile}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
