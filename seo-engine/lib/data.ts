/** Loaders and types for the committed topic data and the ledger. */
import fs from "node:fs";
import path from "node:path";
import { config } from "../config";

export type Location = {
  id: string;
  name: string;
  county: string;
  tier: number;
  nearby: string[];
  notes: string;
};

export type Service = {
  id: string;
  name: string;
  keyword: string;
  summary: string;
  relatedPaths: string[];
};

export type Audience = {
  id: string;
  name: string;
  singular: string;
  trade: string;
  kind: "trade" | "local-business";
  jobs: string;
  webDesignPage?: string;
};

export type LocationAngle = { id: string; keyword: string; angle: string };

export type LedgerEntry = {
  date: string;
  type: "location" | "service";
  /** Stable topic key, e.g. "location:chorley:roofers" or "service:meta-ads:plumbers". */
  key: string;
  status: "generated" | "failed";
  slug?: string;
  title?: string;
  targetKeyword?: string;
  angle?: string;
  reasons?: string[];
};

type Ledger = { _readme?: string; entries: LedgerEntry[] };

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

export function loadLocations(): Location[] {
  return readJson<{ locations: Location[] }>(path.join(config.paths.data, "locations.json")).locations;
}

export function loadServiceData(): {
  services: Service[];
  audiences: Audience[];
  locationAngles: LocationAngle[];
  excludePairs: string[];
} {
  return readJson(path.join(config.paths.data, "services.json"));
}

export function loadLedger(): Ledger {
  return readJson<Ledger>(config.paths.ledger);
}

export function saveLedger(ledger: Ledger): void {
  fs.writeFileSync(config.paths.ledger, JSON.stringify(ledger, null, 2) + "\n");
}
