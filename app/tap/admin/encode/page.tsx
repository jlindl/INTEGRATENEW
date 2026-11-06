import { redirect } from "next/navigation";
import { Encoder } from "@/components/tap/Encoder";
import { PageTitle, TapShell, secondaryButton } from "@/components/tap/ui";
import { encodeQueue } from "@/lib/tap/admin-actions";
import { isAdmin } from "@/lib/tap/auth";
import { getStore } from "@/lib/tap/store";

export const dynamic = "force-dynamic";

export default async function EncodePage({ searchParams }: { searchParams: Promise<{ batch?: string }> }) {
  if (!(await isAdmin())) redirect("/tap/admin/login");
  const { batch = "" } = await searchParams;
  const [queue, all] = await Promise.all([encodeQueue(batch), getStore().listPlates({ status: "unencoded" })]);
  const batches = [...new Set(all.map((p) => p.batch))];
  return (
    <TapShell right={<a href="/tap/admin" className={secondaryButton}>Admin</a>}>
      <PageTitle
        kicker="Encoder"
        title="Write plates"
        intro="Works in Chrome on Android. Press start, then hold each plate to the back of the phone until it buzzes. Each plate gets the next code in the queue."
      />
      <form className="mt-6 flex gap-2">
        <select name="batch" defaultValue={batch} className="flex-1 rounded-xl border border-line bg-card px-4 py-2.5">
          <option value="">All batches ({all.length} to write)</option>
          {batches.map((b) => (
            <option key={b} value={b}>{b} ({all.filter((p) => p.batch === b).length})</option>
          ))}
        </select>
        <button className={secondaryButton}>Load</button>
      </form>
      <div className="mt-6">
        <Encoder initialQueue={queue} />
      </div>
    </TapShell>
  );
}
