import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

/**
 * /contact — an editorial header, direct contact methods (email + WhatsApp),
 * and the enquiry form. Light main-site theme; nav + footer come from the
 * segment layout.
 */

const SALES_EMAIL = "sales@integrate.co.uk";
/* 07765 977085 in international WhatsApp format: +44, leading 0 dropped. */
const WHATSAPP_HREF =
  "https://wa.me/447765977085?text=" +
  encodeURIComponent("Hi Integrate, I'd like to talk about a project.");
const WHATSAPP_DISPLAY = "07765 977085";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path
        d="M12 2.5a9.5 9.5 0 00-8.13 14.4L2.5 21.5l4.7-1.34A9.5 9.5 0 1012 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MethodCard({
  href,
  external,
  icon,
  label,
  value,
  note,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-6 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-float"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-deep">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="eyebrow block">{label}</span>
        <span className="mt-1.5 block truncate text-lg font-medium text-ink transition-colors duration-300 group-hover:text-accent-deep">
          {value}
        </span>
        <span className="mt-1 block text-[0.9rem] text-ink-3">{note}</span>
      </span>
      <span
        aria-hidden="true"
        className="ml-auto self-center text-ink-3 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:text-accent"
      >
        →
      </span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Contact
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display-tuned mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] font-medium leading-[1.05] text-ink">
              Let&apos;s build something{" "}
              <span className="italic text-silver [font-variation-settings:'opsz'_90,'SOFT'_40,'WONK'_0]">
                worth talking about.
              </span>
            </h1>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-7 max-w-[54ch] text-lg leading-relaxed text-ink-2">
            Tell us what you&apos;re working on and we&apos;ll come back with a
            clear, no-pressure view of how we&apos;d approach it. Prefer to talk
            now? WhatsApp is the fastest way to reach us.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Contact methods */}
          <Reveal className="flex flex-col gap-4">
            <MethodCard
              href={`mailto:${SALES_EMAIL}`}
              icon={<MailIcon />}
              label="Email us"
              value={SALES_EMAIL}
              note="For sales and project enquiries."
            />
            <MethodCard
              href={WHATSAPP_HREF}
              external
              icon={<WhatsAppIcon />}
              label="WhatsApp us"
              value={WHATSAPP_DISPLAY}
              note="Fastest way to get a reply."
            />

            {/* Availability marker */}
            <div className="mt-2 flex items-center gap-2.5 px-1 font-mono text-[0.75rem] text-ink-3">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              Available for new projects
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
