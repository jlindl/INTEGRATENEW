import { Reveal } from "./Reveal";
import { display, mono, wrap } from "./ui";

const stats = [
  { v: "18", u: "min", k: "Average arrival", note: "Emergency call-outs inside the M60, last 12 months" },
  { v: "4.9", u: "/5", k: "320 Google reviews", note: "Every review answered by the person who did the job" },
  { v: "10", u: "yr", k: "Workmanship warranty", note: "In writing, on every installation we certify" },
  { v: "3", u: "rings", k: "To a human", note: "Our line is answered by electricians, never a call centre" },
];

export function ProofBar() {
  return (
    <section aria-label="Voltedge in numbers" className="border-b border-white/10 bg-[#0a0c0f]">
      <div className={wrap}>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.k}
              delay={i * 80}
              className={`border-white/10 py-8 sm:py-12 ${i % 2 === 0 ? "border-r pr-4 sm:pr-8" : "pl-4 sm:pl-8"} ${
                i < 2 ? "border-b lg:border-b-0" : ""
              } lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0`}
            >
              <dt className="sr-only">{s.k}</dt>
              <dd>
                <p className={`${display} flex items-baseline gap-1 text-[clamp(3.4rem,7vw,5.8rem)] font-black leading-[0.85] text-[#f3f5f8]`}>
                  {s.v}
                  <span className="text-[0.38em] font-bold text-[#ffb020]">{s.u}</span>
                </p>
                <p className={`${mono} mt-3 text-[0.72rem] uppercase tracking-[0.16em] text-[#f3f5f8]`} aria-hidden="true">
                  {s.k}
                </p>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-[#9aa4b2]">{s.note}</p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
