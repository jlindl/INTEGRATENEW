import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
