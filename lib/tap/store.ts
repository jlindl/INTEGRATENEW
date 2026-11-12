import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { SupabaseStore } from "./supabase-store";
import type { Business, Plate } from "./types";

/**
 * Storage for Integrate Tap.
 *
 * Everything goes through this interface so the backing database can be
 * swapped without touching the pages. Two implementations:
 *  - SupabaseStore (lib/tap/supabase-store.ts), used whenever SUPABASE_URL and
 *    SUPABASE_SERVICE_ROLE_KEY are set. This is what production runs on.
 *  - FileStore, a JSON file for local development and testing. Production
 *    refuses to run on it because Vercel's filesystem is read-only and wiped
 *    between requests.
 */
export interface TapStore {
  getPlate(code: string): Promise<Plate | null>;
  listPlates(filter?: { batch?: string; status?: Plate["status"]; businessId?: string }): Promise<Plate[]>;
  insertPlates(plates: Plate[]): Promise<void>;
  updatePlate(code: string, patch: Partial<Plate>): Promise<Plate | null>;
  recordTap(code: string): Promise<void>;
  /** Atomically add one wrong setup-code attempt; returns the new count. */
  failClaim(code: string): Promise<number>;

  getBusiness(id: string): Promise<Business | null>;
  getBusinessBySlug(slug: string): Promise<Business | null>;
  getBusinessByEmail(email: string): Promise<Business | null>;
  listBusinesses(): Promise<Business[]>;
  insertBusiness(b: Business): Promise<void>;
  updateBusiness(id: string, patch: Partial<Business>): Promise<Business | null>;
  /** Remove a business for good. Release its plates first. */
  deleteBusiness(id: string): Promise<void>;
}

export class StoreNotConfiguredError extends Error {
  constructor() {
    super(
      "Integrate Tap has no database configured. Set up the Supabase store (spec/tap-plates.md) or, for testing only, set TAP_ALLOW_FILE_STORE=1.",
    );
  }
}

/* ----------------------------------------------------------- file store -- */

type FileData = { plates: Record<string, Plate>; businesses: Record<string, Business> };

class FileStore implements TapStore {
  private file: string;
  private queue: Promise<unknown> = Promise.resolve();

  constructor(file: string) {
    this.file = file;
  }

  private async read(): Promise<FileData> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as FileData;
    } catch {
      return { plates: {}, businesses: {} };
    }
  }

  /** Serialise read-modify-write so concurrent taps don't clobber each other. */
  private mutate<T>(fn: (d: FileData) => T): Promise<T> {
    const run = this.queue.then(async () => {
      const data = await this.read();
      const result = fn(data);
      await fs.mkdir(path.dirname(this.file), { recursive: true });
      const tmp = `${this.file}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(data, null, 2));
      await fs.rename(tmp, this.file);
      return result;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  async getPlate(code: string) {
    return (await this.read()).plates[code] ?? null;
  }

  async listPlates(filter: { batch?: string; status?: Plate["status"]; businessId?: string } = {}) {
    return Object.values((await this.read()).plates)
      .filter(
        (p) =>
          (!filter.batch || p.batch === filter.batch) &&
          (!filter.status || p.status === filter.status) &&
          (!filter.businessId || p.businessId === filter.businessId),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.code.localeCompare(b.code));
  }

  insertPlates(plates: Plate[]) {
    return this.mutate((d) => {
      for (const p of plates) {
        if (d.plates[p.code]) throw new Error(`Plate ${p.code} already exists`);
        d.plates[p.code] = p;
      }
    });
  }

  updatePlate(code: string, patch: Partial<Plate>) {
    return this.mutate((d) => {
      const p = d.plates[code];
      if (!p) return null;
      d.plates[code] = { ...p, ...patch, code };
      return d.plates[code];
    });
  }

  recordTap(code: string) {
    return this.mutate((d) => {
      const p = d.plates[code];
      if (!p) return;
      const now = new Date();
      const day = now.toISOString().slice(0, 10);
      const daily = { ...p.dailyTaps, [day]: (p.dailyTaps[day] ?? 0) + 1 };
      // Keep 90 days.
      const cutoff = new Date(now.getTime() - 90 * 864e5).toISOString().slice(0, 10);
      for (const k of Object.keys(daily)) if (k < cutoff) delete daily[k];
      d.plates[code] = { ...p, taps: p.taps + 1, lastTapAt: now.toISOString(), dailyTaps: daily };
    });
  }

  failClaim(code: string) {
    return this.mutate((d) => {
      const p = d.plates[code];
      if (!p) return 0;
      d.plates[code] = { ...p, failedClaims: p.failedClaims + 1 };
      return d.plates[code].failedClaims;
    });
  }

  async getBusiness(id: string) {
    return (await this.read()).businesses[id] ?? null;
  }

  async getBusinessBySlug(slug: string) {
    return Object.values((await this.read()).businesses).find((b) => b.slug === slug) ?? null;
  }

  async getBusinessByEmail(email: string) {
    const e = email.trim().toLowerCase();
    return Object.values((await this.read()).businesses).find((b) => b.email === e) ?? null;
  }

  async listBusinesses() {
    return Object.values((await this.read()).businesses).sort((a, b) => a.name.localeCompare(b.name));
  }

  insertBusiness(b: Business) {
    return this.mutate((d) => {
      d.businesses[b.id] = b;
    });
  }

  updateBusiness(id: string, patch: Partial<Business>) {
    return this.mutate((d) => {
      const b = d.businesses[id];
      if (!b) return null;
      d.businesses[id] = { ...b, ...patch, id, updatedAt: new Date().toISOString() };
      return d.businesses[id];
    });
  }

  async deleteBusiness(id: string) {
    await this.mutate((d) => {
      delete d.businesses[id];
    });
  }
}

/* --------------------------------------------------------------- picker -- */

let store: TapStore | null = null;

export function getStore(): TapStore {
  if (store) return store;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && serviceKey) {
    store = new SupabaseStore(url, serviceKey);
    return store;
  }
  const allowFile = process.env.NODE_ENV !== "production" || process.env.TAP_ALLOW_FILE_STORE === "1";
  if (!allowFile) throw new StoreNotConfiguredError();
  store = new FileStore(process.env.TAP_DATA_FILE || path.join(process.cwd(), ".data", "tap.json"));
  return store;
}

/** True when the tool can actually run in this environment. */
export function storeReady(): boolean {
  try {
    getStore();
    return true;
  } catch {
    return false;
  }
}
