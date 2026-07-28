import { CheckIcon } from "./icons";
import { container, displayFont } from "./theme";

const PROMISES = [
  {
    title: "No call-out fee",
    detail: "You pay for the fix, not the doorbell.",
  },
  {
    title: "Fixed quote before any work starts",
    detail: "The price we agree is the price you pay.",
  },
  {
    title: "DBS-checked, tidy engineers",
    detail: "Dust sheets down, boots covered, mess gone.",
  },
  {
    title: "Workmanship guaranteed 12 months",
    detail: "If it fails, we come back and put it right.",
  },
];

export function PromiseBand() {
  return (
    <section aria-labelledby="promise-heading" className="border-b border-[#dde8ee] bg-white">
      <h2 id="promise-heading" className="sr-only">
        The Northline promise
      </h2>
      <div className={`${container} grid gap-x-8 gap-y-6 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4`}>
        {PROMISES.map((promise) => (
          <div key={promise.title} className="flex items-start gap-3.5">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#23c1a6] text-[#08110f]">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className={`${displayFont} text-[0.95rem] font-bold leading-snug text-[#12212e]`}>{promise.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4e6274]">{promise.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
