import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * The /blog segment reuses the main site's light theme, nav, and footer so it
 * reads as part of Integrate. Nav is fixed, so pages add their own top padding.
 */
export const metadata: Metadata = {
  title: "Blog | Integrate",
  description:
    "Practical notes on getting found, turning enquiries into booked work, and automating the admin, from the Integrate team.",
  alternates: { canonical: "/blog" },
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
