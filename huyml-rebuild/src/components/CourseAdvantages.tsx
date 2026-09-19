import { CourseSectionHeading } from "./CourseSectionHeading";
import "./course-advantages.css";

const conversations = [
  {
    id: "method",
    name: "系统方法",
    question: "工具这么多，怎么学才不零散？",
    headline: "把零散技巧，串成自己的体系。",
    answer:
      "从提示词到 Skill、Agent 与内容创作，练习拆解任务、组合工具和优化结果，把不同方向连成一套个人 SOP。",
    link: "查看完整学习路径",
    href: "#schedule",
  },
  {
    id: "platform",
    name: "自研平台",
    question: "想做 AIGC，有配套工具吗？",
    headline: "自研 AIGC 平台，配合课堂一起练。",
    answer:
      "课程配套自研 AIGC 平台，让工具与创作任务衔接起来。亲手操作、比较效果、调整结果，让听过的方法变成做过的经验。",
    link: "看看课堂怎么练",
    href: "#schedule",
  },
  {
    id: "mentor",
    name: "资深导师",
    question: "导师真的做过这些项目吗？",
    headline: "做过真实项目的人，带你做。",
    answer:
      "由有数字产品与 AI 落地经验的导师授课。从需求到上线，讲清为什么这样选、遇到问题怎么改，以及如何判断结果能不能用。",
    link: "认识课程导师",
    href: "#team",
  },
  {
    id: "practice",
    name: "落地实战",
    question: "三天之后，我能拿出什么作品？",
    headline: "从一个需求开始，把作品做出来。",
    answer:
      "跟练 Skill、海报、AI 短片、个人作品站与知识 Agent，经历制作、调试和迭代。通过结课展示与讲师点评，找到下一步改进的方向。",
    link: "查看课程项目安排",
    href: "#schedule",
  },
  {
    id: "support",
    name: "课后答疑",
    question: "回去自己做，卡住了怎么办？",
    headline: "下课之后，问题依然有人回应。",
    answer:
      "提示词怎么调整、工具为什么报错、作品效果不理想怎么办？把具体问题带回来，通过课后答疑找到修改方向，继续练下去。",
    link: "了解课程与报名",
    href: "#course-info",
  },
  {
    id: "reuse",
    name: "可复用积累",
    question: "换个任务，还能用得上吗？",
    headline: "带走作品，也积累自己的做事方法。",
    answer:
      "整理有效的提示词，把重复步骤封装成 Skill，留存项目与修改过程。面对新的学习、工作或创作任务，有可以调整、继续复用的起点。",
    link: "看看课程学习收获",
    href: "#takeaways-title",
  },
] as const;

export function CourseAdvantages() {
  return (
    <section
      className="course-advantages"
      id="advantages"
      aria-labelledby="advantages-title"
    >
      <div className="cva-inner">
        <CourseSectionHeading
          id="advantages-title"
          title="为什么选择这门课"
          description="你关心的问题，我们认真回答。"
        />
        <div className="cva-opening">
          <p className="cva-big-question">
            学 AI，
            <br />
            然后呢<span>？</span>
          </p>
          <div className="cva-opening-answer">
            <svg
              className="cva-reply-mark"
              viewBox="0 0 120 80"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 5c0 43 26 52 90 52M77 37l23 20-23 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              把方法学会，
              <br />
              把自己的作品做出来。
            </p>
            <span>
              方法、平台、导师与课后支持，
              <br />
              围绕每一次真正动手的练习。
            </span>
          </div>
        </div>
        <div className="cva-dialogues">
          {conversations.map((item) => (
            <article
              className={`cva-dialogue cva-dialogue-${item.id}`}
              key={item.id}
              aria-labelledby={`advantage-${item.id}`}
            >
              <div className="cva-question">
                <p>
                  <span className="cva-sr-only">学员问：</span>
                  {item.question}
                </p>
              </div>
              <div className="cva-response">
                <span className="cva-response-mark" aria-hidden="true">
                  ↳
                </span>
                <div className="cva-response-copy">
                  <h3 className="cva-feature" id={`advantage-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="cva-answer-headline">{item.headline}</p>
                  <p className="cva-answer-detail">{item.answer}</p>
                  <a className="cva-evidence" href={item.href}>
                    {item.link}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="cva-signoff">
          <span>从「我想试试」，到「这是我做的」。</span>
          <a href="#schedule">
            看看三天怎么学 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
