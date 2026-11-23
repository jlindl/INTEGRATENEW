import Image from "next/image";
import { Reveal } from "./Reveal";
import { btnLight, container, display, eyebrowLight } from "./ui";

const comforts = [
  {
    title: "A hand up means stop",
    body: "Raise your left hand and everything pauses. Not slows down. Stops. We agree the signal before we start.",
    icon: "M8 13V6.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-1a1.5 1.5 0 0 1 3 0V12m0-5.5a1.5 1.5 0 0 1 3 0V13m0-4a1.5 1.5 0 0 1 3 0v5.5a6.5 6.5 0 0 1-13 0V13a1.5 1.5 0 0 1 3 0",
  },
  {
    title: "Your playlist, our headphones",
    body: "Noise-cancelling headphones in every room. Bring a podcast, an audiobook or nothing at all and just enjoy the quiet.",
    icon: "M4 15v-3a8 8 0 0 1 16 0v3M4 15a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z",
  },
  {
    title: "Tell me everything, or nothing",
    body: "Some people want every step narrated. Others would rather not know. Pick one when you book and we stick to it.",
    icon: "M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8l-4 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  },
  {
    title: "Numbing gel first. Always.",
    body: "Before any injection we numb the gum with a topical gel, then take it slowly. You won’t be rushed into anything.",
    icon: "M12 3c3 4 5.5 6.6 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9.6 9 7 12 3Z",
  },
  {
    title: "A weighted blanket",
    body: "It sounds small. Patients tell us it’s the single thing that helps most. Just ask, it’s folded on every chair.",
    icon: "M4 8.5C7 6.5 9 10.5 12 8.5s5-2 8 0v7c-3-2-5 2-8 0s-5 2-8 0v-7Z",
  },
  {
    title: "A quiet room to talk first",
    body: "Your first conversation happens in a consultation room with sofas, not in the chair. No instruments in sight.",
    icon: "M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M4 18h16",
  },
];

export function Comforts() {
  return (
    <section
      id="nervous"
      aria-labelledby="nervous-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#22433a] text-[#fffcf7]"
    >
      <Image
        src="/web-design/demo/dental-practices/curtain.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.09] mix-blend-luminosity"
      />
      <div aria-hidden="true" className="absolute -right-40 top-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-[#2d5547] blur-3xl" />

      <div className={`${container} py-24 sm:py-28 lg:py-36`}>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className={eyebrowLight}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2d6c6]" aria-hidden="true" />
              For nervous patients
            </p>
            <h2
              id="nervous-title"
              className={`${display} mt-6 text-[clamp(2.4rem,5.6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.03em]`}
            >
              Most of our patients were nervous once.{" "}
              <em className="text-[#f2d6c6] [font-variation-settings:'SOFT'_100,'WONK'_1]">
                Some still are. That&rsquo;s fine.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[1.08rem] leading-[1.7] text-[#d5e0d7]">
              Around a third of the people who join us haven&rsquo;t seen a
              dentist in five years or more. Nobody here will lecture you about
              it. We built the whole practice around making that first step
              feel small, and the second one easier.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* photo pair */}
          <Reveal className="relative self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/web-design/demo/dental-practices/headphones.webp"
                alt="A woman wearing headphones looks out of a tall window, unwinding"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="bw-grade object-cover object-[50%_40%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#22433a]/70 via-transparent to-transparent" />
              <p className={`${display} absolute bottom-6 left-6 right-6 text-[1.35rem] italic leading-snug text-[#fffcf7] sm:text-[1.6rem]`}>
                &ldquo;I listened to half an audiobook and forgot where I was.&rdquo;
                <span className="mt-2 block font-[family-name:var(--font-bw-body)] text-[0.8rem] not-italic tracking-wide text-[#d5e0d7]">
                  Priya, Headingley. First check-up in eight years.
                </span>
              </p>
            </div>
            <div className="absolute -right-3 -top-10 hidden w-[34%] overflow-hidden rounded-[1.5rem] border-[6px] border-[#22433a] sm:block lg:-right-10">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/web-design/demo/dental-practices/tea.webp"
                  alt="Tea being poured into a pale pink glass cup"
                  fill
                  sizes="20vw"
                  className="bw-grade object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* comforts list */}
          <div>
            <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {comforts.map((c, i) => (
                <li key={c.title}>
                  <Reveal delay={(i % 2) * 90}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fffcf7]/8 ring-1 ring-[#fffcf7]/15" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f2d6c6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={c.icon} />
                      </svg>
                    </span>
                    <h3 className={`${display} mt-4 text-[1.3rem] leading-snug`}>{c.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.65] text-[#d5e0d7]">{c.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal className="mt-14 rounded-[1.75rem] bg-[#fffcf7]/[0.07] p-7 ring-1 ring-[#fffcf7]/12 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md">
                  <h3 className={`${display} text-[1.45rem] leading-snug`}>Need more than reassurance?</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.65] text-[#d5e0d7]">
                    Dr Amir Qureshi provides IV sedation for longer or more
                    involved treatment. You stay conscious but deeply relaxed.
                    It starts with a no-obligation assessment, £60.
                  </p>
                </div>
                <a href="#book" className={`${btnLight} shrink-0`}>
                  Talk it through
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
