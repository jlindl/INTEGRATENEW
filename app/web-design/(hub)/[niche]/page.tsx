import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NicheDetailHero } from "@/components/web-design/NicheDetailHero";
import { NicheDetailContent } from "@/components/web-design/NicheDetailContent";
import { NichePager } from "@/components/web-design/NichePager";
import { ContactBand } from "@/components/web-design/ContactBand";
import { allSlugs, getNiche } from "@/lib/webDesignData";
import { JsonLd } from "@/components/seo/JsonLd";
import { webDesignServiceGraph } from "@/lib/schema";
import { NicheFaq, nicheFaqItems, nicheFaqJsonLd } from "@/components/web-design/NicheFaq";
import { getAllPosts } from "@/lib/blog";

/** Search-led meta description, built only from pricing-page facts. */
function nicheDescription(name: string, hasDemo: boolean): string {
  const trade = name.toLowerCase();
  return `Web design for ${trade} across the UK. Mobile-first websites from a £200 build fee plus £30 a month, hosting and edits included.${hasDemo ? " See the live demo." : ""}`;
}

/** Blog guides written for this trade, e.g. "websites-for-electricians-...". */
function relatedPosts(slug: string) {
  const key = slug.replace(/s$/, "");
  return getAllPosts()
    .filter((p) => p.slug.includes(key))
    .sort((a, b) => Number(b.slug.startsWith("websites-for")) - Number(a.slug.startsWith("websites-for")))
    .slice(0, 4)
    .map((p) => ({ slug: p.slug, title: p.title }));
}

/**
 * The niche detail template. One dynamic route serves every case study — adding
 * a niche is a data change in lib/webDesignData, not new code here. Pages are
 * statically generated from the data at build time.
 */

type Params = { niche: string };

export function generateStaticParams(): Params[] {
  return allSlugs().map((niche) => ({ niche }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = getNiche(slug);
  if (!niche) return { title: "Not found | Integrate Web Design" };

  const base = `Web design for ${niche.name.toLowerCase()}`;
  const long = `${base} | Websites from £200 | Integrate`;
  return {
    // Keyword-first title, e.g. "Web design for plumbers | Websites from £200 | Integrate".
    title: { absolute: long.length <= 62 ? long : `${base} | Integrate` },
    description: nicheDescription(niche.name, Boolean(niche.demo)),
    alternates: { canonical: `/web-design/${niche.slug}` },
  };
}

export default async function NicheDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { niche: slug } = await params;
  const niche = getNiche(slug);
  if (!niche) notFound();
  const faq = nicheFaqItems(niche);

  return (
    <>
      <JsonLd
        data={webDesignServiceGraph({
          slug: niche.slug,
          name: `Web design for ${niche.name.toLowerCase()}`,
          description: nicheDescription(niche.name, false),
        })}
      />
      <JsonLd data={nicheFaqJsonLd(faq)} />
      <NicheDetailHero niche={niche} />
      <NicheDetailContent niche={niche} />
      <NicheFaq niche={niche} items={faq} related={relatedPosts(niche.slug)} />
      <NichePager slug={niche.slug} />
      <ContactBand nicheName={niche.singular} />
    </>
  );
}
