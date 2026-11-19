"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./icons";
import { btnPrimary, display, focusRing, mono, navLinks, wrap } from "./tokens";

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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-[#ddd6c8] bg-[#f3efe7]/92 backdrop-blur-md"
          : "border-b border-transparent bg-[#f3efe7]"
      }`}
    >
      <div className={`${wrap} flex h-16 items-center justify-between gap-6 lg:h-[72px]`}>
        <a href="#top" className={`flex items-center gap-2.5 rounded-sm text-[#121317] ${focusRing}`}>
          <BrandMark className="h-6 w-6" />
          <span className={`${display} text-[1.15rem] font-extrabold tracking-[-0.03em] whitespace-nowrap`}>
            Ascend<span className="font-medium text-[#575a62]"> Talent</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-[0.88rem] font-medium text-[#121317]/70 transition-colors duration-200 hover:bg-[#121317]/[0.05] hover:text-[#121317] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:02079460321"
            className={`${mono} hidden rounded-sm text-[0.78rem] text-[#575a62] hover:text-[#121317] xl:inline ${focusRing}`}
          >
            020 7946 0321
          </a>
          <span className="hidden sm:inline-flex">
            <a href="#contact" className={`${btnPrimary} px-5! py-2.5! text-[0.84rem]!`}>
              Brief us
            </a>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="at-menu"
            className={`inline-flex h-11 items-center gap-2 rounded-full border border-[#121317]/20 px-4 text-[0.84rem] font-semibold text-[#121317] lg:hidden ${focusRing}`}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-2.5 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="at-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#ddd6c8] bg-[#f3efe7] lg:hidden"
      >
        <nav aria-label="Mobile" className={`${wrap} py-6`}>
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} className="border-b border-[#ddd6c8]">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between rounded-sm py-4 ${focusRing}`}
                >
                  <span className={`${display} text-[1.9rem] font-bold tracking-[-0.03em] text-[#121317]`}>
                    {link.label}
                  </span>
                  <span className={`${mono} text-[0.7rem] text-[#575a62]`}>0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} mt-8 w-full`}>
            Brief us on a role
          </a>
          <p className={`${mono} mt-6 text-[0.75rem] leading-relaxed text-[#575a62]`}>
            020 7946 0321
            <br />
            14 Rivington Street, London EC2A 3DU
          </p>
        </nav>
      </div>
    </header>
  );
}
