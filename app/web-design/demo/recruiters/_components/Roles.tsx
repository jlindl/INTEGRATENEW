import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";
import {
  container,
  displayFont,
  focusRing,
  monoKicker,
  monoStack,
  pillGhost,
} from "./tokens";

const ROLES = [
  {
    title: "Head of Platform Engineering",
    company: "Series C fintech",
    location: "Hybrid · London",
    salary: "£115k to £130k",
    tag: "Retained",
  },
  {
    title: "Staff Product Designer",
    company: "B2B SaaS scale-up",
    location: "Remote · UK",
    salary: "£95k to £110k",
    tag: "New this week",
  },
  {
    title: "VP Data & AI",
    company: "PE-backed healthtech",
    location: "Hybrid · Manchester",
    salary: "£140k to £160k",
    tag: "Retained",
  },
  {
    title: "Engineering Manager, Payments",
    company: "Global marketplace",
    location: "Hybrid · London",
    salary: "£105k to £120k",
    tag: "Shortlisting",
  },
];

export function Roles() {
  return (
    <section id="roles" className="scroll-mt-24 py-16 sm:py-24">
      <div className={container}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${monoKicker} text-[#c43a10]`}>Live briefs</p>
              <h2
                className={`${displayFont} mt-4 text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06] tracking-tight text-[#16181d]`}
              >
                A sample of what we are working on now.
              </h2>
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-[#5c5f68]">
              Most of our searches are confidential and never advertised. If
              nothing here fits, register anyway.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="overflow-hidden rounded-2xl border border-[#e7e2d8] bg-white">
            {ROLES.map((role) => (
              <li
                key={role.title}
                className="border-b border-[#e7e2d8] last:border-b-0"
              >
                <a
                  href="#contact"
                  className={`group flex flex-col gap-3 rounded-sm p-6 transition-colors duration-200 hover:bg-[#f7f5f1] sm:grid sm:grid-cols-[1.4fr_1fr_auto] sm:items-center sm:gap-6 sm:px-7 ${focusRing}`}
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`${displayFont} text-lg font-bold tracking-tight text-[#16181d]`}
                      >
                        {role.title}
                      </span>
                      <span
                        className={`${monoStack} rounded-full px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.12em] ${
                          role.tag === "New this week"
                            ? "bg-[#ff5a3c] text-[#16181d]"
                            : "bg-[#16181d]/[0.06] text-[#5c5f68]"
                        }`}
                      >
                        {role.tag}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-[#5c5f68]">
                      {role.company}
                    </span>
                  </span>
                  <span className={`${monoStack} text-[0.72rem] leading-relaxed text-[#5c5f68]`}>
                    {role.location}
                    <span className="block font-medium text-[#16181d]">
                      {role.salary}
                    </span>
                  </span>
                  <span
                    className="hidden h-9 w-9 place-items-center rounded-full border border-[#16181d]/15 text-[#16181d] transition-colors duration-200 group-hover:border-[#ff5a3c] group-hover:bg-[#ff5a3c] sm:grid"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-5">
          <a href="#contact" className={pillGhost}>
            Register for confidential roles
          </a>
          <p className={`${monoStack} text-[0.68rem] uppercase tracking-[0.14em] text-[#5c5f68]`}>
            4 of 23 open briefs shown
          </p>
        </Reveal>
      </div>
    </section>
  );
}
