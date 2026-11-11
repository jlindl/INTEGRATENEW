"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Mode = { kind: "idle" | "hover" | "label"; label: string };

const IDLE: Mode = { kind: "idle", label: "" };

const SIZE = { idle: 14, hover: 76, label: 108 } as const;

/**
 * A second cursor that trails the real one on a spring.
 *
 * At rest it is a small inverting dot. Over anything clickable it swells into a
 * lens that flips the colours beneath it, and over an element carrying
 * `data-cursor="…"` it becomes a solid neon disc showing that word.
 *
 * Rendered only for a fine, hovering pointer (the wrapper is `display: none`
 * otherwise) and the native cursor is left alone, so nothing depends on it.
 */
export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });

  const [mode, setMode] = useState<Mode>(IDLE);
  const [present, setPresent] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setPresent(true);
    };

    // pointerover rather than pointermove: it only fires when the element under
    // the pointer changes, which is the only time the mode can change.
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;

      let next: Mode = IDLE;
      if (labelled) {
        next = { kind: "label", label: labelled.dataset.cursor ?? "" };
      } else if (target?.closest?.("a, button, [role='button']")) {
        next = { kind: "hover", label: "" };
      }

      setMode((current) =>
        current.kind === next.kind && current.label === next.label
          ? current
          : next,
      );
    };

    const onLeave = () => setPresent(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  const size = SIZE[mode.kind];

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className={`pointer-events-none fixed left-0 top-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block ${
        mode.kind === "label" ? "" : "mix-blend-difference"
      }`}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        initial={false}
        animate={{
          width: size,
          height: size,
          opacity: present ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: mode.kind === "label" ? "#a02bff" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.6 }}
      >
        <AnimatePresence>
          {mode.kind === "label" && (
            <motion.span
              key={mode.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="label-mono absolute text-white"
            >
              {mode.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
