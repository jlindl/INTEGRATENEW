"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { Arrow, Circuit, display, focusRing, h2, lede, mono, wrap } from "./ui";

const services = [
  {
    code: "01",
    rating: "B32",
    name: "Emergency fault-finding",
    body: "Dead circuits, tripping RCDs, a board that won't reset. We trace it, make it safe and fix it on the first visit in nine jobs out of ten.",
    price: "£89 call-out, first hour included",
    img: "/web-design/demo/electricians/hands-board.webp",
    alt: "Electrician's hands fitting a module into a consumer unit",
  },
  {
    code: "02",
    rating: "B40",
    name: "Consumer unit upgrades",
    body: "Out with the old fuse box, in with a metal-clad board and RCBO protection on every circuit. Usually done in a day, power back on by teatime.",
    price: "From £549 fitted and certified",
    img: "/web-design/demo/electricians/breakers.webp",
    alt: "Close-up of a row of circuit breakers on a modern board",
  },
  {
    code: "03",
    rating: "B20",
    name: "Full and partial rewires",
    body: "Room by room or the whole house, with floorboards lifted and relaid and chases filled ready for the decorator. Free survey and a fixed quote.",
    price: "3-bed semi typically £4,200 to £5,800",
    img: "/web-design/demo/electricians/terminals.webp",
    alt: "Neatly dressed cables landing on rows of terminal blocks",
  },
  {
    code: "04",
    rating: "B32",
    name: "EV charger installs",
    body: "Approved installers for Ohme, Zappi, Pod Point and Hypervolt. We check your supply first, so there are no surprises on fitting day.",
    price: "From £949 supplied and fitted",
    img: "/web-design/demo/electricians/ev-charge.webp",
    alt: "Electric car on charge with an orange cable plugged into its port",
  },
  {
    code: "05",
    rating: "B16",
    name: "EICRs and landlord certificates",
    body: "Full condition reports for landlords, letting agents and buyers. Clear write-up, coded honestly, remedials quoted separately and never padded.",
    price: "From £129, report within 24 hours",
    img: "/web-design/demo/electricians/multimeter.webp",
    alt: "A digital multimeter reading voltage beside a cordless drill",
  },
  {
    code: "06",
    rating: "B10",
    name: "Lighting, sockets and small works",
    body: "Extra sockets, outside power, garden lighting, downlights done properly. Booked by the half day so you're not paying for a full one.",
    price: "Half-day rate £180",
    img: "/web-design/demo/electricians/lighting.webp",
    alt: "A warm filament bulb hanging against soft out-of-focus lights",
  },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <Circuit n="C2">Schedule of work</Circuit>
            <h2 id="services-title" className={`${h2} mt-6`}>
              Six circuits.
              <br />
              <span className="text-[#9aa4b2]">All of them ours.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={lede}>
              Domestic and light commercial work across Greater Manchester.
              Every job tested to BS 7671 and certified before we leave, with
              the paperwork in your inbox the same day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Desktop: sticky image that follows the hovered row */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#12161b]">
                {services.map((s, i) => (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt={i === active ? s.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 38vw, 1px"
                    className={`object-cover saturate-[.8] transition-[opacity,transform] duration-700 ease-out ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                  />
                ))}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <p className={`${display} text-[7rem] font-black leading-[0.75] text-[#ffb020]`} aria-hidden="true">
                    {services[active].code}
                  </p>
                  <p className={`${mono} text-right text-[0.7rem] uppercase tracking-[0.16em] text-[#f3f5f8]`}>
                    Circuit {services[active].code}
                    <br />
                    <span className="text-[#9aa4b2]">Rated {services[active].rating}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ol className="border-t border-white/10">
            {services.map((s, i) => (
              <li key={s.code}>
                <Reveal delay={i * 40}>
                  <article
                    onMouseEnter={() => setActive(i)}
                    className="group relative border-b border-white/10 py-7 outline-none sm:py-9"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-[-1px] h-[2px] bg-[#ffb020] transition-[width] duration-500 ease-out ${
                        active === i ? "w-full" : "w-0"
                      } hidden lg:block`}
                    />
                    <div className="relative mb-6 aspect-[16/9] overflow-hidden border border-white/10 lg:hidden">
                      <Image
                        src={s.img}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 640px) 90vw, 100vw"
                        className="object-cover saturate-[.8]"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[4rem_1fr]">
                      <p className={`${mono} pt-2 text-xs uppercase tracking-[0.16em] text-[#9aa4b2]`}>
                        <span className="text-[#ffb020]">{s.code}</span> / {s.rating}
                      </p>
                      <div>
                        <h3
                          className={`${display} text-[clamp(2rem,3.6vw,3.1rem)] font-extrabold uppercase leading-[0.95] transition-colors duration-300 ${
                            active === i ? "lg:text-[#f3f5f8]" : "lg:text-[#f3f5f8]/55"
                          } text-[#f3f5f8]`}
                        >
                          {s.name}
                        </h3>
                        <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-[#9aa4b2]">{s.body}</p>
                        <p className={`${mono} mt-4 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.12em] text-[#f3f5f8]`}>
                          <span aria-hidden="true" className="h-px w-5 bg-[#ffb020]" />
                          {s.price}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-10">
          <p className="text-[#9aa4b2]">
            Something not on the list?{" "}
            <a
              href="#quote"
              className={`inline-flex items-center gap-1.5 font-semibold text-[#f3f5f8] underline decoration-[#ffb020] decoration-2 underline-offset-4 hover:text-[#ffb020] ${focusRing}`}
            >
              Describe the job and we'll price it <Arrow className="h-4 w-4" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
