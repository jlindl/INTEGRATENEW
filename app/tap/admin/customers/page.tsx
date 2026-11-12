import { redirect } from "next/navigation";
import { AdminTabs } from "@/components/tap/AdminTabs";
import { PageTitle, TapShell, inputClass, secondaryButton } from "@/components/tap/ui";
import { adminLogoutAction, deleteCustomerAction, plateAction } from "@/lib/tap/admin-actions";
import { isAdmin } from "@/lib/tap/auth";
import { getStore } from "@/lib/tap/store";

export const dynamic = "force-dynamic";

const pill = "rounded-full border border-line px-2.5 py-1 text-[0.74rem]";

/** Everyone who has signed up, with the plates they've claimed. */
export default async function Customers({ searchParams }: { searchParams: Promise<{ q?: string; consent?: string }> }) {
  if (!(await isAdmin())) redirect("/tap/admin/login");
  const { q = "", consent = "" } = await searchParams;
  const store = getStore();
  const [allPlates, businesses] = await Promise.all([store.listPlates(), store.listBusinesses()]);
  const platesBy = new Map<string, typeof allPlates>();
  for (const p of allPlates) if (p.businessId) platesBy.set(p.businessId, [...(platesBy.get(p.businessId) ?? []), p]);

  const needle = q.trim().toLowerCase();
  const digits = needle.replace(/\s/g, "");
  const customers = businesses
    .filter(
      (b) =>
        (!consent || (consent === "yes") === b.marketingConsent) &&
        (!needle ||
          b.name.toLowerCase().includes(needle) ||
          b.email.toLowerCase().includes(needle) ||
          (b.contactName ?? "").toLowerCase().includes(needle) ||
          (digits && (b.phone ?? "").replace(/\s/g, "").includes(digits)) ||
          (platesBy.get(b.id) ?? []).some((p) => p.code.toLowerCase().includes(needle))),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const unclaimed = allPlates.filter((p) => !p.businessId).length;
  const claimedPlates = allPlates.length - unclaimed;
  const optedIn = businesses.filter((b) => b.marketingConsent).length;

  return (
    <TapShell
      width="wide"
      right={<form action={adminLogoutAction}><button className={secondaryButton}>Log out</button></form>}
    >
      <PageTitle kicker="Admin" title="Customers" />
      <AdminTabs active="customers" plates={unclaimed} customers={businesses.length} />

      <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line shadow-lift">
        {[["Customers", businesses.length], ["Plates claimed", claimedPlates], ["Marketing OK", optedIn]].map(([k, v]) => (
          <div key={k} className="bg-card px-4 py-3.5">
            <dt className="text-[0.8rem] text-ink-3">{k}</dt>
            <dd className="font-display-tuned mt-0.5 text-[1.6rem] leading-tight text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_12rem_auto]">
        <input name="q" defaultValue={q} placeholder="Search business, name, email, phone or plate code" className={inputClass} />
        <select name="consent" defaultValue={consent} className={inputClass}>
          <option value="">Any marketing</option>
          <option value="yes">Marketing OK</option>
          <option value="no">No marketing</option>
        </select>
        <button className={secondaryButton}>Filter</button>
      </form>

      <div className="mt-3 flex justify-between text-[0.82rem] text-ink-3">
        <span>{customers.length} customer{customers.length === 1 ? "" : "s"}</span>
        <a href="/tap/admin/export?type=customers" className="inline-flex min-h-11 items-center underline hover:text-ink">Customers CSV</a>
      </div>

      <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-card shadow-lift">
        <table className="w-full min-w-[46rem] text-left text-[0.86rem]">
          <thead className="border-b border-line text-[0.78rem] font-medium text-ink-3">
            <tr>
              <th className="px-4 py-3">Business</th><th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Signed up</th><th className="px-4 py-3">Plates</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((b) => {
              const plates = (platesBy.get(b.id) ?? []).sort((x, y) => x.code.localeCompare(y.code));
              return (
                <tr key={b.id} className="align-top">
                  <td className="px-4 py-3">
                    <a className="font-medium underline" href={`/b/${b.slug}`} target="_blank">{b.name}</a>
                    <span className="block text-[0.74rem] text-ink-3">Taps go to {b.mode === "page" ? "their page" : "one link"}</span>
                  </td>
                  <td className="px-4 py-3 text-[0.8rem] text-ink-2">
                    <span className="block">{b.contactName || "–"}</span>
                    <a className="block underline" href={`mailto:${b.email}`}>{b.email}</a>
                    {b.phone && <a className="block" href={`tel:${b.phone}`}>{b.phone}</a>}
                    {b.marketingConsent && <span className="mt-1 inline-block rounded-full bg-[#edf7f0] px-1.5 text-[0.74rem] text-[#22603a]">Marketing OK</span>}
                  </td>
                  <td className="px-4 py-3 text-[0.8rem] text-ink-3">
                    {new Date(b.createdAt).toLocaleDateString("en-GB")}
                    <details className="mt-2">
                      <summary className={`${pill} inline-block cursor-pointer list-none text-[#8a2e22]`}>Remove</summary>
                      <form action={deleteCustomerAction} className="mt-2 w-44 rounded-xl border border-line bg-paper p-2.5 text-ink-2">
                        <input type="hidden" name="id" value={b.id} />
                        <p className="text-[0.74rem] leading-snug">
                          Deletes {b.name} and their details.{" "}
                          {plates.length ? `Their ${plates.length === 1 ? "plate goes" : `${plates.length} plates go`} back to unclaimed stock.` : "They have no plates."}
                        </p>
                        <button className="mt-2 w-full rounded-full bg-[#8a2e22] px-2.5 py-1.5 text-[0.74rem] font-medium text-paper">Yes, remove</button>
                      </form>
                    </details>
                  </td>
                  <td className="px-4 py-3">
                    {!plates.length && <span className="text-ink-3">No plates (all released)</span>}
                    <ul className="space-y-2">
                      {plates.map((p) => (
                        <li key={p.code} className="flex flex-wrap items-center gap-2">
                          <span className="font-mono">{p.code}</span>
                          {p.label && <span className="text-[0.78rem] text-ink-3">{p.label}</span>}
                          <span className="text-[0.78rem] text-ink-3">{p.taps} taps</span>
                          {p.status === "disabled" && <span className="rounded-full bg-[#fbeeec] px-2 text-[0.72rem] text-[#8a2e22]">disabled</span>}
                          <form action={plateAction} className="ml-auto flex gap-1.5">
                            <input type="hidden" name="code" value={p.code} />
                            {p.status === "disabled"
                              ? <button name="action" value="enable" className={pill}>Enable</button>
                              : <button name="action" value="disable" className={pill}>Disable</button>}
                            <button name="action" value="release" className={pill}>Release</button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
            {!customers.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-3">{businesses.length ? "No customers match." : "No one has set up a plate yet."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </TapShell>
  );
}
