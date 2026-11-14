import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, Cutaway, LaidCounter, SurveyForm, TideReadout } from "./_components/parts";
import "./bathroom-fitters.css";

/**
 * Tideline Bathrooms: an immersive demo homepage for a bathroom fitter.
 *
 * Concept: the tide comes in. A tired bathroom goes under and a new one
 * surfaces. The signature scene floods a line drawing of a dated bathroom
 * with the finished wet room as you scroll.
 *
 * The business, its phone number, reviews and promises are all made up.
 * Photography is generated (public/media/demos/bathroom-fitters).
 */

const display = localFont({
  src: [
    { path: "../../../../assets/fonts/dm-serif-display/dm-serif-display-400.woff2", weight: "400", style: "normal" },
    {
      path: "../../../../assets/fonts/dm-serif-display/dm-serif-display-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-tb-display",
  display: "swap",
});
const body = localFont({
  src: "../../../../assets/fonts/figtree/figtree-300-900.woff2",
  weight: "300 900",
  variable: "--font-tb-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tideline Bathrooms | Demo bathroom fitter homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a bathroom fitter, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 218";
const PHONE_HREF = "tel:01632960218";
const M = "/media/demos/bathroom-fitters";

/* The waterline: one curve, used as the clip edge of the water layer and as
   the bright line drawn along it. It spans two frame widths and repeats
   exactly at the half, so sliding it by half its width loops seamlessly. */
const WAVE_STEPS = 96;
const waveY = (t: number) =>
  14 + 6 * Math.sin(t * 4 * 2 * Math.PI) + 2.2 * Math.sin(t * 8 * 2 * Math.PI + 1.1);
const WAVE_CLIP = `polygon(${Array.from({ length: WAVE_STEPS + 1 }, (_, i) => {
  const t = i / WAVE_STEPS;
  return `${(t * 100).toFixed(2)}% ${waveY(t).toFixed(1)}px`;
}).join(",")},100% 100%,0% 100%)`;
const WAVE_LINE = Array.from({ length: WAVE_STEPS + 1 }, (_, i) => {
  const t = i / WAVE_STEPS;
  return `${i === 0 ? "M" : "L"}${(t * 1000).toFixed(1)} ${(waveY(t) + 0.8).toFixed(1)}`;
}).join("");

/* x %, size px, seconds to rise, delay s */
const BUBBLES = [
  [7, 7, 7.5, 0],
  [18, 4, 9, 2.1],
  [29, 9, 8.2, 4.4],
  [44, 5, 10, 1.2],
  [57, 8, 7, 3.3],
  [68, 4, 9.5, 5.6],
  [80, 10, 8.6, 0.6],
  [91, 5, 7.8, 2.9],
];

const SCHEDULE = [
  ["D 01-02", "Strip out", "done"],
  ["D 03-04", "First fix", "done"],
  ["D 05-07", "Tank and tile", "now"],
  ["D 08-09", "Second fix", "next"],
  ["D 10", "Sealed, handed over", "next"],
];

const STAGES = [
  ["01", "Days 1-2", "Strip out", "Old suite, tiles and flooring out. Walls back to sound studwork and the waste gone the same day."],
  ["02", "Days 3-4", "First fix", "New pipes, wastes and cables run inside the walls while they are open, then pressure tested."],
  ["03", "Days 5-7", "Tank and tile", "Backer board on, every wet surface tanked and flood tested. Then tile, laid to a laser line."],
  ["04", "Days 8-10", "Second fix", "Screen, brassware, vanity and lighting fitted. Sealed, tested and handed over clean."],
];

const ROOMS = [
  {
    key: "wet",
    img: "detail.webp",
    pos: "50% 28%",
    alt: "A brass rainfall shower head running in front of teal glazed tiles",
    title: "Wet rooms",
    body: "A level floor, a glass screen and nothing to step over. Fully tanked, with the fall to the drain built into the floor itself.",
    rows: [
      ["On site", "8 to 10 working days"],
      ["Floor", "Formed fall to a linear drain"],
      ["Tanked", "Walls and floor, flood tested"],
    ],
    tags: ["Walk-in showers", "Underfloor heating", "Recessed shelves"],
  },
  {
    key: "refit",
    img: "scene.webp",
    pos: "60% 60%",
    alt: "A freestanding bath beside a tall sash window with a linen curtain",
    title: "Full refits",
    body: "Everything out and a new room in. Bath or shower, basin, WC, heating, lighting, tiling and decorating, on one quote.",
    rows: [
      ["On site", "10 to 12 working days"],
      ["Trades", "Plumbing, electrics, tiling, plastering"],
      ["Waste", "Cleared and recycled by us"],
    ],
    tags: ["Freestanding baths", "Wall panelling"],
  },
  {
    key: "ensuite",
    img: "hero.webp",
    pos: "72% 55%",
    alt: "An oak wall-hung vanity under a round backlit mirror on a teal tiled wall",
    title: "En-suites",
    body: "Small rooms planned to the centimetre. Wall-hung furniture, recessed storage and pocket doors to win back the floor.",
    rows: [
      ["On site", "6 to 8 working days"],
      ["Good for", "Lofts, box rooms, under the eaves"],
      ["Air", "Quiet fan, ducted outside"],
    ],
    tags: ["Wall-hung vanities", "Backlit mirrors"],
  },
  {
    key: "access",
    img: "hero.webp",
    pos: "8% 70%",
    alt: "A walk-in shower with a level floor, a linear drain and a recessed shelf in the wall",
    title: "Accessible bathrooms",
    body: "Level-access showers, fold-down seats, rails that pass for towel rails and room to turn. Safe to use, and nothing about it looks clinical.",
    rows: [
      ["On site", "8 to 10 working days"],
      ["Access", "Level threshold, wider doorway"],
      ["Details", "Seat, rails, easy-turn valves"],
    ],
    tags: ["Level access", "Slip-rated floors", "Comfort-height WCs"],
  },
];

const TILE_ROWS = 3;
const TILE_COLS = 24;

const PROMISES = [
  ["One team", "The fitters who strip the room are the ones who seal it. No handing you from trade to trade, and one name to call."],
  ["Dust sheets down", "Floors and stairs covered before a tool comes in. The route to the skip is swept and hoovered every evening."],
  ["Sealed and tested", "Pipework pressure tested, the tanking flood tested, and the silicone left to cure before you turn a tap."],
];

const HANDOVER = [
  ["Pressure test, new pipework", "Passed"],
  ["Flood test, 24 hours", "Passed"],
  ["Silicone cure time", "24 h"],
  ["Extractor run-on", "Set"],
  ["Photos of every hidden layer", "Sent"],
];

const REVIEWS = [
  [
    "They found a rotten joist under the old bath, sent us the photo and had it put right by lunch. No drama and no extra days.",
    "Homeowner",
    "Family bathroom refit",
  ],
  [
    "Ten working days, exactly as written on the quote. The stairs were covered every morning and hoovered every night.",
    "Homeowner",
    "En-suite in a loft",
  ],
  [
    "Mum can shower on her own again. Level floor, a seat that folds away, and it does not look like a hospital.",
    "Homeowner",
    "Accessible wet room",
  ],
];

const JOB_LOG = [
  ["9", "Wet room, ground floor", "On programme"],
  ["7", "En-suite in a loft", "On programme"],
  ["11", "Family bathroom refit", "A day early"],
  ["10", "Accessible wet room", "On programme"],
];

const SURVEY = [
  ["45 min", "A fitter measures up and checks the walls, floor and water pressure."],
  ["Day 3", "A fixed, written quote and a start date, by email."],
  ["£0", "The survey is free, and there is no deposit to book it."],
];

function Logo() {
  return (
    <>
      <svg viewBox="0 0 34 24" width="34" height="24" fill="none" aria-hidden="true" className="tb-logo-mark">
        <path d="M2 7c5-5 9-5 15 0s10 5 15 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M2 16c5-5 9-5 15 0s10 5 15 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      </svg>
      <span>
        Tideline<small>Bathrooms</small>
      </span>
    </>
  );
}

/** The "before": a dated bathroom, drawn as a muted line illustration. */
function BeforeDrawing() {
  const rings = Array.from({ length: 11 }, (_, i) => 62 + i * 19);
  const folds = Array.from({ length: 9 }, (_, i) => 74 + i * 21);
  const fins = Array.from({ length: 8 }, (_, i) => 666 + i * 13.5);
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="tb-before-svg">
      <defs>
        <pattern id="tb-sq" x="0" y="160" width="27" height="27" patternUnits="userSpaceOnUse">
          <rect width="27" height="27" fill="#d9d4c5" />
          <path d="M27 0V27H0" fill="none" stroke="#b6b09e" strokeWidth="1.4" />
        </pattern>
        <pattern id="tb-lino" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="44" height="44" fill="#cfc9b9" />
          <rect width="22" height="22" fill="#c5beac" />
          <rect x="22" y="22" width="22" height="22" fill="#c5beac" />
        </pattern>
      </defs>

      {/* painted wall, tiles to the dado, lino floor */}
      <rect width="800" height="600" fill="#e2ded1" />
      <path d="M408 30q20-14 44-4 22 10 8 26-18 14-44 4-16-10-8-26z" className="tb-d-stain" />
      <rect y="160" width="800" height="324" fill="url(#tb-sq)" />
      <rect y="150" width="800" height="10" fill="#b9c3a5" />
      <path d="M0 150H800M0 160H800" className="tb-d-thin" />
      {[
        [135, 268],
        [432, 430],
        [567, 214],
        [270, 187],
        [729, 376],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="27" height="27" fill="#c7c0ab" />
      ))}
      <path d="M278 187l7 13-5 11 8 16" className="tb-d-thin" />
      <rect y="484" width="800" height="116" fill="url(#tb-lino)" />
      <path d="M0 484H800" className="tb-d-line" />

      {/* light pull */}
      <path d="M632 0V132" className="tb-d-thin" />
      <ellipse cx="632" cy="138" rx="3.5" ry="6.5" className="tb-d-fill" />

      {/* shower curtain on its rail */}
      <path d="M26 92H430" className="tb-d-rail" />
      <circle cx="26" cy="92" r="6" className="tb-d-fill" />
      <circle cx="430" cy="92" r="6" className="tb-d-fill" />
      <path
        d="M52 106H262V396q-10.500 10-21 0t-21 0-21 0-21 0-21 0-21 0-21 0-21 0-21 0-21 0Z"
        className="tb-d-fill tb-d-curtain"
      />
      {folds.map((x) => (
        <path key={x} d={`M${x} 108C${x - 6} 200 ${x + 6} 300 ${x} 392`} className="tb-d-thin" />
      ))}
      <path d="M52 330H262M52 344H262" className="tb-d-thin" />
      {rings.map((x) => (
        <circle key={x} cx={x} cy="100" r="5.5" className="tb-d-line" />
      ))}

      {/* electric shower, riser and hose */}
      <rect x="306" y="196" width="52" height="86" rx="7" className="tb-d-fill" />
      <circle cx="332" cy="222" r="5" className="tb-d-line" />
      <circle cx="332" cy="256" r="11" className="tb-d-line" />
      <path d="M332 256l6-7" className="tb-d-line" />
      <path d="M394 168V332" className="tb-d-rail" />
      <path d="M332 282C332 352 402 356 398 208" className="tb-d-line" />
      <path d="M384 198l22-10 4 9-22 10z" className="tb-d-fill" />

      {/* the bath */}
      <rect x="44" y="396" width="372" height="88" className="tb-d-fill" />
      <path d="M137 406V474M230 406V474M323 406V474" className="tb-d-thin" />
      <rect x="34" y="380" width="392" height="18" rx="9" className="tb-d-fill" />
      <path d="M376 380v-20h13M368 356h16M404 380v-22M396 356h16" className="tb-d-line" />
      <rect x="118" y="512" width="176" height="44" rx="6" className="tb-d-fill tb-d-mat" />
      <rect x="126" y="519" width="160" height="30" rx="3" className="tb-d-thin tb-d-dash" />

      {/* mirror cabinet and pedestal basin */}
      <g transform="translate(-34 0)">
        <rect x="496" y="164" width="90" height="12" rx="6" className="tb-d-fill" />
        <rect x="486" y="178" width="110" height="104" className="tb-d-fill tb-d-glass" />
        <path d="M541 178V282M498 262l22-40M506 270l14-26" className="tb-d-thin" />
        <circle cx="533" cy="232" r="3" className="tb-d-line" />
        <circle cx="549" cy="232" r="3" className="tb-d-line" />
        <path d="M522 397h38l9 87h-56z" className="tb-d-fill" />
        <path d="M476 332H606V344C606 380 578 398 541 398S476 380 476 344Z" className="tb-d-fill" />
        <path d="M490 344C490 372 514 386 541 386S592 372 592 344" className="tb-d-thin" />
        <path d="M506 332v-16M497 314h18M576 332v-16M567 314h18" className="tb-d-line" />
      </g>

      {/* extractor, window and the one radiator */}
      <g transform="translate(-50 0)">
        <rect x="694" y="92" width="40" height="40" rx="4" className="tb-d-fill" />
        <path d="M702 104h24M702 112h24M702 120h24" className="tb-d-thin" />
        <rect x="652" y="176" width="122" height="126" className="tb-d-fill tb-d-glass" />
        <path d="M713 176V302M652 226H774M664 290l18-30M724 216l14-24M736 290l22-36" className="tb-d-thin" />
        <rect x="644" y="302" width="138" height="9" className="tb-d-fill" />
        <rect x="654" y="338" width="118" height="112" rx="5" className="tb-d-fill" />
        {fins.map((x) => (
          <path key={x} d={`M${x} 350V440`} className="tb-d-thin" />
        ))}
        <path d="M662 450V484M764 450V484" className="tb-d-line" />
        <circle cx="662" cy="460" r="5" className="tb-d-fill" />
        <path d="M676 330h54v62q-27 8-54 0z" className="tb-d-fill tb-d-towel" />
        <path d="M676 343h54" className="tb-d-thin" />
      </g>

      {/* call-outs (wide screens only) */}
      <g className="tb-d-notes">
        <path d="M150 64V98M332 146V192M507 528V490M663 528V456" className="tb-d-thin" />
        <text x="122" y="56">Shower curtain</text>
        <text x="272" y="138">Electric shower</text>
        <text x="507" y="546" textAnchor="middle">Pedestal basin</text>
        <text x="663" y="546" textAnchor="middle">One radiator</text>
      </g>
    </svg>
  );
}

export default function TidelinePage() {
  return (
    <div className={`tb ${display.variable} ${body.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="tb-header">
        <a href="#top" className="tb-logo" aria-label="Tideline Bathrooms, home">
          <Logo />
        </a>
        <nav className="tb-nav" aria-label="Main">
          <a href="#tide">High tide</a>
          <a href="#behind">Behind the tiles</a>
          <a href="#rooms">What we fit</a>
          <a href="#work">How we work</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="tb-header-phone">
          <span className="tb-mono">Call the workshop</span>
          {PHONE}
        </a>
        <a href="#survey" className="tb-btn tb-btn--brass tb-header-cta">
          Book a survey
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="tb-hero" data-scrub="exit" data-loop>
          <div className="tb-wrap tb-hero-grid">
            <div className="tb-hero-copy">
              <p className="tb-mono tb-hero-kicker">
                <span className="tb-drop" aria-hidden="true" />
                Wet rooms · Refits · En-suites
                <span className="tb-wide-only"> · Accessible bathrooms</span>
              </p>
              <h1 className="tb-h1">
                Turn the tide
                <br />
                on a <em>tired bathroom.</em>
              </h1>
              <p className="tb-hero-sub">
                Tideline strips out, tanks, tiles and finishes bathrooms and wet rooms with one team, start to finish.
                Most rooms are back in use within ten working days.
              </p>
              <div className="tb-hero-actions">
                <a href="#survey" className="tb-btn tb-btn--brass tb-btn--lg">
                  Book a survey
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="tb-btn tb-btn--ghost tb-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="tb-hero-chips">
                <li>Fixed written quote</li>
                <li>Flood tested before tiling</li>
                <li>Guaranteed in writing</li>
              </ul>
            </div>

            <div className="tb-hero-visual">
              <div className="tb-arch">
                <Image
                  src={`${M}/hero.webp`}
                  alt="A finished wet room with a walk-in shower, a teal tiled wall, brass fittings, an oak vanity and a round backlit mirror"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="tb-arch-img"
                />
              </div>

              {/* A sample of the schedule every customer is given. */}
              <aside className="tb-sched" aria-label="Sample fitting schedule">
                <div className="tb-sched-head">
                  <p className="tb-mono">Fitted in</p>
                  <span className="tb-mono tb-sched-chip">Sample schedule</span>
                </div>
                <p className="tb-sched-big">
                  10 <span>working days</span>
                </p>
                <ul className="tb-sched-rows">
                  {SCHEDULE.map(([days, label, state]) => (
                    <li key={label} data-state={state}>
                      <span className="tb-mono">{days}</span>
                      <span className="tb-sched-label">{label}</span>
                      <span className="tb-sched-state" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
                <div className="tb-sched-foot">
                  <span className="tb-sched-bar" aria-hidden="true">
                    <i />
                  </span>
                  <span className="tb-mono">Day 06 · second coat on</span>
                </div>
              </aside>

              <div className="tb-seal" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="tb-seal-ring">
                  <defs>
                    <path id="tb-seal-path" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
                  </defs>
                  <text>
                    <textPath href="#tb-seal-path" textLength="276">
                      FLOOD TESTED BEFORE A SINGLE TILE GOES ON ·
                    </textPath>
                  </text>
                </svg>
                <span className="tb-seal-core">
                  24<small>hours</small>
                </span>
              </div>
            </div>
          </div>

          <div className="tb-hero-tide" aria-hidden="true">
            <svg viewBox="0 0 2880 100" preserveAspectRatio="none">
              <path d="M0 40Q180 0 360 40T720 40T1080 40T1440 40T1800 40T2160 40T2520 40T2880 40V100H0Z" />
            </svg>
          </div>
          <p className="tb-hero-ticker tb-mono" aria-hidden="true">
            <span>Scroll</span>
            <i />
            <span>The tide is coming in</span>
          </p>
        </section>

        {/* ------------------------------------------------ Signature: high tide */}
        <section
          id="tide"
          className="tb-tide imm-pin"
          data-scrub="pin"
          data-steps="4"
          data-loop
          style={{ "--pin": 2.5 } as CSSProperties}
        >
          <div className="imm-stage tb-tide-stage">
            <div className="tb-wrap tb-tide-grid">
              <div className="tb-tide-head">
                <p className="tb-mono tb-kicker">How a Tideline job runs</p>
                <h2 className="tb-h2">
                  High <em>tide.</em>
                </h2>
                <p className="tb-lead tb-tide-lead">
                  Keep scrolling. The old bathroom goes under, and the room we hand back surfaces.
                </p>
              </div>

              <div className="tb-tide-view" aria-hidden="true">
                <div className="tb-tide-frame">
                  <div className="tb-before">
                    <BeforeDrawing />
                    <span className="tb-mono tb-chip tb-chip--before">Before</span>
                  </div>

                  <div className="tb-rise">
                    <div className="tb-wave" style={{ "--tb-wave-clip": WAVE_CLIP } as CSSProperties}>
                      <div className="tb-wave-in">
                        <div className="tb-photo-hold">
                          <div className="tb-photo">
                            <Image
                              src={`${M}/hero.webp`}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 720px, 92vw"
                              className="tb-photo-img"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="tb-surface" />
                      <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="tb-wave-line">
                        <path d={WAVE_LINE} />
                      </svg>
                    </div>
                    <div className="tb-bubbles">
                      {BUBBLES.map(([x, s, t, d]) => (
                        <span
                          key={x}
                          className="tb-bubble"
                          style={{ "--x": `${x}%`, "--s": `${s}px`, "--t": `${t}s`, "--dl": `${-d}s` } as CSSProperties}
                        />
                      ))}
                    </div>
                    <span className="tb-mono tb-chip tb-chip--after">After · tanked wet room</span>
                  </div>

                  <div className="tb-gauge">
                    {[0, 27.8, 55.6, 83.3].map((at, i) => (
                      <span key={at} className="tb-mono" style={{ "--at": at } as CSSProperties}>
                        0{i + 1}
                      </span>
                    ))}
                  </div>
                </div>
                <TideReadout />
              </div>

              <div className="tb-tide-rail">
                <ol className="tb-stages">
                  {STAGES.map(([n, days, title, text], i) => (
                    <li key={n} className="tb-stage" style={{ "--i": i } as CSSProperties}>
                      <span className="tb-mono tb-stage-n">{n}</span>
                      <h3>{title}</h3>
                      <span className="tb-mono tb-stage-days">{days}</span>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>
                <a href="#survey" className="tb-btn tb-btn--brass tb-tide-cta">
                  Book a survey
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- Behind the tiles */}
        <section id="behind" className="tb-section tb-section--chalk tb-edge">
          <div className="tb-wrap">
            <header className="tb-head tb-head--split" data-reveal>
              <div>
                <p className="tb-mono tb-kicker">Behind the tiles</p>
                <h2 className="tb-h2">
                  The work <em>nobody sees.</em>
                </h2>
              </div>
              <p className="tb-lead">
                Five layers sit between your shower and the room next door. Tap one to pull it forward. We fit all
                five, and photograph each one before it is covered up.
              </p>
            </header>
            <div data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <Cutaway />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Rooms */}
        <section id="rooms" className="tb-section tb-section--teal tb-edge">
          <div className="tb-wrap">
            <header className="tb-head tb-head--row">
              <div data-reveal>
                <p className="tb-mono tb-kicker">What we fit</p>
                <h2 className="tb-h2">
                  Four rooms we know <em>inside out.</em>
                </h2>
              </div>
              <a href="#survey" className="tb-btn tb-btn--ghost">
                Book a survey
                <Arrow />
              </a>
            </header>

            <div className="tb-rooms">
              {ROOMS.map((r, i) => (
                <article
                  key={r.key}
                  className={`tb-room tb-room--${r.key}`}
                  data-reveal
                  style={{ "--d": `${(i % 2) * 110}ms` } as CSSProperties}
                >
                  <div className="tb-room-img">
                    <Image
                      src={`${M}/${r.img}`}
                      alt={r.alt}
                      fill
                      sizes="(min-width: 1024px) 520px, 92vw"
                      style={{ objectPosition: r.pos }}
                    />
                    <span className="tb-mono tb-room-n">0{i + 1}</span>
                  </div>
                  <div className="tb-room-body">
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                    <dl className="tb-room-rows">
                      {r.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt className="tb-mono">{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="tb-tags">
                      {r.tags.map((t) => (
                        <li key={t} className="tb-tag">
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

        {/* ---------------------------------------------- Tile wall and promises */}
        <section id="work" className="tb-section tb-section--chalk tb-edge">
          <div className="tb-wrap">
            <header className="tb-head tb-head--split" data-reveal>
              <div>
                <p className="tb-mono tb-kicker">How we work</p>
                <h2 className="tb-h2">
                  Laid level. <em>Sealed and tested.</em>
                </h2>
              </div>
              <p className="tb-lead">
                Every Tideline room is set out from one laser line, so the tiles meet in the corners and the floor
                falls to the drain, not the door.
              </p>
            </header>

            <div
              className="tb-lay"
              data-scrub="enter"
              data-end="top 22%"
              aria-hidden="true"
            >
              <div className="tb-lay-grid">
                {Array.from({ length: TILE_ROWS * TILE_COLS }, (_, n) => {
                  const r = Math.floor(n / TILE_COLS);
                  const c = n % TILE_COLS;
                  return (
                    <span
                      key={n}
                      className={`tb-tile${c >= 12 ? " tb-tile--wide" : ""}`}
                      style={{ "--r": r, "--c": c } as CSSProperties}
                    />
                  );
                })}
              </div>
              <span className="tb-laser" />
              <span className="tb-mono tb-lay-chip tb-lay-chip--laser">Laser datum · dead level</span>
              <LaidCounter />
            </div>

            <div className="tb-work-grid">
              <figure className="tb-shot" data-reveal="left">
                <div className="tb-shot-img">
                  <Image
                    src={`${M}/extra.webp`}
                    alt="A tiler pressing a large tile onto combed adhesive, with a red laser line across the wall"
                    fill
                    sizes="(min-width: 1024px) 560px, 92vw"
                  />
                  <span className="tb-mono tb-note tb-note--a">Full bed, combed</span>
                  <span className="tb-mono tb-note tb-note--b">Laser datum</span>
                </div>
                <figcaption className="tb-mono">Day 06 · wall tile going on over cured tanking</figcaption>
              </figure>

              <div className="tb-work-side">
                <ol className="tb-promises">
                  {PROMISES.map(([title, text], i) => (
                    <li key={title} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                      <span className="tb-mono">0{i + 1}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <aside className="tb-sheet" aria-label="Sample handover sheet">
                  <div className="tb-sheet-head">
                    <p className="tb-mono">Handover sheet · sample</p>
                    <span className="tb-mono tb-sheet-chip">Signed off</span>
                  </div>
                  <ul>
                    {HANDOVER.map(([item, result]) => (
                      <li key={item}>
                        <span className="tb-tick" aria-hidden="true" />
                        <span>{item}</span>
                        <span className="tb-mono">{result}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="tb-sheet-foot">
                    <p>Workmanship guaranteed in writing, handed over with the invoice.</p>
                    <a href="#survey" className="tb-link">
                      Book a survey
                      <Arrow />
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="tb-section tb-section--glass tb-edge">
          <div className="tb-wrap">
            <header className="tb-head" data-reveal>
              <p className="tb-mono tb-kicker">Sample reviews · this is a demo</p>
              <h2 className="tb-h2">
                What people say <em>after the first shower.</em>
              </h2>
            </header>
            <ul className="tb-reviews">
              {REVIEWS.map(([quote, who, job], i) => (
                <li key={job} className="tb-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <span className="tb-stars" role="img" aria-label="Five stars">
                    ★★★★★
                  </span>
                  <blockquote>{quote}</blockquote>
                  <p className="tb-review-who">
                    <span>{who}</span>
                    <span className="tb-mono">{job}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="tb-log" data-reveal>
              <p className="tb-mono tb-log-head">
                <span>Recently handed over</span>
                <span>Sample job log</span>
              </p>
              <ul>
                {JOB_LOG.map(([days, room, note]) => (
                  <li key={room}>
                    <p className="tb-log-days">
                      {days} <span>working days</span>
                    </p>
                    <p className="tb-log-room">{room}</p>
                    <p className="tb-mono tb-log-note">{note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- Survey */}
        <section id="survey" className="tb-survey tb-edge">
          <div className="tb-wrap tb-survey-grid">
            <div className="tb-survey-copy">
              <p className="tb-mono tb-kicker">Book a survey</p>
              <h2 className="tb-h2 tb-survey-title">
                We bring the tape. <em>You keep the drawings.</em>
              </h2>
              <p className="tb-lead">
                A fitter, not a salesman, comes to measure up and look behind the bath panel. You get a fixed price in
                writing, whether you go ahead or not.
              </p>
              <ul className="tb-survey-rows">
                {SURVEY.map(([k, v]) => (
                  <li key={k}>
                    <span className="tb-survey-k">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
              <div className="tb-survey-call">
                <div className="tb-survey-photo">
                  <Image
                    src={`${M}/scene.webp`}
                    alt="A freestanding bath by a tall window in a finished bathroom"
                    fill
                    sizes="160px"
                  />
                </div>
                <a href={PHONE_HREF} className="tb-survey-phone">
                  <span className="tb-mono">Or call the workshop</span>
                  {PHONE}
                </a>
              </div>
            </div>
            <SurveyForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="tb-footer">
        <div className="tb-wrap tb-footer-grid">
          <p className="tb-logo">
            <Logo />
          </p>
          <div className="tb-footer-note">
            <p>
              Tideline Bathrooms is a fictional business. This page is a demo by Integrate Web Design, made to show
              the kind of homepage we build for bathroom fitters.
            </p>
            <p className="tb-mono">Wet rooms · Refits · En-suites · Accessible bathrooms · {PHONE}</p>
          </div>
          <a href="/web-design#immersive" className="tb-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="tb-bar">
        <a href="#survey" className="tb-btn tb-btn--brass">
          Book a survey
        </a>
        <a href={PHONE_HREF} className="tb-btn tb-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
