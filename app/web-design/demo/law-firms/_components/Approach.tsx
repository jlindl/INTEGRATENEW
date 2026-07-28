import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, quietLink } from "./ui";

const promises = [
  "A partner named on your matter from the first call to the last",
  "Fees agreed in writing before any work begins — no clock-watching",
  "Plain-English advice, and a straight answer when you need one",
  "Your calls and emails returned the same working day",
];

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 border-y border-[#e4ddd0] bg-white">
      <div
        className={`${container} grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-32`}
      >
        <Reveal className="order-2 lg:order-1">
          <div className="relative md:pb-10 md:pr-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e4ddd0]">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=75"
                alt="A Halstead Law solicitor talking a client through documents at the Guildford office"
                fill
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 hidden h-24 w-24 border-b-2 border-l-2 border-[#7c2d2d]/50 md:block"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <SectionHeading
            eyebrow="Approach"
            title="Serious about the outcome. Easy to talk to."
            sub="Most people meet a law firm on the worst day of a bad week. Our job is to make the law the least of your worries — measured, discreet, and firmly on your side."
          />
          <ul className="mt-8 space-y-4">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex gap-3.5 text-[0.95rem] leading-relaxed text-[#1a1712]"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="mt-1.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                  fill="none"
                  stroke="#7c2d2d"
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
          <a href="#contact" className={`${quietLink} mt-8`}>
            Arrange a first conversation
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
