import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container } from "./ui";

const reviews = [
  {
    quote:
      "I'd avoided dentists for over a decade. The team could not have been kinder, and I actually booked my next visit on the way out.",
    name: "Hannah M.",
    tag: "New patient",
  },
  {
    quote:
      "Booked online on a Sunday night and was seen on the Tuesday. Prices were exactly what the site said — no nasty surprises.",
    name: "Daniel O.",
    tag: "Emergency visit",
  },
  {
    quote:
      "My kids genuinely look forward to going now, which I never thought I'd say about a dentist. Calm, friendly and spotless.",
    name: "Priya S.",
    tag: "Family plan",
  },
];

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

export function Reviews() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 border-y border-[#dceeeb] bg-white"
    >
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            center
            eyebrow="Reviews"
            title="Patients who arrived nervous, and came back smiling."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {reviews.map((review, i) => (
            <Reveal key={review.name} className="h-full" delay={(i % 3) * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-[#dceeeb] bg-[#f4faf9] p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-[#13201f]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#dceeeb] pt-4">
                  <span className="block font-semibold text-[#13201f]">
                    {review.name}
                  </span>
                  <span className="text-sm text-[#4f6360]">{review.tag}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#4f6360]">
          Rated 4.9 out of 5 across Google and Facebook.
        </p>
      </div>
    </section>
  );
}
