import Image from "next/image";
import { Reveal } from "./Reveal";
import { container, display, eyebrow } from "./ui";

const team = [
  { initials: "AQ", name: "Dr Amir Qureshi", role: "Implants and IV sedation" },
  { initials: "JP", name: "Jo Pickering", role: "Hygienist, 14 years. Famously gentle" },
  { initials: "MT", name: "Mia Thornton", role: "Reception. The one who texts you" },
];

export function Team() {
  return (
    <section aria-labelledby="team-title" className="bg-[#fffcf7]">
      <div className={`${container} grid gap-12 pb-24 pt-4 sm:pb-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:pb-36 lg:pt-8`}>
        <Reveal className="relative">
          <div className="relative mx-auto aspect-[4/5] max-w-[30rem] overflow-hidden rounded-[2rem] rounded-tl-[10rem]">
            <Image
              src="/web-design/demo/dental-practices/dr-hannah.webp"
              alt="Dr Hannah Ellery, principal dentist, sitting relaxed in a black tunic and smiling"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="bw-grade object-cover object-[50%_22%]"
            />
          </div>
          <div className="absolute -bottom-5 right-2 rounded-2xl bg-[#2d5547] px-5 py-4 text-[#fffcf7] shadow-[0_24px_50px_-28px_rgba(28,42,38,0.7)] sm:right-8 lg:-right-4">
            <p className={`${display} text-[1.15rem] leading-tight`}>Dr Hannah Ellery</p>
            <p className="mt-0.5 text-[0.78rem] text-[#d5e0d7]">Principal dentist. GDC no. 000000</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className={eyebrow}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#a4553a]" aria-hidden="true" />
              Who you&rsquo;ll meet
            </p>
            <blockquote className="mt-6">
              <p className={`${display} text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.18] tracking-[-0.02em] text-[#1c2a26]`}>
                &ldquo;I trained in a busy practice where everyone was ten
                minutes behind. I opened Brightwell so I&rsquo;d never have to
                rush{" "}
                <em className="text-[#2d5547] [font-variation-settings:'SOFT'_100,'WONK'_1]">anyone</em> out of
                the chair again.&rdquo;
              </p>
              <footer className="mt-6 text-[0.95rem] text-[#55625c]">
                Dr Hannah Ellery, BDS (Leeds). Founded Brightwell in 2016.
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-12 divide-y divide-[#1c2a26]/10 border-y border-[#1c2a26]/10">
              {team.map((t) => (
                <li key={t.name} className="flex items-center gap-4 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ece3d6] text-[0.8rem] font-semibold text-[#2d5547]" aria-hidden="true">
                    {t.initials}
                  </span>
                  <span>
                    <span className={`${display} block text-[1.15rem] text-[#1c2a26]`}>{t.name}</span>
                    <span className="block text-[0.88rem] text-[#55625c]">{t.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
