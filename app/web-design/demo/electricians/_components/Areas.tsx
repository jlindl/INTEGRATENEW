import { Reveal } from "./Reveal";
import {
  Bolt,
  CheckIcon,
  Eyebrow,
  container,
  h2Heading,
  sectionSub,
} from "./ui";

const towns = [
  "Manchester",
  "Salford",
  "Stockport",
  "Bolton",
  "Bury",
  "Oldham",
  "Rochdale",
  "Wigan",
  "Trafford",
  "Tameside",
];

export function Areas() {
  return (
    <section id="areas" className="scroll-mt-24">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <Reveal>
          <Eyebrow>Coverage</Eyebrow>
          <h2 className={h2Heading}>Covering Greater Manchester</h2>
          <p className={sectionSub}>
            Engineers based across the city region, so someone is always close
            when you call.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {towns.map((town) => (
              <li
                key={town}
                className="flex items-center gap-2.5 rounded-md border border-[#232a35] bg-[#161b23] px-4 py-3.5 text-sm font-medium text-[#f4f7fb]"
              >
                <Bolt className="h-3.5 w-3.5 shrink-0 text-[#ffb020]" />
                {town}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-center gap-2.5 text-base font-medium text-[#f4f7fb]">
            <CheckIcon className="h-4 w-4 shrink-0 text-[#ffb020]" />
            Within 20 miles? We cover you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
