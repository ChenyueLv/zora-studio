// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { startTypedHeader } from "../src/lib/typedHeader";

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
