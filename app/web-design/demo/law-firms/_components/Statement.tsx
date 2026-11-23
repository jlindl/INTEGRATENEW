import Image from "next/image";
import { Reveal } from "./Reveal";
import { IMG, label, mono, serif, wrap } from "./tokens";

const figures = [
  { v: "1984", k: "Founded in Guildford by Margaret Halstead" },
  { v: "31", k: "Lawyers across two offices, nine of them partners" },
  { v: "1:1", k: "A named partner leads every single matter" },
  { v: "0", k: "Invoices that differ from the fee we agreed" },
];

export function Statement() {
  return (
    <section aria-labelledby="firm-title" className="bg-[#f3efe7] text-[#17130f]">
      <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className={`${label} text-[#74272a]`}>§ 01 · The firm</p>
            <h2 id="firm-title" className="sr-only">
              About Halstead Law
            </h2>
            <p className={`${serif} mt-8 text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.14] tracking-[-0.01em]`}>
              In 1984 Margaret Halstead opened an office above a
              bookshop on Quarry Street with one rule:{" "}
              <em className="italic text-[#74272a]">the person you meet is the person who does the work.</em>{" "}
              We have grown into the City since. The rule has not moved.
            </p>
            <div className="mt-10 grid max-w-2xl gap-6 text-[1rem] leading-[1.75] text-[#5b5348] sm:grid-cols-2">
              <p>
                We act for owner-managed businesses, their founders and the
                families behind them. Often the same people, at different
                moments: the sale of a company one year, the trust that
                protects the proceeds the next.
              </p>
              <p>
                That continuity is the point. You will not be handed to a
                rotating junior, re-explain your affairs every quarter, or
                discover the cost of a phone call on your invoice.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e0d3]">
                <Image
                  src={`${IMG}/leadenhall.webp`}
                  alt="The glass roof and ironwork arcade of Leadenhall Market in the City of London, in black and white"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="hl-grade object-cover object-[60%_50%]"
                />
              </div>
              <figcaption className={`${mono} mt-4 flex justify-between gap-4 text-[0.66rem] uppercase tracking-[0.16em] text-[#5b5348]`}>
                <span>Leadenhall, EC3</span>
                <span>Two minutes from our London office</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[#17130f]/15 pt-10 lg:mt-32 lg:grid-cols-4">
          {figures.map((f, i) => (
            <Reveal key={f.v} delay={i * 90}>
              <div className="flex flex-col-reverse gap-3">
                <dt className="max-w-[16rem] text-[0.88rem] leading-snug text-[#5b5348]">{f.k}</dt>
                <dd className={`${serif} text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.02em]`}>{f.v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
