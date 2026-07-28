"use client";

/**
 * CircularGallery — the hub's portfolio wheel. Adapted from the ReactBits
 * "CircularGallery" component (TS-Tailwind variant,
 * github.com/DavidHDev/react-bits): OGL planes arranged on a circular arc,
 * dragged with pointer/touch, each carrying a website screenshot and a small
 * canvas-text caption.
 *
 * House adaptations over the source component:
 *  - Items carry a `link`; a genuine click (short press, <8px travel) resolves
 *    the plane under the pointer and calls `onItemClick(link)`. Drags never
 *    trigger navigation.
 *  - Input is scoped to the gallery: pointer-down starts on the container
 *    (window only tracks move/up mid-drag so the drag survives leaving the
 *    box). The source listened to mousedown/wheel on `window`, which would
 *    hijack the whole page; wheel is deliberately left to the page scroll.
 *  - Landscape planes (25:16) instead of the source's portrait cards, sized
 *    for website screenshots.
 *  - A slow idle drift keeps the wheel alive between interactions (skipped
 *    while dragging; the wrapper swaps the whole gallery for a static strip
 *    under reduced motion).
 *  - The render loop pauses offscreen and while the tab is hidden.
 *  - WebGL failures surface via `onError` so the wrapper can fall back.
 */
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

export type GalleryItem = { image: string; text: string; link: string };

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string,
  color: string,
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = parseInt(font.match(/(\d+)px/)?.[1] ?? "30", 10);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  mesh!: Mesh;

  constructor(
    private gl: GL,
    private plane: Mesh,
    text: string,
    font: string,
    color: string,
  ) {
    const { texture, width, height } = createTextTexture(gl, text, font, color);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.13;
    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.16;
    this.mesh.setParent(this.plane);
  }
}

interface ScreenSize {
  width: number;
  height: number;
}

class Media {
  extra = 0;
  program!: Program;
  plane!: Mesh;
  width!: number;
  widthTotal!: number;
  x!: number;
  isBefore = false;
  isAfter = false;

  constructor(
    private opts: {
      geometry: Plane;
      gl: GL;
      item: GalleryItem;
      index: number;
      length: number;
      scene: Transform;
      screen: ScreenSize;
      viewport: ScreenSize;
      bend: number;
      textColor: string;
      borderRadius: number;
      font: string;
    },
  ) {
    this.createShader();
    this.createMesh();
    new Title(opts.gl, this.plane, opts.item.text, opts.font, opts.textColor);
    this.onResize();
  }

  get link() {
    return this.opts.item.link;
  }

  createShader() {
    const { gl, borderRadius, item } = this.opts;
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uLoaded;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          /* Unloaded planes render as a quiet carbon card, not a black hole. */
          vec4 color = mix(vec4(0.063, 0.063, 0.075, 1.0), texture2D(tMap, uv), uLoaded);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1440, 900] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: borderRadius },
        uLoaded: { value: 0 },
      },
      transparent: true,
    });
    const img = new Image();
    img.src = item.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      this.program.uniforms.uLoaded.value = 1;
    };
  }

  createMesh() {
    this.plane = new Mesh(this.opts.gl, {
      geometry: this.opts.geometry,
      program: this.program,
    });
    this.plane.setParent(this.opts.scene);
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.opts.viewport.width / 2;
    const bend = this.opts.bend;

    if (bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.opts.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(sizes?: { screen: ScreenSize; viewport: ScreenSize }) {
    if (sizes) {
      this.opts.screen = sizes.screen;
      this.opts.viewport = sizes.viewport;
    }
    const { screen, viewport } = this.opts;
    /* Landscape cards (25:16) sized against the container height. */
    const scale = screen.height / 1500;
    this.plane.scale.y = (viewport.height * (820 * scale)) / screen.height;
    this.plane.scale.x = (viewport.width * (1280 * scale)) / screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    const padding = 2;
    this.width = this.plane.scale.x + padding;
    this.widthTotal = this.width * this.opts.length;
    this.x = this.width * this.opts.index;
  }
}

interface AppConfig {
  items: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;
  driftSpeed: number;
  onItemClick?: (link: string) => void;
  onError?: () => void;
}

class App {
  scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  medias: Media[] = [];
  screen!: ScreenSize;
  viewport!: ScreenSize;
  raf = 0;
  running = false;
  inView = true;
  isDown = false;
  start = 0;
  startY = 0;
  downAt = 0;
  moved = 0;
  destroyed = false;

  constructor(
    private container: HTMLElement,
    private config: AppConfig,
  ) {
    this.scroll.ease = config.scrollEase;
    try {
      this.renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      config.onError?.();
      this.destroyed = true;
      return;
    }
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas as HTMLCanvasElement);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();
    /* Lift the wheel: captions hang below the planes, and the arc drops the
       outer cards, so the visual mass reads low without this. */
    this.scene.position.y = 1.05;

    this.onResize();

    const geometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    /* Duplicate the set so the circle loops without a seam. */
    const doubled = config.items.concat(config.items);
    this.medias = doubled.map(
      (item, index) =>
        new Media({
          geometry,
          gl: this.gl,
          item,
          index,
          length: doubled.length,
          scene: this.scene,
          screen: this.screen,
          viewport: this.viewport,
          bend: config.bend,
          textColor: config.textColor,
          borderRadius: config.borderRadius,
          font: config.font,
        }),
    );

    this.addEventListeners();
    this.play();
  }

  /* ---- input ---------------------------------------------------- */

  onDown = (e: MouseEvent | TouchEvent) => {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const point = "touches" in e ? e.touches[0] : e;
    this.start = point.clientX;
    this.startY = point.clientY;
    this.downAt = performance.now();
    this.moved = 0;
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.onUp);
  };

  onMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDown) return;
    const point = "touches" in e ? e.touches[0] : e;
    const distance = (this.start - point.clientX) * (this.config.scrollSpeed * 0.025);
    this.moved = Math.max(
      this.moved,
      Math.abs(point.clientX - this.start),
      Math.abs(point.clientY - this.startY),
    );
    this.scroll.target = this.scroll.position + distance;
  };

  onUp = (e: MouseEvent | TouchEvent) => {
    if (!this.isDown) return;
    this.isDown = false;
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onUp);
    this.onCheck();

    /* Short, still press → open the plane under the pointer. */
    const elapsed = performance.now() - this.downAt;
    if (this.moved < 8 && elapsed < 400 && "clientX" in e) {
      const link = this.hitTest(e.clientX, e.clientY);
      if (link) this.config.onItemClick?.(link);
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this.scroll.target += this.medias[0]?.width ?? 2;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.scroll.target -= this.medias[0]?.width ?? 2;
    }
  };

  /* Screen-space hit test: project each plane's centre and extents. */
  hitTest(clientX: number, clientY: number): string | null {
    const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    for (const media of this.medias) {
      const sx =
        this.screen.width / 2 +
        (media.plane.position.x / (this.viewport.width / 2)) * (this.screen.width / 2);
      const sy =
        this.screen.height / 2 -
        (media.plane.position.y / (this.viewport.height / 2)) * (this.screen.height / 2);
      const sw = (media.plane.scale.x / this.viewport.width) * this.screen.width;
      const sh = (media.plane.scale.y / this.viewport.height) * this.screen.height;
      if (Math.abs(px - sx) < sw / 2 && Math.abs(py - sy) < sh / 2) return media.link;
    }
    return null;
  }

  onCheck() {
    if (!this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize = () => {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias.forEach((media) =>
      media.onResize({ screen: this.screen, viewport: this.viewport }),
    );
  };

  /* ---- loop ------------------------------------------------------ */

  update = () => {
    this.raf = window.requestAnimationFrame(this.update);
    /* Idle drift keeps the wheel slowly turning between interactions. */
    if (!this.isDown && this.config.driftSpeed) {
      this.scroll.target += this.config.driftSpeed;
    }
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
  };

  play() {
    if (this.running || this.destroyed) return;
    this.running = true;
    this.raf = window.requestAnimationFrame(this.update);
  }

  pause() {
    this.running = false;
    window.cancelAnimationFrame(this.raf);
  }

  setInView(v: boolean) {
    this.inView = v;
    if (v && !document.hidden) this.play();
    else this.pause();
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize);
    this.container.addEventListener("mousedown", this.onDown);
    this.container.addEventListener("touchstart", this.onDown, { passive: true });
    this.container.addEventListener("touchmove", this.onMove, { passive: true });
    this.container.addEventListener("touchend", this.onUp);
    this.container.addEventListener("keydown", this.onKeyDown);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.pause();
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onUp);
    this.container.removeEventListener("mousedown", this.onDown);
    this.container.removeEventListener("touchstart", this.onDown);
    this.container.removeEventListener("touchmove", this.onMove);
    this.container.removeEventListener("touchend", this.onUp);
    this.container.removeEventListener("keydown", this.onKeyDown);
    const canvas = this.gl?.canvas as HTMLCanvasElement | undefined;
    if (canvas?.parentNode === this.container) this.container.removeChild(canvas);
    this.gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

export default function CircularGallery({
  items,
  bend = 2.2,
  textColor = "#9a9ba3",
  borderRadius = 0.06,
  font = "italic 500 30px Georgia, serif",
  scrollSpeed = 1.15,
  scrollEase = 0.07,
  driftSpeed = 0.02,
  onItemClick,
  onError,
}: {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  driftSpeed?: number;
  onItemClick?: (link: string) => void;
  onError?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let app: App | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;

    /* Make sure the display face is ready before it's drawn to canvas. */
    const ready = document.fonts?.load ? document.fonts.load(font) : Promise.resolve();
    Promise.resolve(ready)
      .catch(() => undefined)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        app = new App(containerRef.current, {
          items,
          bend,
          textColor,
          borderRadius,
          font,
          scrollSpeed,
          scrollEase,
          driftSpeed,
          onItemClick,
          onError,
        });
        io = new IntersectionObserver(([entry]) => app?.setInView(entry.isIntersecting), {
          rootMargin: "60px",
        });
        io.observe(container);
      });

    const onVisibility = () => {
      if (!app) return;
      if (document.hidden) app.pause();
      else if (app.inView) app.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      app?.destroy();
    };
    // Mount-once: rebuilding a GL scene on prop identity changes would thrash.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="view"
      className="h-full w-full cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
      tabIndex={0}
      role="region"
      aria-label="Portfolio gallery. Use the Left and Right arrow keys to spin, Enter on a listed link below to open."
    />
  );
}
