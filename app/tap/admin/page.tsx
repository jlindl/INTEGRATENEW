import { redirect } from "next/navigation";
import { CopyLinks } from "@/components/tap/CopyLinks";
import { GenerateForm } from "@/components/tap/forms";
import { Card, PageTitle, TapShell, inputClass, secondaryButton } from "@/components/tap/ui";
import { adminLogoutAction, plateAction } from "@/lib/tap/admin-actions";
import { isAdmin } from "@/lib/tap/auth";
import { plateUrl } from "@/lib/tap/codes";
import { getStore } from "@/lib/tap/store";
import type { PlateStatus } from "@/lib/tap/types";

export const dynamic = "force-dynamic";

const STATUSES: PlateStatus[] = ["unencoded", "ready", "claimed", "disabled"];
const STATUS_STYLE: Record<PlateStatus, string> = {
  unencoded: "bg-paper-3 text-ink-2",
  ready: "bg-[#e8eefb] text-[#2b4a8a]",
  claimed: "bg-[#edf7f0] text-[#22603a]",
  disabled: "bg-[#fbeeec] text-[#8a2e22]",
};

export default async function Admin({ searchParams }: { searchParams: Promise<{ batch?: string; status?: string; q?: string }> }) {
  if (!(await isAdmin())) redirect("/tap/admin/login");
  const { batch = "", status = "", q = "" } = await searchParams;
  const store = getStore();
  const [all, businesses] = await Promise.all([store.listPlates(), store.listBusinesses()]);
  const byId = new Map(businesses.map((b) => [b.id, b]));
  const batches = [...new Set(all.map((p) => p.batch))];
  const needle = q.trim().toLowerCase();
  const plates = all.filter(
    (p) =>
      (!batch || p.batch === batch) &&
      (!status || p.status === status) &&
      (!needle ||
        p.code.toLowerCase().includes(needle) ||
        (p.businessId && byId.get(p.businessId)?.name.toLowerCase().includes(needle)) ||
        (p.businessId && byId.get(p.businessId)?.email.includes(needle)) ||
        (p.businessId && (byId.get(p.businessId)?.contactName ?? "").toLowerCase().includes(needle)) ||
        (p.businessId && (byId.get(p.businessId)?.phone ?? "").includes(needle.replace(/\s/g, "")))),
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

      <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line shadow-lift sm:grid-cols-6">
        {[["Total", all.length], ...STATUSES.map((s) => [s[0].toUpperCase() + s.slice(1), count(s)] as const), ["Businesses", businesses.length]].map(([k, v]) => (
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

      <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_12rem_10rem_auto]">
        <input name="q" defaultValue={q} placeholder="Search code, business, name, email or phone" className={inputClass} />
        <select name="batch" defaultValue={batch} className={inputClass}>
          <option value="">All batches</option>
          {batches.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select name="status" defaultValue={status} className={inputClass}>
          <option value="">Any status</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className={secondaryButton}>Filter</button>
      </form>

      <div className="mt-4">
        <CopyLinks
          links={unencodedLinks}
          className={`${secondaryButton} w-full sm:w-auto`}
          label={`Copy ${unencodedLinks.length} unencoded link${unencodedLinks.length === 1 ? "" : "s"}${batch ? ` in ${batch}` : ""}`}
        />
      </div>

      <div className="mt-3 flex justify-between text-[0.82rem] text-ink-3">
        <span>{plates.length} plates</span>
        <span className="flex gap-4">
          <a href="/tap/admin/export?type=customers" className="inline-flex min-h-11 items-center underline hover:text-ink">Customers CSV</a>
          <a href={exportHref} className="inline-flex min-h-11 items-center underline hover:text-ink">Plates CSV{batch ? ` for ${batch}` : ""}</a>
        </span>
      </div>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card shadow-lift">
        <table className="w-full min-w-[46rem] text-left text-[0.86rem]">
          <thead className="border-b border-line text-[0.78rem] font-medium text-ink-3">
            <tr>
              <th className="px-4 py-3">Code</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Business</th><th className="px-4 py-3">Taps</th><th className="px-4 py-3">Chip</th><th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {plates.slice(0, 500).map((p) => {
              const b = p.businessId ? byId.get(p.businessId) : null;
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
                  <td className="px-4 py-2.5">
                    {b ? <a className="underline" href={`/b/${b.slug}`} target="_blank">{b.name}</a> : <span className="text-ink-3">–</span>}
                    {b && (
                      <span className="block text-[0.74rem] text-ink-3">
                        <span className="block">{b.contactName}</span>
                        <span className="block">{b.email}</span>
                        <span className="block">
                          {b.phone}
                          {b.marketingConsent && <span className="ml-1.5 rounded-full bg-[#edf7f0] px-1.5 text-[#22603a]">Marketing OK</span>}
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">{p.taps}</td>
                  <td className="px-4 py-2.5 font-mono text-[0.72rem] text-ink-3">{p.serial ? `${p.serial}${p.locked ? " 🔒" : ""}` : "–"}</td>
                  <td className="px-4 py-2.5">
                    <form action={plateAction} className="flex justify-end gap-1.5">
                      <input type="hidden" name="code" value={p.code} />
                      {p.status === "disabled"
                        ? <button name="action" value="enable" className="rounded-full border border-line px-2.5 py-1 text-[0.74rem]">Enable</button>
                        : <button name="action" value="disable" className="rounded-full border border-line px-2.5 py-1 text-[0.74rem]">Disable</button>}
                      {p.businessId && <button name="action" value="release" className="rounded-full border border-line px-2.5 py-1 text-[0.74rem]">Release</button>}                    </form>
                  </td>
                </tr>
              );
            })}
            {!plates.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-ink-3">No plates yet. Make a batch above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </TapShell>
  );
}
