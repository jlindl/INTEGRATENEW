"use client";

import { useState } from "react";

/**
 * Copies a list of plate links to the clipboard, one per line, for writing
 * tags with NFC Tools on iPhone (or sending to a supplier).
 */
export function CopyLinks({ links, label }: { links: string[]; label: string }) {
  const [done, setDone] = useState<"ok" | "fail" | null>(null);

  async function copy() {
    const text = links.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setDone("ok");
    } catch {
      // Older browsers / non-secure contexts: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      setDone(ok ? "ok" : "fail");
    }
    setTimeout(() => setDone(null), 2500);
  }

  if (!links.length) return <span className="text-ink-3">No unencoded links</span>;

  return (
    <button type="button" onClick={copy} className="underline hover:text-ink">
      {done === "ok" ? `Copied ${links.length} links` : done === "fail" ? "Couldn't copy" : label}
    </button>
  );
}
