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
    "Book a call with Integrate: leave your details and we'll call you back within one business day. Or email sales@integrate.co.uk or message us on WhatsApp.",
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
