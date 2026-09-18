// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import {
  PptReportSlide,
  retailGrowth,
  categoryGrowth,
} from "../src/components/PptReportSlide";
let host: HTMLDivElement;
let root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  host = document.createElement("div");
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
const render = async (page: number, animated = true) => {
  await act(async () =>
    root.render(<PptReportSlide key={page} page={page} animated={animated} />),
  );
};
const advance = async (ms: number) => {
  await act(async () => vi.advanceTimersByTime(ms));
};
it("plots comparable annual growth values on a fixed zero-based scale, finishing at the correct coordinates", async () => {
  await render(0);
  const initial = host.querySelector("polyline")!.getAttribute("points");
  await advance(1600);
  expect(host.querySelector("polyline")!.getAttribute("points")).not.toBe(
    initial,
  );
  await advance(800);
  const points = host.querySelector("polyline")!.getAttribute("points")!;
  retailGrowth.forEach((v, i) =>
    expect(points).toContain(`${98 + i * 174},${377 - v * 18}`),
  );
  expect(host.textContent).toContain("2025 年同比增速");
  expect(vi.getTimerCount()).toBe(0);
});
it("interpolates category bars to official values, showing the two percentages without confusing percent and percentage points", async () => {
  await render(1);
  expect(host.textContent).toContain("16.0%");
  await advance(2400);
  categoryGrowth.forEach((item) =>
    expect(host.textContent).toContain(`${item.current.toFixed(1)}%`),
  );
  expect(host.textContent).toContain("16.0% → 14.5%");
  expect(host.textContent).toContain("1.5% → 1.9%");
  expect(host.textContent).toContain("6.3% → 4.1%");
});
it("draws the ring to 26.1 percent and shows final values immediately with reduced motion", async () => {
  await render(2);
  expect(
    host.querySelector("circle[pathLength]")!.getAttribute("stroke-dasharray"),
  ).toBe("0 100");
  await advance(2400);
  expect(
    host.querySelector("circle[pathLength]")!.getAttribute("stroke-dasharray"),
  ).toBe("26.1 100");
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  await render(1);
  expect(host.textContent).toContain("14.5%");
  expect(vi.getTimerCount()).toBe(0);
});
it("stops animation timers and restores final content when the slide becomes inactive", async () => {
  await render(1);
  await advance(400);
  await render(1, false);
  expect(vi.getTimerCount()).toBe(0);
  expect(host.textContent).toContain("14.5%");
});
