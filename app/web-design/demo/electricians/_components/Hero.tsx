import Image from "next/image";
import {
  Eyebrow,
  PhoneIcon,
  ShieldCheck,
  Stars,
  btnPrimary,
  btnSecondary,
  container,
  display,
} from "./ui";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-24">
      {/* Faint amber energy behind the headline. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 right-[-12%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,176,32,0.18),transparent_65%)]"
      />

      <div
        className={`${container} relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24`}
      >
        <div>
          <Eyebrow>NICEIC Approved · 24/7 Emergency</Eyebrow>
          <h1
            className={`mt-5 ${display} text-[clamp(2.6rem,6.5vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] text-[#f4f7fb]`}
          >
            Power you can count on,{" "}
            <span className="text-[#ffb020]">wired right</span> the first time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#93a0b1]">
            Fully certified electricians across the county. Same-day callouts,
            upfront pricing, and work that passes inspection every time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#quote" className={btnPrimary}>
              Get a fast quote
            </a>
            <a href="tel:01614960100" className={btnSecondary}>
              <PhoneIcon className="h-4 w-4 text-[#ffb020]" />
              Call now
            </a>
          </div>
          <p className="mt-7 flex items-center gap-2.5 text-sm text-[#93a0b1]">
            <Stars />
            <span>
              <span className="font-semibold text-[#f4f7fb]">4.9</span> from 320
              Google reviews
            </span>
          </p>
        </div>

        <div className="relative">
          {/* Signature sharp frame with a single amber corner accent */}
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-20 w-20 border-l-2 border-t-2 border-[#ffb020]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-20 w-20 border-b-2 border-r-2 border-[#ffb020]/40"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#232a35] sm:aspect-[16/12] lg:aspect-[4/4.6]">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=75"
              alt="Voltedge engineer in a hard hat fitting a wall-mounted electrical unit"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 85vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0e1116]/50 via-transparent to-transparent"
            />
            <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-[#0e1116]/80 px-3 py-2 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-[#ffb020]" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#f4f7fb]">
                NICEIC Approved Contractor
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
