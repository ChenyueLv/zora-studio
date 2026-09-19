import { CourseSectionHeading } from "./CourseSectionHeading";
import { useMemo, useState } from "react";
import courseWorks from "../data/course-works.json";
import referenceWorks from "../data/playground.json";
import previews from "../data/student-work-previews.json";
import { Media, Lightbox } from "./Media";
import { useMediaQuery } from "../lib/useMediaQuery";
import type { Media as MediaItem } from "../lib/types";
import "./student-works.css";

type Work = MediaItem & { id: string };

// 首屏 8 件的顺序按桌面端 4 列排好：三个视频互不相邻，各列底部基本齐平；
// 美妆视频排在后面，展开全部后才出现
const [portrait, castle, makeup, story, song] = courseWorks as Work[];
const works: Work[] = [
  portrait,
  castle,
  referenceWorks[0],
  referenceWorks[1],
  story,
  referenceWorks[2],
  referenceWorks[3],
  song,
  ...referenceWorks.slice(4, 7),
  makeup,
  ...referenceWorks.slice(7),
];
const courseIds = new Set(courseWorks.map((work) => work.id));
const HOME_COUNT = 8;
// 列间距约为卡片宽度的 6%，高度都以卡片宽度为单位
const GAP = 0.06;
// 首屏补位：列底差距小于这个值就不再补，补上的作品最多比最高列高出 TOLERANCE
const EVEN_ENOUGH = 0.3;
const TOLERANCE = 0.12;

const cardHeight = (work: Work) => {
  const [width, height] = (work.frame ?? `${work.width} / ${work.height}`)
    .split("/")
    .map(Number);
  return height / width + GAP;
};

// 瀑布流：每件作品放进当前最矮的一列。收起时展示前 8 件，
// 再从后面的参考作品里挑能放进空缺的补上，让各列底部更齐
function arrange(columns: number, expanded: boolean) {
  const cols = Array.from({ length: columns }, () => ({
    height: 0,
    items: [] as number[],
  }));
  const shortest = () =>
    cols.reduce((low, col) => (col.height < low.height ? col : low));
  const place = (index: number) => {
    const col = shortest();
    col.items.push(index);
    col.height += cardHeight(works[index]);
  };
  if (expanded) {
    works.forEach((_, index) => place(index));
    return cols;
  }
  for (let index = 0; index < HOME_COUNT; index++) place(index);
  for (let index = HOME_COUNT; index < works.length; index++) {
    const tallest = Math.max(...cols.map((col) => col.height));
    const col = shortest();
    if (tallest - col.height < EVEN_ENOUGH) break;
    if (courseIds.has(works[index].id)) continue;
    if (col.height + cardHeight(works[index]) <= tallest + TOLERANCE)
      place(index);
  }
  return cols;
}

export function StudentWorks() {
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const mobile = useMediaQuery("(max-width: 600px)");
  const tablet = useMediaQuery("(max-width: 1100px)");
  const columns = mobile ? 1 : tablet ? 2 : 4;
  const layout = useMemo(() => arrange(columns, expanded), [columns, expanded]);

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
            {layout.map((col, column) => (
              <div className="sw-column" key={column}>
                {col.items.map((index) => {
                  const work = works[index];
                  return (
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
                  );
                })}
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
