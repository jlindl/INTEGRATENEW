"use client";

/**
 * WebDesignNav — the dark hub's navigation. Transparent over the hero, condenses
 * into a frosted carbon bar on scroll. Browsing the work is the primary action,
 * so the CTA back to the main site is intentionally treated as secondary.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { BackToIntegrate } from "./BackToIntegrate";
import { MagneticLink } from "./interactions/MagneticLink";

/* Nav links. Section anchors use absolute hub paths so they resolve from any
   sub-page (e.g. /pricing) too; `route: true` marks a real page navigation. */
const LINKS: { label: string; href: string; route?: boolean }[] = [
  { label: "Work", href: "/web-design#work" },
  { label: "Pricing", href: "/web-design/pricing", route: true },
  { label: "About", href: "/web-design#studio" },
  { label: "Contact", href: "/web-design#contact" },
];

function Wordmark() {
  return (
    <Link href="/web-design" className="flex items-center gap-3" aria-label="Integrate Web Design, home">
      <LogoMark tone="light" className="h-8 w-8" />
      <span className="text-[1.4rem] font-semibold tracking-tight text-ivory">Integrate Web Design</span>
    </Link>
  );
}

export function WebDesignNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={reduce ? undefined : { y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        className={`transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] ${
          scrolled ? "glass-dark" : ""
        }`}
      >
        <nav className="container-x flex items-center justify-between py-4" aria-label="Main">
          <Wordmark />

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => {
              const cls =
                "group relative text-[0.9rem] font-medium text-mist transition-colors duration-300 hover:text-ivory";
              const underline = (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-iris transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                />
              );
              return (
                <li key={link.href}>
                  {link.route ? (
                    <Link href={link.href} data-cursor="link" className={cls}>
                      {link.label}
                      {underline}
                    </Link>
                  ) : (
                    <a href={link.href} data-cursor="link" className={cls}>
                      {link.label}
                      {underline}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Back to the main brand — the return trip to Integrate AI. */}
            <BackToIntegrate className="hidden md:inline-flex" />

            {/* Secondary here — the room's job is browsing, not booking. */}
            <MagneticLink
              href="/#book-call"
              className="hidden rounded-full border border-graphite-2 px-5 py-2.5 text-[0.85rem] font-medium text-ivory transition-colors duration-300 hover:border-mist md:inline-block"
            >
              Book a call
            </MagneticLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="wd-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
            >
              <span className={`h-px w-5 bg-ivory transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-ivory transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="wd-mobile-menu"
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass-dark mx-4 mt-2 rounded-2xl border border-graphite p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              <li className="pb-1">
                <BackToIntegrate
                  className="flex w-full justify-center"
                  onClick={() => setOpen(false)}
                />
              </li>
              {LINKS.map((link) => (
                <li key={link.href}>
                  {link.route ? (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-lg font-medium text-ivory"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-lg font-medium text-ivory"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/#book-call"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-graphite-2 px-5 py-3 text-center font-medium text-ivory"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
