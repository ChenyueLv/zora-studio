export type Lesson = {
  id: string;
  day: number;
  slot: number;
  title: string;
  teacher: string;
  start: string;
  tone: string;
};
export type Student = { id: string; name: string; level: "零基础" | "有基础" };
export const initialLessons: Lesson[] = [
  {
    id: "prompt",
    day: 1,
    slot: 0,
    title: "提示词与工作提效",
    teacher: "林老师",
    start: "09:00",
    tone: "sage",
  },
  {
    id: "image",
    day: 1,
    slot: 1,
    title: "AI 图像与创意",
    teacher: "林老师",
    start: "14:00",
    tone: "peach",
  },
  {
    id: "story",
    day: 2,
    slot: 0,
    title: "AI 漫剧与音乐",
    teacher: "陈老师",
    start: "09:00",
    tone: "lilac",
  },
  {
    id: "canvas",
    day: 2,
    slot: 1,
    title: "无限画布工作流",
    teacher: "陈老师",
    start: "14:00",
    tone: "blue",
  },
  {
    id: "agent",
    day: 3,
    slot: 0,
    title: "Agent 与 Skill",
    teacher: "林老师",
    start: "09:00",
    tone: "sand",
  },
  {
    id: "coding",
    day: 3,
    slot: 1,
    title: "Vibe Coding 实战",
    teacher: "陈老师",
    start: "14:00",
    tone: "rose",
  },
];
export const initialStudents: Student[] = [
  { id: "S001", name: "林一", level: "零基础" },
  { id: "S002", name: "陈晨", level: "有基础" },
  { id: "S003", name: "许知夏", level: "零基础" },
  { id: "S004", name: "周予安", level: "有基础" },
  { id: "S005", name: "苏禾", level: "零基础" },
  { id: "S006", name: "陆遥", level: "有基础" },
];
export type Attendance = Record<string, string[]>;
export const initialAttendance: Attendance = {
  prompt: ["S001", "S002", "S004", "S006"],
  image: ["S001", "S002", "S003"],
  story: [],
  canvas: [],
  agent: [],
  coding: [],
};
export function lessonEnd(start: string) {
  return `${String(Number(start.split(":")[0]) + 2).padStart(2, "0")}:${start.split(":")[1]}`;
}
export function lessonTimeError(lesson: Lesson) {
  if (!/^\d{2}:\d{2}$/.test(lesson.start)) return "请选择开始时间。";
  const [h, m] = lesson.start.split(":").map(Number);
  if (
    m > 59 ||
    h > 21 ||
    (lesson.slot === 0 ? h < 8 || h > 10 : h < 13 || h > 16)
  )
    return lesson.slot === 0
      ? "上午课程请在 08:00–10:59 开始。"
      : "下午课程请在 13:00–16:59 开始。";
  return "";
}
