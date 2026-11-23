import Image from "next/image";
import { Reveal } from "./Reveal";
import { label, mono, photo, serif, wrap } from "./ui";

const principles = [
  {
    n: "i.",
    t: "One fee, agreed before we start",
    d: "Your fee is set out line by line in writing. If your business changes, we tell you the new number first and you approve it. You will never open an invoice and wonder.",
  },
  {
    n: "ii.",
    t: "A partner, not a portal",
    d: "Every client has a named partner and a named accountant. They know your margins, your investors and your plans for next spring. Ask them anything, by phone or email.",
  },
  {
    n: "iii.",
    t: "Numbers while they are still useful",
    d: "Books closed in days, not quarters. Management accounts arrive while you can still act on them, with four figures we think matter and a paragraph on why.",
  },
];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="scroll-mt-20">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className={`${label} text-[#4f5a54]`}>
              <span className="text-[#a7834b]">01</span> &nbsp;Our approach
            </p>
          </Reveal>
          <Reveal className="lg:col-span-9" delay={80}>
            <h2
              id="approach-title"
              className={`${serif} text-[clamp(1.9rem,3.6vw,3.25rem)] font-[350] leading-[1.14] tracking-[-0.015em] text-[#13201b]`}
            >
              Most founders don&rsquo;t need more numbers. They need the{" "}
              <em className="italic text-[#1b4a3a]">right four</em>, on time,
              explained by someone who understands the business they are
              building.
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-y-12 border-t border-[#13201b] pt-10 md:grid-cols-3 md:gap-x-10 lg:mt-28 lg:pl-[25%]">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 110}>
              <p className={`${serif} text-[1.1rem] italic text-[#a7834b]`}>{p.n}</p>
              <h3 className={`${serif} mt-3 text-[1.45rem] leading-[1.2] text-[#13201b]`}>{p.t}</h3>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-[#4f5a54]">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="relative">
        <div className="relative h-[52vh] min-h-[340px] w-full overflow-hidden lg:h-[78vh]">
          <Image
            src="/web-design/demo/accountants/stair-light.webp"
            alt="Two people on a long white staircase, one climbing, one pausing at the top"
            fill
            sizes="100vw"
            className={`${photo} mc-parallax object-cover object-[30%_60%]`}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[#13201b]/10" />
        </div>
        <div className={`${wrap} relative`}>
          <div className="flex flex-col gap-2 border-b border-[#d6cfbf] py-5 sm:flex-row sm:items-baseline sm:justify-between">
            <p className={`${serif} text-[1.2rem] italic text-[#13201b]`}>
              Growth is a staircase, not a lift.
            </p>
            <p className={`${mono} text-[0.72rem] uppercase tracking-[0.14em] text-[#4f5a54]`}>
              We plan each step with you
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
