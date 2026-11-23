"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing, focusRingLight, mono, navLinks, serif, wrap } from "./tokens";

function Wordmark({ light }: { light: boolean }) {
  return (
    <a
      href="#top"
      className={`flex items-baseline gap-2 ${light ? focusRingLight : focusRing}`}
      aria-label="Halstead Law, back to top"
    >
      <span className={`${serif} text-[1.7rem] leading-none tracking-[-0.01em]`}>Halstead</span>
      <span className={`${mono} text-[0.62rem] uppercase tracking-[0.32em] opacity-80`}>Law</span>
    </a>
  );
}

/**
 * Sits over the hero, transparent, then returns as a solid stone bar once
 * the reader is past the first screen. Without JS it is simply a header
 * that scrolls away with the hero. The mobile menu is a native <details>
 * disclosure so it also works without JS.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  const light = !solid;

  return (
    <header
      className={
        solid
          ? "hl-header-in fixed inset-x-0 top-0 z-40 border-b border-[#17130f]/10 bg-[#f3efe7]/92 text-[#17130f] backdrop-blur-md"
          : "absolute inset-x-0 top-0 z-40 text-[#f3efe7]"
      }
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#f3efe7] focus:px-4 focus:py-2 focus:text-[#17130f]"
      >
        Skip to content
      </a>
      <div className={`${wrap} flex items-center justify-between gap-6 ${solid ? "h-16" : "h-20 sm:h-24"} transition-[height] duration-500`}>
        <Wordmark light={light} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative py-2 text-[0.8rem] tracking-[0.03em] opacity-85 transition-opacity duration-300 hover:opacity-100 after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 ${light ? focusRingLight : focusRing}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:02079460418"
            className={`hidden text-[0.8rem] tracking-[0.03em] opacity-85 hover:opacity-100 xl:inline ${light ? focusRingLight : focusRing}`}
          >
            020 7946 0418
          </a>
          <a
            href="#contact"
            className={`hidden min-h-11 items-center border px-5 text-[0.78rem] font-medium tracking-[0.04em] transition-colors duration-300 sm:inline-flex ${
              light
                ? `border-[#f3efe7]/50 hover:bg-[#f3efe7] hover:text-[#17130f] ${focusRingLight}`
                : `border-[#17130f] bg-[#17130f] text-[#f3efe7] hover:border-[#74272a] hover:bg-[#74272a] ${focusRing}`
            }`}
          >
            Request a consultation
          </a>

          <details ref={menuRef} className="group lg:hidden">
            <summary
              className={`flex h-11 cursor-pointer list-none items-center gap-2.5 px-1 text-[0.78rem] font-medium uppercase tracking-[0.16em] [&::-webkit-details-marker]:hidden ${light ? focusRingLight : focusRing}`}
            >
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
              <span aria-hidden="true" className="relative block h-2.5 w-5">
                <span className="absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 group-open:translate-y-[5px] group-open:rotate-45" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 group-open:-translate-y-[4px] group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute inset-x-0 top-full border-t border-[#f3efe7]/10 bg-[#0f0d0b] text-[#f3efe7] shadow-2xl">
              <nav aria-label="Mobile" className={`${wrap} py-8`}>
                <ul className="divide-y divide-[#f3efe7]/10">
                  {navLinks.map((l, i) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={closeMenu}
                        className={`flex items-baseline justify-between py-4 ${focusRingLight}`}
                      >
                        <span className={`${serif} text-[2rem] leading-none`}>{l.label}</span>
                        <span className={`${mono} text-[0.65rem] text-[#f3efe7]/50`}>0{i + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 text-sm text-[#f3efe7]/75">
                  <a href="tel:02079460418" className={focusRingLight}>London 020 7946 0418</a>
                  <a href="tel:01632960214" className={focusRingLight}>Guildford 01632 960 214</a>
                </div>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className={`mt-8 flex min-h-12 items-center justify-center bg-[#f3efe7] text-[0.82rem] font-medium tracking-[0.04em] text-[#17130f] ${focusRingLight}`}
                >
                  Request a consultation
                </a>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
