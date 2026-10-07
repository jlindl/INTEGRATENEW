import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NicheDetailHero } from "@/components/web-design/NicheDetailHero";
import { NicheDetailContent } from "@/components/web-design/NicheDetailContent";
import { NichePager } from "@/components/web-design/NichePager";
import { ContactBand } from "@/components/web-design/ContactBand";
import { allSlugs, getNiche } from "@/lib/webDesignData";
import { JsonLd } from "@/components/seo/JsonLd";
import { webDesignServiceGraph } from "@/lib/schema";

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

  return {
    // Keyword-first title, e.g. "Web design for plumbers | Integrate".
    title: `Web design for ${niche.name.toLowerCase()} | Integrate`,
    description: niche.positioning,
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

  return (
    <>
      <JsonLd
        data={webDesignServiceGraph({
          slug: niche.slug,
          name: `Web design for ${niche.name.toLowerCase()}`,
          description: niche.positioning,
        })}
      />
      <NicheDetailHero niche={niche} />
      <NicheDetailContent niche={niche} />
      <NichePager slug={niche.slug} />
      <ContactBand nicheName={niche.singular} />
    </>
  );
}
