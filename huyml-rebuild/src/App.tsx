import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Header } from "./components/Header";
import { Contact } from "./components/Contact";
import { Lightbox } from "./components/Media";
import { Work } from "./pages/Work";
import { Project } from "./pages/Project";
import { Playground } from "./pages/Playground";
import { SoundProvider } from "./lib/Sound";
import { site } from "./data/site";
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
);
function Portfolio() {
  const [contact, setContact] = useState(false),
    [reel, setReel] = useState(false),
    [menu, setMenu] = useState(false);
  const routerNavigate = useNavigate(),
    location = useLocation();
  const curtain = useRef<HTMLDivElement>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const navigate = useCallback(
    (path: string) => {
      setContact(false);
      setMenu(false);
      if (path === location.pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      transition.current?.kill();
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      transition.current = gsap
        .timeline()
        .set(curtain.current, { yPercent: 100, visibility: "visible" })
        .to(curtain.current, {
          yPercent: 0,
          duration: reduced ? 0 : 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            routerNavigate(path);
            window.scrollTo(0, 0);
          },
        })
        .to(curtain.current, {
          yPercent: -100,
          duration: reduced ? 0 : 0.5,
          delay: reduced ? 0 : 0.08,
          ease: "power3.inOut",
        })
        .set(curtain.current, { visibility: "hidden" });
    },
    [location.pathname, routerNavigate],
  );
  useEffect(() => {
    if (!location.pathname.startsWith("/project/"))
      document.title = "Huy Phan — Award-winning designer";
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (menu) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menu]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("keydown", escape);
      transition.current?.kill();
    };
  }, []);
  return (
    <>
      <Header
        navigate={navigate}
        contact={() => setContact((v) => !v)}
        showreel={() => {
          setReel(true);
          setMenu(false);
        }}
        menu={menu}
        setMenu={setMenu}
        contactOpen={contact}
      />
      <Suspense
        fallback={<main className="route-loading" aria-label="Loading page" />}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Work
                navigate={navigate}
                showreel={() => setReel(true)}
                blocked={contact || reel || menu}
              />
            }
          />
          <Route path="/about" element={<About contactOpen={contact} />} />
          <Route path="/playground" element={<Playground />} />
          <Route
            path="/project/:slug"
            element={<Project navigate={navigate} />}
          />
          <Route
            path="*"
            element={
              <main className="not-found">
                <h1>PAGE NOT FOUND</h1>
                <button onClick={() => navigate("/")}>Back to work →</button>
              </main>
            }
          />
        </Routes>
      </Suspense>
      {contact && <Contact onClose={() => setContact(false)} />}
      {reel && (
        <Lightbox
          items={[
            {
              type: "video",
              src: site.showreel,
              width: 1920,
              height: 1080,
              title: "2025 Showreel",
              poster: "/assets/vimeo-1217193217.jpg",
            },
          ]}
          index={0}
          onChange={() => {}}
          onClose={() => setReel(false)}
        />
      )}
      <div ref={curtain} className="route-curtain" aria-hidden="true" />
    </>
  );
}
export function App() {
  return (
    <SoundProvider>
      <Portfolio />
    </SoundProvider>
  );
}
