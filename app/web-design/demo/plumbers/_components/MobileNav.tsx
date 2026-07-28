"use client";

import { useState } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#boilers", label: "Boilers" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6e5d] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/**
 * Plain useState disclosure for the mobile header. The panel is anchored to
 * the sticky header (absolute inset-x-0 top-full against the header element).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div
      className="md:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nl-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dde8ee] bg-white text-[#12212e] transition-colors hover:border-[#23c1a6]/60 ${focusLight}`}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id="nl-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-[#dde8ee] bg-white shadow-[0_24px_40px_-24px_rgba(2,12,22,0.35)]"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className={`rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-[#12212e] transition-colors hover:bg-[#f6f9fb] ${focusLight}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:01134960230"
              onClick={close}
              className={`rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-[#0d6e5d] transition-colors hover:bg-[#f6f9fb] ${focusLight}`}
            >
              Call 0113 496 0230
            </a>
            <a
              href="#contact"
              onClick={close}
              className={`mt-2 inline-flex items-center justify-center rounded-lg bg-[#23c1a6] px-4 py-3 text-[0.95rem] font-bold text-[#08110f] transition-colors hover:bg-[#31d6b9] ${focusLight}`}
            >
              Book an engineer
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
