/** Adapted from Liam Egan's typed-header (MIT); public/licenses/typed-header-MIT.txt. */
export function startTypedHeader(
  element: HTMLElement,
  text: string,
  delay = 0,
) {
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
    if (current.character.trim() && Math.random() < 0.4) {
      let cycle = 0;
      const cycles = Math.floor(Math.random() * 3) + 2;
      const scramble = () => {
        if (++cycle >= cycles) {
          current.glyph.textContent = current.character;
          return;
        }
        const symbols =
          Math.random() < cycle / cycles ? endSymbols : startSymbols;
        current.glyph.textContent =
          symbols[Math.floor(Math.random() * symbols.length)];
        later(scramble, 35);
      };
      scramble();
    }
    later(next, 35);
  };
  later(next, delay + 35);
  return () => {
    disposed = true;
    timers.forEach(clearTimeout);
    timers.clear();
    element.textContent = text;
  };
}
