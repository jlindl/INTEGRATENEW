import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { ContactCta } from "@/components/blog/ContactCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORG_ID } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { SERVICE_HUBS, getHub, postsForHub } from "@/lib/serviceHubs";

type Params = { service: string };

export function generateStaticParams(): Params[] {
  return SERVICE_HUBS.map((h) => ({ service: h.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { service } = await params;
  const hub = getHub(service);
  if (!hub) return { title: "Not found | Integrate" };
  return {
    title: { absolute: `${hub.title} | Integrate`.length <= 60 ? `${hub.title} | Integrate` : hub.title },
    description: hub.description,
    alternates: { canonical: `/services/${hub.id}` },
  };
}

export default async function ServiceHubPage({ params }: { params: Promise<Params> }) {
  const { service } = await params;
  const hub = getHub(service);
  if (!hub) notFound();
  const posts = postsForHub(hub);
  const url = absoluteUrl(`/services/${hub.id}`);

  return (
    <article className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: hub.h1,
              description: hub.description,
              url,
              provider: { "@id": ORG_ID },
              areaServed: { "@type": "Country", name: "United Kingdom" },
            },
            {
              "@type": "FAQPage",
              mainEntity: hub.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Services", item: absoluteUrl("/services") },
                { "@type": "ListItem", position: 2, name: hub.name, item: url },
              ],
            },
          ],
        }}
      />
      <div className="glow-accent pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mx-auto max-w-[44rem]">
          <Reveal className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-3">
            <Link href="/services" className="transition-colors hover:text-ink">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent">{hub.name}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display-tuned text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.06] text-ink">{hub.h1}</h1>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
            {hub.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="mt-14 font-display-tuned text-3xl font-medium text-ink">How it works</h2>
          <ol className="mt-6 space-y-5">
            {hub.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-medium text-ink">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 font-display-tuned text-3xl font-medium text-ink">What good looks like</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 leading-relaxed text-ink-2">
            {hub.goodSigns.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>

          <ContactCta variant="closing" />

          <h2 className="mt-14 font-display-tuned text-3xl font-medium text-ink">Frequently asked questions</h2>
          <div className="mt-6 space-y-6">
            {hub.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-medium text-ink">{f.q}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {posts.length > 0 && (
          <section aria-labelledby="guides-heading" className="mx-auto mt-24 max-w-6xl">
            <h2 id="guides-heading" className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Guides by trade and town ({posts.length})
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
