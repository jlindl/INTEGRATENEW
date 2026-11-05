import "server-only";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getStore } from "./store";
import type { Business } from "./types";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

const SESSION_COOKIE = "tap_session";
const ADMIN_COOKIE = "tap_admin";
const SESSION_DAYS = 30;
const ADMIN_HOURS = 12;

function secret(): string {
  const s = process.env.TAP_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("TAP_SECRET must be set (32+ random characters) in production.");
  }
  return "dev-only-tap-secret-do-not-use-in-production-000";
}

/* ------------------------------------------------------------ passwords -- */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, saltB64, hashB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

/* ------------------------------------------------------- signed tokens -- */

function sign(payload: object): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

function unsign<T extends { exp: number }>(token: string | undefined): T | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = createHmac("sha256", secret()).update(body).digest();
  const given = Buffer.from(mac, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as T;
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/* ------------------------------------------------------------ customers -- */

export async function startSession(businessId: string) {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  (await cookies()).set(SESSION_COOKIE, sign({ bid: businessId, exp }), {
    ...cookieBase,
    expires: new Date(exp),
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** The signed-in business, or null. */
export async function currentBusiness(): Promise<Business | null> {
  const data = unsign<{ bid: string; exp: number }>((await cookies()).get(SESSION_COOKIE)?.value);
  if (!data) return null;
  return getStore().getBusiness(data.bid);
}

/* ---------------------------------------------------------------- admin -- */

export function adminConfigured(): boolean {
  return Boolean(process.env.TAP_ADMIN_PASSWORD) || process.env.NODE_ENV !== "production";
}

/** Dev default "admin" so the tool is testable locally without setup. */
function adminPassword(): string {
  return process.env.TAP_ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "admin" : "");
}

export async function adminLogin(password: string): Promise<boolean> {
  const expected = adminPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const exp = Date.now() + ADMIN_HOURS * 36e5;
  (await cookies()).set(ADMIN_COOKIE, sign({ admin: true, exp }), { ...cookieBase, expires: new Date(exp) });
  return true;
}

export async function adminLogout() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  return Boolean(unsign<{ admin: boolean; exp: number }>((await cookies()).get(ADMIN_COOKIE)?.value)?.admin);
}
