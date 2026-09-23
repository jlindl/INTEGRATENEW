/**
 * Daily topic picking. One location post (a place paired with an audience and
 * an angle) and one service post (a service paired with an audience).
 *
 * Rules:
 * - A topic already in the ledger as "generated" is never picked again; a
 *   topic that has failed twice is retired.
 * - Locations are worked through in rounds: every tier 1 place gets
 *   `config.topics.locationRoundSize` posts before tier 2 starts, and so on, then the cycle
 *   repeats with the next round.
 * - Trades come before other local businesses (the primary Meta ads target).
 * - Candidates whose working title overlaps an existing post title or slug
 *   too much are skipped.
 * - Ties break on a hash of the date, so a re-run on the same day picks the
 *   same topics.
 */
import { config } from "../config";
import type { Audience, LedgerEntry, Location, LocationAngle, Service } from "./data";
import { contentTokens, fill, hash, jaccard } from "./text";

export type LocationTopic = {
  type: "location";
  key: string;
  location: Location;
  audience: Audience;
  angle: LocationAngle;
  suggestedKeyword: string;
  workingTitle: string;
};

export type ServiceTopic = {
  type: "service";
  key: string;
  service: Service;
  audience: Audience;
  suggestedKeyword: string;
  workingTitle: string;
};

export type Topic = LocationTopic | ServiceTopic;

type PickContext = {
  date: string;
  ledger: LedgerEntry[];
  /** Titles and slugs of existing posts, to avoid near-duplicates. */
  existing: { slug: string; title: string }[];
};

const { locationRoundSize, localBusinessPenalty, maxFailuresPerTopic } = config.topics;

function templateVars(audience: Audience, location?: Location): Record<string, string> {
  return {
    audience: audience.name,
    singular: audience.singular,
    trade: audience.trade,
    ...(location ? { location: location.name } : {}),
  };
}

function blocked(key: string, ledger: LedgerEntry[]): boolean {
  const entries = ledger.filter((e) => e.key === key);
  return (
    entries.some((e) => e.status === "generated") ||
    entries.filter((e) => e.status === "failed").length >= maxFailuresPerTopic
  );
}

function tooCloseToExisting(workingTitle: string, existing: PickContext["existing"]): boolean {
  const t = contentTokens(workingTitle);
  return existing.some(
    (p) =>
      jaccard(t, contentTokens(p.title)) > config.similarity.maxTopicJaccard ||
      jaccard(t, contentTokens(p.slug.replace(/-/g, " "))) > config.similarity.maxTopicJaccard,
  );
}

function countBy(ledger: LedgerEntry[], pred: (e: LedgerEntry) => boolean): number {
  return ledger.filter((e) => e.status === "generated" && pred(e)).length;
}

/** Compare tuples lexicographically. */
function cmp(a: number[], b: number[]): number {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}

export function locationTopic(location: Location, audience: Audience, angle: LocationAngle): LocationTopic {
  const vars = templateVars(audience, location);
  const suggestedKeyword = fill(angle.keyword, vars);
  return {
    type: "location",
    key: `location:${location.id}:${audience.id}`,
    location,
    audience,
    angle,
    suggestedKeyword,
    workingTitle: suggestedKeyword,
  };
}

export function serviceTopic(service: Service, audience: Audience): ServiceTopic {
  const suggestedKeyword = fill(service.keyword, templateVars(audience));
  return {
    type: "service",
    key: `service:${service.id}:${audience.id}`,
    service,
    audience,
    suggestedKeyword,
    workingTitle: `${service.name} for ${audience.name}`,
  };
}

export function pickLocationTopic(
  ctx: PickContext,
  locations: Location[],
  audiences: Audience[],
  angles: LocationAngle[],
): LocationTopic | null {
  let best: { topic: LocationTopic; score: number[] } | null = null;

  for (const location of locations) {
    const locUses = countBy(ctx.ledger, (e) => e.key.startsWith(`location:${location.id}:`));
    for (const audience of audiences) {
      const key = `location:${location.id}:${audience.id}`;
      if (blocked(key, ctx.ledger)) continue;

      const audUses =
        countBy(ctx.ledger, (e) => e.type === "location" && e.key.endsWith(`:${audience.id}`)) +
        (audience.kind === "trade" ? 0 : localBusinessPenalty);

      // Rotate angles: least used for this audience, then least used overall.
      const angle = [...angles].sort(
        (a, b) =>
          countBy(ctx.ledger, (e) => e.angle === a.id && e.key.endsWith(`:${audience.id}`)) -
            countBy(ctx.ledger, (e) => e.angle === b.id && e.key.endsWith(`:${audience.id}`)) ||
          countBy(ctx.ledger, (e) => e.angle === a.id) - countBy(ctx.ledger, (e) => e.angle === b.id) ||
          hash(ctx.date + a.id) - hash(ctx.date + b.id),
      )[0];

      const topic = locationTopic(location, audience, angle);
      if (tooCloseToExisting(topic.workingTitle, ctx.existing)) continue;

      const score = [
        Math.floor(locUses / locationRoundSize),
        location.tier,
        locUses,
        audUses,
        hash(`${ctx.date}:${key}`),
      ];
      if (!best || cmp(score, best.score) < 0) best = { topic, score };
    }
  }
  return best?.topic ?? null;
}

export function pickServiceTopic(
  ctx: PickContext,
  services: Service[],
  audiences: Audience[],
  excludePairs: string[],
  avoidAudienceId?: string,
): ServiceTopic | null {
  let best: { topic: ServiceTopic; score: number[] } | null = null;

  for (const service of services) {
    const svcUses = countBy(ctx.ledger, (e) => e.key.startsWith(`service:${service.id}:`));
    for (const audience of audiences) {
      if (excludePairs.includes(`${service.id}:${audience.id}`)) continue;
      const key = `service:${service.id}:${audience.id}`;
      if (blocked(key, ctx.ledger)) continue;

      const topic = serviceTopic(service, audience);
      if (tooCloseToExisting(topic.workingTitle, ctx.existing)) continue;

      const audUses =
        countBy(ctx.ledger, (e) => e.type === "service" && e.key.endsWith(`:${audience.id}`)) +
        (audience.kind === "trade" ? 0 : localBusinessPenalty);

      const score = [
        audience.id === avoidAudienceId ? 1 : 0,
        svcUses + audUses,
        svcUses,
        hash(`${ctx.date}:${key}`),
      ];
      if (!best || cmp(score, best.score) < 0) best = { topic, score };
    }
  }
  return best?.topic ?? null;
}
