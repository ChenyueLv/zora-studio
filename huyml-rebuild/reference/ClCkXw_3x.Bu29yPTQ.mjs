import { t as e } from "./rolldown-runtime.Dh6celcD.mjs";
import {
  E as t,
  M as n,
  O as r,
  S as i,
  _ as a,
  c as o,
  h as s,
  k as c,
  l,
  o as u,
} from "./react.BaDOPo3t.mjs";
import { a as d, r as f, t as p, x as m } from "./motion.BPkLvCVm.mjs";
import {
  A as h,
  E as g,
  G as _,
  R as v,
  T as y,
  gt as b,
  ht as x,
  i as S,
  o as C,
  rt as w,
  ut as T,
  w as E,
} from "./framer.BeBZUbg6.mjs";
import { c as D, l as O } from "./shared-lib.DyD4REXM.mjs";
function k(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var A,
  j,
  M,
  N,
  P,
  F,
  I,
  L,
  R,
  z,
  B,
  V,
  H = e(() => {
    (u(),
      _(),
      p(),
      i(),
      O(),
      (A = v(D)),
      (j = [`wRj3tt4VQ`, `gKJyN2gEK`, `o_CY8khIX`]),
      (M = `framer-ZZdFi`),
      (N = {
        gKJyN2gEK: `framer-v-1053ya1`,
        o_CY8khIX: `framer-v-1mznv8t`,
        wRj3tt4VQ: `framer-v-161e8hu`,
      }),
      (P = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (F = (e, t) => {
        if (!(!e || typeof e != `object`)) return { ...e, alt: t };
      }),
      (I = ({ value: e, children: t }) => {
        let n = r(d),
          i = e ?? n.transition,
          a = c(() => ({ ...n, transition: i }), [JSON.stringify(i)]);
        return o(d.Provider, { value: a, children: t });
      }),
      (L = { "Variant 1": `wRj3tt4VQ`, mobile: `gKJyN2gEK`, xl: `o_CY8khIX` }),
      (R = m.create(n)),
      (z = ({
        cMSTitle: e,
        height: t,
        id: n,
        title: r,
        useCMS: i,
        width: a,
        ...o
      }) => ({
        ...o,
        eR3H1qFCa: e ?? o.eR3H1qFCa ?? `[data-framer-name="Title"]`,
        hcif0bVY1: r ?? o.hcif0bVY1 ?? `About`,
        variant: L[o.variant] ?? o.variant ?? `wRj3tt4VQ`,
        XORQldie6: i ?? o.XORQldie6 ?? !0,
      })),
      (B = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (V = b(
        s(function (e, n) {
          let r = t(null),
            i = n ?? r,
            s = a(),
            { activeLocale: c, setLocale: u } = T();
          w();
          let {
              style: d,
              className: p,
              layoutId: g,
              variant: _,
              hcif0bVY1: v,
              eR3H1qFCa: y,
              XORQldie6: b,
              ...C
            } = z(e),
            {
              baseVariant: O,
              classNames: A,
              clearLoadingGesture: L,
              gestureHandlers: V,
              gestureVariant: H,
              isLoading: U,
              setGestureState: W,
              setVariant: G,
              variants: K,
            } = x({
              cycleOrder: j,
              defaultVariant: `wRj3tt4VQ`,
              ref: i,
              variant: _,
              variantClassNames: N,
            }),
            q = B(e, K),
            J = h(M);
          return o(f, {
            id: g ?? s,
            children: o(R, {
              animate: K,
              initial: !1,
              children: o(I, {
                value: P,
                children: l(m.div, {
                  ...C,
                  ...V,
                  className: h(J, `framer-161e8hu`, p, A),
                  "data-framer-name": `Variant 1`,
                  layoutDependency: q,
                  layoutId: `wRj3tt4VQ`,
                  ref: i,
                  style: { ...d },
                  ...k(
                    {
                      gKJyN2gEK: { "data-framer-name": `mobile` },
                      o_CY8khIX: { "data-framer-name": `xl` },
                    },
                    O,
                    H,
                  ),
                  children: [
                    o(S, {
                      children: o(E, {
                        className: `framer-ll8bdq-container`,
                        isAuthoredByUser: !0,
                        layoutDependency: q,
                        layoutId: `VlI2lOq7h-container`,
                        nodeId: `VlI2lOq7h`,
                        rendersWithMotion: !0,
                        scopeId: `ClCkXw_3x`,
                        children: o(D, {
                          cmsDetailTitleSelector: y,
                          color: `rgb(8, 8, 8)`,
                          delay: 1,
                          duration: 2,
                          easing: `cubic-bezier(0.77, 0, 0.18, 1)`,
                          font: {
                            fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                            fontSize: `80px`,
                            fontStyle: `normal`,
                            fontWeight: 400,
                            letterSpacing: `0em`,
                            lineHeight: `80%`,
                          },
                          height: `100%`,
                          id: `VlI2lOq7h`,
                          inHandImage: F(
                            {
                              pixelHeight: 2160,
                              pixelWidth: 3840,
                              src: `https://framerusercontent.com/images/Sd8idObvrpLxhseDZknjM3Sp62Q.png?width=3840&height=2160`,
                              srcSet: `https://framerusercontent.com/images/Sd8idObvrpLxhseDZknjM3Sp62Q.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/Sd8idObvrpLxhseDZknjM3Sp62Q.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/Sd8idObvrpLxhseDZknjM3Sp62Q.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/Sd8idObvrpLxhseDZknjM3Sp62Q.png?width=3840&height=2160 3840w`,
                            },
                            ``,
                          ),
                          inHandPosition: `top right`,
                          layoutId: `VlI2lOq7h`,
                          mobileInHandImage: F(
                            {
                              pixelHeight: 2402,
                              pixelWidth: 1462,
                              src: `https://framerusercontent.com/images/GJD8edZwhGbCdshTVv7qBsFQx4A.png?width=1462&height=2402`,
                              srcSet: `https://framerusercontent.com/images/GJD8edZwhGbCdshTVv7qBsFQx4A.png?scale-down-to=1024&width=1462&height=2402 623w,https://framerusercontent.com/images/GJD8edZwhGbCdshTVv7qBsFQx4A.png?scale-down-to=2048&width=1462&height=2402 1246w,https://framerusercontent.com/images/GJD8edZwhGbCdshTVv7qBsFQx4A.png?width=1462&height=2402 1462w`,
                            },
                            ``,
                          ),
                          mobileOutHandImage: F(
                            {
                              pixelHeight: 2402,
                              pixelWidth: 1462,
                              src: `https://framerusercontent.com/images/ixVvabEgJWH8QAUYBUbXRKDo.png?width=1462&height=2402`,
                              srcSet: `https://framerusercontent.com/images/ixVvabEgJWH8QAUYBUbXRKDo.png?scale-down-to=1024&width=1462&height=2402 623w,https://framerusercontent.com/images/ixVvabEgJWH8QAUYBUbXRKDo.png?scale-down-to=2048&width=1462&height=2402 1246w,https://framerusercontent.com/images/ixVvabEgJWH8QAUYBUbXRKDo.png?width=1462&height=2402 1462w`,
                            },
                            ``,
                          ),
                          outHandImage: F(
                            {
                              pixelHeight: 1857,
                              pixelWidth: 2900,
                              src: `https://framerusercontent.com/images/cU5mDU6KOeFQn8PofzSAaucv27Y.png?width=2900&height=1857`,
                              srcSet: `https://framerusercontent.com/images/cU5mDU6KOeFQn8PofzSAaucv27Y.png?scale-down-to=512&width=2900&height=1857 512w,https://framerusercontent.com/images/cU5mDU6KOeFQn8PofzSAaucv27Y.png?scale-down-to=1024&width=2900&height=1857 1024w,https://framerusercontent.com/images/cU5mDU6KOeFQn8PofzSAaucv27Y.png?scale-down-to=2048&width=2900&height=1857 2048w,https://framerusercontent.com/images/cU5mDU6KOeFQn8PofzSAaucv27Y.png?width=2900&height=1857 2900w`,
                            },
                            ``,
                          ),
                          outHandPosition: `bottom`,
                          showInHand: !1,
                          style: { height: `100%`, width: `100%` },
                          text: v,
                          textColor: `rgb(255, 255, 255)`,
                          useCmsTitle: b,
                          viewportVariant: `PC`,
                          width: `100%`,
                          ...k(
                            {
                              gKJyN2gEK: {
                                font: {
                                  fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                  fontSize: `32px`,
                                  fontStyle: `normal`,
                                  fontWeight: 400,
                                  letterSpacing: `0.01em`,
                                  lineHeight: `100%`,
                                },
                                viewportVariant: `Mobile`,
                              },
                              o_CY8khIX: {
                                font: {
                                  fontFamily: `"BT Glyphius Regular", "BT Glyphius Regular Placeholder", sans-serif`,
                                  fontSize: `130px`,
                                  fontStyle: `normal`,
                                  fontWeight: 400,
                                  letterSpacing: `0em`,
                                  lineHeight: `80%`,
                                },
                              },
                            },
                            O,
                            H,
                          ),
                        }),
                      }),
                    }),
                    o(m.div, {
                      "aria-label": `overlay`,
                      className: `framer-1nwk0ck`,
                      "data-framer-name": `overlay`,
                      layoutDependency: q,
                      layoutId: `PpsPCXgun`,
                      style: { backgroundColor: `rgb(8, 8, 8)` },
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `.framer-ZZdFi.framer-amldoj, .framer-ZZdFi .framer-amldoj { display: block; }`,
          `.framer-ZZdFi.framer-161e8hu { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 800px; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1200px; }`,
          `.framer-ZZdFi .framer-ll8bdq-container { flex: 1 0 0px; height: 1px; pointer-events: none; position: relative; width: 100%; z-index: 8; }`,
          `.framer-ZZdFi .framer-1nwk0ck { bottom: 0px; flex: none; left: 0px; overflow: var(--overflow-clip-fallback, clip); pointer-events: none; position: absolute; right: 0px; top: 0px; z-index: 10; }`,
          `.framer-ZZdFi.framer-v-1053ya1.framer-161e8hu { width: 345px; }`,
        ],
        `framer-ZZdFi`,
      )),
      (V.displayName = `in transition`),
      (V.defaultProps = { height: 800, width: 1200 }),
      g(V, {
        variant: {
          options: [`wRj3tt4VQ`, `gKJyN2gEK`, `o_CY8khIX`],
          optionTitles: [`Variant 1`, `mobile`, `xl`],
          title: `Variant`,
          type: C.Enum,
        },
        hcif0bVY1: {
          defaultValue: `About`,
          displayTextArea: !1,
          title: `Title`,
          type: C.String,
        },
        onhcif0bVY1Change: { changes: `hcif0bVY1`, type: C.ChangeHandler },
        eR3H1qFCa: {
          defaultValue: `[data-framer-name="Title"]`,
          title: `CMS Title`,
          type: C.String,
        },
        oneR3H1qFCaChange: { changes: `eR3H1qFCa`, type: C.ChangeHandler },
        XORQldie6: { defaultValue: !0, title: `Use CMS`, type: C.Boolean },
        onXORQldie6Change: { changes: `XORQldie6`, type: C.ChangeHandler },
      }),
      y(
        V,
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
            ],
          },
          ...A,
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
export { H as n, V as t };
//# sourceMappingURL=ClCkXw_3x.Bu29yPTQ.mjs.map
