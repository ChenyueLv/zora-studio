import "./path-outcome.css";

const steps = [
  ["理解", "Understand", "拆解目标，选对方法"],
  ["使用", "Use", "写清提示，组合工具"],
  ["制作", "Build", "搭建产品，完成作品"],
  ["优化", "Refine", "检查结果，迭代复用"],
] as const;

const outcomes = [
  ["一套自己的 AI 方法", "提示词库 / 可复用 Skill / 个人 SOP"],
  ["自己的产品与智能体", "网页工具 / 竞品分析 Agent"],
  ["AI 内容创作能力", "主题海报 / 原创歌曲 / AI 短片"],
  ["数字人制作方法", "数字人形象 / 口播视频 / 应用思路"],
] as const;

export function PathOutcome() {
  return (
    <div className="po-wrap">
      <section className="po-block" aria-labelledby="takeaways-title">
        <div className="po-head">
          <h3 className="po-title" id="takeaways-title">
            会用、会做，再把它做好。
          </h3>
          <p className="po-sub">
            横向建立全局认识，纵向练习完整流程，沉淀为自己的 SOP
          </p>
        </div>
        <div className="po-steps">
          <span className="po-progress" aria-hidden="true" />
          <ol className="po-grid" aria-label="从理解到优化的学习过程">
            {steps.map(([name, english, description], index) => (
              <li className="po-step" key={name} tabIndex={0}>
                <span className="po-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="po-step-name">
                  <strong>{name}</strong>
                  <span lang="en">{english}</span>
                </div>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="po-block" aria-labelledby="outcome-title">
        <div className="po-heading">
          <span className="po-eyebrow">OUTCOME · 三天之后</span>
          <h3 className="po-title" id="outcome-title">
            你将获得
          </h3>
        </div>
        <div className="po-grid">
          {outcomes.map(([title, tags], index) => (
            <article className="po-outcome" key={title} tabIndex={0}>
              <span className="po-outcome-index" aria-hidden="true">
                0{index + 1}
              </span>
              <h4>{title}</h4>
              <p>{tags}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="po-foot" aria-label="课程说明与课程安排">
        <dl className="po-notes">
          <div>
            <dt>覆盖</dt>
            <dd>AI 工具应用与动手实操，不含模型训练与算法研发。</dd>
          </div>
          <div>
            <dt>成果</dt>
            <dd>作品需要你跟练、修改、复盘；复杂项目需课后继续练习。</dd>
          </div>
          <div>
            <dt className="po-warning">不承诺</dt>
            <dd>3 天精通全部领域、就业结果或副业收益。</dd>
          </div>
        </dl>
        <a className="po-cta" href="#schedule">
          查看完整课程安排
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M5 19 19 5M5 5h14v14" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
