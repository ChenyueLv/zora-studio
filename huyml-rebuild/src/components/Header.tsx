import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import { useSound } from "../lib/Sound";
type Props = {
  navigate: (path: string) => void;
  contact: () => void;
  showreel: () => void;
  menu: boolean;
  setMenu: (open: boolean) => void;
  contactOpen: boolean;
};
export function Header({
  navigate,
  contact,
  showreel,
  menu,
  setMenu,
  contactOpen,
}: Props) {
  const { pathname } = useLocation();
  const { enabled, toggle, play } = useSound();
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);
  const current =
    pathname === "/about"
      ? "ABOUT"
      : pathname === "/playground"
        ? "PLAYGROUND"
        : "WORK";
  const nav = (label: string) => {
    play("open");
    if (label === "CONTACT") {
      contact();
      setMenu(false);
    } else {
      navigate(label === "WORK" ? "/" : "/" + label.toLowerCase());
      setMenu(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = "mailto:" + site.email;
    }
  };
  const links = (
    <>
      {["WORK", "ABOUT", "PLAYGROUND", "CONTACT"].map((label) => (
        <button
          key={label}
          className={
            "nav-link " +
            ((label === current && !contactOpen) ||
            (label === "CONTACT" && contactOpen)
              ? "active"
              : "")
          }
          onClick={() => nav(label)}
          onMouseEnter={() => play("tick")}
        >
          <span className="nav-arrow">→</span>
          {label}
        </button>
      ))}
    </>
  );
  return (
    <>
      <header className="site-header">
        <a
          href="/"
          className="brand"
          aria-label="Huy Phan — home"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <span className="brand-flip">
            <img
              className="brand-front"
              src="/assets/R4RlD3IldAw8k5cRONJ8SJJgqG4.svg"
              alt="HUYML © 2026, HCMC, VN"
            />
            <img
              className="brand-back"
              src="/assets/EwHniTuZoV3ME15lpjBiKTAYilc.svg"
              alt="Huy Phan illustration"
            />
          </span>
          <span className="brand-mobile">
            {site.name}
            <sup>©</sup>
          </span>
        </a>
        <div className="desktop-nav">
          <span className="muted">Menu</span>
          <nav aria-label="Main navigation">{links}</nav>
        </div>
        <button
          className="sound-control"
          aria-label={enabled ? "Mute sound" : "Enable sound"}
          aria-pressed={enabled}
          onClick={toggle}
        >
          <span className="muted">Audio</span> {enabled ? "On" : "Off"}
          <svg width="13" height="11" viewBox="0 0 13 11">
            <path
              d={
                enabled
                  ? "M.75 7.75 2.75 3.75 5.75 9.75 8.75 .75 11.75 7.75"
                  : "M.75 5.5H11.75"
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </button>
        <div className="clock">
          Working globally
          <br />
          <span className="muted">
            {site.location}, {time}
          </span>
        </div>
        <div className="inquiries">
          <span className="muted">{copied ? "Copied" : "For inquiries"}</span>
          <button
            className="underlined"
            onClick={copy}
            aria-label={"Copy " + site.email}
          >
            {site.email}
          </button>
        </div>
        <button
          className={"menu-toggle " + (menu ? "is-open" : "")}
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
        >
          <span />
          <span />
        </button>
      </header>
      <div className={"mobile-menu " + (menu ? "is-open" : "")} inert={!menu}>
        <div className="mobile-intro">
          Independent designer
          <br />
          Working globally
        </div>
        <nav aria-label="Mobile navigation">{links}</nav>
        <div className="mobile-menu-bottom">
          <button onClick={copy}>
            <span className="muted">{copied ? "Copied" : "For inquiries"}</span>
            <br />
            <span className="underlined">{site.email}</span>
          </button>
          <button className="showreel-link" onClick={showreel}>
            ‘25 showreel <span>▶</span>
          </button>
        </div>
      </div>
    </>
  );
}
