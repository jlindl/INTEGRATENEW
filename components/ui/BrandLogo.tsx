/**
 * The Integrate logo, from Jack's master file (Logo.png in the repo root).
 *
 * The master has a grey studio backdrop, so public/brand/ holds transparent
 * cut-outs of it: the letters and the solid limbs are the master's own black
 * pixels (re-tinted ivory for dark grounds), and the upper limb is the
 * master's own silver sheen. Nothing is redrawn.
 *
 *  - variant "lockup": mark + wordmark
 *  - variant "mark":   the double chevron alone
 *  - tone "ink" for paper, "light" for carbon
 */
import Image from "next/image";

const FILES = {
  lockup: { ink: "/brand/logo-lockup-ink.png", light: "/brand/logo-lockup-light.png", w: 683, h: 160 },
  mark: { ink: "/brand/logo-mark-ink.png", light: "/brand/logo-mark-light.png", w: 267, h: 256 },
} as const;

export function BrandLogo({
  variant = "lockup",
  tone = "ink",
  height,
  className = "",
  priority = false,
  alt = "Integrate",
}: {
  variant?: "lockup" | "mark";
  tone?: "ink" | "light";
  /** Rendered height in px; width follows the file's proportions. */
  height: number;
  className?: string;
  priority?: boolean;
  /** Pass "" when the logo sits next to the word "Integrate" or is decorative. */
  alt?: string;
}) {
  const f = FILES[variant];
  return (
    <Image
      src={f[tone]}
      width={Math.round((f.w / f.h) * height)}
      height={height}
      alt={alt}
      priority={priority}
      unoptimized
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
