// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { installContainerFallback } from "../src/lib/containerFallback";

let resized: ResizeObserverCallback;
const observed = new Set<Element>();
let remove: (() => void) | undefined;
beforeEach(() => {
  observed.clear();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: ResizeObserverCallback) {
        resized = callback;
      }
      observe = (element: Element) => observed.add(element);
      unobserve = (element: Element) => observed.delete(element);
      disconnect = () => observed.clear();
    },
  );
});
afterEach(() => {
  remove?.();
  remove = undefined;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});
const resize = (target: Element, width: number, height: number) =>
  resized(
    [{ target, contentRect: { width, height } } as ResizeObserverEntry],
    {} as ResizeObserver,
  );
const units = (element: Element) => {
  const id = element.getAttribute("data-cq-id");
  const rule = [...document.styleSheets]
    .flatMap((sheet) => [...sheet.cssRules] as CSSStyleRule[])
    .find((rule) => rule.selectorText.startsWith(`[data-cq-id="${id}"] > *`));
  return [
    rule?.style.getPropertyValue("--cqw"),
    rule?.style.getPropertyValue("--cqh"),
  ];
};
// MutationObserver records are delivered in a microtask.
const settle = () => Promise.resolve();

it("stays out of the way where container units are native", () => {
  vi.stubGlobal("CSS", { supports: () => true });
  document.body.innerHTML = '<div class="ppt-skill"></div>';
  remove = installContainerFallback();
  expect(remove).toBeUndefined();
  expect(document.querySelector("[data-cq-id]")).toBeNull();
  expect(document.styleSheets.length).toBe(0);
});
it("hands a container's size to its contents, and its breakpoints to itself", () => {
  vi.stubGlobal("CSS", { supports: () => false });
  document.body.innerHTML =
    '<div class="ppt-skill"><p></p></div><div class="story-canvas-board"></div>';
  const [card, board] = document.body.children;
  remove = installContainerFallback();
  expect([...observed]).toEqual([card, board]);
  resize(card, 322, 242);
  expect(units(card)).toEqual(["3.22px", "2.42px"]);
  expect(card.getAttribute("data-cq-max")).toBe("380 400");
  // An inline-size container leaves cqh to the size container around it.
  resize(board, 390, 234);
  expect(units(board)).toEqual(["3.9px", ""]);
  expect(board.getAttribute("data-cq-max")).toBe("400");
  resize(card, 583, 389);
  expect(units(card)).toEqual(["5.83px", "3.89px"]);
  expect(card.getAttribute("data-cq-max")).toBe("");
});
it("adopts containers mounted later and forgets removed ones", async () => {
  remove = installContainerFallback(true);
  const modal = document.createElement("section");
  modal.innerHTML = '<div class="ch-music music-player"></div>';
  const player = modal.firstElementChild!;
  document.body.append(modal);
  await settle();
  expect(observed.has(player)).toBe(true);
  resize(player, 305, 225);
  expect(units(player)).toEqual(["3.05px", "2.25px"]);
  modal.remove();
  await settle();
  expect(observed.has(player)).toBe(false);
  expect(units(player)).toEqual([undefined, undefined]);
});
