import { redirect } from "next/navigation";
import { AdminTabs } from "@/components/tap/AdminTabs";
import { AmazonToggle } from "@/components/tap/AmazonToggle";
import { CopyLinks } from "@/components/tap/CopyLinks";
import { GenerateForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell, inputClass, secondaryButton } from "@/components/tap/ui";
import { adminLogoutAction, bulkAmazonAction, plateAction } from "@/lib/tap/admin-actions";
import { isAdmin } from "@/lib/tap/auth";
import { plateUrl } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";
import type { PlateStatus } from "@/lib/tap/types";

export const dynamic = "force-dynamic";

// Claimed plates live on the Customers tab; this tab is unclaimed stock.
const STATUSES: PlateStatus[] = ["unencoded", "ready", "disabled"];
const STATUS_STYLE: Record<PlateStatus, string> = {
  unencoded: "bg-paper-3 text-ink-2",
  ready: "bg-[#e8eefb] text-[#2b4a8a]",
  claimed: "bg-[#edf7f0] text-[#22603a]",
  disabled: "bg-[#fbeeec] text-[#8a2e22]",
};

export default async function Admin({ searchParams }: { searchParams: Promise<{ batch?: string; status?: string; q?: string; amazon?: string }> }) {
  if (!(await isAdmin())) redirect("/tap/admin/login");
  const { batch = "", status = "", q = "", amazon = "" } = await searchParams;
  const store = getStore();
  const [everyPlate, businesses] = await Promise.all([store.listPlates(), store.listBusinesses()]);
  const all = everyPlate.filter((p) => !p.businessId);
  const batches = [...new Set(all.map((p) => p.batch))];
  const needle = q.trim().toLowerCase();
  const plates = all.filter(
    (p) =>
      (!batch || p.batch === batch) &&
      (!status || p.status === status) &&
      (!amazon || (amazon === "sent") === Boolean(p.sentToAmazonAt)) &&
      (!needle || p.code.toLowerCase().includes(needle)),
  );
  const count = (s: PlateStatus) => all.filter((p) => p.status === s).length;
  // Same order as the Encoder queue (by code), so a pasted list matches it.
  const unencodedLinks = all
    .filter((p) => p.status === "unencoded" && (!batch || p.batch === batch))
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((p) => plateUrl(p.code));
  const exportHref =`/tap/admin/export${batch ? `?batch=${encodeURIComponent(batch)}` : ""}`;

  return (
    <TapShell
      width="wide"
      right={
        <div className="flex gap-2">
          <a href={`/tap/admin/encode${batch ? `?batch=${encodeURIComponent(batch)}` : ""}`} className={secondaryButton}>Encoder</a>
          <form action={adminLogoutAction}><button className={secondaryButton}>Log out</button></form>
        </div>
      }
    >
      <PageTitle kicker="Admin" title="Plates" />
      <AdminTabs active="plates" plates={all.length} customers={businesses.length} />

      <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line shadow-lift sm:grid-cols-5">
        {[["Total", all.length], ...STATUSES.map((s) => [s[0].toUpperCase() + s.slice(1), count(s)] as const), ["Sent to Amazon", all.filter((p) => p.sentToAmazonAt).length]].map(([k, v]) => (
          <div key={k} className="bg-card px-4 py-3.5">
            <dt className="text-[0.8rem] text-ink-3">{k}</dt>
            <dd className="font-display-tuned mt-0.5 text-[1.6rem] leading-tight text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <Card className="mt-6">
        <h2 className="mb-4 text-[1.08rem] font-semibold text-ink">Make a new batch</h2>
        <GenerateForm />
        <p className="mt-3 text-[0.82rem] text-ink-3">
          Then write each plate&apos;s link (shown under its code below) onto a tag: the Encoder on an Android
          phone does a whole batch in order, or use the NFC Tools app on iPhone (Write → URL). The first person to
          tap an unclaimed plate sets it up.
        </p>
      </Card>

      <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_11rem_9rem_10rem_auto]">
        <input name="q" defaultValue={q} placeholder="Search plate code" className={inputClass} />
        <select name="batch" defaultValue={batch} className={inputClass}>
          <option value="">All batches</option>
          {batches.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select name="status" defaultValue={status} className={inputClass}>
          <option value="">Any status</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select name="amazon" defaultValue={amazon} className={inputClass}>
          <option value="">Amazon: any</option>
          <option value="sent">Sent to Amazon</option>
          <option value="not">Not sent</option>
        </select>
        <button className={secondaryButton}>Filter</button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {plates.some((p) => !p.sentToAmazonAt) && (
          <form action={bulkAmazonAction}>
            <input type="hidden" name="codes" value={plates.filter((p) => !p.sentToAmazonAt).slice(0, 500).map((p) => p.code).join(",")} />
            <button className={secondaryButton}>
              Mark {plates.filter((p) => !p.sentToAmazonAt).length} shown as sent to Amazon
            </button>
          </form>
        )}
        <CopyLinks
          links={unencodedLinks}
          className={`${secondaryButton} w-full sm:w-auto`}
          label={`Copy ${unencodedLinks.length} unencoded link${unencodedLinks.length === 1 ? "" : "s"}${batch ? ` in ${batch}` : ""}`}
        />
      </div>

      <div className="mt-3 flex justify-between text-[0.82rem] text-ink-3">
        <span>{plates.length} unclaimed plate{plates.length === 1 ? "" : "s"} · signed-up plates are on the <a href="/tap/admin/customers" className="underline hover:text-ink">Customers</a> tab</span>
        <span className="flex gap-4">
          <a href={exportHref} className="inline-flex min-h-11 items-center underline hover:text-ink">Plates CSV{batch ? ` for ${batch}` : ""}</a>
        </span>
      </div>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card shadow-lift">
        <table className="w-full min-w-[38rem] text-left text-[0.86rem]">
          <thead className="border-b border-line text-[0.78rem] font-medium text-ink-3">
            <tr>
              <th className="px-4 py-3">Code</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Sent to Amazon</th><th className="px-4 py-3">Taps</th><th className="px-4 py-3">Chip</th><th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {plates.slice(0, 500).map((p) => {
              return (
                <tr key={p.code}>
                  <td className="px-4 py-2.5 font-mono">
                    {p.code}
                    <span className="block select-all text-[0.7rem] text-ink-3">{plateUrl(p.code)}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.75rem] ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-2.5 text-ink-2">{p.batch}</td>
                  <td className="px-4 py-1"><AmazonToggle code={p.code} sentAt={p.sentToAmazonAt} /></td>
                  <td className="px-4 py-2.5">{p.taps}</td>
                  <td className="px-4 py-2.5 font-mono text-[0.72rem] text-ink-3">{p.serial ? `${p.serial}${p.locked ? " 🔒" : ""}` : "–"}</td>
                  <td className="px-4 py-2.5">
                    <form action={plateAction} className="flex justify-end gap-1.5">
                      <input type="hidden" name="code" value={p.code} />
                      {p.status === "disabled"
                        ? <button name="action" value="enable" className="rounded-full border border-line px-2.5 py-1 text-[0.74rem]">Enable</button>
                        : <button name="action" value="disable" className="rounded-full border border-line px-2.5 py-1 text-[0.74rem]">Disable</button>}
                    </form>
                  </td>
                </tr>
              );
            })}
            {!plates.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-ink-3">{everyPlate.length ? "No unclaimed plates. Make a batch above." : "No plates yet. Make a batch above."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </TapShell>
  );
}
