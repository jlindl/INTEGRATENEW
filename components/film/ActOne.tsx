/**
 * Act one: the cold open, the noise, the turn.
 *
 * Everything here renders in its finished state as plain HTML and CSS. The
 * film director (FilmDirector.tsx) only takes over once it has loaded, by
 * adding `film-on` to <html> and feeding each section a scroll progress.
 */
import Image from "next/image";
import type { CSSProperties } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONTACT, HERO, LOOPS, MEDIA, NOISE, TURN } from "@/lib/film/content";
import { scribblePath } from "@/lib/film/scribble";
import { FilmCta } from "./FilmCta";
import { FilmLoop } from "./FilmLoop";
import { ArtImage, Chip, Em, Phone, Slate, Tick, WhatsAppGlyph } from "./parts";

/* ------------------------------------------------------------------ */
/*  01. Cold open                                                      */
/* ------------------------------------------------------------------ */

function HeroPhone() {
  const p = HERO.phone;
  return (
    <Phone title={p.business} status={p.status} className="film-hero-phone">
      <p className="film-msg-pill" style={{ "--i": 0 } as CSSProperties}>
        {p.pill}
      </p>
      {p.thread.map((m, i) =>
        "photo" in m ? (
          <span key={i} className="film-msg film-msg--them film-msg--photo" style={{ "--i": i + 1 } as CSSProperties}>
            <Image src={MEDIA.jobPhoto.src} alt="" width={240} height={300} sizes="140px" className="film-msg-img" />
          </span>
        ) : (
          <span key={i} className={`film-msg film-msg--${m.from}`} style={{ "--i": i + 1 } as CSSProperties}>
            {m.text}
          </span>
        ),
      )}
      <p className="film-msg-booked" style={{ "--i": p.thread.length + 1 } as CSSProperties}>
        <Tick />
        {p.booked}
      </p>
    </Phone>
  );
}

export function Hero() {
  const c = HERO.cards;
  return (
    <section data-film="hero" data-beat="01|Cold open" data-tone="dark" className="film-hero bg-carbon text-ivory">
      {/* The brand's silver limb, blown up into the set: the one big object. */}
      <div className="film-hero-set" aria-hidden="true">
        <div className="film-hero-grid" />
        <div className="film-hero-limb" />
        <div className="film-hero-limb film-hero-limb--ink" />
      </div>

      <div className="container-x film-hero-layout">
        <div className="film-hero-body min-w-0">
          <p className="film-eyebrow text-halo">{HERO.eyebrow}</p>
          <h1 className="film-h1">
            {HERO.h1.map((line, i) => (
              <span key={line} className="film-h1-line">
                <Em text={line} />
                {i < HERO.h1.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <p className="film-hero-sub">{HERO.sub}</p>
          <div className="film-hero-actions" id="hero-actions">
            <FilmCta href={CONTACT.bookHref} tone="light" size="lg" place="hero">
              {CONTACT.bookLabel}
            </FilmCta>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="film-link film-link--light">
              <WhatsAppGlyph />
              <span>WhatsApp us</span>
            </a>
          </div>
          <ul className="film-hero-facts">
            {HERO.facts.map((f) => (
              <li key={f}>
                <Tick className="film-tick--light" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="film-hero-stage" aria-label="Example: the assistant answering a missed call" role="img">
          <div className="film-float film-float--a">
            <Chip kind={c.missed.kind} text={c.missed.text} icon="call" className="film-chip--glass" />
          </div>
          <HeroPhone />
          <div className="film-float film-float--b">
            <div className="film-card-cal">
              <span className="film-card-cal-day">
                <b>{c.calendar.day}</b>
                {c.calendar.time}
              </span>
              <span className="min-w-0">
                <span className="film-card-cal-text">{c.calendar.text}</span>
                <span className="film-card-cal-by">{c.calendar.by}</span>
              </span>
            </div>
          </div>
          <div className="film-float film-float--c">
            <div className="film-card-checks">
              <p className="film-card-checks-title">{c.checks.title}</p>
              <ul>
                {c.checks.items.map((t) => (
                  <li key={t}>
                    <Tick className="film-tick--sm" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="film-hero-note">{HERO.phone.note}</p>
        </div>
      </div>

      {/* The line starts here and does not leave the film until the last button. */}
      <div className="film-hero-line" aria-hidden="true">
        <span className="film-hero-line-dot" />
        <span className="film-hero-line-rule" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  02. The noise: one working day, as a clock                         */
/* ------------------------------------------------------------------ */

/**
 * The line from the hero becomes the day. A clock runs from 07:00 as the
 * visitor scrolls, and each missed call or unread message lands on the line
 * at its time, while the phone lies face down on the bench behind. Static
 * cut: the whole day, every card in place, the clock at 18:30.
 */
export function Noise() {
  const n = NOISE.day.length;
  return (
    <section
      data-film="noise"
      data-beat="02|The noise"
      data-tone="dark"
      className="film-noise bg-carbon text-ivory"
      style={{ "--n": n } as CSSProperties}
    >
      <div className="film-noise-stage">
        <div className="film-noise-media" aria-hidden="true">
          <ArtImage wide={MEDIA.phoneWide} tall={MEDIA.phoneTall} className="film-cover" />
          <FilmLoop wide={LOOPS.phone.wide} tall={LOOPS.phone.tall} />
          <div className="film-noise-shade" />
        </div>

        <div className="container-x film-noise-grid">
          <div className="film-noise-copy min-w-0">
            <Slate n="02" label="integrate/noise" />
            <h2 className="film-h2">
              {NOISE.title.map((line) => (
                <span key={line} className="block">
                  <Em text={line} />
                </span>
              ))}
            </h2>
            <p className="film-lead film-noise-lead">{NOISE.body}</p>
            <p className="film-status">
              <span className="film-status-dot" aria-hidden="true" />
              {NOISE.status}
            </p>
          </div>

          <div className="film-day min-w-0" data-day>
            <div className="film-day-head" aria-hidden="true">
              <span className="film-day-clock" data-clock>
                {NOISE.dayEnd}
              </span>
              <span className="film-day-tally">
                <span className="film-day-tally-n" data-tally>
                  {String(n).padStart(2, "0")}
                </span>
                {NOISE.tallyLabel}
              </span>
            </div>
            <ol className="film-day-list" aria-label="An example working day of missed messages">
              <li className="film-day-rail" aria-hidden="true" />
              {NOISE.day.map((d, i) => (
                <li key={d.time} className="film-day-item" data-time={d.time} style={{ "--i": i } as CSSProperties}>
                  <time className="film-day-time">{d.time}</time>
                  <span className="film-day-node" aria-hidden="true" />
                  <Chip kind={d.kind} text={d.text} icon={d.icon} className="film-chip--day" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  03. The turn (signature)                                           */
/* ------------------------------------------------------------------ */

const TURN_SPOTS = [
  [8, 16, -4],
  [24, 30, 3],
  [5, 44, 2],
  [22, 60, -2],
  [9, 76, 4],
  [30, 84, -3],
  [34, 12, 2],
  [36, 46, -1],
];

/** Small live-HTML examples of what each step of the system does. */
function TurnDemo({ demo, text }: { demo: string; text: string }) {
  if (demo === "reply")
    return (
      <span className="film-tdemo">
        <span className="film-tdemo-cap">WhatsApp · auto reply</span>
        <span className="film-tdemo-bubble">{text}</span>
      </span>
    );
  if (demo === "quote")
    return (
      <span className="film-tdemo">
        <span className="film-tdemo-cap">Quote</span>
        <span className="film-tdemo-doc" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="film-tdemo-ok">
          <Tick />
          {text}
        </span>
      </span>
    );
  if (demo === "calendar")
    return (
      <span className="film-tdemo">
        <span className="film-tdemo-cap">Calendar</span>
        <span className="film-tdemo-week" aria-hidden="true">
          {["M", "T", "W", "T", "F"].map((d, i) => (
            <span key={i} className={i === 3 ? "is-on" : undefined}>
              {d}
            </span>
          ))}
        </span>
        <span className="film-tdemo-ok">
          <Tick />
          {text}, Thursday
        </span>
      </span>
    );
  return (
    <span className="film-tdemo">
      <span className="film-tdemo-cap">Invoice</span>
      <span className="film-tdemo-bar" aria-hidden="true">
        <i />
      </span>
      <span className="film-tdemo-ok">
        <Tick />
        {text}
      </span>
    </span>
  );
}

export function Turn() {
  return (
    <section data-film="turn" data-beat="03|The turn" data-tone="dark" className="film-turn bg-carbon">
      <div className="film-turn-stage">
        {/* Carbon room: the mess, converging on the mark. */}
        <div className="film-turn-carbon text-ivory" aria-hidden="true">
          <svg className="film-turn-tangle" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={scribblePath(1)} className="film-stroke film-stroke--light" data-turn-tangle />
          </svg>
          {NOISE.chips.map((c, i) => (
            <Chip
              key={i}
              kind={c.kind}
              text={c.text}
              className={`film-chip--gather${i > 4 ? " max-md:hidden" : ""}`}
              style={{ "--x": TURN_SPOTS[i][0], "--y": TURN_SPOTS[i][1], "--r": `${TURN_SPOTS[i][2]}deg` } as CSSProperties}
            />
          ))}
          <p className="film-turn-before">
            <Em text="Every one of these could be a *job.*" />
          </p>
          <span className="film-turn-mark">
            <BrandLogo variant="mark" tone="light" height={256} alt="" className="film-turn-mark-img" />
          </span>
        </div>

        {/* Paper room: seen first through the chevron, then everywhere. */}
        <div className="film-turn-paper bg-paper text-ink">
          <div className="film-turn-grid" aria-hidden="true" />
          <div className="film-turn-sheen" aria-hidden="true" />
          <p className="film-turn-status" aria-hidden="true">
            <span className="film-status-dot film-status-dot--ink" />
            {TURN.status}
          </p>
          <div className="film-turn-copy">
            <Slate n="03" label="integrate/turn" className="film-slug--center" />
            <h2 className="film-h2">
              <Em text={TURN.title} />
            </h2>
          </div>
          <div className="film-turn-rule" aria-hidden="true" />
          <ol className="film-turn-order" aria-label="What the system does with them">
            {TURN.ordered.map((o, i) => (
              <li key={o.label} className="film-bead" style={{ "--i": i } as CSSProperties}>
                <s className="film-bead-was">{o.was}</s>
                <span className="film-bead-dot" aria-hidden="true" />
                <span className="film-bead-label">{o.label}</span>
                <TurnDemo demo={o.demo} text={o.text} />
              </li>
            ))}
          </ol>
          <div className="film-turn-drop" aria-hidden="true" />
          {/* The noise beat's day, replayed as the system log. */}
          <div className="film-turn-log" aria-hidden="true">
            <div className="film-turn-log-track">
              {[0, 1].map((copy) => (
                <span key={copy} className="film-turn-log-set">
                  {TURN.log.map(([t, was, now]) => (
                    <span key={t} className="film-turn-log-item">
                      <b>{t}</b> {was} <span className="film-turn-log-arrow">→</span> {now}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
