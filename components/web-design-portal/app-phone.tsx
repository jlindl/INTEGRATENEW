"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/web-design-portal/use-reduced-motion";

/**
 * The A La Parrilla ordering app, drawn in markup rather than shipped as a
 * picture. Every label, price and number on the screen is the one shown in the
 * app mock on the live Integrate Web Design portal.
 *
 * The handset turns to face you as it crosses the viewport, and the order
 * tracker and the loyalty card fill in as it arrives.
 */

const EMBER = "#ff6a2b";

const ORDER = [
  { qty: 1, item: "Slow-smoked brisket plate", price: "£14.50" },
  { qty: 3, item: "Colombian empanadas", price: "£7.20" },
  { qty: 1, item: "Chimichurri fries", price: "£4.50" },
];

const STEPS = ["Confirmed", "Cooking", "On its way"];
const CURRENT_STEP = 1; // "Cooking"
const STAMPS = 10;
const STAMPED = 7;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AppPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Side-on as it enters, square to you in the middle, turning away as it goes.
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-34, -6, 16]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 2, -8]);
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  // The view is "in" once the phone is a third of the way up the screen.
  const viewport = { once: true, amount: 0.45 } as const;

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center [perspective:1600px]"
    >
      <div
        aria-hidden
        className="halo-breathe pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,43,0.34),rgba(160,43,255,0.2)_55%,transparent_76%)] blur-[50px]"
      />

      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, y }}
        className="relative [transform-style:preserve-3d]"
      >
        {/* Handset */}
        <div className="relative w-[300px] rounded-[48px] border border-white/15 bg-[#0b0806] p-[10px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_90px_-20px_rgba(255,106,43,0.55)] sm:w-[330px]">
          <div
            className="relative overflow-hidden rounded-[38px] bg-[#16100c] text-white"
            // Marked up as an illustration: it is a picture of an app, not a
            // working control surface.
            role="img"
            aria-label="A La Parrilla app screen: order A-1287 is cooking over open flame with 6 minutes left, arriving by 7:32 pm. Three items, paid direct with no app fees, £26.20. Fuego Rewards card stamped 7 of 10."
          >
            <div aria-hidden>
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pb-1 pt-3.5 text-[12px] font-semibold">
                <span>9:41</span>
                <span className="absolute left-1/2 top-2.5 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-3.5 rounded-[2px] bg-white/85" />
                  <span className="h-2.5 w-5 rounded-[3px] border border-white/60 p-px">
                    <span className="block h-full w-3/4 rounded-[1px] bg-white/85" />
                  </span>
                </span>
              </div>

              {/* Order header */}
              <div className="flex items-center gap-3 px-5 pt-4">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold text-[#16100c]"
                  style={{ background: EMBER }}
                >
                  A
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[14px] font-semibold">
                    A La Parrilla
                  </span>
                  <span className="block text-[11px] text-white/50">
                    Order #A-1287
                  </span>
                </span>
                <span
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ background: `${EMBER}26`, color: EMBER }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="absolute inset-0 animate-ping rounded-full"
                      style={{ background: EMBER }}
                    />
                    <span
                      className="relative h-1.5 w-1.5 rounded-full"
                      style={{ background: EMBER }}
                    />
                  </span>
                  Cooking
                </span>
              </div>

              {/* ETA */}
              <div className="px-5 pt-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Arriving by
                </p>
                <p className="mt-0.5 text-[44px] font-semibold leading-none tracking-[-0.04em]">
                  7:32{" "}
                  <span className="text-[22px] tracking-[-0.02em] text-white/60">
                    pm
                  </span>
                </p>
                <p className="mt-2 text-[12px]" style={{ color: EMBER }}>
                  Cooking over open flame &middot; 6 min left
                </p>
              </div>

              {/* Tracker: fills to the current step as the phone arrives. */}
              <div className="px-5 pt-5">
                <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewport}
                    transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
                    className="absolute inset-y-0 left-0 w-1/2 origin-left rounded-full"
                    style={{ background: EMBER }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-medium">
                  {STEPS.map((step, i) => (
                    <span
                      key={step}
                      style={{
                        color:
                          i === CURRENT_STEP
                            ? EMBER
                            : i < CURRENT_STEP
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order */}
              <div className="mx-3 mt-5 rounded-[22px] bg-white/[0.05] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold">Your order</span>
                  <span className="text-[11px] text-white/45">3 items</span>
                </div>
                <ul className="mt-3 space-y-2.5">
                  {ORDER.map((line) => (
                    <li
                      key={line.item}
                      className="flex items-baseline gap-2 text-[12px]"
                    >
                      <span className="w-5 text-white/40">×{line.qty}</span>
                      <span className="flex-1 text-white/85">{line.item}</span>
                      <span className="tabular-nums text-white/70">
                        {line.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3 text-[12px]">
                  <span className="text-white/55">
                    Paid direct &middot; no app fees
                  </span>
                  <span className="text-[14px] font-semibold tabular-nums">
                    £26.20
                  </span>
                </div>
              </div>

              {/* Loyalty card: the stamps land one after another. */}
              <div
                className="mx-3 mb-3 mt-3 rounded-[22px] p-4"
                style={{
                  background: `linear-gradient(135deg, ${EMBER}33, rgba(255,255,255,0.04))`,
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold">
                    Fuego Rewards
                  </span>
                  <span
                    className="text-[13px] font-semibold tabular-nums"
                    style={{ color: EMBER }}
                  >
                    {STAMPED} / {STAMPS}
                  </span>
                </div>
                <div className="mt-3 flex justify-between">
                  {Array.from({ length: STAMPS }, (_, i) => {
                    const filled = i < STAMPED;
                    return (
                      <motion.span
                        key={i}
                        initial={
                          reduce || !filled ? false : { scale: 0, opacity: 0 }
                        }
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={viewport}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 16,
                          delay: 0.6 + i * 0.09,
                        }}
                        className="h-[18px] w-[18px] rounded-full border"
                        style={{
                          background: filled ? EMBER : "transparent",
                          borderColor: filled
                            ? EMBER
                            : "rgba(255,255,255,0.22)",
                        }}
                      />
                    );
                  })}
                </div>
                <p className="mt-3 text-[11px] text-white/60">
                  3 plates to a free brisket, worth £14.50
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lifted off the glass, so it parallaxes as the phone turns. */}
        <span className="label-mono absolute -right-6 top-16 rounded-full border border-white/20 bg-abyss/80 px-3.5 py-2.5 text-[10px] text-white backdrop-blur-md [transform:translateZ(70px)] sm:-right-12">
          Demo app
        </span>
        <span className="label-mono absolute -left-5 bottom-28 rounded-full bg-neon-500 px-3.5 py-2.5 text-[10px] text-white shadow-[0_0_40px_-6px_rgba(160,43,255,0.95)] [transform:translateZ(90px)] sm:-left-14">
          iOS &middot; Android
        </span>
      </motion.div>
    </div>
  );
}
