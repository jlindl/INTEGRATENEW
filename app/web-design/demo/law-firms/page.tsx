import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Accolades } from "./_components/Accolades";
import { Approach } from "./_components/Approach";
import { ContactCta } from "./_components/ContactCta";
import { Expertise } from "./_components/Expertise";
import { Faq } from "./_components/Faq";
import { Hero } from "./_components/Hero";
import { Insights } from "./_components/Insights";
import { People } from "./_components/People";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";

/* Serif-led display face — editorial gravitas */
const spectral = localFont({
  src: [
    { path: "../../../../assets/fonts/spectral/spectral-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/spectral/spectral-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../../../assets/fonts/spectral/spectral-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../assets/fonts/spectral/spectral-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../../../../assets/fonts/spectral/spectral-600.woff2", weight: "600", style: "normal" },
    { path: "../../../../assets/fonts/spectral/spectral-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-hl-display",
  display: "swap",
});

/* Clean, highly legible body face */
const inter = localFont({
  src: [
    { path: "../../../../assets/fonts/inter/inter-100-900.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-hl-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halstead Law · Solicitors in London & Guildford",
  description:
    "A modern firm with old-fashioned judgement. Clear advice, a senior solicitor on every matter, and fees agreed before we start. Corporate, property, disputes and private client.",
  robots: { index: false, follow: false },
};

/*
 * Scroll-reveal styles live here rather than in globals: the Reveal
 * component only adds .hl-motion after mount, when motion is allowed and
 * the element is below the fold, so content is always visible without JS.
 */
const revealCss = `
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
.hl-motion {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.hl-motion.hl-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .hl-motion { opacity: 1; transform: none; transition: none; }
}
`;

export default function HalsteadLawDemoPage() {
  return (
    <div
      className={`${spectral.variable} ${inter.variable} min-h-dvh bg-[#f6f4ef] font-[family-name:var(--font-hl-body)] text-[#1a1712] antialiased selection:bg-[#7c2d2d] selection:text-[#f6f4ef]`}
    >
      <style>{revealCss}</style>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Accolades />
        <Expertise />
        <Approach />
        <People />
        <Faq />
        <Insights />
        <ContactCta />
      </main>
      <SiteFooter />
      <DemoCredit />
    </div>
  );
}
