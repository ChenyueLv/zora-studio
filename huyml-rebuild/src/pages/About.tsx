import { useEffect, useRef, useState } from "react";
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from "@rive-app/canvas";
import {
  awards,
  capabilities,
  clients,
  publications,
  processSteps,
} from "../data/site";
import hobbies from "../data/hobbies.json";
import { Modal } from "../components/Modal";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useSound } from "../lib/Sound";
RuntimeLoader.setWasmUrl("/assets/rive.wasm");
const hobbyTriggers = [
  "bidaclick",
  "catclick",
  "cayclick",
  "gameclick",
  "laptopclick",
  "miclick",
  "reanclick",
  "sotdclick",
  "timeclick",
];
export function About({ contactOpen }: { contactOpen: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const character = useRef<Rive | null>(null);
  const [topic, setTopic] = useState<number | null>(null);
  const [process, setProcess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const mobile = useMediaQuery("(max-width:1199px)");
  const { play } = useSound();
  const playRef = useRef(play);
  playRef.current = play;
  useEffect(() => {
    if (!canvas.current) return;
    let disposed = false;
    const cleanups: (() => void)[] = [];
    const rive = new Rive({
      src: "/assets/kMKOjaDQErebIbGsFDadsiHYG30.riv",
      canvas: canvas.current,
      artboard: "huymlactive",
      stateMachine: "State Machine 1",
      autoplay: true,
      autoBind: true,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => {
        if (disposed) return;
        rive.resizeDrawingSurfaceToCanvas();
        const vm =
          rive.viewModelInstance ||
          rive.viewModelByName("huyml")?.defaultInstance();
        if (vm) {
          if (!rive.viewModelInstance) rive.bindViewModelInstance(vm);
          const m = vm.boolean("mobile");
          if (m) m.value = mobile;
          const min = vm.boolean("minview");
          if (min) min.value = false;
          const contact = vm.boolean("contact");
          if (contact) contact.value = false;
          hobbyTriggers.forEach((name, i) => {
            const t = vm.trigger(name);
            if (t) {
              const listener = () => {
                setTopic(i);
                playRef.current("open");
              };
              t.on(listener);
              cleanups.push(() => t.off(listener));
            }
          });
          const click = vm.trigger("click");
          if (click) {
            const listener = () => {
              setExpanded((v) => !v);
              playRef.current("character");
            };
            click.on(listener);
            cleanups.push(() => click.off(listener));
          }
        }
      },
      onLoadError: () => setError(true),
    });
    character.current = rive;
    const resize = new ResizeObserver(() =>
      rive.resizeDrawingSurfaceToCanvas(),
    );
    resize.observe(canvas.current);
    return () => {
      disposed = true;
      cleanups.forEach((f) => f());
      resize.disconnect();
      rive.cleanup();
      character.current = null;
    };
  }, [mobile]);
  useEffect(() => {
    const b = character.current?.viewModelInstance?.boolean("contact");
    if (b) b.value = contactOpen;
  }, [contactOpen]);
  const toggle = () => {
    const t = character.current?.viewModelInstance?.trigger("click");
    if (t) t.trigger();
    else setExpanded((v) => !v);
  };
  return (
    <main className={"about-page " + (expanded ? "character-expanded" : "")}>
      <div className="about-personal">
        {[
          "PLANT DADDY",
          "GOONER SINCE THE INVINCIBLES",
          "MARRIED TO A BEAUTIFUL KNITTER",
          "3 CATS CALL HIM DAD",
          "BLACKBERRY COLLECTOR",
          "POOL PLAYER BUT CHICKEN LEVEL",
          "INTO WATCHES NOW...",
        ].map((text, i) => (
          <button
            key={text}
            onClick={() => {
              setTopic([2, 6, 5, 1, 3, 0, 8][i]);
              play("open");
            }}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="about-year year-19">19</div>
      <div className="about-year year-96">96</div>
      <span className="about-and">AND</span>
      <h1 className="about-statement">
        SHAPING DIGITAL EXPERIENCES WITH CLARITY, INTENTION, CHARACTER AND BEING
        A GOOD FRIEND WITH DIGITAL AGENCIES, DESIGN STUDIOS, STARTUPS AND
        BUSINESSES AROUND THE WORLD SINCE 2018.
      </h1>
      <div className="character-stage">
        <canvas
          ref={canvas}
          aria-label="Interactive illustration of Huy Phan. Click his head to explore his world."
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
        />
        {error && (
          <button className="character-fallback" onClick={toggle}>
            <img src="/assets/EwHniTuZoV3ME15lpjBiKTAYilc.svg" alt="Huy Phan" />
          </button>
        )}
      </div>
      <div className="about-awards">
        <h2>Awards & Recognitions</h2>
        {awards.map((x) => (
          <p key={x}>{x}</p>
        ))}
      </div>
      <div className="about-publications">
        <h2>Talk, Interview & Publications</h2>
        {publications.map(([text, url]) =>
          url ? (
            <a key={text} href={url} target="_blank" rel="noreferrer">
              {text}
            </a>
          ) : (
            <p key={text}>{text}</p>
          ),
        )}
      </div>
      <div className="about-capabilities">
        <h2>Capabilities</h2>
        {capabilities.map((x) => (
          <p key={x}>{x}</p>
        ))}
        <button
          className="process-link underlined"
          onClick={() => {
            setProcess(true);
            play("open");
          }}
        >
          Process & Approach
        </button>
      </div>
      <div className="about-clients">
        <h2>Trusted by</h2>
        {clients.map((x) => (
          <p key={x}>{x}</p>
        ))}
      </div>
      <div className="hobby-access">
        <button onClick={toggle}>
          {expanded ? "Close illustration" : "Explore illustration"}
        </button>
        {hobbies.map((h, i) => (
          <button onClick={() => setTopic(i)} key={h.id}>
            {h.title}
          </button>
        ))}
      </div>
      {process && (
        <Modal
          onClose={() => setProcess(false)}
          label="Approach and process"
          className="process-modal"
        >
          <section className="process-card">
            <button className="panel-close" onClick={() => setProcess(false)}>
              Close ×
            </button>
            <h2>APPROACH</h2>
            <div className="process-row">
              <span>A1</span>
              <span>Approach</span>
              <p>
                I don’t have a particular design style. For me, every website is
                unique, with its own personality, purpose, and story. That’s why
                I treat every project differently, translating its character
                into pixels through typography, imagery, interaction, strategy
                and brand elements while always keeping the main goal.
              </p>
            </div>
            <h2 className="process-heading">
              <span>&</span> PROCESS
            </h2>
            {processSteps.map(([title, body], i) => (
              <div className="process-row" key={title}>
                <span>P{i + 1}.</span>
                <span>{title}</span>
                <p>{body}</p>
              </div>
            ))}
          </section>
        </Modal>
      )}
      {topic !== null && (
        <Modal
          onClose={() => {
            setTopic(null);
            play("tick");
          }}
          label={hobbies[topic].title}
          className="hobby-modal"
        >
          <article className="hobby-card">
            <button className="panel-close" onClick={() => setTopic(null)}>
              Close ×
            </button>
            <img src={hobbies[topic].image} alt={hobbies[topic].title} />
            <h2>{hobbies[topic].title}</h2>
            <div className="hobby-story">
              {hobbies[topic].description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </Modal>
      )}
    </main>
  );
}
