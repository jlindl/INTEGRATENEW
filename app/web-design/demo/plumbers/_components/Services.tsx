import Image from "next/image";
import type { ReactNode } from "react";
import { BathIcon, CheckIcon, DrainIcon, DropIcon, FlameIcon } from "./icons";
import { Reveal } from "./Reveal";
import { display, focusRing, h2, kicker, mono, wrap } from "./theme";

type Service = {
  no: string;
  icon: ReactNode;
  name: string;
  line: string;
  points: string[];
  from: string;
  img: string;
  alt: string;
  span: string;
  imgPos?: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    icon: <DropIcon />,
    name: "Leaks and bursts",
    line: "We trace the leak with thermal imaging before lifting a single floorboard, make it safe, then fix it properly.",
    points: ["Thermal and acoustic leak detection", "Burst pipes, stopcocks and cisterns", "Insurer-ready photo report"],
    from: "£95",
    img: "/web-design/demo/plumbers/drip.webp",
    alt: "Water dripping from the spout of a chrome tap",
    span: "lg:col-span-7",
    imgPos: "object-[50%_40%]",
  },
  {
    no: "02",
    icon: <FlameIcon />,
    name: "Boilers and heating",
    line: "Breakdowns, annual services and new combis, from the same team that picks up at 6am in January.",
    points: ["Worcester, Vaillant, Ideal and Baxi", "Annual service £85, warranty kept valid", "New combi from £2,195 fitted"],
    from: "£85",
    img: "/web-design/demo/plumbers/boiler-valves.webp",
    alt: "Isolation valves and flexible gas pipe underneath a wall-hung combi boiler",
    span: "lg:col-span-5",
  },
  {
    no: "03",
    icon: <DrainIcon />,
    name: "Drains",
    line: "Slow sinks to blocked outside gullies. We clear it, then show you on camera why it happened.",
    points: ["High-pressure jetting", "CCTV surveys with recorded footage", "Gullies and soil stacks"],
    from: "£85",
    img: "/web-design/demo/plumbers/drain.webp",
    alt: "Close-up of a stainless steel sink plughole",
    span: "lg:col-span-5",
  },
  {
    no: "04",
    icon: <BathIcon />,
    name: "Bathrooms",
    line: "One team, one fixed price, finished on the date we gave you. Plumbing, tiling and electrics all in-house.",
    points: ["Design visit and 3D layout", "No subcontractor hand-offs", "Typical refit: 10 to 14 working days"],
    from: "£6,800",
    img: "/web-design/demo/plumbers/bathroom-finished.webp",
    alt: "A bright, newly fitted bathroom with a double vanity, freestanding bath and heated towel rail",
    span: "lg:col-span-7",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-[#f3f6f5] py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className={kicker}>What we do, all day, every day</p>
            <h2 id="services-title" className={`${h2} mt-5 text-[#0b1a28]`}>
              Four trades.
              <br />
              One van that turns up.
            </h2>
          </div>
          <p className="max-w-md text-[1.08rem] leading-relaxed text-[#33475a] lg:col-span-4 lg:justify-self-end">
            Every engineer carries stock for the 200 most common repairs, so nine jobs in ten are finished on the first
            visit. No second trip for a part.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 lg:grid-cols-12">
          {SERVICES.map((sv, i) => (
            <li key={sv.no} className={sv.span}>
              <Reveal delay={(i % 2) * 90} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-[#d8e1e3] transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(11,26,40,0.35)]">
                  <div className="relative h-[220px] overflow-hidden sm:h-[280px]">
                    <Image
                      src={sv.img}
                      alt={sv.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] ${sv.imgPos ?? ""}`}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1a28]/40 to-transparent" />
                    <span className={`${mono} absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] text-[#0b1a28]`}>
                      {sv.no}
                    </span>
                    <span className="absolute bottom-5 right-5 rounded-full bg-[#1ed3b0] px-4 py-2 text-[0.88rem] font-bold text-[#0b1a28]">
                      from {sv.from}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-[#0a7a66]">
                      {sv.icon}
                      <h3 className={`${display} text-[1.6rem] font-extrabold tracking-[-0.03em] text-[#0b1a28] sm:text-[1.85rem]`}>
                        {sv.name}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-[34rem] leading-relaxed text-[#33475a]">{sv.line}</p>
                    <ul className="mt-6 grid gap-2.5 border-t border-[#e4ebec] pt-5 text-[0.95rem] text-[#0b1a28] sm:grid-cols-1">
                      {sv.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#0a7a66]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#prices"
                      className={`${focusRing} mt-auto inline-flex w-fit items-center gap-2 rounded pt-6 text-[0.95rem] font-bold text-[#0a7a66] underline decoration-2 underline-offset-[6px] hover:text-[#0b1a28]`}
                    >
                      See {sv.name.toLowerCase()} prices
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
