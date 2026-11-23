import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Approach } from "./_components/Approach";
import { Clients } from "./_components/Clients";
import { Contact } from "./_components/Contact";
import { FeeBuilder } from "./_components/FeeBuilder";
import { Figures } from "./_components/Figures";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Insights } from "./_components/Insights";
import { MonthEnd } from "./_components/MonthEnd";
import { Proof } from "./_components/Proof";
import { Services } from "./_components/Services";

/* Display: Newsreader, a text serif with real optical sizes, set light */
const newsreader = localFont({
  src: [
    { path: "../../../../assets/fonts/newsreader/newsreader-200-800.woff2", weight: "200 800", style: "normal" },
    { path: "../../../../assets/fonts/newsreader/newsreader-200-800-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-mc-serif",
  display: "swap",
});

/* Body: Instrument Sans, precise without being cold */
const instrumentSans = localFont({
  src: [{ path: "../../../../assets/fonts/instrument-sans/instrument-sans-400-700.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-mc-sans",
  display: "swap",
});

/* Figures and labels: IBM Plex Mono */
const plexMono = localFont({
  src: [
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mc-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meridian & Co · Chartered Accountants, Clerkenwell",
  description:
    "Chartered accountants for founder-led companies. Bookkeeping, tax, payroll, R&D relief and management accounts on one fixed monthly fee, with a named partner.",
  robots: { index: false, follow: false },
};

/*
 * Motion lives here. Hero entrance is pure CSS (it ends visible, with or
 * without JS). Scroll reveals only apply hidden states after JS has
 * confirmed motion is allowed and the element is below the fold.
 */
const css = `
.mc-root { font-family: var(--font-mc-sans), ui-sans-serif, system-ui, sans-serif; font-optical-sizing: auto; }
.mc-root ::selection { background: #1b4a3a; color: #f3f0e8; }

@media (prefers-reduced-motion: no-preference) {
  html:has(.mc-root) { scroll-behavior: smooth; }

  .mc-line { animation: mc-up 1.1s cubic-bezier(.2,.7,.1,1) both; animation-delay: calc(var(--d, 0ms) + 120ms); }
  .mc-fade { animation: mc-fade 1s cubic-bezier(.2,.7,.1,1) both; animation-delay: calc(var(--d, 0ms) + 200ms); }
  .mc-curtain { animation: mc-curtain 1.4s cubic-bezier(.7,0,.2,1) both; animation-delay: 150ms; }
  .mc-curtain img { animation: mc-settle 2.2s cubic-bezier(.2,.7,.1,1) both; animation-delay: 150ms; }
  .mc-card { animation: mc-fade 1s cubic-bezier(.2,.7,.1,1) both; animation-delay: 900ms; }
  .mc-row { animation: mc-fade .6s ease-out both; animation-delay: calc(1100ms + var(--i) * 260ms); }
  .mc-row .mc-tick { stroke-dasharray: 12; animation: mc-draw .5s ease-out both; animation-delay: calc(1250ms + var(--i) * 260ms); }

  .mc-rise { opacity: 0; transform: translateY(22px); transition: opacity .9s cubic-bezier(.2,.7,.1,1), transform .9s cubic-bezier(.2,.7,.1,1); }
  .mc-rise.mc-in { opacity: 1; transform: none; }

  @supports (animation-timeline: view()) {
    .mc-parallax { animation: mc-pan linear both; animation-timeline: view(); scale: 1.14; }
  }
}

@keyframes mc-up { from { opacity: 0; transform: translateY(0.35em); } to { opacity: 1; transform: none; } }
@keyframes mc-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes mc-curtain { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes mc-settle { from { transform: scale(1.12); } to { transform: scale(1); } }
@keyframes mc-draw { from { stroke-dashoffset: 12; } to { stroke-dashoffset: 0; } }
@keyframes mc-pan { from { transform: translateY(-6%); } to { transform: translateY(6%); } }

.mc-range { -webkit-appearance: none; appearance: none; height: 28px; background: transparent; cursor: pointer; }
.mc-range::-webkit-slider-runnable-track { height: 2px; background: linear-gradient(to right, #1b4a3a var(--fill), rgba(19,32,27,.2) var(--fill)); }
.mc-range::-moz-range-track { height: 2px; background: linear-gradient(to right, #1b4a3a var(--fill), rgba(19,32,27,.2) var(--fill)); }
.mc-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; margin-top: -10px; border-radius: 999px; background: #f3f0e8; border: 1.5px solid #1b4a3a; box-shadow: 0 0 0 5px rgba(27,74,58,.1); transition: box-shadow .3s; }
.mc-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px; background: #f3f0e8; border: 1.5px solid #1b4a3a; box-shadow: 0 0 0 5px rgba(27,74,58,.1); }
.mc-range:hover::-webkit-slider-thumb { box-shadow: 0 0 0 8px rgba(27,74,58,.14); }
`;

export default function MeridianDemoPage() {
  return (
    <div
      className={`${newsreader.variable} ${instrumentSans.variable} ${plexMono.variable} mc-root min-h-dvh bg-[#f3f0e8] text-[#13201b] antialiased`}
    >
      <style>{css}</style>
      <Header />
      <main id="main">
        <Hero />
        <Figures />
        <Approach />
        <Services />
        <MonthEnd />
        <Clients />
        <FeeBuilder />
        <Proof />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
