/**
 * Meridian & Co brand mark — a ledger-green monogram badge: an "M" over a brass
 * underline (the accountant's flourish of ruling off a total). Purely
 * decorative; the wordmark beside it carries the name.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="#1f5c46" />
      {/* M monogram */}
      <path
        d="M10.5 24 V12.5 L18 18.5 L25.5 12.5 V24"
        fill="none"
        stroke="#f4f2ec"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* brass ledger rule */}
      <path d="M13.5 27.3 H22.5" stroke="#b08d57" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
