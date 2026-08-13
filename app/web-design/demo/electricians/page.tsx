import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Areas } from "./_components/Areas";
import { Certifications } from "./_components/Certifications";
import { Emergency } from "./_components/Emergency";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Process } from "./_components/Process";
import { ProofStrip } from "./_components/ProofStrip";
import { QuoteCta } from "./_components/QuoteCta";
import { Reviews } from "./_components/Reviews";
import { Services } from "./_components/Services";

/* Uppercase condensed display face for headlines and numerals */
const veDisplay = localFont({
  src: [
    { path: "../../../../assets/fonts/barlow-condensed/barlow-condensed-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../assets/fonts/barlow-condensed/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "../../../../assets/fonts/barlow-condensed/barlow-condensed-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ve-display",
  display: "swap",
});

/* Workhorse body face */
const veBody = localFont({
  src: [
    { path: "../../../../assets/fonts/barlow/barlow-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/barlow/barlow-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../assets/fonts/barlow/barlow-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ve-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voltedge | 24/7 Emergency Electricians in Greater Manchester",
  description:
    "Fully certified electricians across Greater Manchester. Same-day callouts, upfront pricing, and work that passes inspection every time. Call 0161 496 0100.",
  robots: { index: false, follow: false },
};

export default function VoltedgePage() {
  return (
    <div
      className={`${veDisplay.variable} ${veBody.variable} min-h-dvh bg-[#0e1116] font-[family-name:var(--font-ve-body)] text-[#f4f7fb] antialiased selection:bg-[#ffb020] selection:text-[#12151b]`}
    >
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Services />
        <Process />
        <Emergency />
        <Areas />
        <Reviews />
        <Certifications />
        <QuoteCta />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
