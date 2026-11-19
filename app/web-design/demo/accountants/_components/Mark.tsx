import { serif } from "./ui";

/** Meridian monogram: a globe reduced to one meridian and one rule. */
export function MarkGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="14.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 1.75v28.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M16 1.75c-5.2 3.6-7.6 8.4-7.6 14.25S10.8 26.65 16 30.25"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path d="M1.9 19.5h28.2" stroke="#a7834b" strokeWidth="1.25" />
    </svg>
  );
}

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const colour = tone === "dark" ? "text-[#13201b]" : "text-[#f3f0e8]";
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap ${colour}`}>
      <MarkGlyph />
      <span className={`${serif} text-[1.35rem] leading-none tracking-[-0.01em]`}>
        Meridian <span className="italic text-[#a7834b]">&amp;</span> Co
      </span>
    </span>
  );
}
