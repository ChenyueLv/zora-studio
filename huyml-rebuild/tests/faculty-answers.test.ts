import { describe, expect, it } from "vitest";
import { answerFor } from "../src/components/faculty-answers";

describe("小Z preset answers", () => {
  it.each([
    ["我 0 基础能学吗？", "认识 AI、装好环境"],
    ["第 2 天学什么？", "AI 视觉 · 海报设计、AI 影视 · 短片"],
    ["第三天做什么", "Agent 智能体 · 结课"],
    ["学费多少？", "待公布"],
    ["要带电脑吗？", "笔记本电脑"],
    ["要装什么软件", "认识 AI · 环境搭建"],
    ["Skill 和 Agent 有什么区别", "第 1 天下午写一个自己的"],
    ["数字人怎么做", "实时对话数字人"],
    ["个人作品站怎么上线", "Vibe Coding · 建站"],
    ["随堂作品有哪些", "个人知识 Agent"],
    ["学员作品效果怎么样", "展示样例"],
    ["用什么大模型做视频", "AI 影视 · 短片"],
    ["用哪些 AI 工具", "不绑定具体产品"],
    ["用哪些 AI 工具", "自研的 AI 画布 Zora TV"],
    ["Zora TV 是什么", "zoraai.tv"],
    ["画布是你们自己做的吗", "团队自研"],
    ["怎么写提示词", "提示词 · Skill"],
  ])("%s", (question, expected) => {
    expect(answerFor(question).text).toContain(expected);
  });

  it("links showcase questions to student works and course questions to the schedule", () => {
    expect(answerFor("学员作品").link).toBe("student-works");
    expect(answerFor("个人作品站怎么做").link).toBe("schedule");
  });
});
