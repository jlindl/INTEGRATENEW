import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Arrow, RollerV, bandClip, rolledBand } from "./_components/art";
import { PaintCalc } from "./_components/PaintCalc";
import { PaintRoom } from "./_components/PaintRoom";
import { COATS, PAINTS, type Paint } from "./_components/paints";
import { QuoteForm } from "./_components/QuoteForm";
import "./painters-decorators.css";

/**
 * Hue & Cry Decorators: an immersive demo homepage for a painter and
 * decorator.
 *
 * Concept: every scroll is a coat. Each section is a different paint colour,
 * rolled over the one before it, and the signature scene rolls three colours
 * onto a wall as you scroll.
 *
 * The business, its phone number, paint names, codes and reviews are all
 * made up. Photography is generated (public/media/demos/painters-decorators).
 */

const bricolage = localFont({
  src: "../../../../assets/fonts/bricolage-grotesque/bricolage-grotesque-200-800.woff2",
  weight: "200 800",
  variable: "--font-hc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hue & Cry Decorators | Demo decorator homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a painter and decorator, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 204";
const PHONE_HREF = "tel:01632960204";
const M = "/media/demos/painters-decorators";

const PINK = "#e9c9b8";
const GREEN = "#1f4a3d";
const OCHRE = "#e2a33b";
const COBALT = "#2c4bd8";
const PAPER = "#f7f2ea";
const INK = "#1d1b1a";

const paint = (id: string): Paint => PAINTS.find((p) => p.id === id) ?? PAINTS[0];
const vars = (v: Record<string, string | number>) => v as CSSProperties;

const SPEC = [
  ["Colour", "Back Hedge Green"],
  ["Code", "HC 318"],
  ["Finish", "Flat matt"],
  ["Coats", "Mist coat, then two"],
  ["Woodwork", "Dust Sheet White, satin"],
];

const SERVICES = [
  {
    key: "int",
    code: "HC·S1",
    tag: "Flat matt",
    title: "Interiors",
    body: "Walls, ceilings and woodwork, one room or the whole house. Furniture moved, covered and put back where it was.",
    rows: [
      ["Finishes", "Matt, eggshell, satin"],
      ["Typical room", "Two to three days"],
    ],
  },
  {
    key: "ext",
    code: "HC·S2",
    tag: "Exterior gloss",
    title: "Exteriors",
    body: "Masonry, render, windows, doors and fascias. Scraped back, repaired and painted to take the weather.",
    rows: [
      ["Season", "Spring to early autumn"],
      ["Access", "Our own towers and ladders"],
    ],
  },
  {
    key: "paper",
    code: "HC·S3",
    tag: "Pattern matched",
    title: "Wallpaper",
    body: "Lining, pattern matching and feature walls. Old paper stripped and the wall made good before a roll is opened.",
    rows: [
      ["Papers", "Lining, printed, wide width"],
      ["Priced", "By the roll, in writing"],
    ],
  },
  {
    key: "spray",
    code: "HC·S4",
    tag: "Sprayed",
    title: "Spray finishing",
    body: "Kitchen cabinets, fitted wardrobes and radiators sprayed for a smooth, hard finish with no brush marks.",
    rows: [
      ["Where", "On site, masked and sheeted"],
      ["Good for", "Kitchens, wardrobes, doors"],
    ],
  },
  {
    key: "wood",
    code: "HC·S5",
    tag: "Satin",
    title: "Woodwork",
    body: "Skirting, doors, sashes and banisters. Filled, sanded between coats and finished without a run in sight.",
    rows: [
      ["Finishes", "Satin, eggshell or gloss"],
      ["Includes", "Knotting and priming"],
    ],
  },
];

const PREP = [
  ["Fill", "Cracks raked out and holes filled, then filled again once the first pass has shrunk back."],
  ["Sand", "Rubbed down with dust extraction until a flat palm cannot find the repair."],
  ["Prime", "Bare plaster, filler and old stains sealed, so the colour dries even all over."],
  ["Undercoat", "A solid, flat base in the right tone. It is what makes the top coat look deep."],
  ["First top coat", "Cut in by brush, then rolled. Left to dry properly, not hurried."],
  ["Second top coat", "The one you see. Laid off in one direction and checked in daylight."],
];

const HOURS = [
  ["Prep", "over half", 56],
  ["Painting", "about a third", 32],
  ["Sheeting and tidying", "the rest", 12],
] as const;

const SHOTS = [
  {
    img: "hero.webp",
    alt: "A sitting room with one wall painted deep green, white skirting and picture rail, a stepladder and dust sheets",
    title: "Sitting room, walls and woodwork",
    paint: "hedge",
    meta: "Flat matt · four days",
    sizes: "(min-width: 900px) 46vw, 92vw",
    cls: "hc-shot--wide",
  },
  {
    img: "detail.webp",
    alt: "A roller mid-stroke, rolling ochre paint onto pale plaster",
    title: "Hallway, first coat going on",
    paint: "table",
    meta: "Over a mist coat on new plaster",
    sizes: "(min-width: 900px) 24vw, 92vw",
    cls: "",
  },
  {
    img: "scene.webp",
    alt: "A Victorian front door painted glossy cobalt blue with brass furniture and a white frame in a red brick wall",
    title: "Front door, stripped and glossed",
    paint: "door",
    meta: "Exterior gloss · two days",
    sizes: "(min-width: 900px) 24vw, 92vw",
    cls: "",
  },
];

const REVIEWS = [
  {
    quote:
      "They spent the first day and a half just filling and sanding. I see why now. The walls look like new plaster.",
    who: "Homeowner, terraced house",
    job: "Sitting room and hall",
    paint: "plaster",
  },
  {
    quote: "Front door stripped right back and glossed. Two neighbours have already asked who did it.",
    who: "Homeowner, front door and sashes",
    job: "Exterior woodwork",
    paint: "door",
  },
  {
    quote: "Kitchen cabinets sprayed in place over three days. Not a speck on the worktops, and it looks like a new kitchen.",
    who: "Homeowner, kitchen respray",
    job: "Spray finishing",
    paint: "hedge",
  },
];

const VISIT = [
  ["We visit and measure", "With brush-outs of the colours you are weighing up."],
  ["A fixed price in writing", "Prep, paint and making good, itemised room by room."],
  ["A start date you can plan around", "The same decorators start and finish the job."],
];

/* A headline line, or a word, on a freshly rolled band of colour. The ink
   copy is the real text; the painted copy on top is decoration. */
function Rolled({
  children,
  tone,
  seed,
  delay,
  as = "line",
}: {
  children: ReactNode;
  tone: "green" | "ochre" | "cobalt" | "pink";
  seed: number;
  delay?: string;
  as?: "line" | "mark";
}) {
  const clip = bandClip(seed);
  return (
    <span className={`hc-${as} hc-band--${tone}`}>
      <span className="hc-band-ink">{children}</span>
      <span
        className="hc-band-paint"
        aria-hidden="true"
        style={vars({ "--hc-clip": clip.to, "--hc-clip-from": clip.from, "--hc-d": delay ?? "0s" })}
      >
        {children}
      </span>
    </span>
  );
}

/* The seam between two sections: the next colour is rolled over the last. */
function Roll({ from, to, seed, rev }: { from: string; to: string; seed: number; rev?: boolean }) {
  return (
    <div
      className={`hc-roll${rev ? " hc-roll--rev" : ""}`}
      data-scrub="enter"
      aria-hidden="true"
      style={vars({ "--hc-from": from, "--hc-c": to })}
    >
      <div className="hc-roll-move">
        <div className="hc-roll-paint" style={{ clipPath: rolledBand(seed) }} />
        <RollerV className="hc-roll-tool" />
      </div>
    </div>
  );
}

function WallCode({ id }: { id: string }) {
  const p = paint(id);
  return (
    <p className="hc-mono hc-wallcode">
      <i style={{ background: p.hex }} aria-hidden="true" />
      This wall: {p.name} · {p.code}
    </p>
  );
}

function Logo() {
  return (
    <>
      <span className="hc-logo-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="hc-logo-text">
        Hue &amp; Cry<small>Decorators</small>
      </span>
    </>
  );
}

export default function HueAndCryPage() {
  return (
    <div className={`hc ${bricolage.variable}`}>
      {/* ---------------------------------------------------------- Header */}
      <header className="hc-header">
        <a href="#top" className="hc-logo" aria-label="Hue and Cry Decorators, home">
          <Logo />
        </a>
        <nav className="hc-nav" aria-label="Main">
          <a href="#try">Try a colour</a>
          <a href="#services">Services</a>
          <a href="#prep">Prep</a>
          <a href="#paint">How much paint</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="hc-header-phone">
          <span className="hc-mono">Call</span>
          {PHONE}
        </a>
        <a href="#quote" className="hc-btn hc-btn--cobalt hc-header-cta">
          Get a quote
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="hc-hero" data-scrub="exit">
          <div className="hc-wrap hc-hero-grid">
            <div className="hc-hero-copy">
              <p className="hc-mono hc-hero-kicker">
                <span>Painters and decorators</span>
                <span>Interiors</span>
                <span>Exteriors</span>
                <span>Wallpaper</span>
              </p>
              <h1 className="hc-h1">
                <Rolled tone="green" seed={11} delay="0.15s">
                  Colour,
                </Rolled>
                <Rolled tone="green" seed={12} delay="0.32s">
                  put on
                </Rolled>
                <Rolled tone="ochre" seed={13} delay="0.49s">
                  properly.
                </Rolled>
              </h1>
              <p className="hc-hero-sub">
                Hue &amp; Cry paint and paper homes across the county. Careful prep, sharp lines, dust sheets down, and
                a fixed price in writing before a lid comes off.
              </p>
              <div className="hc-hero-actions">
                <a href="#quote" className="hc-btn hc-btn--cobalt hc-btn--lg">
                  Get a quote
                  <Arrow />
                </a>
                <a href={PHONE_HREF} className="hc-btn hc-btn--ghost hc-btn--lg">
                  Call {PHONE}
                </a>
              </div>
              <ul className="hc-ticks">
                <li>Fixed written quotes</li>
                <li>Dust sheets down in every room</li>
                <li>Fully insured</li>
              </ul>
            </div>

            <div className="hc-hero-visual">
              <div className="hc-hero-photo">
                <Image
                  src={`${M}/hero.webp`}
                  alt="A living room with one wall freshly painted deep green, white woodwork, a stepladder and a dust sheet on the floor"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>

              {/* What is on the wall in the photograph, as a decorator would note it. */}
              <aside className="hc-spec" aria-label="The paint on the wall in the photograph">
                <p className="hc-mono hc-spec-head">
                  <i aria-hidden="true" />
                  On this wall
                </p>
                <dl>
                  {SPEC.map(([k, v]) => (
                    <div key={k}>
                      <dt className="hc-mono">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>

              <div className="hc-fan" aria-hidden="true">
                {PAINTS.slice(0, 5).map((p, i) => (
                  <span key={p.id} className="hc-fan-chip" style={vars({ "--i": i, "--hc-c": p.hex })}>
                    <b className="hc-mono">{p.code}</b>
                    <i />
                  </span>
                ))}
                <span className="hc-fan-rivet" />
              </div>
            </div>
          </div>

          <p className="hc-mono hc-hero-cue" aria-hidden="true">
            <span>Scroll</span>
            <i />
            <span>The roller follows</span>
          </p>
        </section>

        <Roll from={PINK} to={PAPER} seed={3} />

        {/* -------------------------------------- Signature: try it on the wall */}
        <section
          id="try"
          className="hc-try imm-pin"
          data-scrub="pin"
          data-steps="3"
          style={vars({ "--pin": 2.5 })}
        >
          <div className="imm-stage hc-try-stage">
            <div className="hc-wrap hc-try-grid">
              <div className="hc-try-copy">
                <p className="hc-mono hc-kicker">Try it on the wall</p>
                <h2 className="hc-h2">
                  Every scroll is{" "}
                  <Rolled as="mark" tone="cobalt" seed={21}>
                    a coat.
                  </Rolled>
                </h2>
                <p className="hc-lead">
                  Three of our most asked-for colours, rolled on in turn. Scroll to paint, or tap a chip to try your
                  own.
                </p>
                <ol className="hc-coats">
                  {COATS.map((c, i) => (
                    <li key={c.id} className="hc-coat-item" style={vars({ "--hc-c": c.hex })}>
                      <i aria-hidden="true" />
                      <div>
                        <p className="hc-coat-name">
                          <span>{c.name}</span>
                          <span className="hc-mono">{c.code}</span>
                        </p>
                        <p className="hc-coat-note">{c.note}</p>
                      </div>
                      <span className="hc-mono hc-coat-n">0{i + 1}</span>
                    </li>
                  ))}
                </ol>
                <div className="hc-try-foot">
                  <a href="#quote" className="hc-btn hc-btn--cobalt">
                    Quote this room
                    <Arrow />
                  </a>
                  <p className="hc-try-note">
                    Screen colours are a guide. We bring brush-outs to every quote visit.
                  </p>
                </div>
              </div>

              <PaintRoom />
            </div>
          </div>
        </section>

        <Roll from={PAPER} to={GREEN} seed={5} rev />

        {/* ------------------------------------------------------------- Services */}
        <section id="services" className="hc-section hc-section--green">
          <div className="hc-wrap">
            <header className="hc-head" data-reveal>
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">What we do</p>
                <WallCode id="hedge" />
              </div>
              <div className="hc-head-row">
                <h2 className="hc-h2">
                  Inside, outside and{" "}
                  <Rolled as="mark" tone="ochre" seed={31}>
                    the fiddly bits.
                  </Rolled>
                </h2>
                <div className="hc-head-side">
                  <p className="hc-lead">
                    One firm for the whole house. The decorators who start your job are the ones who finish it.
                  </p>
                  <a href="#quote" className="hc-btn hc-btn--ochre">
                    Get a quote
                    <Arrow />
                  </a>
                </div>
              </div>
            </header>

            <div className="hc-svcs">
              {SERVICES.map((s, i) => (
                <article
                  key={s.key}
                  className={`hc-svc hc-svc--${s.key}`}
                  data-reveal
                  style={vars({ "--d": `${(i % 3) * 90}ms` })}
                >
                  <div className="hc-svc-block">
                    <p className="hc-svc-top">
                      <span className="hc-mono">{s.code}</span>
                      <span className="hc-mono hc-svc-tag">{s.tag}</span>
                    </p>
                    <h3>{s.title}</h3>
                  </div>
                  <div className="hc-svc-body">
                    <p>{s.body}</p>
                    <dl className="hc-rows">
                      {s.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt className="hc-mono">{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}

              <article className="hc-svc hc-svc--kit" data-reveal style={vars({ "--d": "180ms" })}>
                <div className="hc-svc-block hc-svc-block--photo">
                  <Image
                    src={`${M}/extra.webp`}
                    alt="Brushes, a roller, colour swatch cards and open tins of green, ochre, pink and blue paint laid out on a dust sheet"
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
                  />
                  <span className="hc-mono hc-svc-flag">Day one</span>
                </div>
                <div className="hc-svc-body">
                  <h3 className="hc-svc-kit-title">What turns up</h3>
                  <p>
                    On the first morning: our own sheets, brushes and rollers, and your colours mixed and checked
                    against the brush-outs you signed off.
                  </p>
                  <dl className="hc-rows">
                    <div>
                      <dt className="hc-mono">Lids</dt>
                      <dd>Labelled by colour, code and room</dd>
                    </div>
                    <div>
                      <dt className="hc-mono">Left with you</dt>
                      <dd>What is over, for touch-ups</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </div>
          </div>
        </section>

        <Roll from={GREEN} to={OCHRE} seed={7} />

        {/* ----------------------------------------------------------------- Prep */}
        <section id="prep" className="hc-section hc-section--ochre">
          <div className="hc-wrap">
            <header className="hc-head" data-reveal>
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">Prep is most of the job</p>
                <WallCode id="table" />
              </div>
              <div className="hc-head-row">
                <h2 className="hc-h2">
                  Six layers. You only{" "}
                  <Rolled as="mark" tone="green" seed={41}>
                    see one.
                  </Rolled>
                </h2>
                <div className="hc-head-side">
                  <p className="hc-lead">
                    A finish lasts as long as what is under it. Most of our hours go in before a tin of colour is
                    opened.
                  </p>
                </div>
              </div>
            </header>

            <div className="hc-prep" data-scrub data-start="top 78%" data-end="top 16%">
              <div className="hc-prep-left">
                <div className="hc-board" aria-hidden="true">
                  <span className="hc-mono hc-board-bare">00 Bare wall</span>
                  <i className="hc-board-crack" />
                  {PREP.map(([name], i) => (
                    <div key={name} className={`hc-layer hc-layer--${i}`} style={vars({ "--i": i })}>
                      <div className="hc-layer-fill">
                        <span className="hc-mono hc-layer-label">
                          0{i + 1} {name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hc-hours">
                  <p className="hc-mono hc-hours-title">Where the hours go · a typical room, roughly</p>
                  <div className="hc-hours-bar" aria-hidden="true">
                    {HOURS.map(([name, , share]) => (
                      <i key={name} style={{ flexGrow: share }} />
                    ))}
                  </div>
                  <ul className="hc-hours-key">
                    {HOURS.map(([name, share]) => (
                      <li key={name}>
                        <b>{name}</b>
                        <span className="hc-mono">{share}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ol className="hc-prep-steps">
                {PREP.map(([name, text], i) => (
                  <li key={name} className={`hc-prep-step hc-prep-step--${i}`} style={vars({ "--i": i })}>
                    <span className="hc-mono hc-prep-n">0{i + 1}</span>
                    <i aria-hidden="true" />
                    <div>
                      <h3>{name}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Roll from={OCHRE} to={COBALT} seed={9} rev />

        {/* ------------------------------------------------------- How much paint */}
        <section id="paint" className="hc-section hc-section--cobalt">
          <div className="hc-wrap hc-paint-grid">
            <header className="hc-head hc-paint-head" data-reveal>
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">How much paint?</p>
                <WallCode id="door" />
              </div>
              <h2 className="hc-h2">
                Measure the room. We will do{" "}
                <Rolled as="mark" tone="ochre" seed={51}>
                  the sums.
                </Rolled>
              </h2>
              <p className="hc-lead">
                A rough guide to the paint for one room. Handy for a budget, and for checking a quote makes sense.
              </p>
              <ul className="hc-paint-points">
                <li>
                  <span className="hc-mono">01</span>
                  Walls only, unless you add the ceiling.
                </li>
                <li>
                  <span className="hc-mono">02</span>
                  Two coats, which is what a good finish takes.
                </li>
                <li>
                  <span className="hc-mono">03</span>
                  On a quote visit we measure it properly, for nothing.
                </li>
              </ul>
            </header>
            <div data-reveal="right" style={vars({ "--d": "120ms" })}>
              <PaintCalc />
            </div>
          </div>
        </section>

        <Roll from={COBALT} to={PAPER} seed={11} />

        {/* ----------------------------------------------------------------- Work */}
        <section id="work" className="hc-section hc-section--paper">
          <div className="hc-wrap">
            <header className="hc-head" data-reveal>
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">On the walls lately</p>
                <WallCode id="sheet" />
              </div>
              <div className="hc-head-row">
                <h2 className="hc-h2">
                  Fresh off{" "}
                  <Rolled as="mark" tone="pink" seed={61}>
                    the roller.
                  </Rolled>
                </h2>
                <div className="hc-head-side">
                  <p className="hc-lead">Three recent jobs, with the colour that went on and how long it took.</p>
                </div>
              </div>
            </header>

            <div className="hc-shots">
              {SHOTS.map((s, i) => {
                const p = paint(s.paint);
                return (
                  <figure key={s.img} className={`hc-shot ${s.cls}`} data-reveal style={vars({ "--d": `${i * 110}ms` })}>
                    <div className="hc-shot-img" data-scrub>
                      <Image src={`${M}/${s.img}`} alt={s.alt} fill sizes={s.sizes} />
                      <span className="hc-mono hc-shot-n">0{i + 1}</span>
                    </div>
                    <figcaption>
                      <i style={{ background: p.hex }} aria-hidden="true" />
                      <div>
                        <p className="hc-shot-title">{s.title}</p>
                        <p className="hc-mono">
                          {p.name} · {p.code}
                        </p>
                        <p className="hc-mono hc-shot-meta">{s.meta}</p>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        <Roll from={PAPER} to={PINK} seed={13} rev />

        {/* -------------------------------------------------------------- Reviews */}
        <section id="reviews" className="hc-section hc-section--pink">
          <div className="hc-wrap">
            <header className="hc-head" data-reveal>
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">Sample reviews · this is a demo</p>
                <WallCode id="plaster" />
              </div>
              <h2 className="hc-h2">
                What people say when{" "}
                <Rolled as="mark" tone="green" seed={71}>
                  the sheets come up.
                </Rolled>
              </h2>
            </header>
            <ul className="hc-reviews">
              {REVIEWS.map((r, i) => {
                const p = paint(r.paint);
                return (
                  <li
                    key={r.who}
                    className="hc-review"
                    data-reveal
                    style={vars({ "--d": `${i * 110}ms`, "--hc-c": p.hex, "--hc-on": p.on })}
                  >
                    <p className="hc-mono hc-review-head">
                      <span>{p.code}</span>
                      <span>{p.name}</span>
                    </p>
                    <div className="hc-review-body">
                      <span className="hc-stars" role="img" aria-label="Five out of five">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                      <blockquote>{r.quote}</blockquote>
                      <p className="hc-review-who">{r.who}</p>
                      <p className="hc-mono hc-review-job">
                        <span>Job</span>
                        {r.job}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Roll from={PINK} to={INK} seed={15} />

        {/* ---------------------------------------------------------------- Quote */}
        <section id="quote" className="hc-section hc-section--ink hc-quote">
          <div className="hc-wrap hc-quote-grid">
            <div className="hc-quote-copy">
              <div className="hc-head-top">
                <p className="hc-mono hc-kicker">Get a quote</p>
                <WallCode id="soot" />
              </div>
              <h2 className="hc-h2 hc-quote-title">
                Pick the colour. We will do{" "}
                <Rolled as="mark" tone="ochre" seed={81}>
                  the rest.
                </Rolled>
              </h2>
              <p className="hc-lead">
                Tell us what needs painting. We visit, measure up, and send one fixed price in writing. No charge and
                no pressure.
              </p>
              <ol className="hc-visit">
                {VISIT.map(([title, text], i) => (
                  <li key={title}>
                    <span className="hc-mono">0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={PHONE_HREF} className="hc-quote-phone">
                <span className="hc-mono">Or call the workshop</span>
                {PHONE}
              </a>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="hc-footer">
        <div className="hc-wrap hc-footer-grid">
          <p className="hc-logo">
            <Logo />
          </p>
          <p className="hc-footer-note">
            Hue &amp; Cry Decorators is a fictional business. Its paint names, codes and reviews are made up. This page
            is a demo by Integrate Web Design, made to show the kind of homepage we build for painters and decorators.
          </p>
          <a href="/web-design#immersive" className="hc-link">
            See the other demos
            <Arrow />
          </a>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="hc-bar">
        <a href="#quote" className="hc-btn hc-btn--cobalt">
          Get a quote
        </a>
        <a href={PHONE_HREF} className="hc-btn hc-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
