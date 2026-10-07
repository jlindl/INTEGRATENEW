/**
 * What the engine knows about the live site: existing posts (read with the
 * same loader the site uses) and every internal path a post may link to.
 */
import { getAllPosts } from "../../lib/blog";
import { allLegalSlugs } from "../../lib/legalData";
import { NICHES } from "../../lib/webDesignData";
import { SERVICE_HUBS } from "../../lib/serviceHubs";
import { config } from "../config";

export type ExistingPost = {
  slug: string;
  title: string;
  body: string;
  type: "location" | "service";
};

export type LinkTarget = { path: string; label: string };

export function loadExistingPosts(): ExistingPost[] {
  return getAllPosts().map((p) => ({ slug: p.slug, title: p.title, body: p.body, type: p.type }));
}

/** Non-blog pages a post may link to, with a label for the prompt. */
export function sitePages(): LinkTarget[] {
  return [
    { path: config.site.contactPath, label: "Contact page (enquiry form, email, WhatsApp)" },
    { path: "/book", label: "Book a call with Integrate" },
    { path: "/web-design", label: "Integrate Web Design: websites and apps" },
    { path: "/web-design/pricing", label: "Web design pricing" },
    ...NICHES.map((n) => ({ path: `/web-design/${n.slug}`, label: `Web design for ${n.name.toLowerCase()}` })),
    { path: "/services", label: "All Integrate services" },
    ...SERVICE_HUBS.map((h) => ({ path: `/services/${h.id}`, label: `Service guide: ${h.name.toLowerCase()} (link here when the article is about this service)` })),
    { path: "/testimonials", label: "Client testimonials" },
    { path: "/blog", label: "Blog index" },
  ];
}

/** Every internal path that resolves to a real page. */
export function validPaths(posts: { slug: string }[]): Set<string> {
  return new Set([
    "/",
    ...sitePages().map((p) => p.path),
    ...allLegalSlugs().map((s) => `/legal/${s}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]);
}
