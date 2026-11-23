import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, ElevationDims, ElevationLines, PlanDrawing } from "./_components/drawings";
import { BuildReadout, ProjectPicker, VisitForm } from "./_components/parts";
import "./builders.css";

/**
 * Fenwick & Rowe: an immersive demo homepage for a builder.
 *
 * Concept: from drawing to dwelling. The page is the drawing set, and
 * scrolling builds it. The signature scene draws a rear elevation, then
 * wipes the finished photograph up through it, foundations to finish.
 *
 * The business, its phone number, programme and reviews are all made up.
 * Photography is generated (public/media/demos/builders).
 */

const display = localFont({
  src: [
    { path: "../../../../assets/fonts/instrument-serif/instrument-serif-400.woff2", weight: "400", style: "normal" },
    {
      path: "../../../../assets/fonts/instrument-serif/instrument-serif-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-fr-display",
  display: "swap",
});
const text = localFont({
  src: "../../../../assets/fonts/inter-tight/inter-tight-100-900.woff2",
  weight: "100 900",
  variable: "--font-fr-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fenwick & Rowe | Demo builder homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a building firm, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 284";
const PHONE_HREF = "tel:01632960284";
const M = "/media/demos/builders";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

const PHASES = [
  ["01", "Foundations", "Trenches dug, concrete poured and inspected before anything is covered."],
  ["02", "Structure", "Brick and block to roof level, steel beam in, joists on."],
  ["03", "Glazing", "Roof lantern and bifold doors fitted. The room is weathertight."],
  ["04", "Finish", "Electrics, plaster, floors and paint. Snagged, certified, handed over."],
];

/** Callouts on the elevation: [label, x, y, variant], in drawing units. */
const CHIPS: [string, number, number, string][] = [
  ["6.0 m", 1001, 1062, ""],
  ["3.0 m", 1840, 720, "v"],
  ["RL", 170, 426, "r"],
  ["FFL", 170, 962, "r"],
  ["Roof lantern", 1012, 296, "x"],
];

const REGISTER = [
  ["S-201", "Structural openings", "Load-bearing walls out and steel in, calculated and signed off."],
  ["A-105", "Two-storey extensions", "More bedroom above, more kitchen below, one set of foundations."],
  ["A-106", "Garden rooms and porches", "Small buildings, built with the same care as the big ones."],
  ["K-301", "Kitchens within the build", "Supplied by you or by us, fitted as part of the programme."],
  ["R-401", "Period repairs", "Repointing, lintels, chimneys and brickwork matched to the original."],
  ["R-402", "Damp, cracks and movement", "Diagnosed properly first, then fixed at the cause."],
];

/** [stage, first week, last week, phase] for a typical rear extension. */
const PROGRAMME: [string, number, number, string][] = [
  ["Site set-up and dig", 1, 1, "f"],
  ["Foundations and floor slab", 1, 3, "f"],
  ["Brick and block walls", 3, 5, "s"],
  ["Steel beam and roof structure", 5, 6, "s"],
  ["Roof covering and lantern", 6, 7, "g"],
  ["Bifold doors and windows", 7, 8, "g"],
  ["Knock-through to the house", 8, 8, "s"],
  ["First fix: electrics, plumbing", 8, 9, "n"],
  ["Plaster and screed", 9, 10, "n"],
  ["Second fix, kitchen, floors", 10, 11, "n"],
  ["Decoration and snagging", 11, 12, "n"],
];
const INSPECTIONS = [2, 3, 6, 9, 12];
const WEEKS = Array.from({ length: 12 }, (_, n) => n + 1);
const wk = (a: number, b: number) =>
  a === b ? `Wk ${String(a).padStart(2, "0")}` : `Wk ${String(a).padStart(2, "0")}-${String(b).padStart(2, "0")}`;

const GALLERY = [
  {
    img: "extra.webp",
    mod: "b",
    alt: "New red brickwork toothed into an older brick wall, with a trowel and spirit level resting on top",
    tag: "Wk 04 · Brickwork",
    title: "New brick toothed into old",
    body: "Bonded course by course into the house, so the join is hard to find.",
    sizes: "(min-width: 900px) 40vw, 92vw",
  },
  {
    img: "scene.webp",
    mod: "a",
    alt: "An extension mid-build: blockwork walls, a red steel beam and new timber roof joists under a blue sky",
    tag: "Wk 06 · Structure",
    title: "Steel in, joists on",
    body: "Blockwork to roof level and the beam that carries the back of the house.",
    sizes: "(min-width: 900px) 56vw, 92vw",
  },
  {
    img: "detail.webp",
    mod: "c",
    alt: "The finished kitchen-diner: oak table under a glazed roof lantern, green kitchen, doors open to the garden",
    tag: "Wk 12 · Inside",
    title: "Under the lantern",
    body: "Exposed steel, a polished floor and daylight where the dining table sits.",
    sizes: "(min-width: 900px) 32vw, 92vw",
  },
  {
    img: "hero.webp",
    mod: "d",
    alt: "The finished flat-roofed rear extension at dusk, bifold doors across its full width and the roof lantern lit",
    tag: "Wk 12 · Handover",
    title: "Six metres of glass on to the garden",
    body: "Brick matched to the house, a flat roof and the lantern lit from inside.",
    sizes: "(min-width: 900px) 64vw, 92vw",
  },
];

const HANDED_OVER = [
  ["FR-121", "Loft conversion, rear dormer", "1930s semi", "8 weeks on site"],
  ["FR-116", "Side return and new kitchen", "Victorian terrace", "11 weeks on site"],
  ["FR-109", "Full renovation", "Three-bed semi", "5 months"],
  ["FR-104", "Garage conversion to a study", "1970s detached", "4 weeks on site"],
];

const TRADES = [
  "Drawings",
  "Structural engineer",
  "Building control",
  "Groundworks",
  "Bricklaying",
  "Steel and carpentry",
  "Roofing",
  "Glazing",
  "Electrics",
  "Plumbing and heating",
  "Plastering",
  "Decoration",
];

const PROMISES = [
  ["One site manager", "On your job from the first trench to the last coat. You have their mobile, and they answer it."],
  ["A fixed written quote", "Itemised, with every allowance spelled out. Any change is priced before it happens."],
  ["Paid in stages", "Payments follow finished stages of work. You never pay ahead of what is built."],
  ["Certified at the end", "Completion certificate, electrical and gas certificates and a written guarantee, in one handover file."],
];

const REVIEWS = [
  [
    "We had drawings from someone else that nobody would price. They redrew them, got them approved and built exactly what was on the sheet.",
    "Homeowner, rear extension",
  ],
  [
    "The Friday update was the thing. Photos, what was done, what was next. In twelve weeks we never once had to chase.",
    "Homeowner, side return",
  ],
  [
    "Finished in the week they said at the start. The snag list had four items on it and they were gone in two days.",
    "Homeowner, loft conversion",
  ],
];

const NEXT = [
  ["01", "Site visit", "About an hour, at your house."],
  ["02", "Written quote", "Itemised, within ten working days."],
  ["03", "Drawings start", "When you say so, and not before."],
];

function Logo() {
  return (
    <>
      <svg className="fr-logo-mark" viewBox="0 0 28 28" aria-hidden="true">
        <path d="M3 25 V11 L12 3 L21 11" className="fr-logo-house" />
        <path d="M11 25 V16 H26 V25" className="fr-logo-ext" />
        <path d="M1 25 H27" className="fr-logo-house" />
      </svg>
      <span>
        Fenwick <i>&amp;</i> Rowe
        <small>Design and build</small>
      </span>
    </>
  );
}

export default function FenwickRowePage() {
  return (
    <div className={`fr ${display.variable} ${text.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="fr-header">
        <a href="#top" className="fr-logo" aria-label="Fenwick and Rowe, home">
          <Logo />
        </a>
        <nav className="fr-nav" aria-label="Main">
          <a href="#build">How we build</a>
          <a href="#project">Your project</a>
          <a href="#programme">Programme</a>
          <a href="#projects">Projects</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="fr-header-phone">
          <span className="fr-mono">Call the office</span>
          {PHONE}
        </a>
        <a href="#visit" className="fr-btn fr-btn--brick fr-header-cta">
          Book a site visit
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="fr-hero" data-scrub="exit">
          <div className="fr-hero-border" aria-hidden="true">
            <div className="fr-refs-x">
              {["A", "B", "C", "D", "E", "F"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="fr-refs-y">
              {["1", "2", "3", "4"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>

          <div className="fr-wrap fr-hero-grid">
            <div className="fr-hero-copy">
              <p className="fr-mono fr-hero-kicker">
                <span className="fr-dot" aria-hidden="true" />
                Extensions · Conversions · Renovations
              </p>
              <h1 className="fr-h1">
                <span className="fr-h1-line">
                  <span>From drawing</span>
                </span>
                <span className="fr-h1-line">
                  <span>
                    to <em>dwelling.</em>
                  </span>
                </span>
              </h1>
              <p className="fr-hero-sub">
                Fenwick &amp; Rowe are builders who draw it, get it approved and build it. Extensions, conversions and
                whole-house renovations under one contract, from first sketch to final coat.
              </p>
              <div className="fr-hero-actions">
                <a href="#visit" className="fr-btn fr-btn--brick fr-btn--lg">
                  Book a site visit
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="fr-btn fr-btn--ghost fr-btn--lg fr-hero-call">
                  Call {PHONE}
                </a>
              </div>
              <ul className="fr-hero-chips">
                <li>Drawings and approvals handled</li>
                <li>Fixed written quote</li>
                <li>One site manager throughout</li>
              </ul>
              <dl className="fr-facts">
                <div>
                  <dt>On site</dt>
                  <dd>12 weeks, typical extension</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>14, directly employed</dd>
                </div>
                <div>
                  <dt>Guarantee</dt>
                  <dd>10 years, in writing</dd>
                </div>
              </dl>
            </div>

            {/* The cover sheet: photograph, plan and title block. */}
            <div className="fr-hero-sheet">
              <figure className="fr-hero-photo">
                <div className="fr-hero-photo-in">
                  <Image
                    src={`${M}/detail.webp`}
                    alt="A finished kitchen-diner extension: oak dining table under a glazed roof lantern, doors open to the garden"
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 82vw"
                  />
                </div>
                <figcaption className="fr-mono">
                  <span>Fig. 01</span>
                  <span>Kitchen-diner, handed over</span>
                </figcaption>
              </figure>

              <div className="fr-plan" aria-hidden="true">
                <p className="fr-mono fr-plan-head">
                  <span>Ground floor plan</span>
                  <span>Proposed</span>
                </p>
                <PlanDrawing />
                <p className="fr-mono fr-plan-foot">6.0 x 4.0 m · 1:50</p>
              </div>

              <dl className="fr-tb" aria-label="Drawing title block">
                <div className="fr-tb-wide">
                  <dt>Project</dt>
                  <dd>Rear extension, kitchen-diner</dd>
                </div>
                <div>
                  <dt>Sheet</dt>
                  <dd>A-001 Cover</dd>
                </div>
                <div>
                  <dt>Scale</dt>
                  <dd>1:50 at A3</dd>
                </div>
                <div>
                  <dt>Drawn and built by</dt>
                  <dd>Fenwick &amp; Rowe</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className="fr-tb-status">For construction</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="fr-hero-ticker fr-mono" aria-hidden="true">
            <span>Sheet A-001</span>
            <i />
            <span>Scroll to build it</span>
          </p>
        </section>

        {/* ---------------------------------------- Signature: drawn, then built */}
        <div className="fr-build-wrap" data-scrub="" data-start="top 82%" data-end="top 6%">
          <section id="build" className="fr-build imm-pin" data-scrub="pin" data-steps="4" style={v({ "--pin": 2.5 })}>
            <div className="imm-stage fr-build-stage">
              <div className="fr-wrap fr-build-grid">
                <header className="fr-build-head">
                  <p className="fr-mono fr-kicker">Sheet A-201 · Rear elevation</p>
                  <h2 className="fr-h2">
                    Drawn, <em>then built.</em>
                  </h2>
                  <p className="fr-lead">
                    Every job starts as a drawing you can argue with. Scroll, and watch this one become a room.
                  </p>
                </header>

                <div className="fr-drawing">
                  <div className="fr-frame" aria-hidden="true">
                    <div className="fr-canvas">
                      <ElevationLines />
                      <div className="fr-photo">
                        <Image src={`${M}/hero.webp`} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" />
                      </div>
                      <div className="fr-level" />
                      <div className="fr-split">
                        <span className="fr-mono">Drawn</span>
                        <span className="fr-mono">Built</span>
                      </div>
                      <ElevationDims />
                      {CHIPS.map(([label, x, y, variant], n) => (
                        <span
                          key={label}
                          className={`fr-chip${variant ? ` fr-chip--${variant}` : ""}`}
                          style={v({ "--x": x, "--y": y, "--i": n })}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="fr-stb" aria-hidden="true">
                    <div>
                      <span>Drawing</span>
                      A-201 <i>Rear </i>elevation
                    </div>
                    <div className="fr-stb-x">
                      <span>Scale</span>
                      1:50
                    </div>
                    <BuildReadout />
                  </div>
                </div>

                <div className="fr-build-foot">
                  <ol className="fr-rail">
                    {PHASES.map(([n, title, body], idx) => (
                      <li key={n} className="fr-phase" style={v({ "--i": idx })}>
                        <span className="fr-mono fr-phase-n">{n}</span>
                        <h3>{title}</h3>
                        <p>{body}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="fr-build-cta">
                    <a href="#visit" className="fr-btn fr-btn--paper">
                      Book a site visit
                      <Arrow />
                    </a>
                    <span className="fr-mono">Free. No obligation.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ------------------------------------------------- What are you building */}
        <section id="project" className="fr-section fr-section--paper">
          <div className="fr-wrap">
            <header className="fr-head" data-reveal>
              <p className="fr-mono fr-kicker">Sheet A-100 · Project types</p>
              <h2 className="fr-h2">
                What are you <em>building?</em>
              </h2>
              <p className="fr-lead">
                Pick the job nearest to yours. Each sheet shows what is involved, what we take off your hands and the
                stages it usually runs through.
              </p>
            </header>
            <div data-reveal style={v({ "--d": "120ms" })}>
              <ProjectPicker />
            </div>

            <div className="fr-register">
              <p className="fr-mono fr-register-head" data-reveal>
                <span>Also on the drawing board</span>
                <span>Drawing register</span>
              </p>
              <ul className="fr-register-rows">
                {REGISTER.map(([no, title, body], n) => (
                  <li key={no} data-reveal style={v({ "--d": `${(n % 2) * 90}ms` })}>
                    <span className="fr-mono">{no}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Programme */}
        <section id="programme" className="fr-section fr-section--navy">
          <div className="fr-wrap">
            <header className="fr-head fr-head--row" data-reveal>
              <div>
                <p className="fr-mono fr-kicker">A typical programme</p>
                <h2 className="fr-h2">
                  You will know <em>what happens when.</em>
                </h2>
              </div>
              <p className="fr-lead">
                Before we break ground you get a week-by-week programme like this, written for your house. This one is a
                single-storey rear extension.
              </p>
            </header>

            <div className="fr-prog-grid">
              <div className="fr-gantt" data-scrub="enter">
                <div className="fr-gantt-top">
                  <p className="fr-mono">Programme · rear extension · on site</p>
                  <p className="fr-mono fr-gantt-total">12 weeks</p>
                </div>
                <div className="fr-grow fr-grow--head" aria-hidden="true">
                  <span className="fr-mono fr-grow-name">Stage</span>
                  <span className="fr-mono fr-grow-wk">Weeks</span>
                  <span className="fr-weeks">
                    {WEEKS.map((w) => (
                      <i key={w}>{String(w).padStart(2, "0")}</i>
                    ))}
                  </span>
                </div>
                <ol className="fr-gantt-rows">
                  {PROGRAMME.map(([name, s, e, phase], n) => (
                    <li key={name} className="fr-grow" style={v({ "--i": n, "--s": s, "--e": e })}>
                      <span className="fr-grow-name">{name}</span>
                      <span className="fr-mono fr-grow-wk">{wk(s, e)}</span>
                      <span className="fr-track" aria-hidden="true">
                        <span className={`fr-gbar fr-gbar--${phase}`} />
                      </span>
                    </li>
                  ))}
                  <li className="fr-grow fr-grow--rule" style={v({ "--i": 11 })}>
                    <span className="fr-grow-name">Building control inspections</span>
                    <span className="fr-mono fr-grow-wk">5 visits</span>
                    <span className="fr-track" aria-hidden="true">
                      {INSPECTIONS.map((w) => (
                        <span key={w} className="fr-gdia" style={v({ "--w": w })} />
                      ))}
                    </span>
                  </li>
                  <li className="fr-grow" style={v({ "--i": 12, "--s": 8, "--e": 11 })}>
                    <span className="fr-grow-name">Your kitchen out of action</span>
                    <span className="fr-mono fr-grow-wk">{wk(8, 11)}</span>
                    <span className="fr-track" aria-hidden="true">
                      <span className="fr-gbar fr-gbar--out" />
                    </span>
                  </li>
                </ol>
                <ul className="fr-legend">
                  <li>
                    <span className="fr-key-sw fr-gbar--f" />
                    Foundations
                  </li>
                  <li>
                    <span className="fr-key-sw fr-gbar--s" />
                    Structure
                  </li>
                  <li>
                    <span className="fr-key-sw fr-gbar--g" />
                    Glazing
                  </li>
                  <li>
                    <span className="fr-key-sw fr-gbar--n" />
                    Finish
                  </li>
                  <li>
                    <span className="fr-key-dia" />
                    Inspection
                  </li>
                </ul>
                <p className="fr-gantt-note">
                  Typical only. Weather, ground conditions and your choices move things, and we tell you the day they
                  do.
                </p>
              </div>

              <aside className="fr-update" data-reveal="right" style={v({ "--d": "140ms" })}>
                <div className="fr-update-head">
                  <p className="fr-mono">Friday update · week 06</p>
                  <span className="fr-update-live" aria-hidden="true" />
                </div>
                <p className="fr-update-title">Steel is in.</p>
                <ul className="fr-update-list">
                  <li>Beam lifted and bolted to the engineer&apos;s detail</li>
                  <li>Roof joists on, deck started</li>
                  <li>Building control passed the structure</li>
                  <li className="fr-update-next">Next week: roof covering. Lantern arrives Tuesday</li>
                </ul>
                <div className="fr-update-photo">
                  <div className="fr-update-thumb">
                    <Image src={`${M}/scene.webp`} alt="" fill sizes="(min-width: 1100px) 300px, 92vw" />
                  </div>
                  <p className="fr-mono">
                    <span>4 photos attached</span>
                    <span>Sent Friday 16:00</span>
                  </p>
                </div>
                <p className="fr-update-foot">
                  Every client gets this from their site manager, every Friday, until the keys are handed back.
                </p>
              </aside>
            </div>

            <div className="fr-section-cta">
              <a href="#visit" className="fr-btn fr-btn--paper">
                Get a programme for your house
                <Arrow />
              </a>
              <a href={PHONE_HREF} className="fr-link">
                Or call {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- Projects */}
        <section id="projects" className="fr-section fr-section--paper2">
          <div className="fr-wrap">
            <header className="fr-head fr-head--row" data-reveal>
              <div>
                <p className="fr-mono fr-kicker">Recent projects · project file FR-118</p>
                <h2 className="fr-h2">
                  One job, <em>start to finish.</em>
                </h2>
              </div>
              <p className="fr-lead">
                A kitchen-diner extension on a 1930s semi. Twelve weeks on site, and the family lived at home
                throughout.
              </p>
            </header>

            <div className="fr-gal">
              {GALLERY.map((g, n) => (
                <figure key={g.img} className={`fr-fig fr-fig--${g.mod}`} data-reveal style={v({ "--d": `${(n % 2) * 110}ms` })}>
                  <div className="fr-fig-img">
                    <Image src={`${M}/${g.img}`} alt={g.alt} fill sizes={g.sizes} />
                    <span className="fr-mono fr-fig-tag">{g.tag}</span>
                  </div>
                  <figcaption>
                    <span className="fr-mono">FR-118 / {String(n + 1).padStart(2, "0")}</span>
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="fr-done" data-reveal>
              <p className="fr-mono fr-register-head">
                <span>Also handed over recently</span>
                <span>Status: complete</span>
              </p>
              <ul className="fr-done-rows">
                {HANDED_OVER.map(([no, job, house, time]) => (
                  <li key={no}>
                    <span className="fr-mono">{no}</span>
                    <b>{job}</b>
                    <span>{house}</span>
                    <span className="fr-mono fr-done-time">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fr-section-cta">
              <a href="#visit" className="fr-btn fr-btn--brick">
                Start your project file
                <Arrow />
              </a>
              <span className="fr-mono fr-cta-note">Every job gets a file number at the first visit</span>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- One team, one contract */}
        <section id="team" className="fr-section fr-section--brick">
          <div className="fr-wrap fr-team-grid">
            <div>
              <header className="fr-head" data-reveal>
                <p className="fr-mono fr-kicker">One team, one contract</p>
                <h2 className="fr-h2">
                  Twelve trades. <em>One number to call.</em>
                </h2>
                <p className="fr-lead">
                  An extension needs a designer, an engineer, an inspector and a yard full of trades. You sign one
                  contract with us, and we manage the lot.
                </p>
              </header>

              <figure className="fr-one" data-scrub="enter">
                <figcaption className="fr-mono">Who you would otherwise be managing</figcaption>
                <ul className="fr-trades">
                  {TRADES.map((t, n) => (
                    <li key={t} style={v({ "--i": n })}>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="fr-one-join" aria-hidden="true">
                  <i />
                </div>
                <div className="fr-one-node">
                  <span className="fr-mono">One contract</span>
                  <b>Fenwick &amp; Rowe</b>
                  <span className="fr-one-sub">One programme · one site manager · one handover file</span>
                </div>
                <div className="fr-one-stem" aria-hidden="true" />
                <p className="fr-one-you">
                  <span className="fr-mono">You</span>
                  One number to call
                </p>
              </figure>
            </div>

            <ol className="fr-promises">
              {PROMISES.map(([title, body], n) => (
                <li key={title} data-reveal style={v({ "--d": `${n * 90}ms` })}>
                  <span className="fr-mono">Clause 0{n + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
              <li className="fr-promises-cta">
                <a href="#visit" className="fr-btn fr-btn--paper">
                  Book a site visit
                  <Arrow />
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="fr-section fr-section--paper">
          <div className="fr-wrap">
            <header className="fr-head" data-reveal>
              <p className="fr-mono fr-kicker">Sample reviews · this is a demo</p>
              <h2 className="fr-h2">
                What clients say <em>after handover.</em>
              </h2>
            </header>
            <ul className="fr-reviews">
              {REVIEWS.map(([quote, who], n) => (
                <li key={who} className="fr-review" data-reveal style={v({ "--d": `${n * 110}ms` })}>
                  <div className="fr-review-top">
                    <span className="fr-stars" role="img" aria-label="Five out of five">
                      ■■■■■
                    </span>
                    <span className="fr-mono fr-review-sample">Sample</span>
                  </div>
                  <blockquote>{quote}</blockquote>
                  <p className="fr-mono fr-review-who">{who}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Visit */}
        <section id="visit" className="fr-visit">
          <div className="fr-wrap fr-visit-grid">
            <div className="fr-visit-copy">
              <p className="fr-mono fr-kicker">Book a site visit</p>
              <h2 className="fr-h2 fr-visit-title">
                Show us <em>the house.</em>
              </h2>
              <p className="fr-lead">
                A director comes out, measures up and talks through what is possible. You get a written quote and an
                outline programme. The visit is free, and there is no pressure to go ahead.
              </p>
              <ol className="fr-next">
                {NEXT.map(([n, title, body]) => (
                  <li key={n}>
                    <span className="fr-mono">{n}</span>
                    <b>{title}</b>
                    <span>{body}</span>
                  </li>
                ))}
              </ol>
              <a href={PHONE_HREF} className="fr-visit-phone">
                <span className="fr-mono">Or call the office</span>
                {PHONE}
              </a>
            </div>
            <VisitForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="fr-footer">
        <div className="fr-wrap fr-footer-grid">
          <p className="fr-logo">
            <Logo />
          </p>
          <p className="fr-footer-note">
            Fenwick &amp; Rowe is a fictional business. This page is a demo by Integrate Web Design, made to show the
            kind of homepage we build for builders.
          </p>
          <a href="/web-design#immersive" className="fr-link">
            See the other demos
            <Arrow />
          </a>
        </div>
        <div className="fr-wrap">
          <dl className="fr-footer-tb">
            <div>
              <dt>Office</dt>
              <dd>
                <a href={PHONE_HREF}>{PHONE}</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Mon to Fri, 8 to 5</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>Across the county</dd>
            </div>
            <div>
              <dt>Sheet</dt>
              <dd>A-900 End of set</dd>
            </div>
          </dl>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="fr-bar">
        <a href="#visit" className="fr-btn fr-btn--brick">
          Book a site visit
        </a>
        <a href={PHONE_HREF} className="fr-btn fr-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
