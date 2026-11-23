import Image from "next/image";
import { Reveal } from "./Reveal";
import { Check, Circuit, display, h2, mono, wrap } from "./ui";

const plates = [
  { head: "Approved Contractor", name: "NICEIC", ref: "Reg. 000000" },
  { head: "Building Regs", name: "Part P", ref: "Self-certifying" },
  { head: "Govt. endorsed", name: "TrustMark", ref: "Licence 0000000" },
  { head: "EV installs", name: "OZEV", ref: "Approved installer" },
  { head: "Wiring regs", name: "BS 7671", ref: "18th Ed. A2:2022" },
  { head: "Insured", name: "£5m", ref: "Public liability" },
];

const promises = [
  "Every electrician is directly employed. We never subcontract.",
  "All DBS-checked, all carry photo ID, all drive marked vans.",
  "Dust sheets down, shoes off or covers on. We hoover before we go.",
  "If our work fails inside ten years, we come back and fix it free.",
];

export function Credentials() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-20 border-t border-white/10 bg-[#0d1014] py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/web-design/demo/electricians/socket-fit.webp"
                alt="A Voltedge electrician in safety glasses fitting a new socket into a wall back box"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[64%_50%] saturate-[.7] contrast-[1.05]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f]/80 via-transparent to-transparent" />
              <p className={`${mono} absolute bottom-5 left-5 right-5 text-[0.72rem] uppercase leading-relaxed tracking-[0.14em] text-[#f3f5f8]`}>
                Dan Okafor · Approved Electrician
                <br />
                <span className="text-[#9aa4b2]">With Voltedge since 2016</span>
              </p>
            </div>
            <div className="absolute -bottom-6 -right-2 hidden bg-[#ffb020] p-6 text-[#0a0c0f] sm:block lg:-right-8">
              <p className={`${display} text-6xl font-black leading-none`}>14</p>
              <p className={`${mono} mt-1 text-[0.7rem] uppercase tracking-[0.14em]`}>Electricians, all on<br />our payroll</p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <Circuit n="C4">Who turns up</Circuit>
              <h2 id="team-title" className={`${h2} mt-6`}>
                Proper sparks.
                <br />
                <span className="text-[#9aa4b2]">No middlemen.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9aa4b2]">
                Martin Hale started Voltedge from a single van in Stockport in
                2011 after one too many jobs fixing other firms&rsquo; shortcuts.
                Fourteen years on, the rule hasn&rsquo;t changed: the person who
                answers the phone knows how to fix it, and the person who fixes
                it signs the certificate.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-8 grid gap-3">
                {promises.map((p) => (
                  <li key={p} className="flex gap-3 text-[1.02rem] leading-relaxed text-[#f3f5f8]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#ffb020]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20 sm:mt-24">
          <h3 className={`${mono} text-[0.72rem] uppercase tracking-[0.18em] text-[#9aa4b2]`}>
            Registered, accredited and insured
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
            {plates.map((p) => (
              <li key={p.name} className="group relative bg-[#0a0c0f] p-5 transition-colors hover:bg-[#12161b]">
                <p className={`${mono} text-[0.62rem] uppercase tracking-[0.16em] text-[#9aa4b2]`}>{p.head}</p>
                <p className={`${display} mt-3 text-[2.1rem] font-black uppercase leading-none text-[#f3f5f8] transition-colors group-hover:text-[#ffb020]`}>
                  {p.name}
                </p>
                <p className={`${mono} mt-3 border-t border-dashed border-white/15 pt-3 text-[0.68rem] uppercase tracking-[0.1em] text-[#9aa4b2]`}>
                  {p.ref}
                </p>
                <span aria-hidden="true" className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#ffb020]" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
