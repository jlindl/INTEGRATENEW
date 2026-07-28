/**
 * Footer — the closing beat. Brand lockup and sitemap columns on a warm
 * paper-2 band, a live "accepting clients" badge in the bottom bar, and a
 * giant clipped watermark wordmark bleeding off the bottom of the page.
 * Fully static — server component, no hooks, no motion.
 */

import { LogoMark } from "@/components/ui/LogoMark";
import { LEGAL_DOCS } from "@/lib/legalData";

type LinkItem = { label: string; href: string };

const PLATFORM_LINKS: LinkItem[] = [
  /* Root-relative hashes so they resolve from any page (e.g. /blog). */
  { label: "Our Systems", href: "/#case-studies" },
  { label: "Our Process", href: "/#process" },
  { label: "About Us", href: "/#services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
];

const CONNECT_LINKS: LinkItem[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "WhatsApp Us", href: "https://wa.me/447765977085" },
  { label: "Email Sales", href: "mailto:sales@integrate.co.uk" },
  { label: "Book Strategy", href: "/#book-call" },
];

/* Same animated left-origin accent underline as the nav links. External links
   (WhatsApp and other off-site URLs) open in a new tab. */
function FooterLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative inline-block text-[0.95rem] text-ink-2 transition-colors duration-300 hover:text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
      />
    </a>
  );
}

function LinkColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <nav aria-label={title} className="lg:col-span-3">
      <h3 className="eyebrow mb-5">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t bg-paper-2 pb-8 pt-20">
      <h2 className="sr-only">Site footer</h2>

      <div className="container-x">
        {/* Top area — brand + sitemap */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-6">
            {/* Chevron mark — same glyph as the nav. */}
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-[21px] w-[21px]" />
              <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
                Integrate
              </span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-2">
              Premium AI Automation Agency. We design, build, and maintain
              bespoke AI architectures tailored to your exact operational
              logic.
            </p>
          </div>

          <LinkColumn title="Platform" links={PLATFORM_LINKS} />
          <LinkColumn title="Connect" links={CONNECT_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="hairline-t mt-16 flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="font-mono text-[0.75rem] text-ink-3">
              © 2026 Integrate AI Solutions Limited. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL_DOCS.map((doc) => (
                <a
                  key={doc.slug}
                  href={`/legal/${doc.slug}`}
                  className="text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-ink"
                >
                  {doc.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="hairline flex w-fit items-center gap-2.5 rounded-full bg-card px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#22c55e] motion-safe:animate-pulse"
            />
            Accepting New Clients
          </p>
        </div>
      </div>

      {/* Editorial flourish — giant watermark wordmark, clipped at the page
          bottom. The translate pushes the glyphs down past the container's
          clip edge; the negative bottom margin lets the footer's pb-8 overlap
          it so the visual bottom of the type sits exactly on the page edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-8 flex select-none justify-center overflow-hidden"
      >
        <span className="font-display-tuned translate-y-[22%] whitespace-nowrap text-[clamp(5rem,18vw,16rem)] font-medium leading-none text-ink/[0.045]">
          Integrate
        </span>
      </div>
    </footer>
  );
}
