import { display, eyebrowDot, eyebrowRow } from "./ui";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`${eyebrowRow} ${center ? "justify-center" : ""}`}>
        <span className={eyebrowDot} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`${display} mt-4 text-[clamp(1.9rem,3.8vw,2.75rem)] font-medium leading-[1.12] tracking-tight text-[#1a1712]`}
      >
        {title}
      </h2>
      {sub ? (
        <p className="mt-4 text-base leading-relaxed text-[#5a544a] sm:text-lg">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
