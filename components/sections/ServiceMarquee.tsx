/**
 * Ticker strip at the hero's fold line — the services Integrate automates,
 * scrolling continuously. Duplicated list + translateX(-50%) loop.
 * Server component; the animation is pure CSS and pauses under
 * prefers-reduced-motion (see globals.css).
 */
const SERVICES = [
  "Outreach",
  "Calendar Booking",
  "CRM Integration",
  "Data Enrichment",
  "Analytics",
  "Lead Qualification",
  "Follow-up Sequences",
];

export function ServiceMarquee() {
  return (
    <div className="hairline-t hairline-b relative overflow-hidden bg-card/60 py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex items-center"
              /* The label lives on the real list; the loop copy is hidden */
              aria-label={copy === 0 ? "Services we automate" : undefined}
              aria-hidden={copy === 1}
            >
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center">
                  <span className="whitespace-nowrap px-8 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-2">
                    {service}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-accent"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
