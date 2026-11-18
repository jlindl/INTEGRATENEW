/**
 * Small shared pieces for the homepage. Server components, no JavaScript.
 *
 * Type and colour rules (see app/home.css for the tokens' contrast figures):
 *  - Headlines: Instrument Sans 700. One accent word per H1/H2 only, marked
 *    with *asterisks* in lib/film/content.ts and set in Fraunces italic.
 *  - Body copy 17px, nothing below 11px anywhere, mockups included.
 *  - Silver is spent on the primary action only. Green means "booked" and
 *    nothing else.
 */
import type { ReactNode } from "react";

export function Em({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((p, i) =>
        i % 2 === 1 ? (
          <em key={i} className="home-em">
            {p}
          </em>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** Mono label above a heading. Only says something true about the section. */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] ${tone === "dark" ? "text-halo" : "text-ink-3"}`}>
      {children}
    </p>
  );
}

export const h2 = "mt-4 text-balance text-[min(clamp(2.1rem,7.4vw,3.9rem),11vw)] font-bold leading-[0.98] tracking-[-0.045em]";

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M4 12.5l5 5L20 6" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function External({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.7-1.34A9.5 9.5 0 1012 2.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Small line icons for the day ledger and the inbox. */
const ICONS = {
  call: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-2Z",
  chat: "M4 5h16v11H9l-5 4V5Z",
  voicemail: "M6.5 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm11 0a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7ZM6.5 15.5h11",
  form: "M6 3h9l3 3v15H6V3Zm3 7h6M9 14h6M9 18h4",
  invoice: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d={ICONS[name]} />
    </svg>
  );
}

/**
 * Status chip. "booked" is the only coloured state on the page.
 * Green #17633f on light (5.73:1 on its own tint over paper, 6.66:1 on plain paper), #4cc38a on dark (8.93:1 on carbon).
 */
export function Status({ state, tone = "light" }: { state: string; tone?: "light" | "dark" }) {
  const booked = /book/i.test(state);
  const look = booked
    ? tone === "dark"
      ? "bg-[#4cc38a]/12 text-[#4cc38a]"
      : "bg-[#17633f]/[0.08] text-[#17633f]"
    : tone === "dark"
      ? "bg-white/[0.07] text-mist"
      : "bg-ink/[0.06] text-ink-2";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${look}`}>
      {booked ? <Tick className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />}
      {state}
    </span>
  );
}

/**
 * The primary action. Silver on carbon, carbon on paper: the one prominent
 * button per view (buttons.md › Style). 52px tall, press state included.
 */
export function PrimaryButton({
  href,
  children,
  tone = "dark",
  id,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  id?: string;
  className?: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className={`home-btn group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full px-7 text-[1.0625rem] font-semibold ${
        tone === "dark" ? "home-btn--silver" : "bg-carbon text-ivory hover:bg-[#1c1c21]"
      } ${className}`}
    >
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </a>
  );
}

/** A text link that reads as an action ("How AI automation works"). 44px tall. */
export function TextLink({
  href,
  children,
  tone = "light",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-11 items-center gap-1.5 text-[1rem] font-semibold underline decoration-1 underline-offset-[6px] transition-colors ${
        tone === "dark" ? "text-ivory decoration-graphite-2 hover:decoration-halo" : "text-ink decoration-line-2 hover:decoration-ink"
      } ${className}`}
    >
      {children}
      {external ? (
        <>
          <External />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : (
        <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
      )}
    </a>
  );
}

/** A small label under a mock-up that says it is an example. */
export function ExampleNote({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${tone === "dark" ? "text-mist" : "text-ink-3"}`}>{children}</p>
  );
}
