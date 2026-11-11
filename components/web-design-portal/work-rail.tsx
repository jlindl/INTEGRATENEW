"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/web-design-portal/magnetic";
import RevealText from "@/components/web-design-portal/reveal-text";
import { CLIENTS } from "@/components/web-design-portal/site-data";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The live client sites, as a pinned horizontal scene.
 *
 * The section is made exactly as tall as the viewport plus the width the rail
 * overflows by. Its inner stage sticks to the screen for that whole distance
 * and the rail is translated left by the scroll progress — so vertical scroll
 * is spent 1:1 on moving sideways through the projects, then the page carries
 * on as normal.
 *
 * Under reduced motion there is no pinning: the same rail simply scrolls
 * sideways by hand.
 */
export default function WorkRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [current, setCurrent] = useState(1);
  const reduce = usePrefersReducedMotion();
  const lenis = useLenis();

  // How far the rail has to move to bring its last panel fully on screen.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () =>
      setTravel(Math.max(0, rail.scrollWidth - window.innerWidth));

    // A ResizeObserver reports once on observe, so this also takes the first
    // measurement — and catches the cards changing width at a breakpoint.
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (p) => -p * travel);
  // Neighbouring cards drift in opposite directions as the rail moves, so the
  // row reads as layers at different depths rather than one flat strip.
  const rise = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const fall = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  // Each screenshot also slides a little inside its frame, against the rail.
  const shotX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const index = Math.min(
      CLIENTS.length,
      Math.max(1, Math.round(p * (CLIENTS.length - 1)) + 1),
    );
    setCurrent(index);
  });

  /** Keyboard focus can land on a card that is off to the side; scroll the
   *  page to the point where the rail has brought that card on screen. */
  const bringIntoView = (event: React.FocusEvent<HTMLElement>) => {
    if (reduce || !event.currentTarget.matches(":focus-visible")) return;
    const section = sectionRef.current;
    if (!section) return;

    const card = event.currentTarget;
    const centred =
      card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
    const top =
      section.getBoundingClientRect().top +
      window.scrollY +
      Math.min(travel, Math.max(0, centred));

    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top });
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={reduce ? undefined : { height: `calc(100svh + ${travel}px)` }}
    >
      <div
        className={
          reduce
            ? "overflow-x-auto py-24"
            : "sticky top-0 flex h-svh flex-col justify-center overflow-clip"
        }
      >
        <motion.div
          ref={railRef}
          style={reduce ? undefined : { x }}
          className="relative flex w-max items-center gap-7 px-6 will-change-transform sm:gap-10 sm:px-10 lg:gap-14 lg:px-[max(2.5rem,calc((100vw_-_1420px)_/_2_+_2.5rem))]"
        >
          {/* ------------------------------------------------ Opening panel */}
          <div className="w-[min(84vw,560px)] shrink-0 lg:w-[min(42vw,600px)]">
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Client Work
            </span>

            <RevealText
              as="h2"
              className="display display-lg mt-7 text-white"
              parts={[
                "Live Now,",
                "\n",
                "for",
                { text: "Real", className: "text-shine inline-block" },
                "\n",
                "Businesses.",
              ]}
            />

            <p className="mt-6 max-w-[42ch] text-[clamp(1rem,1.15vw,1.2rem)] leading-[1.55] text-white/60">
              These are sites we have built for UK businesses, across insurance,
              retail, timber supply and more. Keep scrolling to move through
              them. Each one opens the live site.
            </p>

            <p className="label-mono mt-9 flex items-center gap-3 text-neon-300">
              Scroll
              <ArrowRight className="h-4 w-4" />
            </p>
          </div>

          {/* ------------------------------------------------------- Cards */}
          {CLIENTS.map((client, i) => (
            <a
              key={client.name}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit"
              onFocus={bringIntoView}
              aria-label={`${client.name}, ${client.sector}. ${client.service}. Opens the live site in a new tab`}
              className="work-card group relative block shrink-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-neon-400 focus-visible:ring-offset-8 focus-visible:ring-offset-abyss"
            >
              <motion.div
                style={reduce ? undefined : { y: i % 2 === 0 ? rise : fall }}
              >
                <div className="flex items-end justify-between gap-4 pb-3 lg:pb-4">
                  <span className="work-index text-outline text-[clamp(3rem,5.6vw,5.5rem)] font-semibold leading-[0.8] tracking-[-0.05em]">
                    {pad(i + 1)}
                  </span>
                  <span className="label-mono pb-1 text-right leading-[1.5] text-white/50">
                    {client.sector}
                    <br />
                    <span className="text-neon-300">{client.service}</span>
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-abyss-raised shadow-[0_34px_80px_-28px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:border-neon-400/55 group-hover:shadow-[0_0_80px_-18px_rgba(160,43,255,0.9),0_34px_80px_-28px_rgba(0,0,0,0.95)] lg:rounded-2xl">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
                    <span className="flex gap-1.5">
                      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <span
                          key={c}
                          className="h-2.5 w-2.5 rounded-full opacity-70"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                    <span className="ml-1 flex-1 truncate rounded-full bg-black/40 px-3 py-1 text-left text-[11px] text-white/55 sm:text-[12px]">
                      {client.domain}
                    </span>
                    <span className="label-mono hidden items-center gap-1.5 text-[10px] text-white/55 sm:flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                      Live
                    </span>
                  </div>

                  <div className="work-shot relative overflow-hidden">
                    {/* Oversized so the slide never exposes an edge. */}
                    <motion.div
                      style={reduce ? undefined : { x: shotX }}
                      // Only `scale` is transitioned: `transform` belongs to the
                      // scroll-linked slide and must not be eased by CSS.
                      className="absolute inset-0 scale-[1.1] transition-[scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.16]"
                    >
                      <Image
                        src={client.image}
                        alt={`Screenshot of the live ${client.name} website`}
                        fill
                        sizes="(max-width: 640px) 330px, (max-width: 1024px) 510px, 770px"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-5 pt-4 lg:pt-5">
                  <div className="min-w-0">
                    <h3 className="text-[clamp(1.5rem,2.4vw,2.4rem)] font-semibold uppercase leading-none tracking-[-0.04em] text-white">
                      {client.name}
                    </h3>
                    <p className="mt-2.5 max-w-[46ch] text-[14px] leading-[1.5] text-white/55 lg:text-[15px]">
                      {client.blurb}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-neon-400 group-hover:bg-neon-500 lg:h-12 lg:w-12">
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                </div>
              </motion.div>
            </a>
          ))}

          {/* ------------------------------------------------- Closing panel */}
          <div className="flex w-[min(84vw,520px)] shrink-0 flex-col items-start lg:w-[min(38vw,560px)]">
            <p className="label-mono text-neon-300">
              ({pad(CLIENTS.length + 1)}) &mdash; Let&rsquo;s build yours
            </p>
            <p className="display display-lg mt-6 text-white">
              Want This for{" "}
              <span className="text-outline">Your Business?</span>
            </p>
            <Magnetic className="mt-9">
              <a
                href="#contact"
                className="sheen group inline-flex items-center gap-3.5 rounded-full bg-gradient-to-b from-white to-neon-50/70 py-2.5 pl-7 pr-2.5 text-[16px] font-medium text-abyss shadow-[0_0_46px_-6px_rgba(160,43,255,0.85)] transition-shadow duration-300 hover:shadow-[0_0_70px_-4px_rgba(160,43,255,1)]"
              >
                Book a Call
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-abyss text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Where you are in the rail. Meaningless when it scrolls by hand. */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="mx-auto flex w-full max-w-[1420px] items-center gap-5 px-6 pb-7 sm:px-14 lg:pb-9">
              <span className="label-mono tabular-nums text-white/70">
                {pad(current)}
                <span className="text-white/35"> / {pad(CLIENTS.length)}</span>
              </span>
              <span className="relative h-px flex-1 overflow-hidden bg-white/12">
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-neon-600 via-neon-400 to-neon-200"
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
