import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pages rendered per request (e.g. /black-friday, which checks the offer
  // deadline on every request) would otherwise stream their <title>, meta
  // description and Open Graph tags into the <body> for everyone except a
  // short list of known crawlers. Matching every user agent keeps them in the
  // <head>, where link previews, SEO tools and Lighthouse look for them.
  htmlLimitedBots: /.*/,
  // Verification builds set NEXT_DISTDIR to a throwaway dir so a prod build
  // never overwrites the running `next dev` server's shared `.next` chunks.
  distDir: process.env.NEXT_DISTDIR || ".next",
  images: {
    // The /web-design/demo/* showcase sites use curated Unsplash photography
    // until real client imagery exists.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // The four launch-era sample posts were removed when the blog moved to MDX;
  // send anyone (or any search engine) still holding those URLs to the blog.
  async redirects() {
    return [
      "hidden-cost-of-manual-operations",
      "highest-roi-automation",
      "ai-agents-vs-simple-automation",
      "bespoke-vs-off-the-shelf",
    ]
      .map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true }))
      .concat([
        // Old-site URLs Google still requests (Search Console 404 and
        // "crawled, not indexed" reports, Nov 2026).
        { source: "/about", destination: "/", permanent: true },
        { source: "/insights", destination: "/blog", permanent: true },
        { source: "/insights/:path*", destination: "/blog", permanent: true },
      ]);
  },
};

export default nextConfig;
