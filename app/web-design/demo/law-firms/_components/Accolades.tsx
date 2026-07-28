import { container } from "./ui";

const items = [
  { k: "Legal 500", v: "Leading Firm" },
  { k: "Chambers", v: "Band 1 · Private Client" },
  { k: "Lexcel", v: "Law Society accredited" },
  { k: "40 years", v: "of continuous practice" },
];

export function Accolades() {
  return (
    <section
      aria-label="Accreditations"
      className="border-y border-[#e4ddd0] bg-white"
    >
      <div
        className={`${container} grid grid-cols-2 divide-x divide-[#e4ddd0] py-8 sm:py-10 lg:grid-cols-4`}
      >
        {items.map((item, i) => (
          <div
            key={item.k}
            className={`px-4 text-center ${i >= 2 ? "max-lg:mt-6 max-lg:border-t max-lg:border-[#e4ddd0] max-lg:pt-6" : ""}`}
          >
            <p className="text-base font-semibold tracking-tight text-[#1a1712]">
              {item.k}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5a544a]">
              {item.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
