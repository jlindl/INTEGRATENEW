import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Approach } from "./_components/Approach";
import { Consultation } from "./_components/Consultation";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Insights } from "./_components/Insights";
import { Interlude } from "./_components/Interlude";
import { Matters } from "./_components/Matters";
import { People } from "./_components/People";
import { PracticeIndex } from "./_components/PracticeIndex";
import { Recognition } from "./_components/Recognition";
import { SmoothScroll } from "./_components/SmoothScroll";
import { Statement } from "./_components/Statement";

/* High-contrast display serif: the editorial voice */
const instrumentSerif = localFont({
  src: [
    { path: "../../../../assets/fonts/instrument-serif/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/instrument-serif/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-hl-serif",
  display: "swap",
});

/* Quiet, precise text face */
const interTight = localFont({
  src: [{ path: "../../../../assets/fonts/inter-tight/inter-tight-100-900.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-hl-sans",
  display: "swap",
});

/* Mono for section marks, footnotes and references */
const plexMono = localFont({
  src: [
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-hl-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halstead Law · Solicitors in London & Guildford",
  description:
    "A modern firm with old-fashioned judgement. A partner on every matter, advice in plain English and fees agreed in writing before we start. Commercial and private client.",
  robots: { index: false, follow: false },
};

/*
 * Page-scoped styles. Every animation lives inside a no-preference media
 * query, and the reveal class is only added by JS after mount, so content
 * is always visible without JS or with reduced motion.
 */
const css = `
@media (prefers-reduced-motion: no-preference) {
  html:not(.lenis) { scroll-behavior: smooth; }
}
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }

/* One consistent photographic grade: slightly desaturated, warm, lifted blacks */
.hl-grade { filter: saturate(0.55) sepia(0.14) contrast(1.04) brightness(0.96); }
.hl-portrait { filter: grayscale(1) sepia(0.18) contrast(1.06) brightness(0.95); }
.group:hover .hl-portrait { filter: grayscale(0.55) sepia(0.2) contrast(1.04) brightness(0.98); }

.hl-faq[open] > p { animation: hl-fade-in 0.5s ease both; }

.hl-motion {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 1s cubic-bezier(0.2, 0.7, 0.1, 1), transform 1.1s cubic-bezier(0.2, 0.7, 0.1, 1);
}
.hl-motion.hl-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: no-preference) {
  .hl-hero-img { animation: hl-letterbox 1.8s cubic-bezier(0.76, 0, 0.18, 1) both; }
  .hl-hero-img img { animation: hl-settle 4.2s cubic-bezier(0.16, 0.7, 0.2, 1) both; }
  .hl-line > span { animation: hl-rise 1.3s cubic-bezier(0.2, 0.75, 0.1, 1) both; animation-delay: calc(0.75s + var(--i, 0) * 0.13s); }
  .hl-fade { animation: hl-fade-in 1.1s ease both; animation-delay: var(--d, 0s); }
  .hl-header-in { animation: hl-drop 0.6s cubic-bezier(0.2, 0.7, 0.1, 1) both; }
}
@media (prefers-reduced-motion: reduce) {
  .hl-motion { opacity: 1; transform: none; transition: none; }
  .hl-faq[open] > p { animation: none; }
}
@keyframes hl-letterbox { from { clip-path: inset(41% 0 41% 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes hl-settle { from { transform: scale(1.16); } to { transform: scale(1); } }
@keyframes hl-rise { from { transform: translateY(108%); } to { transform: none; } }
@keyframes hl-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hl-drop { from { transform: translateY(-100%); } to { transform: none; } }
`;

export default function HalsteadLawDemoPage() {
  return (
    <div
      className={`${instrumentSerif.variable} ${interTight.variable} ${plexMono.variable} min-h-dvh overflow-x-clip bg-[#f3efe7] font-[family-name:var(--font-hl-sans)] text-[#17130f] antialiased selection:bg-[#74272a] selection:text-[#f3efe7]`}
    >
      <style>{css}</style>
      <SmoothScroll />
      <Header />
      <main id="main">
        <Hero />
        <Recognition />
        <Statement />
        <PracticeIndex />
        <Interlude />
        <Approach />
        <People />
        <Matters />
        <Faq />
        <Insights />
        <Consultation />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
