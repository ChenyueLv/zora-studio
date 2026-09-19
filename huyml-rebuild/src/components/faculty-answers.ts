// 小Z 的预设问答：实时语音服务不可用时的兜底回答。
import { facultyModules } from "./faculty-data";

export type Answer = {
  text: string;
  modules?: number[];
  link?: "schedule" | "student-works";
};

export const questions = [
  "我 0 基础能学吗？",
  "第 2 天学什么？",
  "学费多少？",
  "要带电脑吗？",
  "怎么报名？",
];

// facultyModules index → keywords; earlier entries win.
const moduleWords: [number, string[]][] = [
  [1, ["提示词", "prompt", "skill", "技能"]],
  [5, ["agent", "智能体", "知识库", "rag", "mcp"]],
  [2, ["图片", "海报", "生图", "视觉"]],
  [3, ["视频", "短片", "漫剧", "影视", "分镜", "音乐", "作曲", "配音"]],
  [4, ["vibe", "编程", "网页", "网站", "建站", "作品站", "全栈"]],
  [0, ["环境", "安装", "装什么", "终端", "api", "原理", "大模型", "认识 ai"]],
];

export function answerFor(question: string): Answer {
  const has = (...words: string[]) =>
    words.some((word) => question.toLowerCase().includes(word));
  if (has("0 基础", "0基础", "零基础", "小白", "新手"))
    return {
      text: "可以。第 1 天上午会带你认识 AI、装好环境，再从提问方法开始，通过随堂跟练逐步完成作品。零基础可跟练，有基础可进阶。",
      modules: [0],
      link: "schedule",
    };
  for (let day = 1; day <= 3; day++)
    if (
      has(`第 ${day} 天`, `第${day}天`, `第${["一", "二", "三"][day - 1]}天`)
    ) {
      const modules = facultyModules
        .map((_, i) => i)
        .filter((i) => facultyModules[i].day.startsWith(`第 ${day} 天`));
      return {
        text: `第 ${day} 天会学习${modules.map((i) => facultyModules[i].name).join("、")}。随堂作品包括：${modules.map((i) => facultyModules[i].out).join("、")}。`,
        modules,
        link: "schedule",
      };
    }
  if (
    has(
      "学费",
      "价格",
      "多少钱",
      "费用",
      "优惠",
      "报名",
      "名额",
      "什么时候",
      "几号",
      "日期",
      "开课",
      "国庆",
    )
  )
    return {
      text: "课程安排在国庆期间 10 月 3–5 日三天。授课地点、费用与报名方式待公布，可以先查看三天课程大纲，了解课程内容和随堂作品。",
      link: "schedule",
    };
  if (has("电脑", "设备", "准备", "账号"))
    return {
      text: "建议准备一台可联网的笔记本电脑，第 1 天上午会带大家把 AI 环境装好。具体工具账号、软件和设备要求，以开课通知为准。",
      link: "schedule",
    };
  if (has("随堂作品", "带走什么", "做出什么"))
    return {
      text: `三天共 6 件随堂作品：${facultyModules.map((m) => m.out).join("、")}。最后的个人知识 Agent 会把前面的成果串起来。`,
      modules: facultyModules.map((_, i) => i),
      link: "schedule",
    };
  if (has("作品", "学员", "效果") && !has("作品站"))
    return {
      text: "本页下方有作品展示区，支持点击查看完整细节。当前素材标注为展示样例，可以先了解呈现方式。",
      link: "student-works",
    };
  if (has("skill", "技能") && has("agent", "智能体"))
    return {
      text: "Skill 是把一项经验打包成可复用的技能，第 1 天下午写一个自己的；Agent 会调用工具、查知识库、自己规划步骤，放在第 3 天下午集大成，搭一个个人知识 Agent。",
      modules: [1, 5],
      link: "schedule",
    };
  if (has("数字人", "口播"))
    return {
      text: "第 2 天下午练 AI 配音与口型同步，让短片角色开口说话；第 3 天下午会拆解本页小Z这样的实时对话数字人：知识库 + 语音 + 数字人。",
      modules: [3, 5],
      link: "schedule",
    };
  const module = moduleWords.find(([, words]) => has(...words))?.[0];
  if (module !== undefined) {
    const m = facultyModules[module];
    return {
      text: `「${m.name}」安排在${m.day}。${m.learn}随堂作品：${m.out}。`,
      modules: [module],
      link: "schedule",
    };
  }
  if (has("工具", "软件", "产品"))
    return {
      text: "大纲只列技术，不绑定具体产品；课上会按开课时的效果选用合适的工具，第 1 天上午带大家把环境装好。具体以开课通知为准。",
      modules: [0],
      link: "schedule",
    };
  if (has("你是谁", "介绍", "老师", "讲师"))
    return {
      text: "我是小Z的数字分身演示，主讲 AI 全栈开发、Agent 系统与 AI 影视创作。可以向我了解课程内容和随堂练习。",
      modules: [4, 5, 3],
    };
  return {
    text: "我目前可以回答课程安排、学习内容和课前准备等常见问题。这是预设问答演示，你也可以点选下方问题，或查看完整课程大纲。",
    link: "schedule",
  };
}
