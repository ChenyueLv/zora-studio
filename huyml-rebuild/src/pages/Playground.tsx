import { useState } from "react";
import data from "../data/playground.json";
import { site } from "../data/site";
import { Media, Lightbox } from "../components/Media";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useSound } from "../lib/Sound";
export function Playground() {
  const [active, setActive] = useState<number | null>(null);
  const mobile = useMediaQuery("(max-width:1199px)");
  const { play } = useSound();
  const columns = mobile ? 1 : 4;
  return (
    <main className="playground-page">
      <aside className="playground-aside">
        <span className="playground-number">{data.length}</span>
        <p>{site.playgroundDescription}</p>
      </aside>
      <div className="playground-grid">
        {Array.from({ length: columns }, (_, c) => (
          <div className="masonry-column" key={c}>
            {data.map((item, i) =>
              i % columns === c ? (
                <article className="experiment" key={item.id}>
                  <Media
                    item={item}
                    preview
                    onClick={() => {
                      setActive(i);
                      play("open");
                    }}
                  />
                  <button
                    className="experiment-label"
                    onClick={() => setActive(i)}
                  >
                    {item.title}
                    <span>↗</span>
                  </button>
                </article>
              ) : null,
            )}
          </div>
        ))}
      </div>
      {active !== null && (
        <Lightbox
          items={data}
          index={active}
          onChange={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </main>
  );
}
