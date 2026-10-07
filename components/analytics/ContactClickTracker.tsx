"use client";

import { useEffect } from "react";
import { track } from "@/lib/gtag";

/**
 * Sends a GA4 "contact_click" event whenever a visitor taps a phone, email or
 * WhatsApp link anywhere on the site. One delegated listener, so no link
 * component needs to know about analytics.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      let method: string | null = null;
      if (href.startsWith("tel:")) method = "phone";
      else if (href.startsWith("mailto:")) method = "email";
      else if (/wa\.me|whatsapp\.com/i.test(href)) method = "whatsapp";
      if (method) track("contact_click", { method, page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
