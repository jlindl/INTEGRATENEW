import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationGraph } from "@/lib/schema";
import { Footer } from "@/components/sections/Footer";
import { StickyCta } from "@/components/trades/StickyCta";
import { HomeBanner } from "@/components/black-friday/HomeBanner";
import { HomeNav } from "@/components/home/HomeNav";
import { Hero } from "@/components/home/Hero";
import { DayLedger } from "@/components/home/DayLedger";
import { Systems } from "@/components/home/Systems";
import { Trades } from "@/components/home/Trades";
import { Proof } from "@/components/home/Proof";
import { Process } from "@/components/home/Process";
import { Book } from "@/components/home/Book";
import { CONTACT } from "@/lib/film/content";
import { DEADLINE_MS, PRICE_MONTHLY, offerState } from "@/lib/blackFriday";
import "./home.css";

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

/* Re-rendered at most once a minute, so the Black Friday banner leaves the
   homepage by server time once the offer ends. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Integrate | AI automation and websites for UK trades",
  description:
    "Integrate builds AI automation, lead generation and websites for UK trades and service businesses. Missed calls answered, quotes sent, jobs booked.",
  alternates: { canonical: "/" },
  robots: isProduction ? undefined : { index: false, follow: false },
};

/**
 * The homepage: seven rooms, alternating carbon and paper, each built around
 * one real-looking product object. Copy and every fact come from
 * lib/film/content.ts (its honesty rules still apply). No pinned or
 * scroll-scrubbed scenes; the one orchestrated moment is the hero
 * conversation. Design notes, contrast figures and the review behind this
 * layout are in app/home.css and components/home/.
 */
export default function Home() {
  const blackFriday = offerState() === "live";
  return (
    <div className={`home ${frauncesItalic.variable}`}>
      <JsonLd data={organizationGraph()} />
      <HomeNav />
      <main id="main">
        <Hero announcement={blackFriday ? <HomeBanner deadline={DEADLINE_MS} price={PRICE_MONTHLY} /> : null} />
        <DayLedger />
        <Systems />
        <Trades />
        <Proof />
        <Process />
        <Book />
      </main>
      <div data-tone="light">
        <Footer />
      </div>
      <StickyCta
        href="#book-call"
        label={CONTACT.bookLabel}
        note=""
        watch={["hero-actions", "book-call"]}
        buttonClassName="bg-carbon text-ivory"
      />
    </div>
  );
}
