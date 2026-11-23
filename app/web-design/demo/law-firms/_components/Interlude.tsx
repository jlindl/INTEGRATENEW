"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG, mono, serif, wrap } from "./tokens";

/** A full-bleed pause between sections: one client, one sentence. */
export function Interlude() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Client testimonial"
      className="relative isolate overflow-hidden bg-[#0f0d0b] text-[#f3efe7]"
    >
      <motion.div className="absolute inset-[-10%_0] -z-10" style={reduce ? undefined : { y }}>
        <Image
          src={`${IMG}/regent-street.webp`}
          alt=""
          fill
          sizes="100vw"
          className="hl-grade object-cover object-[50%_50%]"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(15,13,11,0.62)]" />

      <div className={`${wrap} flex min-h-[80svh] flex-col justify-center py-28`}>
        <figure className="max-w-5xl">
          <span aria-hidden="true" className={`${serif} block text-[6rem] leading-[0.5] text-[#a2865a]`}>
            &ldquo;
          </span>
          <blockquote className={`${serif} mt-6 text-[clamp(2rem,4.6vw,4.1rem)] leading-[1.08] tracking-[-0.015em]`}>
            <p>
              They told us what we did not want to hear, in plain English, on a
              Tuesday afternoon. <em className="italic text-[#d9c3a0]">It saved the business.</em>
            </p>
          </blockquote>
          <figcaption className={`${mono} mt-10 flex flex-wrap items-center gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-[#f3efe7]/75`}>
            <span aria-hidden="true" className="h-px w-10 bg-[#a2865a]" />
            Managing director, precision engineering group, Surrey
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
