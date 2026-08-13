import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Editorial display face — variable, with optical sizing (opsz/SOFT/WONK) */
const fraunces = localFont({
  src: [
    { path: "../assets/fonts/fraunces/fraunces-100-900.woff2", weight: "100 900", style: "normal" },
    { path: "../assets/fonts/fraunces/fraunces-100-900-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

/* Clean, highly legible body face */
const instrument = localFont({
  src: [
    { path: "../assets/fonts/instrument-sans/instrument-sans-400-700.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

/* Engineered mono for labels, numbers, system readouts */
const plexMono = localFont({
  src: [
    { path: "../assets/fonts/ibm-plex-mono/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ibm-plex-mono/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Integrate — The strategic AI partner for high-growth B2B",
  description:
    "We design, deploy, and manage bespoke AI systems — automating revenue operations so your team can focus on what only humans can do.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-2.5 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        {/* Film grain over everything — gives the light theme physical texture */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
