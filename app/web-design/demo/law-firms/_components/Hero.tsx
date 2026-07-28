import Image from "next/image";
import {
  btnPrimary,
  btnSecondary,
  container,
  display,
  eyebrowDot,
  eyebrowRow,
} from "./ui";

export function Hero() {
  return (
    <section id="hero">
      <div
        className={`${container} grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28`}
      >
        <div>
          <p className={eyebrowRow}>
            <span className={eyebrowDot} aria-hidden="true" />
            Est. 1984 · London &amp; Guildford
          </p>
          <h1
            className={`${display} mt-5 text-[clamp(2.7rem,6vw,4.5rem)] font-medium leading-[1.03] tracking-tight text-[#1a1712]`}
          >
            Decisive counsel for high-stakes moments.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5a544a]">
            A modern firm with old-fashioned judgement. You get clear advice,
            a senior solicitor on every matter, and the fee agreed before we
            start the work.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className={btnPrimary}>
              Request a consultation
            </a>
            <a href="#expertise" className={btnSecondary}>
              Our expertise
            </a>
          </div>
          <p className="mt-9 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#5a544a]">
            Legal 500 ranked · Chambers &amp; Partners · Lexcel accredited
          </p>
        </div>

        <div className="relative">
          {/* Oxblood corner rules — the editorial frame */}
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 hidden h-20 w-20 border-l-2 border-t-2 border-[#7c2d2d] sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 hidden h-20 w-20 border-b-2 border-r-2 border-[#7c2d2d]/40 sm:block"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#e4ddd0] sm:aspect-[16/12] lg:aspect-[4/4.5]">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=75"
              alt="Two Halstead Law solicitors in discussion across a boardroom table"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 85vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1a1712]/45 via-transparent to-transparent"
            />
            {/* Accolade card */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-[#1a1712]/80 px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                  Client satisfaction
                </p>
                <p className={`${display} text-lg font-medium leading-tight text-white`}>
                  98% would instruct us again
                </p>
              </div>
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7c2d2d] text-sm font-semibold text-white"
                aria-hidden="true"
              >
                40y
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
