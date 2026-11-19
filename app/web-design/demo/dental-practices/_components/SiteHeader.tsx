"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { container, display, focusRing, navLinks, phone } from "./ui";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className={`sr-only z-[60] rounded-full bg-[#2d5547] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 ${focusRing}`}
      >
        Skip to content
      </a>

      <div className="hidden bg-[#22433a] text-[0.78rem] text-[#e3ebe4] md:block">
        <div className={`${container} flex h-9 items-center justify-between`}>
          <p>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#f2d6c6] align-middle" aria-hidden="true" />
            New patients seen within the week. Late appointments until 8pm on Thursdays.
          </p>
          <p className="flex items-center gap-5">
            <span>Private &amp; NHS (children)</span>
            <a href={phone.href} className={`rounded-sm font-semibold text-[#fffcf7] hover:underline ${focusRing}`}>
              {phone.display}
            </a>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-[#fffcf7]/85 shadow-[0_1px_0_rgba(28,42,38,0.08),0_18px_40px_-30px_rgba(28,42,38,0.35)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className={`${container} flex h-[4.5rem] items-center justify-between gap-6`}>
          <a href="#top" className={`rounded-md ${focusRing}`} aria-label="Brightwell Dental, back to top">
            <BrandMark />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-[#1c2a26]/80 transition-colors hover:bg-[#ece3d6]/70 hover:text-[#1c2a26] ${focusRing}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#book"
              className={`inline-flex min-h-11 items-center rounded-full bg-[#2d5547] px-5 text-[0.9rem] font-semibold text-[#fffcf7] transition-colors hover:bg-[#22433a] ${focusRing}`}
            >
              Book online
            </a>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1c2a26]/12 bg-[#fffcf7]/70 lg:hidden ${focusRing}`}
              aria-expanded={open}
              aria-controls="bw-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#1c2a26" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 9h16M4 15h10" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="bw-mobile-nav"
          hidden={!open}
          className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[#1c2a26]/8 bg-[#fffcf7] lg:hidden"
        >
          <nav aria-label="Mobile" className={`${container} flex flex-col pb-10 pt-6`}>
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-[#1c2a26]/8">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline justify-between py-4 ${display} text-[1.9rem] font-normal tracking-[-0.02em] text-[#1c2a26] ${focusRing}`}
                  >
                    {l.label}
                    <span className="font-[family-name:var(--font-bw-body)] text-xs font-semibold tracking-[0.2em] text-[#55625c]">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-[#ece3d6] p-6">
              <p className="text-sm text-[#55625c]">Rather talk to a person?</p>
              <a href={phone.href} className={`${display} mt-1 block text-2xl text-[#1c2a26] ${focusRing}`}>
                {phone.display}
              </a>
              <p className="mt-2 text-sm text-[#55625c]">Weekdays from 8am, late Thursdays, Saturdays 9am to 2pm</p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
