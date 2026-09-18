/** Fictional, editable demonstration profiles; these are not applicant records. */
export const interviewDemos = [
  {
    id: "experience",
    english: {
      question: "What was your role in this project?",
      answer: [
        {
          text: "I defined the needs and workflow.",
          emphasis: "needs and workflow",
        },
        {
          text: "I mapped inputs and defined outputs.",
          emphasis: "defined outputs",
        },
        {
          text: "I connected drafting and human review.",
          emphasis: "human review",
        },
      ],
    },
    label: "项目经历",
    contextLabel: "示例项目",
    context: "内容团队 · 资料整理助手",
    question: "这个项目里，你具体负责什么？",
    answer: [
      { text: "我负责需求拆解和工作流搭建。", emphasis: "需求拆解" },
      { text: "先梳理输入资料，再定义输出结构。", emphasis: "输出结构" },
      { text: "把整理、生成、人工确认连成流程。", emphasis: "人工确认" },
    ],
  },
  {
    id: "concept",
    english: {
      question: "How is an Agent different from chat?",
      answer: [
        {
          text: "An Agent takes steps toward a goal.",
          emphasis: "takes steps",
        },
        {
          text: "It uses tools and reads the results.",
          emphasis: "uses tools",
        },
        { text: "Feedback guides its next action.", emphasis: "Feedback" },
      ],
    },
    label: "概念解释",
    contextLabel: "问题类型",
    context: "知识概念 · 直接解释原理",
    question: "Agent 和普通聊天有什么区别？",
    answer: [
      { text: "Agent 能围绕目标，连续执行步骤。", emphasis: "连续执行" },
      { text: "它可以调用工具，读取执行结果。", emphasis: "调用工具" },
      { text: "再根据反馈，决定下一步行动。", emphasis: "根据反馈" },
    ],
  },
  {
    id: "followup",
    english: {
      question: "What if the generated content is wrong?",
      answer: [
        {
          text: "I check the sources, then the output.",
          emphasis: "check the sources",
        },
        {
          text: "I link key claims to their sources.",
          emphasis: "their sources",
        },
        {
          text: "Uncertain content gets human review.",
          emphasis: "human review",
        },
      ],
    },
    label: "连续追问",
    contextLabel: "承接上文",
    context: "已讨论：资料整理与生成流程",
    question: "如果生成的内容不准确，怎么办？",
    answer: [
      { text: "我会先检查资料，再检查生成环节。", emphasis: "检查资料" },
      { text: "让关键结论对应来源，便于核对。", emphasis: "对应来源" },
      { text: "不确定的内容，交给人工确认。", emphasis: "人工确认" },
    ],
  },
];
export const DEMO_DURATION = 14000;
export const QUESTION_END = 2500;
export const ANSWER_START = 3900;
export const ANSWER_LINE_DURATION = 1800;
