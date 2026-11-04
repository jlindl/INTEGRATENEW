import { randomInt } from "node:crypto";
import { SITE_URL } from "@/lib/site";

/** No 0/O, 1/I/L: codes get read off cards and typed in by hand. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomString(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

/** Public plate code, e.g. "K7QM3X". 31^6 ≈ 887 million combinations. */
export function newPlateCode(): string {
  return randomString(6);
}

/** Secret setup code printed on the insert card, e.g. "H4TR-9WQP". */
export function newSetupCode(): string {
  return `${randomString(4)}-${randomString(4)}`;
}

/** Normalise anything a person might type: lowercase, spaces, missing dash. */
export function normaliseCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function normaliseSetupCode(input: string): string {
  const raw = normaliseCode(input);
  return raw.length === 8 ? `${raw.slice(0, 4)}-${raw.slice(4)}` : raw;
}

/**
 * The URL written onto the tag. Uses the www host directly because the apex
 * 308s to www, and every saved hop makes the tap feel faster.
 */
export function plateUrl(code: string): string {
  const base = (process.env.TAP_BASE_URL || SITE_URL).replace(/\/$/, "");
  return `${base}/t/${code}`;
}

export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "business"
  );
}

export function newId(): string {
  return `${Date.now().toString(36)}${randomString(6).toLowerCase()}`;
}
