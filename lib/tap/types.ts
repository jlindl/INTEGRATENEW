/**
 * Integrate Tap: NFC/QR review plates.
 *
 * Every plate is pre-encoded with its own permanent link (/t/CODE) and locked.
 * The plate never changes; the business that claims it decides where a tap
 * goes, from their dashboard. See spec/tap-plates.md.
 */

export type PlateStatus =
  /** Generated, not yet written to a physical tag. */
  | "unencoded"
  /** Written (and usually locked), waiting for a customer to claim it. */
  | "ready"
  /** Claimed by a business; taps go to that business. */
  | "claimed"
  /** Switched off by an admin (lost, stolen, refunded). */
  | "disabled";

export type Plate = {
  /** Short public code written on the tag: /t/CODE. */
  code: string;
  /** Legacy: random secret still generated, no longer needed to claim (first tap claims). */
  setupCode: string;
  status: PlateStatus;
  /** Batch label, e.g. "Amazon Nov 2026" or "Bounc". */
  batch: string;
  businessId: string | null;
  /** Owner's own name for the plate, e.g. "Front desk". */
  label: string;
  /** NFC chip serial, captured when encoded. */
  serial: string | null;
  locked: boolean;
  encodedAt: string | null;
  claimedAt: string | null;
  taps: number;
  lastTapAt: string | null;
  /** Taps per day, ISO date -> count, last 90 days. */
  dailyTaps: Record<string, number>;
  /** Wrong setup-code attempts, to stop guessing. */
  failedClaims: number;
  createdAt: string;
  /** When admin ticked "Sent to Amazon" (stock shipped in for FBA), or null. */
  sentToAmazonAt?: string | null;
};

export type LinkKind =
  | "google"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "whatsapp"
  | "website"
  | "booking"
  | "menu"
  | "tripadvisor"
  | "custom";

export type BusinessLink = {
  id: string;
  kind: LinkKind;
  label: string;
  url: string;
};

export type TapMode =
  /** Tap opens the hosted business page (logo + all links). */
  | "page"
  /** Tap jumps straight to one link (usually the Google review form). */
  | "redirect";

export type Business = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  email: string;
  passwordHash: string;
  /** Person who set the plate up. */
  contactName: string;
  phone: string;
  /** Opted in to Integrate marketing (unticked by default, UK GDPR/PECR). */
  marketingConsent: boolean;
  /** When consent was last given or withdrawn, for the audit trail. */
  consentAt: string | null;
  /** Small square logo as a data URL (resized in the browser). */
  logo: string | null;
  mode: TapMode;
  /** Link id used when mode is "redirect". */
  redirectLinkId: string | null;
  links: BusinessLink[];
  createdAt: string;
  updatedAt: string;
};

/** Business without secrets, safe to send to the browser. */
export type PublicBusiness = Omit<Business, "passwordHash">;

export function toPublic(b: Business): PublicBusiness {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = b;
  return rest;
}
