import type { LinkKind } from "@/lib/tap/types";
import { KIND_INFO } from "@/lib/tap/links";

/**
 * Icon chips for business links. Socials carry the platform's own colour with
 * the mark knocked out white (same treatment as /links); utility links use a
 * neutral ink chip with a line icon.
 */

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GOOGLE = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.8z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l4.01-3.1z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
  </svg>
);

const INSTAGRAM = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...line} stroke="#fff" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="#fff" stroke="none" />
  </svg>
);

const TIKTOK_NOTE =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

const TIKTOK = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d={TIKTOK_NOTE} fill="#25F4EE" transform="translate(-1.1 0.6)" />
    <path d={TIKTOK_NOTE} fill="#FE2C55" transform="translate(1.1 -0.6)" />
    <path d={TIKTOK_NOTE} fill="#fff" />
  </svg>
);

const FACEBOOK = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="#fff" d="M13.5 21.9v-7.5h2.5l.4-3h-2.9V9.5c0-.86.24-1.45 1.48-1.45h1.58V5.37a21 21 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.95v2.2H7.84v3h2.58v7.5h3.08z" />
  </svg>
);

const WHATSAPP = (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...line} stroke="#fff" strokeWidth={1.8}>
    <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1L4 20z" />
    <path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.4.8-.6.4-1.5.6-2.4.2a9.4 9.4 0 0 1-4.6-4.6c-.4-.9-.2-1.8.2-2.4z" fill="#fff" stroke="none" />
  </svg>
);

const GLOBE = (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...line}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5z" />
  </svg>
);

const CALENDAR = (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...line}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
);

const MENU = (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...line}>
    <path d="M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z" />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
  </svg>
);

const STAR = (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...line} stroke="#000">
    <path d="M12 3.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z" />
  </svg>
);

const LINK = (
  <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...line}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

const ICONS: Record<LinkKind, React.ReactNode> = {
  google: GOOGLE,
  instagram: INSTAGRAM,
  tiktok: TIKTOK,
  facebook: FACEBOOK,
  whatsapp: WHATSAPP,
  website: GLOBE,
  booking: CALENDAR,
  menu: MENU,
  tripadvisor: STAR,
  custom: LINK,
};

const IG_GRADIENT = "linear-gradient(45deg,#FEDA75 0%,#FA7E1E 25%,#D62976 50%,#962FBF 75%,#4F5BD5 100%)";

export function LinkIcon({ kind, size = 44 }: { kind: LinkKind; size?: number }) {
  const neutral = ["website", "booking", "menu", "custom"].includes(kind);
  const background = kind === "instagram" ? IG_GRADIENT : KIND_INFO[kind].chip;
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ${
        kind === "google" ? "border border-line" : ""
      } ${neutral ? "text-paper" : ""}`}
      style={{ width: size, height: size, background }}
      aria-hidden="true"
    >
      {ICONS[kind]}
    </span>
  );
}
