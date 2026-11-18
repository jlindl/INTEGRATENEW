/**
 * How it works: four steps (a real sequence, so they are numbered), each with
 * a small object that shows the step, then the questions people ask first as
 * disclosure rows (layout.md › Visual hierarchy: progressive disclosure).
 * Answers are what the site already publishes (lib/film/content.ts).
 */
import { PAYOFF, PROCESS } from "@/lib/film/content";
import { Em, Eyebrow, TextLink, h2 } from "./ui";

function StepObject({ art }: { art: string }) {
  if (art === "call")
    return (
      <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
        <span className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-carbon text-ivory">
          <span className="text-[0.9375rem] font-bold leading-none">30</span>
          <span className="font-mono text-[0.6875rem] leading-none">min</span>
        </span>
        <span className="text-[0.875rem] font-medium leading-snug">{PAYOFF.promises[0]}</span>
      </div>
    );
  if (art === "plan")
    return (
      <ul className="divide-y divide-line rounded-xl border border-line bg-paper">
        {PROCESS.planItems.map((p) => (
          <li key={p} className="flex items-center gap-2.5 px-3 py-2 text-[0.875rem]">
            <span className="h-3.5 w-3.5 rounded-[4px] border border-ink-3" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    );
  if (art === "build")
    return (
      <ul className="flex flex-wrap items-center gap-1.5">
        {PROCESS.buildItems.map((b, i) => (
          <li key={b} className="flex items-center gap-1.5 text-[0.875rem] font-medium">
            {i > 0 && <span aria-hidden="true" className="h-px w-3 bg-ink-3" />}
            <span className="rounded-full bg-ink/[0.06] px-2.5 py-1">{b}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
      <span className="flex items-center gap-2 text-[0.875rem] font-medium">
        <span className="h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
        Running
      </span>
      <span className="text-[0.8125rem] text-ink-2">Managed by Integrate</span>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" data-tone="light" aria-labelledby="process-title" className="scroll-mt-16 bg-paper py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="max-w-[46rem]">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="process-title" className={h2}>
            <Em text={PROCESS.title} />
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4">
          {PROCESS.phases.map((p, i) => (
            <li key={p.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 sm:flex sm:flex-col sm:rounded-[1.4rem] sm:border sm:border-line sm:bg-card sm:p-6 sm:shadow-lift">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-carbon text-[0.875rem] font-semibold text-ivory">
                <span className="sr-only">Step </span>
                {i + 1}
              </span>
              <h3 className="text-[1.25rem] font-bold tracking-[-0.025em] max-sm:col-start-2 max-sm:row-start-1 max-sm:self-center sm:mt-4">{p.name}</h3>
              <p className="mt-1.5 text-[1rem] leading-relaxed text-ink-2 max-sm:col-start-2 sm:mt-2">{p.body}</p>
              <div className="mt-auto hidden pt-5 sm:block" aria-hidden="true">
                <StepObject art={p.art} />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h3 className="text-[min(clamp(1.6rem,4.6vw,2.25rem),9vw)] font-bold leading-[1.05] tracking-[-0.035em]">Questions people ask first</h3>
            <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-2">Anything else, ask on the call. It&apos;s free, and there&apos;s no pitch.</p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {PROCESS.questions.map((q) => (
              <details key={q.q} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[1.0625rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {q.q}
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-2 text-[1.125rem] leading-none text-ink-2 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">
                    +
                  </span>
                </summary>
                <div className="pb-5 pr-12">
                  <p className="text-[1rem] leading-relaxed text-ink-2">{q.a}</p>
                  {"link" in q && q.link ? <TextLink href={q.link.href} className="mt-1">{q.link.label}</TextLink> : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
