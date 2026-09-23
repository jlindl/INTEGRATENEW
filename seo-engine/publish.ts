/**
 * Sends LinkedIn captions for posts that are live on the site.
 *
 *   npm run seo:publish                  schedule every pending post into its next slot
 *   npm run seo:publish -- --dry-run     show what would happen: no posting, no changes
 *   npm run seo:publish -- --slug <slug> only this post (also retries it past the attempt limit)
 *   npm run seo:publish -- --now         post straight away instead of waiting for the slot
 *
 * Rules:
 * - A post is only sent once its page returns 200 on the live site (waits up
 *   to config.linkedin.liveCheck.timeoutMs, e.g. for the Vercel deploy).
 * - Never double-posts: anything scheduled or posted is skipped, and every
 *   send carries an idempotency key so the publisher rejects a repeat.
 * - Location posts go out at the location slot, service posts at the service
 *   slot (UK time), each on the next free day, so a backlog is spread out.
 * - Scheduled posts whose time has passed are checked and marked posted.
 *
 * Status is saved to seo-engine/linkedin/<slug>.json; the workflow commits it.
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { getPost } from "../lib/blog";
import { config } from "./config";
import { openIssue } from "./lib/github";
import { readLinkedInState, writeLinkedInState, type LinkedInState } from "./lib/linkedin";
import { getPublisher, PublishError, type Publisher } from "./lib/publisher";
import { addDays, formatUk, ukDate, ukTimeToUtc } from "./lib/uk-time";

const { values: args } = parseArgs({
  options: {
    "dry-run": { type: "boolean", default: false },
    slug: { type: "string" },
    now: { type: "boolean", default: false },
  },
});

const li = config.linkedin;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const log = (msg: string) => console.log(msg);

function loadStates(): LinkedInState[] {
  if (!fs.existsSync(config.paths.linkedin)) return [];
  return fs
    .readdirSync(config.paths.linkedin)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readLinkedInState(path.basename(f, ".json"))!)
    .filter(Boolean);
}

/** Polls the post's live URL until it returns 200 or the deadline passes. */
async function waitUntilLive(url: string, deadline: number, once: boolean): Promise<boolean> {
  for (;;) {
    try {
      const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}live-check=${Date.now()}`, { redirect: "follow" });
      if (res.status === 200) return true;
    } catch {
      // Network blip: keep polling until the deadline.
    }
    if (once || Date.now() + li.liveCheck.intervalMs > deadline) return false;
    await sleep(li.liveCheck.intervalMs);
  }
}

/** The next UK slot for this post type that is in the future and not already taken. */
function nextSlot(type: "location" | "service", taken: Set<number>, now: Date): Date {
  const earliest = now.getTime() + 10 * 60 * 1000;
  for (let day = 0; day < 366; day++) {
    const at = ukTimeToUtc(addDays(ukDate(now), day), li.slots[type]);
    if (at.getTime() >= earliest && !taken.has(at.getTime())) return at;
  }
  throw new Error("No free LinkedIn slot in the next year.");
}

/** Marks scheduled posts whose time has passed as posted (or failed), from the publisher's record. */
async function refreshScheduled(states: LinkedInState[], publisher: Publisher, now: Date, dryRun: boolean): Promise<void> {
  for (const s of states) {
    if (s.status !== "scheduled" || !s.publisherId || !s.scheduledFor || new Date(s.scheduledFor) > now) continue;
    if (dryRun) {
      log(`  ${s.slug}: scheduled time has passed; a real run would check whether it went out`);
      continue;
    }
    const st = await publisher.status(s.publisherId);
    if (st.status === "posted") {
      Object.assign(s, { status: "posted", postedAt: s.scheduledFor, linkedinPostId: st.linkedinPostId, linkedinUrl: st.linkedinUrl, error: undefined });
      log(`  ${s.slug}: confirmed posted${st.linkedinUrl ? ` (${st.linkedinUrl})` : ""}`);
    } else if (st.status === "failed") {
      Object.assign(s, { status: "failed", error: st.error });
      log(`  ${s.slug}: publisher reports it failed: ${st.error}`);
    }
  }
}

async function main() {
  const dryRun = args["dry-run"];
  const now = new Date();
  const publisher = getPublisher();
  const states = loadStates();
  const changed = new Set<string>();
  const problems: string[] = [];

  log(`seo:publish${dryRun ? " (dry run)" : ""}, ${states.length} LinkedIn record(s), via ${publisher.name}`);

  const beforeRefresh = JSON.stringify(states);
  await refreshScheduled(states, publisher, now, dryRun);
  if (JSON.stringify(states) !== beforeRefresh) for (const s of states) changed.add(s.slug);

  // Candidates: pending posts, plus failed ones with a caption and attempts left.
  const candidates = states
    .filter((s) => (args.slug ? s.slug === args.slug : true))
    .filter((s) => {
      if (s.status === "pending") return true;
      if (s.status !== "failed") return false;
      if (!s.caption) {
        log(`  ${s.slug}: no caption (${s.error ?? "caption failed"}). Run: npm run seo:caption -- ${s.slug}`);
        return false;
      }
      return Boolean(args.slug) || (s.publishAttempts ?? 0) < li.maxPublishAttempts;
    })
    .map((s) => ({ s, post: getPost(s.slug) }))
    .filter(({ s, post }) => {
      if (!post) log(`  ${s.slug}: post isn't on this branch yet (not merged), skipping`);
      return Boolean(post);
    })
    // Oldest first, and location before service on the same day.
    .sort((a, b) => a.post!.date.localeCompare(b.post!.date) || a.post!.type.localeCompare(b.post!.type));

  if (args.slug && candidates.length === 0) log(`  nothing to publish for ${args.slug}`);
  if (candidates.length === 0) log("Nothing to publish.");

  // Wait for every candidate to be live (shared deadline, e.g. while Vercel deploys).
  const deadline = Date.now() + li.liveCheck.timeoutMs;
  const live = new Map<string, boolean>();
  await Promise.all(candidates.map(async ({ s }) => live.set(s.slug, await waitUntilLive(s.postUrl, deadline, dryRun))));

  const taken = new Set(
    states.filter((s) => s.status === "scheduled" && s.scheduledFor).map((s) => new Date(s.scheduledFor!).getTime()),
  );

  for (const { s, post } of candidates) {
    const attempt = (s.publishAttempts ?? 0) + 1;
    if (!live.get(s.slug)) {
      const msg = `${s.postUrl} was not live${dryRun ? "" : ` after ${Math.round(li.liveCheck.timeoutMs / 1000)} seconds of checking`}`;
      log(`  ${s.slug}: ${msg}`);
      if (!dryRun) {
        Object.assign(s, { status: "failed", error: msg, publishAttempts: attempt });
        changed.add(s.slug);
        problems.push(`${s.slug}: ${msg}`);
      }
      continue;
    }

    const scheduleAt = args.now ? undefined : nextSlot(post!.type, taken, now);
    if (scheduleAt) taken.add(scheduleAt.getTime());
    const when = scheduleAt ? formatUk(scheduleAt) : "now";

    if (dryRun) {
      log(`  ${s.slug}: live; would post to LinkedIn ${scheduleAt ? `at ${when} (UK)` : "now"}`);
      continue;
    }

    try {
      const r = await publisher.publish({ text: s.caption!, scheduleAt, idempotencyKey: `seo-engine:${s.slug}:${attempt}` });
      Object.assign(s, {
        status: r.status,
        publisherId: r.id,
        scheduledFor: scheduleAt?.toISOString(),
        linkedinPostId: r.linkedinPostId,
        linkedinUrl: r.linkedinUrl,
        postedAt: r.status === "posted" ? new Date().toISOString() : undefined,
        publishAttempts: attempt,
        error: undefined,
      });
      log(`  ${s.slug}: ${r.status === "scheduled" ? `scheduled for ${when} (UK)` : "posted"} (${publisher.name} id ${r.id})`);
    } catch (e) {
      if (e instanceof PublishError && e.duplicate) {
        // This exact attempt already reached the publisher (e.g. an earlier run couldn't save its status).
        Object.assign(s, { status: "posted", publishAttempts: attempt, error: `publisher says this was already sent (${e.message}); check the LinkedIn page` });
        log(`  ${s.slug}: already sent according to ${publisher.name}; marked as posted`);
      } else if (e instanceof PublishError && e.fatal) {
        // Credentials or account problem: not this post's fault, so leave it pending and stop.
        save(states, changed, dryRun);
        throw e;
      } else {
        Object.assign(s, { status: "failed", error: (e as Error).message, publishAttempts: attempt });
        problems.push(`${s.slug}: ${(e as Error).message}`);
        log(`  ${s.slug}: FAILED ${(e as Error).message}`);
      }
    }
    changed.add(s.slug);
  }

  save(states, changed, dryRun);

  if (problems.length && !dryRun) {
    await openIssue(
      `SEO engine: LinkedIn publishing problems (${ukDate(now)})`,
      `Some posts could not be sent to LinkedIn:\n\n${problems.map((p) => `- ${p}`).join("\n")}\n\n` +
        `They'll be retried automatically on later runs (up to ${li.maxPublishAttempts} attempts each). ` +
        `To retry one now, run the "SEO publish" workflow with its slug, or \`npm run seo:publish -- --slug <slug>\`.`,
    );
  }
  log(`Done: ${candidates.length} candidate(s), ${problems.length} problem(s).`);
}

function save(states: LinkedInState[], changed: Set<string>, dryRun: boolean) {
  if (dryRun) return;
  for (const s of states) if (changed.has(s.slug)) writeLinkedInState(s);
}

main().catch((e) => {
  console.error(`seo:publish stopped: ${(e as Error).message}`);
  process.exit(1);
});
