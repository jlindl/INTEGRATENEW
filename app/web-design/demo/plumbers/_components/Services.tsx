import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { Reveal } from "./Reveal";
import { container, displayFont, eyebrowLight, focusLight, h2Light, linkTeal } from "./theme";

type Service = {
  kicker: string;
  title: string;
  standfirst: string;
  body: string;
  points: string[];
  image: { src: string; alt: string };
};

const SERVICES: Service[] = [
  {
    kicker: "01 · Emergency repairs",
    title: "Emergencies, with you within 2 hours across Leeds",
    standfirst: "Burst pipes, live leaks and blocked drains, made safe fast.",
    body: "A burst pipe does not wait for opening hours, so neither do we. Call the emergency line and the nearest engineer heads your way, isolates the problem, makes everything safe, then quotes the permanent fix on the spot.",
    points: [
      "24/7, including weekends and bank holidays",
      "Live arrival time sent by text",
      "Leak found, stopped and made safe first",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=70",
      alt: "Water running at full pressure from a kitchen mixer tap",
    },
  },
  {
    kicker: "02 · Boilers & heating",
    title: "Boilers serviced, repaired and replaced",
    standfirst: "Annual service from £75. New installs with warranties up to 10 years.",
    body: "From a rattling radiator to a full combi swap, our Gas Safe engineers keep West Yorkshire homes warm. We size the boiler to the house, register the warranty for you, and set up smart controls so the heating only runs when it should.",
    points: [
      "Annual service from £75, warranty kept valid",
      "New boilers with warranties up to 10 years",
      "Power flushes, radiators and smart thermostats",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1200&q=70",
      alt: "Smart heating thermostat mounted on a living room wall",
    },
  },
  {
    kicker: "03 · Bathrooms",
    title: "Bathrooms, full fit-outs managed start to finish",
    standfirst: "One project manager, one schedule, one tidy handover.",
    body: "We handle the whole job: strip-out, first fix, tiling, electrics and the final polish, coordinated by one project manager who calls you every evening with progress. Most full refits are done inside three weeks.",
    points: [
      "Design help and a fixed written quote",
      "Tiling, electrics and plastering coordinated for you",
      "Typical full refit finished in three weeks",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=70",
      alt: "Newly renovated bathroom with a glass walk-in shower",
    },
  },
  {
    kicker: "04 · General plumbing",
    title: "General plumbing, taps, leaks, tanks and everything between",
    standfirst: "No job too small, priced from a fixed menu before we start.",
    body: "Dripping tap, slow drain, noisy tank, outside tap for the garden. The small jobs other firms turn down are half of what we do, and every one is priced from a fixed menu before a tool comes out of the van.",
    points: [
      "Fixed menu pricing, agreed up front",
      "Taps, toilets, tanks, pumps and pipework",
      "Same-day slots most weekdays",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=70",
      alt: "Polished chrome bath taps in a finished bathroom",
    },
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-[#f6f9fb] py-20 sm:py-28">
      <div className={container}>
        <div className="max-w-2xl">
          <p className={eyebrowLight}>What we do</p>
          <h2 id="services-heading" className={`${h2Light} mt-3`}>
            One number for every pipe, drip and radiator.
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-[#4e6274]">
            Four teams, one standard. Whatever the job, you get a fixed quote first, a named engineer, and a home left
            cleaner than we found it.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20">
          {SERVICES.map((service, index) => {
            const flip = index % 2 === 1;
            return (
              <Reveal key={service.kicker}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_50px_-30px_rgba(2,12,22,0.45)] ${
                      flip ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1024px) 544px, (min-width: 640px) 90vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className={flip ? "lg:order-1" : ""}>
                    <p className={eyebrowLight}>{service.kicker}</p>
                    <h3
                      className={`${displayFont} mt-3 text-[1.4rem] font-bold leading-[1.18] tracking-[-0.01em] text-[#12212e] sm:text-[1.6rem]`}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-2 font-semibold text-[#0d6e5d]">{service.standfirst}</p>
                    <p className="mt-3 leading-relaxed text-[#4e6274]">{service.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[0.95rem] text-[#12212e]">
                          <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0d6e5d]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className={`${linkTeal} mt-6 rounded-md ${focusLight}`}>
                      Book this job
                      <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
