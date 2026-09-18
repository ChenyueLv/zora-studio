import "./course-next-step.css";

export function CourseNextStep() {
  return (
    <section
      className="course-next-step"
      id="course-info"
      aria-labelledby="course-info-title"
    >
      <div className="cn-inner">
        <div className="cn-invitation">
          <span>AI 应用体系实战课</span>
          <h2 id="course-info-title">
            带上你的目标，
            <br />
            做出自己的作品。
          </h2>
          <p>
            从学习、求职、工作到创作与商业探索，
            <br />把 AI 方法串成自己的 SOP，再把想法变成产品与作品。
          </p>
        </div>
        <div className="cn-details">
          <dl>
            <div>
              <dt>课程时长</dt>
              <dd>3 天 / 18 小时</dd>
            </div>
            <div>
              <dt>课堂方式</dt>
              <dd>讲解、动手跟练、点评答疑</dd>
            </div>
            <div>
              <dt>开课信息</dt>
              <dd>班期、授课地点与费用待公布</dd>
            </div>
          </dl>
          <a className="cn-primary" href="#schedule">
            查看三天课程安排 <span aria-hidden="true">↗</span>
          </a>
          <a className="cn-secondary" href="#audience">
            了解适合人群与学习收获
          </a>
        </div>
      </div>
    </section>
  );
}
