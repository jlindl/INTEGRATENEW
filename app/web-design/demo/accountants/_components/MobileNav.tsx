"use client";

import { useState } from "react";
import { btnPrimary, focusRing, navLinks } from "./ui";

/** Plain disclosure menu for small screens. Lives inside the sticky header. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mc-mobile-menu"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#15201c]/15 text-[#15201c] transition-colors duration-200 hover:bg-white ${focusRing}`}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <path d="M5 5l10 10" />
              <path d="M15 5L5 15" />
            </>
          ) : (
            <>
              <path d="M3 6.5h14" />
              <path d="M3 13.5h14" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mc-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-[#e2ded2] bg-[#f4f2ec] px-5 pb-6 pt-1 shadow-[0_24px_40px_-28px_rgba(21,32,28,0.35)]"
        >
          <nav aria-label="Site sections">
            <ul className="divide-y divide-[#e2ded2]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-sm py-3.5 text-base font-medium text-[#15201c] ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${btnPrimary} mt-4 w-full`}
          >
            Book a consultation
          </a>
        </div>
      ) : null}
    </div>
  );
}
