import { PathOutcome } from "./PathOutcome";
import { AudienceRoutes } from "./AudienceRoutes";
import { useVisibleActivity } from "../lib/useVisibleActivity";
import { CourseSectionHeading } from "./CourseSectionHeading";
import "./course-audience.css";

const people = [
  "学生",
  "求职者",
  "职场人",
  "教师与教育者",
  "科研人员",
  "设计师",
  "开发者",
  "内容创作者",
  "产品与运营人员",
  "管理者",
  "自由职业者",
  "创业者",
  "企业经营者",
  "AI 爱好者",
  "商业应用探索者",
] as const;

export function CourseAudience() {
  const activity = useVisibleActivity<HTMLDivElement>();
  return (
    <section
      className="course-audience"
      aria-labelledby="audience-title"
      id="audience"
    >
      <div className="ca-inner">
        <CourseSectionHeading
          id="audience-title"
          title="面向人群"
          description="不限专业与岗位，零基础与进阶都能找到起点"
        />
        <div className="ca-people" data-active={activity.active}>
          <div
            className="ca-people-marquee"
            ref={activity.ref}
            tabIndex={0}
            role="region"
            aria-label="课程面向人群"
          >
            <div className="ca-people-track">
              {[0, 1, 2, 3].map((copy) => (
                <ul
                  className="ca-people-group"
                  key={copy}
                  aria-hidden={copy > 0 || undefined}
                >
                  {people.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <AudienceRoutes />
        <PathOutcome />
      </div>
    </section>
  );
}
