/**
 * Halstead Law brand mark — an oxblood shield enclosing an "H" formed of two
 * columns and a lintel (a nod to a courthouse portico). Purely decorative; the
 * wordmark beside it carries the name.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <path
        d="M18 2.5 3.5 7v10.5c0 8 6.1 13.4 14.5 16.5 8.4-3.1 14.5-8.5 14.5-16.5V7L18 2.5Z"
        fill="#7c2d2d"
      />
      {/* portico "H" */}
      <path
        d="M12.5 12.5v11 M23.5 12.5v11 M12.5 18h11"
        fill="none"
        stroke="#f6f4ef"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* brass lintel */}
      <path d="M11 11h14" stroke="#c9a25f" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
