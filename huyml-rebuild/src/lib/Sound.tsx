import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const files = {
  tick: "hxSMzW8WhffneAE4dlHetxMRI.mp3",
  scroll: "NwRpkuqMO8dekRRBn6RJjQlpM.mp3",
  open: "TPy4R9I2nyWcMGl3iIx3nrZhdo.mp3",
  character: "6cRNA8zDeZycaafxCb1ax6o.mp3",
};
type SoundName = keyof typeof files;
const SoundContext = createContext({
  enabled: false,
  toggle: () => {},
  play: (_name: SoundName) => {},
});
export const useSound = () => useContext(SoundContext);
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const active = useRef(new Set<HTMLAudioElement>());
  const last = useRef(0);
  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      if (name === "tick" && Date.now() - last.current < 90) return;
      last.current = Date.now();
      const a = new Audio("/assets/" + files[name]);
      a.volume = name === "scroll" ? 0.23 : 0.35;
      active.current.add(a);
      const done = () => active.current.delete(a);
      a.onended = done;
      a.onerror = done;
      a.play().catch(done);
    },
    [enabled],
  );
  useEffect(() => {
    if (!enabled) {
      active.current.forEach((a) => a.pause());
      active.current.clear();
    }
  }, [enabled]);
  useEffect(
    () => () => {
      active.current.forEach((a) => a.pause());
    },
    [],
  );
  return (
    <SoundContext.Provider
      value={{ enabled, toggle: () => setEnabled((v) => !v), play }}
    >
      {children}
    </SoundContext.Provider>
  );
}
