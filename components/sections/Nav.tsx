"use client";

/**
 * Fixed navigation. Transparent over the hero, condenses into a frosted
 * glass bar once the user scrolls. Mobile gets a full-width slide-down.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { WebDesignCta } from "@/components/ui/WebDesignCta";

/* Root-relative hashes (/#services) so the nav works from any page: they scroll
   on the homepage and route home-then-scroll from elsewhere (e.g. /blog).
   Blog is a real route. */
const LINKS = [
  { label: "About", href: "/#services" },
  { label: "Our Systems", href: "/#case-studies" },
  { label: "Our Process", href: "/#process" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
];

/* Route links navigate client-side; in-page hash links stay plain anchors. */
function MaybeLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const isRoute = href.startsWith("/") && !href.includes("#");
  if (isRoute) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

/* Brand lockup — the chevron mark plus wordmark. */
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Integrate, home"
    >
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.4rem] font-semibold tracking-tight text-ink">
        Integrate
      </span>
    </Link>
  );
}

export function Nav() {
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
          scrolled ? "glass shadow-lift" : ""
        }`}
      >
        <nav
          className="container-x flex items-center justify-between py-4"
          aria-label="Main"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <MaybeLink
                  href={link.href}
                  className="group relative text-[0.9rem] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                  {/* Underline draws in from the left */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </MaybeLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Secondary entry point to the dark portfolio hub. Opens in a new
                tab so the light→dark jump reads as a deliberate second room. */}
            <WebDesignCta className="hidden lg:inline-flex" />
            <a
              href="/#book-call"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-medium text-paper transition-colors duration-300 hover:bg-accent lg:inline-block"
            >
              Book a call
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            // Reduced motion: fade only, no movement
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass shadow-float mx-4 mt-2 rounded-2xl p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <MaybeLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-lg font-medium text-ink"
                  >
                    {link.label}
                  </MaybeLink>
                </li>
              ))}
              <li className="pt-2">
                <WebDesignCta
                  className="flex w-full"
                  onClick={() => setOpen(false)}
                />
              </li>
              <li>
                <a
                  href="/#book-call"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-ink px-5 py-3 text-center font-medium text-paper"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
