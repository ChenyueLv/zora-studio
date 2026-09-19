import { useEffect, useRef } from "react";
import gsap from "gsap";
import { observeTypedHeaderGroup } from "../lib/typedHeader";
import { audienceMouthPath, restingMouthPath } from "../lib/audienceMouth";
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
// Particle Wave Field settings from the supplied particle-wave.html.
const particleWave = {
  color: 0xffffff,
  opacity: 1,
  size: 1.35,
  cols: 110,
  rows: 60,
  width: 240,
  height: 130,
  waveAmp: 3,
  rippleAmp: 9,
  rippleRadius: 900,
  speed: 0.012,
};

export function AudienceRoutes() {
  const { ref, active } = useVisibleActivity<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced || !ref.current) return;
    const stops = [
      ...ref.current.querySelectorAll<HTMLElement>(".car-lines"),
    ].map(observeTypedHeaderGroup);
    return () => stops.forEach((stop) => stop());
  }, [reduced, ref]);

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
    const { cols, rows, width, height } = particleWave;
    const count = cols * rows;
    const waveMouse = { x: 0, y: 0 };
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
      camera.position.set(0, 42, 95);
      camera.lookAt(0, 0, 0);
      positions = new Float32Array(count * 3);
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          const offset = (i * rows + j) * 3;
          positions[offset] = (i / (cols - 1) - 0.5) * width;
          positions[offset + 2] = (j / (rows - 1) - 0.5) * height;
        }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const dot = document.createElement("canvas");
      dot.width = dot.height = 64;
      const paint = dot.getContext("2d")!;
      const gradient = paint.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.5, "rgba(255,255,255,.6)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      paint.fillStyle = gradient;
      paint.fillRect(0, 0, 64, 64);
      sprite = new THREE.CanvasTexture(dot);
      material = new THREE.PointsMaterial({
        color: particleWave.color,
        size: particleWave.size,
        sizeAttenuation: true,
        map: sprite,
        alphaMap: sprite,
        transparent: true,
        opacity: particleWave.opacity,
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
    let elapsed = 0,
      lastFrame = 0,
      lastParticleFrame = 0;
    let previousMouth = restingMouthPath;
    const tick = (time: number) => {
      const delta = lastFrame ? Math.min(time - lastFrame, 0.1) : 1 / 60;
      lastFrame = time;
      elapsed += delta;
      const ease = 1 - Math.exp(-delta * 6);
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;
      eyeWraps.forEach((eye) => {
        eye.style.transform = `translate(${mouse.x * 18}px, ${mouse.y * 12}px)`;
      });
      const mouth = audienceMouthPath(elapsed);
      if (mouth !== previousMouth) {
        path.setAttribute("d", mouth);
        previousMouth = mouth;
      }
      if (
        renderer &&
        scene &&
        camera &&
        geometry &&
        positions &&
        elapsed - lastParticleFrame >= 1 / 30
      ) {
        const particleDelta = elapsed - lastParticleFrame;
        lastParticleFrame = elapsed;
        // Match the source's 60 Hz timing while rendering only visible frames.
        const phase = elapsed * particleWave.speed * 60;
        const pointerEase = 1 - Math.pow(0.95, particleDelta * 60);
        waveMouse.x += (mouse.targetX - waveMouse.x) * pointerEase;
        waveMouse.y += (mouse.targetY - waveMouse.y) * pointerEase;
        for (let k = 0; k < count; k++) {
          const x = positions[k * 3],
            z = positions[k * 3 + 2];
          const distance = Math.hypot(
            x - waveMouse.x * width * 0.5,
            z - waveMouse.y * height * 0.5,
          );
          positions[k * 3 + 1] =
            Math.sin(x * 0.06 + phase) *
              Math.cos(z * 0.09 + phase * 0.7) *
              particleWave.waveAmp +
            Math.exp((-distance * distance) / particleWave.rippleRadius) *
              particleWave.rippleAmp *
              Math.sin(phase * 2 - distance * 0.12);
        }
        geometry.attributes.position.needsUpdate = true;
        camera.position.x +=
          (waveMouse.x * 6 - camera.position.x) *
          (1 - Math.pow(0.96, particleDelta * 60));
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
      path.setAttribute("d", restingMouthPath);
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
                    <span
                      className="car-typed"
                      aria-hidden="true"
                      translate="no"
                    >
                      {line}
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
          <path d={restingMouthPath} />
        </svg>
      </div>
    </div>
  );
}
