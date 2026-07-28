import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * The /contact segment reuses the main site's light theme, nav, and footer so
 * it reads as part of Integrate. Nav is fixed, so the page adds its own top
 * padding.
 */
export const metadata: Metadata = {
  title: "Contact — Integrate",
  description:
    "Talk to Integrate about your project. Email sales@integrate.co.uk, message us on WhatsApp, or send an enquiry through the form.",
};

export default function ContactLayout({
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
