"use client";

/**
 * IndustryGrid — the filterable grid beneath the #work carousel. A row of
 * industry chips (Trades, Professional, Health, Hospitality, Clothing …) filters
 * a responsive grid of the builds in that sector; each card opens the live site.
 * Styled to match the ink + neon "Selected work" section it lives in.
 */
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ACTIVE_INDUSTRIES,
  itemsByIndustry,
  type ShowcaseItem,
} from "@/lib/showcaseData";

const isExternal = (href: string) => /^https?:\/\//.test(href);

function GridCard({ item }: { item: ShowcaseItem }) {
  return (
    <a
      href={item.href}
      target={isExternal(item.href) ? "_blank" : undefined}
      rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
      aria-label={`${item.brand}, ${item.descriptor}. Open live.`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#0c0714] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#b25dff]/50 hover:shadow-[0_24px_60px_-30px_rgba(160,43,255,0.55)]"
    >
      {/* mini browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#ff5f57" }} />
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#febc2e" }} />
          <span className="h-2 w-2 rounded-full opacity-70" style={{ background: "#28c840" }} />
        </span>
        <span className="ml-1 flex-1 truncate rounded-full bg-black/40 px-2.5 py-1 text-left text-[10px] text-white/45">
          {item.domain}
        </span>
      </div>

      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={`${item.brand}, ${item.descriptor}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* Hover overlay — a clear "open live" affordance. */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex translate-y-1.5 items-center gap-1.5 rounded-full bg-[#b25dff] px-3 py-1.5 text-[12px] font-medium text-[#050208] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            Visit site
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="M3 8h9.5M9 4.2 12.8 8 9 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <h4 className="truncate text-[15px] font-medium text-white">{item.brand}</h4>
          <p className="truncate text-[13px] text-white/50">{item.descriptor}</p>
        </div>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-[transform,color,background-color,border-color] duration-300 group-hover:translate-x-0.5 group-hover:border-[#b25dff]/60 group-hover:bg-[#b25dff]/15 group-hover:text-white"
        >
          →
        </span>
      </div>
    </a>
  );
}

export function IndustryGrid() {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();
  const items = itemsByIndustry(active);

  return (
    <div className="mt-20 md:mt-24">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#c98fff]">
          Browse by sector
        </span>
        <h3 className="mt-3 text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.02em] text-white">
          The websites we build, by sector
        </h3>
      </motion.div>

      {/* Filter chips */}
      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {ACTIVE_INDUSTRIES.map((ind) => {
          const on = active === ind.id;
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => setActive(ind.id)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-[transform,color,background-color,border-color] duration-200 hover:scale-105 active:scale-95 ${
                on
                  ? "border-transparent bg-[#b25dff] text-[#050208]"
                  : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {ind.label}
            </button>
          );
        })}
      </motion.div>

      {/* Grid */}
      <motion.div
        layout={!reduce}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(i, 5) * 0.06,
              }}
            >
              <GridCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
