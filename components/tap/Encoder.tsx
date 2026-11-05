"use client";

import { useEffect, useRef, useState } from "react";
import { lookupScanned, markEncoded, type EncodeItem } from "@/lib/tap/admin-actions";
import { Card, Notice, primaryButton, secondaryButton } from "./ui";

/**
 * Android-only plate writer, built on Web NFC (Chrome for Android 89+,
 * makeReadOnly 100+). One scan session stays open; every tag that touches the
 * phone is read, written with the next queued URL, optionally locked, then
 * recorded against its plate code with the chip serial.
 *
 * "Check" mode just reads a tag and says which plate it is.
 */

/* Minimal Web NFC typings: not in TypeScript's DOM lib yet. */
type NDEFRecord = { recordType: string; data?: DataView; encoding?: string };
type NDEFReadingEvent = Event & { serialNumber: string; message: { records: NDEFRecord[] } };
type NDEFReaderT = EventTarget & {
  scan(opts?: { signal?: AbortSignal }): Promise<void>;
  write(msg: { records: { recordType: string; data: string }[] }, opts?: { overwrite?: boolean; signal?: AbortSignal }): Promise<void>;
  makeReadOnly(opts?: { signal?: AbortSignal }): Promise<void>;
  onreading: ((e: NDEFReadingEvent) => void) | null;
  onreadingerror: ((e: Event) => void) | null;
};

type LogLine = { tone: "ok" | "error" | "info"; text: string };

function readUrl(records: NDEFRecord[]): string | null {
  for (const r of records) {
    if ((r.recordType === "url" || r.recordType === "absolute-url") && r.data) return new TextDecoder().decode(r.data);
  }
  return null;
}

export function Encoder({ initialQueue }: { initialQueue: EncodeItem[] }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [canLock, setCanLock] = useState(false);
  const [queue, setQueue] = useState(initialQueue);
  const [lock, setLock] = useState(true);
  const [mode, setMode] = useState<"encode" | "check">("encode");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const busy = useRef(false);
  const abort = useRef<AbortController | null>(null);

  // Handlers read the latest values through refs, since onreading is bound once.
  const live = useRef({ queue, lock, mode });
  live.current = { queue, lock, mode };

  useEffect(() => {
    const ok = "NDEFReader" in window;
    setSupported(ok);
    setCanLock(ok && "makeReadOnly" in (window as unknown as { NDEFReader: { prototype: object } }).NDEFReader.prototype);
    return () => abort.current?.abort();
  }, []);

  useEffect(() => setQueue(initialQueue), [initialQueue]);

  const say = (tone: LogLine["tone"], text: string) => setLog((l) => [{ tone, text }, ...l].slice(0, 40));

  async function onTag(reader: NDEFReaderT, e: NDEFReadingEvent) {
    if (busy.current) return;
    busy.current = true;
    const serial = e.serialNumber || null;
    const existing = readUrl(e.message.records);
    try {
      const { queue: q, lock: wantLock, mode: m } = live.current;

      if (m === "check" || (existing && /\/t\/[A-Z0-9]{6}/i.test(existing))) {
        const found = await lookupScanned(existing, serial);
        if (found) {
          say(
            m === "check" ? "info" : "error",
            `${m === "check" ? "" : "Already written: "}plate ${found.code}, ${found.status}${found.business ? `, ${found.business}` : ""}, ${found.taps} taps`,
          );
        } else {
          say(m === "check" ? "info" : "error", existing ? `Unknown link on tag: ${existing}` : `Blank tag${serial ? ` (${serial})` : ""}`);
        }
        return;
      }

      const item = q[0];
      if (!item) return say("error", "Queue is empty. Make a new batch in admin.");

      await reader.write({ records: [{ recordType: "url", data: item.url }] }, { overwrite: true });
      let locked = false;
      if (wantLock && canLock) {
        await reader.makeReadOnly();
        locked = true;
      }
      const res = await markEncoded(item.code, serial, locked);
      if (!res.ok) return say("error", `${item.code}: ${res.error}`);

      navigator.vibrate?.([60, 40, 60]);
      setQueue((qq) => qq.filter((x) => x.code !== item.code));
      say("ok", `${item.code} written${locked ? " and locked" : ""}${serial ? ` (chip ${serial})` : ""}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      say(
        "error",
        /NotAllowed|read-only|readonly/i.test(msg)
          ? "That tag is locked or can't be written. Use a fresh plate."
          : `Didn't finish (${msg}). Hold the plate still against the phone and try again.`,
      );
    } finally {
      // Ignore the same tag bouncing in and out for a moment.
      setTimeout(() => (busy.current = false), 900);
    }
  }

  async function start() {
    try {
      const Reader = (window as unknown as { NDEFReader: new () => NDEFReaderT }).NDEFReader;
      const reader = new Reader();
      abort.current = new AbortController();
      await reader.scan({ signal: abort.current.signal });
      reader.onreading = (e) => void onTag(reader, e);
      reader.onreadingerror = () => say("error", "Couldn't read that tag. Try again, holding it flat on the phone.");
      setRunning(true);
      say("info", "Ready. Hold a plate to the back of the phone.");
    } catch (err) {
      say("error", `Couldn't start NFC: ${err instanceof Error ? err.message : err}. Check NFC is on in Android settings.`);
    }
  }

  function stop() {
    abort.current?.abort();
    abort.current = null;
    setRunning(false);
    say("info", "Stopped.");
  }

  if (supported === false) {
    return (
      <Notice tone="error">
        This browser can&apos;t write NFC. Open this page in <b>Chrome on an Android phone</b> with NFC switched on.
        iPhones can&apos;t write NFC from a web page.
      </Notice>
    );
  }

  const next = queue[0];

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex gap-2">
          {(["encode", "check"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full border px-4 py-2 text-[0.9rem] ${mode === m ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink"}`}
            >
              {m === "encode" ? "Write plates" : "Check a plate"}
            </button>
          ))}
        </div>

        {mode === "encode" && (
          <>
            <div className="mt-5 rounded-xl border border-line bg-paper-2/50 p-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-3">Next plate · {queue.length} left</p>
              <p className="mt-1 font-mono text-3xl tracking-[0.12em] text-ink">{next?.code ?? "None"}</p>
              {next && <p className="mt-1 break-all font-mono text-[0.72rem] text-ink-3">{next.url}</p>}
              {next && (
                <button type="button" onClick={() => setQueue((q) => [...q.slice(1), q[0]])} className="mt-3 text-[0.8rem] text-ink-2 underline">
                  Skip to next code
                </button>
              )}
            </div>
            <label className="mt-4 flex items-start gap-3 text-[0.9rem] text-ink">
              <input type="checkbox" checked={lock && canLock} disabled={!canLock} onChange={(e) => setLock(e.target.checked)} className="mt-1 h-4 w-4" />
              <span>
                Lock each plate after writing
                <span className="block text-[0.8rem] text-ink-3">
                  {canLock ? "Permanent. Stops anyone overwriting it. Safe because the link itself never needs to change." : "Needs Chrome 100 or newer."}
                </span>
              </span>
            </label>
          </>
        )}

        <div className="mt-5">
          {running ? (
            <button type="button" onClick={stop} className={`${secondaryButton} w-full`}>Stop</button>
          ) : (
            <button type="button" onClick={start} disabled={supported === null} className={primaryButton}>
              Start {mode === "encode" ? "writing" : "checking"}
            </button>
          )}
        </div>
      </Card>

      {log.length > 0 && (
        <div className="space-y-2" aria-live="polite">
          {log.map((l, i) => (
            <Notice key={i} tone={l.tone}>{l.text}</Notice>
          ))}
        </div>
      )}
    </div>
  );
}
