"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminLogin, adminLogout, isAdmin } from "./auth";
import { newPlateCode, newSetupCode, normaliseCode, plateUrl } from "./codes";
import { getStore } from "./store";
import type { Plate } from "./types";
import type { FormState } from "./actions";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/tap/admin/login");
}

export async function adminLoginAction(_: FormState, fd: FormData): Promise<FormState> {
  if (!(await adminLogin(String(fd.get("password") ?? "")))) return { error: "Wrong password." };
  redirect("/tap/admin");
}

export async function adminLogoutAction() {
  await adminLogout();
  redirect("/tap/admin/login");
}

/** Create a batch of plate codes ready to be written to tags. */
export async function generatePlates(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const count = Math.floor(Number(fd.get("count")));
  const batch = String(fd.get("batch") ?? "").trim().slice(0, 60);
  if (!Number.isFinite(count) || count < 1 || count > 500) return { error: "Make between 1 and 500 plates at a time." };
  if (!batch) return { error: "Give the batch a name, e.g. \"Amazon Nov 2026\"." };

  const store = getStore();
  const now = new Date().toISOString();
  const plates: Plate[] = [];
  const used = new Set<string>();
  while (plates.length < count) {
    const code = newPlateCode();
    if (used.has(code) || (await store.getPlate(code))) continue;
    used.add(code);
    plates.push({
      code,
      setupCode: newSetupCode(),
      status: "unencoded",
      batch,
      businessId: null,
      label: "",
      serial: null,
      locked: false,
      encodedAt: null,
      claimedAt: null,
      taps: 0,
      lastTapAt: null,
      dailyTaps: {},
      failedClaims: 0,
      createdAt: now,
    });
  }
  await store.insertPlates(plates);
  revalidatePath("/tap/admin");
  return { ok: `Created ${count} plates in "${batch}".` };
}

export async function plateAction(fd: FormData) {
  await requireAdmin();
  const code = normaliseCode(String(fd.get("code") ?? ""));
  const action = String(fd.get("action"));
  const store = getStore();
  const plate = await store.getPlate(code);
  if (!plate) return;
  const settled = plate.encodedAt ? "ready" : "unencoded";
  if (action === "disable") await store.updatePlate(code, { status: "disabled" });
  else if (action === "enable") await store.updatePlate(code, { status: plate.businessId ? "claimed" : settled });
  else if (action === "release") {
    // Detach from the business so it can be claimed again (e.g. resold or wrong account).
    await store.updatePlate(code, { status: settled, businessId: null, label: "", claimedAt: null, failedClaims: 0 });
  } else if (action === "unlock-claims") await store.updatePlate(code, { failedClaims: 0 });
  revalidatePath("/tap/admin");
}

/* ------------------------------------------------------------- encoder -- */

export type EncodeItem = { code: string; url: string; batch: string };

export async function encodeQueue(batch: string): Promise<EncodeItem[]> {
  await requireAdmin();
  const plates = await getStore().listPlates({ status: "unencoded", ...(batch ? { batch } : {}) });
  return plates
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((p) => ({ code: p.code, url: plateUrl(p.code), batch: p.batch }));
}

/** Called by the Android encoder once a tag has been written (and locked). */
export async function markEncoded(code: string, serial: string | null, locked: boolean) {
  await requireAdmin();
  const store = getStore();
  const plate = await store.getPlate(normaliseCode(code));
  if (!plate) return { ok: false, error: "Unknown plate" };
  if (serial) {
    const clash = (await store.listPlates()).find((p) => p.serial === serial && p.code !== plate.code);
    if (clash) return { ok: false, error: `This chip is already registered as plate ${clash.code}.` };
  }
  await store.updatePlate(plate.code, {
    serial,
    locked,
    encodedAt: new Date().toISOString(),
    status: plate.status === "unencoded" ? "ready" : plate.status,
  });
  return { ok: true };
}

/** Look up what a scanned tag is, for the encoder's "check a plate" mode. */
export async function lookupScanned(url: string | null, serial: string | null) {
  await requireAdmin();
  const store = getStore();
  const m = url?.match(/\/t\/([A-Z0-9]{6})(?:[/?#]|$)/i);
  let plate = m ? await store.getPlate(m[1].toUpperCase()) : null;
  if (!plate && serial) plate = (await store.listPlates()).find((p) => p.serial === serial) ?? null;
  if (!plate) return null;
  const business = plate.businessId ? await store.getBusiness(plate.businessId) : null;
  return { code: plate.code, status: plate.status, batch: plate.batch, business: business?.name ?? null, taps: plate.taps };
}
