"use client";

/**
 * CustomCursor — a dot with a lagging outer ring (spring physics). It morphs
 * by reading `data-cursor` off whatever the pointer is over: "view" expands the
 * ring into a filled "View" disc (portfolio cards), "link" scales it up and
 * tints it (pills, buttons, nav). The presence of the `#wd-cursor` node hides
 * the native cursor via a `:has()` rule in globals.
 *
 * Only mounts on fine pointers (mouse) and when motion is allowed — touch and
 * reduced-motion users keep the native cursor. It never re-renders on movement
 * (position rides MotionValues), so it stays off the React commit path.
 */
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "default" | "view" | "link";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 45 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 45 });

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setVariant((el?.getAttribute("data-cursor") as Variant) ?? "default");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const view = variant === "view";
  const link = variant === "link";
  const ringSize = view ? 66 : link ? 48 : 30;

  return (
    <div id="wd-cursor" aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      {/* Lagging ring — becomes a filled "View" disc over cards. */}
      <motion.div
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[0.6rem] uppercase tracking-[0.16em] text-carbon"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: view ? "rgba(192,132,252,0.95)" : "rgba(192,132,252,0)",
          borderColor: view
            ? "rgba(192,132,252,0)"
            : link
              ? "rgba(192,132,252,0.75)"
              : "rgba(201,206,215,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.5 }}
      >
        <motion.span animate={{ opacity: view ? 1 : 0 }} transition={{ duration: 0.14 }}>
          View
        </motion.span>
      </motion.div>

      {/* The precise dot — hidden while the ring is a "View" disc. */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: view ? 0 : 1, scale: link ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </div>
  );
}
