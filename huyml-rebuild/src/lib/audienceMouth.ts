// Matching Bézier tangents keep every join smooth, including during a morph.
const smile = [
  120, 40, 120, 90, 170, 130, 230, 155, 290, 180, 390, 185, 500, 185, 610, 185,
  710, 180, 770, 155, 830, 130, 880, 90, 880, 40,
];
const tongue = [
  120, 40, 246.667, 66, 405, 108, 500, 118, 595, 128, 665, 70, 690, 100, 715,
  130, 700, 205, 650, 205, 600, 205, 570, 150, 600, 115,
];
const flat = Array.from({ length: 13 }, (_, i) => [
  180 + (i * 640) / 12,
  118,
]).flat();
const poses = [
  { points: smile, hold: 3.5 },
  { points: tongue, hold: 1.6 },
  { points: smile, hold: 3 },
  { points: flat, hold: 2.4 },
];
const transition = 1.1;
export const mouthCycleDuration = poses.reduce(
  (sum, pose) => sum + pose.hold + transition,
  0,
);
const toPath = (points: number[]) =>
  `M${points[0].toFixed(3)} ${points[1].toFixed(3)} ` +
  Array.from(
    { length: 4 },
    (_, i) =>
      `C${points
        .slice(2 + i * 6, 8 + i * 6)
        .map((value) => value.toFixed(3))
        .join(" ")}`,
  ).join(" ");
export const restingMouthPath = toPath(smile);

export function audienceMouthPath(elapsed: number) {
  let time = Math.max(0, elapsed) % mouthCycleDuration;
  for (let index = 0; index < poses.length; index++) {
    const pose = poses[index];
    if (time <= pose.hold) return toPath(pose.points);
    if (time < pose.hold + transition) {
      const t = (time - pose.hold) / transition;
      // Quintic easing starts and ends with zero velocity and acceleration.
      const progress = t * t * t * (t * (t * 6 - 15) + 10);
      const next = poses[(index + 1) % poses.length].points;
      return toPath(
        pose.points.map((value, i) => value + (next[i] - value) * progress),
      );
    }
    time -= pose.hold + transition;
  }
  return restingMouthPath;
}
