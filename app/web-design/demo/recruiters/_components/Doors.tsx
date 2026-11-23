import Image from "next/image";
import { ArrowRight, CheckMark } from "./icons";
import { Reveal } from "./Reveal";
import {
  btnLine,
  btnPrimaryOnInk,
  display,
  grade,
  kicker,
  mono,
  serif,
  wrap,
} from "./tokens";

const DOORS = [
  {
    id: "hiring",
    dark: true,
    n: "01",
    label: "For hiring managers",
    title: (
      <>
        You&rsquo;re hiring someone you{" "}
        <span className={`${serif} italic text-[#ff8a70]`}>can&rsquo;t</span> get wrong.
      </>
    ),
    body: "Most of our clients have already tried an agency. They came to us after the fortieth CV. We work fewer searches, deeper, and we tell you early if the brief or the salary is going to struggle.",
    points: [
      "A shortlist date agreed in writing before we start",
      "Three to five people, each with a frank case for and against",
      "Fee on start only, with a six month replacement guarantee",
    ],
    cta: "Brief us on a role",
    img: "/web-design/demo/recruiters/door-employers.webp",
    alt: "A hiring manager and an Ascend consultant talking through a brief beside a window overlooking the City",
    pos: "object-[50%_40%]",
  },
  {
    id: "looking",
    dark: false,
    n: "02",
    label: "For candidates",
    title: (
      <>
        Not looking? That&rsquo;s{" "}
        <span className={`${serif} italic text-[#b8360d]`}>usually</span> when we call.
      </>
    ),
    body: "Nine in ten of the people we place weren't applying for anything. We'll name the company on the first call, share the salary range up front, and leave you alone if the answer is no.",
    points: [
      "Your CV goes nowhere without your yes, in writing",
      "Interview feedback within 48 hours, even when it's a no",
      "A consultant who has sat in your seat, not a call centre",
    ],
    cta: "Register confidentially",
    img: "/web-design/demo/recruiters/door-candidates.webp",
    alt: "A senior engineer considering a role at her laptop by a bright window",
    pos: "object-[50%_25%]",
  },
] as const;

export function Doors() {
  return (
    <section aria-labelledby="doors-title" className="py-20 sm:py-28 lg:py-32">
      <div className={wrap}>
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <p className={`${kicker} text-[#b8360d] lg:col-span-3`}>Two sides, one desk</p>
          <h2
            id="doors-title"
            className={`${display} text-[clamp(2.3rem,5.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#121317] lg:col-span-9`}
          >
            We act for the company. We answer to{" "}
            <span className={`${serif} italic tracking-[-0.02em]`}>both of you.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-20 lg:grid-cols-2">
          {DOORS.map((d, i) => (
            <Reveal key={d.id} delay={i * 120}>
              <article
                id={d.id}
                aria-labelledby={`${d.id}-title`}
                className={`group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[4px] ${
                  d.dark ? "bg-[#121317] text-white" : "border border-[#ddd6c8] bg-[#fbf9f4] text-[#121317]"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`object-cover ${d.pos} ${grade} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none`}
                  />
                  <span
                    className={`${mono} absolute left-4 top-4 rounded-full bg-[#121317]/80 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm`}
                    aria-hidden="true"
                  >
                    Door {d.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-10">
                  <p className={`${kicker} ${d.dark ? "text-[#ff8a70]" : "text-[#b8360d]"}`}>{d.label}</p>
                  <h3
                    id={`${d.id}-title`}
                    className={`${display} mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1] tracking-[-0.04em]`}
                  >
                    {d.title}
                  </h3>
                  <p className={`mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed ${d.dark ? "text-white/70" : "text-[#575a62]"}`}>
                    {d.body}
                  </p>
                  <ul className={`mt-7 divide-y ${d.dark ? "divide-white/12 border-y border-white/12" : "divide-[#ddd6c8] border-y border-[#ddd6c8]"}`}>
                    {d.points.map((p) => (
                      <li key={p} className="flex gap-3 py-3.5 text-[0.96rem]">
                        <CheckMark className={`mt-1 h-4 w-4 shrink-0 ${d.dark ? "text-[#ff5a3c]" : "text-[#b8360d]"}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <a href="#contact" className={d.dark ? btnPrimaryOnInk : btnLine}>
                      {d.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                    <span className={`${mono} text-[0.7rem] ${d.dark ? "text-white/55" : "text-[#575a62]"}`}>
                      {d.dark ? "Reply within the working day" : "Fully confidential"}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
