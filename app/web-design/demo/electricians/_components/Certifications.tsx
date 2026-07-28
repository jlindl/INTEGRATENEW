import { ShieldCheck, container, display } from "./ui";

const badges = [
  "NICEIC Approved Contractor",
  "OZEV Authorised Installer",
  "Part P Certified",
  "£5m Public Liability",
];

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications and insurance"
      className="border-t border-[#232a35] scroll-mt-24"
    >
      <div className={`${container} py-12 sm:py-14`}>
        <h2
          className={`${display} text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#93a0b1]`}
        >
          Certified, insured, accountable
        </h2>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2.5 rounded-md border border-[#232a35] bg-[#161b23] px-4 py-3 text-sm font-medium text-[#f4f7fb]"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#ffb020]" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
