"use client";

/**
 * MagneticLink — a Next <Link> that leans toward the cursor (via useMagnetic)
 * and tags itself for the custom cursor. Styling is passed through untouched, so
 * it drops in over any existing CTA without changing its look.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

const MotionLink = motion.create(Link);

export function MagneticLink({
  href,
  children,
  className,
  cursor = "link",
  ariaLabel,
  strength,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** which custom-cursor variant to trigger on hover */
  cursor?: "link" | "view";
  ariaLabel?: string;
  strength?: number;
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(strength);

  return (
    <MotionLink
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      data-cursor={cursor}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}
