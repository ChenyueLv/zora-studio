import { CourseSectionHeading } from "./CourseSectionHeading";
import { syllabus, frontier } from "./course-syllabus-data";
import "./course-syllabus.css";

const slots = syllabus.flatMap((day) => [...day.slots]);
const stats = [
  [slots.length, "", "节课 · 每节 3 小时"],
  [slots.reduce((sum, slot) => sum + slot.topics.length, 0), "", "个知识点"],
  [new Set(slots.flatMap((slot) => [...slot.tech])).size, "", "个技术关键词"],
  [frontier.length, "", "个前沿话题"],
] as const;

export function CourseSyllabus() {
  return (
    <section
      className="course-syllabus"
      id="schedule"
      aria-labelledby="syllabus-title"
    >
      <div className="block">
        <CourseSectionHeading
          id="syllabus-title"
          title="课程大纲"
          description="10 月 3–5 日 · 3 天 · 18 小时 · 上午 09:30–12:30 · 下午 14:00–17:00"
        />
        <div className="syl-stats">
          {stats.map(([value, suffix, label]) => (
            <div key={label}>
              <strong>
                {value}
                {suffix && <sup>{suffix}</sup>}
              </strong>
              <span className="label">{label}</span>
            </div>
          ))}
        </div>
        <div className="sched">
          {syllabus.map((day, dayIndex) => (
            <article
              className="day"
              key={day.day}
              id={`course-day-${dayIndex + 1}`}
            >
              <h3>
                <strong>{String(dayIndex + 1).padStart(2, "0")}</strong>
                <span>
                  {day.day} · {day.wd}
                </span>
              </h3>
              <p className="theme">{day.theme}</p>
              {day.slots.map((slot, slotIndex) => (
                <section
                  className="slot"
                  key={slot.title}
                  aria-label={`${day.day} ${slot.s} ${slot.title}`}
                >
                  <div className="when">
                    <span>{slot.s}</span>
                    <span>{slot.t}</span>
                  </div>
                  <div className="ttl">
                    <h4 className="what">{slot.title}</h4>
                  </div>
                  <ol className="topics">
                    {slot.topics.map((topic, index) => {
                      const text = typeof topic === "string" ? topic : topic[0];
                      const tag = typeof topic === "string" ? null : topic[1];
                      return (
                        <li key={text}>
                          <span>
                            {dayIndex + 1}.
                            {(slotIndex ? day.slots[0].topics.length : 0) +
                              index +
                              1}
                          </span>
                          <span>
                            {text}
                            {tag && <em>{tag}</em>}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="fmt">讲解 90′ · 跟练 60′ · 点评答疑 30′</div>
                  <div className="tl" aria-label="技术关键词">
                    {slot.tech.map((term) => (
                      <i key={term}>{term}</i>
                    ))}
                  </div>
                  <div className="out">
                    随堂作品：<b>{slot.out}</b>
                  </div>
                </section>
              ))}
            </article>
          ))}
        </div>
        <aside className="frontier" aria-labelledby="frontier-title">
          <div className="fr-head">
            <span className="fr-tag">每天 15 分钟</span>
            <h3 id="frontier-title">前沿速递</h3>
            <p>
              每节课留出时间，讲清楚这一周 AI
              圈真正值得关注的新东西，以及它和你的工作有什么关系。
            </p>
          </div>
          <ul className="fr-list">
            {frontier.map(([title, description]) => (
              <li key={title}>
                <b>{title}</b>
                <span>{description}</span>
              </li>
            ))}
          </ul>
          <p className="fr-note">话题随开课时间更新，以上为本期规划。</p>
        </aside>
      </div>
    </section>
  );
}
