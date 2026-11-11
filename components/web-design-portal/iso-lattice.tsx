/**
 * An isometric lattice of nodes with a dimmed reflection beneath it. A wave
 * travels diagonally across the grid — each node shares one keyframe set and is
 * offset by its own (col + row) delay.
 *
 * Pure SVG + CSS: nothing to hydrate, and it holds still under reduced motion.
 */

const SIZE = 5; // 5 x 5 lattice → a diamond once projected
const DX = 46; // horizontal step
const DY = 23; // vertical step (2:1 isometric)
const RX = 32;
const RY = 17;
const REFLECTION_DROP = 116;

/** 0 = recessive, 1 = neon, 2 = highlight. Hand-placed so the bright nodes
 *  cluster off-centre rather than forming an obvious symmetry. */
const TONE: number[][] = [
  [1, 1, 2, 0, 1],
  [2, 1, 1, 1, 0],
  [1, 2, 0, 1, 1],
  [0, 1, 1, 2, 1],
  [1, 0, 1, 1, 2],
];

const FILL = [
  "rgba(198,143,255,0.30)", // recessive
  "#a02bff", // neon
  "#f2e8ff", // highlight
];

type LatticeNode = { x: number; y: number; tone: number; delay: number };

// Sorted back-to-front so nearer nodes overlap the ones behind them.
const NODES: LatticeNode[] = Array.from({ length: SIZE }, (_, col) =>
  Array.from({ length: SIZE }, (_, row) => ({
    x: (col - row) * DX,
    y: (col + row) * DY,
    tone: TONE[row][col],
    delay: (col + row) * 0.11,
  })),
)
  .flat()
  .sort((a, b) => a.y - b.y);

export default function IsoLattice() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        aria-hidden
        className="halo-breathe pointer-events-none absolute h-[300px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(160,43,255,0.30),transparent_74%)] blur-[46px]"
      />

      <svg
        viewBox="-230 -34 460 372"
        aria-hidden
        className="relative w-full max-w-[430px]"
      >
        {/* Reflection: same lattice dropped below the surface and desaturated. */}
        <g opacity="0.4">
          {NODES.map((node, i) => (
            <ellipse
              key={`r-${i}`}
              className="iso-node"
              style={{ animationDelay: `${node.delay}s` }}
              cx={node.x}
              cy={node.y + REFLECTION_DROP}
              rx={RX}
              ry={RY}
              fill={node.tone === 0 ? "rgba(255,255,255,0.06)" : "#3d0a6b"}
            />
          ))}
        </g>

        {/* Surface */}
        {NODES.map((node, i) => (
          <ellipse
            key={`s-${i}`}
            className="iso-node"
            style={{ animationDelay: `${node.delay}s` }}
            cx={node.x}
            cy={node.y}
            rx={RX}
            ry={RY}
            fill={FILL[node.tone]}
          />
        ))}
      </svg>
    </div>
  );
}
