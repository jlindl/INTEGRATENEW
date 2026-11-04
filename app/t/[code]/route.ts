import { NextResponse, type NextRequest } from "next/server";
import { normaliseCode } from "@/lib/tap/codes";
import { redirectTarget } from "@/lib/tap/links";
import { getStore, StoreNotConfiguredError } from "@/lib/tap/store";

/**
 * /t/CODE is the permanent link written on every plate. It never changes, so
 * it decides at tap time where to send the person:
 *
 *   not claimed yet → the setup page
 *   claimed         → the business's chosen link, or their hosted page
 *   disabled/unknown → a polite "this plate isn't active" page
 *
 * Always a 302 with no-store, so phones and CDNs never remember an old target.
 */
export const dynamic = "force-dynamic";

function go(req: NextRequest, to: string) {
  const res = NextResponse.redirect(new URL(to, req.url), 302);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normaliseCode((await params).code);
  try {
    const store = getStore();
    const plate = await store.getPlate(code);
    if (!plate || plate.status === "disabled") return go(req, `/tap/inactive?code=${encodeURIComponent(code)}`);
    if (plate.status !== "claimed" || !plate.businessId) return go(req, `/tap/setup/${code}`);

    const business = await store.getBusiness(plate.businessId);
    if (!business) return go(req, `/tap/inactive?code=${encodeURIComponent(code)}`);

    // Counting must never block or break the tap itself.
    await store.recordTap(code).catch(() => undefined);

    return go(req, redirectTarget(business) ?? `/b/${business.slug}`);
  } catch (e) {
    if (e instanceof StoreNotConfiguredError) return go(req, "/tap/inactive?reason=setup");
    throw e;
  }
}
