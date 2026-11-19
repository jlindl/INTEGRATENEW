import Image from "next/image";
import { IMG, btnLight, focusRingLight, label, linkUnderline, serif, wrap } from "./tokens";

const lines: { text: React.ReactNode }[] = [
  { text: "Decisive counsel" },
  {
    text: (
      <>
        for <em className="italic text-[#d9c3a0]">high-stakes</em>
      </>
    ),
  },
  { text: "moments." },
];

/**
 * The opening is a slow cinematic reveal, all in CSS so it needs no JS:
 * the photograph opens from a letterbox, settles from a gentle push-in,
 * and the headline rises line by line behind a mask. Reduced motion
 * users get the finished frame immediately.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0f0d0b] text-[#f3efe7]"
    >
      <div className="hl-hero-img absolute inset-0 -z-10">
        <Image
          src={`${IMG}/colonnade.webp`}
          alt="A long stone colonnade in soft morning light, columns receding into the distance"
          fill
          priority
          sizes="100vw"
          className="hl-grade object-cover object-[50%_40%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,11,0.55)_0%,rgba(15,13,11,0.15)_30%,rgba(15,13,11,0.35)_60%,rgba(15,13,11,0.92)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,13,11,0.6)_0%,rgba(15,13,11,0)_60%)]"
        />
      </div>

      <p
        aria-hidden="true"
        className={`${label} hl-fade absolute right-8 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 text-[#f3efe7]/55 lg:block`}
        style={{ "--d": "2s", right: "max(2rem, calc((100vw - 84rem) / 2 + 1rem))" } as React.CSSProperties}
      >
        Pl. I · The colonnade, Greenwich
      </p>
      <div className={`${wrap} flex flex-1 flex-col justify-end pb-10 pt-28 sm:pb-12`}>
        <p
          className={`${label} hl-fade mb-7 flex items-center gap-4 text-[#f3efe7]/75`}
          style={{ "--d": "0.5s" } as React.CSSProperties}
        >
          <span aria-hidden="true" className="h-px w-10 bg-[#a2865a]" />
          Commercial &amp; Private Client · London &amp; Guildford · Est. 1984
        </p>

        <h1
          id="hero-title"
          className={`${serif} max-w-[16ch] text-[clamp(3.5rem,min(9vw,12.5vh),9.25rem)] leading-[0.94] tracking-[-0.02em]`}
        >
          {lines.map((l, i) => (
            <span key={i} className="hl-line block overflow-hidden pb-[0.06em]">
              <span className="block" style={{ "--i": i } as React.CSSProperties}>
                {l.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 border-t border-[#f3efe7]/20 pt-7 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p
            className="hl-fade max-w-[40rem] text-[1.05rem] leading-[1.65] text-[#f3efe7]/85 sm:text-lg"
            style={{ "--d": "1.3s" } as React.CSSProperties}
          >
            A modern firm with old-fashioned judgement. A partner leads every
            matter, advice arrives in plain English, and the fee is agreed in
            writing before we start
            <a
              href="#fn-1"
              id="fnref-1"
              className={`ml-0.5 align-super text-[0.65em] text-[#d9c3a0] underline decoration-dotted underline-offset-2 ${focusRingLight}`}
              aria-label="Footnote 1, how fixed fees work"
            >
              1
            </a>
            .
          </p>
          <div
            className="hl-fade flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ "--d": "1.5s" } as React.CSSProperties}
          >
            <a href="#contact" className={btnLight}>
              Request a consultation
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a href="#practice" className={`${linkUnderline} text-[#f3efe7] ${focusRingLight}`}>
              Our practice areas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
