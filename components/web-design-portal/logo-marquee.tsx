import { CLIENTS } from "@/components/web-design-portal/site-data";
import { SparkIcon } from "@/components/web-design-portal/icons";

/**
 * The businesses whose sites are live, as a running strip of names.
 *
 * Names only, set in type: these are real companies, and drawing marks for
 * them would be passing off invented logos as theirs. Each one is linked,
 * with its screenshot, in the work rail further down.
 */
export default function LogoMarquee() {
  // Rendered twice so the track can slide exactly one copy width and loop
  // without a visible jump.
  const copies = [0, 1];

  return (
    <div className="marquee relative w-full overflow-hidden">
      <div className="marquee-track">
        {copies.map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 || undefined}
          >
            {CLIENTS.map(({ name }) => (
              <li
                key={name}
                /* Trailing margin per item (not a flex gap) keeps every step the
                   same width, which is what makes the 50% slide land cleanly. */
                className="group mr-10 flex shrink-0 items-center gap-10 lg:mr-16 lg:gap-16"
              >
                <span className="whitespace-nowrap text-[22px] font-semibold tracking-[-0.03em] text-white/80 transition-colors duration-300 group-hover:text-white lg:text-[30px]">
                  {name}
                </span>
                <SparkIcon className="h-4 w-4 shrink-0 text-neon-400 lg:h-5 lg:w-5" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
