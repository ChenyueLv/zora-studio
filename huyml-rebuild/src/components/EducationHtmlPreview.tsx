import "./education-html-preview.css";

// Ported from the supplied “能力卡 · 教务系统.dc.html”. Its DC template
// runtime is replaced by React while preserving the supplied design and navigation.
const navigation = [
  ["仪表盘", "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"],
  ["课程", "m2 9 10-6 10 6-10 6L2 9Z M6 12v6c4 3 8 3 12 0v-6 M22 9v8"],
  [
    "训练营",
    "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M2 21v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4 M17 5a3 3 0 0 1 0 6 M18 14a4 4 0 0 1 4 4v3",
  ],
  [
    "企业内训",
    "M4 21V7h16v14 M8 7V3h8v4 M8 11h1 M15 11h1 M8 15h1 M15 15h1 M10 21v-3h4v3",
  ],
  ["讲师预约", "M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4 m-8 8 3 3 5-5"],
  [
    "学员管理",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3 M17 4a4 4 0 0 1 0 7 M19 14a5 5 0 0 1 3 4v3",
  ],
  [
    "报名管理",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3 M19 6v6 M16 9h6",
  ],
];
const courses = [
  ["提示词工程：从对话到指挥", "Ray", "提示词", 38, "进行中"],
  ["Agent 开发入门与实战", "Ray", "Agent", 32, "进行中"],
  ["Skill 封装与工作流自动化", "Ray", "Agent", 27, "即将开课"],
  ["AI 漫剧：分镜到成片", "Wendy", "AIGC", 24, "进行中"],
  ["AI 音乐创作工作坊", "Wendy", "AIGC", 18, "即将开课"],
  ["无限画布协作方法", "Wendy", "画布", 21, "已结课"],
];
function Glyph({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
// Same four-point star construction as the supplied HTML (curve .91, crease .57).
const starPath =
  Array.from({ length: 4 }, (_, i) => {
    const point = (r: number, a: number) => [
      50 + r * Math.cos(a),
      50 + r * Math.sin(a),
    ];
    const a = -Math.PI / 2 + (i * Math.PI) / 2;
    const t = point(50, a),
      p = point(13.6, a + Math.PI / 4),
      n = point(50, a + Math.PI / 2);
    const control = (u: number[], v: number[]) =>
      u.map((x, j) => 50 + 0.57 * ((x + v[j]) / 2 - 50));
    const format = (p: number[]) => p.map((x) => x.toFixed(2)).join(" ");
    return `${i === 0 ? `M${format(t)} ` : ""}Q${format(control(t, p))} ${format(p)} Q${format(control(p, n))} ${format(n)}`;
  }).join(" ") + " Z";
export function EducationHtmlPreview({ active = true }: { active?: boolean }) {
  return (
    <div className="edu-html-preview">
      <aside className="eh-sidebar">
        <div className="eh-brand">
          <Glyph path="M12 5v15 M3 4h5a6 6 0 0 1 4 1 6 6 0 0 1 4-1h5v15h-5a6 6 0 0 0-4 1 6 6 0 0 0-4-1H3V4Z M6 8h2 M16 8h2" />
          Zora 教务
        </div>
        <div className="eh-nav">
          {navigation.map(([label, path]) => (
            <button
              type="button"
              key={label}
              data-selected={label === "课程"}
              aria-pressed={label === "课程"}
              disabled={!active || label !== "课程"}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Glyph path={path} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </aside>
      <main className="eh-main">
        <div className="eh-content">
          <header className="eh-welcome">
            <div>
              <b>Hi, Ray</b>
              <p>欢迎回到 Zora 教务</p>
            </div>
            <span className="eh-search">
              <Glyph path="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14 m5-2 6 6" />
              搜索
            </span>
          </header>
          <section className="eh-banner" aria-label="正在进行的课程">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg
                key={i}
                className={`eh-star eh-star-${i}`}
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path d={starPath} fill="currentColor" />
              </svg>
            ))}
            <div className="eh-banner-meta">
              <span>正在进行</span>
              <span>第 3 期 · 18 / 24 课次</span>
            </div>
            <h3>
              Agent 开发入门与实战：
              <br />
              工具调用与记忆
            </h3>
            <span className="eh-continue">
              继续排课<span>▶</span>
            </span>
          </section>
          <h4 className="eh-section-title">课程</h4>
          <div className="eh-kpis">
            <div>
              <span className="eh-kpi-icon">
                <Glyph path="M3 4h6a4 4 0 0 1 3 1 4 4 0 0 1 3-1h6v16h-6a4 4 0 0 0-3 1 4 4 0 0 0-3-1H3z M12 5v16" />
              </span>
              <p>
                进行中课程<strong>24</strong>
              </p>
            </div>
            <div>
              <span className="eh-kpi-icon">
                <Glyph path="M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4 M9 15h6 M12 12v6" />
              </span>
              <p>
                即将开课<strong>6</strong>
              </p>
            </div>
            <div>
              <span className="eh-kpi-icon">
                <Glyph path="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3 M17 4a4 4 0 0 1 0 7" />
              </span>
              <p>
                在读学员<strong>160</strong>
              </p>
            </div>
          </div>
          <h4 className="eh-section-title">课程列表</h4>
          <div className="eh-list">
            <div className="eh-row eh-columns">
              <span>#</span>
              <span>课程</span>
              <span>分类</span>
              <span>学员</span>
              <span>状态</span>
            </div>
            {courses.map(([title, teacher, category, students, status], i) => (
              <div className="eh-row" key={title}>
                <span>{i + 1}</span>
                <div className="eh-course">
                  <b>{title}</b>
                  <small>
                    讲师：<span>{teacher}</span>
                  </small>
                </div>
                <div>
                  <span className="eh-category">{category}</span>
                </div>
                <div className="eh-students">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  {students}
                </div>
                <span className="eh-status" data-status={status}>
                  <i />
                  {status}
                </span>
              </div>
            ))}
            <footer>
              <span>显示 1–6 条，共 24 门课程</span>
              <span className="eh-pages">
                <i>‹</i>
                <i>1</i>
                <i>2</i>
                <i>›</i>
              </span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
