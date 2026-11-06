"use client";

/**
 * TapDemo: the /review-plates hero picture. The plate gives its tap ripple and
 * the phone beside it lights up with the page a tap opens: logo, the review
 * button first, then the business's other links. It is a miniature of the real
 * /b page, built from the same plate drawing and link icons, so what people
 * see here is what their customers will get.
 *
 * Plays once on load (it sits above the fold). With reduced motion it is
 * simply the finished picture, and the plate's CSS ripple is switched off.
 */
import { motion, useReducedMotion } from "framer-motion";
import { LinkIcon } from "@/components/tap/LinkIcon";
import { Plate } from "@/components/tap/ui";
import { LogoMark } from "@/components/ui/LogoMark";
import { EASE } from "@/lib/motion";
import type { LinkKind } from "@/lib/tap/types";

const SCREEN_LINKS: { kind: LinkKind; label: string }[] = [
  { kind: "google", label: "Leave us a Google review" },
  { kind: "instagram", label: "Instagram" },
  { kind: "whatsapp", label: "WhatsApp us" },
  { kind: "menu", label: "See our menu" },
];

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="shrink-0 opacity-60"
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TapDemo() {
  const reduce = useReducedMotion();

  /* Screen rows arrive one after another, just after the plate's first ripple.
     Same pattern as <Reveal>: with reduced motion the start state already
     equals the end state, and because framer-motion still owns opacity it
     overwrites the server-rendered opacity:0 on mount. */
  const row = (i: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.85 + i * 0.08 },
  });

  return (
    <div
      role="img"
      aria-label="An Integrate Tap review plate next to a phone showing the page a tap opens: a Google review button first, then Instagram, WhatsApp and a menu link."
      className="relative mx-auto h-[30rem] w-full max-w-[21rem] sm:h-[31rem] sm:max-w-[26.5rem]"
    >
      {/* Soft counter shadow under the pair */}
      <span
        aria-hidden="true"
        className="absolute bottom-[3%] left-[6%] h-[9%] w-[88%] rounded-[100%] bg-ink/10 blur-2xl"
      />

      {/* Phone */}
      <motion.div
        className="absolute right-0 top-0"
        initial={reduce ? { opacity: 1, y: 0, rotate: 5 } : { opacity: 0, y: 26, rotate: 9 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      >
        <div className="relative h-[22.5rem] w-[11.5rem] rounded-[2.2rem] bg-ink p-[0.4rem] shadow-float ring-1 ring-black/30 sm:h-[25rem] sm:w-[12.75rem] sm:rounded-[2.4rem]">
          {/* Side button, for silhouette */}
          <span aria-hidden="true" className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l-sm bg-ink" />
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.85rem] bg-paper sm:rounded-[2.05rem]">
            <span aria-hidden="true" className="glow-accent absolute inset-0" />
            {/* Camera cut-out */}
            <span aria-hidden="true" className="absolute left-1/2 top-2 h-[1.05rem] w-[3.8rem] -translate-x-1/2 rounded-full bg-ink" />

            <div className="relative flex flex-1 flex-col items-center px-3 pb-3 pt-10 text-center">
              <motion.span
                {...row(0)}
                className="font-display-tuned flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-card text-xl font-medium text-ink shadow-lift"
              >
                Y
              </motion.span>
              <motion.span
                {...row(1)}
                className="font-display-tuned mt-3 block text-[1.02rem] font-medium leading-tight text-ink"
              >
                Your business
              </motion.span>
              <motion.span {...row(2)} className="mt-1 block max-w-[17ch] text-[0.64rem] leading-snug text-ink-2">
                Thanks for coming in. Tell us how we did.
              </motion.span>

              <span className="mt-4 flex w-full flex-col gap-1.5 text-left">
                {SCREEN_LINKS.map((l, i) => (
                  <motion.span
                    key={l.kind}
                    {...row(3 + i)}
                    className={`flex min-h-[2.55rem] items-center gap-2 rounded-xl border px-1.5 py-1 ${
                      i === 0 ? "border-ink bg-ink text-paper shadow-lift" : "border-line bg-card text-ink"
                    }`}
                  >
                    <LinkIcon kind={l.kind} size={28} />
                    <span className="min-w-0 flex-1 text-[0.64rem] font-medium leading-tight">{l.label}</span>
                    <Chevron />
                  </motion.span>
                ))}
              </span>

              <motion.span
                {...row(8)}
                className="mt-auto flex items-center gap-1.5 pt-3 text-[0.56rem] text-ink-3"
              >
                <LogoMark className="h-2.5 w-2.5" />
                Made with Integrate Tap
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Plate, in front of the phone's bottom corner (clear of its links) */}
      <motion.div
        className="absolute bottom-1 left-0 origin-bottom-left scale-[0.86] sm:-left-6 sm:scale-100"
        initial={reduce ? { opacity: 1, y: 0, rotate: -5 } : { opacity: 0, y: 18, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Plate ping />
      </motion.div>
    </div>
  );
}
