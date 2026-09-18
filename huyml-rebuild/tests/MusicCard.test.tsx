// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MusicCard } from "../src/components/MusicCard";
import track from "../src/data/music-demo.json";

let host: HTMLDivElement;
let root: Root;
let paused: WeakMap<HTMLMediaElement, boolean>;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn(() => 1),
  );
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  paused = new WeakMap();
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(
    function () {
      return paused.get(this) ?? true;
    },
  );
  vi.spyOn(HTMLMediaElement.prototype, "duration", "get").mockReturnValue(
    track.duration,
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
  vi.unstubAllGlobals();
});
const render = async (active = true) => {
  await act(async () => root.render(<MusicCard active={active} />));
};
const clickPlay = async () => {
  await act(async () =>
    (host.querySelector(".music-play") as HTMLButtonElement).click(),
  );
};
const mediaTime = async (time: number) => {
  await act(async () => {
    const a = host.querySelector("audio")!;
    a.currentTime = time;
    a.dispatchEvent(new Event("timeupdate"));
  });
};

describe("music card playback", () => {
  it("moves the existing lyric rail continuously and skips long seeks without remounting lines", async () => {
    await render();
    const rail = host.querySelector<HTMLElement>(".music-lyric-rail")!;
    const first = host.querySelector(".music-lyric-current");
    const upcoming = host.querySelector(".music-lyric-next");
    await mediaTime(track.lyrics[1].time);
    expect(host.querySelector(".music-lyric-rail")).toBe(rail);
    expect(host.querySelector(".music-lyric-previous")).toBe(first);
    expect(host.querySelector(".music-lyric-current")).toBe(upcoming);
    expect(rail.dataset.jump).toBe("false");
    expect(rail.style.getPropertyValue("--lyric-index")).toBe("1");
    expect(upcoming?.getAttribute("aria-current")).toBe("true");
    await mediaTime(track.lyrics[30].time);
    expect(rail.dataset.jump).toBe("true");
    expect(rail.style.getPropertyValue("--lyric-index")).toBe("30");
    await mediaTime(track.lyrics[31].time);
    expect(rail.dataset.jump).toBe("false");
    expect(rail.style.getPropertyValue("--lyric-index")).toBe("31");
    await mediaTime(track.lyrics[1].time);
    expect(rail.dataset.jump).toBe("true");
    expect(host.querySelector(".music-lyric-current")).toBe(upcoming);
  });
  it("uses the supplied song and keeps the active Chinese line between its neighbours", async () => {
    await render();
    expect(host.querySelector("audio")?.getAttribute("src")).toBe(
      "/audio/qing-qing-de-hui-ying.mp3",
    );
    expect(host.querySelector(".music-track-info")?.textContent).toContain(
      "轻轻的回应",
    );
    expect(host.querySelector(".music-track-info")?.textContent).toContain(
      "Zora Studio",
    );
    expect(host.querySelector(".music-lyric-translation")).toBeNull();
    expect(host.querySelector(".music-lyric-previous")).toBeNull();
    await mediaTime(track.lyrics[16].time - 0.01);
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "轻轻的回应",
    );
    await mediaTime(track.lyrics[16].time);
    expect(host.querySelector(".music-lyric-previous")?.textContent).toBe(
      "轻轻的回应",
    );
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "我听见了",
    );
    expect(host.querySelector(".music-lyric-next")?.textContent).toBe(
      "小小的声音",
    );
    await mediaTime(track.duration);
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "慢慢发亮",
    );
    expect(host.querySelector(".music-lyric-next")).toBeNull();
    await mediaTime(track.lyrics[1].time);
    expect(host.querySelector(".music-lyric-previous")?.textContent).toBe(
      "揉皱的纸",
    );
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "轻轻摊平",
    );
    expect(host.querySelector(".music-lyric-next")?.textContent).toBe(
      "像我一样",
    );
  });
  it("plays only on request, uses the audio time for lyrics and waveform, and pauses without rewinding", async () => {
    await render();
    const audio = host.querySelector("audio")!;
    expect(audio.paused).toBe(true);
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    await clickPlay();
    expect(
      host.querySelector(".music-player")?.getAttribute("data-playing"),
    ).toBe("true");
    expect(host.querySelector(".music-play")?.getAttribute("aria-label")).toBe(
      "暂停音乐",
    );
    const targetTime = track.lyrics[2].time + 0.1;
    await mediaTime(targetTime);
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "像我一样",
    );
    expect(host.querySelector<HTMLInputElement>("input")?.value).toBe(
      String(targetTime),
    );
    expect(
      host
        .querySelector<HTMLElement>(".music-waveform")
        ?.style.getPropertyValue("--music-progress"),
    ).toBe(`${(targetTime / track.duration) * 100}%`);
    await clickPlay();
    expect(audio.paused).toBe(true);
    expect(audio.currentTime).toBe(targetTime);
    await clickPlay();
    expect(audio.currentTime).toBe(targetTime);
  });
  it("seeks the actual audio and updates the lyric while paused", async () => {
    await render();
    const input = host.querySelector<HTMLInputElement>("input")!;
    const targetTime = track.lyrics[30].time + 0.2;
    await act(async () => {
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )!.set!.call(input, String(targetTime));
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(host.querySelector("audio")!.currentTime).toBe(targetTime);
    expect(host.querySelector("audio")!.paused).toBe(true);
    expect(host.querySelector(".music-lyric-current")?.textContent).toBe(
      "我慢慢抬起头",
    );
  });
  it("pauses on scene changes and does not autoplay when returning", async () => {
    await render();
    await clickPlay();
    await mediaTime(12);
    await render(false);
    expect(host.querySelector("audio")!.paused).toBe(true);
    expect(host.querySelector<HTMLButtonElement>("button")?.disabled).toBe(
      true,
    );
    await render(true);
    expect(host.querySelector("audio")!.paused).toBe(true);
    expect(host.querySelector("audio")!.currentTime).toBe(12);
  });
  it("recovers from a rejected play promise with a retry control", async () => {
    await render();
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(
      new Error("network"),
    );
    await clickPlay();
    expect(host.querySelector('[role="status"]')?.textContent).toContain(
      "点击重试",
    );
    expect(host.querySelector<HTMLButtonElement>("button")?.disabled).toBe(
      false,
    );
    expect(
      host.querySelector(".music-player")?.getAttribute("data-playing"),
    ).toBe("false");
  });
  it("does not resume after a pending play resolves on an inactive card", async () => {
    await render();
    let resolve!: () => void;
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(
      () =>
        new Promise<void>((r) => {
          resolve = r;
        }),
    );
    await clickPlay();
    await render(false);
    await act(async () => {
      resolve();
    });
    expect(host.querySelector("audio")!.paused).toBe(true);
  });
});
