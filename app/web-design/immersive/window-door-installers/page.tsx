import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { DiagramFit, DiagramMade, DiagramMeasure } from "./_components/diagrams";
import { Arrow, ComfortBoard, OpeningReadout, StylePicker, SurveyCard, SurveyForm } from "./_components/parts";
import "./window-door-installers.css";

/**
 * Clearline Windows & Doors: an immersive demo homepage for a window and
 * door installer.
 *
 * Concept: the page opens. The signature scene is a set of four bifold door
 * panels that fold back to the sides as you scroll and let the garden in.
 *
 * The business, its phone number, reviews and guarantees are all made up.
 * Photography is generated (public/media/demos/window-door-installers).
 */

const archivo = localFont({
  src: "../../../../assets/fonts/archivo/archivo-wdth-100-900.woff2",
  weight: "100 900",
  variable: "--font-cw",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  title: "Clearline Windows & Doors | Demo window and door installer homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a window and door installer, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 518";
const PHONE_HREF = "tel:01632960518";
const M = "/media/demos/window-door-installers";

const TICKS = ["Made to measure", "Fitted by our own teams", "Ten year written guarantee"];

const OPEN_SPEC = [
  ["Fold", "2 + 2, opening outward"],
  ["Clear opening", "3.22 m of 3.60 m"],
  ["Threshold", "Low, level with the floor"],
  ["Glass", "Toughened, double glazed"],
];

const PRODUCTS = [
  {
    img: "detail.webp",
    alt: "Anthracite aluminium bifold doors folded half open on a brick extension, with a kitchen and dining table inside",
    sizes: "(min-width: 1024px) 56vw, 92vw",
    kicker: "Bifold and sliding doors",
    title: "The back wall, on rollers.",
    body: "Slim aluminium bifolds and sliders for new extensions and tired patio openings. Low thresholds, smooth running gear and panels that stack right out of the way.",
    rows: [
      ["Frames", "Slim aluminium"],
      ["Threshold", "Low or level"],
      ["Panels", "Two to seven"],
    ],
    note: "Fitted · four-panel bifold",
  },
  {
    img: "scene.webp",
    alt: "Two white sliding sash windows with stone lintels in a red brick Victorian house front",
    sizes: "(min-width: 1024px) 38vw, 92vw",
    kicker: "Windows",
    title: "Sash, casement, tilt and turn.",
    body: "Like-for-like replacements for period fronts and clean modern frames for everything else. Sightlines and glazing bars are matched to the house, not to a catalogue.",
    rows: [
      ["Styles", "Sash, casement, tilt-and-turn"],
      ["Frames", "Timber, aluminium, uPVC"],
      ["Glazing", "Double or triple"],
    ],
    note: "Fitted · two-over-two sashes",
  },
  {
    img: "extra.webp",
    alt: "A sage green composite front door with a long steel handle and a glazed side panel under an oak porch",
    sizes: "(min-width: 1024px) 30vw, 92vw",
    kicker: "Front and back doors",
    title: "A front door that shuts with a thud.",
    body: "Composite and aluminium doors hung square in a new frame, with multi-point locking and a threshold that keeps the weather on the outside.",
    rows: [
      ["Build", "Solid core composite"],
      ["Locking", "Multi-point"],
      ["Colour", "Any, inside and out"],
    ],
    note: "Fitted · composite door and side panel",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Measured",
    when: "Day one · about 45 minutes",
    body: "A surveyor, not a salesman, measures every opening in three places and checks it for square. You get one fixed price in writing.",
    points: ["Every opening measured", "Lintels and sills checked", "Price fixed within two working days"],
    diagram: <DiagramMeasure />,
  },
  {
    n: "02",
    title: "Made",
    when: "Three to five weeks",
    body: "Your frames are made to those sizes, glazed and checked before they leave the workshop. We ring with a fitting date as soon as they are booked in.",
    points: ["Made to the millimetre", "Glazed and checked in the workshop", "A fitting date you can plan around"],
    diagram: <DiagramMade />,
  },
  {
    n: "03",
    title: "Fitted",
    when: "Most homes · one to three days",
    body: "Our own fitters take the old frames out, then pack, level and seal the new ones. Every scrap goes away with us and you sign it off room by room.",
    points: ["Dust sheets down in every room", "Sealed inside and out", "Old frames taken away"],
    diagram: <DiagramFit />,
  },
];

const REVIEWS = [
  {
    quote:
      "The surveyor measured everything twice and the price never moved. The fitters were in and out in two days and hoovered on the way.",
    who: "Homeowner, 1930s semi",
    job: "Nine casement windows",
    frames: "White uPVC",
    took: "Two days",
  },
  {
    quote:
      "We opened the bifolds on the first warm Saturday and have barely shut them since. The kitchen feels twice the size.",
    who: "Homeowner, rear extension",
    job: "Four-panel bifold",
    frames: "Anthracite aluminium",
    took: "One day",
  },
  {
    quote:
      "The new sashes look exactly like the old ones, but the front room is quiet and the curtains have stopped moving.",
    who: "Homeowner, Victorian terrace",
    job: "Six sash windows",
    frames: "Painted timber",
    took: "Three days",
  },
];

const NEXT = [
  ["We ring to agree a time", "Evenings and Saturdays are fine."],
  ["A surveyor measures up", "And talks through styles, glass and colours."],
  ["You get one fixed price", "In writing. No follow-up calls unless you ask."],
];

export default function ClearlinePage() {
  return (
    <div className={`cw ${archivo.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="cw-header">
        <a href="#top" className="cw-logo" aria-label="Clearline Windows and Doors, home">
          <span className="cw-logo-mark" aria-hidden="true" />
          <span className="cw-logo-text">
            Clearline<small>Windows &amp; Doors</small>
          </span>
        </a>
        <nav className="cw-nav" aria-label="Main">
          <a href="#open">Bifolds</a>
          <a href="#styles">Styles</a>
          <a href="#products">What we fit</a>
          <a href="#process">How it works</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="cw-header-phone">
          <span className="cw-mono">Call the showroom</span>
          {PHONE}
        </a>
        <a href="#survey" className="cw-btn cw-btn--sun cw-header-cta">
          <span className="cw-cta-long">Book a free survey</span>
          <span className="cw-cta-short">Free survey</span>
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="cw-hero" data-scrub="exit" data-loop>
          <div className="cw-wrap cw-hero-grid">
            <div className="cw-hero-copy">
              <p className="cw-mono cw-hero-kicker">
                <span className="cw-live" aria-hidden="true" />
                Windows · Doors · Bifolds
              </p>
              <h1 className="cw-h1">
                Let the <em>light</em> in.
              </h1>
              <p className="cw-hero-sub">
                Clearline makes and fits windows, doors and bifolds to the millimetre. One survey, one fixed price,
                fitted by our own teams.
              </p>
              <div className="cw-hero-actions">
                <a href="#survey" className="cw-btn cw-btn--sun cw-btn--lg">
                  Book a free survey
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="cw-btn cw-btn--line cw-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="cw-hero-ticks">
                {TICKS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Tall glass panels: one holds the photograph, two are plain glass. */}
            <div className="cw-hero-glass">
              <div className="cw-panes">
                <span className="cw-sun" aria-hidden="true" />
                <div className="cw-pane cw-pane--a" aria-hidden="true">
                  <i className="cw-pane-pull" />
                  <span className="cw-pane-etch">Toughened</span>
                </div>
                <figure className="cw-pane cw-pane--photo">
                  <Image
                    src={`${M}/detail.webp`}
                    alt="Anthracite bifold doors folded back on a brick extension, opening a kitchen to the patio"
                    fill
                    priority
                    sizes="(min-width: 1024px) 32vw, 70vw"
                  />
                  <figcaption className="cw-mono cw-pane-tag">Fitted · four-panel bifold</figcaption>
                </figure>
                <div className="cw-pane cw-pane--c" aria-hidden="true" />
              </div>
              <SurveyCard />
            </div>
          </div>
          <p className="cw-hero-hint cw-mono" aria-hidden="true">
            <span>Scroll</span>
            <i />
            <span>The doors open</span>
          </p>
        </section>

        {/* ------------------------------------------------- Signature: open up */}
        <section id="open" className="cw-open imm-pin" data-scrub="pin" style={{ "--pin": 2.4 } as CSSProperties}>
          <div className="imm-stage cw-open-stage">
            <div className="cw-open-top">
              <p className="cw-mono cw-open-kicker">
                <span className="cw-idx">02</span>
                Open up
                <span className="cw-open-hint"> · keep scrolling, the doors fold back</span>
              </p>
              <p className="cw-mono cw-open-state" aria-hidden="true">
                <i />
                <span data-s="closed">Closed</span>
                <span data-s="folding">Folding</span>
                <span data-s="open">Open</span>
              </p>
            </div>

            <div className="cw-open-scene" aria-hidden="true">
              {/* A dimension string above the head: it grows with the opening. */}
              <div className="cw-dim">
                <i className="cw-dim-arm cw-dim-arm--l" />
                <i className="cw-dim-tick cw-dim-tick--l" />
                <i className="cw-dim-arm cw-dim-arm--r" />
                <i className="cw-dim-tick cw-dim-tick--r" />
                <span className="cw-mono cw-dim-label">
                  Clear opening
                  <b>
                    <OpeningReadout /> m
                  </b>
                </span>
              </div>

              <div className="cw-aperture">
                <div className="cw-view">
                  <Image src={`${M}/hero.webp`} alt="" fill sizes="100vw" />
                </div>
                <div className="cw-doors">
                  <div className="cw-leaf cw-leaf--l">
                    <div className="cw-face" />
                    <div className="cw-leaf cw-leaf--l2">
                      <div className="cw-face">
                        <i className="cw-lever" />
                      </div>
                    </div>
                  </div>
                  <div className="cw-leaf cw-leaf--r">
                    <div className="cw-face" />
                    <div className="cw-leaf cw-leaf--r2">
                      <div className="cw-face">
                        <i className="cw-lever" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cw-floor">
                <i className="cw-sunpool" />
              </div>
            </div>

            <div className="cw-open-card">
              <div className="cw-open-card-head">
                <p className="cw-mono cw-kicker">Bifold doors</p>
                <h2 className="cw-h2 cw-open-title">
                  Open up the back of the <em>house.</em>
                </h2>
              </div>
              <div className="cw-open-card-mid">
                <p>Four panels fold back on a low threshold, and the garden becomes part of the room.</p>
                <a href="#survey" className="cw-btn cw-btn--sun">
                  Book a free survey
                  <Arrow />
                </a>
              </div>
              <dl className="cw-open-spec">
                {OPEN_SPEC.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="cw-mono cw-open-foot" aria-hidden="true">
              Four-panel bifold · 2 + 2
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- Style picker */}
        <section id="styles" className="cw-section cw-section--glass">
          <div className="cw-wrap">
            <header className="cw-head" data-reveal>
              <p className="cw-mono cw-kicker">
                <span className="cw-idx">03</span>
                Pick a style
              </p>
              <h2 className="cw-h2">
                Four ways to fill <em>an opening.</em>
              </h2>
              <p className="cw-lead">
                Choose a style, open it, and try it in four frame colours. Whichever you pick is made to the sizes of
                your house.
              </p>
            </header>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <StylePicker />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Products */}
        <section id="products" className="cw-section cw-section--day">
          <div className="cw-wrap">
            <header className="cw-head cw-head--row" data-reveal>
              <div>
                <p className="cw-mono cw-kicker">
                  <span className="cw-idx">04</span>
                  What we fit
                </p>
                <h2 className="cw-h2">
                  Made for the house <em>you have.</em>
                </h2>
              </div>
              <a href="#survey" className="cw-btn cw-btn--line">
                Book a free survey
                <Arrow />
              </a>
            </header>
            <div className="cw-products">
              {PRODUCTS.map((p, i) => (
                <article
                  key={p.kicker}
                  className={`cw-product cw-product--${i + 1}`}
                  data-reveal
                  style={{ "--d": `${i * 110}ms` } as CSSProperties}
                >
                  <div className="cw-product-img">
                    <Image src={`${M}/${p.img}`} alt={p.alt} fill sizes={p.sizes} />
                    <span className="cw-mono cw-product-n">0{i + 1}</span>
                    <span className="cw-mono cw-product-note">{p.note}</span>
                  </div>
                  <div className="cw-product-body">
                    <p className="cw-mono cw-kicker">{p.kicker}</p>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <dl className="cw-rows">
                      {p.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Process */}
        <section id="process" className="cw-section cw-section--anth">
          <div className="cw-wrap">
            <header className="cw-head" data-reveal>
              <p className="cw-mono cw-kicker">
                <span className="cw-idx">05</span>
                How it works
              </p>
              <h2 className="cw-h2">
                Measured. Made. <em>Fitted.</em>
              </h2>
              <p className="cw-lead">
                Three visits to your house at most, and one team from the tape measure to the last bead of sealant.
              </p>
            </header>
            <ol className="cw-steps" data-scrub="enter">
              <li className="cw-steps-rule" aria-hidden="true">
                <i />
              </li>
              {STEPS.map((s, i) => (
                <li key={s.n} className="cw-step" style={{ "--i": i } as CSSProperties}>
                  <p className="cw-mono cw-step-when">
                    <span className="cw-step-dot" aria-hidden="true" />
                    {s.when}
                  </p>
                  <div className="cw-step-pane">
                    <div className="cw-step-diagram" aria-hidden="true">
                      {s.diagram}
                    </div>
                    <div className="cw-step-body">
                      <h3>
                        <span className="cw-mono">{s.n}</span>
                        {s.title}
                      </h3>
                      <p>{s.body}</p>
                      <ul>
                        {s.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="cw-process-foot">
              <p>One survey covers the whole house, and the price on the quote is the price on the invoice.</p>
              <a href="#survey" className="cw-btn cw-btn--sun">
                Book a free survey
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Comfort */}
        <section id="comfort" className="cw-section cw-section--day cw-comfort-sec" data-loop>
          <div className="cw-wrap">
            <header className="cw-head" data-reveal>
              <p className="cw-mono cw-kicker">
                <span className="cw-idx">06</span>
                Comfort
              </p>
              <h2 className="cw-h2">
                What good windows <em>actually do.</em>
              </h2>
              <p className="cw-lead">
                No ratings to decode. Here is what goes wrong with an old frame, and what a new one does about it.
              </p>
            </header>
            <ComfortBoard />
          </div>
        </section>

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="cw-section cw-section--glass">
          <div className="cw-wrap">
            <header className="cw-head" data-reveal>
              <p className="cw-mono cw-kicker">
                <span className="cw-idx">07</span>
                Sample reviews · this is a demo
              </p>
              <h2 className="cw-h2">
                What people say after <em>the first winter.</em>
              </h2>
            </header>
            <ul className="cw-reviews">
              {REVIEWS.map((r, i) => (
                <li key={r.job} className="cw-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <div className="cw-review-top">
                    <span className="cw-stars" role="img" aria-label="Five stars">
                      ★★★★★
                    </span>
                    <span className="cw-mono">Sample</span>
                  </div>
                  <blockquote>{r.quote}</blockquote>
                  <p className="cw-review-who">{r.who}</p>
                  <dl className="cw-rows">
                    <div>
                      <dt>Job</dt>
                      <dd>{r.job}</dd>
                    </div>
                    <div>
                      <dt>Frames</dt>
                      <dd>{r.frames}</dd>
                    </div>
                    <div>
                      <dt>Fitted in</dt>
                      <dd>{r.took}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------------- Survey */}
        <section id="survey" className="cw-survey">
          <span className="cw-survey-sun" aria-hidden="true" />
          <div className="cw-wrap cw-survey-grid">
            <div className="cw-survey-copy">
              <p className="cw-mono cw-kicker">
                <span className="cw-idx">08</span>
                Free survey · no obligation
              </p>
              <h2 className="cw-h1 cw-survey-title">
                Book a free <em>survey.</em>
              </h2>
              <p className="cw-survey-sub">
                Forty-five minutes at your house, every opening measured, and one fixed price in writing. No deposit to
                book and no pressure to go ahead.
              </p>
              <ol className="cw-next">
                {NEXT.map(([title, text], i) => (
                  <li key={title}>
                    <span className="cw-mono">0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={PHONE_HREF} className="cw-survey-phone">
                <span className="cw-mono">Or call the showroom</span>
                {PHONE}
              </a>
            </div>
            <SurveyForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="cw-footer">
        <div className="cw-wrap cw-footer-grid">
          <p className="cw-logo">
            <span className="cw-logo-mark" aria-hidden="true" />
            <span className="cw-logo-text">
              Clearline<small>Windows &amp; Doors</small>
            </span>
          </p>
          <p className="cw-footer-note">
            Clearline Windows &amp; Doors is a fictional business. This page is a demo by Integrate Web Design, made to
            show the kind of homepage we build for window and door installers.
          </p>
          <a href="/web-design#immersive" className="cw-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="cw-bar">
        <a href="#survey" className="cw-btn cw-btn--sun">
          Book a free survey
        </a>
        <a href={PHONE_HREF} className="cw-btn cw-btn--line" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
