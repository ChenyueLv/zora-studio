import { useState } from "react";
import { useVisibleActivity } from "../lib/useVisibleActivity";
import { CourseSectionHeading } from "./CourseSectionHeading";
import "./course-audience.css";

const people = [
  ["学生", "不论专业，把 AI 用于学习、研究与个人项目。"],
  ["求职者", "不论目标岗位，练习调研、表达与作品制作。"],
  ["职场人", "职能、管理、技术、设计岗位，都可从实际任务入手。"],
  ["AI 爱好者", "建立全局认识，动手探索不同工具与创作方式。"],
  ["商业应用探索者", "想用 AI 开发产品、制作内容，探索副业与商业机会。"],
] as const;

const audiences = [
  {
    label: "STARTER",
    title: "0 基础，从这里入门",
    points: [
      "不要求专业或岗位背景，从认识模型与工具开始",
      "把简单提问升级为清楚的目标、背景与输出要求",
      "通过跟练，完成自己的第一个 AI 工作流与作品",
      "建立整体认知，知道不同任务该用什么方法",
    ],
  },
  {
    label: "ADVANCED",
    title: "想进阶的 AI 使用者",
    points: [
      "已经使用 AI，希望把零散技巧串成完整体系",
      "组合提示词、Skill 与 Agent，形成自己的 SOP",
      "拓展网站、智能体、AI 视频与数字人的制作能力",
      "学会检查、调试和迭代，让作品更接近真实需求",
    ],
  },
];

export function CourseAudience() {
  const activity = useVisibleActivity<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="course-audience"
      aria-labelledby="audience-title"
      id="audience"
    >
      <div className="ca-inner">
        <CourseSectionHeading
          id="audience-title"
          title="适合谁来学"
          description="不限专业与岗位，零基础与进阶都能找到起点"
        />
        <div
          className="ca-people"
          data-active={activity.active}
          data-paused={paused}
        >
          <div className="ca-people-heading">
            <span id="audience-people-label">课程面向人群</span>
            <button
              type="button"
              className="ca-people-pause"
              aria-label={paused ? "继续滚动人群介绍" : "暂停滚动人群介绍"}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                {paused ? (
                  <path d="M5 3 12 8 5 13Z" />
                ) : (
                  <path d="M4 3h3v10H4zm5 0h3v10H9z" />
                )}
              </svg>
            </button>
          </div>
          <div
            className="ca-people-marquee"
            ref={activity.ref}
            tabIndex={0}
            role="region"
            aria-labelledby="audience-people-label"
          >
            <div className="ca-people-track">
              {[false, true].map((duplicate) => (
                <dl
                  className="ca-people-group"
                  key={String(duplicate)}
                  aria-hidden={duplicate || undefined}
                >
                  {people.map(([name, description]) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{description}</dd>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
          </div>
        </div>
        <div className="ca-grid">
          {audiences.map((audience) => (
            <article className="ca-group" key={audience.label}>
              <span className="ca-label">{audience.label}</span>
              <h3>{audience.title}</h3>
              <ul>
                {audience.points.map((point) => (
                  <li key={point}>
                    <span aria-hidden="true">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="ca-takeaways" aria-labelledby="takeaways-title">
          <div className="ca-subheading">
            <h3 id="takeaways-title">会用、会做，再把它做好。</h3>
            <p>横向建立全局认识，纵向练习完整流程。</p>
          </div>
          <ol className="ca-method" aria-label="从理解到优化的学习过程">
            <li>
              <strong>理解</strong>
              <span>拆解目标，选对方法</span>
            </li>
            <li>
              <strong>使用</strong>
              <span>写清提示，组合工具</span>
            </li>
            <li>
              <strong>制作</strong>
              <span>搭建产品，完成作品</span>
            </li>
            <li>
              <strong>优化</strong>
              <span>检查结果，迭代复用</span>
            </li>
          </ol>
          <p className="ca-method-summary">
            将这套过程沉淀为自己的
            SOP：面对新任务，也有可遵循、可调整、可复用的步骤。
          </p>
          <div className="ca-takeaway-grid">
            <article>
              <h4>一套自己的 AI 方法</h4>
              <p>
                把提示词、Skill、Agent
                与创作工具连接起来，练习从目标到交付的完整流程。
              </p>
              <span>提示词库 / 可复用 Skill / 个人 SOP</span>
            </article>
            <article>
              <h4>自己的产品与智能体</h4>
              <p>
                从描述需求开始，搭建网站、网页小工具或智能体原型，并学习测试与修改。
              </p>
              <span>网页工具 / 竞品分析 Agent</span>
            </article>
            <article>
              <h4>AI 内容创作能力</h4>
              <p>
                练习图像、音乐与视频的制作，串起脚本、角色、分镜和剪辑，持续打磨效果。
              </p>
              <span>主题海报 / 原创歌曲 / AI 短片</span>
            </article>
            <article>
              <h4>数字人制作方法</h4>
              <p>
                了解形象、声音与驱动的关系，练习数字人口播，并认识实时对话的接入方式。
              </p>
              <span>数字人形象 / 口播视频 / 应用思路</span>
            </article>
          </div>
        </div>
        <aside className="ca-boundaries" aria-labelledby="boundaries-title">
          <h3 id="boundaries-title">报名前，先了解</h3>
          <dl>
            <div>
              <dt>课程覆盖什么</dt>
              <dd>
                聚焦 AI 工具应用与动手实操，不包含模型训练、算法研发的系统学习。
              </dd>
            </div>
            <div>
              <dt>成果如何完成</dt>
              <dd>
                作品需要你参与跟练、修改和复盘；复杂项目的独立交付，需要课后继续练习。
              </dd>
            </div>
            <div>
              <dt>课程不承诺什么</dt>
              <dd>
                不承诺 3
                天精通全部领域、就业结果或副业收益。工具使用费用需以开课说明为准。
              </dd>
            </div>
          </dl>
        </aside>
        <div className="ca-next">
          <a href="#schedule">
            查看完整课程安排 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
