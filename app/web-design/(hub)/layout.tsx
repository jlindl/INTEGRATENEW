import type { Metadata } from "next";
import { WebDesignNav } from "@/components/web-design/WebDesignNav";
import { WebDesignFooter } from "@/components/web-design/WebDesignFooter";
import { AmbientBackdrop } from "@/components/web-design/interactions/AmbientBackdrop";
import { ScrollProgress } from "@/components/web-design/interactions/ScrollProgress";
import { CustomCursor } from "@/components/web-design/interactions/CustomCursor";
import { IntroReveal } from "@/components/web-design/interactions/IntroReveal";

/**
 * The /web-design segment is its own room: dark "gallery" theme, its own nav
 * and footer, its own metadata. It nests inside the root layout (fonts, grain),
 * so only the surface changes — same building, different room.
 *
 * Layer stack (bottom → top): atmosphere (aurora + linework, fixed, z-0),
 * content (z-10), nav (z-50), vignette (z-54), grain (z-55), scroll progress
 * (z-60), cursor (z-70), intro curtain (z-80).
 */
export const metadata: Metadata = {
  title: "Integrate Web Design | Websites & apps that perform",
  description:
    "We build websites and mobile apps that look sharp and actually bring in work. Every build on the site is real. Click into any of it.",
  openGraph: {
    title: "Integrate Web Design | Websites & apps that perform",
    description:
      "Websites and mobile apps that look sharp and bring in work. Every build on the site is real. Click into any of it.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrate Web Design | Websites & apps that perform",
    description:
      "Websites and mobile apps that look sharp and bring in work. Every build on the site is real. Click into any of it.",
  },
};

export default function WebDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Solid carbon base grows with content height, so every (transparent)
    // section sits on the dark ground — never the root layout's light paper.
    <div className="theme-portfolio relative min-h-dvh bg-carbon text-ivory">
      {/* Whole-page atmosphere: aurora field + linework (z-0), vignette (z-54) */}
      <AmbientBackdrop />

      <div className="relative z-10">
        <WebDesignNav />
        <main id="wd-main">{children}</main>
        <WebDesignFooter />
      </div>

      {/* Fine film grain over the whole room — kills the flat-digital look */}
      <div
        aria-hidden="true"
        className="grain-dark pointer-events-none fixed inset-0 z-[55] opacity-60 mix-blend-screen"
      />

      {/* Page-level interaction chrome (fixed, above content) */}
      <ScrollProgress />
      <CustomCursor />

      {/* Signature load moment — curtain lifts as the atmosphere switches on */}
      <IntroReveal />
    </div>
  );
}
