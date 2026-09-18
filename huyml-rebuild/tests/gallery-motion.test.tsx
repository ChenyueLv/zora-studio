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
