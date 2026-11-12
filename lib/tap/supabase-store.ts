import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database, TapBusinessRow, TapBusinessUpdate, TapPlateRow, TapPlateUpdate } from "./database.types";
import type { TapStore } from "./store";
import type { Business, BusinessLink, Plate } from "./types";

/**
 * Supabase-backed TapStore (schema: supabase/migrations/*_tap_plates.sql).
 *
 * Server only, with the service role key: the tables have RLS on and no
 * grants for anon/authenticated, so this is the only way in.
 */

const PAGE = 1000; // PostgREST's default max rows per request.

/* -------------------------------------------------------------- mapping -- */

function plateFromRow(r: TapPlateRow): Plate {
  return {
    code: r.code,
    setupCode: r.setup_code,
    status: r.status as Plate["status"],
    batch: r.batch,
    businessId: r.business_id,
    label: r.label,
    serial: r.serial,
    locked: r.locked,
    encodedAt: r.encoded_at,
    claimedAt: r.claimed_at,
    taps: r.taps,
    lastTapAt: r.last_tap_at,
    dailyTaps: (r.daily_taps ?? {}) as Record<string, number>,
    failedClaims: r.failed_claims,
    createdAt: r.created_at,
  };
}

const PLATE_COLUMNS = {
  code: "code",
  setupCode: "setup_code",
  status: "status",
  batch: "batch",
  businessId: "business_id",
  label: "label",
  serial: "serial",
  locked: "locked",
  encodedAt: "encoded_at",
  claimedAt: "claimed_at",
  taps: "taps",
  lastTapAt: "last_tap_at",
  dailyTaps: "daily_taps",
  failedClaims: "failed_claims",
  createdAt: "created_at",
} as const satisfies Record<keyof Plate, keyof TapPlateRow>;

function plateToRow(p: Partial<Plate>): TapPlateUpdate {
  const row: Record<string, unknown> = {};
  for (const [k, col] of Object.entries(PLATE_COLUMNS)) {
    const v = p[k as keyof Plate];
    if (v !== undefined) row[col] = v;
  }
  return row as TapPlateUpdate;
}

function businessFromRow(r: TapBusinessRow): Business {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    email: r.email,
    passwordHash: r.password_hash,
    contactName: r.contact_name,
    phone: r.phone,
    marketingConsent: r.marketing_consent,
    consentAt: r.consent_at,
    logo: r.logo,
    mode: r.mode as Business["mode"],
    redirectLinkId: r.redirect_link_id,
    links: (r.links ?? []) as BusinessLink[],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

const BUSINESS_COLUMNS = {
  id: "id",
  slug: "slug",
  name: "name",
  tagline: "tagline",
  email: "email",
  passwordHash: "password_hash",
  contactName: "contact_name",
  phone: "phone",
  marketingConsent: "marketing_consent",
  consentAt: "consent_at",
  logo: "logo",
  mode: "mode",
  redirectLinkId: "redirect_link_id",
  links: "links",
  createdAt: "created_at",
  updatedAt: "updated_at",
} as const satisfies Record<keyof Business, keyof TapBusinessRow>;

function businessToRow(b: Partial<Business>): TapBusinessUpdate {
  const row: Record<string, unknown> = {};
  for (const [k, col] of Object.entries(BUSINESS_COLUMNS)) {
    const v = b[k as keyof Business];
    if (v !== undefined) row[col] = v;
  }
  return row as TapBusinessUpdate;
}

function fail(what: string, error: { message: string } | null): never {
  throw new Error(`Integrate Tap database error (${what}): ${error?.message ?? "unknown"}`);
}

/* ---------------------------------------------------------------- store -- */

export class SupabaseStore implements TapStore {
  private db: SupabaseClient<Database>;

  constructor(url: string, serviceRoleKey: string) {
    this.db = createClient<Database>(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      // Never let Next.js cache database reads.
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    });
  }

  async getPlate(code: string) {
    const { data, error } = await this.db.from("tap_plates").select("*").eq("code", code).maybeSingle();
    if (error) fail("getPlate", error);
    return data ? plateFromRow(data) : null;
  }

  async listPlates(filter: { batch?: string; status?: Plate["status"]; businessId?: string } = {}) {
    const out: Plate[] = [];
    for (let from = 0; ; from += PAGE) {
      let q = this.db.from("tap_plates").select("*");
      if (filter.batch) q = q.eq("batch", filter.batch);
      if (filter.status) q = q.eq("status", filter.status);
      if (filter.businessId) q = q.eq("business_id", filter.businessId);
      const { data, error } = await q
        .order("created_at", { ascending: false })
        .order("code", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) fail("listPlates", error);
      out.push(...data.map(plateFromRow));
      if (data.length < PAGE) return out;
    }
  }

  async insertPlates(plates: Plate[]) {
    if (!plates.length) return;
    const rows = plates.map((p) => plateToRow(p) as Database["public"]["Tables"]["tap_plates"]["Insert"]);
    const { error } = await this.db.from("tap_plates").insert(rows);
    if (error) fail("insertPlates", error);
  }

  async updatePlate(code: string, patch: Partial<Plate>) {
    const row = plateToRow({ ...patch, code: undefined });
    if (!Object.keys(row).length) return this.getPlate(code);
    const { data, error } = await this.db.from("tap_plates").update(row).eq("code", code).select("*").maybeSingle();
    if (error) fail("updatePlate", error);
    return data ? plateFromRow(data) : null;
  }

  async recordTap(code: string) {
    const { error } = await this.db.rpc("tap_record", { p_code: code });
    if (error) fail("recordTap", error);
  }

  async failClaim(code: string) {
    const { data, error } = await this.db.rpc("tap_fail_claim", { p_code: code });
    if (error) fail("failClaim", error);
    return data ?? 0;
  }

  async getBusiness(id: string) {
    const { data, error } = await this.db.from("tap_businesses").select("*").eq("id", id).maybeSingle();
    if (error) fail("getBusiness", error);
    return data ? businessFromRow(data) : null;
  }

  async getBusinessBySlug(slug: string) {
    const { data, error } = await this.db.from("tap_businesses").select("*").eq("slug", slug).maybeSingle();
    if (error) fail("getBusinessBySlug", error);
    return data ? businessFromRow(data) : null;
  }

  async getBusinessByEmail(email: string) {
    const e = email.trim().toLowerCase();
    const { data, error } = await this.db.from("tap_businesses").select("*").eq("email", e).maybeSingle();
    if (error) fail("getBusinessByEmail", error);
    return data ? businessFromRow(data) : null;
  }

  async listBusinesses() {
    const out: Business[] = [];
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await this.db
        .from("tap_businesses")
        .select("*")
        .order("name", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) fail("listBusinesses", error);
      out.push(...data.map(businessFromRow));
      if (data.length < PAGE) return out;
    }
  }

  async insertBusiness(b: Business) {
    const row = businessToRow(b) as Database["public"]["Tables"]["tap_businesses"]["Insert"];
    const { error } = await this.db.from("tap_businesses").insert(row);
    if (error) fail("insertBusiness", error);
  }

  async updateBusiness(id: string, patch: Partial<Business>) {
    // updated_at is set by a trigger.
    const row = businessToRow({ ...patch, id: undefined, updatedAt: undefined });
    if (!Object.keys(row).length) return this.getBusiness(id);
    const { data, error } = await this.db.from("tap_businesses").update(row).eq("id", id).select("*").maybeSingle();
    if (error) fail("updateBusiness", error);
    return data ? businessFromRow(data) : null;
  }

  async deleteBusiness(id: string) {
    const { error } = await this.db.from("tap_businesses").delete().eq("id", id);
    if (error) fail("deleteBusiness", error);
  }
}
