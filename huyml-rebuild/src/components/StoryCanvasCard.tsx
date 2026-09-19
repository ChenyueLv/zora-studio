import {
  useEffect,
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type CSSProperties,
} from "react";
import {
  boundedPosition,
  canvasPoint,
  connectionPath,
  type CanvasPoint,
} from "./story-canvas-geometry";
import { zoraTv } from "../data/zora-tv";
import "./story-canvas-card.css";
const images = [
  {
    id: "portrait",
    label: "角色原图",
    src: "/story/portrait.webp",
    alt: "角色面部参考图",
    x: 45,
    y: 35,
    width: 240,
  },
  {
    id: "turnaround",
    label: "角色三视图",
    src: "/story/turnaround.webp",
    alt: "同一角色的正面、侧面和背面",
    x: 365,
    y: 35,
    width: 240,
  },
  {
    id: "scene",
    label: "场景分镜",
    src: "/story/scene.webp",
    alt: "角色坐在窗边书桌前使用平板的场景",
    x: 45,
    y: 365,
    width: 240,
  },
];
const position = (point: CanvasPoint) => ({
  left: `${point.x / 10}%`,
  top: `${point.y / 6}%`,
  width: "24%",
});
const initialPositions: Record<string, CanvasPoint> = Object.fromEntries(
  [...images, { id: "video", x: 715, y: 200 }].map((node) => [
    node.id,
    { x: node.x, y: node.y },
  ]),
);
const initialHeights: Record<string, number> = {
  portrait: 275,
  turnaround: 180,
  scene: 180,
  video: 230,
};
function PlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {playing ? (
        <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="3" />
      ) : (
        <path d="m9 5 11 7-11 7Z" fill="currentColor" />
      )}
    </svg>
  );
}

export function StoryCanvasCard({ active = true }: { active?: boolean }) {
  const id = `story-${useId().replace(/:/g, "")}`;
  const video = useRef<HTMLVideoElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const connections = useRef<SVGSVGElement>(null);
  const nodeElements = useRef<Record<string, HTMLElement | null>>({});
  const dotGrid = useRef<SVGSVGElement>(null);
  const spotlight = useRef<SVGCircleElement>(null);
  const enabled = useRef(active);
  const drag = useRef<{
    nodeId: string;
    pointerId: number;
    offset: CanvasPoint;
    element: HTMLElement;
  } | null>(null);
  const [positions, setPositions] = useState(initialPositions);
  const [heights, setHeights] = useState(initialHeights);
  const [dragging, setDragging] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  enabled.current = active;

  const stopDrag = () => {
    const current = drag.current;
    drag.current = null;
    if (current?.element.hasPointerCapture(current.pointerId))
      current.element.releasePointerCapture(current.pointerId);
    setDragging(null);
  };
  useEffect(() => {
    if (!active) {
      video.current?.pause();
      stopDrag();
    }
  }, [active]);
  useEffect(() => {
    const element = video.current;
    return () => element?.pause();
  }, []);
  useLayoutEffect(() => {
    const measure = () => {
      const width = board.current?.clientWidth;
      if (!width) return;
      const next = Object.fromEntries(
        Object.entries(nodeElements.current).map(([key, element]) => [
          key,
          element ? (element.offsetHeight * 1000) / width : initialHeights[key],
        ]),
      );
      setHeights((previous) =>
        Object.keys(next).some(
          (key) => Math.abs(next[key] - previous[key]) > 0.1,
        )
          ? next
          : previous,
      );
      setPositions((previous) =>
        Object.fromEntries(
          Object.entries(previous).map(([key, point]) => [
            key,
            boundedPosition(point, next[key]),
          ]),
        ),
      );
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    if (board.current) observer.observe(board.current);
    Object.values(nodeElements.current).forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const beginDrag = (event: ReactPointerEvent<HTMLElement>, nodeId: string) => {
    if (
      !active ||
      event.button !== 0 ||
      (event.target as Element).closest("button, input, video")
    )
      return;
    const point = canvasPoint(
      connections.current,
      event.clientX,
      event.clientY,
    );
    if (!point) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.focus({ preventScroll: true });
    drag.current = {
      nodeId,
      pointerId: event.pointerId,
      offset: {
        x: point.x - positions[nodeId].x,
        y: point.y - positions[nodeId].y,
      },
      element: event.currentTarget,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(nodeId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const current = drag.current;
    if (!active || !current || current.pointerId !== event.pointerId) return;
    const point = canvasPoint(
      connections.current,
      event.clientX,
      event.clientY,
    );
    if (!point) return;
    const next = boundedPosition(
      { x: point.x - current.offset.x, y: point.y - current.offset.y },
      heights[current.nodeId],
    );
    setPositions((previous) => ({ ...previous, [current.nodeId]: next }));
  };
  const moveWithKeyboard = (
    event: ReactKeyboardEvent<HTMLElement>,
    nodeId: string,
  ) => {
    if (!active || event.target !== event.currentTarget) return;
    const directions: Record<string, CanvasPoint> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    event.stopPropagation();
    const step = event.shiftKey ? 30 : 10;
    setPositions((previous) => ({
      ...previous,
      [nodeId]: boundedPosition(
        {
          x: previous[nodeId].x + direction.x * step,
          y: previous[nodeId].y + direction.y * step,
        },
        heights[nodeId],
      ),
    }));
  };
  const nodeProps = (nodeId: string, label: string) => ({
    ref: (element: HTMLElement | null) => {
      nodeElements.current[nodeId] = element;
    },
    style: position(positions[nodeId]),
    tabIndex: active ? 0 : -1,
    "aria-label": `${label}，可拖动，方向键移动`,
    "data-dragging": dragging === nodeId,
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) =>
      beginDrag(event, nodeId),
    onPointerMove: moveDrag,
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
      if (drag.current?.pointerId === event.pointerId) stopDrag();
    },
    onPointerCancel: stopDrag,
    onLostPointerCapture: stopDrag,
    onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) =>
      moveWithKeyboard(event, nodeId),
  });

  const toggle = async () => {
    const element = video.current;
    if (!element || !active || loading) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setLoading(true);
    setError(false);
    try {
      if (element.ended) element.currentTime = 0;
      await element.play();
      if (!enabled.current) element.pause();
    } catch {
      if (enabled.current) setError(true);
    } finally {
      setLoading(false);
    }
  };
  const seek = (value: number) => {
    if (!active || !video.current || !duration) return;
    video.current.currentTime = value;
    setTime(value);
    setEnded(false);
  };
  const node = (key: string) => ({
    ...positions[key],
    width: 240,
    height: heights[key],
  });
  const links = [
    connectionPath(node("portrait"), node("turnaround")),
    connectionPath(node("turnaround"), node("video"), 0.42),
    connectionPath(node("scene"), node("video"), 0.65),
  ];
  const playLabel = error
    ? "重试播放成片"
    : playing
      ? "暂停成片"
      : ended
        ? "重播成片"
        : "播放成片";

  return (
    <div
      className="story-canvas"
      data-active={active}
      onPointerMove={(event) => {
        if (!active || event.pointerType === "touch") return;
        const point = canvasPoint(
          dotGrid.current,
          event.clientX,
          event.clientY,
        );
        if (!point || !spotlight.current) return;
        spotlight.current.setAttribute("cx", String(point.x));
        spotlight.current.setAttribute("cy", String(point.y));
        spotlight.current.setAttribute(
          "r",
          String(
            Math.max(60, Math.min(140, event.currentTarget.clientWidth * 0.25)),
          ),
        );
        event.currentTarget.dataset.hovered = "true";
      }}
      onPointerLeave={(event) => {
        event.currentTarget.dataset.hovered = "false";
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <svg
        ref={dotGrid}
        className="story-dot-grid"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`${id}-dots`}
            patternUnits="userSpaceOnUse"
            width="16"
            height="16"
          >
            <circle cx="8" cy="8" r="1.1" fill="white" />
          </pattern>
          <radialGradient id={`${id}-spot-gradient`}>
            <stop offset="0%" stopColor="white" />
            <stop offset="30%" stopColor="white" stopOpacity="0.85" />
            <stop offset="75%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask
            id={`${id}-spot-mask`}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <circle
              ref={spotlight}
              cx="0"
              cy="0"
              r="120"
              fill={`url(#${id}-spot-gradient)`}
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-dots)`}
          opacity="0.24"
        />
        <rect
          className="story-dot-highlight"
          width="100%"
          height="100%"
          fill={`url(#${id}-dots)`}
          mask={`url(#${id}-spot-mask)`}
        />
      </svg>
      <div className="story-canvas-board" ref={board}>
        <svg
          ref={connections}
          className="story-connections"
          viewBox="0 0 1000 600"
          aria-hidden="true"
          fill="none"
        >
          <defs>
            <filter
              id={`${id}-soft`}
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1000"
              height="600"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="6" />
            </filter>
            {links.map((d, i) => (
              <mask
                key={i}
                id={`${id}-flow-${i}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1000"
                height="600"
              >
                <path
                  d={d}
                  pathLength="1"
                  className={`story-flow-mask story-flow-${i}`}
                  filter={`url(#${id}-soft)`}
                />
              </mask>
            ))}
          </defs>
          {links.map((d, i) => (
            <g key={i}>
              <path
                d={d}
                className="story-wire"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={d}
                className="story-wire-light"
                mask={`url(#${id}-flow-${i})`}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>
        {images.map((item) => (
          <figure
            key={item.id}
            className={`story-node story-node-${item.id}`}
            {...nodeProps(item.id, item.label)}
          >
            <figcaption>
              {item.label}
              <span className="story-drag-grip" aria-hidden="true">
                ⠿
              </span>
            </figcaption>
            <div className="story-node-media">
              <img src={item.src} alt={item.alt} draggable={false} />
            </div>
          </figure>
        ))}
        <figure
          className="story-node story-node-video"
          {...nodeProps("video", "成片")}
        >
          <figcaption>
            <span>成片</span>
            <span className="story-drag-grip" aria-hidden="true">
              ⠿
            </span>
          </figcaption>
          <div className="story-node-media">
            <video
              ref={video}
              src="/story/story-film.mp4"
              poster="/story/video-poster.jpg"
              preload="none"
              playsInline
              controls={false}
              aria-label="AI 漫剧成片"
              onLoadedMetadata={(event) => {
                const value = event.currentTarget.duration;
                if (Number.isFinite(value)) setDuration(value);
              }}
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onPlay={() => {
                if (!enabled.current) {
                  video.current?.pause();
                  return;
                }
                setStarted(true);
                setPlaying(true);
                setEnded(false);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                setStarted(false);
                setEnded(true);
              }}
              onError={() => {
                setLoading(false);
                setPlaying(false);
                setError(true);
                setStarted(false);
              }}
            />
            {(!started || error) && (
              <button
                className="story-video-play"
                type="button"
                onClick={toggle}
                disabled={!active || loading}
                aria-label={playLabel}
              >
                <span className="story-video-play-icon" aria-hidden="true">
                  <PlaybackIcon playing={false} />
                </span>
                {loading && (
                  <span className="story-video-message" role="status">
                    加载中…
                  </span>
                )}
                {error && (
                  <span className="story-video-message" role="status">
                    加载失败，点击重试
                  </span>
                )}
              </button>
            )}
          </div>
          <div
            className="story-video-controls"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              className="story-video-toggle"
              type="button"
              onClick={toggle}
              disabled={!active || loading}
              aria-label={playLabel}
              title={playLabel}
            >
              <PlaybackIcon playing={playing} />
            </button>
            <input
              className="story-video-seek"
              type="range"
              min="0"
              max={duration || 1}
              step="0.01"
              value={Math.min(time, duration || 1)}
              disabled={!active || !duration}
              aria-label="成片播放进度"
              aria-valuetext={`${Math.floor(time)} 秒，共 ${Math.floor(duration)} 秒`}
              onChange={(event) => seek(Number(event.target.value))}
              style={
                {
                  "--story-video-progress": `${duration ? (time / duration) * 100 : 0}%`,
                } as CSSProperties
              }
            />
          </div>
        </figure>
      </div>
      {/* The demo reproduces our own canvas; its badge opens the real one. */}
      <a
        className="story-canvas-brand"
        href={zoraTv.href}
        target="_blank"
        rel="noopener"
        tabIndex={active ? undefined : -1}
        aria-label={`${zoraTv.name}：我们自研的 AI 画布（新窗口打开）`}
        draggable={false}
      >
        <img src="/zora-tv-icon.svg" alt="" draggable={false} />
        <span>{zoraTv.name}</span>
        <i aria-hidden="true">↗</i>
      </a>
    </div>
  );
}
