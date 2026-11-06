/**
 * Copy text to the clipboard from a click handler. Falls back to a hidden
 * textarea for older browsers and non-secure contexts, where the async
 * Clipboard API is missing. Resolves false when neither works, so the caller
 * can tell the person to copy it by hand.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      // Treated as a failed copy below.
    }
    ta.remove();
    return ok;
  }
}
