import { expect, it } from "vitest";
import {
  audienceMouthPath,
  mouthCycleDuration,
  restingMouthPath,
} from "../src/lib/audienceMouth";
const numbers = (path: string) => path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);

it("has matching incoming and outgoing tangents throughout the full expression cycle", () => {
  for (let time = 0; time <= mouthCycleDuration; time += 0.025) {
    const points = numbers(audienceMouthPath(time));
    expect(points).toHaveLength(26);
    for (const join of [6, 12, 18]) {
      for (let axis = 0; axis < 2; axis++) {
        const incoming = points[join + axis] - points[join - 2 + axis];
        const outgoing = points[join + 2 + axis] - points[join + axis];
        expect(Math.abs(incoming - outgoing)).toBeLessThan(0.003);
      }
    }
  }
});

it("rests without per-point jitter and keeps the neutral expression straight", () => {
  expect(audienceMouthPath(1)).toBe(restingMouthPath);
  expect(audienceMouthPath(2.5)).toBe(restingMouthPath);
  const flat = numbers(audienceMouthPath(12));
  expect(new Set(flat.filter((_, index) => index % 2 === 1)).size).toBe(1);
});

it("settles gently at transition boundaries and loops without a jump", () => {
  for (const time of [3.5, 4.6, 6.2, 7.3, 10.3, 11.4, 13.8, 14.9]) {
    const before = numbers(audienceMouthPath(time - 0.001));
    const after = numbers(audienceMouthPath(time + 0.001));
    expect(
      Math.max(...before.map((value, i) => Math.abs(value - after[i]))),
    ).toBeLessThan(0.003);
  }
  expect(audienceMouthPath(mouthCycleDuration)).toBe(restingMouthPath);
});
