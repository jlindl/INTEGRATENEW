"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { Wordmark } from "./Mark";
import { btnPrimary, focusRing, label, navLinks, serif, wrap } from "./ui";

export function Header() {
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
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        open
          ? "border-b border-[#d6cfbf] bg-[#f3f0e8]"
          : scrolled
            ? "border-b border-[#d6cfbf] bg-[#f3f0e8]/90 backdrop-blur-md"
            : "border-b border-transparent bg-[#f3f0e8]/0"
      }`}
    >
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#13201b] focus:px-4 focus:py-2 focus:text-sm focus:text-[#f3f0e8] ${focusRing}`}
      >
        Skip to content
      </a>
      <div className={`${wrap} flex h-[72px] items-center justify-between gap-6`}>
        <a href="#top" className={`rounded-sm ${focusRing}`} aria-label="Meridian and Co, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-sm py-2 text-[0.92rem] text-[#13201b]/80 transition-colors hover:text-[#13201b] after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#1b4a3a] after:transition-transform after:duration-300 hover:after:scale-x-100 ${focusRing}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+442079460480"
            className={`hidden rounded-sm text-[0.92rem] tabular-nums text-[#13201b]/80 hover:text-[#13201b] xl:inline ${focusRing}`}
          >
            020 7946 0480
          </a>
          <span className="hidden sm:block">
            <a href="#contact" className={`${btnPrimary} !min-h-11`}>
              Book a call
              <Arrow />
            </a>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mc-menu"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#13201b]/20 text-[#13201b] lg:hidden ${focusRing}`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 7h14M3 13h9" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mc-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-[#d6cfbf] bg-[#f3f0e8] lg:hidden"
        >
          <nav aria-label="Mobile" className={`${wrap} pb-28 pt-6`}>
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-[#d6cfbf]">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline justify-between gap-4 rounded-sm py-5 ${focusRing}`}
                  >
                    <span className={`${serif} text-[2rem] leading-none text-[#13201b]`}>{l.label}</span>
                    <span className={`${label} text-[#4f5a54]`}>{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} mt-8 w-full`}>
              Book a call
              <Arrow />
            </a>
            <p className="mt-6 text-[0.95rem] text-[#4f5a54]">
              Or call us on{" "}
              <a href="tel:+442079460480" className={`rounded-sm text-[#13201b] underline underline-offset-4 ${focusRing}`}>
                020 7946 0480
              </a>
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
