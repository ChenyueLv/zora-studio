import { zoraTv } from "../data/zora-tv";
import "./zora-tv-badge.css";

/** Marks a demo made on our own canvas and opens the real one; each card places it. */
export function ZoraTvBadge({ active = true }: { active?: boolean }) {
  return (
    <a
      className="zora-tv-badge"
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
  );
}
