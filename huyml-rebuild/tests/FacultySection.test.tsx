// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { FacultySection } from "../src/components/FacultySection";
import type { AvatarVoiceEvents } from "../src/lib/avatarVoice";

// The realtime voice service is replaced by a scripted fake; unsupported by
// default so the preset answers stay deterministic.
const voice = vi.hoisted(() => ({
  supported: false,
  asks: [] as string[],
  events: null as AvatarVoiceEvents | null,
  reject: false,
}));
vi.mock("../src/lib/avatarVoice", () => ({
  VoiceError: class extends Error {},
  AvatarVoice: class {
    static supported = () => voice.supported;
    static canRecord = () => false;
    listening = false;
    constructor(events: AvatarVoiceEvents) {
      voice.events = events;
    }
    askText(text: string) {
      voice.asks.push(text);
      return voice.reject
        ? Promise.reject(new Error("offline"))
        : Promise.resolve("turn-" + voice.asks.length);
    }
    setMuted() {}
    interrupt() {}
    stopRecording() {}
    close() {}
  },
}));
vi.mock("../src/lib/avatarFace", () => ({
  AvatarFace: class {
    ready = Promise.resolve();
    motion = true;
    start() {}
    stop() {}
    destroy() {}
    setSpeech() {}
  },
}));

let host: HTMLDivElement, root: Root;
let visibility: (entries: { isIntersecting: boolean }[]) => void;
beforeEach(async () => {
  vi.useFakeTimers();
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof visibility) {
        visibility = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => root.render(<FacultySection />));
  await act(async () => visibility([{ isIntersecting: true }]));
});
afterEach(async () => {
  Object.assign(voice, {
    supported: false,
    asks: [],
    events: null,
    reject: false,
  });
  await act(async () => root.unmount());
  host.remove();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
const click = (selector: string) =>
  act(async () => host.querySelector<HTMLButtonElement>(selector)!.click());

it("can ask directly while the hover collage is opening, including after repeated hover changes", async () => {
  const stage = host.querySelector<HTMLElement>(".ft-stage")!;
  for (let i = 0; i < 12; i++) {
    await act(async () =>
      stage.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })),
    );
    expect(stage.dataset.open).toBe("true");
    await act(async () =>
      stage.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })),
    );
    expect(stage.dataset.open).toBe("false");
  }
  await act(async () =>
    stage.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })),
  );
  await click(".ft-suggestions button");
  expect(stage.dataset.speaking).toBe("true");
  expect(stage.dataset.open).toBe("false");
  await act(async () =>
    stage.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })),
  );
  expect(stage.dataset.open).toBe("false");
});

it("finishes a streaming answer once and releases its timer when the faculty section leaves view", async () => {
  await click(".ft-suggestions button");
  expect(host.querySelector(".ft-stage")?.getAttribute("data-speaking")).toBe(
    "true",
  );
  await act(async () => vi.advanceTimersByTime(90));
  await act(async () => visibility([{ isIntersecting: false }]));
  expect(host.querySelector(".ft-stage")?.getAttribute("data-speaking")).toBe(
    "false",
  );
  expect(host.querySelector(".ft-answer")?.textContent).toContain(
    "零基础可跟练",
  );
  expect(vi.getTimerCount()).toBe(0);
  const completed = host.querySelector(".ft-answer")?.textContent;
  await act(async () => vi.advanceTimersByTime(2000));
  expect(host.querySelector(".ft-answer")?.textContent).toBe(completed);
});

it("retains earlier questions and answers when a new answer streams", async () => {
  await click(".ft-suggestions button");
  await act(async () => vi.advanceTimersByTime(5000));
  const firstAnswer = host.querySelector(".ft-answer")!.textContent;
  await click(".ft-suggestions button:nth-child(2)");
  await act(async () => vi.advanceTimersByTime(90));
  expect(host.querySelectorAll(".ft-chat-turn")).toHaveLength(2);
  expect(host.querySelector(".ft-answer")!.textContent).toBe(firstAnswer);
  expect(host.querySelectorAll(".ft-message-user")[0].textContent).toContain(
    "我 0 基础能学吗？",
  );
  expect(host.querySelectorAll(".ft-message-user")[1].textContent).toContain(
    "第 2 天学什么？",
  );
  await click(".ft-chat-turn:last-child .ft-answer-actions button");
  expect(host.querySelectorAll(".ft-answer")[1].textContent).toContain(
    "第 2 天会学习",
  );
  expect(host.querySelector(".ft-answer")!.textContent).toBe(firstAnswer);
  expect(vi.getTimerCount()).toBe(0);
});

it("lets readers scroll back during streaming and follows again for a new question", async () => {
  const log = host.querySelector<HTMLElement>(".ft-chat")!;
  Object.defineProperties(log, {
    scrollHeight: { configurable: true, value: 1000 },
    clientHeight: { configurable: true, value: 230 },
  });
  await click(".ft-suggestions button");
  expect(log.scrollTop).toBe(1000);
  await act(async () => {
    log.scrollTop = 100;
    log.dispatchEvent(new Event("scroll", { bubbles: true }));
    vi.advanceTimersByTime(90);
  });
  expect(log.scrollTop).toBe(100);
  await act(async () => vi.advanceTimersByTime(5000));
  expect(log.scrollTop).toBe(100);
  await click(".ft-suggestions button:nth-child(2)");
  expect(log.scrollTop).toBe(1000);
});

it("streams a live answer from the voice service and links to the syllabus", async () => {
  voice.supported = true;
  await click(".ft-suggestions button:nth-child(2)");
  expect(voice.asks).toEqual(["第 2 天学什么？"]);
  await act(async () => {
    voice.events!.onDelta("turn-1", "第 2 天上午学 Skill，");
    voice.events!.onDelta("turn-1", "下午学 AIGC。");
  });
  expect(host.querySelector(".ft-answer")!.textContent).toContain(
    "第 2 天上午学 Skill，下午学 AIGC。",
  );
  expect(
    host.querySelector(".ft-answer-actions button")?.textContent,
  ).toContain("停止回答");
  await act(async () => voice.events!.onDone("turn-1"));
  expect(host.querySelector(".ft-answer a")?.getAttribute("href")).toBe(
    "#schedule",
  );
  expect(host.querySelector(".ft-stage")?.getAttribute("data-speaking")).toBe(
    "false",
  );
  // Events for a stale turn are ignored.
  await act(async () => voice.events!.onDelta("turn-1", "迟到的文字"));
  expect(host.querySelector(".ft-answer")!.textContent).not.toContain("迟到");
});

it("falls back to the preset answer when the voice service is unreachable", async () => {
  voice.supported = true;
  voice.reject = true;
  await click(".ft-suggestions button");
  await act(async () => vi.advanceTimersByTime(5000));
  expect(host.querySelector(".ft-answer")!.textContent).toContain(
    "零基础可跟练",
  );
});

it("falls back to the preset answer when the live reply never starts", async () => {
  voice.supported = true;
  await click(".ft-suggestions button");
  await act(async () => vi.advanceTimersByTime(10_000));
  await act(async () => vi.advanceTimersByTime(5000));
  expect(host.querySelector(".ft-answer")!.textContent).toContain(
    "零基础可跟练",
  );
  expect(vi.getTimerCount()).toBe(0);
});

it("keeps a partial live answer when the service errors mid-reply", async () => {
  voice.supported = true;
  await click(".ft-suggestions button");
  await act(async () => voice.events!.onDelta("turn-1", "当然可以，"));
  await act(async () => voice.events!.onError("语音服务暂时不可用"));
  expect(host.querySelector(".ft-answer")!.textContent).toContain("当然可以，");
  expect(host.querySelector(".ft-answer")!.textContent).not.toContain(
    "零基础可跟练",
  );
  expect(host.querySelector(".ft-suggestions button")).not.toHaveProperty(
    "disabled",
    true,
  );
});
