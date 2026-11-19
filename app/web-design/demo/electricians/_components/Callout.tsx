import Image from "next/image";
import { Reveal } from "./Reveal";
import { TimelineCurrent } from "./TimelineCurrent";
import { Circuit, PHONE, PhoneIcon, TEL, display, focusRing, mono, wrap } from "./ui";

const steps = [
  {
    t: "23:04",
    title: "You ring. An electrician answers.",
    body: "Not a call handler with a script. Whoever is on shift picks up, asks the right three questions, and often talks you through making it safe before they've left the house.",
  },
  {
    t: "23:06",
    title: "You hear the price before anyone sets off.",
    body: "£89 call-out with the first hour included, £129 after 10pm. You'll hear the number on the phone, not discover it on the invoice.",
  },
  {
    t: "23:31",
    title: "A named engineer, a marked van.",
    body: "You get a text with their name, photo and a live arrival time. They'll show their NICEIC card at the door without being asked.",
  },
  {
    t: "23:40",
    title: "Made safe first. Then fixed.",
    body: "We isolate, test and trace the fault. Nine call-outs in ten are fixed on that visit. If a part is needed, we leave you safe and with as much power back as we can.",
  },
  {
    t: "00:52",
    title: "Certificate in your inbox.",
    body: "Test results and before and after photos are emailed before the van has left your street. Useful for landlords, insurers and peace of mind.",
  },
];

export function Callout() {
  return (
    <section id="callout" aria-labelledby="callout-title" className="relative scroll-mt-20 bg-[#0a0c0f]">
      {/* Full-bleed copper statement band */}
      <div className="relative isolate overflow-hidden border-y border-white/10">
        <Image
          src="/web-design/demo/electricians/copper.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover brightness-[.55] saturate-[1.1]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,12,15,.92),rgba(10,12,15,.55)_60%,rgba(10,12,15,.3))]" />
        <div className={`${wrap} py-24 sm:py-36`}>
          <Reveal>
            <Circuit n="C3">The call-out</Circuit>
            <h2
              id="callout-title"
              className={`${display} mt-6 max-w-5xl text-[clamp(2.7rem,7.4vw,6.6rem)] font-black uppercase leading-[0.88] text-[#f3f5f8]`}
            >
              11pm. Kids asleep.
              <br />
              Board's tripped and
              <br />
              <span className="text-[#ffb020]">won't reset.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c9d0d9]">
              This is the call we built the business around. Here's exactly
              what happens after you dial, using a real night from last
              February in Sale.
            </p>
          </Reveal>
        </div>
      </div>

      <div className={`${wrap} py-20 sm:py-28`}>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className={`${mono} text-[0.72rem] uppercase tracking-[0.18em] text-[#9aa4b2]`}>Call log · Sale M33</p>
            <p className={`${display} mt-3 text-[clamp(5rem,12vw,9rem)] font-black leading-[0.8] text-[#f3f5f8]`}>
              1<span className="text-[#ffb020]">h</span>48
            </p>
            <p className="mt-4 max-w-sm text-[#9aa4b2]">
              From the phone ringing to a certified repair and lights back on.
              The fault: a nail through a cable behind a newly hung TV.
            </p>
            <a
              href={TEL}
              className={`mt-8 inline-flex items-center gap-3 border border-[#ffb020] px-5 py-3.5 ${display} text-xl font-extrabold uppercase tracking-[0.04em] text-[#ffb020] transition-colors hover:bg-[#ffb020] hover:text-[#0a0c0f] ${focusRing}`}
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE}
            </a>
          </Reveal>

          <div className="relative">
            <TimelineCurrent />
            <ol className="relative">
              {steps.map((s, i) => (
                <li key={s.t} className="relative grid grid-cols-[2.25rem_1fr] gap-5 pb-12 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-8">
                  <span aria-hidden="true" className="relative z-10 mt-1 grid h-9 w-9 place-items-center border border-white/20 bg-[#0a0c0f] sm:h-12 sm:w-12">
                    <span className={`${mono} text-[0.7rem] text-[#ffb020]`}>0{i + 1}</span>
                  </span>
                  <Reveal delay={60}>
                    <p className={`${mono} text-[0.78rem] uppercase tracking-[0.16em] text-[#ffb020]`}>{s.t}</p>
                    <h3 className={`${display} mt-2 text-[clamp(1.7rem,2.8vw,2.4rem)] font-extrabold uppercase leading-[0.98] text-[#f3f5f8]`}>
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-[#9aa4b2]">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
