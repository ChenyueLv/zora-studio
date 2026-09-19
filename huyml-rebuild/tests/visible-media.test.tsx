// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Media } from "../src/components/Media";
import { useVisibleActivity } from "../src/lib/useVisibleActivity";
let host: HTMLDivElement, root: Root;
let notify: (entries: { isIntersecting: boolean }[]) => void;
const disconnect = vi.fn();
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof notify) {
        notify = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const intersect = (visible: boolean) =>
  act(async () => notify([{ isIntersecting: visible }]));
const hide = (hidden: boolean) =>
  act(async () => {
    vi.spyOn(document, "hidden", "get").mockReturnValue(hidden);
    document.dispatchEvent(new Event("visibilitychange"));
  });
function Demo() {
  const { ref, active } = useVisibleActivity<HTMLDivElement>();
  return <div ref={ref} data-active={active} />;
}
it("only runs a demonstration when both its section and tab are visible", async () => {
  await act(async () => root.render(<Demo />));
  expect(host.firstElementChild?.getAttribute("data-active")).toBe("false");
  await intersect(true);
  expect(host.firstElementChild?.getAttribute("data-active")).toBe("true");
  await hide(true);
  expect(host.firstElementChild?.getAttribute("data-active")).toBe("false");
  await hide(false);
  expect(host.firstElementChild?.getAttribute("data-active")).toBe("true");
  await intersect(false);
  await hide(true);
  await hide(false);
  expect(host.firstElementChild?.getAttribute("data-active")).toBe("false");
});
const picture = {
  type: "image",
  title: "Work",
  src: "/original.jpg",
  width: 3000,
  height: 2000,
};
it("loads the thumbnail near the viewport and releases its image element when offscreen", async () => {
  await act(async () =>
    root.render(
      <Media
        item={picture}
        preview
        previewSrc="/thumbnail.webp"
        unloadOffscreen
      />,
    ),
  );
  expect(host.querySelector("img")).toBeNull();
  await intersect(true);
  expect(host.querySelector("img")?.getAttribute("src")).toBe(
    "/thumbnail.webp",
  );
  await intersect(false);
  expect(host.querySelector("img")).toBeNull();
  await intersect(true);
  expect(host.querySelector("img")).not.toBeNull();
  await hide(true);
  expect(host.querySelector("img")).toBeNull();
});
it("uses the full-resolution image in the enlarged preview", async () => {
  await act(async () =>
    root.render(
      <Media item={picture} previewSrc="/thumbnail.webp" unloadOffscreen />,
    ),
  );
  expect(host.querySelector("img")?.getAttribute("src")).toBe("/original.jpg");
});
const clip = {
  type: "video",
  title: "Clip",
  src: "/clip.mp4",
  previewVideo: "/clip-preview.mp4",
  poster: "/clip-cover.webp",
  width: 1080,
  height: 1920,
};
it("plays the light local preview only while a video card is hovered", async () => {
  await act(async () =>
    root.render(
      <Media
        item={clip}
        preview
        previewOnHover
        previewSrc="/clip-thumb.webp"
        unloadOffscreen
      />,
    ),
  );
  await intersect(true);
  const card = host.querySelector(".media")!;
  expect(host.querySelector("img")?.getAttribute("src")).toBe(
    "/clip-thumb.webp",
  );
  expect(host.querySelector("video")).toBeNull();
  await act(async () => {
    card.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  });
  const video = host.querySelector("video")!;
  expect(video.getAttribute("src")).toBe("/clip-preview.mp4");
  expect(video.muted).toBe(true);
  expect(video.hasAttribute("controls")).toBe(false);
  expect(host.querySelector("iframe")).toBeNull();
  await act(async () => {
    card.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
  });
  expect(host.querySelector("video")).toBeNull();
});
it("plays the full local video with controls in the enlarged preview", async () => {
  await act(async () => root.render(<Media item={clip} />));
  const video = host.querySelector("video")!;
  expect(video.getAttribute("src")).toBe("/clip.mp4");
  expect(video.getAttribute("poster")).toBe("/clip-cover.webp");
  expect(video.hasAttribute("controls")).toBe(true);
  expect(host.querySelector("iframe")).toBeNull();
});
it("uses the card ratio in the grid and caps low-resolution videos when enlarged", async () => {
  const song = {
    ...clip,
    previewVideo: undefined,
    cardRatio: "4 / 3",
    maxHeight: 640,
  };
  await act(async () =>
    root.render(<Media item={song} preview previewOnHover unloadOffscreen />),
  );
  await intersect(true);
  const card = host.querySelector<HTMLElement>(".media")!;
  expect(card.style.aspectRatio).toBe("4 / 3");
  await act(async () => {
    card.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  });
  expect(host.querySelector("video")?.getAttribute("src")).toBe("/clip.mp4");
  await act(async () => root.render(<Media item={song} />));
  expect(host.querySelector<HTMLElement>(".media")!.style.aspectRatio).toBe(
    "1080 / 1920",
  );
  expect(
    host
      .querySelector<HTMLElement>("video")!
      .style.getPropertyValue("--media-max-height"),
  ).toBe("640px");
});
