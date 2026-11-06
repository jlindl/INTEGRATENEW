"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentBusiness, endSession, hashPassword, startSession, verifyPassword } from "./auth";
import { newId, normaliseCode, normaliseSetupCode, slugify } from "./codes";
import { KIND_INFO, normaliseUrl } from "./links";
import { getStore } from "./store";
import type { Business, BusinessLink, LinkKind, TapMode } from "./types";

export type FormState = { error?: string; ok?: string; values?: Record<string, string> };

/**
 * React resets a form after its action runs, so on an error we hand back what
 * was typed (never passwords) and the form re-fills itself from it.
 */
function keep(fd: FormData, error: string): FormState {
  const values: Record<string, string> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string" && !/password|^\$/i.test(k)) values[k] = v;
  return { error, values };
}

const MAX_FAILED_CLAIMS = 10;
const MAX_LOGO_CHARS = 300_000;

/** UK-friendly phone check: 10 to 15 digits once spaces and + are removed. */
function cleanPhone(raw: string): string | null {
  const v = raw.replace(/[\s()-]/g, "");
  return /^\+?\d{10,15}$/.test(v) ? v : null;
}

function str(fd: FormData, key: string, max = 200): string {
  return String(fd.get(key) ?? "").trim().slice(0, max);
}

async function uniqueSlug(name: string): Promise<string> {
  const store = getStore();
  const base = slugify(name);
  let slug = base;
  for (let n = 2; await store.getBusinessBySlug(slug); n++) slug = `${base}-${n}`;
  return slug;
}

/* ---------------------------------------------------------- find plate -- */

/** "I have a plate" box on /tap: type the code from the card. */
export async function findPlate(_: FormState, fd: FormData): Promise<FormState> {
  const code = normaliseCode(str(fd, "code", 20));
  if (code.length !== 6) return keep(fd, "Plate codes are 6 characters, e.g. K7QM3X.");
  const plate = await getStore().getPlate(code);
  if (!plate) return keep(fd, "We couldn't find that plate. Check the code on your card.");
  redirect(`/tap/setup/${code}`);
}

/* --------------------------------------------------------------- claim -- */

export async function claimPlate(_: FormState, fd: FormData): Promise<FormState> {
  const store = getStore();
  const code = normaliseCode(str(fd, "code", 20));
  const setupCode = normaliseSetupCode(str(fd, "setupCode", 20));
  const label = str(fd, "label", 40) || "Plate";

  const plate = await store.getPlate(code);
  if (!plate) return keep(fd, "This plate doesn't exist.");
  if (plate.status === "claimed") return keep(fd, "This plate has already been set up.");
  if (plate.status === "disabled") return keep(fd, "This plate has been switched off. Contact Integrate for help.");
  if (plate.failedClaims >= MAX_FAILED_CLAIMS) {
    return keep(fd, "Too many wrong setup codes. Contact Integrate and we'll unlock it for you.");
  }
  if (setupCode !== plate.setupCode) {
    await store.failClaim(code);
    return keep(fd, "That setup code doesn't match. It's printed on the card that came with your plate.");
  }

  let business = await currentBusiness();

  if (!business) {
    const name = str(fd, "businessName", 80);
    const email = str(fd, "email", 120).toLowerCase();
    const password = String(fd.get("password") ?? "");
    const googleRaw = str(fd, "googleUrl", 500);
    const contactName = str(fd, "contactName", 80);
    const phone = cleanPhone(str(fd, "phone", 30));
    const marketingConsent = fd.get("marketingConsent") === "on";

    if (name.length < 2) return keep(fd, "Enter your business name.");
    if (contactName.length < 2) return keep(fd, "Enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return keep(fd, "Enter a valid email address.");
    if (!phone) return keep(fd, "Enter a valid phone number, e.g. 07700 900123.");
    if (password.length < 8) return keep(fd, "Choose a password of at least 8 characters.");
    if (await store.getBusinessByEmail(email)) {
      return keep(fd, "There's already an account with that email. Log in first, then add this plate.");
    }

    const links: BusinessLink[] = [];
    if (googleRaw) {
      const url = normaliseUrl("google", googleRaw);
      if (!url) return keep(fd, "That Google review link doesn't look right. Paste the full link.");
      links.push({ id: newId(), kind: "google", label: KIND_INFO.google.label, url });
    }

    const now = new Date().toISOString();
    business = {
      id: newId(),
      slug: await uniqueSlug(name),
      name,
      tagline: "",
      email,
      passwordHash: await hashPassword(password),
      contactName,
      phone,
      marketingConsent,
      consentAt: now,
      logo: null,
      // With only a review link, sending taps straight to it is the most useful default.
      mode: links.length ? "redirect" : "page",
      redirectLinkId: links[0]?.id ?? null,
      links,
      createdAt: now,
      updatedAt: now,
    } satisfies Business;
    await store.insertBusiness(business);
    await startSession(business.id);
  }

  await store.updatePlate(code, {
    status: "claimed",
    businessId: business.id,
    label,
    claimedAt: new Date().toISOString(),
    failedClaims: 0,
  });
  redirect("/tap/dashboard?claimed=" + code);
}

/* --------------------------------------------------------------- login -- */

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email", 120).toLowerCase();
  const password = String(fd.get("password") ?? "");
  const next = str(fd, "next", 200);
  const b = await getStore().getBusinessByEmail(email);
  if (!b || !(await verifyPassword(password, b.passwordHash))) {
    return keep(fd, "Email or password is wrong.");
  }
  await startSession(b.id);
  // Only allow returning to our own pages.
  redirect(next.startsWith("/tap/") ? next : "/tap/dashboard");
}

export async function logout() {
  await endSession();
  redirect("/tap/login");
}

/* ------------------------------------------------------------ dashboard -- */

export async function saveBusiness(_: FormState, fd: FormData): Promise<FormState> {
  const b = await currentBusiness();
  if (!b) redirect("/tap/login");

  const name = str(fd, "name", 80);
  if (name.length < 2) return { error: "Business name is too short." };
  const tagline = str(fd, "tagline", 140);
  const contactName = str(fd, "contactName", 80);
  if (contactName.length < 2) return { error: "Enter a contact name." };
  const phone = cleanPhone(str(fd, "phone", 30));
  if (!phone) return { error: "Enter a valid phone number, e.g. 07700 900123." };
  const marketingConsent = fd.get("marketingConsent") === "on";
  const consentAt = marketingConsent === Boolean(b.marketingConsent) ? b.consentAt ?? null : new Date().toISOString();
  const mode: TapMode = fd.get("mode") === "redirect" ? "redirect" : "page";

  let rawLinks: { id?: string; kind?: string; label?: string; url?: string }[];
  try {
    rawLinks = JSON.parse(String(fd.get("links") ?? "[]"));
    if (!Array.isArray(rawLinks)) throw new Error();
  } catch {
    return { error: "Couldn't read your links. Refresh and try again." };
  }

  const links: BusinessLink[] = [];
  for (const l of rawLinks.slice(0, 12)) {
    const kind = (l.kind && l.kind in KIND_INFO ? l.kind : "custom") as LinkKind;
    if (!l.url?.trim()) continue;
    const url = normaliseUrl(kind, l.url);
    if (!url) return { error: `This link doesn't look right: ${l.url.slice(0, 60)}` };
    links.push({
      id: l.id && /^[a-z0-9]{6,24}$/.test(l.id) ? l.id : newId(),
      kind,
      label: (l.label ?? "").trim().slice(0, 50) || KIND_INFO[kind].label,
      url,
    });
  }

  let redirectLinkId = str(fd, "redirectLinkId", 40) || null;
  if (mode === "redirect") {
    if (!links.length) return { error: "Add at least one link before sending taps straight to it." };
    if (!links.some((l) => l.id === redirectLinkId)) {
      redirectLinkId = (links.find((l) => l.kind === "google") ?? links[0]).id;
    }
  }

  const logoField = String(fd.get("logo") ?? "keep");
  let logo = b.logo;
  if (logoField === "") logo = null;
  else if (logoField !== "keep") {
    if (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(logoField) || logoField.length > MAX_LOGO_CHARS) {
      return { error: "That logo couldn't be used. Try a PNG or JPG under 5MB." };
    }
    logo = logoField;
  }

  await getStore().updateBusiness(b.id, { name, tagline, contactName, phone, marketingConsent, consentAt, mode, redirectLinkId, links, logo });
  revalidatePath(`/b/${b.slug}`);
  revalidatePath("/tap/dashboard");
  return { ok: "Saved. Your plates now use these settings." };
}

export async function renamePlate(fd: FormData) {
  const b = await currentBusiness();
  if (!b) redirect("/tap/login");
  const code = normaliseCode(str(fd, "code", 20));
  const plate = await getStore().getPlate(code);
  if (plate?.businessId !== b.id) return;
  await getStore().updatePlate(code, { label: str(fd, "label", 40) || "Plate" });
  revalidatePath("/tap/dashboard");
}
