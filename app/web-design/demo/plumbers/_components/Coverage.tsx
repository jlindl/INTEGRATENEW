import Image from "next/image";
import { Reveal } from "./Reveal";
import { h2, kickerDark, mono, wrap } from "./theme";

type Stop = { name: string; mins: number; x: number; y: number; pos: "up" | "down" | "stack"; base?: boolean };

const STOPS: Stop[] = [
  { name: "Otley", mins: 55, x: 70, y: 100, pos: "up" },
  { name: "Guiseley", mins: 45, x: 205, y: 100, pos: "up" },
  { name: "Horsforth", mins: 30, x: 345, y: 190, pos: "up" },
  { name: "Kirkstall", mins: 20, x: 450, y: 190, pos: "up", base: true },
  { name: "Headingley", mins: 25, x: 560, y: 190, pos: "up" },
  { name: "Leeds", mins: 35, x: 660, y: 190, pos: "stack" },
  { name: "Roundhay", mins: 40, x: 760, y: 190, pos: "up" },
  { name: "Wetherby", mins: 65, x: 935, y: 100, pos: "up" },
  { name: "Pudsey", mins: 35, x: 330, y: 320, pos: "down" },
  { name: "Morley", mins: 45, x: 500, y: 320, pos: "down" },
  { name: "Rothwell", mins: 50, x: 800, y: 320, pos: "down" },
  { name: "Wakefield", mins: 65, x: 935, y: 320, pos: "down" },
];

const LINES = [
  { d: "M70 100 H215 L305 190 H800 L890 100 H935", c: "#1ed3b0" },
  { d: "M660 190 V230 L750 320 H935", c: "#ffffff" },
  { d: "M660 190 V230 L570 320 H330", c: "#7fb3dc" },
];

export function Coverage() {
  return (
    <section id="coverage" aria-labelledby="coverage-title" className="relative scroll-mt-20 overflow-hidden bg-[#0b1a28] text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[520px]">
        <Image
          src="/web-design/demo/plumbers/rooftops.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%] opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a28]/40 via-[#0b1a28]/70 to-[#0b1a28]" />
      </div>

      <div className={`${wrap} relative py-20 sm:py-28`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={kickerDark}>Coverage</p>
            <h2 id="coverage-title" className={`${h2} mt-5 text-white`}>
              Our patch, drawn as a line.
            </h2>
          </div>
          <p className="max-w-md text-[1.08rem] leading-relaxed text-[#c9d6df] lg:col-span-5 lg:justify-self-end">
            Every van starts the day at our Kirkstall depot, then spreads out across Leeds and West Yorkshire. Times below
            are typical emergency arrivals, door to door.
          </p>
        </div>

        <Reveal className="mt-14">
          {/* Desktop: line map */}
          <div className="hidden rounded-[30px] border border-[#1d3850] bg-[#0b1a28]/70 p-8 backdrop-blur-sm lg:block">
            <svg viewBox="0 0 1000 400" className="h-auto w-full" role="img" aria-labelledby="map-title">
              <title id="map-title">
                Line map of the areas Northline covers, with typical emergency arrival times. Listed in full below.
              </title>
              {LINES.map((l) => (
                <path key={l.d} d={l.d} fill="none" stroke={l.c} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              ))}
              {STOPS.map((st) => {
                const labelY = st.pos === "down" ? st.y + 42 : st.pos === "stack" ? st.y - 52 : st.y - 30;
                const etaY = st.pos === "down" ? st.y - 26 : st.pos === "stack" ? st.y - 28 : st.y + 42;
                return (
                  <g key={st.name}>
                    {st.base && <circle cx={st.x} cy={st.y} r="26" fill="#1ed3b0" opacity="0.18" />}
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={st.base ? 15 : 10}
                      fill={st.base ? "#1ed3b0" : "#0b1a28"}
                      stroke={st.base ? "#0b1a28" : "#ffffff"}
                      strokeWidth={st.base ? 5 : 4}
                    />
                    <text
                      x={st.x}
                      y={labelY}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="19"
                      fontWeight="700"
                      style={{ fontFamily: "var(--font-nl-sans)" }}
                    >
                      {st.name}
                    </text>
                    <text
                      x={st.x}
                      y={etaY}
                      textAnchor="middle"
                      fill={st.base ? "#1ed3b0" : "#9fb3c3"}
                      fontSize="15"
                      style={{ fontFamily: "var(--font-nl-mono)" }}
                    >
                      {st.base ? "Depot" : `${st.mins} min`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Reveal>

        {/* Below lg: the same line, run vertically, nearest first. On lg it stays as the accessible text version. */}
        <div className="mt-2 lg:sr-only">
          <p className={`${mono} mb-4 flex justify-between border-b border-[#1d3850] pb-3 text-[0.75rem] uppercase tracking-[0.14em] text-[#7f95a6]`}>
            <span>From the depot</span>
            <span>Typical arrival</span>
          </p>
          <ol className="relative grid gap-0 sm:grid-cols-2 sm:gap-x-10">
            {[...STOPS]
              .sort((a, b) => (a.base ? -1 : b.base ? 1 : a.mins - b.mins))
              .map((st) => (
                <li key={st.name} className="relative flex items-center gap-4 py-2.5">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[9px] top-0 w-1 -translate-x-1/2 bg-[#1ed3b0]/70"
                  />
                  <span
                    aria-hidden="true"
                    className={`relative z-10 h-[18px] w-[18px] shrink-0 rounded-full border-[3px] ${
                      st.base ? "border-[#0b1a28] bg-[#1ed3b0] ring-4 ring-[#1ed3b0]/25" : "border-white bg-[#0b1a28]"
                    }`}
                  />
                  <span className="flex-1 text-[1.05rem] font-bold text-white">{st.name}</span>
                  <span className={`${mono} text-[0.9rem] ${st.base ? "text-[#1ed3b0]" : "text-[#9fb3c3]"}`}>
                    {st.base ? "Depot" : `${st.mins} min`}
                  </span>
                </li>
              ))}
          </ol>
        </div>

        <p className="mt-8 text-[0.95rem] leading-relaxed text-[#9fb3c3]">
          Postcodes: <span className={`${mono} text-white`}>LS1 to LS29, WF1 to WF3, BD10, BD18</span>. Somewhere else
          in West Yorkshire? Ring us anyway.
        </p>
      </div>
    </section>
  );
}
