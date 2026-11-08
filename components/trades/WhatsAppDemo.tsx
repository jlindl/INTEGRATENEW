/**
 * WhatsAppDemo — an example of the AI agent qualifying an enquiry at 2am, for
 * the /trades page. It mirrors the "Qualified while you sleep" scene in the
 * VSL. It is labelled as an example on the page; nothing here is a real
 * customer.
 */
import { Reveal } from "@/components/ui/Reveal";

const CHAT: { from: "lead" | "agent"; text: string; meta?: string }[] = [
  { from: "lead", text: "Hi, can I get a quote for a rear extension?" },
  { from: "agent", text: "Of course! Roughly what budget are you working to, and what's your postcode?", meta: "Replied in 3s" },
  { from: "lead", text: "£40–50k, PR7" },
  { from: "agent", text: "Perfect, we cover PR7. When are you hoping to start?", meta: "Replied in 3s" },
  { from: "lead", text: "Ideally next spring" },
  { from: "agent", text: "Great. I can book a free site visit for Saturday at 10am or Tuesday at 4pm. Which suits you?" },
  { from: "lead", text: "Saturday 10am please" },
];

const CHECKS = [
  { k: "Job type", v: "Rear extension" },
  { k: "Budget", v: "£40–50k" },
  { k: "Location", v: "PR7, in your area" },
  { k: "Timing", v: "Next spring" },
];

const Tick = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f9e6b] text-white" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  </span>
);

export function WhatsAppDemo() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,25rem)] lg:gap-16">
      {/* What the agent pulled out of the chat */}
      <div>
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist-2">While you sleep</p>
          <h2 id="sleep" className="font-display-tuned mt-3 text-[clamp(1.9rem,5.5vw,3rem)] font-medium leading-[1.05] text-ivory">
            Qualified at 2am, <span className="whitespace-nowrap italic text-[#a5a8f6]">booked by 2:03.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] leading-relaxed text-mist">
            Most enquiries go to whoever replies first. The AI agent messages every new lead on
            WhatsApp within seconds, day or night, asks the questions you&apos;d ask, and only books
            the jobs that fit.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-8 divide-y divide-graphite border-y border-graphite">
            {CHECKS.map((c) => (
              <li key={c.k} className="flex items-center gap-4 py-3.5">
                <Tick />
                <span className="w-24 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist-2">{c.k}</span>
                <span className="text-[1rem] text-ivory">{c.v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#2f9e6b]/40 bg-[#2f9e6b]/10 px-4 py-2 text-[0.9rem] text-[#7fd3ab]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4cc38a]" aria-hidden="true" />
            Site visit booked: Saturday, 10am
          </p>
        </Reveal>
      </div>

      {/* The conversation */}
      <Reveal delay={0.15} className="mx-auto w-full max-w-[25rem]">
        <figure aria-label="Example WhatsApp conversation between a homeowner and the AI agent">
          <div className="rounded-[2rem] border border-graphite-2 bg-carbon-2 p-2.5 shadow-[0_50px_100px_-40px_rgba(99,102,241,0.35)]">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#0d0d12]">
              <div className="flex items-center gap-3 border-b border-graphite px-4 py-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5b5ff0] font-display-tuned text-[0.95rem] text-white" aria-hidden="true">
                  Y
                </span>
                <div className="min-w-0">
                  <p className="text-[0.92rem] font-medium text-ivory">Your business</p>
                  <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#4cc38a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4cc38a]" aria-hidden="true" />
                    Replies instantly
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.7rem] text-mist-2">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                  </svg>
                  02:00
                </span>
              </div>

              <ol className="space-y-2.5 px-3.5 py-5">
                {CHAT.map((m, i) => (
                  <Reveal as="li" key={i} delay={0.25 + i * 0.12} y={10} className={`flex flex-col ${m.from === "agent" ? "items-end" : "items-start"}`}>
                    <span className="sr-only">{m.from === "agent" ? "AI agent: " : "Homeowner: "}</span>
                    <p
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.88rem] leading-snug ${
                        m.from === "agent" ? "rounded-br-md bg-[#5b5ff0] text-white" : "rounded-bl-md bg-[#1f1f27] text-ivory"
                      }`}
                    >
                      {m.text}
                    </p>
                    {m.meta && <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-mist-2">{m.meta}</span>}
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
          <figcaption className="mt-3 text-center font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist-2">
            Example conversation
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
