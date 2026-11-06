import { redirect } from "next/navigation";
import { BusinessEditor } from "@/components/tap/BusinessEditor";
import { Card, Notice, PageTitle, Plate, TapShell, inputClass, secondaryButton } from "@/components/tap/ui";
import { logout, renamePlate } from "@/lib/tap/actions";
import { currentBusiness } from "@/lib/tap/auth";
import { getStore } from "@/lib/tap/store";
import { toPublic, type Business } from "@/lib/tap/types";

export const dynamic = "force-dynamic";

function last7(daily: Record<string, number>) {
  let n = 0;
  const now = Date.now();
  for (let i = 0; i < 7; i++) n += daily[new Date(now - i * 864e5).toISOString().slice(0, 10)] ?? 0;
  return n;
}

/** Plain-English summary of what a tap does right now. */
function tapSummary(b: Business): string {
  if (b.mode === "redirect") {
    const link = b.links.find((l) => l.id === b.redirectLinkId) ?? b.links.find((l) => l.kind === "google");
    if (link) return `Taps go straight to “${link.label}”.`;
  }
  return b.links.length ? "Taps open your page with all your links." : "Taps open your page. Add your links below.";
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ claimed?: string }> }) {
  const business = await currentBusiness();
  if (!business) redirect("/tap/login?next=/tap/dashboard");
  const { claimed } = await searchParams;
  const plates = await getStore().listPlates({ businessId: business.id });
  const totalTaps = plates.reduce((s, p) => s + p.taps, 0);
  const weekTaps = plates.reduce((s, p) => s + last7(p.dailyTaps), 0);

  return (
    <TapShell
      width="wide"
      right={
        <form action={logout}>
          <button className={secondaryButton}>Log out</button>
        </form>
      }
    >
      <PageTitle title={business.name} intro={tapSummary(business)} />

      {claimed && (
        <div className="mt-5 max-w-[36rem]">
          <Notice tone="ok">
            <b className="font-medium">Plate {claimed} is live.</b> Tap it with your phone to check it works.
          </Notice>
        </div>
      )}

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* On phones the glanceable things come first; on desktop they sit in the side column. */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1">
          <Card>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[0.84rem] text-ink-3">Taps this week</dt>
                <dd className="font-display-tuned mt-1 text-[2.1rem] leading-none text-ink">{weekTaps}</dd>
              </div>
              <div>
                <dt className="text-[0.84rem] text-ink-3">All time</dt>
                <dd className="font-display-tuned mt-1 text-[2.1rem] leading-none text-ink">{totalTaps}</dd>
              </div>
            </dl>
            <a href={`/b/${business.slug}`} target="_blank" rel="noopener" className={`${secondaryButton} mt-6 w-full`}>
              View my page
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Card>

          <Card>
            <h2 className="text-[1.08rem] font-semibold text-ink">Your plates</h2>
            <ul className="mt-2 divide-y divide-line">
              {plates.map((p) => (
                <li key={p.code} className="flex items-center gap-3 py-4">
                  <Plate code={p.code} size="sm" muted={p.status === "disabled"} />
                  <div className="min-w-0 flex-1">
                    <form action={renamePlate} className="flex items-center gap-2">
                      <input type="hidden" name="code" value={p.code} />
                      <input
                        name="label"
                        defaultValue={p.label}
                        maxLength={40}
                        aria-label={`Name for plate ${p.code}`}
                        className={`${inputClass} min-h-11 py-2 text-[0.92rem]`}
                      />
                      <button className="min-h-11 shrink-0 rounded-full border border-line bg-card px-3.5 text-[0.84rem] font-medium text-ink-2 hover:border-ink-2 hover:text-ink">
                        Save
                      </button>
                    </form>
                    <p className="mt-1.5 text-[0.8rem] text-ink-3">
                      {plural(p.taps, "tap")}
                      {p.status === "disabled" && (
                        <span className="ml-2 rounded-full bg-[#fbeeec] px-2 py-0.5 text-[#8a2e22]">Switched off</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-3">
              Got another plate? Tap it with your phone while you&apos;re logged in and it joins this account.
            </p>
          </Card>
        </aside>

        <Card className="lg:col-start-1 lg:row-start-1">
          <BusinessEditor business={toPublic(business)} />
        </Card>
      </div>
    </TapShell>
  );
}
