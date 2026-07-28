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
};

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
    submittedAt: new Date().toISOString(),
  }, {});
  if (!res.ok) throw new Error(`GHL webhook responded ${res.status}`);
}

async function upsertContact(token: string, locationId: string, lead: Lead) {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const tags = ["book-a-call"];
  if (process.env.GHL_BOOKING_TAG) tags.push(process.env.GHL_BOOKING_TAG);
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
}

export async function POST(req: Request) {
  let data: Partial<Lead> & { company_website?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field.
  if (data.company_website) {
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
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  try {
    if (webhookUrl) {
      await forwardToWebhook(webhookUrl, lead);
      return NextResponse.json({ ok: true });
    }
    if (token && locationId) {
      await upsertContact(token, locationId, lead);
      return NextResponse.json({ ok: true });
    }

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
