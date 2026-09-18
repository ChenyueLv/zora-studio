// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StoryCanvasCard } from "../src/components/StoryCanvasCard";

let host: HTMLDivElement;
let root: Root;
let paused: WeakMap<HTMLMediaElement, boolean>;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  paused = new WeakMap();
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(
    function () {
      return paused.get(this) ?? true;
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function () {
    paused.set(this, false);
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function () {
    paused.set(this, true);
    this.dispatchEvent(new Event("pause"));
  });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.restoreAllMocks();
});
const render = async (active = true) => {
  await act(async () => root.render(<StoryCanvasCard active={active} />));
};
const play = async () => {
  await act(async () =>
    host.querySelector<HTMLButtonElement>(".story-video-toggle")!.click(),
  );
};

describe("story canvas playback", () => {
  it("loads only a poster initially, plays on request, and pauses when the card is left", async () => {
    await render();
    const video = host.querySelector("video")!;
    expect(video.getAttribute("preload")).toBe("none");
    expect(video.poster).toContain("/story/video-poster.jpg");
    expect(video.controls).toBe(false);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    await play();
    expect(video.paused).toBe(false);
    expect(video.controls).toBe(false);
    expect(host.querySelector(".story-video-play")).toBeNull();
    video.currentTime = 12;
    await render(false);
    expect(video.paused).toBe(true);
    await render(true);
    expect(video.paused).toBe(true);
    expect(video.currentTime).toBe(12);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  });
  it("provides a usable retry when playback is rejected", async () => {
    await render();
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(
      new Error("network"),
    );
    await play();
    expect(host.querySelector('[role="status"]')?.textContent).toContain(
      "点击重试",
    );
    expect(
      host.querySelector<HTMLButtonElement>(".story-video-play")!.disabled,
    ).toBe(false);
    await play();
    expect(host.querySelector("video")!.paused).toBe(false);
    expect(host.querySelector('[role="status"]')).toBeNull();
  });
  it("does not resume if an outstanding play request completes on an inactive card", async () => {
    await render();
    let resolve!: () => void;
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(
      () =>
        new Promise<void>((r) => {
          resolve = r;
        }),
    );
    await play();
    await render(false);
    await act(async () => {
      resolve();
    });
    expect(host.querySelector("video")!.paused).toBe(true);
    expect(
      host.querySelector<HTMLButtonElement>(".story-video-play")!.disabled,
    ).toBe(true);
  });
  it("offers replay after the film ends and resets the media position", async () => {
    await render();
    await play();
    const video = host.querySelector("video")!;
    await act(async () => {
      video.currentTime = 44.23;
      paused.set(video, true);
      video.dispatchEvent(new Event("ended"));
    });
    vi.spyOn(video, "ended", "get").mockReturnValue(true);
    expect(host.querySelector(".story-video-play")).not.toBeNull();
    await play();
    expect(video.currentTime).toBe(0);
    expect(video.controls).toBe(false);
  });
});

describe("compact player controls", () => {
  it("keeps pause available after playback starts and synchronizes seeking", async () => {
    await render();
    const video = host.querySelector("video")!;
    vi.spyOn(video, "duration", "get").mockReturnValue(44.23);
    await act(async () => video.dispatchEvent(new Event("loadedmetadata")));
    await play();
    const toggle = host.querySelector<HTMLButtonElement>(
      ".story-video-toggle",
    )!;
    expect(toggle.getAttribute("aria-label")).toBe("暂停成片");
    expect(toggle.disabled).toBe(false);
    await act(async () => {
      video.currentTime = 10;
      video.dispatchEvent(new Event("timeupdate"));
    });
    const range = host.querySelector<HTMLInputElement>(".story-video-seek")!;
    expect(range.value).toBe("10");
    await act(async () => {
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )!.set!.call(range, "22");
      range.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(video.currentTime).toBe(22);
    await play();
    expect(video.paused).toBe(true);
    expect(toggle.getAttribute("aria-label")).toBe("播放成片");
    await play();
    expect(video.paused).toBe(false);
    expect(video.currentTime).toBe(22);
  });
});

// Exercise dragging through a scaled, rotated canvas, matching the Hero card.
const angle = (-6 * Math.PI) / 180;
const scale = 0.6;
const screen = (x: number, y: number) => ({
  clientX: 100 + scale * (Math.cos(angle) * x - Math.sin(angle) * y),
  clientY: 70 + scale * (Math.sin(angle) * x + Math.cos(angle) * y),
});
const pointer = async (target: Element, type: string, x: number, y: number) => {
  await act(async () =>
    target.dispatchEvent(
      Object.assign(new Event(type, { bubbles: true }), {
        ...screen(x, y),
        button: 0,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }),
    ),
  );
};
describe("draggable canvas nodes", () => {
  beforeEach(() => {
    const a = Math.cos(angle) / scale;
    const b = -Math.sin(angle) / scale;
    const c = Math.sin(angle) / scale;
    const d = Math.cos(angle) / scale;
    Object.defineProperty(SVGElement.prototype, "getScreenCTM", {
      configurable: true,
      value: () => ({
        inverse: () => ({
          a,
          b,
          c,
          d,
          e: -a * 100 - c * 70,
          f: -b * 100 - d * 70,
        }),
      }),
    });
    const captures = new WeakMap<HTMLElement, number>();
    Object.defineProperties(HTMLElement.prototype, {
      setPointerCapture: {
        configurable: true,
        value: function (id: number) {
          captures.set(this, id);
        },
      },
      hasPointerCapture: {
        configurable: true,
        value: function (id: number) {
          return captures.get(this) === id;
        },
      },
      releasePointerCapture: {
        configurable: true,
        value: function () {
          captures.delete(this);
        },
      },
    });
  });
  afterEach(() => {
    for (const key of [
      "setPointerCapture",
      "hasPointerCapture",
      "releasePointerCapture",
    ]) {
      Reflect.deleteProperty(HTMLElement.prototype, key);
    }
    Reflect.deleteProperty(SVGElement.prototype, "getScreenCTM");
  });
  it.each(["portrait", "turnaround", "scene", "video"])(
    "moves %s with its links without restarting the flow",
    async (id) => {
      await render();
      const node = host.querySelector<HTMLElement>(`.story-node-${id}`)!;
      const x = parseFloat(node.style.left) * 10;
      const y = parseFloat(node.style.top) * 6;
      const paths = [...host.querySelectorAll(".story-wire")].map((p) =>
        p.getAttribute("d"),
      );
      const flow = host.querySelector(".story-flow-mask");
      await pointer(node, "pointerdown", x + 20, y + 20);
      await pointer(node, "pointermove", x + 40, y + 50);
      expect(parseFloat(node.style.left)).toBeCloseTo((x + 20) / 10);
      expect(parseFloat(node.style.top)).toBeCloseTo((y + 30) / 6);
      expect(
        [...host.querySelectorAll(".story-wire")].map((p) =>
          p.getAttribute("d"),
        ),
      ).not.toEqual(paths);
      expect(host.querySelector(".story-flow-mask")).toBe(flow);
      await pointer(node, "pointerup", x + 40, y + 50);
      expect(node.hasPointerCapture(1)).toBe(false);
      expect(node.dataset.dragging).toBe("false");
    },
  );
  it("clamps nodes to the board and stops dragging after cancellation", async () => {
    await render();
    const node = host.querySelector<HTMLElement>(".story-node-portrait")!;
    await pointer(node, "pointerdown", 50, 40);
    await pointer(node, "pointermove", 3000, 3000);
    expect(node.style.left).toBe("75%");
    expect(node.style.top).toBe("52.5%");
    await pointer(node, "pointercancel", 3000, 3000);
    await pointer(node, "pointermove", 0, 0);
    expect(node.style.left).toBe("75%");
    expect(node.dataset.dragging).toBe("false");
  });
  it("does not drag from playback controls or while inactive", async () => {
    await render();
    const node = host.querySelector<HTMLElement>(".story-node-video")!;
    const original = node.style.cssText;
    const toggle = host.querySelector(".story-video-toggle")!;
    await pointer(toggle, "pointerdown", 740, 300);
    await pointer(toggle, "pointermove", 840, 300);
    expect(node.style.cssText).toBe(original);
    await render(false);
    await pointer(node, "pointerdown", 740, 210);
    await pointer(node, "pointermove", 640, 210);
    expect(node.style.cssText).toBe(original);
  });
});
