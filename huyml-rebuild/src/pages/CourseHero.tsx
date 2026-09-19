import { useEffect, useRef, useState } from "react";
import { useGalleryMotion } from "../lib/useGalleryMotion";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useVisibleActivity } from "../lib/useVisibleActivity";
import { VibeCodingCard } from "../components/VibeCodingCard";
import { PptSkillCard } from "../components/PptSkillCard";
import { CvAgentCard } from "../components/CvAgentCard";
import { StoryCanvasCard } from "../components/StoryCanvasCard";
import { MusicCard } from "../components/MusicCard";
import { FacultySection } from "../components/FacultySection";
import { CourseAudience } from "../components/CourseAudience";
import { CourseNextStep } from "../components/CourseNextStep";
import { StudentWorks } from "../components/StudentWorks";
import { CourseSyllabus } from "../components/CourseSyllabus";
import { Modal } from "../components/Modal";
import { zoraTv } from "../data/zora-tv";
import "./course-hero.css";
import "./course-theme.css";
// Scenes made on our own canvas name it in their caption and panel, linking to it.
const ownCanvas = "课上用的是我们自研的 AI 画布";
const scenes = [
  {
    name: "把调研资料，做成有图表、有动画的 PPT。",
    output: "动态 PPT",
    short: "工作提效",
    kind: "office",
    tag: "PPT 设计 Skill",
    skills:
      "你将练习：把自己的一项经验拆成步骤、模板与检查清单，写成可复用的 Skill。",
    result:
      "PPT 设计 Skill 是展示示例。课堂上你会写一个自己的 Skill，主题自选，比如知识卡生成。",
  },
  {
    name: "用自然语言，把需求搭成可操作的网页。",
    output: "网页工具",
    short: "Vibe Coding",
    kind: "visual",
    tag: "一句话，做出一个应用",
    skills: "你将练习：描述需求、生成页面、读懂报错与修改，再部署上线。",
    result:
      "教务系统是应用展示示例。课堂上你会用同样的方法，做出并上线自己的个人作品站。",
  },
  {
    name: "从角色、分镜到成片，做出自己的 AI 短片。",
    output: "AI 短片",
    short: "AI 漫剧",
    kind: "story",
    tag: "从角色到成片",
    skills: "你将练习：拆分镜头、保持角色一致，用图生视频串成故事。",
    result:
      "课上直接用我们自研的 AI 画布 Zora TV：角色、场景、分镜到成片，在同一张画布里完成。工具出自我们自己的团队，每一步怎么用、为什么这样设计，都能讲清楚。",
    platform: ownCanvas,
  },
  {
    name: "把情绪写成歌词，创作一首自己的歌。",
    output: "原创音乐",
    short: "音乐探索",
    kind: "music",
    tag: "从情绪到旋律",
    skills: "你将练习：描述情绪、曲风与结构，为自己的短片写一首主题曲。",
    result:
      "课上直接用我们自研的 AI 画布 Zora TV：描述情绪、曲风和结构，探索音乐与图像结合的表达方式。",
    platform: ownCanvas,
  },
  {
    name: "把重复任务拆成步骤，搭建自己的智能助手。",
    output: "智能助手",
    short: "智能助手",
    kind: "agent",
    tag: "CV Agent 面试助手",
    skills: "你将练习：设定人设、接入知识库与工具，并做好公开前检查。",
    result: "拆解任务、定义步骤、组织可复用的能力，逐步搭建自己的 AI 工作流。",
  },
];
const art = [
  PptSkillCard,
  VibeCodingCard,
  StoryCanvasCard,
  MusicCard,
  CvAgentCard,
];
export function CourseHero() {
  const heroActivity = useVisibleActivity<HTMLDivElement>();
  const galleryRef = useRef<HTMLDivElement>(null);
  const descriptionsRef = useRef<HTMLElement>(null);
  const [panel, setPanel] = useState<"scene" | null>(null);
  const initialPosition = useRef(
    Math.max(
      0,
      scenes.findIndex(
        (scene) =>
          scene.kind ===
          new URLSearchParams(window.location.search).get("scene"),
      ),
    ),
  );
  const { position, moveBy, moveTo } = useGalleryMotion(
    galleryRef,
    descriptionsRef,
    scenes.length,
    initialPosition.current,
    !panel && heroActivity.active,
  );
  const drag = useRef<number | null>(null);
  // The swipe layout slides neighbouring captions off screen; its tabs replace them.
  const captionReach = useMediaQuery("(max-width: 1000px)") ? 0 : 1;
  const active = ((position % scenes.length) + scenes.length) % scenes.length;
  const select = (i: number) => {
    const delta = ((i - active + 7) % scenes.length) - 2;
    moveTo(position + delta);
  };
  useEffect(() => {
    document.title = "AI 应用体系实战课 · 3 天 18 小时 — 系统学会 AI";
    document.documentElement.lang = "zh-CN";
    return () => {
      document.documentElement.lang = "en";
    };
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        panel ||
        /INPUT|TEXTAREA|BUTTON/.test((e.target as HTMLElement).tagName)
      )
        return;
      if (e.key === "ArrowRight" && window.scrollY < window.innerHeight / 2) {
        e.preventDefault();
        moveBy(1);
      }
      if (e.key === "ArrowLeft" && window.scrollY < window.innerHeight / 2) {
        e.preventDefault();
        moveBy(-1);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [panel, moveBy]);
  return (
    <main className="course-page">
      <div
        className="course-hero"
        ref={heroActivity.ref}
        data-visible={heroActivity.active}
        data-scene={scenes[active].kind}
      >
        <header className="ch-header">
          <a className="ch-brand" href="/" aria-label="AI 实战课首页">
            <b>
              <img src="/zora-tv-icon.svg" alt="" width="52" height="52" />
              <small>ZORA STUDIO</small>
            </b>
            <span>
              把好奇心
              <br />
              变成创造力
            </span>
          </a>
          <a className="ch-header-course" href="#schedule">
            了解课程 <span>↗</span>
          </a>
        </header>
        <section className="ch-intro">
          <div className="ch-kicker">
            <i aria-hidden="true" /> <strong>系统学习 · 动手实战</strong>
          </div>
          <h1>AI应用实战课</h1>
          <p className="ch-subtitle">学AI · 懂方法 · 做作品</p>
          <p className="ch-for-whom">
            <span>学生</span> · <span>求职者</span> · <span>职场人</span> ·{" "}
            <span>AI 爱好者</span> · <span>商业应用探索者</span>
          </p>
          <div className="ch-actions">
            <a className="ch-primary" href="#schedule">
              查看课程安排 <span>↗</span>
            </a>
            <button className="ch-secondary" onClick={() => setPanel("scene")}>
              <i aria-hidden="true">▶</i> 体验课堂作品
            </button>
          </div>
        </section>
        <div
          className="ch-gallery"
          aria-label="课程成果展厅"
          ref={galleryRef}
          onPointerDown={(e) => {
            // Touch and the sideways mobile arc are swiped in useGalleryMotion.
            drag.current =
              e.target === e.currentTarget &&
              e.pointerType === "mouse" &&
              window.innerWidth > 1000
                ? e.clientY
                : null;
          }}
          onPointerUp={(e) => {
            if (
              drag.current !== null &&
              Math.abs(e.clientY - drag.current) > 40
            ) {
              select(active + (e.clientY < drag.current ? 1 : -1));
            }
            drag.current = null;
          }}
          onPointerCancel={() => (drag.current = null)}
        >
          <div className="ch-gallery-grid" />
          <div className="ch-floating-note">
            <span>先看作品，再看怎么学</span>
            <i>✳</i>
          </div>
          <div className="ch-stage">
            {scenes.map((scene, i) => {
              let offset = (i - active + 5) % 5;
              if (offset > 2) offset -= 5;
              const Art = art[i];
              return (
                <div
                  key={scene.kind}
                  role="group"
                  inert={offset !== 0 ? true : undefined}
                  aria-label={"探索" + scene.short}
                  className={
                    "ch-art-card " +
                    (i === 3
                      ? "music-art-card "
                      : i === 4
                        ? "agent-art-card "
                        : i === 2
                          ? "story-art-card "
                          : i === 0
                            ? "skill-art-card "
                            : "vibe-art-card ") +
                    (offset === 0 ? "selected" : "")
                  }
                  style={
                    {
                      "--offset": offset,
                      "--depth": Math.abs(offset),
                      zIndex: 5 - Math.abs(offset),
                    } as React.CSSProperties
                  }
                >
                  <Art active={active === i && !panel && heroActivity.active} />
                </div>
              );
            })}
          </div>
        </div>
        <aside
          className="ch-scene-details"
          aria-label="作品与学习内容，可滚动切换"
          ref={descriptionsRef}
          onKeyDown={(e) => {
            if (
              ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                e.key,
              )
            ) {
              e.preventDefault();
              e.stopPropagation();
              moveBy(["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 1);
            }
          }}
        >
          {Array.from({ length: 7 }, (_, slot) => {
            const itemPosition = position + slot - 3;
            const offset = itemPosition - position;
            const index =
              ((itemPosition % scenes.length) + scenes.length) % scenes.length;
            const scene = scenes[index];
            return (
              <article
                className="ch-scene-caption"
                key={itemPosition}
                data-position={itemPosition}
                data-current={offset === 0}
                aria-hidden={Math.abs(offset) > captionReach ? true : undefined}
                inert={Math.abs(offset) > captionReach ? true : undefined}
                style={
                  {
                    "--caption-offset": offset,
                    "--caption-opacity": [1, 0.24, 0.09, 0][Math.abs(offset)],
                  } as React.CSSProperties
                }
              >
                <span>{scene.tag} · 课程演示</span>
                <h2>
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-current={offset === 0 ? "true" : undefined}
                  >
                    {/* One span per clause: the swipe layout wraps between them. */}
                    {scene.name.match(/[^，]+，?/g)?.map((clause) => (
                      <span key={clause}>{clause}</span>
                    ))}
                  </button>
                </h2>
                {scene.platform && (
                  <p className="ch-scene-platform">
                    {scene.platform}{" "}
                    <a
                      href={zoraTv.href}
                      target="_blank"
                      rel="noopener"
                      tabIndex={offset === 0 ? undefined : -1}
                    >
                      {zoraTv.name}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                )}
              </article>
            );
          })}
        </aside>
        {/* Shown by the swipe layout only; the desktop arc lists its captions. */}
        <nav className="ch-scene-tabs" aria-label="切换课程作品">
          {scenes.map((scene, i) => (
            <button
              key={scene.kind}
              type="button"
              aria-current={i === active ? "true" : undefined}
              onClick={() => select(i)}
            >
              {scene.short}
            </button>
          ))}
        </nav>
      </div>
      <CourseAudience />
      <CourseSyllabus />
      <FacultySection />
      <StudentWorks />
      <CourseNextStep />
      {panel && (
        <Modal
          onClose={() => setPanel(null)}
          label={scenes[active].short + "课程演示"}
          className="ch-modal"
        >
          <section className="ch-panel">
            <button
              className="ch-close"
              onClick={() => setPanel(null)}
              aria-label="关闭"
            >
              关闭 ×
            </button>

            <>
              <span className="ch-panel-eyebrow">
                {scenes[active].tag} / 课程演示
              </span>
              <h2>{scenes[active].name}</h2>
              <div className="ch-detail-art">
                {(() => {
                  const Art = art[active];
                  return <Art />;
                })()}
              </div>
              <p className="ch-panel-lead">{scenes[active].result}</p>
              <div className="ch-detail-skills">{scenes[active].skills}</div>
              <div className="ch-panel-actions">
                <button
                  className="ch-primary"
                  onClick={() => {
                    setPanel(null);
                    // Scroll after the dialog restores focus to its trigger.
                    requestAnimationFrame(() => {
                      document.getElementById("schedule")?.scrollIntoView({
                        behavior: window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches
                          ? "instant"
                          : "smooth",
                      });
                    });
                  }}
                >
                  查看课程安排 <span>↗</span>
                </button>
                {scenes[active].platform && (
                  <a
                    className="ch-secondary"
                    href={zoraTv.href}
                    target="_blank"
                    rel="noopener"
                  >
                    打开 {zoraTv.name} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </>
          </section>
        </Modal>
      )}
    </main>
  );
}
