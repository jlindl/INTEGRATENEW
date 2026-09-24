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
  async redirects() {
    return [
      "hidden-cost-of-manual-operations",
      "highest-roi-automation",
      "ai-agents-vs-simple-automation",
      "bespoke-vs-off-the-shelf",
    ].map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true }));
  },
};

export default nextConfig;
