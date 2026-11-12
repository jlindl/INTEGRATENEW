import { createHash } from "node:crypto";
import { META_PIXEL_ID, normalisePhone } from "@/lib/metaPixel";

/**
 * Meta Conversions API: sends each form lead from the server as well as from
 * the browser pixel, so leads still count when an ad blocker or Safari's
 * tracking limits stop the pixel. The browser and server events share an
 * event_id, so Meta counts each lead once.
 *
 * Sent for visitors who accepted cookies (the form passes consent: true), and
 * on the /trades form also for visitors who made no cookie choice (serverLead:
 * true, no cookies used). Never sent for a visitor who clicked "Reject".
 * Does nothing until META_CAPI_TOKEN is set in Vercel. Never throws: a failure
 * here is logged and the lead still goes to GoHighLevel as normal.
 *
 * Env:
 *   META_CAPI_TOKEN      Events Manager > dataset > Settings > Conversions API > Generate access token
 *   META_CAPI_TEST_CODE  optional, from Events Manager > Test events, to see events there live
 *   META_GRAPH_VERSION   optional, defaults to v24.0
 */

export type MetaClientContext = {
  consent?: boolean;
  /** No cookie choice made, but the form allows a cookieless server-side lead. */
  serverLead?: boolean;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
};

type LeadForMeta = {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  industry?: string;
};

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const clip = (v: unknown, max = 500) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

/** Read the browser context the form sent, accepting only plain short strings. */
export function readMetaContext(raw: unknown): MetaClientContext | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  if (r.consent !== true) {
    // Cookieless lead (no cookie choice made, /trades form): no _fbp, only
    // the click id that came in on the ad URL.
    if (r.serverLead === true) {
      return {
        consent: false,
        serverLead: true,
        eventId: clip(r.eventId, 100),
        eventSourceUrl: clip(r.eventSourceUrl, 1000),
        fbc: clip(r.fbc, 500),
      };
    }
    return { consent: false };
  }
  return {
    consent: true,
    eventId: clip(r.eventId, 100),
    eventSourceUrl: clip(r.eventSourceUrl, 1000),
    fbp: clip(r.fbp, 200),
    fbc: clip(r.fbc, 500),
  };
}

/**
 * Cookieless PageView for a visitor who landed on /trades from a Meta ad and
 * has not made a cookie choice yet (so the browser pixel is not loaded). Uses
 * only the fbclid from the ad URL plus the request's IP and user agent, the
 * same basis as the cookieless /trades lead. Lets Meta see that the ad click
 * reached the page. Never sent for a visitor who clicked "Reject" (the browser
 * checks that before calling /api/meta-pageview).
 */
export async function sendMetaPageView(
  req: Request,
  ctx: { eventId: string; eventSourceUrl: string; fbc: string },
) {
  const token = process.env.META_CAPI_TOKEN?.trim();
  if (!token) return { sent: false as const, reason: "no token" };

  const userData: Record<string, unknown> = { fbc: ctx.fbc };
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const ua = req.headers.get("user-agent") || undefined;
  if (ip) userData.client_ip_address = ip;
  if (ua) userData.client_user_agent = ua;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        event_id: ctx.eventId,
        action_source: "website",
        event_source_url: ctx.eventSourceUrl,
        user_data: userData,
      },
    ],
  };
  const testCode = process.env.META_CAPI_TEST_CODE?.trim();
  if (testCode) body.test_event_code = testCode;

  const version = process.env.META_GRAPH_VERSION?.trim() || "v24.0";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  try {
    const res = await fetch(
      `https://graph.facebook.com/${version}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    const text = await res.text().catch(() => "");
    if (res.ok) {
      console.log(`[meta-capi] PageView sent (event ${ctx.eventId}) ${text.slice(0, 120)}`);
      return { sent: true as const };
    }
    console.error(`[meta-capi] PageView: Meta responded ${res.status}: ${text.slice(0, 300)}`);
    return { sent: false as const, reason: `meta ${res.status}` };
  } catch (err) {
    console.error("[meta-capi] PageView request failed:", err instanceof Error ? err.message : err);
    return { sent: false as const, reason: "request failed" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendMetaLead(req: Request, lead: LeadForMeta, ctx: MetaClientContext | undefined) {
  const token = process.env.META_CAPI_TOKEN?.trim();
  if (!token) return;
  if (!(ctx?.consent || ctx?.serverLead) || !ctx.eventId) {
    console.log("[meta-capi] skipped: visitor rejected cookies or form does not allow a cookieless lead");
    return;
  }

  const userData: Record<string, unknown> = {
    em: [sha256(lead.email.trim().toLowerCase())],
  };
  const ph = lead.phone ? normalisePhone(lead.phone) : "";
  if (ph) userData.ph = [sha256(ph)];
  const fn = lead.firstName?.trim().toLowerCase();
  const ln = lead.lastName?.trim().toLowerCase();
  if (fn) userData.fn = [sha256(fn)];
  if (ln) userData.ln = [sha256(ln)];
  if (ctx.fbp) userData.fbp = ctx.fbp;
  if (ctx.fbc) userData.fbc = ctx.fbc;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
  const ua = req.headers.get("user-agent") || undefined;
  if (ip) userData.client_ip_address = ip;
  if (ua) userData.client_user_agent = ua;

  const customData: Record<string, string> = {};
  if (lead.source) customData.content_name = lead.source;
  if (lead.industry) customData.content_category = lead.industry;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: ctx.eventId,
        action_source: "website",
        event_source_url: ctx.eventSourceUrl,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  const testCode = process.env.META_CAPI_TEST_CODE?.trim();
  if (testCode) body.test_event_code = testCode;

  const version = process.env.META_GRAPH_VERSION?.trim() || "v24.0";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  try {
    const res = await fetch(
      `https://graph.facebook.com/${version}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    const text = await res.text().catch(() => "");
    if (res.ok) console.log(`[meta-capi] Lead sent (event ${ctx.eventId}) ${text.slice(0, 120)}`);
    else console.error(`[meta-capi] Meta responded ${res.status}: ${text.slice(0, 300)}`);
  } catch (err) {
    console.error("[meta-capi] request failed:", err instanceof Error ? err.message : err);
  } finally {
    clearTimeout(timeout);
  }
}
