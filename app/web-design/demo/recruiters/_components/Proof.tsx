import Image from "next/image";
import { Reveal } from "./Reveal";
import { container, displayFont, monoKicker, monoStack } from "./tokens";

const SIDE_QUOTES = [
  {
    quote:
      "Three shortlisted, three interviewed, one hired. Twenty-six days door to door for a role we had been running ourselves for four months.",
    name: "Priya Shah",
    role: "VP Engineering, Series C fintech",
  },
  {
    quote:
      "They told me not to take a role they were being paid to fill, because it was wrong for me. I took the next one they called about. Still there.",
    name: "Daniel Okafor",
    role: "Placed as Head of Data, 2024",
  },
];

const PROOF_STATS = [
  { value: "83%", label: "of roles filled from the first shortlist" },
  { value: "96%", label: "of placements pass their guarantee period" },
  { value: "71%", label: "of new briefs arrive by referral" },
];

export function Proof() {
  return (
    <section className="border-t border-[#e7e2d8] bg-white py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <p className={`${monoKicker} text-[#c43a10]`}>What clients say</p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal>
            <figure>
              <blockquote
                className={`${displayFont} text-[clamp(1.55rem,3.4vw,2.6rem)] font-bold leading-[1.16] tracking-tight text-[#16181d]`}
              >
                &ldquo;Every agency says they vet people.{" "}
                <span className="text-[#c43a10]">Ascend are the first
                whose shortlist proved it.</span>{" "}
                We hired two of the five and would have taken a third.&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <span className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&q=70"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block font-semibold text-[#16181d]">
                    Laura Bennett
                  </span>
                  <span className={`${monoStack} mt-0.5 block text-[0.65rem] uppercase tracking-[0.14em] text-[#5c5f68]`}>
                    COO, Hatchwork · 3 searches with Ascend
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-8">
            {SIDE_QUOTES.map((item, i) => (
              <Reveal key={item.name} delay={i * 110}>
                <figure className="border-l-2 border-[#ff5a3c] pl-5">
                  <blockquote className="text-[0.95rem] leading-relaxed text-[#16181d]/85">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3">
                    <span className="text-sm font-semibold text-[#16181d]">
                      {item.name}
                    </span>
                    <span className={`${monoStack} mt-0.5 block text-[0.62rem] uppercase tracking-[0.14em] text-[#5c5f68]`}>
                      {item.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <dl className="grid grid-cols-1 gap-6 border-t border-[#e7e2d8] pt-8 sm:grid-cols-3 sm:gap-10">
            {PROOF_STATS.map((stat) => (
              <div key={stat.value}>
                <dd
                  className={`${displayFont} text-3xl font-bold tracking-tight text-[#16181d] sm:text-4xl`}
                >
                  {stat.value}
                </dd>
                <dt
                  className={`${monoStack} mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-[#5c5f68]`}
                >
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
