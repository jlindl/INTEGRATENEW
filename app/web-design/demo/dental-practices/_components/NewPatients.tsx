import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, quietLink } from "./ui";

const promises = [
  "Tell us you're nervous when you book — the whole team will know before you arrive",
  "No judgement, however long it's been since your last visit",
  "Numbing that actually works, and a stop signal you're in control of at all times",
  "Sedation options for longer or more involved treatment",
];

export function NewPatients() {
  return (
    <section
      id="new-patients"
      className="scroll-mt-24 border-y border-[#dceeeb] bg-white"
    >
      <div
        className={`${container} grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-32`}
      >
        <Reveal>
          <div className="relative md:pb-10 md:pr-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#dceeeb]">
              <Image
                src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1600&q=75"
                alt="A Brightwell dentist reassuring a smiling patient in the treatment chair"
                fill
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-2xl border border-[#dceeeb] bg-white px-4 py-3 shadow-[0_20px_44px_-26px_rgba(19,32,31,0.45)] md:left-auto md:right-4">
              <p className="text-2xl font-bold tracking-tight text-[#0f9c91]">9/10</p>
              <p className="text-[0.68rem] leading-tight text-[#4f6360]">
                nervous patients
                <br />
                felt at ease by visit two
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <SectionHeading
            eyebrow="Nervous patients welcome"
            title="If the dentist makes you anxious, you're in the right place."
            sub="A lot of our patients haven't been to a dentist in years. We built the practice — and trained the team — around making that first visit calm and completely judgement-free."
          />
          <ul className="mt-8 space-y-4">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex gap-3.5 text-[0.95rem] leading-relaxed text-[#13201f]"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="mt-1.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                  fill="none"
                  stroke="#12b3a6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8.5l3.5 3.5L13.5 4" />
                </svg>
                {promise}
              </li>
            ))}
          </ul>
          <a href="#book" className={`${quietLink} mt-8`}>
            Book a gentle first visit
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
