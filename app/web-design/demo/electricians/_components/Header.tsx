"use client";

import { useEffect, useState } from "react";
import { ShiftLine } from "./LiveStatus";
import {
  LiveDot,
  PHONE,
  PhoneIcon,
  TEL,
  Wordmark,
  display,
  focusRing,
  mono,
} from "./ui";

const links = [
  { href: "#triage", label: "Power cut?" },
  { href: "#services", label: "Services" },
  { href: "#callout", label: "Emergency" },
  { href: "#areas", label: "Areas" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <header className="sticky top-0 z-40">
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#ffb020] focus:px-4 focus:py-2 focus:text-[#0a0c0f] ${focusRing}`}
      >
        Skip to content
      </a>

      {/* Live status strip */}
      <div
        className={`${mono} overflow-hidden border-b border-white/10 bg-[#0a0c0f] text-[0.72rem] uppercase tracking-[0.14em] text-[#9aa4b2] transition-[max-height] duration-300 ${
          scrolled || open ? "max-h-0 border-b-0" : "max-h-10"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8 lg:pl-20 lg:pr-12">
          <p className="flex items-center gap-2.5 truncate">
            <LiveDot />
            <ShiftLine />
          </p>
          <p className="hidden shrink-0 md:block">
            NICEIC Approved Contractor · Part P · TrustMark
          </p>
        </div>
      </div>

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-white/10 bg-[#0a0c0f]/92 backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-[#0a0c0f]/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8 lg:pl-20 lg:pr-12">
          <a href="#top" className={`shrink-0 ${focusRing}`} aria-label="Voltedge, back to top">
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`${display} text-[1.05rem] font-bold uppercase tracking-[0.06em] text-[#f3f5f8]/80 transition-colors hover:text-[#ffb020] ${focusRing}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#quote"
              className={`hidden border border-white/20 px-4 py-2.5 ${display} text-base font-bold uppercase tracking-[0.06em] text-[#f3f5f8] transition-colors hover:border-[#ffb020] hover:text-[#ffb020] md:inline-flex ${focusRing}`}
            >
              Get a price
            </a>
            <a
              href={TEL}
              className={`inline-flex items-center gap-2 bg-[#ffb020] px-3.5 py-2.5 ${display} text-base font-extrabold uppercase tracking-[0.04em] text-[#0a0c0f] transition-colors hover:bg-[#ffc04a] sm:px-4 ${focusRing}`}
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">{PHONE}</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="ve-menu"
              className={`grid h-11 w-11 place-items-center border border-white/20 text-[#f3f5f8] lg:hidden ${focusRing}`}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-5 bg-current transition-transform duration-300 ${
                    open ? "top-[5px] -rotate-45" : "top-[10px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="ve-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-30 overflow-y-auto bg-[#0a0c0f] lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 pb-28 pt-6 sm:px-8">
          <ul className="border-t border-white/10">
            {links.concat({ href: "#quote", label: "Get a price" }).map((l, i) => (
              <li key={l.href} className="border-b border-white/10">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 ${display} text-[2.4rem] font-extrabold uppercase leading-none text-[#f3f5f8] ${focusRing}`}
                >
                  {l.label}
                  <span className={`${mono} text-xs font-normal text-[#9aa4b2]`}>C{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={TEL}
            className={`mt-8 flex items-center justify-center gap-3 bg-[#ffb020] px-6 py-5 ${display} text-2xl font-extrabold uppercase text-[#0a0c0f] ${focusRing}`}
          >
            <PhoneIcon className="h-5 w-5" />
            {PHONE}
          </a>
          <p className={`${mono} mt-4 text-center text-xs uppercase tracking-[0.14em] text-[#9aa4b2]`}>
            Answered by an electrician, 24 hours a day
          </p>
        </nav>
      </div>
    </header>
  );
}
