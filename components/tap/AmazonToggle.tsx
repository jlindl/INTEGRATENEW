import { plateAction } from "@/lib/tap/admin-actions";

/**
 * "Sent to Amazon" tick for one plate. A real submit button drawn as a
 * checkbox, so it saves on click with no client JavaScript needed.
 */
export function AmazonToggle({ code, sentAt }: { code: string; sentAt: string | null | undefined }) {
  const on = Boolean(sentAt);
  return (
    <form action={plateAction}>
      <input type="hidden" name="code" value={code} />
      <button
        name="action"
        value={on ? "amazon-off" : "amazon-on"}
        role="checkbox"
        aria-checked={on}
        aria-label={`Plate ${code} sent to Amazon`}
        className="inline-flex min-h-11 items-center gap-2 text-[0.78rem] text-ink-2"
      >
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center rounded-md border ${on ? "border-ink bg-ink text-paper" : "border-line-2 bg-card"}`}
        >
          {on && (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m5 12 5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {on ? new Date(sentAt!).toLocaleDateString("en-GB") : "Not sent"}
      </button>
    </form>
  );
}
