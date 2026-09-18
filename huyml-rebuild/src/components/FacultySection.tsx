import { useEffect, useRef, useState, type CSSProperties } from "react";
import { instructor, facultyModules, facultyKit } from "./faculty-data";
import "./faculty-section.css";
import { useVisibleActivity } from "../lib/useVisibleActivity";

type Answer = {
  text: string;
  modules?: number[];
  link?: "schedule" | "student-works";
};
type SpeechResult = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechResult) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
const questions = [
  "我 0 基础能学吗？",
  "第 2 天学什么？",
  "学费多少？",
  "要带电脑吗？",
  "怎么报名？",
];
function answerFor(question: string): Answer {
  const has = (...words: string[]) =>
    words.some((word) => question.toLowerCase().includes(word));
  if (has("0 基础", "0基础", "零基础", "小白", "新手"))
    return {
      text: "可以从第一天的提示词工程开始，先理解模型和提问方法，再通过随堂练习逐步完成作品。零基础可跟练，有基础可进阶。",
      modules: [0],
      link: "schedule",
    };
  for (let day = 1; day <= 3; day++)
    if (
      has(`第 ${day} 天`, `第${day}天`, `第${["一", "二", "三"][day - 1]}天`)
    ) {
      const modules = facultyModules
        .map((_, i) => i)
        .filter((i) => facultyModules[i].day.startsWith(`第 ${day} 天`));
      return {
        text: `第 ${day} 天会学习${modules.map((i) => facultyModules[i].name).join("、")}。随堂作品包括：${modules.map((i) => facultyModules[i].out).join("、")}。`,
        modules,
        link: "schedule",
      };
    }
  if (has("学费", "价格", "多少钱", "费用", "优惠", "报名", "名额"))
    return {
      text: "具体班期、费用与报名方式待公布。你可以先查看三天课程大纲，了解课程内容和随堂作品。",
      link: "schedule",
    };
  if (has("电脑", "设备", "准备", "账号"))
    return {
      text: "建议准备一台可联网的笔记本电脑，方便跟练和保存作品。具体工具账号、软件和设备要求，以开课通知为准。",
      link: "schedule",
    };
  if (has("作品", "学员", "效果"))
    return {
      text: "本页下方有作品展示区，支持点击查看完整细节。当前素材标注为展示样例，可以先了解呈现方式。",
      link: "student-works",
    };
  const module = [
    ["提示词", "prompt"],
    ["agent", "智能体"],
    ["skill", "技能"],
    ["图片", "海报"],
    ["音乐", "作曲"],
    ["视频", "漫剧"],
    ["数字人", "口播"],
    ["vibe", "编程", "网页"],
    ["画布", "canvas"],
  ].findIndex((words) => has(...words));
  if (module >= 0) {
    const m = facultyModules[module];
    return {
      text: `「${m.name}」安排在${m.day}。${m.learn}随堂作品：${m.out}。`,
      modules: [module],
      link: "schedule",
    };
  }
  if (has("你是谁", "介绍", "老师", "讲师"))
    return {
      text: "我是讲师 A 的数字分身演示，主讲提示词、Agent 与 Skill。可以向我了解课程内容和随堂练习。",
      modules: [0, 1, 2],
    };
  return {
    text: "我目前可以回答课程安排、学习内容和课前准备等常见问题。这是预设问答演示，你也可以点选下方问题，或查看完整课程大纲。",
    link: "schedule",
  };
}

export function FacultySection() {
  const activity = useVisibleActivity<HTMLElement>();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(""),
    [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false),
    [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const response = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null),
    timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const pending = useRef<Answer | null>(null);
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stopSpeech = () => window.speechSynthesis?.cancel();
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
      recognition.current?.abort();
      window.speechSynthesis?.cancel();
    },
    [],
  );
  useEffect(() => {
    if (response.current && busy)
      response.current.scrollTop = response.current.scrollHeight;
  }, [text, busy]);
  useEffect(() => {
    if (activity.active) return;
    setOpen(false);
    stopSpeech();
    recognition.current?.abort();
    setListening(false);
    if (pending.current) finish(pending.current);
  }, [activity.active]);
  function finish(a: Answer) {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    pending.current = null;
    setText(a.text);
    setAnswer(a);
    setBusy(false);
  }
  function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    recognition.current?.abort();
    setListening(false);
    stopSpeech();
    setOpen(false);
    setInput("");
    setAnswer(null);
    const a = answerFor(q);
    pending.current = a;
    setText("");
    setBusy(true);
    if (!muted && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(a.text);
      utterance.lang = "zh-CN";
      utterance.rate = 1.08;
      window.speechSynthesis.speak(utterance);
    }
    if (reduced()) {
      finish(a);
      return;
    }
    let length = 0;
    timer.current = setInterval(() => {
      length += 2;
      setText(a.text.slice(0, length));
      if (length >= a.text.length) finish(a);
    }, 45);
  }
  function startVoice() {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const browser = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const SR = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!SR) {
      setText("当前浏览器不支持语音识别，请在下方输入问题。");
      field.current?.focus();
      return;
    }
    stopSpeech();
    setOpen(false);
    const rec = new SR();
    recognition.current = rec;
    rec.lang = "zh-CN";
    rec.interimResults = true;
    rec.onresult = (event) =>
      setInput(
        Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(""),
      );
    rec.onend = () => {
      setListening(false);
      recognition.current = null;
    };
    rec.onerror = () => {
      setListening(false);
      setText("未能识别语音，请检查麦克风权限，或直接输入问题。");
    };
    try {
      rec.start();
      setListening(true);
    } catch {
      setText("语音暂不可用，请直接输入问题。");
    }
  }
  const suggestions = (
    <div className="ft-suggestions">
      {questions.map((q) => (
        <button type="button" key={q} disabled={busy} onClick={() => ask(q)}>
          {q}
        </button>
      ))}
    </div>
  );
  return (
    <section
      ref={activity.ref}
      data-active={activity.active}
      className="course-faculty"
      id="team"
      aria-labelledby="faculty-title"
    >
      <div className="ft-inner">
        <header className="ft-heading">
          <h2 id="faculty-title">
            师资团队<small>Faculty</small>
          </h2>
          <span>Zora Studio</span>
        </header>
        <div className="ft-intro">
          <div className="ft-identity">
            <span className="ft-eyebrow">{instructor.en}</span>
            <h3>{instructor.name}</h3>
            <p>{instructor.role}</p>
          </div>
          <blockquote className="ft-statement">
            不讲概念，
            <br />
            只讲明天上班
            <br />
            就能用的东西。
          </blockquote>
        </div>
        <div className="ft-portrait">
          <span className="ft-letter ft-letter-a" aria-hidden="true">
            A
          </span>
          <div
            className="ft-stage"
            data-open={open}
            data-speaking={busy}
            tabIndex={0}
            role="img"
            aria-label={`${instructor.name}的互动头像`}
            onMouseEnter={() => !busy && setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => !busy && setOpen(true)}
            onBlur={() => setOpen(false)}
          >
            <div className="ft-head">
              <div className="ft-head-inner">
                <img className="ft-head-top" src={instructor.avatar} alt="" />
                <img
                  className="ft-head-bottom"
                  src={instructor.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="ft-kit" aria-hidden="true">
              {facultyKit.map((item, i) => (
                <img
                  key={item.id}
                  src={item.src}
                  alt=""
                  style={
                    {
                      "--x": `${item.x}%`,
                      "--y": `${item.y}%`,
                      "--w": `${item.w}%`,
                      "--rotation": `${item.r}deg`,
                      "--spin": `${item.spin}deg`,
                      "--duration": `${item.dur}s`,
                      "--delay": `${i * 45}ms`,
                      zIndex: 10 - i,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>
          <span className="ft-letter ft-letter-i" aria-hidden="true">
            I
          </span>
          <span className="ft-portrait-caption">
            与 AI 一起，把想法做出来。
          </span>
        </div>
        <div className="ft-details">
          <div className="ft-modules">
            <h4>主讲方向</h4>
            {instructor.modules.map((i) => (
              <button
                key={i}
                type="button"
                disabled={busy}
                data-highlight={answer?.modules?.includes(i)}
                onClick={() => ask(facultyModules[i].name)}
              >
                <span>{facultyModules[i].name}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M5 19 19 5M5 5h14v14" />
                </svg>
              </button>
            ))}
          </div>
          <div className="ft-outcomes">
            <h4>一起完成的作品</h4>
            <ul>
              {instructor.modules.map((i) => (
                <li key={i}>{facultyModules[i].out}</li>
              ))}
            </ul>
            <a href="#schedule">
              查看完整课程大纲 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="ft-conversation">
            <h4>关于课程，想了解什么？</h4>
            {suggestions}
            <form
              className="ft-input"
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
            >
              <button
                className="ft-mic"
                type="button"
                disabled={busy}
                aria-label={listening ? "结束语音输入" : "语音输入"}
                aria-pressed={listening}
                onClick={startVoice}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" />
                </svg>
              </button>
              <input
                ref={field}
                value={input}
                maxLength={200}
                aria-label="向讲师提问"
                placeholder="输入你的问题…"
                onChange={(event) => setInput(event.target.value)}
              />
              <button
                className="ft-mute"
                type="button"
                aria-label={muted ? "开启朗读" : "静音"}
                aria-pressed={muted}
                onClick={() => {
                  setMuted(!muted);
                  if (!muted) stopSpeech();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M3 9v6h4l5 4V5L7 9H3Z" />
                  {muted ? (
                    <path d="m16 9 6 6m0-6-6 6" />
                  ) : (
                    <path d="M16 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12" />
                  )}
                </svg>
              </button>
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="发送问题"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M12 19V5m-6 6 6-6 6 6" />
                </svg>
              </button>
            </form>
            {(text || busy) && (
              <div
                className="ft-answer"
                ref={response}
                aria-live="polite"
                aria-busy={busy}
              >
                <p>
                  {text}
                  {busy && <span className="ft-caret" aria-hidden="true" />}
                </p>
                <div className="ft-answer-actions">
                  {answer?.link && (
                    <a href={`#${answer.link}`}>
                      {answer.link === "schedule"
                        ? "查看课程大纲"
                        : "查看学员作品"}{" "}
                      ↗
                    </a>
                  )}
                  {busy && (
                    <button
                      type="button"
                      onClick={() => {
                        stopSpeech();
                        if (pending.current) finish(pending.current);
                      }}
                    >
                      显示完整回答
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
