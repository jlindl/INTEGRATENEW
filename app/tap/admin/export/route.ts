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

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return new NextResponse("Not allowed", { status: 401 });
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
  const csv = rows.map((r) => r.map(cell).join(",")).join("\r\n");
  const name = `tap-plates-${(batch ?? "all").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`;
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
