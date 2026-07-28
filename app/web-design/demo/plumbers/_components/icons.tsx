/**
 * Northline demo: tiny inline SVG icon set, hand-drawn paths only.
 * All icons are decorative (aria-hidden) unless wrapped with a labelled role.
 */

type IconProps = { className?: string };

export function DropIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.4c3.7 4.6 6.5 8.2 6.5 11.7a6.5 6.5 0 1 1-13 0C5.5 10.6 8.3 7 12 2.4Z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.5 12.8l4.9 4.7L19.5 6.6" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2l2.94 6.14 6.76.86-4.97 4.66 1.29 6.68L12 17.27l-6.02 3.27 1.29-6.68L2.3 9.2l6.76-.86L12 2.2Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.8 3.2h2.9a1 1 0 0 1 .95.68l1.2 3.6a1 1 0 0 1-.35 1.1L9.6 10.05a13.2 13.2 0 0 0 4.35 4.35l1.47-1.9a1 1 0 0 1 1.1-.35l3.6 1.2a1 1 0 0 1 .68.95v2.9a2.6 2.6 0 0 1-2.85 2.6C9.9 19.94 4.06 14.1 3.2 6.05A2.6 2.6 0 0 1 5.8 3.2h1Z" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.2 2s5.6 4.7 5.6 10a5.9 5.9 0 0 1-11.8 0c0-2.1 1-4.1 2.3-5.8.3 1.3 1.1 2.3 2.2 2.8-.6-2.4 0-5 1.7-7Z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5a7 7 0 0 1 7 7c0 4.9-5.4 10.4-6.6 11.6a.57.57 0 0 1-.8 0C10.4 19.9 5 14.4 5 9.5a7 7 0 0 1 7-7Zm0 4.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.8 8-5.8" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.5 12h15m0 0-5.5-5.5M19.5 12 14 17.5" />
    </svg>
  );
}

/** Five amber stars with an accessible label. */
export function Stars({
  starClassName = "h-4 w-4",
  label = "Rated 4.9 out of 5",
}: {
  starClassName?: string;
  label?: string;
}) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-0.5 text-[#f0a11b]">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={starClassName} />
      ))}
    </span>
  );
}
