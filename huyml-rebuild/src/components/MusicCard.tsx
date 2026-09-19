import {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import track from "../data/music-demo.json";
import { ZoraTvBadge } from "./ZoraTvBadge";
import "./music-card.css";

const formatTime = (value: number) =>
  `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;

const MusicLyrics = memo(function MusicLyrics({ index }: { index: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const previousIndex = useRef(index);

  useLayoutEffect(() => {
    if (!rail.current) return;
    // A seek skips directly to its destination; adjacent lines keep their momentum.
    rail.current.dataset.jump = String(
      Math.abs(index - previousIndex.current) > 1,
    );
    rail.current.style.setProperty("--lyric-index", String(index));
    previousIndex.current = index;
  }, [index]);

  return (
    <div className="music-lyrics" aria-label="同步歌词" lang="zh-CN">
      <div className="music-lyric-rail" ref={rail}>
        {track.lyrics.map((line, i) => (
          <p
            key={line.time}
            className={`music-lyric-line ${i === index ? "music-lyric-current" : i === index - 1 ? "music-lyric-previous" : i === index + 1 ? "music-lyric-next" : ""}`}
            aria-current={i === index ? "true" : undefined}
            aria-hidden={Math.abs(i - index) > 1}
          >
            <span>{line.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
});

export function MusicCard({ active = true }: { active?: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const enabled = useRef(active);
  const motion = useRef({ angle: 0, speed: 0 });
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(track.duration);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  enabled.current = active;

  useEffect(() => {
    if (!active) audio.current?.pause();
  }, [active]);
  useEffect(() => {
    const element = audio.current;
    return () => {
      element?.pause();
    };
  }, []);
  useEffect(() => {
    let frame = 0,
      previous = performance.now();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const state = motion.current;
      state.speed +=
        ((playing && !reduced ? 60 : 0) - state.speed) *
        (1 - Math.exp(-dt * 9));
      state.angle = (state.angle + state.speed * dt) % 360;
      if (disc.current)
        disc.current.style.transform = `rotate(${state.angle}deg)`;
      if (playing && audio.current) setTime(audio.current.currentTime);
      if (playing || state.speed > 0.05) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = async () => {
    const element = audio.current;
    if (!element || !active || loading) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (element.ended) element.currentTime = 0;
      await element.play();
      if (!enabled.current) element.pause();
    } catch (cause) {
      if (
        enabled.current &&
        !(cause instanceof DOMException && cause.name === "AbortError")
      )
        setError("暂时无法播放，点击重试");
    } finally {
      setLoading(false);
    }
  };
  const seek = (value: number) => {
    if (!audio.current || !Number.isFinite(audio.current.duration)) return;
    audio.current.currentTime = value;
    setTime(value);
  };
  const lyricIndex = track.lyrics.reduce(
    (found, line, i) => (time >= line.time ? i : found),
    -1,
  );
  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div
      className="ch-music music-player"
      data-playing={playing}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <audio
        ref={audio}
        src={track.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => {
          if (!enabled.current) {
            audio.current?.pause();
            return;
          }
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setLoading(false);
          setPlaying(false);
          setError("音频未加载成功，点击重试");
        }}
      />
      <span className="music-eyebrow">音乐探索</span>
      <div className="music-layout">
        <div className="music-listening">
          <MusicLyrics index={Math.max(0, lyricIndex)} />
          <div className="music-console">
            <div className="music-controls">
              <button
                type="button"
                className="music-play"
                disabled={!active || loading}
                onClick={toggle}
                aria-label={playing ? "暂停音乐" : "播放音乐"}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 5v14M17 5v14"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m8 4 13 8-13 8Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <div className="music-track-info">
                <b>{track.title}</b>
                <span>{loading ? "正在加载…" : track.artist}</span>
              </div>
            </div>
            <div
              className="music-waveform"
              style={{ "--music-progress": `${progress}%` } as CSSProperties}
            >
              <svg
                viewBox="0 0 480 64"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="music-wave-base"
              >
                {track.peaks.map((peak, i) => (
                  <rect
                    key={i}
                    x={i * 6 + 1}
                    y={32 - peak * 30}
                    width="2.5"
                    height={Math.max(2, peak * 60)}
                    rx="1.25"
                  />
                ))}
              </svg>
              <svg
                viewBox="0 0 480 64"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="music-wave-played"
              >
                {track.peaks.map((peak, i) => (
                  <rect
                    key={i}
                    x={i * 6 + 1}
                    y={32 - peak * 30}
                    width="2.5"
                    height={Math.max(2, peak * 60)}
                    rx="1.25"
                  />
                ))}
              </svg>
              <span className="music-playhead" aria-hidden="true" />
              <input
                type="range"
                min="0"
                max={duration}
                step="0.01"
                value={Math.min(time, duration)}
                disabled={!active}
                aria-label="音乐播放进度"
                aria-valuetext={`${formatTime(time)}，共 ${formatTime(duration)}`}
                onChange={(e) => seek(Number(e.target.value))}
              />
            </div>
            <div className="music-time">
              <span>{formatTime(time)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="music-record-column" aria-hidden="true">
          <div className="ch-record" ref={disc} aria-hidden="true">
            <i>
              <span>{track.title}</span>
              <b>{track.artist}</b>
            </i>
          </div>
        </div>
      </div>
      <small className="music-credit">AI 音乐 / 原创作品</small>
      {/* The song was made on our own canvas; the badge opens it. */}
      <ZoraTvBadge active={active} />
      {error && (
        <p className="music-error" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
