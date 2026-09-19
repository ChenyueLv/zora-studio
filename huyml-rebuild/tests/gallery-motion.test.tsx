// @vitest-environment jsdom
import React, { act, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useGalleryMotion } from "../src/lib/useGalleryMotion";

let host: HTMLDivElement, root: Root;
let reduced = false;
function Demo({ enabled = true }: { enabled?: boolean }) {
  const gallery = useRef<HTMLDivElement>(null);
  const captions = useRef<HTMLElement>(null);
  const { position, moveBy } = useGalleryMotion(
    gallery,
    captions,
    5,
    0,
    enabled,
  );
  return (
    <>
      <div ref={gallery} data-gallery data-current={position}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="ch-art-card" />
        ))}
      </div>
      <aside ref={captions}>
        <div data-position={position} />
      </aside>
      <button onClick={() => moveBy(-1)}>Previous</button>
    </>
  );
}
beforeEach(async () => {
  vi.useFakeTimers();
  reduced = false;
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reduced;
    },
  }));
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 16),
  );
  vi.stubGlobal("cancelAnimationFrame", (id: number) =>
    window.clearTimeout(id),
  );
  vi.stubGlobal("innerWidth", 1440);
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => root.render(<Demo />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
const offset = () =>
  Number(
    (host.querySelector(".ch-art-card") as HTMLElement).style.getPropertyValue(
      "--offset",
    ),
  );
const current = () =>
  Number((host.querySelector("[data-gallery]") as HTMLElement).dataset.current);
const wait = (ms: number) =>
  act(async () => {
    vi.advanceTimersByTime(ms);
  });
const wheel = async (deltaY: number, options: WheelEventInit = {}) => {
  const event = new WheelEvent("wheel", {
    deltaY,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  await act(async () => {
    host.querySelector("[data-gallery]")!.dispatchEvent(event);
  });
  return event;
};

it("follows fractional wheel motion, then settles on one whole card", async () => {
  expect((await wheel(100)).defaultPrevented).toBe(true);
  await wait(96);
  expect(offset()).toBeLessThan(0);
  expect(offset()).toBeGreaterThan(-0.28);
  expect(current()).toBe(0);
  await wait(1800);
  expect(current()).toBe(1);
  expect(offset()).toBe(-1);
});
it("accumulates small trackpad events without forcing each event into a new card", async () => {
  for (let i = 0; i < 8; i++) {
    await wheel(12);
    await wait(16);
  }
  await wait(1800);
  expect(current()).toBe(1);
  await wheel(-100);
  await wait(1800);
  expect(current()).toBe(0);
});
it("leaves browser zoom and mobile page scrolling alone", async () => {
  expect((await wheel(100, { ctrlKey: true })).defaultPrevented).toBe(false);
  vi.stubGlobal("innerWidth", 390);
  expect((await wheel(100)).defaultPrevented).toBe(false);
  await wait(1800);
  expect(current()).toBe(0);
});
it("uses a static step with reduced motion and wraps backwards correctly", async () => {
  reduced = true;
  await wheel(100);
  await wait(96);
  expect(offset()).toBe(0);
  await wait(100);
  expect(offset()).toBe(-1);
  await act(async () => {
    host.querySelector("button")!.click();
  });
  await act(async () => {
    host.querySelector("button")!.click();
  });
  expect(current()).toBe(-1);
  expect(offset()).toBe(1);
});
it("cancels a pending gesture when the gallery is disabled", async () => {
  await wheel(100);
  await wait(96);
  await act(async () => root.render(<Demo enabled={false} />));
  await wait(1800);
  expect(current()).toBe(0);
  expect(offset()).toBe(0);
});

const pointer = async (
  type: string,
  x: number,
  y: number,
  { target, pointerType = "touch", time = 0 }: PointerOptions = {},
) => {
  const event = Object.assign(
    new MouseEvent(type, {
      clientX: x,
      clientY: y,
      button: 0,
      buttons: type === "pointerup" ? 0 : 1,
      bubbles: true,
      cancelable: true,
    }),
    { pointerId: 7, isPrimary: true, pointerType },
  );
  Object.defineProperty(event, "timeStamp", { value: time });
  await act(async () => {
    (target ?? host.querySelector("[data-gallery]")!).dispatchEvent(event);
  });
};
type PointerOptions = { target?: Element; pointerType?: string; time?: number };
// jsdom lays nothing out, so a phone-width card falls back to 86vw: 335px here.
const phone = () => vi.stubGlobal("innerWidth", 390);

it("follows a sideways swipe under the finger, then settles on the next card", async () => {
  phone();
  await pointer("pointerdown", 300, 400);
  await pointer("pointermove", 200, 404, { time: 400 });
  expect(offset()).toBeCloseTo(-92 / 335.4, 2);
  expect(current()).toBe(0);
  await pointer("pointerup", 200, 404, { time: 800 });
  await wait(1800);
  expect(current()).toBe(1);
  expect(offset()).toBe(-1);
});
it("returns a short slow swipe, but lets a flick carry the card over", async () => {
  phone();
  await pointer("pointerdown", 300, 400);
  await pointer("pointermove", 270, 400, { time: 400 });
  await pointer("pointerup", 270, 400, { time: 800 });
  await wait(1800);
  expect(current()).toBe(0);
  expect(offset()).toBe(0);
  await pointer("pointerdown", 100, 400, { time: 3000 });
  await pointer("pointermove", 120, 400, { time: 3016 });
  await pointer("pointermove", 145, 400, { time: 3032 });
  await pointer("pointerup", 145, 400, { time: 3040 });
  await wait(1800);
  expect(current()).toBe(-1);
});
it("leaves vertical swipes and a demo's own draggable parts alone", async () => {
  phone();
  await pointer("pointerdown", 300, 400);
  await pointer("pointermove", 296, 460);
  await pointer("pointermove", 120, 470);
  await pointer("pointerup", 120, 470);
  const handle = document.createElement("button");
  host.querySelector(".ch-art-card")!.append(handle);
  // jsdom does not compute touch-action.
  const computed = getComputedStyle;
  vi.stubGlobal("getComputedStyle", (element: Element) =>
    element === handle ? { touchAction: "none" } : computed(element),
  );
  await pointer("pointerdown", 300, 400, { target: handle });
  await pointer("pointermove", 120, 400, { target: handle });
  await pointer("pointerup", 120, 400, { target: handle });
  await wait(1800);
  expect(current()).toBe(0);
  expect(offset()).toBe(0);
});
it("swallows the click that ends a swipe, never a plain tap", async () => {
  phone();
  const button = document.createElement("button");
  const pressed = vi.fn();
  button.addEventListener("click", pressed);
  host.querySelector(".ch-art-card")!.append(button);
  await pointer("pointerdown", 300, 400, { target: button });
  await pointer("pointerup", 300, 400, { target: button });
  await act(async () => button.click());
  expect(pressed).toHaveBeenCalledTimes(1);
  await pointer("pointerdown", 300, 400, { target: button });
  await pointer("pointermove", 150, 400, { target: button });
  await pointer("pointerup", 150, 400, { target: button });
  await act(async () => button.click());
  expect(pressed).toHaveBeenCalledTimes(1);
  await wait(1800);
  expect(current()).toBe(1);
});
it("keeps the desktop arc to the wheel for a mouse, and drags it vertically for touch", async () => {
  vi.stubGlobal("innerHeight", 1000);
  await pointer("pointerdown", 700, 600, { pointerType: "mouse" });
  await pointer("pointermove", 700, 300, { pointerType: "mouse" });
  await pointer("pointerup", 700, 300, { pointerType: "mouse" });
  await wait(1800);
  expect(current()).toBe(0);
  await pointer("pointerdown", 700, 600);
  await pointer("pointermove", 700, 452, { time: 400 });
  expect(offset()).toBeCloseTo(-0.5, 5);
  await pointer("pointerup", 700, 452, { time: 800 });
  await wait(1800);
  expect(current()).toBe(1);
});

it("preserves scrolling inside a demo until its scroll boundary", async () => {
  const panel = document.createElement("div");
  panel.style.overflowY = "auto";
  Object.defineProperties(panel, {
    scrollHeight: { value: 500 },
    clientHeight: { value: 100 },
  });
  host.querySelector("[data-gallery]")!.append(panel);
  const scroll = async () => {
    const event = new WheelEvent("wheel", {
      deltaY: 100,
      bubbles: true,
      cancelable: true,
    });
    await act(async () => {
      panel.dispatchEvent(event);
    });
    return event;
  };
  expect((await scroll()).defaultPrevented).toBe(false);
  await wait(1800);
  expect(current()).toBe(0);
  panel.scrollTop = 400;
  expect((await scroll()).defaultPrevented).toBe(true);
  await wait(1800);
  expect(current()).toBe(1);
});
