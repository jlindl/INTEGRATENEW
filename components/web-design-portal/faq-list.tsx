"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import { FAQ } from "@/components/web-design-portal/site-data";
import { PlusIcon } from "@/components/web-design-portal/icons";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Questions that open one at a time. The answers are always in the document —
 * a closed one is collapsed to zero height and hidden from assistive tech, not
 * removed — so they are there for search engines and for find-in-page.
 */
export default function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = usePrefersReducedMotion();
  const baseId = useId();

  return (
    <ul className="border-t border-white/12">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <li key={item.q} className="border-b border-white/12">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 py-6 text-left outline-none lg:gap-8 lg:py-8"
              >
                <span
                  className={`label-mono w-8 shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-neon-300" : "text-white/35"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`flex-1 text-[clamp(1.25rem,2.4vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.035em] transition-colors duration-300 group-hover:text-white group-focus-visible:text-neon-200 ${
                    isOpen ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-visible:ring-2 group-focus-visible:ring-neon-400 lg:h-14 lg:w-14 ${
                    isOpen
                      ? "rotate-45 border-neon-400 bg-neon-500 text-white shadow-[0_0_34px_-6px_rgba(160,43,255,0.95)]"
                      : "border-white/15 bg-white/[0.05] text-white group-hover:border-neon-400/60"
                  }`}
                >
                  <PlusIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                </span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-[62ch] pb-8 pl-[52px] pr-14 text-[clamp(1rem,1.3vw,1.3rem)] leading-[1.55] text-white/65 lg:pb-10 lg:pl-16">
                {item.a}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
