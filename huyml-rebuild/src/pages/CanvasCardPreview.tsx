import { useEffect, useState } from "react";
import { CreateCanvasCard } from "../components/CreateCanvasCard";
import "./canvas-card-preview.css";
export function CanvasCardPreview() {
  const [dark, setDark] = useState(true),
    [disabled, setDisabled] = useState(false),
    [clicked, setClicked] = useState(false);
  useEffect(() => {
    document.title = "新建画布创作 · 卡片复刻";
  }, []);
  useEffect(() => {
    if (!clicked) return;
    const t = setTimeout(() => setClicked(false), 1600);
    return () => clearTimeout(t);
  }, [clicked]);
  return (
    <main className="canvas-card-preview" data-theme={dark ? "dark" : "light"}>
      <header>
        <span>卡片交互预览</span>
        <button
          onClick={() => setDark((v) => !v)}
          aria-label={dark ? "切换浅色" : "切换深色"}
        >
          {dark ? "☀ 浅色" : "◐ 深色"}
        </button>
      </header>
      <section className="cc-preview-stage">
        <CreateCanvasCard
          theme={dark ? "dark" : "light"}
          disabled={disabled}
          onClick={() => setClicked(true)}
        />
        <div className="cc-preview-helper">
          <span>点击卡片，新建画布</span>
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            禁用状态
          </label>
        </div>
        <div role="status" className="cc-click-status">
          {clicked ? "点击事件已触发" : ""}
        </div>
      </section>
      <footer></footer>
    </main>
  );
}
