import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, quietLink } from "./ui";

const promises = [
  "Quarterly reviews, booked in advance and led by your partner",
  "Every deadline tracked and chased for you, never the other way round",
  "The phone answered by your actual accountant, not a call centre",
];

export function Advisory() {
  return (
    <section id="advisory" className="scroll-mt-24">
      <div
        className={`${container} grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-32`}
      >
        <Reveal className="order-2 lg:order-1">
          <div className="relative md:pb-10 md:pr-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e2ded2]">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=75"
                alt="A Meridian partner and a client working through year-end figures together, laptop and handwritten notes on the desk"
                fill
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 hidden w-[36%] overflow-hidden rounded-xl border-[6px] border-[#f4f2ec] shadow-[0_24px_50px_-24px_rgba(21,32,28,0.45)] md:block">
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=800&q=75"
                  alt="A Meridian partner photographed at the Clerkenwell office"
                  fill
                  sizes="(min-width: 1024px) 16vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <SectionHeading
            eyebrow="Advisory"
            title="A partner, not a filing service."
            sub="Most accountants tell you what happened last year. We would rather talk about the year ahead. Every client has a named partner who knows the numbers before you call."
          />
          <ul className="mt-8 space-y-4">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex gap-3.5 text-[0.95rem] leading-relaxed text-[#15201c]"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="mt-1.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                  fill="none"
                  stroke="#1f5c46"
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
            Book your first review
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
