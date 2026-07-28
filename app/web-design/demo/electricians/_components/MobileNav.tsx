"use client";

import { useState } from "react";
import { PhoneIcon, btnPrimary, focusRing } from "./ui";

const links = [
  { href: "#services", label: "Services" },
  { href: "#emergency", label: "Emergency" },
  { href: "#areas", label: "Areas" },
  { href: "#reviews", label: "Reviews" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="ve-mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#232a35] bg-[#161b23] text-[#f4f7fb] transition-colors hover:border-[#3a4454] ${focusRing}`}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <div
        id="ve-mobile-nav"
        className={`absolute inset-x-0 top-full border-b border-[#232a35] bg-[#0e1116] shadow-[0_24px_40px_-20px_rgba(0,0,0,0.8)] md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex w-full max-w-6xl flex-col px-5 py-4 sm:px-8"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={`rounded-md border-b border-[#232a35] px-1 py-3.5 text-base font-medium text-[#f4f7fb] transition-colors hover:text-[#ffb020] ${focusRing}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:01614960100"
            onClick={close}
            className={`mt-4 inline-flex items-center gap-2 rounded-md px-1 py-1 text-base font-semibold text-[#f4f7fb] transition-colors hover:text-[#ffb020] ${focusRing}`}
          >
            <PhoneIcon className="h-4 w-4 text-[#ffb020]" />
            0161 496 0100
          </a>
          <a href="#quote" onClick={close} className={`mt-4 ${btnPrimary}`}>
            Get a fast quote
          </a>
        </nav>
      </div>
    </div>
  );
}
