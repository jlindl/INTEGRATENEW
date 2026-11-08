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

/** Send a standard Meta event, e.g. metaTrack("Lead", { content_name: "..." }). */
export function metaTrack(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}
