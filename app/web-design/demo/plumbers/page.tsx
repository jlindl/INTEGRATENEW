import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { BoilerFeature } from "./_components/BoilerFeature";
import { Contact } from "./_components/Contact";
import { Coverage } from "./_components/Coverage";
import { EmergencyBanner } from "./_components/EmergencyBanner";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { PromiseBand } from "./_components/PromiseBand";
import { Reviews } from "./_components/Reviews";
import { Services } from "./_components/Services";

/* Confident geometric display face for headings and the wordmark */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nl-display",
  display: "swap",
});

/* Warm, highly legible body face */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-nl-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northline Plumbing & Heating | Leeds & West Yorkshire",
  description:
    "Local plumbing and heating across Leeds and West Yorkshire. No call-out fee, fixed quotes, Gas Safe registered engineers, and emergencies attended within 2 hours.",
  robots: { index: false, follow: false },
};

export default function NorthlineDemoPage() {
  return (
    <div
      id="top"
      className={`${jakarta.variable} ${manrope.variable} min-h-dvh bg-[#f6f9fb] font-[family-name:var(--font-nl-body)] text-[#12212e] antialiased`}
    >
      <Header />
      <main id="main">
        <Hero />
        <PromiseBand />
        <Services />
        <BoilerFeature />
        <Reviews />
        <Coverage />
        <EmergencyBanner />
        <Contact />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
