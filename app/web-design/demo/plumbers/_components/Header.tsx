"use client";

import { useEffect, useState } from "react";
import { NorthlineMark, PhoneIcon } from "./icons";
import s from "./nl.module.css";
import { display, focusRing, focusRingDark, mono, narrow, PHONE_DISPLAY, PHONE_HREF, wrap } from "./theme";

const NAV = [
  { href: "#after-you-call", label: "Emergencies" },
  { href: "#services", label: "Services" },
  { href: "#prices", label: "Prices" },
  { href: "#coverage", label: "Areas" },
  { href: "#reviews", label: "Reviews" },
];

/** Who's on shift, worked out from the visitor's clock. */
function shiftLine(d: Date) {
  const h = d.getHours();
  if (h >= 7 && h < 20) return "5 engineers on shift now";
  if (h >= 20 && h < 23) return "3 engineers on the evening rota";
  return "2 engineers on call overnight";
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shift, setShift] = useState("Engineers on shift now");
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setShift(shiftLine(d));
      setClock(d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const t = window.setInterval(tick, 20_000);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-[#0b1a28] px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Live status strip */}
      <div className="bg-[#0b1a28] text-[#c9d6df]">
        <div className={`${wrap} flex h-10 items-center justify-between gap-4 text-[0.8rem]`}>
          <p className="flex items-center gap-2.5">
            <span className={`${s.live} inline-block h-2 w-2 rounded-full bg-[#ff5a36] text-[#ff5a36]`} aria-hidden="true" />
            <span className="font-semibold text-white">{shift}</span>
            {clock && (
              <span className={`${mono} hidden text-[#8fa3b3] sm:inline`} aria-hidden="true">
                {clock}
              </span>
            )}
          </p>
          <p className="hidden md:block">
            Gas Safe registered <span className={`${mono} text-white`}>000000</span>
            <span className="mx-3 text-[#3a5168]" aria-hidden="true">/</span>
            No call-out fee, day or night
          </p>
          <a href={PHONE_HREF} className={`${focusRingDark} rounded font-semibold text-white hover:text-[#1ed3b0]`}>
            <span className="hidden sm:inline">24/7 line </span>
            <span className={mono}>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-[#d8e1e3] bg-[#f3f6f5]/90 shadow-[0_10px_30px_-20px_rgba(11,26,40,0.45)] backdrop-blur-md"
            : "border-transparent bg-[#f3f6f5]"
        }`}
      >
        <div className={`${wrap} flex h-[68px] items-center justify-between gap-6 lg:h-20`}>
          <a href="#top" className={`${focusRing} flex items-center gap-3 rounded-xl`} aria-label="Northline Plumbing and Heating, home">
            <NorthlineMark className="h-9 w-9 lg:h-10 lg:w-10" />
            <span className="leading-none">
              <span className={`${display} block text-[1.32rem] font-extrabold tracking-[-0.03em] text-[#0b1a28]`}>
                Northline
              </span>
              <span className={`${narrow} mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#4b5d6b]`}>
                Plumbing &amp; Heating
              </span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`${focusRing} rounded-full px-4 py-2 text-[0.95rem] font-semibold text-[#0b1a28] transition-colors hover:bg-[#e2eaeb]`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#book"
              className={`${focusRing} hidden rounded-full border-2 border-[#0b1a28] px-5 py-2.5 text-[0.92rem] font-bold text-[#0b1a28] transition-colors hover:bg-[#0b1a28] hover:text-white md:inline-flex`}
            >
              Book a visit
            </a>
            <a
              href={PHONE_HREF}
              className={`${focusRing} hidden items-center gap-2 rounded-full bg-[#1ed3b0] px-5 py-3 text-[0.92rem] font-bold text-[#0b1a28] transition-colors hover:bg-[#46e0c2] sm:inline-flex`}
            >
              <PhoneIcon className="h-4 w-4" />
              <span className={mono}>{PHONE_DISPLAY}</span>
            </a>

            {/* Mobile menu: native <details> so it opens without JavaScript */}
            <details className="group relative lg:hidden">
              <summary
                className={`${focusRing} flex h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-[#0b1a28] px-4 text-sm font-bold text-white [&::-webkit-details-marker]:hidden`}
              >
                <span className="relative block h-3 w-4" aria-hidden="true">
                  <span className="absolute left-0 top-0 h-0.5 w-4 bg-white transition-transform group-open:translate-y-[5px] group-open:rotate-45" />
                  <span className="absolute bottom-0 left-0 h-0.5 w-4 bg-white transition-transform group-open:-translate-y-[5px] group-open:-rotate-45" />
                </span>
                Menu
              </summary>
              <nav
                aria-label="Mobile"
                className="absolute right-0 top-[calc(100%+12px)] w-[min(86vw,340px)] rounded-3xl bg-[#0b1a28] p-3 shadow-[0_30px_60px_-20px_rgba(11,26,40,0.6)]"
              >
                <ul>
                  {[...NAV, { href: "#book", label: "Book a visit" }].map((n) => (
                    <li key={n.href}>
                      <a
                        href={n.href}
                        onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                        className={`${focusRingDark} ${display} flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.15rem] font-bold text-white hover:bg-[#12263a]`}
                      >
                        {n.label}
                        <span className="text-[#1ed3b0]" aria-hidden="true">
                          &rarr;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={PHONE_HREF}
                  className={`${focusRingDark} mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#1ed3b0] px-4 py-4 font-bold text-[#0b1a28]`}
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </a>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
