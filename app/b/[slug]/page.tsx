import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkIcon } from "@/components/tap/LinkIcon";
import { SITE } from "@/components/tap/ui";
import { LogoMark } from "@/components/ui/LogoMark";
import { getStore, storeReady } from "@/lib/tap/store";
import type { BusinessLink } from "@/lib/tap/types";

/**
 * /b/SLUG: the hosted page a plate opens when the business chooses "page"
 * mode. Built like /links: mobile-first, one column, the review button first
 * and biggest because that's what the plate is for.
 */
export const dynamic = "force-dynamic";

async function load(slug: string) {
  if (!storeReady()) return null;
  return getStore().getBusinessBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = await load((await params).slug);
  return {
    title: b ? b.name : "Integrate Tap",
    description: b?.tagline || (b ? `Reviews and links for ${b.name}.` : undefined),
    robots: { index: false, follow: false },
  };
}

/** Link back to integrate-tech.co.uk, tagged per business page for attribution. */
function poweredByHref(slug: string) {
  const q = new URLSearchParams({
    utm_source: "integrate-tap",
    utm_medium: "business-page",
    utm_campaign: "powered-by",
    utm_content: slug,
  });
  return `${SITE}/?${q}`;
}

function LinkButton({ link, primary }: { link: BusinessLink; primary: boolean }) {
  return (
    <a
      href={link.url}
      rel="noopener noreferrer"
      className={`group flex min-h-[4.25rem] items-center gap-4 rounded-2xl border p-4 transition-[box-shadow,border-color,transform] duration-200 active:scale-[0.985] sm:p-5 ${
        primary
          ? "border-ink bg-ink text-paper shadow-float"
          : "border-line bg-card text-ink shadow-lift hover:border-line-2 hover:shadow-float"
      }`}
    >
      <LinkIcon kind={link.kind} />
      <span className="min-w-0 flex-1 text-[1.04rem] font-medium leading-snug">{link.label}</span>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="opacity-60">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = await load((await params).slug);
  if (!b) notFound();

  // Review links lead; everything else keeps the owner's order.
  const review = b.links.filter((l) => l.kind === "google" || l.kind === "tripadvisor");
  const rest = b.links.filter((l) => l.kind !== "google" && l.kind !== "tripadvisor");
  const ordered = [...review, ...rest];

  return (
    <main id="main">
      <section className="relative min-h-[100svh] px-5 pb-12 pt-14 sm:pt-20">
        <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] w-full max-w-[30rem] flex-col">
          <div className="flex flex-col items-center text-center">
            {b.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={b.logo} alt={`${b.name} logo`} width={96} height={96} className="h-24 w-24 rounded-3xl border border-line bg-card object-cover shadow-lift" />
            ) : (
              <span className="font-display-tuned flex h-24 w-24 items-center justify-center rounded-3xl border border-line bg-card text-4xl font-medium text-ink shadow-lift">
                {b.name.slice(0, 1).toUpperCase()}
              </span>
            )}
            <h1 className="font-display-tuned mt-6 text-[clamp(1.75rem,7vw,2.35rem)] font-medium leading-[1.12] text-ink">
              {b.name}
            </h1>
            {b.tagline && <p className="mt-3 max-w-[38ch] text-[0.98rem] leading-relaxed text-ink-2">{b.tagline}</p>}
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {ordered.length ? (
              ordered.map((l, i) => <LinkButton key={l.id} link={l} primary={i === 0 && review.length > 0} />)
            ) : (
              <p className="rounded-2xl border border-dashed border-line-2 p-5 text-center text-[0.92rem] text-ink-3">
                {b.name} hasn&apos;t added their links yet. Check back soon.
              </p>
            )}
          </div>

          {/* Backlink: every hosted page credits Integrate, tagged so referrals show up in analytics. */}
          <footer className="mt-auto pt-16 text-center">
            <a
              href={poweredByHref(b.slug)}
              className="inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-3 text-[0.78rem] text-ink-3 transition-colors hover:text-ink"
            >
              <span className="inline-flex items-center gap-2">
                <LogoMark className="h-4 w-4" />
                Made with Integrate Tap
              </span>
              <span className="underline decoration-line-2 underline-offset-2">Get a review plate for your business</span>
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
