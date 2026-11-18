"use client";

/**
 * The homepage navigation. It reads the room behind it (each section carries
 * data-tone="dark" or "light") and sets its type to match, then turns into a
 * frosted bar once the page scrolls: blur belongs on the floating layer only,
 * never in the content (materials.md). Every link and button is at least
 * 44px tall (buttons.md › Best practices).
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WebDesignCta } from "@/components/ui/WebDesignCta";

/* Labels name what you will find, and each one goes there. */
const LINKS = [
  { label: "Systems", href: "#services" },
  { label: "Client work", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "/blog" },
];

export function HomeNav() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrolled(window.scrollY > 16);
      let next: "dark" | "light" = "dark";
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone]:not(header)")) {
        const r = el.getBoundingClientRect();
        if (r.top <= 32 && r.bottom > 32) next = el.dataset.tone === "light" ? "light" : "dark";
      }
      setTone(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const t = open ? "light" : tone;
  const dark = t === "dark";
  const bar = scrolled || open
    ? dark
      ? "bg-carbon/70 shadow-[inset_0_-1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl"
      : "bg-paper/85 shadow-[inset_0_-1px_0_rgb(27_26_22/0.08)] backdrop-blur-xl"
    : "";

  return (
    <header data-tone={t} data-scrolled={scrolled || open ? "" : undefined} className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${dark ? "text-ivory" : "text-ink"} ${bar}`}>
      <nav aria-label="Main" className="home-nav container-x flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label="Integrate, home" className="flex min-h-11 items-center">
          {/* Both tones are in the page so a change of room never waits on an image. */}
          <BrandLogo tone="light" height={26} priority alt="" className={dark ? "block" : "hidden"} />
          <BrandLogo tone="ink" height={26} alt="" className={dark ? "hidden" : "block"} />
        </Link>

        <ul className="hidden items-center lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${dark ? "text-ivory/80 hover:text-ivory" : "text-ink-2 hover:text-ink"}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <WebDesignCta label="Web design" className="hidden md:inline-flex" />
          <a
            href="#book-call"
            className={`home-nav-book inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-[0.9375rem] font-semibold transition-colors active:scale-[0.98] sm:px-5 ${dark ? "bg-ivory text-carbon hover:bg-white" : "bg-carbon text-ivory hover:bg-[#1c1c21]"}`}
          >
            Book a free call
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="home-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </nav>

      <div id="home-menu" hidden={!open} className="border-t border-line bg-paper text-ink lg:hidden">
        <ul className="container-x py-3">
          {[...LINKS, { label: "For trades", href: "/trades" }, { label: "Contact", href: "/contact" }].map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line text-[1.0625rem] font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x pb-5">
          <WebDesignCta size="lg" className="flex w-full" onClick={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}
