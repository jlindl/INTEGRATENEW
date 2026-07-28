import { PortfolioHero } from "@/components/web-design/hero/PortfolioHero";
import { PortfolioShowcase } from "@/components/web-design/gallery/PortfolioShowcase";
import { AnyNiche } from "@/components/web-design/AnyNiche";
import { Craft } from "@/components/web-design/Craft";
import { MobileShowcase } from "@/components/web-design/MobileShowcase";
import { Testimonials } from "@/components/web-design/Testimonials";
import { StudioNote } from "@/components/web-design/StudioNote";
import { ContactBand } from "@/components/web-design/ContactBand";

/**
 * The portfolio hub. Nav + footer live in the segment layout; this file sets
 * the running order of the hub's beats: a cinematic montage hero opens the
 * room, then a bento grid of the real work carries the page.
 */
export default function WebDesignHub() {
  return (
    <>
      <PortfolioHero />
      <PortfolioShowcase />
      <AnyNiche />
      <Craft />
      <MobileShowcase />
      <Testimonials />
      <StudioNote />
      <ContactBand />
    </>
  );
}
