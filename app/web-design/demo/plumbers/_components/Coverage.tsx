import { PinIcon } from "./icons";
import { container, eyebrowLight, h2Light } from "./theme";

const AREAS = ["Leeds", "Harrogate", "York", "Wetherby", "Ilkley", "Wakefield", "Otley", "Shipley"];

export function Coverage() {
  return (
    <section aria-labelledby="coverage-heading" className="bg-[#f6f9fb] py-16 sm:py-20">
      <div className={container}>
        <div className="max-w-2xl">
          <p className={eyebrowLight}>Where we work</p>
          <h2 id="coverage-heading" className={`${h2Light} mt-3`}>
            Leeds and 45 minutes around it.
          </h2>
          <p className="mt-4 leading-relaxed text-[#4e6274]">
            Based in Kirkstall with vans across the ring. If your postcode sits near one of these, we can usually be
            with you the same day.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {AREAS.map((area) => (
            <li
              key={area}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dde8ee] bg-white px-4 py-2 text-sm font-semibold text-[#12212e]"
            >
              <PinIcon className="h-3.5 w-3.5 text-[#0d6e5d]" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
