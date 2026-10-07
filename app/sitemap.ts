import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { allLegalSlugs } from "@/lib/legalData";
import { allSlugs as allNicheSlugs } from "@/lib/webDesignData";
import { absoluteUrl } from "@/lib/site";
import { SERVICE_HUBS } from "@/lib/serviceHubs";

/**
 * Sitemap, rebuilt on every deploy. Blog posts are picked up automatically
 * from content/blog, so new engine posts need no manual step.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/book"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/web-design"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/web-design/pricing"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/testimonials"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.8 },
    ...SERVICE_HUBS.map((h) => ({
      url: absoluteUrl(`/services/${h.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const niches: MetadataRoute.Sitemap = allNicheSlugs().map((slug) => ({
    url: absoluteUrl(`/web-design/${slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legal: MetadataRoute.Sitemap = allLegalSlugs().map((slug) => ({
    url: absoluteUrl(`/legal/${slug}`),
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(post.heroImage ? { images: [absoluteUrl(post.heroImage)] } : {}),
  }));

  return [...staticPages, ...niches, ...posts, ...legal];
}
