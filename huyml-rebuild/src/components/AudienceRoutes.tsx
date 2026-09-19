import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useVisibleActivity } from "../lib/useVisibleActivity";
import "./audience-routes.css";

const routes = [
  {
    kind: "starter",
    label: "STARTER",
    title: "0 基础，从这里入门",
    digit: "0",
    lines: [
      "不要求专业或岗位背景",
      "把简单提问升级为清楚的目标与要求",
      "跟练完成第一个 AI 工作流与作品",
    ],
  },
  {
    kind: "advanced",
    label: "ADVANCED",
    title: "想进阶的 AI 使用者",
    digit: "1",
    lines: [
      "把零散技巧串成完整体系",
      "组合提示词、Skill 与 Agent，形成 SOP",
      "拓展网站、智能体、AI 视频与数字人",
    ],
  },
];
const mouthShapes = [
  "M120 40 C180 70 240 96 310 108 C380 118 440 118 500 118 C560 118 620 118 690 108 C760 96 820 70 880 40",
  "M120 40 C230 96 330 118 500 118 C580 118 640 112 690 100 C740 150 720 205 650 205 C590 205 570 150 600 115",
  "M180 100 C230 100 280 100 340 100 C400 100 450 100 500 100 C550 100 600 100 660 100 C720 100 770 100 820 100",
];
const shapes = mouthShapes.map((shape) =>
  shape.match(/-?\d+(\.\d+)?/g)!.map(Number),
);
const mouthPath = (values: number[]) =>
  `M${values[0]} ${values[1]} ` +
  Array.from(
    { length: 4 },
    (_, i) => `C${values.slice(2 + i * 6, 8 + i * 6).join(" ")}`,
  ).join(" ");

export function AudienceRoutes() {
  const { ref, active } = useVisibleActivity<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const root = ref.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !active || reduced) return;
    const eyeWraps = [...root.querySelectorAll<HTMLElement>(".car-eye-wrap")];
    const path = root.querySelector<SVGPathElement>(".car-mouth path")!;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const leave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".car-eye").forEach((eye, index) => {
        gsap.fromTo(
          eye,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: index * 0.1,
            ease: "power3.out",
          },
        );
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 3.2 + index,
            delay: 3 + index * 0.8,
          })
          .to(eye, { scaleY: 0.08, duration: 0.12, ease: "power2.in" })
          .to(eye, { scaleY: 1, duration: 0.12, ease: "power2.out" });
      });
      root.querySelectorAll<HTMLElement>(".car-line").forEach((line, index) => {
        gsap.fromTo(
          line.querySelectorAll(".car-character"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.16,
            stagger: 0.038,
            delay: 0.3 + index * 0.24,
            ease: "none",
          },
        );
      });
      const length = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: 0.4,
          ease: "power3.inOut",
          onComplete: () =>
            gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" }),
        },
      );
    }, root);

    // The text and SVG remain usable even if this browser cannot create WebGL.
    let renderer: THREE.WebGLRenderer | undefined;
    let geometry: THREE.BufferGeometry | undefined;
    let material: THREE.PointsMaterial | undefined;
    let sprite: THREE.CanvasTexture | undefined;
    let scene: THREE.Scene | undefined;
    let camera: THREE.PerspectiveCamera | undefined;
    let positions: Float32Array | undefined;
    const cols = 70,
      rows = 40,
      count = cols * rows;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
      camera.position.set(0, 42, 95);
      camera.lookAt(0, 0, 0);
      positions = new Float32Array(count * 3);
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          const offset = (i * rows + j) * 3;
          positions[offset] = (i / (cols - 1) - 0.5) * 240;
          positions[offset + 2] = (j / (rows - 1) - 0.5) * 130;
        }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const dot = document.createElement("canvas");
      dot.width = dot.height = 32;
      const paint = dot.getContext("2d")!;
      const gradient = paint.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.5, "rgba(255,255,255,.6)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      paint.fillStyle = gradient;
      paint.fillRect(0, 0, 32, 32);
      sprite = new THREE.CanvasTexture(dot);
      material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.1,
        map: sprite,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      scene.add(new THREE.Points(geometry, material));
    } catch {
      renderer?.dispose();
      renderer = undefined;
    }
    const resize = () => {
      if (!renderer || !camera || !root.clientWidth || !root.clientHeight)
        return;
      renderer.setSize(root.clientWidth, root.clientHeight, false);
      camera.aspect = root.clientWidth / root.clientHeight;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();
    const values = [...shapes[0]];
    let elapsed = 0,
      lastFrame = 0;
    const tick = (time: number) => {
      if (time - lastFrame < 1 / 30) return;
      const delta = lastFrame ? Math.min(time - lastFrame, 0.1) : 1 / 30;
      lastFrame = time;
      elapsed += delta;
      const ease = 1 - Math.exp(-delta * 6);
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;
      eyeWraps.forEach((eye) => {
        eye.style.transform = `translate(${mouse.x * 18}px, ${mouse.y * 12}px)`;
      });
      const cycle = elapsed % 13;
      const target = shapes[cycle < 4 ? 0 : cycle < 6 ? 1 : cycle < 10 ? 0 : 2];
      values.forEach((value, i) => {
        values[i] =
          value + (target[i] + Math.sin(elapsed + i * 0.45) * 2 - value) * ease;
      });
      path.setAttribute("d", mouthPath(values));
      if (renderer && scene && camera && geometry && positions) {
        for (let k = 0; k < count; k++) {
          const x = positions[k * 3],
            z = positions[k * 3 + 2];
          const distance = Math.hypot(x - mouse.x * 120, z - mouse.y * 65);
          positions[k * 3 + 1] =
            Math.sin(x * 0.06 + elapsed * 0.7) *
              Math.cos(z * 0.09 + elapsed * 0.5) *
              3 +
            Math.exp((-distance * distance) / 900) *
              9 *
              Math.sin(elapsed * 1.4 - distance * 0.12);
        }
        geometry.attributes.position.needsUpdate = true;
        camera.position.x = mouse.x * 6;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      context.revert();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      observer.disconnect();
      eyeWraps.forEach((eye) => {
        eye.style.transform = "";
      });
      path.setAttribute("d", mouthShapes[0]);
      geometry?.dispose();
      material?.dispose();
      sprite?.dispose();
      renderer?.dispose();
    };
  }, [active, reduced, ref]);

  return (
    <div className="car-stage" ref={ref}>
      <canvas className="car-particles" ref={canvasRef} aria-hidden="true" />
      <div className="car-routes">
        {routes.map((route) => (
          <article className={`car-route car-${route.kind}`} key={route.kind}>
            <div className="car-copy">
              <h3 className="car-eyebrow">
                <span>{route.label}</span> · {route.title}
              </h3>
              <ul className="car-lines">
                {route.lines.map((line) => (
                  <li className="car-line" key={line} aria-label={line}>
                    <span aria-hidden="true">
                      {[...line].map((character, index) => (
                        <span className="car-character" key={index}>
                          {character}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="car-eye-wrap" aria-hidden="true">
              <div className="car-eye">{route.digit}</div>
            </div>
          </article>
        ))}
      </div>
      <div className="car-mouth" aria-hidden="true">
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none">
          <path d={mouthShapes[0]} />
        </svg>
      </div>
    </div>
  );
}
