// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PptSkillCard, skillPrompt } from "../src/components/PptSkillCard";
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
  await act(async () => root.render(<PptSkillCard active={active} />));
};
const click = async (selector: string) => {
  await act(async () =>
    document.querySelector<HTMLButtonElement>(selector)!.click(),
  );
};
const advance = async (ms = 2000) => {
  await act(async () => vi.advanceTimersByTime(ms));
};
const finish = async () => {
  await click(".ps-send");
  await advance(1020);
};
const scene = () =>
  host.querySelector(".ppt-skill")?.getAttribute("data-scene");
const current = () =>
  host
    .querySelector('.ps-thumbnails [aria-pressed="true"]')
    ?.getAttribute("aria-label");
it("types the prompt, highlights the Skill, and sends automatically after a short pause", async () => {
  await render();
  expect(scene()).toBe("intro");
  expect(host.querySelector(".ps-preview")).toBeNull();
  await advance(500);
  const text = host.querySelector(".ps-prompt")!.textContent!;
  expect(text.length).toBeGreaterThan(0);
  expect(text.length).toBeLessThan(skillPrompt.length);
  await advance(2500);
  expect(host.querySelector(".ps-prompt")!.textContent).toBe(skillPrompt);
  expect(
    host.querySelector(".ps-skill-tag")?.getAttribute("data-visible"),
  ).toBe("true");
  expect(scene()).toBe("intro");
  await advance(699);
  expect(scene()).toBe("intro");
  await advance(1);
  expect(scene()).toBe("pressing");
  await advance(320);
  expect(scene()).toBe("pressing");
  await advance(700);
  expect(scene()).toBe("result");
});
it("supports early send, keeps the same composer and reveals animated results after the transition", async () => {
  await render();
  const composer = host.querySelector(".ps-composer");
  await click(".ps-send");
  expect(scene()).toBe("pressing");
  expect(host.querySelector(".ps-prompt")!.textContent).toBe(skillPrompt);
  expect(host.querySelector<HTMLButtonElement>(".ps-send")!.disabled).toBe(
    true,
  );
  await advance(320);
  expect(scene()).toBe("pressing");
  expect(host.querySelector(".ps-demo-cursor")).not.toBeNull();
  await advance(699);
  expect(scene()).toBe("pressing");
  expect(host.querySelector(".ps-slide")).toBeNull();
  await advance(1);
  expect(host.querySelector(".ps-building")).toBeNull();
  expect(host.querySelector('[role="status"]')).toBeNull();
  expect(scene()).toBe("result");
  expect(host.querySelector(".ps-composer")).toBe(composer);
  expect(current()).toBe("查看增速演变");
  expect(host.querySelector(".ps-slide")?.getAttribute("data-motion")).toBe(
    "true",
  );
});
it("restarts typing and cancels an unfinished generation without a stale result", async () => {
  await render();
  await click(".ps-send");
  await advance(320);
  await advance(600);
  await click(".ps-restart");
  expect(scene()).toBe("intro");
  expect(document.activeElement).toBe(host.querySelector(".ps-send"));
  expect(host.querySelector(".ps-prompt")?.textContent).toBe("");
  await advance(500);
  expect(scene()).toBe("intro");
  await finish();
  await click(".ps-restart");
  expect(host.querySelector(".ps-preview")).toBeNull();
  expect(scene()).toBe("intro");
});
it("opens a full-size preview outside the transformed card, supports navigation and Escape", async () => {
  await render();
  await finish();
  await click(".ps-preview");
  const modal = document.querySelector('[role="dialog"]')!;
  expect(host.contains(modal)).toBe(false);
  expect(modal.getAttribute("aria-label")).toBe("PPT 作品预览");
  await click('[aria-label="下一页"]');
  expect(current()).toBe("查看品类变化");
  await act(async () =>
    modal.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    ),
  );
  expect(current()).toBe("查看增速演变");
  await act(async () =>
    modal.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    ),
  );
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(document.body.style.overflow).not.toBe("hidden");
});
it("pauses typing and generation while inactive, then resumes", async () => {
  await render();
  await advance(500);
  const partial = host.querySelector(".ps-prompt")?.textContent;
  await render(false);
  await advance(10000);
  expect(host.querySelector(".ps-prompt")?.textContent).toBe(partial);
  expect(vi.getTimerCount()).toBe(0);
  await render();
  await click(".ps-send");
  await render(false);
  await advance(10000);
  expect(scene()).toBe("pressing");
  expect(vi.getTimerCount()).toBe(0);
  expect(
    [...host.querySelectorAll<HTMLButtonElement>("button")].every(
      (b) => b.disabled,
    ),
  ).toBe(true);
  await render();
  await advance(1020);
  expect(scene()).toBe("result");
});
it("does not propagate card interactions to the Hero navigation and cleans timers on unmount", async () => {
  await render();
  const pointer = vi.fn();
  const key = vi.fn();
  await act(async () =>
    root.render(
      <div onPointerDown={pointer} onKeyDown={key}>
        <PptSkillCard />
      </div>,
    ),
  );
  await finish();
  await act(async () =>
    host
      .querySelector(".ps-preview")!
      .dispatchEvent(new Event("pointerdown", { bubbles: true })),
  );
  await act(async () =>
    host
      .querySelector(".ps-preview")!
      .dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
      ),
  );
  expect(pointer).not.toHaveBeenCalled();
  expect(key).not.toHaveBeenCalled();
  expect(current()).toBe("查看品类变化");
  await click(".ps-restart");
  await act(async () => root.render(null));
  // Flush jsdom's asynchronous selectionchange event after focus restoration.
  await advance(0);
  expect(vi.getTimerCount()).toBe(0);
});

it("animates the active artwork only, and replays from either the card or enlarged preview", async () => {
  await render();
  await finish();
  expect(
    host.querySelector(".ps-preview .ps-slide")?.getAttribute("data-motion"),
  ).toBe("true");
  expect(
    host.querySelectorAll('.ps-thumbnails .ps-slide[data-motion="true"]'),
  ).toHaveLength(0);
  const before = host.querySelector(".ps-preview .ps-slide");
  await click(".ps-playback-controls .ps-replay");
  expect(host.querySelector(".ps-preview .ps-slide")).not.toBe(before);
  await click('[aria-label="查看增速演变"]');
  const sheet = host.querySelector(".ps-preview .ps-slide");
  await click('[aria-label="查看增速演变"]');
  expect(host.querySelector(".ps-preview .ps-slide")).not.toBe(sheet);
  await click(".ps-preview");
  expect(
    host.querySelector(".ps-preview .ps-slide")?.getAttribute("data-motion"),
  ).toBe("false");
  const large = document.querySelector(".ps-large-sheet .ps-slide");
  expect(large?.getAttribute("data-motion")).toBe("true");
  await click('[aria-label="重播放大预览动画"]');
  expect(document.querySelector(".ps-large-sheet .ps-slide")).not.toBe(large);
  await render(false);
  expect(document.querySelector('[role="dialog"]')).toBeNull();
  expect(host.querySelectorAll('.ps-slide[data-motion="true"]')).toHaveLength(
    0,
  );
});

it("plays each page for four seconds and restarts the complete prompt-to-report sequence", async () => {
  await render();
  await finish();
  await advance(4000);
  expect(current()).toBe("查看品类变化");
  await advance(4000);
  expect(current()).toBe("查看渠道渗透");
  await advance(3999);
  expect(scene()).toBe("result");
  await advance(1);
  expect(scene()).toBe("resetting");
  await advance(450);
  expect(scene()).toBe("intro");
  expect(host.querySelector(".ps-prompt")?.textContent).toBe("");
  expect(host.querySelector(".ps-preview")).toBeNull();
  expect(document.activeElement).not.toBe(host.querySelector(".ps-send"));
  await advance(3000);
  await advance(700);
  expect(scene()).toBe("pressing");
  await advance(1020);
  expect(current()).toBe("查看增速演变");
});
it("resets the four-second reading interval after manual selection", async () => {
  await render();
  await finish();
  await advance(3000);
  await click('[aria-label="查看品类变化"]');
  await advance(3999);
  expect(current()).toBe("查看品类变化");
  await advance(1);
  expect(current()).toBe("查看渠道渗透");
});
it("pauses page changes on hover, during enlargement, and when the card is inactive", async () => {
  await render();
  await finish();
  const workspace = host.querySelector(".ps-workspace")!;
  await act(async () =>
    workspace.dispatchEvent(
      Object.assign(new Event("pointerover", { bubbles: true }), {
        pointerType: "mouse",
      }),
    ),
  );
  await act(async () => vi.advanceTimersByTime(20000));
  expect(current()).toBe("查看增速演变");
  await act(async () =>
    workspace.dispatchEvent(
      Object.assign(new Event("pointerout", { bubbles: true }), {
        pointerType: "mouse",
        relatedTarget: document.body,
      }),
    ),
  );
  await act(async () => vi.advanceTimersByTime(4000));
  expect(current()).toBe("查看品类变化");
  await click(".ps-preview");
  await act(async () => vi.advanceTimersByTime(20000));
  expect(current()).toBe("查看品类变化");
  await render(false);
  await act(async () => vi.advanceTimersByTime(20000));
  expect(current()).toBe("查看品类变化");
  expect(vi.getTimerCount()).toBe(0);
});
it("lets visitors turn auto-advance off and on", async () => {
  await render();
  await finish();
  expect(host.querySelector(".ps-playback-controls")?.textContent?.trim()).toBe(
    "",
  );
  expect(host.querySelector(".ps-autoplay")?.getAttribute("aria-label")).toBe(
    "暂停循环演示",
  );
  await click(".ps-autoplay");
  await act(async () => vi.advanceTimersByTime(20000));
  expect(current()).toBe("查看增速演变");
  expect(vi.getTimerCount()).toBe(0);
  await click(".ps-autoplay");
  await act(async () => vi.advanceTimersByTime(4000));
  expect(current()).toBe("查看品类变化");
});

it("respects reduced motion with immediate text, static charts, and no automatic paging", async () => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  await render();
  expect(host.querySelector(".ps-prompt")?.textContent).toBe(skillPrompt);
  await advance(700);
  expect(scene()).toBe("pressing");
  await advance(80);
  expect(scene()).toBe("result");
  expect(host.querySelector(".ps-autoplay")?.getAttribute("aria-pressed")).toBe(
    "false",
  );
  await advance(20000);
  expect(current()).toBe("查看增速演变");
  expect(vi.getTimerCount()).toBe(0);
});

it("cancels a pending automatic send while the card is inactive", async () => {
  await render();
  await advance(3000);
  await render(false);
  await advance(10000);
  expect(scene()).toBe("intro");
  expect(vi.getTimerCount()).toBe(0);
  await render();
  await advance(700);
  expect(scene()).toBe("pressing");
});

it("shows a decorative macOS-style cursor before sending and removes it after the click", async () => {
  await render();
  expect(host.querySelector(".ps-demo-cursor")).toBeNull();
  await advance(3000);
  expect(
    host.querySelector(".ps-demo-cursor")?.getAttribute("aria-hidden"),
  ).toBe("true");
  expect(
    host.querySelector(".ps-demo-cursor")?.getAttribute("data-clicking"),
  ).toBe("false");
  await advance(700);
  expect(
    host.querySelector(".ps-demo-cursor")?.getAttribute("data-clicking"),
  ).toBe("true");
  await advance(320);
  expect(host.querySelector(".ps-demo-cursor")).not.toBeNull();
  await advance(700);
  expect(host.querySelector(".ps-demo-cursor")).toBeNull();
});
it("crossfades in both directions, cleans old layers, and places page navigation before the preview", async () => {
  await render();
  await finish();
  const nav = host.querySelector(".ps-thumbnails")!;
  expect(
    nav.compareDocumentPosition(host.querySelector(".ps-preview")!) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  await click('[aria-label="查看品类变化"]');
  expect(
    host.querySelector(".ps-slide-stage")?.getAttribute("data-direction"),
  ).toBe("forward");
  expect(
    host.querySelector(".ps-sheet-outgoing")?.getAttribute("aria-hidden"),
  ).toBe("true");
  expect(host.querySelector(".ps-sheet-current")?.textContent).toContain(
    "品类增长分化",
  );
  await advance(150);
  await click('[aria-label="查看增速演变"]');
  expect(
    host.querySelector(".ps-slide-stage")?.getAttribute("data-direction"),
  ).toBe("backward");
  expect(host.querySelectorAll(".ps-sheet-outgoing")).toHaveLength(1);
  await advance(649);
  expect(host.querySelector(".ps-sheet-outgoing")).not.toBeNull();
  await advance(1);
  expect(host.querySelector(".ps-sheet-outgoing")).toBeNull();
  await advance(2300);
  expect(host.querySelector(".ps-sheet-current")?.textContent).toContain(
    "2025 年同比增速",
  );
});
it("pauses the cycle boundary when inactive and leaves no timers after unmount", async () => {
  await render();
  await finish();
  await click('[aria-label="查看渠道渗透"]');
  await advance(4000);
  expect(scene()).toBe("resetting");
  await render(false);
  await advance(10000);
  expect(scene()).toBe("resetting");
  expect(vi.getTimerCount()).toBe(0);
  await render();
  await advance(450);
  expect(scene()).toBe("intro");
  await act(async () => root.render(null));
  expect(vi.getTimerCount()).toBe(0);
});
