import Image from "next/image";
import { Reveal } from "./Reveal";
import { Arrow, Circuit, PHONE, PhoneIcon, TEL, display, focusRing, h2, lede, mono, wrap } from "./ui";

type Fault = {
  id: string;
  label: string;
  verdict: string;
  urgent: boolean;
  title: string;
  steps: string[];
  fix: string;
};

const faults: Fault[] = [
  {
    id: "dark",
    label: "The whole house is dark",
    verdict: "Check the street first",
    urgent: false,
    title: "Look out of the window before you touch the board.",
    steps: [
      "If the neighbours are dark too, it's a network fault. Ring 105, the free national power cut line. We can't fix the grid.",
      "If it's only you, open the consumer unit. Is the main switch or an RCD pointing down? Push it up once.",
      "If it snaps straight back off, leave it off and call us. Something on that side of the board is faulty.",
    ],
    fix: "Typical fix: traced and restored in 1 to 2 hours",
  },
  {
    id: "trip",
    label: "A breaker keeps tripping",
    verdict: "Often an appliance",
    urgent: false,
    title: "Find out if it's the wiring or something plugged in.",
    steps: [
      "Unplug everything on the circuit that's tripping, including the fridge, kettle and anything outside.",
      "Reset the breaker, then plug things back in one at a time. If it trips on one item, that item is your fault.",
      "If it trips with nothing plugged in at all, the fault is in the fixed wiring. That's a job for us.",
    ],
    fix: "Typical fix: £89 call-out covers the first hour",
  },
  {
    id: "burn",
    label: "Burning smell or scorch marks",
    verdict: "Call now",
    urgent: true,
    title: "Treat it as live. Make it safe, then ring.",
    steps: [
      "If you can reach the consumer unit safely, switch the main switch off.",
      "Don't touch or unplug anything that's hot, discoloured or melted.",
      "Call us on the emergency line. If there's smoke or flame, get everyone out and dial 999 first.",
    ],
    fix: "We prioritise burning smells above every other call",
  },
  {
    id: "circuit",
    label: "One room or circuit is dead",
    verdict: "Usually same day",
    urgent: false,
    title: "Start with the label on the board.",
    steps: [
      "Find the breaker for that room. If it's down, reset it once.",
      "If a single appliance is dead, check its plug fuse and any switched spur nearby.",
      "Breaker won't stay up, or nothing's tripped but it's still dead? Book a same-day visit.",
    ],
    fix: "Typical fix: under an hour on site",
  },
  {
    id: "spark",
    label: "A socket sparked or buzzes",
    verdict: "Stop using it",
    urgent: true,
    title: "Switch that circuit off and leave it alone.",
    steps: [
      "Turn the circuit off at the consumer unit. Don't rely on the socket switch.",
      "Tape a note over it so nobody plugs back in, especially children.",
      "Call us. Loose terminals and failed sockets get worse, never better.",
    ],
    fix: "Typical fix: replaced and tested from £120",
  },
];

export function Triage() {
  return (
    <section id="triage" aria-labelledby="triage-title" className="relative scroll-mt-20 bg-[#0d1014] py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <Circuit n="C1">Power cut triage</Circuit>
            <h2 id="triage-title" className={`${h2} mt-6`}>
              Before you ring
              <br />
              anyone, <span className="text-[#ffb020]">check this.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={lede}>
              Half the panicked calls we get at night are fixed in a minute
              without a visit. Pick what's happening and we'll tell you
              honestly whether you need us.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="ve-triage grid border border-white/10 bg-[#0a0c0f] lg:grid-cols-[minmax(0,420px)_1fr]">
            <fieldset className="border-b border-white/10 lg:border-b-0 lg:border-r">
              <legend className={`${mono} px-5 pt-5 text-[0.7rem] uppercase tracking-[0.18em] text-[#9aa4b2] sm:px-6`}>
                What's happening?
              </legend>
              <div className="mt-3 flex flex-col">
                {faults.map((f, i) => (
                  <label
                    key={f.id}
                    htmlFor={`vf-${f.id}`}
                    className="group relative flex cursor-pointer items-center gap-4 border-t border-white/10 px-5 py-4 transition-colors hover:bg-white/[.03] has-[:checked]:bg-[#ffb020] has-[:checked]:text-[#0a0c0f] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-[#ffb020] sm:px-6"
                  >
                    <input
                      type="radio"
                      name="ve-fault"
                      id={`vf-${f.id}`}
                      defaultChecked={i === 0}
                      className="peer sr-only"
                    />
                    <span className={`${mono} w-6 shrink-0 text-xs text-[#9aa4b2] group-has-[:checked]:text-[#0a0c0f]/70`}>
                      0{i + 1}
                    </span>
                    <span className={`${display} flex-1 text-[1.45rem] font-bold uppercase leading-tight tracking-[0.01em]`}>
                      {f.label}
                    </span>
                    {f.urgent && (
                      <span className={`${mono} shrink-0 border border-current px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-[#ff6b4a] group-has-[:checked]:text-[#0a0c0f]`}>
                        Urgent
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="relative overflow-hidden">
              <Image
                src="/web-design/demo/electricians/breakers.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-[.13] grayscale"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#0a0c0f] via-[#0a0c0f]/85 to-[#0a0c0f]/60" />
              {faults.map((f) => (
                <div
                  key={f.id}
                  data-fault={f.id}
                  aria-live="polite"
                  className="relative content-start gap-7 p-6 sm:p-10 lg:p-12"
                >
                  <p
                    className={`${mono} inline-flex w-fit items-center gap-2 px-2.5 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] ${
                      f.urgent ? "bg-[#ff6b4a] text-[#0a0c0f]" : "border border-[#ffb020]/60 text-[#ffb020]"
                    }`}
                  >
                    {f.verdict}
                  </p>
                  <h3 className={`${display} max-w-xl text-[clamp(2rem,3.6vw,3rem)] font-extrabold uppercase leading-[0.95] text-[#f3f5f8]`}>
                    {f.title}
                  </h3>
                  <ol className="grid max-w-2xl gap-5">
                    {f.steps.map((s, n) => (
                      <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-3">
                        <span className={`${display} text-3xl font-black leading-none text-[#ffb020]`}>{n + 1}</span>
                        <span className="text-[1.05rem] leading-relaxed text-[#c9d0d9]">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className={`${mono} text-[0.75rem] uppercase tracking-[0.12em] text-[#9aa4b2]`}>{f.fix}</p>
                    <a
                      href={f.urgent ? TEL : "#quote"}
                      className={`inline-flex items-center gap-2.5 self-start ${display} text-xl font-extrabold uppercase tracking-[0.04em] ${
                        f.urgent
                          ? "bg-[#ffb020] px-5 py-3 text-[#0a0c0f] hover:bg-[#ffc04a]"
                          : "text-[#ffb020] hover:text-[#ffc04a]"
                      } transition-colors ${focusRing}`}
                    >
                      {f.urgent ? (
                        <>
                          <PhoneIcon className="h-4 w-4" /> Call {PHONE}
                        </>
                      ) : (
                        <>
                          Still stuck? Book a visit <Arrow className="h-4 w-4" />
                        </>
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
