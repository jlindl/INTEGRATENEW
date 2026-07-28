import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Advisory } from "./_components/Advisory";
import { ContactCta } from "./_components/ContactCta";
import { Hero } from "./_components/Hero";
import { Insights } from "./_components/Insights";
import { Pricing } from "./_components/Pricing";
import { PullQuote } from "./_components/PullQuote";
import { Services } from "./_components/Services";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { TrustBar } from "./_components/TrustBar";
import { WhoWeHelp } from "./_components/WhoWeHelp";

/* Serif-led display face: headlines in 500, pull-quote in italic */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mc-display",
  display: "swap",
});

/* Plain-spoken body face */
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mc-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meridian & Co · Chartered Accountants in London",
  description:
    "Proactive accounting and tax for founders and established firms. Fixed fees, real-time dashboards, and an advisor who actually picks up the phone.",
  robots: { index: false, follow: false },
};

/*
 * Scroll-reveal styles live here rather than in globals: the Reveal
 * component only adds .mc-motion after mount, when motion is allowed and
 * the element is below the fold, so content is always visible without JS.
 */
const revealCss = `
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
.mc-motion {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.mc-motion.mc-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .mc-motion { opacity: 1; transform: none; transition: none; }
}
`;

export default function MeridianDemoPage() {
  return (
    <div
      className={`${newsreader.variable} ${publicSans.variable} min-h-dvh bg-[#f4f2ec] font-[family-name:var(--font-mc-body)] text-[#15201c] antialiased selection:bg-[#1f5c46] selection:text-[#f4f2ec]`}
    >
      <style>{revealCss}</style>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustBar />
        <WhoWeHelp />
        <Services />
        <Pricing />
        <Advisory />
        <PullQuote />
        <Insights />
        <ContactCta />
      </main>
      <SiteFooter />
      <DemoCredit />
    </div>
  );
}
