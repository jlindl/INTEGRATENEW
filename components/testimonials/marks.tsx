/**
 * Logo marks for the testimonials clients — one 32×32 glyph each, sharing a
 * single stroke language so six different shapes still feel like one family.
 * Rendered by both the BrandWall lockups and the review-card avatars, so a
 * client's mark is consistent everywhere on the page. currentColor lets the
 * hover tint cascade from whatever wraps it.
 */
import type { ClientMark } from "@/lib/testimonialsData";

const PATHS: Record<ClientMark, React.ReactNode> = {
  // Insurance — a shield with a check.
  shield: (
    <>
      <path d="M16 4 L26 8 V15 C26 21.5 21.5 25.5 16 28 C10.5 25.5 6 21.5 6 15 V8 Z" />
      <path d="M11.5 15.5 L15 19 L20.5 12.5" />
    </>
  ),
  // Polished / spotless — a four-point sparkle.
  sparkle: <path d="M16 4 L18.2 13.8 L28 16 L18.2 18.2 L16 28 L13.8 18.2 L4 16 L13.8 13.8 Z" />,
  // Timber — a stylised pine.
  tree: (
    <>
      <path d="M16 4 L22.5 13 H9.5 Z" />
      <path d="M16 10 L25 22 H7 Z" />
      <path d="M16 22 V28" />
    </>
  ),
  // Footwear brand named CloudKicks — a cloud.
  cloud: (
    <path d="M10.5 22 A5 5 0 0 1 10 12.2 A6.5 6.5 0 0 1 22.2 12.8 A4.6 4.6 0 0 1 21.5 22 Z" />
  ),
  // Value retail — a shopping cart.
  cart: (
    <>
      <path d="M5 6 H8.5 L11 19 H23 L25.5 10 H10" />
      <circle cx="12.5" cy="24" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="22" cy="24" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),
  // AI analytics — a signal / activity line.
  pulse: <path d="M4 16 H10.5 L13.5 8 L18 24 L20.5 16 H28" />,
  // Golden Days — a sun.
  sun: (
    <>
      <circle cx="16" cy="16" r="5.5" />
      <path d="M16 3.5 V6.5 M16 25.5 V28.5 M3.5 16 H6.5 M25.5 16 H28.5 M7.2 7.2 L9.3 9.3 M22.7 22.7 L24.8 24.8 M24.8 7.2 L22.7 9.3 M9.3 22.7 L7.2 24.8" />
    </>
  ),
};

export function Mark({
  mark,
  size = 30,
  className = "",
}: {
  mark: ClientMark;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[mark]}
    </svg>
  );
}
