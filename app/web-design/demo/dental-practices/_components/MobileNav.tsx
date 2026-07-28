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
        aria-controls="bw-mobile-menu"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#13201f]/12 text-[#13201f] transition-colors duration-200 hover:bg-white ${focusRing}`}
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
          id="bw-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-[#dceeeb] bg-[#f4faf9] px-5 pb-6 pt-1 shadow-[0_24px_40px_-28px_rgba(19,32,31,0.3)]"
        >
          <nav aria-label="Site sections">
            <ul className="divide-y divide-[#dceeeb]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-sm py-3.5 text-base font-medium text-[#13201f] ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className={`${btnPrimary} mt-4 w-full`}
          >
            Book online
          </a>
        </div>
      ) : null}
    </div>
  );
}
