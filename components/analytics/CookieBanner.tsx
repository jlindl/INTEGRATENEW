"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, setConsent } from "@/lib/gtag";

/**
 * Cookie consent banner. Accept and Reject carry equal weight (ICO guidance);
 * analytics cookies are only set after "Accept". The choice is stored in
 * localStorage and can be reopened from the footer via the
 * "cookie-consent-open" event.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      /* storage blocked: ask every visit */
    }
    if (stored !== "granted" && stored !== "denied") setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener("cookie-consent-open", reopen);
    return () => window.removeEventListener("cookie-consent-open", reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#111114] p-5 text-[#f2f1ec] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] md:inset-x-auto md:right-6 md:bottom-6"
    >
      <p className="text-sm leading-relaxed text-[#c9c8c2]">
        We use analytics cookies to see which pages help people find us, so we
        can improve the site. They are only set if you accept. See our{" "}
        <Link href="/legal/cookies" className="underline underline-offset-2 hover:text-white">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-full bg-[#f2f1ec] px-4 py-2.5 text-sm font-medium text-[#111114] transition-opacity hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

/** Small footer link that reopens the banner so visitors can change their mind. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie-consent-open"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
