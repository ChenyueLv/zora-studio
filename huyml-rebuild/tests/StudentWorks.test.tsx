// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudentWorks } from "../src/components/StudentWorks";

let host: HTMLDivElement, root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

const titlesByColumn = () =>
  [...host.querySelectorAll(".sw-column")].map((column) =>
    [...column.querySelectorAll(".experiment-label")].map((label) =>
      label.textContent!.replace("↗", ""),
    ),
  );

it("keeps the makeup video off the collapsed gallery and never stacks two course videos", async () => {
  await act(async () => root.render(<StudentWorks />));
  const columns = titlesByColumn();
  expect(columns).toHaveLength(4);
  const shown = columns.flat();
  expect(shown).toEqual(
    expect.arrayContaining([
      "AI 数字人",
      "梦幻城堡",
      "AI 儿童短片",
      "AI 音乐 MV",
    ]),
  );
  expect(shown).not.toContain("AI 美妆教程");
  expect(shown.length).toBeGreaterThanOrEqual(8);
  const videos = new Set(["AI 数字人", "AI 儿童短片", "AI 音乐 MV"]);
  for (const column of columns)
    column.forEach((title, i) =>
      expect(videos.has(title) && videos.has(column[i + 1])).toBe(false),
    );

  const toggle = [...host.querySelectorAll("button")].find((b) =>
    b.textContent?.includes("查看全部"),
  )!;
  await act(async () => toggle.click());
  expect(titlesByColumn().flat()).toContain("AI 美妆教程");
  expect(titlesByColumn().flat()).toHaveLength(88);
});
