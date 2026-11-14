import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, CommissionForm, GapReadout, TimberSelector } from "./_components/parts";
import "./joiners.css";

/**
 * Harrow & Pike Joinery: an immersive demo homepage for a joiner.
 *
 * Concept: things that fit. The page comes together like a joint. The
 * signature scene slides two oak boards together until a dovetail closes
 * flush and the headline reads whole; every section below it is seated into
 * the one above with a row of dovetails.
 *
 * The business, its phone number, reviews and promises are all made up.
 * Photography is generated (public/media/demos/joiners).
 */

const display = localFont({
  src: "../../../../assets/fonts/young-serif/young-serif-400.woff2",
  weight: "400",
  variable: "--font-hp-display",
  display: "swap",
});
const body = localFont({
  src: "../../../../assets/fonts/figtree/figtree-300-900.woff2",
  weight: "300 900",
  variable: "--font-hp-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harrow & Pike Joinery | Demo joiner homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a joinery workshop, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 274";
const PHONE_HREF = "tel:01632960274";
const M = "/media/demos/joiners";

/** The workshop sheet pinned to the hero photograph. */
const CUTTING: [string, string, string, "cut" | "bench" | "next"][] = [
  ["Treads", "12", "920 × 275 × 32", "cut"],
  ["Risers", "13", "920 × 203 × 12", "cut"],
  ["Strings", "2", "4100 × 280 × 32", "cut"],
  ["Newel post", "1", "1450 × 90 × 90", "bench"],
  ["Spindles", "26", "900 × 41 × 41", "next"],
  ["Handrail", "1", "3900 × 68 × 56", "next"],
];

const NOTES = [
  ["01", "Marked with a knife", "A pencil line is half a millimetre wide. We mark every joint with a knife and cut to the line."],
  ["02", "Cut by hand, tried dry", "Each joint goes together dry before any glue is opened. If it needs forcing, it is not finished."],
  ["03", "Brought home flush", "One tap of the mallet and it seats. No filler, no pins, no gap you could slide a receipt into."],
];

/** Curled shavings: where each one comes to rest (per cent across the bench). */
const SHAVINGS = [
  { xm: 35, xd: 5, size: 2.9, turns: 1.7, rot: -14, drift: -7, lift: 0.1, wide: false },
  { xm: 46, xd: 12.5, size: 2.1, turns: 1.4, rot: 38, drift: 3, lift: 0.34, wide: false },
  { xm: 55, xd: 23, size: 3.2, turns: 1.9, rot: 9, drift: 8, lift: 0.04, wide: false },
  { xm: 0, xd: 33, size: 2.4, turns: 1.5, rot: -42, drift: 0, lift: 0.3, wide: true },
  { xm: 0, xd: 61, size: 3, turns: 1.8, rot: 24, drift: 0, lift: 0.08, wide: true },
  { xm: 0, xd: 68, size: 2, turns: 1.4, rot: -10, drift: 0, lift: 0.36, wide: true },
  { xm: 0, xd: 91, size: 3.5, turns: 1.9, rot: 58, drift: 0, lift: 0.02, wide: true },
];

const STAGES = [
  {
    n: "01",
    title: "Measure",
    when: "Week 0",
    text: "We come to you with a laser, a rod and a notebook, measure the opening and listen to what you want.",
    tag: "Free visit, about an hour",
  },
  {
    n: "02",
    title: "Draw",
    when: "Week 1",
    text: "You get a scale drawing and one fixed price. Change it until it is right. Nothing is cut until you sign it off.",
    tag: "Drawing within a week",
  },
  {
    n: "03",
    title: "Make",
    when: "Weeks 2 to 8",
    text: "Your piece is built in our workshop, put together dry and finished before it ever leaves the bench.",
    tag: "Photos sent as it comes together",
  },
  {
    n: "04",
    title: "Fit",
    when: "Week 9",
    text: "The people who made it fit it. Scribed to your walls, dust sheets down, and done in days, not weeks.",
    tag: "Two to four days on site",
  },
];

const PROGRAMME = [
  ["Measure and draw", "1 week"],
  ["In the workshop", "5 to 7 weeks"],
  ["On site", "2 to 4 days"],
];

const MAKES = [
  {
    title: "Staircases",
    short: "a staircase",
    body: "Straight flights, winders and full replacements, with turned or square newels and a handrail shaped to the hand.",
    specs: [
      ["Timber", "Oak, ash or painted softwood"],
      ["In the workshop", "Five to seven weeks"],
      ["On site", "Two to four days"],
    ],
    img: "hero.webp",
    alt: "A handmade oak staircase with a turned newel post rising through a period hallway",
    pos: "46% 50%",
  },
  {
    title: "Fitted wardrobes and alcoves",
    short: "fitted furniture",
    body: "Cabinets scribed to chimney breasts, sloping ceilings and walls that have never been square. Painted, oak, or both.",
    specs: [
      ["Carcass", "Birch ply or tulipwood"],
      ["Shelves", "Solid oak, 28 mm"],
      ["Finish", "Sprayed, then touched in by hand"],
    ],
    img: "scene.webp",
    alt: "Forest green fitted alcove cabinets with oak shelves either side of a stone fireplace",
    pos: "50% 50%",
  },
  {
    title: "Doors and windows",
    short: "doors or windows",
    body: "Panelled doors, frames and box sash windows, made like for like so the new ones sit quietly beside the old.",
    specs: [
      ["Doors", "Four and six panel, ledged and braced"],
      ["Windows", "Box sash and casement"],
      ["Glazing", "Slim double glazed units"],
    ],
    img: null,
    alt: "",
    pos: "50% 50%",
  },
  {
    title: "One-off furniture",
    short: "a piece of furniture",
    body: "Tables, benches, bookcases and blanket boxes. Dovetailed by hand, signed underneath and built to be handed down.",
    specs: [
      ["Joints", "Dovetail, mortise and tenon"],
      ["Timber", "Oak, walnut or ash"],
      ["Design", "Your drawing or ours"],
    ],
    img: "detail.webp",
    alt: "The hand-cut dovetail corner of an oak box on a workbench, with curled shavings beside it",
    pos: "50% 58%",
  },
];

const RULES = [
  ["Drawn before it is cut", "You sign off a scale drawing and one fixed price before we order a single board."],
  ["Made by us, fitted by us", "No subcontractors. The joiner who cut your staircase is the one who carries it in."],
  ["Tried dry in the workshop", "Everything goes together on our floor first, so it goes together on yours."],
  ["Dust sheets down, every day", "Floors covered, offcuts taken away and a hoover round before we leave."],
  ["Guaranteed in writing", "If a joint we made ever opens up, we come back and put it right."],
];

const TALLY = [
  ["6", "Makers at the bench"],
  ["1", "Workshop, our own"],
  ["0", "Subcontractors"],
  ["0", "Joints glued untested"],
];

const REVIEWS = [
  {
    quote:
      "The old staircase creaked on every tread. The new one does not make a sound, and it looks as if it has always been there.",
    who: "Homeowner, Victorian terrace",
    job: "Oak staircase, one winder",
    piece: "stair",
  },
  {
    quote: "Our alcoves are not square, not even close. You would never know. The doors close with a click you can feel.",
    who: "Homeowner, 1930s semi",
    job: "Painted alcove cabinets",
    piece: "cabinet",
  },
  {
    quote: "They matched two sash windows to the originals so well that the neighbours asked which ones were new.",
    who: "Homeowner, period cottage",
    job: "Two box sash windows",
    piece: "sash",
  },
];

/** A plane shaving: a loose, tilted curl with a short lead-in tail. */
function curl(turns: number): string {
  const steps = Math.round(turns * 26);
  const at = (t: number): [number, number] => {
    const angle = -0.6 + t * turns * Math.PI * 2;
    const r = 4 + 18 * Math.pow(1 - t, 1.35);
    return [26 + Math.cos(angle) * r, 26 + Math.sin(angle) * r * 0.62];
  };
  const [x0, y0] = at(0);
  const pts: string[] = [
    `${(x0 - 6.4).toFixed(1)} ${(y0 - 7.6).toFixed(1)}`,
    `${(x0 - 2.4).toFixed(1)} ${(y0 - 3.4).toFixed(1)}`,
  ];
  for (let i = 0; i <= steps; i++) {
    const [x, y] = at(i / steps);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}

function Seam({ tone }: { tone: "cream" | "walnut" | "green" }) {
  return <div className={`hp-seam hp-seam--${tone}`} data-scrub="enter" aria-hidden="true" />;
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="hp-tick">
      <path d="M2.5 8.8 6.2 12.4 13.5 3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A small line drawing of the piece each review is about. */
function Piece({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 64 64" className="hp-piece" aria-hidden="true">
      {kind === "stair" ? (
        <>
          <path d="M5 58h13V46h13V34h13V22h13V10h3" />
          <path d="M9 58V30M22 46V22M35 34V10M48 22V2" className="hp-piece-thin" />
          <path d="M6 31 51 1" />
        </>
      ) : kind === "cabinet" ? (
        <>
          <rect x="9" y="5" width="46" height="54" />
          <path d="M9 17h46M9 28h46M9 39h46M32 39v20" />
          <path d="M27 48v4M37 48v4" className="hp-piece-thin" />
        </>
      ) : (
        <>
          <rect x="13" y="5" width="38" height="52" />
          <path d="M8 58h48M13 31h38" />
          <path d="M32 5v52M13 18h38M13 44h38" className="hp-piece-thin" />
        </>
      )}
    </svg>
  );
}

/** A joiner's elevation of a four-panel door and a box sash window. */
function DoorDrawing() {
  return (
    <svg viewBox="0 0 640 400" className="hp-draw" role="img" aria-label="Line drawing of a four-panel door and a box sash window with dimensions">
      {/* door */}
      <rect x="92" y="40" width="160" height="320" className="hp-draw-main" />
      <rect x="110" y="58" width="56" height="150" />
      <rect x="178" y="58" width="56" height="150" />
      <rect x="110" y="232" width="56" height="110" />
      <rect x="178" y="232" width="56" height="110" />
      <rect x="118" y="66" width="40" height="134" className="hp-draw-faint" />
      <rect x="186" y="66" width="40" height="134" className="hp-draw-faint" />
      <rect x="118" y="240" width="40" height="94" className="hp-draw-faint" />
      <rect x="186" y="240" width="40" height="94" className="hp-draw-faint" />
      <circle cx="240" cy="220" r="4.5" className="hp-draw-fill" />
      {/* door dimensions */}
      <path d="M64 40V360M56 40H72M56 360H72" className="hp-draw-dim" />
      <text x="50" y="204" transform="rotate(-90 50 204)" textAnchor="middle">
        1981
      </text>
      <path d="M92 382H252M92 374V390M252 374V390" className="hp-draw-dim" />
      <text x="172" y="398" textAnchor="middle">
        762
      </text>
      <path d="M252 220H276" className="hp-draw-dim hp-draw-note" />
      <text x="282" y="224" className="hp-draw-note">
        Lock rail
      </text>
      {/* sash window */}
      <rect x="392" y="64" width="196" height="272" className="hp-draw-main" />
      <rect x="380" y="336" width="220" height="12" className="hp-draw-main" />
      <rect x="404" y="76" width="172" height="124" />
      <rect x="404" y="200" width="172" height="124" />
      <path d="M461.3 76V200M518.7 76V200M404 138H576M461.3 200V324M518.7 200V324M404 262H576" />
      <path d="M392 200H588" className="hp-draw-main" />
      {/* window dimensions */}
      <path d="M392 42H588M392 34V50M588 34V50" className="hp-draw-dim" />
      <text x="490" y="32" textAnchor="middle">
        1050
      </text>
      <path d="M616 64V336M608 64H624M608 336H624" className="hp-draw-dim" />
      <text x="637" y="204" transform="rotate(-90 637 204)" textAnchor="middle">
        1650
      </text>
      <path d="M392 200H372V178" className="hp-draw-dim hp-draw-note" />
      <text x="378" y="168" textAnchor="end" className="hp-draw-note">
        Meeting rail
      </text>
    </svg>
  );
}

export default function HarrowPikePage() {
  return (
    <div className={`hp ${display.variable} ${body.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="hp-header">
        <a href="#top" className="hp-logo" aria-label="Harrow and Pike Joinery, home">
          <span className="hp-logo-mark" aria-hidden="true" />
          <span className="hp-logo-name">
            Harrow &amp; Pike<small>Joinery workshop</small>
          </span>
        </a>
        <nav className="hp-nav" aria-label="Main">
          <a href="#joint">The joint</a>
          <a href="#timber">Timber</a>
          <a href="#stages">How it works</a>
          <a href="#work">What we make</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="hp-header-phone">
          <span className="hp-mono">Ring the workshop</span>
          {PHONE}
        </a>
        <a href="#commission" className="hp-btn hp-btn--green hp-header-cta">
          Start a commission
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="hp-hero" data-scrub="exit" data-loop>
          <div className="hp-wrap hp-hero-grid">
            <div className="hp-hero-copy">
              <p className="hp-mono hp-hero-kicker">Bespoke joinery · Made and fitted by us</p>
              <h1 className="hp-h1">
                Joinery that fits like it <em>grew there.</em>
              </h1>
              <p className="hp-hero-sub">
                Staircases, fitted furniture, doors and windows. Made by hand in our own workshop and fitted by the
                people who made them.
              </p>
              <div className="hp-hero-actions">
                <a href="#commission" className="hp-btn hp-btn--green hp-btn--lg">
                  Start a commission
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="hp-btn hp-btn--line hp-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="hp-hero-chips">
                <li>Free measure and drawing</li>
                <li>One fixed price</li>
                <li>Fitted by the makers</li>
              </ul>
            </div>

            <div className="hp-hero-fig">
              <p className="hp-dim hp-dim--h" aria-hidden="true">
                <span>13 risers at 203</span>
              </p>
              <div className="hp-hero-photo">
                <Image
                  src={`${M}/hero.webp`}
                  alt="A handmade oak staircase with a turned newel post in a sunlit period hallway"
                  fill
                  priority
                  sizes="(min-width: 900px) 40vw, 100vw"
                  className="hp-hero-img"
                />
              </div>
              <p className="hp-dim hp-dim--v" aria-hidden="true">
                <span>Floor to floor 2640</span>
              </p>

              {/* The cutting list for the staircase in the photograph. */}
              <aside className="hp-cut" aria-label="Sample cutting list">
                <span className="hp-cut-tape" aria-hidden="true" />
                <div className="hp-cut-head">
                  <p className="hp-mono">Cutting list</p>
                  <p className="hp-mono">Job 0412</p>
                </div>
                <p className="hp-cut-title">Oak staircase, turned newel</p>
                <ul className="hp-cut-rows">
                  <li className="hp-cut-cols" aria-hidden="true">
                    <span />
                    <span>Item</span>
                    <span>No.</span>
                    <span>L × W × T mm</span>
                  </li>
                  {CUTTING.map(([item, count, size, state], i) => (
                    <li key={item} data-state={state} style={{ "--i": i } as CSSProperties}>
                      <span className="hp-cut-box">{state === "cut" ? <Tick /> : null}</span>
                      <span>{item}</span>
                      <span>{count}</span>
                      <span>{size}</span>
                    </li>
                  ))}
                </ul>
                <p className="hp-cut-foot">
                  <span className="hp-live" aria-hidden="true" />
                  <span className="hp-mono">On the lathe now</span>
                  <b>Newel post</b>
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Signature: it fits */}
        <section
          id="joint"
          className="hp-fit imm-pin"
          data-scrub="pin"
          data-steps="3"
          style={{ "--pin": 2.4 } as CSSProperties}
        >
          <Seam tone="cream" />
          <div className="imm-stage hp-fit-stage">
            <div className="hp-wrap hp-fit-top">
              <div>
                <p className="hp-mono hp-kicker">
                  The joint<span> · through dovetail</span>
                </p>
                <p className="hp-fit-lead">A good joint holds because it fits, not because it is glued.</p>
              </div>
              <GapReadout />
            </div>

            <div className="hp-fit-zone">
              <ul className="hp-calls hp-calls--top">
                <li className="hp-call hp-call--timber">
                  <span className="hp-call-k">Timber</span>
                  <span className="hp-call-v">European oak, 22 mm</span>
                </li>
                <li className="hp-call hp-call--tol">
                  <span className="hp-call-k">Tolerance</span>
                  <span className="hp-call-v">± 0.2 mm</span>
                </li>
              </ul>

              {/* The headline is the joint: half on each board. */}
              <h2 className="hp-joint">
                <span className="hp-board-ground hp-board-ground--a" aria-hidden="true" />
                <span className="hp-board-ground hp-board-ground--b" aria-hidden="true" />
                <span className="hp-board hp-board--a">
                  <span className="hp-board-face hp-wood hp-wood--oak-a">
                    <span className="hp-board-line" aria-hidden="true" />
                    <span className="hp-board-word">Made to</span>
                    <span className="hp-board-mark" aria-hidden="true">
                      A · face side
                    </span>
                  </span>
                  <span className="hp-board-edge" aria-hidden="true" />
                </span>{" "}
                <span className="hp-board-shadow" aria-hidden="true">
                  <span />
                </span>
                <span className="hp-board hp-board--b">
                  <span className="hp-board-face hp-wood hp-wood--oak-b">
                    <span className="hp-board-line" aria-hidden="true" />
                    <span className="hp-board-word">measure.</span>
                    <span className="hp-board-mark" aria-hidden="true">
                      B · face side
                    </span>
                  </span>
                  <span className="hp-board-edge" aria-hidden="true" />
                </span>
              </h2>

              <ul className="hp-calls hp-calls--bot">
                <li className="hp-call hp-call--gauge">
                  <span className="hp-call-k">Gauge line</span>
                  <span className="hp-call-v">Dead straight</span>
                </li>
                <li className="hp-call hp-call--slope">
                  <span className="hp-call-k">Tail slope</span>
                  <span className="hp-call-v">1 in 8</span>
                </li>
              </ul>

              <div className="hp-shavs" aria-hidden="true">
                {SHAVINGS.map((s, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 52 52"
                    className={`hp-shav${s.wide ? " hp-shav--wide" : ""}`}
                    style={
                      {
                        "--i": i,
                        "--xm": s.xm,
                        "--xd": s.xd,
                        "--s": `${s.size}rem`,
                        "--rot": `${s.rot}deg`,
                        "--drift": s.drift,
                        "--lift": s.lift,
                      } as CSSProperties
                    }
                  >
                    <path d={curl(s.turns)} className="hp-shav-back" />
                    <path d={curl(s.turns)} className="hp-shav-mid" />
                    <path d={curl(s.turns)} className="hp-shav-ribbon" />
                    <path d={curl(s.turns)} className="hp-shav-edge" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="hp-wrap hp-fit-foot">
              <ol className="hp-notes">
                {NOTES.map(([n, title, text]) => (
                  <li key={n} className="hp-note">
                    <span className="hp-mono">{n} / 03</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
              <a href="#commission" className="hp-btn hp-btn--oak hp-fit-cta">
                Start a commission
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Timber and finish */}
        <section id="timber" className="hp-section hp-section--cream">
          <Seam tone="walnut" />
          <div className="hp-wrap">
            <header className="hp-head hp-head--row" data-reveal>
              <div>
                <p className="hp-mono hp-kicker">Timber and finish</p>
                <h2 className="hp-h2">
                  Pick the timber. See how it <em>lives.</em>
                </h2>
              </div>
              <p className="hp-lead">
                Every timber behaves differently under a hand, a heel and twenty winters. Choose one, choose a finish,
                and we will tell you straight where it belongs.
              </p>
            </header>
            <TimberSelector />
          </div>
        </section>

        {/* -------------------------------------------------- Stair of stages */}
        <section id="stages" className="hp-section hp-section--green">
          <Seam tone="cream" />
          <div className="hp-wrap hp-stages">
            <div className="hp-head hp-stages-head">
              <header data-reveal>
                <p className="hp-mono hp-kicker">How a commission runs</p>
                <h2 className="hp-h2">
                  Four treads from first visit to <em>final fit.</em>
                </h2>
                <p className="hp-lead">One step at a time, in this order, with a fixed price agreed on the second.</p>
              </header>
              <a href="#commission" className="hp-btn hp-btn--oak">
                Book the free measure
                <Arrow />
              </a>
            </div>

            <aside className="hp-prog" aria-label="A typical commission">
              <p className="hp-mono">A typical commission</p>
              <p className="hp-prog-big">
                7 to 9 <span>weeks, first visit to final fit</span>
              </p>
              <div className="hp-prog-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <dl>
                {PROGRAMME.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <ol className="hp-stair" data-scrub="enter" data-start="top 62%" data-end="top 14%">
              {STAGES.map((s, i) => (
                <li key={s.n} className="hp-step" style={{ "--i": i } as CSSProperties}>
                  <div className="hp-step-block" aria-hidden="true">
                    <span className="hp-step-flag">{s.when}</span>
                    <span className="hp-step-tread hp-wood hp-wood--oak" />
                    <span className="hp-step-riser">
                      <b>{s.n}</b>
                      <i>{s.title}</i>
                    </span>
                  </div>
                  <div className="hp-step-copy">
                    <span className="hp-step-n">{s.n}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                      <p className="hp-step-tag">{s.tag}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------- What we make */}
        <section id="work" className="hp-section hp-section--cream">
          <Seam tone="green" />
          <div className="hp-wrap">
            <header className="hp-head hp-head--row" data-reveal>
              <div>
                <p className="hp-mono hp-kicker">What we make</p>
                <h2 className="hp-h2">
                  Four things, made <em>properly.</em>
                </h2>
              </div>
              <p className="hp-lead">
                We do not fit kitchens, hang flat-pack or lay floors. We make joinery, and we have turned work down to
                keep it that way.
              </p>
            </header>

            <div className="hp-makes">
              {MAKES.map((m, i) => (
                <article
                  key={m.title}
                  className={`hp-make hp-make--${i + 1}`}
                  data-reveal
                  style={{ "--d": `${(i % 2) * 110}ms` } as CSSProperties}
                >
                  <div className={`hp-make-media${m.img ? "" : " hp-make-media--draw"}`}>
                    {m.img ? (
                      <Image
                        src={`${M}/${m.img}`}
                        alt={m.alt}
                        fill
                        sizes="(min-width: 900px) 56vw, 100vw"
                        style={{ objectPosition: m.pos }}
                      />
                    ) : (
                      <DoorDrawing />
                    )}
                    <span className="hp-mono hp-make-n">0{i + 1}</span>
                  </div>
                  <div className="hp-make-body">
                    <div className="hp-make-text">
                      <h3>{m.title}</h3>
                      <p>{m.body}</p>
                      <a href="#commission" className="hp-link">
                        Commission {m.short}
                        <Arrow />
                      </a>
                    </div>
                    <dl className="hp-specs">
                      {m.specs.map(([k, v]) => (
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

        {/* ------------------------------------------------ Workshop promises */}
        <section className="hp-section hp-section--walnut">
          <Seam tone="cream" />
          <div className="hp-wrap hp-rules-grid">
            <figure className="hp-bench" data-reveal="left">
              <div className="hp-bench-photo">
                <Image
                  src={`${M}/extra.webp`}
                  alt="A workbench with a smoothing plane, three chisels, a marking gauge, a mallet and curled shavings"
                  fill
                  sizes="(min-width: 900px) 44vw, 100vw"
                />
                <span className="hp-mono hp-bench-tag">Bench 03</span>
              </div>
              <figcaption className="hp-mono">Smoothing plane · mortise chisels · marking gauge · mallet</figcaption>
              <ul className="hp-tally">
                {TALLY.map(([n, label]) => (
                  <li key={label}>
                    <b>{n}</b>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </figure>

            <div>
              <header className="hp-head" data-reveal>
                <p className="hp-mono hp-kicker">Workshop promises</p>
                <h2 className="hp-h2">
                  The rules pinned <em>above the bench.</em>
                </h2>
              </header>
              <ol className="hp-rules">
                {RULES.map(([title, text], i) => (
                  <li key={title} data-reveal style={{ "--d": `${i * 80}ms` } as CSSProperties}>
                    <span className="hp-rule-box" aria-hidden="true">
                      <Tick />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <span className="hp-mono hp-rule-n" aria-hidden="true">
                      Rule 0{i + 1}
                    </span>
                  </li>
                ))}
              </ol>
              <a href="#commission" className="hp-btn hp-btn--oak hp-rules-cta">
                Start a commission
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Reviews */}
        <section id="reviews" className="hp-section hp-section--cream">
          <Seam tone="walnut" />
          <div className="hp-wrap">
            <header className="hp-head" data-reveal>
              <p className="hp-mono hp-kicker">Sample reviews · this is a demo</p>
              <h2 className="hp-h2">
                What people say once it is <em>in the house.</em>
              </h2>
            </header>
            <ul className="hp-reviews">
              {REVIEWS.map((r, i) => (
                <li key={r.who} className="hp-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <p className="hp-review-top">
                    <span className="hp-stars" role="img" aria-label="Five stars">
                      ★★★★★
                    </span>
                    <span className="hp-mono">Sample review</span>
                  </p>
                  <blockquote>{r.quote}</blockquote>
                  <div className="hp-review-foot">
                    <dl className="hp-review-meta">
                      <div>
                        <dt>From</dt>
                        <dd>{r.who}</dd>
                      </div>
                      <div>
                        <dt>Made</dt>
                        <dd>{r.job}</dd>
                      </div>
                    </dl>
                    <Piece kind={r.piece} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------- Commission */}
        <section id="commission" className="hp-section hp-section--green hp-cta">
          <Seam tone="cream" />
          <div className="hp-wrap hp-cta-grid">
            <div className="hp-cta-copy">
              <p className="hp-mono hp-kicker">Start a commission</p>
              <h2 className="hp-h1 hp-cta-title">
                Tell us what should <em>fit where.</em>
              </h2>
              <p className="hp-cta-sub">
                We come out, measure up and listen, free. Within a week you have a scale drawing and one fixed price.
                Nothing is cut until you say so.
              </p>
              <ol className="hp-cta-steps">
                <li>
                  <span className="hp-mono">Today</span>Send the sheet or ring the workshop
                </li>
                <li>
                  <span className="hp-mono">This week</span>We visit and measure
                </li>
                <li>
                  <span className="hp-mono">Next week</span>Your drawing and fixed price
                </li>
              </ol>
              <a href={PHONE_HREF} className="hp-cta-phone">
                <span className="hp-mono">Or ring the workshop</span>
                {PHONE}
              </a>
            </div>
            <CommissionForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="hp-footer">
        <div className="hp-wrap hp-footer-grid">
          <p className="hp-logo">
            <span className="hp-logo-mark" aria-hidden="true" />
            <span className="hp-logo-name">
              Harrow &amp; Pike<small>Joinery workshop</small>
            </span>
          </p>
          <p className="hp-footer-note">
            Harrow &amp; Pike Joinery is a fictional business. This page is a demo by Integrate Web Design, made to show
            the kind of homepage we build for joiners.
          </p>
          <a href="/web-design#immersive" className="hp-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="hp-bar">
        <a href="#commission" className="hp-btn hp-btn--oak">
          Start a commission
        </a>
        <a href={PHONE_HREF} className="hp-btn hp-btn--line" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
