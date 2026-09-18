import { useEffect, useRef, useState } from "react";
import type { Media as MediaItem } from "../lib/types";
import { Modal } from "./Modal";
import { useSound } from "../lib/Sound";
export const vimeoId = (url: string) =>
  url.match(/(?:video\/|vimeo\.com\/)(\d+)/)?.[1] || "";
export function Media({
  item,
  preview = false,
  previewOnHover = false,
  previewSrc,
  unloadOffscreen = false,
  onClick,
}: {
  item: MediaItem;
  preview?: boolean;
  previewOnHover?: boolean;
  previewSrc?: string;
  unloadOffscreen?: boolean;
  onClick?: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!preview);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { enabled } = useSound();
  useEffect(() => {
    if (!preview) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        intersects = entry.isIntersecting;
        update();
      },
      { rootMargin: "160px" },
    );
    if (host.current) io.observe(host.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [preview]);
  const isVideo = item.type === "video";
  return (
    <div
      ref={host}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={"media " + (isVideo ? "video-media" : "")}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      {preview && unloadOffscreen && !visible ? null : isVideo ? (
        <>
          {item.poster && (
            <img
              src={preview ? previewSrc || item.poster : item.poster}
              alt={item.title || ""}
              loading="lazy"
            />
          )}
          {visible && (!preview || !previewOnHover || hovered) && (
            <iframe
              key={String(enabled)}
              title={item.title || "Project video"}
              src={`https://player.vimeo.com/video/${vimeoId(item.src)}?autoplay=1&muted=${preview || !enabled ? 1 : 0}&loop=1&autopause=0&dnt=1&${preview ? "background=1" : "controls=1"}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )}
          {onClick && (
            <button
              className="media-hit"
              onClick={onClick}
              aria-label={"Open " + (item.title || "video")}
            />
          )}
        </>
      ) : failed ? (
        <div className="media-error">Image unavailable</div>
      ) : (
        <>
          <img
            src={preview ? previewSrc || item.src : item.src}
            alt={item.title || "Project design detail"}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
          {onClick && (
            <button
              className="media-hit"
              onClick={onClick}
              aria-label={"Open " + (item.title || "image")}
            />
          )}
        </>
      )}
    </div>
  );
}
export function Lightbox({
  items,
  index,
  onChange,
  onClose,
  language = "en",
}: {
  language?: "en" | "zh";
  items: MediaItem[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const chinese = language === "zh";
  const { play } = useSound();
  const change = (n: number) => {
    play("tick");
    onChange((n + items.length) % items.length);
  };
  const update = useRef(change);
  update.current = change;
  const pos = useRef<number | null>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") update.current(index - 1);
      if (e.key === "ArrowRight") update.current(index + 1);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [index]);
  return (
    <Modal
      onClose={onClose}
      label={items[index]?.title || "Media preview"}
      className="lightbox"
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label={chinese ? "关闭预览" : "Close preview"}
      >
        {chinese ? "关闭" : "Close"} <span>×</span>
      </button>
      {items.length > 1 && (
        <>
          <button
            className="lightbox-prev"
            onClick={() => change(index - 1)}
            aria-label={chinese ? "上一件作品" : "Previous media"}
          >
            {chinese ? "上一件" : "Previous"}
          </button>
          <button
            className="lightbox-next"
            onClick={() => change(index + 1)}
            aria-label={chinese ? "下一件作品" : "Next media"}
          >
            {chinese ? "下一件" : "Next"}
          </button>
        </>
      )}
      <div
        className="lightbox-media"
        onPointerDown={(e) => {
          pos.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (pos.current !== null && Math.abs(e.clientX - pos.current) > 60)
            change(index + (e.clientX < pos.current ? 1 : -1));
          pos.current = null;
        }}
      >
        <Media key={items[index].src} item={items[index]} />
      </div>
      <div className="lightbox-caption">
        {items[index].title}
        {items[index].type === "video" && (
          <a href={items[index].src} target="_blank" rel="noreferrer">
            {chinese ? "在 Vimeo 观看 ↗" : "Watch on Vimeo ↗"}
          </a>
        )}
        <span>
          {String(index + 1).padStart(2, "0")} / {items.length}
        </span>
      </div>
    </Modal>
  );
}
