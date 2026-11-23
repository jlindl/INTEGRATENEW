"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/web-design-portal/icons";
import Reveal from "@/components/web-design-portal/reveal";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";
import {
  IMMERSIVE_DEMOS,
  immersiveHref,
  immersivePoster,
  immersivePreview,
  type ImmersiveDemo,
} from "@/lib/immersiveDemos";

/**
 * One demo: a browser frame showing the demo's first screen. On hover (or
 * keyboard focus) a short silent recording of its scroll scene plays in the
 * frame; on touch screens it plays while the card is the one in view. The
 * recording is only fetched the first time it is asked to play.
 */
function Card({ demo, index, reduce }: { demo: ImmersiveDemo; index: number; reduce: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const preview = immersivePreview(demo.slug);

  const play = () => {
    if (reduce) return;
    const v = video.current;
    if (!v) return;
    v.play().then(
      () => setPlaying(true),
      () => {},
    );
  };
  const stop = () => {
    const v = video.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  /* Touch screens have no hover: play the card that is squarely in view. */
  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: none)").matches) return;
    const node = card.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.intersectionRatio > 0.75 ? play() : stop()),
      { threshold: [0, 0.75, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // play/stop only touch refs and state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <article
      ref={card}
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onFocus={play}
      onBlur={stop}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-abyss-raised transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-neon-400/55 hover:shadow-[0_0_90px_-22px_rgba(160,43,255,0.95)] lg:rounded-[26px]"
    >
      <a
        href={immersiveHref(demo.slug)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Open demo"
        aria-label={`${demo.business}, ${demo.kind.toLowerCase()}. Opens the demo in a new tab`}
        className="relative block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-400"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full opacity-70" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-1 min-w-0 flex-1 truncate rounded-full bg-black/40 px-3 py-1 text-left text-[11px] text-white/55 sm:text-[12px]">
            integrate-tech.co.uk/web-design/immersive/{demo.slug}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <Image
            src={immersivePoster(demo.slug)}
            alt={`First screen of ${demo.business}, an Integrate demo ${demo.kind.toLowerCase()}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
            className="object-cover object-top"
          />
          {!reduce && (
            <video
              ref={video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              tabIndex={-1}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
            >
              <source src={preview.webm} type="video/webm" />
              <source src={preview.mp4} type="video/mp4" />
            </video>
          )}
          <span className="label-mono absolute left-3.5 top-3.5 rounded-full border border-white/25 bg-abyss/70 px-3 py-2 text-[10px] text-white backdrop-blur-md">
            Demo build
          </span>
          <span
            className={`label-mono absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-full bg-neon-500 px-3 py-2 text-[10px] text-white transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Scene: {demo.scene}
          </span>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="label-mono text-neon-300">
              {String(index + 1).padStart(2, "0")} &middot; {demo.trade}
            </p>
            <h3 className="mt-3 text-[clamp(1.5rem,2.3vw,2.2rem)] font-semibold uppercase leading-[0.98] tracking-[-0.045em] text-white">
              {demo.business}
            </h3>
          </div>
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-neon-400 group-hover:bg-neon-500"
          >
            <ArrowUpRight className="h-[17px] w-[17px]" />
          </span>
        </div>

        <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/60">{demo.pitch}</p>

        <dl className="mt-auto grid gap-2 pt-6 text-[13px]">
          <div className="flex items-baseline gap-3 border-t border-white/[0.08] pt-3">
            <dt className="label-mono shrink-0 text-[10px] text-white/40">Scroll scene</dt>
            <dd className="min-w-0 text-white/80">{demo.scene}</dd>
          </div>
          <div className="flex items-baseline gap-3 border-t border-white/[0.08] pt-3">
            <dt className="label-mono shrink-0 text-[10px] text-white/40">Try it</dt>
            <dd className="min-w-0 text-white/80">{demo.tool}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

/**
 * Ten cards on a six-column grid: two wide, six regular, two wide, so the
 * set reads as a designed block rather than a list with a stray last row.
 *
 * Each card reveals on its own. The grid must not be revealed as one block:
 * on a phone it is several screens tall, so it can never be 12% in view,
 * which is what Reveal waits for, and the cards would stay hidden.
 */
export default function ImmersiveGrid() {
  const reduce = usePrefersReducedMotion();
  const last = IMMERSIVE_DEMOS.length - 1;
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-7">
      {IMMERSIVE_DEMOS.map((demo, i) => (
        <Reveal
          as="li"
          key={demo.slug}
          delay={(i % 3) * 70}
          className={`min-w-0 ${i < 2 || i > last - 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
        >
          <Card demo={demo} index={i} reduce={reduce} />
        </Reveal>
      ))}
    </ul>
  );
}
