type IconProps = React.SVGProps<SVGSVGElement>;

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden {...props}>
      <path
        d="M2 19.2 9.4 9.6a2 2 0 0 1 3.1-.06L16 13.8l4.3-5.2a2 2 0 0 1 3.2.1L26 12.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23.4" cy="19.4" r="2.6" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M9.1 1.2 10 4.3a2 2 0 0 0 1.35 1.36l3.1.9-3.1.9A2 2 0 0 0 10 8.82l-.9 3.1-.9-3.1A2 2 0 0 0 6.85 7.46l-3.1-.9 3.1-.9A2 2 0 0 0 8.2 4.3l.9-3.1Z"
        fill="currentColor"
      />
      <path
        d="M3.9 9.9l.42 1.45a1 1 0 0 0 .68.68l1.45.42-1.45.42a1 1 0 0 0-.68.68L3.9 15l-.42-1.45a1 1 0 0 0-.68-.68L1.35 12.45l1.45-.42a1 1 0 0 0 .68-.68L3.9 9.9Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle
        cx="12"
        cy="12"
        r="9.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="9.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.4 9h17.2M3.4 15h17.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M3 8h9.5M9 4.2 12.8 8 9 11.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M4.2 11.8 11.8 4.2M5.6 4.2h6.2v6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M3 8.4 6.4 11.6 13 4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M8 2.5v11M2.5 8h11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M13.4 2 4.8 13.1a.7.7 0 0 0 .55 1.13H10l-1.4 7.77 8.6-11.1a.7.7 0 0 0-.55-1.13H12L13.4 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 2.4c3.1 2 4.9 5.4 4.9 9.2v3.1l-2.2 2.2H9.3l-2.2-2.2v-3.1c0-3.8 1.8-7.2 4.9-9.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9.6 18.2 8.2 21.6l3.8-1.7 3.8 1.7-1.4-3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 2.8 21.5 8 12 13.2 2.5 8 12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M3.4 12.4 12 17.1l8.6-4.7M3.4 16.6 12 21.2l8.6-4.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="6.4"
        y="2.2"
        width="11.2"
        height="19.6"
        rx="2.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M10.6 5.1h2.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M3 6h14M3 13h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
