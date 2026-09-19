// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import {
  startTypedHeader,
  observeTypedHeaderGroup,
} from "../src/lib/typedHeader";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("types progressively with a following caret, then settles on the original Chinese and Latin text", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.1);
  const element = document.createElement("span");
  const text = "跟练 AI 工作流";
  const stop = startTypedHeader(element, text);
  expect(element.querySelectorAll(".is-visible")).toHaveLength(0);
  vi.advanceTimersByTime(35);
  expect(element.querySelectorAll(".is-visible")).toHaveLength(1);
  expect(
    element.querySelector(".car-character")?.querySelector(".car-typing-caret"),
  ).not.toBeNull();
  vi.runAllTimers();
  expect(
    [...element.querySelectorAll(".car-character-glyph")]
      .map((node) => node.textContent)
      .join(""),
  ).toBe(text);
  expect(element.querySelector(".car-typing-caret")).toBeNull();
  expect(vi.getTimerCount()).toBe(0);
  stop();
  expect(element.textContent).toBe(text);
});

it("cancels pending typing and scrambling when the section leaves view", () => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0.1);
  const element = document.createElement("span");
  const text = "组合提示词、Skill 与 Agent，形成 SOP";
  const stop = startTypedHeader(element, text);
  vi.advanceTimersByTime(110);
  expect(vi.getTimerCount()).toBeGreaterThan(0);
  stop();
  expect(vi.getTimerCount()).toBe(0);
  expect(element.textContent).toBe(text);
  vi.advanceTimersByTime(5000);
  expect(element.textContent).toBe(text);
});

it("does not accumulate stale animations after repeated starts and cleanups", () => {
  vi.useFakeTimers();
  const element = document.createElement("span");
  for (let i = 0; i < 12; i++) {
    const stop = startTypedHeader(element, "不要求专业或岗位背景", 300);
    vi.advanceTimersByTime(400);
    stop();
    expect(vi.getTimerCount()).toBe(0);
    expect(element.querySelector(".car-character")).toBeNull();
  }
});

it("waits for readable copy, repeats after a reading pause, and clears every timer when hidden or removed", () => {
  vi.useFakeTimers();
  let intersect: (
    entries: { isIntersecting: boolean; intersectionRatio: number }[],
  ) => void = () => {};
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof intersect) {
        intersect = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  const group = document.createElement("ul");
  group.innerHTML =
    '<li class="car-line" aria-label="不要求专业或岗位背景"><span class="car-typed">不要求专业或岗位背景</span></li>';
  const stop = observeTypedHeaderGroup(group);
  intersect([{ isIntersecting: true, intersectionRatio: 0.3 }]);
  expect(vi.getTimerCount()).toBe(0);
  intersect([{ isIntersecting: true, intersectionRatio: 0.8 }]);
  vi.advanceTimersByTime(500);
  expect(group.querySelectorAll(".is-visible").length).toBeGreaterThan(0);
  expect(group.querySelectorAll(".is-visible").length).toBeLessThan(10);
  vi.advanceTimersByTime(4000);
  expect(group.querySelector(".car-typing-caret")).toBeNull();
  expect(
    [...group.querySelectorAll(".car-character-glyph")]
      .map((node) => node.textContent)
      .join(""),
  ).toBe("不要求专业或岗位背景");
  vi.advanceTimersByTime(7500);
  expect(group.querySelectorAll(".is-visible")).toHaveLength(0);
  hidden.mockReturnValue(true);
  document.dispatchEvent(new Event("visibilitychange"));
  expect(vi.getTimerCount()).toBe(0);
  expect(group.textContent).toBe("不要求专业或岗位背景");
  hidden.mockReturnValue(false);
  document.dispatchEvent(new Event("visibilitychange"));
  expect(vi.getTimerCount()).toBeGreaterThan(0);
  intersect([{ isIntersecting: false, intersectionRatio: 0 }]);
  expect(vi.getTimerCount()).toBe(0);
  intersect([{ isIntersecting: true, intersectionRatio: 1 }]);
  stop();
  expect(vi.getTimerCount()).toBe(0);
  expect(disconnect).toHaveBeenCalledOnce();
  vi.unstubAllGlobals();
});
