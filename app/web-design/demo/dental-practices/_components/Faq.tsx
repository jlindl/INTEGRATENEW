import { Reveal } from "./Reveal";
import { container, display, eyebrow, focusRing } from "./ui";

const faqs = [
  {
    q: "I haven’t been to a dentist in years. Will I be told off?",
    a: "No. Around a third of our new patients haven’t been in five years or more. We’re interested in where you go from here, not how long it’s been.",
  },
  {
    q: "Can I just come in for a chat first?",
    a: "Yes. Book a new patient visit and tell us you’d like to talk only. We’ll sit in the consultation room, show you around, and nothing happens in the chair unless you decide it should.",
  },
  {
    q: "Do you offer sedation?",
    a: "Dr Amir Qureshi provides IV sedation for longer or more involved treatment, after a £60 assessment to check it’s right for you. You’ll need someone to take you home afterwards.",
  },
  {
    q: "Are you taking new NHS patients?",
    a: "We see children of registered families on the NHS. Adult NHS places are currently full, but you can join our waiting list and we’ll text you when one opens.",
  },
  {
    q: "What if I need to cancel?",
    a: "Reply to any of our texts. There’s no charge with 24 hours’ notice, and we understand that sometimes nerves win on the day. Just let us know and we’ll rebook.",
  },
  {
    q: "Is there parking and step-free access?",
    a: "Two free bays behind the practice, plus Woodhouse Lane car park a four-minute walk away. All treatment rooms are on the ground floor with step-free access.",
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-[#f6f1ea]">
      <div className={`${container} grid gap-12 py-24 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-32`}>
        <Reveal>
          <p className={eyebrow}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
            Questions people ask
          </p>
          <h2 id="faq-title" className={`${display} mt-6 text-[clamp(2.2rem,4.4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-[#1c2a26]`}>
            The things you might be <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">too polite</em> to ask.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="divide-y divide-[#1c2a26]/12 border-y border-[#1c2a26]/12">
            {faqs.map((f) => (
              <details key={f.q} className="bw-faq group">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-6 text-left ${focusRing}`}>
                  <span className={`${display} text-[1.2rem] leading-snug text-[#1c2a26] sm:text-[1.35rem]`}>{f.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c2a26]/15 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="#1c2a26" strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-12 text-[1rem] leading-[1.7] text-[#55625c]">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
