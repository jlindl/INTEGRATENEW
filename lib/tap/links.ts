import type { BusinessLink, LinkKind } from "./types";

export type LinkKindInfo = {
  kind: LinkKind;
  /** Default button label on the business page. */
  label: string;
  /** Hint shown in the dashboard field. */
  placeholder: string;
  /** Chip colour behind the icon. */
  chip: string;
};

export const LINK_KINDS: LinkKindInfo[] = [
  { kind: "google", label: "Leave us a Google review", placeholder: "https://g.page/r/…/review", chip: "#ffffff" },
  { kind: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourbusiness", chip: "#d62976" },
  { kind: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourbusiness", chip: "#010101" },
  { kind: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourbusiness", chip: "#1877f2" },
  { kind: "whatsapp", label: "Message us on WhatsApp", placeholder: "07123 456789 or https://wa.me/447123456789", chip: "#25d366" },
  { kind: "website", label: "Visit our website", placeholder: "https://yourbusiness.co.uk", chip: "#1b1a16" },
  { kind: "booking", label: "Book now", placeholder: "https://…", chip: "#1b1a16" },
  { kind: "menu", label: "See our menu", placeholder: "https://…", chip: "#1b1a16" },
  { kind: "tripadvisor", label: "Review us on Tripadvisor", placeholder: "https://tripadvisor.co.uk/…", chip: "#34e0a1" },
  { kind: "custom", label: "Link", placeholder: "https://…", chip: "#1b1a16" },
];

export const KIND_INFO = Object.fromEntries(LINK_KINDS.map((k) => [k.kind, k])) as Record<LinkKind, LinkKindInfo>;

/**
 * Turn what a business owner pastes into a safe, absolute https URL.
 * Returns null when it can't be made into one. Only http(s) is allowed so a
 * tap can never be pointed at javascript: or similar.
 */
export function normaliseUrl(kind: LinkKind, raw: string): string | null {
  let v = raw.trim();
  if (!v) return null;

  if (kind === "whatsapp" && !/^https?:/i.test(v)) {
    // UK mobile or international number → wa.me
    let digits = v.replace(/[^\d+]/g, "");
    if (digits.startsWith("+")) digits = digits.slice(1);
    else if (digits.startsWith("07")) digits = `44${digits.slice(1)}`;
    if (!/^\d{8,15}$/.test(digits)) return null;
    return `https://wa.me/${digits}`;
  }

  if ((kind === "instagram" || kind === "tiktok") && /^@?[\w.]+$/.test(v)) {
    const handle = v.replace(/^@/, "");
    return kind === "instagram" ? `https://www.instagram.com/${handle}` : `https://www.tiktok.com/@${handle}`;
  }

  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

/** Where a tap on a claimed plate should go. Null means the hosted page. */
export function redirectTarget(b: { mode: string; redirectLinkId: string | null; links: BusinessLink[] }) {
  if (b.mode !== "redirect") return null;
  const link = b.links.find((l) => l.id === b.redirectLinkId) ?? b.links.find((l) => l.kind === "google");
  return link?.url ?? null;
}
