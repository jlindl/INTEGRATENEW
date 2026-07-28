"use client";

/**
 * PortfolioHero — "the work is the hero". Instead of an abstract WebGL field,
 * the opening beat is a slow, cinematic montage of the real builds, drifting in
 * tilted columns behind the headline, heavily scrimmed so it reads as
 * atmosphere (the work itself is shown sharply in the bento below). Pure CSS
 * motion — no WebGL, no gating, no fallback branch — so it's fast everywhere
 * and simply stops drifting under reduced motion.
 */
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { KineticHeading } from "@/components/web-design/interactions/KineticHeading";
import { MagneticLink } from "@/components/web-design/interactions/MagneticLink";

/* Three columns of real screenshots (niche demos + rendered mockups). Chosen
   for a light/dark mix so the collage stays lively through the scrim. */
const COLUMNS: string[][] = [
  ["/mockups/fintech-saas.jpg", "/portfolio/law-firms.jpg", "/portfolio/dental-practices.jpg"],
  ["/portfolio/kitchens.jpg", "/mockups/luxe-fashion.jpg", "/portfolio/electricians.jpg"],
  ["/portfolio/recruiters.jpg", "/mockups/wellness-retreat.jpg", "/portfolio/accountants.jpg"],
];

function MontageColumn({
  srcs,
  anim,
  className = "",
}: {
  srcs: string[];
  anim: string;
  className?: string;
}) {
  // Two copies so the -50% keyframe loops without a seam.
  const tiles = [...srcs, ...srcs];
  return (
    <div className={`w-[30%] shrink-0 ${className}`}>
      <div className={`flex flex-col gap-4 ${anim}`}>
        {tiles.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-graphite/50 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
          >
            <Image
              src={src}
              width={1440}
              height={900}
              alt=""
              aria-hidden="true"
              quality={35}
              sizes="30vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioHero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* ---- Montage field ---- */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Tilted, scaled collage so the columns sweep past the frame edges. */}
        <div className="absolute inset-0 flex origin-center justify-center gap-4 opacity-[0.42] blur-[2px] [transform:scale(1.4)_rotate(-8deg)] [mask-image:radial-gradient(120%_100%_at_50%_8%,black_52%,transparent_92%)]">
          <MontageColumn srcs={COLUMNS[0]} anim="wd-montage-up" />
          <MontageColumn srcs={COLUMNS[1]} anim="wd-montage-down" />
          <MontageColumn srcs={COLUMNS[2]} anim="wd-montage-up" className="hidden md:block" />
        </div>

        {/* Scrims — knock the collage back so type stays the hero, and land the
            section on clean carbon at the bottom. */}
        <div className="absolute inset-0 bg-carbon/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/80 via-carbon/35 to-carbon" />
        <div className="glow-iris absolute inset-0" />
        <div className="grain-dark absolute inset-0 opacity-50 mix-blend-screen" />
      </div>

      {/* ---- Copy ---- */}
      <div className="container-x relative z-10 pb-24 pt-40 md:pb-28">
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="eyebrow flex items-center gap-3 text-halo-dim"
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-iris" />
          Integrate Web Design
        </motion.p>

        <h1 className="mt-6 max-w-[18ch] font-display-tuned text-[clamp(2.9rem,7vw,5.6rem)] font-medium leading-[1.02] text-ivory">
          <KineticHeading text="Web & mobile apps, built to perform." delay={0.55} accentFrom={4} />
        </h1>

        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
          className="mt-7 max-w-[50ch] text-lg leading-relaxed text-mist md:text-xl"
        >
          We build websites and mobile apps that look sharp and pull their
          weight. Everything below is real work. Click into any of it.
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticLink
            href="#work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-halo px-8 py-4 text-base font-semibold text-carbon transition-colors duration-300 hover:bg-ivory"
          >
            Explore the work
            <span
              aria-hidden="true"
              className="transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </MagneticLink>
          <MagneticLink
            href="/#book-call"
            className="inline-flex items-center gap-2.5 rounded-full border border-graphite-2 px-8 py-4 text-base font-medium text-ivory transition-colors duration-300 hover:border-mist"
          >
            Book a call
          </MagneticLink>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <div className="h-10 w-px overflow-hidden bg-graphite-2">
          <motion.div
            className="h-4 w-px bg-halo"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
