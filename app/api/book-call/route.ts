import { NextResponse } from "next/server";

/**
 * POST /api/book-call — receives the "Book a call" form and forwards the lead
 * to GoHighLevel (LeadConnector).
 *
 * Two integration styles are supported, configured entirely via env vars
 * (see .env.example). The webhook is preferred when set because it captures
 * every field (including the free-text message) for you to map in a GHL
 * Workflow; the Contacts API creates a proper contact from the standard fields.
 *
 *   1. Inbound Webhook  → GHL_WEBHOOK_URL
 *   2. Contacts API     → GHL_API_TOKEN + GHL_LOCATION_ID
 *
 * With neither configured, submissions are logged and accepted in development
 * (so the UI can be tested) and rejected in production.
 */

export const runtime = "nodejs";

const GHL_API_BASE = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

type Lead = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
  source?: string;
  // Extended "Getting Started" wizard fields — forwarded to the webhook for
  // mapping in a GHL Workflow. Optional so the simpler callers still work.
  firstName?: string;
  lastName?: string;
  businessName?: string;
  industry?: string;
  role?: string;
  website?: string;
  noWebsite?: boolean;
  primaryFocus?: string;
  bottleneck?: string;
  aiExperience?: string;
  vision?: string;
  timeline?: string;
  budget?: string;
  // Tags the calling form wants on the contact (e.g. ["webprospect"]).
  tags?: string[];
};

/** Sanitise caller-supplied tags: trimmed, deduped, bounded. */
function cleanTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const raw of value) {
    if (typeof raw !== "string") continue;
    const tag = raw.trim().slice(0, 60);
    if (tag) seen.add(tag);
    if (seen.size >= 10) break;
  }
  return [...seen];
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** POST a JSON body with a hard timeout so a slow upstream can't hang the route. */
async function postJson(url: string, body: unknown, headers: Record<string, string>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function forwardToWebhook(webhookUrl: string, lead: Lead) {
  const [firstFromName, ...rest] = lead.name.trim().split(/\s+/);
  const res = await postJson(webhookUrl, {
    ...lead,
    // Prefer the wizard's explicit parts; fall back to splitting the full name.
    firstName: lead.firstName || firstFromName,
    lastName: lead.lastName || rest.join(" ") || undefined,
    // Sent both ways: an array for Workflow "Add Tag" steps that accept one,
    // and a comma-joined string for the simpler custom-value mappings.
    tags: lead.tags ?? [],
    tagList: (lead.tags ?? []).join(","),
    submittedAt: new Date().toISOString(),
  }, {});
  if (!res.ok) throw new Error(`GHL webhook responded ${res.status}`);
}

async function upsertContact(token: string, locationId: string, lead: Lead) {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  // Forms that name their own tags (e.g. the contact page → "webprospect")
  // replace the default; otherwise this is a booking enquiry.
  const defaults = ["book-a-call"];
  if (process.env.GHL_BOOKING_TAG) defaults.push(process.env.GHL_BOOKING_TAG);

  const tags = lead.tags?.length ? [...lead.tags] : defaults;
  if (lead.interest) tags.push(lead.interest);

  const res = await postJson(
    `${GHL_API_BASE}/contacts/upsert`,
    {
      locationId,
      name: lead.name,
      firstName,
      lastName: rest.join(" ") || undefined,
      email: lead.email,
      phone: lead.phone || undefined,
      companyName: lead.company || undefined,
      source: lead.source || "Website — Book a call",
      tags,
    },
    {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      Accept: "application/json",
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GHL contacts API responded ${res.status} ${detail.slice(0, 200)}`);
  }

  const json = (await res.json().catch(() => null)) as
    | { contact?: { id?: string } }
    | null;
  const contactId = json?.contact?.id;

  // The upsert body has no field for free text, so the enquiry itself goes on
  // as a note. Best-effort: the lead is already saved, so a failure here is
  // logged rather than shown to the visitor as a failed submission.
  if (lead.message) {
    if (!contactId) {
      console.warn("[book-call] upsert returned no contact id — note not added");
      return contactId;
    }
    const noteRes = await postJson(
      `${GHL_API_BASE}/contacts/${contactId}/notes`,
      { body: `${lead.source || "Website"}:\n\n${lead.message}` },
      {
        Authorization: `Bearer ${token}`,
        Version: GHL_API_VERSION,
        Accept: "application/json",
      },
    ).catch((err) => {
      console.warn("[book-call] note request failed:", err);
      return null;
    });
    if (noteRes && !noteRes.ok) {
      console.warn(`[book-call] note not added: GHL responded ${noteRes.status}`);
    }
  }

  return contactId;
}

export async function POST(req: Request) {
  let data: Partial<Lead> & { company_website?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field. Trimmed, so a stray
  // space from an autofill can't silently bin a real lead.
  if (typeof data.company_website === "string" && data.company_website.trim()) {
    console.warn("[book-call] rejected: honeypot filled — not delivered");
    return NextResponse.json({ ok: true });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  if (!name || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name and a valid email." },
      { status: 422 },
    );
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "") || undefined;
  const lead: Lead = {
    name,
    email,
    phone: (data.phone || "").trim() || undefined,
    company: (data.company || "").trim() || undefined,
    interest: (data.interest || "").trim() || undefined,
    message: (data.message || "").trim() || undefined,
    source: (data.source || "").trim() || "Website — Book a call",
    // Extended wizard fields (all optional).
    firstName: str(data.firstName),
    lastName: str(data.lastName),
    businessName: str(data.businessName),
    industry: str(data.industry),
    role: str(data.role),
    website: str(data.website),
    noWebsite: data.noWebsite === true ? true : undefined,
    primaryFocus: str(data.primaryFocus),
    bottleneck: str(data.bottleneck),
    aiExperience: str(data.aiExperience),
    vision: str(data.vision),
    timeline: str(data.timeline),
    budget: str(data.budget),
    tags: cleanTags(data.tags),
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
  const token = process.env.GHL_API_TOKEN?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();

  // Which credentials the deploy can see, without ever printing them. This is
  // the first thing to read in the Vercel log when a lead doesn't show up.
  console.log(
    `[book-call] config: webhook=${webhookUrl ? (/^https?:\/\//.test(webhookUrl) ? "url" : "SET-BUT-NOT-A-URL") : "unset"} token=${token ? "set" : "unset"} location=${locationId ? "set" : "unset"}`,
  );

  // A non-URL webhook value (e.g. a pit- token pasted into the wrong variable)
  // would throw on fetch and 502 every lead. Ignore it and use the API instead.
  const usableWebhook = webhookUrl && /^https?:\/\//.test(webhookUrl) ? webhookUrl : undefined;
  if (webhookUrl && !usableWebhook) {
    console.error("[book-call] GHL_WEBHOOK_URL is not an http(s) URL — ignoring it; falling back to the Contacts API");
  }

  try {
    if (usableWebhook) {
      // NB: a GHL Inbound Webhook accepts the POST and returns 2xx whether or
      // not its Workflow is published or has a "Create Contact" action — so a
      // 200 here does NOT prove a contact was created. Say so in the log.
      await forwardToWebhook(usableWebhook, lead);
      console.log(
        `[book-call] delivered via webhook (${lead.email}) — contact creation depends on the GHL Workflow`,
      );
      return NextResponse.json({ ok: true, via: "webhook" });
    }
    if (token && locationId) {
      const contactId = await upsertContact(token, locationId, lead);
      console.log(`[book-call] delivered via contacts API (${lead.email}) — contact ${contactId ?? "id unknown"}`);
      return NextResponse.json({ ok: true, via: "contacts-api" });
    }
    console.error("[book-call] NOT DELIVERED: no GHL_WEBHOOK_URL and no GHL_API_TOKEN + GHL_LOCATION_ID");

    // Not configured yet.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[book-call] GHL not configured — lead not delivered:", lead);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json(
      { ok: false, error: "Booking is not configured yet." },
      { status: 503 },
    );
  } catch (err) {
    console.error("[book-call] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your details. Please try again or email us." },
      { status: 502 },
    );
  }
}
