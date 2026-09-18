import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { reportPages as pages, reportSources } from "./PptReportSlide";
import { PptSlideTransition } from "./PptSlideTransition";
import "./ppt-skill-card.css";

export const skillPrompt =
  "把电商调研做成 3 页 PPT，用动态图表展示增长变化，整体简洁、有设计感。";
type Scene = "intro" | "pressing" | "result" | "resetting";
export function PptSkillCard({ active = true }: { active?: boolean }) {
  const [reducedMotion] = useState(
    () =>
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [scene, setScene] = useState<Scene>("intro");
  const [typing, setTyping] = useState(0);
  const [page, setPage] = useState(0);
  const [replay, setReplay] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [autoplay, setAutoplay] = useState(!reducedMotion);
  const sendButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const typingDuration = skillPrompt.length * 45 + 250;
  const ready = reducedMotion || typing >= typingDuration;
  const intro = scene === "intro";
  const composing = intro || scene === "pressing";
  const result = scene === "result" || scene === "resetting";
  const prompt =
    !intro || reducedMotion
      ? skillPrompt
      : skillPrompt.slice(0, Math.floor(typing / 45));
  useEffect(() => {
    if (!active || !intro || ready) return;
    const timer = setInterval(
      () => setTyping((value) => Math.min(typingDuration, value + 50)),
      50,
    );
    return () => clearInterval(timer);
  }, [active, intro, ready, typingDuration]);
  useEffect(() => {
    if (!active || !intro || !ready) return;
    const timer = setTimeout(() => setScene("pressing"), 700);
    return () => clearTimeout(timer);
  }, [active, intro, ready]);
  useEffect(() => {
    if (!active || scene !== "pressing") return;
    // Finish the 320ms click, then hold the cursor for 700ms before revealing page one.
    const timer = setTimeout(
      () => setScene("result"),
      reducedMotion ? 80 : 1020,
    );
    return () => clearTimeout(timer);
  }, [active, scene, reducedMotion]);
  useEffect(() => {
    if (
      !active ||
      scene !== "result" ||
      expanded ||
      hovering ||
      focusWithin ||
      !autoplay
    )
      return;
    const timer = setTimeout(() => {
      if (page === pages.length - 1) {
        setScene("resetting");
      } else {
        setDirection(1);
        setPage(page + 1);
        setReplay((value) => value + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [active, scene, expanded, hovering, focusWithin, autoplay, page, replay]);
  useEffect(() => {
    if (
      !active ||
      scene !== "resetting" ||
      expanded ||
      hovering ||
      focusWithin ||
      !autoplay
    )
      return;
    const timer = setTimeout(
      () => {
        setPage(0);
        setTyping(0);
        setDirection(1);
        setScene("intro");
      },
      reducedMotion ? 0 : 450,
    );
    return () => clearTimeout(timer);
  }, [active, scene, expanded, hovering, focusWithin, autoplay, reducedMotion]);
  useEffect(() => {
    if (!active) {
      setExpanded(false);
      setHovering(false);
      setFocusWithin(false);
    }
  }, [active]);
  useEffect(() => {
    if (intro && restoreFocus.current) {
      sendButton.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [intro]);
  const send = () => {
    if (!active || !intro) return;
    setTyping(typingDuration);
    setScene("pressing");
  };
  const restart = () => {
    if (!active) return;
    restoreFocus.current = true;
    setExpanded(false);
    setHovering(false);
    setFocusWithin(false);
    setPage(0);
    setDirection(1);
    setTyping(0);
    setScene("intro");
  };
  const select = (next: number) => {
    if (!active || !result) return;
    setDirection(next < page ? -1 : 1);
    setScene("result");
    setPage((next + pages.length) % pages.length);
    setReplay((value) => value + 1);
  };
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (expanded && (event.key === "Escape" || event.key === "Tab")) return;
    event.stopPropagation();
    if (result && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
      event.preventDefault();
      select(page + (event.key === "ArrowRight" ? 1 : -1));
    }
  };
  return (
    <div
      className="ppt-skill"
      data-scene={scene}
      data-active={active}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={keyboard}
    >
      <header className="ps-heading">
        <span className="ps-title">
          PPT 设计 <b>Skill</b>
        </span>
        <div className="ps-heading-actions">
          <small>交互演示</small>
          {!intro && (
            <button
              type="button"
              className="ps-restart"
              disabled={!active}
              onClick={restart}
            >
              ↻ 重新演示
            </button>
          )}
        </div>
      </header>
      <div className="ps-invitation" aria-hidden={!composing}>
        <h3>说出想法，让 Skill 完成作品。</h3>
        <p>一个需求，一份有设计、有动画的报告。</p>
      </div>
      <div className="ps-report-stage" aria-hidden={!result}>
        {result && (
          <div
            className="ps-workspace"
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") {
                setHovering(true);
                if (scene === "resetting") setScene("result");
              }
            }}
            onPointerLeave={() => setHovering(false)}
            onFocusCapture={(event) => {
              if (event.target.matches(":focus-visible")) {
                setFocusWithin(true);
                if (scene === "resetting") setScene("result");
              }
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setFocusWithin(false);
            }}
            onPointerDown={() => setFocusWithin(false)}
          >
            <nav className="ps-thumbnails" aria-label="PPT 页面">
              {pages.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  disabled={!active}
                  aria-label={`查看${label}`}
                  aria-pressed={page === i}
                  onClick={() => select(i)}
                >
                  <span>0{i + 1}</span>
                  {label}
                </button>
              ))}
            </nav>
            <button
              className="ps-preview"
              type="button"
              disabled={!active}
              aria-label={`放大查看${pages[page]}`}
              onClick={() => {
                setScene("result");
                setExpanded(true);
              }}
            >
              <PptSlideTransition
                page={page}
                replay={replay}
                active={active && !expanded}
                direction={direction}
                reducedMotion={reducedMotion}
                wide
              />
              <span className="ps-expand" aria-hidden="true">
                放大 ↗
              </span>
            </button>
            <div className="ps-report-controls">
              <div className="ps-playback-controls">
                <button
                  className="ps-autoplay"
                  type="button"
                  disabled={!active}
                  aria-label={autoplay ? "暂停循环演示" : "开启循环演示"}
                  aria-pressed={autoplay}
                  onClick={() => {
                    setScene("result");
                    setAutoplay((value) => !value);
                  }}
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    {autoplay ? (
                      <path d="M7 5v10M13 5v10" />
                    ) : (
                      <path d="m7 4 9 6-9 6Z" />
                    )}
                  </svg>
                </button>
                <button
                  className="ps-replay"
                  type="button"
                  disabled={!active}
                  aria-label="重播当前幻灯片动画"
                  onClick={() => {
                    setScene("result");
                    setReplay((value) => value + 1);
                  }}
                >
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 8a6 6 0 1 1 .5 5M4 3v5h5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="ps-composer"
        data-ready={ready}
        aria-label="预设提示词演示"
      >
        <div className="ps-prompt" role="group" aria-label={skillPrompt}>
          <span aria-hidden="true">{prompt}</span>
          {intro && !ready && (
            <i className="ps-typing-caret" aria-hidden="true" />
          )}
        </div>
        <div className="ps-composer-footer">
          <span
            className="ps-skill-tag"
            data-visible={!intro || ready}
            aria-hidden={intro && !ready}
            title="整理数据、设计图表、编排动画"
          >
            <b>@</b> PPT 设计 Skill
          </span>
          <button
            ref={sendButton}
            className="ps-send"
            type="button"
            disabled={!active || !intro}
            onClick={send}
            aria-label={
              intro ? "发送提示词并调用 PPT 设计 Skill" : "提示词已发送"
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {composing ? (
                <path d="M12 19V5m-7 7 7-7 7 7" />
              ) : (
                <path d="m6 12 4 4 8-8" />
              )}
            </svg>
            {active &&
              !reducedMotion &&
              ((intro && ready) || scene === "pressing") && (
                <span
                  className="ps-demo-cursor"
                  data-clicking={scene === "pressing"}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 32">
                    <path d="M2 2v23l6-6 5 11 5-2-5-10h9L2 2Z" />
                  </svg>
                </span>
              )}
          </button>
        </div>
      </div>
      <p
        className="ps-send-hint"
        data-visible={intro && ready}
        aria-hidden={!intro || !ready}
      >
        即将自动发送
      </p>
      {expanded &&
        active &&
        createPortal(
          <Modal
            label="PPT 作品预览"
            className="ps-modal"
            onClose={() => setExpanded(false)}
          >
            <section className="ps-lightbox">
              <header>
                <span>PPT 设计 Skill / 电商行业调研报告</span>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="关闭 PPT 预览"
                >
                  关闭 ×
                </button>
              </header>
              <div className="ps-large-sheet">
                <PptSlideTransition
                  page={page}
                  replay={replay}
                  active={active}
                  direction={direction}
                  reducedMotion={reducedMotion}
                />
              </div>
              <footer>
                <span>
                  {pages[page]} · 0{page + 1} / 03
                </span>
                <nav aria-label="切换预览页面">
                  <button
                    type="button"
                    className="ps-replay"
                    aria-label="重播放大预览动画"
                    onClick={() => setReplay((value) => value + 1)}
                  >
                    ↻ 重播动效
                  </button>
                  <button
                    type="button"
                    onClick={() => select(page - 1)}
                    aria-label="上一页"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => select(page + 1)}
                    aria-label="下一页"
                  >
                    →
                  </button>
                </nav>
              </footer>
              <div className="ps-sources">
                数据出处：
                {reportSources
                  .filter(
                    (_, i) => page === 0 || (page === 1 ? i >= 2 : i === 3),
                  )
                  .map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label} ↗
                    </a>
                  ))}
              </div>
            </section>
          </Modal>,
          document.body,
        )}
    </div>
  );
}
