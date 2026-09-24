/**
 * Structured data for a blog post: BlogPosting, a BreadcrumbList, and for
 * posts tied to a place or service, a Service node describing what Integrate
 * offers and where. No address or ratings are asserted, only facts the post
 * itself establishes.
 */
import type { Post } from "@/lib/blog";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export function PostJsonLd({ post }: { post: Post }) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const org = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL };

  const place = post.location
    ? {
        "@type": "Place",
        name: post.location,
        ...(post.region
          ? { containedInPlace: { "@type": "AdministrativeArea", name: post.region } }
          : {}),
      }
    : undefined;

  const serviceName = post.service ?? (post.trade ? `Lead generation for ${post.trade}` : undefined);
  const service =
    serviceName || place
      ? {
          "@type": "Service",
          name: serviceName ?? post.targetKeyword,
          provider: { "@id": org["@id"] },
          ...(place ? { areaServed: place } : { areaServed: { "@type": "Country", name: "United Kingdom" } }),
        }
      : undefined;

  const graph = [
    org,
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: "en-GB",
      keywords: post.targetKeyword,
      articleSection: post.category,
      author: { "@id": org["@id"] },
      publisher: { "@id": org["@id"] },
      ...(post.heroImage ? { image: absoluteUrl(post.heroImage) } : {}),
      ...(place ? { contentLocation: place, spatialCoverage: place } : {}),
      ...(service ? { about: service } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
