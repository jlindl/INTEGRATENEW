import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/tap/auth";
import { plateUrl } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";

/**
 * Plates CSV: each plate's code and the link to write onto its tag.
 * `?type=customers` exports business contacts instead.
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
  const rows = [
    ["code", "plate_url", "batch", "status", "serial", "taps"],
    ...plates.map((p) => [
      p.code,
      plateUrl(p.code),
      p.batch,
      p.status,
      p.serial ?? "",
      p.taps,
    ]),
  ];
  return csvResponse(rows, `tap-plates-${(batch ?? "all").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`);
}
