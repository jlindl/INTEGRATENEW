/**
 * Hue & Cry's drawn parts: the rollers, the arrow, and the rough "rolled"
 * edges used wherever paint meets bare wall. No state, so both the page and
 * the client components can use them.
 */

/* Small seeded generator, so the server and the browser draw the same edge. */
function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pc = (n: number) => `${n.toFixed(2)}%`;

/**
 * A clip-path for a coat of paint with a slightly rough leading (right) edge.
 * Percentages of the element's own box.
 */
export function rolledEdge(seed: number, depth = 3, points = 30): string {
  const r = prng(seed);
  const pts = ["0% 0%"];
  let drift = r();
  for (let k = 0; k <= points; k++) {
    drift = drift * 0.5 + r() * 0.5;
    pts.push(`${pc(100 - depth * drift)} ${pc((k / points) * 100)}`);
  }
  pts.push("0% 100%");
  return `polygon(${pts.join(", ")})`;
}

/**
 * A clip-path for a band of paint rolled along a seam: an uneven top edge
 * and a rough leading (right) edge.
 */
export function rolledBand(seed: number, top = 16, edge = 0.4): string {
  const r = prng(seed);
  const pts: string[] = [];
  const across = 44;
  let drift = r();
  for (let k = 0; k <= across; k++) {
    drift = drift * 0.6 + r() * 0.4;
    pts.push(`${pc((k / across) * (100 - edge))} ${pc(top * drift)}`);
  }
  const down = 7;
  for (let k = 1; k <= down; k++) {
    pts.push(`${pc(100 - edge * r())} ${pc(top + (k / down) * (100 - top))}`);
  }
  pts.push("0% 100%");
  return `polygon(${pts.join(", ")})`;
}

/**
 * A rolled band behind a word or a line: rough at both ends. `from` is the
 * same shape with nothing rolled on yet, for wiping it in.
 */
export function bandClip(seed: number, depth = 2.4): { to: string; from: string } {
  const r = prng(seed);
  const n = 6;
  const right: number[] = [];
  const left: number[] = [];
  for (let k = 0; k <= n; k++) {
    right.push(depth * r());
    left.push(depth * 0.7 * r());
  }
  const y = (k: number) => pc((k / n) * 100);
  const build = (rolled: boolean) => {
    const pts: string[] = [];
    for (let k = 0; k <= n; k++) pts.push(`${rolled ? pc(100 - right[k]) : pc(-4 - right[k])} ${y(k)}`);
    for (let k = n; k >= 0; k--) pts.push(`${rolled ? pc(left[k]) : pc(-5)} ${y(k)}`);
    return `polygon(${pts.join(", ")})`;
  };
  return { to: build(true), from: build(false) };
}

/** A roller held to a wall: the sleeve lies flat, the handle hangs below. Colour comes from --hc-c. */
export function RollerH({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={className} aria-hidden="true" focusable="false">
      <path
        d="M152 34 H176 Q188 34 188 46 V88 Q188 99 177 104 L96 138"
        fill="none"
        stroke="#bfc3c8"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M104 134 L42 161" stroke="#1d1b1a" strokeWidth="22" strokeLinecap="round" />
      <path d="M100 136 L90 140" stroke="#f7f2ea" strokeWidth="22" />
      <rect x="6" y="6" width="150" height="56" rx="17" fill="var(--hc-c)" />
      <rect x="6" y="6" width="150" height="56" rx="17" fill="#fff" fillOpacity="0.16" stroke="#1d1b1a" strokeOpacity="0.28" strokeWidth="1.5" />
      <rect x="6" y="34" width="150" height="28" rx="14" fill="#000" fillOpacity="0.14" />
      <rect x="18" y="12" width="126" height="8" rx="4" fill="#fff" fillOpacity="0.3" />
      <path
        d="M30 24 v30 M52 24 v30 M74 24 v30 M96 24 v30 M118 24 v30 M140 24 v30"
        stroke="#000"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeDasharray="3 6"
      />
      <ellipse cx="155" cy="34" rx="6" ry="24" fill="#000" fillOpacity="0.28" />
    </svg>
  );
}

/** A roller pulled along a seam: the sleeve stands upright, the handle leads. Colour comes from --hc-c. */
export function RollerV({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 130" className={className} aria-hidden="true" focusable="false">
      <path
        d="M28 18 V11 Q28 4 35 4 H74 Q84 4 84 14 V58 Q84 68 94 68 H102"
        fill="none"
        stroke="#bfc3c8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M104 68 H138" stroke="#1d1b1a" strokeWidth="18" strokeLinecap="round" />
      <path d="M100 68 H108" stroke="#f7f2ea" strokeWidth="18" />
      <rect x="8" y="16" width="40" height="108" rx="13" fill="var(--hc-c)" />
      <rect x="8" y="16" width="40" height="108" rx="13" fill="#fff" fillOpacity="0.14" stroke="#1d1b1a" strokeOpacity="0.28" strokeWidth="1.5" />
      <rect x="28" y="16" width="20" height="108" rx="10" fill="#000" fillOpacity="0.14" />
      <rect x="13" y="26" width="6" height="88" rx="3" fill="#fff" fillOpacity="0.3" />
      <ellipse cx="28" cy="18" rx="18" ry="5" fill="#000" fillOpacity="0.24" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
