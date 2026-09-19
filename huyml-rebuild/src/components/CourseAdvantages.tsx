import { useRef, useState, type KeyboardEvent } from "react";
import { CourseSectionHeading } from "./CourseSectionHeading";
import "./course-advantages.css";

const conversations = [
  {
    id: "method",
    name: "系统方法",
    summary: "把零散技巧，串成体系",
    question: "AI 工具这么多，学完会不会还是零散的？",
    headline: "用一套方法，把不同工具串起来。",
    answer:
      "从拆解目标、写清提示，到组合 Skill、Agent 与创作工具，再到检查和优化结果。你会在不同任务中反复练习这套过程，逐步形成自己的 AI SOP。",
    details: ["拆解任务", "组合工具", "形成个人 SOP"],
    link: "查看完整学习路径",
    href: "#schedule",
  },
  {
    id: "platform",
    name: "自研平台",
    summary: "课程与工具，配套使用",
    question: "想动手做 AIGC，工具要自己准备吗？",
    headline: "配套自研 AIGC 平台，让方法有地方实践。",
    answer:
      "课程配套自研 AIGC 平台，把工具使用和创作练习衔接起来。跟着课堂任务实际操作，在制作中理解参数、比较效果、调整结果，把听过的方法变成亲手做过的经验。",
    details: ["自研 AIGC 平台", "课堂创作练习", "效果调整与优化"],
    link: "看看课堂怎么练",
    href: "#schedule",
  },
  {
    id: "mentor",
    name: "资深导师",
    summary: "真实项目经验，带进课堂",
    question: "导师会教到真实项目里怎么做吗？",
    headline: "做过产品、交付过项目的人，带你做。",
    answer:
      "导师拥有数字产品与 AI 落地经验，参与过从需求到上线的完整过程。课堂里既讲工具怎么用，也讲为什么这样选、遇到问题怎么改，以及怎样判断结果能不能用。",
    details: ["AI 产品落地", "智能体系统", "AI 视觉与影视创作"],
    link: "认识课程导师",
    href: "#team",
  },
  {
    id: "practice",
    name: "落地实战",
    summary: "亲手制作，带着作品结课",
    question: "三天之后，我能拿出什么作品？",
    headline: "从一个需求开始，把作品做出来。",
    answer:
      "跟练自己的 Skill、主题海报、AI 短片、个人作品站与知识 Agent，经历制作、调试和迭代。结课还有作品展示与讲师点评，让你知道作品哪里做对了、接下来还能怎么改。",
    details: ["动手跟练", "作品展示", "讲师点评"],
    link: "查看课程项目安排",
    href: "#schedule",
  },
  {
    id: "support",
    name: "课后答疑",
    summary: "离开课堂，继续有人回应",
    question: "课上跟得上，回去自己做卡住了怎么办？",
    headline: "课后继续答疑，支持你把方法用下去。",
    answer:
      "把实践中遇到的具体问题带回来：提示词怎么调整、工具为什么报错、作品效果为什么不理想。通过课后答疑梳理问题与修改方向，让练习继续向前。",
    details: ["工具使用问题", "创作中的卡点", "修改方向"],
    link: "了解课程与报名",
    href: "#course-info",
  },
  {
    id: "reuse",
    name: "可复用积累",
    summary: "这次学会，下次还能用",
    question: "换一个任务，还能用上课里学到的东西吗？",
    headline: "带走作品，也积累自己的做事方法。",
    answer:
      "把有效的提示词整理下来，把重复步骤封装成 Skill，把项目中的选择和修改过程沉淀为个人 SOP。面对新的学习、工作或创作任务，你就有可以调整、继续复用的起点。",
    details: ["个人提示词库", "可复用 Skill", "项目与流程积累"],
    link: "看看课程学习收获",
    href: "#takeaways-title",
  },
] as const;

export function CourseAdvantages() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % conversations.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + conversations.length) % conversations.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = conversations.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      className="course-advantages"
      id="advantages"
      aria-labelledby="advantages-title"
    >
      <div className="cv-inner">
        <CourseSectionHeading
          id="advantages-title"
          title="为什么选择这门课"
          description="从方法、工具到作品，把你关心的先聊清楚。"
        />
        <div className="cv-layout">
          <div
            className="cv-topics"
            role="tablist"
            aria-label="了解课程优势"
            aria-orientation="vertical"
          >
            {conversations.map((item, index) => (
              <button
                className="cv-topic"
                type="button"
                role="tab"
                key={item.id}
                id={`advantage-tab-${item.id}`}
                aria-controls={`advantage-panel-${item.id}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => navigate(event, index)}
              >
                <span className="cv-topic-name">{item.name}</span>
                <span className="cv-topic-summary">{item.summary}</span>
                <span className="cv-topic-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
          <div className="cv-conversation">
            {conversations.map((item, index) => (
              <div
                className="cv-panel"
                role="tabpanel"
                key={item.id}
                id={`advantage-panel-${item.id}`}
                aria-labelledby={`advantage-tab-${item.id}`}
                hidden={active !== index}
                tabIndex={0}
              >
                <div className="cv-question">
                  <span className="cv-speaker">你可能想问</span>
                  <p>{item.question}</p>
                </div>
                <div className="cv-answer">
                  <span className="cv-speaker">
                    <span className="cv-spark" aria-hidden="true">
                      ✳
                    </span>
                    课程解答
                  </span>
                  <div className="cv-answer-bubble">
                    <h3>{item.headline}</h3>
                    <p>{item.answer}</p>
                    <ul aria-label="这一项能带来什么">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a className="cv-evidence" href={item.href}>
                  {item.link}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
