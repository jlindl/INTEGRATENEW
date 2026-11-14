import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HouseSection } from "./_components/HouseSection";
import { Arrow, HeadroomCard, HeightReadout, LoftPicker, SurveyForm } from "./_components/parts";
import "./loft-conversions.css";

/**
 * Upstairs Loft Co.: an immersive demo homepage for a loft conversion firm.
 *
 * Concept: going up. The page starts at the front door on a night-indigo
 * ground and ends under open sky. The signature scene rides up through a
 * house in section, from the ground floor to a loft that lights up.
 *
 * The business, its phone number, reviews and promises are all made up.
 * Photography is generated (public/media/demos/loft-conversions).
 */

const display = localFont({
  src: "../../../../assets/fonts/syne/syne-400-800.woff2",
  weight: "400 800",
  variable: "--font-ul-display",
  display: "swap",
});
const body = localFont({
  src: "../../../../assets/fonts/manrope/manrope-200-800.woff2",
  weight: "200 800",
  variable: "--font-ul-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Upstairs Loft Co. | Demo loft conversion homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a loft conversion company, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 284";
const PHONE_HREF = "tel:01632960284";
const M = "/media/demos/loft-conversions";

const FLOORS = [
  {
    tag: "G",
    name: "Ground floor",
    line: "Nothing changes down here.",
    text: "The work is done from the scaffold, through the roof. Your kitchen and your front room stay as they are.",
  },
  {
    tag: "1",
    name: "First floor",
    line: "The new stair lands here.",
    text: "It rises over the stair you already have wherever the layout allows, so the bedrooms keep their space.",
  },
  {
    tag: "Loft",
    name: "Loft",
    line: "A bedroom and an en-suite.",
    text: "Insulated, plastered, wired and signed off by building control, with daylight from above.",
  },
];

const INCLUDED = [
  {
    group: "Paperwork",
    note: "Before a tile is lifted",
    items: [
      ["Measured survey", "The loft and the floor below, measured by laser."],
      ["Drawings", "Plans and sections, revised until you are happy."],
      ["Structural calculations", "An engineer designs the steels and the new floor."],
      ["Building control", "Application, inspections and the final certificate."],
    ],
  },
  {
    group: "Structure",
    note: "Built from the scaffold",
    items: [
      ["Scaffold and cover", "Up before the roof is opened. Down once it is sealed."],
      ["Steels and new floor", "A floor on its own joists, not resting on your ceilings."],
      ["Roof and rooflights", "Formed, insulated, clad or tiled, and made watertight."],
      ["Stairs", "Made to measure and fitted to match the house."],
    ],
  },
  {
    group: "Inside",
    note: "Finished, not just built",
    items: [
      ["Electrics", "Lighting, sockets and linked smoke alarms, certified."],
      ["Plumbing and heating", "Radiators and the en-suite, joined to your system."],
      ["Insulation and plaster", "To current standards, then skimmed smooth."],
      ["Decoration", "Walls, ceilings and woodwork painted, ready for furniture."],
    ],
  },
];

const TERMS = [
  ["Price", "Fixed, in writing"],
  ["Payments", "In stages, as work is done"],
  ["At handover", "Completion and electrical certificates"],
  ["Not included", "Carpets and furniture, unless you ask"],
];

const SHOTS = [
  {
    img: "detail.webp",
    alt: "Looking up through an open timber rooflight to blue sky and clouds",
    title: "Rooflights",
    text: "Set where the light does most: over the bed, the desk or the stair. They open for air, and the blinds are fitted before we leave.",
    tags: ["Daylight", "Ventilation", "Blinds fitted"],
  },
  {
    img: "scene.webp",
    alt: "The back of a brick terraced house with a dark grey flat-roofed dormer",
    title: "Rear dormer",
    text: "A flat-roofed dormer across the back of the house, clad in dark grey and set in from the edges so the brickwork still frames it.",
    tags: ["Full head height", "Two windows", "Dark grey cladding"],
  },
  {
    img: "extra.webp",
    alt: "A new painted staircase with an oak handrail rising to a loft, lit by a rooflight above",
    title: "The new stair",
    text: "Painted spindles, an oak handrail and a rooflight over the top step. It should look as if the house was built with it.",
    tags: ["Made to measure", "Oak handrail", "Lit from above"],
  },
];

const STEPS = [
  ["Survey", "About an hour", "We measure the loft, check the head height and tell you straight what is possible."],
  ["Drawings", "2 to 4 weeks", "Plans and structural calculations. You sign off the layout before anything is ordered."],
  ["Approvals", "Varies by council", "Building control, plus planning or a party wall agreement where they apply."],
  ["Structure", "Weeks 1 to 3", "Scaffold up, steels in, new floor down. All from outside, through the roof."],
  ["Stair day", "Around week 5", "We break through and fit the stair. One dusty day, fully sheeted."],
  ["Handover", "Weeks 6 to 8", "Plastered, wired, painted and signed off. You get the certificates and a new top floor."],
];

const FAQS = [
  [
    "Is my loft tall enough?",
    "Measure from the top of the ceiling joists to the underside of the ridge. Around 2.2 m or more usually converts well. Less than that can still work with a dormer or a lowered ceiling below, and we will tell you straight at the survey.",
  ],
  [
    "Do I need planning permission?",
    "Many loft conversions are built under permitted development, so no planning application is needed. Flats, conservation areas and larger designs are different. Rules vary, so we check with your council before anything is drawn. Building regulations approval is always needed, and we handle it.",
  ],
  [
    "Do we have to move out?",
    "Usually not. Most of the work is done from the scaffold, through the roof. We break through for the stair near the end, and that is the one dusty day.",
  ],
  [
    "How long does it take?",
    "Most lofts are on site for six to ten weeks, depending on the type. Drawings and approvals come first and vary by council. You get a programme in writing before we start.",
  ],
];

const REVIEWS = [
  [
    "We lived in the house the whole way through. Apart from the day the stair went in, we barely knew they were there.",
    "Homeowner, mid-terrace",
    "Dormer loft",
    "7 weeks",
  ],
  [
    "They told us at the survey that rooflights would do the job, and saved us the cost of a dormer. That honesty is why we hired them.",
    "Homeowner, semi-detached",
    "Rooflight loft",
    "5 weeks",
  ],
  [
    "The drawings, the engineer and the council were all handled for us. We chose the paint colours and that was about it.",
    "Homeowner, end of terrace",
    "Hip-to-gable loft",
    "9 weeks",
  ],
];

export default function UpstairsPage() {
  return (
    <div className={`ul ${display.variable} ${body.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="ul-header">
        <a href="#top" className="ul-logo" aria-label="Upstairs Loft Co., home">
          <span className="ul-logo-mark" aria-hidden="true" />
          <span>
            Upstairs<small>Loft Co.</small>
          </span>
        </a>
        <nav className="ul-nav" aria-label="Main">
          <a href="#go-up">Go up</a>
          <a href="#which">Which loft</a>
          <a href="#included">What is included</a>
          <a href="#process">Process</a>
          <a href="#questions">Questions</a>
        </nav>
        <a href={PHONE_HREF} className="ul-header-phone">
          <span className="ul-mono">Call</span>
          {PHONE}
        </a>
        <a href="#survey" className="ul-btn ul-btn--glow ul-header-cta">
          <span className="ul-wide">Book a loft survey</span>
          <span className="ul-narrow">Book a survey</span>
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="ul-hero" data-scrub="exit" data-loop>
          <div className="ul-wrap ul-hero-grid">
            <div className="ul-hero-head">
              <p className="ul-mono ul-kicker">Loft conversions · design and build</p>
              <h1 className="ul-h1">
                The room you need is already <em>above you.</em>
              </h1>
            </div>
            <div className="ul-hero-copy">
              <p className="ul-hero-sub">
                Loft conversions for terraced and semi-detached homes. One team, one fixed price, and you stay living
                at home while we build.
              </p>
              <div className="ul-hero-actions">
                <a href="#survey" className="ul-btn ul-btn--glow ul-btn--lg">
                  Book a loft survey
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="ul-btn ul-btn--ghost ul-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="ul-hero-chips">
                <li>Free survey and head-height check</li>
                <li>Fixed price in writing</li>
                <li>Building control sign-off</li>
              </ul>
            </div>

            <div className="ul-hero-visual">
              <div className="ul-window">
                <span className="ul-window-glow" aria-hidden="true" />
                <div className="ul-window-frame">
                  <div className="ul-window-glass">
                    <Image
                      src={`${M}/hero.webp`}
                      alt="A finished loft bedroom at dusk, with two rooflights above the bed and warm lamps either side"
                      fill
                      priority
                      sizes="(min-width: 1024px) 560px, 92vw"
                    />
                  </div>
                </div>
                <p className="ul-mono ul-window-tag">
                  <span className="ul-dot" aria-hidden="true" /> A finished loft bedroom
                </p>
              </div>
            </div>

            <HeadroomCard />
          </div>
          <p className="ul-hero-ticker ul-mono" aria-hidden="true">
            <i />
            Scroll to go up
          </p>
        </section>

        {/* ------------------------------------------------- Signature: go up */}
        <section
          id="go-up"
          className="ul-go imm-pin"
          data-scrub="pin"
          data-steps="3"
          data-loop
          style={{ "--pin": 2.5 } as CSSProperties}
        >
          <div className="imm-stage ul-go-stage">
            <div className="ul-wrap ul-go-grid">
              <header className="ul-go-head">
                <p className="ul-mono ul-kicker">Go up</p>
                <h2 className="ul-h2">
                  Front door to <em>top floor.</em>
                </h2>
              </header>

              <div className="ul-lift" aria-hidden="true">
                <div className="ul-lift-head">
                  <span className="ul-mono ul-lift-title">Section A-A</span>
                  <span className="ul-lift-display">
                    <i className="ul-lift-arrow" />
                    <span className="ul-lift-floor">
                      <b>G</b>
                      <b>1</b>
                      <b>Loft</b>
                    </span>
                    <HeightReadout />
                  </span>
                </div>
                <div className="ul-lift-body">
                  <div className="ul-rail">
                    <span className="ul-rail-line" />
                    <span className="ul-rail-stop ul-rail-stop--top">Loft</span>
                    <span className="ul-rail-stop ul-rail-stop--mid">1</span>
                    <span className="ul-rail-stop ul-rail-stop--low">G</span>
                    <span className="ul-rail-run">
                      <span className="ul-rail-car" />
                    </span>
                  </div>
                  <div className="ul-view">
                    <div className="ul-cam">
                      <div className="ul-house">
                        <HouseSection />
                        <div className="ul-loft-photo">
                          <Image src={`${M}/hero.webp`} alt="" fill sizes="(min-width: 1024px) 360px, 60vw" />
                        </div>
                        <span className="ul-chip ul-chip--store">Storage, for now</span>
                        <span className="ul-chip ul-chip--new">New stair</span>
                        <span className="ul-chip ul-chip--door">Front door</span>
                        <span className="ul-chip ul-chip--garden">Garden</span>
                        <span className="ul-lvl ul-lvl--2">+5.4</span>
                        <span className="ul-lvl ul-lvl--1">+2.7</span>
                        <span className="ul-lvl ul-lvl--0">0.0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="ul-lift-foot ul-mono">
                  <span>
                    <i className="ul-key ul-key--old" /> As it is
                  </span>
                  <span>
                    <i className="ul-key ul-key--new" /> New work
                  </span>
                  <span>Not to scale</span>
                </p>
              </div>

              <div className="ul-go-floors">
                <ol className="ul-floors">
                  {FLOORS.map((f, i) => (
                    <li key={f.tag} className={i === 2 ? "ul-floor ul-floor--top" : "ul-floor"}>
                      <span className="ul-floor-tag">{f.tag}</span>
                      <div>
                        <p className="ul-mono ul-floor-name">{f.name}</p>
                        <h3>{f.line}</h3>
                        <p className="ul-floor-text">{f.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <a href="#survey" className="ul-btn ul-btn--glow ul-go-cta">
                  Book a loft survey
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Which loft is yours */}
        <section id="which" className="ul-sec ul-sec--plaster ul-pitch">
          <div className="ul-wrap">
            <header className="ul-head" data-reveal>
              <p className="ul-mono ul-kicker">Which loft is yours?</p>
              <h2 className="ul-h2">
                Four ways to <em>go up.</em>
              </h2>
              <p className="ul-lead">
                Pick a type to see what it adds, the houses it suits and whether it usually needs planning permission.
              </p>
            </header>
            <LoftPicker />
          </div>
        </section>

        {/* ---------------------------------------------------- What is included */}
        <section id="included" className="ul-sec ul-sec--night">
          <div className="ul-wrap ul-inc">
            <div className="ul-inc-side">
              <header className="ul-head" data-reveal>
                <p className="ul-mono ul-kicker">What is included</p>
                <h2 className="ul-h2">
                  Everything between your ceiling <em>and the sky.</em>
                </h2>
                <p className="ul-lead">One price covers all twelve. No separate bills from an architect or an engineer.</p>
              </header>
              <a href="#survey" className="ul-btn ul-btn--glow">
                Get a fixed price
                <Arrow />
              </a>
            </div>

            <div className="ul-inc-main">
              <div className="ul-inc-grid">
              {INCLUDED.map((g, gi) => (
                <section key={g.group} className="ul-inc-col" data-scrub data-start="top 88%" data-end="bottom 70%">
                  <header>
                    <span className="ul-inc-n">0{gi + 1}</span>
                    <h3>{g.group}</h3>
                    <p className="ul-mono">{g.note}</p>
                  </header>
                  <ul>
                    {g.items.map(([title, text], ii) => (
                      <li key={title} style={{ "--i": ii } as CSSProperties}>
                        <svg viewBox="0 0 20 20" className="ul-tick" aria-hidden="true">
                          <rect x="1" y="1" width="18" height="18" rx="5" />
                          <path d="M5.5 10.4 8.7 13.5 14.6 6.8" pathLength={1} />
                        </svg>
                        <div>
                          <h4>{title}</h4>
                          <p>{text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              </div>
              <dl className="ul-terms" data-reveal>
                {TERMS.map(([k, v]) => (
                  <div key={k}>
                    <dt className="ul-mono">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Photos */}
        <section id="work" className="ul-sec ul-sec--dusk ul-pitch">
          <div className="ul-wrap">
            <header className="ul-head" data-reveal>
              <p className="ul-mono ul-kicker">What we build</p>
              <h2 className="ul-h2">
                Light, height <em>and a way up.</em>
              </h2>
            </header>
            <ul className="ul-shots">
              {SHOTS.map((s, i) => (
                <li key={s.title} className="ul-shot" data-reveal style={{ "--d": `${i * 110}ms`, "--i": i } as CSSProperties}>
                  <div className="ul-shot-img">
                    <Image src={`${M}/${s.img}`} alt={s.alt} fill sizes="(min-width: 900px) 400px, 92vw" />
                    <span className="ul-mono ul-shot-n">0{i + 1}</span>
                  </div>
                  <div className="ul-shot-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="ul-tags">
                      {s.tags.map((t) => (
                        <li key={t} className="ul-tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------------- Process */}
        <section id="process" className="ul-sec ul-sec--plaster ul-pitch">
          <div className="ul-wrap">
            <header className="ul-head ul-head--row">
              <div data-reveal>
                <p className="ul-mono ul-kicker">Survey to handover</p>
                <h2 className="ul-h2">
                  Six steps, <em>all upward.</em>
                </h2>
              </div>
              <a href="#survey" className="ul-btn ul-btn--night">
                Start with a survey
                <Arrow />
              </a>
            </header>
            <ol className="ul-steps" data-scrub data-start="top 85%" data-end="bottom 60%">
              {STEPS.map(([title, when, text], i) => (
                <li key={title} className="ul-step" style={{ "--i": i } as CSSProperties}>
                  <span className="ul-step-n">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p className="ul-mono ul-step-when">{when}</p>
                  <p className="ul-step-text">{text}</p>
                </li>
              ))}
            </ol>
            <p className="ul-mono ul-steps-note">
              A typical programme for a dormer loft. Yours is set out in writing before we start.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- Questions */}
        <section id="questions" className="ul-sec ul-sec--night">
          <div className="ul-wrap ul-faq">
            <header className="ul-head ul-faq-head" data-reveal>
              <p className="ul-mono ul-kicker">Common questions</p>
              <h2 className="ul-h2">
                Asked at <em>every survey.</em>
              </h2>
            </header>
            <div className="ul-faq-list">
              {FAQS.map(([q, a], i) => (
                <details key={q} className="ul-q" open={i === 0}>
                  <summary>
                    <span className="ul-mono">0{i + 1}</span>
                    <span className="ul-q-text">{q}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
            <div className="ul-ask">
              <p className="ul-mono">Not sure which applies to you?</p>
              <p className="ul-ask-text">
                Send a photo of your loft hatch and the roof from the garden. We will tell you what looks possible.
              </p>
              <a href={PHONE_HREF} className="ul-ask-phone">
                {PHONE}
              </a>
              <a href="#survey" className="ul-link">
                Or book a survey
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- Reviews */}
        <section id="reviews" className="ul-sec ul-sec--plaster ul-pitch">
          <div className="ul-wrap">
            <header className="ul-head" data-reveal>
              <p className="ul-mono ul-kicker">Sample reviews · this is a demo</p>
              <h2 className="ul-h2">
                What people say <em>from the top floor.</em>
              </h2>
            </header>
            <ul className="ul-reviews">
              {REVIEWS.map(([quote, who, job, weeks], i) => (
                <li key={who} className="ul-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <div className="ul-review-top">
                    <span className="ul-stars" role="img" aria-label="Five stars">
                      ★★★★★
                    </span>
                    <span className="ul-tag ul-tag--ink">{job}</span>
                  </div>
                  <blockquote>{quote}</blockquote>
                  <dl className="ul-review-facts">
                    <div>
                      <dt className="ul-mono">On site</dt>
                      <dd>{weeks}</dd>
                    </div>
                    <div>
                      <dt className="ul-mono">Moved out</dt>
                      <dd>No</dd>
                    </div>
                  </dl>
                  <p className="ul-mono ul-review-who">{who}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Survey */}
        <section id="survey" className="ul-final ul-pitch">
          <div className="ul-wrap ul-final-grid">
            <div className="ul-final-copy">
              <p className="ul-mono ul-kicker">Book a loft survey</p>
              <h2 className="ul-h2 ul-final-title">
                Find out what is <em>above your ceiling.</em>
              </h2>
              <p className="ul-lead">
                A surveyor measures up, checks the head height and talks you through the options. It takes about an
                hour, it is free, and a fixed price follows in writing.
              </p>
              <div className="ul-final-foot">
                <a href={PHONE_HREF} className="ul-final-phone">
                  <span className="ul-mono">Or call the office</span>
                  {PHONE}
                </a>
                <div className="ul-final-window" aria-hidden="true">
                  <div className="ul-window-frame">
                    <div className="ul-window-glass">
                      <Image src={`${M}/detail.webp`} alt="" fill sizes="240px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SurveyForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="ul-footer">
        <div className="ul-wrap ul-footer-grid">
          <p className="ul-logo">
            <span className="ul-logo-mark" aria-hidden="true" />
            <span>
              Upstairs<small>Loft Co.</small>
            </span>
          </p>
          <p className="ul-footer-note">
            Upstairs Loft Co. is a fictional business. This page is a demo by Integrate Web Design, made to show the
            kind of homepage we build for loft conversion companies.
          </p>
          <a href="/web-design#immersive" className="ul-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="ul-bar">
        <a href="#survey" className="ul-btn ul-btn--glow">
          Book a loft survey
        </a>
        <a href={PHONE_HREF} className="ul-btn ul-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
