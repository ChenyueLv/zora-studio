import { useEffect, useState } from "react";
import { PptReportSlide } from "./PptReportSlide";

/** Keep the outgoing page briefly, without announcing it twice to screen readers. */
export function PptSlideTransition({
  page,
  replay,
  active,
  direction,
  reducedMotion,
  wide = false,
}: {
  page: number;
  replay: number;
  active: boolean;
  direction: number;
  reducedMotion: boolean;
  wide?: boolean;
}) {
  const [transition, setTransition] = useState({
    page,
    previous: null as number | null,
    direction: 1,
    delay: 0,
  });
  if (page !== transition.page) {
    setTransition({
      page,
      previous: reducedMotion || !active ? null : transition.page,
      direction,
      delay: reducedMotion ? 0 : 450,
    });
  }
  useEffect(() => {
    if (transition.previous === null) return;
    if (!active) {
      setTransition((value) => ({ ...value, previous: null }));
      return;
    }
    const timer = setTimeout(() => {
      setTransition((value) => ({ ...value, previous: null }));
    }, 650);
    return () => clearTimeout(timer);
  }, [transition.page, transition.previous, active]);
  return (
    <div
      className="ps-slide-stage"
      data-direction={transition.direction < 0 ? "backward" : "forward"}
    >
      {transition.previous !== null && (
        <div
          className="ps-sheet ps-sheet-outgoing"
          aria-hidden="true"
          key={`out-${transition.page}`}
        >
          <PptReportSlide page={transition.previous} wide={wide} />
        </div>
      )}
      <div
        className={`ps-sheet ps-sheet-current${transition.previous !== null ? " ps-sheet-entering" : ""}`}
        key={`${page}-${replay}-${active}`}
      >
        <PptReportSlide
          page={page}
          animated={active}
          wide={wide}
          delay={transition.delay}
        />
      </div>
    </div>
  );
}
