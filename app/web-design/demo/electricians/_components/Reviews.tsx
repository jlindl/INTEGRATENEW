import { Reveal } from "./Reveal";
import { Circuit, Stars, display, mono, wrap } from "./ui";

const reviews = [
  {
    name: "James R.",
    town: "Didsbury",
    job: "EV charger",
    quote:
      "Booked on Tuesday, fitted on Thursday. Kofi spotted our main fuse was undersized before he started and sorted it with the network. Garage left cleaner than he found it.",
  },
  {
    name: "Sarah M.",
    town: "Sale",
    job: "Consumer unit",
    quote:
      "Old fuse box out, new board in, power back on by two. Every circuit labelled in plain English and the certificate was in my email before tea.",
  },
  {
    name: "Tom & Ade",
    town: "Levenshulme",
    job: "Full rewire",
    quote:
      "Rewired a 1930s semi while we lived in it. Floorboards back down every night, kitchen working every evening. Came in £300 under the quote.",
  },
  {
    name: "Gareth L.",
    town: "Salford",
    job: "Landlord EICR",
    quote:
      "I manage eleven flats. Voltedge are the only firm whose reports I don't have to chase or translate. Honest coding, no invented remedials.",
  },
];

const bars = [
  { s: 5, pct: 94 },
  { s: 4, pct: 4 },
  { s: 3, pct: 1 },
  { s: 2, pct: 0 },
  { s: 1, pct: 1 },
];

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <Reveal>
            <Circuit n="C5">Reviews</Circuit>
            <h2 id="reviews-title" className="sr-only">
              What customers say
            </h2>
            <figure className="mt-8">
              <p aria-hidden="true" className={`${display} -mb-6 text-[8rem] font-black leading-none text-[#ffb020]`}>
                &ldquo;
              </p>
              <blockquote>
                <p className={`${display} text-[clamp(2rem,4.4vw,3.7rem)] font-extrabold uppercase leading-[0.98] text-[#f3f5f8]`}>
                  Lost all power at 11pm with the kids asleep. A real person
                  answered, Sam was here in 26 minutes and{" "}
                  <span className="text-[#ffb020]">the lights were back on by midnight.</span>
                </p>
              </blockquote>
              <figcaption className={`${mono} mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] uppercase tracking-[0.14em] text-[#9aa4b2]`}>
                <Stars className="h-3.5 w-3.5" />
                <span className="sr-only">Rated 5 out of 5.</span>
                <span className="text-[#f3f5f8]">Priya K., Bolton</span>
                <span>Emergency call-out</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100} className="lg:pt-16">
            <div className="border border-white/10 bg-[#0d1014] p-7">
              <p className={`${mono} text-[0.7rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>Google reviews</p>
              <p className={`${display} mt-2 flex items-baseline gap-2 text-[6rem] font-black leading-[0.85] text-[#f3f5f8]`}>
                4.9
                <span className="text-2xl font-bold text-[#9aa4b2]">/ 5</span>
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Stars className="h-4 w-4" />
                <span className="text-sm text-[#9aa4b2]">320 reviews</span>
              </div>
              <ul className="mt-6 grid gap-2" aria-label="Rating breakdown">
                {bars.map((b) => (
                  <li key={b.s} className={`${mono} grid grid-cols-[1.5rem_1fr_2.5rem] items-center gap-3 text-xs text-[#9aa4b2]`}>
                    <span>{b.s}★</span>
                    <span className="relative h-1.5 bg-white/10">
                      <span className="absolute inset-y-0 left-0 bg-[#ffb020]" style={{ width: `${b.pct}%` }} />
                    </span>
                    <span className="text-right">{b.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <li key={r.name} className="bg-[#0a0c0f]">
              <Reveal delay={i * 70} className="h-full">
                <figure className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <Stars className="h-3.5 w-3.5" />
                    <span className="sr-only">Rated 5 out of 5.</span>
                    <span className={`${mono} text-[0.62rem] uppercase tracking-[0.14em] text-[#9aa4b2]`}>{r.job}</span>
                  </div>
                  <blockquote className="mt-5 grow text-[1rem] leading-relaxed text-[#dfe4ea]">
                    <p>&ldquo;{r.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className={`${mono} mt-6 border-t border-white/10 pt-4 text-[0.72rem] uppercase tracking-[0.12em] text-[#f3f5f8]`}>
                    {r.name} <span className="text-[#9aa4b2]">· {r.town}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
