import { CourseSectionHeading } from "./CourseSectionHeading";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { instructor, facultyModules, facultyKit } from "./faculty-data";
import "./faculty-section.css";
import { useVisibleActivity } from "../lib/useVisibleActivity";
import { AvatarVoice } from "../lib/avatarVoice";
import { AvatarFace } from "../lib/avatarFace";

type Answer = {
  text: string;
  modules?: number[];
  link?: "schedule" | "student-works";
};
type ChatTurn = {
  id: number;
  question: string;
  answer: Answer;
  text: string;
  complete: boolean;
  /** Answered by the realtime model rather than the preset script. */
  live?: boolean;
  /** Voice question whose transcript has not arrived yet. */
  hearing?: boolean;
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
      text: "我是小Z的数字分身演示，主讲 AI 全栈开发、Agent 系统与 AI 影视创作。可以向我了解课程内容和随堂练习。",
      modules: [0, 1, 2],
    };
  return {
    text: "我目前可以回答课程安排、学习内容和课前准备等常见问题。这是预设问答演示，你也可以点选下方问题，或查看完整课程大纲。",
    link: "schedule",
  };
}

// No first reply within this window: fall back to the preset answer.
const LIVE_TIMEOUT = 10000;
const HOLD_MS = 450;

export function FacultySection() {
  const activity = useVisibleActivity<HTMLElement>();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(""),
    [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false),
    [listening, setListening] = useState(false),
    [playing, setPlaying] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [voiceNotice, setVoiceNotice] = useState("");
  const activeTurn = useRef(0);
  const followLatest = useRef(true);
  const response = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null),
    timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pending = useRef<Answer | null>(null);
  const voice = useRef<AvatarVoice | null>(null);
  const live = useRef<{
    turn: string;
    id: number;
    question: string;
    replied: boolean;
    timeout?: ReturnType<typeof setTimeout>;
  } | null>(null);
  const press = useRef(0);
  const faceCanvas = useRef<HTMLCanvasElement>(null);
  const face = useRef<AvatarFace | null>(null);
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stopSpeech = () => window.speechSynthesis?.cancel();
  const update = (id: number, change: (turn: ChatTurn) => ChatTurn) =>
    setTurns((previous) =>
      previous.map((turn) => (turn.id === id ? change(turn) : turn)),
    );
  function endLive() {
    if (live.current?.timeout) clearTimeout(live.current.timeout);
    live.current = null;
  }
  function getVoice() {
    if (!AvatarVoice.supported()) return null;
    if (!voice.current)
      voice.current = new AvatarVoice({
        onUserText(turn, text, final) {
          const current = live.current;
          if (current?.turn !== turn) return;
          current.question = text;
          update(current.id, (t) => ({
            ...t,
            question: text,
            hearing: !final && !text,
            answer: final
              ? { ...t.answer, link: answerFor(text).link }
              : t.answer,
          }));
        },
        onDelta(turn, text) {
          const current = live.current;
          if (current?.turn !== turn) return;
          current.replied = true;
          if (current.timeout) clearTimeout(current.timeout);
          update(current.id, (t) => ({
            ...t,
            text: t.text + text,
            hearing: false,
          }));
        },
        onDone(turn) {
          const current = live.current;
          if (current?.turn !== turn) return;
          update(current.id, (t) => ({ ...t, complete: true }));
          endLive();
          setBusy(false);
        },
        onEmpty(turn) {
          const current = live.current;
          if (current?.turn !== turn) return;
          setTurns((previous) => previous.filter((t) => t.id !== current.id));
          endLive();
          setBusy(false);
          setListening(false);
          setVoiceNotice("没有听清，请再说一次，或直接输入问题。");
        },
        onError(message) {
          const current = live.current;
          setListening(false);
          if (!current) return;
          endLive();
          if (current.replied) {
            update(current.id, (t) => ({ ...t, complete: true }));
            setBusy(false);
          } else if (current.question) fallback(current.id, current.question);
          else {
            setTurns((previous) => previous.filter((t) => t.id !== current.id));
            setBusy(false);
            setVoiceNotice(message);
          }
        },
        onLevel: (level) => face.current?.setSpeech(level),
        onPlaying: setPlaying,
      });
    return voice.current;
  }
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
      endLive();
      voice.current?.close();
      face.current?.destroy();
      window.speechSynthesis?.cancel();
    },
    [],
  );
  useEffect(() => voice.current?.setMuted(muted), [muted]);
  useEffect(() => {
    if (!activity.active || !faceCanvas.current) return;
    if (!face.current) {
      face.current = new AvatarFace(faceCanvas.current);
      face.current.ready.catch(() => undefined);
    }
    face.current.motion = !reduced();
    face.current.start();
    return () => face.current?.stop();
  }, [activity.active]);
  useEffect(() => {
    if (response.current && followLatest.current)
      response.current.scrollTop = response.current.scrollHeight;
  }, [turns]);
  useEffect(() => {
    if (activity.active) return;
    setOpen(false);
    stopSpeech();
    stopLive();
    if (pending.current) finish(pending.current);
  }, [activity.active]);
  function finish(a: Answer) {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    pending.current = null;
    const id = activeTurn.current;
    update(id, (turn) => ({ ...turn, text: a.text, complete: true }));
    setBusy(false);
  }
  /** Stop listening and the current live answer, keeping what was said. */
  function stopLive() {
    const current = live.current;
    voice.current?.stopRecording(false);
    voice.current?.interrupt();
    setListening(false);
    if (!current) return;
    endLive();
    if (current.replied)
      update(current.id, (t) => ({ ...t, complete: true, hearing: false }));
    else setTurns((previous) => previous.filter((t) => t.id !== current.id));
    setBusy(false);
  }
  /** Preset answer, typed out (used offline or when the live service fails). */
  function fallback(id: number, question: string) {
    const a = answerFor(question);
    pending.current = a;
    activeTurn.current = id;
    update(id, (turn) => ({
      ...turn,
      question,
      answer: a,
      live: false,
      hearing: false,
    }));
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
      update(id, (turn) => ({ ...turn, text: a.text.slice(0, length) }));
      if (length >= a.text.length) finish(a);
    }, 45);
  }
  function watch(turn: string, id: number, question: string) {
    const current = { turn, id, question, replied: false } as NonNullable<
      typeof live.current
    >;
    current.timeout = setTimeout(() => {
      if (live.current !== current || current.replied) return;
      voice.current?.interrupt();
      endLive();
      if (current.question) fallback(id, current.question);
      else stopLive();
    }, LIVE_TIMEOUT);
    live.current = current;
  }
  function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    stopSpeech();
    setOpen(false);
    setInput("");
    setVoiceNotice("");
    const id = ++activeTurn.current;
    followLatest.current = true;
    setTurns((previous) => [
      ...previous,
      {
        id,
        question: q,
        answer: { text: "", link: answerFor(q).link },
        text: "",
        complete: false,
        live: true,
      },
    ]);
    setBusy(true);
    const client = getVoice();
    if (!client) {
      fallback(id, q);
      return;
    }
    // askText creates the AudioContext synchronously inside this click.
    client
      .askText(q)
      .then((turn) => {
        if (activeTurn.current === id) watch(turn, id, q);
      })
      .catch(() => {
        if (activeTurn.current === id) fallback(id, q);
      });
  }
  async function startVoice() {
    if (listening || busy) return;
    const client = getVoice();
    if (!client || !AvatarVoice.canRecord()) {
      setVoiceNotice("当前浏览器不支持语音，请在下方输入问题。");
      field.current?.focus();
      return;
    }
    stopSpeech();
    setOpen(false);
    setVoiceNotice("");
    setListening(true);
    press.current = performance.now();
    try {
      const turn = await client.startRecording();
      if (!press.current) {
        // Released before the microphone was ready: discard quietly.
        client.stopRecording(false);
        setListening(false);
        return;
      }
      const id = ++activeTurn.current;
      followLatest.current = true;
      setTurns((previous) => [
        ...previous,
        {
          id,
          question: "",
          answer: { text: "" },
          text: "",
          complete: false,
          live: true,
          hearing: true,
        },
      ]);
      watch(turn, id, "");
      if (live.current?.timeout) clearTimeout(live.current.timeout);
    } catch (error) {
      setListening(false);
      setVoiceNotice(
        error instanceof Error
          ? error.message
          : "语音暂不可用，请直接输入问题。",
      );
    }
  }
  function sendVoice() {
    const current = live.current;
    press.current = 0;
    if (!voice.current?.listening || !current) return;
    voice.current.stopRecording(true);
    setListening(false);
    setBusy(true);
    watch(current.turn, current.id, current.question);
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
        <CourseSectionHeading
          id="faculty-title"
          title="师资团队"
          description="Zora Studio"
        />
        <div className="ft-composition">
          <div className="ft-expertise">
            <h3>
              专业领域 <small>Expertise</small>
            </h3>
            <ul className="ft-fields">
              {instructor.expertise.map(([zh, en]) => (
                <li key={zh}>
                  {zh}
                  <small>{en}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="ft-stat ft-stat-duration">
            <div className="ft-stat-value">
              <span>{instructor.stats[0][0]}</span>
              <small>{instructor.stats[0][1]}</small>
            </div>
            <p>{instructor.stats[0][2]}</p>
          </div>
          <div className="ft-person">
            <div
              className="ft-chat"
              ref={response}
              role="log"
              aria-label="与数字人讲师的对话"
              aria-live="polite"
              aria-relevant="additions text"
              aria-busy={busy}
              tabIndex={0}
              onScroll={(event) => {
                const el = event.currentTarget;
                followLatest.current =
                  el.scrollHeight - el.scrollTop - el.clientHeight < 32;
              }}
            >
              <div className="ft-chat-messages">
                {turns.length === 0 && (
                  <div
                    className="ft-message ft-message-assistant"
                    data-latest="true"
                  >
                    <p>Hi，关于课程，想先了解什么？</p>
                  </div>
                )}
                {turns.map((turn, index) => {
                  const style = {
                    "--message-opacity": Math.max(
                      0.18,
                      0.58 ** (turns.length - 1 - index),
                    ),
                  } as CSSProperties;
                  return (
                    <div className="ft-chat-turn" key={turn.id}>
                      <div
                        className="ft-message ft-message-user"
                        data-latest={index === turns.length - 1}
                        style={style}
                      >
                        <span className="ft-sr-only">你：</span>
                        <p>
                          {turn.question ||
                            (turn.hearing &&
                            listening &&
                            index === turns.length - 1
                              ? "正在听…"
                              : "正在识别…")}
                        </p>
                      </div>
                      {/* No reply bubble until the voice question is sent. */}
                      {!(
                        turn.hearing &&
                        listening &&
                        index === turns.length - 1
                      ) && (
                        <div
                          className="ft-message ft-message-assistant ft-answer"
                          data-latest={index === turns.length - 1}
                          style={style}
                        >
                          <span className="ft-sr-only">数字人讲师：</span>
                          <p>
                            {turn.text || "正在组织回答…"}
                            {!turn.complete && (
                              <span className="ft-caret" aria-hidden="true" />
                            )}
                          </p>
                          <div className="ft-answer-actions">
                            {turn.complete && turn.answer.link && (
                              <a href={`#${turn.answer.link}`}>
                                {turn.answer.link === "schedule"
                                  ? "查看课程大纲"
                                  : "查看学员作品"}{" "}
                                ↗
                              </a>
                            )}
                            {!turn.complete && !turn.live && (
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
                            {!turn.complete && turn.live && turn.text && (
                              <button type="button" onClick={stopLive}>
                                停止回答
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ft-avatar">
              <div
                className="ft-stage"
                data-open={open}
                data-speaking={busy || playing || listening}
                tabIndex={0}
                role="img"
                aria-label={`${instructor.name}的互动头像`}
                onMouseEnter={() => !busy && !listening && setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => !busy && !listening && setOpen(true)}
                onBlur={() => setOpen(false)}
              >
                <div className="ft-head">
                  <div className="ft-head-inner">
                    <img
                      className="ft-head-top"
                      src={instructor.avatar}
                      alt=""
                    />
                    <img
                      className="ft-head-bottom"
                      src={instructor.avatar}
                      alt=""
                    />
                    <canvas
                      className="ft-face"
                      ref={faceCanvas}
                      aria-hidden="true"
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
            </div>
            <div className="ft-conversation">
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
                  aria-label={listening ? "结束并发送语音" : "语音提问"}
                  aria-pressed={listening}
                  title="点一下开始说，再点一下发送；也可以按住说话"
                  onPointerDown={(event) => {
                    if (event.button !== 0) return;
                    if (listening) sendVoice();
                    else void startVoice();
                  }}
                  onPointerUp={() => {
                    // Held long enough: push-to-talk, send on release.
                    if (
                      press.current &&
                      performance.now() - press.current > HOLD_MS
                    )
                      sendVoice();
                  }}
                  onClick={(event) => {
                    // Keyboard activation (detail 0) toggles.
                    if (event.detail !== 0) return;
                    if (listening) sendVoice();
                    else void startVoice();
                  }}
                  onContextMenu={(event) => event.preventDefault()}
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
                  placeholder={
                    listening ? "正在听，请说话…" : "直接向讲师提问…"
                  }
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
              {suggestions}
              {voiceNotice && (
                <p className="ft-voice-notice" role="status">
                  {voiceNotice}
                </p>
              )}
            </div>
          </div>
          <blockquote className="ft-statement">
            {instructor.highlights.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
          <div className="ft-stat ft-stat-hours">
            <span className="ft-and">以及</span>
            <div>
              <div className="ft-stat-value">
                <span>{instructor.stats[1][0]}</span>
                <small>{instructor.stats[1][1]}</small>
              </div>
              <p>{instructor.stats[1][2]}</p>
            </div>
          </div>
          <p className="ft-closing">
            {instructor.closing.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
