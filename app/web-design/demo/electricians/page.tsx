import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Areas } from "./_components/Areas";
import { Callout } from "./_components/Callout";
import { Credentials } from "./_components/Credentials";
import { CurrentRail } from "./_components/CurrentRail";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { ProofBar } from "./_components/ProofBar";
import { Quote } from "./_components/Quote";
import { Reviews } from "./_components/Reviews";
import { Services } from "./_components/Services";
import { Styles } from "./_components/Styles";
import { Triage } from "./_components/Triage";

/* Condensed industrial display face for headlines and numerals */
const veDisplay = localFont({
  src: "../../../../assets/fonts/big-shoulders-display/big-shoulders-display-100-900.woff2",
  weight: "100 900",
  variable: "--font-ve-display",
  display: "swap",
});

/* Grotesque body face */
const veBody = localFont({
  src: "../../../../assets/fonts/archivo/archivo-wdth-100-900.woff2",
  weight: "100 900",
  variable: "--font-ve-body",
  display: "swap",
});

/* Instrument-readout mono for labels, times and reference numbers */
const veMono = localFont({
  src: [
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ve-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voltedge | 24/7 Emergency Electricians in Greater Manchester",
  description:
    "NICEIC approved electricians across Greater Manchester. Answered by an electrician 24/7, fixed call-out prices and an average 18 minute arrival. Call 0161 496 0100.",
  robots: { index: false, follow: false },
};

export default function VoltedgePage() {
  return (
    <div
      className={`${veDisplay.variable} ${veBody.variable} ${veMono.variable} min-h-dvh overflow-x-clip bg-[#0a0c0f] font-[family-name:var(--font-ve-body)] text-[#f3f5f8] antialiased selection:bg-[#ffb020] selection:text-[#0a0c0f]`}
    >
      <Styles />
      <Header />
      <CurrentRail />
      <main id="main">
        <Hero />
        <ProofBar />
        <Triage />
        <Services />
        <Callout />
        <Credentials />
        <Reviews />
        <Areas />
        <Quote />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
