import type { Metadata } from "next";
import localFont from "next/font/local";
import { DemoCredit } from "@/components/web-design/demo/DemoCredit";
import { Booking } from "./_components/Booking";
import { Comforts } from "./_components/Comforts";
import { Faq } from "./_components/Faq";
import { FirstVisit } from "./_components/FirstVisit";
import { Hero } from "./_components/Hero";
import { Prices } from "./_components/Prices";
import { Reviews } from "./_components/Reviews";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { Team } from "./_components/Team";
import { Treatments } from "./_components/Treatments";

/* Soft, optical-size serif: warm and human, never clinical */
const fraunces = localFont({
  src: [
    { path: "../../../../assets/fonts/fraunces/fraunces-100-900.woff2", weight: "100 900", style: "normal" },
    { path: "../../../../assets/fonts/fraunces/fraunces-100-900-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-bw-display",
  display: "swap",
});

/* Rounded, friendly grotesk for reading */
const figtree = localFont({
  src: [{ path: "../../../../assets/fonts/figtree/figtree-300-900.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-bw-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brightwell Dental · Gentle Dentist in Leeds for Nervous Patients",
  description:
    "Calm, unhurried private dentistry in Leeds, with NHS care for children. Clear prices, a stop signal we always honour, sedation if you need it, and online booking in about a minute.",
  robots: { index: false, follow: false },
};

/*
 * Page-scoped CSS. Reveal only adds .bw-motion after mount, when motion is
 * allowed and the element is below the fold, so content is always visible
 * without JS. The breathing animation is pure CSS: 14s cycle of 4s in,
 * 4s hold, 6s out.
 */
const css = `
@media (prefers-reduced-motion: no-preference) {
  html:has(.bw-root) { scroll-behavior: smooth; }
}
.bw-motion {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .9s cubic-bezier(.22,.61,.36,1), transform .9s cubic-bezier(.22,.61,.36,1);
}
.bw-motion.bw-in { opacity: 1; transform: none; }

.bw-grade { filter: saturate(.86) sepia(.08) contrast(.98) brightness(1.02); }

@keyframes bw-breathe {
  0% { transform: scale(.84); }
  28.6% { transform: scale(1); }
  57.1% { transform: scale(1); }
  100% { transform: scale(.84); }
}
@keyframes bw-ring {
  0% { transform: scale(.9); opacity: .35; }
  28.6% { transform: scale(1.04); opacity: 1; }
  57.1% { transform: scale(1.04); opacity: 1; }
  100% { transform: scale(.9); opacity: .35; }
}
@keyframes bw-dot {
  0% { transform: scale(.55); }
  28.6% { transform: scale(1.35); }
  57.1% { transform: scale(1.35); }
  100% { transform: scale(.55); }
}
@keyframes bw-cue-in { 0%,26% { opacity: 1; transform: none; } 30%,96% { opacity: 0; transform: translateY(-6px); } 100% { opacity: 1; transform: none; } }
@keyframes bw-cue-hold { 0%,27% { opacity: 0; transform: translateY(6px); } 31%,54% { opacity: 1; transform: none; } 58%,100% { opacity: 0; transform: translateY(-6px); } }
@keyframes bw-cue-out { 0%,56% { opacity: 0; transform: translateY(6px); } 60%,95% { opacity: 1; transform: none; } 99%,100% { opacity: 0; transform: translateY(-6px); } }
.bw-breathe { animation: bw-breathe 14s cubic-bezier(.45,0,.55,1) infinite; }
.bw-breathe-ring { animation: bw-ring 14s cubic-bezier(.45,0,.55,1) infinite; }
.bw-breathe-ring.bw-delay { animation-delay: -.6s; }
.bw-breathe-dot { animation: bw-dot 14s cubic-bezier(.45,0,.55,1) infinite; }
.bw-cue { opacity: 0; }
.bw-cue-in { animation: bw-cue-in 14s linear infinite; }
.bw-cue-hold { animation: bw-cue-hold 14s linear infinite; }
.bw-cue-out { animation: bw-cue-out 14s linear infinite; }
.bw-cue-static { display: none; }
[data-paused] .bw-breathe, [data-paused] .bw-breathe-ring, [data-paused] .bw-breathe-dot,
[data-paused] .bw-cue { animation-play-state: paused; }

@keyframes bw-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.bw-rise { animation: bw-rise 1.1s cubic-bezier(.22,.61,.36,1) both; }
.bw-rise-late { animation: bw-rise 1.3s .15s cubic-bezier(.22,.61,.36,1) both; }

.bw-faq summary::-webkit-details-marker { display: none; }

.bw-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; cursor: pointer; }
.bw-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 26px; height: 26px; border-radius: 50%; background: #fffcf7; border: 6px solid #f2d6c6; box-shadow: 0 6px 16px -6px rgba(0,0,0,.6); }
.bw-range::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fffcf7; border: 5px solid #f2d6c6; }

@media (prefers-reduced-motion: reduce) {
  .bw-motion { opacity: 1; transform: none; transition: none; }
  .bw-breathe, .bw-breathe-ring, .bw-breathe-dot, .bw-rise, .bw-rise-late { animation: none; }
  .bw-cue { display: none; }
  .bw-cue-static { display: block; }
  .bw-breath-btn { display: none; }
}
`;

export default function BrightwellDemoPage() {
  return (
    <div
      className={`bw-root ${fraunces.variable} ${figtree.variable} min-h-dvh overflow-x-clip bg-[#f6f1ea] font-[family-name:var(--font-bw-body)] text-[#1c2a26] antialiased selection:bg-[#f2d6c6] selection:text-[#1c2a26]`}
    >
      <style>{css}</style>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Comforts />
        <FirstVisit />
        <Treatments />
        <Team />
        <Prices />
        <Reviews />
        <Booking />
        <Faq />
      </main>
      <SiteFooter />
      <DemoCredit />
    </div>
  );
}
