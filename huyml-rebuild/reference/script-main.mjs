import { n as e, t } from "./rolldown-runtime.Dh6celcD.mjs";
import {
  A as n,
  E as r,
  I as i,
  L as a,
  M as o,
  N as s,
  O as c,
  R as l,
  S as u,
  _ as d,
  a as f,
  b as p,
  c as m,
  g as h,
  h as g,
  i as _,
  j as v,
  k as y,
  l as b,
  m as x,
  n as S,
  o as C,
  r as w,
  s as T,
  t as E,
  u as D,
} from "./react.BaDOPo3t.mjs";
import { a as ee, r as te, t as ne, x as O } from "./motion.BPkLvCVm.mjs";
import {
  $ as re,
  A as k,
  C as A,
  E as j,
  G as M,
  J as N,
  K as P,
  M as ie,
  Q as ae,
  R as oe,
  S as F,
  T as se,
  U as ce,
  W as le,
  X as ue,
  _t as I,
  a as de,
  at as fe,
  b as pe,
  bt as me,
  c as he,
  ct as ge,
  f as _e,
  g as ve,
  gt as ye,
  h as be,
  ht as xe,
  i as Se,
  l as Ce,
  mt as we,
  o as L,
  ot as Te,
  rt as Ee,
  s as De,
  st as Oe,
  tt as ke,
  u as Ae,
  ut as je,
  v as Me,
  w as Ne,
  x as Pe,
  xt as Fe,
  yt as Ie,
  z as Le,
} from "./framer.BeBZUbg6.mjs";
import {
  B as Re,
  F as ze,
  H as Be,
  I as Ve,
  L as He,
  M as Ue,
  N as We,
  P as Ge,
  U as R,
  V as Ke,
} from "./shared-lib.DyD4REXM.mjs";
function qe() {
  return typeof document > `u`
    ? !1
    : document.documentElement.dataset.mobileMenuOpen === `true`;
}
function Je(e) {
  let {
      lineWidth: t = 60,
      lineThickness: n = 2,
      gap: r = 12,
      color: i = `#FFFFFF`,
      duration: a = 0.3,
      easing: o = `cubic-bezier(0.22, 1, 0.36, 1)`,
      openRotation: c = 20,
      ariaLabel: u = `Toggle menu`,
      style: d,
    } = e,
    [f, p] = s(!1),
    h = r / 2,
    g = `transform ${a}s ${o}, width ${a}s ${o}, height ${a}s ${o}, background-color ${a}s ${o}`;
  (v(() => {
    if (l === void 0) return;
    let e = () => {
        p(qe());
      },
      t = (t) => {
        let n = t.detail || {};
        if (typeof n.open == `boolean`) {
          p(n.open);
          return;
        }
        e();
      };
    return (
      e(),
      l.addEventListener(Xe, t),
      () => {
        l.removeEventListener(Xe, t);
      }
    );
  }, []),
    v(() => {
      if (typeof document > `u`) return;
      let e = document.getElementById(Qe);
      (e ||
        ((e = document.createElement(`style`)),
        (e.id = Qe),
        document.head.appendChild(e)),
        (e.textContent = `
[aria-label="${Ze}"] {
    transition: opacity ${a}s ${o}, filter ${a}s ${o} !important;
    will-change: opacity, filter;
}
html[${$e}="true"] [aria-label="${Ze}"] {
    opacity: 0 !important;
    filter: blur(${et}px) !important;
    pointer-events: none !important;
}
`));
    }, [a, o]),
    v(() => {
      typeof document > `u` ||
        (f
          ? document.documentElement.setAttribute($e, `true`)
          : document.documentElement.removeAttribute($e));
    }, [f]),
    v(
      () => () => {
        typeof document > `u` || document.documentElement.removeAttribute($e);
      },
      [],
    ));
  let _ = {
    position: `absolute`,
    left: `50%`,
    top: `50%`,
    width: t,
    height: n,
    borderRadius: n,
    background: i,
    transformOrigin: `50% 50%`,
    transition: g,
    willChange: `transform`,
    pointerEvents: `none`,
  };
  return b(`button`, {
    type: `button`,
    "aria-label": u,
    className: Ye,
    style: {
      position: `relative`,
      width: `100%`,
      height: `100%`,
      display: `block`,
      padding: 0,
      border: 0,
      background: `transparent`,
      color: i,
      cursor: `pointer`,
      touchAction: `manipulation`,
      WebkitTapHighlightColor: `transparent`,
      ...d,
    },
    children: [
      m(`span`, {
        style: {
          ..._,
          transform: f
            ? `translate(-50%, -50%) rotate(${c}deg)`
            : `translate(-50%, -50%) translateY(-${h}px) rotate(0deg)`,
        },
      }),
      m(`span`, {
        style: {
          ..._,
          transform: f
            ? `translate(-50%, -50%) rotate(-${c}deg)`
            : `translate(-50%, -50%) translateY(${h}px) rotate(0deg)`,
        },
      }),
    ],
  });
}
var Ye,
  Xe,
  Ze,
  Qe,
  $e,
  et,
  tt = t(() => {
    (i(),
      C(),
      M(),
      u(),
      (Ye = `btnmenu`),
      (Xe = `mobile-menu:toggle`),
      (Ze = `logo`),
      (Qe = `btn-menu-logo-transition-style`),
      ($e = `data-btn-menu-logo-hidden`),
      (et = 10),
      (Je.defaultProps = {
        lineWidth: 60,
        lineThickness: 2,
        gap: 12,
        color: `#FFFFFF`,
        duration: 0.3,
        easing: `cubic-bezier(0.22, 1, 0.36, 1)`,
        openRotation: 20,
        ariaLabel: `Toggle menu`,
      }),
      j(Je, {
        lineWidth: {
          type: L.Number,
          title: `Width`,
          min: 8,
          max: 260,
          step: 1,
          defaultValue: 60,
        },
        lineThickness: {
          type: L.Number,
          title: `Thickness`,
          min: 1,
          max: 12,
          step: 0.5,
          defaultValue: 2,
        },
        gap: {
          type: L.Number,
          title: `Gap`,
          min: 0,
          max: 80,
          step: 1,
          defaultValue: 12,
        },
        color: { type: L.Color, title: `Color`, defaultValue: `#FFFFFF` },
        duration: {
          type: L.Number,
          title: `Duration`,
          min: 0,
          max: 2,
          step: 0.01,
          defaultValue: 0.3,
        },
        easing: {
          type: L.String,
          title: `Ease`,
          defaultValue: `cubic-bezier(0.22, 1, 0.36, 1)`,
        },
        openRotation: {
          type: L.Number,
          title: `Rotation`,
          min: 0,
          max: 60,
          step: 1,
          defaultValue: 20,
        },
        ariaLabel: {
          type: L.String,
          title: `Aria`,
          defaultValue: `Toggle menu`,
        },
      }));
  });
function nt() {
  if (l !== void 0 && !l[ut]) {
    if (
      ((l[ut] = !0),
      /^((?!chrome|chromium|android|crios|fxios|edgios).)*safari/i.test(
        a.userAgent,
      ))
    ) {
      try {
        l.sessionStorage.removeItem(lt);
      } catch {}
      typeof document < `u` &&
        (document.documentElement.dataset.pageSoundOn = `false`);
      return;
    }
    if (performance.getEntriesByType?.(`navigation`)?.[0]?.type === `reload`)
      try {
        l.sessionStorage.removeItem(lt);
      } catch {}
  }
}
function rt(e, t, n, r, i) {
  if (l === void 0 || !e) return;
  let a = { src: e, volume: Math.max(0, Math.min(100, t ?? 50)) };
  l[n] = a;
  try {
    l.localStorage.setItem(r, JSON.stringify(a));
  } catch {}
  l.dispatchEvent(new CustomEvent(i, { detail: a }));
}
function it(e) {
  return typeof e?.soundOn == `boolean`
    ? e.soundOn
    : typeof e?.enabled == `boolean`
      ? e.enabled
      : typeof e?.muted == `boolean`
        ? !e.muted
        : null;
}
function at(e) {
  let {
      buildVersion: t = `Sound V3`,
      eventName: n = `page-sound:toggle`,
      stateEventName: i = `page-sound:change`,
      initialSoundOn: a = !1,
      clickable: o = !0,
      color: c = `#181818`,
      strokeWidth: u = 1.5,
      iconWidth: d = 13,
      duration: f = 0.55,
      scrollSound: h = ``,
      scrollSoundVolume: g = 50,
      tickSound: _ = ``,
      tickSoundVolume: y = 40,
      openSound: b = ``,
      openSoundVolume: x = 50,
      style: S,
    } = e,
    [C, w] = s(!1),
    T = r(null),
    E = r(!1),
    D = r(new Set());
  (v(() => {
    (rt(h, g, mt, ht, gt), rt(_, y, dt, ft, pt), rt(b, x, _t, vt, yt));
  }, [b, x, h, g, _, y]),
    v(() => {
      if (l === void 0 || !h) return;
      let e = (e) => {
        let t = e.detail;
        if (t?.handled) return;
        let n = document.documentElement.dataset.pageSoundOn,
          r = n === `true`;
        if (n !== `true` && n !== `false`)
          try {
            r = l.sessionStorage.getItem(lt) === `true`;
          } catch {}
        if (!r) return;
        t && (t.handled = !0);
        let i = new Audio(h);
        ((i.preload = `auto`),
          (i.volume = Math.max(0, Math.min(1, g / 100))),
          (i.style.display = `none`),
          D.current.add(i),
          document.body.appendChild(i));
        let a = !1,
          o = () => {
            a ||
              ((a = !0),
              i.removeEventListener(`ended`, o),
              i.removeEventListener(`error`, o),
              i.pause(),
              i.removeAttribute(`src`),
              i.load(),
              i.remove(),
              D.current.delete(i));
          };
        (i.addEventListener(`ended`, o, { once: !0 }),
          i.addEventListener(`error`, o, { once: !0 }),
          i.play()?.catch(o));
      };
      return (
        l.addEventListener(bt, e),
        () => {
          (l.removeEventListener(bt, e),
            D.current.forEach((e) => {
              (e.pause(), e.removeAttribute(`src`), e.load(), e.remove());
            }),
            D.current.clear());
        }
      );
    }, [h, g]),
    v(() => {
      nt();
      let e =
          typeof document < `u`
            ? document.documentElement.dataset.pageSoundOn
            : void 0,
        t = null;
      try {
        t = l.sessionStorage.getItem(lt);
      } catch {}
      w(e === `true` || (e !== `false` && t === `true`));
    }, [a]),
    v(() => {
      if (l === void 0) return;
      let e = (e) => {
          let t = e.detail,
            n = it(t);
          n !== null && w(n);
        },
        t = (e) => {
          let t = it(e.detail);
          t !== null && w(t);
        };
      return (
        n && l.addEventListener(n, e),
        i && l.addEventListener(i, t),
        l.dispatchEvent(new CustomEvent(ct)),
        () => {
          (n && l.removeEventListener(n, e), i && l.removeEventListener(i, t));
        }
      );
    }, [n, i]),
    p(() => {
      let e = T.current;
      if (!e) return;
      let t = C ? ot : st;
      if (!E.current) {
        ((E.current = !0), R.set(e, { attr: { d: t } }));
        return;
      }
      R.killTweensOf(e);
      let n = R.timeline();
      return (
        n.to(e, { attr: { d: t }, duration: f, ease: `power3.inOut` }, 0),
        l !== void 0 &&
          i &&
          l.dispatchEvent(
            new CustomEvent(i, { detail: { soundOn: C, muted: !C } }),
          ),
        () => n.kill()
      );
    }, [f, C, i]),
    p(() => {
      let e = T.current;
      e &&
        (e.style.setProperty(`stroke`, c, `important`),
        e.style.setProperty(`stroke-width`, `${u}px`, `important`),
        e.style.setProperty(`stroke-linecap`, `round`, `important`),
        e.style.setProperty(`stroke-linejoin`, `round`, `important`));
    }, [c, u]));
  let ee = (e) => {
      !o ||
        l === void 0 ||
        !n ||
        (e.preventDefault(), w((e) => !e), l.dispatchEvent(new CustomEvent(n)));
    },
    te = (11 / 13) * d;
  return m(`button`, {
    type: `button`,
    "data-page-sound-toggle-icon": o ? `true` : `false`,
    "aria-label": C ? `Mute sound` : `Enable sound`,
    "aria-pressed": C,
    onClick: ee,
    style: {
      width: `100%`,
      height: `100%`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      padding: 0,
      border: 0,
      background: `transparent`,
      color: c,
      cursor: o ? `pointer` : `default`,
      touchAction: `manipulation`,
      WebkitTapHighlightColor: `transparent`,
      ...S,
    },
    children: m(`svg`, {
      width: d,
      height: te,
      viewBox: `0 0 13 11`,
      fill: `none`,
      "aria-hidden": `true`,
      style: {
        display: `block`,
        flex: `0 0 auto`,
        overflow: `visible`,
        pointerEvents: `none`,
      },
      children: m(`path`, {
        ref: T,
        d: ot,
        stroke: `currentColor`,
        strokeWidth: u,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
      }),
    }),
  });
}
var ot,
  st,
  ct,
  lt,
  ut,
  dt,
  ft,
  pt,
  mt,
  ht,
  gt,
  _t,
  vt,
  yt,
  bt,
  xt = t(() => {
    (i(),
      C(),
      M(),
      u(),
      Be(),
      (ot = `M0.75 7.75 L2.75 3.75 L5.75 9.75 L8.75 0.75 L11.75 7.75`),
      (st = `M0.75 5.5 L3.5 5.5 L6.25 5.5 L9 5.5 L11.75 5.5`),
      (ct = `page-sound:request-state`),
      (lt = `page-sound:enabled`),
      (ut = `__pageSoundReloadReset`),
      (dt = `__webglMagazineHoverSoundConfig`),
      (ft = `webgl-magazine:hover-sound-config`),
      (pt = `webgl-magazine:hover-sound-config`),
      (mt = `__webglMagazineTickSoundConfig`),
      (ht = `webgl-magazine:tick-sound-config`),
      (gt = `webgl-magazine:tick-sound-config`),
      (_t = `__pageOpenSoundConfig`),
      (vt = `page-sound:open-sound-config`),
      (yt = `page-sound:open-sound-config`),
      (bt = `page-sound:play-scroll-direct`),
      (at.defaultProps = {
        buildVersion: `Sound V3`,
        eventName: `page-sound:toggle`,
        stateEventName: `page-sound:change`,
        initialSoundOn: !1,
        clickable: !0,
        color: `#181818`,
        strokeWidth: 1.5,
        iconWidth: 13,
        duration: 0.55,
        scrollSound: ``,
        scrollSoundVolume: 50,
        tickSound: ``,
        tickSoundVolume: 40,
        openSound: ``,
        openSoundVolume: 50,
      }),
      j(at, {
        buildVersion: {
          type: L.String,
          title: `Build`,
          defaultValue: `Sound V3`,
        },
        openSound: {
          type: L.File,
          title: `Open Sound`,
          allowedFileTypes: [`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`],
        },
        openSoundVolume: {
          type: L.Number,
          title: `Open Volume`,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          hidden(e) {
            return !e.openSound;
          },
        },
        eventName: {
          type: L.String,
          title: `Trigger`,
          defaultValue: `page-sound:toggle`,
        },
        stateEventName: {
          type: L.String,
          title: `State Event`,
          defaultValue: `page-sound:change`,
        },
        initialSoundOn: {
          type: L.Boolean,
          title: `Initial`,
          enabledTitle: `On`,
          disabledTitle: `Off`,
          defaultValue: !1,
        },
        clickable: {
          type: L.Boolean,
          title: `Clickable`,
          enabledTitle: `On`,
          disabledTitle: `Off`,
          defaultValue: !0,
        },
        color: { type: L.Color, title: `Color`, defaultValue: `#181818` },
        strokeWidth: {
          type: L.Number,
          title: `Stroke`,
          min: 0.5,
          max: 4,
          step: 0.1,
          defaultValue: 1.5,
        },
        iconWidth: {
          type: L.Number,
          title: `Icon Size`,
          min: 6,
          max: 80,
          step: 1,
          defaultValue: 13,
        },
        duration: {
          type: L.Number,
          title: `Duration`,
          min: 0.15,
          max: 2,
          step: 0.05,
          defaultValue: 0.55,
        },
        scrollSound: {
          type: L.File,
          title: `Scroll Sound`,
          allowedFileTypes: [`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`],
        },
        scrollSoundVolume: {
          type: L.Number,
          title: `Scroll Volume`,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          hidden(e) {
            return !e.scrollSound;
          },
        },
        tickSound: {
          type: L.File,
          title: `Tick Sound`,
          allowedFileTypes: [`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`],
        },
        tickSoundVolume: {
          type: L.Number,
          title: `Tick Volume`,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 40,
          hidden(e) {
            return !e.tickSound;
          },
        },
      }));
  });
function St() {
  if (l !== void 0 && !l[Lt]) {
    if (
      ((l[Lt] = !0),
      /^((?!chrome|chromium|android|crios|fxios|edgios).)*safari/i.test(
        a.userAgent,
      ))
    ) {
      try {
        l.sessionStorage.removeItem(z);
      } catch {}
      typeof document < `u` &&
        (document.documentElement.dataset.pageSoundOn = `false`);
      return;
    }
    if (performance.getEntriesByType?.(`navigation`)?.[0]?.type === `reload`)
      try {
        l.sessionStorage.removeItem(z);
      } catch {}
  }
}
function Ct() {
  if (l === void 0) return !1;
  St();
  try {
    return l.sessionStorage.getItem(z) === `true`;
  } catch {
    return !1;
  }
}
function wt() {
  if (l !== void 0)
    try {
      l.sessionStorage.setItem(z, String(B));
    } catch {}
}
function Tt(e) {
  return typeof e?.soundOn == `boolean`
    ? e.soundOn
    : typeof e?.enabled == `boolean`
      ? e.enabled
      : typeof e?.muted == `boolean`
        ? !e.muted
        : null;
}
function Et() {
  typeof document > `u` ||
    (document.querySelectorAll(`audio`).forEach(Dt),
    (document.documentElement.dataset.pageSoundOn = B ? `true` : `false`));
}
function Dt(e) {
  e.muted = !B;
}
function Ot() {
  l !== void 0 &&
    l.dispatchEvent(new CustomEvent(Ft, { detail: { soundOn: B, muted: !B } }));
}
function kt(e) {
  if (l === void 0) return null;
  let t = e === `hover` ? zt : Vt,
    n = e === `hover` ? Bt : Ht,
    r = l[t];
  if (r?.src) return r;
  try {
    let e = l.localStorage.getItem(n) || l.sessionStorage.getItem(n);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function At(e) {
  let t = e.detail,
    n = t?.kind;
  if (!B || (n !== `hover` && n !== `tick`)) return;
  let r = kt(n);
  if (!r?.src || typeof document > `u`) return;
  t && (t.handled = !0);
  let i = new Audio(r.src);
  ((i.preload = `auto`),
    (i.volume = Math.max(
      0,
      Math.min(1, (r.volume ?? (n === `hover` ? 40 : 50)) / 100),
    )),
    (i.style.display = `none`),
    document.body.appendChild(i));
  let a = !1,
    o = () => {
      a ||
        ((a = !0),
        i.removeEventListener(`ended`, o),
        i.removeEventListener(`error`, o),
        i.pause(),
        i.removeAttribute(`src`),
        i.load(),
        i.remove());
    };
  (i.addEventListener(`ended`, o, { once: !0 }),
    i.addEventListener(`error`, o, { once: !0 }),
    i.play()?.catch(o));
}
function jt() {
  if (Jt || l === void 0 || typeof document > `u`) return;
  ((Jt = !0),
    (B = Ct()),
    Et(),
    Ot(),
    l.addEventListener(Pt, (e) => {
      ((B = Tt(e.detail) ?? !B), wt(), Et(), Ot());
    }),
    l.addEventListener(It, Ot),
    l.addEventListener(Rt, At),
    l.addEventListener(`storage`, (e) => {
      e.key === z && ((B = e.newValue === `true`), Et(), Ot());
    }));
  let e = () => {
    !document.body ||
      Yt ||
      ((Yt = new MutationObserver((e) => {
        e.forEach((e) => {
          e.addedNodes.forEach((e) => {
            e instanceof Element &&
              (e instanceof HTMLAudioElement && Dt(e),
              e.querySelectorAll(`audio`).forEach(Dt));
          });
        });
      })),
      Yt.observe(document.body, { childList: !0, subtree: !0 }));
  };
  (document.body
    ? e()
    : l.addEventListener(`DOMContentLoaded`, e, { once: !0 }),
    l.requestAnimationFrame(() => {
      (Et(), Ot());
    }));
}
function Mt(e) {
  return g((t, n) => {
    let i = r(null),
      a = r(0);
    v(() => {
      jt();
    }, []);
    let o = (e) =>
        e instanceof Element &&
        !!e.closest(`[data-page-sound-toggle-icon="true"]`),
      s = () => {
        l !== void 0 && l.dispatchEvent(new CustomEvent(Pt));
      },
      c = (e) => {
        (t?.onClick?.(e), !(o(e.target) || Date.now() < a.current) && s());
      },
      u = (e) => {
        (t?.onPointerDown?.(e),
          e.pointerType === `touch` &&
            (i.current = {
              pointerId: e.pointerId,
              x: e.clientX,
              y: e.clientY,
            }));
      },
      d = (e) => {
        if ((t?.onPointerUp?.(e), e.pointerType !== `touch`)) return;
        let n = i.current;
        ((i.current = null),
          !(!n || n.pointerId !== e.pointerId) &&
            (Math.hypot(e.clientX - n.x, e.clientY - n.y) > 12 ||
              o(e.target) ||
              ((a.current = Date.now() + 500), s())));
      },
      f = (e) => {
        (t?.onPointerCancel?.(e), (i.current = null));
      };
    return m(e, {
      ...t,
      ref: n,
      onClick: c,
      onPointerDown: u,
      onPointerUp: d,
      onPointerCancel: f,
      role: t?.role || `button`,
      "aria-label": t?.[`aria-label`] || `Toggle page sound`,
      style: {
        ...(t?.style || {}),
        cursor: `pointer`,
        pointerEvents: `auto`,
        touchAction: `manipulation`,
      },
    });
  });
}
function Nt(e) {
  let t = g((t, n) => {
    let [i, a] = s(B),
      o = r(null),
      c = r(null),
      u = r(null),
      d = r(`primary`),
      f = r(0);
    (v(() => {
      (jt(), a(B));
      let e = (e) => {
        let t = Tt(e.detail);
        t !== null && a(t);
      };
      return (
        l.addEventListener(Ft, e),
        () => {
          l.removeEventListener(Ft, e);
        }
      );
    }, []),
      p(() => {
        let e = o.current,
          t = c.current,
          n = u.current;
        if (!e || !t || !n) return;
        let r = [t, n],
          i = () => {
            let t = e.getBoundingClientRect().width;
            ((f.current = (t + Wt * 2) * (Gt / 100)),
              R.killTweensOf(r),
              R.set(r, { x: -f.current, force3D: !0 }),
              (d.current = `primary`));
          };
        i();
        let a = new ResizeObserver(i);
        return (
          a.observe(e),
          document.fonts?.ready.then(i).catch(() => {}),
          () => {
            (a.disconnect(), R.killTweensOf(r));
          }
        );
      }, []));
    let h = () => {
        let e = d.current === `primary` ? c.current : u.current;
        e &&
          (R.killTweensOf(e),
          R.set(e, { x: -f.current, force3D: !0 }),
          R.to(e, { x: 0, duration: Kt, ease: `power3.out`, force3D: !0 }));
      },
      g = () => {
        let e = d.current === `primary` ? c.current : u.current;
        e &&
          (R.killTweensOf(e),
          R.to(e, {
            x: f.current,
            duration: Kt,
            ease: `power2.out`,
            force3D: !0,
            onComplete: () => {
              R.set(e, { x: -f.current, force3D: !0 });
            },
          }),
          (d.current = d.current === `primary` ? `secondary` : `primary`));
      },
      _ = {
        position: `absolute`,
        top: 0,
        left: -2,
        width: `calc(100% + ${Wt * 2}px)`,
        height: `100%`,
        display: `block`,
        background: `currentColor`,
        pointerEvents: `none`,
        willChange: `transform`,
        transform: `translate3d(0, 0, 0)`,
        backfaceVisibility: `hidden`,
        WebkitBackfaceVisibility: `hidden`,
      };
    return m(e, {
      ...t,
      ref: n,
      text: b(`span`, {
        onMouseEnter: h,
        onMouseLeave: g,
        style: {
          position: `relative`,
          display: `inline-block`,
          width: `fit-content`,
          whiteSpace: `nowrap`,
          pointerEvents: `auto`,
          cursor: `pointer`,
        },
        children: [
          m(`span`, {
            "aria-hidden": `true`,
            style: { visibility: `hidden` },
            children: `On`,
          }),
          m(`span`, {
            style: {
              position: `absolute`,
              left: 0,
              top: 0,
              whiteSpace: `nowrap`,
            },
            children: i ? `On` : `Off`,
          }),
          b(`span`, {
            ref: o,
            "aria-hidden": `true`,
            style: {
              position: `absolute`,
              left: 0,
              top: `${qt * 100}%`,
              width: `100%`,
              height: Ut,
              overflow: `hidden`,
              color: `inherit`,
              pointerEvents: `none`,
              transform: `translate3d(0, 0, 0)`,
              backfaceVisibility: `hidden`,
              WebkitBackfaceVisibility: `hidden`,
            },
            children: [
              m(`span`, { ref: c, style: _ }),
              m(`span`, { ref: u, style: _ }),
            ],
          }),
        ],
      }),
    });
  });
  return (
    (t.displayName = `PageSoundStateText(${e.displayName || e.name || `Component`})`),
    t
  );
}
var Pt,
  Ft,
  It,
  z,
  Lt,
  Rt,
  zt,
  Bt,
  Vt,
  Ht,
  Ut,
  Wt,
  Gt,
  Kt,
  qt,
  B,
  Jt,
  Yt,
  Xt = t(() => {
    (i(),
      C(),
      u(),
      Be(),
      (Pt = `page-sound:toggle`),
      (Ft = `page-sound:change`),
      (It = `page-sound:request-state`),
      (z = `page-sound:enabled`),
      (Lt = `__pageSoundReloadReset`),
      (Rt = `page-sound:play-shared`),
      (zt = `__webglMagazineHoverSoundConfig`),
      (Bt = `webgl-magazine:hover-sound-config`),
      (Vt = `__webglMagazineTickSoundConfig`),
      (Ht = `webgl-magazine:tick-sound-config`),
      (Ut = 1),
      (Wt = 2),
      (Gt = 120),
      (Kt = 0.7),
      (qt = 0.9),
      (B = Ct()),
      (Jt = !1),
      (Yt = null));
  });
function Zt(e) {
  V !== e && ((V = e), _n.forEach((t) => t(e)));
}
function Qt(e) {
  return (_n.add(e), e(V), () => _n.delete(e));
}
function $t(e, t) {
  if (typeof e == `function`) {
    e(t);
    return;
  }
  e && (e.current = t);
}
async function en(e) {
  if (a !== void 0 && a.clipboard?.writeText)
    try {
      await a.clipboard.writeText(e);
      return;
    } catch {}
  if (typeof document > `u`) return;
  let t = document.createElement(`textarea`);
  ((t.value = e),
    t.setAttribute(`readonly`, ``),
    Object.assign(t.style, {
      position: `fixed`,
      opacity: `0`,
      pointerEvents: `none`,
    }),
    document.body.appendChild(t),
    t.select(),
    document.execCommand(`copy`),
    t.remove());
}
function tn(e) {
  return e === `hover` ? ln : e === `copied` ? un : cn;
}
function nn() {
  if (typeof document > `u` || document.getElementById(gn)) return;
  let e = document.createElement(`style`);
  ((e.id = gn),
    (e.textContent = `
[${hn}="copied"],
[${hn}="copied"] * {
    color: ${dn} !important;
    -webkit-text-fill-color: ${dn} !important;
    --framer-text-color: ${dn} !important;
}
`),
    document.head.appendChild(e));
}
function rn(e) {
  return (
    (e?.innerText || e?.textContent || ``).match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
    )?.[0] || sn
  );
}
function an(e) {
  return (t) => {
    let n = r(!1),
      i = r(null);
    v(
      () => () => {
        (i.current !== null && l.clearTimeout(i.current), Zt(`default`));
      },
      [],
    );
    let a = (e) => {
        ((n.current = !0), V !== `copied` && Zt(`hover`), t?.onMouseEnter?.(e));
      },
      o = (e) => {
        ((n.current = !1),
          V !== `copied` && Zt(`default`),
          t?.onMouseLeave?.(e));
      },
      s = (e) => {
        (en(rn(e.currentTarget)),
          Zt(`copied`),
          i.current !== null && l.clearTimeout(i.current),
          (i.current = l.setTimeout(() => {
            (Zt(n.current ? `hover` : `default`), (i.current = null));
          }, fn)),
          t?.onClick?.(e));
      };
    return m(e, {
      ...t,
      onMouseEnter: a,
      onMouseLeave: o,
      onClick: s,
      style: { ...(t?.style || {}), pointerEvents: `auto`, cursor: `pointer` },
    });
  };
}
function on(e) {
  let t = g((t, i) => {
    let a = r(null),
      o = r(V),
      c = r(V),
      u = r(!1),
      d = r(0),
      f = r(null),
      [p, h] = s(V),
      g = n(
        (e) => {
          ((a.current =
            typeof HTMLElement < `u` && e instanceof HTMLElement ? e : null),
            $t(i, e));
        },
        [i],
      );
    return (
      v(
        () =>
          Qt((e) => {
            c.current = e;
            let t = a.current;
            if (!t) {
              ((o.current = e), h(e));
              return;
            }
            if (
              e === o.current &&
              Number.parseFloat(l.getComputedStyle(t).opacity) >= 0.99
            )
              return;
            let n = ++d.current;
            (f.current !== null &&
              (l.cancelAnimationFrame(f.current), (f.current = null)),
              R.killTweensOf(t),
              R.to(t, {
                opacity: 0,
                filter: `blur(${pn}px)`,
                duration: mn * 0.5,
                ease: `power2.in`,
                onComplete: () => {
                  if (n !== d.current) return;
                  let e = c.current;
                  ((o.current = e),
                    h(e),
                    (f.current = l.requestAnimationFrame(() => {
                      ((f.current = null),
                        n === d.current &&
                          (R.killTweensOf(t),
                          R.to(t, {
                            opacity: 1,
                            filter: `blur(0px)`,
                            duration: mn * 0.5,
                            ease: `power2.out`,
                          })));
                    })));
                },
              }));
          }),
        [],
      ),
      vn(() => {
        let e = a.current;
        e &&
          (nn(),
          e.setAttribute(hn, p),
          u.current ||
            ((u.current = !0), R.set(e, { opacity: 1, filter: `blur(0px)` })));
      }, [p]),
      v(
        () => () => {
          a.current &&
            ((d.current += 1),
            f.current !== null &&
              (l.cancelAnimationFrame(f.current), (f.current = null)),
            R.killTweensOf(a.current),
            a.current.removeAttribute(hn));
        },
        [],
      ),
      m(e, {
        ...t,
        ref: g,
        text: tn(p),
        style: {
          ...(t?.style || {}),
          ...(p === `copied` ? { color: dn } : {}),
          willChange: `opacity, filter`,
        },
      })
    );
  });
  return (
    (t.displayName = `withCopyEmailStatusText(${e.displayName || e.name || `Component`})`),
    t
  );
}
var sn,
  cn,
  ln,
  un,
  dn,
  fn,
  pn,
  mn,
  hn,
  gn,
  _n,
  V,
  vn,
  yn = t(() => {
    (i(),
      C(),
      u(),
      Be(),
      (sn = `hello@huyml.co`),
      (cn = `For inquiries`),
      (ln = `Click to copy`),
      (un = `Copied`),
      (dn = `#8C8C8C`),
      (fn = 3e3),
      (pn = 8),
      (mn = 0.5),
      (hn = `data-copy-email-status-state`),
      (gn = `copy-email-status-color-style`),
      (_n = new Set()),
      (V = `default`),
      (vn = l === void 0 ? v : p));
  });
function bn(e) {
  return e?.metaKey || e?.ctrlKey || e?.shiftKey || e?.altKey || e?.button > 0;
}
function xn() {
  let e = (e) => {
    if (l !== void 0 && !bn(e)) {
      if (
        (e?.preventDefault?.(),
        e?.stopPropagation?.(),
        e?.nativeEvent?.preventDefault?.(),
        e?.nativeEvent?.stopImmediatePropagation?.(),
        e?.nativeEvent?.stopPropagation?.(),
        Dn)
      )
        return !1;
      ((Dn = !0),
        l.dispatchEvent(
          new CustomEvent(Cn, { detail: { href: En, label: `Huy Phan` } }),
        ));
      try {
        l.sessionStorage.setItem(
          Tn,
          JSON.stringify({ label: `Huy Phan`, timestamp: Date.now() }),
        );
      } catch {}
      return (
        H !== null && l.clearTimeout(H),
        (H = l.setTimeout(() => {
          ((H = null), l.location.assign(En));
        }, wn)),
        !1
      );
    }
  };
  return {
    onMouseDownCapture: e,
    onPointerDownCapture: e,
    onClickCapture: e,
    onClick: e,
    onTap: e,
    target: void 0,
    href: void 0,
    link: null,
  };
}
function Sn(e) {
  return (t) => (c(De), m(e, { ...t, ...xn(t) }));
}
var Cn,
  wn,
  Tn,
  En,
  Dn,
  H,
  On = t(() => {
    (i(),
      C(),
      u(),
      M(),
      (Cn = `simple-page-transition:start`),
      (wn = 1700),
      (Tn = `simple-page-transition:incoming`),
      (En = `/`),
      (Dn = !1),
      (H = null),
      (Sn.displayName = `withTransitionToHome`));
  });
function kn() {
  try {
    return `Working globally
HCMC, ${Nn.format(new Date())}`;
  } catch {
    return Mn;
  }
}
function An(e) {
  return g((t, n) => {
    let [r, i] = s(kn);
    return (
      v(() => {
        let e = null,
          t = () => {
            i(kn());
          },
          n = 6e4 - (Date.now() % 6e4) + 20,
          r = l.setTimeout(() => {
            (t(), (e = l.setInterval(t, 6e4)));
          }, n),
          a = () => {
            document.hidden || t();
          };
        return (
          t(),
          l.addEventListener(`focus`, t),
          document.addEventListener(`visibilitychange`, a),
          () => {
            (l.clearTimeout(r),
              e !== null && l.clearInterval(e),
              l.removeEventListener(`focus`, t),
              document.removeEventListener(`visibilitychange`, a));
          }
        );
      }, []),
      m(e, {
        ...t,
        ref: n,
        text: b(T, {
          children: [
            m(`span`, { children: `Working globally` }),
            m(`br`, {}),
            m(`span`, {
              style: { color: `rgba(255, 255, 255, 0.5)` },
              children:
                (r || Mn).split(`
`)[1] || `HCMC, 23:23`,
            }),
          ],
        }),
      })
    );
  });
}
var jn,
  Mn,
  Nn,
  Pn = t(() => {
    (i(),
      C(),
      u(),
      (jn = `Asia/Ho_Chi_Minh`),
      (Mn = `Working globally
HCMC, 23:23`),
      (Nn = new Intl.DateTimeFormat(`en-GB`, {
        timeZone: jn,
        hour: `2-digit`,
        minute: `2-digit`,
        hourCycle: `h23`,
      })));
  }),
  Fn = e({ __FramerMetadata__: () => nr, default: () => U });
function In(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var Ln,
  Rn,
  zn,
  Bn,
  Vn,
  Hn,
  Un,
  Wn,
  Gn,
  Kn,
  qn,
  Jn,
  Yn,
  Xn,
  Zn,
  Qn,
  $n,
  er,
  tr,
  U,
  nr,
  rr = t(() => {
    (C(),
      M(),
      ne(),
      u(),
      tt(),
      Ke(),
      xt(),
      Xt(),
      yn(),
      On(),
      Ve(),
      Pn(),
      ze(),
      (Ln = oe(Re)),
      (Rn = I(F, { nodeId: `EhZmgLIgM`, override: Nt, scopeId: `gOyjVrghE` })),
      (zn = oe(at)),
      (Bn = I(O.div, {
        nodeId: `XIjoPsHE4`,
        override: Mt,
        scopeId: `gOyjVrghE`,
      })),
      (Vn = I(F, { nodeId: `C8J5_PvGF`, override: An, scopeId: `gOyjVrghE` })),
      (Hn = I(F, { nodeId: `yqwPV6lgA`, override: on, scopeId: `gOyjVrghE` })),
      (Un = I(F, { nodeId: `sRxfNLchS`, override: He, scopeId: `gOyjVrghE` })),
      (Wn = I(O.div, {
        nodeId: `yOxNv9iNo`,
        override: an,
        scopeId: `gOyjVrghE`,
      })),
      (Gn = oe(Je)),
      (Kn = I(O.div, {
        nodeId: `HqDoHdi01`,
        override: Sn,
        scopeId: `gOyjVrghE`,
      })),
      (qn = [`DcvfVCzN6`, `AD8HQlKi0`, `X43iLeyBf`, `Loi4yGiPM`]),
      (Jn = `framer-h1Y2M`),
      (Yn = {
        AD8HQlKi0: `framer-v-14vf7b0`,
        DcvfVCzN6: `framer-v-wvuvg5`,
        Loi4yGiPM: `framer-v-8hvkz7`,
        X43iLeyBf: `framer-v-10dz50d`,
      }),
      (Xn = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Zn = ({ value: e, children: t }) => {
        let n = c(ee),
          r = e ?? n.transition,
          i = y(() => ({ ...n, transition: r }), [JSON.stringify(r)]);
        return m(ee.Provider, { value: i, children: t });
      }),
      (Qn = {
        "Variant 5": `Loi4yGiPM`,
        PC: `DcvfVCzN6`,
        Phone: `X43iLeyBf`,
        Tablet: `AD8HQlKi0`,
      }),
      ($n = O.create(o)),
      (er = ({
        arrowSize: e,
        arrowX: t,
        arrowY: n,
        height: r,
        id: i,
        initial: a,
        stepY: o,
        width: s,
        ...c
      }) => ({
        ...c,
        A9uboLYxD: a ?? c.A9uboLYxD ?? 0,
        lfHSiT9yD: o ?? c.lfHSiT9yD ?? 20,
        P5H3gyjzG: e ?? c.P5H3gyjzG ?? 1.05,
        SM7V3AnLL: t ?? c.SM7V3AnLL ?? 29,
        tWeJy1jdo: n ?? c.tWeJy1jdo ?? 7,
        variant: Qn[c.variant] ?? c.variant ?? `DcvfVCzN6`,
      })),
      (tr = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (U = ye(
        g(function (e, t) {
          let n = r(null),
            i = t ?? n,
            a = d(),
            { activeLocale: s, setLocale: c } = je();
          Ee();
          let {
              style: l,
              className: u,
              layoutId: f,
              variant: p,
              A9uboLYxD: h,
              P5H3gyjzG: g,
              SM7V3AnLL: _,
              tWeJy1jdo: v,
              lfHSiT9yD: y,
              ...x
            } = er(e),
            {
              baseVariant: S,
              classNames: C,
              clearLoadingGesture: w,
              gestureHandlers: T,
              gestureVariant: E,
              isLoading: D,
              setGestureState: ee,
              setVariant: ne,
              variants: re,
            } = xe({
              cycleOrder: qn,
              defaultVariant: `DcvfVCzN6`,
              ref: i,
              variant: p,
              variantClassNames: Yn,
            }),
            j = tr(e, re),
            M = k(Jn, Ue),
            N = () => S !== `X43iLeyBf`;
          we();
          let P = () => S === `X43iLeyBf`;
          return m(te, {
            id: f ?? a,
            children: m($n, {
              animate: re,
              initial: !1,
              children: m(Zn, {
                value: Xn,
                children: b(O.div, {
                  ...x,
                  ...T,
                  className: k(M, `framer-wvuvg5`, u, C),
                  "data-framer-name": `PC`,
                  layoutDependency: j,
                  layoutId: `DcvfVCzN6`,
                  ref: i,
                  style: { ...l },
                  ...In(
                    {
                      AD8HQlKi0: { "data-framer-name": `Tablet` },
                      Loi4yGiPM: { "data-framer-name": `Variant 5` },
                      X43iLeyBf: { "data-framer-name": `Phone` },
                    },
                    S,
                    E,
                  ),
                  children: [
                    N() &&
                      m(O.div, {
                        className: `framer-1f1v32c`,
                        layoutDependency: j,
                        layoutId: `BLVJIeB9W`,
                      }),
                    N() &&
                      b(O.div, {
                        className: `framer-12plppm`,
                        layoutDependency: j,
                        layoutId: `HtdWt_10n`,
                        children: [
                          m(O.div, {
                            className: `framer-9zh3f5`,
                            layoutDependency: j,
                            layoutId: `oXJN7kHQ5`,
                            children: m(F, {
                              __fromCanvasComponent: !0,
                              children: m(o, {
                                children: m(O.p, {
                                  className: `framer-styles-preset-fukh8o`,
                                  "data-styles-preset": `sy0X3z2VP`,
                                  dir: `auto`,
                                  style: {
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgba(255, 255, 255, 0.5))`,
                                  },
                                  children: `Menu`,
                                }),
                              }),
                              className: `framer-mfr2po`,
                              fonts: [`Inter`],
                              layoutDependency: j,
                              layoutId: `oAsTwBrSZ`,
                              style: {
                                "--extracted-r6o4lv": `rgba(255, 255, 255, 0.5)`,
                                "--framer-link-text-color": `rgb(0, 153, 255)`,
                                "--framer-link-text-decoration": `underline`,
                              },
                              verticalAlignment: `top`,
                              withExternalLayout: !0,
                            }),
                          }),
                          m(O.div, {
                            className: `framer-nkv2kv`,
                            layoutDependency: j,
                            layoutId: `cyitC0r90`,
                            children: m(Pe, {
                              links: [
                                {
                                  href: { webPageId: `Az4tMLI5U` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `YhQLZ3MNg` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Az4tMLI5U` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `YhQLZ3MNg` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Az4tMLI5U` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `YhQLZ3MNg` },
                                  implicitPathVariables: void 0,
                                },
                                {
                                  href: { webPageId: `Pn95ZS3Nn` },
                                  implicitPathVariables: void 0,
                                },
                              ],
                              children: (e) =>
                                m(Se, {
                                  children: m(Ne, {
                                    className: `framer-151iacu-container`,
                                    isAuthoredByUser: !0,
                                    layoutDependency: j,
                                    layoutId: `BkuhSF9WN-container`,
                                    nodeId: `BkuhSF9WN`,
                                    rendersWithMotion: !0,
                                    scopeId: `gOyjVrghE`,
                                    children: m(Re, {
                                      arrowOffsetX: _,
                                      arrowOffsetY: v,
                                      arrowSize: g,
                                      blendMode: `difference`,
                                      color: `rgb(255, 255, 255)`,
                                      enableTransition: !1,
                                      font: {
                                        fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                        fontSize: `19px`,
                                        fontStyle: `normal`,
                                        fontWeight: 400,
                                        letterSpacing: `0.01em`,
                                        lineHeight: `100%`,
                                      },
                                      gap: 0,
                                      height: `100%`,
                                      id: `BkuhSF9WN`,
                                      initialIndex: h,
                                      items: [
                                        `WORK`,
                                        `ABOUT`,
                                        `PLAYGROUND`,
                                        `CONTACT`,
                                      ],
                                      itemStep: y,
                                      layoutId: `BkuhSF9WN`,
                                      links: [e[0], e[1], e[2], e[3]],
                                      openInNewTab: !1,
                                      transitionDelay: 3,
                                      transitionLabels: [
                                        `WORK`,
                                        `ABOUT`,
                                        `PLAYGROUND`,
                                        `ABOUT`,
                                      ],
                                      width: `100%`,
                                      ...In(
                                        {
                                          AD8HQlKi0: {
                                            links: [e[4], e[5], e[6], e[7]],
                                          },
                                          Loi4yGiPM: {
                                            arrowOffsetX: 29,
                                            arrowOffsetY: 12,
                                            arrowSize: 1.75,
                                            font: {
                                              fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                              fontSize: `30px`,
                                              fontStyle: `normal`,
                                              fontWeight: 400,
                                              letterSpacing: `0.01em`,
                                              lineHeight: `100%`,
                                            },
                                            itemStep: 31,
                                            links: [e[8], e[9], e[10], e[11]],
                                          },
                                        },
                                        S,
                                        E,
                                      ),
                                    }),
                                  }),
                                }),
                            }),
                          }),
                        ],
                      }),
                    N() &&
                      b(O.div, {
                        className: `framer-1crjmwz`,
                        layoutDependency: j,
                        layoutId: `x2uvvYQei`,
                        children: [
                          b(O.div, {
                            className: `framer-zlaaaw`,
                            layoutDependency: j,
                            layoutId: `CWApGGR34`,
                            children: [
                              m(F, {
                                __fromCanvasComponent: !0,
                                children: m(o, {
                                  children: m(O.p, {
                                    className: `framer-styles-preset-fukh8o`,
                                    "data-styles-preset": `sy0X3z2VP`,
                                    dir: `auto`,
                                    style: {
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(255, 255, 255))`,
                                    },
                                    children: `Audio`,
                                  }),
                                }),
                                className: `framer-1mcsun6`,
                                fonts: [`Inter`],
                                layoutDependency: j,
                                layoutId: `xPYgJOMSv`,
                                style: {
                                  "--extracted-r6o4lv": `rgb(255, 255, 255)`,
                                  "--framer-link-text-color": `rgb(0, 153, 255)`,
                                  "--framer-link-text-decoration": `underline`,
                                  opacity: 0.5,
                                },
                                verticalAlignment: `top`,
                                withExternalLayout: !0,
                              }),
                              b(Bn, {
                                className: `framer-15io1pz`,
                                layoutDependency: j,
                                layoutId: `XIjoPsHE4`,
                                children: [
                                  m(Rn, {
                                    __fromCanvasComponent: !0,
                                    children: m(o, {
                                      children: m(O.p, {
                                        className: `framer-styles-preset-fukh8o`,
                                        "data-styles-preset": `sy0X3z2VP`,
                                        dir: `auto`,
                                        style: {
                                          "--framer-text-color": `var(--extracted-r6o4lv, rgb(255, 255, 255))`,
                                        },
                                        children: `Off`,
                                      }),
                                    }),
                                    className: `framer-u5tviu`,
                                    fonts: [`Inter`],
                                    layoutDependency: j,
                                    layoutId: `EhZmgLIgM`,
                                    style: {
                                      "--extracted-r6o4lv": `rgb(255, 255, 255)`,
                                      "--framer-link-text-color": `rgb(0, 153, 255)`,
                                      "--framer-link-text-decoration": `underline`,
                                    },
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                  m(Se, {
                                    children: m(Ne, {
                                      className: `framer-wbtx23-container`,
                                      isAuthoredByUser: !0,
                                      layoutDependency: j,
                                      layoutId: `rCeUDrF7M-container`,
                                      nodeId: `rCeUDrF7M`,
                                      rendersWithMotion: !0,
                                      scopeId: `gOyjVrghE`,
                                      children: m(at, {
                                        buildVersion: `Sound V3`,
                                        clickable: !0,
                                        color: `rgb(255, 255, 255)`,
                                        duration: 0.55,
                                        eventName: `page-sound:toggle`,
                                        height: `100%`,
                                        iconWidth: 12,
                                        id: `rCeUDrF7M`,
                                        initialSoundOn: !1,
                                        layoutId: `rCeUDrF7M`,
                                        openSound: `https://framerusercontent.com/assets/TPy4R9I2nyWcMGl3iIx3nrZhdo.mp3`,
                                        openSoundVolume: 50,
                                        scrollSound: `https://framerusercontent.com/assets/NwRpkuqMO8dekRRBn6RJjQlpM.mp3`,
                                        scrollSoundVolume: 23,
                                        stateEventName: `page-sound:change`,
                                        strokeWidth: 1.5,
                                        tickSound: `https://framerusercontent.com/assets/hxSMzW8WhffneAE4dlHetxMRI.mp3`,
                                        tickSoundVolume: 22,
                                        width: `100%`,
                                        ...In(
                                          { AD8HQlKi0: { iconWidth: 10 } },
                                          S,
                                          E,
                                        ),
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          m(Vn, {
                            __fromCanvasComponent: !0,
                            children: m(o, {
                              children: b(O.p, {
                                className: `framer-styles-preset-fukh8o`,
                                "data-styles-preset": `sy0X3z2VP`,
                                dir: `auto`,
                                children: [
                                  m(O.span, {
                                    style: {
                                      "--framer-text-color": `var(--extracted-1w3ko1f, rgb(255, 255, 255))`,
                                    },
                                    children: `Working globally`,
                                  }),
                                  m(O.span, {
                                    style: {
                                      "--framer-text-color": `var(--extracted-3sq8v0, rgb(0, 0, 0))`,
                                    },
                                    children: m(O.br, {}),
                                  }),
                                  m(O.span, {
                                    style: {
                                      "--framer-text-color": `var(--extracted-c9yw3e, rgb(255, 255, 255))`,
                                    },
                                    children: `HCMC, 23:23`,
                                  }),
                                ],
                              }),
                            }),
                            className: `framer-1dqord3`,
                            fonts: [`Inter`],
                            layoutDependency: j,
                            layoutId: `C8J5_PvGF`,
                            style: {
                              "--extracted-1w3ko1f": `rgb(255, 255, 255)`,
                              "--extracted-3sq8v0": `rgb(0, 0, 0)`,
                              "--extracted-c9yw3e": `rgb(255, 255, 255)`,
                              "--framer-link-text-color": `rgb(0, 153, 255)`,
                              "--framer-link-text-decoration": `underline`,
                            },
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                        ],
                      }),
                    N() &&
                      m(O.div, {
                        className: `framer-1fpc296`,
                        layoutDependency: j,
                        layoutId: `Kmt5pUknC`,
                        children: b(O.div, {
                          className: `framer-1xjhont`,
                          "data-framer-name": `email`,
                          layoutDependency: j,
                          layoutId: `VDdOg1XK6`,
                          children: [
                            m(Hn, {
                              __fromCanvasComponent: !0,
                              children: m(o, {
                                children: m(O.p, {
                                  className: `framer-styles-preset-fukh8o`,
                                  "data-styles-preset": `sy0X3z2VP`,
                                  dir: `auto`,
                                  style: {
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgba(255, 255, 255, 0.5))`,
                                  },
                                  children: `For inquiries`,
                                }),
                              }),
                              className: `framer-15vfsc2`,
                              fonts: [`Inter`],
                              layoutDependency: j,
                              layoutId: `yqwPV6lgA`,
                              style: {
                                "--extracted-r6o4lv": `rgba(255, 255, 255, 0.5)`,
                                "--framer-link-text-color": `rgb(0, 153, 255)`,
                                "--framer-link-text-decoration": `underline`,
                              },
                              verticalAlignment: `top`,
                              withExternalLayout: !0,
                            }),
                            m(Wn, {
                              className: `framer-8imeff`,
                              layoutDependency: j,
                              layoutId: `yOxNv9iNo`,
                              children: m(Un, {
                                __fromCanvasComponent: !0,
                                children: m(o, {
                                  children: m(O.p, {
                                    className: `framer-styles-preset-fukh8o`,
                                    "data-styles-preset": `sy0X3z2VP`,
                                    dir: `auto`,
                                    style: {
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(255, 255, 255))`,
                                    },
                                    children: `hello@huyml.co`,
                                  }),
                                }),
                                className: `framer-s5g8qa`,
                                fonts: [`Inter`],
                                layoutDependency: j,
                                layoutId: `sRxfNLchS`,
                                style: {
                                  "--extracted-r6o4lv": `rgb(255, 255, 255)`,
                                  "--framer-link-text-color": `rgb(0, 153, 255)`,
                                  "--framer-link-text-decoration": `underline`,
                                },
                                verticalAlignment: `top`,
                                withExternalLayout: !0,
                              }),
                            }),
                          ],
                        }),
                      }),
                    P() &&
                      b(O.div, {
                        className: `framer-b8isz3`,
                        layoutDependency: j,
                        layoutId: `WmTiX3OuY`,
                        children: [
                          m(Se, {
                            children: m(Ne, {
                              className: `framer-krknz7-container`,
                              isAuthoredByUser: !0,
                              layoutDependency: j,
                              layoutId: `EMfTARPK6-container`,
                              nodeId: `EMfTARPK6`,
                              rendersWithMotion: !0,
                              scopeId: `gOyjVrghE`,
                              children: m(Je, {
                                ariaLabel: `Toggle menu`,
                                color: `rgb(255, 255, 255)`,
                                duration: 0.3,
                                easing: `cubic-bezier(0.22, 1, 0.36, 1)`,
                                gap: 8,
                                height: `100%`,
                                id: `EMfTARPK6`,
                                layoutId: `EMfTARPK6`,
                                lineThickness: 1,
                                lineWidth: 60,
                                openRotation: 20,
                                width: `100%`,
                                ...In(
                                  {
                                    X43iLeyBf: {
                                      style: { height: `100%`, width: `100%` },
                                    },
                                  },
                                  S,
                                  E,
                                ),
                              }),
                            }),
                          }),
                          m(O.div, {
                            className: `framer-19pmhat`,
                            layoutDependency: j,
                            layoutId: `cmYtK6KxD`,
                            style: {
                              backgroundColor: `rgb(68, 204, 255)`,
                              opacity: 0,
                            },
                          }),
                          m(Kn, {
                            className: `framer-1l7w1f`,
                            layoutDependency: j,
                            layoutId: `HqDoHdi01`,
                            children: b(A, {
                              className: `framer-kp0x8g`,
                              layoutDependency: j,
                              layoutId: `isWb0DBWu`,
                              requiresOverflowVisible: !1,
                              svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 93.59 20" overflow="visible"><path d="M 51.7 0.996 L 57.32 0.996 L 61.737 14.111 L 62.272 14.111 L 66.689 0.996 L 72.309 0.996 L 72.309 19.732 L 68.829 19.732 L 68.829 6.75 L 68.295 6.75 L 63.878 19.732 L 60.131 19.732 L 55.714 6.75 L 55.179 6.75 L 55.179 19.732 L 51.699 19.732 L 51.699 0.996 Z M 40.454 13.308 L 33.63 0.996 L 37.511 0.996 L 41.927 9.026 L 42.463 9.026 L 46.879 0.996 L 50.761 0.996 L 43.935 13.308 L 43.935 19.732 L 40.455 19.732 L 40.455 13.308 Z M 25.07 20 C 23.893 20 22.823 19.812 21.859 19.438 C 20.947 19.085 20.117 18.547 19.423 17.858 C 18.745 17.18 18.219 16.351 17.843 15.369 C 17.487 14.388 17.309 13.299 17.309 12.104 L 17.309 0.996 L 20.789 0.996 L 20.789 12.104 C 20.789 12.764 20.895 13.38 21.109 13.951 C 21.341 14.504 21.645 14.986 22.019 15.396 C 22.412 15.789 22.867 16.101 23.385 16.333 C 23.902 16.547 24.465 16.654 25.071 16.654 C 25.678 16.654 26.24 16.547 26.757 16.333 C 27.26 16.111 27.715 15.793 28.095 15.396 C 28.488 14.986 28.791 14.504 29.005 13.951 C 29.24 13.364 29.359 12.737 29.354 12.104 L 29.354 0.996 L 32.834 0.996 L 32.834 12.104 C 32.834 13.299 32.646 14.388 32.271 15.369 C 31.914 16.351 31.397 17.18 30.719 17.859 C 30.041 18.537 29.219 19.063 28.256 19.438 C 27.31 19.813 26.249 20 25.071 20 Z M 75.227 0.996 L 78.707 0.996 L 78.707 16.386 L 87.539 16.386 L 87.539 19.733 L 75.227 19.733 Z M 0 0.996 L 3.48 0.996 L 3.48 8.491 L 11.911 8.491 L 11.911 0.996 L 15.391 0.996 L 15.391 19.733 L 11.911 19.733 L 11.911 11.97 L 3.48 11.97 L 3.48 19.733 L 0 19.733 Z M 88.45 10.138 C 87.747 10.146 87.048 10.016 86.394 9.758 C 85.792 9.507 85.242 9.144 84.775 8.688 C 84.31 8.231 83.942 7.685 83.691 7.083 C 83.434 6.443 83.305 5.759 83.311 5.069 C 83.311 4.346 83.437 3.675 83.691 3.056 C 83.942 2.454 84.31 1.908 84.775 1.45 C 85.235 1 85.775 0.648 86.395 0.394 C 87.047 0.127 87.746 -0.007 88.45 0 C 89.192 0 89.877 0.131 90.506 0.394 C 91.73 0.875 92.702 1.838 93.196 3.056 C 93.458 3.676 93.59 4.346 93.59 5.069 C 93.59 5.792 93.458 6.463 93.195 7.083 C 92.953 7.686 92.588 8.233 92.125 8.688 C 91.675 9.138 91.135 9.495 90.505 9.758 C 89.851 10.016 89.153 10.145 88.45 10.138 Z M 88.45 8.73 C 88.976 8.73 89.464 8.641 89.915 8.463 C 90.365 8.275 90.75 8.021 91.069 7.703 C 91.398 7.373 91.651 6.984 91.829 6.533 C 92.017 6.083 92.111 5.595 92.111 5.069 C 92.111 4.543 92.017 4.055 91.829 3.605 C 91.661 3.17 91.402 2.776 91.069 2.45 C 90.743 2.117 90.35 1.858 89.915 1.69 C 89.45 1.5 88.952 1.404 88.45 1.408 C 87.948 1.404 87.45 1.5 86.986 1.69 C 86.536 1.868 86.146 2.122 85.817 2.45 C 85.497 2.77 85.244 3.154 85.057 3.605 C 84.878 4.055 84.789 4.543 84.789 5.069 C 84.789 5.595 84.879 6.083 85.057 6.534 C 85.244 6.984 85.497 7.374 85.817 7.702 C 86.146 8.022 86.535 8.275 86.986 8.462 C 87.436 8.641 87.924 8.73 88.45 8.73 Z M 88.52 7.674 C 88.154 7.674 87.812 7.608 87.493 7.477 C 87.182 7.351 86.9 7.164 86.662 6.927 C 86.425 6.69 86.238 6.408 86.112 6.097 C 85.979 5.771 85.912 5.422 85.915 5.069 C 85.915 4.703 85.981 4.36 86.113 4.041 C 86.366 3.413 86.864 2.915 87.492 2.661 C 87.812 2.53 88.154 2.464 88.52 2.464 C 89.037 2.464 89.454 2.567 89.774 2.774 C 90.093 2.98 90.342 3.206 90.52 3.45 C 90.727 3.74 90.881 4.07 90.985 4.436 L 89.577 4.436 C 89.485 4.176 89.292 3.963 89.042 3.844 C 88.881 3.762 88.701 3.723 88.52 3.731 C 88.164 3.731 87.873 3.849 87.647 4.083 C 87.432 4.318 87.324 4.647 87.324 5.069 C 87.324 5.492 87.432 5.82 87.647 6.055 C 87.873 6.289 88.164 6.407 88.52 6.407 C 88.736 6.407 88.91 6.369 89.042 6.294 C 89.182 6.21 89.29 6.116 89.365 6.013 C 89.459 5.9 89.53 5.773 89.577 5.633 L 90.985 5.633 C 90.892 5.996 90.734 6.339 90.52 6.646 C 90.427 6.81 90.308 6.958 90.168 7.083 C 90.043 7.196 89.906 7.294 89.76 7.378 C 89.377 7.577 88.951 7.679 88.52 7.674 Z" fill="rgb(255, 255, 255)"></path></svg>`,
                              withExternalLayout: !0,
                              children: [
                                m(A, {
                                  className: `framer-1t90gqj`,
                                  layoutDependency: j,
                                  layoutId: `zhQqHkJn4`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20.61 18.736" overflow="visible"><path d="M 0.001 0 L 5.621 0 L 10.038 13.115 L 10.573 13.115 L 14.99 0 L 20.61 0 L 20.61 18.736 L 17.13 18.736 L 17.13 5.754 L 16.596 5.754 L 12.179 18.736 L 8.432 18.736 L 4.015 5.754 L 3.48 5.754 L 3.48 18.736 L 0 18.736 L 0 0 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-pjtaz8`,
                                  layoutDependency: j,
                                  layoutId: `vFddKJAzn`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.131 18.736" overflow="visible"><path d="M 6.824 12.312 L 0 0 L 3.881 0 L 8.297 8.03 L 8.833 8.03 L 13.249 0 L 17.131 0 L 10.305 12.312 L 10.305 18.736 L 6.825 18.736 L 6.825 12.312 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-pb28i8`,
                                  layoutDependency: j,
                                  layoutId: `G5RahmO4T`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.525 19.004" overflow="visible"><path d="M 7.761 19.004 C 6.584 19.004 5.514 18.816 4.55 18.442 C 3.638 18.089 2.808 17.551 2.114 16.862 C 1.436 16.184 0.91 15.355 0.534 14.373 C 0.178 13.392 0 12.303 0 11.108 L 0 0 L 3.48 0 L 3.48 11.108 C 3.48 11.768 3.586 12.384 3.8 12.955 C 4.032 13.508 4.336 13.99 4.71 14.4 C 5.103 14.793 5.558 15.105 6.076 15.337 C 6.593 15.551 7.156 15.658 7.762 15.658 C 8.369 15.658 8.931 15.551 9.448 15.337 C 9.951 15.115 10.406 14.797 10.786 14.4 C 11.179 13.99 11.482 13.508 11.696 12.955 C 11.931 12.368 12.05 11.741 12.045 11.108 L 12.045 0 L 15.525 0 L 15.525 11.108 C 15.525 12.303 15.337 13.392 14.962 14.373 C 14.605 15.355 14.088 16.184 13.41 16.863 C 12.732 17.541 11.91 18.067 10.947 18.442 C 10.001 18.817 8.94 19.004 7.762 19.004 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-ktutio`,
                                  layoutDependency: j,
                                  layoutId: `mFnr0pkfA`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12.312 18.737" overflow="visible"><path d="M 0 0 L 3.48 0 L 3.48 15.39 L 12.312 15.39 L 12.312 18.737 L 0 18.737 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-1pner7e`,
                                  layoutDependency: j,
                                  layoutId: `Y9rilmxKC`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.391 18.737" overflow="visible"><path d="M 0 0 L 3.48 0 L 3.48 7.495 L 11.911 7.495 L 11.911 0 L 15.391 0 L 15.391 18.737 L 11.911 18.737 L 11.911 10.974 L 3.48 10.974 L 3.48 18.737 L 0 18.737 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-17y65ko`,
                                  layoutDependency: j,
                                  layoutId: `kLMU8vxq5`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 10.279 10.139" overflow="visible"><path d="M 5.139 10.138 C 4.436 10.146 3.738 10.016 3.083 9.758 C 2.481 9.507 1.932 9.144 1.464 8.688 C 1 8.231 0.631 7.685 0.38 7.083 C 0.123 6.443 -0.006 5.759 0 5.069 C 0 4.346 0.126 3.675 0.38 3.056 C 0.631 2.454 1 1.908 1.464 1.45 C 1.924 1 2.464 0.648 3.084 0.394 C 3.736 0.127 4.435 -0.007 5.139 0 C 5.881 0 6.566 0.131 7.195 0.394 C 8.419 0.875 9.392 1.838 9.885 3.056 C 10.147 3.676 10.279 4.346 10.279 5.069 C 10.279 5.792 10.147 6.463 9.884 7.083 C 9.642 7.686 9.278 8.233 8.814 8.688 C 8.364 9.138 7.824 9.495 7.194 9.758 C 6.54 10.016 5.842 10.145 5.139 10.138 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-mrq6kt`,
                                  layoutDependency: j,
                                  layoutId: `mr4GHCoJD`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.322 7.322" overflow="visible"><path d="M 3.661 7.322 C 4.187 7.322 4.675 7.233 5.126 7.055 C 5.576 6.867 5.961 6.613 6.28 6.295 C 6.609 5.965 6.862 5.576 7.04 5.125 C 7.228 4.675 7.322 4.187 7.322 3.661 C 7.322 3.135 7.228 2.647 7.04 2.197 C 6.872 1.762 6.613 1.368 6.28 1.042 C 5.954 0.709 5.561 0.45 5.126 0.282 C 4.661 0.092 4.163 -0.004 3.661 0 C 3.159 -0.004 2.661 0.092 2.197 0.282 C 1.747 0.46 1.357 0.714 1.028 1.042 C 0.708 1.362 0.455 1.746 0.268 2.197 C 0.089 2.647 0 3.135 0 3.661 C 0 4.187 0.09 4.675 0.268 5.126 C 0.455 5.576 0.708 5.966 1.028 6.294 C 1.357 6.614 1.746 6.867 2.197 7.054 C 2.647 7.233 3.135 7.322 3.661 7.322 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                                m(A, {
                                  className: `framer-13u73ts`,
                                  layoutDependency: j,
                                  layoutId: `da99bxzcL`,
                                  requiresOverflowVisible: !1,
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 5.07 5.21" overflow="visible"><path d="M 2.605 5.21 C 2.239 5.21 1.897 5.144 1.578 5.013 C 1.267 4.887 0.985 4.7 0.747 4.463 C 0.51 4.226 0.323 3.944 0.197 3.633 C 0.064 3.307 -0.003 2.957 0 2.605 C 0 2.239 0.066 1.896 0.198 1.577 C 0.451 0.949 0.949 0.451 1.577 0.197 C 1.897 0.066 2.239 0 2.605 0 C 3.122 0 3.539 0.103 3.859 0.31 C 4.178 0.516 4.427 0.742 4.605 0.986 C 4.812 1.276 4.966 1.606 5.07 1.972 L 3.662 1.972 C 3.57 1.711 3.377 1.498 3.127 1.38 C 2.966 1.298 2.786 1.259 2.605 1.267 C 2.249 1.267 1.958 1.385 1.732 1.619 C 1.517 1.854 1.409 2.183 1.409 2.605 C 1.409 3.028 1.517 3.356 1.732 3.591 C 1.958 3.825 2.249 3.943 2.605 3.943 C 2.821 3.943 2.995 3.905 3.127 3.83 C 3.267 3.746 3.375 3.652 3.45 3.549 C 3.544 3.436 3.615 3.309 3.662 3.169 L 5.07 3.169 C 4.977 3.532 4.819 3.875 4.605 4.182 C 4.512 4.346 4.393 4.493 4.253 4.619 C 4.128 4.731 3.991 4.83 3.845 4.914 C 3.462 5.113 3.036 5.215 2.605 5.21 Z" fill="transparent"></path></svg>`,
                                  withExternalLayout: !0,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `.framer-h1Y2M.framer-1g66h2i, .framer-h1Y2M .framer-1g66h2i { display: block; }`,
          `.framer-h1Y2M.framer-wvuvg5 { display: grid; gap: 10px 20px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(16, minmax(50px, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); height: 194px; justify-content: center; mix-blend-mode: difference; overflow: visible; padding: 20px; position: relative; width: 1208px; }`,
          `.framer-h1Y2M .framer-1f1v32c { align-content: center; align-items: center; align-self: start; cursor: pointer; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; grid-column: span 2; height: min-content; justify-content: center; justify-self: start; min-height: 123px; min-width: 56px; overflow: visible; padding: 0px; pointer-events: none; position: relative; width: min-content; }`,
          `.framer-h1Y2M .framer-12plppm { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 35px; grid-column: span 4; grid-row: span 3; height: min-content; justify-content: center; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-h1Y2M .framer-9zh3f5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
          `.framer-h1Y2M .framer-mfr2po { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
          `.framer-h1Y2M .framer-nkv2kv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 109px; }`,
          `.framer-h1Y2M .framer-151iacu-container { flex: none; height: auto; pointer-events: auto; position: relative; width: auto; }`,
          `.framer-h1Y2M .framer-1crjmwz { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 156px; grid-column: span 8; height: min-content; justify-content: flex-start; justify-self: start; mix-blend-mode: difference; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-h1Y2M .framer-zlaaaw { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 79px; }`,
          `.framer-h1Y2M .framer-1mcsun6, .framer-h1Y2M .framer-u5tviu, .framer-h1Y2M .framer-1dqord3, .framer-h1Y2M .framer-15vfsc2, .framer-h1Y2M .framer-s5g8qa { flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }`,
          `.framer-h1Y2M .framer-15io1pz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 4px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-h1Y2M .framer-wbtx23-container, .framer-h1Y2M .framer-krknz7-container { flex: none; height: auto; position: relative; width: auto; }`,
          `.framer-h1Y2M .framer-1fpc296 { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; grid-column: span 2; height: min-content; justify-content: center; justify-self: end; mix-blend-mode: difference; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1fr; }`,
          `.framer-h1Y2M .framer-1xjhont { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-h1Y2M .framer-8imeff { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-h1Y2M .framer-b8isz3 { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: 100%; justify-content: space-between; justify-self: start; overflow: visible; padding: 16px; position: relative; width: 100%; }`,
          `.framer-h1Y2M .framer-19pmhat { flex: none; height: 24px; overflow: visible; position: relative; width: 60px; }`,
          `.framer-h1Y2M .framer-1l7w1f { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-h1Y2M .framer-kp0x8g { height: 20px; position: relative; width: 94px; }`,
          `.framer-h1Y2M .framer-1t90gqj { height: 19px; left: 52px; position: absolute; top: 1px; width: 21px; }`,
          `.framer-h1Y2M .framer-pjtaz8 { height: 19px; left: 34px; position: absolute; top: 1px; width: 17px; }`,
          `.framer-h1Y2M .framer-pb28i8 { height: 19px; left: 17px; position: absolute; top: 1px; width: 16px; }`,
          `.framer-h1Y2M .framer-ktutio { height: 19px; left: 75px; position: absolute; top: 1px; width: 13px; }`,
          `.framer-h1Y2M .framer-1pner7e { height: 19px; left: 0px; position: absolute; top: 1px; width: 16px; }`,
          `.framer-h1Y2M .framer-17y65ko { height: 10px; left: 83px; position: absolute; top: 0px; width: 11px; }`,
          `.framer-h1Y2M .framer-mrq6kt { height: 8px; left: 85px; position: absolute; top: 1px; width: 8px; }`,
          `.framer-h1Y2M .framer-13u73ts { height: 5px; left: 86px; position: absolute; top: 2px; width: 5px; }`,
          `.framer-h1Y2M.framer-v-14vf7b0 .framer-12plppm { gap: 30px; }`,
          `.framer-h1Y2M.framer-v-14vf7b0 .framer-1crjmwz { gap: 100px; }`,
          `.framer-h1Y2M.framer-v-14vf7b0 .framer-1fpc296 { overflow: visible; }`,
          `.framer-h1Y2M.framer-v-10dz50d.framer-wvuvg5 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: row; flex-wrap: nowrap; height: min-content; padding: 0px; width: 564px; }`,
          `.framer-h1Y2M.framer-v-10dz50d .framer-b8isz3 { align-self: unset; flex: 1 0 0px; height: min-content; mix-blend-mode: difference; width: 1px; }`,
          `.framer-h1Y2M.framer-v-10dz50d .framer-krknz7-container { height: 24px; order: 0; width: 60px; }`,
          `.framer-h1Y2M.framer-v-10dz50d .framer-19pmhat { order: 2; }`,
          `.framer-h1Y2M.framer-v-10dz50d .framer-1l7w1f { flex-direction: row; order: 1; }`,
          `.framer-h1Y2M.framer-v-8hvkz7.framer-wvuvg5 { height: 228px; }`,
          `.framer-h1Y2M.framer-v-8hvkz7 .framer-1f1v32c { min-width: unset; width: 80px; }`,
          `.framer-h1Y2M.framer-v-8hvkz7 .framer-12plppm { gap: 53px; }`,
          `.framer-h1Y2M.framer-v-8hvkz7 .framer-nkv2kv { width: 186px; }`,
          `.framer-h1Y2M.framer-v-8hvkz7 .framer-1crjmwz { gap: 235px; }`,
          ...We,
        ],
        `framer-h1Y2M`,
      )),
      (U.displayName = `Header`),
      (U.defaultProps = { height: 194, width: 1208 }),
      j(U, {
        variant: {
          options: [`DcvfVCzN6`, `AD8HQlKi0`, `X43iLeyBf`, `Loi4yGiPM`],
          optionTitles: [`PC`, `Tablet`, `Phone`, `Variant 5`],
          title: `Variant`,
          type: L.Enum,
        },
        A9uboLYxD: {
          defaultValue: 0,
          max: 11,
          min: 0,
          step: 1,
          title: `Initial`,
          type: L.Number,
        },
        onA9uboLYxDChange: { changes: `A9uboLYxD`, type: L.ChangeHandler },
        P5H3gyjzG: {
          defaultValue: 1.05,
          max: 8,
          min: 0.25,
          step: 0.05,
          title: `Arrow Size`,
          type: L.Number,
        },
        onP5H3gyjzGChange: { changes: `P5H3gyjzG`, type: L.ChangeHandler },
        SM7V3AnLL: {
          defaultValue: 29,
          max: 80,
          min: -80,
          step: 1,
          title: `Arrow X`,
          type: L.Number,
        },
        onSM7V3AnLLChange: { changes: `SM7V3AnLL`, type: L.ChangeHandler },
        tWeJy1jdo: {
          defaultValue: 7,
          max: 80,
          min: -80,
          step: 1,
          title: `Arrow Y`,
          type: L.Number,
        },
        ontWeJy1jdoChange: { changes: `tWeJy1jdo`, type: L.ChangeHandler },
        lfHSiT9yD: {
          defaultValue: 20,
          max: 120,
          min: 12,
          step: 1,
          title: `Step Y`,
          type: L.Number,
        },
        onlfHSiT9yDChange: { changes: `lfHSiT9yD`, type: L.ChangeHandler },
      }),
      se(
        U,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`,
                url: `https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`,
                url: `https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+1F00-1FFF`,
                url: `https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0370-03FF`,
                url: `https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF`,
                url: `https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2070, U+2074-207E, U+2080-208E, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD`,
                url: `https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Inter`,
                source: `framer`,
                style: `normal`,
                uiFamilyName: `Inter`,
                unicodeRange: `U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB`,
                url: `https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `BT Glyphius Regular`,
                source: `custom`,
                style: `normal`,
                uiFamilyName: `BT Glyphius`,
                url: `https://framerusercontent.com/assets/xirQ3g4Sv5q7MG0KvL1PiOOLLBA.woff2`,
                weight: `400`,
              },
            ],
          },
          ...Ln,
          ...zn,
          ...Gn,
          ...Le(Ge),
        ],
        { supportsExplicitInterCodegen: !0 },
      ),
      (nr = {
        exports: {
          Props: {
            type: `tsType`,
            annotations: { framerContractVersion: `1` },
          },
          default: {
            type: `reactComponent`,
            name: `FramergOyjVrghE`,
            slots: [],
            annotations: {
              framerDisplayContentsDiv: `false`,
              framerIntrinsicHeight: `194`,
              framerAutoSizeImages: `true`,
              framerVariables: `{"A9uboLYxD":"initial","P5H3gyjzG":"arrowSize","SM7V3AnLL":"arrowX","tWeJy1jdo":"arrowY","lfHSiT9yD":"stepY"}`,
              framerColorSyntax: `true`,
              framerCanvasComponentVariantDetails: `{"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"AD8HQlKi0":{"layout":["fixed","fixed"]},"X43iLeyBf":{"layout":["fixed","auto"]},"Loi4yGiPM":{"layout":["fixed","fixed"]}}}`,
              framerComponentViewportWidth: `true`,
              framerImmutableVariables: `true`,
              framerIntrinsicWidth: `1208`,
              framerContractVersion: `1`,
            },
          },
          __FramerMetadata__: { type: `variable` },
        },
      }));
  });
function ir(e) {
  return e?.metaKey || e?.ctrlKey || e?.shiftKey || e?.altKey || e?.button > 0;
}
function ar() {
  let e = (e) => {
    if (l !== void 0 && !ir(e)) {
      (e?.preventDefault?.(),
        e?.stopPropagation?.(),
        e?.nativeEvent?.preventDefault?.(),
        e?.nativeEvent?.stopImmediatePropagation?.(),
        e?.nativeEvent?.stopPropagation?.(),
        l.dispatchEvent(
          new CustomEvent(sr, { detail: { href: ur, label: `Huy Phan` } }),
        ));
      try {
        l.sessionStorage.setItem(
          lr,
          JSON.stringify({ label: `Huy Phan`, timestamp: Date.now() }),
        );
      } catch {}
      return (
        l.setTimeout(() => {
          l.location.assign(ur);
        }, cr),
        !1
      );
    }
  };
  return {
    onMouseDownCapture: e,
    onPointerDownCapture: e,
    onClickCapture: e,
    onClick: e,
    onTap: e,
    target: void 0,
    href: void 0,
    link: null,
  };
}
function or(e) {
  return (t) => (c(De), m(e, { ...t, ...ar(t) }));
}
var sr,
  cr,
  lr,
  ur,
  dr = t(() => {
    (i(),
      C(),
      u(),
      M(),
      (sr = `simple-page-transition:start`),
      (cr = 1700),
      (lr = `simple-page-transition:incoming`),
      (ur = `/`),
      (or.displayName = `withTransitionToHome`));
  });
function W(e, t) {
  return Array.from(e.querySelectorAll(t)).filter(
    (e) => e.offsetParent !== null,
  );
}
function fr(e) {
  return e <= 0 ? 0 : G + Math.max(0, e - 1) * K;
}
function pr(e) {
  return Math.max(0, fr(e) - Tr);
}
function mr(e) {
  return (t) => {
    let n = r(null),
      i = r(!1),
      a = r(!1),
      o = r(!1),
      s = r(!1),
      c = r(!1),
      u = r(!1),
      d = r(!1),
      f = r(null),
      p = r(0),
      h = r(0),
      g = r(0),
      _ = r(0),
      v = r(0);
    return (
      hr(() => {
        let e = n.current;
        if (!e) return;
        let t = new Map(),
          r = [`opacity`, `filter`, `transform`, `will-change`],
          m = (e) => {
            e.forEach((e) => {
              t.has(e) ||
                t.set(
                  e,
                  r.map((t) => ({
                    property: t,
                    value: e.style.getPropertyValue(t),
                    priority: e.style.getPropertyPriority(t),
                  })),
                );
            });
          },
          y = () => {
            let e = Array.from(t.keys());
            (R.killTweensOf(e),
              e.forEach((e) => {
                (R.set(e, {
                  clearProps: `opacity,filter,transform,willChange`,
                }),
                  t
                    .get(e)
                    ?.forEach(({ property: t, value: n, priority: r }) => {
                      n
                        ? e.style.setProperty(t, n, r)
                        : e.style.removeProperty(t);
                    }));
              }),
              t.clear());
          },
          b = l === void 0 ? 900 : l.innerHeight,
          x = () => W(e, Cr),
          S = () => {
            let e = x();
            if (!e.length || l === void 0) return 0;
            let t = e[0].offsetHeight || 0;
            return -(t - t * Fr);
          },
          C = () => {
            if (u.current || d.current) return;
            let e = x();
            e.length &&
              R.set(e, {
                y: Pr,
                rotation: Mr,
                transformOrigin: `50% 50%`,
                pointerEvents: `none`,
                cursor: `default`,
                zIndex: q,
                willChange: `transform`,
              });
          },
          w = (e) => {
            let t = Math.max(0, Math.min(1, e / b));
            return Nr + (Mr - Nr) * t;
          },
          T = () => {
            let e = x();
            e.length &&
              ((u.current = !0),
              R.killTweensOf(e),
              R.set(e, {
                pointerEvents: `auto`,
                cursor: d.current ? `grabbing` : `grab`,
                zIndex: q,
              }),
              R.to(e, {
                y: 0,
                rotation: Nr,
                duration: jr,
                ease: `power4.out`,
                clearProps: `willChange`,
              }));
          },
          E = () => {
            let e = x();
            e.length &&
              ((u.current = !1),
              R.killTweensOf(e),
              R.to(e, {
                y: Pr,
                rotation: Mr,
                duration: jr,
                ease: `power4.out`,
                clearProps: `willChange`,
                onComplete: () => {
                  R.set(e, {
                    pointerEvents: `none`,
                    cursor: `default`,
                    zIndex: q,
                  });
                },
              }));
          },
          D = (t, n) => {
            if (n.current) return;
            let r = W(e, t);
            r.length &&
              (m(r),
              R.set(r, {
                opacity: 0,
                filter: `blur(12px)`,
                y: 18,
                willChange: `opacity, filter, transform`,
              }));
          },
          ee = (t, n, r) => {
            if (n.current) return;
            let i = W(e, t);
            i.length &&
              (m(i),
              R.set(i, {
                opacity: 0,
                filter: `blur(10px)`,
                willChange: `opacity, transform`,
                ...r,
              }));
          },
          te = (t, n) => {
            if (n.current) return;
            let r = W(e, t);
            r.length &&
              ((n.current = !0),
              R.to(r, {
                opacity: 1,
                filter: `blur(0px)`,
                y: 0,
                duration: G,
                stagger: K,
                ease: `power2.out`,
                clearProps: `willChange`,
              }));
          },
          ne = () => {
            let t = W(e, vr),
              n = W(e, yr),
              r = W(e, br),
              l = W(e, xr),
              u = W(e, Sr);
            t.length &&
              !i.current &&
              ((i.current = !0),
              R.to(t, {
                opacity: 1,
                filter: `blur(0px)`,
                y: 0,
                duration: G,
                stagger: K,
                ease: `power2.out`,
                clearProps: `willChange`,
              }));
            let d = t.length ? pr(t.length) : 0;
            n.length &&
              !a.current &&
              ((a.current = !0),
              R.to(n, {
                opacity: 1,
                filter: `blur(0px)`,
                y: 0,
                duration: G,
                stagger: K,
                ease: `power2.out`,
                clearProps: `willChange`,
                delay: d,
              }));
            let f = n.length ? d + pr(n.length) : d;
            r.length &&
              !o.current &&
              ((o.current = !0),
              R.to(r, {
                opacity: 1,
                filter: `blur(0px)`,
                y: 0,
                duration: G,
                stagger: K,
                ease: `power2.out`,
                clearProps: `willChange`,
                delay: f,
              }));
            let p = r.length ? f + pr(r.length) : f;
            (l.length &&
              !s.current &&
              ((s.current = !0),
              R.to(l, {
                opacity: 1,
                filter: `blur(0px)`,
                y: 0,
                duration: Dr,
                stagger: K,
                ease: kr,
                clearProps: `willChange,filter`,
                delay: p,
              })),
              u.length &&
                !c.current &&
                ((c.current = !0),
                R.to(u, {
                  opacity: 1,
                  filter: `blur(0px)`,
                  x: 0,
                  duration: Or,
                  stagger: K,
                  ease: Ar,
                  clearProps: `willChange,filter`,
                  delay: p + Er,
                })));
          },
          O = () => {
            (D(vr, i),
              D(yr, a),
              D(br, o),
              ee(xr, s, { y: b }),
              ee(Sr, c, { x: 400 }),
              C());
          },
          re = !1,
          k = !1;
        O();
        let A = new MutationObserver(() => {
          (O(), re && te(vr, i), k && ne());
        });
        A.observe(e, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: [`aria-label`],
        });
        let j = () => {
            ((re = !0), te(vr, i));
          },
          M = () => {
            ((k = !0), O(), ne());
          },
          N = (t) => {
            let n = t.target;
            if (!(n instanceof Element)) return;
            let r = n.closest(wr);
            !r || !e.contains(r) || T();
          },
          P = (t) => {
            let n = t.target;
            if (!(n instanceof Element)) return;
            let r = n.closest(Cr);
            !r ||
              !e.contains(r) ||
              (u.current &&
                (C(),
                (d.current = !0),
                (f.current = t.pointerId),
                (p.current = t.clientY),
                (h.current = Number(R.getProperty(r, `y`)) || 0),
                (g.current = t.clientY),
                (_.current = performance.now()),
                (v.current = 0),
                r.setPointerCapture?.(t.pointerId),
                R.killTweensOf(x()),
                R.set(x(), {
                  cursor: `grabbing`,
                  pointerEvents: `auto`,
                  zIndex: q,
                  willChange: `transform`,
                })));
          },
          ie = (e) => {
            if (!d.current || f.current !== e.pointerId) return;
            let t = x();
            if (!t.length) return;
            let n = e.clientY - p.current,
              r = Math.max(S(), Math.min(b, h.current + n)),
              i = performance.now(),
              a = e.clientY - g.current,
              o = Math.max(1, i - _.current);
            ((v.current = a / o),
              (g.current = e.clientY),
              (_.current = i),
              R.set(t, { y: r, rotation: w(r), willChange: `transform` }));
          },
          ae = (e) => {
            if (!d.current || f.current !== e.pointerId) return;
            ((d.current = !1), (f.current = null));
            let t = x();
            if (!t.length) return;
            let n = Number(R.getProperty(t[0], `y`)) || 0,
              r = Math.max(S(), Math.min(b, n + v.current * Lr));
            R.to(t, {
              y: r,
              rotation: w(r),
              duration: Rr,
              ease: `power2.out`,
              onStart: () => {
                R.set(t, { cursor: `grab`, pointerEvents: `auto`, zIndex: q });
              },
              onComplete: () => {
                let e = t[0].getBoundingClientRect(),
                  n = l.innerHeight * Ir;
                e.top >= n && E();
              },
            });
          };
        return (
          l.addEventListener(gr, j),
          l.addEventListener(_r, M),
          e.addEventListener(`click`, N),
          e.addEventListener(`pointerdown`, P),
          l.addEventListener(`pointermove`, ie),
          l.addEventListener(`pointerup`, ae),
          () => {
            (A.disconnect(),
              y(),
              l.removeEventListener(gr, j),
              l.removeEventListener(_r, M),
              e.removeEventListener(`click`, N),
              e.removeEventListener(`pointerdown`, P),
              l.removeEventListener(`pointermove`, ie),
              l.removeEventListener(`pointerup`, ae));
          }
        );
      }, []),
      m(`div`, {
        ref: n,
        style: { width: `100%`, height: `100%` },
        children: m(e, { ...t }),
      })
    );
  };
}
var hr,
  gr,
  _r,
  vr,
  yr,
  br,
  xr,
  Sr,
  Cr,
  wr,
  G,
  K,
  Tr,
  Er,
  Dr,
  Or,
  kr,
  Ar,
  jr,
  Mr,
  Nr,
  q,
  Pr,
  Fr,
  Ir,
  Lr,
  Rr,
  zr = t(() => {
    (i(),
      C(),
      u(),
      Be(),
      (hr = l === void 0 ? v : p),
      (gr = `webgl-magazine:intro-complete`),
      (_r = `simple-page-transition:incoming-complete`),
      (vr = `[aria-label="heroinfo"]`),
      (yr = `[aria-label="seconelementon"]`),
      (br = `[aria-label="seconelement"]`),
      (xr = `[aria-label="ParallaxScrollImage"], #ParallaxScrollImage`),
      (Sr = `[aria-label="minimapscroll"], #minimapscroll`),
      (Cr = `[aria-label="process"]`),
      (wr = `[aria-label="processbtn"]`),
      (G = 0.7),
      (K = 0.08),
      (Tr = 0.6),
      (Er = 0.1),
      (Dr = 1.6),
      (Or = 1.6),
      (kr = `power4.out`),
      (Ar = `power4.out`),
      (jr = 1),
      (Mr = -38),
      (Nr = -2),
      (q = 200),
      (Pr = `120vh`),
      (Fr = 0.2),
      (Ir = 0.5),
      (Lr = 180),
      (Rr = 0.45));
  });
function Br(e) {
  if (l === void 0) return null;
  let t = e === `hover` ? Zr : $r,
    n = e === `hover` ? Qr : ei,
    r = l[t];
  if (r?.src) return r;
  try {
    let e = l.localStorage.getItem(n) || l.sessionStorage.getItem(n);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function Vr() {
  if (typeof document > `u`) return !1;
  let e = document.documentElement.dataset.pageSoundOn;
  if (e === `true`) return !0;
  if (e === `false`) return !1;
  try {
    return l.sessionStorage.getItem(ti) === `true`;
  } catch {
    return !1;
  }
}
function Hr(e) {
  if (l === void 0) return;
  let t = { kind: e, handled: !1 };
  if ((l.dispatchEvent(new CustomEvent(Xr, { detail: t })), t.handled || !Vr()))
    return;
  let n = Br(e);
  if (!n?.src || typeof document > `u`) return;
  let r = new Audio(n.src);
  ((r.preload = `auto`),
    (r.volume = Math.max(
      0,
      Math.min(1, (n.volume ?? (e === `hover` ? 40 : 50)) / 100),
    )),
    (r.style.display = `none`),
    document.body.appendChild(r));
  let i = !1,
    a = () => {
      i ||
        ((i = !0),
        r.removeEventListener(`ended`, a),
        r.removeEventListener(`error`, a),
        r.pause(),
        r.removeAttribute(`src`),
        r.load(),
        r.remove());
    };
  (r.addEventListener(`ended`, a, { once: !0 }),
    r.addEventListener(`error`, a, { once: !0 }),
    r.play()?.catch(a));
}
function Ur({
  faceOneSvg: e = J,
  faceTwoSvg: t = J,
  faceOneHoverSvg: n = ``,
  faceTwoHoverSvg: i = ``,
}) {
  let a = r(null),
    [o, c] = s(!1),
    u = r({ current: 0, target: 0 }),
    d = r(null),
    f = r(null);
  return (
    v(() => {
      [n, i].forEach((e) => {
        if (!e) return;
        let t = new Image();
        t.src = e;
      });
    }, [n, i]),
    v(() => {
      if (!a.current) return;
      let e = a.current,
        t = u.current;
      ((t.current = 0),
        (t.target = 0),
        R.set(e, { rotationX: 0, rotationY: 0, force3D: !0 }));
      let n = (e) => {
          (f.current?.kill(),
            (t.target += e * 0.25),
            d.current !== null && l.clearTimeout(d.current),
            (d.current = l.setTimeout(() => {
              let e = Math.round(t.target / 90) * 90;
              f.current = R.to(t, {
                target: e,
                duration: 1,
                ease: `power3.out`,
                overwrite: !0,
              });
            }, 140)));
        },
        r = (e) => {
          document.documentElement.getAttribute(
            `data-parallax-lightbox-open`,
          ) !== `true` && n(e.deltaY);
        },
        i = () => {
          ((t.current += (t.target - t.current) * 0.12),
            R.set(e, { rotationX: 0, rotationY: t.current, force3D: !0 }));
        };
      return (
        l.addEventListener(`wheel`, r, { capture: !0, passive: !0 }),
        R.ticker.add(i),
        () => {
          (l.removeEventListener(`wheel`, r, !0),
            R.ticker.remove(i),
            d.current !== null && l.clearTimeout(d.current),
            f.current?.kill());
        }
      );
    }, []),
    m(`div`, {
      onPointerEnter: () => {
        (c(!0), Hr(`hover`));
      },
      onPointerLeave: () => c(!1),
      onClick: () => Hr(`tick`),
      style: {
        width: `100%`,
        height: `100%`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        overflow: `visible`,
        perspective: `1200px`,
        WebkitPerspective: `1200px`,
        perspectiveOrigin: `center center`,
        WebkitPerspectiveOrigin: `center center`,
      },
      children: m(`div`, {
        style: {
          width: `${Math.max(Y, X)}px`,
          height: `${Math.max(Kr, X)}px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          position: `relative`,
          transformStyle: `preserve-3d`,
          WebkitTransformStyle: `preserve-3d`,
        },
        children: b(`div`, {
          ref: a,
          style: {
            width: `${Y}px`,
            height: `${Kr}px`,
            position: `relative`,
            transformStyle: `preserve-3d`,
            WebkitTransformStyle: `preserve-3d`,
            transformOrigin: `center center`,
            WebkitTransformOrigin: `center center`,
          },
          children: [
            m(Wr, {
              src: e || J,
              hoverSrc: n,
              isHovered: o,
              transform: `translateZ(${Yr}px)`,
            }),
            m(Wr, {
              src: t || J,
              hoverSrc: i,
              isHovered: o,
              transform: `rotateY(90deg) translateZ(${qr}px)`,
            }),
            m(Wr, {
              src: e || J,
              hoverSrc: n,
              isHovered: o,
              transform: `rotateY(180deg) translateZ(${Yr}px)`,
            }),
            m(Wr, {
              src: t || J,
              hoverSrc: i,
              isHovered: o,
              transform: `rotateY(-90deg) translateZ(${qr}px)`,
            }),
            m(Gr, { transform: `rotateX(90deg) translateZ(${Jr}px)` }),
            m(Gr, { transform: `rotateX(-90deg) translateZ(${Jr}px)` }),
          ],
        }),
      }),
    })
  );
}
function Wr({ src: e, hoverSrc: t, isHovered: n, transform: r }) {
  let i = {
    position: `absolute`,
    inset: 0,
    width: `100%`,
    height: `100%`,
    display: `block`,
    objectFit: `contain`,
    objectPosition: `center`,
    pointerEvents: `none`,
    userSelect: `none`,
    backfaceVisibility: `hidden`,
    WebkitBackfaceVisibility: `hidden`,
    transform: `translateZ(0.1px)`,
    WebkitTransform: `translateZ(0.1px)`,
    transformStyle: `preserve-3d`,
    WebkitTransformStyle: `preserve-3d`,
    transition: `opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)`,
    willChange: `opacity, transform`,
  };
  return b(`div`, {
    style: {
      position: `absolute`,
      left: 0,
      top: 0,
      width: `${Y}px`,
      height: `${Kr}px`,
      overflow: `hidden`,
      isolation: `isolate`,
      backfaceVisibility: `hidden`,
      WebkitBackfaceVisibility: `hidden`,
      transformStyle: `preserve-3d`,
      WebkitTransformStyle: `preserve-3d`,
      transform: r,
      WebkitTransform: r,
    },
    children: [
      m(`img`, {
        src: e,
        alt: ``,
        draggable: !1,
        style: { ...i, opacity: t && n ? 0 : 1 },
      }),
      t
        ? m(`img`, {
            src: t,
            alt: ``,
            draggable: !1,
            style: { ...i, opacity: +!!n },
          })
        : null,
    ],
  });
}
function Gr({ transform: e }) {
  return m(`div`, {
    style: {
      position: `absolute`,
      left: 0,
      top: 0,
      width: `${Y}px`,
      height: `${X}px`,
      background: `transparent`,
      backfaceVisibility: `hidden`,
      WebkitBackfaceVisibility: `hidden`,
      transformStyle: `preserve-3d`,
      WebkitTransformStyle: `preserve-3d`,
      transform: e,
      WebkitTransform: e,
    },
  });
}
var J,
  Y,
  Kr,
  X,
  qr,
  Jr,
  Yr,
  Xr,
  Zr,
  Qr,
  $r,
  ei,
  ti,
  ni = t(() => {
    (i(),
      C(),
      u(),
      M(),
      Be(),
      (J = `data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2257%22%20height%3D%22123%22%20viewBox%3D%220%200%2057%20123%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20style%3D%22mix-blend-mode%3Adifference%22%3E%3Cpath%20d%3D%22M1.30872%2055.0549L1.30872%2047.6676L18.5458%2041.8632L18.5458%2041.1597L1.30871%2035.3554L1.30871%2027.968L25.9332%2027.968L25.9332%2032.5411L8.87195%2032.5411L8.87195%2033.2447L25.9332%2039.049L25.9332%2043.9739L8.87195%2049.7783L8.87195%2050.4818L25.9332%2050.4818L25.9332%2055.0549L1.30872%2055.0549Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M17.4904%2069.8334L1.30859%2078.8037L1.30859%2073.7029L11.8619%2067.8986L11.8619%2067.195L1.30859%2061.3907L1.30859%2056.2899L17.4904%2065.2603L25.9331%2065.2603L25.9331%2069.8334L17.4904%2069.8334Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M26.2848%2090.0504C26.2848%2091.5982%2026.0386%2093.0053%2025.5461%2094.2717C25.0536%2095.5147%2024.3618%2096.5817%2023.4706%2097.4729C22.5794%2098.3641%2021.4889%2099.0559%2020.1991%2099.5484C18.9092%20100.017%2017.4787%20100.252%2015.9074%20100.252L1.30859%20100.252L1.30859%2095.6788L15.9074%2095.6788C16.7751%2095.6788%2017.5842%2095.5381%2018.3347%2095.2567C19.0617%2094.9518%2019.6949%2094.5531%2020.2343%2094.0607C20.7502%2093.5447%2021.1606%2092.9467%2021.4655%2092.2666C21.7469%2091.5865%2021.8876%2090.8478%2021.8876%2090.0504C21.8876%2089.253%2021.7469%2088.5143%2021.4655%2087.8342C21.1606%2087.1541%2020.7502%2086.5678%2020.2343%2086.0753C19.6949%2085.5594%2019.0617%2085.1607%2018.3347%2084.8792C17.5842%2084.5744%2016.7751%2084.4219%2015.9074%2084.4219L1.30859%2084.4219L1.30859%2079.8488L15.9074%2079.8488C17.4787%2079.8488%2018.9092%2080.0951%2020.1991%2080.5876C21.4889%2081.0566%2022.5794%2081.7367%2023.4706%2082.6279C24.3618%2083.519%2025.0536%2084.5978%2025.5461%2085.8642C26.0386%2087.1072%2026.2848%2088.5026%2026.2848%2090.0504Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M1.30859%2024.1338L1.30859%2019.5607L21.5358%2019.5607L21.5358%207.95199L25.9331%207.95199L25.9331%2024.1338L1.30859%2024.1338Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M1.30859%20123L1.30859%20118.427L11.1584%20118.427L11.1584%20107.346L1.30859%20107.346L1.30859%20102.773L25.9331%20102.773L25.9331%20107.346L15.7315%20107.346L15.7315%20118.427L25.9331%20118.427L25.9331%20123L1.30859%20123Z%22%20fill%3D%22white%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E`),
      (Y = 56),
      (Kr = 123),
      (X = 56),
      (qr = Y / 2),
      (Jr = Kr / 2),
      (Yr = X / 2),
      (Xr = `page-sound:play-shared`),
      (Zr = `__webglMagazineHoverSoundConfig`),
      (Qr = `webgl-magazine:hover-sound-config`),
      ($r = `__webglMagazineTickSoundConfig`),
      (ei = `webgl-magazine:tick-sound-config`),
      (ti = `page-sound:enabled`),
      (Ur.defaultProps = {
        faceOneSvg: J,
        faceTwoSvg: J,
        faceOneHoverSvg: ``,
        faceTwoHoverSvg: ``,
      }),
      j(Ur, {
        faceOneSvg: {
          type: L.File,
          title: `Face 1`,
          allowedFileTypes: [`.svg`],
        },
        faceTwoSvg: {
          type: L.File,
          title: `Face 2`,
          allowedFileTypes: [`.svg`],
        },
        faceOneHoverSvg: {
          type: L.File,
          title: `Face 1 Hover`,
          allowedFileTypes: [`.svg`],
        },
        faceTwoHoverSvg: {
          type: L.File,
          title: `Face 2 Hover`,
          allowedFileTypes: [`.svg`],
        },
      }));
  });
function ri() {
  if (typeof document > `u` || document.getElementById(oi)) return;
  let e = document.createElement(`style`);
  ((e.id = oi),
    (e.textContent = `
.${Z} {
    pointer-events: none !important;
}

.${Z} * {
    pointer-events: none !important;
}

.${Z} a,
.${Z} a *,
.${Z} button,
.${Z} button *,
.${Z} [role="button"],
.${Z} [role="button"] *,
.${Z} [href],
.${Z} [href] *,
.${Z} [tabindex]:not([tabindex="-1"]),
.${Z} [tabindex]:not([tabindex="-1"]) *,
.${Z} [data-page-sound-toggle-icon="true"],
.${Z} [data-page-sound-toggle-icon="true"] *,
.${Z} [data-nav-interactive="true"],
.${Z} [data-nav-interactive="true"] *,
.${Z} [style*="cursor: pointer"],
.${Z} [style*="cursor: pointer"] *,
.${Z} [style*="cursor:pointer"],
.${Z} [style*="cursor:pointer"] * {
    pointer-events: auto !important;
}
`),
    document.head.appendChild(e));
}
function ii(e, t) {
  return [typeof e == `string` ? e : ``, t].filter(Boolean).join(` `);
}
function ai(e) {
  return g((t, n) => {
    let i = r(null),
      a = (e) => {
        ((i.current = e), typeof n == `function` ? n(e) : n && (n.current = e));
      };
    return (
      p(() => {
        ri();
        let e = i.current;
        if (e)
          return (
            e.classList.add(Z),
            () => {
              e.classList.remove(Z);
            }
          );
      }, []),
      m(e, {
        ...t,
        ref: a,
        className: ii(t?.className, Z),
        style: { ...(t?.style || {}), pointerEvents: `none` },
      })
    );
  });
}
var oi,
  Z,
  si = t(() => {
    (C(),
      u(),
      (oi = `nav-pointer-pass-through-style`),
      (Z = `nav-pointer-pass-through`));
  }),
  ci,
  li,
  ui,
  di,
  fi,
  pi,
  mi,
  hi,
  gi,
  _i,
  vi,
  yi,
  bi,
  xi,
  Si,
  Ci,
  wi,
  Ti,
  Ei,
  Di,
  Oi,
  Q,
  ki = t(() => {
    (C(),
      M(),
      ne(),
      u(),
      rr(),
      dr(),
      zr(),
      ni(),
      si(),
      (ci = oe(U)),
      (li = Ie(
        I(U, { nodeId: `T8_1GKQj5`, override: ai, scopeId: `ulXIefzhG` }),
        Fn,
      )),
      (ui = oe(Ur)),
      (di = I(O.div, {
        nodeId: `n4Jl1WdHW`,
        override: or,
        scopeId: `ulXIefzhG`,
      })),
      (fi = I(O.div, {
        nodeId: `HDlDH2_pp`,
        override: ai,
        scopeId: `ulXIefzhG`,
      })),
      (pi = I(O.div, {
        nodeId: `DUFjlnyB1`,
        override: mr,
        scopeId: `ulXIefzhG`,
      })),
      (mi = {
        DUFjlnyB1: `(min-width: 1200px) and (max-width: 1439.98px)`,
        F8Hp2Lobc: `(min-width: 2400px)`,
        P9w3H_YzT: `(max-width: 1199.98px)`,
        UGfdw7LX3: `(min-width: 1440px) and (max-width: 2399.98px)`,
      }),
      (hi = () => typeof document < `u`),
      (gi = `framer-B9KKm`),
      (_i = {
        DUFjlnyB1: `framer-v-17nslh7`,
        F8Hp2Lobc: `framer-v-111writ`,
        P9w3H_YzT: `framer-v-1xg2xhx`,
        UGfdw7LX3: `framer-v-4tig9m`,
      }),
      (vi = (...e) => {
        for (let t of e) if (t && typeof t == `string`) return t;
      }),
      (yi = {
        F8Hp2Lobc: [
          `.framer-B9KKm .framer-um322p { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; padding: 40px 45px 28px 45px; }`,
          `.framer-B9KKm .framer-sr905f { align-self: unset; }`,
        ],
        P9w3H_YzT: [
          `.framer-B9KKm .framer-n2xgl8-container { height: auto; pointer-events: unset; }`,
        ],
        UGfdw7LX3: [
          `.framer-B9KKm.framer-17nslh7 { background-color: #ededed; }`,
          `.framer-B9KKm .framer-n2xgl8-container { pointer-events: unset; }`,
        ],
      }),
      (bi = Object.keys(yi)),
      (xi = {
        F8Hp2Lobc: `.framer-111writ-override`,
        P9w3H_YzT: `.framer-1xg2xhx-override`,
        UGfdw7LX3: `.framer-4tig9m-override`,
      }),
      (Si = [
        `.framer-B9KKm.framer-bzy2r6, .framer-B9KKm .framer-bzy2r6 { display: block; }`,
        `.framer-B9KKm.framer-17nslh7 { align-content: center; align-items: center; background-color: #ececec; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-B9KKm .framer-1ips0ur { background: transparent; flex-grow: 1; height: 0px; margin: 0px; margin-bottom: -0px; position: relative; width: 0px; }`,
        `.framer-B9KKm .framer-n2xgl8-container { flex: none; height: 0px; left: 0px; mix-blend-mode: difference; order: 1001; pointer-events: auto; position: var(--framer-canvas-fixed-position, fixed); right: 0px; top: 0px; z-index: 9; }`,
        `.framer-B9KKm .framer-um322p { display: grid; flex: none; gap: 10px 20px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(2, minmax(50px, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); height: 219px; justify-content: center; left: 0px; order: 1002; overflow: var(--overflow-clip-fallback, clip); overflow-y: var(--overflow-clip-fallback, clip); padding: 20px; pointer-events: auto; position: var(--framer-canvas-fixed-position, fixed); top: 0px; width: min-content; z-index: 9; }`,
        `.framer-B9KKm .framer-sr905f { align-content: center; align-items: center; align-self: start; cursor: pointer; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; grid-column: span 2; height: min-content; justify-content: center; justify-self: start; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
        `.framer-B9KKm .framer-1imgoav-container { flex: none; height: auto; mix-blend-mode: difference; pointer-events: auto; position: relative; width: auto; }`,
        `[data-layout-template="true"] > #overlay { margin-bottom: -0px; }`,
      ]),
      (Ci = {
        DUFjlnyB1: `(min-width: 1200px) and (max-width: 1439.98px)`,
        F8Hp2Lobc: `(min-width: 2400px)`,
        P9w3H_YzT: `(max-width: 1199.98px)`,
        UGfdw7LX3: `(min-width: 1440px) and (max-width: 2399.98px)`,
      }),
      (wi = {
        1440: `UGfdw7LX3`,
        2560: `F8Hp2Lobc`,
        Desktop: `DUFjlnyB1`,
        Phone: `P9w3H_YzT`,
      }),
      (Ti = ({ value: e }) =>
        ge()
          ? null
          : m(`style`, {
              dangerouslySetInnerHTML: { __html: e },
              "data-framer-html-style": ``,
            })),
      (Ei = ({ height: e, id: t, initial: n, width: r, ...i }) => ({
        ...i,
        a_MoyEMO9: n ?? i.a_MoyEMO9 ?? 0,
        variant: wi[i.variant] ?? i.variant ?? `DUFjlnyB1`,
      })),
      (Di = g(function (e, t) {
        let n = r(null),
          i = t ?? n,
          a = d(),
          { activeLocale: o, setLocale: s } = je(),
          {
            style: c,
            className: l,
            layoutId: u,
            variant: f,
            a_MoyEMO9: p,
            children: h,
            ...g
          } = Ei(e),
          [_, v] = Oe(f, mi, !1),
          y = k(gi),
          x = () => !hi() || _ !== `P9w3H_YzT`;
        return (
          Te({}),
          m(Ce.Provider, {
            value: {
              activeVariantId: _,
              humanReadableVariantMap: wi,
              isLayoutTemplate: !0,
              primaryVariantId: `DUFjlnyB1`,
              variantClassNames: _i,
            },
            children: b(te, {
              id: u ?? a,
              children: [
                m(Ti, {
                  value: `:root body { background: rgb(236, 236, 236); } @media (min-width: 1440px) and (max-width: 2399.98px) { :root body { background: rgb(237, 237, 237); } }`,
                }),
                b(pi, {
                  ...g,
                  className: k(y, `framer-17nslh7`, l),
                  "data-layout-template": !0,
                  ref: i,
                  style: { ...c },
                  children: [
                    h,
                    m(`div`, { className: `framer-1ips0ur` }),
                    m(Me, {
                      breakpoint: _,
                      overrides: { P9w3H_YzT: { height: 194 } },
                      children: m(Se, {
                        height: 0,
                        width: `100vw`,
                        y: 0,
                        children: m(de, {
                          className: `framer-n2xgl8-container`,
                          layoutScroll: !0,
                          nodeId: `T8_1GKQj5`,
                          rendersWithMotion: !0,
                          scopeId: `ulXIefzhG`,
                          children: m(Me, {
                            breakpoint: _,
                            overrides: {
                              F8Hp2Lobc: { variant: vi(`Loi4yGiPM`) },
                              P9w3H_YzT: {
                                style: { width: `100%` },
                                variant: vi(`X43iLeyBf`),
                              },
                              UGfdw7LX3: { variant: vi(`AD8HQlKi0`) },
                            },
                            children: m(li, {
                              A9uboLYxD: p,
                              height: `100%`,
                              id: `T8_1GKQj5`,
                              layoutId: `T8_1GKQj5`,
                              lfHSiT9yD: 20,
                              P5H3gyjzG: 1.05,
                              SM7V3AnLL: 29,
                              style: { height: `100%`, width: `100%` },
                              tWeJy1jdo: 7,
                              variant: vi(`DcvfVCzN6`),
                              width: `100%`,
                            }),
                          }),
                        }),
                      }),
                    }),
                    x() &&
                      m(fi, {
                        className: `framer-um322p hidden-1xg2xhx`,
                        "data-framer-name": `Header`,
                        children: m(di, {
                          className: `framer-sr905f`,
                          children: m(Se, {
                            children: m(Me, {
                              breakpoint: _,
                              overrides: {
                                F8Hp2Lobc: { style: { scale: 1.54 } },
                              },
                              children: m(de, {
                                className: `framer-1imgoav-container`,
                                isAuthoredByUser: !0,
                                nodeId: `Osg6o51zj`,
                                rendersWithMotion: !0,
                                scopeId: `ulXIefzhG`,
                                children: m(Ur, {
                                  faceOneHoverSvg: `https://framerusercontent.com/assets/Bi57PSNgEGNhXnUjCjYBKAacRQ.svg`,
                                  faceOneSvg: `https://framerusercontent.com/assets/R4RlD3IldAw8k5cRONJ8SJJgqG4.svg`,
                                  faceTwoHoverSvg: `https://framerusercontent.com/assets/JZyDNnSPROUpFuFHbWYIKApoHng.svg`,
                                  faceTwoSvg: `https://framerusercontent.com/assets/EwHniTuZoV3ME15lpjBiKTAYilc.svg`,
                                  height: `100%`,
                                  id: `Osg6o51zj`,
                                  layoutId: `Osg6o51zj`,
                                  width: `100%`,
                                }),
                              }),
                            }),
                          }),
                        }),
                      }),
                  ],
                }),
                m(`div`, { id: `template-overlay` }),
              ],
            }),
          })
        );
      })),
      (Oi = (e) =>
        e === pe.canvas || e === pe.export
          ? [
              ...Si,
              ...bi.flatMap((e) => {
                let t = xi[e];
                return yi[e].map((e) => `${t} {${e}}`);
              }),
            ]
          : [
              ...Si,
              ...bi.map((e) => `@media ${Ci[e]} { ${yi[e].join(` `)} }`),
            ]),
      (Q = ye(Di, Oi, `framer-B9KKm`)),
      (Q.displayName = `Template`),
      (Q.defaultProps = { height: 592, width: 1200 }),
      j(Q, {
        a_MoyEMO9: {
          defaultValue: 0,
          max: 11,
          min: 0,
          step: 1,
          title: `Initial`,
          type: L.Number,
        },
      }),
      se(Q, [{ explicitInter: !0, fonts: [] }, ...ci, ...ui], {
        supportsExplicitInterCodegen: !0,
      }),
      (Q.loader = {
        load: (e, t) => (t.locale, Promise.allSettled([ie(U, {}, t)])),
      }));
  });
function Ai({ webPageId: e, children: t, style: n, ...r }) {
  let i = { a_MoyEMO9: 0 },
    a =
      {
        Az4tMLI5U: i,
        izfoPjSuV: i,
        Pn95ZS3Nn: { ...i, a_MoyEMO9: 1 },
        yfIxy7MeB: i,
        YhQLZ3MNg: { ...i, a_MoyEMO9: 2 },
      }[e] ?? {};
  switch (e) {
    case `Az4tMLI5U`:
    case `Pn95ZS3Nn`:
    case `YhQLZ3MNg`:
    case `izfoPjSuV`:
    case `yfIxy7MeB`:
      return D(Q, { ...a, key: `Template1`, style: n }, t(!0));
    default:
      return t(!1);
  }
}
function ji(e) {
  switch (e) {
    case `Az4tMLI5U`:
    case `Pn95ZS3Nn`:
    case `YhQLZ3MNg`:
    case `izfoPjSuV`:
    case `yfIxy7MeB`:
      return [
        { hash: `1xg2xhx`, mediaQuery: `(max-width: 1199.98px)` },
        {
          hash: `17nslh7`,
          mediaQuery: `(min-width: 1200px) and (max-width: 1439.98px)`,
        },
        {
          hash: `4tig9m`,
          mediaQuery: `(min-width: 1440px) and (max-width: 2399.98px)`,
        },
        { hash: `111writ`, mediaQuery: `(min-width: 2400px)` },
      ];
    default:
      return;
  }
}
async function Mi({
  routeId: e,
  pathVariables: t,
  canonicalPathVariables: i,
  localeId: a,
  collectionItemId: c,
  contentLocaleId: u,
  shouldResolveInitialRouteContentState: d = !1,
}) {
  let f = $[e].page.preload();
  re({
    disableCustomCode: !1,
    editorBarDisableFrameAncestorsSecurity: !1,
    motionDivToDiv: !1,
    onPageLocalizationSupport: !0,
    onPageMoveTool: !0,
    onPageRichTextBlockSelection: !0,
    scrollRestoration: !0,
    synchronousNavigationOnDesktop: !1,
    yieldOnTap: !1,
  });
  let m = D(be, {
    children: D(Ae, {
      children: D(ve, {
        isWebsite: !0,
        environment: `site`,
        routeId: e,
        pathVariables: t,
        canonicalPathVariables: i,
        routes: $,
        collectionUtils: Ii,
        framerSiteId: Li,
        notFoundPage: P(
          () => import(`./SitesNotFoundPage.js@1.4.DEDT1-cl.mjs`),
        ),
        isReducedMotion: void 0,
        localeId: a,
        locales: Fi,
        preserveQueryParams: void 0,
        siteCanonicalURL: `https://huyml.co`,
        EditorBar:
          l === void 0
            ? void 0
            : (() => {
                if (zi) {
                  console.log(
                    `[Framer On-Page Editing] Unavailable because navigator is bot`,
                  );
                  return;
                }
                return P(async () => {
                  l.__framer_editorBarDependencies = {
                    __version: 3,
                    framer: {
                      useCurrentRoute: fe,
                      useLocaleInfo: je,
                      useRouter: we,
                    },
                    react: {
                      createElement: D,
                      Fragment: o,
                      memo: x,
                      useCallback: n,
                      useEffect: v,
                      useRef: r,
                      useState: s,
                      useLayoutEffect: p,
                    },
                    "react-dom": { createPortal: _ },
                  };
                  let { createEditorBar: e } = await import(
                    `https://framer.com/edit/init.mjs`
                  );
                  return { default: e() };
                });
              })(),
        adaptLayoutToTextDirection: !0,
        LayoutTemplate: Ai,
        loadSnippetsModule: new _e(
          () =>
            import(
              `./allHKIx75pM4__ClcQtY_-QUi6DVHfqc6cn23qzy2wU.D26yfQ-M.mjs`
            ),
        ),
        initialCollectionItemId: c,
        initialContentLocaleIdOverride: u,
      }),
    }),
    value: { routes: {} },
  });
  return (await f, m);
}
function Ni() {
  Ri && l.__framer_events.push(arguments);
}
async function Pi(e, t) {
  function n(e, t, n = !0) {
    if (e.caught || l.__framer_hadFatalError) return;
    let r = t?.componentStack;
    if (n) {
      if (
        (console.warn(
          `Caught a recoverable error. The site is still functional, but might have some UI flickering or degraded page load performance. If you are the author of this website, update external components and check recently added custom code or code overrides to fix the following server/client mismatches:
`,
          e,
          r,
        ),
        Math.random() > 0.01)
      )
        return;
    } else
      console.error(
        `Caught a fatal error. Please report the following to the Framer team via https://www.framer.com/contact/:
`,
        e,
        r,
      );
    Ni(
      n ? `published_site_load_recoverable_error` : `published_site_load_error`,
      {
        message: String(e),
        componentStack: r,
        stack: r
          ? void 0
          : e instanceof Error && typeof e.stack == `string`
            ? e.stack
            : null,
      },
    );
  }
  try {
    let r, i, a, o, s, c, u;
    if (e)
      ((u = JSON.parse(t.dataset.framerHydrateV2)),
        (r = u.routeId),
        (i = u.localeId),
        (a = u.contentLocaleId),
        (o = u.pathVariables),
        (s = u.canonicalPathVariables),
        (c = u.breakpoints),
        (r = ue($, r)));
    else {
      ue($, void 0);
      let e = performance
        .getEntriesByType(`navigation`)[0]
        ?.serverTiming?.find((e) => e.name === `route`)?.description;
      if (e) {
        let t = new URLSearchParams(e);
        ((r = t.get(`id`)), (i = t.get(`locale`)));
        for (let [e, n] of t.entries())
          e.startsWith(`var.`) && ((o ??= {}), (o[e.slice(4)] = n));
      }
      if (!r || !i) {
        let e = ce($, decodeURIComponent(location.pathname), !0, Fi);
        ((r = e.routeId), (i = e.localeId), (o = e.pathVariables));
      }
    }
    let d = Mi({
      routeId: r,
      localeId: i,
      contentLocaleId: a,
      pathVariables: o,
      canonicalPathVariables: s,
      collectionItemId: e ? u?.collectionItemId : void 0,
      shouldResolveInitialRouteContentState: !e,
    });
    l !== void 0 &&
      (async () => {
        let e = $[r],
          t = Fi.find(({ id: e }) => (i ? e === i : e === "default")).code,
          n = u?.collectionItemId ?? null;
        if (n === null && e?.collectionId && Ii) {
          let r = await Ii[e.collectionId]?.(),
            [i] = Object.values(o);
          r &&
            typeof i == `string` &&
            (n = (await r.getRecordIdBySlug(i, t || void 0)) ?? null);
        }
        let a = Intl.DateTimeFormat().resolvedOptions(),
          s = a.timeZone,
          c = a.locale;
        (await new Promise((e) => {
          document.prerendering
            ? document.addEventListener(`prerenderingchange`, e, { once: !0 })
            : e();
        }),
          l.__framer_events.push([
            `published_site_pageview`,
            {
              framerSiteId: Li,
              version: 2,
              routePath: e?.path || `/`,
              collectionItemId: n,
              framerLocale: t || null,
              webPageId: e?.abTestingVariantId ?? r,
              abTestId: e?.abTestId,
              referrer: document.referrer || null,
              url: l.location.href,
              hostname: l.location.hostname || null,
              pathname: l.location.pathname || null,
              hash: l.location.hash || null,
              search: l.location.search || null,
              timezone: s,
              locale: c,
            },
            `eager`,
          ]),
          await Fe({
            priority: `background`,
            ensureContinueBeforeUnload: !0,
            continueAfter: `paint`,
          }),
          document.dispatchEvent(
            new CustomEvent(`framer:pageview`, {
              detail: { framerLocale: t || null },
            }),
          ));
      })();
    let f = await d;
    e
      ? (me(`framer-rewrite-breakpoints`, () => {
          (ae(c), l.__framer_onRewriteBreakpoints?.(c));
        }),
        (zi ? (e) => e() : h)(() => {
          (N(), ke(), E(t, f, { onRecoverableError: n }));
        }))
      : w(t, { onRecoverableError: n }).render(f);
  } catch (e) {
    throw (n(e, void 0, !1), e);
  }
}
var $, Fi, Ii, Li, Ri, zi;
t(() => {
  if (
    (i(),
    M(),
    u(),
    f(),
    S(),
    ki(),
    ($ = {
      Az4tMLI5U: {
        elements: {},
        page: P(
          () =>
            import(
              `./e8XHUPKsgUbD_j36i5m_YIM8UIU28O8o8aXrZlbi1A8.tux3-Cyy.mjs`
            ),
        ),
        path: `/`,
      },
      Pn95ZS3Nn: {
        elements: {},
        page: P(
          () =>
            import(
              `./g_J7fw8947nOFFEKpyiFbTOe_r5eL4JdNvH639sEFFc.DCOobn8N.mjs`
            ),
        ),
        path: `/about`,
      },
      YhQLZ3MNg: {
        elements: {},
        page: P(
          () =>
            import(
              `./Dn7dB2l8iKf6WFpUPJ9bwSJPjXB_JJFWC4RLYZ-Bi0c.D2fjCYtD.mjs`
            ),
        ),
        path: `/playground`,
      },
      yfIxy7MeB: {
        collectionId: `mZlXPGdgz`,
        elements: {},
        page: P(
          () =>
            import(
              `./XOzdk9rlv5tWNrYoQw1RQje4QGGSA8Sgr_DPR8t_R9M.D5F_pS9F.mjs`
            ),
        ),
        path: `/project/:vLVe3KnmR`,
      },
    }),
    (Fi = [
      {
        code: `en`,
        id: `default`,
        name: `English`,
        slug: ``,
        textDirection: `ltr`,
      },
    ]),
    (Ii = {
      mZlXPGdgz: async () =>
        (
          await import(
            `./LNX5uxSu2gkKXRHe_i_JzYOngT69GU1tbDy4SfN3tKo.C6pAgCZe.mjs`
          )
        )?.utils,
    }),
    (Li = `bb916cdd99dbcaa7fff98e11a1ec8b057bb8cb21eed21eb3e33c8f9b6839703d`),
    (Ri = typeof document < `u`),
    (zi =
      Ri &&
      /bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(
        a.userAgent,
      )),
    Ri)
  ) {
    ((l.__framer_importFromPackage = (e, t) => () =>
      D(he, {
        error: `Package component not supported: "` + t + `" in "` + e + `"`,
      })),
      (l.__framer_events = l.__framer_events || []),
      le());
    let e = document.getElementById(`main`);
    `framerHydrateV2` in e.dataset ? Pi(!0, e) : Pi(!1, e);
  }
})();
export { ji as getLayoutTemplateBreakpoints, Mi as getPageRoot };
//# sourceMappingURL=script_main.eyJAZMFh.mjs.map
