/**
 * Shared server-side pieces for the homepage film: art-directed images,
 * the notification chip, small icons.
 */
import { getImageProps } from "next/image";
import ReactDOM from "react-dom";
import type { CSSProperties, ReactNode } from "react";

type Src = { src: string; w: number; h: number };

/**
 * One <picture> with a wide crop from 768px up and a tall crop below, so a
 * phone never downloads the desktop frame. Decorative by default (alt "").
 */
export function ArtImage({
  wide,
  tall,
  priority = false,
  className,
  alt = "",
}: {
  wide: Src;
  tall: Src;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const common = { alt, sizes: "100vw", quality: 72 };
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: wide.src, width: wide.w, height: wide.h });
  const {
    props: { srcSet: tallSet, ...rest },
  } = getImageProps({ ...common, src: tall.src, width: tall.w, height: tall.h });

  if (priority) {
    ReactDOM.preload(wide.src, {
      as: "image",
      imageSrcSet: wideSet,
      imageSizes: "100vw",
      media: "(min-width: 768px)",
      fetchPriority: "high",
    });
    ReactDOM.preload(tall.src, {
      as: "image",
      imageSrcSet: tallSet,
      imageSizes: "100vw",
      media: "(max-width: 767.98px)",
      fetchPriority: "high",
    });
  }

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
      <source srcSet={tallSet} sizes="100vw" />
      <img
        {...rest}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={className}
      />
    </picture>
  );
}

/* Small line icons for the notification cards (1.4 stroke, currentColor). */
const CHIP_ICONS: Record<string, ReactNode> = {
  call: <path d="M6 3.5h2.2l1.3 3.4-1.7 1a7.5 7.5 0 0 0 3.3 3.3l1-1.7 3.4 1.3V13a1 1 0 0 1-1 1A11 11 0 0 1 5 4.5a1 1 0 0 1 1-1Z" />,
  chat: <path d="M4 4.5h10a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 14 12.5H9l-3.5 2.5v-2.5H4A1.5 1.5 0 0 1 2.5 11V6A1.5 1.5 0 0 1 4 4.5Z" />,
  voicemail: (
    <>
      <circle cx="5.5" cy="9" r="2.5" />
      <circle cx="12.5" cy="9" r="2.5" />
      <path d="M5.5 11.5h7" />
    </>
  ),
  form: (
    <>
      <rect x="3.5" y="2.5" width="11" height="13" rx="1.5" />
      <path d="M6.5 6h5M6.5 9h5M6.5 12h3" />
    </>
  ),
  invoice: (
    <>
      <path d="M4.5 2.5h9v13l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1-1.5 1Z" />
      <path d="M7 6.5h4M7 9.5h4" />
    </>
  ),
};

/** A phone notification, drawn in live HTML so it stays sharp and editable. */
export function Chip({
  kind,
  text,
  icon,
  style,
  className = "",
}: {
  kind: string;
  text: string;
  icon?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const glyph = icon ? CHIP_ICONS[icon] : null;
  return (
    <div className={`film-chip ${className}`} style={style}>
      {glyph ? (
        <span className="film-chip-icon" aria-hidden="true">
          <svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {glyph}
          </svg>
        </span>
      ) : (
        <span className="film-chip-dot" />
      )}
      <span className="min-w-0">
        <span className="film-chip-kind">{kind}</span>
        <span className="film-chip-text">{text}</span>
      </span>
    </div>
  );
}

/**
 * Renders a headline string, setting each *starred* run in Fraunces italic.
 * "Jobs *booked.*" -> Jobs <em>booked.</em>
 */
export function Em({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <em key={i} className="film-em">
            {p}
          </em>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** Section label in the my-life / spec-sheet style: "02 ── integrate/noise". */
export function Slate({ n, label, className = "" }: { n: string; label: string; className?: string }) {
  return (
    <p className={`film-slug ${className}`}>
      <span className="film-slug-n">{n}</span>
      <span className="film-slug-rule" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return <span className={`film-tick ${className}`} aria-hidden="true" />;
}

/** A phone frame drawn in HTML: bezel, status bar, an app header and a body. */
export function Phone({
  title,
  status,
  children,
  className = "",
  time = "09:41",
}: {
  title: string;
  status: string;
  children: ReactNode;
  className?: string;
  time?: string;
}) {
  return (
    <div className={`film-phone ${className}`}>
      <div className="film-phone-screen">
        <div className="film-phone-bar" aria-hidden="true">
          <span>{time}</span>
          <span className="film-phone-island" />
          <span className="film-phone-sig">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="film-phone-head">
          <span className="film-phone-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 18 9 6l3 7 3-4 5 9" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="film-phone-title">{title}</span>
            <span className="film-phone-status">{status}</span>
          </span>
        </div>
        <div className="film-phone-body">{children}</div>
        <div className="film-phone-input" aria-hidden="true">
          <span>Message</span>
          <i />
        </div>
      </div>
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.7-1.34A9.5 9.5 0 1012 2.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
