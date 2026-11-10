/**
 * Act three: proof, how it works, and the payoff. Server components;
 * finished state by default.
 */
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BookCallForm } from "@/components/sections/BookCallForm";
import { COMPANY } from "@/lib/legalData";
import { CONTACT, LOOPS, MEDIA, PAYOFF, PROCESS, PROOF } from "@/lib/film/content";
import { FilmCta } from "./FilmCta";
import { FilmLoop } from "./FilmLoop";
import { Arrow, ArtImage, Em, Slate, Tick, WhatsAppGlyph } from "./parts";

/* ------------------------------------------------------------------ */
/*  06. Proof: real client sites, real screenshots                     */
/* ------------------------------------------------------------------ */

export function Proof() {
  return (
    <section id="case-studies" data-film="proof" data-beat="06|Real builds" data-tone="light" className="film-proof bg-paper text-ink">
      <div className="container-x film-proof-head">
        <header className="film-head min-w-0">
          <Slate n="06" label="integrate/work" />
          <h2 className="film-h2">
            <Em text={PROOF.title} />
          </h2>
          <p className="film-lead text-ink-2">{PROOF.body}</p>
        </header>
        {/* Counts of what is on this page, nothing more. */}
        <dl className="film-counts">
          <div>
            <dt>Live builds shown</dt>
            <dd>{String(PROOF.clients.length).padStart(2, "0")}</dd>
          </div>
        </dl>
      </div>

      <div className="film-strip-wrap" data-lenis-prevent-touch>
        <ul className="film-strip" data-strip>
          {PROOF.clients.map((c, i) => (
            <li key={c.name} className="film-frame">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="film-frame-link">
                <span className="film-frame-shot">
                  <span className="film-browser-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span className="film-browser-url">{c.host}</span>
                  </span>
                  <Image
                    src={c.img}
                    alt={`Screenshot of the live ${c.name} website`}
                    width={1280}
                    height={800}
                    sizes="(min-width: 1024px) 560px, 78vw"
                    className="film-frame-img"
                  />
                  <span className="film-frame-tag">{c.built}</span>
                </span>
                <span className="film-frame-meta">
                  <span className="film-frame-num">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="film-frame-name">{c.name}</span>
                    <span className="film-frame-built">{c.industry}</span>
                  </span>
                  <span className="film-frame-open">
                    Live site
                    <Arrow />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="film-strip-rail" aria-hidden="true" />

      <div className="container-x film-proof-foot">
        <Link href={PROOF.allHref} className="film-link film-link--dark">
          <span>{PROOF.allLabel}</span>
          <Arrow />
        </Link>
        <FilmCta href={CONTACT.bookHref} tone="dark" place="proof">
          {CONTACT.bookLabel}
        </FilmCta>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  07. How it works                                                   */
/* ------------------------------------------------------------------ */

/** A small artefact per phase, so each step has something to look at. */
function PhaseArt({ art }: { art: string }) {
  if (art === "call")
    return (
      <span className="film-art film-art--call">
        <span className="film-art-slot">
          <b>30</b> min
        </span>
        <span className="film-art-text">Call back within one business day</span>
      </span>
    );
  if (art === "plan")
    return (
      <span className="film-art">
        {PROCESS.planItems.map((t, i) => (
          <span key={t} className="film-art-row">
            <span className="film-art-n">0{i + 1}</span>
            {t}
          </span>
        ))}
      </span>
    );
  if (art === "build")
    return (
      <span className="film-art film-art--links">
        {PROCESS.buildItems.map((t, i) => (
          <span key={t} className="film-art-link">
            {t}
            {i < PROCESS.buildItems.length - 1 ? <i aria-hidden="true" /> : null}
          </span>
        ))}
      </span>
    );
  return (
    <span className="film-art film-art--run">
      <span className="film-status-dot film-status-dot--ink" aria-hidden="true" />
      Running · managed by Integrate
    </span>
  );
}

export function Process() {
  return (
    <section id="process" data-film="process" data-beat="07|How it works" data-tone="light" className="film-process bg-paper text-ink">
      <div className="container-x film-process-grid">
        <header className="film-head film-process-head">
          <Slate n="07" label="integrate/process" />
          <h2 className="film-h2">
            <Em text={PROCESS.title} />
          </h2>
          <div className="film-process-cta">
            <FilmCta href={CONTACT.bookHref} tone="dark" place="process">
              {CONTACT.bookLabel}
            </FilmCta>
          </div>
        </header>

        <ol className="film-phases">
          <li className="film-phases-rail" aria-hidden="true" />
          {PROCESS.phases.map((p, i) => (
            <li key={p.id} className="film-phase" data-phase style={{ "--i": i } as CSSProperties}>
              <span className="film-phase-node" aria-hidden="true" />
              <p className="film-eyebrow text-ink-3">{p.id}</p>
              <h3 className="film-h3">{p.name}</h3>
              <p className="film-body text-ink-2">{p.body}</p>
              <PhaseArt art={p.art} />
            </li>
          ))}
        </ol>
      </div>

      <div className="container-x">
        <dl className="film-qa">
          {PROCESS.questions.map((item, i) => (
            <div key={item.q} className="film-qa-item min-w-0" data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
              <span className="film-qa-n" aria-hidden="true">
                Q.0{i + 1}
              </span>
              <dt className="film-qa-q">{item.q}</dt>
              <dd className="film-body text-ink-2">
                {item.a}
                {item.link ? (
                  <>
                    {" "}
                    <Link href={item.link.href} className="film-inline-link">
                      {item.link.label}
                    </Link>
                    .
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  08. The payoff                                                     */
/* ------------------------------------------------------------------ */

export function Payoff() {
  return (
    <section id="book-call" data-film="payoff" data-beat="08|The payoff" data-tone="dark" className="film-payoff bg-carbon text-ivory">
      <div className="film-payoff-notch" aria-hidden="true" />
      <div className="film-payoff-media" aria-hidden="true">
        <ArtImage wide={MEDIA.orderWide} tall={MEDIA.orderTall} className="film-cover" />
        <FilmLoop wide={LOOPS.order.wide} tall={LOOPS.order.tall} />
        <div className="film-payoff-shade" />
      </div>

      <div className="container-x film-payoff-grid">
        <div className="film-payoff-copy min-w-0">
          <Slate n="08" label="integrate/start" />
          <h2 className="film-h1 film-payoff-title">
            <Em text={PAYOFF.title} />
          </h2>
          <p className="film-lead text-mist">{PAYOFF.body}</p>
          <ul className="film-hero-facts film-payoff-promises">
            {PAYOFF.promises.map((f) => (
              <li key={f}>
                <Tick className="film-tick--light" />
                {f}
              </li>
            ))}
          </ul>

          <ul className="film-payoff-routes">
            <li>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="film-route">
                <WhatsAppGlyph />
                <span className="min-w-0">
                  <span className="film-route-label">WhatsApp</span>
                  <span className="film-route-value">{CONTACT.whatsappDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="film-route">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="min-w-0">
                  <span className="film-route-label">Email</span>
                  <span className="film-route-value">{CONTACT.email}</span>
                </span>
              </a>
            </li>
          </ul>

          <p className="film-company">
            {COMPANY.name}. Registered in England and Wales, company no. {COMPANY.companyNumber}. Registered office:{" "}
            {COMPANY.registeredOffice}.
          </p>
        </div>

        <div className="film-payoff-form min-w-0">
          {/* The line arrives and becomes the frame of the form. */}
          <svg className="film-ring" aria-hidden="true" preserveAspectRatio="none">
            <rect x="0.5" y="0.5" rx="19" ry="19" pathLength={1} className="film-ring-stroke film-draw" />
          </svg>
          <BookCallForm source={PAYOFF.formSource} />
        </div>
      </div>
    </section>
  );
}
