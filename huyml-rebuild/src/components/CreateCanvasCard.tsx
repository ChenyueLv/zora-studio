import { useId } from "react";
import "./create-canvas-card.css";

const curve =
  "M-56 0L0 0C34.472 0 52.167 16.6919 69.83 33.3837C87.493 50.0756 105.1245 66.7677 139.47 66.7677L175 66.7677";
function FlowLink({ position }: { position: "upper" | "lower" }) {
  const id = "canvas-" + useId().replace(/:/g, "");
  const path = curve;
  return (
    <svg
      className={`cc-link cc-link-${position}`}
      viewBox="0 0 139.47 66.7677"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={id + "-blur"}
          x="-30%"
          y="-50%"
          width="160%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <mask
          id={id + "-mask"}
          maskUnits="userSpaceOnUse"
          x="-70"
          y="-25"
          width="260"
          height="120"
        >
          <path
            className="cc-flow-mask"
            pathLength="1"
            d={path}
            filter={`url(#${id}-blur)`}
          />
        </mask>
      </defs>
      <path className="cc-link-base" d={path} />
      <path className="cc-link-flow" d={path} mask={`url(#${id}-mask)`} />
    </svg>
  );
}
export type CreateCanvasCardProps = {
  label?: string;
  theme?: "light" | "dark";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function CreateCanvasCard({
  label = "新建画布创作",
  theme = "dark",
  disabled = false,
  onClick,
  className = "",
}: CreateCanvasCardProps) {
  return (
    <button
      type="button"
      className={`create-canvas-card ${className}`}
      data-theme={theme}
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      onPointerMove={(event) => {
        if (disabled || event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--mx",
          `${event.clientX - bounds.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--my",
          `${event.clientY - bounds.top}px`,
        );
      }}
    >
      <span className="cc-dot-grid" aria-hidden="true">
        <span className="cc-dot-base" />
        <span className="cc-dot-ripple" />
        <span className="cc-dot-ripple cc-dot-ripple-second" />
        <span className="cc-dot-spotlight" />
      </span>
      <span className="cc-wires" aria-hidden="true">
        {(["left", "right"] as const).map((side) => (
          <span className={`cc-node-group cc-node-group-${side}`} key={side}>
            <FlowLink position="upper" />
            <FlowLink position="lower" />
          </span>
        ))}
      </span>
      <span className="cc-corners" aria-hidden="true">
        {["left", "right"].flatMap((side) =>
          ["upper", "lower"].map((position) => (
            <span
              key={`${side}-${position}`}
              className={`cc-empty-node cc-empty-${side} cc-empty-${position}`}
            />
          )),
        )}
      </span>
      <span className="cc-plus-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M2 12h20"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="cc-label">{label}</span>
    </button>
  );
}
