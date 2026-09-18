import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import "./vibe-coding-card.css";
import { canvasPoint } from "./story-canvas-geometry";
import { EducationHtmlPreview } from "./EducationHtmlPreview";

export const educationPrompt =
  "做一个培训教务系统：课程管理（课程列表、分类、讲师、学员数与状态，支持搜索排序）、新建课程、课程分类、优惠券与课程套餐；左侧导航含仪表盘、训练营、企业内训、讲师预约、学员管理、报名管理。";

export function VibeCodingCard({ active = true }: { active?: boolean }) {
  const surface = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLElement>(null);
  const coordinates = useRef<SVGSVGElement>(null);
  const [position, setPosition] = useState({ x: 25, y: 460 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    pointerId: number;
    offset: { x: number; y: number };
    element: HTMLButtonElement;
  } | null>(null);
  const bound = (point: { x: number; y: number }) => {
    const width = surface.current?.clientWidth || 1;
    const height = surface.current?.clientHeight || 1;
    const chatWidth =
      ((chat.current?.offsetWidth || width * 0.38) / width) * 1000;
    const chatHeight =
      ((chat.current?.offsetHeight || height * 0.5) / height) * 1000;
    return {
      x: Math.max(15, Math.min(985 - chatWidth, point.x)),
      y: Math.max(15, Math.min(985 - chatHeight, point.y)),
    };
  };
  const stopDrag = () => {
    const current = drag.current;
    drag.current = null;
    if (current?.element.hasPointerCapture(current.pointerId))
      current.element.releasePointerCapture(current.pointerId);
    setDragging(false);
  };
  const beginDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!active || event.button !== 0) return;
    const point = canvasPoint(
      coordinates.current,
      event.clientX,
      event.clientY,
    );
    if (!point) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.focus({ preventScroll: true });
    drag.current = {
      pointerId: event.pointerId,
      offset: { x: point.x - position.x, y: point.y - position.y },
      element: event.currentTarget,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const moveDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!active || !current || current.pointerId !== event.pointerId) return;
    event.stopPropagation();
    const point = canvasPoint(
      coordinates.current,
      event.clientX,
      event.clientY,
    );
    if (point)
      setPosition(
        bound({ x: point.x - current.offset.x, y: point.y - current.offset.y }),
      );
  };
  const moveWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!active) return;
    const directions: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(bound({ x: 25, y: 460 }));
      return;
    }
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const step = event.shiftKey ? 60 : 20;
    setPosition((previous) =>
      bound({
        x: previous.x + direction.x * step,
        y: previous.y + direction.y * step,
      }),
    );
  };
  useEffect(() => {
    if (!active) stopDrag();
  }, [active]);
  useEffect(() => {
    if (!surface.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      setPosition((previous) => bound(previous)),
    );
    observer.observe(surface.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={surface}
      className="vibe-card education-card edu-showcase edu-stacked"
      data-active={active}
    >
      <svg
        className="edu-drag-coordinates"
        ref={coordinates}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      />
      <aside
        className="edu-brief"
        aria-label="用户需求"
        ref={chat}
        data-dragging={dragging}
        style={{ left: `${position.x / 10}%`, top: `${position.y / 10}%` }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <button
          className="edu-chat-title"
          type="button"
          disabled={!active}
          aria-label="拖动 Agent 对话框"
          title="拖动移动；方向键微调，Home 复位"
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={(e) => {
            e.stopPropagation();
            if (drag.current?.pointerId === e.pointerId) stopDrag();
          }}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
          onKeyDown={moveWithKeyboard}
        >
          <span>Agent</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="5" cy="4" r="1" />
            <circle cx="11" cy="4" r="1" />
            <circle cx="5" cy="8" r="1" />
            <circle cx="11" cy="8" r="1" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="11" cy="12" r="1" />
          </svg>
        </button>
        <div className="edu-chat-history">
          <div className="edu-brief-author">
            <span aria-hidden="true">学</span>学员 · 10:42
          </div>
          <p className="edu-brief-message">{educationPrompt}</p>
          <div className="edu-chat-activity">
            <span>
              读取 <b>课程表.xlsx</b>
            </span>
            <span>
              读取 <b>讲师与教室.md</b>
            </span>
            <span>
              思考 <b>6 秒</b>
            </span>
            <p>已生成课程管理、学员管理等 7 个模块，排课冲突检测已启用。</p>
          </div>
        </div>
        <div className="edu-composer" aria-hidden="true">
          <span>继续提要求，例如：加一个成绩导出功能</span>
          <div>
            <span>＋</span>
            <span className="edu-composer-send">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5 M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
      </aside>
      <div
        className="edu-product-window"
        inert={!active ? true : undefined}
        aria-label="教务系统演示"
      >
        <div className="edu-product-canvas">
          <EducationHtmlPreview active={active} />
        </div>
      </div>
    </div>
  );
}
