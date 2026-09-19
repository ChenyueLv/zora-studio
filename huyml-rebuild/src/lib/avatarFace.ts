// 小Z 口型与眨眼：只在原画上方的透明画布里重绘嘴、眼两块局部。
// 素材来自 avatar-chat（reference.jpg 坐标系），这里映射到 faculty-avatar.png（900×867）。
const BASE = "/assets/avatar/";
const FACE = { width: 900, height: 867 };
// faculty-avatar.png 是 reference.jpg 缩放 1.04857 后裁掉左上 (261, 239)。
const SCALE = 1.04857,
  OFFSET_X = 261,
  OFFSET_Y = 239;
const POSE = { w: 128, h: 112 };
const MOUTH_STEPS = 65;

type Box = { x: number; y: number; w: number; h: number };
type Rect = [number, number, number, number];
type Manifest = {
  mouths: Box[];
  eyes: [Box, Box][];
  mouthDestination: Rect;
  eyeDestinations: [Rect, Rect];
};

const clamp = (v: number, low = 0, high = 1) =>
  Math.max(low, Math.min(high, v));
const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(src));
    image.src = src;
  });
const makeCanvas = (w: number, h: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
};

// Signed distance to the ink boundary; morphing distances instead of pixels
// avoids gray double outlines between mouth poses.
function inkDistance(pose: HTMLCanvasElement) {
  const { width: w, height: h } = pose;
  const pixels = pose.getContext("2d")!.getImageData(0, 0, w, h).data;
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < mask.length; i++) mask[i] = pixels[i * 4] < 128 ? 1 : 0;
  const distanceTo = (feature: number) => {
    const d = new Float32Array(w * h);
    for (let i = 0; i < d.length; i++) d[i] = mask[i] === feature ? 0 : 1e4;
    const diagonal = Math.SQRT2;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (x) d[i] = Math.min(d[i], d[i - 1] + 1);
        if (y) {
          d[i] = Math.min(d[i], d[i - w] + 1);
          if (x) d[i] = Math.min(d[i], d[i - w - 1] + diagonal);
          if (x + 1 < w) d[i] = Math.min(d[i], d[i - w + 1] + diagonal);
        }
      }
    for (let y = h - 1; y >= 0; y--)
      for (let x = w - 1; x >= 0; x--) {
        const i = y * w + x;
        if (x + 1 < w) d[i] = Math.min(d[i], d[i + 1] + 1);
        if (y + 1 < h) {
          d[i] = Math.min(d[i], d[i + w] + 1);
          if (x) d[i] = Math.min(d[i], d[i + w - 1] + diagonal);
          if (x + 1 < w) d[i] = Math.min(d[i], d[i + w + 1] + diagonal);
        }
      }
    return d;
  };
  const toInk = distanceTo(1),
    toPaper = distanceTo(0);
  return toInk.map((distance, i) =>
    mask[i] ? toPaper[i] - 0.5 : 0.5 - distance,
  );
}

function tweenPoses(poses: HTMLCanvasElement[], steps: number) {
  const distances = poses.map(inkDistance);
  return Array.from({ length: steps }, (_, step) => {
    if (step === 0) return poses[0];
    if (step === steps - 1) return poses[poses.length - 1];
    const position = (step / (steps - 1)) * (poses.length - 1);
    const lo = Math.floor(position),
      mix = position - lo;
    const a = distances[lo],
      b = distances[Math.min(lo + 1, distances.length - 1)];
    const canvas = makeCanvas(POSE.w, POSE.h),
      ctx = canvas.getContext("2d")!;
    const data = ctx.createImageData(POSE.w, POSE.h);
    for (let i = 0; i < a.length; i++) {
      const distance = a[i] * (1 - mix) + b[i] * mix;
      const value = Math.round(254 * (1 - clamp(distance + 0.5)));
      data.data[i * 4] = data.data[i * 4 + 1] = data.data[i * 4 + 2] = value;
      data.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(data, 0, 0);
    return canvas;
  });
}

const toFace = ([x, y, w, h]: Rect): Rect => [
  x * SCALE - OFFSET_X,
  y * SCALE - OFFSET_Y,
  w * SCALE,
  h * SCALE,
];

export class AvatarFace {
  private ctx: CanvasRenderingContext2D | null;
  private mouths: HTMLCanvasElement[] = [];
  private eyes: HTMLCanvasElement[][] = [];
  private manifest?: Manifest;
  private target = 0;
  private amount = 0;
  private last = 0;
  private started = performance.now();
  private raf = 0;
  private running = false;
  private destroyed = false;
  private drawn = false;
  motion = true;
  readonly ready: Promise<void>;

  constructor(private canvas: HTMLCanvasElement) {
    canvas.width = FACE.width;
    canvas.height = FACE.height;
    this.ctx = canvas.getContext("2d");
    this.ready = this.ctx
      ? this.load()
      : Promise.reject(new Error("canvas unsupported"));
  }

  private async load() {
    const [reference, mouths, eyes, manifest] = await Promise.all([
      loadImage(BASE + "reference.jpg"),
      loadImage(BASE + "mouth-atlas.png"),
      loadImage(BASE + "eye-atlas.png"),
      fetch(BASE + "avatar.json").then((r) => {
        if (!r.ok) throw new Error("avatar.json");
        return r.json() as Promise<Manifest>;
      }),
    ]);
    const prepare = (atlas: HTMLImageElement, boxes: Box[], rest: Rect) =>
      boxes.map((box, index) => {
        const frame = makeCanvas(POSE.w, POSE.h),
          ctx = frame.getContext("2d")!;
        ctx.fillStyle = "#fefefe";
        ctx.fillRect(0, 0, POSE.w, POSE.h);
        // The rest pose is cut from the original pixels, never regenerated.
        if (index === 0)
          ctx.drawImage(reference, ...rest, 0, 0, POSE.w, POSE.h);
        else
          ctx.drawImage(
            atlas,
            box.x,
            box.y,
            box.w,
            box.h,
            0,
            0,
            POSE.w,
            POSE.h,
          );
        return frame;
      });
    if (this.destroyed) return;
    this.manifest = manifest;
    this.mouths = tweenPoses(
      prepare(mouths, manifest.mouths, manifest.mouthDestination),
      MOUTH_STEPS,
    );
    this.eyes = manifest.eyeDestinations.map((destination, side) =>
      prepare(
        eyes,
        manifest.eyes.map((pair) => pair[side]),
        destination,
      ),
    );
  }

  /** Playback loudness 0–1; drives how far the mouth opens. */
  setSpeech(value: number) {
    this.target = clamp(Number.isFinite(value) ? value : 0);
  }

  start() {
    if (this.running || this.destroyed || !this.ctx) return;
    this.running = true;
    this.last = 0;
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.amount = this.target = 0;
    this.clear();
  }

  destroy() {
    this.destroyed = true;
    this.stop();
  }

  private clear() {
    if (!this.drawn || !this.ctx) return;
    this.ctx.clearRect(0, 0, FACE.width, FACE.height);
    this.drawn = false;
  }

  private blinkAt(t: number) {
    const phase = (((t % 4.9) + 4.9) % 4.9) - 2.65;
    if (phase < 0 || phase > 0.245) return 0;
    if (phase < 0.085) return Math.sin(((phase / 0.085) * Math.PI) / 2);
    if (phase < 0.112) return 1;
    return Math.cos((((phase - 0.112) / 0.133) * Math.PI) / 2);
  }

  private drawPose(
    poses: HTMLCanvasElement[],
    progress: number,
    destination: Rect,
    topClip = 0,
  ) {
    const index = Math.round(clamp(progress) * (poses.length - 1));
    const [x, y, w, h] = toFace(destination);
    const clip = topClip * SCALE;
    this.ctx!.drawImage(
      poses[index],
      0,
      topClip,
      POSE.w,
      POSE.h - topClip,
      x,
      y + clip,
      w,
      h - clip,
    );
    this.drawn = true;
  }

  private tick(now: number) {
    if (!this.running) return;
    const dt = this.last ? Math.min((now - this.last) / 1000, 0.06) : 1 / 60;
    this.last = now;
    const tau = this.target > this.amount ? 0.025 : 0.042;
    this.amount += (this.target - this.amount) * (1 - Math.exp(-dt / tau));
    if (this.target === 0 && this.amount < 0.004) this.amount = 0;
    const blink = this.motion ? this.blinkAt((now - this.started) / 1000) : 0;
    this.clear();
    if (this.manifest && this.mouths.length) {
      if (this.amount > 0.002)
        this.drawPose(this.mouths, this.amount, this.manifest.mouthDestination);
      if (blink > 0.001)
        this.eyes.forEach((poses, side) =>
          this.drawPose(
            poses,
            blink,
            this.manifest!.eyeDestinations[side],
            side === 0 ? 12 : 20,
          ),
        );
    }
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }
}
