/** Adapted from Liam Egan's typed-header (MIT); public/licenses/typed-header-MIT.txt. */
export function startTypedHeader(
  element: HTMLElement,
  text: string,
  delay = 0,
  options: {
    typingSpeed?: number;
    glitchChance?: number;
    glitchCycles?: number;
    glitchInterval?: number;
  } = {},
) {
  const {
    typingSpeed = 35,
    glitchChance = 0.4,
    glitchCycles,
    glitchInterval = 35,
  } = options;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let disposed = false;
  const later = (callback: () => void, ms: number) => {
    const timer = setTimeout(() => {
      timers.delete(timer);
      if (!disposed) callback();
    }, ms);
    timers.add(timer);
  };
  const startSymbols = [..."■▇▆▅▄▃▁▉▊▌▍▎▏"];
  const endSymbols = [..."!<>-_\\/[]{}—=+*^?#_@"];
  const characters = [...text].map((character) => {
    const span = document.createElement("span");
    span.className = "car-character";
    // Every glyph retains its original advance width throughout the scramble.
    const slot = document.createElement("span");
    slot.className = "car-character-slot";
    slot.textContent = character;
    const glyph = document.createElement("span");
    glyph.className = "car-character-glyph";
    glyph.textContent = character;
    span.append(slot, glyph);
    return { span, glyph, character };
  });
  const caret = document.createElement("span");
  caret.className = "car-typing-caret";
  element.replaceChildren(...characters.map(({ span }) => span));
  let index = 0;
  const next = () => {
    const current = characters[index++];
    if (!current) {
      caret.remove();
      return;
    }
    current.span.append(caret);
    current.span.classList.add("is-visible");
    if (current.character.trim() && Math.random() < glitchChance) {
      let cycle = 0;
      const cycles = glitchCycles ?? Math.floor(Math.random() * 3) + 2;
      const scramble = () => {
        if (++cycle >= cycles) {
          current.glyph.textContent = current.character;
          return;
        }
        const symbols =
          Math.random() < cycle / cycles ? endSymbols : startSymbols;
        current.glyph.textContent =
          symbols[Math.floor(Math.random() * symbols.length)];
        later(scramble, glitchInterval);
      };
      scramble();
    }
    later(next, typingSpeed);
  };
  later(next, delay + typingSpeed);
  return () => {
    disposed = true;
    timers.forEach(clearTimeout);
    timers.clear();
    element.textContent = text;
  };
}

/** Each copy column starts when its own text is readable in the viewport. */
export function observeTypedHeaderGroup(group: HTMLElement) {
  const lines = [...group.querySelectorAll<HTMLElement>(".car-typed")].map(
    (element) => ({
      element,
      text:
        element.closest(".car-line")?.getAttribute("aria-label") ||
        element.textContent ||
        "",
    }),
  );
  let visible = false;
  let running = false;
  let repeatTimer: ReturnType<typeof setTimeout> | undefined;
  let stops: Array<() => void> = [];
  const stop = () => {
    running = false;
    clearTimeout(repeatTimer);
    repeatTimer = undefined;
    stops.forEach((cleanup) => cleanup());
    stops = [];
  };
  const play = () => {
    stops.forEach((cleanup) => cleanup());
    stops = lines.map(({ element, text }, index) =>
      startTypedHeader(element, text, 250 + index * 650, {
        typingSpeed: 55,
        glitchChance: 1,
        glitchCycles: 10,
        glitchInterval: 100,
      }),
    );
    // ~4 seconds of typing followed by ~8 seconds for reading the full copy.
    repeatTimer = setTimeout(play, 12000);
  };
  const update = () => {
    if (!visible || document.hidden) stop();
    else if (!running) {
      running = true;
      play();
    }
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.65;
      update();
    },
    { threshold: [0, 0.65], rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(group);
  document.addEventListener("visibilitychange", update);
  return () => {
    stop();
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
  };
}
