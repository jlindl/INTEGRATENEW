/**
 * The Integrate brand mark — a layered double chevron: a solid ink arrow
 * nested inside a larger chevron whose upper limb carries a machined-metal
 * sheen. Recreated as inline SVG from the supplied logo so it stays crisp at
 * any size and inherits the ink token. Single source of truth: Nav, Footer,
 * ClosingCTA and the favicon all derive from this geometry.
 *
 * The gradient id is a fixed constant: every instance defines an identical
 * gradient, so duplicate ids resolve interchangeably (and this keeps the
 * component usable from server components — no useId hook).
 */
const SHEEN_ID = "integrate-mark-sheen";

/**
 * `tone` swaps the two solid limbs from warm ink (default, for the light site)
 * to warm ivory, so the mark reads on the dark /web-design theme. The metallic
 * sheen limb is unchanged — it's already light and sits well on either ground.
 *
 * `size` / `solid` exist for renderers with no CSS pipeline (the OG image):
 * explicit pixel dimensions and a literal colour instead of a CSS variable.
 */
export function LogoMark({
  className,
  tone = "ink",
  size,
  solid: solidOverride,
}: {
  className?: string;
  tone?: "ink" | "light";
  size?: number;
  solid?: string;
}) {
  const id = SHEEN_ID;
  const solid =
    solidOverride ?? (tone === "light" ? "var(--color-ivory)" : "var(--color-ink)");
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0" stopColor="#8f8d86" />
          <stop offset="0.5" stopColor="#f6f5f2" />
          <stop offset="1" stopColor="#767470" />
        </linearGradient>
      </defs>
      {/* Small solid arrow, notched tail */}
      <path d="M2 12 L14 12 L26 24 L14 36 L2 36 L11 24 Z" fill={solid} />
      {/* Large chevron — metallic upper limb, solid lower limb */}
      <path d="M22 2 L46 24 L34 24 L22 12 Z" fill={`url(#${id})`} />
      <path d="M46 24 L22 46 L22 36 L34 24 Z" fill={solid} />
    </svg>
  );
}
