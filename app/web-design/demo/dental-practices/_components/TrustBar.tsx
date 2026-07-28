import { container } from "./ui";

const items = [
  { k: "Same week", v: "new-patient appointments" },
  { k: "0% finance", v: "on treatment plans" },
  { k: "1,100+", v: "5-star patient reviews" },
  { k: "Nervous?", v: "we're known for gentle care" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Why patients choose Brightwell"
      className="border-y border-[#dceeeb] bg-white"
    >
      <div
        className={`${container} grid grid-cols-2 gap-y-6 py-8 sm:py-10 lg:grid-cols-4`}
      >
        {items.map((item) => (
          <div key={item.k} className="px-4 text-center">
            <p className="text-lg font-bold tracking-tight text-[#0f9c91]">
              {item.k}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#4f6360]">
              {item.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
