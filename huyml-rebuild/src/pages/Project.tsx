import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/projects.json";
import type { Project as ProjectData } from "../lib/types";
import { Media, Lightbox } from "../components/Media";
export function Project({ navigate }: { navigate: (path: string) => void }) {
  const { slug } = useParams();
  const project = (data as ProjectData[]).find((p) => p.slug === slug);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    setActive(0);
    setPreview(null);
    setScrolled(false);
    document.title = project
      ? project.title + " — Huy Phan"
      : "Project not found";
    const scroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", scroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-30% 0px -45% 0px" },
    );
    refs.current.forEach((e) => e && io.observe(e));
    return () => {
      window.removeEventListener("scroll", scroll);
      io.disconnect();
    };
  }, [slug, project]);
  if (!project)
    return (
      <main className="not-found">
        <h1>PROJECT NOT FOUND</h1>
        <button onClick={() => navigate("/")}>Back to work →</button>
      </main>
    );
  const next =
    (data as ProjectData[]).find((p) => p.slug === project.next) || data[0];
  return (
    <main className={"project-page " + (scrolled ? "is-scrolled" : "")}>
      <aside className="project-info">
        <div className="info-row about-row">
          <span className="muted">About</span>
          <p>{project.about}</p>
        </div>
        <div className="project-role-date">
          <div className="info-row">
            <span className="muted">{project.roleLabel}</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span className="muted">Launch</span>
            <p>{project.date.replace(/([A-Za-z]{3})[a-z]+/, "$1")}</p>
          </div>
        </div>
        <div className="info-row">
          <span className="muted">Recognition</span>
          <p>{project.recognition}</p>
        </div>
        {project.website && (
          <a
            href={project.website}
            className="visit-site"
            target="_blank"
            rel="noreferrer"
          >
            Visit site ⟶
          </a>
        )}
      </aside>
      <div className="project-gallery">
        {project.media.map((item, i) => (
          <div
            key={item.src}
            ref={(e) => {
              refs.current[i] = e;
            }}
            data-index={i}
            className="project-media-item"
          >
            <Media
              item={{ ...item, title: project.title + " — " + (i + 1) }}
              onClick={() => setPreview(i)}
            />
          </div>
        ))}
        <div className="next-project">
          <span className="muted">Next project</span>
          <button onClick={() => navigate("/project/" + next.slug)}>
            {next.title}
            <span>↗</span>
          </button>
          <button onClick={() => navigate("/")} className="back-work">
            All selected work ⟶
          </button>
        </div>
      </div>
      <nav className="project-thumbnails" aria-label="Project image navigation">
        {project.media.map((item, i) => (
          <button
            key={item.src}
            aria-label={"Jump to image " + (i + 1)}
            aria-current={active === i ? "true" : undefined}
            className={active === i ? "active" : ""}
            onClick={() =>
              refs.current[i]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          >
            {item.type === "image" ? (
              <img src={item.src} alt={"Preview " + (i + 1)} loading="lazy" />
            ) : (
              <span>▶</span>
            )}
          </button>
        ))}
      </nav>
      <h1
        className="project-display-title"
        style={
          {
            fontSize: `min(10.5vw,${92 / Math.max(1, project.title.length * 0.58)}vw)`,
            "--mobile-title-size": `${90 / Math.max(1, project.title.length * 0.59)}vw`,
          } as React.CSSProperties
        }
      >
        {project.title}
      </h1>
      <span className="scroll-cue muted">Scroll</span>
      {preview !== null && (
        <Lightbox
          items={project.media.map((m, i) => ({
            ...m,
            title: project.title + " — " + (i + 1),
          }))}
          index={preview}
          onChange={setPreview}
          onClose={() => setPreview(null)}
        />
      )}
    </main>
  );
}
