import { CourseSectionHeading } from "./CourseSectionHeading";
import { useState } from "react";
import works from "../data/playground.json";
import previews from "../data/student-work-previews.json";
import { Media, Lightbox } from "./Media";
import { useMediaQuery } from "../lib/useMediaQuery";
import "./student-works.css";

export function StudentWorks() {
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const mobile = useMediaQuery("(max-width: 600px)");
  const tablet = useMediaQuery("(max-width: 1100px)");
  const columns = mobile ? 1 : tablet ? 2 : 4;
  const visibleWorks = expanded ? works : works.slice(0, 8);

  return (
    <section
      className="student-works"
      id="student-works"
      aria-labelledby="student-works-title"
    >
      <div className="sw-inner">
        <CourseSectionHeading
          id="student-works-title"
          title="学员作品"
          description="作品展示样例，供了解呈现方式。"
        />
        <div className="sw-layout">
          <aside className="sw-aside">
            <div className="sw-count">
              <strong>{works.length}</strong>
              <span>件作品 · 展示样例</span>
            </div>
            <p>
              探索视觉、交互与创意表达。
              <br />
              点击作品，查看完整细节。
            </p>
          </aside>
          <div className="sw-grid" id="student-work-grid">
            {Array.from({ length: columns }, (_, column) => (
              <div className="sw-column" key={column}>
                {visibleWorks.map((work, index) =>
                  index % columns === column ? (
                    <article className="experiment" key={work.id}>
                      <Media
                        item={work}
                        preview
                        previewOnHover
                        previewSrc={previews[work.id as keyof typeof previews]}
                        unloadOffscreen
                        onClick={() => setActive(index)}
                      />
                      <button
                        className="experiment-label"
                        type="button"
                        aria-label={`查看作品：${work.title}`}
                        onClick={() => setActive(index)}
                      >
                        {work.title}
                        <span aria-hidden="true">↗</span>
                      </button>
                    </article>
                  ) : null,
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="sw-more">
          <span>当前为展示样例，不代表学员实际结课成果。</span>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="student-work-grid"
            onClick={() => {
              if (expanded)
                document
                  .getElementById("student-works")
                  ?.scrollIntoView({ behavior: "instant" });
              setExpanded(!expanded);
            }}
          >
            {expanded ? "收起作品" : `查看全部 ${works.length} 件样例`}{" "}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </div>
      </div>
      {active !== null && (
        <Lightbox
          items={works}
          index={active}
          onChange={setActive}
          onClose={() => setActive(null)}
          language="zh"
        />
      )}
    </section>
  );
}
