import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * The /testimonials segment reuses the main site's light theme, nav, and
 * footer so it reads as part of Integrate. Nav is fixed, so the page adds its
 * own top padding.
 */
export const metadata: Metadata = {
  title: "Testimonials — Integrate",
  description:
    "The brands we've worked with, and what they had to say. Client stories from the teams whose systems and sites Integrate designed, built, and maintains.",
};

export default function TestimonialsLayout({
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
