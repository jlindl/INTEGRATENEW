import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * The /blog segment reuses the main site's light theme, nav, and footer so it
 * reads as part of Integrate. Nav is fixed, so pages add their own top padding.
 */
export const metadata: Metadata = {
  title: "Blog — Integrate",
  description:
    "Field notes on AI, automation, and building leverage for high-growth B2B, from the Integrate team.",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
