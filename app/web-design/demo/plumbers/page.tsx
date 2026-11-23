import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Accreditations } from "./_components/Accreditations";
import { AfterYouCall } from "./_components/AfterYouCall";
import { Booking } from "./_components/Booking";
import { Coverage } from "./_components/Coverage";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { MobileCallBar } from "./_components/MobileCallBar";
import { PlannedWork } from "./_components/PlannedWork";
import { PriceMenu } from "./_components/PriceMenu";
import { Reviews } from "./_components/Reviews";
import { Services } from "./_components/Services";

/* Archivo: one sturdy grotesque, stretched wide for display and pulled narrow for labels */
const archivo = localFont({
  src: [{ path: "../../../../assets/fonts/archivo/archivo-wdth-100-900.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-nl-sans",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

/* IBM Plex Mono: phone numbers, times and prices, the "dispatch" voice */
const plexMono = localFont({
  src: [
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-nl-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northline Plumbing & Heating | Leeds & West Yorkshire",
  description:
    "Emergency plumbers, boiler engineers and bathroom fitters across Leeds and West Yorkshire. A person answers 24/7, no call-out fee, fixed prices before any work starts.",
  robots: { index: false, follow: false },
};

export default function NorthlineDemoPage() {
  return (
    <div
      id="top"
      className={`${archivo.variable} ${plexMono.variable} min-h-dvh bg-[#f3f6f5] font-[family-name:var(--font-nl-sans)] text-[#0b1a28] antialiased [overflow-x:clip]`}
    >
      <Header />
      <main id="main">
        <Hero />
        <Accreditations />
        <AfterYouCall />
        <Services />
        <PriceMenu />
        <PlannedWork />
        <Reviews />
        <Coverage />
        <Booking />
      </main>
      <Footer />
      <MobileCallBar />
      <DemoCredit />
    </div>
  );
}
