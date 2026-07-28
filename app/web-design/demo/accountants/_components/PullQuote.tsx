import { Reveal } from "./Reveal";
import { container, display } from "./ui";

export function PullQuote() {
  return (
    <section
      id="testimonial"
      className="scroll-mt-24 border-y border-[#e2ded2] bg-white/70"
    >
      <div className={`${container} py-20 sm:py-28`}>
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <span
              className="mx-auto block h-px w-14 bg-[#b08d57]"
              aria-hidden="true"
            />
            <blockquote
              className={`${display} mt-8 text-[clamp(1.55rem,3.4vw,2.5rem)] font-normal italic leading-[1.32] tracking-tight text-[#15201c]`}
            >
              &ldquo;Meridian found us £40k in R&amp;D relief our old
              accountant never mentioned. They pay for themselves.&rdquo;
            </blockquote>
            <span
              className="mx-auto mt-8 block h-px w-14 bg-[#b08d57]"
              aria-hidden="true"
            />
            <figcaption className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#565f59]">
              Priya Shah · Founder, Brightpath Logistics
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
