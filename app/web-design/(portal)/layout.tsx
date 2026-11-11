import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Cursor from "@/components/web-design-portal/cursor";
import ScrollProgress from "@/components/web-design-portal/scroll-progress";
import SmoothScroll from "@/components/web-design-portal/smooth-scroll";
import SpotlightTracker from "@/components/web-design-portal/spotlight-tracker";
import "./portal.css";

/**
 * The /web-design portal: one long, scroll-driven showcase of the work.
 *
 * It sits in its own route group so it can bring its own chrome (header,
 * footer, cursor, intro, smooth scroll), while the sector pages and pricing
 * under (hub) keep the hub layout they already have. Everything it styles is
 * scoped to `.wdp` — see portal.css.
 */

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Integrate Web Design | Websites & apps that perform",
  description:
    "We build websites and mobile apps that look sharp and actually bring in work. Live client sites and working demos. Click into any of it.",
  alternates: { canonical: "/web-design" },
  openGraph: {
    title: "Integrate Web Design | Websites & apps that perform",
    description:
      "Websites and mobile apps that look sharp and bring in work. Live client sites and working demos. Click into any of it.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrate Web Design | Websites & apps that perform",
    description:
      "Websites and mobile apps that look sharp and bring in work. Live client sites and working demos. Click into any of it.",
  },
};

export default function WebDesignPortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`wdp ${interTight.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
    >
      {/* Opening curtain. Server-rendered and animated by CSS alone
          (`.intro` in portal.css), so it plays before hydration and is gone
          for good ~1.5s in. */}
      <div aria-hidden className="intro">
        <div className="intro-panel intro-panel-ink">
          <p className="intro-mark text-white">
            {"Integrate".split("").map((char, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </p>
        </div>
        <div className="intro-panel intro-panel-neon" />
      </div>

      <ScrollProgress />
      <SpotlightTracker />
      <Cursor />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
