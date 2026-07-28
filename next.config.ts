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
};

export default nextConfig;
