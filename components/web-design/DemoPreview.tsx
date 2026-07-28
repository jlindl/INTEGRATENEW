"use client";

/**
 * DemoPreview — the close-up at the foot of a niche case study.
 *
 * When the niche has a live demo, this embeds the *actual* demo site in a
 * scaled iframe rather than an approximation, so the preview can never drift
 * out of date: it is the demo. The frame shows the top of the page (hero +
 * a little below), and the whole thing is a link that opens the full demo.
 *
 * Niches without a demo fall back to the procedural <NicheMockup> crop, which
 * is all there is to show for them until a real build exists.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Niche } from "@/lib/webDesignData";
import { NicheMockup } from "./NicheMockup";

/* The demo is rendered at a desktop viewport and then scaled to fit the frame,
   so we always see the real desktop layout — not the demo's mobile breakpoint. */
const BASE_W = 1440;
const BASE_H = 900;

const FRAME =
  "relative aspect-[16/7] overflow-hidden rounded-2xl border border-graphite bg-carbon-2";

export function DemoPreview({ niche }: { niche: Niche }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BASE_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // No live demo → keep the procedural mock crop (unchanged from before).
  if (!niche.demo) {
    return (
      <div className={FRAME}>
        <div className="absolute left-0 top-0 w-[165%] origin-top-left">
          <NicheMockup niche={niche} />
        </div>
      </div>
    );
  }

  return (
    <div ref={frameRef} className={FRAME}>
      <iframe
        src={niche.demo}
        title={`${niche.name} live demo`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        style={{
          width: BASE_W,
          height: BASE_H,
          border: 0,
          pointerEvents: "none",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity: scale > 0 ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* The whole frame opens the real demo. */}
      <Link
        href={niche.demo}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        aria-label={`Open the ${niche.name} live demo in a new tab`}
        className="group absolute inset-0 flex items-end justify-end p-4"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-graphite bg-carbon/70 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist backdrop-blur-sm transition-colors group-hover:text-ivory">
          Open live demo
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path d="M4 12 L12 4 M6 4 h6 v6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
