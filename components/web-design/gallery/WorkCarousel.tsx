"use client";

/**
 * WorkCarousel — a faithful port of the 3-D coverflow carousel on
 * integratewebdesign.vercel.app's "Selected work" section. Cards sit on an arc
 * (perspective 2000px): the active card is flat and centered; neighbours rotate
 * away in Y, recede in Z, and dim. Drag / swipe / arrow keys / the arrow buttons
 * / the dots all move the active card; clicking a side card centers it; the
 * centered card (and the "Visit site" caption link) opens that build live.
 *
 * Each card is a browser-window frame (mac dots + URL bar) wrapping the real
 * niche screenshot. Data-driven from lib/webDesignData.
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SHOWCASE, type ShowcaseItem } from "@/lib/showcaseData";

type Item = ShowcaseItem;

const ITEMS: Item[] = SHOWCASE;

const N = ITEMS.length;
const isExternal = (href: string) => /^https?:\/\//.test(href);

/** ms the conveyor takes to drift one card-width to the next. */
const PERIOD = 7200;

/**
 * Signed shortest distance from a (possibly fractional) position on the ring,
 * in [-N/2, N/2]. Works for the continuously-drifting `pos` as well as integers.
 */
function offsetOf(i: number, pos: number) {
  let d = ((i - pos) % N + N) % N; // 0..N
  if (d > N / 2) d -= N; // -N/2..N/2
  return d;
}

/* Browser-window card face — shared by the active <a> and inactive <button>. */
function CardFace({ item }: { item: Item }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0714] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#ff5f57" }} />
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#febc2e" }} />
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#28c840" }} />
        </span>
        <span className="ml-1 flex-1 truncate rounded-full bg-black/40 px-2.5 py-1 text-left text-[10px] text-white/45 sm:text-[11px]">
          {item.domain}
        </span>
      </div>
      <div className="relative aspect-16/10 w-full">
        <Image
          src={item.image}
          alt={`${item.brand}, ${item.descriptor}`}
          fill
          draggable={false}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 480px, 620px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function WorkCarousel() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // The carousel runs on a continuously-drifting fractional position `pos`.
  // Left to itself it eases forward forever (a slow conveyor), so the stack is
  // always creeping toward the next site — the motion itself signals the change.
  // Manual nav sets a whole-number `seek` target the loop glides to, then the
  // drift resumes. `pos` lives in a ref (mutated every frame) and is mirrored to
  // state so React repaints the transforms.
  const posRef = useRef(0);
  const seekRef = useRef<number | null>(null);
  const [pos, setPos] = useState(0);
  const activeIndex = ((Math.round(pos) % N) + N) % N;

  // ---- pause while the viewer is engaged (hover / focus / hidden tab) ----
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovering || focused || hidden;
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Point the conveyor at a specific card (or nudge by ±1). Under reduced-motion
  // we jump straight there; otherwise the rAF loop eases `pos` to the target.
  const seekTo = useCallback(
    (target: number) => {
      if (reduce) {
        posRef.current = ((target % N) + N) % N;
        setPos(posRef.current);
        seekRef.current = null;
      } else {
        seekRef.current = target;
      }
    },
    [reduce],
  );
  const go = useCallback(
    (dir: number) => seekTo(Math.round(posRef.current) + dir),
    [seekTo],
  );
  const to = useCallback(
    (i: number) => seekTo(Math.round(posRef.current) + offsetOf(i, Math.round(posRef.current))),
    [seekTo],
  );

  // ---- the drift loop -------------------------------------------------
  useEffect(() => {
    if (reduce) return; // static under reduced-motion; nav jumps instead
    let raf = 0;
    let last: number | null = null;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last === null ? 0 : t - last;
      last = t;

      const seek = seekRef.current;
      if (seek !== null) {
        // Ease toward a manual target, then hand back to the free drift.
        const next = posRef.current + (seek - posRef.current) * Math.min(1, dt / 260);
        if (Math.abs(seek - next) < 0.002) {
          posRef.current = ((seek % N) + N) % N;
          seekRef.current = null;
        } else {
          posRef.current = next;
        }
        setPos(posRef.current);
      } else if (!pausedRef.current) {
        // Free conveyor: creep forward one card every PERIOD ms.
        posRef.current = ((posRef.current + dt / PERIOD) % N + N) % N;
        setPos(posRef.current);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // ---- pointer drag / swipe -------------------------------------------
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    if (Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 55) go(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // Keep the caption crossfade re-triggering on change without layout thrash.
  const activeItem = ITEMS[activeIndex];

  return (
    <motion.div
      className="mt-8 md:mt-10"
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected work"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // --iwd-spread: how far each neighbour sits from centre. Wider on small
        // screens so the active card isn't crowded; the live desktop spacing on sm+.
        className="relative h-[300px] cursor-grab touch-pan-y select-none outline-none [--iwd-spread:76%] active:cursor-grabbing sm:h-[400px] sm:[--iwd-spread:54%] lg:h-[500px]"
        style={{ perspective: "2000px" }}
      >
        {/* Purple bloom behind the stack */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[min(760px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(160,43,255,0.28), transparent 72%)",
          }}
        />

        {ITEMS.map((item, i) => {
          const o = offsetOf(i, pos);
          const abs = Math.abs(o);
          if (abs > 3.1) return null; // fully faded — skip until it drifts in
          const isCenter = i === activeIndex;
          const far = abs > 1.6;
          const wrapStyle: React.CSSProperties = {
            // rAF drives `pos` frame-by-frame, so the wrapper carries NO CSS
            // transition — the smoothness is the continuous drift itself.
            transform: `translate(-50%, -50%) translateX(calc(${o} * var(--iwd-spread))) translateZ(${-abs * 240}px) rotateY(${o * 32}deg)`,
            opacity: Math.max(0, 1 - 0.34 * abs),
            filter: `brightness(${Math.max(0.3, 1 - 0.24 * abs)})`,
            zIndex: Math.round(100 - abs * 10),
            pointerEvents: abs > 2.6 ? "none" : "auto",
            willChange: "transform",
          };
          const cardClass =
            "block w-[300px] rounded-xl outline-none transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#b25dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050208] sm:w-[480px] lg:w-[620px]";

          return (
            <div key={item.id} className="absolute left-1/2 top-1/2" style={wrapStyle}>
              {isCenter ? (
                <a
                  href={item.href}
                  target={isExternal(item.href) ? "_blank" : undefined}
                  rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                  aria-label={`Open the ${item.forLabel} build live`}
                  className={`${cardClass} cursor-pointer`}
                  onClick={(e) => {
                    // A drag that ended on this card shouldn't navigate.
                    if (drag.current) e.preventDefault();
                  }}
                >
                  <CardFace item={item} />
                </a>
              ) : (
                <button
                  type="button"
                  tabIndex={far ? -1 : 0}
                  aria-label={`Show ${item.brand}`}
                  onClick={() => to(i)}
                  className={`${cardClass} cursor-pointer`}
                >
                  <CardFace item={item} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div key={activeIndex} className="iwd-rise mt-8 text-center">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-white lg:text-3xl">
          {activeItem.brand}
        </h3>
        <p className="mt-1.5 text-[15px] text-white/55">{activeItem.descriptor}</p>
        <a
          href={activeItem.href}
          target={isExternal(activeItem.href) ? "_blank" : undefined}
          rel={isExternal(activeItem.href) ? "noopener noreferrer" : undefined}
          className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#c98fff] transition-colors hover:text-[#ddb8ff]"
        >
          Visit site
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8h9.5M9 4.2 12.8 8 9 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Controls: prev — dots — next */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white transition-[transform,color,background-color,border-color] duration-200 hover:scale-110 hover:border-[#b25dff]/60 hover:bg-white/[0.13] active:scale-95"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 rotate-180">
            <path d="M3 8h9.5M9 4.2 12.8 8 9 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {ITEMS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to ${item.brand}`}
              aria-current={i === activeIndex}
              onClick={() => to(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-7 bg-[#b25dff]" : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white transition-[transform,color,background-color,border-color] duration-200 hover:scale-110 hover:border-[#b25dff]/60 hover:bg-white/[0.13] active:scale-95"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M3 8h9.5M9 4.2 12.8 8 9 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Crawlable / SR fallback: every build as a real link. */}
      <ul className="sr-only">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <a href={item.caseStudy ?? item.href}>{item.brand}, {item.descriptor}</a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
