import { Reveal } from "./Reveal";
import {
  Eyebrow,
  Stars,
  container,
  h2Heading,
  sectionSub,
} from "./ui";

const reviews = [
  {
    name: "Sarah",
    town: "Sale",
    job: "Fuse board upgrade",
    quote:
      "Old fuse box swapped for a new board in a morning. Tidy work, every circuit labelled, and the certificate arrived by email the same day.",
  },
  {
    name: "James",
    town: "Didsbury",
    job: "EV charger install",
    quote:
      "Booked the charger install on Tuesday, fitted on Thursday. They sorted the app setup for me and left the garage cleaner than they found it.",
  },
  {
    name: "Priya",
    town: "Bolton",
    job: "Emergency callout",
    quote:
      "Lost all power at 11pm with the kids asleep upstairs. An engineer arrived within half an hour and had the fault traced and fixed by midnight.",
  },
];

export function Reviews() {
  return (
    <section
      id="reviews"
      className="border-t border-[#232a35] bg-[#161b23]/40 scroll-mt-24"
    >
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <Reveal>
          <Eyebrow>Reviews</Eyebrow>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className={`${h2Heading} mt-0`}>
              4.9 from 320 Google reviews
            </h2>
            <Stars starClassName="h-5 w-5" />
          </div>
          <p className={sectionSub}>
            Real jobs, reviewed by the people who paid for them.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 70} className="h-full">
              <figure className="flex h-full flex-col rounded-lg border border-[#232a35] bg-[#161b23] p-6 sm:p-7">
                <p className="flex items-center gap-2">
                  <Stars />
                  <span className="sr-only">Rated 5 out of 5</span>
                  <span className="rounded-md border border-[#232a35] bg-[#0e1116] px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#93a0b1]">
                    {review.job}
                  </span>
                </p>
                <blockquote className="mt-4 grow text-base leading-relaxed text-[#f4f7fb]">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-5 border-t border-[#232a35] pt-4 text-sm">
                  <span className="font-semibold text-[#f4f7fb]">
                    {review.name}
                  </span>
                  <span className="text-[#93a0b1]">, {review.town}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
