// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  VibeCodingCard,
  educationPrompt,
} from "../src/components/VibeCodingCard";
let host: HTMLDivElement;
let root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
const render = async (active = true) =>
  act(async () => root.render(<VibeCodingCard active={active} />));
const hover = async () =>
  act(async () =>
    host
      .querySelector(".edu-chat-history")!
      .dispatchEvent(new MouseEvent("mouseover", { bubbles: true })),
  );
const tick = async (ms: number) => act(async () => vi.advanceTimersByTime(ms));

it("always shows the complete output without hover animation", async () => {
  await render();
  await hover();
  await tick(500);
  expect(host.querySelector(".edu-brief-message")?.textContent).toBe(
    educationPrompt,
  );
  expect(host.querySelector(".edu-chat-activity")?.textContent).toContain(
    "排课冲突检测已启用",
  );
  expect(vi.getTimerCount()).toBe(0);
  await render(false);
  expect([...host.querySelectorAll("button")].every((b) => b.disabled)).toBe(
    true,
  );
});

it("only enables the course navigation and always displays courses", async () => {
  await render();
  const buttons = [
    ...host.querySelectorAll<HTMLButtonElement>(".eh-nav button"),
  ];
  expect(buttons.filter((b) => !b.disabled).map((b) => b.textContent)).toEqual([
    "课程",
  ]);
  await act(async () => buttons.forEach((b) => b.click()));
  expect(
    [...host.querySelectorAll(".eh-section-title")].map((el) => el.textContent),
  ).toEqual(["课程", "课程列表"]);
  expect(host.querySelectorAll(".eh-course")).toHaveLength(6);
  expect(document.querySelector('[role="dialog"]')).toBeNull();
});

it("supports bounded keyboard movement and resets the floating chat position", async () => {
  await render();
  const title = host.querySelector<HTMLButtonElement>(".edu-chat-title")!;
  const chat = host.querySelector<HTMLElement>(".edu-brief")!;
  const key = async (value: string, shiftKey = false) =>
    act(async () =>
      title.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: value,
          shiftKey,
        }),
      ),
    );
  await key("ArrowRight");
  expect(chat.style.left).toBe("4.5%");
  await key("ArrowDown");
  expect(chat.style.top).toBe("48%");
  for (let i = 0; i < 30; i++) await key("ArrowRight", true);
  expect(chat.style.left).toBe("60.5%");
  await key("Home");
  expect(chat.style.left).toBe("2.5%");
  expect(chat.style.top).toBe("46%");
});

it("translates pointer movement into card coordinates and releases capture", async () => {
  await render();
  const title = host.querySelector<HTMLButtonElement>(".edu-chat-title")!;
  const chat = host.querySelector<HTMLElement>(".edu-brief")!;
  const svg = host.querySelector<SVGSVGElement>(".edu-drag-coordinates")!;
  Object.assign(svg, {
    getScreenCTM: () => ({
      inverse: () => ({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }),
    }),
  });
  const release = vi.fn();
  Object.assign(title, {
    setPointerCapture: vi.fn(),
    hasPointerCapture: () => true,
    releasePointerCapture: release,
  });
  const pointer = async (type: string, x: number, y: number) =>
    act(async () => {
      const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        button: 0,
        clientX: x,
        clientY: y,
      });
      Object.defineProperty(event, "pointerId", { value: 3 });
      title.dispatchEvent(event);
    });
  await pointer("pointerdown", 20, 240);
  await pointer("pointermove", 70, 220);
  expect(chat.style.left).toBe("12.5%");
  expect(chat.style.top).toBe("42%");
  await pointer("pointerup", 70, 220);
  expect(release).toHaveBeenCalledWith(3);
  expect(chat.dataset.dragging).toBe("false");
});
