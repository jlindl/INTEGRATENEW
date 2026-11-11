"use client";

import { useEffect, useRef } from "react";

/**
 * The animated hero backdrop: a domain-warped fBm noise field coloured through a
 * neon-purple ramp, so it reads as slow-moving luminous smoke rather than a
 * looping gradient. Rendered with raw WebGL — no dependency, one draw call.
 *
 * The pointer carries a light through it: the cloud is pushed aside around the
 * cursor and lit from within, so the field answers the hand instead of just
 * playing behind it.
 *
 * Falls back to the CSS gradient painted underneath (`.plume-fallback`) whenever
 * WebGL is unavailable or the context is lost.
 */

const VERT = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uPointer;   // in the same centred, aspect-corrected space as p
uniform float uPointerOn; // 0..1, eased in once the pointer has actually moved

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Smooth octaves — used only to bend the space the cloud is sampled in.
float fbm(vec2 p) {
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// Billow noise: folding each octave through abs() puts a crease wherever the
// noise crosses zero, which is what gives cloud its cauliflower structure.
// Plain fbm just undulates — it can't produce a puff.
float billow(vec2 p) {
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * abs(noise(p) * 2.0 - 1.0);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = max(uResolution.x / uResolution.y, 0.0001);
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = uTime;

  // Slow, large-scale flow. The cloudbank churns internally rather than sliding
  // across as a whole.
  vec2 flow = vec2(
    fbm(p * 0.65 + vec2(0.0, t * 0.018)),
    fbm(p * 0.65 + vec2(5.2, 1.3) - t * 0.014)
  );
  vec2 wp = p * 1.25 + (flow - 0.5) * 0.85 + vec2(t * 0.022, -t * 0.010);

  // Pointer: a soft falloff around the cursor that shoves the sampling space
  // outward, so the cloud parts and curls around it as it moves.
  vec2 toPointer = p - uPointer;
  float reach = exp(-dot(toPointer, toPointer) * 9.0) * uPointerOn;
  wp += toPointer * reach * 1.15;

  float base = 1.0 - billow(wp);
  // Second sample taken slightly higher, so the two can be differenced below.
  float above = 1.0 - billow(wp + vec2(0.0, 0.065));

  // Wide smoothstep keeps the edges vaporous instead of cutting a silhouette.
  float density = smoothstep(0.40, 0.92, base);

  // Cheap single-scatter: where density thins out going upward we're on a face
  // turned toward the light, so it gets the bright end of the ramp.
  float light = clamp((base - above) * 4.6 + 0.44, 0.0, 1.0);

  // Cluster the bank around the edges, leaving ink behind the headline.
  density *= smoothstep(0.12, 0.64, length(p * vec2(0.76, 1.42)));

  // Dissolve into flat ink before the section ends, so the field is never cut
  // off at the seam with whatever follows.
  density *= smoothstep(0.0, 0.24, uv.y);

  vec3 ink = vec3(0.020, 0.008, 0.031);

  vec3 cloud = vec3(0.086, 0.012, 0.180);                                    // shadowed body
  cloud = mix(cloud, vec3(0.353, 0.055, 0.647), smoothstep(0.00, 0.55, light));
  cloud = mix(cloud, vec3(0.639, 0.208, 0.980), smoothstep(0.45, 0.86, light));
  cloud = mix(cloud, vec3(0.878, 0.647, 1.000), smoothstep(0.82, 1.00, light) * 0.75);

  vec3 col = mix(ink, cloud, clamp(density, 0.0, 1.0));

  // ...and a glow at the cursor itself, strongest where there is cloud to light.
  col += vec3(0.46, 0.16, 0.84) * reach * (0.10 + 0.34 * density);

  // Just enough dither to stop banding on a dark gradient this wide.
  col += (hash(gl_FragCoord.xy * 0.71 + fract(t) * 91.7) - 0.5) * 0.014;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("plume shader failed:", gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function PlumeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return; // CSS fallback underneath stays visible

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), // one oversized triangle
      gl.STATIC_DRAW,
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uPointerOn = gl.getUniformLocation(program, "uPointerOn");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // The field is soft enough that rendering under-resolution is invisible,
    // and it keeps a full-screen 5-octave fBm cheap on integrated graphics.
    const SCALE = 0.62;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const next = {
        w: Math.max(1, Math.floor(canvas.clientWidth * dpr * SCALE)),
        h: Math.max(1, Math.floor(canvas.clientHeight * dpr * SCALE)),
      };
      if (next.w === width && next.h === height) return;
      width = next.w;
      height = next.h;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    };

    // Pointer state. `target` is where the cursor is, `eased` is what the
    // shader sees — it chases the target so the light has weight to it.
    const target = { x: 0, y: 0, on: 0 };
    const eased = { x: 0, y: 0, on: 0 };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const u = (event.clientX - rect.left) / rect.width;
      const v = 1 - (event.clientY - rect.top) / rect.height; // GL's y points up
      target.x = (u - 0.5) * (rect.width / rect.height);
      target.y = v - 0.5;
      target.on = 1;
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    let frame = 0;
    let visible = true;
    let ready = false;
    const start = performance.now();

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;

      resize();

      eased.x += (target.x - eased.x) * 0.07;
      eased.y += (target.y - eased.y) * 0.07;
      eased.on += (target.on - eased.on) * 0.04;
      gl.uniform2f(uPointer, eased.x, eased.y);
      gl.uniform1f(uPointerOn, eased.on);

      // Run the clock at 1.7x: the field should visibly move, not merely drift.
      gl.uniform1f(uTime, reduceMotion ? 18 : ((now - start) / 1000) * 1.7);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!ready) {
        ready = true;
        canvas.dataset.ready = "true";
      }

      // A still frame needs no further work.
      if (reduceMotion) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    frame = requestAnimationFrame(draw);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Stop burning frames once the hero is scrolled past.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible && !frame && !reduceMotion) {
          frame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      frame = 0;
      canvas.dataset.ready = "false"; // reveal the CSS fallback again
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="plume-canvas absolute inset-0 h-full w-full"
    />
  );
}
