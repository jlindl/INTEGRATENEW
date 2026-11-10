"use client";

/**
 * The homepage film's navigation. Same links as the site nav, but it reads
 * the room: light type over the carbon beats, ink over the paper beats. The
 * tone comes from whichever [data-tone] section is under the bar, which the
 * film director can also flip mid-scene (the turn, the trade cuts).
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONTACT } from "@/lib/film/content";

const LINKS = [
  { label: "Systems", href: "#services" },
  { label: "Work", href: "#case-studies" },
  { label: "Process", href: "#process" },
  { label: "Web design", href: "/web-design" },
  { label: "Blog", href: "/blog" },
];

export function FilmNav() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [beat, setBeat] = useState({ n: "01", name: "Cold open", tone: "dark" });

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const probeY = 36;
      let next: "dark" | "light" = "dark";
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) next = el.dataset.tone === "light" ? "light" : "dark";
      }
      setTone(next);

      /* The slate: which beat is under the middle of the screen, and what
         room is behind the slate itself (bottom left). */
      const mid = window.innerHeight / 2;
      const low = window.innerHeight / 2;
      let b = { n: "01", name: "Cold open", tone: "dark" };
      for (const el of document.querySelectorAll<HTMLElement>("[data-beat]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          const [n, name] = (el.dataset.beat || "").split("|");
          b = { ...b, n, name };
        }
      }
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= low && r.bottom > low) b.tone = el.dataset.tone === "light" ? "light" : "dark";
      }
      setBeat((prev) => (prev.n === b.n && prev.tone === b.tone ? prev : b));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("film:tone", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("film:tone", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const menuTone = open ? "light" : tone;

  return (
    <>
    <header className="film-nav" data-nav-tone={menuTone} data-scrolled={scrolled || open ? "" : undefined}>
      <nav className="container-x film-nav-row" aria-label="Main">
        <Link href="/" className="film-nav-logo" aria-label="Integrate, home">
          {/* Both tones are in the page; CSS shows the one that suits the room
              behind the bar, so a cut never waits on an image. */}
          <BrandLogo tone="light" height={28} priority alt="" className="film-nav-logo-light" />
          <BrandLogo tone="ink" height={28} alt="" className="film-nav-logo-ink" />
        </Link>

        <ul className="film-nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="film-nav-actions">
          <a href={CONTACT.bookHref} className="film-nav-cta">
            {CONTACT.bookLabel}
          </a>
          <button
            type="button"
            className="film-nav-toggle"
            aria-expanded={open}
            aria-controls="film-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open ? "" : undefined} />
          </button>
        </div>
      </nav>

      <div id="film-menu" className="film-menu" hidden={!open} data-lenis-prevent>
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/trades" onClick={() => setOpen(false)}>
              For trades
            </a>
          </li>
          <li>
            <a href="/contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>

    {/* Film slate: where you are in the eight beats. Desktop only, decorative. */}
    <p className="film-slate" data-slate-tone={beat.tone} aria-hidden="true">
      <span className="film-slate-n">{beat.n}</span>
      <span className="film-slate-bar">
        <i style={{ transform: `scaleY(${Number(beat.n) / 8})` }} />
      </span>
      <span>08</span>
      <span className="film-slate-name" key={beat.n}>
        {beat.name}
      </span>
    </p>
    </>
  );
}
