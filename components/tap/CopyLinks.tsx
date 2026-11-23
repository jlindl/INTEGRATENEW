"use client";

import { useState } from "react";
import { copyText } from "./clipboard";

/**
 * Copies a list of plate links to the clipboard, one per line, for writing
 * tags with NFC Tools on iPhone (or sending to a supplier).
 */
export function CopyLinks({ links, label, className = "" }: { links: string[]; label: string; className?: string }) {
  const [done, setDone] = useState<"ok" | "fail" | null>(null);

  async function copy() {
    setDone((await copyText(links.join("\n"))) ? "ok" : "fail");
    setTimeout(() => setDone(null), 2500);
  }

  if (!links.length) return <span className="text-[0.85rem] text-ink-3">No unencoded plates to copy</span>;

  return (
    <button type="button" onClick={copy} className={className}>
      {done === "ok" ? `Copied ${links.length} links` : done === "fail" ? "Couldn't copy" : label}
    </button>
  );
}
