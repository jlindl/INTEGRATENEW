/**
 * UK (Europe/London) wall-clock helpers. GitHub cron and the Ayrshare API both
 * work in UTC, while posting slots are defined in UK time, so these convert
 * between the two across BST/GMT changes without a date library.
 */
const TZ = "Europe/London";

/** Minutes the UK is ahead of UTC at a given instant (60 in BST, 0 in GMT). */
function ukOffsetMinutes(at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

/** The UTC instant for a UK wall-clock time, e.g. ("2026-10-01", "10:30"). */
export function ukTimeToUtc(date: string, hhmm: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = hhmm.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, h, min);
  // Two passes settle the offset on either side of a clock change.
  let t = naive - ukOffsetMinutes(new Date(naive)) * 60000;
  t = naive - ukOffsetMinutes(new Date(t)) * 60000;
  return new Date(t);
}

/** The UK calendar date (YYYY-MM-DD) of an instant. */
export function ukDate(at: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(at);
}

/** YYYY-MM-DD plus n days. */
export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Human UK time for logs, e.g. "Thu 1 Oct, 10:30". */
export function formatUk(at: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(at);
}
