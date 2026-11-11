"use client";

import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "@/components/web-design-portal/magnetic";
import { ArrowUpRight, LogoMark } from "@/components/web-design-portal/icons";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Sectors", href: "#sectors" },
  { label: "Pricing", href: "#pricing" },
  { label: "Studio", href: "#studio" },
  { label: "FAQ", href: "#faq" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Geometry of the hover pill behind the desktop nav links.
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const lenis = useLenis();
  const { scrollY } = useScroll();

  // Out of the way while reading down the page, back the moment you scroll up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    setScrolled(latest > 12);
    if (latest < 160) setHidden(false);
    else if (delta > 4) setHidden(true);
    else if (delta < -4) setHidden(false);
  });

  // The menu covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Close the menu and release the scroll lock *before* the click reaches
   *  Lenis's own anchor handler, which ignores scrollTo while stopped. */
  const closeMenu = () => {
    lenis?.start();
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled && !open
            ? "border-b border-white/10 bg-abyss/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1420px] items-center justify-between px-6 sm:px-10 lg:h-20">
          <a
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em]"
          >
            <LogoMark className="h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(160,43,255,0.85)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />
            <span>
              Integrate
              <span className="ml-1.5 text-white/55 max-sm:hidden">
                Web Design
              </span>
            </span>
          </a>

          <nav
            onMouseLeave={() => setPill((p) => ({ ...p, opacity: 0 }))}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[15px] backdrop-blur-md lg:flex"
          >
            {/* One pill that slides to whichever link is hovered. */}
            <motion.span
              aria-hidden
              initial={false}
              animate={pill}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="pointer-events-none absolute bottom-1 top-1 rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
            />
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={(e) =>
                  setPill({
                    left: e.currentTarget.offsetLeft,
                    width: e.currentTarget.offsetWidth,
                    opacity: 1,
                  })
                }
                className="relative rounded-full px-4 py-2 text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={closeMenu}
                className="sheen block rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-[15px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-300 hover:border-neon-400/70 hover:bg-neon-500/25 hover:shadow-[0_0_34px_-4px_rgba(160,43,255,0.85)]"
              >
                Book a Call
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white transition-colors hover:bg-white/[0.12] lg:hidden"
            >
              {/* Two bars that cross into an X. */}
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu, opened from the corner the button sits in. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-abyss lg:hidden"
          >
            <div aria-hidden className="dot-grid absolute inset-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-[20%] -top-[10%] h-[70%] w-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.4),transparent_72%)] blur-3xl"
            />

            <nav className="relative flex flex-1 flex-col justify-center px-6 pt-[72px] sm:px-10">
              {NAV_LINKS.map((link, i) => (
                <span key={link.label} className="block overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.16 + i * 0.06,
                    }}
                    className="display flex items-baseline gap-4 border-b border-white/[0.08] py-3 text-[clamp(2.6rem,12vw,5rem)] text-white"
                  >
                    <span className="label-mono text-neon-300">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                </span>
              ))}

              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                className="mt-10 inline-flex items-center justify-center gap-2 self-start rounded-full bg-neon-500 px-7 py-4 text-[16px] font-medium text-white shadow-[0_0_46px_-6px_rgba(160,43,255,0.9)]"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
