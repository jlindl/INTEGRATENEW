/**
 * Act two: the system (three services on one line, each with its own scene)
 * and who it is for (the trade cuts). Server components; finished state by
 * default.
 */
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CONTACT, MEDIA, SYSTEM, TRADES } from "@/lib/film/content";
import { FilmCta } from "./FilmCta";
import { Arrow, ArtImage, Chip, Em, Slate, Tick, WhatsAppGlyph } from "./parts";

/* ------------------------------------------------------------------ */
/*  04. The system                                                     */
/* ------------------------------------------------------------------ */

/** SYS.01: the assistant's inbox, with satellites. */
function SceneAgents() {
  const x = SYSTEM.inbox;
  return (
    <div className="film-scene" role="img" aria-label={`${x.note}: conversations the assistant is handling`}>
      <div className="film-panel film-inbox">
        <div className="film-panel-bar">
          <span className="film-panel-title">{x.title}</span>
          <span className="film-live">
            <span className="film-status-dot film-status-dot--ink" />
            Live
          </span>
        </div>
        <ul className="film-inbox-rows">
          {x.rows.map((r, i) => (
            <li key={r.who} className="film-inbox-row" data-reveal style={{ "--d": `${i * 80}ms` } as CSSProperties}>
              <span className="film-inbox-av" aria-hidden="true">
                {r.who.slice(0, 1)}
              </span>
              <span className="min-w-0">
                <span className="film-inbox-who">{r.who}</span>
                <span className="film-inbox-via">{r.via}</span>
              </span>
              <span className={`film-state${r.strong ? " film-state--on" : ""}`}>{r.state}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="film-sat film-sat--tr">
        <Chip kind={x.live.kind} text={x.live.text} icon="chat" className="film-chip--paper" />
      </div>
      <div className="film-sat film-sat--bl">
        <Chip kind={x.handover.kind} text={x.handover.text} icon="call" className="film-chip--ink" />
      </div>
      <p className="film-scene-note">{x.note}</p>
    </div>
  );
}

/** SYS.02: ad, instant form, WhatsApp follow-up, booked. */
function SceneLeads() {
  const a = SYSTEM.ad;
  return (
    <div className="film-scene film-scene--leads" role="img" aria-label={`${a.note}: an ad, an instant form and a WhatsApp follow-up`}>
      <div className="film-panel film-ad">
        <div className="film-ad-head">
          <span className="film-inbox-av" aria-hidden="true">
            Y
          </span>
          <span className="min-w-0">
            <span className="film-inbox-who">{a.page}</span>
            <span className="film-inbox-via">{a.sponsored}</span>
          </span>
        </div>
        <p className="film-ad-copy">{a.copy}</p>
        <span className="film-ad-img">
          <Image src={MEDIA.adPhoto.src} alt="" width={640} height={362} sizes="(min-width: 1024px) 320px, 70vw" />
        </span>
        <div className="film-ad-foot">
          <span>{a.headline}</span>
          <span className="film-ad-btn">{a.cta}</span>
        </div>
      </div>
      <div className="film-panel film-form">
        <p className="film-panel-title">Instant form</p>
        {a.form.map(([k, v]) => (
          <span key={k} className="film-form-row">
            <span>{k}</span>
            <b>{v}</b>
          </span>
        ))}
        <span className="film-form-send">Send</span>
      </div>
      <div className="film-sat film-sat--follow">
        <span className="film-bubble">
          <WhatsAppGlyph />
          {a.follow}
        </span>
      </div>
      <div className="film-sat film-sat--booked">
        <span className="film-pill-ok">
          <Tick />
          {a.booked}
        </span>
      </div>
      <p className="film-scene-note">{a.note}</p>
    </div>
  );
}

/** SYS.03: a demo build in a browser, with an enquiry arriving. */
function SceneWeb() {
  const s = SYSTEM.site;
  return (
    <div className="film-scene">
      <Link href={s.href} className="film-browser" aria-label={`${s.label}: open the page`}>
        <span className="film-browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="film-browser-url">integrate demo · plumbers</span>
        </span>
        <Image
          src={s.src}
          alt="Homepage of an Integrate demo website for a plumbing business"
          width={1200}
          height={750}
          sizes="(min-width: 1024px) 560px, 90vw"
          className="film-browser-img"
        />
      </Link>
      <div className="film-sat film-sat--toast">
        <Chip kind={s.toast.kind} text={s.toast.text} icon="form" className="film-chip--ink" />
      </div>
      <ul className="film-sat film-sat--tags" aria-hidden="true">
        {s.tags.map((t) => (
          <li key={t} className="film-tag film-tag--card">
            {t}
          </li>
        ))}
      </ul>
      <p className="film-scene-note">{s.label}</p>
    </div>
  );
}

const SCENES = [SceneAgents, SceneLeads, SceneWeb];

export function System() {
  return (
    <section id="services" data-film="system" data-beat="04|The system" data-tone="light" className="film-system bg-paper text-ink">
      <div className="film-spine" aria-hidden="true" />
      <div className="film-spine-tip" aria-hidden="true" />
      <div className="container-x">
        <header className="film-head film-head--onspine">
          <Slate n="04" label="integrate/system" />
          <h2 className="film-h2">
            <Em text={SYSTEM.title} />
          </h2>
        </header>

        <div className="film-stations">
          {SYSTEM.stations.map((s, i) => {
            const Scene = SCENES[i];
            return (
              <article key={s.id} className="film-station" data-flip={i % 2 === 1 ? "" : undefined}>
                <span className="film-node" aria-hidden="true" />
                <div className="film-station-text min-w-0" data-reveal>
                  <Slate n={s.id} label={s.slug} />
                  <h3 className="film-h3">
                    <Em text={s.name} />
                  </h3>
                  <p className="film-body text-ink-2">{s.body}</p>
                  <ul className="film-tags" aria-label="Includes">
                    {s.tags.map((t) => (
                      <li key={t} className="film-tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="film-link film-link--dark mt-5">
                    <span>{s.linkLabel}</span>
                    <Arrow />
                  </Link>
                  <ul className="film-more">
                    {s.more.map((m) => (
                      <li key={m.href}>
                        <Link href={m.href}>{m.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="film-station-demo min-w-0">
                  <Scene />
                </div>
              </article>
            );
          })}
        </div>

        <div className="film-onspine-cta">
          <FilmCta href={CONTACT.bookHref} tone="dark" place="system">
            {CONTACT.bookLabel}
          </FilmCta>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05. Who it is for                                                  */
/* ------------------------------------------------------------------ */

export function Trades() {
  return (
    <section data-film="trades" className="film-trades bg-paper text-ink">
      <div className="film-trades-track" data-film="cuts" data-beat="05|Who it is for" data-tone="light">
        <div className="film-trades-stage">
          {/* The paper side of the stage: what the window opens from and closes back to. */}
          <div className="film-trades-paper">
            <header className="film-trades-head">
              <Slate n="05" label="integrate/trades" />
              <h2 className="film-h2">
                <Em text={TRADES.title} />
              </h2>
            </header>
            <div className="film-trades-also">
              <div className="min-w-0">
                <p className="film-eyebrow text-ink-3">{TRADES.alsoLabel}</p>
                <ul className="film-also-list">
                  {TRADES.also.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="film-also-actions">
                <Link href={TRADES.alsoHref} className="film-link film-link--dark">
                  <span>{TRADES.alsoLink}</span>
                  <Arrow />
                </Link>
                <FilmCta href={CONTACT.bookHref} tone="dark" place="trades" className="max-lg:hidden">
                  {CONTACT.bookLabel}
                </FilmCta>
              </div>
            </div>
          </div>

          <div className="film-shutter">
            {TRADES.cuts.map((c, i) => (
              <article
                key={c.name}
                className="film-cut text-ivory"
                style={{ "--hw": c.horizonWide, "--ht": c.horizonTall } as CSSProperties}
              >
                <div className="film-cut-media" aria-hidden="true">
                  <ArtImage
                    wide={{ src: c.wide, w: 2400, h: 1357 }}
                    tall={{ src: c.tall, w: 1200, h: 1500 }}
                    className="film-cover"
                  />
                </div>
                <div className="film-cut-shade" aria-hidden="true" />
                <div className="film-cut-body">
                  <p className="film-cut-count">
                    0{i + 1} <span>/ 0{TRADES.cuts.length}</span>
                  </p>
                  <h3 className="film-cut-name">{c.name}</h3>
                  <div className="film-cut-foot">
                    <div className="min-w-0">
                      <p className="film-cut-line">{c.line}</p>
                      <ul className="film-tags film-tags--dark" aria-label="Typical jobs">
                        {c.jobs.map((j) => (
                          <li key={j} className="film-tag">
                            {j}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={c.href} className="film-link film-link--light">
                      <span>Websites for {c.name.toLowerCase()}</span>
                      <Arrow />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
