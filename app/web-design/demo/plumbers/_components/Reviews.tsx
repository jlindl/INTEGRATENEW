import { StarIcon } from "./icons";
import { Reveal } from "./Reveal";
import { display, h2, kicker, mono, wrap } from "./theme";

const REVIEWS = [
  {
    q: "Quoted £2,340 for the new combi and charged £2,340. Fitted in a day, moved the flue without any fuss, and showed me how to use the app before he left.",
    who: "Graham T.",
    where: "Horsforth",
    job: "New boiler",
  },
  {
    q: "Eleven days for the bathroom, exactly as promised. We were both at work, so the daily photos meant we never had to chase anyone.",
    who: "Priya and Tom",
    where: "Headingley",
    job: "Bathroom refit",
  },
  {
    q: "I manage six rentals. Gas certificates come back the same day, every time, and the tenants say the engineers are polite. That is all I want.",
    who: "Marcus O.",
    where: "Wakefield",
    job: "Landlord certificates",
  },
];

function Stars({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <span className="flex text-[#e8a317]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={size} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-20 bg-[#f3f6f5] py-20 sm:py-28">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={kicker}>Reviews</p>
            <h2 id="reviews-title" className={`${h2} mt-5 text-[#0b1a28]`}>
              What 412 neighbours said.
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <p className={`${display} text-[4.5rem] font-extrabold leading-none tracking-[-0.05em] text-[#0b1a28]`}>4.9</p>
              <div>
                <Stars size="h-5 w-5" />
                <p className="mt-1.5 text-[0.9rem] text-[#4b5d6b]">
                  Google, 412 reviews
                  <span className="sr-only">, rated 4.9 out of 5</span>
                </p>
              </div>
            </div>
          </div>

          <Reveal className="lg:col-span-8">
            <figure className="relative rounded-[30px] bg-white p-7 ring-1 ring-[#d8e1e3] sm:p-11">
              <span
                aria-hidden="true"
                className={`${display} absolute -top-7 left-7 grid h-14 w-14 place-items-center rounded-full bg-[#1ed3b0] text-[2.4rem] font-extrabold leading-none text-[#0b1a28] sm:left-11`}
              >
                &ldquo;
              </span>
              <blockquote>
                <p className={`${display} text-[clamp(1.15rem,2.3vw,1.9rem)] font-semibold leading-[1.28] tracking-[-0.02em] text-[#0b1a28]`}>
                  Water was coming through the kitchen ceiling at half ten on a Sunday night. Jo answered on the second ring,
                  talked me through finding the stopcock, and Callum was here by quarter past twelve. Fixed price, no drama,
                  and he hoovered up after himself.
                </p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4ebec] pt-6">
                <span>
                  <span className="block font-bold text-[#0b1a28]">Hannah R., Chapel Allerton</span>
                  <span className={`${mono} text-[0.82rem] text-[#4b5d6b]`}>Burst pipe, Sunday 22:31</span>
                </span>
                <Stars />
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={r.who}>
              <Reveal delay={i * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-[26px] bg-white p-7 ring-1 ring-[#d8e1e3]">
                  <Stars />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-[#1f3243]">
                    <p>{r.q}</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-[#e4ebec] pt-4">
                    <span className="block font-bold text-[#0b1a28]">
                      {r.who}, {r.where}
                    </span>
                    <span className={`${mono} text-[0.8rem] text-[#4b5d6b]`}>{r.job}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
