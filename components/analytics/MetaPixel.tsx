"use client";

/**
 * Meta Pixel, loaded only with consent. Nothing is fetched from Meta and no
 * cookie is set until the visitor clicks "Accept" in the cookie banner. A
 * visitor who accepted before is restored from localStorage on load. If they
 * later choose "Reject", the pixel stops sending.
 *
 * Sends a PageView on the first page after consent and on every client-side
 * navigation. Lead events are sent by the forms via metaTrack().
 *
 * Ad landings on /trades without a cookie choice: most ad visitors never answer
 * the banner, so the pixel never loads and Meta can't see that the click
 * reached the page. For those visits only (fbclid in the URL, no choice made,
 * never after "Reject"), we ask our server to send one cookieless PageView to
 * Meta with the click id (/api/meta-pageview). Nothing is stored in the
 * browser. If the visitor then accepts on the same page, the pixel's PageView
 * reuses that event id so Meta counts the visit once.
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONSENT_KEY } from "@/lib/gtag";
import { META_PIXEL_ID, loadMetaPixel, newMetaEventId } from "@/lib/metaPixel";

function consentChoice(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/** In-memory only: the server PageView sent for this page load, if any. */
let serverPageView: { path: string; eventId: string } | null = null;

function sendServerPageView(pathname: string) {
  if (serverPageView || !pathname.startsWith("/trades")) return;
  if (!new URLSearchParams(window.location.search).get("fbclid")) return;
  if (consentChoice() !== null) return; // accepted: the pixel does it; rejected: never
  const eventId = newMetaEventId();
  serverPageView = { path: pathname, eventId };
  fetch("/api/meta-pageview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, url: window.location.href }),
    keepalive: true,
  }).catch(() => {});
}

export function MetaPixel() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    sendServerPageView(window.location.pathname);
    const sync = () => {
      if (consentChoice() === "granted") {
        loadMetaPixel(META_PIXEL_ID);
        window.fbq?.("consent", "grant");
        setEnabled(true);
      } else {
        window.fbq?.("consent", "revoke");
        setEnabled(false);
      }
    };
    sync();
    window.addEventListener("cookie-consent-change", sync);
    return () => window.removeEventListener("cookie-consent-change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    if (serverPageView?.path === pathname) {
      window.fbq?.("track", "PageView", {}, { eventID: serverPageView.eventId });
    } else {
      window.fbq?.("track", "PageView");
    }
  }, [enabled, pathname]);

  return null;
}
