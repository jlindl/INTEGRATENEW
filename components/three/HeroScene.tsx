"use client";

/**
 * The hero centrepiece: the Integrate mark, machined from metal, held inside a
 * slowly orbiting silver lattice.
 *
 *  - An extruded chrome chevron (the brand icon) sits front-and-centre and
 *    oscillates gently so it stays legible while catching the studio light
 *  - An icosahedral cage of hairline edges with silver nodes at each vertex
 *    orbits around it, with two counter-rotating gyroscope rings
 *  - Signal pulses travel node-to-node along the cage edges — data moving
 *    through an automated system
 *
 * Lit entirely by a procedural studio environment (drei Lightformers baked to
 * a small cubemap) — no HDRI downloads, no network dependency.
 *
 * The rig is driven from outside via MotionValues: scroll progress recedes the
 * object; the cursor applies a gentle parallax lean.
 */
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";

const CAGE_RADIUS = 1.72;
const PULSE_COUNT = 9;

// Brand mark, extruded. Coordinates are the LogoMark SVG paths (48x48 viewBox)
// mapped to centered, Y-up world units at this scale.
const LOGO_SCALE = 0.066;
const LOGO_DEPTH = 0.22;

type Drive = {
  scroll: MotionValue<number>; // 0 → 1 across the hero
  pointerX: MotionValue<number>; // -1 → 1
  pointerY: MotionValue<number>; // -1 → 1
};

/* ------------------------------------------------------------------ */
/*  Geometry prep: unique vertices + adjacency for the pulse walkers    */
/* ------------------------------------------------------------------ */

function useLattice() {
  return useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(CAGE_RADIUS, 1);
    const edgeGeo = new THREE.EdgesGeometry(ico);
    ico.dispose();

    const pos = edgeGeo.attributes.position;
    const keyOf = (v: THREE.Vector3) =>
      `${v.x.toFixed(3)}|${v.y.toFixed(3)}|${v.z.toFixed(3)}`;

    const nodeMap = new Map<string, THREE.Vector3>();
    const adjacency = new Map<string, string[]>();

    for (let i = 0; i < pos.count; i += 2) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, i);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
      const ka = keyOf(a);
      const kb = keyOf(b);
      if (!nodeMap.has(ka)) nodeMap.set(ka, a);
      if (!nodeMap.has(kb)) nodeMap.set(kb, b);
      if (!adjacency.get(ka)?.includes(kb))
        adjacency.set(ka, [...(adjacency.get(ka) ?? []), kb]);
      if (!adjacency.get(kb)?.includes(ka))
        adjacency.set(kb, [...(adjacency.get(kb) ?? []), ka]);
    }

    return { edgeGeo, nodeMap, adjacency };
  }, []);
}

/* Build the extruded chevron geometry from the LogoMark path outlines. */
function useLogoGeometry() {
  return useMemo(() => {
    const toShape = (pts: [number, number][]) => {
      const shape = new THREE.Shape();
      pts.forEach(([x, y], i) => {
        const X = (x - 24) * LOGO_SCALE;
        const Y = (24 - y) * LOGO_SCALE; // flip SVG Y-down to world Y-up
        if (i === 0) shape.moveTo(X, Y);
        else shape.lineTo(X, Y);
      });
      shape.closePath();
      return shape;
    };

    const shapes = [
      toShape([
        [2, 12], [14, 12], [26, 24], [14, 36], [2, 36], [11, 24],
      ]),
      toShape([
        [22, 2], [46, 24], [34, 24], [22, 12],
      ]),
      toShape([
        [46, 24], [22, 46], [22, 36], [34, 24],
      ]),
    ];

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: LOGO_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 2,
      steps: 1,
    });
    geo.center(); // centre on all axes so it rotates about its middle
    return geo;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  The object                                                          */
/* ------------------------------------------------------------------ */

function AutomationLattice({ scroll, pointerX, pointerY }: Drive) {
  const rig = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const logo = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);

  const { edgeGeo, nodeMap, adjacency } = useLattice();
  const logoGeo = useLogoGeometry();
  const nodePositions = useMemo(() => [...nodeMap.values()], [nodeMap]);
  const nodeKeys = useMemo(() => [...nodeMap.keys()], [nodeMap]);

  // Walkers: each pulse travels an edge, then picks the next at random.
  // Seeded deterministically by index so SSR/renders stay stable.
  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, (_, i) => {
        const fromKey = nodeKeys[(i * 5) % nodeKeys.length];
        const neighbors = adjacency.get(fromKey)!;
        return {
          from: fromKey,
          to: neighbors[i % neighbors.length],
          t: (i * 0.37) % 1,
          speed: 0.55 + (i % 4) * 0.16,
        };
      }),
    [adjacency, nodeKeys]
  );

  // Place the machined vertex nodes once.
  useLayoutEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    nodePositions.forEach((p, i) => {
      m.makeTranslation(p.x, p.y, p.z);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [nodePositions]);

  const scratch = useMemo(
    () => ({ m: new THREE.Matrix4(), v: new THREE.Vector3() }),
    []
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const s = scroll.get();
    const px = pointerX.get();
    const py = pointerY.get();

    if (rig.current) {
      // Gentle cursor lean + a slow idle drift + scroll-driven departure.
      // The rig barely rotates so the logo stays readable; the orbit spins.
      const targetY = px * 0.28 + s * 0.7;
      const targetX = 0.12 + py * 0.14 + s * 0.32;
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, targetY, 4, dt);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, targetX, 4, dt);
      // Gentle float; recede and shrink as the user scrolls past
      rig.current.position.y = Math.sin(t * 0.6) * 0.08 - s * 0.9;
      rig.current.scale.setScalar(1 - s * 0.28);
    }

    // Brand mark: gentle oscillation so it catches light without turning away
    if (logo.current) {
      logo.current.rotation.y = Math.sin(t * 0.5) * 0.4;
      logo.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }

    // The lattice orbits the mark
    if (orbit.current) orbit.current.rotation.y = t * 0.16;

    // Counter-rotating gyroscope rings
    if (ringA.current) ringA.current.rotation.z = t * 0.24;
    if (ringB.current) ringB.current.rotation.z = -t * 0.18;

    // Advance the signal pulses along their edges
    const mesh = pulsesRef.current;
    if (mesh) {
      pulses.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          p.t %= 1;
          const neighbors = adjacency.get(p.to)!;
          const next =
            neighbors[Math.floor(Math.random() * neighbors.length)];
          p.from = p.to;
          p.to = next === p.from ? neighbors[0] : next;
        }
        const a = nodeMap.get(p.from)!;
        const b = nodeMap.get(p.to)!;
        scratch.v.lerpVectors(a, b, p.t);
        scratch.m.makeTranslation(scratch.v.x, scratch.v.y, scratch.v.z);
        mesh.setMatrixAt(i, scratch.m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={rig}>
      {/* Brand mark — machined chrome chevron at the core */}
      <group ref={logo}>
        <mesh geometry={logoGeo}>
          <meshPhysicalMaterial
            color="#d4d7dc"
            metalness={1}
            roughness={0.22}
            clearcoat={0.8}
            clearcoatRoughness={0.25}
          />
        </mesh>
      </group>

      {/* Gyroscope rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.06, 0.02, 16, 96]} />
        <meshPhysicalMaterial color="#d0d3d8" metalness={1} roughness={0.16} clearcoat={0.6} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[1.28, 0.014, 16, 96]} />
        <meshPhysicalMaterial color="#71747b" metalness={1} roughness={0.3} />
      </mesh>

      {/* Node cage — orbits the mark */}
      <group ref={orbit}>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color="#1b1a16" transparent opacity={0.22} />
        </lineSegments>
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, nodePositions.length]}
        >
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshPhysicalMaterial color="#c7cace" metalness={1} roughness={0.2} />
        </instancedMesh>
        {/* Signal pulses — unlit bright silver so they read as light */}
        <instancedMesh
          ref={pulsesRef}
          args={[undefined, undefined, PULSE_COUNT]}
        >
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshBasicMaterial color="#eceef1" toneMapped={false} />
        </instancedMesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function HeroScene({
  scroll,
  pointerX,
  pointerY,
  active,
}: Drive & { active: boolean }) {
  return (
    <Canvas
      // Pause the render loop entirely when the hero is off-screen
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <AutomationLattice scroll={scroll} pointerX={pointerX} pointerY={pointerY} />

      {/* Procedural studio lighting — baked once, no HDRI fetch */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.6} position={[0, 4, 1]} rotation={[-Math.PI / 2, 0, 0]} scale={[9, 9, 1]} color="#ffffff" />
        <Lightformer intensity={1.6} position={[4.5, 0.5, 2]} rotation={[0, -Math.PI / 3, 0]} scale={[6, 3, 1]} color="#fff6e8" />
        <Lightformer intensity={1.3} position={[-5, -0.5, -1]} rotation={[0, Math.PI / 3, 0]} scale={[6, 3, 1]} color="#e4e8f0" />
        <Lightformer intensity={1} position={[0, -3.5, 2.5]} rotation={[Math.PI / 2.6, 0, 0]} scale={[10, 2.5, 1]} color="#dfe4ec" />
      </Environment>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={0.8} color="#fffaf0" />
    </Canvas>
  );
}
