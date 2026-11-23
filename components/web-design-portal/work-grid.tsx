"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Magnetic from "@/components/web-design-portal/magnetic";
import Reveal from "@/components/web-design-portal/reveal";
import { CLIENTS, type ClientBuild } from "@/components/web-design-portal/site-data";
import { ArrowRight, ArrowUpRight } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/** Pointer tilt, the same feel as the demo cards in the sector grid. */
function useTilt() {
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
  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };
  return { rotateX, rotateY, onMove, onLeave };
}

function ClientCard({ client, reduce }: { client: ClientBuild; reduce: boolean }) {
  const { rotateX, rotateY, onMove, onLeave } = useTilt();

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group h-full [perspective:1400px]"
    >
      <motion.a
        href={client.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Visit"
        aria-label={`${client.name}, ${client.sector}. ${client.service}. Opens the live site in a new tab`}
        style={reduce ? undefined : { rotateX, rotateY }}
        className="spotlight relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-abyss-raised outline-none transition-[border-color,box-shadow] duration-500 group-hover:border-neon-400/55 group-hover:shadow-[0_0_90px_-22px_rgba(160,43,255,0.95)] focus-visible:ring-2 focus-visible:ring-neon-400 lg:rounded-[28px]"
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
            {client.domain}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={client.image}
            alt={`Screenshot of the live ${client.name} website`}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover object-top transition-[scale] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <span className="label-mono absolute left-3.5 top-3.5 rounded-full bg-neon-500 px-3 py-2 text-[10px] text-white backdrop-blur-md">
            Client build
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-mono text-neon-300">
                {client.sector} &middot; {client.service}
              </p>
              <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.9rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-white">
                {client.name}
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
            {client.blurb}
          </p>
        </div>
      </motion.a>
    </div>
  );
}

/** Every live client site as a plain grid. Cards fade up as they arrive. */
export default function WorkGrid() {
  const reduce = usePrefersReducedMotion();

  return (
    <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {CLIENTS.map((client, i) => (
        <Reveal as="li" key={client.name} delay={(i % 2) * 90}>
          <ClientCard client={client} reduce={reduce} />
        </Reveal>
      ))}

      {/* Closing cell: rounds the grid off and asks the question. */}
      <Reveal as="li" delay={90}>
        <div className="relative isolate flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[22px] border border-neon-300/40 bg-gradient-to-br from-neon-500 via-neon-600 to-neon-800 p-7 text-white shadow-[0_0_120px_-30px_rgba(160,43,255,0.95)] lg:rounded-[28px] lg:p-10">
          <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-70" />
          <p className="label-mono text-white/80">Let&rsquo;s build yours</p>
          <p className="display display-lg mt-5 text-white">
            Want This for Your Business?
          </p>
          <Magnetic className="mt-8 self-start">
            <a
              href="#contact"
              className="sheen group inline-flex items-center gap-3.5 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-[16px] font-medium text-abyss shadow-[0_0_46px_-6px_rgba(0,0,0,0.5)]"
            >
              Book a Call
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-abyss text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </ul>
  );
}
