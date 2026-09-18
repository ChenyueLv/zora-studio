import { useEffect, useState } from "react";
import {
  interviewDemos,
  DEMO_DURATION,
  QUESTION_END,
  ANSWER_START,
  ANSWER_LINE_DURATION,
} from "../data/cv-agent-demo";
import "./cv-agent-card.css";

function Highlight({ text, phrase }: { text: string; phrase: string }) {
  const start = text.indexOf(phrase);
  return start < 0 ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, start)}
      <mark>{phrase}</mark>
      {text.slice(start + phrase.length)}
    </>
  );
}
export function CvAgentCard({ active = true }: { active?: boolean }) {
  const [{ index, elapsed }, setPlayback] = useState({ index: 0, elapsed: 0 });
  const [language, setLanguage] = useState<"zh" | "en">("en");
  const [reducedMotion] = useState(
    () =>
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const running = active;
  const demo = interviewDemos[index];
  const bilingual = language === "en";
  const answer = bilingual ? demo.english.answer : demo.answer;
  const changeLanguage = (next: "zh" | "en") => {
    if (!active || next === language) return;
    setLanguage(next);
    setPlayback((value) => ({ ...value, elapsed: 0 }));
  };
  useEffect(() => {
    if (!running) return;
    let previous = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = now - previous;
      previous = now;
      setPlayback((value) => {
        const total = value.elapsed + delta;
        return {
          index:
            (value.index + Math.floor(total / DEMO_DURATION)) %
            interviewDemos.length,
          elapsed: total % DEMO_DURATION,
        };
      });
    }, 50);
    return () => clearInterval(timer);
  }, [running, language]);
  const streamTime = reducedMotion ? DEMO_DURATION : elapsed;
  const answerEnd = ANSWER_START + answer.length * ANSWER_LINE_DURATION;
  const phase =
    streamTime < QUESTION_END
      ? "question"
      : streamTime < ANSWER_START
        ? "translation"
        : streamTime < answerEnd
          ? "answer"
          : "complete";
  const stream = (text: string, start: number, duration: number) =>
    text.slice(
      0,
      Math.floor(
        text.length * Math.max(0, Math.min(1, (streamTime - start) / duration)),
      ),
    );
  const questionText = bilingual ? demo.english.question : demo.question;
  const isTyping = (start: number, end: number) =>
    running && !reducedMotion && streamTime >= start && streamTime < end;
  const caret = (start: number, end: number) =>
    isTyping(start, end) ? (
      <span className="cv-caret" aria-hidden="true" />
    ) : null;
  return (
    <div
      className="ch-agent cv-agent"
      data-phase={phase}
      data-language={language}
      data-running={running}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <header className="cv-heading">
        <span>
          <b>CV Agent</b>
          <span className="cv-heading-divider" />
          多语言面试助手
        </span>
        <span className="cv-demo-label">演示回放</span>
      </header>
      <div className="cv-body">
        <div className="cv-intro">
          <h3>
            跨越语言，
            <br />
            讲清你的
            <br />
            经历。
          </h3>
          <p>
            英文原话，中文理解。
            <br />
            双语回答，逐条对照。
          </p>
          <div
            className="cv-language-switch"
            role="group"
            aria-label="面试演示语言"
          >
            <button
              type="button"
              aria-pressed={!bilingual}
              disabled={!active}
              onClick={() => changeLanguage("zh")}
            >
              中文
            </button>
            <button
              type="button"
              aria-pressed={bilingual}
              disabled={!active}
              onClick={() => changeLanguage("en")}
            >
              EN + 中
            </button>
          </div>
        </div>
        <div className="cv-notes" key={demo.id}>
          <div className="cv-question-heading">
            <span>面试官</span>
            <span>{demo.label}</span>
          </div>
          <p className="cv-question" lang={bilingual ? "en" : "zh-CN"}>
            {stream(questionText, 0, QUESTION_END)}
            {caret(0, QUESTION_END)}
          </p>
          {bilingual && (
            <p
              className="cv-question-translation"
              data-visible={streamTime >= QUESTION_END}
              lang="zh-CN"
            >
              {stream(demo.question, QUESTION_END, ANSWER_START - QUESTION_END)}
              {caret(QUESTION_END, ANSWER_START)}
            </p>
          )}
          <div className="cv-context" data-visible={streamTime >= QUESTION_END}>
            <span>{demo.contextLabel}</span>
            <p>{demo.context}</p>
          </div>
          <div className="cv-answer-heading">
            <span>{bilingual ? "双语回答" : "回答思路"}</span>
            <span className="cv-status" role="status">
              <i data-animating={running && phase !== "complete"} />
              {phase === "question"
                ? "转写问题"
                : phase === "translation"
                  ? "理解问题"
                  : phase === "answer"
                    ? "组织回答"
                    : "示例回答"}
            </span>
          </div>
          <div className="cv-answer" aria-label="示例回答">
            {answer.map((line, i) => {
              const start = ANSWER_START + i * ANSWER_LINE_DURATION;
              const primaryDuration = bilingual ? 1100 : ANSWER_LINE_DURATION;
              return (
                <p
                  key={`${demo.id}-${i}`}
                  data-visible={streamTime > start}
                  className={i === 0 ? "cv-conclusion" : "cv-point"}
                >
                  <span aria-hidden="true">{i === 0 ? "" : "·"}</span>
                  <span>
                    <span lang={bilingual ? "en" : "zh-CN"}>
                      <Highlight
                        text={stream(line.text, start, primaryDuration)}
                        phrase={line.emphasis}
                      />
                      {caret(start, start + primaryDuration)}
                    </span>
                    {bilingual && (
                      <small
                        className="cv-answer-translation"
                        lang="zh-CN"
                        data-visible={streamTime > start + primaryDuration}
                      >
                        {stream(
                          demo.answer[i].text,
                          start + primaryDuration,
                          ANSWER_LINE_DURATION - primaryDuration,
                        )}
                        {caret(
                          start + primaryDuration,
                          start + ANSWER_LINE_DURATION,
                        )}
                      </small>
                    )}
                  </span>
                </p>
              );
            })}
          </div>
          <div className="cv-note-footer">
            <span>示例档案 · 预设问答</span>
          </div>
        </div>
      </div>
      <footer className="cv-footer">
        <span className="cv-page">
          0{index + 1}
          <span> / {String(interviewDemos.length).padStart(2, "0")}</span>
        </span>
      </footer>
      <div className="cv-progress" aria-hidden="true">
        <span
          style={{
            transform: `scaleX(${elapsed / DEMO_DURATION})`,
          }}
        />
      </div>
    </div>
  );
}
