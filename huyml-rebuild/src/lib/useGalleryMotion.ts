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
    surfaces.forEach((surface) =>
      surface?.addEventListener("wheel", wheel, { passive: false }),
    );
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      surfaces.forEach((surface) =>
        surface?.removeEventListener("wheel", wheel),
      );
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
