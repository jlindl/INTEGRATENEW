/**
 * The problem and the answer as one object: an example working day, each
 * thing that came in set beside what the assistant did with it. It replaces
 * the old pinned "noise" and "turn" scenes, so it reads at a glance instead
 * of asking people to scroll through an animation (motion.md › Best practices).
 *
 * The day is an illustration, labelled as one: times and messages are not a
 * real customer. Rows pair NOISE.day with TURN.log by time.
 */
import { NOISE, TURN } from "@/lib/film/content";
import { Em, Eyebrow, Icon, Status, TextLink, h2, type IconName } from "./ui";

/** Plain-words status for what the system did. "Booked" is the green one. */
const STATE: Record<string, string> = {
  "WhatsApp reply sent": "Answered",
  "Questions asked": "Qualifying",
  "Call-back booked": "Booked",
  "Survey booked": "Booked",
  "Matched to enquiry": "Matched",
  Answered: "Answered",
  "Reminder sent": "Chased",
};

export function DayLedger() {
  const rows = NOISE.day.map((d) => {
    const log = TURN.log.find(([t]) => t === d.time);
    const did = log ? log[2] : "";
    return { ...d, did, state: STATE[did] ?? "Done" };
  });

  return (
    <section id="day" data-tone="light" aria-labelledby="day-title" className="bg-paper py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Why enquiries go quiet</Eyebrow>
            <h2 id="day-title" className={h2}>
              {NOISE.title.map((line) => (
                <span key={line} className="block">
                  <Em text={line} />
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-2 lg:pb-1">{NOISE.body}</p>
        </div>

        <figure className="mt-10 overflow-hidden rounded-[1.6rem] border border-line bg-card shadow-lift lg:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line bg-paper-2/60 px-5 py-3.5 sm:px-7">
            <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#17633f]" aria-hidden="true" />
              Your assistant, {NOISE.dayStart} to {NOISE.dayEnd}
            </p>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-2">{NOISE.status} · Example day</p>
          </div>

          {/* Column heads, wide screens only. Each row also names its parts for screen readers. */}
          <div aria-hidden="true" className="hidden grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_8.5rem] gap-6 border-b border-line px-7 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-3 md:grid">
            <span>Time</span>
            <span>Came in</span>
            <span>What your assistant did</span>
            <span className="text-right">Status</span>
          </div>

          <ol className="divide-y divide-line">
            {rows.map((r) => (
              <li
                key={r.time}
                className="grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 px-5 py-4 sm:px-7 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_8.5rem] md:items-center md:gap-6"
              >
                <time className="pt-0.5 font-mono text-[0.875rem] tabular-nums text-ink-2 md:pt-0">
                  <span className="sr-only">At </span>
                  {r.time}
                </time>
                <p className="col-span-2 flex min-w-0 items-start gap-2.5 md:col-span-1">
                  <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink-2">
                    <Icon name={r.icon as IconName} className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="sr-only">Came in: </span>
                    <span className="block text-[0.9375rem] font-semibold leading-snug">{r.kind}</span>
                    <span className="block text-[0.875rem] leading-snug text-ink-2">{r.text}</span>
                  </span>
                </p>
                <span className="col-start-3 row-start-2 self-center justify-self-end md:col-start-4 md:row-start-1">
                  <Status state={r.state} />
                </span>
                <p className="col-start-2 row-start-2 flex items-center gap-2 text-[0.9375rem] leading-snug md:col-start-3 md:row-start-1">
                  <span aria-hidden="true" className="text-ink-3">→</span>
                  <span>
                    <span className="sr-only">Your assistant: </span>
                    {r.did}
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line bg-paper-2/60 px-5 py-3 sm:px-7">
            <span className="text-[0.9375rem] font-semibold">{TURN.before}</span>
            <TextLink href="#services">See the three systems</TextLink>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
