/**
 * Meta Pixel helpers. The pixel is the "Integrate website" dataset in the
 * integratetech business. <MetaPixel /> in the root layout loads it only after
 * the visitor clicks "Accept" in the cookie banner (UK PECR), so until then
 * these helpers do nothing.
 *
 * The pixel ID is public by design. Set NEXT_PUBLIC_META_PIXEL_ID in Vercel to
 * override it per environment.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1122784810486959";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Meta's standard base code, run on demand instead of in the page head. */
export function loadMetaPixel(id: string) {
  if (typeof window === "undefined" || window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  n("init", id);
}

/**
 * Send a standard Meta event, e.g. metaTrack("Lead", { content_name: "..." }).
 * Pass the same eventId that went to the server so Meta counts the browser
 * and Conversions API copies of one lead once.
 */
export function metaTrack(
  event: string,
  params: Record<string, string | number> = {},
  eventId?: string,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventId) window.fbq("track", event, params, { eventID: eventId });
  else window.fbq("track", event, params);
}

/** True once the visitor has accepted cookies and the pixel is loaded. */
export function metaConsented(): boolean {
  return typeof window !== "undefined" && !!window.fbq;
}

/** A random id shared by the browser event and the server event for one lead. */
export function newMetaEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : undefined;
}

/**
 * What the server needs to send the matching Conversions API event.
 *
 * Default: only filled in when the visitor accepted cookies; otherwise
 * consent is false and the server sends nothing to Meta.
 *
 * With `leadWithoutCookies` (the /trades ad landing form), a visitor who has
 * not made a cookie choice still has their submitted lead sent to Meta from
 * the server, so the ads can optimise. No cookies are read or set for them:
 * the only browser value used is the fbclid already in the ad's URL. A
 * visitor who clicked "Reject" is never sent. The form shows a notice about
 * this next to its submit button, and the privacy policy describes it.
 */
export function metaServerContext(eventId: string, opts: { leadWithoutCookies?: boolean } = {}) {
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!metaConsented()) {
    let choice: string | null = null;
    try {
      choice = window.localStorage.getItem("cookie-consent");
    } catch {
      choice = null;
    }
    if (!opts.leadWithoutCookies || choice === "denied") return { consent: false as const };
    return {
      consent: false as const,
      serverLead: true as const,
      eventId,
      eventSourceUrl: window.location.href,
      fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined,
    };
  }
  let fbc = readCookie("_fbc");
  if (!fbc && fbclid) {
    // The pixel normally writes _fbc from ?fbclid=; build it if it hasn't yet.
    fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return {
    consent: true as const,
    eventId,
    eventSourceUrl: window.location.href,
    fbp: readCookie("_fbp"),
    fbc,
  };
}

/** UK numbers to international digits: "07700 900123" becomes "447700900123". */
export function normalisePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = `44${digits.slice(1)}`;
  return digits;
}

/**
 * Advanced matching: hand the pixel the details the visitor just typed so
 * Meta can match the lead to a Facebook or Instagram account. The pixel
 * hashes these (SHA-256) in the browser before anything is sent.
 */
export function metaSetUserData(user: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}) {
  if (!metaConsented()) return;
  const data: Record<string, string> = {};
  const em = user.email?.trim().toLowerCase();
  const ph = user.phone ? normalisePhone(user.phone) : "";
  const fn = user.firstName?.trim().toLowerCase();
  const ln = user.lastName?.trim().toLowerCase();
  if (em) data.em = em;
  if (ph) data.ph = ph;
  if (fn) data.fn = fn;
  if (ln) data.ln = ln;
  if (Object.keys(data).length) window.fbq!("init", META_PIXEL_ID, data);
}
