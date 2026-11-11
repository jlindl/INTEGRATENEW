import FooterWordmark from "@/components/web-design-portal/footer-wordmark";
import Frame from "@/components/web-design-portal/frame";
import Magnetic from "@/components/web-design-portal/magnetic";
import Reveal from "@/components/web-design-portal/reveal";
import RevealText from "@/components/web-design-portal/reveal-text";
import SpinBadge from "@/components/web-design-portal/spin-badge";
import { COMPANY, CONTACT, LIVE_SITE } from "@/components/web-design-portal/site-data";
import { ArrowUpRight, LogoMark, SparkIcon } from "@/components/web-design-portal/icons";

type FooterLink = { label: string; href: string; external?: boolean };

const FOOTER_NAV: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Client work", href: "#work" },
      { label: "Builds by sector", href: "#sectors" },
      { label: "Pricing", href: "#pricing" },
      { label: "The studio", href: "#studio" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Electricians", href: `${LIVE_SITE}/web-design/electricians` },
      { label: "Recruiters", href: `${LIVE_SITE}/web-design/recruiters` },
      { label: "Accountants", href: `${LIVE_SITE}/web-design/accountants` },
      { label: "Plumbers", href: `${LIVE_SITE}/web-design/plumbers` },
      { label: "Law Firms", href: `${LIVE_SITE}/web-design/law-firms` },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { label: `WhatsApp ${CONTACT.whatsappDisplay}`, href: CONTACT.whatsappHref, external: true },
      { label: "Instagram", href: CONTACT.instagram, external: true },
      { label: "LinkedIn", href: CONTACT.linkedin, external: true },
      { label: "TikTok", href: CONTACT.tiktok, external: true },
    ],
  },
];

const PROMISES = [
  "Call back within one business day",
  "30 minutes",
  "No pitch, no pressure",
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.06] bg-abyss">
      <div aria-hidden className="dot-grid absolute inset-0 z-0" />
      <div
        aria-hidden
        className="wdp-grain pointer-events-none absolute -inset-[10%] z-1 opacity-[0.05] mix-blend-overlay"
      />
      <Frame ticks="top" />

      {/* ------------------------------------------------------------ CTA */}
      <section
        id="contact"
        className="relative z-20 mx-auto w-full max-w-[1420px] scroll-mt-10 px-6 pb-24 pt-28 sm:px-10 lg:pb-32 lg:pt-44"
      >
        <div
          aria-hidden
          className="halo-breathe pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[70%] max-w-[1100px] bg-[radial-gradient(50%_55%_at_50%_45%,rgba(160,43,255,0.42),transparent_72%)] blur-[40px]"
        />

        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="badge-glow relative inline-flex items-center gap-2 rounded-full border border-neon-400/40 bg-white/[0.04] px-5 py-2.5 text-[15px] text-white/90 backdrop-blur-sm">
              <SparkIcon className="h-4 w-4 text-neon-200" />
              Let&rsquo;s Build Yours
            </span>
          </Reveal>

          <RevealText
            as="h2"
            stagger={65}
            className="display display-hero mt-8 text-white"
            parts={[
              "Want This",
              "\n",
              "for Your",
              "\n",
              { text: "Business?", className: "text-shine inline-block" },
            ]}
          />

          <Reveal delay={150}>
            <p className="mt-8 max-w-[52ch] text-[clamp(1rem,1.25vw,1.3rem)] leading-[1.5] text-balance text-white/65">
              Tell us about your business and how you win customers. We&rsquo;ll
              design a site built to sell the way you actually sell.
            </p>
          </Reveal>

          <Reveal direction="zoom" delay={220} className="mt-12 lg:mt-14">
            <Magnetic strength={0.4}>
              <SpinBadge
                href={CONTACT.bookHref}
                label="Book a call"
              />
            </Magnetic>
          </Reveal>

          <Reveal delay={260}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {PROMISES.map((promise) => (
                <li
                  key={promise}
                  className="label-mono flex items-center gap-2.5 text-white/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-400" />
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The two direct lines, exactly as published on the contact page. */}
          <div className="mt-14 grid w-full max-w-[980px] gap-4 text-left sm:grid-cols-2 lg:mt-16 lg:gap-6">
            <Reveal direction="left" delay={120} className="h-full">
              <a
                href={CONTACT.whatsappHref}
                {...external}
                className="spotlight lift group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] p-6 hover:border-neon-400/50 hover:bg-white/[0.045] lg:p-8"
              >
                <span className="label-mono text-neon-300">WhatsApp us</span>
                <span className="mt-4 flex items-center justify-between gap-4 text-[clamp(1.6rem,3vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {CONTACT.whatsappDisplay}
                  <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 text-neon-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span className="mt-3 text-[15px] text-white/55">
                  Fastest way to get a reply.
                </span>
              </a>
            </Reveal>

            <Reveal direction="right" delay={180} className="h-full">
              <a
                href={`mailto:${CONTACT.email}`}
                className="spotlight lift group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] p-6 hover:border-neon-400/50 hover:bg-white/[0.045] lg:p-8"
              >
                <span className="label-mono text-neon-300">Email us</span>
                <span className="mt-4 flex items-center justify-between gap-4 text-[clamp(1.25rem,2.35vw,2.1rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  <span className="min-w-0 break-words">{CONTACT.email}</span>
                  <ArrowUpRight className="h-[0.7em] w-[0.7em] shrink-0 text-neon-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span className="mt-3 text-[15px] text-white/55">
                  For sales and project enquiries.
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Columns */}
      <div className="relative z-20 mx-auto w-full max-w-[1420px] px-6 sm:px-10">
        <div className="grid gap-12 border-t border-white/[0.08] py-14 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-10 lg:py-16">
          <div>
            <a
              href="#top"
              className="group flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em] text-white"
            >
              <LogoMark className="h-6 w-6 drop-shadow-[0_0_10px_rgba(160,43,255,0.85)] transition-transform duration-300 group-hover:-translate-y-0.5" />
              Integrate Web Design
            </a>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.6] text-white/50">
              Websites and mobile apps, built around how your customers actually
              buy, and quick enough that they stick around.
            </p>
            <a
              href={CONTACT.mainSite}
              className="underline-grow mt-6 inline-flex items-center gap-1.5 text-[15px] text-white/70 transition-colors hover:text-white"
            >
              Integrate AI &mdash; main site
              <ArrowUpRight className="h-3.5 w-3.5 text-neon-300" />
            </a>
          </div>

          {FOOTER_NAV.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="label-mono text-white/40">{column.heading}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? external : {})}
                      className="underline-grow inline-block text-[15px] text-white/65 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/[0.08] py-8 text-[13px] leading-[1.6] text-white/40 lg:text-[14px]">
          <p className="max-w-[90ch]">
            {COMPANY.legalName}. {COMPANY.registration}
          </p>
          <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights
              reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {COMPANY.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="underline-grow transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  );
}
