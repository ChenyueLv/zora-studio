import { useRef } from "react";
import { socialGroups } from "../data/site";
import { Modal } from "./Modal";
export function Contact({ onClose }: { onClose: () => void }) {
  const card = useRef<HTMLDivElement>(null);
  return (
    <Modal
      onClose={onClose}
      label="Contact and credits"
      className="contact-modal"
    >
      <div
        className="contact-stack"
        ref={card}
        onPointerMove={(e) => {
          if (window.innerWidth < 768) return;
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--tilt",
            `${((e.clientX - r.left - r.width / 2) / r.width) * 3}deg`,
          );
        }}
        onPointerLeave={() =>
          card.current?.style.setProperty("--tilt", "-1deg")
        }
      >
        <section className="contact-card">
          <h2>COME SAY HI</h2>
          <div className="contact-grid">
            {socialGroups.map((g) => (
              <div key={g.label}>
                <p className="muted">{g.label}</p>
                {g.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <button className="close-contact" onClick={onClose}>
            Close <span>×</span>
          </button>
        </section>
        <section className="credits-card">
          <h2>CREDITS</h2>
          <div className="credits-grid">
            <div>
              <p className="muted">Development & Rive</p>
              <a href="https://x.com/BausPjam" target="_blank" rel="noreferrer">
                Chien Pham
              </a>
            </div>
            <div>
              <p className="muted">Illustration</p>
              <a
                href="https://dribbble.com/yupnguyen"
                target="_blank"
                rel="noreferrer"
              >
                Yup Nguyen
              </a>
            </div>
            <div>
              <p className="muted">Fonts</p>
              <a
                href="https://www.myfonts.com/collections/bt-glyphius-font-beautype/"
                target="_blank"
                rel="noreferrer"
              >
                BT Glyphius
              </a>
              <a
                href="https://www.myfonts.com/collections/bt-grotesk-font-beautype/"
                target="_blank"
                rel="noreferrer"
              >
                BT Grotesk
              </a>
            </div>
            <div>
              <p className="muted">Copywriting</p>
              <a
                href="https://www.youtube.com/@theimpulsivestitch"
                target="_blank"
                rel="noreferrer"
              >
                Ha Nguyen (the wife)
              </a>
            </div>
          </div>
          <img
            src="/assets/EwHniTuZoV3ME15lpjBiKTAYilc.svg"
            className="credits-portrait"
            alt="Illustration of Huy Phan"
          />
        </section>
      </div>
    </Modal>
  );
}
