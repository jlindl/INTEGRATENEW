import Image from "next/image";
import {
  btnPrimary,
  btnSecondary,
  container,
  display,
  eyebrowDot,
  eyebrowRow,
} from "./ui";

function Stars() {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="#12b3a6">
          <path d="M10 1.6l2.5 5.3 5.8.6-4.3 3.9 1.2 5.7L10 14.3l-5.2 2.8 1.2-5.7L1.7 7.5l5.8-.6L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero">
      <div
        className={`${container} grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24`}
      >
        <div>
          <p className={eyebrowRow}>
            <span className={eyebrowDot} aria-hidden="true" />
            Private &amp; NHS · Anxious-patient friendly
          </p>
          <h1
            className={`${display} mt-5 text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-[1.02] tracking-tight text-[#13201f]`}
          >
            A calmer kind of dental care.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4f6360]">
            Gentle, modern dentistry in a spa-like setting. Clear prices, easy
            online booking, and a team that&rsquo;s genuinely good with nervous
            patients.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#book" className={btnPrimary}>
              Book online
            </a>
            <a href="#prices" className={btnSecondary}>
              See our prices
            </a>
          </div>
          <p className="mt-9 flex items-center gap-2.5 text-sm text-[#4f6360]">
            <Stars />
            <span>
              <span className="font-semibold text-[#13201f]">4.9</span> from
              1,100+ patient reviews
            </span>
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#dceeeb] sm:aspect-[16/12] lg:aspect-[4/4.4]">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=75"
              alt="A calm, light-filled Brightwell treatment room with a modern dental chair"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 85vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#13201f]/25 via-transparent to-transparent"
            />
          </div>

          {/* Floating "next appointment" card */}
          <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-[#dceeeb] bg-white/95 p-4 shadow-[0_28px_60px_-34px_rgba(19,32,31,0.5)] backdrop-blur-sm sm:left-auto sm:right-6 sm:w-64">
            <div className="flex items-center justify-between">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#4f6360]">
                Next available
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12b3a6]/12 px-2.5 py-1 text-[0.6rem] font-semibold text-[#0f9c91]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12b3a6]" aria-hidden="true" />
                Same week
              </span>
            </div>
            <p
              className={`${display} mt-2 text-xl font-bold tracking-tight text-[#13201f]`}
            >
              Tomorrow, 9:20am
            </p>
            <p className="mt-0.5 text-sm text-[#4f6360]">
              New patient exam &amp; scan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
