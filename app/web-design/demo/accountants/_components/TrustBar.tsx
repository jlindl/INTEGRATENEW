import { container, display } from "./ui";

const stats = [
  { value: "£3.2m", label: "tax saved for clients last year" },
  { value: "48 hr", label: "response guarantee" },
  { value: "300+", label: "businesses supported" },
];

export function TrustBar() {
  return (
    <section
      id="proof"
      aria-label="Results at a glance"
      className="border-y border-[#e2ded2] bg-white/70"
    >
      <div
        className={`${container} grid gap-8 py-10 sm:grid-cols-3 sm:gap-0 sm:py-12`}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.value}
            className={`flex items-start gap-4 ${
              i > 0 ? "sm:border-l sm:border-[#e2ded2] sm:pl-8 lg:pl-12" : ""
            }`}
          >
            <svg
              viewBox="0 0 16 16"
              className="mt-3 h-4 w-4 shrink-0"
              aria-hidden="true"
              fill="none"
              stroke="#b08d57"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8.5l3.5 3.5L13.5 4" />
            </svg>
            <div>
              <p
                className={`${display} text-[2.4rem] font-medium leading-none tracking-tight text-[#15201c]`}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#565f59]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
