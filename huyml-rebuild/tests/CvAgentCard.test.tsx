// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CvAgentCard } from "../src/components/CvAgentCard";
import { interviewDemos, DEMO_DURATION } from "../src/data/cv-agent-demo";

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
const render = async (active = true) => {
  await act(async () => root.render(<CvAgentCard active={active} />));
};
const click = async (selector = ".cv-play") => {
  await act(async () =>
    host.querySelector<HTMLButtonElement>(selector)!.click(),
  );
};
const advance = async (ms: number) => {
  await act(async () => vi.advanceTimersByTime(ms));
};
const question = () => host.querySelector(".cv-question")?.textContent;
const running = () =>
  host.querySelector(".cv-agent")?.getAttribute("data-running");
const expectCase = (index: number, bilingual = true) => {
  const demo = interviewDemos[index];
  expect(question()).toBe(bilingual ? demo.english.question : demo.question);
  (bilingual ? demo.english.answer : demo.answer).forEach((line) => {
    expect(host.querySelector(".cv-answer")?.textContent).toContain(line.text);
  });
  expect(host.querySelector(".cv-context")?.textContent).toContain(
    demo.context,
  );
  expect(host.querySelector(".cv-page")?.textContent).toContain(
    `0${index + 1}`,
  );
};

describe("CV Agent streaming carousel", () => {
  it("removes playback controls and the requested explanatory copy", async () => {
    await render();
    expect(host.querySelector(".cv-play")).toBeNull();
    expect(host.querySelector(".cv-play-time")).toBeNull();
    expect(host.querySelector(".cv-next")).toBeNull();
    expect(host.textContent).not.toContain("英文转写");
    expect(host.textContent).not.toContain("每组 10 秒");
    expect(host.querySelectorAll("button")).toHaveLength(2);
  });
  it("streams the question, translation, and answer lines in order, then holds the complete result", async () => {
    await render();
    expect(question()).toBe("");
    await advance(1000);
    expect(question()!.length).toBeGreaterThan(0);
    expect(question()!.length).toBeLessThan(
      interviewDemos[0].english.question.length,
    );
    expect(host.querySelector('.cv-answer p[data-visible="true"]')).toBeNull();
    await advance(2000);
    expect(question()).toBe(interviewDemos[0].english.question);
    const translation = host.querySelector(
      ".cv-question-translation",
    )?.textContent;
    expect(translation!.length).toBeGreaterThan(0);
    expect(translation!.length).toBeLessThan(interviewDemos[0].question.length);
    await advance(1400);
    const first = host.querySelector('.cv-conclusion [lang="en"]')?.textContent;
    expect(first!.length).toBeGreaterThan(0);
    expect(first!.length).toBeLessThan(
      interviewDemos[0].english.answer[0].text.length,
    );
    expect(host.querySelector('.cv-point[data-visible="true"]')).toBeNull();
    await advance(4900);
    expectCase(0);
    expect(
      host.querySelectorAll('.cv-answer-translation[data-visible="true"]'),
    ).toHaveLength(3);
    expect(host.querySelector(".cv-caret")).toBeNull();
    await advance(4650);
    expectCase(0);
    await advance(50);
    expect(host.querySelector(".cv-page")?.textContent).toContain("02");
    expect(question()).toBe("");
  });
  it("loops through matching prepared questions and answers without remounting the intro", async () => {
    await render();
    const intro = host.querySelector(".cv-intro");
    await advance(10000);
    expectCase(0);
    await advance(DEMO_DURATION);
    expectCase(1);
    await advance(DEMO_DURATION);
    expectCase(2);
    await advance(DEMO_DURATION);
    expectCase(0);
    expect(host.querySelector(".cv-intro")).toBe(intro);
  });
  it("restarts streaming the current question when switching languages", async () => {
    await render();
    await advance(DEMO_DURATION + 5000);
    await click(".cv-language-switch button:first-child");
    expect(question()).toBe("");
    expect(host.querySelector(".cv-question-translation")).toBeNull();
    await advance(10000);
    expectCase(1, false);
    await click(".cv-language-switch button:last-child");
    expect(question()).toBe("");
    await advance(10000);
    expectCase(1);
  });
  it("suspends streaming while inactive and resumes at the same position", async () => {
    await render();
    await advance(1000);
    const partial = question();
    await render(false);
    await advance(30000);
    expect(question()).toBe(partial);
    expect(running()).toBe("false");
    expect(vi.getTimerCount()).toBe(0);
    expect(
      [...host.querySelectorAll<HTMLButtonElement>("button")].every(
        (button) => button.disabled,
      ),
    ).toBe(true);
    await render(true);
    await advance(9000);
    expectCase(0);
  });
  it("shows complete text without typing for reduced motion, while keeping the prepared carousel", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    await render();
    expectCase(0);
    expect(host.querySelector(".cv-caret")).toBeNull();
    await advance(DEMO_DURATION);
    expectCase(1);
  });
  it("clears its timer when unmounted", async () => {
    await render();
    expect(vi.getTimerCount()).toBe(1);
    await act(async () => root.render(null));
    expect(vi.getTimerCount()).toBe(0);
  });
});
