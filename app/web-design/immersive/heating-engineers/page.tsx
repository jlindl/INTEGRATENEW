import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, BookForm, CarePlan, Go, SymptomChecker, Thermostat } from "./_components/parts";
import "./heating-engineers.css";

/**
 * Emberline Heating: an immersive demo homepage for a heating engineer.
 *
 * Concept: scrolling turns the heating up. The page opens on a cold house in
 * frost navy and ends warm, on ember. The signature scene is a thermostat
 * that climbs from 12 to 21 degrees under the visitor's thumb while the
 * ground warms and a row of radiators heats in turn.
 *
 * The business, its phone number, prices, reviews and guarantees are all
 * made up. Photography is generated (public/media/demos/heating-engineers).
 */

const sans = localFont({
  src: "../../../../assets/fonts/schibsted-grotesk/schibsted-grotesk-400-900.woff2",
  weight: "400 900",
  variable: "--font-eh-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emberline Heating | Demo heating engineer homepage by Integrate",
  description:
    "A scroll-driven demo homepage for a heating engineer, built by Integrate Web Design. The business is fictional.",
};

const PHONE = "01632 960 284";
const PHONE_HREF = "tel:01632960284";
const M = "/media/demos/heating-engineers";

const STATS = [
  ["Same day", "callouts when the heating is off"],
  ["Fixed", "prices, agreed before work starts"],
  ["12 months", "guarantee on every repair"],
];

const MOMENTS = [
  ["01", "Cold start", "12°", "Frost on the glass and radiators stone cold. One call and an engineer is booked."],
  ["02", "Boiler fires", "15°", "Fault found, part fitted, pressure set. The burner lights and the pipes start to tick."],
  ["03", "House warm", "21°", "Every radiator hot to the top and the thermostat holding steady. Job done."],
];

const RADIATORS = 5;
const COLUMNS = 9;

type Service = {
  size: "a" | "b" | "c";
  img: string | null;
  alt: string;
  sizes: string;
  pos: string;
  kicker: string;
  title: string;
  body: string;
  specs: string[][];
  day?: string[][];
  link: string;
};

const SERVICES: Service[] = [
  {
    size: "a",
    img: "hero.webp",
    alt: "A new white combi boiler on a utility room wall with neat copper pipework",
    sizes: "(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 92vw",
    pos: "62% 50%",
    kicker: "Boiler installation",
    title: "A new boiler, fitted in a day",
    body: "We size the boiler to the house, not the brochure. Old one out, new one in, system flushed and the controls set up before we leave.",
    specs: [
      ["Fitted in", "One day, in most homes"],
      ["Includes", "Flush, filter and smart controls"],
      ["Warranty", "Up to ten years, registered for you"],
      ["Price", "Fixed, in writing"],
    ],
    day: [
      ["08:00", "Old boiler drained and off the wall"],
      ["11:00", "New boiler hung and piped up"],
      ["14:30", "System flushed, filled and tested"],
      ["16:00", "Controls set, and you are shown how"],
    ],
    link: "Get a boiler quote",
  },
  {
    size: "b",
    img: "scene.webp",
    alt: "An air source heat pump on a concrete base beside a brick house on a frosty morning",
    sizes: "(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 92vw",
    pos: "62% 55%",
    kicker: "Heat pumps",
    title: "Heat pumps, sized properly",
    body: "A heat pump only works if the sums are right. We survey every room, match the radiators and handle the grant paperwork.",
    specs: [
      ["Survey", "Room-by-room heat loss"],
      ["Works with", "Radiators and underfloor"],
      ["Paperwork", "Grant application handled"],
    ],
    link: "Ask about a heat pump",
  },
  {
    size: "c",
    img: "extra.webp",
    alt: "An engineer's hands tightening a brass valve under a boiler, beside a pressure gauge",
    sizes: "(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 92vw",
    pos: "60% 50%",
    kicker: "Repairs",
    title: "Fixed on the first visit",
    body: "No heat, no hot water, leaks and lockouts. The van carries the parts that fail most, so most repairs are done the day we arrive.",
    specs: [
      ["Response", "Same day, seven days a week"],
      ["On the van", "Valves, sensors, pumps, seals"],
      ["Guarantee", "A year on every repair"],
    ],
    link: "Book a repair",
  },
  {
    size: "c",
    img: null,
    alt: "",
    sizes: "",
    pos: "",
    kicker: "Servicing",
    title: "The annual service, written up",
    body: "Twelve checks in about three quarters of an hour, and a plain report at the end. It keeps the boiler safe, efficient and inside its warranty.",
    specs: [
      ["Checks", "Twelve, each one recorded"],
      ["Report", "Sent to your phone"],
      ["Reminder", "Every year, before winter"],
    ],
    link: "Book a service",
  },
  {
    size: "c",
    img: "detail.webp",
    alt: "A white column radiator under a sash window on a frosty morning",
    sizes: "(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 92vw",
    pos: "50% 74%",
    kicker: "Radiators and underfloor",
    title: "Every room up to temperature",
    body: "New radiators, towel rails and wet underfloor heating, balanced so the back bedroom is as warm as the lounge.",
    specs: [
      ["Radiators", "Column, panel, towel rails"],
      ["Underfloor", "Wet systems, zoned by room"],
      ["Power flush", "Wherever we find sludge"],
    ],
    link: "Plan your heating",
  },
];

const URGENCY = [
  ["Low", "No rush"],
  ["Soon", "Book this week"],
  ["Urgent", "Call today"],
];

const PROMISES = [
  ["A price before we start", "Fixed and in writing once the engineer has seen the fault. No meter running.", "Fixed price"],
  ["Parts on the van", "We carry what fails most, so most repairs are finished on the first visit.", "First-visit fix"],
  ["Sheets down, boots off", "Dust sheets under the boiler, old parts taken away, pipework left neat.", "Tidy work"],
  ["Guaranteed for a year", "Every repair is covered for twelve months. New boilers are registered for their full warranty.", "12 months"],
];

const CALLOUT = [
  ["08:10", "You call", "A person answers, takes the symptoms and finds you a slot.", "12°", "#cfe3f5"],
  ["08:25", "Engineer booked", "A text with a name, an arrival time and the callout price.", "12°", "#e7cb9e"],
  ["10:40", "At your door", "Fault traced, price agreed, part fitted from the van.", "14°", "#ffb347"],
  ["11:35", "Heating back on", "System tested, pressure set and a report sent to your phone.", "21°", "#ff7a2f"],
];

const REVIEWS = [
  [
    "The boiler died on the coldest night of the year. An engineer was here by ten the next morning and the house was warm by lunch.",
    "Homeowner, three-bed semi",
    "Boiler repair",
    "11°",
    "21°",
  ],
  [
    "They told me the old boiler had a few years left and just serviced it. No hard sell. That is why I rang them when it finally went.",
    "Homeowner, terraced house",
    "New boiler",
    "13°",
    "21°",
  ],
  [
    "The back bedroom has never been warm in twelve years. They balanced the radiators and added one. It is now the cosiest room in the house.",
    "Homeowner, detached house",
    "Radiators",
    "14°",
    "20°",
  ],
];

export default function EmberlinePage() {
  return (
    <div className={`eh ${sans.variable}`}>
      {/* The heat line under the header: the whole page's scroll, ice to ember. */}
      <div className="eh-heat" data-scrub="pin" aria-hidden="true">
        <i />
      </div>

      {/* ---------------------------------------------------------- Header */}
      <header className="eh-header">
        <a href="#top" className="eh-logo" aria-label="Emberline Heating, home">
          <span className="eh-logo-mark" aria-hidden="true" />
          Emberline
          <small>Heating</small>
        </a>
        <nav className="eh-nav" aria-label="Main">
          <a href="#turn-it-up">Turn it up</a>
          <a href="#checker">Symptom checker</a>
          <a href="#services">Services</a>
          <a href="#plan">Care plan</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href={PHONE_HREF} className="eh-header-phone">
          <span className="eh-mono">Call, 7am to 9pm</span>
          <span className="eh-num">{PHONE}</span>
        </a>
        <a href="#book" className="eh-btn eh-btn--ember eh-header-cta">
          <span className="eh-wide">Book an engineer</span>
          <span className="eh-narrow">Book</span>
        </a>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section id="top" className="eh-hero" data-scrub="exit" data-loop>
          <div className="eh-hero-frost" aria-hidden="true" />
          <div className="eh-hero-glow" aria-hidden="true" />

          <div className="eh-wrap eh-hero-grid">
            <div className="eh-hero-copy">
              <p className="eh-mono eh-hero-kicker">
                <span className="eh-live" aria-hidden="true" />
                Gas Safe registered · Out today
              </p>
              <h1 className="eh-h1">
                <span>Cold house?</span>
                <em>Not for long.</em>
              </h1>
              <p className="eh-hero-sub">
                Boiler repairs, servicing and new heating from Gas Safe registered engineers. Call before two and we aim
                to have someone at your door today.
              </p>
              <div className="eh-hero-actions">
                <a href="#book" className="eh-btn eh-btn--ember eh-btn--lg">
                  Book an engineer
                  <Go />
                </a>
                <a href={PHONE_HREF} className="eh-btn eh-btn--ghost eh-btn--lg">
                  <span className="eh-btn-label">Call</span>
                  <span className="eh-num">{PHONE}</span>
                </a>
              </div>
              <dl className="eh-hero-stats">
                {STATS.map(([value, label]) => (
                  <div key={value}>
                    <dt className="eh-num">{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="eh-hero-visual">
              <div className="eh-hero-photo">
                <Image
                  src={`${M}/hero.webp`}
                  alt="A white combi boiler on a utility room wall, copper pipes below it and a cold blue dawn in the window"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                />
              </div>
              <span className="eh-chip eh-chip--navy eh-hero-chip-b">
                Inside <b>12°</b>
              </span>
              <span className="eh-chip eh-chip--ice eh-hero-chip-a">
                Outside <b>−1°</b>
              </span>

              {/* What a customer sees once a job is booked. */}
              <aside className="eh-eta" aria-label="Sample booking status">
                <div className="eh-eta-head">
                  <p className="eh-mono">
                    <span className="eh-live" aria-hidden="true" />
                    Engineer on the way
                  </p>
                  <p className="eh-eta-time">
                    ETA <b>14:20</b>
                  </p>
                </div>
                <div className="eh-eta-who">
                  <span className="eh-eta-avatar" aria-hidden="true">
                    DM
                  </span>
                  <p>
                    <b>Dan, heating engineer</b>
                    <span>
                      Gas Safe registered · <span className="eh-num">7</span> minutes away
                    </span>
                  </p>
                </div>
                <ol className="eh-eta-track">
                  <li data-done>Booked</li>
                  <li data-done>Loaded</li>
                  <li data-now>On the way</li>
                  <li>At door</li>
                </ol>
                <dl className="eh-eta-rows">
                  <div>
                    <dt>Job</dt>
                    <dd>EH-2417 · No hot water</dd>
                  </div>
                  <div>
                    <dt>On the van</dt>
                    <dd>Diverter valve, sensor kit</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>Fixed before work starts</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>

          <p className="eh-wrap eh-ruler eh-mono" aria-hidden="true">
            <span>12°</span>
            <i />
            <span>Scroll to turn the heating up</span>
            <i />
            <span>21°</span>
          </p>
        </section>

        {/* --------------------------------------------- Signature: turn it up */}
        <section
          id="turn-it-up"
          className="eh-scene imm-pin"
          data-scrub="pin"
          data-steps="3"
          data-loop
          style={{ "--pin": 2.5 } as CSSProperties}
        >
          <div className="imm-stage eh-scene-stage">
            <div className="eh-scene-ground" aria-hidden="true">
              <span className="eh-scene-cold" />
              <span className="eh-scene-dusk" />
              <span className="eh-scene-wash" />
              <span className="eh-scene-warm" />
            </div>

            <div className="eh-wrap eh-scene-grid">
              <div className="eh-scene-head">
                <p className="eh-mono eh-kicker">What a visit feels like</p>
                <h2 className="eh-h2">
                  Turn it <em>up.</em>
                </h2>
                <p className="eh-scene-lead">A cold house coming back to life, one degree at a time.</p>
              </div>

              <Thermostat />

              <div className="eh-scene-body">
                <ol className="eh-moments">
                  {MOMENTS.map(([n, title, temp, text]) => (
                    <li key={n} className="eh-moment">
                      <span className="eh-mono eh-moment-n">{n}</span>
                      <div>
                        <h3>{title}</h3>
                        <div className="eh-moment-more">
                          <div>
                            <p>{text}</p>
                          </div>
                        </div>
                      </div>
                      <span className="eh-num eh-moment-temp">{temp}</span>
                    </li>
                  ))}
                </ol>
                <a href="#book" className="eh-btn eh-btn--ember eh-scene-cta">
                  Book an engineer
                  <Go />
                </a>
              </div>
            </div>

            <div className="eh-rads" aria-hidden="true">
              {Array.from({ length: RADIATORS }, (_, r) => (
                <div key={r} className="eh-rad" style={{ "--i": r } as CSSProperties}>
                  <div className="eh-haze">
                    {Array.from({ length: 4 }, (_, j) => (
                      <svg key={j} viewBox="0 0 8 48" style={{ "--j": (j + r) % 4 } as CSSProperties}>
                        <path d="M4 48 C1 42 7 38 4 32 S1 22 4 16 S7 6 4 0" />
                      </svg>
                    ))}
                  </div>
                  <div className="eh-rad-body">
                    {Array.from({ length: COLUMNS }, (_, c) => (
                      <i key={c} />
                    ))}
                  </div>
                  <div className="eh-rad-feet" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Symptom checker */}
        <section id="checker" className="eh-sec eh-sec--cream" data-loop>
          <div className="eh-wrap">
            <header className="eh-head eh-head--row">
              <div data-reveal>
                <p className="eh-mono eh-kicker">Boiler symptom checker</p>
                <h2 className="eh-h2">
                  What is it <em>doing?</em>
                </h2>
                <p className="eh-lead">
                  Tap the symptom closest to yours. You get the likely cause, what an engineer does about it and how
                  soon to call.
                </p>
              </div>
              <ul className="eh-legend eh-mono" aria-label="What the urgency gauge means" data-reveal="right">
                <li>How soon to call</li>
                {URGENCY.map(([name, action], i) => (
                  <li key={name}>
                    <span className="eh-urg" data-level={i + 1}>
                      <span className="eh-urg-bars" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <b>{name}</b>
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </header>
            <SymptomChecker />
            <p className="eh-gas">
              <svg viewBox="0 0 24 24" width="24" height="24" className="eh-gas-mark" aria-hidden="true">
                <path d="M12 3.2 22 20.5H2Z" />
                <path d="M12 9.5v5.2M12 17.4v.2" />
              </svg>
              <span>
                <b>Smell gas, or feel dizzy near the boiler?</b> Turn it off, open the windows, go outside and call the
                national gas emergency line. Do not wait for a booking.
              </span>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ Services */}
        <section id="services" className="eh-sec eh-sec--navy">
          <div className="eh-wrap">
            <header className="eh-head eh-head--row">
              <div data-reveal>
                <p className="eh-mono eh-kicker">What we do</p>
                <h2 className="eh-h2">
                  Every way to <em>heat a home.</em>
                </h2>
              </div>
              <a href="#book" className="eh-btn eh-btn--ghost">
                Book an engineer
                <Arrow />
              </a>
            </header>

            <div className="eh-cards">
              {SERVICES.map((s, i) => (
                <article
                  key={s.kicker}
                  className={`eh-card eh-card--${s.size}`}
                  data-reveal
                  style={{ "--d": `${(i % 3) * 110}ms` } as CSSProperties}
                >
                  {s.img ? (
                    <div className="eh-card-img">
                      <Image src={`${M}/${s.img}`} alt={s.alt} fill sizes={s.sizes} style={{ objectPosition: s.pos }} />
                      <span className="eh-chip eh-chip--navy eh-card-tag">
                        <b>0{i + 1}</b> {s.kicker}
                      </span>
                    </div>
                  ) : (
                    <div className="eh-card-fig">
                      <span className="eh-chip eh-chip--navy eh-card-tag">
                        <b>0{i + 1}</b> {s.kicker}
                      </span>
                      <div className="eh-gauge" aria-hidden="true">
                        <span className="eh-gauge-needle" />
                        <b>1.4 bar</b>
                      </div>
                      <ul className="eh-checks">
                        <li>
                          Flue <b>Clear</b>
                        </li>
                        <li>
                          Burner <b>Clean flame</b>
                        </li>
                        <li>
                          Pressure <b>1.4 bar</b>
                        </li>
                        <li>
                          Result <b>Passed</b>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="eh-card-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <dl className="eh-spec">
                      {s.specs.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {s.day ? (
                      <ol className="eh-day">
                        <li className="eh-mono">A typical install day</li>
                        {s.day.map(([time, text]) => (
                          <li key={time}>
                            <span className="eh-num">{time}</span>
                            {text}
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    <a href="#book" className="eh-link">
                      <span>{s.link}</span>
                      <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Care plan */}
        <section id="plan" className="eh-sec eh-sec--peach">
          <div className="eh-wrap">
            <CarePlan>
              <p className="eh-mono eh-kicker">Emberline care plan</p>
              <h2 className="eh-h2">
                Looked after, <em>all year.</em>
              </h2>
              <p className="eh-lead">
                One visit a year keeps the boiler safe, efficient and inside its warranty. The plan spreads the cost and
                puts you at the front of the queue when it turns cold.
              </p>
            </CarePlan>
          </div>
        </section>

        {/* ------------------------------------------------------------ Promises */}
        <section className="eh-sec eh-sec--amber">
          <div className="eh-wrap">
            <header className="eh-head eh-head--row">
              <div data-reveal>
                <p className="eh-mono eh-kicker">The Emberline way</p>
                <h2 className="eh-h2">
                  Straight answers. <em>Warm house.</em>
                </h2>
              </div>
              <a href="#book" className="eh-btn eh-btn--navy">
                Book an engineer
                <Go />
              </a>
            </header>
            <ul className="eh-promises">
              {PROMISES.map(([title, text, tag], i) => (
                <li key={title} className="eh-promise" data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
                  <p className="eh-promise-top">
                    <span className="eh-mono">0{i + 1}</span>
                    <span className="eh-chip">{tag}</span>
                  </p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>

            <div className="eh-run" data-scrub="enter">
              <div className="eh-run-head">
                <p className="eh-mono">A winter callout, timed</p>
                <p className="eh-mono">Sample job · house temperature on the right</p>
              </div>
              <ol className="eh-run-steps">
                <li className="eh-run-line" aria-hidden="true" />
                {CALLOUT.map(([time, title, text, temp, colour], i) => (
                  <li key={time} className="eh-run-step" style={{ "--i": i, "--c": colour } as CSSProperties}>
                    <span className="eh-run-dot" aria-hidden="true" />
                    <p className="eh-num eh-run-time">
                      {time}
                      <small>{temp}</small>
                    </p>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- Reviews */}
        <section id="reviews" className="eh-sec eh-sec--cream">
          <div className="eh-wrap">
            <header className="eh-head eh-head--row">
              <div data-reveal>
                <p className="eh-mono eh-kicker">Sample reviews · this is a demo</p>
                <h2 className="eh-h2">
                  Said from a <em>warm sofa.</em>
                </h2>
              </div>
              <p className="eh-leave" data-reveal="right">
                <b>
                  21<i>°</i>
                </b>
                <span>Where the thermostat sits when we leave. A readout, not a rating.</span>
              </p>
            </header>
            <ul className="eh-reviews">
              {REVIEWS.map(([quote, who, job, before, after], i) => (
                <li key={who} className="eh-review" data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties}>
                  <p className="eh-review-top">
                    <span className="eh-stars" role="img" aria-label="Five stars">
                      ★★★★★
                    </span>
                    <span className="eh-chip">{job}</span>
                  </p>
                  <blockquote>{quote}</blockquote>
                  <p className="eh-review-foot">
                    <span className="eh-mono">{who}</span>
                    <span className="eh-num eh-review-temp">
                      {before}
                      <i aria-hidden="true">→</i>
                      <span className="eh-sr">to </span>
                      {after}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------- Book an engineer */}
        <section id="book" className="eh-book">
          <div className="eh-wrap">
            <p className="eh-ruler eh-mono" aria-hidden="true">
              <span>12°</span>
              <i />
              <span>Holding steady</span>
              <i />
              <span>21°</span>
            </p>
            <div className="eh-book-grid">
              <div className="eh-book-copy">
                <p className="eh-mono eh-kicker">Book an engineer</p>
                <h2 className="eh-h2 eh-book-title">
                  Let’s get you <em>warm.</em>
                </h2>
                <p className="eh-book-sub">
                  Tell us what the heating is doing. An engineer calls back within the hour, seven in the morning to nine
                  at night, with an arrival time and a fixed price.
                </p>
                <a href={PHONE_HREF} className="eh-book-phone">
                  <span className="eh-mono">Or call us now</span>
                  <span className="eh-num">{PHONE}</span>
                </a>
                <ul className="eh-book-chips">
                  <li className="eh-chip">Gas Safe registered</li>
                  <li className="eh-chip">Same-day callouts</li>
                  <li className="eh-chip">Fixed prices</li>
                </ul>
              </div>
              <BookForm />
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- Footer */}
      <footer className="eh-footer">
        <div className="eh-wrap eh-footer-grid">
          <p className="eh-logo">
            <span className="eh-logo-mark" aria-hidden="true" />
            Emberline
            <small>Heating</small>
          </p>
          <div>
            <p className="eh-footer-note">
              Emberline Heating is a fictional business. This page is a demo by Integrate Web Design, made to show the
              kind of homepage we build for heating engineers. The prices, reviews and phone number are examples.
            </p>
          </div>
          <div className="eh-footer-rows">
            <p className="eh-mono">
              Phone <b>{PHONE}</b>
            </p>
            <p className="eh-mono">
              Hours <b>7am to 9pm, every day</b>
            </p>
            <a href="/web-design#immersive" className="eh-link" style={{ marginTop: "0.6rem" }}>
              <span>See the other demos</span>
              <Arrow />
            </a>
          </div>
        </div>
      </footer>

      {/* Phones: the action is always in reach. */}
      <div className="eh-bar">
        <a href="#book" className="eh-btn eh-btn--ember">
          Book an engineer
        </a>
        <a href={PHONE_HREF} className="eh-btn eh-btn--ghost" aria-label={`Call ${PHONE}`}>
          Call
        </a>
      </div>
    </div>
  );
}
