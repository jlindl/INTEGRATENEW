import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { BookingCta } from "./_components/BookingCta";
import { Hero } from "./_components/Hero";
import { NewPatients } from "./_components/NewPatients";
import { Prices } from "./_components/Prices";
import { Reviews } from "./_components/Reviews";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { Treatments } from "./_components/Treatments";
import { TrustBar } from "./_components/TrustBar";

/* Rounded, friendly display face — calm and modern */
const jakarta = localFont({
  src: [
    { path: "../../../../assets/fonts/plus-jakarta-sans/plus-jakarta-sans-200-800.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-bw-display",
  display: "swap",
});

/* Clean, highly legible body face */
const inter = localFont({
  src: [
    { path: "../../../../assets/fonts/inter/inter-100-900.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-bw-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brightwell · Gentle Private & NHS Dentist in Leeds",
  description:
    "A calmer kind of dental care. Clear prices, easy online booking, and a team that's genuinely good with nervous patients. Same-week appointments and 0% finance.",
  robots: { index: false, follow: false },
};

/*
 * Scroll-reveal styles live here rather than in globals: the Reveal
 * component only adds .bw-motion after mount, when motion is allowed and
 * the element is below the fold, so content is always visible without JS.
 */
const revealCss = `
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
.bw-motion {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.bw-motion.bw-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .bw-motion { opacity: 1; transform: none; transition: none; }
}
`;

export default function BrightwellDemoPage() {
  return (
    <div
      className={`${jakarta.variable} ${inter.variable} min-h-dvh bg-[#f4faf9] font-[family-name:var(--font-bw-body)] text-[#13201f] antialiased selection:bg-[#12b3a6] selection:text-white`}
    >
      <style>{revealCss}</style>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustBar />
        <Treatments />
        <NewPatients />
        <Prices />
        <Reviews />
        <BookingCta />
      </main>
      <SiteFooter />
      <DemoCredit />
    </div>
  );
}
