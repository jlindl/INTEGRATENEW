import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  // The /trades VSL and poster are versioned by file name, so browsers and
  // Vercel's edge can keep them for a year instead of revalidating every visit.
  async headers() {
    return ["/Integrate_VSL-720.mp4", "/Integrate_VSL-poster-720.jpg"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }));
  },
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
