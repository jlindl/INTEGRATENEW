import { container, displayFont, monoStack } from "./tokens";

const CLIENTS = [
  "Fieldnote",
  "Arcline Systems",
  "Hatchwork",
  "Verve Health",
  "Northgale",
  "Mono & Co",
];

export function ClientRow() {
  return (
    <section aria-label="Clients we search for" className="py-12 sm:py-16">
      <div className={container}>
        <p
          className={`${monoStack} text-center text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#5c5f68]`}
        >
          Search partner to talent-led teams
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {CLIENTS.map((client) => (
            <li
              key={client}
              className={`${displayFont} text-lg font-bold tracking-tight text-[#16181d]/45 sm:text-xl`}
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
