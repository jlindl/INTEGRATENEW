import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { container, display, quietLink } from "./ui";

type Treatment = { title: string; body: string; from: string; icon: string };

const ICONS: Record<string, string> = {
  check: "M4 12.5l4.5 4.5L20 6",
  sparkle: "M12 3l1.8 4.9L18.7 9l-4.9 1.8L12 15.7l-1.8-4.9L5.3 9l4.9-1.1L12 3Z M18 15l.9 2.4 2.4.9-2.4.9L18 21.6l-.9-2.4-2.4-.9 2.4-.9L18 15Z",
  align: "M5 8h14 M5 12h14 M5 16h14 M8 5v14 M16 5v14",
  implant: "M12 3c-2.4 0-4 1.8-4 4.3 0 2 .8 3.6 1.5 6.4.6 2.4.8 4.3 2.5 4.3s1.9-1.9 2.5-4.3c.7-2.8 1.5-4.4 1.5-6.4C16 4.8 14.4 3 12 3Z M9 8c1-.8 5-.8 6 0",
  emergency:
    "M12 3l9 16H3L12 3Z M12 9v4 M12 16v.5",
  child: "M12 5a2.4 2.4 0 1 0 0-.1Z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M12 11v3",
};

const treatments: Treatment[] = [
  {
    title: "Check-ups & hygiene",
    body: "Thorough exams, hygienist visits and everyday care that keeps small problems small.",
    from: "£39",
    icon: "check",
  },
  {
    title: "Teeth whitening",
    body: "Safe, dentist-supervised whitening that lifts years of staining in a single course.",
    from: "£290",
    icon: "sparkle",
  },
  {
    title: "Invisalign & aligners",
    body: "Clear, removable aligners that straighten teeth without anyone needing to notice.",
    from: "£1,995",
    icon: "align",
  },
  {
    title: "Dental implants",
    body: "Permanent, natural-looking replacements for missing teeth, placed in-house.",
    from: "£2,400",
    icon: "implant",
  },
  {
    title: "Emergency care",
    body: "In pain today? We keep same-day slots open for existing and new patients alike.",
    from: "£65",
    icon: "emergency",
  },
  {
    title: "Children's dentistry",
    body: "Gentle, friendly visits that help children feel at ease with the dentist for life.",
    from: "Free on plan",
    icon: "child",
  },
];

export function Treatments() {
  return (
    <section id="treatments" className="scroll-mt-24">
      <div className={`${container} py-20 sm:py-24 lg:py-28`}>
        <Reveal>
          <SectionHeading
            eyebrow="Treatments"
            title="Everything your smile needs, under one calm roof."
            sub="From a routine check-up to a full smile makeover, with clear prices shown up front on every treatment."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {treatments.map((t, i) => (
            <Reveal key={t.title} className="h-full" delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-[#dceeeb] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_28px_60px_-40px_rgba(19,32,31,0.4)]">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12b3a6]/10"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5.5 w-5.5"
                    fill="none"
                    stroke="#12b3a6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[t.icon].split(" M").map((seg, j) => (
                      <path key={j} d={j === 0 ? seg : `M${seg}`} />
                    ))}
                  </svg>
                </span>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3
                    className={`${display} text-xl font-bold tracking-tight text-[#13201f]`}
                  >
                    {t.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#f4faf9] px-2.5 py-1 text-[0.7rem] font-semibold text-[#0f9c91]">
                    {t.from}
                  </span>
                </div>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-[#4f6360]">
                  {t.body}
                </p>
                <a href="#book" className={`${quietLink} mt-5`}>
                  Book this
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
