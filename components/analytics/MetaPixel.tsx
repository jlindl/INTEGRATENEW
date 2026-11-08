"use client";

/**
 * Meta Pixel, loaded only with consent. Nothing is fetched from Meta and no
 * cookie is set until the visitor clicks "Accept" in the cookie banner. A
 * visitor who accepted before is restored from localStorage on load. If they
 * later choose "Reject", the pixel stops sending.
 *
 * Sends a PageView on the first page after consent and on every client-side
 * navigation. Lead events are sent by the forms via metaTrack().
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONSENT_KEY } from "@/lib/gtag";
import { META_PIXEL_ID, loadMetaPixel } from "@/lib/metaPixel";

function consentGranted() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const sync = () => {
      if (consentGranted()) {
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
    window.fbq?.("track", "PageView");
  }, [enabled, pathname]);

  return null;
}
