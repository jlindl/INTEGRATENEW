/**
 * WebDesignFooter — slim dark footer for the hub. Brand lockup (light tone),
 * a column of industries and a column of links back into the main Integrate
 * site, plus a giant watermark wordmark bleeding off the page bottom. Static.
 */
import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { NICHES } from "@/lib/webDesignData";

function FooterLink({ href, children, external }: { href: string; children: string; external?: boolean }) {
  const cls =
    "group relative inline-block text-[0.95rem] text-mist transition-colors duration-300 hover:text-ivory";
  const underline = (
    <span
      aria-hidden="true"
      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-iris transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
    />
  );
  return external ? (
    <a href={href} className={cls}>
      {children}
      {underline}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {underline}
    </Link>
  );
}

export function WebDesignFooter() {
  /* Feature a handful of industries; the rest live in the grid. */
  const featured = NICHES.slice(0, 5);

  return (
    <footer className="relative overflow-hidden border-t border-graphite bg-carbon-2 pb-8 pt-20">
      <h2 className="sr-only">Site footer</h2>

      <div className="container-x">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            {/* Same lockup as the header wordmark, one size smaller. */}
            <Link
              href="/web-design"
              aria-label="Integrate Web Design, home"
              className="flex items-center gap-2.5"
            >
              <LogoMark tone="light" className="h-7 w-7" />
              <span className="text-[1.15rem] font-semibold tracking-tight text-ivory">Integrate Web Design</span>
            </Link>
            <p className="mt-5 max-w-[40ch] text-[0.95rem] leading-relaxed text-mist">
              Websites and mobile apps, built around how your customers actually
              buy, and quick enough that they stick around.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-halo-dim transition-colors hover:text-ivory"
            >
              <span aria-hidden="true">←</span> Back to Integrate
            </Link>
          </div>

          <nav aria-label="Industries" className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-halo-dim">Industries</h3>
            <ul className="flex flex-col gap-3">
              {featured.map((n) => (
                <li key={n.slug}>
                  <FooterLink href={`/web-design/${n.slug}`}>{n.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Integrate" className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-halo-dim">Integrate</h3>
            <ul className="flex flex-col gap-3">
              <li><FooterLink href="/">Main site</FooterLink></li>
              <li><FooterLink href="/#services">What we build</FooterLink></li>
              <li><FooterLink href="/#book-call">Book a call</FooterLink></li>
              <li><FooterLink href="#contact">Start a project</FooterLink></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-graphite py-6">
          <p className="font-mono text-[0.75rem] text-mist-2">
            © 2026 Integrate. All rights reserved.
          </p>
          <p className="flex items-center gap-2.5 rounded-full border border-graphite bg-carbon px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#22c55e] motion-safe:animate-pulse" />
            Taking new projects
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none -mb-8 flex select-none justify-center overflow-hidden">
        <span className="font-display-tuned translate-y-[22%] whitespace-nowrap text-[clamp(4rem,15vw,13rem)] font-medium leading-none text-ivory/[0.04]">
          Web Design
        </span>
      </div>
    </footer>
  );
}
