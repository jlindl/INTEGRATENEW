import AnyBusinessSection from "@/components/web-design-portal/any-business-section";
import AppSection from "@/components/web-design-portal/app-section";
import BuildSection from "@/components/web-design-portal/build-section";
import FaqSection from "@/components/web-design-portal/faq-section";
import FrontBackSection from "@/components/web-design-portal/front-back-section";
import Hero from "@/components/web-design-portal/hero";
import ImmersiveSection from "@/components/web-design-portal/immersive-section";
import SectorSection from "@/components/web-design-portal/sector-section";
import SiteFooter from "@/components/web-design-portal/site-footer";
import OfferSection from "@/components/web-design-portal/offer-section";
import SeoSection from "@/components/web-design-portal/seo-section";
import SiteHeader from "@/components/web-design-portal/site-header";
import StudioSection from "@/components/web-design-portal/studio-section";
import WorkSection from "@/components/web-design-portal/work-section";

/**
 * The Integrate Web Design portal. All of its content (clients, builds,
 * the offer, wording) lives in components/web-design-portal/site-data.ts.
 */
export default function WebDesignPortal() {
  return (
    <>
      <SiteHeader />
      {/* id="main" is the root layout's skip-link target. */}
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        {/* Proof first: live client sites straight under the hero, then the
            working sector demos and immersive homepages. */}
        <WorkSection />
        <SectorSection />
        <ImmersiveSection />
        <FrontBackSection />
        <BuildSection />
        <AnyBusinessSection />
        <AppSection />
        <SeoSection />
        <OfferSection />
        <StudioSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
