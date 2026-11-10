"use client";

/**
 * The always-in-reach action on phones and tablets. Slides up (never fades in
 * from nothing) once the hero's own button has scrolled away, and steps aside
 * while the final form is on screen or the cookie banner is still waiting for
 * an answer, since both sit in the same spot.
 */
import { useEffect, useState } from "react";
import { CONSENT_KEY, track } from "@/lib/gtag";
import { CONTACT } from "@/lib/film/content";
import { WhatsAppGlyph } from "./parts";

function consentAnswered() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return true;
  }
}

export function FilmStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hide = new Set<Element>();
    let answered = consentAnswered();
    const update = () => setShow(answered && hide.size === 0);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) hide.add(e.target);
        else hide.delete(e.target);
      }
      update();
    });
    for (const id of ["hero-actions", "book-call"]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    const onConsent = () => {
      answered = consentAnswered();
      update();
    };
    window.addEventListener("cookie-consent-change", onConsent);
    return () => {
      io.disconnect();
      window.removeEventListener("cookie-consent-change", onConsent);
    };
  }, []);

  return (
    <div className="film-sticky" data-show={show ? "" : undefined} aria-hidden={!show}>
      <a
        href={CONTACT.bookHref}
        tabIndex={show ? 0 : -1}
        className="film-sticky-book"
        onClick={() => track("cta_click", { place: "sticky" })}
      >
        {CONTACT.bookLabel}
      </a>
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="film-sticky-wa"
        aria-label="Message Integrate on WhatsApp"
      >
        <WhatsAppGlyph />
      </a>
    </div>
  );
}
