import { t as e } from "./rolldown-runtime.Dh6celcD.mjs";
import {
  A as t,
  E as n,
  I as r,
  L as i,
  M as a,
  N as o,
  O as s,
  R as c,
  S as l,
  _ as u,
  c as d,
  g as f,
  h as p,
  j as m,
  k as ee,
  l as h,
  o as g,
} from "./react.BaDOPo3t.mjs";
import { a as te, r as _, t as v, x as y } from "./motion.BPkLvCVm.mjs";
import {
  A as ne,
  C as re,
  E as b,
  G as x,
  M as S,
  R as C,
  S as w,
  T,
  _t as E,
  a as D,
  b as O,
  ct as k,
  dt as A,
  gt as j,
  i as M,
  l as N,
  mt as P,
  o as F,
  ot as ie,
  p as I,
  rt as ae,
  st as oe,
  ut as se,
  v as L,
  x as R,
  yt as z,
  z as B,
} from "./framer.BeBZUbg6.mjs";
import {
  A as V,
  B as H,
  C as ce,
  D as le,
  E as ue,
  F as U,
  H as W,
  I as G,
  M as de,
  N as K,
  O as fe,
  P as pe,
  R as q,
  S as me,
  T as J,
  U as Y,
  V as he,
  _ as ge,
  b as X,
  d as _e,
  f as Z,
  g as ve,
  h as ye,
  j as Q,
  k as be,
  m as xe,
  p as Se,
  u as $,
  v as Ce,
  w as we,
  x as Te,
  y as Ee,
  z as De,
} from "./shared-lib.DyD4REXM.mjs";
import { n as Oe, t as ke } from "./Textstyle.BVJVhHaK.mjs";
import {
  a as Ae,
  c as je,
  i as Me,
  n as Ne,
  o as Pe,
  r as Fe,
  s as Ie,
  t as Le,
} from "./LKjkg9Djy.C-MTg-Qi.mjs";
import { n as Re, t as ze } from "./ClCkXw_3x.Bu29yPTQ.mjs";
import Be, {
  t as Ve,
} from "./_WCqZi7pQbGY8twLmAAJLPOqdw0jUW89TNMbuJD6-nI.B9cXKAMs.mjs";
function He() {
  return { src: ``, buffer: null, loading: null, failed: !1, version: 0 };
}
function Ue() {
  if (c === void 0) return !1;
  try {
    let e = c.sessionStorage.getItem(rt);
    if (!e) return !1;
    c.sessionStorage.removeItem(rt);
    let t = JSON.parse(e),
      n = Number(t?.timestamp) || 0,
      r = Date.now() - n < it;
    return !!t?.contact && r;
  } catch {
    return !1;
  }
}
function We(e, t) {
  return e.boolean?.(t) || e.booleanProperty?.(t) || e.bool?.(t);
}
function Ge(e) {
  return e
    ? typeof e.fire == `function`
      ? (e.fire(), !0)
      : typeof e.trigger == `function`
        ? (e.trigger(), !0)
        : !1
    : !1;
}
function Ke(e, t) {
  if (c !== void 0)
    try {
      c.sessionStorage.setItem(
        rt,
        JSON.stringify({
          contact: e,
          href: typeof t == `string` ? t : c.location.href,
          timestamp: Date.now(),
        }),
      );
    } catch {}
}
function qe() {
  return (
    c !== void 0 &&
    !!(
      c.matchMedia?.(`(pointer: coarse)`)?.matches ||
      c.matchMedia?.(`(hover: none)`)?.matches ||
      i.maxTouchPoints > 0
    )
  );
}
function Je(e, t) {
  (c.dispatchEvent(new CustomEvent(e, { detail: t })),
    c.dispatchEvent(new CustomEvent(`${e}:${t.trigger}`, { detail: t })));
}
function Ye(e) {
  let {
      src: t = ``,
      artboard: r = `huymlactive`,
      stateMachine: a = `State Machine 1`,
      viewModel: s = `huyml`,
      eventPrefix: l = `rive-trigger`,
      autoplay: u = !0,
      mobile: p = !0,
      clickSound: g = ``,
      clickSoundVolume: te = 50,
      openSound: _ = ``,
      openSoundVolume: v = 50,
      style: y,
    } = e,
    ne = n(null),
    re = n(null),
    b = n(null),
    x = n(null),
    S = n(null),
    C = n(null),
    w = n(null),
    T = n(!1),
    E = n(!1),
    D = n(!1),
    k = n({
      pointerId: null,
      startX: 0,
      startY: 0,
      moved: !1,
      allowDispatchUntil: 0,
    }),
    A = n(null),
    j = n(null),
    M = n(new Set()),
    N = n(() => {}),
    P = n(null),
    F = n(new Set()),
    ie = n(() => {}),
    I = n(null),
    ae = n(new Set()),
    oe = n(() => !1),
    se = n(null),
    L = n(new Set()),
    R = n(() => !1),
    z = n(null),
    B = n(He()),
    V = n(He()),
    H = n(He()),
    ce = n(He()),
    le = n(new Set()),
    ue = n(new Set()),
    U = n([]),
    W = n(null),
    [G, de] = o(!1),
    [K, fe] = o(() => p && qe()),
    [pe, q] = o(``),
    me = ee(() => `${t}::${r}::${a}`, [r, t, a]),
    J = O.current() === O.canvas,
    Y = p && K,
    he =
      i !== void 0 &&
      /^((?!chrome|chromium|android|crios|fxios|edgios).)*safari/i.test(
        i.userAgent,
      ),
    ge = () => {
      if (!he || c === void 0) return null;
      if (z.current) return z.current;
      let e = c.AudioContext || c.webkitAudioContext;
      if (!e) return null;
      let t = new e();
      return ((z.current = t), t);
    },
    X = (e, t) => {
      if (!he) return;
      let n = e.version + 1;
      if (
        ((e.version = n),
        (e.src = t),
        (e.buffer = null),
        (e.loading = null),
        (e.failed = !1),
        !t)
      )
        return;
      let r = ge();
      if (!r) {
        e.failed = !0;
        return;
      }
      e.loading = fetch(t)
        .then((e) => {
          if (!e.ok) throw Error(`Audio request failed`);
          return e.arrayBuffer();
        })
        .then((e) => r.decodeAudioData(e))
        .then((t) => {
          e.version === n && (e.buffer = t);
        })
        .catch(() => {
          e.version === n && (e.failed = !0);
        });
    },
    _e = (e, t) => {
      if (!he) return !1;
      let n = ge();
      if (!n || e.failed) return !1;
      let r = () => {
        if (
          !e.buffer ||
          document.documentElement.dataset.pageSoundOn !== `true`
        )
          return;
        let r = c.setTimeout(() => {
          if (
            (ue.current.delete(r),
            !e.buffer ||
              document.documentElement.dataset.pageSoundOn !== `true`)
          )
            return;
          let i = n.createBufferSource(),
            a = n.createGain();
          ((i.buffer = e.buffer),
            (a.gain.value = Math.max(0, Math.min(1, t))),
            i.connect(a),
            a.connect(n.destination),
            (i.onended = () => {
              (le.current.delete(i), i.disconnect(), a.disconnect());
            }),
            le.current.add(i),
            i.start(0));
        }, 0);
        ue.current.add(r);
      };
      if (e.buffer)
        return (
          n.state === `suspended`
            ? n
                .resume()
                .then(r)
                .catch(() => {})
            : r(),
          !0
        );
      if (e.loading) {
        let t = performance.now();
        return (
          e.loading.then(() => {
            performance.now() - t > 1e3 ||
              (e.buffer &&
                (n.state === `suspended`
                  ? n
                      .resume()
                      .then(r)
                      .catch(() => {})
                  : r()));
          }),
          !0
        );
      }
      return !1;
    },
    Z = (e) => {
      (e?.trigger === `click` &&
        ((T.current = !T.current),
        (T.current && oe.current()) || !T.current)) ||
        (Ze.has(e?.trigger) && R.current()) ||
        ie.current();
    },
    ve = (e) => {
      E.current = e;
      let t = x.current;
      if (t)
        try {
          ((t.value = e), b.current?.advance?.(0), b.current?.drawFrame?.());
        } catch (e) {
          f(() => {
            q(e instanceof Error ? e.message : `Failed to set "${Qe}" toggle.`);
          });
        }
    },
    ye = (e) => {
      let t = S.current;
      if (t)
        try {
          ((t.value = e), b.current?.advance?.(0), b.current?.drawFrame?.());
        } catch (e) {
          f(() => {
            q(e instanceof Error ? e.message : `Failed to set "${$e}" toggle.`);
          });
        }
    },
    Q = (e) => {
      D.current = e;
      let t = C.current;
      if (t)
        try {
          ((t.value = e), b.current?.advance?.(0), b.current?.drawFrame?.());
        } catch (e) {
          f(() => {
            q(e instanceof Error ? e.message : `Failed to set "${et}" toggle.`);
          });
        }
    };
  return (
    m(() => {
      f(() => {
        de(!0);
      });
    }, []),
    m(() => {
      if (!he || c === void 0 || J) return;
      let e = (e) => {
        let t = e.target,
          n =
            t instanceof Element &&
            !!t.closest(`[data-page-sound-toggle-icon="true"]`);
        if (document.documentElement.dataset.pageSoundOn !== `true` && !n)
          return;
        let r = z.current;
        r?.state === `suspended` && r.resume().catch(() => {});
      };
      return (
        c.addEventListener(`pointerdown`, e, { passive: !0 }),
        c.addEventListener(`touchstart`, e, { passive: !0 }),
        () => {
          (c.removeEventListener(`pointerdown`, e),
            c.removeEventListener(`touchstart`, e),
            ue.current.forEach((e) => {
              c.clearTimeout(e);
            }),
            ue.current.clear(),
            le.current.forEach((e) => {
              e.onended = null;
              try {
                e.stop();
              } catch {}
              e.disconnect();
            }),
            le.current.clear());
          let t = z.current;
          ((z.current = null), t && t.close().catch(() => {}));
        }
      );
    }, [J, he]),
    m(() => {
      if (c === void 0 || J) return;
      let e = (e) => {
        let t = j.current;
        if ((t && (t.pause(), t.removeAttribute(`src`), t.load()), !e?.src)) {
          ((j.current = null), X(B.current, ``));
          return;
        }
        let n = new Audio(e.src);
        ((n.preload = `auto`),
          (n.volume = Math.max(0, Math.min(1, (e.volume ?? 40) / 100))),
          n.load(),
          (j.current = n),
          X(B.current, e.src));
      };
      N.current = () => {
        let e = j.current;
        if (
          !e ||
          document.documentElement.dataset.pageSoundOn !== `true` ||
          _e(B.current, e.volume)
        )
          return;
        let t = e.cloneNode(!0);
        ((t.volume = e.volume),
          (t.preload = `auto`),
          (t.style.display = `none`),
          M.current.add(t),
          document.body.appendChild(t));
        let n = !1,
          r = () => {
            n ||
              ((n = !0),
              t.removeEventListener(`ended`, r),
              t.removeEventListener(`error`, r),
              t.pause(),
              t.removeAttribute(`src`),
              t.load(),
              t.remove(),
              M.current.delete(t));
          };
        (t.addEventListener(`ended`, r, { once: !0 }),
          t.addEventListener(`error`, r, { once: !0 }),
          t.play()?.catch(r));
      };
      let t = c[ct] || null;
      if (!t)
        try {
          let e = c.localStorage.getItem(lt) || c.sessionStorage.getItem(lt);
          t = e ? JSON.parse(e) : null;
        } catch {}
      e(t);
      let n = (t) => {
        e(t.detail || null);
      };
      return (
        c.addEventListener(ut, n),
        () => {
          (c.removeEventListener(ut, n), (N.current = () => {}));
          let e = j.current;
          (e && (e.pause(), e.removeAttribute(`src`), e.load()),
            (j.current = null),
            M.current.forEach((e) => {
              (e.pause(), e.removeAttribute(`src`), e.load(), e.remove());
            }),
            M.current.clear());
        }
      );
    }, [J]),
    m(() => {
      if (c === void 0 || J) return;
      let e = I.current;
      if ((e && (e.pause(), e.removeAttribute(`src`), e.load()), !g)) {
        ((I.current = null), (oe.current = () => !1), X(H.current, ``));
        return;
      }
      let t = new Audio(g);
      return (
        (t.preload = `auto`),
        (t.volume = Math.max(0, Math.min(1, te / 100))),
        t.load(),
        (I.current = t),
        X(H.current, g),
        (oe.current = () => {
          let e = I.current;
          if (!e) return !1;
          if (
            document.documentElement.dataset.pageSoundOn !== `true` ||
            _e(H.current, e.volume)
          )
            return !0;
          let t = e.cloneNode(!0);
          ((t.volume = e.volume),
            (t.preload = `auto`),
            (t.style.display = `none`),
            ae.current.add(t),
            document.body.appendChild(t));
          let n = !1,
            r = () => {
              n ||
                ((n = !0),
                t.removeEventListener(`ended`, r),
                t.removeEventListener(`error`, r),
                t.pause(),
                t.removeAttribute(`src`),
                t.load(),
                t.remove(),
                ae.current.delete(t));
            };
          return (
            t.addEventListener(`ended`, r, { once: !0 }),
            t.addEventListener(`error`, r, { once: !0 }),
            t.play()?.catch(r),
            !0
          );
        }),
        () => {
          ((oe.current = () => !1),
            t.pause(),
            t.removeAttribute(`src`),
            t.load(),
            I.current === t && (I.current = null),
            ae.current.forEach((e) => {
              (e.pause(), e.removeAttribute(`src`), e.load(), e.remove());
            }),
            ae.current.clear());
        }
      );
    }, [g, te, J]),
    m(() => {
      if (c === void 0 || J) return;
      let e = se.current;
      if ((e && (e.pause(), e.removeAttribute(`src`), e.load()), !_)) {
        ((se.current = null), (R.current = () => !1), X(ce.current, ``));
        return;
      }
      let t = new Audio(_);
      return (
        (t.preload = `auto`),
        (t.volume = Math.max(0, Math.min(1, v / 100))),
        t.load(),
        (se.current = t),
        X(ce.current, _),
        (R.current = () => {
          let e = se.current;
          if (!e) return !1;
          if (
            document.documentElement.dataset.pageSoundOn !== `true` ||
            _e(ce.current, e.volume)
          )
            return !0;
          let t = e.cloneNode(!0);
          ((t.volume = e.volume),
            (t.preload = `auto`),
            (t.style.display = `none`),
            L.current.add(t),
            document.body.appendChild(t));
          let n = !1,
            r = () => {
              n ||
                ((n = !0),
                t.removeEventListener(`ended`, r),
                t.removeEventListener(`error`, r),
                t.pause(),
                t.removeAttribute(`src`),
                t.load(),
                t.remove(),
                L.current.delete(t));
            };
          return (
            t.addEventListener(`ended`, r, { once: !0 }),
            t.addEventListener(`error`, r, { once: !0 }),
            t.play()?.catch(r),
            !0
          );
        }),
        () => {
          ((R.current = () => !1),
            t.pause(),
            t.removeAttribute(`src`),
            t.load(),
            se.current === t && (se.current = null),
            L.current.forEach((e) => {
              (e.pause(), e.removeAttribute(`src`), e.load(), e.remove());
            }),
            L.current.clear());
        }
      );
    }, [J, _, v]),
    m(() => {
      if (c === void 0 || J) return;
      let e = (e) => {
        let t = P.current;
        if ((t && (t.pause(), t.removeAttribute(`src`), t.load()), !e?.src)) {
          ((P.current = null), X(V.current, ``));
          return;
        }
        let n = new Audio(e.src);
        ((n.preload = `auto`),
          (n.volume = Math.max(0, Math.min(1, (e.volume ?? 50) / 100))),
          n.load(),
          (P.current = n),
          X(V.current, e.src));
      };
      ie.current = () => {
        let e = P.current;
        if (
          !e ||
          document.documentElement.dataset.pageSoundOn !== `true` ||
          _e(V.current, e.volume)
        )
          return;
        let t = e.cloneNode(!0);
        ((t.volume = e.volume),
          (t.preload = `auto`),
          (t.style.display = `none`),
          F.current.add(t),
          document.body.appendChild(t));
        let n = !1,
          r = () => {
            n ||
              ((n = !0),
              t.removeEventListener(`ended`, r),
              t.removeEventListener(`error`, r),
              t.pause(),
              t.removeAttribute(`src`),
              t.load(),
              t.remove(),
              F.current.delete(t));
          };
        (t.addEventListener(`ended`, r, { once: !0 }),
          t.addEventListener(`error`, r, { once: !0 }),
          t.play()?.catch(r));
      };
      let t = c[dt] || null;
      if (!t)
        try {
          let e = c.localStorage.getItem(ft) || c.sessionStorage.getItem(ft);
          t = e ? JSON.parse(e) : null;
        } catch {}
      e(t);
      let n = (t) => {
        e(t.detail || null);
      };
      return (
        c.addEventListener(pt, n),
        () => {
          (c.removeEventListener(pt, n), (ie.current = () => {}));
          let e = P.current;
          (e && (e.pause(), e.removeAttribute(`src`), e.load()),
            (P.current = null),
            F.current.forEach((e) => {
              (e.pause(), e.removeAttribute(`src`), e.load(), e.remove());
            }),
            F.current.clear());
        }
      );
    }, [J]),
    m(() => {
      !G || J || (ye(p), p || Q(!1));
    }, [J, G, p]),
    m(() => {
      if (!G || J) return;
      if (!p) {
        Q(!1);
        return;
      }
      let e = () => document.querySelector(tt),
        t = (e) => {
          if (!e) return !1;
          let t = e.getBoundingClientRect(),
            n = c.innerWidth || document.documentElement.clientWidth || 0,
            r = c.innerHeight || document.documentElement.clientHeight || 0;
          return t.bottom > 0 && t.right > 0 && t.top < r && t.left < n;
        };
      if (typeof IntersectionObserver > `u`) {
        let n = () => {
          Q(t(e()));
        };
        (n(),
          c.addEventListener(`scroll`, n, { passive: !0 }),
          c.addEventListener(`resize`, n));
        let r = new MutationObserver(n);
        return (
          r.observe(document.body, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: [`aria-label`],
          }),
          () => {
            (r.disconnect(),
              c.removeEventListener(`scroll`, n),
              c.removeEventListener(`resize`, n),
              Q(!1));
          }
        );
      }
      let n = null,
        r = new IntersectionObserver(
          (e) => {
            let t = e[0];
            Q(!!t?.isIntersecting);
          },
          { threshold: 0 },
        ),
        i = () => {
          let i = e();
          if (i !== n) {
            if ((r.disconnect(), (n = i), !i)) {
              Q(!1);
              return;
            }
            (Q(t(i)), r.observe(i));
          }
        };
      i();
      let a = new MutationObserver(i);
      return (
        a.observe(document.body, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: [`aria-label`],
        }),
        () => {
          (a.disconnect(), r.disconnect(), Q(!1));
        }
      );
    }, [J, G, p]),
    m(() => {
      if (!G || J || c === void 0) return;
      let e = c.matchMedia?.(`(pointer: coarse), (hover: none)`);
      if (!e) return;
      let t = () => {
        f(() => {
          fe(p && qe());
        });
      };
      return (
        t(),
        e.addEventListener
          ? e.addEventListener(`change`, t)
          : e.addListener?.(t),
        () => {
          e.removeEventListener
            ? e.removeEventListener(`change`, t)
            : e.removeListener?.(t);
        }
      );
    }, [J, G, p]),
    m(() => {
      if (!G || J) return;
      if (!p) {
        ((A.current = null),
          (k.current.pointerId = null),
          (k.current.moved = !1),
          (k.current.allowDispatchUntil = 0));
        return;
      }
      let e = ne.current,
        t = re.current;
      if (!e || !t) return;
      let n = () => {
          ((k.current.pointerId = null), (k.current.moved = !1));
        },
        r = () => {
          let e = A.current;
          return ((A.current = null), e ? (Z(e), Je(l, e), !0) : !1);
        },
        i = (e, n, r) => {
          let i = {
            bubbles: !0,
            cancelable: !0,
            composed: !0,
            clientX: n.clientX,
            clientY: n.clientY,
            screenX: n.screenX,
            screenY: n.screenY,
            button: 0,
            buttons: r,
            ctrlKey: n.ctrlKey,
            altKey: n.altKey,
            shiftKey: n.shiftKey,
            metaKey: n.metaKey,
          };
          try {
            typeof PointerEvent < `u` &&
              t.dispatchEvent(
                new PointerEvent(e, {
                  ...i,
                  pointerId: n.pointerId,
                  pointerType: n.pointerType || `touch`,
                  isPrimary: n.isPrimary,
                }),
              );
          } catch {}
          let a =
            e === `pointerdown`
              ? `mousedown`
              : e === `pointerup`
                ? `mouseup`
                : e;
          t.dispatchEvent(new MouseEvent(a, i));
        },
        a = (e) => {
          (i(`pointerdown`, e, 1),
            i(`pointerup`, e, 0),
            t.dispatchEvent(
              new MouseEvent(`click`, {
                bubbles: !0,
                cancelable: !0,
                composed: !0,
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
                button: 0,
                buttons: 0,
              }),
            ));
        },
        o = (e) => {
          (e.pointerType === `mouse` && !qe()) ||
            ((k.current.pointerId = e.pointerId),
            (k.current.startX = e.clientX),
            (k.current.startY = e.clientY),
            (k.current.moved = !1),
            (k.current.allowDispatchUntil = 0),
            (A.current = null));
        },
        s = (e) => {
          let t = k.current;
          if (t.pointerId !== e.pointerId) return;
          let n = e.clientX - t.startX,
            r = e.clientY - t.startY;
          Math.hypot(n, r) < ot || ((t.moved = !0), (A.current = null));
        },
        c = (e) => {
          let t = k.current;
          if (t.pointerId === e.pointerId) {
            if (t.moved) ((t.allowDispatchUntil = 0), (A.current = null));
            else {
              if (((t.allowDispatchUntil = performance.now() + st), r())) {
                ((t.allowDispatchUntil = 0), n());
                return;
              }
              (n(), a(e));
              return;
            }
            n();
          }
        },
        u = (e) => {
          let t = k.current;
          t.pointerId === e.pointerId &&
            ((t.allowDispatchUntil = 0), (A.current = null), n());
        };
      return (
        e.addEventListener(`pointerdown`, o, { capture: !0, passive: !0 }),
        e.addEventListener(`pointermove`, s, { capture: !0, passive: !0 }),
        e.addEventListener(`pointerup`, c, { capture: !0, passive: !0 }),
        e.addEventListener(`pointercancel`, u, { capture: !0, passive: !0 }),
        () => {
          (e.removeEventListener(`pointerdown`, o, !0),
            e.removeEventListener(`pointermove`, s, !0),
            e.removeEventListener(`pointerup`, c, !0),
            e.removeEventListener(`pointercancel`, u, !0),
            (A.current = null),
            n());
        }
      );
    }, [me, l, J, G, p]),
    m(() => {
      if (!G || J) return;
      ve(Ue());
      let e = (e) => {
        let t = e,
          n = !!t.detail?.contact;
        (Ke(n, t.detail?.href), ve(n));
      };
      return (
        c.addEventListener(nt, e),
        () => {
          c.removeEventListener(nt, e);
        }
      );
    }, [J, G]),
    m(() => {
      if (!G || !t || J) return;
      let e = re.current,
        n = ne.current;
      if (!e || !n) return;
      let i = !1;
      (U.current.forEach((e) => e()),
        (U.current = []),
        (x.current = null),
        (S.current = null),
        (C.current = null),
        (w.current = null),
        (T.current = !1),
        W.current?.disconnect(),
        (W.current = null),
        b.current?.cleanup?.(),
        (b.current = null),
        f(() => {
          q(``);
        }));
      let o = (e) => {
        let t = k.current;
        if (!(
          (p && qe()) ||
          t.pointerId !== null ||
          performance.now() <= t.allowDispatchUntil
        )) {
          (Z(e), Je(l, e));
          return;
        }
        if (t.pointerId !== null) {
          t.moved || (A.current = e);
          return;
        }
        performance.now() <= t.allowDispatchUntil &&
          ((t.allowDispatchUntil = 0), Z(e), Je(l, e));
      };
      return (
        (async () => {
          try {
            let d = await import(`./canvas@2.31.De79Xtt8.mjs`),
              m = d.default && d.default.Rive ? d.default : d;
            if (i) return;
            let ee = m.Fit?.Cover ?? m.Fit?.cover ?? void 0,
              h = m.Alignment?.Center ?? m.Alignment?.center ?? void 0,
              g =
                m.Layout && ee !== void 0
                  ? new m.Layout({ fit: ee, alignment: h })
                  : void 0,
              te = () => {
                let t = Math.max(
                    1,
                    Math.round(n.clientWidth * c.devicePixelRatio),
                  ),
                  r = Math.max(
                    1,
                    Math.round(n.clientHeight * c.devicePixelRatio),
                  );
                (e.width !== t || e.height !== r) &&
                  ((e.width = t), (e.height = r));
              };
            te();
            let _ = new m.Rive({
              src: t,
              canvas: e,
              artboard: r,
              stateMachines: a,
              autoplay: u,
              autoBind: !0,
              ...(g ? { layout: g } : {}),
              onLoad: () => {
                if (!i) {
                  (te(), _.resizeDrawingSurfaceToCanvas(), u && _.play?.());
                  try {
                    let n = _.viewModelInstance,
                      i = _.viewModelByName?.(s)?.defaultInstance?.(),
                      l = n || i;
                    if ((i && !n && _.bindViewModelInstance?.(i), !l)) {
                      f(() => {
                        q(
                          `Rive loaded, but view model "${s}" could not be bound for trigger listening.`,
                        );
                      });
                      return;
                    }
                    let u = We(l, Qe);
                    ((x.current = u || null),
                      u &&
                        ((u.value = E.current),
                        _.advance?.(0),
                        _.drawFrame?.()));
                    let d = We(l, $e);
                    ((S.current = d || null),
                      d && ((d.value = p), _.advance?.(0), _.drawFrame?.()));
                    let m = We(l, et);
                    ((C.current = m || null),
                      m &&
                        ((m.value = p ? D.current : !1),
                        _.advance?.(0),
                        _.drawFrame?.()));
                    let ee = [
                        `bia`,
                        `cat`,
                        `cay`,
                        `game`,
                        `laptop`,
                        `mi`,
                        `rean`,
                        `sotd`,
                        `time`,
                        `hover`,
                      ],
                      h = new Map(),
                      g = (e = !0) => {
                        let t = !1,
                          n = !1;
                        for (let r of ee) {
                          let i = We(l, r),
                            a = !!(i && i.value === !0),
                            o = h.get(r) ?? !1;
                          (e && a && !o && (n = !0),
                            h.set(r, a),
                            a && (t = !0));
                        }
                        (re.current &&
                          (re.current.style.cursor = t ? `pointer` : `default`),
                          n && N.current());
                      },
                      te = () => {
                        g();
                      };
                    (g(!1),
                      _.on(`statechange`, te),
                      U.current.push(() => {
                        _.off?.(`statechange`, te);
                      }));
                    let v = () => {
                      c.requestAnimationFrame(() => g());
                    };
                    (e.addEventListener(`pointermove`, v),
                      U.current.push(() => {
                        e.removeEventListener(`pointermove`, v);
                      }),
                      Xe.forEach((e) => {
                        let n = l.trigger?.(e);
                        if (!n?.on) return;
                        e === `click` && (w.current = n);
                        let i = () => {
                          o({
                            trigger: e,
                            artboard: r,
                            stateMachine: a,
                            viewModel: s,
                            src: t,
                          });
                        };
                        (n.on(i),
                          U.current.push(() => {
                            n.off?.(i);
                          }));
                      }));
                  } catch (e) {
                    f(() => {
                      q(
                        e instanceof Error
                          ? e.message
                          : `Failed to bind Rive triggers.`,
                      );
                    });
                  }
                }
              },
              onLoadError: (e) => {
                i ||
                  f(() => {
                    q(
                      e instanceof Error
                        ? e.message
                        : `Failed to load Rive file.`,
                    );
                  });
              },
            });
            b.current = _;
            let v = () => {
              (te(), _.resizeDrawingSurfaceToCanvas?.(), _.drawFrame?.());
            };
            ((W.current = new ResizeObserver(v)),
              W.current.observe(n),
              c.addEventListener(`resize`, v));
            let y = (e) => {
              let t = e;
              if (!(t.detail?.source !== at || t.detail?.trigger !== `click`))
                try {
                  if (!Ge(w.current)) return;
                  (_.advance?.(0), _.drawFrame?.());
                } catch (e) {
                  f(() => {
                    q(
                      e instanceof Error
                        ? e.message
                        : `Failed to fire Rive trigger "click".`,
                    );
                  });
                }
            };
            (c.addEventListener(l, y),
              U.current.push(() => {
                (c.removeEventListener(`resize`, v),
                  c.removeEventListener(l, y));
              }));
          } catch (e) {
            if (i) return;
            f(() => {
              q(
                e instanceof Error
                  ? e.message
                  : `Failed to initialize Rive runtime.`,
              );
            });
          }
        })(),
        () => {
          ((i = !0),
            U.current.forEach((e) => e()),
            (U.current = []),
            (x.current = null),
            (S.current = null),
            (C.current = null),
            (w.current = null),
            W.current?.disconnect(),
            (W.current = null),
            b.current?.cleanup?.(),
            (b.current = null),
            e && ((e.width = 0), (e.height = 0)));
        }
      );
    }, [r, u, l, J, G, p, t, a, s]),
    J
      ? d(`div`, {
          style: {
            width: `100%`,
            height: `100%`,
            display: `grid`,
            placeItems: `center`,
            color: `rgba(0,0,0,0.45)`,
            fontSize: 12,
            padding: 12,
            textAlign: `center`,
            background: `rgba(0,0,0,0.04)`,
            ...y,
          },
          children: `RiveTriggerBridge`,
        })
      : h(`div`, {
          ref: ne,
          style: {
            width: `100%`,
            height: `100%`,
            position: `relative`,
            overflow: `hidden`,
            background: `transparent`,
            ...y,
            touchAction: `pan-y`,
          },
          children: [
            d(
              `canvas`,
              {
                ref: re,
                style: {
                  width: `100%`,
                  height: `100%`,
                  display: `block`,
                  pointerEvents: Y ? `none` : `auto`,
                  touchAction: `pan-y`,
                },
              },
              me,
            ),
            Y
              ? d(`div`, {
                  "aria-hidden": `true`,
                  style: {
                    position: `absolute`,
                    inset: 0,
                    zIndex: 1,
                    background: `transparent`,
                    touchAction: `pan-y`,
                    pointerEvents: `auto`,
                  },
                })
              : null,
            pe
              ? d(`div`, {
                  style: {
                    position: `absolute`,
                    left: 12,
                    right: 12,
                    bottom: 12,
                    padding: `8px 10px`,
                    borderRadius: 8,
                    background: `rgba(0, 0, 0, 0.72)`,
                    color: `#fff`,
                    fontSize: 11,
                    lineHeight: 1.4,
                    pointerEvents: `none`,
                  },
                  children: pe,
                })
              : null,
          ],
        })
  );
}
var Xe,
  Ze,
  Qe,
  $e,
  et,
  tt,
  nt,
  rt,
  it,
  at,
  ot,
  st,
  ct,
  lt,
  ut,
  dt,
  ft,
  pt,
  mt = e(() => {
    (r(),
      g(),
      x(),
      l(),
      (Xe = [
        `click`,
        `catclick`,
        `bidaclick`,
        `cayclick`,
        `gameclick`,
        `laptopclick`,
        `miclick`,
        `reanclick`,
        `sotdclick`,
        `timeclick`,
      ]),
      (Ze = new Set([
        `catclick`,
        `bidaclick`,
        `cayclick`,
        `gameclick`,
        `laptopclick`,
        `miclick`,
        `reanclick`,
        `sotdclick`,
        `timeclick`,
      ])),
      (Qe = `contact`),
      ($e = `mobile`),
      (et = `minview`),
      (tt = `[aria-label="inview"]`),
      (nt = `rive-contact:set`),
      (rt = `rive-contact:pending`),
      (it = 1e4),
      (at = `rive-info-panel-close`),
      (ot = 8),
      (st = 700),
      (ct = `__webglMagazineHoverSoundConfig`),
      (lt = `webgl-magazine:hover-sound-config`),
      (ut = `webgl-magazine:hover-sound-config`),
      (dt = `__webglMagazineTickSoundConfig`),
      (ft = `webgl-magazine:tick-sound-config`),
      (pt = `webgl-magazine:tick-sound-config`),
      (Ye.defaultProps = {
        src: ``,
        artboard: `huymlactive`,
        stateMachine: `State Machine 1`,
        viewModel: `huyml`,
        eventPrefix: `rive-trigger`,
        autoplay: !0,
        mobile: !0,
        clickSound: ``,
        clickSoundVolume: 50,
        openSound: ``,
        openSoundVolume: 50,
      }),
      b(Ye, {
        clickSound: {
          type: F.File,
          title: `Click Sound`,
          allowedFileTypes: [`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`],
        },
        clickSoundVolume: {
          type: F.Number,
          title: `Click Volume`,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          hidden(e) {
            return !e.clickSound;
          },
        },
        openSound: {
          type: F.File,
          title: `Open Sound`,
          allowedFileTypes: [`.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`],
        },
        openSoundVolume: {
          type: F.Number,
          title: `Open Volume`,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          hidden(e) {
            return !e.openSound;
          },
        },
        src: { type: F.File, title: `Rive File`, allowedFileTypes: [`.riv`] },
        artboard: {
          type: F.String,
          title: `Artboard`,
          defaultValue: `huymlactive`,
        },
        stateMachine: {
          type: F.String,
          title: `State Machine`,
          defaultValue: `State Machine 1`,
        },
        viewModel: {
          type: F.String,
          title: `View Model`,
          defaultValue: `huyml`,
        },
        eventPrefix: {
          type: F.String,
          title: `Event`,
          defaultValue: `rive-trigger`,
        },
        autoplay: { type: F.Boolean, title: `Autoplay`, defaultValue: !0 },
        mobile: {
          type: F.Boolean,
          title: `Mobile`,
          defaultValue: !0,
          enabledTitle: `On`,
          disabledTitle: `Off`,
        },
      }));
  });
function ht(e) {
  if (c === void 0 || typeof document > `u`) return;
  let t = { kind: e, handled: !1 };
  if ((c.dispatchEvent(new CustomEvent(nn, { detail: t })), t.handled)) return;
  let n = document.documentElement.dataset.pageSoundOn,
    r = n === `true`;
  if (n !== `true` && n !== `false`)
    try {
      r = c.sessionStorage.getItem(cn) === `true`;
    } catch {}
  if (!r) return;
  let i = e === `hover` ? rn : on,
    a = e === `hover` ? an : sn,
    o = c[i] || null;
  if (!o?.src)
    try {
      let e = c.localStorage.getItem(a) || c.sessionStorage.getItem(a);
      o = e ? JSON.parse(e) : null;
    } catch {}
  if (!o?.src) return;
  let s = new Audio(o.src);
  ((s.preload = `auto`),
    (s.volume = Math.max(
      0,
      Math.min(1, (o.volume ?? (e === `hover` ? 40 : 50)) / 100),
    )),
    (s.style.display = `none`),
    document.body.appendChild(s));
  let l = !1,
    u = () => {
      l ||
        ((l = !0),
        s.removeEventListener(`ended`, u),
        s.removeEventListener(`error`, u),
        s.pause(),
        s.removeAttribute(`src`),
        s.load(),
        s.remove());
    };
  (s.addEventListener(`ended`, u, { once: !0 }),
    s.addEventListener(`error`, u, { once: !0 }),
    s.play()?.catch(u));
}
function gt(e, t) {
  e?.style.setProperty(`pointer-events`, t, `important`);
}
function _t(e, t) {
  e?.style.setProperty(`touch-action`, t, `important`);
}
function vt(e, t) {
  e && (t ? e.setAttribute(`inert`, ``) : e.removeAttribute(`inert`));
}
function yt(e) {
  let t = e?.parentElement;
  return !t || t === document.body || t === document.documentElement ? null : t;
}
function bt(e, t) {
  let n = yt(e);
  n &&
    (n.style.setProperty(`pointer-events`, `none`, `important`),
    n.style.setProperty(`z-index`, String(t), `important`));
}
function xt(e) {
  if (!e) return null;
  let t = e.getBoundingClientRect();
  return t.width <= 0 || t.height <= 0
    ? null
    : {
        left: t.left,
        top: t.top,
        right: t.right,
        bottom: t.bottom,
        width: t.width,
        height: t.height,
      };
}
function St(e, t) {
  (c !== void 0 && (c[Xt] = (e && t) || null),
    !(typeof document > `u`) &&
      (e
        ? (document.documentElement.dataset[Yt] = `true`)
        : delete document.documentElement.dataset[Yt],
      c !== void 0 &&
        c.dispatchEvent(
          new CustomEvent(qt, {
            detail: { active: e, rect: (e && t) || null },
          }),
        )));
}
function Ct(e, t) {
  c !== void 0 &&
    c.dispatchEvent(new CustomEvent(Jt, { detail: { open: e, trigger: t } }));
}
function wt(e) {
  (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation?.());
}
function Tt(e) {
  if (
    (typeof PointerEvent < `u` && e instanceof PointerEvent) ||
    (typeof MouseEvent < `u` && e instanceof MouseEvent)
  )
    return { x: e.clientX, y: e.clientY };
  if (typeof TouchEvent < `u` && e instanceof TouchEvent) {
    let t = e.touches[0] || e.changedTouches[0];
    if (t) return { x: t.clientX, y: t.clientY };
  }
  return null;
}
function Et(e, t) {
  if (!e || !t) return !1;
  let n = e.getBoundingClientRect();
  return t.x >= n.left && t.x <= n.right && t.y >= n.top && t.y <= n.bottom;
}
function Dt(e, t = `auto`) {
  let n = typeof e == `string` ? e.trim() : ``;
  if (!n || c === void 0) return Promise.resolve();
  let r = kt.get(n);
  if (r) return r;
  let i = new Promise((e) => {
    let r = new Image();
    r.fetchPriority = t;
    let i = !1,
      a = () => {
        i || ((i = !0), (r.onload = null), (r.onerror = null), e());
      };
    if (
      ((r.onload = () => {
        let e = r.decode?.();
        if (e) {
          e.then(a).catch(a);
          return;
        }
        a();
      }),
      (r.onerror = a),
      (r.src = n),
      r.complete)
    ) {
      r.onload = null;
      let e = r.decode?.();
      if (e) {
        e.then(a).catch(a);
        return;
      }
      a();
    }
  });
  return (kt.set(n, i), i);
}
function Ot(e) {
  let {
      closeEdgeRefreshR13: t = !0,
      visualGapRefreshR12: r = !0,
      compileRefreshR11: i = !0,
      gapRefreshR10: a = !0,
      lineBreaksR5: s = !0,
      buildVersion: l = `Close Edge V2R13`,
      eventName: u = `rive-trigger`,
      cardPadding: p = 16,
      contentPadding: g = 32,
      titleColor: te = `#181818`,
      bodyColor: _ = `#181818`,
      closeButtonColor: v,
      closeColor: y,
      closeLineDuration: ne = 0.7,
      titleFont: re,
      useTextStyleSource: b = !1,
      style: x,
    } = e,
    S = n(null),
    C = n(null),
    w = n(null),
    T = n(null),
    E = n(null),
    D = n(null),
    O = n(null),
    k = n(null),
    A = n(-4),
    [j, M] = o(null),
    [N, P] = o(!1),
    [F, ie] = o(!1),
    [I, ae] = o(() => (c === void 0 ? 1512 : c.innerWidth)),
    [oe, se] = o(() => (c === void 0 ? null : c[tn]?.[$t]?.style || null)),
    L = n(null),
    R = n(!1),
    z = n(!1),
    B = n(!1),
    V = n(null),
    H = n(0),
    ce = n(null),
    le = n(() => {}),
    ue = n(0),
    U = n(0),
    W = n(null),
    G = re || {},
    de = b && oe ? { ...fn, ...oe } : fn,
    K = v || y || `#000000`,
    fe = I <= 1512 ? 4 : 8;
  (m(() => {
    if (!b || c === void 0) return;
    let e = () => {
        let e = c[tn]?.[$t]?.style;
        e && se(e);
      },
      t = (e) => {
        let t = e.detail;
        t?.key !== $t || !t.style || se(t.style);
      };
    return (
      e(),
      c.addEventListener(en, t),
      () => {
        c.removeEventListener(en, t);
      }
    );
  }, [b]),
    m(() => {
      if (c === void 0) return;
      let e = () => {
        ae(c.innerWidth);
      };
      return (
        e(),
        c.addEventListener(`resize`, e),
        c.visualViewport?.addEventListener(`resize`, e),
        () => {
          (c.removeEventListener(`resize`, e),
            c.visualViewport?.removeEventListener(`resize`, e));
        }
      );
    }, []));
  let pe = (e) => {
      let t = yt(S.current);
      if (!t) return;
      if (!e) {
        t.style.setProperty(`display`, `none`, `important`);
        return;
      }
      let n = W.current;
      n?.value
        ? t.style.setProperty(`display`, n.value, n.priority)
        : t.style.removeProperty(`display`);
    },
    q = (e) => {
      let t = e && R.current && z.current && L.current !== null;
      St(t, t ? xt(S.current) : null);
    },
    me = () => {
      let e = S.current;
      e &&
        (Y.set(e, { x: ue.current, y: U.current, force3D: !0 }),
        z.current && R.current && q(!0));
    },
    J = () => {
      ((ue.current = 0), (U.current = 0));
    },
    he = () => {
      ((B.current = !1), Se());
    },
    ge = () => {
      let e = D.current;
      e &&
        (Y.killTweensOf(e),
        Y.set(e, { xPercent: -120 }),
        Y.to(e, { xPercent: 0, duration: ne, ease: `power3.out` }));
    },
    X = () => {
      let e = D.current;
      e &&
        (Y.killTweensOf(e),
        Y.to(e, {
          xPercent: Gt,
          duration: ne,
          ease: `power3.out`,
          onComplete: () => {
            Y.set(e, { xPercent: -120 });
          },
        }));
    },
    _e = () => {
      D.current && Y.set(D.current, { xPercent: -120 });
    },
    Z = ee(
      () => ({
        catclick: {
          image: e.catMedia,
          title: e.catTitle,
          description: e.catDescription,
        },
        bidaclick: {
          image: e.bidaMedia,
          title: e.bidaTitle,
          description: e.bidaDescription,
        },
        cayclick: {
          image: e.cayMedia,
          title: e.cayTitle,
          description: e.cayDescription,
        },
        gameclick: {
          image: e.gameMedia,
          title: e.gameTitle,
          description: e.gameDescription,
        },
        laptopclick: {
          image: e.laptopMedia,
          title: e.laptopTitle,
          description: e.laptopDescription,
        },
        miclick: {
          image: e.miMedia,
          title: e.miTitle,
          description: e.miDescription,
        },
        reanclick: {
          image: e.reanMedia,
          title: e.reanTitle,
          description: e.reanDescription,
        },
        sotdclick: {
          image: e.sotdMedia,
          title: e.sotdTitle,
          description: e.sotdDescription,
        },
        timeclick: {
          image: e.timeMedia,
          title: e.timeTitle,
          description: e.timeDescription,
        },
      }),
      [
        e.bidaDescription,
        e.bidaMedia,
        e.bidaTitle,
        e.catDescription,
        e.catMedia,
        e.catTitle,
        e.cayDescription,
        e.cayMedia,
        e.cayTitle,
        e.gameDescription,
        e.gameMedia,
        e.gameTitle,
        e.laptopDescription,
        e.laptopMedia,
        e.laptopTitle,
        e.miDescription,
        e.miMedia,
        e.miTitle,
        e.reanDescription,
        e.reanMedia,
        e.reanTitle,
        e.sotdDescription,
        e.sotdMedia,
        e.sotdTitle,
        e.timeDescription,
        e.timeMedia,
        e.timeTitle,
      ],
    ),
    ve = j && j !== `click` ? Z[j] : null,
    ye = (e) => {
      (e && Dt(Z[e]?.image || ``, `high`),
        Object.entries(Z).forEach(([t, n]) => {
          t !== e && Dt(n.image);
        }));
    };
  (m(() => {
    ye();
  }, [Z]),
    m(() => {
      (!N || !F || j === null) && St(!1);
    }, [j, F, N]),
    m(
      () => () => {
        St(!1);
      },
      [],
    ),
    m(() => {
      let e = F && N && j !== null && z.current && R.current;
      (gt(S.current, e ? `auto` : `none`),
        _t(S.current, e ? `none` : `auto`),
        vt(S.current, !e));
    }, [j, F, N]),
    m(() => {
      if (c === void 0) return;
      let e = (e) => {
          if (!z.current) return;
          let t = S.current,
            n = e.target;
          (t && n instanceof Node && t.contains(n)) ||
            (typeof PointerEvent < `u` &&
              e instanceof PointerEvent &&
              ce.current === e.pointerId) ||
            (Et(t, Tt(e)) && wt(e));
        },
        t = [
          `click`,
          `dblclick`,
          `mousedown`,
          `mouseup`,
          `mousemove`,
          `mouseover`,
          `pointerdown`,
          `pointermove`,
          `pointerup`,
          `touchstart`,
          `touchmove`,
          `touchend`,
          `wheel`,
          `contextmenu`,
        ],
        n = { capture: !0, passive: !1 };
      return (
        t.forEach((t) => {
          c.addEventListener(t, e, n);
        }),
        () => {
          t.forEach((t) => {
            c.removeEventListener(t, e, n);
          });
        }
      );
    }, []),
    m(() => {
      let e = S.current,
        t = C.current;
      if (!e) return;
      let n = yt(e),
        r = !!n,
        i = r && n ? n.style.getPropertyValue(`pointer-events`) : ``,
        a = r && n ? n.style.getPropertyPriority(`pointer-events`) : ``,
        o = r && n ? n.style.getPropertyValue(`z-index`) : ``,
        s = r && n ? n.style.getPropertyPriority(`z-index`) : ``,
        c = r && n ? n.style.getPropertyValue(`display`) : ``,
        l = r && n ? n.style.getPropertyPriority(`display`) : ``;
      return (
        (W.current = { value: c, priority: l }),
        bt(e, Qt),
        pe(!1),
        gt(e, `none`),
        _t(e, `auto`),
        vt(e, !0),
        (e.style.zIndex = String(Qt)),
        J(),
        Y.set(e, {
          display: `none`,
          autoAlpha: 0,
          x: 0,
          y: 0,
          top: jt,
          rotation: Lt,
          transformOrigin: `50% 50%`,
        }),
        t &&
          Y.set(t, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: `50% 50%`,
          }),
        _e(),
        () => {
          !r ||
            !n ||
            (i
              ? n.style.setProperty(`pointer-events`, i, a)
              : n.style.removeProperty(`pointer-events`),
            o
              ? n.style.setProperty(`z-index`, o, s)
              : n.style.removeProperty(`z-index`),
            c
              ? n.style.setProperty(`display`, c, l)
              : n.style.removeProperty(`display`),
            (W.current = null));
        }
      );
    }, []),
    m(() => {
      let e = S.current;
      if (!e || c === void 0) return;
      let t = null,
        n = 0,
        r = 0,
        i = 0,
        a = 0,
        o = !1,
        s = (t) => {
          ((document.body.style.userSelect = t ? `none` : ``),
            (document.body.style.webkitUserSelect = t ? `none` : ``),
            (document.body.style.cursor = t ? `grabbing` : ``),
            (e.style.cursor = t ? `grabbing` : z.current ? `grab` : ``));
        },
        l = () => {
          (c.removeEventListener(`pointermove`, f, !0),
            c.removeEventListener(`pointerup`, p, !0),
            c.removeEventListener(`pointercancel`, p, !0));
        },
        u = () => {
          let n = t;
          ((t = null),
            (ce.current = null),
            n !== null &&
              e.hasPointerCapture?.(n) &&
              e.releasePointerCapture?.(n),
            l(),
            s(!1),
            (o = !1));
        };
      le.current = u;
      let d = (s) => {
          z.current &&
            s.button === 0 &&
            (s.target?.closest(`button`) ||
              ((t = s.pointerId),
              (ce.current = s.pointerId),
              (n = s.clientX),
              (r = s.clientY),
              (i = ue.current),
              (a = U.current),
              (o = !1),
              Y.killTweensOf(e),
              me(),
              (e.style.cursor = `grabbing`),
              s.pointerType !== `mouse` && s.preventDefault(),
              e.setPointerCapture?.(s.pointerId),
              c.addEventListener(`pointermove`, f, !0),
              c.addEventListener(`pointerup`, p, !0),
              c.addEventListener(`pointercancel`, p, !0)));
        },
        f = (e) => {
          if (t !== e.pointerId) return;
          let l = e.clientX - n,
            u = e.clientY - r;
          (!o && Math.hypot(l, u) >= Ut && ((o = !0), s(!0)),
            o &&
              ((ue.current = i + l),
              (U.current = a + u),
              me(),
              c.getSelection?.()?.removeAllRanges?.(),
              e.preventDefault()));
        },
        p = (n) => {
          if (t !== n.pointerId) return;
          let r = o;
          (u(),
            (e.style.cursor = z.current ? `grab` : ``),
            r && n.preventDefault());
        };
      return (
        e.addEventListener(`pointerdown`, d),
        () => {
          (e.removeEventListener(`pointerdown`, d),
            u(),
            (le.current = () => {}));
        }
      );
    }, []));
  let Q = () => {
      k.current !== null && (c.clearTimeout(k.current), (k.current = null));
    },
    be = () => {
      let e = A.current;
      return ((A.current = e > 0 ? -4 : Rt), e);
    },
    xe = (e) => {
      (Q(),
        O.current?.kill(),
        (O.current = null),
        (L.current = e),
        (R.current = !0),
        (z.current = !0),
        Ct(!0, e),
        q(!0),
        gt(S.current, `auto`),
        _t(S.current, `none`),
        vt(S.current, !1),
        S.current &&
          (pe(!0),
          bt(S.current, Zt),
          (S.current.style.display = `block`),
          (S.current.style.zIndex = String(Zt))),
        f(() => {
          (M(e), ie(!0), P(!0));
        }));
    },
    Se = () => {
      let e = S.current,
        t = C.current;
      if (
        ((H.current += 1),
        Q(),
        (V.current = null),
        (z.current = !1),
        (R.current = !1),
        le.current(),
        Ct(!1),
        St(!1),
        gt(e, `none`),
        _t(e, `auto`),
        vt(e, !0),
        e &&
          (e.removeAttribute(`data-rive-info-panel-active`),
          (e.style.cursor = `default`)),
        !e || !L.current)
      ) {
        ((L.current = null),
          St(!1),
          e &&
            (J(),
            Y.set(e, {
              autoAlpha: 0,
              x: 0,
              y: 0,
              top: jt,
              rotation: Lt,
              display: `none`,
            }),
            (e.style.zIndex = String(Qt)),
            pe(!1)),
          M(null),
          ie(!1),
          P(!1));
        return;
      }
      ((L.current = null),
        ie(!1),
        Y.killTweensOf(e),
        t && Y.killTweensOf(t),
        O.current?.kill(),
        (O.current = Y.timeline({
          onComplete: () => {
            (J(),
              Y.set(e, {
                autoAlpha: 0,
                x: 0,
                y: 0,
                top: jt,
                rotation: Lt,
                display: `none`,
              }),
              t && Y.set(t, { clearProps: `transform,opacity` }),
              gt(e, `none`),
              _t(e, `auto`),
              vt(e, !0),
              (e.style.zIndex = String(Qt)),
              bt(e, Qt),
              pe(!1),
              (O.current = null),
              St(!1),
              Ct(!1),
              M(null),
              ie(!1),
              P(!1));
          },
        })),
        O.current.to(e, {
          autoAlpha: 0,
          top: jt,
          rotation: Lt,
          duration: Nt,
          ease: Bt,
          onUpdate: () => q(!1),
        }));
    };
  (m(() => {
    let e = () => {
        V.current &&
          (Q(),
          (k.current = c.setTimeout(() => {
            k.current = null;
            let e = V.current;
            if (((V.current = null), !(!e || e === L.current))) {
              if (!R.current) {
                t(e);
                return;
              }
              n(e);
            }
          }, It * 1e3)));
      },
      t = (t) => {
        let n = ++H.current,
          r = Z[t];
        (ye(t),
          Dt(r?.image || ``, `high`).finally(() => {
            n === H.current &&
              (xe(t),
              requestAnimationFrame(() => {
                let t = S.current,
                  n = C.current,
                  r = T.current,
                  i = E.current;
                if (!t || !r || !i) return;
                (Y.killTweensOf(t),
                  n &&
                    (Y.killTweensOf(n),
                    Y.set(n, { clearProps: `transform,opacity` }),
                    Y.set(n, { autoAlpha: 1, y: 0, scale: 1 })),
                  Y.set([w.current, r, i].filter(Boolean), {
                    autoAlpha: 1,
                    y: 0,
                  }));
                let a = be();
                (J(),
                  Y.set(t, { autoAlpha: 1, x: 0, y: 0, top: jt, rotation: Lt }),
                  O.current?.kill(),
                  (O.current = Y.timeline({
                    onComplete: () => {
                      ((O.current = null), e());
                    },
                  })),
                  O.current.to(t, {
                    top: At,
                    rotation: a,
                    duration: Mt,
                    ease: zt,
                    onUpdate: () => q(!0),
                  }));
              }));
          }));
      },
      n = (t) => {
        let n = ++H.current,
          r = Z[t];
        (ye(t),
          Dt(r?.image || ``, `high`).finally(() => {
            if (n !== H.current) return;
            let r = S.current,
              i = C.current,
              a = w.current,
              o = T.current,
              s = E.current;
            if (!r || !o || !s) return;
            let c = [a, o, s].filter(Boolean),
              l = be();
            (Y.killTweensOf(r),
              Y.killTweensOf(i),
              Y.killTweensOf(c),
              O.current?.kill(),
              (O.current = Y.timeline({
                onComplete: () => {
                  ((O.current = null), e());
                },
              })),
              O.current.to(r, {
                top: jt,
                rotation: Lt,
                duration: Pt,
                ease: Vt,
                onUpdate: () => q(!0),
              }),
              O.current.add(() => {
                ((L.current = t),
                  f(() => {
                    M(t);
                  }));
              }),
              O.current.add(() => {
                J();
              }),
              O.current.set(r, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                top: jt,
                rotation: Lt,
              }),
              O.current.set(c, { autoAlpha: 1, y: 0 }),
              i && Y.set(i, { y: 0 }),
              O.current.to(r, {
                top: At,
                rotation: l,
                duration: Ft,
                ease: Ht,
                onUpdate: () => q(!0),
              }));
          }));
      },
      r = (e) => {
        let r = e?.detail?.trigger;
        if (!r) return;
        if (r === `click`) {
          ((B.current = !B.current),
            B.current &&
              R.current &&
              ((z.current = !0),
              q(!0),
              gt(S.current, `auto`),
              _t(S.current, `none`),
              f(() => {
                ie(!0);
              })),
            B.current || Se());
          return;
        }
        if (!(r in Z)) return;
        ((B.current = !0), q(!0));
        let i = r;
        if ((ye(i), O.current)) {
          V.current = i;
          return;
        }
        if (!R.current) {
          t(i);
          return;
        }
        L.current !== i && n(i);
      };
    return (
      c.addEventListener(u, r),
      () => {
        c.removeEventListener(u, r);
      }
    );
  }, [u, Z]),
    m(
      () => () => {
        (Q(), O.current?.kill(), (O.current = null));
      },
      [],
    ));
  let $ = (e) => {
      z.current && e.stopPropagation();
    },
    Ce = N && j !== null && R.current && L.current !== null && F && z.current;
  return h(`div`, {
    ref: S,
    "data-close-edge-refresh-r13": t ? `true` : `false`,
    "data-visual-gap-refresh-r12": r ? `true` : `false`,
    "data-compile-refresh-r11": i ? `true` : `false`,
    "data-gap-refresh-r10": a ? `true` : `false`,
    "data-fit-gap-r10": `24`,
    "data-line-breaks-r5": s ? `true` : `false`,
    "data-build-version": l,
    "data-rive-info-panel-fresh-root": `true`,
    "data-rive-info-panel-active": Ce ? `true` : void 0,
    onClick: $,
    onDoubleClick: $,
    onMouseMove: $,
    onMouseOver: $,
    onMouseUp: $,
    onPointerMove: $,
    onPointerOver: $,
    onPointerUp: $,
    onTouchEnd: $,
    onTouchMove: $,
    onWheel: $,
    style: {
      ...x,
      width: `100%`,
      height: `fit-content`,
      position: `relative`,
      overflow: `hidden`,
      zIndex: N ? Zt : Qt,
      pointerEvents: Ce ? `auto` : `none`,
      touchAction: Ce ? `none` : `auto`,
      cursor: Ce ? `grab` : `default`,
      background: `#FFF`,
      boxShadow: `-2px 4px 4px 0 rgba(0, 0, 0, 0.23)`,
      willChange: `top, opacity, transform`,
    },
    children: [
      d(`style`, {
        children: `${dn}
[data-rive-info-panel-close="true"],
[data-rive-info-panel-close="true"] * {
    opacity: 1 !important;
}
[data-rive-info-panel-close="true"] {
    position: relative;
    color: ${K} !important;
}
[data-rive-info-panel-close="true"]::after {
    content: "";
    position: absolute;
    inset: -12px;
}
[data-rive-info-panel-close="true"] svg path {
    stroke: ${K} !important;
    stroke-opacity: 1 !important;
}`,
      }),
      h(`div`, {
        ref: C,
        style: {
          position: `relative`,
          zIndex: 1,
          width: `100%`,
          height: `auto`,
          padding: p,
          flexDirection: `column`,
          justifyContent: `flex-start`,
          alignItems: `stretch`,
          gap: Wt,
          display: `flex`,
          boxSizing: `border-box`,
          willChange: `transform, opacity`,
        },
        children: [
          d(`div`, {
            style: { width: `100%`, aspectRatio: `4 / 3`, flexShrink: 0 },
            children: d(`img`, {
              ref: w,
              draggable: !1,
              onDragStart: (e) => e.preventDefault(),
              style: {
                width: `100%`,
                height: `100%`,
                objectFit: `cover`,
                display: `block`,
                pointerEvents: `none`,
                userSelect: `none`,
                visibility: ve ? `visible` : `hidden`,
                willChange: `filter, opacity`,
              },
              src: ve?.image || ``,
              alt: ``,
            }),
          }),
          h(`div`, {
            style: {
              alignSelf: `stretch`,
              paddingLeft: g,
              paddingRight: g,
              paddingBottom: 0,
              flexDirection: `column`,
              justifyContent: `flex-start`,
              alignItems: `flex-start`,
              gap: Wt,
              display: `flex`,
            },
            children: [
              d(`div`, {
                ref: T,
                style: {
                  alignSelf: `stretch`,
                  justifyContent: `flex-end`,
                  display: `flex`,
                  flexDirection: `column`,
                  color: te,
                  wordWrap: `break-word`,
                  ...G,
                },
                children: ve?.title || ``,
              }),
              d(`div`, {
                ref: E,
                style: {
                  alignSelf: `stretch`,
                  color: _,
                  wordWrap: `break-word`,
                  ...de,
                  whiteSpace: s ? `break-spaces` : `normal`,
                },
                children: ve?.description || ``,
              }),
            ],
          }),
          d(`div`, {
            style: {
              alignSelf: `stretch`,
              width: `calc(100% + ${p * 2}px)`,
              marginLeft: -p,
              marginRight: -p,
              marginBottom: -p,
              paddingRight: Wt,
              paddingBottom: Wt,
              display: `flex`,
              justifyContent: `flex-end`,
              boxSizing: `border-box`,
              flexShrink: 0,
            },
            children: h(`button`, {
              type: `button`,
              "aria-label": `Close`,
              "data-rive-info-panel-close": `true`,
              onClick: (e) => {
                (e.preventDefault(), e.stopPropagation(), ht(`tick`), he());
              },
              onPointerEnter: ge,
              onPointerLeave: X,
              style: {
                flexShrink: 0,
                margin: 0,
                padding: 0,
                border: 0,
                background: `transparent`,
                color: K,
                opacity: 1,
                display: `inline-flex`,
                alignItems: `center`,
                gap: 0,
                cursor: `pointer`,
                pointerEvents: Ce ? `auto` : `none`,
                ...de,
              },
              children: [
                h(`span`, {
                  style: {
                    display: `inline-flex`,
                    flexDirection: `column`,
                    alignItems: `flex-start`,
                    gap: 0,
                    overflow: `hidden`,
                    color: K,
                    opacity: 1,
                  },
                  children: [
                    d(`span`, { children: `Close` }),
                    d(`span`, {
                      style: {
                        position: `relative`,
                        display: `block`,
                        width: `100%`,
                        alignSelf: `stretch`,
                        height: 1,
                        overflow: `hidden`,
                      },
                      children: d(`span`, {
                        ref: D,
                        style: {
                          position: `absolute`,
                          top: 0,
                          bottom: 0,
                          left: `-${Kt}px`,
                          right: `-${Kt}px`,
                          display: `block`,
                          background: K,
                          opacity: 1,
                          transform: `translate3d(0, 0, 0)`,
                          willChange: `transform`,
                        },
                      }),
                    }),
                  ],
                }),
                h(`svg`, {
                  width: `11`,
                  height: `11`,
                  viewBox: `0 0 11 11`,
                  fill: `none`,
                  xmlns: `http://www.w3.org/2000/svg`,
                  "aria-hidden": `true`,
                  focusable: `false`,
                  style: {
                    display: `block`,
                    flexShrink: 0,
                    marginLeft: fe,
                    color: K,
                    opacity: 1,
                  },
                  children: [
                    d(`path`, {
                      d: `M1.40234 1.27148L8.77031 8.90123`,
                      stroke: K,
                      strokeOpacity: `1`,
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                    }),
                    d(`path`, {
                      d: `M8.9012 1.40238L1.27145 8.77034`,
                      stroke: K,
                      strokeOpacity: `1`,
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
var kt,
  At,
  jt,
  Mt,
  Nt,
  Pt,
  Ft,
  It,
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
  Jt,
  Yt,
  Xt,
  Zt,
  Qt,
  $t,
  en,
  tn,
  nn,
  rn,
  an,
  on,
  sn,
  cn,
  ln,
  un,
  dn,
  fn,
  pn = e(() => {
    (r(),
      g(),
      x(),
      l(),
      W(),
      (kt = new Map()),
      (At = `0vh`),
      (jt = `110vh`),
      (Mt = 0.94),
      (Nt = 0.52),
      (Pt = 0.46),
      (Ft = 0.74),
      (It = 0.14),
      (Lt = 0),
      (Rt = 4),
      (zt = `power3.out`),
      (Bt = `power2.in`),
      (Vt = `power2.in`),
      (Ht = `power3.out`),
      (Ut = 3),
      (Wt = 32),
      (Gt = 120),
      (Kt = 2),
      (qt = `rive-info-panel:hover-block`),
      (Jt = `rive-info-panel:state`),
      (Yt = `riveInfoPanelActive`),
      (Xt = `__riveInfoPanelFreshRect`),
      (Zt = 10),
      (Qt = 1),
      ($t = `project-text-switcher`),
      (en = `framer-text-style-source:change`),
      (tn = `__framerTextStyleSources`),
      (nn = `page-sound:play-shared`),
      (rn = `__webglMagazineHoverSoundConfig`),
      (an = `webgl-magazine:hover-sound-config`),
      (on = `__webglMagazineTickSoundConfig`),
      (sn = `webgl-magazine:tick-sound-config`),
      (cn = `page-sound:enabled`),
      (ln = `"BT Grotesk", "BT Grotesk Trial", "BT Grotesk Medium", Arial, sans-serif`),
      (un = `var(--bt-grotesk-responsive-font-size, 12px)`),
      (dn = `
:root {
    --bt-grotesk-responsive-font-size: 12px;
}

@media (min-width: 800px) {
    :root {
        --bt-grotesk-responsive-font-size: 10px;
    }
}

@media (min-width: 1920px) {
    :root {
        --bt-grotesk-responsive-font-size: 12px;
    }
}

@media (min-width: 2360px) {
    :root {
        --bt-grotesk-responsive-font-size: 14px;
    }
}
`),
      (fn = {
        fontFamily: ln,
        fontStyle: `normal`,
        fontWeight: 500,
        fontSize: un,
        lineHeight: `137%`,
        letterSpacing: `0.01em`,
        textAlign: `left`,
        margin: 0,
      }),
      (Ot.defaultProps = {
        closeEdgeRefreshR13: !0,
        visualGapRefreshR12: !0,
        compileRefreshR11: !0,
        gapRefreshR10: !0,
        lineBreaksR5: !0,
        buildVersion: `Close Edge V2R13`,
        eventName: `rive-trigger`,
        cardPadding: 16,
        contentPadding: 16,
        titleColor: `#181818`,
        bodyColor: `#181818`,
        closeButtonColor: `#000000`,
        closeLineDuration: 0.7,
        titleFont: {
          fontFamily: `Louize trial`,
          fontWeight: 400,
          fontSize: 48,
          lineHeight: `1.1em`,
          letterSpacing: `0em`,
        },
        useTextStyleSource: !1,
        catMedia: ``,
        catTitle: `Cats`,
        catDescription: `Cats have always felt like tiny flatmates with very strong opinions. I love how calm, unimpressed, and unintentionally funny they can be. They somehow make a room feel more alive even when they are doing absolutely nothing.`,
        bidaMedia: ``,
        bidaTitle: `Billiards`,
        bidaDescription: `I like billiards for the same reason I like good interface design: angles, timing, and control. It looks simple at first, but the better you get, the more you realize everything depends on small adjustments and rhythm.`,
        cayMedia: ``,
        cayTitle: `Plants`,
        cayDescription: `I got into house plants thinking they would just make my space look fresher, then it quietly became a full obsession. From easy starters to fussier favorites, I still love how plants change the mood of a room and make it feel lived in.`,
        gameMedia: ``,
        gameTitle: `Gaming`,
        gameDescription: `Games are one of my favorite forms of storytelling and world-building. I enjoy the mix of visuals, sound, interaction, and pacing, especially when a game feels immersive enough that you forget you're studying how well it was designed.`,
        laptopMedia: ``,
        laptopTitle: `Laptop`,
        laptopDescription: `My laptop is basically where most ideas turn into something real. Design files, experiments, notes, unfinished concepts, and late-night tweaks all live here. It is less a device and more a portable workspace that follows me everywhere.`,
        miMedia: ``,
        miTitle: `Portraits`,
        miDescription: `I like collecting visual references around faces, expressions, and personality. Portraits feel personal in a different way from other subjects. A tiny shift in gaze or posture can completely change the mood of an image.`,
        reanMedia: ``,
        reanTitle: `Objects`,
        reanDescription: `Small objects and odd little symbols usually end up meaning more to me than they should. I like how everyday things can feel memorable once they are isolated, illustrated, or placed in the right composition.`,
        sotdMedia: ``,
        sotdTitle: `SOTD`,
        sotdDescription: `Site of the Day references are always inspiring because they capture a moment where concept, craft, and presentation all land together. I keep coming back to them whenever I want to study pacing, detail, and interaction done well.`,
        timeMedia: ``,
        timeTitle: `Watches`,
        timeDescription: `Watches sit somewhere between utility, design, and ritual. I love how something so small can carry proportion, material, character, and history all at once. They are one of the clearest examples of detail making the whole object feel special.`,
      }),
      b(Ot, {
        closeEdgeRefreshR13: {
          type: F.Boolean,
          title: `Close Edge R13`,
          defaultValue: !0,
          enabledTitle: `24px`,
          disabledTitle: `24px`,
        },
        visualGapRefreshR12: {
          type: F.Boolean,
          title: `Visual Gap R12`,
          defaultValue: !0,
          enabledTitle: `24px`,
          disabledTitle: `24px`,
        },
        compileRefreshR11: {
          type: F.Boolean,
          title: `Compile R11`,
          defaultValue: !0,
          enabledTitle: `Ready`,
          disabledTitle: `Ready`,
        },
        gapRefreshR10: {
          type: F.Boolean,
          title: `Gap R10`,
          defaultValue: !0,
          enabledTitle: `24px`,
          disabledTitle: `24px`,
        },
        lineBreaksR5: {
          type: F.Boolean,
          title: `Line Breaks`,
          defaultValue: !0,
          enabledTitle: `On`,
          disabledTitle: `Off`,
        },
        buildVersion: {
          type: F.String,
          title: `Build`,
          defaultValue: `Close Edge V2R13`,
        },
        closeLineDuration: {
          type: F.Number,
          title: `Close Speed`,
          min: 0.1,
          max: 2,
          step: 0.05,
          defaultValue: 0.7,
        },
        closeButtonColor: {
          type: F.Color,
          title: `X Color`,
          defaultValue: `#000000`,
          optional: !0,
        },
        eventName: {
          type: F.String,
          title: `Event`,
          defaultValue: `rive-trigger`,
        },
        cardPadding: {
          type: F.Number,
          title: `Pad`,
          min: 0,
          max: 64,
          step: 1,
          defaultValue: 16,
        },
        contentPadding: {
          type: F.Number,
          title: `Text Pad`,
          min: 0,
          max: 80,
          step: 1,
          defaultValue: 16,
        },
        titleColor: { type: F.Color, title: `Title`, defaultValue: `#181818` },
        bodyColor: { type: F.Color, title: `Body`, defaultValue: `#181818` },
        useTextStyleSource: {
          type: F.Boolean,
          title: `Text Source`,
          enabledTitle: `On`,
          disabledTitle: `Off`,
          defaultValue: !1,
        },
        titleFont: {
          type: F.Font,
          title: `Title Font`,
          controls: `extended`,
          defaultValue: {
            fontFamily: `Louize trial`,
            fontWeight: 400,
            fontSize: 48,
            lineHeight: `1.1em`,
            letterSpacing: `0em`,
          },
        },
        catMedia: {
          type: F.File,
          title: `Cat Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        catTitle: { type: F.String, title: `Cat Title` },
        catDescription: {
          type: F.String,
          title: `Cat Text`,
          displayTextArea: !0,
        },
        bidaMedia: {
          type: F.File,
          title: `Bida Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        bidaTitle: { type: F.String, title: `Bida Title` },
        bidaDescription: {
          type: F.String,
          title: `Bida Text`,
          displayTextArea: !0,
        },
        cayMedia: {
          type: F.File,
          title: `Cay Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        cayTitle: { type: F.String, title: `Cay Title` },
        cayDescription: {
          type: F.String,
          title: `Cay Text`,
          displayTextArea: !0,
        },
        gameMedia: {
          type: F.File,
          title: `Game Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        gameTitle: { type: F.String, title: `Game Title` },
        gameDescription: {
          type: F.String,
          title: `Game Text`,
          displayTextArea: !0,
        },
        laptopMedia: {
          type: F.File,
          title: `Laptop Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        laptopTitle: { type: F.String, title: `Laptop Title` },
        laptopDescription: {
          type: F.String,
          title: `Laptop Text`,
          displayTextArea: !0,
        },
        miMedia: {
          type: F.File,
          title: `Mi Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        miTitle: { type: F.String, title: `Mi Title` },
        miDescription: {
          type: F.String,
          title: `Mi Text`,
          displayTextArea: !0,
        },
        reanMedia: {
          type: F.File,
          title: `Rean Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        reanTitle: { type: F.String, title: `Rean Title` },
        reanDescription: {
          type: F.String,
          title: `Rean Text`,
          displayTextArea: !0,
        },
        sotdMedia: {
          type: F.File,
          title: `SOTD Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        sotdTitle: { type: F.String, title: `SOTD Title` },
        sotdDescription: {
          type: F.String,
          title: `SOTD Text`,
          displayTextArea: !0,
        },
        timeMedia: {
          type: F.File,
          title: `Time Img`,
          allowedFileTypes: [`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`],
        },
        timeTitle: { type: F.String, title: `Time Title` },
        timeDescription: {
          type: F.String,
          title: `Time Text`,
          displayTextArea: !0,
        },
      }));
  });
function mn(e) {
  let t = vn.get(e);
  if (t) return ((t.count += 1), !0);
  let n = c.getComputedStyle(e),
    r = Number.parseInt(n.zIndex, 10);
  return Number.isFinite(r) && r >= _n
    ? !1
    : (vn.set(e, {
        count: 1,
        position: e.style.position,
        zIndex: e.style.zIndex,
      }),
      n.position === `static` && (e.style.position = `relative`),
      (e.style.zIndex = String(_n)),
      !0);
}
function hn(e) {
  let t = vn.get(e);
  t &&
    (--t.count,
    !(t.count > 0) &&
      ((e.style.position = t.position),
      (e.style.zIndex = t.zIndex),
      vn.delete(e)));
}
function gn(e) {
  return (r) => {
    let i = n(null),
      a = n([]),
      o = n(!1),
      s = n(null),
      l = r?.style || {},
      u = t(() => {
        (a.current.forEach(hn), (a.current = []));
      }, []),
      f = t(() => {
        let e = i.current;
        if (!e || a.current.length > 0) return;
        let t = e.parentElement;
        for (
          ;
          t &&
          t !== document.body &&
          t !== document.documentElement &&
          !t.hasAttribute(`data-framer-root`);
        )
          (mn(t) && a.current.push(t), (t = t.parentElement));
      }, []);
    return (
      m(() => {
        if (c === void 0) return;
        let e = (e, t) => {
            let n = i.current?.firstElementChild;
            if (!n) return;
            let r = n.getBoundingClientRect(),
              a =
                r.width > 0 &&
                r.height > 0 &&
                e >= r.left &&
                e <= r.right &&
                t >= r.top &&
                t <= r.bottom;
            a !== o.current && ((o.current = a), a ? f() : u());
          },
          t = (t) => {
            t.pointerType !== `touch` &&
              ((s.current = { x: t.clientX, y: t.clientY }),
              e(t.clientX, t.clientY));
          },
          n = () => {
            let t = s.current;
            t && e(t.x, t.y);
          },
          r = () => {
            ((s.current = null), (o.current = !1), u());
          };
        return (
          c.addEventListener(`pointermove`, t, !0),
          c.addEventListener(`scroll`, n, !0),
          c.addEventListener(`resize`, n),
          c.addEventListener(`blur`, r),
          document.documentElement.addEventListener(`pointerleave`, r),
          () => {
            (c.removeEventListener(`pointermove`, t, !0),
              c.removeEventListener(`scroll`, n, !0),
              c.removeEventListener(`resize`, n),
              c.removeEventListener(`blur`, r),
              document.documentElement.removeEventListener(`pointerleave`, r),
              r());
          }
        );
      }, [f, u]),
      d(`div`, {
        ref: i,
        style: { display: `contents` },
        children: d(e, {
          ...r,
          style: { ...l, position: l.position || `relative`, zIndex: _n },
        }),
      })
    );
  };
}
var _n,
  vn,
  yn = e(() => {
    (r(), g(), l(), (_n = 5), (vn = new Map()));
  }),
  bn,
  xn,
  Sn,
  Cn,
  wn,
  Tn,
  En,
  Dn,
  On,
  kn,
  An,
  jn,
  Mn,
  Nn,
  Pn,
  Fn,
  In,
  Ln,
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
  Qn;
e(() => {
  (g(),
    x(),
    v(),
    l(),
    Q(),
    X(),
    Re(),
    Ce(),
    Se(),
    he(),
    $(),
    ce(),
    mt(),
    pn(),
    me(),
    G(),
    ke(),
    ye(),
    yn(),
    be(),
    je(),
    Me(),
    U(),
    Ve(),
    (bn = C(Ot)),
    (xn = C(Ye)),
    (Sn = E(w, { nodeId: `hU4AYHNNb`, override: Oe, scopeId: `Pn95ZS3Nn` })),
    (Cn = E(w, { nodeId: `X3L1Ro9bN`, override: De, scopeId: `Pn95ZS3Nn` })),
    (wn = E(y.div, {
      nodeId: `wBfjmsKWN`,
      override: gn,
      scopeId: `Pn95ZS3Nn`,
    })),
    (Tn = E(w, { nodeId: `DUHV1i0Xt`, override: q, scopeId: `Pn95ZS3Nn` })),
    (En = E(y.div, {
      nodeId: `sVxC4zqOp`,
      override: gn,
      scopeId: `Pn95ZS3Nn`,
    })),
    (Dn = E(y.div, {
      nodeId: `bSAfCtFE5`,
      override: _e,
      scopeId: `Pn95ZS3Nn`,
    })),
    (On = C(ze)),
    (kn = C(Te)),
    (An = E(y.div, {
      nodeId: `p2gvKlWcr`,
      override: we,
      scopeId: `Pn95ZS3Nn`,
    })),
    (jn = E(y.div, { nodeId: `GA1Seok8V`, override: J, scopeId: `Pn95ZS3Nn` })),
    (Mn = C(H)),
    (Nn = C(V)),
    (Pn = C(Z)),
    (Fn = z(
      E(Z, { nodeId: `IOsIv8HKI`, override: ve, scopeId: `Pn95ZS3Nn` }),
      xe,
    )),
    (In = E(y.div, {
      nodeId: `sPzm9M0v1`,
      override: _e,
      scopeId: `Pn95ZS3Nn`,
    })),
    (Ln = C(Ee)),
    (Rn = C(ge)),
    (zn = {
      AmKYJ_SBH: `(min-width: 1800px) and (max-width: 2199.98px)`,
      coODAmpek: `(max-width: 1199.98px)`,
      Mo1N6r2DZ: `(min-width: 1200px) and (max-width: 1799.98px)`,
      pNu0WPoUY: `(min-width: 2200px)`,
    }),
    (Bn = () => typeof document < `u`),
    (Vn = [`visible`, `visible-2`, `visible-3`]),
    (Hn = `framer-ddoeI`),
    (Un = {
      AmKYJ_SBH: `framer-v-16t828t`,
      coODAmpek: `framer-v-v3tmhq`,
      Mo1N6r2DZ: `framer-v-l56w8y`,
      pNu0WPoUY: `framer-v-bn2u7u`,
    }),
    (Wn = (e, t, n) => (e && t ? `position` : n)),
    (Gn = (e, t) => `translateY(-50%) ${t}`),
    (Kn = (...e) => {
      for (let t of e) if (t && typeof t == `string`) return t;
    }),
    (qn = (e, t) => `translate(-50%, -50%) ${t}`),
    (Jn = {
      1440: `Mo1N6r2DZ`,
      2200: `pNu0WPoUY`,
      Desktop: `AmKYJ_SBH`,
      Phone: `coODAmpek`,
    }),
    (Yn = ({ value: e }) =>
      k()
        ? null
        : d(`style`, {
            dangerouslySetInnerHTML: { __html: e },
            "data-framer-html-style": ``,
          })),
    (Xn = ({ height: e, id: t, width: n, ...r }) => ({
      ...r,
      variant: Jn[r.variant] ?? r.variant ?? `AmKYJ_SBH`,
    })),
    (Zn = j(
      p(function (e, t) {
        let r = n(null),
          i = t ?? r,
          o = u(),
          { activeLocale: c, setLocale: l } = se(),
          f = ae(),
          { style: p, className: m, layoutId: g, variant: v, ...b } = Xn(e);
        A(ee(() => Be({}, c), [c]));
        let [x, S] = oe(v, zn, !1),
          C = ne(Hn, Ae, de, ue, Le),
          T = s(N)?.isLayoutTemplate,
          E = !!s(te)?.transition?.layout,
          O = Wn(T, E),
          k = () => !Bn() || x !== `coODAmpek`,
          j = () => !Bn() || x === `coODAmpek`;
        return (
          P(),
          ie({}),
          d(N.Provider, {
            value: {
              activeVariantId: x,
              humanReadableVariantMap: Jn,
              primaryVariantId: `AmKYJ_SBH`,
              variantClassNames: Un,
            },
            children: h(_, {
              id: g ?? o,
              children: [
                d(Yn, {
                  value: `html body { background: rgb(236, 236, 236); } html { font-size: 75%; }`,
                }),
                h(y.div, {
                  ...b,
                  className: ne(C, `framer-16t828t`, m),
                  ref: i,
                  style: { ...p },
                  children: [
                    d(M, {
                      children: d(D, {
                        className: `framer-fi7jd1-container`,
                        isAuthoredByUser: !0,
                        layout: O,
                        layoutScroll: !0,
                        nodeId: `UZGLBgGh9`,
                        scopeId: `Pn95ZS3Nn`,
                        children: d(L, {
                          breakpoint: x,
                          overrides: {
                            coODAmpek: {
                              titleFont: {
                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                fontSize: `23px`,
                                fontStyle: `normal`,
                                fontWeight: 400,
                                letterSpacing: `0.01em`,
                                lineHeight: `1em`,
                              },
                            },
                            Mo1N6r2DZ: {
                              titleFont: {
                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                fontSize: `30px`,
                                fontStyle: `normal`,
                                fontWeight: 400,
                                letterSpacing: `0.01em`,
                                lineHeight: `1.1em`,
                              },
                            },
                            pNu0WPoUY: {
                              titleFont: {
                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                fontSize: `38px`,
                                fontStyle: `normal`,
                                fontWeight: 400,
                                letterSpacing: `0.01em`,
                                lineHeight: `1em`,
                              },
                            },
                          },
                          children: d(Ot, {
                            bidaDescription: `Hmm, let us see. We don’t really know when we first got involved with him. Maybe when he was a tiny, tiny boy. But we were on a break all the time. It’s complicated. He loves sports, always has. Football, tennis, basketball, and so many others... But us??!? We know we hit different, ya know. We’re there when he’s stressed with work or life, though maybe we give him a little stress too.

We make him put his headphones on, focus on every shot, slow down, stay patient, and be fully present. Sometimes he comes with friends, sometimes alone. Oh wait, not completely alone! There’s always his chick, the Predator Aspire cue with a Revo shaft.

-The Nine Ball (that he always misses), for all!`,
                            bidaMedia: `https://framerusercontent.com/assets/0iLXNvXWnRhLWd2KpZJjF2ilc.jpg`,
                            bidaTitle: `AMERICAN POOL 🎱`,
                            bodyColor: `rgb(24, 24, 24)`,
                            buildVersion: `Close Edge V2R13`,
                            cardPadding: 16,
                            catDescription: `Hello, my name is Chó, or “Dog” in Vietnamese, the grown-up among the three. Mom & Dad rescued me when I got into an accident in 2020. I have a baby sister, Cáo (“Fox”), a paralyzed calico who is somehow VERY active and acts like a peasant. Then there’s Chuột (“Mouse”), the youngest and pretty handsome (but not as me). Dad begged Mom to adopt him in 2022 after he lost a leg. Ofc she said yes!!!

Yes yes yes, we love our parents. Taking care of special-needs cats can be exhausting for them, but our family always have so much happiness, laughter, and comfort. And we know we’re the best decision mom & dad’ve ever made. Meowhehehehe.

-The most responsible one
P/S: Someone tell Dad to put MY pic here instead of Cáo. Pls.`,
                            catMedia: `https://framerusercontent.com/assets/dTiML3aEClyvavkrPCc0iOylGM.jpg`,
                            catTitle: `CATS 🐈️`,
                            cayDescription: `Back in 2018, when he rented his own apartment, he said that he would only have me, Monstera Deliciosa, to make his room look fresh and “green”. But you know what? One day, he bought those Variegated Monsteras (spoiler: they’re no better than me), then Calatheas, and Philodendrons. He still told me I was the best and loved me dearly; he had them only as side chicks to make the room more Pinterest-ish and full of plants.

He got into it way too deep, to the point where he imported so many rare plants from South Africa and Europe during Covid. Although now he doesn’t have many side chicks, I still never forgive him after the day I overheard him telling his wife that Anthuriums were actually his (4ever) favorite. What a liar!

-Peace! Monstera Deliciosa`,
                            cayMedia: `https://framerusercontent.com/assets/R2iMAYXBzPPRJ3ngWQRmwslzA.jpg`,
                            cayTitle: `PLANTS 🪴`,
                            closeButtonColor: `rgb(0, 0, 0)`,
                            closeEdgeRefreshR13: !0,
                            closeLineDuration: 0.7,
                            compileRefreshR11: !0,
                            contentPadding: 16,
                            eventName: `rive-trigger`,
                            gameDescription: `Oh yeah, we’ve been with him longer than that Pool dude bragging up there. Just go ask him how long we’ve been together! Pretty sure he doesn’t remember!! That means it’s been LONG. He doesn’t hang out with us as much as he used to, but we give him a different way to relax and disconnect from work. He mostly plays alone, usually FC in Manager or Player Career Mode. Sometimes jumps into a few rounds of Mario Kart or Overcooked with his wife and friends.

Favorite game? Red Dead Redemption 2, for sure. He couldn’t really enjoy another open-world game after that. Me and his wife even caught him crying while playing once, just saying. Maybe GTA 6 can make him forget Red Dead. But just a bit :)

-Grunting PS5 in the corner`,
                            gameMedia: `https://framerusercontent.com/assets/ZgddmsCXOFFo2haaS9ds9BEkEk.jpg`,
                            gameTitle: `VIDEO GAMES 🎮`,
                            gapRefreshR10: !0,
                            height: `100%`,
                            id: `UZGLBgGh9`,
                            laptopDescription: `He sure does invest in us the most, every single year. Us? Never a waste! Come on, we bring him so much joy and get him to sit down and actually work, besides his clients, ofc. 

Before he settled into this apartment, he constantly updated and refined us as he adapted to each new living space. Luckily, things have slowed down since moving into this home, and we know he’s genuinely happy with us now: MacBook Pro M4, Studio Display, Herman Miller Aeron, standing desk, Magic Mouse and Keyboard (blehh), Bose QuietComfort, BenQ monitor, and beCreatus dock.

-Studio Display, the representative\u2028P/S: His wife has now stolen us from him because she got into that “editing career” lollll. Poor man. SOS she’s coming!!!`,
                            laptopMedia: `https://framerusercontent.com/assets/fVEut52qU2AVChRz8lHJ5UD0U.jpg`,
                            laptopTitle: `WORKING SPACE 💻`,
                            layoutId: `UZGLBgGh9`,
                            lineBreaksR5: !0,
                            miDescription: `Finally, it’s my turn, but I don’t like that I come before that Arsenal column. You know... the most important one should be last!! Did I go for the wrong man? 

Anywayyyy, we started dating in 2016 while studying abroad. I was in NL, and he was in FI. Back then, my friends and even him always said I was blinded by love because I was his biggest supporter from Day 0, before he became the designer and the man he is today. Well, I truly was, but I mean... there were signs for me to see, so I wasn’t totally blind.

I didn’t get into his life at 10 like Arsenal, but we’ve been through so many ups and downs together. And I would still do it all again. Talented? Gifted? Idk. But he sure has the hard work and resilience.`,
                            miMedia: `https://framerusercontent.com/assets/qJ3UJOSXivATJlbEA0caAzDzlA.jpg`,
                            miTitle: `WIFEY 👩`,
                            reanDescription: `The legend doesn’t need to talk much, innit? This dude has been a Gooner since the Invincibles season. His mom is a huge fan too, so she passed that love on to him. But him... he was a real one! In the 2006 Champions League final, he was just a little kid and cried A LOT.

One of his biggest dreams? In 2023, after years of hard work, he finally made it to the Emirates Stadium and watched the team play. About the long wait until 2026 for another trophy? Hard for him, we know. But eyyy, he got to celebrate us winning the Premier League again after 22 years. 

And btw, he also kept a promise he made as a kid... to get his very first tattoo. Ofc his wife had to push him. Ask him for a pic!`,
                            reanMedia: `https://framerusercontent.com/assets/qU7YCrBz19wOQg71c3OLNyNg.png`,
                            reanTitle: `ARSENAL ⚽️`,
                            sotdDescription: `No, we honestly changed his life. He always said we were never the main purpose whenever he designed a website, but come on!! We’ve always been a huge source of motivation for him!! We know how we make him feel. Surreal! That’s the word to describe the feeling of recognition alongside some of the best agencies and creatives around the world.

What do you mean we only bring him recognition?!? We opened so many doors for him, from new clients to new opportunities. We’re part of his personal identity as a designer. And you wonder if us, award-winning websites, convert? Well... we don’t know for sure. But we’ve been converting into clients for him for years.

-It’s us on the wall!`,
                            sotdMedia: `https://framerusercontent.com/assets/TSDE4HS6FjqMtF96KlUJ2PbXlJA.jpg`,
                            sotdTitle: `AWARDS 🏆`,
                            style: { width: `100%` },
                            timeDescription: `Adopted us recently in 2025 but we’re the most expensive hobby he’s ever had. *proudd*. Of course, he didn’t know much at the beginning and kept buying those simple dress watches with clean white dials. *rolling eyes*. 

Over time, this man grew up and had a vision: 5–6 watches covering different categories like dress, GMT, chronograph, tank, and dive watches, with a mix of modern and vintage pieces. So now he has me, a Longines Saint-Imier Chronograph, a Tudor Black Bay Pro, a vintage King Seiko Superior, and a legendary Casio. He also wants to get a diver like an Omega Seamaster or a sporty Grand Seiko. But whatever!

-Signed, I’m always the best, THE Longines`,
                            timeMedia: `https://framerusercontent.com/assets/oZb6YM6lKJriqVq5O1aJgzJa4DE.jpg`,
                            timeTitle: `WATCHES ⌚️`,
                            titleColor: `rgb(24, 24, 24)`,
                            titleFont: {
                              fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                              fontSize: `30px`,
                              fontStyle: `normal`,
                              fontWeight: 400,
                              letterSpacing: `0.01em`,
                              lineHeight: `100%`,
                            },
                            useTextStyleSource: !0,
                            visualGapRefreshR12: !0,
                            width: `100%`,
                          }),
                        }),
                      }),
                    }),
                    d(Dn, {
                      className: `framer-1to3and`,
                      layout: O,
                      children: h(y.div, {
                        className: `framer-456e3m`,
                        children: [
                          k() &&
                            h(y.div, {
                              className: `framer-14dn7pd hidden-v3tmhq`,
                              "data-framer-name": `top`,
                              children: [
                                d(y.div, { className: `framer-9ureig` }),
                                d(y.div, { className: `framer-htk8ez` }),
                                d(y.div, { className: `framer-bs1bw7` }),
                                d(y.div, { className: `framer-1oz8jbv` }),
                                d(y.div, {
                                  "aria-label": `seconelementon`,
                                  className: `framer-b4915l`,
                                  children: d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: h(`h2`, {
                                        className: `framer-styles-preset-1h59vvl`,
                                        "data-styles-preset": `IiyUL4xEJ`,
                                        dir: `auto`,
                                        children: [
                                          `Plant Daddy`,
                                          d(`br`, {}),
                                          `Gooner since the Invincibles Married to a beautiful knitter 3 cats call him dad`,
                                          d(`br`, {}),
                                          `BlackBerry Collector`,
                                          d(`br`, {}),
                                          `Pool Player but Chicken level into watches now...`,
                                        ],
                                      }),
                                    }),
                                    className: `framer-lgnhyv`,
                                    "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                    fonts: [`Inter`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                }),
                                d(y.div, { className: `framer-s1ov6z` }),
                              ],
                            }),
                          h(y.div, {
                            className: `framer-1jmc5z0`,
                            "data-framer-name": `Mid`,
                            children: [
                              d(y.div, {
                                "aria-label": `seconelement`,
                                className: `framer-f5btvi`,
                                children: d(L, {
                                  breakpoint: x,
                                  overrides: {
                                    coODAmpek: {
                                      children: d(a, {
                                        children: d(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                            "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                            "--framer-font-size": `280px`,
                                            "--framer-font-weight": `700`,
                                            "--framer-letter-spacing": `-0.04em`,
                                            "--framer-line-height": `110%`,
                                            "--framer-text-alignment": `center`,
                                            "--framer-text-color": `rgb(255, 255, 255)`,
                                          },
                                          children: `19`,
                                        }),
                                      }),
                                      verticalAlignment: `center`,
                                    },
                                    Mo1N6r2DZ: {
                                      children: d(a, {
                                        children: d(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                            "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                            "--framer-font-size": `300px`,
                                            "--framer-font-weight": `700`,
                                            "--framer-letter-spacing": `-0.04em`,
                                            "--framer-line-height": `110%`,
                                            "--framer-text-color": `rgb(255, 255, 255)`,
                                          },
                                          children: `19`,
                                        }),
                                      }),
                                    },
                                    pNu0WPoUY: {
                                      children: d(a, {
                                        children: d(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                            "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                            "--framer-font-size": `450px`,
                                            "--framer-font-weight": `700`,
                                            "--framer-letter-spacing": `-0.04em`,
                                            "--framer-line-height": `110%`,
                                            "--framer-text-color": `rgb(255, 255, 255)`,
                                          },
                                          children: `19`,
                                        }),
                                      }),
                                    },
                                  },
                                  children: d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`p`, {
                                        dir: `auto`,
                                        style: {
                                          "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                          "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                          "--framer-font-size": `380px`,
                                          "--framer-font-weight": `700`,
                                          "--framer-letter-spacing": `-0.04em`,
                                          "--framer-line-height": `110%`,
                                          "--framer-text-color": `rgb(255, 255, 255)`,
                                        },
                                        children: `19`,
                                      }),
                                    }),
                                    className: `framer-j3r3yi`,
                                    fonts: [`CUSTOMV2;BT Grotesk Bold`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                }),
                              }),
                              h(y.div, {
                                "aria-label": `seconelement`,
                                className: `framer-3v741s`,
                                children: [
                                  k() &&
                                    d(y.div, {
                                      className: `framer-179qscz hidden-v3tmhq`,
                                      children: d(M, {
                                        children: d(D, {
                                          className: `framer-ydesjc-container`,
                                          isAuthoredByUser: !0,
                                          nodeId: `CY2OUmjhB`,
                                          rendersWithMotion: !0,
                                          scopeId: `Pn95ZS3Nn`,
                                          style: { scale: 1.2 },
                                          children: d(Ye, {
                                            artboard: `huymlactive`,
                                            autoplay: !0,
                                            clickSound: `https://framerusercontent.com/assets/6cRNA8zDeZycaafxCb1ax6o.mp3`,
                                            clickSoundVolume: 50,
                                            eventPrefix: `rive-trigger`,
                                            height: `100%`,
                                            id: `CY2OUmjhB`,
                                            layoutId: `CY2OUmjhB`,
                                            mobile: !1,
                                            openSound: `https://framerusercontent.com/assets/TPy4R9I2nyWcMGl3iIx3nrZhdo.mp3`,
                                            openSoundVolume: 50,
                                            src: `https://framerusercontent.com/assets/kMKOjaDQErebIbGsFDadsiHYG30.riv`,
                                            stateMachine: `State Machine 1`,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                            viewModel: `huyml`,
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  j() &&
                                    d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: d(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `20px`,
                                            "--framer-line-height": `126%`,
                                            "--framer-text-color": `rgb(255, 73, 73)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: `AND`,
                                        }),
                                      }),
                                      className: `framer-msk7a7 hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                                      "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                      fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  j() &&
                                    d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: d(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `20px`,
                                            "--framer-line-height": `126%`,
                                            "--framer-text-color": `rgb(255, 73, 73)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: `SHAPING DIGITAL EXPERIENCES WITH CLARITY, INTENTION, CHARACTER, AND BEING A GOOD FRIEND WITH DIGITAL AGENCIES, DESIGN STUDIOS, STARTUPS, AND BUSINESSES AROUND THE WORLD SINCE 2018.`,
                                        }),
                                      }),
                                      className: `framer-1ku4qbn hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                                      "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                      fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  j() &&
                                    d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: h(`p`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `20px`,
                                            "--framer-line-height": `126%`,
                                            "--framer-text-color": `rgb(255, 73, 73)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: [
                                            `Plant Daddy`,
                                            d(`br`, {}),
                                            `Gooner since the Invincibles`,
                                            d(`br`, {}),
                                            `Married to a beautiful knitter`,
                                            d(`br`, {}),
                                            `3 cats call him dad`,
                                            d(`br`, {}),
                                            `BlackBerry Collector`,
                                            d(`br`, {}),
                                            `Pool Player but Chicken level`,
                                            d(`br`, {}),
                                            `into watches now...`,
                                          ],
                                        }),
                                      }),
                                      className: `framer-1t7c17n hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                                      "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                      fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                ],
                              }),
                              d(L, {
                                breakpoint: x,
                                overrides: {
                                  coODAmpek: { "aria-label": `inview` },
                                },
                                children: h(y.div, {
                                  className: `framer-1oz53q0`,
                                  children: [
                                    d(y.div, {
                                      "aria-label": `seconelement`,
                                      className: `framer-1stj6ws`,
                                      children: d(L, {
                                        breakpoint: x,
                                        overrides: {
                                          coODAmpek: {
                                            children: d(a, {
                                              children: d(`p`, {
                                                dir: `auto`,
                                                style: {
                                                  "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                                  "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                                  "--framer-font-size": `280px`,
                                                  "--framer-font-weight": `700`,
                                                  "--framer-letter-spacing": `-0.04em`,
                                                  "--framer-line-height": `110%`,
                                                  "--framer-text-alignment": `center`,
                                                  "--framer-text-color": `rgb(255, 255, 255)`,
                                                },
                                                children: `96`,
                                              }),
                                            }),
                                          },
                                          Mo1N6r2DZ: {
                                            children: d(a, {
                                              children: d(`p`, {
                                                dir: `auto`,
                                                style: {
                                                  "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                                  "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                                  "--framer-font-size": `300px`,
                                                  "--framer-font-weight": `700`,
                                                  "--framer-letter-spacing": `-0.04em`,
                                                  "--framer-line-height": `110%`,
                                                  "--framer-text-color": `rgb(255, 255, 255)`,
                                                },
                                                children: `96`,
                                              }),
                                            }),
                                          },
                                          pNu0WPoUY: {
                                            children: d(a, {
                                              children: d(`p`, {
                                                dir: `auto`,
                                                style: {
                                                  "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                                  "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                                  "--framer-font-size": `450px`,
                                                  "--framer-font-weight": `700`,
                                                  "--framer-letter-spacing": `-0.04em`,
                                                  "--framer-line-height": `110%`,
                                                  "--framer-text-color": `rgb(255, 255, 255)`,
                                                },
                                                children: `96`,
                                              }),
                                            }),
                                          },
                                        },
                                        children: d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR3JvdGVzayBCb2xk`,
                                                "--framer-font-family": `"BT Grotesk Bold", "BT Grotesk Bold Placeholder", sans-serif`,
                                                "--framer-font-size": `380px`,
                                                "--framer-font-weight": `700`,
                                                "--framer-letter-spacing": `-0.04em`,
                                                "--framer-line-height": `110%`,
                                                "--framer-text-color": `rgb(255, 255, 255)`,
                                              },
                                              children: `96`,
                                            }),
                                          }),
                                          className: `framer-9dfkce`,
                                          fonts: [`CUSTOMV2;BT Grotesk Bold`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                    }),
                                    k() &&
                                      d(y.div, {
                                        "aria-label": `seconelementon`,
                                        className: `framer-1dykz28 hidden-v3tmhq`,
                                        transformTemplate: Gn,
                                        children: d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`h2`, {
                                              className: `framer-styles-preset-1h59vvl`,
                                              "data-styles-preset": `IiyUL4xEJ`,
                                              dir: `auto`,
                                              children: `And`,
                                            }),
                                          }),
                                          className: `framer-121hfp8`,
                                          "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                  ],
                                }),
                              }),
                              k() &&
                                d(y.div, {
                                  className: `framer-1kz9a9 hidden-v3tmhq`,
                                }),
                              j() &&
                                d(y.div, {
                                  className: `framer-16wz6y6 hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                                  children: d(M, {
                                    children: d(D, {
                                      className: `framer-1bgdkid-container`,
                                      isAuthoredByUser: !0,
                                      nodeId: `Lx3s9zMaY`,
                                      rendersWithMotion: !0,
                                      scopeId: `Pn95ZS3Nn`,
                                      style: { scale: 1.6 },
                                      children: d(Ye, {
                                        artboard: `huymlactive`,
                                        autoplay: !0,
                                        clickSoundVolume: 50,
                                        eventPrefix: `rive-trigger`,
                                        height: `100%`,
                                        id: `Lx3s9zMaY`,
                                        layoutId: `Lx3s9zMaY`,
                                        mobile: !0,
                                        openSoundVolume: 50,
                                        src: `https://framerusercontent.com/assets/kMKOjaDQErebIbGsFDadsiHYG30.riv`,
                                        stateMachine: `State Machine 1`,
                                        style: {
                                          height: `100%`,
                                          width: `100%`,
                                        },
                                        viewModel: `huyml`,
                                        width: `100%`,
                                      }),
                                    }),
                                  }),
                                }),
                            ],
                          }),
                          h(y.div, {
                            className: `framer-1kqps7n`,
                            "data-framer-name": `BOTOM`,
                            children: [
                              h(y.div, {
                                className: `framer-1i5f2dl`,
                                children: [
                                  d(Sn, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`p`, {
                                        className: `framer-styles-preset-fukh8o`,
                                        "data-styles-preset": `sy0X3z2VP`,
                                        dir: `auto`,
                                        style: {
                                          "--framer-text-color": `rgb(128, 128, 128)`,
                                        },
                                        children: `Awards & Recognitions`,
                                      }),
                                    }),
                                    className: `framer-ssuohc`,
                                    "data-framer-name": `Design & ad: development:`,
                                    fonts: [`Inter`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                  d(y.div, {
                                    className: `framer-9wyd2d`,
                                    children: d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: h(`p`, {
                                          className: `framer-styles-preset-fukh8o`,
                                          "data-styles-preset": `sy0X3z2VP`,
                                          dir: `auto`,
                                          style: {
                                            "--framer-text-color": `rgb(0, 0, 0)`,
                                          },
                                          children: [
                                            `Awwwards Independent of the Year Nominee (4)`,
                                            d(`br`, {}),
                                            `CSSDA Designer of the Year Nominee (3)`,
                                            d(`br`, {}),
                                            `Webby Nominee (2)`,
                                            d(`br`, {}),
                                            `Webby Honoree (2)`,
                                            d(`br`, {}),
                                            `Awwwards Site of the Month Nominees (4)`,
                                            d(`br`, {}),
                                            `Awwwards Site of the Day (13)`,
                                            d(`br`, {}),
                                            `CSSDA Website of the Month (2)`,
                                            d(`br`, {}),
                                            `CSSDA Website of the Day (14)`,
                                            d(`br`, {}),
                                            `FWA of the Day (12)`,
                                            d(`br`, {}),
                                            `Behance Feature (17)`,
                                            d(`br`, {}),
                                            `Good Design Awards`,
                                            d(`br`, {}),
                                            `Best Awards`,
                                          ],
                                        }),
                                      }),
                                      className: `framer-cx72u0`,
                                      fonts: [`Inter`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  }),
                                ],
                              }),
                              h(wn, {
                                className: `framer-2ybgxs`,
                                children: [
                                  d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`p`, {
                                        className: `framer-styles-preset-fukh8o`,
                                        "data-styles-preset": `sy0X3z2VP`,
                                        dir: `auto`,
                                        style: {
                                          "--framer-text-color": `rgb(128, 128, 128)`,
                                        },
                                        children: `Talk, Interview & Publications`,
                                      }),
                                    }),
                                    className: `framer-px7hts`,
                                    "data-framer-name": `Design & ad: development:`,
                                    fonts: [`Inter`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                  d(y.div, {
                                    className: `framer-37ymil`,
                                    children: d(y.div, {
                                      className: `framer-k9ywrw`,
                                      children: d(Cn, {
                                        __fromCanvasComponent: !0,
                                        children: h(a, {
                                          children: [
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://tympanus.net/codrops/2025/03/21/designer-spotlight-huy-phan/`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Codrops - Designer Spotlight`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Sandu Publishing: Interactive Design for Screen`,
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Pint of Design | December 2024`,
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.commarts.com/webpicks/mat-voyce`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Commarts: Mat Voyce`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.commarts.com/webpicks/iventions`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Commarts: Iventions`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.commarts.com/webpicks/won-j-you-studios`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Commarts: Won J. You Studios`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.awwwards.com/redefining-serious-case-study.html`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Awwwards Case Study | Serious Business`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.awwwards.com/case-study-mat-voyce-designing-a-digital-home-for-a-kinetic-creative.html`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Awwwards Case Study | Mat Voyce`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://www.awwwards.com/designing-for-an-identity-that-shapeshifts.html`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Awwwards Case Study | Fromanother`,
                                                }),
                                              }),
                                            }),
                                            d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: d(I, {
                                                href: `https://abduzeedo.com/rly-network-token-protocol-platform-brand-identity-serious-business`,
                                                motionChild: !0,
                                                nodeId: `X3L1Ro9bN`,
                                                openInNewTab: !0,
                                                relValues: [],
                                                scopeId: `Pn95ZS3Nn`,
                                                smoothScroll: !1,
                                                children: d(y.a, {
                                                  className: `framer-styles-preset-1cuzab`,
                                                  "data-styles-preset": `aetnAl9EG`,
                                                  children: `Abduzeedo | RLY Network`,
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                        className: `framer-qxso12`,
                                        fonts: [`Inter`],
                                        verticalAlignment: `top`,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                              h(y.div, {
                                className: `framer-xx7dcm`,
                                children: [
                                  d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`p`, {
                                        className: `framer-styles-preset-fukh8o`,
                                        "data-styles-preset": `sy0X3z2VP`,
                                        dir: `auto`,
                                        style: {
                                          "--framer-text-color": `rgb(128, 128, 128)`,
                                        },
                                        children: `Capabilities`,
                                      }),
                                    }),
                                    className: `framer-1v4gd4w`,
                                    "data-framer-name": `Design & ad: development:`,
                                    fonts: [`Inter`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                  h(y.div, {
                                    className: `framer-eakst1`,
                                    "data-framer-name": `Frame 2147226909`,
                                    children: [
                                      d(y.div, {
                                        className: `framer-11asnmi`,
                                        children: d(w, {
                                          __fromCanvasComponent: !0,
                                          children: h(a, {
                                            children: [
                                              h(`p`, {
                                                className: `framer-styles-preset-fukh8o`,
                                                "data-styles-preset": `sy0X3z2VP`,
                                                dir: `auto`,
                                                style: {
                                                  "--framer-text-color": `rgb(0, 0, 0)`,
                                                },
                                                children: [
                                                  `Digital Art Direction`,
                                                  d(`br`, {}),
                                                  `Website Design`,
                                                  d(`br`, {}),
                                                  `Application Design`,
                                                ],
                                              }),
                                              h(`p`, {
                                                className: `framer-styles-preset-fukh8o`,
                                                "data-styles-preset": `sy0X3z2VP`,
                                                dir: `auto`,
                                                style: {
                                                  "--framer-text-color": `rgb(0, 0, 0)`,
                                                },
                                                children: [
                                                  `Interactive Storytelling`,
                                                  d(`br`, {}),
                                                  `Website Motion & Animation`,
                                                  d(`br`, {}),
                                                  `Design System`,
                                                  d(`br`, {}),
                                                  `User Experience`,
                                                ],
                                              }),
                                            ],
                                          }),
                                          className: `framer-19qqqdf`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                      d(En, {
                                        className: `framer-zmnetx`,
                                        children: d(Tn, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Process & Approach`,
                                            }),
                                          }),
                                          className: `framer-15dr210`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              k() &&
                                d(y.div, {
                                  "aria-label": `seconelementon`,
                                  className: `framer-1qbenro hidden-v3tmhq`,
                                  children: d(L, {
                                    breakpoint: x,
                                    overrides: {
                                      Mo1N6r2DZ: {
                                        children: d(a, {
                                          children: h(`h2`, {
                                            className: `framer-styles-preset-1h59vvl`,
                                            "data-styles-preset": `IiyUL4xEJ`,
                                            dir: `auto`,
                                            children: [
                                              `Shaping digital experiences with clarity, intention, character and being a good`,
                                              d(`br`, {}),
                                              `friend with digital agencies, design studios, startups and`,
                                              d(`br`, {}),
                                              `businesses around the`,
                                              d(`br`, {}),
                                              `world since 2018.`,
                                            ],
                                          }),
                                        }),
                                      },
                                      pNu0WPoUY: {
                                        children: d(a, {
                                          children: h(`h2`, {
                                            className: `framer-styles-preset-1h59vvl`,
                                            "data-styles-preset": `IiyUL4xEJ`,
                                            dir: `auto`,
                                            children: [
                                              `Shaping digital experiences with clarity, intention,`,
                                              d(`br`, {}),
                                              `character and being a good`,
                                              d(`br`, {}),
                                              `friend with digital agencies,`,
                                              d(`br`, {}),
                                              `design studios, startups and`,
                                              d(`br`, {}),
                                              `businesses around the `,
                                              d(`br`, {}),
                                              `world since 2018.`,
                                            ],
                                          }),
                                        }),
                                      },
                                    },
                                    children: d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: h(`h2`, {
                                          className: `framer-styles-preset-1h59vvl`,
                                          "data-styles-preset": `IiyUL4xEJ`,
                                          dir: `auto`,
                                          children: [
                                            `Shaping digital experiences with clarity, intention, character and being a good friend with digital agencies, design studios, startups and`,
                                            d(`br`, {}),
                                            `businesses around the `,
                                            d(`br`, {}),
                                            `world since 2018.`,
                                          ],
                                        }),
                                      }),
                                      className: `framer-1dt7m7n`,
                                      "data-framer-name": `Digital Art Direction Website Design Application Design\u2028Interactive Storytelling Website Motion & Animation Design System User Experience`,
                                      fonts: [`Inter`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  }),
                                }),
                              h(y.div, {
                                className: `framer-1tk156i`,
                                children: [
                                  d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`p`, {
                                        className: `framer-styles-preset-fukh8o`,
                                        "data-styles-preset": `sy0X3z2VP`,
                                        dir: `auto`,
                                        style: {
                                          "--framer-text-color": `rgb(128, 128, 128)`,
                                        },
                                        children: `Trusted by`,
                                      }),
                                    }),
                                    className: `framer-17tgbca`,
                                    "data-framer-name": `Design & ad: development:`,
                                    fonts: [`Inter`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                  d(y.div, {
                                    className: `framer-1fzebt0`,
                                    children: d(w, {
                                      __fromCanvasComponent: !0,
                                      children: h(a, {
                                        children: [
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Unilever`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `VinPearl`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Autonomous`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Soravia`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `NanoTemper`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Arvid Nordquist`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Soluis Group`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Klingit`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `ToyFight`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Stockfiller`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `Serious Business`,
                                          }),
                                          d(`p`, {
                                            className: `framer-styles-preset-fukh8o`,
                                            "data-styles-preset": `sy0X3z2VP`,
                                            dir: `auto`,
                                            style: {
                                              "--framer-text-color": `rgb(0, 0, 0)`,
                                            },
                                            children: `and many more`,
                                          }),
                                        ],
                                      }),
                                      className: `framer-1i1av9p`,
                                      fonts: [`Inter`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    d(M, {
                      height: 1e3,
                      width: f?.width || `100vw`,
                      y: (f?.y || 0) + 0,
                      children: d(D, {
                        className: `framer-grpjyv-container`,
                        layout: O,
                        nodeId: `vfpaXDw01`,
                        scopeId: `Pn95ZS3Nn`,
                        children: d(L, {
                          breakpoint: x,
                          overrides: {
                            coODAmpek: { variant: Kn(`gKJyN2gEK`) },
                            pNu0WPoUY: { variant: Kn(`o_CY8khIX`) },
                          },
                          children: d(ze, {
                            eR3H1qFCa: `[data-framer-name="Ti3tle"]`,
                            hcif0bVY1: `ABOUT`,
                            height: `100%`,
                            id: `vfpaXDw01`,
                            layoutId: `vfpaXDw01`,
                            style: { height: `100%`, width: `100%` },
                            variant: Kn(`wRj3tt4VQ`),
                            width: `100%`,
                            XORQldie6: !1,
                          }),
                        }),
                      }),
                    }),
                    h(jn, {
                      "aria-label": `process`,
                      className: `framer-hr9csh`,
                      "data-framer-name": `process`,
                      layout: O,
                      children: [
                        h(y.div, {
                          className: `framer-qgmp8u`,
                          "data-framer-name": `Content Container`,
                          children: [
                            h(y.div, {
                              className: `framer-r9d9nb`,
                              children: [
                                d(L, {
                                  breakpoint: x,
                                  overrides: {
                                    coODAmpek: {
                                      children: d(a, {
                                        children: d(`h3`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `30px`,
                                            "--framer-letter-spacing": `0.01em`,
                                            "--framer-line-height": `100%`,
                                            "--framer-text-color": `rgb(24, 24, 24)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: `Approach`,
                                        }),
                                      }),
                                    },
                                    Mo1N6r2DZ: {
                                      children: d(a, {
                                        children: d(`h3`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `48px`,
                                            "--framer-letter-spacing": `0.01em`,
                                            "--framer-line-height": `100%`,
                                            "--framer-text-color": `rgb(24, 24, 24)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: `Approach`,
                                        }),
                                      }),
                                    },
                                    pNu0WPoUY: {
                                      children: d(a, {
                                        children: d(`h3`, {
                                          dir: `auto`,
                                          style: {
                                            "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                            "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            "--framer-font-size": `80px`,
                                            "--framer-letter-spacing": `0.01em`,
                                            "--framer-line-height": `100%`,
                                            "--framer-text-color": `rgb(24, 24, 24)`,
                                            "--framer-text-transform": `uppercase`,
                                          },
                                          children: `Approach`,
                                        }),
                                      }),
                                    },
                                  },
                                  children: d(w, {
                                    __fromCanvasComponent: !0,
                                    children: d(a, {
                                      children: d(`h3`, {
                                        dir: `auto`,
                                        style: {
                                          "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                          "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                          "--framer-font-size": `60px`,
                                          "--framer-letter-spacing": `0.01em`,
                                          "--framer-line-height": `100%`,
                                          "--framer-text-color": `rgb(24, 24, 24)`,
                                          "--framer-text-transform": `uppercase`,
                                        },
                                        children: `Approach`,
                                      }),
                                    }),
                                    className: `framer-9avzsd`,
                                    "data-framer-name": `Title`,
                                    fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                    verticalAlignment: `top`,
                                    withExternalLayout: !0,
                                  }),
                                }),
                                h(y.div, {
                                  className: `framer-azb9cg`,
                                  "data-border": !0,
                                  "data-framer-name": `Section Container`,
                                  children: [
                                    h(y.div, {
                                      className: `framer-1wyxq6c`,
                                      children: [
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `A1`,
                                            }),
                                          }),
                                          className: `framer-6mxb0q`,
                                          "data-framer-name": `Section Letter`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Approach`,
                                            }),
                                          }),
                                          className: `framer-rcek3s`,
                                          "data-framer-name": `Section Title`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    d(w, {
                                      __fromCanvasComponent: !0,
                                      children: d(a, {
                                        children: d(`p`, {
                                          className: `framer-styles-preset-fukh8o`,
                                          "data-styles-preset": `sy0X3z2VP`,
                                          dir: `auto`,
                                          style: {
                                            "--framer-text-color": `rgb(0, 0, 0)`,
                                          },
                                          children: `I don’t have a particular design style. For me, every website is unique, with its own personality, purpose, and story. That’s why I treat every project differently, translating its character into pixels through typography, imagery, interaction, strategy and brand elements while always keeping the main goal.`,
                                        }),
                                      }),
                                      className: `framer-pe9yyj`,
                                      "data-framer-name": `Section Paragraph`,
                                      fonts: [`Inter`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            h(y.div, {
                              className: `framer-11biypu`,
                              "data-framer-name": `Sections Container`,
                              children: [
                                h(y.div, {
                                  className: `framer-2f5990`,
                                  children: [
                                    d(L, {
                                      breakpoint: x,
                                      overrides: {
                                        coODAmpek: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `30px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `&`,
                                            }),
                                          }),
                                          fonts: [
                                            `CUSTOMV2;BT Glyphius Regular`,
                                          ],
                                        },
                                        Mo1N6r2DZ: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `48px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `&`,
                                            }),
                                          }),
                                          fonts: [
                                            `CUSTOMV2;BT Glyphius Regular`,
                                          ],
                                        },
                                        pNu0WPoUY: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `80px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `&`,
                                            }),
                                          }),
                                          fonts: [
                                            `CUSTOMV2;BT Glyphius Regular`,
                                          ],
                                        },
                                      },
                                      children: d(w, {
                                        __fromCanvasComponent: !0,
                                        children: d(a, {
                                          children: d(`h3`, {
                                            className: `framer-styles-preset-aopi0o`,
                                            "data-styles-preset": `LKjkg9Djy`,
                                            dir: `auto`,
                                            children: `&`,
                                          }),
                                        }),
                                        className: `framer-rlygzm`,
                                        "data-framer-name": `Title`,
                                        fonts: [`Inter`],
                                        verticalAlignment: `top`,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                    d(L, {
                                      breakpoint: x,
                                      overrides: {
                                        coODAmpek: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `30px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `Process`,
                                            }),
                                          }),
                                        },
                                        Mo1N6r2DZ: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `48px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `Process`,
                                            }),
                                          }),
                                        },
                                        pNu0WPoUY: {
                                          children: d(a, {
                                            children: d(`h3`, {
                                              dir: `auto`,
                                              style: {
                                                "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                                "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                "--framer-font-size": `80px`,
                                                "--framer-letter-spacing": `0.01em`,
                                                "--framer-line-height": `128%`,
                                                "--framer-text-color": `rgb(24, 24, 24)`,
                                                "--framer-text-transform": `uppercase`,
                                              },
                                              children: `Process`,
                                            }),
                                          }),
                                        },
                                      },
                                      children: d(w, {
                                        __fromCanvasComponent: !0,
                                        children: d(a, {
                                          children: d(`h3`, {
                                            dir: `auto`,
                                            style: {
                                              "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                              "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                              "--framer-font-size": `60px`,
                                              "--framer-letter-spacing": `0.01em`,
                                              "--framer-line-height": `128%`,
                                              "--framer-text-color": `rgb(24, 24, 24)`,
                                              "--framer-text-transform": `uppercase`,
                                            },
                                            children: `Process`,
                                          }),
                                        }),
                                        className: `framer-16hnr1m`,
                                        "data-framer-name": `Title`,
                                        fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                        verticalAlignment: `top`,
                                        withExternalLayout: !0,
                                      }),
                                    }),
                                  ],
                                }),
                                h(y.div, {
                                  className: `framer-ivqna1`,
                                  children: [
                                    h(y.div, {
                                      className: `framer-1ftok1e`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-br1pjw`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P1.`,
                                                }),
                                              }),
                                              className: `framer-1wrow1b`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Discovery`,
                                                }),
                                              }),
                                              className: `framer-13wvpi8`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Align on the brief, scope, budget and timeline.`,
                                            }),
                                          }),
                                          className: `framer-14rquhq`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-1qi8mto`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-7wyw99`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P2.`,
                                                }),
                                              }),
                                              className: `framer-1c3b4fg`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `One page first`,
                                                }),
                                              }),
                                              className: `framer-18615jp`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Usually the homepage to establish the direction.`,
                                            }),
                                          }),
                                          className: `framer-qmo8og`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-1i8bqn1`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-1aqj6y4`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P3.`,
                                                }),
                                              }),
                                              className: `framer-11pcz76`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Build the rest`,
                                                }),
                                              }),
                                              className: `framer-a4ubwf`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Complete the remaining pages with feedback and iterations once the direction is approved.`,
                                            }),
                                          }),
                                          className: `framer-dhe6hb`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-27usuf`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-3h7sup`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P4.`,
                                                }),
                                              }),
                                              className: `framer-16fz93`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Mobile matters`,
                                                }),
                                              }),
                                              className: `framer-16k7294`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Adapt and refine the experience for mobile.`,
                                            }),
                                          }),
                                          className: `framer-xhtpfj`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-uvej35`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-xy8kqa`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P5.`,
                                                }),
                                              }),
                                              className: `framer-13iv0uz`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Final review`,
                                                }),
                                              }),
                                              className: `framer-14cw2vo`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Polish everything before development.`,
                                            }),
                                          }),
                                          className: `framer-1k2ot6c`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-1jta5k2`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-12t54k1`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P6.`,
                                                }),
                                              }),
                                              className: `framer-i6n6j`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Pixels to production`,
                                                }),
                                              }),
                                              className: `framer-hbucp6`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `Work with either my long-term development team (running in parallax) or the client’s developer while staying involved until the site looks, feels and performs exactly as the design.`,
                                            }),
                                          }),
                                          className: `framer-ji7ljt`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                    h(y.div, {
                                      className: `framer-zqqt12`,
                                      "data-border": !0,
                                      "data-framer-name": `Section Container`,
                                      children: [
                                        h(y.div, {
                                          className: `framer-f0n0g`,
                                          children: [
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `P7.`,
                                                }),
                                              }),
                                              className: `framer-z85rul`,
                                              "data-framer-name": `Section Letter`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                            d(w, {
                                              __fromCanvasComponent: !0,
                                              children: d(a, {
                                                children: d(`p`, {
                                                  className: `framer-styles-preset-fukh8o`,
                                                  "data-styles-preset": `sy0X3z2VP`,
                                                  dir: `auto`,
                                                  style: {
                                                    "--framer-text-color": `rgb(0, 0, 0)`,
                                                  },
                                                  children: `Launch`,
                                                }),
                                              }),
                                              className: `framer-5bqsit`,
                                              "data-framer-name": `Section Title`,
                                              fonts: [`Inter`],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          ],
                                        }),
                                        d(w, {
                                          __fromCanvasComponent: !0,
                                          children: d(a, {
                                            children: d(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `rgb(0, 0, 0)`,
                                              },
                                              children: `And pray for some awards 🏆`,
                                            }),
                                          }),
                                          className: `framer-56mthn`,
                                          "data-framer-name": `Section Paragraph`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        h(An, {
                          className: `framer-d94wmb`,
                          "data-framer-name": `Frame 2147226968`,
                          children: [
                            d(M, {
                              children: d(D, {
                                className: `framer-xvk8lt-container`,
                                isAuthoredByUser: !0,
                                nodeId: `E8ppO6nME`,
                                rendersWithMotion: !0,
                                scopeId: `Pn95ZS3Nn`,
                                children: d(L, {
                                  breakpoint: x,
                                  overrides: {
                                    Mo1N6r2DZ: {
                                      font: {
                                        fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                        fontSize: `10px`,
                                        fontStyle: `normal`,
                                        fontWeight: 500,
                                        letterSpacing: `0em`,
                                        lineHeight: `1em`,
                                        textAlign: `left`,
                                      },
                                    },
                                    pNu0WPoUY: {
                                      font: {
                                        fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                        fontSize: `14px`,
                                        fontStyle: `normal`,
                                        fontWeight: 500,
                                        letterSpacing: `0em`,
                                        lineHeight: `1em`,
                                        textAlign: `left`,
                                      },
                                    },
                                  },
                                  children: d(Te, {
                                    alwaysOnTop: !1,
                                    color: `rgb(0, 0, 0)`,
                                    customHeight: 40,
                                    emptyFallbackLink: ``,
                                    emptyFallbackText: `Next Project`,
                                    enableCustomHeight: !1,
                                    enableEmptyFallback: !1,
                                    enableTransition: !1,
                                    font: {
                                      fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                      fontSize: `12px`,
                                      fontStyle: `normal`,
                                      fontWeight: 500,
                                      letterSpacing: `0em`,
                                      lineHeight: `1em`,
                                      textAlign: `left`,
                                    },
                                    height: `100%`,
                                    hoverEnabled: !0,
                                    hoverSoundEnabled: !1,
                                    id: `E8ppO6nME`,
                                    layoutId: `E8ppO6nME`,
                                    lineColor: `rgb(0, 0, 0)`,
                                    lineGap: 0,
                                    lineMode: `Hover Only`,
                                    lineThickness: 1,
                                    link: ``,
                                    openInNewTab: !1,
                                    text: `Close`,
                                    textHeight: 100,
                                    textMode: `Custom`,
                                    transitionDelay: 1,
                                    transitionLabel: ``,
                                    triggerProcessPanel: !1,
                                    uppercase: !1,
                                    useBtGroteskPreset: !1,
                                    useTextSizeSource: !1,
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                            d(L, {
                              breakpoint: x,
                              overrides: {
                                Mo1N6r2DZ: {
                                  svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g transform="translate(0 0)"><path d="M 0.419 12.411 L 0 0.419 L 11.993 0 L 12.411 11.993 Z" fill="transparent"></path><path d="M 1.552 1.866 L 10.86 10.546" fill="transparent" stroke="rgb(0, 0, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path><path d="M 10.546 1.551 L 1.866 10.86" fill="transparent" stroke="rgb(0, 0, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path></g></svg>`,
                                  svgContentId: 11344847080,
                                },
                              },
                              children: d(re, {
                                className: `framer-3n1s9c`,
                                "data-framer-name": `e-remove 1`,
                                opacity: 1,
                                svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 13 13"><g transform="translate(0 0)"><path d="M 0.419 12.411 L 0 0.419 L 11.993 0 L 12.411 11.993 Z" fill="transparent"></path><path d="M 1.552 1.866 L 10.86 10.546" fill="transparent" stroke="rgb(0, 0, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path><path d="M 10.546 1.551 L 1.866 10.86" fill="transparent" stroke="rgb(0, 0, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path></g></svg>`,
                                svgContentId: 12403500733,
                                withExternalLayout: !0,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    j() &&
                      d(In, {
                        "aria-label": `mobilem`,
                        className: `framer-xijbxp hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                        "data-framer-name": `Menumobile`,
                        layout: O,
                        children: h(y.div, {
                          className: `framer-6p8pfa`,
                          children: [
                            d(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-5mn74x`,
                              children: d(w, {
                                __fromCanvasComponent: !0,
                                children: h(a, {
                                  children: [
                                    d(`p`, {
                                      className: `framer-styles-preset-fukh8o`,
                                      "data-styles-preset": `sy0X3z2VP`,
                                      dir: `auto`,
                                      style: {
                                        "--framer-text-color": `rgb(0, 0, 0)`,
                                      },
                                      children: `Independent designer`,
                                    }),
                                    d(`p`, {
                                      className: `framer-styles-preset-fukh8o`,
                                      "data-styles-preset": `sy0X3z2VP`,
                                      dir: `auto`,
                                      style: {
                                        "--framer-text-color": `rgb(0, 0, 0)`,
                                      },
                                      children: `Working globally`,
                                    }),
                                  ],
                                }),
                                className: `framer-f5b3wj`,
                                fonts: [`Inter`],
                                verticalAlignment: `top`,
                                withExternalLayout: !0,
                              }),
                            }),
                            d(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-14hq59q`,
                              children: d(R, {
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
                                    href: { webPageId: `JE7gfCpJR` },
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
                                    href: { webPageId: `JE7gfCpJR` },
                                    implicitPathVariables: void 0,
                                  },
                                ],
                                children: (e) =>
                                  d(M, {
                                    children: d(D, {
                                      className: `framer-1vj4k5b-container`,
                                      isAuthoredByUser: !0,
                                      nodeId: `ncfaecTUd`,
                                      rendersWithMotion: !0,
                                      scopeId: `Pn95ZS3Nn`,
                                      children: d(L, {
                                        breakpoint: x,
                                        overrides: {
                                          coODAmpek: {
                                            links: [e[4], e[5], e[6], e[7]],
                                          },
                                        },
                                        children: d(H, {
                                          arrowOffsetX: 24,
                                          arrowOffsetY: 11,
                                          arrowSize: 2.1,
                                          blendMode: `normal`,
                                          color: `rgb(0, 0, 0)`,
                                          enableTransition: !1,
                                          font: {
                                            fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                            fontSize: `30px`,
                                            fontStyle: `normal`,
                                            fontWeight: 400,
                                            letterSpacing: `0em`,
                                            lineHeight: `33px`,
                                          },
                                          gap: 0,
                                          height: `100%`,
                                          id: `ncfaecTUd`,
                                          initialIndex: 1,
                                          items: [
                                            `WORK`,
                                            `ABOUT`,
                                            `PLAYGROUND`,
                                            `CONTACT`,
                                          ],
                                          itemStep: 33,
                                          layoutId: `ncfaecTUd`,
                                          links: [e[0], e[1], e[2], e[3]],
                                          openInNewTab: !1,
                                          transitionDelay: 3,
                                          transitionLabels: [
                                            `WORK`,
                                            `ABOUT`,
                                            `PLAYGROUND`,
                                            `CONTACT`,
                                          ],
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                              }),
                            }),
                            d(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-1d4j0a1`,
                              children: d(M, {
                                children: d(D, {
                                  className: `framer-qylfq0-container`,
                                  isAuthoredByUser: !0,
                                  isModuleExternal: !0,
                                  nodeId: `kn5D8JMnV`,
                                  rendersWithMotion: !0,
                                  scopeId: `Pn95ZS3Nn`,
                                  children: d(V, {
                                    blurAmount: 8,
                                    blurDuration: 0.5,
                                    copiedColor: `rgb(255, 73, 73)`,
                                    copiedDuration: 3,
                                    copiedText: `Copied`,
                                    defaultColor: `rgb(122, 122, 122)`,
                                    defaultText: `For inquiries`,
                                    direction: `Vertical`,
                                    email: `hello@huyml.co`,
                                    emailColor: `rgb(24, 24, 24)`,
                                    font: {
                                      fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                      fontSize: `12px`,
                                      fontStyle: `normal`,
                                      fontWeight: 500,
                                      letterSpacing: `0em`,
                                      lineHeight: `100%`,
                                      textAlign: `left`,
                                    },
                                    height: `100%`,
                                    horizontalGap: 4,
                                    hoverColor: `rgb(122, 122, 122)`,
                                    hoverText: `Click to copy`,
                                    id: `kn5D8JMnV`,
                                    layoutId: `kn5D8JMnV`,
                                    lineColor: `rgb(24, 24, 24)`,
                                    lineDuration: 0.9,
                                    lineExitDuration: 1.15,
                                    lineGap: 2,
                                    lineMode: `Visible`,
                                    lineThickness: 1,
                                    textHeight: 100,
                                    textMode: `Custom`,
                                    uppercase: !1,
                                    useBtGroteskPreset: !1,
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                            d(L, {
                              breakpoint: x,
                              overrides: { coODAmpek: { y: 958 } },
                              children: d(M, {
                                height: 26,
                                children: d(D, {
                                  className: `framer-3djben-container`,
                                  nodeId: `IOsIv8HKI`,
                                  rendersWithMotion: !0,
                                  scopeId: `Pn95ZS3Nn`,
                                  children: d(Fn, {
                                    height: `100%`,
                                    id: `IOsIv8HKI`,
                                    layoutId: `IOsIv8HKI`,
                                    variant: Kn(`YOkwwmVah`),
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                    k() &&
                      d(y.div, {
                        "aria-label": `hideevent`,
                        className: `framer-1wpxql5 hidden-v3tmhq`,
                        layout: O,
                        transformTemplate: qn,
                        children: d(M, {
                          height: 748,
                          y: (f?.y || 0) + 126 + 0,
                          children: d(D, {
                            className: `framer-19tdzre-container`,
                            nodeId: `nYZtN9ElH`,
                            scopeId: `Pn95ZS3Nn`,
                            children: d(L, {
                              breakpoint: x,
                              overrides: {
                                Mo1N6r2DZ: { variant: Kn(`uf7QtVo4Q`) },
                                pNu0WPoUY: { variant: Kn(`W8VQLmvFr`) },
                              },
                              children: d(Ee, {
                                height: `100%`,
                                id: `nYZtN9ElH`,
                                layoutId: `nYZtN9ElH`,
                                variant: Kn(`sggmzhqFZ`),
                                width: `100%`,
                              }),
                            }),
                          }),
                        }),
                      }),
                    d(M, {
                      height: 1e3,
                      width: f?.width || `100vw`,
                      y: 0,
                      children: d(D, {
                        className: `framer-1gdp968-container`,
                        layout: O,
                        layoutScroll: !0,
                        nodeId: `CfmIj9skU`,
                        scopeId: `Pn95ZS3Nn`,
                        children: d(ge, {
                          height: `100%`,
                          id: `CfmIj9skU`,
                          layoutId: `CfmIj9skU`,
                          style: { height: `100%`, width: `100%` },
                          variant: Kn(`FQQkCIBRu`),
                          width: `100%`,
                        }),
                      }),
                    }),
                    j() &&
                      d(y.div, {
                        "aria-label": `hideevent`,
                        className: `framer-1400j4h hidden-16t828t hidden-l56w8y hidden-bn2u7u`,
                        layout: O,
                        transformTemplate: qn,
                        children: d(L, {
                          breakpoint: x,
                          overrides: { coODAmpek: { y: 126 } },
                          children: d(M, {
                            height: 748,
                            children: d(D, {
                              className: `framer-1cocwbb-container`,
                              nodeId: `Tfowl1P66`,
                              scopeId: `Pn95ZS3Nn`,
                              children: d(Ee, {
                                height: `100%`,
                                id: `Tfowl1P66`,
                                layoutId: `Tfowl1P66`,
                                variant: Kn(`EeltZFEZ4`),
                                width: `100%`,
                              }),
                            }),
                          }),
                        }),
                      }),
                  ],
                }),
                d(`div`, { id: `overlay` }),
              ],
            }),
          })
        );
      }),
      [
        `.framer-ddoeI.framer-8tapfb, .framer-ddoeI .framer-8tapfb { display: block; }`,
        `.framer-ddoeI.framer-16t828t { align-content: center; align-items: center; background-color: #ececec; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 1800px; }`,
        `.framer-ddoeI .framer-fi7jd1-container { flex: none; height: auto; left: 135px; pointer-events: none; position: fixed; top: 50%; transform: translateY(-50%); width: 403px; z-index: 10; }`,
        `.framer-ddoeI .framer-1to3and { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 100vh; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 3; }`,
        `.framer-ddoeI .framer-456e3m { align-content: flex-end; align-items: flex-end; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; height: 100%; justify-content: space-between; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1px; }`,
        `.framer-ddoeI .framer-14dn7pd { display: grid; flex: none; gap: 10px 28px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(16, minmax(50px, 1fr)); grid-template-rows: repeat(1, minmax(0, 1fr)); height: min-content; justify-content: center; mix-blend-mode: difference; overflow: var(--overflow-clip-fallback, clip); padding: 20px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-9ureig { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 2; height: min-content; justify-content: flex-start; justify-self: center; min-height: 210px; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-htk8ez { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 2; height: min-content; justify-content: flex-start; justify-self: center; min-height: 179px; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-bs1bw7 { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 2; height: min-content; justify-content: flex-start; justify-self: center; min-height: 203px; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1oz8jbv { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 4; height: min-content; justify-content: flex-start; justify-self: center; min-height: 241px; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-b4915l, .framer-ddoeI .framer-1qbenro { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 5; height: min-content; justify-content: flex-end; justify-self: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-lgnhyv, .framer-ddoeI .framer-1dt7m7n { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 531px; word-break: break-word; word-wrap: break-word; z-index: 2; }`,
        `.framer-ddoeI .framer-s1ov6z, .framer-ddoeI .framer-1kz9a9 { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; height: min-content; justify-content: flex-end; justify-self: center; min-height: 183px; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1jmc5z0 { display: grid; flex: 1 0 0px; gap: 10px 28px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(16, minmax(50px, 1fr)); grid-template-rows: repeat(1, minmax(0, 1fr)); height: 1px; justify-content: center; mix-blend-mode: difference; overflow: visible; padding: 20px; position: relative; width: 100%; z-index: 1; }`,
        `.framer-ddoeI .framer-f5btvi { align-content: flex-start; align-items: flex-start; align-self: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 5; height: min-content; justify-content: flex-start; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-j3r3yi, .framer-ddoeI .framer-9dfkce, .framer-ddoeI .framer-cx72u0, .framer-ddoeI .framer-19qqqdf, .framer-ddoeI .framer-15dr210, .framer-ddoeI .framer-1i1av9p { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
        `.framer-ddoeI .framer-3v741s { align-content: center; align-items: center; align-self: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 5; height: min-content; justify-content: center; justify-self: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-179qscz { align-content: center; align-items: center; aspect-ratio: 1.6365168539325843 / 1; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: auto; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 1324px; }`,
        `.framer-ddoeI .framer-ydesjc-container { flex: 1 0 0px; height: 1px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-msk7a7, .framer-ddoeI .framer-1ku4qbn { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; z-index: 2; }`,
        `.framer-ddoeI .framer-1t7c17n { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 344px; word-break: break-word; word-wrap: break-word; z-index: 2; }`,
        `.framer-ddoeI .framer-1oz53q0 { align-content: flex-start; align-items: flex-start; align-self: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 38px; grid-column: span 5; height: min-content; justify-content: flex-start; justify-self: end; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1stj6ws { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1dykz28 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 0px; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: absolute; top: 50%; transform: translateY(-50%); width: min-content; }`,
        `.framer-ddoeI .framer-121hfp8 { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 2; }`,
        `.framer-ddoeI .framer-16wz6y6 { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100%; justify-content: flex-end; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 4; }`,
        `.framer-ddoeI .framer-1bgdkid-container { flex: none; height: 406px; position: relative; width: 264px; }`,
        `.framer-ddoeI .framer-1kqps7n { display: grid; flex: none; gap: 10px 28px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(16, minmax(50px, 1fr)); grid-template-rows: repeat(1, minmax(0, 1fr)); height: min-content; justify-content: center; mix-blend-mode: difference; overflow: visible; padding: 20px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1i5f2dl { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; grid-column: span 3; height: 100%; justify-content: space-between; justify-self: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-ssuohc, .framer-ddoeI .framer-px7hts, .framer-ddoeI .framer-1v4gd4w, .framer-ddoeI .framer-17tgbca { --framer-paragraph-spacing: 0px; flex: none; height: auto; mix-blend-mode: difference; position: relative; white-space: pre; width: auto; }`,
        `.framer-ddoeI .framer-9wyd2d, .framer-ddoeI .framer-1fzebt0 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
        `.framer-ddoeI .framer-2ybgxs { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; grid-column: span 3; height: 100%; justify-content: space-between; justify-self: center; overflow: visible; padding: 0px; position: relative; width: 100%; z-index: 7; }`,
        `.framer-ddoeI .framer-37ymil { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 1px; height: 187px; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
        `.framer-ddoeI .framer-k9ywrw { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 1px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 196px; }`,
        `.framer-ddoeI .framer-qxso12 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
        `.framer-ddoeI .framer-xx7dcm { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; grid-column: span 4; height: 100%; justify-content: space-between; justify-self: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-eakst1 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 32px; height: 187px; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 220px; }`,
        `.framer-ddoeI .framer-11asnmi { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
        `.framer-ddoeI .framer-zmnetx { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
        `.framer-ddoeI .framer-1tk156i { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; height: 100%; justify-content: space-between; justify-self: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-grpjyv-container { flex: none; height: 100vh; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; z-index: 10; }`,
        `.framer-ddoeI .framer-hr9csh { -webkit-backdrop-filter: blur(8px); align-content: flex-start; align-items: flex-start; backdrop-filter: blur(8px); background-color: rgba(201, 201, 201, 0.72); box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.35); cursor: grab; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 90px; overflow: var(--overflow-clip-fallback, clip); padding: 40px; position: absolute; top: 95px; width: min-content; z-index: 10; }`,
        `.framer-ddoeI .framer-qgmp8u { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 48px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; pointer-events: none; position: relative; width: 571px; }`,
        `.framer-ddoeI .framer-r9d9nb, .framer-ddoeI .framer-ivqna1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-9avzsd { --framer-paragraph-spacing: 0px; flex: none; height: auto; pointer-events: none; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        `.framer-ddoeI .framer-azb9cg, .framer-ddoeI .framer-1ftok1e, .framer-ddoeI .framer-1qi8mto, .framer-ddoeI .framer-1i8bqn1, .framer-ddoeI .framer-27usuf, .framer-ddoeI .framer-uvej35, .framer-ddoeI .framer-1jta5k2, .framer-ddoeI .framer-zqqt12 { --border-bottom-width: 0px; --border-color: rgba(23, 23, 23, 0.5); --border-left-width: 0px; --border-right-width: 0px; --border-style: solid; --border-top-width: 1px; align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 2px; height: min-content; justify-content: flex-start; overflow: visible; padding: 8px 0px 0px 0px; pointer-events: none; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-1wyxq6c, .framer-ddoeI .framer-br1pjw, .framer-ddoeI .framer-7wyw99, .framer-ddoeI .framer-1aqj6y4, .framer-ddoeI .framer-3h7sup, .framer-ddoeI .framer-xy8kqa, .framer-ddoeI .framer-12t54k1, .framer-ddoeI .framer-f0n0g { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 50px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 50%; }`,
        `.framer-ddoeI .framer-6mxb0q, .framer-ddoeI .framer-1wrow1b, .framer-ddoeI .framer-1c3b4fg, .framer-ddoeI .framer-11pcz76, .framer-ddoeI .framer-16fz93, .framer-ddoeI .framer-13iv0uz, .framer-ddoeI .framer-i6n6j, .framer-ddoeI .framer-z85rul { --framer-paragraph-spacing: 0px; flex: none; height: auto; pointer-events: none; position: relative; white-space: pre-wrap; width: 32px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-ddoeI .framer-rcek3s, .framer-ddoeI .framer-rlygzm, .framer-ddoeI .framer-13wvpi8, .framer-ddoeI .framer-18615jp, .framer-ddoeI .framer-a4ubwf, .framer-ddoeI .framer-16k7294, .framer-ddoeI .framer-14cw2vo, .framer-ddoeI .framer-hbucp6, .framer-ddoeI .framer-5bqsit { --framer-paragraph-spacing: 0px; flex: none; height: auto; pointer-events: none; position: relative; white-space: pre; width: auto; }`,
        `.framer-ddoeI .framer-pe9yyj, .framer-ddoeI .framer-14rquhq, .framer-ddoeI .framer-qmo8og, .framer-ddoeI .framer-dhe6hb, .framer-ddoeI .framer-xhtpfj, .framer-ddoeI .framer-1k2ot6c, .framer-ddoeI .framer-ji7ljt, .framer-ddoeI .framer-56mthn { --framer-paragraph-spacing: 0px; flex: 1 0 0px; height: auto; pointer-events: none; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-ddoeI .framer-11biypu { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 24px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-2f5990 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; height: min-content; justify-content: space-between; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-16hnr1m { --framer-paragraph-spacing: 0px; flex: none; height: auto; pointer-events: none; position: relative; white-space: pre-wrap; width: 288px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-ddoeI .framer-d94wmb { align-content: center; align-items: center; cursor: pointer; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 8px; height: min-content; justify-content: flex-start; overflow: hidden; padding: 0px; position: absolute; right: 40px; top: 40px; width: min-content; z-index: 1; }`,
        `.framer-ddoeI .framer-xvk8lt-container, .framer-ddoeI .framer-qylfq0-container { flex: none; height: auto; position: relative; width: auto; }`,
        `.framer-ddoeI .framer-3n1s9c { flex: none; height: 13px; position: relative; width: 13px; }`,
        `.framer-ddoeI .framer-xijbxp { align-content: flex-end; align-items: flex-end; background-color: #ececec; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100vh; justify-content: flex-end; left: 0px; opacity: 0; overflow: var(--overflow-clip-fallback, clip); padding: 16px; pointer-events: none; position: fixed; right: 0px; top: 0px; z-index: 8; }`,
        `.framer-ddoeI .framer-6p8pfa { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; height: 71%; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-5mn74x { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-ddoeI .framer-f5b3wj { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }`,
        `.framer-ddoeI .framer-14hq59q { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 180px; }`,
        `.framer-ddoeI .framer-1vj4k5b-container { flex: none; height: auto; pointer-events: auto; position: relative; width: auto; }`,
        `.framer-ddoeI .framer-1d4j0a1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
        `.framer-ddoeI .framer-3djben-container { bottom: 0px; flex: none; height: auto; position: absolute; right: 0px; width: auto; z-index: 9; }`,
        `.framer-ddoeI .framer-1wpxql5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px; position: absolute; top: 50%; transform: translate(-50%, -50%); width: min-content; z-index: 9; }`,
        `.framer-ddoeI .framer-19tdzre-container, .framer-ddoeI .framer-1cocwbb-container { flex: none; height: auto; position: relative; width: auto; z-index: 9; }`,
        `.framer-ddoeI .framer-1gdp968-container { flex: none; height: 100vh; left: 0px; pointer-events: none; position: fixed; right: 0px; top: 0px; z-index: 10; }`,
        `.framer-ddoeI .framer-1400j4h { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px; position: fixed; top: 50%; transform: translate(-50%, -50%); width: min-content; z-index: 9; }`,
        ...Pe,
        ...K,
        ...le,
        ...Ne,
        `.framer-ddoeI[data-border="true"]::after, .framer-ddoeI [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }`,
        `@media (min-width: 1200px) and (max-width: 1799.98px) { .framer-ddoeI.framer-16t828t { width: 1200px; } .framer-ddoeI .framer-fi7jd1-container { left: 176px; top: 50%; width: 400px; } .framer-ddoeI .framer-14dn7pd, .framer-ddoeI .framer-1jmc5z0, .framer-ddoeI .framer-1kqps7n { gap: 10px 20px; } .framer-ddoeI .framer-b4915l, .framer-ddoeI .framer-1qbenro { overflow: visible; } .framer-ddoeI .framer-lgnhyv { width: 396px; } .framer-ddoeI .framer-179qscz { width: 953px; } .framer-ddoeI .framer-37ymil { height: 158px; } .framer-ddoeI .framer-k9ywrw { gap: 0px; padding: 1px 0px 0px 0px; } .framer-ddoeI .framer-eakst1 { gap: 26px; height: 156px; } .framer-ddoeI .framer-1dt7m7n { width: 382px; } .framer-ddoeI .framer-1fzebt0 { height: 156px; } .framer-ddoeI .framer-hr9csh { padding: 32px; } .framer-ddoeI .framer-qgmp8u { width: 524px; } .framer-ddoeI .framer-1wyxq6c, .framer-ddoeI .framer-br1pjw, .framer-ddoeI .framer-7wyw99, .framer-ddoeI .framer-1aqj6y4, .framer-ddoeI .framer-3h7sup, .framer-ddoeI .framer-xy8kqa, .framer-ddoeI .framer-12t54k1, .framer-ddoeI .framer-f0n0g { gap: 54px; } .framer-ddoeI .framer-11biypu { gap: 32px; } .framer-ddoeI .framer-16hnr1m { width: 261px; } .framer-ddoeI .framer-d94wmb { right: 32px; top: 32px; } .framer-ddoeI .framer-3n1s9c { height: 12px; width: 12px; }}`,
        `@media (min-width: 2200px) { .framer-ddoeI.framer-16t828t { width: 2200px; } .framer-ddoeI .framer-fi7jd1-container { left: 400px; top: 50%; width: 500px; } .framer-ddoeI .framer-lgnhyv { width: 667px; } .framer-ddoeI .framer-179qscz { width: 1614px; } .framer-ddoeI .framer-37ymil { height: 219px; } .framer-ddoeI .framer-k9ywrw { gap: 8px; } .framer-ddoeI .framer-eakst1 { gap: 39px; height: 218px; } .framer-ddoeI .framer-1qbenro { overflow: visible; } .framer-ddoeI .framer-1dt7m7n { width: 656px; } .framer-ddoeI .framer-1fzebt0 { height: 218px; } .framer-ddoeI .framer-qgmp8u { width: 697px; } .framer-ddoeI .framer-r9d9nb, .framer-ddoeI .framer-ivqna1 { gap: 20px; } .framer-ddoeI .framer-1wyxq6c, .framer-ddoeI .framer-br1pjw, .framer-ddoeI .framer-7wyw99, .framer-ddoeI .framer-1aqj6y4, .framer-ddoeI .framer-3h7sup, .framer-ddoeI .framer-xy8kqa, .framer-ddoeI .framer-12t54k1, .framer-ddoeI .framer-f0n0g { gap: 57px; width: 46%; } .framer-ddoeI .framer-11biypu { gap: 48px; } .framer-ddoeI .framer-16hnr1m { width: 380px; }}`,
        `@media (max-width: 1199.98px) { .framer-ddoeI.framer-16t828t { width: 384px; } .framer-ddoeI .framer-fi7jd1-container { left: 32px; order: 3; right: 32px; top: 96px; transform: unset; width: unset; } .framer-ddoeI .framer-1to3and { flex-direction: column; height: min-content; justify-content: flex-start; order: 0; } .framer-ddoeI .framer-456e3m { flex: none; gap: 10px; height: min-content; justify-content: flex-start; width: 100%; } .framer-ddoeI .framer-1jmc5z0 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 9px; height: min-content; order: 0; padding: 80px 20px 20px 20px; z-index: 6; } .framer-ddoeI .framer-f5btvi { align-content: center; align-items: center; align-self: unset; gap: 24px; height: 221px; justify-content: center; order: 1; } .framer-ddoeI .framer-3v741s { align-self: unset; gap: 24px; order: 0; padding: 0px 0px 80px 0px; } .framer-ddoeI .framer-msk7a7, .framer-ddoeI .framer-grpjyv-container { order: 1; } .framer-ddoeI .framer-1ku4qbn { order: 2; } .framer-ddoeI .framer-1t7c17n { order: 0; } .framer-ddoeI .framer-1oz53q0 { align-content: center; align-items: center; align-self: unset; gap: 24px; height: 186px; justify-content: flex-end; order: 3; pointer-events: none; } .framer-ddoeI .framer-1stj6ws { justify-content: center; } .framer-ddoeI .framer-16wz6y6 { align-self: unset; height: 336px; order: 2; width: 264px; } .framer-ddoeI .framer-1kqps7n { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 38px; order: 2; padding: 16px 20px 20px 20px; z-index: 2; } .framer-ddoeI .framer-1i5f2dl { align-self: unset; gap: 24px; height: min-content; justify-content: center; order: 2; } .framer-ddoeI .framer-2ybgxs { align-self: unset; gap: 24px; height: min-content; justify-content: center; order: 4; } .framer-ddoeI .framer-37ymil, .framer-ddoeI .framer-eakst1 { height: min-content; } .framer-ddoeI .framer-k9ywrw { gap: 2px; } .framer-ddoeI .framer-xx7dcm { align-self: unset; gap: 24px; height: min-content; justify-content: center; order: 3; } .framer-ddoeI .framer-1tk156i { align-self: unset; gap: 24px; height: min-content; justify-content: center; order: 1; } .framer-ddoeI .framer-hr9csh { left: 16px; order: 2; padding: 24px 24px 78px 24px; right: 16px; width: unset; } .framer-ddoeI .framer-qgmp8u { flex: 1 0 0px; gap: 32px; width: 1px; } .framer-ddoeI .framer-azb9cg { flex-direction: column; gap: 16px; } .framer-ddoeI .framer-1wyxq6c, .framer-ddoeI .framer-br1pjw, .framer-ddoeI .framer-7wyw99, .framer-ddoeI .framer-1aqj6y4, .framer-ddoeI .framer-3h7sup, .framer-ddoeI .framer-xy8kqa, .framer-ddoeI .framer-12t54k1, .framer-ddoeI .framer-f0n0g { gap: unset; justify-content: space-between; width: 100%; } .framer-ddoeI .framer-rcek3s, .framer-ddoeI .framer-13wvpi8, .framer-ddoeI .framer-18615jp, .framer-ddoeI .framer-a4ubwf, .framer-ddoeI .framer-16k7294, .framer-ddoeI .framer-14cw2vo, .framer-ddoeI .framer-hbucp6, .framer-ddoeI .framer-5bqsit { white-space: pre-wrap; width: 147px; word-break: break-word; word-wrap: break-word; } .framer-ddoeI .framer-pe9yyj, .framer-ddoeI .framer-14rquhq, .framer-ddoeI .framer-qmo8og, .framer-ddoeI .framer-dhe6hb, .framer-ddoeI .framer-xhtpfj, .framer-ddoeI .framer-1k2ot6c, .framer-ddoeI .framer-ji7ljt, .framer-ddoeI .framer-56mthn { flex: none; width: 100%; } .framer-ddoeI .framer-11biypu { gap: 20px; } .framer-ddoeI .framer-16hnr1m { width: 149px; } .framer-ddoeI .framer-1ftok1e, .framer-ddoeI .framer-1qi8mto, .framer-ddoeI .framer-1i8bqn1, .framer-ddoeI .framer-27usuf, .framer-ddoeI .framer-uvej35, .framer-ddoeI .framer-1jta5k2, .framer-ddoeI .framer-zqqt12 { flex-direction: column; gap: 14px; } .framer-ddoeI .framer-d94wmb { bottom: 24px; right: 24px; top: unset; } .framer-ddoeI .framer-xijbxp { order: 4; } .framer-ddoeI .framer-1gdp968-container { order: 6; } .framer-ddoeI .framer-1400j4h { order: 7; }}`,
      ],
      `framer-ddoeI`,
    )),
    (Zn.displayName = `Home`),
    (Zn.defaultProps = { height: 1080, width: 1800 }),
    T(
      Zn,
      [
        {
          explicitInter: !0,
          fonts: [
            {
              cssFamilyName: `BT Glyphius Regular`,
              source: `custom`,
              style: `normal`,
              uiFamilyName: `BT Glyphius`,
              url: `https://framerusercontent.com/assets/xirQ3g4Sv5q7MG0KvL1PiOOLLBA.woff2`,
              weight: `400`,
            },
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
              cssFamilyName: `BT Grotesk Bold`,
              source: `custom`,
              style: `normal`,
              uiFamilyName: `BT Grotesk`,
              url: `https://framerusercontent.com/assets/7wvwHnWrXSgYhuk2mEt4LrDGXo.woff2`,
              weight: `700`,
            },
            {
              cssFamilyName: `BT Grotesk Medium`,
              source: `custom`,
              style: `normal`,
              uiFamilyName: `BT Grotesk`,
              url: `https://framerusercontent.com/assets/pczyWZYmicHp9LhGgMJo7tnDcHo.woff2`,
              weight: `500`,
            },
          ],
        },
        ...bn,
        ...xn,
        ...On,
        ...kn,
        ...Mn,
        ...Nn,
        ...Pn,
        ...Ln,
        ...Rn,
        ...B(Ie),
        ...B(pe),
        ...B(fe),
        ...B(Fe),
      ],
      { supportsExplicitInterCodegen: !0 },
    ),
    (Zn.loader = {
      load: (e, t) => (
        t.locale,
        Promise.allSettled([
          S(ze, {}, t),
          S(Z, {}, t),
          S(Ee, {}, t),
          S(ge, {}, t),
        ])
      ),
    }),
    (Qn = {
      exports: {
        queryParamNames: {
          type: `variable`,
          annotations: { framerContractVersion: `1` },
        },
        Props: { type: `tsType`, annotations: { framerContractVersion: `1` } },
        default: {
          type: `reactComponent`,
          name: `FramerPn95ZS3Nn`,
          slots: [],
          annotations: {
            framerAcceptsLayoutTemplate: `true`,
            framerScrollSections: `false`,
            framerAutoSizeImages: `true`,
            framerRootFontSize: `12`,
            framerComponentViewportWidth: `true`,
            framerImmutableVariables: `true`,
            framerResponsiveScreen: `true`,
            framerLayoutTemplateFlowEffect: `true`,
            framerIntrinsicHeight: `1080`,
            framerColorSyntax: `true`,
            framerIntrinsicWidth: `1800`,
            framerContractVersion: `1`,
            framerCanvasComponentVariantDetails: `{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"Mo1N6r2DZ":{"layout":["fixed","auto"]},"pNu0WPoUY":{"layout":["fixed","auto"]},"coODAmpek":{"layout":["fixed","auto"]}}}`,
            framerDisplayContentsDiv: `false`,
          },
        },
        __FramerMetadata__: { type: `variable` },
      },
    }));
})();
export { Qn as __FramerMetadata__, Zn as default, Vn as queryParamNames };
//# sourceMappingURL=g_J7fw8947nOFFEKpyiFbTOe_r5eL4JdNvH639sEFFc.DCOobn8N.mjs.map
