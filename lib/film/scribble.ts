/**
 * The line. One parametric scribble that can be tangled (amp 1) or pulled
 * taut (amp 0). Used by the server to render the static path and by the film
 * director to re-draw it as the visitor scrolls through the turn.
 *
 * Runs from (x0, y0) to (x1, y1) in a 0..100 viewBox. The tangle loops back
 * on itself because x is parametric too, not a function of the main axis.
 */
export function scribblePath(
  amp: number,
  { x0 = 0, y0 = 50, x1 = 50, y1 = 50, steps = 90, seed = 0, bias = 0 } = {},
): string {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  // Unit vectors along and across the run.
  const ax = dx / len;
  const ay = dy / len;
  const nx = -ay;
  const ny = ax;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Envelope pins both ends so the line always meets its neighbours.
    const env = Math.sin(Math.PI * t) ** 0.8 * amp;
    const along = env * (0.09 * len * Math.sin(9.2 * Math.PI * t + seed) + 0.05 * len * Math.sin(17 * Math.PI * t + 1.3 + seed));
    const across = env * (17 * Math.sin(5.1 * Math.PI * t + 0.6 + seed) + 9 * Math.sin(12.7 * Math.PI * t + 2.1 + seed) + bias);
    const x = x0 + dx * t + ax * along + nx * across;
    const y = y0 + dy * t + ay * along + ny * across;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}
