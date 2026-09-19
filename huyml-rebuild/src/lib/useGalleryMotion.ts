import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { RefObject } from "react";

const wrap = (value: number, count: number) =>
  ((((value + count / 2) % count) + count) % count) - count / 2;
const captionOpacity = (distance: number) => {
  const stops = [1, 0.24, 0.09, 0];
  const index = Math.min(2, Math.floor(distance));
  return distance >= 3
    ? 0
    : stops[index] + (stops[index + 1] - stops[index]) * (distance - index);
};
/** Below this width the arc lies sideways and is swiped instead of wheeled. */
const SWIPE_LAYOUT = 1000;
const DRAG_SLOP = 8;
type Drag = {
  id: number;
  surface: HTMLElement;
  horizontal: boolean;
  step: number;
  x: number;
  y: number;
  origin: number;
  start: number;
  moved: boolean;
  samples: { time: number; along: number }[];
};

/** Update only transforms while moving; React switches demos at the center. */
export function useGalleryMotion(
  gallery: RefObject<HTMLDivElement | null>,
  descriptions: RefObject<HTMLElement | null>,
  count: number,
  initial: number,
  enabled: boolean,
) {
  const [position, setPosition] = useState(initial);
  const progress = useRef(initial);
  const command = useRef<(value: number, relative: boolean) => void>(() => {});
  const paint = useCallback(() => {
    gallery.current
      ?.querySelectorAll<HTMLElement>(".ch-art-card")
      .forEach((card, index) => {
        const offset = wrap(index - progress.current, count);
        const depth = Math.abs(offset);
        card.style.setProperty("--offset", String(offset));
        card.style.setProperty("--depth", String(depth));
        card.style.setProperty("--curve", String(depth * depth));
        card.style.setProperty(
          "--card-opacity",
          String(
            depth < 1
              ? 1 - depth * 0.7
              : depth < 2
                ? 0.3 - (depth - 1) * 0.245
                : Math.max(0, 0.055 * (1 - (depth - 2) / 0.3)),
          ),
        );
        card.style.zIndex = String(100 - Math.round(depth * 10));
      });
    descriptions.current
      ?.querySelectorAll<HTMLElement>("[data-position]")
      .forEach((caption) => {
        const offset = Number(caption.dataset.position) - progress.current;
        caption.style.setProperty("--caption-offset", String(offset));
        caption.style.setProperty(
          "--caption-opacity",
          String(captionOpacity(Math.abs(offset))),
        );
      });
  }, [gallery, descriptions, count]);

  useLayoutEffect(paint, [paint, position]);

  useEffect(() => {
    if (!enabled) return;
    let target = progress.current;
    let frame = 0;
    let previousTime = 0;
    let settleTimer = 0;
    let gestureStart = Math.round(target);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const surfaces = [gallery.current, descriptions.current];
    const sync = () => {
      paint();
      setPosition(Math.round(progress.current));
    };
    const tick = (time: number) => {
      const dt = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      progress.current +=
        (target - progress.current) *
        (1 - Math.exp(-dt / (settleTimer ? 85 : 125)));
      if (Math.abs(target - progress.current) < 0.001)
        progress.current = target;
      sync();
      if (progress.current !== target) frame = requestAnimationFrame(tick);
      else {
        frame = 0;
        previousTime = 0;
      }
    };
    const animate = () => {
      if (reduced.matches) {
        progress.current = target;
        sync();
      } else if (!frame) frame = requestAnimationFrame(tick);
    };
    const finishGesture = () => {
      settleTimer = 0;
      const distance = target - gestureStart;
      const nearest = Math.round(target);
      target =
        nearest === gestureStart && Math.abs(distance) >= 0.18
          ? gestureStart + Math.sign(distance)
          : nearest;
      animate();
    };
    command.current = (value, relative) => {
      window.clearTimeout(settleTimer);
      settleTimer = 0;
      target = relative ? Math.round(target) + value : value;
      animate();
    };
    const wheel = (event: WheelEvent) => {
      if (
        window.innerWidth <= 1000 ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      )
        return;
      // Let genuinely scrollable controls inside a demo keep their own scroll.
      let element = event.target instanceof HTMLElement ? event.target : null;
      while (element && !surfaces.includes(element)) {
        if (
          /auto|scroll/.test(getComputedStyle(element).overflowY) &&
          element.scrollHeight > element.clientHeight + 1
        ) {
          if (
            (event.deltaY > 0 &&
              element.scrollTop + element.clientHeight <
                element.scrollHeight - 1) ||
            (event.deltaY < 0 && element.scrollTop > 0)
          )
            return;
        }
        element = element.parentElement;
      }
      event.preventDefault();
      if (!settleTimer) gestureStart = Math.round(target);
      window.clearTimeout(settleTimer);
      const pixels =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      target += Math.max(-100, Math.min(100, pixels)) / 360;
      settleTimer = window.setTimeout(finishGesture, 150);
      // Reduced-motion users get a single static step when the gesture ends.
      if (!reduced.matches) animate();
    };
    // Touch has no wheel: a swipe along the arc moves it under the finger, while
    // the cross axis is left to the browser (see touch-action) for page scrolling.
    let drag: Drag | null = null;
    let suppressClick = false;
    const stage = () =>
      gallery.current?.querySelector<HTMLElement>(".ch-stage") ?? null;
    const pointerDown = (event: PointerEvent) => {
      suppressClick = false;
      if (drag || !event.isPrimary || event.button !== 0) return;
      const horizontal = window.innerWidth <= SWIPE_LAYOUT;
      // The desktop arc keeps its wheel and caption clicks for the mouse.
      if (!horizontal && event.pointerType === "mouse") return;
      const surface = event.currentTarget as HTMLElement;
      let element = event.target instanceof Element ? event.target : null;
      if (element?.closest("input, textarea, select")) return;
      // Draggable parts of a demo (touch-action: none) keep their own gesture.
      while (element && element !== surface) {
        if (getComputedStyle(element).touchAction === "none") return;
        element = element.parentElement;
      }
      const card = stage();
      const ratio = card
        ? parseFloat(getComputedStyle(card).getPropertyValue("--ch-step-ratio"))
        : NaN;
      drag = {
        id: event.pointerId,
        surface,
        horizontal,
        step: horizontal
          ? (card?.offsetWidth || window.innerWidth * 0.86) * (ratio || 1)
          : window.innerHeight * 0.28,
        x: event.clientX,
        y: event.clientY,
        origin: 0,
        start: progress.current,
        moved: false,
        samples: [],
      };
    };
    const pointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      // A mouse released outside the surface never reported its pointerup.
      if (!event.buttons) {
        if (drag.moved) pointerEnd(event);
        drag = null;
        return;
      }
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      const along = drag.horizontal ? dx : dy;
      const across = drag.horizontal ? dy : dx;
      if (!drag.moved) {
        if (Math.abs(across) > DRAG_SLOP && Math.abs(across) >= Math.abs(along))
          drag = null;
        if (!drag || Math.abs(along) < DRAG_SLOP) return;
        // Take hold of the arc wherever it currently is, even mid-animation.
        window.clearTimeout(settleTimer);
        settleTimer = 0;
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        drag.moved = true;
        // Only the slop is forgiven, so coarse pointer samples still count.
        drag.origin = Math.sign(along) * DRAG_SLOP;
        drag.start = progress.current;
        try {
          drag.surface.setPointerCapture(event.pointerId);
        } catch {
          // Already released (or no capture support): its events still bubble here.
        }
      }
      drag.samples.push({ time: event.timeStamp, along });
      if (drag.samples.length > 6) drag.samples.shift();
      target = drag.start - (along - drag.origin) / drag.step;
      if (reduced.matches) return;
      progress.current = target;
      sync();
    };
    const pointerEnd = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const current = drag;
      drag = null;
      if (!current.moved) {
        // A tap on a neighbour peeking past the selected card brings it forward.
        const bounds = stage()?.getBoundingClientRect();
        if (
          event.type === "pointerup" &&
          current.horizontal &&
          bounds?.width &&
          current.surface === gallery.current &&
          !(event.target as Element).closest?.(".ch-art-card")
        ) {
          if (event.clientX > bounds.right) command.current(1, true);
          else if (event.clientX < bounds.left) command.current(-1, true);
        }
        return;
      }
      suppressClick = event.type === "pointerup";
      if (current.surface.hasPointerCapture?.(event.pointerId))
        current.surface.releasePointerCapture(event.pointerId);
      const recent = current.samples.filter(
        (sample) => event.timeStamp - sample.time <= 120,
      );
      const velocity =
        event.type === "pointerup" && recent.length > 1
          ? (recent[recent.length - 1].along - recent[0].along) /
            Math.max(1, recent[recent.length - 1].time - recent[0].time)
          : 0;
      // One card per swipe: a flick, or a fifth of the way, carries it over.
      const base = Math.round(current.start);
      const nearest = Math.round(target);
      const next =
        Math.abs(velocity) > 0.3
          ? velocity < 0
            ? Math.ceil(target)
            : Math.floor(target)
          : nearest === base && Math.abs(target - base) >= 0.2
            ? base + Math.sign(target - base)
            : nearest;
      target = Math.max(base - 1, Math.min(base + 1, next));
      animate();
    };
    const click = (event: MouseEvent) => {
      if (!suppressClick) return;
      // The pointer was steering the arc, not pressing what it ended on.
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };
    const nativeDrag = (event: DragEvent) => {
      if (window.innerWidth <= SWIPE_LAYOUT) event.preventDefault();
    };
    surfaces.forEach((surface) => {
      surface?.addEventListener("wheel", wheel, { passive: false });
      surface?.addEventListener("pointerdown", pointerDown);
      surface?.addEventListener("pointermove", pointerMove);
      surface?.addEventListener("pointerup", pointerEnd);
      surface?.addEventListener("pointercancel", pointerEnd);
      surface?.addEventListener("click", click, true);
      surface?.addEventListener("dragstart", nativeDrag);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      surfaces.forEach((surface) => {
        surface?.removeEventListener("wheel", wheel);
        surface?.removeEventListener("pointerdown", pointerDown);
        surface?.removeEventListener("pointermove", pointerMove);
        surface?.removeEventListener("pointerup", pointerEnd);
        surface?.removeEventListener("pointercancel", pointerEnd);
        surface?.removeEventListener("click", click, true);
        surface?.removeEventListener("dragstart", nativeDrag);
      });
      progress.current = Math.round(progress.current);
      command.current = () => {};
      sync();
    };
  }, [enabled, count, gallery, descriptions, paint]);

  const moveBy = useCallback(
    (delta: number) => command.current(delta, true),
    [],
  );
  const moveTo = useCallback(
    (value: number) => command.current(value, false),
    [],
  );
  return { position, moveBy, moveTo };
}
