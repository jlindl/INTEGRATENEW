import { redirect } from "next/navigation";
import { BusinessEditor } from "@/components/tap/BusinessEditor";
import { Card, Notice, PageTitle, TapShell, inputClass, secondaryButton } from "@/components/tap/ui";
import { logout, renamePlate } from "@/lib/tap/actions";
import { currentBusiness } from "@/lib/tap/auth";
import { redirectTarget } from "@/lib/tap/links";
import { getStore } from "@/lib/tap/store";
import { toPublic } from "@/lib/tap/types";

export const dynamic = "force-dynamic";

function last7(daily: Record<string, number>) {
  let n = 0;
  const now = Date.now();
  for (let i = 0; i < 7; i++) n += daily[new Date(now - i * 864e5).toISOString().slice(0, 10)] ?? 0;
  return n;
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ claimed?: string }> }) {
  const business = await currentBusiness();
  if (!business) redirect("/tap/login?next=/tap/dashboard");
  const { claimed } = await searchParams;
  const plates = await getStore().listPlates({ businessId: business.id });
  const totalTaps = plates.reduce((s, p) => s + p.taps, 0);
  const weekTaps = plates.reduce((s, p) => s + last7(p.dailyTaps), 0);
  const target = redirectTarget(business);

  return (
    <TapShell
      width="wide"
      right={
        <form action={logout}>
          <button className={secondaryButton}>Log out</button>
        </form>
      }
    >
      <PageTitle eyebrow="Dashboard" title={business.name} />

      {claimed && (
        <div className="mt-5">
          <Notice tone="ok">
            Plate {claimed} is live. Tap it now to check: it will{" "}
            {target ? "go straight to your chosen link" : "open your page"}.
          </Notice>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <BusinessEditor business={toPublic(business)} />
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-3">Taps, 7 days</p>
                <p className="font-display-tuned mt-1 text-3xl text-ink">{weekTaps}</p>
              </div>
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-3">All time</p>
                <p className="font-display-tuned mt-1 text-3xl text-ink">{totalTaps}</p>
              </div>
            </div>
            <a href={`/b/${business.slug}`} target="_blank" className={`${secondaryButton} mt-5 w-full`}>
              View my page
            </a>
          </Card>

          <Card>
            <h2 className="text-[1.05rem] font-medium text-ink">Your plates</h2>
            <ul className="mt-3 divide-y divide-line">
              {plates.map((p) => (
                <li key={p.code} className="py-3">
                  <form action={renamePlate} className="flex items-center gap-2">
                    <input type="hidden" name="code" value={p.code} />
                    <input name="label" defaultValue={p.label} maxLength={40} aria-label={`Name for plate ${p.code}`} className={`${inputClass} py-1.5 text-[0.9rem]`} />
                    <button className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[0.78rem] text-ink-2 hover:border-ink-2">Save</button>
                  </form>
                  <p className="mt-1.5 flex justify-between font-mono text-[0.7rem] text-ink-3">
                    <span>{p.code}</span>
                    <span>{p.taps} taps{p.status === "disabled" ? " · switched off" : ""}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-3">
              Got another plate? Just tap it with your phone while logged in and it&apos;ll join this account.
            </p>
          </Card>
        </div>
      </div>
    </TapShell>
  );
}
