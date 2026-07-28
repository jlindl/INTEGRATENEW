/**
 * Shared motion vocabulary. Every animated element on the page pulls its
 * easing and variants from here so the whole page moves as one system.
 */
import type { Variants } from "framer-motion";

/** Expo-style settle — fast start, long soft landing. The house easing. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gentler variant for large surfaces (panels, images). */
export const EASE_SOFT: [number, number, number, number] = [0.25, 0.46, 0.2, 1];

/** Standard reveal: rise + settle. Used via <Reveal> or directly. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/** For containers that stagger their children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Child item inside a staggered container. */
export const riseChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Viewport config used across the page — reveal once, slightly early. */
export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;
