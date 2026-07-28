import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * The /legal segment reuses the main site's light theme, nav, and footer. Nav
 * is fixed, so pages add their own top padding. Per-document metadata is set in
 * the [slug] page's generateMetadata.
 */
export default function LegalLayout({
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
