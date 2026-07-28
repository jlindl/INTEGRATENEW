import { Stars } from "./icons";
import { Reveal } from "./Reveal";
import { container, displayFont, eyebrowLight, h2Light } from "./theme";

const REVIEWS = [
  {
    name: "Sarah",
    area: "Chapel Allerton",
    job: "Burst pipe repair",
    quote:
      "A pipe burst behind the washing machine at six in the morning. Northline answered first ring, arrived by half seven and the leak was stopped before the school run. Calm, kind and quick.",
  },
  {
    name: "Mark",
    area: "Horsforth",
    job: "New combi boiler",
    quote:
      "New combi quoted on the Tuesday, fitted on the Friday. The price never moved a penny and they registered the ten year warranty for us before they left. The house has never been warmer.",
  },
  {
    name: "Priya",
    area: "Roundhay",
    job: "Bathroom refit",
    quote:
      "They managed our whole bathroom refit, tiling and all, in under three weeks. Dust sheets everywhere, hoovered every single evening. It looks like a hotel now.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 border-y border-[#dde8ee] bg-white py-20 sm:py-28">
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className={eyebrowLight}>Reviews</p>
            <h2 id="reviews-heading" className={`${h2Light} mt-3`}>
              Rated by the people next door.
            </h2>
          </div>
          <div className="flex items-center gap-5 lg:justify-end">
            <p className={`${displayFont} text-[3.4rem] font-extrabold leading-none tracking-[-0.02em] text-[#12212e] sm:text-[4rem]`}>
              4.9
            </p>
            <div>
              <Stars starClassName="h-5 w-5" label="Rated 4.9 out of 5 on Google" />
              <p className="mt-1.5 text-sm font-semibold text-[#12212e]">212 Google reviews</p>
              <p className="text-sm text-[#4e6274]">Every one from a genuine local job.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <Reveal key={review.name} delay={index * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-[#dde8ee] bg-[#f6f9fb] p-6">
                <Stars starClassName="h-3.5 w-3.5" label="Rated 5 out of 5" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-[#12212e]">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-5 border-t border-[#dde8ee] pt-4">
                  <p className={`${displayFont} text-sm font-bold text-[#12212e]`}>
                    {review.name}, {review.area}
                  </p>
                  <p className="mt-0.5 text-sm text-[#4e6274]">{review.job}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
