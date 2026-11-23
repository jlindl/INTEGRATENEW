"use client";

import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import {
  SECTOR_BUILDS,
  SECTOR_FILTERS,
  type SectorBuild,
  type SectorFilter,
} from "@/components/web-design-portal/site-data";
import { ArrowUpRight } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function Card({ build, reduce }: { build: SectorBuild; reduce: boolean }) {
  // Pointer position across the card, -0.5..0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 20,
  });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const isDemo = build.status === "demo";

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group h-full [perspective:1400px]"
    >
      <motion.article
        style={reduce ? undefined : { rotateX, rotateY }}
        className="spotlight relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-abyss-raised transition-[border-color,box-shadow] duration-500 group-hover:border-neon-400/55 group-hover:shadow-[0_0_90px_-22px_rgba(160,43,255,0.95)] lg:rounded-[28px]"
      >
        {/* The whole picture is the way in. */}
        <a
          href={build.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={isDemo ? "Open demo" : "Visit"}
          aria-label={`${build.name}, ${build.kind}. Opens the ${isDemo ? "live demo" : "live site"} in a new tab`}
          className="relative block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neon-400"
        >
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
              {build.address}
            </span>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={build.image}
              alt={`Screenshot of ${build.name}, ${isDemo ? "an Integrate demo" : "a live client"} ${build.kind.toLowerCase()}`}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover object-top transition-[scale] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            {/* Says plainly what kind of build this is. */}
            <span
              className={`label-mono absolute left-3.5 top-3.5 rounded-full px-3 py-2 text-[10px] backdrop-blur-md ${
                isDemo
                  ? "border border-white/25 bg-abyss/70 text-white"
                  : "bg-neon-500 text-white"
              }`}
            >
              {isDemo ? "Demo build" : "Client build"}
            </span>
          </div>
        </a>

        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-mono text-neon-300">
                {build.group} &middot; {build.kind}
              </p>
              <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.9rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-white">
                {build.name}
              </h3>
            </div>
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:border-neon-400 group-hover:bg-neon-500"
            >
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </span>
          </div>

          <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.55] text-white/60 lg:text-[16px]">
            {build.pitch}
          </p>

          {build.brief && (
            <a
              href={build.brief}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[14px] font-medium text-white/75 transition-colors hover:text-white"
            >
              Read the brief
              <ArrowUpRight className="h-3.5 w-3.5 text-neon-300" />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}

/**
 * The builds by sector, behind a filter. Choosing a sector lets the cards that
 * no longer match shrink away while the rest glide into the gaps they leave.
 */
export default function SectorGrid() {
  const [filter, setFilter] = useState<SectorFilter>("All work");
  const reduce = usePrefersReducedMotion();

  const visible = SECTOR_BUILDS.filter(
    (build) => filter === "All work" || build.group === filter,
  );

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label="Filter builds by sector"
        className="flex flex-wrap justify-center gap-2"
      >
        {SECTOR_FILTERS.map((name) => {
          const active = name === filter;
          const count =
            name === "All work"
              ? SECTOR_BUILDS.length
              : SECTOR_BUILDS.filter((build) => build.group === name).length;

          return (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={active}
              className={`relative rounded-full border px-5 py-2.5 text-[15px] transition-colors duration-300 ${
                active
                  ? "border-transparent text-white"
                  : "border-white/12 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {/* One highlight that slides between the buttons. */}
              {active && (
                <motion.span
                  layoutId="sector-filter-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-neon-500 shadow-[0_0_34px_-6px_rgba(160,43,255,0.95)]"
                />
              )}
              <span className="relative">
                {name}
                <sup className="ml-1.5 text-[10px] opacity-70">{count}</sup>
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((build) => (
            <motion.li
              key={build.name}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
            >
              <Card build={build} reduce={reduce} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Announces the result of filtering to assistive tech. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {SECTOR_BUILDS.length} builds
      </p>
    </LayoutGroup>
  );
}
