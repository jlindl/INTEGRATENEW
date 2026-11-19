import { display } from "./ui";

/** Brightwell wordmark: a soft rising-sun mark (a well, a smile) plus Fraunces. */
export function BrandMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "dark" ? "#1c2a26" : "#fffcf7";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill={tone === "dark" ? "#2d5547" : "#fffcf7"} />
        <path
          d="M8.5 18.2c1.9 3 4.5 4.5 7.5 4.5s5.6-1.5 7.5-4.5"
          fill="none"
          stroke={tone === "dark" ? "#f2d6c6" : "#2d5547"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="12" r="3.2" fill={tone === "dark" ? "#f2d6c6" : "#2d5547"} />
      </svg>
      <span
        className={`${display} text-[1.42rem] font-medium leading-none tracking-[-0.02em]`}
        style={{ color: ink }}
      >
        Brightwell
      </span>
    </span>
  );
}
