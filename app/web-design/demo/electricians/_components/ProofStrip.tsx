import { container, display } from "./ui";

const stats = [
  { value: "18", unit: " min", label: "Avg. callout" },
  { value: "4.9", unit: "", label: "From 320 reviews" },
  { value: "10", unit: "yr", label: "Workmanship warranty" },
];

export function ProofStrip() {
  return (
    <section
      id="proof"
      aria-label="Voltedge by the numbers"
      className="border-y border-[#232a35] bg-[#161b23]"
    >
      <div className={`${container} grid grid-cols-3 divide-x divide-[#232a35]`}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="px-2 py-8 text-center sm:py-10"
          >
            <p
              className={`${display} text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none text-[#f4f7fb]`}
            >
              {stat.value}
              {stat.unit ? (
                <span className="text-[#ffb020]">{stat.unit}</span>
              ) : null}
            </p>
            <p className="mt-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#93a0b1] sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
