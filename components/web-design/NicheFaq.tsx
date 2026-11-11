/**
 * NicheFaq — the search-facing half of a niche page: what a website for this
 * trade includes, what it costs, the common questions, and links into the
 * related guides. Every fact here matches the pricing page (£200 build fee
 * from, £30/month with hosting and up to 30 minutes of edits) so the copy and
 * the FAQ schema never promise more than the business offers.
 */
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Niche } from "@/lib/webDesignData";

export type NicheFaqItem = { q: string; a: string };

const INCLUDED = [
  "A design built around how your customers actually choose who to hire",
  "Works properly on phones and loads quickly",
  "Help with the words and layout so it reads well from day one",
  "Page titles, headings and structure set up so Google can understand every page",
  "Set up, launched and handed over ready to go",
  "Fast, secure hosting with SSL, backups and updates included",
  "Small changes done for you each month: new hours, prices, photos, text",
];

export function nicheFaqItems(niche: Niche): NicheFaqItem[] {
  const trade = niche.name.toLowerCase();
  const one = niche.singular.toLowerCase();
  return [
    {
      q: `How much does a website for ${trade} cost?`,
      a: `Integrate websites start from a £200 build fee, then a flat £30 a month that covers hosting, SSL, backups, updates and up to 30 minutes of edits. The exact build fee depends on how many pages and features your ${one} business needs, and anything beyond the monthly minutes is quoted up front, so there are no surprise charges.`,
    },
    {
      q: `What should a ${one} website include?`,
      a: `The essentials are a clear way to call or message you from a phone, proof that you're qualified and trusted (accreditations, reviews and photos of real work), a page for each main service, the areas you cover, and a short enquiry form for jobs that can wait. Everything else is secondary to making it easy for a ready-to-buy customer to get in touch.`,
    },
    {
      q: `Will my website show up on Google?`,
      a: `Every site is built mobile-first and fast, with proper page titles, headings and a sitemap so Google can read and index each page. Nobody can honestly guarantee a ranking, but a well-built site gives you the foundations. For more enquiries on top, Integrate also runs lead generation and Facebook ads for trades.`,
    },
    {
      q: `Can I make changes after the site goes live?`,
      a: `Yes. Up to 30 minutes of edits a month are included in the £30 monthly fee, so new prices, photos, opening hours or text are done for you. Bigger changes are quoted before any work starts.`,
    },
    {
      q: `Do you build websites for ${trade} anywhere in the UK?`,
      a: `Yes. Integrate works with ${trade} and other trades and service businesses across the UK. Everything can be done by phone, video call and email, so it doesn't matter where you're based.`,
    },
  ];
}

export function nicheFaqJsonLd(items: NicheFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function NicheFaq({
  niche,
  items,
  related,
}: {
  niche: Niche;
  items: NicheFaqItem[];
  related: { slug: string; title: string }[];
}) {
  const trade = niche.name.toLowerCase();
  return (
    <section aria-labelledby="niche-faq-heading" className="container-x border-t border-graphite py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-halo-dim">Websites for {trade}</p>
          <h2
            id="niche-faq-heading"
            className="mt-4 font-display-tuned text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight text-ivory"
          >
            What&rsquo;s included in a {niche.singular.toLowerCase()} website.
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 leading-snug text-mist">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-halo" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-mist">
            From a £200 build fee plus £30 a month.{" "}
            <Link href="/web-design/pricing" className="text-ivory underline underline-offset-4 hover:text-halo">
              See full pricing
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-ivory underline underline-offset-4 hover:text-halo">
              get a quote for your {niche.singular.toLowerCase()} website
            </Link>
            .
          </p>
          {related.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow text-halo-dim">Guides for {trade}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-mist underline underline-offset-4 hover:text-ivory">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <div>
          <h2 className="font-display-tuned text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight text-ivory">
            Web design for {trade}: common questions
          </h2>
          <div className="mt-6 flex flex-col divide-y divide-graphite">
            {items.map((f) => (
              <details key={f.q} className="group py-5 first:pt-0">
                <summary className="cursor-pointer list-none text-lg font-medium text-ivory marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-mist">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
