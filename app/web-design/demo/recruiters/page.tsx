import type { Metadata } from "next";
import { Figtree, Schibsted_Grotesk } from "next/font/google";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { ClientRow } from "./_components/ClientRow";
import { FinalCta } from "./_components/FinalCta";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Process } from "./_components/Process";
import { Proof } from "./_components/Proof";
import { Roles } from "./_components/Roles";
import { Sectors } from "./_components/Sectors";
import { TwoDoors } from "./_components/TwoDoors";

/* Sharp editorial grotesk for headlines and the wordmark */
const atDisplay = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-at-display",
  display: "swap",
});

/* Friendly, legible body face */
const atBody = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-at-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascend Talent · Executive & Technology Search, London",
  description:
    "Specialist recruiters for scaling technology teams. Pre-vetted shortlists in 11 days on average, 92% offer acceptance, and a replacement guarantee on every placement.",
  robots: { index: false, follow: false },
};

const smoothScrollCss = `
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
`;

export default function AscendDemoPage() {
  return (
    <div
      className={`${atDisplay.variable} ${atBody.variable} min-h-dvh bg-[#f7f5f1] font-[family-name:var(--font-at-body)] text-[#16181d] antialiased selection:bg-[#ff5a3c] selection:text-[#16181d]`}
    >
      <style>{smoothScrollCss}</style>
      <Header />
      <main id="main">
        <Hero />
        <ClientRow />
        <TwoDoors />
        <Sectors />
        <Process />
        <Roles />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
