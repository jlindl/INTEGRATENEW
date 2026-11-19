import { Reveal } from "./Reveal";
import { container, display, eyebrow } from "./ui";

const reviews = [
  {
    quote:
      "I hadn’t been in eleven years and was close to cancelling twice. Hannah spent the first fifteen minutes just talking. I cried a bit, nobody made it weird, and I’ve now had two fillings without a single panic.",
    name: "Rachel M.",
    meta: "Chapel Allerton",
  },
  {
    quote: "Booked at 11pm on my phone in about a minute. Reminder text, no chasing. Wish everything worked like this.",
    name: "Tom B.",
    meta: "City centre",
  },
  {
    quote: "Jo is the gentlest hygienist I’ve ever had. The weighted blanket thing sounds daft but honestly, try it.",
    name: "Aisha K.",
    meta: "Roundhay",
  },
  {
    quote: "They gave me a printed plan with every price on it and told me to go home and think. No upselling. I went back the next week.",
    name: "Graham P.",
    meta: "Horsforth",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="#a4553a" aria-hidden="true">
          <path d="M10 1.6l2.5 5.3 5.8.6-4.3 3.9 1.2 5.7L10 14.3l-5.2 2.8 1.2-5.7L1.7 7.5l5.8-.6L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  const [lead, ...rest] = reviews;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-20 bg-[#ece3d6]">
      <div className={`${container} py-24 sm:py-28 lg:py-36`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className={eyebrow}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
              Patient reviews
            </p>
            <h2
              id="reviews-title"
              className={`${display} mt-6 max-w-2xl text-[clamp(2.3rem,5vw,4.1rem)] font-light leading-[1.04] tracking-[-0.03em] text-[#1c2a26]`}
            >
              In their words, <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">not ours</em>.
            </h2>
          </Reveal>
          <Reveal delay={80} className="flex items-center gap-5">
            <p className={`${display} text-[4.5rem] leading-none text-[#1c2a26]`}>4.9</p>
            <div>
              <Stars />
              <p className="mt-1.5 text-[0.9rem] text-[#55625c]">From 1,100+ Google reviews</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="h-full">
            <figure className="flex h-full flex-col justify-between rounded-[2rem] bg-[#fffcf7] p-8 sm:p-12">
              <div>
                <svg viewBox="0 0 48 36" className="h-9 w-12 text-[#f2d6c6]" fill="currentColor" aria-hidden="true">
                  <path d="M0 36V22C0 10 6 2 18 0l2 5c-6 2-9 6-9 12h9v19H0Zm28 0V22c0-12 6-20 18-22l2 5c-6 2-9 6-9 12h9v19H28Z" />
                </svg>
                <blockquote className={`${display} mt-6 text-[clamp(1.5rem,2.6vw,2.15rem)] font-light leading-[1.3] text-[#1c2a26]`}>
                  {lead.quote}
                </blockquote>
              </div>
              <figcaption className="mt-10 flex items-center justify-between gap-4 border-t border-[#1c2a26]/10 pt-6">
                <span>
                  <span className="block font-semibold text-[#1c2a26]">{lead.name}</span>
                  <span className="text-[0.88rem] text-[#55625c]">{lead.meta}</span>
                </span>
                <Stars />
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-5">
            {rest.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <figure className="rounded-[1.6rem] bg-[#fffcf7]/70 p-6 sm:p-7">
                  <blockquote className="text-[1rem] leading-[1.65] text-[#1c2a26]">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.88rem]">
                    <span>
                      <span className="font-semibold text-[#1c2a26]">{r.name}</span>
                      <span className="text-[#55625c]"> · {r.meta}</span>
                    </span>
                    <Stars />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
