/**
 * Brightwell brand mark — a rounded teal tile holding a simple tooth glyph with
 * a soft "spark" of shine. Purely decorative; the wordmark carries the name.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="#12b3a6" />
      {/* tooth */}
      <path
        d="M12 10.5c-2.2 0-3.5 1.7-3.5 4 0 2 .7 3.4 1.3 6 .5 2.2.7 4 1.9 4 1.1 0 1.2-1.6 1.6-3 .3-1.1.7-1.8 1.7-1.8s1.4.7 1.7 1.8c.4 1.4.5 3 1.6 3 1.2 0 1.4-1.8 1.9-4 .6-2.6 1.3-4 1.3-6 0-2.3-1.3-4-3.5-4-1.6 0-2.3.9-3 .9s-1.4-.9-3-.9Z"
        fill="#f4faf9"
      />
      {/* shine */}
      <path
        d="M20 13.5c.9 0 1.4.8 1.4 1.9"
        fill="none"
        stroke="#9fe6de"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
