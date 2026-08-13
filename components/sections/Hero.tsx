"use client";

/**
 * Hero — the opening beat. Editorial headline on the left, the engineered
 * 3D lattice on the right. Scroll rotates and recedes the object while the
 * copy drifts up and away; the cursor leans the object gently.
 *
 * The 3D scene is lazy-loaded and gated: reduced motion, no WebGL, low-end
 * hardware, or small viewports get a hand-drawn static SVG of the same
 * object instead.
 */
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  useReducedMotion,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WebDesignCta } from "@/components/ui/WebDesignCta";
import { EASE } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

/* Word-by-word masked rise for the headline */
function MaskedWords({
  text,
  startDelay = 0,
  className = "",
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? { y: 0 } : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: startDelay + i * 0.055 }}
            >
              {word}
            </motion.span>
          </span>
          {/* inter-word space lives outside the mask so it never collapses */}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/* Static stand-in for the 3D lattice — the metallic brand mark inside a
   silver orbit, hand-drawn. Same composition as the 3D scene. */
function StaticLattice() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="lattice-mark" x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0" stopColor="#8f9299" />
          <stop offset="0.5" stopColor="#eef0f2" />
          <stop offset="1" stopColor="#6e7178" />
        </linearGradient>
        <linearGradient id="lattice-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8ccd2" />
          <stop offset="0.5" stopColor="#8b8f97" />
          <stop offset="1" stopColor="#c8ccd2" />
        </linearGradient>
      </defs>
      {/* cage */}
      <g stroke="#1b1a16" strokeOpacity="0.2" strokeWidth="1" fill="none">
        <polygon points="240,58 398,150 398,330 240,422 82,330 82,150" />
        <path d="M240,58 L82,330 M240,58 L398,330 M82,150 L398,150 M82,150 L240,422 M398,150 L240,422 M82,330 L398,330" />
      </g>
      {/* rings */}
      <ellipse cx="240" cy="240" rx="150" ry="54" fill="none" stroke="url(#lattice-ring)" strokeWidth="3" transform="rotate(-18 240 240)" />
      <ellipse cx="240" cy="240" rx="178" ry="42" fill="none" stroke="#71747b" strokeWidth="1.5" transform="rotate(24 240 240)" />
      {/* brand mark — the chevron, scaled up from the 48-unit source to sit
          centred and prominent at the core */}
      <g transform="translate(240 240) scale(4.6) translate(-24 -24)">
        <path d="M2 12 L14 12 L26 24 L14 36 L2 36 L11 24 Z" fill="#1b1a16" />
        <path d="M22 2 L46 24 L34 24 L22 12 Z" fill="url(#lattice-mark)" />
        <path d="M46 24 L22 46 L22 36 L34 24 Z" fill="#1b1a16" />
      </g>
      {/* nodes */}
      <g fill="#c7cace" stroke="#74705f" strokeWidth="0.5">
        {[[240, 58], [398, 150], [398, 330], [240, 422], [82, 330], [82, 150]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
        ))}
      </g>
      {/* pulses */}
      <g fill="#9ea2a9">
        <circle cx="320" cy="104" r="4.5" />
        <circle cx="161" cy="376" r="4.5" />
        <circle cx="398" cy="240" r="4.5" />
      </g>
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef);

  // Gate: 3D only where it will run beautifully
  const [use3d, setUse3d] = useState(false);
  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 8) < 4;
    // >= lg only: below that the object is a faint backdrop behind the copy,
    // which doesn't justify a WebGL context (and tablets ran it over the text).
    const wide = window.innerWidth >= 1024;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setUse3d(!prefersReduce && !lowEnd && wide && webgl);
  }, []);

  // Scroll drive: 0 at top, 1 when the hero has scrolled past. The hero sits
  // at the very top of the page, so progress is simply scrollY / heroHeight —
  // computed manually because framer's element-target measurement can
  // degenerate (0/0 → progress 1) if the first read happens in a throttled
  // renderer, which would blank the copy at rest.
  const { scrollY } = useScroll();
  const [heroHeight, setHeroHeight] = useState(1000);
  useEffect(() => {
    const measure = () =>
      setHeroHeight(sectionRef.current?.offsetHeight || window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const scrollProgress = useTransform(scrollY, [0, heroHeight], [0, 1]);
  const copyY = useTransform(scrollProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollProgress, [0.45, 0.9], [1, 0]);
  const visualY = useTransform(scrollProgress, [0, 1], [0, 60]);

  // Cursor drive (raw values; the scene applies damping)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const { innerWidth, innerHeight } = window;
    pointerX.set((e.clientX / innerWidth - 0.5) * 2);
    pointerY.set((e.clientY / innerHeight - 0.5) * 2);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* Soft accent wash behind the object */}
      <div className="glow-accent absolute inset-0" aria-hidden="true" />

      {/* The visual — right half on desktop. Below lg it's a corner motif:
          tucked up and out to the right, and faint, so it reads as texture
          instead of sitting on top of the headline and buttons. */}
      <motion.div
        style={reduce ? undefined : { y: visualY }}
        className="pointer-events-none absolute -right-[26%] -top-[10%] h-[76vw] w-[76vw] opacity-[0.13] sm:-right-[20%] sm:h-[62vw] sm:w-[62vw] lg:-right-[3%] lg:top-1/2 lg:h-[min(50vw,840px)] lg:w-[min(50vw,840px)] lg:-translate-y-1/2 lg:opacity-100"
        aria-hidden="true"
      >
        {/* Grounding shadow */}
        <div className="absolute bottom-[6%] left-1/2 h-[7%] w-[58%] -translate-x-1/2 rounded-[100%] bg-ink/12 blur-2xl" />
        {use3d ? (
          <HeroScene
            scroll={scrollProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            active={inView}
          />
        ) : (
          <StaticLattice />
        )}
      </motion.div>

      {/* Copy */}
      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="container-x relative flex flex-1 flex-col justify-center pb-24 pt-24 lg:pb-40 lg:pt-20"
      >
        <h1 className="font-display-tuned max-w-[13ch] text-[clamp(2.9rem,7.2vw,6.1rem)] font-medium leading-[1.02] text-ink">
          <MaskedWords text="The strategic" startDelay={0.06} />
          <br />
          <MaskedWords
            text="AI partner"
            startDelay={0.16}
            className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]"
          />{" "}
          <MaskedWords text="for" startDelay={0.26} />
          <br />
          <MaskedWords text="high-growth B2B." startDelay={0.34} />
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink-2 md:text-xl"
        >
          We design, deploy, and manage bespoke AI systems, automating revenue
          operations so your team can focus on what only humans can do.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#book-call" variant="primary">
            Book a Strategy Call
          </MagneticButton>
          <MagneticButton href="#case-studies" variant="secondary">
            See What We Build
          </MagneticButton>
        </motion.div>

        {/* Sub-brand entry — set apart as its own tier, on a hairline, so it
            reads as a second offering rather than a third primary action. */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.84 }}
          className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-7"
        >
          <WebDesignCta size="lg" label="Explore Integrate Web Design" className="inline-flex" />
          <span className="max-w-[30ch] text-sm leading-relaxed text-ink-2">
            Also building bespoke websites, tuned to how your industry buys.
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={reduce ? undefined : { opacity: copyOpacity }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <div className="h-10 w-px overflow-hidden bg-line-2">
          <motion.div
            className="h-4 w-px bg-ink"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
