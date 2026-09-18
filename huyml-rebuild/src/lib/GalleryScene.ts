import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "../shaders/gallery.vert?raw";
import fragmentShader from "../shaders/gallery.frag?raw";
import type { Project } from "./types";

/** Editable Three.js scene; the original gallery's authored shader is retained for visual fidelity. */
export class GalleryScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera;
  private group = new THREE.Group();
  private mesh?: THREE.InstancedMesh;
  private material?: THREE.ShaderMaterial;
  private atlas?: THREE.CanvasTexture;
  private target = 18.5;
  private current = 18.5;
  private velocity = 0;
  private count: number;
  private frame = 0;
  private disposed = false;
  private active = -1;
  private hover = -1;
  private pointer = { x: 0, y: 0, valid: false };
  private mouse = new THREE.Vector2();
  private smoothedMouse = new THREE.Vector2();
  private pickTarget = new THREE.WebGLRenderTarget(1, 1);
  private pixel = new Uint8Array(4);
  private resizeObserver: ResizeObserver;
  private drag: {
    x: number;
    y: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null = null;
  private snapTimer = 0;
  private busy = true;
  private suspended = false;
  constructor(
    private host: HTMLDivElement,
    private projects: Project[],
    private onChange: (index: number, progress: number) => void,
    private onOpen: (index: number) => void,
    private onReady: () => void,
    private onSound: (kind: "tick" | "scroll") => void,
    private initialIndex = 0,
  ) {
    this.count = projects.length * Math.ceil(30 / projects.length);
    this.target = (this.count - 1) / 2 - initialIndex;
    this.current = this.target;
    this.camera = new THREE.OrthographicCamera(-10, 10, 5.4, -5.4, 0.1, 1000);
    this.camera.position.set(20, 12.1, 16.6);
    this.camera.lookAt(-7, -2.1, 1.3);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0, 0);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.appendChild(this.renderer.domElement);
    this.scene.add(this.group);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(host);
    this.resize();
    host.addEventListener("pointerdown", this.pointerDown);
    host.addEventListener("pointermove", this.pointerMove);
    host.addEventListener("pointerup", this.pointerUp);
    host.addEventListener("pointercancel", this.pointerCancel);
    host.addEventListener("pointerleave", this.pointerLeave);
    window.addEventListener("wheel", this.wheel, { passive: false });
    window.addEventListener("keydown", this.key);
    void this.load();
  }
  setSuspended(value: boolean) {
    this.suspended = value;
  }
  private resize = () => {
    const w = this.host.clientWidth,
      h = this.host.clientHeight;
    this.camera.left = (-5.4 * w) / h;
    this.camera.right = (5.4 * w) / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };
  private async load() {
    const images = await Promise.all(
      this.projects.map(
        (p) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = p.cover;
          }),
      ),
    );
    if (this.disposed) return;
    const tileW = 512,
      tileH = 412;
    const canvas = document.createElement("canvas");
    canvas.width = tileW;
    canvas.height = tileH * this.projects.length;
    const ctx = canvas.getContext("2d")!;
    images.forEach((img, i) => {
      if (img) ctx.drawImage(img, 0, i * tileH, tileW, tileH);
      else {
        ctx.fillStyle = "#d5d5d5";
        ctx.fillRect(0, i * tileH, tileW, tileH);
      }
    });
    this.atlas = new THREE.CanvasTexture(canvas);
    this.atlas.colorSpace = THREE.NoColorSpace;
    this.atlas.minFilter = THREE.LinearFilter;
    this.atlas.magFilter = THREE.LinearFilter;
    this.atlas.generateMipmaps = false;
    const mobile = window.innerWidth < 1200;
    const width = mobile ? 3 : 4.492,
      height = mobile ? 2 : 3.658;
    const uniforms: Record<string, THREE.IUniform> = {};
    Object.entries({
      uProgress: 0,
      uSplitProgress: 0,
      uPageThickness: 0.01,
      uPageWidth: width,
      uPageHeight: height,
      uMeshCount: this.count,
      uTime: 0,
      uScrollY: this.current,
      uSpeedY: 0,
      uScrollCurve: mobile ? 1.15 : 2.25,
      uPageSpacing: 1,
      uCenterSpacing: 0,
      uFocusRotationX: 0,
      uFocusRotationY: 0,
      uFocusRotationZ: 0,
      uPicking: 0,
      uHoverIndex: -1,
      uHoverLift: 0,
      uHoverIndexOut: -1,
      uHoverLiftOut: 0,
      uCurrentPage: 0,
      uMaxX: 0,
    }).forEach(([k, value]) => (uniforms[k] = { value }));
    uniforms.uAtlas = { value: this.atlas };
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const geometry = new THREE.BoxGeometry(width, height, 0.01, 50, 50, 1);
    const coords = new Float32Array(this.count * 4),
      aspects = new Float32Array(this.count),
      indices = new Float32Array(this.count);
    for (let i = 0; i < this.count; i++) {
      const j = i % images.length;
      coords.set(
        [0, 1, 1 - j / images.length, 1 - (j + 1) / images.length],
        i * 4,
      );
      aspects[i] = tileW / tileH;
      indices[i] = i;
    }
    geometry.setAttribute(
      "aTextureCoords",
      new THREE.InstancedBufferAttribute(coords, 4),
    );
    geometry.setAttribute(
      "aImageAspect",
      new THREE.InstancedBufferAttribute(aspects, 1),
    );
    geometry.setAttribute(
      "aIndex",
      new THREE.InstancedBufferAttribute(indices, 1),
    );
    this.mesh = new THREE.InstancedMesh(geometry, this.material, this.count);
    this.mesh.frustumCulled = false;
    this.mesh.position.set(mobile ? 3.8 : 4.3, 2.1, 5.1);
    this.mesh.rotation.set(-0.0215, 2.2884, 0.2884);
    this.group.add(this.mesh);
    this.onReady();
    this.tick();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap
      .timeline({
        onComplete: () => {
          this.busy = false;
        },
      })
      .to(uniforms.uProgress, {
        value: 1,
        duration: reduced ? 0 : 1.1,
        ease: "power2.inOut",
      })
      .to(
        uniforms.uSplitProgress,
        { value: 1, duration: reduced ? 0 : 0.8, ease: "power3.out" },
        ">-.1",
      )
      .to(
        uniforms.uCenterSpacing,
        { value: 7, duration: reduced ? 0 : 1, ease: "power2.out" },
        "<",
      )
      .to(
        uniforms.uFocusRotationX,
        { value: 0.06681, duration: reduced ? 0 : 1 },
        "<",
      )
      .to(
        uniforms.uFocusRotationY,
        { value: -0.36331, duration: reduced ? 0 : 1 },
        "<",
      )
      .to(
        uniforms.uFocusRotationZ,
        { value: -0.51318, duration: reduced ? 0 : 1 },
        "<",
      );
  }
  private wrapped = (index: number, scroll = this.current) => {
    const half = this.count * 1.01 * 0.5;
    return (
      THREE.MathUtils.euclideanModulo(
        -(index - (this.count - 1) * 0.5) - scroll + half,
        half * 2,
      ) - half
    );
  };
  private nearest() {
    let best = 0,
      d = Infinity;
    for (let i = 0; i < this.count; i++) {
      const v = Math.abs(this.wrapped(i));
      if (v < d) {
        d = v;
        best = i;
      }
    }
    return best;
  }
  select(index: number) {
    if (this.busy) return;
    let best = this.target,
      d = Infinity;
    for (let i = index; i < this.count; i += this.projects.length) {
      const delta = this.wrapped(i, this.target);
      if (Math.abs(delta) < d) {
        d = Math.abs(delta);
        best = this.target + delta;
      }
    }
    this.target = best;
    this.onSound("scroll");
  }
  step(direction: number) {
    if (this.busy || this.suspended) return;
    this.target -= direction;
    this.onSound("scroll");
    this.queueSnap();
  }
  private queueSnap() {
    clearTimeout(this.snapTimer);
    this.snapTimer = window.setTimeout(() => {
      const base = (this.count - 1) / 2;
      this.target = base - Math.round(base - this.target);
    }, 180);
  }
  private wheel = (e: WheelEvent) => {
    if (this.suspended || this.busy || e.ctrlKey) return;
    e.preventDefault();
    let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (e.deltaMode === 1) delta *= 16;
    if (e.deltaMode === 2) delta *= this.host.clientHeight;
    const change = THREE.MathUtils.clamp(delta * 0.0025, -0.65, 0.65);
    this.target -= change;
    this.velocity -= change * 0.5;
    this.queueSnap();
  };
  private key = (e: KeyboardEvent) => {
    if (
      this.suspended ||
      /INPUT|TEXTAREA|BUTTON|A/.test((e.target as HTMLElement)?.tagName)
    )
      return;
    if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) {
      e.preventDefault();
      this.step(1);
    }
    if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault();
      this.step(-1);
    }
    if (e.key === "Enter" && !this.busy) this.onOpen(this.active);
  };
  private pointerDown = (e: PointerEvent) => {
    if (this.suspended || this.busy) return;
    this.drag = {
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    this.host.setPointerCapture(e.pointerId);
  };
  private pointerMove = (e: PointerEvent) => {
    const rect = this.host.getBoundingClientRect();
    this.pointer = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      valid: true,
    };
    this.mouse.set(
      (e.clientX / innerWidth - 0.5) * 2,
      (e.clientY / innerHeight - 0.5) * 2,
    );
    if (this.drag && !this.suspended) {
      const dx = e.clientX - this.drag.x,
        dy = e.clientY - this.drag.y;
      if (
        Math.hypot(e.clientX - this.drag.startX, e.clientY - this.drag.startY) >
        7
      )
        this.drag.moved = true;
      if (this.drag.moved) {
        this.target += (Math.abs(dy) > Math.abs(dx) ? dy : dx) * 0.008;
        this.velocity += (Math.abs(dy) > Math.abs(dx) ? dy : dx) * 0.004;
      }
      this.drag.x = e.clientX;
      this.drag.y = e.clientY;
    }
  };
  private pointerUp = (e: PointerEvent) => {
    if (!this.drag) return;
    const moved = this.drag.moved;
    this.drag = null;
    if (this.host.hasPointerCapture(e.pointerId))
      this.host.releasePointerCapture(e.pointerId);
    if (moved) {
      this.queueSnap();
      return;
    }
    if (this.suspended || this.busy) return;
    const i = this.pick();
    if (i >= 0) {
      const j = i % this.projects.length;
      if (j === this.active) this.onOpen(j);
      else this.select(j);
    }
  };
  private pointerCancel = () => {
    this.drag = null;
    this.queueSnap();
  };
  private pointerLeave = () => {
    this.pointer.valid = false;
    this.setHover(-1);
  };
  private pick() {
    if (!this.material || !this.pointer.valid) return -1;
    const w = this.host.clientWidth,
      h = this.host.clientHeight;
    this.camera.setViewOffset(w, h, this.pointer.x, this.pointer.y, 1, 1);
    this.material.uniforms.uPicking.value = 1;
    this.renderer.setRenderTarget(this.pickTarget);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.renderer.readRenderTargetPixels(
      this.pickTarget,
      0,
      0,
      1,
      1,
      this.pixel,
    );
    this.renderer.setRenderTarget(null);
    this.camera.clearViewOffset();
    this.material.uniforms.uPicking.value = 0;
    return this.pixel[0] - 1;
  }
  private setHover(index: number) {
    if (!this.material || this.hover === index) return;
    this.hover = index;
    this.material.uniforms.uHoverIndex.value = index;
    gsap.to(this.material.uniforms.uHoverLift, {
      value: index < 0 ? 0 : 1,
      duration: 0.65,
      overwrite: true,
    });
    this.host.style.cursor = index < 0 ? "grab" : "pointer";
    if (index >= 0) this.onSound("tick");
  }
  private tick = () => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.tick);
    if (!this.material) return;
    const previous = this.current;
    this.current = THREE.MathUtils.lerp(this.current, this.target, 0.065);
    this.velocity = this.velocity * 0.83 + (this.current - previous) * 0.03;
    const u = this.material.uniforms;
    u.uScrollY.value = this.current;
    u.uSpeedY.value = this.velocity;
    u.uTime.value = performance.now() / 1000;
    this.smoothedMouse.lerp(this.mouse, 0.05);
    this.group.rotation.y = innerWidth < 1200 ? 0 : this.smoothedMouse.x * 0.05;
    const index = this.nearest() % this.projects.length;
    if (index !== this.active) {
      this.active = index;
      this.onChange(index, (this.count - 1) / 2 - this.current);
      if (!this.busy) this.onSound("scroll");
    }
    this.renderer.render(this.scene, this.camera);
    if (
      !this.busy &&
      !this.suspended &&
      !this.drag &&
      this.pointer.valid &&
      Math.abs(this.current - this.target) < 0.05
    )
      this.setHover(this.pick());
  };
  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    clearTimeout(this.snapTimer);
    this.resizeObserver.disconnect();
    this.host.removeEventListener("pointerdown", this.pointerDown);
    this.host.removeEventListener("pointermove", this.pointerMove);
    this.host.removeEventListener("pointerup", this.pointerUp);
    this.host.removeEventListener("pointercancel", this.pointerCancel);
    this.host.removeEventListener("pointerleave", this.pointerLeave);
    window.removeEventListener("wheel", this.wheel);
    window.removeEventListener("keydown", this.key);
    if (this.material) {
      Object.values(this.material.uniforms).forEach((u) =>
        gsap.killTweensOf(u),
      );
      this.material.dispose();
    }
    this.mesh?.geometry.dispose();
    this.atlas?.dispose();
    this.pickTarget.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
