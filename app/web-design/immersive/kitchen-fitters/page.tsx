import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, Tick } from "./_components/bits";
import { MeasureUp } from "./_components/MeasureUp";
import { Specifier } from "./_components/Specifier";
import { VisitForm } from "./_components/VisitForm";
import "./kitchen-fitters.css";

/**
 * Marlowe Kitchens: an immersive demo homepage for a kitchen fitter.
 *
 * Concept: your kitchen, specified as you scroll. The signature scene is a
 * kitchen elevation whose doors, worktop and handles change finish under your
 * thumb, with a spec sheet that keeps up and swatches you can tap.
 *
 * The business, its phone number, reviews and promises are all made up.
 * Photography is generated (public/media/demos/kitchen-fitters).
 */

const sans = localFont({
  src: "../../../../assets/fonts/manrope/manrope-200-800.woff2",
  weight: "200 800",
  variable: "--font-mk-sans",
  display: "swap",
});
const serif = localFont({
  src: "../../../../assets/fonts/newsreader/newsreader-200-800-italic.woff2",
  weight: "200 800",
  style: "italic",
  variable: "--font-mk-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marlowe Kitchens | Demo kitchen fitter homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a kitchen design and fitting company, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 482";
const PHONE_HREF = "tel:01632960482";
const M = "/media/demos/kitchen-fitters";

const STEPS = [
  ["Measure", "A designer visits, measures every wall and asks how you actually cook.", "90 minutes, free"],
  ["Draw", "Plans, elevations and one fixed price, in writing.", "Within a week"],
  ["Build", "Your cabinets are made to the drawings while you carry on as normal.", "Four to six weeks"],
  ["Fit", "One team strips out, fits, plumbs and wires. You get an update every evening.", "7 to 12 working days"],
  ["Tea", "Snag list at zero, handover pack on the worktop, kettle on.", "Day one of many"],
];

const DRAWER_PINS = [
  { x: 47, y: 61, title: "Dovetailed oak drawer boxes", text: "Jointed, glued and oiled. No staples, no chipboard." },
  { x: 40, y: 29, title: "Inserts made to the drawer", text: "Cut to the box, so nothing slides when it shuts." },
  { x: 76, y: 55, title: "Solid brass cup handles", text: "Bolted through the front, not screwed into it." },
];

const TOP_PINS = [
  { x: 71, y: 27, title: "Tap matched to your handles", text: "Same finish, ordered together, fitted on the day." },
  { x: 36, y: 50, title: "Undermount sink, polished cut-out", text: "Sealed from below, so water has no edge to sit on." },
  { x: 52, y: 79, title: "Worktops templated on site", text: "Measured once the cabinets are in, cut to the wall you have." },
];

const FIT_CHECK = [
  ["Cabinets level", "Within 1 mm"],
  ["Door gaps", "2 mm, even"],
  ["End panels", "Scribed to the wall"],
  ["Sealant", "One bead, tooled"],
  ["Drawers", "Soft close, set by hand"],
];

const SCHEDULE: { group: string; rows: [string, string, string][] }[] = [
  {
    group: "Design",
    rows: [
      ["A1", "Design visit and full survey", "Designer"],
      ["A2", "Plans, elevations and 3D views", "Designer"],
    ],
  },
  {
    group: "Before we fit",
    rows: [
      ["B1", "Strip-out and disposal of the old kitchen", "Fitters"],
      ["B2", "First-fix plumbing and electrics", "Plumber, electrician"],
      ["B3", "Walls patched and made good", "Plasterer"],
    ],
  },
  {
    group: "Fitting",
    rows: [
      ["C1", "Cabinets built, levelled and fixed", "Fitters"],
      ["C2", "Worktops templated and fitted", "Fitters"],
      ["C3", "Splashback and tiling", "Tiler"],
      ["C4", "Appliances connected and tested", "Electrician"],
    ],
  },
  {
    group: "After",
    rows: [
      ["D1", "Final clean and handover pack", "Fitters"],
      ["D2", "Check visit after twelve months", "Designer"],
    ],
  },
];

const FIGURES = [
  ["1", "team", "Designer, fitters and trades, all ours to manage."],
  ["1", "price", "Fixed in writing before anything is ordered."],
  ["10", "years", "Written guarantee on every cabinet we build."],
];

const REVIEWS: { quote: string; who: string; job: string; spec: [string, string, string][] }[] = [
  {
    quote: "They measured twice, drew it three ways and fitted it in nine days. Not one surprise on the invoice.",
    who: "Homeowner, L-shaped kitchen",
    job: "9 days on site",
    spec: [
      ["Doors", "sage", "Sage"],
      ["Worktop", "quartz", "White quartz"],
      ["Handles", "cup", "Brass cup"],
    ],
  },
  {
    quote: "The fitter scribed the end panel to a wall that is nowhere near straight. You would never know.",
    who: "Homeowner, galley kitchen",
    job: "7 days on site",
    spec: [
      ["Doors", "navy", "Inky navy"],
      ["Worktop", "block", "Oak block"],
      ["Handles", "bar", "Black bar"],
    ],
  },
  {
    quote: "We kept our range cooker and the layout. They worked round both and it still feels like a new room.",
    who: "Homeowner, kitchen-diner",
    job: "Layout kept",
    spec: [
      ["Doors", "oak", "Natural oak"],
      ["Worktop", "concrete", "Concrete grey"],
      ["Handles", "none", "Handleless"],
    ],
  },
];

/** One line drawing per step of the process. */
function StepIcon({ step }: { step: number }) {
  const common = {
    viewBox: "0 0 32 32",
    width: 30,
    height: 30,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (step === 0)
    return (
      <svg {...common}>
        <rect x="3" y="11" width="26" height="10" rx="1.5" />
        <path d="M8 11v4M12.5 11v6M17 11v4M21.5 11v6M26 11v4" />
      </svg>
    );
  if (step === 1)
    return (
      <svg {...common}>
        <path d="M6 4h14l6 6v18H6z" />
        <path d="M20 4v6h6M10 15h9v9h-9zM10 19h4" />
      </svg>
    );
  if (step === 2)
    return (
      <svg {...common}>
        <rect x="5" y="5" width="22" height="20" rx="1" />
        <path d="M16 5v20M5 25v3M27 25v3M13 14v3M19 14v3" />
      </svg>
    );
  if (step === 3)
    return (
      <svg {...common}>
        <rect x="2.5" y="12" width="27" height="8" rx="2" />
        <rect x="12.5" y="14" width="7" height="4" rx="2" />
        <path d="M6 16h3M23 16h3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6 14h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6zM21 16h2.5a3 3 0 0 1 0 6H21" />
      <path className="mk-steam mk-steam--1" d="M10.5 10c-1.2-1.6 1.2-2.6 0-4.4" />
      <path className="mk-steam mk-steam--2" d="M16 10c-1.2-1.6 1.2-2.6 0-4.4" />
    </svg>
  );
}

function Legend({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="mk-legend">
      {items.map((item, i) => (
        <li key={item.title}>
          <span className="mk-legend-n">{i + 1}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Pins({ items }: { items: { x: number; y: number }[] }) {
  return (
    <>
      {items.map((pin, i) => (
        <span key={i} className="mk-shot-pin" style={{ left: `${pin.x}%`, top: `${pin.y}%` }} aria-hidden="true">
          {i + 1}
        </span>
      ))}
    </>
  );
}

function Logo() {
  return (
    <>
      <span className="mk-logo-mark" aria-hidden="true" />
      <span className="mk-logo-text">
        Marlowe <em>kitchens</em>
      </span>
    </>
  );
}

export default function MarlowePage() {
  return (
    <div className={`mk ${sans.variable} ${serif.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="mk-header">
        <a href="#top" className="mk-logo" aria-label="Marlowe Kitchens, home">
          <Logo />
        </a>
        <nav className="mk-nav" aria-label="Main">
          <a href="#specify">Specify</a>
          <a href="#measure">Measure up</a>
          <a href="#process">How it goes</a>
          <a href="#details">Details</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="mk-header-phone">
          <span className="mk-mono">Studio</span>
          {PHONE}
        </a>
        <a href="#visit" className="mk-btn mk-btn--brass mk-header-cta">
          <span>
            Book a <span className="mk-wide">design </span>visit
          </span>
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="mk-hero" data-scrub="exit">
          <div className="mk-wrap mk-hero-grid">
            <div className="mk-hero-copy">
              <p className="mk-mono mk-kicker">
                <span className="mk-kicker-mark" aria-hidden="true" />
                Kitchen design · Supply · Fitting
              </p>
              <h1 className="mk-h1">
                Your kitchen, <em>specified</em> to the last handle.
              </h1>
              <p className="mk-hero-sub">
                Marlowe designs, builds and fits kitchens across the county. One team measures, draws and installs, for
                one fixed price in writing.
              </p>
              <div className="mk-hero-actions">
                <a href="#visit" className="mk-btn mk-btn--brass mk-btn--lg">
                  Book a design visit
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="mk-btn mk-btn--ghost mk-btn--lg mk-hero-call">
                  Call {PHONE}
                </a>
              </div>
            </div>

            <div className="mk-hero-vis">
              <div className="mk-hero-photo">
                <Image
                  src={`${M}/hero.webp`}
                  alt="A sage green shaker kitchen with white quartz worktops, brass handles and an island with two oak stools"
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 100vw"
                />
              </div>
              <p className="mk-hero-tag mk-mono">
                Kitchen 214<span className="mk-wide"> · Shaker with island</span>
              </p>
              <div className="mk-level" aria-hidden="true">
                <span className="mk-level-vial">
                  <i />
                </span>
                <span className="mk-mono">Level 0.0°</span>
              </div>

              {/* The samples this kitchen was specified from. */}
              <ul className="mk-samples" aria-label="Samples from this kitchen">
                <li className="mk-sample mk-sample--1">
                  <div className="mk-sample-in">
                    <span className="mk-sample-obj mk-so-door" aria-hidden="true">
                      <i />
                    </span>
                    <span className="mk-mono mk-sample-code">D-01 · Door</span>
                    <span className="mk-sample-name">Sage, satin</span>
                  </div>
                </li>
                <li className="mk-sample mk-sample--2">
                  <div className="mk-sample-in">
                    <span className="mk-sample-obj mk-so-top" aria-hidden="true">
                      <i />
                    </span>
                    <span className="mk-mono mk-sample-code">W-01 · Worktop</span>
                    <span className="mk-sample-name">White quartz</span>
                  </div>
                </li>
                <li className="mk-sample mk-sample--3">
                  <div className="mk-sample-in">
                    <span className="mk-sample-obj mk-so-cup" aria-hidden="true">
                      <i />
                    </span>
                    <span className="mk-mono mk-sample-code">H-01 · Handle</span>
                    <span className="mk-sample-name">Brass cup</span>
                  </div>
                </li>
              </ul>

              <p className="mk-hero-dim mk-mono" aria-hidden="true">
                <span>4,200 mm</span>
              </p>
            </div>

            <ul className="mk-hero-chips">
              <li>
                <Tick />
                Free design visit
              </li>
              <li>
                <Tick />
                Fixed price in writing
              </li>
              <li>
                <Tick />
                Our own fitters
              </li>
            </ul>
          </div>

          {/* A tape along the foot of the hero: it pulls out as you scroll. */}
          <div className="mk-hero-rule" aria-hidden="true">
            <p className="mk-mono mk-hero-cue">
              <span>Scroll</span>
              <i />
              <span>Specify yours</span>
            </p>
            <div className="mk-hero-tape">
              {Array.from({ length: 22 }, (_, i) => (
                <span key={i} style={{ "--i": i } as CSSProperties}>
                  {i * 100}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------ Signature: specify it */}
        <section
          id="specify"
          className="mk-spec mk-dark imm-pin"
          data-scrub="pin"
          data-steps="3"
          data-loop
          style={{ "--pin": 2.5 } as CSSProperties}
        >
          <div className="imm-stage mk-spec-stage">
            <div className="mk-wrap">
              <Specifier />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Measure up */}
        <section id="measure" className="mk-section mk-section--white">
          <div className="mk-wrap">
            <header className="mk-head mk-head--row" data-reveal>
              <div>
                <p className="mk-mono mk-kicker">
                  <span className="mk-kicker-mark" aria-hidden="true" />
                  Measure up
                </p>
                <h2 className="mk-h2">
                  Three taps. <em>A rough idea.</em>
                </h2>
              </div>
              <p className="mk-lead">
                No tape measure needed yet. Tell us the shape, the size and what is staying, and see roughly what the
                job involves.
              </p>
            </header>
            <MeasureUp />
          </div>
        </section>

        {/* --------------------------------------------------------- Process */}
        <section id="process" className="mk-section mk-section--sage">
          <div className="mk-wrap">
            <header className="mk-head mk-head--row" data-reveal>
              <div>
                <p className="mk-mono mk-kicker">
                  <span className="mk-kicker-mark" aria-hidden="true" />
                  How it goes
                </p>
                <h2 className="mk-h2">
                  From tape measure <em>to tea.</em>
                </h2>
              </div>
              <p className="mk-lead">
                Five steps, one team and a start date you can plan around. You always know which step you are on.
              </p>
            </header>

            <div className="mk-proc" data-scrub data-start="top 82%" data-end="bottom 72%" data-loop>
              <div className="mk-tape" aria-hidden="true">
                <span className="mk-tape-case">
                  <i />
                </span>
                <span className="mk-tape-track">
                  <span className="mk-tape-blade" />
                </span>
              </div>
              <ol className="mk-steps">
                {STEPS.map(([title, text, tag], i) => (
                  <li key={title} className="mk-step" style={{ "--i": i } as CSSProperties}>
                    <span className="mk-step-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="mk-step-icon" aria-hidden="true">
                      <StepIcon step={i} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="mk-tag">{tag}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mk-proc-foot">
              <p>
                <b>About eight weeks</b> from the first visit to the first cup of tea, for a typical kitchen.
              </p>
              <a href="#visit" className="mk-btn mk-btn--brass">
                Book step one
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Details */}
        <section id="details" className="mk-section mk-section--char mk-dark">
          <div className="mk-wrap">
            <header className="mk-head mk-head--row" data-reveal>
              <div>
                <p className="mk-mono mk-kicker">
                  <span className="mk-kicker-mark" aria-hidden="true" />
                  Fitting details
                </p>
                <h2 className="mk-h2">
                  Look <em>closer.</em>
                </h2>
              </div>
              <p className="mk-lead">
                The difference between a fitted kitchen and a well fitted one is in the parts nobody photographs. So we
                photographed them.
              </p>
            </header>

            <div className="mk-details">
              <figure className="mk-shot mk-shot--drawer">
                <div className="mk-shot-img" data-reveal="clip">
                  <Image
                    src={`${M}/scene.webp`}
                    alt="An open drawer with a dovetailed oak drawer box, a fitted cutlery insert and a brass cup handle"
                    fill
                    sizes="(min-width: 1024px) 700px, 92vw"
                  />
                  <Pins items={DRAWER_PINS} />
                </div>
                <figcaption>
                  <p className="mk-mono mk-shot-cap">Fig. 01 · Drawer box</p>
                  <Legend items={DRAWER_PINS} />
                </figcaption>
              </figure>

              <figure className="mk-shot mk-shot--top">
                <div className="mk-shot-img" data-reveal="clip" style={{ "--d": "120ms" } as CSSProperties}>
                  <Image
                    src={`${M}/detail.webp`}
                    alt="A white quartz worktop with an undermount sink and a brushed brass tap, above a sage green drawer"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                  />
                  <Pins items={TOP_PINS} />
                </div>
                <figcaption>
                  <p className="mk-mono mk-shot-cap">Fig. 02 · Worktop and sink</p>
                  <Legend items={TOP_PINS} />
                </figcaption>
              </figure>

              <figure className="mk-shot mk-shot--level">
                <div className="mk-shot-img" data-reveal="clip">
                  <Image
                    src={`${M}/extra.webp`}
                    alt="A fitter holding a spirit level on top of a cabinet carcass"
                    fill
                    sizes="(min-width: 1024px) 340px, 92vw"
                  />
                </div>
                <figcaption>
                  <p className="mk-mono mk-shot-cap">Fig. 03 · Before a door goes on</p>
                  <p className="mk-shot-note">Every cabinet is levelled and fixed before a single door is hung.</p>
                </figcaption>
              </figure>

              <aside className="mk-fit" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
                <p className="mk-fit-head">
                  <span className="mk-mono">Fit check</span>
                  <span className="mk-fit-state">
                    <i aria-hidden="true" /> Signed off by your fitter
                  </span>
                </p>
                <dl className="mk-fit-rows">
                  {FIT_CHECK.map(([what, how]) => (
                    <div key={what}>
                      <dt>{what}</dt>
                      <dd>
                        {how}
                        <span className="mk-tick mk-tick--on">
                          <Tick />
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <a href="#visit" className="mk-link">
                  Book a design visit
                  <Arrow />
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- Included */}
        <section id="included" className="mk-section mk-section--white">
          <div className="mk-wrap mk-incl">
            <div className="mk-incl-copy">
              <header className="mk-head" data-reveal>
                <p className="mk-mono mk-kicker">
                  <span className="mk-kicker-mark" aria-hidden="true" />
                  What is included
                </p>
                <h2 className="mk-h2">
                  One price. <em>Everything in it.</em>
                </h2>
                <p className="mk-lead">
                  Your quote is a schedule, not a guess. Every line here is in the price, with the name of who does it.
                </p>
              </header>
              <ul className="mk-figures">
                {FIGURES.map(([n, unit, text], i) => (
                  <li key={unit} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                    <p className="mk-figure-n">
                      {n} <em>{unit}</em>
                    </p>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
              <a href="#visit" className="mk-btn mk-btn--brass">
                Get my fixed price
                <Arrow />
              </a>
            </div>

            <div className="mk-sched" data-scrub="enter" data-end="top 12%">
              <div className="mk-sched-head">
                <p className="mk-sheet-title">Schedule of works</p>
                <p className="mk-mono">Sample · 11 lines</p>
              </div>
              {SCHEDULE.map((block, b) => {
                /* Rows are numbered straight through, so the ticks land in order. */
                const before = SCHEDULE.slice(0, b).reduce((n, earlier) => n + earlier.rows.length, 0);
                return (
                  <div key={block.group} className="mk-sched-block">
                    <p className="mk-mono mk-sched-group">{block.group}</p>
                    <ul>
                      {block.rows.map(([code, item, who], r) => (
                        <li key={code} className="mk-sched-row" style={{ "--i": before + r } as CSSProperties}>
                          <span className="mk-sched-code">{code}</span>
                          <span className="mk-sched-item">{item}</span>
                          <span className="mk-sched-who">{who}</span>
                          <span className="mk-tick">
                            <Tick />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <p className="mk-sched-foot">
                Quoted separately if you want them: flooring, decorating and structural work.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Reviews */}
        <section id="reviews" className="mk-section mk-section--oat">
          <div className="mk-wrap">
            <header className="mk-head" data-reveal>
              <p className="mk-mono mk-kicker">
                <span className="mk-kicker-mark" aria-hidden="true" />
                Sample reviews · this is a demo
              </p>
              <h2 className="mk-h2">
                What people say <em>once the kettle is on.</em>
              </h2>
            </header>
            <ul className="mk-reviews">
              {REVIEWS.map((review, i) => (
                <li key={review.who} className="mk-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <p className="mk-review-top">
                    <span className="mk-stars" role="img" aria-label="Five stars">
                      ★★★★★
                    </span>
                    <span className="mk-tag">{review.job}</span>
                  </p>
                  <blockquote>{review.quote}</blockquote>
                  <p className="mk-mono mk-review-who">{review.who}</p>
                  <dl className="mk-review-spec">
                    {review.spec.map(([part, id, name]) => (
                      <div key={id}>
                        <dt>{part}</dt>
                        <dd>
                          <i className={`mk-chip mk-mat--${id}`} aria-hidden="true" />
                          {name}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- Visit */}
        <section id="visit" className="mk-visit mk-dark">
          <div className="mk-wrap mk-visit-grid">
            <div className="mk-visit-head">
              <p className="mk-mono mk-kicker">
                <span className="mk-kicker-mark" aria-hidden="true" />
                Free design visit
              </p>
              <h2 className="mk-h2">
                Start with a <em>tape measure.</em>
              </h2>
              <p className="mk-lead">
                A designer comes to you, measures up and talks through how you use the room. It takes about ninety
                minutes and costs nothing. Drawings and one fixed price follow within a week.
              </p>
            </div>
            {/* On a phone the form comes straight after the heading. */}
            <VisitForm />
            <div className="mk-visit-more">
              <ol className="mk-visit-steps">
                <li>
                  <span className="mk-mono">01</span>We ring to agree a time
                </li>
                <li>
                  <span className="mk-mono">02</span>Ninety minutes at yours
                </li>
                <li>
                  <span className="mk-mono">03</span>Drawings and a fixed price
                </li>
              </ol>
              <a href={PHONE_HREF} className="mk-visit-phone">
                <span className="mk-mono">Or call the studio</span>
                {PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="mk-footer mk-dark">
        <div className="mk-wrap mk-footer-grid">
          <p className="mk-logo">
            <Logo />
          </p>
          <p className="mk-footer-note">
            Marlowe Kitchens is a fictional business. This page is a demo by Integrate Web Design, made to show the
            kind of homepage we build for kitchen fitters.
          </p>
          <a href="/web-design#immersive" className="mk-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="mk-bar">
        <a href="#visit" className="mk-btn mk-btn--brass">
          Book a design visit
        </a>
        <a href={PHONE_HREF} className="mk-btn mk-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
