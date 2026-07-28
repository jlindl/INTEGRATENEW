import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { Services } from "@/components/sections/Services";
import { WorkflowAutomation } from "@/components/sections/WorkflowAutomation";
import { DigitalExperiences } from "@/components/sections/DigitalExperiences";
import { Capabilities } from "@/components/sections/Capabilities";
import { WebDesignPromo } from "@/components/sections/WebDesignPromo";
import { Integrations } from "@/components/sections/Integrations";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Footer } from "@/components/sections/Footer";

/**
 * The homepage is a sequence of "beats" — each section component owns its own
 * scroll choreography; this file only sets the running order.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ServiceMarquee />
        <Services />
        <WorkflowAutomation />
        <DigitalExperiences />
        <Capabilities />
        <WebDesignPromo />
        <Integrations />
        <Stats />
        <Process />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
