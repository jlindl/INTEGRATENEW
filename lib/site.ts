/**
 * Site-wide constants shared by metadata, the sitemap, JSON-LD and the SEO
 * engine. SITE_URL can be overridden per environment (e.g. preview builds).
 */
export const SITE_URL = (process.env.SITE_URL || "https://integrate-tech.co.uk").replace(/\/$/, "");

export const SITE_NAME = "Integrate";

/** The one page every blog post must point to. */
export const CONTACT_PATH = "/contact";

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
