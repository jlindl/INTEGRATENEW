import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_DOCS } from "@/lib/legalData";

/**
 * /links — the link-in-bio page. A single centred column: who we are, the
 * actions worth taking, then socials. Built mobile-first because effectively
 * all of its traffic arrives from a phone via a social profile.
 *
 * Social icons are drawn monochrome rather than in brand colours so the page
 * stays calm and reads as Integrate, not as a strip of other companies' logos.
 */

const SALES_EMAIL = "sales@integrate.co.uk";
/* 07765 977085 in international WhatsApp format: +44, leading 0 dropped. */
const WHATSAPP_HREF =
  "https://wa.me/447765977085?text=" +
  encodeURIComponent("Hi Integrate, I'd like to talk about a project.");

/* ---------------------------------------------------------------- icons -- */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const CalendarIcon = (
  <Icon>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </Icon>
);

const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
    <path
      d="M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.7-1.34A9.5 9.5 0 1012 2.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LayoutIcon = (
  <Icon>
    <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
    <path d="M3.5 9.5h17M9 9.5V20" />
  </Icon>
);

const QuoteIcon = (
  <Icon>
    <path d="M9.5 6.5C7 7.5 5.5 9.7 5.5 12.4c0 2 1.2 3.4 2.9 3.4 1.5 0 2.7-1.1 2.7-2.6 0-1.4-1-2.5-2.4-2.5-.3 0-.6 0-.8.1.3-1.3 1.2-2.4 2.5-3.1z" />
    <path d="M18 6.5c-2.5 1-4 3.2-4 5.9 0 2 1.2 3.4 2.9 3.4 1.5 0 2.7-1.1 2.7-2.6 0-1.4-1-2.5-2.4-2.5-.3 0-.6 0-.8.1.3-1.3 1.2-2.4 2.5-3.1z" />
  </Icon>
);

const MailIcon = (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </Icon>
);

const InstagramIcon = (
  <Icon>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
  </Icon>
);

const TikTokIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16.5 3h-2.7v12.1a2.3 2.3 0 1 1-2.3-2.3c.2 0 .4 0 .6.1v-2.7a5 5 0 1 0 4.4 5V8.9a6 6 0 0 0 3.5 1.1V7.3a3.4 3.4 0 0 1-3.5-3.3V3Z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11ZM9.5 9.5h3.8v1.5a4.2 4.2 0 0 1 3.7-2c3 0 4 1.9 4 4.8v6.7h-4v-6c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9v6.1h-4v-11Z" />
  </svg>
);

const GoogleIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12.24 10.4v3.36h5.56c-.24 1.44-1.68 4.22-5.56 4.22a6.14 6.14 0 0 1 0-12.28c1.9 0 3.18.81 3.91 1.51l2.66-2.56A9.36 9.36 0 0 0 12.24 2a9.8 9.8 0 1 0 0 19.6c5.5 0 9.15-3.87 9.15-9.32 0-.63-.07-1.11-.15-1.58h-9Z" />
  </svg>
);

/* ------------------------------------------------------------- link data -- */

type LinkRow = {
  href: string;
  icon: ReactNode;
  label: string;
  note: string;
  external?: boolean;
  primary?: boolean;
};

const ROWS: LinkRow[] = [
  {
    href: "/#book-call",
    icon: CalendarIcon,
    label: "Book a strategy call",
    note: "30 minutes, no pressure. We'll call you back.",
    primary: true,
  },
  {
    href: WHATSAPP_HREF,
    icon: WhatsAppIcon,
    label: "WhatsApp us",
    note: "Fastest way to get a reply.",
    external: true,
  },
  {
    href: "/web-design",
    icon: LayoutIcon,
    label: "Integrate Web Design",
    note: "Bespoke sites, tuned to how your industry buys.",
  },
  {
    href: "/testimonials",
    icon: QuoteIcon,
    label: "Client results",
    note: "What we've built, and what it changed.",
  },
  {
    href: `mailto:${SALES_EMAIL}`,
    icon: MailIcon,
    label: "Email sales",
    note: SALES_EMAIL,
  },
];

type Social = { label: string; href: string; icon: ReactNode };

/* Paste the profile URLs here and each icon appears automatically. Entries
   with an empty href are skipped, so the page never ships a dead link. */
const SOCIALS: Social[] = [
  { label: "Instagram", href: "", icon: InstagramIcon },
  { label: "TikTok", href: "", icon: TikTokIcon },
  { label: "LinkedIn", href: "", icon: LinkedInIcon },
  { label: "Google Business Profile", href: "", icon: GoogleIcon },
];

/* ------------------------------------------------------------ components -- */

function LinkCard({ href, icon, label, note, external, primary }: LinkRow) {
  const base =
    "group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 sm:p-5";
  const tone = primary
    ? "border-ink bg-ink text-paper shadow-float hover:border-accent hover:bg-accent"
    : "border-line bg-card text-ink shadow-lift hover:shadow-float";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${tone}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          primary ? "bg-paper/15 text-paper" : "bg-accent-tint text-accent-deep"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[1.02rem] font-medium leading-snug">{label}</span>
        <span
          className={`mt-0.5 block text-[0.875rem] leading-snug ${
            primary ? "text-paper/70" : "text-ink-3"
          }`}
        >
          {note}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 ${
          primary ? "text-paper/80" : "text-ink-3"
        }`}
      >
        →
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function LinksPage() {
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-14 sm:pt-20">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[30rem]">
        {/* Identity */}
        <Reveal className="flex flex-col items-center text-center">
          <a
            href="/"
            aria-label="Integrate — home"
            className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          >
            <LogoMark className="h-9 w-9" />
            <span className="font-display-tuned text-2xl font-medium text-ink">
              Integrate
            </span>
          </a>

          <h1 className="font-display-tuned mt-7 text-[clamp(1.75rem,7vw,2.35rem)] font-medium leading-[1.12] text-ink">
            The strategic{" "}
            <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
              AI partner
            </span>{" "}
            for high-growth B2B.
          </h1>

          <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-relaxed text-ink-2">
            We design, deploy, and manage bespoke AI systems — and the websites
            that feed them.
          </p>

          <span className="mt-6 flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            Accepting New Clients
          </span>
        </Reveal>

        {/* Actions */}
        <div className="mt-11 flex flex-col gap-3">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.05 + i * 0.05} y={18}>
              <LinkCard {...row} />
            </Reveal>
          ))}
        </div>

        {/* Socials */}
        {socials.length > 0 && (
          <Reveal delay={0.4} className="mt-11">
            <p className="eyebrow text-center">Follow us</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-card text-ink-2 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:text-accent-deep hover:shadow-float"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>
        )}

        {/* Footer */}
        <Reveal delay={0.48} className="mt-14 border-t border-line pt-7 text-center">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5">
            {LEGAL_DOCS.map((doc) => (
              <a
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className="inline-block py-2.5 text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-ink sm:py-1"
              >
                {doc.label}
              </a>
            ))}
          </nav>
          <p className="mt-3 font-mono text-[0.7rem] text-ink-3">
            © 2026 Integrate AI Solutions Limited
          </p>
        </Reveal>
      </div>
    </section>
  );
}
