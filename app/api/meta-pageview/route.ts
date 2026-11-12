import { NextResponse } from "next/server";
import { sendMetaPageView } from "@/lib/metaCapi";

/**
 * POST /api/meta-pageview
 *
 * Called once by <MetaPixel /> when someone lands on /trades from a Meta ad
 * (fbclid in the URL) and has not made a cookie choice, so the browser pixel
 * is not loaded. Sends a cookieless PageView to Meta from the server so the
 * ad click is matched to the visit. See sendMetaPageView in lib/metaCapi.ts.
 *
 * Only accepts /trades URLs on our own domains with a plausible fbclid, so it
 * can't be used to send arbitrary events to the dataset.
 */

const ALLOWED_HOSTS = new Set(["www.integrate-tech.co.uk", "integrate-tech.co.uk"]);
const FBCLID_RE = /^[A-Za-z0-9_-]{10,500}$/;
const EVENT_ID_RE = /^[A-Za-z0-9-]{8,100}$/;

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const eventId = typeof r.eventId === "string" ? r.eventId : "";
  const pageUrl = typeof r.url === "string" ? r.url.slice(0, 1000) : "";

  let url: URL;
  try {
    url = new URL(pageUrl);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const fbclid = url.searchParams.get("fbclid") || "";
  const hostOk = ALLOWED_HOSTS.has(url.hostname) || url.hostname === new URL(req.url).hostname;
  if (!hostOk || !url.pathname.startsWith("/trades") || !FBCLID_RE.test(fbclid) || !EVENT_ID_RE.test(eventId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = await sendMetaPageView(req, {
    eventId,
    eventSourceUrl: url.toString(),
    fbc: `fb.1.${Date.now()}.${fbclid}`,
  });
  return NextResponse.json({ ok: result.sent });
}
