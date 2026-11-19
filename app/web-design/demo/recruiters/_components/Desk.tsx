import Image from "next/image";
import { Reveal } from "./Reveal";
import { display, focusRing, grade, kicker, mono, serif, wrap } from "./tokens";

const PEOPLE = [
  {
    name: "Priya Sharma",
    role: "Founder, Executive & Board",
    bio: "Ran engineering hiring at a payments scale up before starting Ascend in 2014. Leads every retained C-suite search herself.",
    last: "CPO, Meridian Labs",
    tel: "020 7946 0321",
    img: "/web-design/demo/recruiters/team-priya.webp",
    pos: "object-[50%_18%]",
  },
  {
    name: "Tom Hartley",
    role: "Engineering & Platform",
    bio: "Eleven years as a backend engineer first. Still reads the take home tests, and will tell you if yours is too long.",
    last: "Staff Engineer, Quillpay",
    tel: "020 7946 0324",
    img: "/web-design/demo/recruiters/team-tom.webp",
    pos: "object-[42%_30%]",
  },
  {
    name: "Kwame Mensah",
    role: "Data & AI",
    bio: "Former head of analytics. Can tell a data scientist from a dashboard builder in one question, and won't waste yours.",
    last: "Head of Data, Northlane Health",
    tel: "020 7946 0327",
    img: "/web-design/demo/recruiters/team-kwame.webp",
    pos: "object-[48%_35%]",
  },
];

export function Desk() {
  return (
    <section id="desk" aria-labelledby="desk-title" className="scroll-mt-16 py-20 sm:py-28 lg:py-32">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className={`${kicker} text-[#b8360d]`}>The desk</p>
            <h2
              id="desk-title"
              className={`${display} mt-5 text-[clamp(2.3rem,4.6vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#121317]`}
            >
              Eight people. <span className={`${serif} italic tracking-[-0.02em]`}>No handovers.</span>
            </h2>
            <p className="mt-6 max-w-[26rem] text-[1.02rem] leading-relaxed text-[#575a62]">
              The consultant who takes your brief is the one who calls the
              candidates, sits in on the debrief and rings you on their first
              day. You will have their mobile, not a ticket number.
            </p>
            <dl className={`${mono} mt-10 grid grid-cols-2 gap-6 border-t border-[#ddd6c8] pt-6 text-[0.72rem] uppercase tracking-[0.12em] text-[#575a62]`}>
              <div>
                <dt>Average tenure</dt>
                <dd className={`${display} mt-1 text-[2rem] font-extrabold normal-case tracking-[-0.04em] text-[#121317]`}>7.4 yrs</dd>
              </div>
              <div>
                <dt>Searches each</dt>
                <dd className={`${display} mt-1 text-[2rem] font-extrabold normal-case tracking-[-0.04em] text-[#121317]`}>Max 6</dd>
              </div>
            </dl>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 lg:col-span-8">
            {PEOPLE.map((p, i) => (
              <Reveal key={p.name} delay={i * 110} className={i === 1 ? "sm:mt-16" : i === 2 ? "sm:mt-8" : ""}>
                <article className="group">
                  <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/5] rounded-[2px] bg-[#ddd6c8]">
                    <Image
                      src={p.img}
                      alt={`Portrait of ${p.name}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw"
                      className={`object-cover ${p.pos} ${grade} grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none`}
                    />
                    <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-[#121317]/88 p-4 text-white backdrop-blur-sm transition-transform duration-500 ease-out sm:translate-y-full sm:group-focus-within:translate-y-0 sm:group-hover:translate-y-0 motion-reduce:transition-none">
                      <p className={`${mono} text-[0.62rem] uppercase tracking-[0.14em] text-[#ff8a70]`}>Last placed</p>
                      <p className="mt-1 text-[0.9rem] font-semibold">{p.last}</p>
                    </div>
                  </div>
                  <h3 className={`${display} mt-5 text-[1.35rem] font-bold tracking-[-0.03em] text-[#121317]`}>{p.name}</h3>
                  <p className={`${mono} mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-[#b8360d]`}>{p.role}</p>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-[#575a62]">{p.bio}</p>
                  <a
                    href={`tel:${p.tel.replace(/\s/g, "")}`}
                    className={`${mono} mt-4 inline-block rounded-sm border-b border-[#121317]/25 pb-0.5 text-[0.78rem] text-[#121317] hover:border-[#ff5a3c] ${focusRing}`}
                  >
                    {p.tel}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
