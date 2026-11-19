import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Contact } from "./_components/Contact";
import { Desk } from "./_components/Desk";
import { Doors } from "./_components/Doors";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Narrowing } from "./_components/Narrowing";
import { Proof } from "./_components/Proof";
import { Roles } from "./_components/Roles";
import { Sectors } from "./_components/Sectors";
import { Terms } from "./_components/Terms";

/* Tight, heavy grotesk for the big editorial headlines */
const atDisplay = localFont({
  src: [{ path: "../../../../assets/fonts/schibsted-grotesk/schibsted-grotesk-400-900.woff2", weight: "400 900", style: "normal" }],
  variable: "--font-at-display",
  display: "swap",
});

/* Italic serif accents: the magazine voice */
const atSerif = localFont({
  src: [
    { path: "../../../../assets/fonts/instrument-serif/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/instrument-serif/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-at-serif",
  display: "swap",
});

const atBody = localFont({
  src: [{ path: "../../../../assets/fonts/inter-tight/inter-tight-100-900.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-at-body",
  display: "swap",
});

/* Data voice: refs, stages, numbers */
const atMono = localFont({
  src: [
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../../../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-at-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascend Talent · Executive & Technology Search, London",
  description:
    "A small London search firm for technology, product and data leadership. We approach two hundred people so you meet three, with a shortlist date agreed before we start.",
  robots: { index: false, follow: false },
};

const css = `
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
  .at-rise { animation: at-rise 1s cubic-bezier(.2,.7,.2,1) both; }
  .at-bar { animation: at-bar 1.6s .6s cubic-bezier(.2,.7,.2,1) both; transform-origin: left; }
  .at-marquee { animation: at-marquee 60s linear infinite; }
  .at-marquee:hover { animation-play-state: paused; }
}
@keyframes at-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes at-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes at-marquee { to { transform: translateX(-50%); } }
`;

export default function AscendTalentPage() {
  return (
    <div
      className={`${atDisplay.variable} ${atSerif.variable} ${atBody.variable} ${atMono.variable} min-h-dvh overflow-x-clip bg-[#f3efe7] font-[family-name:var(--font-at-body)] text-[#121317] antialiased selection:bg-[#ff5a3c] selection:text-[#121317]`}
    >
      <style>{css}</style>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-[#121317] px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Doors />
        <Narrowing />
        <Sectors />
        <Terms />
        <Roles />
        <Proof />
        <Desk />
        <Contact />
      </main>
      <Footer />
      <DemoCredit />
    </div>
  );
}
