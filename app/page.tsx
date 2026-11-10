import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationGraph } from "@/lib/schema";
import { Footer } from "@/components/sections/Footer";
import { FilmNav } from "@/components/film/FilmNav";
import { FilmDirector } from "@/components/film/FilmDirector";
import { FilmStickyCta } from "@/components/film/FilmStickyCta";
import { Hero, Noise, Turn } from "@/components/film/ActOne";
import { System, Trades } from "@/components/film/ActTwo";
import { Proof, Process, Payoff } from "@/components/film/ActThree";
import "./film.css";

/* Headlines are Instrument Sans (loaded by the root layout). Their one accent
   word is Fraunces italic at a single setting (opsz 90, weight 400), so the
   homepage gets a 15 kB static instance of it, subset to basic Latin, instead
   of the 149 kB variable italic file. */
const frauncesItalic = localFont({
  src: "../assets/fonts/fraunces/fraunces-film-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-fraunces-film-italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/* Indexing is only allowed on the production deployment. Local, preview and
   staging builds stay out of search. */
const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: "Integrate | AI automation and websites for UK trades",
  description:
    "Integrate builds AI automation, lead generation and websites for UK trades and service businesses. Missed calls answered, quotes sent, jobs booked.",
  alternates: { canonical: "/" },
  robots: isProduction ? undefined : { index: false, follow: false },
};

/**
 * The homepage is one film in eight beats (see direction.md). Each beat is a
 * server component that renders its finished state; FilmDirector adds the
 * scroll choreography after first paint. The running order lives here.
 */
export default function Home() {
  return (
    <div className={`film ${frauncesItalic.variable}`}>
      <JsonLd data={organizationGraph()} />
      <FilmNav />
      <main id="main">
        <Hero />
        <Noise />
        <Turn />
        <System />
        <Trades />
        <Proof />
        <Process />
        <Payoff />
      </main>
      <div className="film-footer" data-tone="light">
        <Footer />
      </div>
      <FilmStickyCta />
      <FilmDirector />
    </div>
  );
}
