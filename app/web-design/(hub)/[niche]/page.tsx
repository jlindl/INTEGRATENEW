import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NicheDetailHero } from "@/components/web-design/NicheDetailHero";
import { NicheDetailContent } from "@/components/web-design/NicheDetailContent";
import { NichePager } from "@/components/web-design/NichePager";
import { ContactBand } from "@/components/web-design/ContactBand";
import { allSlugs, getNiche } from "@/lib/webDesignData";

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
    title: `${niche.forLabel} | Integrate Web Design`,
    description: niche.positioning,
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
      <NicheDetailHero niche={niche} />
      <NicheDetailContent niche={niche} />
      <NichePager slug={niche.slug} />
      <ContactBand nicheName={niche.singular} />
    </>
  );
}
