import Image from "next/image";
import { Reveal } from "./Reveal";
import { container, display, eyebrow, focusRing, phone } from "./ui";

const photoCards = [
  {
    title: "Check-ups & hygiene",
    body: "Unhurried exams and a proper hygiene clean with warm water and a gentle air polish. The bit that keeps everything else from being needed.",
    price: "Exam from £65",
    img: "/web-design/demo/dental-practices/brushes.webp",
    alt: "Three bamboo toothbrushes laid side by side on a pale surface",
    span: "lg:col-span-7",
    aspect: "aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[34rem]",
    pos: "50% 55%",
  },
  {
    title: "Whitening",
    body: "Custom-fitted home whitening trays, prescribed after a check-up so it suits your teeth. Brighter, natural-looking, never bathroom-tile white.",
    price: "From £295",
    img: "/web-design/demo/dental-practices/couple-laugh.webp",
    alt: "A young couple sitting in long grass, laughing together",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[34rem]",
    pos: "45% 40%",
  },
  {
    title: "Clear aligners",
    body: "Discreet removable aligners to straighten crowding or gaps. Start with a free 3D scan and see your projected result before you decide.",
    price: "From £2,450",
    img: "/web-design/demo/dental-practices/man-coffee.webp",
    alt: "A smiling man holding a cup of coffee by a lakeside",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[30rem]",
    pos: "50% 35%",
  },
  {
    title: "Implants",
    body: "A fixed, natural-feeling replacement for a missing tooth, planned with a 3D scan and placed by our implant dentist. Price includes the crown.",
    price: "From £2,350",
    img: "/web-design/demo/dental-practices/couple-older.webp",
    alt: "An older couple relaxing and laughing together on white bedding",
    span: "lg:col-span-7",
    aspect: "aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[30rem]",
    pos: "50% 45%",
  },
];

export function Treatments() {
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="scroll-mt-20 bg-[#fffcf7]">
      <div className={`${container} py-24 sm:py-28 lg:py-36`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className={eyebrow}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
              Treatments
            </p>
            <h2
              id="treatments-title"
              className={`${display} mt-6 text-[clamp(2.3rem,5vw,4.1rem)] font-light leading-[1.04] tracking-[-0.03em] text-[#1c2a26]`}
            >
              Everyday care, and the{" "}
              <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">bigger things</em>, done gently.
            </h2>
          </Reveal>
          <Reveal delay={80} className="max-w-sm">
            <p className="text-[1rem] leading-[1.7] text-[#55625c]">
              Every price is a real starting price, shown in full below. Your
              plan confirms the exact cost before anything begins.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
          {photoCards.map((c, i) => (
            <li key={c.title} className={c.span}>
              <Reveal delay={(i % 2) * 90} className="h-full">
                <article className={`group relative isolate h-full overflow-hidden rounded-[2rem] ${c.aspect}`}>
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="bw-grade -z-10 object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: c.pos }}
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14231f]/85 via-[#14231f]/25 to-transparent" />
                  <span className="absolute right-5 top-5 rounded-full bg-[#fffcf7]/90 px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#1c2a26] backdrop-blur">
                    {c.price}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className={`${display} text-[1.8rem] leading-tight text-[#fffcf7] sm:text-[2.1rem]`}>{c.title}</h3>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-[1.6] text-[#fffcf7]/85">{c.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}

          <li className="lg:col-span-6">
            <Reveal className="h-full">
              <article className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-[#f2d6c6] p-7 sm:p-9">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#7e3f28]">In pain right now?</p>
                  <h3 className={`${display} mt-3 text-[1.9rem] leading-tight text-[#1c2a26] sm:text-[2.2rem]`}>Emergency appointments</h3>
                  <p className="mt-3 max-w-md text-[0.98rem] leading-[1.65] text-[#1c2a26]/80">
                    We keep slots free every weekday for toothache, swelling and
                    broken teeth, for patients and non-patients alike. Call
                    before 10am and we&rsquo;ll aim to see you that day.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={phone.href}
                    className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1c2a26] px-6 text-[0.95rem] font-semibold text-[#fffcf7] transition-colors hover:bg-[#22433a] ${focusRing}`}
                  >
                    Call {phone.display}
                  </a>
                  <span className="text-[0.9rem] font-semibold text-[#1c2a26]">Assessment £95</span>
                </div>
              </article>
            </Reveal>
          </li>
          <li className="lg:col-span-6">
            <Reveal delay={90} className="h-full">
              <article className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-[#e3ebe4] p-7 sm:p-9">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#2d5547]">For families</p>
                  <h3 className={`${display} mt-3 text-[1.9rem] leading-tight text-[#1c2a26] sm:text-[2.2rem]`}>Children see us on the NHS</h3>
                  <p className="mt-3 max-w-md text-[0.98rem] leading-[1.65] text-[#1c2a26]/80">
                    Under-18s of registered families are seen free on the NHS,
                    with after-school slots and a dentist who explains things
                    with a mirror and a puppet, not a lecture.
                  </p>
                </div>
                <a href="#nhs" className={`inline-flex w-fit items-center gap-2 rounded-sm text-[0.95rem] font-semibold text-[#2d5547] underline decoration-[#2d5547]/30 underline-offset-4 hover:decoration-[#2d5547] ${focusRing}`}>
                  How NHS and private work here
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4" /></svg>
                </a>
              </article>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
