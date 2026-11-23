import { mono, narrow, wrap } from "./theme";

const BADGES = [
  { name: "Gas Safe Register", ref: "000000" },
  { name: "WaterSafe approved", ref: "WS 000000" },
  { name: "CIPHE member", ref: "M 000000" },
  { name: "TrustMark", ref: "Gov. endorsed" },
  { name: "Public liability", ref: "£5m cover" },
  { name: "Engineers", ref: "DBS checked" },
];

export function Accreditations() {
  return (
    <section aria-label="Registrations and accreditations" className="border-y border-[#d8e1e3] bg-white">
      <div className={`${wrap} flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-10`}>
        <p className={`${narrow} shrink-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#4b5d6b]`}>
          Registered, insured
          <br className="hidden lg:block" /> and checked
        </p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between lg:gap-3">
          {BADGES.map((b) => (
            <li
              key={b.name}
              className="flex flex-col rounded-2xl border border-[#d8e1e3] px-4 py-3 lg:flex-1"
            >
              <span className="text-[0.9rem] font-bold leading-tight text-[#0b1a28]">{b.name}</span>
              <span className={`${mono} mt-1 text-[0.76rem] text-[#4b5d6b]`}>{b.ref}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
