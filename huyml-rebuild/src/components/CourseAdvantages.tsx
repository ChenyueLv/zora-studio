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
    headline: "自研平台，配套练习。",
    answer:
      "配套自研 AIGC 平台，衔接课堂创作任务。亲手操作、比较效果，再调整优化。",
    link: "看看课堂怎么练",
    href: "#schedule",
  },
  {
    id: "mentor",
    name: "资深导师",
    question: "导师真的做过这些项目吗？",
    headline: "真实项目经验，带进课堂。",
    answer:
      "由有数字产品与 AI 落地经验的导师授课，讲清从需求到上线的选择、调试与结果判断。",
    link: "认识课程导师",
    href: "#team",
  },
  {
    id: "practice",
    name: "落地实战",
    question: "三天之后，我能拿出什么作品？",
    headline: "从一个需求开始，把作品做出来。",
    answer:
      "从描述需求到制作、调试和迭代，亲手完成课堂项目。结课展示与讲师点评，帮你找到下一步改进方向。",
    link: "查看课程项目安排",
    href: "#schedule",
  },
  {
    id: "support",
    name: "课后答疑",
    question: "回去自己做，卡住了怎么办？",
    headline: "下课之后，继续答疑。",
    answer:
      "提示词、工具报错、创作效果遇到问题？通过课后答疑，梳理卡点和修改方向。",
    link: "了解课程与报名",
    href: "#course-info",
  },
  {
    id: "reuse",
    name: "可复用积累",
    question: "换个任务，还能用得上吗？",
    headline: "这次学会，下次复用。",
    answer:
      "积累提示词、Skill 与项目文件，沉淀个人 SOP。换一个学习、工作或创作任务，也有可复用的起点。",
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
          <p className="cva-big-question">学 AI，然后呢？</p>
          <p className="cva-opening-answer">
            <span aria-hidden="true">↳</span>把方法学会，把自己的作品做出来。
          </p>
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
                  {item.id === "method" && (
                    <ul
                      className="cva-deliverables"
                      aria-label="连接的 AI 应用能力"
                    >
                      <li>提示词</li>
                      <li>Skill</li>
                      <li>Agent</li>
                      <li>AIGC</li>
                      <li>个人 SOP</li>
                    </ul>
                  )}
                  {item.id === "practice" && (
                    <ul className="cva-deliverables" aria-label="课堂练习项目">
                      <li>自己的 Skill</li>
                      <li>主题海报</li>
                      <li>AI 短片</li>
                      <li>个人作品站</li>
                      <li>知识 Agent</li>
                    </ul>
                  )}
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
