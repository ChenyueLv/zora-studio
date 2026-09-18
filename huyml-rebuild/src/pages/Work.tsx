import { useEffect, useRef, useState } from "react";
import projectsData from "../data/projects.json";
import type { Project } from "../lib/types";
import { GalleryScene } from "../lib/GalleryScene";
import { useSound } from "../lib/Sound";
import { useMediaQuery } from "../lib/useMediaQuery";
const projects = projectsData as Project[];
let rememberedIndex = 0;
export function Work({
  navigate,
  showreel,
  blocked,
}: {
  navigate: (path: string) => void;
  showreel: () => void;
  blocked: boolean;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const scene = useRef<GalleryScene | null>(null);
  const [index, setIndex] = useState(rememberedIndex);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);
  const mobile = useMediaQuery("(max-width:1199px)");
  const { play } = useSound();
  const playRef = useRef(play);
  playRef.current = play;
  const navRef = useRef(navigate);
  navRef.current = navigate;
  useEffect(() => {
    setLoading(true);
    try {
      scene.current = new GalleryScene(
        mount.current!,
        projects,
        (i) => {
          rememberedIndex = i;
          setIndex(i);
        },
        (i) => navRef.current("/project/" + projects[i].slug),
        () => setLoading(false),
        (kind) => playRef.current(kind),
        rememberedIndex,
      );
    } catch {
      setFallback(true);
      setLoading(false);
    }
    return () => scene.current?.dispose();
  }, [mobile]);
  useEffect(() => scene.current?.setSuspended(blocked), [blocked, mobile]);
  const choose = (i: number) => {
    if (fallback) {
      rememberedIndex = i;
      setIndex(i);
    } else scene.current?.select(i);
  };
  const project = projects[index];
  return (
    <main className="work-page" aria-label="Selected work">
      <div
        ref={mount}
        className="gallery-canvas"
        aria-label="Drag or scroll to browse projects"
      />
      {loading && (
        <div className="loader">
          <span>
            HUYML<sup>©</sup>
          </span>
          <span>Loading selected work…</span>
        </div>
      )}
      {fallback && (
        <a
          className="gallery-fallback"
          href={"/project/" + project.slug}
          onClick={(e) => {
            e.preventDefault();
            navigate("/project/" + project.slug);
          }}
        >
          <img src={project.cover} alt={project.title} />
        </a>
      )}
      <div className="work-role" key={project.slug + "role"}>
        <span className="muted">{project.roleLabel}</span>
        <p>{project.role}</p>
      </div>
      <div className="work-details" key={project.slug + "details"}>
        <div>
          <span className="muted">Launch</span>
          <p>{project.date}</p>
        </div>
        <div>
          <span className="muted">Recognition</span>
          <p>{project.recognition}</p>
        </div>
      </div>
      <div className="work-count">
        <span className="muted count-label">Selected work</span>
        <span className="count-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="count-total">/{projects.length}</span>
      </div>
      <div className="work-titles">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const i = (index + offset + projects.length) % projects.length,
            p = projects[i];
          return (
            <div
              className={"work-title-item " + (offset === 0 ? "current" : "")}
              key={offset}
              style={{ "--offset": offset } as React.CSSProperties}
            >
              <span className="muted">{p.category}</span>
              <button
                onClick={() =>
                  offset === 0 ? navigate("/project/" + p.slug) : choose(i)
                }
                className="project-title"
              >
                {p.title}
              </button>
              <span className="title-dash">—</span>
              <p>{p.description}</p>
            </div>
          );
        })}
      </div>
      <div className="project-palette" aria-label="Project colors">
        {project.colors.map((c, i) => (
          <span key={i} style={{ background: c }} title={c} />
        ))}
      </div>
      <span className="scroll-cue muted">Scroll</span>
      <button className="work-showreel showreel-link" onClick={showreel}>
        ‘25 showreel <span>▶</span>
      </button>
      <div className="gallery-keyboard">
        <button
          onClick={() =>
            fallback
              ? choose((index - 1 + projects.length) % projects.length)
              : scene.current?.step(-1)
          }
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={() =>
            fallback
              ? choose((index + 1) % projects.length)
              : scene.current?.step(1)
          }
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </main>
  );
}
