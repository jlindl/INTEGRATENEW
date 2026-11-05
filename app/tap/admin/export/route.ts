import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/tap/auth";
import { plateUrl } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";

/**
 * CSV for printing insert cards. setup_url carries the setup code so the QR on
 * the card opens a pre-filled setup form. Treat this file as secret: anyone
 * with a setup code can claim that plate.
 */
export const dynamic = "force-dynamic";

const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

function csvResponse(rows: (string | number)[][], name: string) {
  return new NextResponse(rows.map((r) => r.map(cell).join(",")).join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}

/** Everyone who has set up a plate. Only market to rows with marketing_consent = yes. */
async function customers() {
  const store = getStore();
  const [businesses, plates] = await Promise.all([store.listBusinesses(), store.listPlates()]);
  const rows: (string | number)[][] = [
    ["business", "contact_name", "email", "phone", "marketing_consent", "consent_updated", "plates", "taps", "signed_up", "page_url"],
    ...businesses.map((b) => {
      const mine = plates.filter((p) => p.businessId === b.id);
      return [
        b.name,
        b.contactName ?? "",
        b.email,
        b.phone ?? "",
        b.marketingConsent ? "yes" : "no",
        b.consentAt ?? "",
        mine.length,
        mine.reduce((s, p) => s + p.taps, 0),
        b.createdAt,
        `${new URL(plateUrl("X")).origin}/b/${b.slug}`,
      ];
    }),
  ];
  return csvResponse(rows, "tap-customers.csv");
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return new NextResponse("Not allowed", { status: 401 });
  if (req.nextUrl.searchParams.get("type") === "customers") return customers();
  const batch = req.nextUrl.searchParams.get("batch") || undefined;
  const plates = (await getStore().listPlates(batch ? { batch } : {})).sort((a, b) => a.code.localeCompare(b.code));
  const base = new URL(plateUrl("X")).origin;
  const rows = [
    ["code", "setup_code", "plate_url", "setup_url", "batch", "status", "serial", "taps"],
    ...plates.map((p) => [
      p.code,
      p.setupCode,
      plateUrl(p.code),
      `${base}/tap/setup/${p.code}?s=${p.setupCode}`,
      p.batch,
      p.status,
      p.serial ?? "",
      p.taps,
    ]),
  ];
  return csvResponse(rows, `tap-plates-${(batch ?? "all").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`);
}
