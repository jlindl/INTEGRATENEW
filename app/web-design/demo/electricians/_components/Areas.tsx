import Image from "next/image";
import { Reveal } from "./Reveal";
import { Circuit, display, mono, wrap } from "./ui";

const areas = [
  { name: "Manchester city centre", pc: "M1 to M4, M15", mins: 16 },
  { name: "South Manchester", pc: "M14, M19, M20, M21", mins: 17 },
  { name: "Stockport", pc: "SK1 to SK8", mins: 14 },
  { name: "Salford and Eccles", pc: "M5 to M7, M30, M50", mins: 21 },
  { name: "Trafford and Sale", pc: "M16, M32, M33, WA14", mins: 19 },
  { name: "Tameside", pc: "OL6, OL7, SK14 to SK16", mins: 26 },
  { name: "Bury and Prestwich", pc: "BL9, M25, M45", mins: 28 },
  { name: "Bolton", pc: "BL1 to BL5", mins: 33 },
  { name: "Oldham and Rochdale", pc: "OL1 to OL4, OL11", mins: 34 },
  { name: "Wigan and Leigh", pc: "WN1 to WN7", mins: 41 },
];

const max = 45;

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative isolate scroll-mt-20 overflow-hidden border-t border-white/10">
      <Image
        src="/web-design/demo/electricians/hulme-arch.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[30%_60%] brightness-[.6] saturate-[.75]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0a0c0f_0%,rgba(10,12,15,.55)_30%,rgba(10,12,15,.8)_75%,#0a0c0f_100%)]" />

      <div className={`${wrap} py-20 sm:py-28`}>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <Circuit n="C6">Coverage</Circuit>
            <h2
              id="areas-title"
              className={`${display} mt-6 text-[clamp(2.6rem,6.2vw,5.4rem)] font-black uppercase leading-[0.9] text-[#f3f5f8]`}
            >
              Ten boroughs.
              <br />
              <span className="text-[#ffb020]">Vans parked</span>
              <br />
              in all of them.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#c9d0d9]">
              Our engineers take their vans home, so at any hour someone is
              already close to you. These are our real average arrival times
              for emergency calls over the last twelve months.
            </p>
            <p className={`${mono} mt-8 max-w-md border-l-2 border-[#ffb020] pl-4 text-[0.75rem] uppercase leading-relaxed tracking-[0.12em] text-[#9aa4b2]`}>
              Outside these postcodes? We cover up to 20 miles from our
              Stockport depot for planned work. Ring and ask.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Average emergency arrival time by area</caption>
              <thead>
                <tr className={`${mono} border-b border-white/20 text-[0.66rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>
                  <th scope="col" className="pb-3 font-normal">Area</th>
                  <th scope="col" className="hidden pb-3 font-normal sm:table-cell">Postcodes</th>
                  <th scope="col" className="pb-3 text-right font-normal">Avg. arrival</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((a) => (
                  <tr key={a.name} className="group border-b border-white/10 transition-colors hover:bg-white/[.03]">
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <span className={`${display} block text-[1.5rem] font-bold uppercase leading-tight text-[#f3f5f8] sm:text-[1.65rem]`}>
                        {a.name}
                      </span>
                      <span className={`${mono} mt-1 block text-[0.68rem] uppercase tracking-[0.1em] text-[#9aa4b2] sm:hidden`}>{a.pc}</span>
                    </th>
                    <td className={`${mono} hidden py-4 pr-4 text-[0.75rem] uppercase tracking-[0.08em] text-[#9aa4b2] sm:table-cell`}>{a.pc}</td>
                    <td className="py-4 text-right">
                      <span className={`${display} text-[1.8rem] font-black leading-none ${a.mins <= 20 ? "text-[#ffb020]" : "text-[#f3f5f8]"}`}>
                        {a.mins}
                      </span>
                      <span className={`${mono} ml-1 text-[0.68rem] uppercase text-[#9aa4b2]`}>min</span>
                      <span aria-hidden="true" className="mt-2 ml-auto block h-[3px] w-20 bg-white/10 sm:w-28">
                        <span
                          className={`block h-full ${a.mins <= 20 ? "bg-[#ffb020]" : "bg-[#f3f5f8]/60"}`}
                          style={{ width: `${(a.mins / max) * 100}%` }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
