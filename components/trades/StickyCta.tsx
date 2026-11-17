"use client";

/**
 * StickyCta — the phone-only call to action bar on /trades and
 * /black-friday. It slides in once the visitor has scrolled away from the
 * top, and hides while any of the `watch` elements (the form, the closing
 * call to action) is on screen, since it would only cover them, and while the
 * cookie banner is still waiting for an answer (same spot).
 *
 * The defaults are the /trades bar.
 */
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/gtag";

const WATCH = ["get-started", "final-cta"];

function consentAnswered() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return true;
  }
}

export function StickyCta({
  href = "#get-started",
  label = "Book my free call",
  note = "· 30 seconds",
  watch = WATCH,
  buttonClassName = "bg-ink text-paper",
  noteClassName = "text-paper/60",
}: {
  href?: string;
  label?: string;
  note?: string;
  /** Ids of elements that hide the bar while they are on screen. */
  watch?: string[];
  buttonClassName?: string;
  noteClassName?: string;
} = {}) {
  const [show, setShow] = useState(false);
  const watchKey = watch.join(",");

  useEffect(() => {
    const onScreen = new Set<string>();
    let answered = consentAnswered();
    const update = () => setShow(answered && onScreen.size === 0 && window.scrollY > 480);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target.id);
        else onScreen.delete(e.target.id);
      }
      update();
    });
    watchKey.split(",").forEach((id) => {
      const el = id && document.getElementById(id);
      if (el) io.observe(el);
    });

    const onConsent = () => {
      answered = consentAnswered();
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("cookie-consent-change", onConsent);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("cookie-consent-change", onConsent);
    };
  }, [watchKey]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-[transform,opacity] duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={href}
        tabIndex={show ? 0 : -1}
        className={`flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-base font-medium ${buttonClassName}`}
      >
        {label}
        {note ? <span className={`font-normal ${noteClassName}`}>{note}</span> : null}
      </a>
    </div>
  );
}
