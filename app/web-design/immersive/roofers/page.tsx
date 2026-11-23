import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, CourseCounter, QuoteForm, RoofFinder } from "./_components/parts";
import "./roofers.css";

/**
 * Slatewell Roofing: an immersive demo homepage for a roofer.
 *
 * Concept: the roof goes on under your thumb. The signature scene lays a
 * slate roof course by course as you scroll, bottom to ridge.
 *
 * The business, its phone number, reviews and guarantees are all made up.
 * Photography is generated (public/media/demos/roofers).
 */

const display = localFont({
  src: "../../../../assets/fonts/big-shoulders-display/big-shoulders-display-100-900.woff2",
  weight: "100 900",
  variable: "--font-rf-display",
  display: "swap",
});
const body = localFont({
  src: "../../../../assets/fonts/public-sans/public-sans-100-900.woff2",
  weight: "100 900",
  variable: "--font-rf-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Slatewell Roofing | Demo roofer homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a roofing company, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 441";
const PHONE_HREF = "tel:01632960441";
const M = "/media/demos/roofers";

const ROWS = 9;
const COLS = 12;

const REPORT = [
  ["Ridge", "Sound", "ok"],
  ["Chimney flashing", "Lifting, renew", "warn"],
  ["Slates", "Six slipped", "warn"],
  ["Valley", "Clear", "ok"],
  ["Gutters", "Re-fall rear run", "warn"],
];

const STAGES = [
  ["01", "Strip and inspect", "Old slates off, every batten and rafter checked. You get photos of what we find."],
  ["02", "Felt and batten", "Breathable membrane, then treated battens gauged so every course lands true."],
  ["03", "Slate and fix", "Each slate holed, sorted by thickness and twice nailed in copper."],
];

const SERVICES = [
  {
    img: "detail.webp",
    alt: "Stepped lead flashing where a brick chimney meets a slate roof",
    kicker: "Leadwork",
    title: "Chimneys, valleys and flashings",
    body: "Most leaks start where the roof meets something else. We cut, step and dress new lead so water has nowhere to go but the gutter.",
    tags: ["Code 4 and 5 lead", "Repointing", "Valley relining"],
  },
  {
    img: "scene.webp",
    alt: "A new flat roof with a glass lantern on a brick extension",
    kicker: "Flat roofs",
    title: "Flat roofs that stay flat and dry",
    body: "Extensions, garages and dormers stripped to the deck, insulated and finished in single-ply membrane with clean metal trims.",
    tags: ["Warm roof build-up", "Roof lanterns", "New fascias"],
  },
  {
    img: "extra.webp",
    alt: "A roofer's gloved hands fixing a slate to timber battens",
    kicker: "Slate and tile",
    title: "Re-roofs and repairs",
    body: "From six slipped slates to a full strip and re-slate. Natural slate, clay and concrete tile, matched to the street you live on.",
    tags: ["Natural slate", "Clay and concrete tile", "Storm repairs"],
  },
];

const PROMISES = [
  ["Report first", "Photos of every fault, sent to your phone, before you agree to anything."],
  ["One fixed price", "A written quote for the whole job. It does not move once we start."],
  ["Tidy every day", "Scaffold boarded, skips sheeted, drive swept before we leave."],
  ["Guaranteed in writing", "New roofs carry a written guarantee, handed over with the invoice."],
];

const STEPS = [
  ["Call or message", "Tell us what the roof is doing. Photos help."],
  ["We go up", "A roofer inspects it properly, from the ridge down."],
  ["You get the report", "Faults, photos and one fixed price."],
  ["We put it right", "A date you can plan around, and a tidy site."],
];

const REVIEWS = [
  ["They found the leak two other firms missed. The photos made it obvious where the money was going.", "Homeowner, terraced house"],
  ["Whole roof stripped and re-slated in the time they said. The street has never looked at our house so much.", "Homeowner, semi-detached"],
  ["Flat roof on the extension had ponded for years. Dry ever since, and the lantern looks the part.", "Homeowner, rear extension"],
];

export default function SlatewellPage() {
  return (
    <div className={`rf ${display.variable} ${body.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="rf-header">
        <a href="#top" className="rf-logo" aria-label="Slatewell Roofing, home">
          <span className="rf-logo-mark" aria-hidden="true" />
          <span>
            Slatewell<small>Roofing</small>
          </span>
        </a>
        <nav className="rf-nav" aria-label="Main">
          <a href="#course">How we roof</a>
          <a href="#fault">Find the fault</a>
          <a href="#work">What we do</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="rf-header-phone">
          <span className="rf-mono">Call</span>
          {PHONE}
        </a>
        <a href="#quote" className="rf-btn rf-btn--orange rf-header-cta">
          Free roof report
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="rf-hero" data-scrub="exit">
          <div className="rf-hero-media" aria-hidden="true">
            <Image src={`${M}/hero.webp`} alt="" fill priority sizes="100vw" className="rf-hero-img" />
          </div>
          <div className="rf-hero-shade" aria-hidden="true" />

          <div className="rf-wrap rf-hero-grid">
            <div className="rf-hero-copy">
              <p className="rf-mono rf-hero-kicker">
                <span className="rf-dot" /> Slate · Tile · Flat roofs · Leadwork
              </p>
              <h1 className="rf-h1">
                Roofs that
                <br />
                outlast <em>the weather.</em>
              </h1>
              <p className="rf-hero-sub">
                Time-served roofers for slate, tile and flat roofs. We go up, photograph every fault, and send you a
                straight report before you spend a penny.
              </p>
              <div className="rf-hero-actions">
                <a href="#quote" className="rf-btn rf-btn--orange rf-btn--lg">
                  Get a free roof report
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="rf-btn rf-btn--ghost rf-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="rf-hero-chips">
                <li>Storm damage made safe same day</li>
                <li>Written guarantee</li>
                <li>Fixed prices</li>
              </ul>
            </div>

            {/* A sample of the report every customer gets. */}
            <aside className="rf-report" aria-label="Sample roof report">
              <div className="rf-report-head">
                <p className="rf-mono">Roof report · sample</p>
                <span className="rf-report-photos">12 photos</span>
              </div>
              <ul className="rf-report-rows">
                {REPORT.map(([part, note, state]) => (
                  <li key={part}>
                    <span className={`rf-state rf-state--${state}`} aria-hidden="true" />
                    <span className="rf-report-part">{part}</span>
                    <span className="rf-report-note">{note}</span>
                  </li>
                ))}
              </ul>
              <div className="rf-report-foot">
                <span className="rf-mono">Fixed price to put right</span>
                <span className="rf-report-price">In writing</span>
              </div>
            </aside>
          </div>

          <p className="rf-hero-ticker rf-mono" aria-hidden="true">
            <span>Scroll</span>
            <i />
            <span>Watch a roof go on</span>
          </p>
        </section>

        {/* ----------------------------------------- Signature: course by course */}
        <section
          id="course"
          className="rf-course imm-pin"
          data-scrub="pin"
          data-steps="3"
          data-loop
          style={{ "--pin": 2.5, "--rows": ROWS } as CSSProperties}
        >
          <div className="imm-stage rf-course-stage">
            <div className="rf-wrap rf-course-grid">
              <div className="rf-course-copy">
                <p className="rf-mono rf-kicker">How a Slatewell roof goes on</p>
                <h2 className="rf-h2">
                  Course by <em>course.</em>
                </h2>
                <ol className="rf-stages">
                  {STAGES.map(([n, title, text]) => (
                    <li key={n} className="rf-stage-item">
                      <span className="rf-mono">{n}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <a href="#quote" className="rf-btn rf-btn--orange">
                  Price my roof
                  <Arrow />
                </a>
              </div>

              <div className="rf-roof-wrap" aria-hidden="true">
                <CourseCounter total={ROWS} />
                <div className="rf-roof">
                  <div className="rf-ridge" />
                  {Array.from({ length: ROWS }, (_, r) => (
                    <div key={r} className="rf-row" style={{ "--i": ROWS - 1 - r } as CSSProperties}>
                      {Array.from({ length: COLS }, (_, c) => (
                        <span key={c} className="rf-slate" style={{ "--c": c } as CSSProperties} />
                      ))}
                    </div>
                  ))}
                  <div className="rf-eaves" />
                </div>
                <p className="rf-mono rf-roof-note">Natural slate · copper nails · 75mm headlap</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Find the fault */}
        <section id="fault" className="rf-section rf-section--paper">
          <div className="rf-wrap">
            <header className="rf-head" data-reveal>
              <p className="rf-mono rf-kicker">Find the fault</p>
              <h2 className="rf-h2">
                Where is it <em>coming in?</em>
              </h2>
              <p className="rf-lead">
                Tap the part of the roof you are worried about. This is what we look for up there, and what it takes to
                put right.
              </p>
            </header>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <RoofFinder />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Services */}
        <section id="work" className="rf-section rf-section--slate">
          <div className="rf-wrap">
            <header className="rf-head rf-head--row" data-reveal>
              <div>
                <p className="rf-mono rf-kicker">What we do</p>
                <h2 className="rf-h2">
                  Every kind of roof, <em>done once.</em>
                </h2>
              </div>
              <a href="#quote" className="rf-btn rf-btn--ghost">
                Book an inspection
                <Arrow />
              </a>
            </header>
            <div className="rf-cards">
              {SERVICES.map((s, i) => (
                <article key={s.title} className="rf-card" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <div className="rf-card-img">
                    <Image src={`${M}/${s.img}`} alt={s.alt} fill sizes="(min-width: 1024px) 400px, 92vw" />
                    <span className="rf-mono rf-card-n">0{i + 1}</span>
                  </div>
                  <div className="rf-card-body">
                    <p className="rf-mono rf-kicker">{s.kicker}</p>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <ul className="rf-tags">
                      {s.tags.map((t) => (
                        <li key={t} className="rf-tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Promises */}
        <section className="rf-section rf-section--deep">
          <div className="rf-wrap rf-promise-grid">
            <header className="rf-head" data-reveal>
              <p className="rf-mono rf-kicker">The Slatewell way</p>
              <h2 className="rf-h2">
                No surprises <em>on the scaffold.</em>
              </h2>
            </header>
            <ul className="rf-promises">
              {PROMISES.map(([title, text], i) => (
                <li key={title} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                  <span className="rf-mono">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rf-wrap">
            <ol className="rf-steps" data-scrub="enter">
              <li className="rf-steps-line" aria-hidden="true" />
              {STEPS.map(([title, text], i) => (
                <li key={title} className="rf-step" style={{ "--i": i } as CSSProperties}>
                  <span className="rf-step-n">{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="rf-section rf-section--paper">
          <div className="rf-wrap">
            <header className="rf-head" data-reveal>
              <p className="rf-mono rf-kicker">Sample reviews · this is a demo</p>
              <h2 className="rf-h2">
                What people say <em>once it rains.</em>
              </h2>
            </header>
            <ul className="rf-reviews">
              {REVIEWS.map(([quote, who], i) => (
                <li key={who} className="rf-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <span className="rf-stars" aria-label="Five stars">
                    ★★★★★
                  </span>
                  <blockquote>{quote}</blockquote>
                  <p className="rf-mono">{who}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Quote */}
        <section id="quote" className="rf-quote">
          <div className="rf-quote-media" aria-hidden="true">
            <Image src={`${M}/hero.webp`} alt="" fill sizes="100vw" className="rf-hero-img" />
          </div>
          <div className="rf-wrap rf-quote-grid">
            <div className="rf-quote-copy">
              <p className="rf-mono rf-kicker">Free roof report</p>
              <h2 className="rf-h1 rf-quote-title">
                Find out what is <em>up there.</em>
              </h2>
              <p className="rf-hero-sub">
                A roofer inspects it, photographs every fault and sends you one fixed price. No charge, and no pressure
                to go ahead.
              </p>
              <a href={PHONE_HREF} className="rf-quote-phone">
                <span className="rf-mono">Or call the yard</span>
                {PHONE}
              </a>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="rf-footer">
        <div className="rf-wrap rf-footer-grid">
          <p className="rf-logo">
            <span className="rf-logo-mark" aria-hidden="true" />
            <span>
              Slatewell<small>Roofing</small>
            </span>
          </p>
          <p className="rf-footer-note">
            Slatewell Roofing is a fictional business. This page is a demo by Integrate Web Design, made to show the
            kind of homepage we build for roofers.
          </p>
          <a href="/web-design#immersive" className="rf-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="rf-bar">
        <a href="#quote" className="rf-btn rf-btn--orange">
          Free roof report
        </a>
        <a href={PHONE_HREF} className="rf-btn rf-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
