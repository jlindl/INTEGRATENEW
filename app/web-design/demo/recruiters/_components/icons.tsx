type IconProps = { className?: string };

/* Brand mark: three ascending bars, coral rising into ink. */
export function BrandMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="13.5" width="4.6" height="7.5" rx="1" fill="#ff5a3c" />
      <rect x="9.7" y="8.5" width="4.6" height="12.5" rx="1" fill="#ff5a3c" />
      <rect x="16.4" y="3" width="4.6" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5l7-7" />
      <path d="M5.5 4.5h6v6" />
    </svg>
  );
}

export function CheckMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8.5l3.5 3.5 7.5-8" />
    </svg>
  );
}
