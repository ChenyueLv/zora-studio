import { t as e } from "./rolldown-runtime.Dh6celcD.mjs";
import {
  E as t,
  I as n,
  M as r,
  N as i,
  O as a,
  R as o,
  S as s,
  _ as c,
  c as l,
  g as u,
  h as d,
  j as f,
  k as p,
  l as m,
  o as h,
} from "./react.BaDOPo3t.mjs";
import { a as g, r as _, t as v, x as y } from "./motion.BPkLvCVm.mjs";
import {
  A as ee,
  E as b,
  G as x,
  M as S,
  R as C,
  S as w,
  T,
  V as E,
  Z as D,
  _t as O,
  a as k,
  b as te,
  ct as A,
  dt as j,
  gt as M,
  i as N,
  it as ne,
  l as re,
  lt as ie,
  m as ae,
  mt as P,
  o as F,
  ot as I,
  pt as L,
  rt as oe,
  st as R,
  ut as se,
  v as z,
  x as ce,
  yt as B,
  z as V,
} from "./framer.BeBZUbg6.mjs";
import {
  A as le,
  B as ue,
  D as de,
  E as fe,
  F as pe,
  M as me,
  N as he,
  O as ge,
  P as _e,
  S as ve,
  V as ye,
  _ as be,
  b as xe,
  d as Se,
  f as H,
  g as Ce,
  h as we,
  i as Te,
  j as Ee,
  k as De,
  m as Oe,
  o as ke,
  p as Ae,
  u as je,
  v as Me,
  x as Ne,
  y as Pe,
} from "./shared-lib.DyD4REXM.mjs";
import {
  a as Fe,
  c as Ie,
  i as Le,
  n as Re,
  o as U,
  r as ze,
  s as Be,
  t as Ve,
} from "./LKjkg9Djy.C-MTg-Qi.mjs";
import { n as He, t as Ue } from "./ClCkXw_3x.Bu29yPTQ.mjs";
import { n as We, t as W } from "./Imagepanalax.xyrSBUEg.mjs";
import Ge, {
  t as G,
} from "./fVzhZI22TmH-GvlEKMvRzusG5Ui9mOZ1yvbQF2giHM0.D6ac_yhk.mjs";
function K(e) {
  return (t) => {
    let [n, r] = i(!1);
    return (
      f(() => {
        if (o === void 0 || typeof document > `u`) return;
        let e = null,
          t = null,
          n = null,
          i = (e) => {
            u(() => {
              r((t) => (t === e ? t : e));
            });
          },
          a = () => {
            if (!e) {
              i(!1);
              return;
            }
            let t = Math.max(1, e.scrollHeight - e.clientHeight),
              n = e.scrollTop / t;
            i(n >= Ye);
          },
          s = () => {
            let n = Ke(Je),
              r = n ? qe(n) : null;
            if (!r) {
              (i(!1), (t = o.setTimeout(s, 250)));
              return;
            }
            e !== r &&
              (e?.removeEventListener(`scroll`, a),
              (e = r),
              e.addEventListener(`scroll`, a, { passive: !0 }),
              a());
          };
        return (
          s(),
          (n = new MutationObserver(() => {
            (t !== null && (o.clearTimeout(t), (t = null)), s());
          })),
          n.observe(document.body, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: [`aria-label`, `style`, `class`],
          }),
          o.addEventListener(`resize`, s),
          () => {
            (e?.removeEventListener(`scroll`, a),
              n?.disconnect(),
              t !== null && o.clearTimeout(t),
              o.removeEventListener(`resize`, s));
          }
        );
      }, []),
      l(e, {
        ...t,
        style: {
          ...(t?.style || {}),
          opacity: +!n,
          filter: n ? `blur(14px)` : `blur(0px)`,
          transition: `opacity 1s cubic-bezier(0.22, 1, 0.36, 1), filter 1s cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: `opacity, filter`,
        },
      })
    );
  };
}
function Ke(e) {
  let t = e.toLowerCase();
  return (
    Array.from(document.querySelectorAll(`[aria-label]`)).find(
      (e) => e.getAttribute(`aria-label`)?.toLowerCase() === t,
    ) || null
  );
}
function qe(e) {
  if (q(e)) return e;
  let t = Array.from(e.querySelectorAll(`*`)).find(q);
  if (t) return t;
  let n = e.parentElement;
  for (; n;) {
    if (q(n)) return n;
    n = n.parentElement;
  }
  return null;
}
function q(e) {
  let t = o.getComputedStyle(e),
    n = t.overflowY,
    r = t.overflow;
  return (
    (/(auto|scroll|overlay)/.test(n) || /(auto|scroll|overlay)/.test(r)) &&
    e.scrollHeight > e.clientHeight + 1
  );
}
var Je,
  Ye,
  Xe = e(() => {
    (n(), h(), s(), (Je = `scrollarea`), (Ye = 0.05));
  });
function Ze(e) {
  return (t) => {
    let [n, r] = i(!1);
    return (
      f(() => {
        if (o === void 0 || typeof document > `u`) return;
        let e = null,
          t = null,
          n = null,
          i = null,
          a = (e) => {
            r((t) => (t === e ? t : e));
          },
          s = () => {
            e &&= (e.disconnect(), null);
          },
          c = () => {
            let t = document.querySelector(`[aria-label="${tt}"]`);
            if (!t) {
              (a(!1), (n = o.setTimeout(c, 250)));
              return;
            }
            if (i === t && e) return;
            ((i = t), s());
            let r = Qe(t);
            ((e = new IntersectionObserver(
              (e) => {
                let t = e[0];
                a(!!t?.isIntersecting);
              },
              { root: r, threshold: 0 },
            )),
              e.observe(t));
          };
        return (
          c(),
          (t = new MutationObserver(() => {
            (n !== null && (o.clearTimeout(n), (n = null)), c());
          })),
          t.observe(document.body, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: [`aria-label`, `style`, `class`],
          }),
          o.addEventListener(`resize`, c),
          () => {
            (s(),
              t && t.disconnect(),
              n !== null && o.clearTimeout(n),
              o.removeEventListener(`resize`, c));
          }
        );
      }, []),
      l(e, {
        ...t,
        style: {
          ...(t?.style || {}),
          opacity: n ? 0 : (t?.style?.opacity ?? 1),
          transition: $e(t?.style?.transition, nt),
          willChange: et(t?.style?.willChange, `opacity`),
        },
      })
    );
  };
}
function Qe(e) {
  let t = e.parentElement;
  for (; t;) {
    let e = o.getComputedStyle(t),
      n = e.overflowY,
      r = e.overflow;
    if (
      (/(auto|scroll|overlay)/.test(n) || /(auto|scroll|overlay)/.test(r)) &&
      t.scrollHeight > t.clientHeight + 1
    )
      return t;
    t = t.parentElement;
  }
  return null;
}
function $e(e, t) {
  return !e || e === `none` ? t : `${e}, ${t}`;
}
function et(e, t) {
  return !e || e === `auto` ? t : `${e}, ${t}`;
}
var tt,
  nt,
  rt = e(() => {
    (n(),
      h(),
      s(),
      (tt = `hideinfo`),
      (nt = `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0s`));
  });
function it(e) {
  let {
      targetAriaLabel: n,
      fitContent: r,
      maxVisibleItems: a,
      itemWidth: s,
      itemHeight: c,
      itemGap: d,
      paddingX: h,
      paddingY: g,
      outlineWidth: _,
      minOutlineHeight: v,
      bottomOvershoot: y,
      itemBackground: ee,
      outlineColor: b,
      outlineStroke: x,
      style: S,
    } = e,
    C = t(null),
    w = t(null),
    T = t(null),
    E = t(0),
    D = t(0),
    O = t([]),
    k = t({
      maxContentOffset: 0,
      maxOutlineTravel: 0,
      visualContentHeight: 0,
      visibleTrackHeight: 0,
      outlineHeight: 0,
      minOutlineHeight: 0,
      itemRanges: [],
    }),
    A = t(null),
    j = t(null),
    [M, N] = i(!1),
    [ne, re] = i(!1),
    [ie, ae] = i(yt),
    [P, F] = i({ width: 64, height: 400 }),
    I = te.current() === te.canvas,
    L = (e) => {
      let t = J(e, 0, 1),
        { maxContentOffset: n, maxOutlineTravel: r } = k.current;
      (w.current &&
        (w.current.style.transform = `translate3d(0, ${-n * t}px, 0)`),
        T.current &&
          (T.current.style.transform = `translate3d(0, ${r * t}px, 0)`));
    },
    oe = (e, t) => {
      let n = O.current,
        r = k.current,
        i = Math.min(n.length, r.itemRanges.length);
      if (i <= 0 || r.visualContentHeight <= 0) {
        L(e.progress);
        return;
      }
      let a = t.getViewportSize() + t.getMaxScroll(),
        o = t.getScrollTop(),
        s = o + t.getViewportSize(),
        c = mt(o, n, r.itemRanges, i, a, r.visualContentHeight),
        l = J(
          mt(s, n, r.itemRanges, i, a, r.visualContentHeight) - c,
          r.minOutlineHeight,
          Math.max(r.visibleTrackHeight, r.minOutlineHeight),
        ),
        u = Math.max(r.visualContentHeight - l, 0),
        d = J(c, 0, u),
        f = u <= 0 ? e.progress : d / u,
        p = r.maxContentOffset * f,
        m = J(d - p, 0, Math.max(r.visibleTrackHeight - l, 0));
      (w.current && (w.current.style.transform = `translate3d(0, ${-p}px, 0)`),
        T.current &&
          ((T.current.style.height = `${l}px`),
          (T.current.style.transform = `translate3d(0, ${m}px, 0)`)));
    },
    R = p(
      () =>
        [
          e.image1,
          e.image2,
          e.image3,
          e.image4,
          e.image5,
          e.image6,
          e.image7,
          e.image8,
          e.image9,
          e.image10,
          e.image11,
          e.image12,
          e.image13,
          e.image14,
          e.image15,
          e.image16,
          e.image17,
          e.image18,
          e.image19,
          e.image20,
        ].filter((e) => !!e?.src),
      [
        e.image1,
        e.image2,
        e.image3,
        e.image4,
        e.image5,
        e.image6,
        e.image7,
        e.image8,
        e.image9,
        e.image10,
        e.image11,
        e.image12,
        e.image13,
        e.image14,
        e.image15,
        e.image16,
        e.image17,
        e.image18,
        e.image19,
        e.image20,
      ],
    ),
    se = Math.min(s, Math.max(P.width - h * 2, 1)),
    [z, ce] = i([]);
  f(() => {
    if (!M) return;
    let e = !0;
    return (
      (async () => {
        let t = R.map(
            (t) =>
              new Promise((n) => {
                if (!t.src) {
                  n(c / s);
                  return;
                }
                let r = new Image();
                ((r.onload = () => {
                  e &&
                    (r.naturalWidth > 0 && r.naturalHeight > 0
                      ? n(r.naturalHeight / r.naturalWidth)
                      : n(c / s));
                }),
                  (r.onerror = () => {
                    n(c / s);
                  }),
                  (r.src = t.src));
              }),
          ),
          n = await Promise.all(t);
        e &&
          u(() => {
            ce(n);
          });
      })(),
      () => {
        e = !1;
      }
    );
  }, [R, M, s, c]);
  let B = p(
    () =>
      z.length === R.length ? z.map((e) => se * e) : Array(R.length).fill(c),
    [z, R.length, se, c],
  );
  (f(() => {
    u(() => {
      N(!0);
    });
  }, []),
    f(() => {
      let e = C.current;
      if (!e) return;
      let t = () => {
        let t = e.getBoundingClientRect();
        u(() => {
          F({ width: Math.max(t.width, 1), height: Math.max(t.height, 1) });
        });
      };
      if ((t(), typeof ResizeObserver > `u`)) return;
      let n = new ResizeObserver(t);
      return (
        n.observe(e),
        () => {
          n.disconnect();
        }
      );
    }, []),
    f(() => {
      if (!M || I) return;
      let e = ct(n);
      A.current = e;
      let t = 0,
        r = 0,
        i = () => {
          (o.dispatchEvent(
            new CustomEvent(bt, { detail: { targetAriaLabel: n } }),
          ),
            j.current !== null && o.clearTimeout(j.current),
            (j.current = o.setTimeout(() => {
              (o.dispatchEvent(
                new CustomEvent(xt, { detail: { targetAriaLabel: n } }),
              ),
                (j.current = null));
            }, St)));
        },
        a = () => {
          t = 0;
          let n = ot(e);
          ((D.current = n.progress),
            oe(n, e),
            i(),
            ae((e) =>
              Math.abs(e.viewportRatio - n.viewportRatio) < 1e-5
                ? e
                : { progress: 0, viewportRatio: n.viewportRatio },
            ));
        },
        s = () => {
          t ||= o.requestAnimationFrame(a);
        },
        c = e.getRootElement(),
        l = typeof ResizeObserver < `u` ? new ResizeObserver(() => f()) : null,
        u = new MutationObserver(() => {
          f();
        }),
        d = () => {
          ((r = 0),
            (O.current = ut(e, wt)),
            l?.disconnect(),
            l?.observe(c),
            lt(c, wt).forEach((e) => l?.observe(e)),
            s());
        };
      function f() {
        r ||= o.requestAnimationFrame(d);
      }
      return (
        d(),
        e.listen(s),
        o.addEventListener(`resize`, s),
        u.observe(c, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: [`aria-label`],
        }),
        () => {
          (t && o.cancelAnimationFrame(t),
            r && o.cancelAnimationFrame(r),
            l?.disconnect(),
            u.disconnect(),
            e.unlisten(s),
            o.removeEventListener(`resize`, s),
            j.current !== null &&
              (o.clearTimeout(j.current), (j.current = null)));
        }
      );
    }, [I, M, n]),
    f(() => {
      if (!M || I || !ne) return;
      let e = (e) => {
          let t = C.current;
          if (!t) return;
          let n = t.getBoundingClientRect(),
            r = at(P.width, P.height, R.length, a, s, B, d, h, g, ie, _, v, y),
            i = J(
              e.clientY - n.top - r.contentTop - E.current,
              0,
              r.maxOutlineTravel,
            ),
            o = r.maxOutlineTravel <= 0 ? 0 : i / r.maxOutlineTravel;
          ((D.current = o), L(o), st(o, A.current));
        },
        t = () => {
          u(() => {
            re(!1);
          });
        };
      return (
        o.addEventListener(`pointermove`, e),
        o.addEventListener(`pointerup`, t),
        () => {
          (o.removeEventListener(`pointermove`, e),
            o.removeEventListener(`pointerup`, t));
        }
      );
    }, [P.height, P.width, I, M, ne, d, B, s, a, ie, v, y, _, h, g, R.length]));
  let V = at(P.width, P.height, R.length, a, s, B, d, h, g, ie, _, v, y);
  ((k.current = {
    maxContentOffset: V.maxContentOffset,
    maxOutlineTravel: V.maxOutlineTravel,
    visualContentHeight: V.visualContentHeight,
    visibleTrackHeight: V.scaledContentHeight,
    outlineHeight: V.outlineHeight,
    minOutlineHeight: v,
    itemRanges: pt(B, d, V.frameInset),
  }),
    f(() => {
      let e = A.current;
      if (e) {
        oe(ot(e), e);
        return;
      }
      L(D.current);
    }, [
      V.maxContentOffset,
      V.maxOutlineTravel,
      V.outlineHeight,
      V.scaledContentHeight,
      V.visualContentHeight,
      B,
      d,
      v,
    ]));
  let le =
    (g * 2 +
      Math.max(
        V.visualViewportHeight + V.bottomOvershoot,
        R.length > 0 ? V.outlineHeight + V.bottomOvershoot : 0,
      )) *
    Tt;
  return l(`div`, {
    id: `minimapscroll`,
    ref: C,
    style: {
      width: `100%`,
      height: r ? le : `100%`,
      position: `relative`,
      overflow: `hidden`,
      cursor: I ? `default` : ne ? `grabbing` : `grab`,
      touchAction: `none`,
      userSelect: `none`,
      WebkitUserSelect: `none`,
      ...S,
    },
    onPointerDown: (e) => {
      if (I || R.length === 0) return;
      let t = C.current;
      if (!t) return;
      let n = t.getBoundingClientRect(),
        r = e.clientY - n.top,
        i = V.contentTop + V.maxOutlineTravel * D.current,
        a = i + V.outlineHeight;
      if (r >= i && r <= a) E.current = r - i;
      else {
        E.current = V.outlineHeight / 2;
        let e = J(
          (r - V.contentTop - V.outlineHeight / 2) /
            Math.max(V.maxOutlineTravel, 1),
          0,
          1,
        );
        ((D.current = e), L(e), st(e, A.current));
      }
      u(() => {
        re(!0);
      });
    },
    children: m(`div`, {
      style: {
        width: `100%`,
        height: `100%`,
        paddingLeft: h,
        paddingRight: h,
        paddingTop: g,
        paddingBottom: g,
        position: `relative`,
        boxSizing: `border-box`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `flex-start`,
        justifyContent: `flex-start`,
        gap: d,
        overflow: `hidden`,
      },
      children: [
        l(`div`, {
          style: {
            width: `100%`,
            height: V.scaledContentHeight,
            position: `relative`,
            overflow: `hidden`,
          },
          children: l(`div`, {
            ref: w,
            style: {
              position: `absolute`,
              inset: 0,
              height: V.visualContentHeight,
              pointerEvents: `none`,
              transform: `translate3d(0, 0, 0)`,
              willChange: `transform`,
            },
            children: (() => {
              let e = V.frameInset;
              return R.map((t, n) => {
                let r = B[n] ?? c,
                  i = e;
                return (
                  (e += r + d),
                  l(
                    `div`,
                    {
                      style: {
                        width: V.itemWidth,
                        height: r,
                        position: `absolute`,
                        left: V.itemLeft,
                        top: i,
                        background: ee,
                        overflow: `hidden`,
                        pointerEvents: `none`,
                      },
                      children: l(`img`, {
                        src: t.src,
                        srcSet: t.srcSet,
                        alt: t.alt || `Preview ${n + 1}`,
                        style: {
                          width: `100%`,
                          height: `100%`,
                          display: `block`,
                          objectFit: `cover`,
                          pointerEvents: `none`,
                          userSelect: `none`,
                          WebkitUserDrag: `none`,
                        },
                      }),
                    },
                    `${t.src}-${n}`,
                  )
                );
              });
            })(),
          }),
        }),
        R.length > 0 &&
          l(`div`, {
            ref: T,
            style: {
              width: _,
              height: V.outlineHeight,
              left: V.outlineLeft,
              top: V.contentTop,
              position: `absolute`,
              border: `${x}px solid ${b}`,
              boxSizing: `border-box`,
              pointerEvents: `none`,
              transform: `translate3d(0, 0, 0)`,
              willChange: `transform`,
            },
          }),
      ],
    }),
  });
}
function at(e, t, n, r, i, a, o, s, c, l, u, d, f) {
  let p = Math.max(n, 0),
    m = J(Math.round(r), 1, 20),
    h = Math.min(i, Math.max(e - s * 2, 1)),
    g = (e) =>
      Array.isArray(a) ? (a[e] ?? (typeof a[0] == `number` ? a[0] : 24)) : a,
    _ =
      p <= 0
        ? 0
        : (() => {
            let e = 0;
            for (let t = 0; t < p; t++) e += g(t);
            return e + Math.max(p - 1, 0) * o;
          })(),
    v = Math.min(p, m),
    y =
      v <= 0
        ? 0
        : (() => {
            let e = 0;
            for (let t = 0; t < v; t++) e += g(t);
            return e + Math.max(v - 1, 0) * o;
          })(),
    ee = Math.max(t - c * 2, 1),
    b = 0,
    x = d,
    S = v > 0 ? y : 0,
    C = p > 0 ? _ : 0,
    w = Math.min(C, ee),
    T = g(0);
  for (let e = 0; e < 4; e++)
    ((x = J(w * l.viewportRatio, d, Math.max(w, d))),
      (b = Math.max((x - T) / 2, 0)),
      (S = v > 0 ? y + b * 2 : 0),
      (C = p > 0 ? _ + b * 2 : 0),
      (w = Math.min(C, ee)));
  let E = c,
    D = p > 0 ? f : 0,
    O = Math.max(w - x, 0),
    k = Math.max(C - w, 0),
    te = k * l.progress;
  return {
    scaledContentHeight: w,
    contentHeight: _,
    visualContentHeight: C,
    visualViewportHeight: S,
    contentTop: E,
    contentOffset: te,
    frameInset: b,
    outlineHeight: x,
    outlineOffset: O * l.progress,
    maxOutlineTravel: O,
    maxContentOffset: k,
    outlineLeft: (e - u) / 2 - s + Ct,
    itemLeft: (e - h) / 2 - s,
    itemWidth: h,
    bottomOvershoot: D,
  };
}
function ot(e) {
  if (!e || typeof document > `u`) return yt;
  let t = e.getViewportSize(),
    n = Math.max(e.getMaxScroll(), 0),
    r = n === 0 ? 0 : e.getScrollTop() / n,
    i = t + n,
    a = i <= 0 ? yt.viewportRatio : J(t / i, 0.08, 1);
  return { progress: J(r, 0, 1), viewportRatio: a };
}
function st(e, t) {
  if (!t) return;
  let n = Math.max(t.getMaxScroll(), 0);
  t.scrollTo(n * J(e, 0, 1));
}
function ct(e) {
  if (o === void 0 || typeof document > `u`) return _t();
  let t = e.trim();
  if (t) {
    let e = document.querySelector(`[aria-label="${vt(t)}"]`);
    if (e) {
      let t = ht(e);
      if (t) return gt(t);
    }
  }
  return _t();
}
function lt(e, t) {
  let n = `[aria-label="${vt(t)}"]`,
    r = Array.from(e.querySelectorAll(n));
  return (e.matches(n) && r.unshift(e), r);
}
function ut(e, t) {
  let n = e.getRootElement(),
    r =
      n === document.documentElement ||
      n === document.body ||
      n === document.scrollingElement,
    i = e.getScrollTop();
  return lt(n, t)
    .map((e) => {
      let t = dt(e, n, r),
        a = t ? t.top : ft(e, n, r, i);
      return { top: a, bottom: a + (t?.height || e.offsetHeight) };
    })
    .filter(
      (e) =>
        Number.isFinite(e.top) && Number.isFinite(e.bottom) && e.bottom > e.top,
    )
    .sort((e, t) => e.top - t.top);
}
function dt(e, t, n) {
  let r = e,
    i = 0,
    a = 0;
  for (; r && a < 100;)
    if (
      (!n && r === t) ||
      ((i += r.offsetTop), (r = r.offsetParent), (a += 1), n && !r)
    )
      return { top: i, height: e.offsetHeight };
  return null;
}
function ft(e, t, n, r) {
  let i = e.getBoundingClientRect();
  if (n) return i.top + r;
  let a = t.getBoundingClientRect(),
    o = t.offsetHeight || t.clientHeight,
    s = o > 0 && a.height > 0 ? a.height / o : 1;
  return (i.top - a.top) / Math.max(s, 1e-4) + r - t.clientTop;
}
function pt(e, t, n) {
  let r = n;
  return e.map((e) => {
    let n = { top: r, bottom: r + e };
    return ((r += e + t), n);
  });
}
function mt(e, t, n, r, i, a) {
  let o = J(e, 0, Math.max(i, 0));
  if (r <= 0) return a * (o / i || 0);
  let s = (e, t, n, r) => {
      let i = t - e;
      if (i <= 1e-4) return r;
      let a = J((o - e) / i, 0, 1);
      return n + (r - n) * a;
    },
    c = t[0],
    l = n[0];
  if (o <= c.top) return s(0, c.top, 0, l.top);
  for (let e = 0; e < r; e += 1) {
    let i = t[e],
      a = n[e];
    if (o <= i.bottom) return s(i.top, i.bottom, a.top, a.bottom);
    if (e >= r - 1) break;
    let c = t[e + 1],
      l = n[e + 1];
    if (o <= c.top) return s(i.bottom, c.top, a.bottom, l.top);
  }
  let u = t[r - 1],
    d = n[r - 1];
  return s(u.bottom, i, d.bottom, a);
}
function ht(e) {
  return (
    [e, ...Array.from(e.querySelectorAll(`*`))]
      .filter((e) => {
        if (e.scrollHeight <= e.clientHeight + 1) return !1;
        let t = o.getComputedStyle(e);
        return /(auto|scroll|overlay)/.test(`${t.overflowY} ${t.overflow}`);
      })
      .sort(
        (e, t) =>
          t.scrollHeight - t.clientHeight - (e.scrollHeight - e.clientHeight),
      )[0] || null
  );
}
function gt(e) {
  return {
    getMaxScroll: () => Math.max(e.scrollHeight - e.clientHeight, 0),
    getScrollTop: () => e.scrollTop,
    getViewportSize: () => e.clientHeight,
    scrollTo: (t) => {
      e.scrollTo({ top: t, behavior: `auto` });
    },
    listen: (t) => {
      e.addEventListener(`scroll`, t, { passive: !0 });
    },
    unlisten: (t) => {
      e.removeEventListener(`scroll`, t);
    },
    getRootElement: () => e,
  };
}
function _t() {
  return {
    getMaxScroll: () => {
      let e = document.documentElement;
      return Math.max(e.scrollHeight - o.innerHeight, 0);
    },
    getScrollTop: () => o.scrollY,
    getViewportSize: () => o.innerHeight,
    scrollTo: (e) => {
      o.scrollTo({ top: e, behavior: `auto` });
    },
    listen: (e) => {
      o.addEventListener(`scroll`, e, { passive: !0 });
    },
    unlisten: (e) => {
      o.removeEventListener(`scroll`, e);
    },
    getRootElement: () => document.documentElement,
  };
}
function vt(e) {
  return e.replace(/\\/g, `\\\\`).replace(/"/g, `\\"`);
}
function J(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
var yt,
  bt,
  xt,
  St,
  Ct,
  wt,
  Tt,
  Et = e(() => {
    (n(),
      h(),
      x(),
      s(),
      (yt = { progress: 0, viewportRatio: 0.2 }),
      (bt = `minimapscroll:active`),
      (xt = `minimapscroll:idle`),
      (St = 120),
      (Ct = 1),
      (wt = `ParallaxScrollImage`),
      (Tt = 2),
      (it.defaultProps = {
        targetAriaLabel: `Imgaeproject`,
        fitContent: !1,
        maxVisibleItems: 10,
        itemWidth: 39,
        itemHeight: 24,
        itemGap: 8,
        paddingX: 10,
        paddingY: 16,
        outlineWidth: 74,
        minOutlineHeight: 37,
        bottomOvershoot: 8,
        itemBackground: `#ACACAC`,
        outlineColor: `#C1C1C1`,
        outlineStroke: 1,
      }),
      b(it, {
        image1: { type: F.ResponsiveImage, title: `Image 1` },
        image2: { type: F.ResponsiveImage, title: `Image 2` },
        image3: { type: F.ResponsiveImage, title: `Image 3` },
        image4: { type: F.ResponsiveImage, title: `Image 4` },
        image5: { type: F.ResponsiveImage, title: `Image 5` },
        image6: { type: F.ResponsiveImage, title: `Image 6` },
        image7: { type: F.ResponsiveImage, title: `Image 7` },
        image8: { type: F.ResponsiveImage, title: `Image 8` },
        image9: { type: F.ResponsiveImage, title: `Image 9` },
        image10: { type: F.ResponsiveImage, title: `Image 10` },
        image11: { type: F.ResponsiveImage, title: `Image 11` },
        image12: { type: F.ResponsiveImage, title: `Image 12` },
        image13: { type: F.ResponsiveImage, title: `Image 13` },
        image14: { type: F.ResponsiveImage, title: `Image 14` },
        image15: { type: F.ResponsiveImage, title: `Image 15` },
        image16: { type: F.ResponsiveImage, title: `Image 16` },
        image17: { type: F.ResponsiveImage, title: `Image 17` },
        image18: { type: F.ResponsiveImage, title: `Image 18` },
        image19: { type: F.ResponsiveImage, title: `Image 19` },
        image20: { type: F.ResponsiveImage, title: `Image 20` },
        targetAriaLabel: {
          type: F.String,
          title: `Aria Label`,
          placeholder: `Imgaeproject`,
        },
        fitContent: {
          type: F.Boolean,
          title: `Fit Content`,
          enabledTitle: `On`,
          disabledTitle: `Off`,
        },
        maxVisibleItems: {
          type: F.Number,
          title: `Max Visible`,
          min: 1,
          max: 20,
          step: 1,
        },
        itemWidth: {
          type: F.Number,
          title: `Item W`,
          min: 20,
          max: 80,
          step: 1,
          unit: `px`,
        },
        itemHeight: {
          type: F.Number,
          title: `Item H`,
          min: 12,
          max: 48,
          step: 1,
          unit: `px`,
        },
        itemGap: {
          type: F.Number,
          title: `Gap`,
          min: 0,
          max: 20,
          step: 1,
          unit: `px`,
        },
        paddingX: {
          type: F.Number,
          title: `Pad X`,
          min: 0,
          max: 24,
          step: 1,
          unit: `px`,
        },
        paddingY: {
          type: F.Number,
          title: `Pad Y`,
          min: 0,
          max: 32,
          step: 1,
          unit: `px`,
        },
        outlineWidth: {
          type: F.Number,
          title: `Frame W`,
          min: 40,
          max: 120,
          step: 1,
          unit: `px`,
        },
        minOutlineHeight: {
          type: F.Number,
          title: `Frame H`,
          min: 20,
          max: 80,
          step: 1,
          unit: `px`,
        },
        bottomOvershoot: {
          type: F.Number,
          title: `Bottom`,
          min: 0,
          max: 32,
          step: 1,
          unit: `px`,
        },
        itemBackground: { type: F.Color, title: `Item Fill` },
        outlineColor: { type: F.Color, title: `Frame` },
        outlineStroke: {
          type: F.Number,
          title: `Stroke`,
          min: 1,
          max: 4,
          step: 1,
          unit: `px`,
        },
      }));
  });
function Y(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Dt(e) {
  return (
    e === document.scrollingElement ||
    e === document.documentElement ||
    e === document.body
  );
}
function Ot(e) {
  return Dt(e)
    ? { x: o.scrollX || 0, y: o.scrollY || e.scrollTop || 0 }
    : { x: e.scrollLeft, y: e.scrollTop };
}
function kt(e) {
  if (Dt(e)) {
    let e = document.scrollingElement || document.documentElement;
    return {
      x: Math.max(0, e.scrollWidth - o.innerWidth),
      y: Math.max(
        0,
        Math.max(
          e.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        ) - o.innerHeight,
      ),
    };
  }
  return {
    x: Math.max(0, e.scrollWidth - e.clientWidth),
    y: Math.max(0, e.scrollHeight - e.clientHeight),
  };
}
function At(e, t, n) {
  if (Dt(e)) {
    o.scrollTo(t, n);
    return;
  }
  ((e.scrollLeft = t), (e.scrollTop = n));
}
function jt(e) {
  let t = Ot(e),
    n = t.x,
    r = t.y,
    i = t.x,
    a = t.y,
    s = 0,
    c = () => {
      if (((s = 0), Pt())) {
        let t = Ot(e);
        ((n = t.x), (r = t.y), (i = t.x), (a = t.y));
        return;
      }
      let t = kt(e);
      ((i = Y(i, 0, t.x)), (a = Y(a, 0, t.y)));
      let l = i - n,
        u = a - r;
      if (
        ((n = Y(n + l * Lt, 0, t.x)),
        (r = Y(r + u * Lt, 0, t.y)),
        At(e, n, r),
        Math.abs(l) < Rt && Math.abs(u) < Rt)
      ) {
        ((n = i), (r = a), At(e, n, r));
        return;
      }
      s = o.requestAnimationFrame(c);
    },
    l = () => {
      if (s) return;
      let t = Ot(e);
      ((n = t.x), (r = t.y), (i = t.x), (a = t.y));
    },
    u = Dt(e) ? o : e;
  return (
    u.addEventListener(`scroll`, l, { passive: !0 }),
    {
      add(t, n) {
        let r = kt(e);
        ((i = Y(i + t, 0, r.x)),
          (a = Y(a + n, 0, r.y)),
          (s ||= o.requestAnimationFrame(c)));
      },
      destroy() {
        (s && o.cancelAnimationFrame(s), u.removeEventListener(`scroll`, l));
      },
    }
  );
}
function Mt(e) {
  return (
    [e, ...Array.from(e.querySelectorAll(`*`))].find((e) => {
      let t = o.getComputedStyle(e);
      return (
        /(auto|scroll|overlay)/.test(`${t.overflowY} ${t.overflow}`) &&
        e.scrollHeight > e.clientHeight + 1
      );
    }) ||
    document.scrollingElement ||
    document.documentElement
  );
}
function Nt(e, t, n) {
  let r = e.getBoundingClientRect();
  return t >= r.left && t <= r.right && n >= r.top && n <= r.bottom;
}
function Pt() {
  return (
    document.documentElement.getAttribute(`data-parallax-lightbox-open`) ===
    `true`
  );
}
function Ft(e, t, n) {
  if (Dt(e)) {
    o.scrollBy({ left: t, top: n, behavior: `auto` });
    return;
  }
  ((e.scrollLeft += t), (e.scrollTop += n));
}
function It(e) {
  return (n) => {
    let r = t(null);
    return (
      f(() => {
        let e = r.current;
        if (!e || o === void 0) return;
        let t = !1,
          n = !1,
          i = 0,
          a = 0,
          s = null,
          c = null,
          l = () => {
            let t = Mt(e);
            return t === s && c ? c : (c?.destroy(), (s = t), (c = jt(t)), c);
          },
          u = (t) => {
            if (Pt() || t.ctrlKey || !Nt(e, t.clientX, t.clientY)) return;
            let n =
              t.deltaMode === WheelEvent.DOM_DELTA_LINE
                ? 16
                : t.deltaMode === WheelEvent.DOM_DELTA_PAGE
                  ? o.innerHeight
                  : 1;
            (t.preventDefault(),
              t.stopPropagation(),
              l().add(t.deltaX * n, t.deltaY * n));
          },
          d = (r) => {
            if (Pt()) {
              t = !1;
              return;
            }
            let o = r.touches[0];
            o &&
              ((t = Nt(e, o.clientX, o.clientY)),
              (n = !1),
              (i = o.clientY),
              (a = o.clientY));
          },
          f = (r) => {
            if (Pt()) {
              t = !1;
              return;
            }
            if (!t) return;
            let o = r.touches[0];
            if (!o) return;
            let s = a - o.clientY;
            ((a = o.clientY),
              (n ||= Math.abs(o.clientY - i) > 4),
              n &&
                (r.preventDefault(),
                r.stopImmediatePropagation(),
                Ft(Mt(e), 0, s)));
          },
          p = () => {
            ((t = !1), (n = !1));
          };
        return (
          o.addEventListener(`wheel`, u, { capture: !0, passive: !1 }),
          o.addEventListener(`touchstart`, d, { capture: !0, passive: !0 }),
          o.addEventListener(`touchmove`, f, { capture: !0, passive: !1 }),
          o.addEventListener(`touchend`, p, !0),
          o.addEventListener(`touchcancel`, p, !0),
          () => {
            (o.removeEventListener(`wheel`, u, !0),
              o.removeEventListener(`touchstart`, d, !0),
              o.removeEventListener(`touchmove`, f, !0),
              o.removeEventListener(`touchend`, p, !0),
              o.removeEventListener(`touchcancel`, p, !0),
              c?.destroy());
          }
        );
      }, []),
      l(e, { ...n, ref: r })
    );
  };
}
var Lt,
  Rt,
  zt = e(() => {
    (n(), h(), s(), (Lt = 0.075), (Rt = 0.2));
  }),
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
  pn,
  X,
  Z,
  Q,
  mn,
  hn,
  gn,
  _n,
  vn,
  $,
  yn;
e(() => {
  (h(),
    x(),
    v(),
    s(),
    Ee(),
    xe(),
    He(),
    Me(),
    Ae(),
    Xe(),
    rt(),
    We(),
    ye(),
    je(),
    Et(),
    ve(),
    zt(),
    we(),
    ke(),
    De(),
    Ie(),
    Le(),
    pe(),
    G(),
    (Bt = O(w, { nodeId: `eGhCFgF4d`, override: K, scopeId: `yfIxy7MeB` })),
    (Vt = C(Ne)),
    (Ht = O(y.div, {
      nodeId: `YRnDi7BfQ`,
      override: Ze,
      scopeId: `yfIxy7MeB`,
    })),
    (Ut = O(y.div, {
      nodeId: `gdIROf7wC`,
      override: Ze,
      scopeId: `yfIxy7MeB`,
    })),
    (Wt = C(W)),
    (Gt = O(y.div, {
      nodeId: `MLoq_OR3a`,
      override: It,
      scopeId: `yfIxy7MeB`,
    })),
    (Kt = O(y.div, {
      nodeId: `ORwSEiQGS`,
      override: Se,
      scopeId: `yfIxy7MeB`,
    })),
    (qt = C(Ue)),
    (Jt = O(w, { nodeId: `D8G8UUVEx`, override: K, scopeId: `yfIxy7MeB` })),
    (Yt = C(ue)),
    (Xt = C(le)),
    (Zt = C(H)),
    (Qt = B(
      O(H, { nodeId: `MA_0DXTMx`, override: Ce, scopeId: `yfIxy7MeB` }),
      Oe,
    )),
    ($t = O(y.div, {
      nodeId: `JVFZ2n8RS`,
      override: Se,
      scopeId: `yfIxy7MeB`,
    })),
    (en = C(Pe)),
    (tn = C(be)),
    (nn = C(it)),
    (rn = O(y.div, {
      nodeId: `wqo1xEVtu`,
      override: Ze,
      scopeId: `yfIxy7MeB`,
    })),
    (an = {
      qvMgtyqoZ: `(min-width: 2560px)`,
      SM0_wLNHj: `(min-width: 1100px) and (max-width: 1919.98px)`,
      ssPZJT0et: `(min-width: 1920px) and (max-width: 2559.98px)`,
      wiMI7jLSN: `(max-width: 1099.98px)`,
    }),
    (on = () => typeof document < `u`),
    (sn = [`link`]),
    (cn = `framer-j44d8`),
    (ln = {
      qvMgtyqoZ: `framer-v-1tyetid`,
      SM0_wLNHj: `framer-v-4ccosu`,
      ssPZJT0et: `framer-v-1aycho3`,
      wiMI7jLSN: `framer-v-1wzffn0`,
    }),
    (un = (e, t, n) => (e && t ? `position` : n)),
    (dn = (e, t, n) => {
      if (typeof e != `string`) return ``;
      let r = new Date(e);
      if (isNaN(r.getTime())) return ``;
      let i = `en-US`;
      try {
        return r.toLocaleString(n || i, t);
      } catch {
        return r.toLocaleString(i, t);
      }
    }),
    (fn = { month: `short`, timeZone: `UTC`, year: `numeric` }),
    (pn = (e, t) => dn(e, fn, t)),
    (X = (e) => (Array.isArray(e) ? e.length > 0 : e != null && e !== ``)),
    (Z = (e) =>
      typeof e == `object` && e && typeof e.src == `string`
        ? e
        : typeof e == `string`
          ? { src: e }
          : void 0),
    (Q = (...e) => {
      for (let t of e) if (t && typeof t == `string`) return t;
    }),
    (mn = (e, t) => `translate(-50%, -50%) ${t}`),
    (hn = {
      1440: `SM0_wLNHj`,
      2560: `qvMgtyqoZ`,
      Desktop: `ssPZJT0et`,
      Phone: `wiMI7jLSN`,
    }),
    (gn = ({ value: e }) =>
      A()
        ? null
        : l(`style`, {
            dangerouslySetInnerHTML: { __html: e },
            "data-framer-html-style": ``,
          })),
    (_n = (e) => ({
      from: {
        constraint: {
          left: {
            collection: `yfIxy7MeB`,
            name: `previousItemId`,
            type: `Identifier`,
          },
          operator: `==`,
          right: {
            collection: `previousItemId`,
            name: `id`,
            type: `Identifier`,
          },
          type: `BinaryOperation`,
        },
        left: { alias: `yfIxy7MeB`, data: Te, type: `Collection` },
        right: { alias: `previousItemId`, data: Te, type: `Collection` },
        type: `LeftJoin`,
      },
      select: [
        { collection: `yfIxy7MeB`, name: `p8czWhMU2`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `eSdPfrWYZ`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `J5lbOHAct`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `RYpnU43LI`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `mCvsW3649`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `AqUnwGW5E`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `EqRrFTkXW`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `p081GFJZ6`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `H6tzPXi4l`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `tLyl4w0Bi`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `a0jsMh5Mn`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `wVlm8UEHb`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `SrNxRN_Q4`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `GzRUZdtY7`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `CUTuQU4ok`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `Zf_DLqDNY`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `rZrCjSeAs`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `RYg6Rzgks`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `HC_7blMUq`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `EQGV6RqaQ`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `axQ8_Rukq`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `OXw07e8iB`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `UI6IfL8Rq`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `DJTmM3e6i`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `Lice4qLAM`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `MxKZzgAU7`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `WYaF6fYYf`, type: `Identifier` },
        { collection: `yfIxy7MeB`, name: `T8D0UUdDZ`, type: `Identifier` },
        {
          alias: `previousItemId.p8czWhMU2`,
          collection: `previousItemId`,
          name: `p8czWhMU2`,
          type: `Identifier`,
        },
        {
          alias: `previousItemId.vLVe3KnmR`,
          collection: `previousItemId`,
          name: `vLVe3KnmR`,
          type: `Identifier`,
        },
      ],
      where: e,
    })),
    (vn = ({ height: e, id: t, width: n, ...r }) => ({
      ...r,
      variant: hn[r.variant] ?? r.variant ?? `ssPZJT0et`,
    })),
    ($ = M(
      d(function (e, n) {
        let i = t(null),
          o = n ?? i,
          s = c(),
          { activeLocale: u, setLocale: d } = se(),
          f = oe(),
          h = ne(),
          [v] = L(_n(E(h, `yfIxy7MeB`))),
          b = (e) => {
            if (!v)
              throw new ae(
                `No data matches path variables: ${JSON.stringify(h)}`,
              );
            return v[e];
          },
          {
            style: x,
            className: S,
            layoutId: C,
            variant: T,
            p8czWhMU2: D = b(`p8czWhMU2`) ?? ``,
            eSdPfrWYZ: O = b(`eSdPfrWYZ`) ?? ``,
            J5lbOHAct: te = b(`J5lbOHAct`) ?? ``,
            RYpnU43LI: A = b(`RYpnU43LI`) ?? ``,
            mCvsW3649: M = b(`mCvsW3649`) ?? ``,
            AqUnwGW5E: F = b(`AqUnwGW5E`) ?? ``,
            EqRrFTkXW: B = b(`EqRrFTkXW`),
            p081GFJZ6: V = b(`p081GFJZ6`) ?? ``,
            H6tzPXi4l: de = b(`H6tzPXi4l`),
            tLyl4w0Bi: pe = b(`tLyl4w0Bi`),
            a0jsMh5Mn: he = b(`a0jsMh5Mn`),
            wVlm8UEHb: ge = b(`wVlm8UEHb`),
            SrNxRN_Q4: _e = b(`SrNxRN_Q4`),
            GzRUZdtY7: ve = b(`GzRUZdtY7`),
            CUTuQU4ok: ye = b(`CUTuQU4ok`),
            Zf_DLqDNY: xe = b(`Zf_DLqDNY`),
            rZrCjSeAs: Se = b(`rZrCjSeAs`),
            RYg6Rzgks: H = b(`RYg6Rzgks`),
            HC_7blMUq: Ce = b(`HC_7blMUq`),
            EQGV6RqaQ: we = b(`EQGV6RqaQ`),
            axQ8_Rukq: Te = b(`axQ8_Rukq`),
            OXw07e8iB: Ee = b(`OXw07e8iB`),
            UI6IfL8Rq: De = b(`UI6IfL8Rq`),
            DJTmM3e6i: Oe = b(`DJTmM3e6i`),
            Lice4qLAM: ke = b(`Lice4qLAM`),
            MxKZzgAU7: Ae = b(`MxKZzgAU7`),
            WYaF6fYYf: je = b(`WYaF6fYYf`),
            T8D0UUdDZ: Me = b(`T8D0UUdDZ`),
            previousItemId_p8czWhMU2: Ie = b(`previousItemId.p8czWhMU2`) ?? ``,
            previousItemId_vLVe3KnmR: Le = b(`previousItemId.vLVe3KnmR`) ?? ``,
            ...Re
          } = vn(e);
        j(p(() => Ge({ p8czWhMU2: D }, u), [D, u]));
        let [U, ze] = R(T, an, !1),
          Be = ee(cn, me, Fe, Ve, fe),
          He = a(re)?.isLayoutTemplate,
          We = !!a(g)?.transition?.layout,
          G = un(He, We),
          K = () => !on() || U === `wiMI7jLSN`,
          Ke = ie(),
          qe = pn(B, Ke),
          q = () => !on() || U !== `wiMI7jLSN`,
          Je = X(de),
          Ye = X(he),
          Xe = X(ge),
          Ze = X(_e),
          Qe = X(ve),
          $e = X(ye),
          et = X(xe),
          tt = X(Se),
          nt = X(H),
          rt = X(Ce),
          at = X(we),
          ot = X(Te),
          st = X(Ee),
          ct = X(De),
          lt = X(Oe),
          ut = X(ke),
          dt = X(Ae),
          ft = X(je),
          pt = X(Me);
        return (
          P(),
          I({}),
          l(re.Provider, {
            value: {
              activeVariantId: U,
              humanReadableVariantMap: hn,
              primaryVariantId: `ssPZJT0et`,
              variantClassNames: ln,
            },
            children: m(_, {
              id: C ?? s,
              children: [
                l(gn, {
                  value: `html body { background: rgb(236, 236, 236); }`,
                }),
                m(y.div, {
                  ...Re,
                  className: ee(Be, `framer-1aycho3`, S),
                  ref: o,
                  style: { ...x },
                  children: [
                    l(z, {
                      breakpoint: U,
                      overrides: {
                        wiMI7jLSN: { "aria-label": `Imgaeproject` },
                      },
                      children: m(Kt, {
                        "aria-label": `scrollarea`,
                        className: `framer-15wwhxa`,
                        layout: G,
                        children: [
                          K() &&
                            l(y.div, {
                              className: `framer-1iojg43 hidden-1aycho3 hidden-4ccosu hidden-1tyetid`,
                              children:
                                K() &&
                                l(Bt, {
                                  __fromCanvasComponent: !0,
                                  children: l(r, {
                                    children: l(`p`, {
                                      dir: `auto`,
                                      style: {
                                        "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                        "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                        "--framer-font-size": `42px`,
                                        "--framer-text-alignment": `center`,
                                        "--framer-text-color": `rgb(255, 73, 73)`,
                                      },
                                      children: `IVENTIONS`,
                                    }),
                                  }),
                                  className: `framer-ratja1 hidden-1aycho3`,
                                  fonts: [`CUSTOMV2;BT Glyphius Regular`],
                                  text: D,
                                  verticalAlignment: `top`,
                                  withExternalLayout: !0,
                                }),
                            }),
                          m(Ht, {
                            className: `framer-ozybli`,
                            "data-framer-name": `mid`,
                            children: [
                              l(y.div, {
                                "aria-label": `heroinfo`,
                                className: `framer-1h5109u`,
                                children: l(y.div, {
                                  className: `framer-yy5g0g`,
                                  "data-framer-name": `Container`,
                                  children: m(y.div, {
                                    className: `framer-hkseky`,
                                    "data-framer-name": `Section`,
                                    children: [
                                      m(y.div, {
                                        "aria-label": `seconelement`,
                                        className: `framer-14visgu`,
                                        "data-framer-name": `Paragraph`,
                                        children: [
                                          l(w, {
                                            __fromCanvasComponent: !0,
                                            children: l(r, {
                                              children: l(`p`, {
                                                className: `framer-styles-preset-fukh8o`,
                                                "data-styles-preset": `sy0X3z2VP`,
                                                dir: `auto`,
                                                style: {
                                                  "--framer-text-color": `rgba(255, 255, 255, 0.5)`,
                                                },
                                                children: `About`,
                                              }),
                                            }),
                                            className: `framer-2uot6b`,
                                            "data-framer-name": `Subtitle`,
                                            fonts: [`Inter`],
                                            verticalAlignment: `top`,
                                            withExternalLayout: !0,
                                          }),
                                          l(w, {
                                            __fromCanvasComponent: !0,
                                            children: O,
                                            className: `framer-1p6hcfn`,
                                            "data-framer-name": `Description`,
                                            fonts: [`Inter`],
                                            stylesPresetsClassNames: {
                                              a: `framer-styles-preset-1cuzab`,
                                              h1: `framer-styles-preset-o3e5h0`,
                                              h2: `framer-styles-preset-1h59vvl`,
                                              h3: `framer-styles-preset-aopi0o`,
                                              p: `framer-styles-preset-fukh8o`,
                                            },
                                            verticalAlignment: `top`,
                                            withExternalLayout: !0,
                                          }),
                                        ],
                                      }),
                                      m(y.div, {
                                        "aria-label": `seconelement`,
                                        className: `framer-15xuo83`,
                                        "data-framer-name": `Info Container`,
                                        children: [
                                          m(y.div, {
                                            className: `framer-1uvw3`,
                                            "data-framer-name": `Info Section`,
                                            children: [
                                              l(w, {
                                                __fromCanvasComponent: !0,
                                                children: A,
                                                className: `framer-15mk65b`,
                                                "data-framer-name": `Section Title`,
                                                fonts: [`Inter`],
                                                stylesPresetsClassNames: {
                                                  h1: `framer-styles-preset-o3e5h0`,
                                                  h2: `framer-styles-preset-1h59vvl`,
                                                  h3: `framer-styles-preset-aopi0o`,
                                                  p: `framer-styles-preset-fukh8o`,
                                                },
                                                verticalAlignment: `top`,
                                                withExternalLayout: !0,
                                              }),
                                              l(w, {
                                                __fromCanvasComponent: !0,
                                                children: M,
                                                className: `framer-a6xcfh`,
                                                "data-framer-name": `Section Content`,
                                                fonts: [`Inter`],
                                                stylesPresetsClassNames: {
                                                  a: `framer-styles-preset-1cuzab`,
                                                  h1: `framer-styles-preset-o3e5h0`,
                                                  h2: `framer-styles-preset-1h59vvl`,
                                                  h3: `framer-styles-preset-aopi0o`,
                                                  p: `framer-styles-preset-fukh8o`,
                                                },
                                                verticalAlignment: `top`,
                                                withExternalLayout: !0,
                                              }),
                                            ],
                                          }),
                                          m(y.div, {
                                            className: `framer-18xpz6u`,
                                            "data-framer-name": `Info Item`,
                                            children: [
                                              l(w, {
                                                __fromCanvasComponent: !0,
                                                children: l(r, {
                                                  children: l(`p`, {
                                                    className: `framer-styles-preset-fukh8o`,
                                                    "data-styles-preset": `sy0X3z2VP`,
                                                    dir: `auto`,
                                                    style: {
                                                      "--framer-text-color": `rgba(255, 255, 255, 0.5)`,
                                                    },
                                                    children: `Launch`,
                                                  }),
                                                }),
                                                className: `framer-4u3cbn`,
                                                "data-framer-name": `Label`,
                                                fonts: [`Inter`],
                                                verticalAlignment: `top`,
                                                withExternalLayout: !0,
                                              }),
                                              l(w, {
                                                __fromCanvasComponent: !0,
                                                children: l(r, {
                                                  children: l(`p`, {
                                                    className: `framer-styles-preset-fukh8o`,
                                                    "data-styles-preset": `sy0X3z2VP`,
                                                    dir: `auto`,
                                                    children: `March 2022`,
                                                  }),
                                                }),
                                                className: `framer-onk3pl`,
                                                "data-framer-name": `Date`,
                                                fonts: [`Inter`],
                                                text: l(`time`, {
                                                  dateTime: B,
                                                  children: qe,
                                                }),
                                                verticalAlignment: `top`,
                                                withExternalLayout: !0,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      m(y.div, {
                                        "aria-label": `seconelement`,
                                        className: `framer-ly69c5`,
                                        "data-framer-name": `Paragraph`,
                                        children: [
                                          l(w, {
                                            __fromCanvasComponent: !0,
                                            children: l(r, {
                                              children: l(`p`, {
                                                className: `framer-styles-preset-fukh8o`,
                                                "data-styles-preset": `sy0X3z2VP`,
                                                dir: `auto`,
                                                style: {
                                                  "--framer-text-color": `rgba(255, 255, 255, 0.5)`,
                                                },
                                                children: `Recognition`,
                                              }),
                                            }),
                                            className: `framer-1ygrvkj`,
                                            "data-framer-name": `Subtitle`,
                                            fonts: [`Inter`],
                                            verticalAlignment: `top`,
                                            withExternalLayout: !0,
                                          }),
                                          l(w, {
                                            __fromCanvasComponent: !0,
                                            children: F,
                                            className: `framer-dl51yu`,
                                            "data-framer-name": `Description`,
                                            fonts: [`Inter`],
                                            stylesPresetsClassNames: {
                                              a: `framer-styles-preset-1cuzab`,
                                              h1: `framer-styles-preset-o3e5h0`,
                                              h2: `framer-styles-preset-1h59vvl`,
                                              h3: `framer-styles-preset-aopi0o`,
                                              p: `framer-styles-preset-fukh8o`,
                                            },
                                            verticalAlignment: `top`,
                                            withExternalLayout: !0,
                                          }),
                                        ],
                                      }),
                                      q() &&
                                        l(y.div, {
                                          "aria-label": `seconelement`,
                                          className: `framer-1a6o4yb hidden-1wzffn0`,
                                          "data-framer-name": `Paragraph`,
                                          children: l(N, {
                                            children: l(k, {
                                              className: `framer-7zjyxv-container`,
                                              isAuthoredByUser: !0,
                                              nodeId: `uXUHMlsME`,
                                              rendersWithMotion: !0,
                                              scopeId: `yfIxy7MeB`,
                                              children: l(z, {
                                                breakpoint: U,
                                                overrides: {
                                                  SM0_wLNHj: {
                                                    font: {
                                                      fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                                      fontSize: `16px`,
                                                      fontStyle: `normal`,
                                                      fontWeight: 500,
                                                      letterSpacing: `0.01em`,
                                                      lineHeight: `1em`,
                                                      textAlign: `left`,
                                                    },
                                                  },
                                                },
                                                children: l(Ne, {
                                                  alwaysOnTop: !0,
                                                  color: `rgb(255, 255, 255)`,
                                                  customHeight: 40,
                                                  emptyFallbackLink: ``,
                                                  emptyFallbackText: `Next Project`,
                                                  enableCustomHeight: !1,
                                                  enableEmptyFallback: !1,
                                                  enableTransition: !1,
                                                  font: {
                                                    fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                                    fontSize: `20px`,
                                                    fontStyle: `normal`,
                                                    fontWeight: 500,
                                                    letterSpacing: `0.01em`,
                                                    lineHeight: `1em`,
                                                    textAlign: `left`,
                                                  },
                                                  height: `100%`,
                                                  hoverEnabled: !0,
                                                  hoverSoundEnabled: !1,
                                                  id: `uXUHMlsME`,
                                                  layoutId: `uXUHMlsME`,
                                                  lineColor: `rgb(255, 255, 255)`,
                                                  lineGap: 0,
                                                  lineMode: `Visible`,
                                                  lineThickness: 1,
                                                  link: te,
                                                  openInNewTab: !0,
                                                  text: V,
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
                                        }),
                                      K() &&
                                        l(y.div, {
                                          className: `framer-1xlj6vt hidden-1aycho3 hidden-4ccosu hidden-1tyetid`,
                                          children:
                                            K() &&
                                            l(N, {
                                              children: l(k, {
                                                className: `framer-14jhfgg-container hidden-1aycho3`,
                                                isAuthoredByUser: !0,
                                                nodeId: `w5syh18U7`,
                                                rendersWithMotion: !0,
                                                scopeId: `yfIxy7MeB`,
                                                children: l(Ne, {
                                                  alwaysOnTop: !0,
                                                  color: `rgb(255, 255, 255)`,
                                                  customHeight: 40,
                                                  emptyFallbackLink: ``,
                                                  emptyFallbackText: `Next Project`,
                                                  enableCustomHeight: !1,
                                                  enableEmptyFallback: !1,
                                                  enableTransition: !1,
                                                  font: {
                                                    fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                                    fontSize: `16px`,
                                                    fontStyle: `normal`,
                                                    fontWeight: 500,
                                                    letterSpacing: `-0.01em`,
                                                    lineHeight: `1em`,
                                                    textAlign: `left`,
                                                  },
                                                  height: `100%`,
                                                  hoverEnabled: !0,
                                                  hoverSoundEnabled: !1,
                                                  id: `w5syh18U7`,
                                                  layoutId: `w5syh18U7`,
                                                  lineColor: `rgb(255, 255, 255)`,
                                                  lineGap: 0,
                                                  lineMode: `Visible`,
                                                  lineThickness: 1,
                                                  link: te,
                                                  openInNewTab: !0,
                                                  text: V,
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
                                      l(y.div, { className: `framer-fjocml` }),
                                    ],
                                  }),
                                }),
                              }),
                              l(y.div, {
                                className: `framer-96lpjk`,
                                "data-framer-name": `mid`,
                              }),
                              q() &&
                                l(y.div, {
                                  className: `framer-1la3cr0 hidden-1wzffn0`,
                                  "data-framer-name": `right`,
                                }),
                            ],
                          }),
                          q() &&
                            l(Ut, {
                              className: `framer-2i0wwq hidden-1wzffn0`,
                              "data-framer-name": `bottom`,
                              children: m(y.div, {
                                "aria-label": `seconelement`,
                                className: `framer-1f0rmkp`,
                                children: [
                                  l(y.div, {
                                    className: `framer-erbozi`,
                                    "data-framer-name": `Info Container`,
                                    children: l(y.div, {
                                      className: `framer-1fxgz7p`,
                                    }),
                                  }),
                                  l(y.div, {
                                    "aria-label": `heroinfo`,
                                    className: `framer-o5ubf7`,
                                    children: m(y.div, {
                                      className: `framer-qt1h0q`,
                                      "data-framer-name": `Frame 2147226915`,
                                      children: [
                                        l(w, {
                                          __fromCanvasComponent: !0,
                                          children: l(r, {
                                            children: l(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `var(--token-e93f529c-01a4-4879-a2e7-182bd1a3d9fa, rgba(255, 255, 255, 0.5))`,
                                              },
                                              children: `Scroll`,
                                            }),
                                          }),
                                          className: `framer-8dmr6k`,
                                          "data-framer-name": `Scroll`,
                                          fonts: [`Inter`],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                        l(w, {
                                          __fromCanvasComponent: !0,
                                          children: l(r, {
                                            children: l(`p`, {
                                              className: `framer-styles-preset-fukh8o`,
                                              "data-styles-preset": `sy0X3z2VP`,
                                              dir: `auto`,
                                              style: {
                                                "--framer-text-color": `var(--token-e93f529c-01a4-4879-a2e7-182bd1a3d9fa, rgba(255, 255, 255, 0.5))`,
                                              },
                                              children: `Title`,
                                            }),
                                          }),
                                          className: `framer-eu1hcs`,
                                          "data-framer-name": `Scroll`,
                                          fonts: [`Inter`],
                                          text: D,
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          l(z, {
                            breakpoint: U,
                            overrides: { wiMI7jLSN: { "aria-label": void 0 } },
                            children: m(Gt, {
                              "aria-label": `Imgaeproject`,
                              className: `framer-1gvdprc`,
                              "data-framer-name": `Imgaeproject`,
                              children: [
                                q() &&
                                  l(y.div, {
                                    className: `framer-snafkt hidden-1wzffn0`,
                                    "data-framer-name": `top`,
                                  }),
                                Je !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-is66ly-container`,
                                      "data-framer-name": `1`,
                                      isAuthoredByUser: !0,
                                      name: `1`,
                                      nodeId: `YpEh1VI9x`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `YpEh1VI9x`,
                                          image: Z(de),
                                          layoutId: `YpEh1VI9x`,
                                          lazyVideo: !0,
                                          name: `1`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                Je !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1yecd42-container`,
                                      "data-framer-name": `2`,
                                      isAuthoredByUser: !0,
                                      name: `2`,
                                      nodeId: `BBAVKViF9`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `BBAVKViF9`,
                                          image: Z(pe),
                                          layoutId: `BBAVKViF9`,
                                          lazyVideo: !0,
                                          name: `2`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                Ye !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1doq1po-container`,
                                      "data-framer-name": `3`,
                                      isAuthoredByUser: !0,
                                      name: `3`,
                                      nodeId: `Dza8UPiMq`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `Dza8UPiMq`,
                                          image: Z(he),
                                          layoutId: `Dza8UPiMq`,
                                          lazyVideo: !0,
                                          name: `3`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                Xe !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-n93xn8-container`,
                                      "data-framer-name": `4`,
                                      isAuthoredByUser: !0,
                                      name: `4`,
                                      nodeId: `SxnVGn4h6`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `SxnVGn4h6`,
                                          image: Z(ge),
                                          layoutId: `SxnVGn4h6`,
                                          lazyVideo: !0,
                                          name: `4`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                Ze !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-i63447-container`,
                                      "data-framer-name": `5`,
                                      isAuthoredByUser: !0,
                                      name: `5`,
                                      nodeId: `hTOlYrT1x`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `hTOlYrT1x`,
                                          image: Z(_e),
                                          layoutId: `hTOlYrT1x`,
                                          lazyVideo: !0,
                                          name: `5`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                Qe !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-39d0np-container`,
                                      "data-framer-name": `6`,
                                      isAuthoredByUser: !0,
                                      name: `6`,
                                      nodeId: `kb8C7hSyX`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `kb8C7hSyX`,
                                          image: Z(ve),
                                          layoutId: `kb8C7hSyX`,
                                          lazyVideo: !0,
                                          name: `6`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                $e !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-hj8gel-container`,
                                      "data-framer-name": `7`,
                                      isAuthoredByUser: !0,
                                      name: `7`,
                                      nodeId: `NZM46esl2`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `NZM46esl2`,
                                          image: Z(ye),
                                          layoutId: `NZM46esl2`,
                                          lazyVideo: !0,
                                          name: `7`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                et !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-4lzn5j-container`,
                                      "data-framer-name": `8`,
                                      isAuthoredByUser: !0,
                                      name: `8`,
                                      nodeId: `L3y6nj1Aj`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `L3y6nj1Aj`,
                                          image: Z(xe),
                                          layoutId: `L3y6nj1Aj`,
                                          lazyVideo: !0,
                                          name: `8`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                tt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-f86iu-container`,
                                      "data-framer-name": `9`,
                                      isAuthoredByUser: !0,
                                      name: `9`,
                                      nodeId: `ojEOVau3S`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `ojEOVau3S`,
                                          image: Z(Se),
                                          layoutId: `ojEOVau3S`,
                                          lazyVideo: !0,
                                          name: `9`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                nt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-109hr6x-container`,
                                      "data-framer-name": `10`,
                                      isAuthoredByUser: !0,
                                      name: `10`,
                                      nodeId: `cYGlcP9ls`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `cYGlcP9ls`,
                                          image: Z(H),
                                          layoutId: `cYGlcP9ls`,
                                          lazyVideo: !0,
                                          name: `10`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                rt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1v5mbc5-container`,
                                      "data-framer-name": `11`,
                                      isAuthoredByUser: !0,
                                      name: `11`,
                                      nodeId: `jIzWslUJ0`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `jIzWslUJ0`,
                                          image: Z(Ce),
                                          layoutId: `jIzWslUJ0`,
                                          lazyVideo: !0,
                                          name: `11`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                at !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-gy68vo-container`,
                                      "data-framer-name": `12`,
                                      isAuthoredByUser: !0,
                                      name: `12`,
                                      nodeId: `xEv3YYPfW`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `xEv3YYPfW`,
                                          image: Z(we),
                                          layoutId: `xEv3YYPfW`,
                                          lazyVideo: !0,
                                          name: `12`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                ot !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-ywuf66-container`,
                                      "data-framer-name": `13`,
                                      isAuthoredByUser: !0,
                                      name: `13`,
                                      nodeId: `Yv7B6OoAx`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `Yv7B6OoAx`,
                                          image: Z(Te),
                                          layoutId: `Yv7B6OoAx`,
                                          lazyVideo: !0,
                                          name: `13`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                st !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-19tixrj-container`,
                                      "data-framer-name": `14`,
                                      isAuthoredByUser: !0,
                                      name: `14`,
                                      nodeId: `UDSYjYdoB`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `UDSYjYdoB`,
                                          image: Z(Ee),
                                          layoutId: `UDSYjYdoB`,
                                          lazyVideo: !0,
                                          name: `14`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                ct !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1n2dkpk-container`,
                                      "data-framer-name": `15`,
                                      isAuthoredByUser: !0,
                                      name: `15`,
                                      nodeId: `VsFJZbzkB`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `VsFJZbzkB`,
                                          image: Z(De),
                                          layoutId: `VsFJZbzkB`,
                                          lazyVideo: !0,
                                          name: `15`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                lt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-18qhrbz-container`,
                                      "data-framer-name": `16`,
                                      isAuthoredByUser: !0,
                                      name: `16`,
                                      nodeId: `NTvZMlgt_`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `NTvZMlgt_`,
                                          image: Z(Oe),
                                          layoutId: `NTvZMlgt_`,
                                          lazyVideo: !0,
                                          name: `16`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                ut !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1m2tzbt-container`,
                                      "data-framer-name": `17`,
                                      isAuthoredByUser: !0,
                                      name: `17`,
                                      nodeId: `XfprZMYzP`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `XfprZMYzP`,
                                          image: Z(ke),
                                          layoutId: `XfprZMYzP`,
                                          lazyVideo: !0,
                                          name: `17`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                dt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-1s1f78k-container`,
                                      "data-framer-name": `18`,
                                      isAuthoredByUser: !0,
                                      name: `18`,
                                      nodeId: `Ry3uRBJWD`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `Ry3uRBJWD`,
                                          image: Z(Ae),
                                          layoutId: `Ry3uRBJWD`,
                                          lazyVideo: !0,
                                          name: `18`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                ft !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-5yd59t-container`,
                                      "data-framer-name": `19`,
                                      isAuthoredByUser: !0,
                                      name: `19`,
                                      nodeId: `NoU95sbr8`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `NoU95sbr8`,
                                          image: Z(je),
                                          layoutId: `NoU95sbr8`,
                                          lazyVideo: !0,
                                          name: `19`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                pt !== !1 &&
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-omtuz1-container`,
                                      "data-framer-name": `20`,
                                      isAuthoredByUser: !0,
                                      name: `20`,
                                      nodeId: `uhr0a_Yuu`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          qvMgtyqoZ: { navigationFontSize: 14 },
                                          SM0_wLNHj: { navigationFontSize: 10 },
                                          wiMI7jLSN: {
                                            enableHoverZoom: !1,
                                            overflowHidden: !1,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                          },
                                        },
                                        children: l(W, {
                                          enableHoverZoom: !0,
                                          enableLightbox: !0,
                                          enableRevealId: !0,
                                          height: `100%`,
                                          id: `uhr0a_Yuu`,
                                          image: Z(Me),
                                          layoutId: `uhr0a_Yuu`,
                                          lazyVideo: !0,
                                          name: `20`,
                                          navigationColor: `rgb(255, 255, 255)`,
                                          navigationFont: {
                                            fontFamily: `"BT Grotesk Medium", "BT Grotesk Medium Placeholder", sans-serif`,
                                            fontStyle: `normal`,
                                            fontWeight: 500,
                                            letterSpacing: `0.01em`,
                                            lineHeight: `130%`,
                                          },
                                          navigationFontSize: 12,
                                          overflowHidden: !0,
                                          overlayAspectRatio: `Auto`,
                                          radius: 0,
                                          style: { width: `100%` },
                                          useMediaAspectRatio: !0,
                                          width: `100%`,
                                        }),
                                      }),
                                    }),
                                  }),
                                m(y.div, {
                                  "aria-label": `hideinfo`,
                                  className: `framer-16iigdf`,
                                  "data-framer-name": `next`,
                                  children: [
                                    l(w, {
                                      __fromCanvasComponent: !0,
                                      children: l(r, {
                                        children: l(`p`, {
                                          className: `framer-styles-preset-fukh8o`,
                                          "data-styles-preset": `sy0X3z2VP`,
                                          dir: `auto`,
                                          style: {
                                            "--framer-text-alignment": `center`,
                                            "--framer-text-color": `rgb(5, 5, 5)`,
                                          },
                                          children: `Next project`,
                                        }),
                                      }),
                                      className: `framer-i848y9`,
                                      "data-framer-name": `Next project`,
                                      fonts: [`Inter`],
                                      verticalAlignment: `top`,
                                      withExternalLayout: !0,
                                    }),
                                    l(N, {
                                      children: l(k, {
                                        className: `framer-9jd1rb-container`,
                                        isAuthoredByUser: !0,
                                        nodeId: `vQ6pfBIPQ`,
                                        rendersWithMotion: !0,
                                        scopeId: `yfIxy7MeB`,
                                        children: l(z, {
                                          breakpoint: U,
                                          overrides: {
                                            qvMgtyqoZ: {
                                              font: {
                                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                fontSize: `200px`,
                                                fontStyle: `normal`,
                                                fontWeight: 400,
                                                letterSpacing: `0em`,
                                                lineHeight: `1em`,
                                                textAlign: `center`,
                                              },
                                            },
                                            SM0_wLNHj: {
                                              font: {
                                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                fontSize: `120px`,
                                                fontStyle: `normal`,
                                                fontWeight: 400,
                                                letterSpacing: `0em`,
                                                lineHeight: `1em`,
                                                textAlign: `center`,
                                              },
                                            },
                                            wiMI7jLSN: {
                                              font: {
                                                fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                                fontSize: `32px`,
                                                fontStyle: `normal`,
                                                fontWeight: 400,
                                                letterSpacing: `0em`,
                                                lineHeight: `1em`,
                                                textAlign: `center`,
                                              },
                                              transitionDelay: 0.9,
                                            },
                                          },
                                          children: l(Ne, {
                                            alwaysOnTop: !1,
                                            color: `rgb(255, 72, 72)`,
                                            customHeight: 40,
                                            emptyFallbackLink: `/project/fromanother`,
                                            emptyFallbackText: `FROMANOTHER`,
                                            enableCustomHeight: !1,
                                            enableEmptyFallback: !0,
                                            enableTransition: !0,
                                            font: {
                                              fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                              fontSize: `160px`,
                                              fontStyle: `normal`,
                                              fontWeight: 400,
                                              letterSpacing: `0em`,
                                              lineHeight: `1em`,
                                              textAlign: `center`,
                                            },
                                            height: `100%`,
                                            hoverEnabled: !0,
                                            hoverSoundEnabled: !0,
                                            id: `vQ6pfBIPQ`,
                                            layoutId: `vQ6pfBIPQ`,
                                            lineColor: `rgb(255, 72, 72)`,
                                            lineGap: 0,
                                            lineMode: `Hover Only`,
                                            lineThickness: 1,
                                            link: Le,
                                            openInNewTab: !1,
                                            text: Ie,
                                            textHeight: 100,
                                            textMode: `Custom`,
                                            transitionDelay: 1.7,
                                            transitionLabel: Ie,
                                            triggerProcessPanel: !1,
                                            uppercase: !0,
                                            useBtGroteskPreset: !1,
                                            useTextSizeSource: !1,
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                    l(N, {
                      height: 1e3,
                      width: f?.width || `100vw`,
                      y: (f?.y || 0) + 0,
                      children: l(k, {
                        className: `framer-17vttwe-container`,
                        layout: G,
                        nodeId: `umQraV7q8`,
                        scopeId: `yfIxy7MeB`,
                        children: l(z, {
                          breakpoint: U,
                          overrides: {
                            qvMgtyqoZ: { variant: Q(`o_CY8khIX`) },
                            wiMI7jLSN: { variant: Q(`gKJyN2gEK`) },
                          },
                          children: l(Ue, {
                            eR3H1qFCa: `[data-framer-name="Title"]`,
                            hcif0bVY1: D,
                            height: `100%`,
                            id: `umQraV7q8`,
                            layoutId: `umQraV7q8`,
                            style: { height: `100%`, width: `100%` },
                            variant: Q(`wRj3tt4VQ`),
                            width: `100%`,
                            XORQldie6: !0,
                          }),
                        }),
                      }),
                    }),
                    q() &&
                      l(y.div, {
                        "aria-label": `seconelementon`,
                        className: `framer-cbpm1x hidden-1wzffn0`,
                        layout: G,
                        children: l(z, {
                          breakpoint: U,
                          overrides: {
                            SM0_wLNHj: {
                              children: l(r, {
                                children: l(`p`, {
                                  dir: `auto`,
                                  style: {
                                    "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                    "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                    "--framer-font-size": `120px`,
                                    "--framer-letter-spacing": `0px`,
                                    "--framer-line-height": `100%`,
                                    "--framer-text-alignment": `right`,
                                    "--framer-text-color": `rgb(255, 73, 73)`,
                                    "--framer-text-transform": `uppercase`,
                                  },
                                  children: `IVENTIONS`,
                                }),
                              }),
                            },
                          },
                          children: l(Jt, {
                            __fromCanvasComponent: !0,
                            children: l(r, {
                              children: l(`p`, {
                                dir: `auto`,
                                style: {
                                  "--font-selector": `Q1VTVE9NVjI7QlQgR2x5cGhpdXMgUmVndWxhcg==`,
                                  "--framer-font-family": `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                  "--framer-font-size": `160px`,
                                  "--framer-letter-spacing": `0px`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `right`,
                                  "--framer-text-color": `rgb(255, 73, 73)`,
                                  "--framer-text-transform": `uppercase`,
                                },
                                children: `IVENTIONS`,
                              }),
                            }),
                            className: `framer-obwklw`,
                            fonts: [`CUSTOMV2;BT Glyphius Regular`],
                            text: D,
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                        }),
                      }),
                    K() &&
                      l($t, {
                        "aria-label": `mobilem`,
                        className: `framer-touf5d hidden-1aycho3 hidden-4ccosu hidden-1tyetid`,
                        "data-framer-name": `Menumobile`,
                        layout: G,
                        children: m(y.div, {
                          className: `framer-kpfsfr`,
                          children: [
                            l(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-mcch6n`,
                              children: l(w, {
                                __fromCanvasComponent: !0,
                                children: m(r, {
                                  children: [
                                    l(`p`, {
                                      className: `framer-styles-preset-fukh8o`,
                                      "data-styles-preset": `sy0X3z2VP`,
                                      dir: `auto`,
                                      style: {
                                        "--framer-text-color": `rgb(0, 0, 0)`,
                                      },
                                      children: `Independent designer`,
                                    }),
                                    l(`p`, {
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
                                className: `framer-ha46w0`,
                                fonts: [`Inter`],
                                verticalAlignment: `top`,
                                withExternalLayout: !0,
                              }),
                            }),
                            l(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-k0tv4m`,
                              children: l(ce, {
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
                                  l(N, {
                                    children: l(k, {
                                      className: `framer-hmk8sd-container`,
                                      isAuthoredByUser: !0,
                                      nodeId: `e36YxQpVu`,
                                      rendersWithMotion: !0,
                                      scopeId: `yfIxy7MeB`,
                                      children: l(z, {
                                        breakpoint: U,
                                        overrides: {
                                          wiMI7jLSN: {
                                            links: [e[4], e[5], e[6], e[7]],
                                          },
                                        },
                                        children: l(ue, {
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
                                          id: `e36YxQpVu`,
                                          initialIndex: 0,
                                          items: [
                                            `WORK`,
                                            `ABOUT`,
                                            `PLAYGROUND`,
                                            `CONTACT`,
                                          ],
                                          itemStep: 33,
                                          layoutId: `e36YxQpVu`,
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
                            l(y.div, {
                              "aria-label": `mmenu`,
                              className: `framer-1f2vmy5`,
                              children: l(N, {
                                children: l(k, {
                                  className: `framer-1y97ay6-container`,
                                  isAuthoredByUser: !0,
                                  isModuleExternal: !0,
                                  nodeId: `Yb3u4CwqX`,
                                  rendersWithMotion: !0,
                                  scopeId: `yfIxy7MeB`,
                                  children: l(le, {
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
                                    id: `Yb3u4CwqX`,
                                    layoutId: `Yb3u4CwqX`,
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
                            l(z, {
                              breakpoint: U,
                              overrides: { wiMI7jLSN: { y: 958 } },
                              children: l(N, {
                                height: 26,
                                children: l(k, {
                                  className: `framer-1cwy04z-container`,
                                  nodeId: `MA_0DXTMx`,
                                  rendersWithMotion: !0,
                                  scopeId: `yfIxy7MeB`,
                                  children: l(Qt, {
                                    height: `100%`,
                                    id: `MA_0DXTMx`,
                                    layoutId: `MA_0DXTMx`,
                                    variant: Q(`YOkwwmVah`),
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                    l(y.div, {
                      "aria-label": `hideevent`,
                      className: `framer-kbg13q`,
                      layout: G,
                      transformTemplate: mn,
                      children: l(N, {
                        height: 748,
                        y: (f?.y || 0) + 126 + 0,
                        children: l(k, {
                          className: `framer-1s4rofz-container`,
                          nodeId: `RV25jMTWu`,
                          scopeId: `yfIxy7MeB`,
                          children: l(z, {
                            breakpoint: U,
                            overrides: {
                              qvMgtyqoZ: { variant: Q(`W8VQLmvFr`) },
                              SM0_wLNHj: { variant: Q(`uf7QtVo4Q`) },
                              wiMI7jLSN: { variant: Q(`EeltZFEZ4`) },
                            },
                            children: l(Pe, {
                              height: `100%`,
                              id: `RV25jMTWu`,
                              layoutId: `RV25jMTWu`,
                              variant: Q(`sggmzhqFZ`),
                              width: `100%`,
                            }),
                          }),
                        }),
                      }),
                    }),
                    l(N, {
                      height: 1e3,
                      width: f?.width || `100vw`,
                      y: 0,
                      children: l(k, {
                        className: `framer-1pavh7j-container`,
                        layout: G,
                        layoutScroll: !0,
                        nodeId: `zJirC5Pmj`,
                        scopeId: `yfIxy7MeB`,
                        children: l(be, {
                          height: `100%`,
                          id: `zJirC5Pmj`,
                          layoutId: `zJirC5Pmj`,
                          style: { height: `100%`, width: `100%` },
                          variant: Q(`FQQkCIBRu`),
                          width: `100%`,
                        }),
                      }),
                    }),
                    q() &&
                      l(rn, {
                        className: `framer-1jg3ys5 hidden-1wzffn0`,
                        "data-framer-name": `minimap`,
                        layout: G,
                        children: l(N, {
                          children: l(k, {
                            className: `framer-1go8fn5-container`,
                            isAuthoredByUser: !0,
                            nodeId: `VyAF9Zcrp`,
                            rendersWithMotion: !0,
                            scopeId: `yfIxy7MeB`,
                            children: l(it, {
                              bottomOvershoot: 8,
                              fitContent: !1,
                              height: `100%`,
                              id: `VyAF9Zcrp`,
                              image1: Z(de),
                              image10: Z(H),
                              image11: Z(Ce),
                              image12: Z(we),
                              image13: Z(Te),
                              image14: Z(Ee),
                              image15: Z(De),
                              image16: Z(Oe),
                              image17: Z(ke),
                              image18: Z(Ae),
                              image19: Z(je),
                              image2: Z(pe),
                              image20: Z(Me),
                              image3: Z(he),
                              image4: Z(ge),
                              image5: Z(_e),
                              image6: Z(ve),
                              image7: Z(ye),
                              image8: Z(xe),
                              image9: Z(Se),
                              itemBackground: `rgb(172, 172, 172)`,
                              itemGap: 7,
                              itemHeight: 26,
                              itemWidth: 43,
                              layoutId: `VyAF9Zcrp`,
                              maxVisibleItems: 10,
                              minOutlineHeight: 32,
                              outlineColor: `rgb(193, 193, 193)`,
                              outlineStroke: 1,
                              outlineWidth: 55,
                              paddingX: 1,
                              paddingY: 16,
                              style: { height: `100%`, width: `100%` },
                              targetAriaLabel: `Imgaeproject`,
                              width: `100%`,
                            }),
                          }),
                        }),
                      }),
                  ],
                }),
                l(`div`, { id: `overlay` }),
              ],
            }),
          })
        );
      }),
      [
        `.framer-j44d8.framer-1fx199x, .framer-j44d8 .framer-1fx199x { display: block; }`,
        `.framer-j44d8.framer-1aycho3 { align-content: center; align-items: center; background-color: #ececec; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1920px; }`,
        `.framer-j44d8 .framer-15wwhxa { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 100vh; justify-content: center; overflow: auto; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-1iojg43 { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 200px; overflow: var(--overflow-clip-fallback, clip); padding: 180px 16px 32px 16px; position: relative; width: 1px; }`,
        `.framer-j44d8 .framer-ratja1 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-ozybli { display: grid; flex: none; gap: 10px 20px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(16, minmax(50px, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); height: 290px; justify-content: center; left: 0px; mix-blend-mode: difference; overflow: visible; padding: 0px 20px 0px 20px; pointer-events: none; position: absolute; right: 0px; top: calc(50.00000000000002% - 290px / 2); z-index: 6; }`,
        `.framer-j44d8 .framer-1h5109u { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; grid-column: span 4; height: min-content; justify-content: center; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-yy5g0g { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 135px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-hkseky { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 40px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-14visgu { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 54px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-2uot6b, .framer-j44d8 .framer-4u3cbn, .framer-j44d8 .framer-8dmr6k { --framer-paragraph-spacing: 0px; flex: none; height: auto; mix-blend-mode: difference; position: relative; white-space: pre; width: auto; }`,
        `.framer-j44d8 .framer-1p6hcfn { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 310px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-15xuo83 { display: grid; flex: none; gap: 96px 20px; grid-auto-rows: minmax(0, 1fr); grid-template-columns: repeat(2, minmax(50px, 1fr)); grid-template-rows: repeat(1, minmax(0, 1fr)); height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-1uvw3 { align-content: flex-start; align-items: flex-start; align-self: start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 19px; height: min-content; justify-content: flex-start; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-15mk65b { --framer-paragraph-spacing: 0px; flex: none; height: auto; mix-blend-mode: difference; opacity: 0.5; position: relative; white-space: pre-wrap; width: 70px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-a6xcfh, .framer-j44d8 .framer-onk3pl, .framer-j44d8 .framer-dl51yu { --framer-paragraph-spacing: 0px; flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-18xpz6u { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 21px; height: min-content; justify-content: flex-start; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-ly69c5 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-1ygrvkj { --framer-paragraph-spacing: 0px; flex: none; height: auto; mix-blend-mode: difference; position: relative; white-space: pre-wrap; width: 89px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-1a6o4yb { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 12px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 0px 90px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-7zjyxv-container, .framer-j44d8 .framer-14jhfgg-container, .framer-j44d8 .framer-9jd1rb-container, .framer-j44d8 .framer-1y97ay6-container { flex: none; height: auto; position: relative; width: auto; }`,
        `.framer-j44d8 .framer-1xlj6vt { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 200px; overflow: var(--overflow-clip-fallback, clip); padding: 0px 0px 0px 88px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-fjocml { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 21px; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-96lpjk { align-self: start; flex: none; grid-column: span 11; height: 100%; justify-self: start; overflow: var(--overflow-clip-fallback, clip); position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-1la3cr0 { align-content: center; align-items: center; align-self: start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100%; justify-content: flex-start; justify-self: start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-2i0wwq { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px 20px; height: 24%; justify-content: center; left: 0px; mix-blend-mode: difference; overflow: var(--overflow-clip-fallback, clip); padding: 0px 20px 20px 20px; pointer-events: none; position: absolute; right: 0px; z-index: 7; }`,
        `.framer-j44d8 .framer-1f0rmkp { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; height: 100%; justify-content: space-between; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1px; }`,
        `.framer-j44d8 .framer-erbozi { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 96px 20px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; pointer-events: none; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-1fxgz7p { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; min-height: 21px; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 15%; }`,
        `.framer-j44d8 .framer-o5ubf7 { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 20px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-qt1h0q { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
        `.framer-j44d8 .framer-eu1hcs { --framer-paragraph-spacing: 0px; flex: none; height: auto; mix-blend-mode: difference; opacity: 0; pointer-events: none; position: relative; white-space: pre; width: auto; }`,
        `.framer-j44d8 .framer-1gvdprc { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 85px; height: 100%; justify-content: flex-start; overflow: auto; padding: 0px; position: relative; width: 1px; z-index: 2; }`,
        `.framer-j44d8 .framer-snafkt { flex: none; height: 21.5vh; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-is66ly-container, .framer-j44d8 .framer-1yecd42-container, .framer-j44d8 .framer-1doq1po-container, .framer-j44d8 .framer-n93xn8-container, .framer-j44d8 .framer-i63447-container, .framer-j44d8 .framer-39d0np-container, .framer-j44d8 .framer-hj8gel-container, .framer-j44d8 .framer-4lzn5j-container, .framer-j44d8 .framer-f86iu-container, .framer-j44d8 .framer-109hr6x-container, .framer-j44d8 .framer-1v5mbc5-container, .framer-j44d8 .framer-gy68vo-container, .framer-j44d8 .framer-ywuf66-container, .framer-j44d8 .framer-19tixrj-container, .framer-j44d8 .framer-1n2dkpk-container, .framer-j44d8 .framer-18qhrbz-container, .framer-j44d8 .framer-1m2tzbt-container, .framer-j44d8 .framer-1s1f78k-container, .framer-j44d8 .framer-5yd59t-container, .framer-j44d8 .framer-omtuz1-container { flex: none; height: auto; position: relative; width: 45%; }`,
        `.framer-j44d8 .framer-16iigdf { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 16px; height: 100vh; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 950px; }`,
        `.framer-j44d8 .framer-i848y9 { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 950px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-17vttwe-container { flex: none; height: 100vh; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; z-index: 10; }`,
        `.framer-j44d8 .framer-cbpm1x { align-content: center; align-items: center; bottom: 32px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; pointer-events: none; position: absolute; right: 32px; width: 75%; z-index: 8; }`,
        `.framer-j44d8 .framer-obwklw { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        `.framer-j44d8 .framer-touf5d { align-content: flex-end; align-items: flex-end; background-color: #ececec; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 100vh; justify-content: flex-end; left: 0px; opacity: 0; overflow: var(--overflow-clip-fallback, clip); padding: 16px; pointer-events: none; position: fixed; right: 0px; top: 0px; z-index: 8; }`,
        `.framer-j44d8 .framer-kpfsfr { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; height: 71%; justify-content: space-between; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-mcch6n { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-j44d8 .framer-ha46w0 { --framer-link-text-color: #0099ff; --framer-link-text-decoration: underline; flex: none; height: auto; position: relative; white-space: pre; width: auto; z-index: 1; }`,
        `.framer-j44d8 .framer-k0tv4m { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 180px; }`,
        `.framer-j44d8 .framer-hmk8sd-container { flex: none; height: auto; pointer-events: auto; position: relative; width: auto; }`,
        `.framer-j44d8 .framer-1f2vmy5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
        `.framer-j44d8 .framer-1cwy04z-container { bottom: 0px; flex: none; height: auto; position: absolute; right: 0px; width: auto; z-index: 9; }`,
        `.framer-j44d8 .framer-kbg13q { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px; position: absolute; top: 50%; transform: translate(-50%, -50%); width: min-content; z-index: 9; }`,
        `.framer-j44d8 .framer-1s4rofz-container { flex: none; height: auto; position: relative; width: auto; z-index: 9; }`,
        `.framer-j44d8 .framer-1pavh7j-container { flex: none; height: 100vh; left: 0px; pointer-events: none; position: fixed; right: 0px; top: 0px; z-index: 10; }`,
        `.framer-j44d8 .framer-1jg3ys5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px 20px; height: 190px; justify-content: flex-end; left: 0px; overflow: visible; padding: 0px 20px 0px 20px; pointer-events: none; position: absolute; right: 0px; top: calc(50.00000000000002% - 190px / 2); z-index: 6; }`,
        `.framer-j44d8 .framer-1go8fn5-container { flex: none; height: 40vh; pointer-events: auto; position: absolute; right: 20px; top: calc(50.00000000000002% - 40vh / 2); width: 98px; z-index: 1; }`,
        ...he,
        ...U,
        ...Re,
        ...de,
        `@media (max-width: 1099.98px) { .framer-j44d8.framer-1aycho3 { width: 390px; } .framer-j44d8 .framer-15wwhxa { flex-direction: column; overflow-x: hidden; } .framer-j44d8 .framer-1iojg43 { flex: none; flex-direction: column; min-height: unset; width: 100%; } .framer-j44d8 .framer-ratja1 { flex: none; width: 100%; } .framer-j44d8 .framer-ozybli { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; height: min-content; left: unset; position: relative; right: unset; top: unset; width: 100%; } .framer-j44d8 .framer-1h5109u { align-self: unset; order: 0; } .framer-j44d8 .framer-14visgu { gap: 16px; } .framer-j44d8 .framer-2uot6b { white-space: pre-wrap; width: 71px; word-break: break-word; word-wrap: break-word; } .framer-j44d8 .framer-1p6hcfn { flex: 1 0 0px; width: 1px; } .framer-j44d8 .framer-15xuo83 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 16px; justify-content: flex-start; } .framer-j44d8 .framer-1uvw3 { align-self: unset; gap: 0px; width: 208px; } .framer-j44d8 .framer-15mk65b { width: 87px; } .framer-j44d8 .framer-a6xcfh { flex: none; width: 255px; } .framer-j44d8 .framer-18xpz6u { align-self: unset; gap: 10px; width: 111px; } .framer-j44d8 .framer-onk3pl { flex: none; white-space: pre; width: auto; } .framer-j44d8 .framer-ly69c5 { gap: 17px; } .framer-j44d8 .framer-1ygrvkj { white-space: pre; width: auto; } .framer-j44d8 .framer-1xlj6vt { flex-direction: column; min-height: unset; } .framer-j44d8 .framer-96lpjk { align-self: unset; height: 48px; order: 1; width: 63px; } .framer-j44d8 .framer-1gvdprc { gap: 16px; height: 1px; overflow: visible; padding: 0px 16px 0px 16px; width: 100%; } .framer-j44d8 .framer-is66ly-container, .framer-j44d8 .framer-1yecd42-container, .framer-j44d8 .framer-1doq1po-container, .framer-j44d8 .framer-i63447-container, .framer-j44d8 .framer-39d0np-container, .framer-j44d8 .framer-4lzn5j-container { aspect-ratio: 1.819672131147541 / 1; width: 100%; } .framer-j44d8 .framer-n93xn8-container, .framer-j44d8 .framer-hj8gel-container { aspect-ratio: 1.8246575342465754 / 1; width: 100%; } .framer-j44d8 .framer-f86iu-container, .framer-j44d8 .framer-109hr6x-container, .framer-j44d8 .framer-1v5mbc5-container, .framer-j44d8 .framer-gy68vo-container, .framer-j44d8 .framer-ywuf66-container, .framer-j44d8 .framer-19tixrj-container, .framer-j44d8 .framer-1n2dkpk-container, .framer-j44d8 .framer-18qhrbz-container, .framer-j44d8 .framer-1m2tzbt-container, .framer-j44d8 .framer-1s1f78k-container, .framer-j44d8 .framer-5yd59t-container, .framer-j44d8 .framer-omtuz1-container { aspect-ratio: 1.8200716119990599 / 1; width: 100%; } .framer-j44d8 .framer-16iigdf { width: 100%; }}`,
        `@media (min-width: 1100px) and (max-width: 1919.98px) { .framer-j44d8.framer-1aycho3 { width: 1100px; } .framer-j44d8 .framer-ozybli { height: 190px; top: calc(50.00000000000002% - 190px / 2); } .framer-j44d8 .framer-14visgu { gap: 74px; } .framer-j44d8 .framer-1p6hcfn { width: 210px; } .framer-j44d8 .framer-15xuo83 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; justify-content: flex-start; } .framer-j44d8 .framer-1uvw3 { align-self: unset; gap: 34px; width: 215px; } .framer-j44d8 .framer-18xpz6u { align-self: unset; width: 218px; } .framer-j44d8 .framer-1ygrvkj { width: 104px; } .framer-j44d8 .framer-1a6o4yb { gap: 40px; padding: 0px 0px 0px 104px; } .framer-j44d8 .framer-1fxgz7p { width: 24%; }}`,
        `@media (min-width: 2560px) { .framer-j44d8.framer-1aycho3 { width: 2560px; } .framer-j44d8 .framer-14visgu { gap: 99px; } .framer-j44d8 .framer-1p6hcfn { width: 351px; } .framer-j44d8 .framer-15xuo83 { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; } .framer-j44d8 .framer-1uvw3 { align-self: unset; gap: 55px; width: 300px; } .framer-j44d8 .framer-15mk65b { width: 85px; } .framer-j44d8 .framer-18xpz6u { align-self: unset; width: 218px; } .framer-j44d8 .framer-ly69c5 { gap: 3px; } .framer-j44d8 .framer-1ygrvkj { width: 137px; } .framer-j44d8 .framer-1a6o4yb { gap: 51px; padding: 0px 0px 0px 140px; } .framer-j44d8 .framer-1fxgz7p { width: 334px; } .framer-j44d8 .framer-cbpm1x { width: 60%; }}`,
      ],
      `framer-j44d8`,
    )),
    ($.displayName = `project`),
    ($.defaultProps = { height: 800, width: 1920 }),
    T(
      $,
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
              cssFamilyName: `BT Grotesk Medium`,
              source: `custom`,
              style: `normal`,
              uiFamilyName: `BT Grotesk`,
              url: `https://framerusercontent.com/assets/pczyWZYmicHp9LhGgMJo7tnDcHo.woff2`,
              weight: `500`,
            },
          ],
        },
        ...Vt,
        ...Wt,
        ...qt,
        ...Yt,
        ...Xt,
        ...Zt,
        ...en,
        ...tn,
        ...nn,
        ...V(_e),
        ...V(Be),
        ...V(ze),
        ...V(ge),
      ],
      { supportsExplicitInterCodegen: !0 },
    ),
    ($.loader = {
      load: (e, t) => {
        let n = t.locale;
        return Promise.allSettled([
          D.get(_n(E(t.pathVariables, `yfIxy7MeB`)), n).preload(),
          S(Ue, {}, t),
          S(H, {}, t),
          S(Pe, {}, t),
          S(be, {}, t),
        ]);
      },
    }),
    (yn = {
      exports: {
        queryParamNames: {
          type: `variable`,
          annotations: { framerContractVersion: `1` },
        },
        default: {
          type: `reactComponent`,
          name: `FrameryfIxy7MeB`,
          slots: [],
          annotations: {
            framerColorSyntax: `true`,
            framerAutoSizeImages: `true`,
            framerScrollSections: `false`,
            framerComponentViewportWidth: `true`,
            framerDisplayContentsDiv: `false`,
            framerAcceptsLayoutTemplate: `true`,
            framerIntrinsicHeight: `800`,
            framerLayoutTemplateFlowEffect: `true`,
            framerImmutableVariables: `true`,
            framerCanvasComponentVariantDetails: `{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"wiMI7jLSN":{"layout":["fixed","auto"]},"SM0_wLNHj":{"layout":["fixed","auto"]},"qvMgtyqoZ":{"layout":["fixed","auto"]}}}`,
            framerResponsiveScreen: `true`,
            framerContractVersion: `1`,
            framerIntrinsicWidth: `1920`,
          },
        },
        Props: { type: `tsType`, annotations: { framerContractVersion: `1` } },
        __FramerMetadata__: { type: `variable` },
      },
    }));
})();
export { yn as __FramerMetadata__, $ as default, sn as queryParamNames };
//# sourceMappingURL=XOzdk9rlv5tWNrYoQw1RQje4QGGSA8Sgr_DPR8t_R9M.D5F_pS9F.mjs.map
