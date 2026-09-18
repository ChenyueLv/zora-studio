import { useEffect, useState } from "react";

export const reportPages = ["增速演变", "品类变化", "渠道渗透"];
export const reportSources = [
  {
    label: "2022 国家统计局",
    url: "https://www.stats.gov.cn/sj/zxfb/202302/t20230228_1919011.html",
  },
  {
    label: "2023 国家统计局",
    url: "https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202401/t20240117_1946631.html",
  },
  {
    label: "2024 国家统计局",
    url: "https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202501/t20250117_1958327.html",
  },
  {
    label: "2025 国家统计局",
    url: "https://www.stats.gov.cn/sj/zxfb/202601/t20260119_1962323.html",
  },
];
// Published comparable-basis growth rates. Do not derive these from unrevised annual amounts.
export const retailGrowth = [4, 11, 7.2, 8.6];
export const categoryGrowth = [
  { label: "吃类", previous: 16, current: 14.5 },
  { label: "穿类", previous: 1.5, current: 1.9 },
  { label: "用类", previous: 6.3, current: 4.1 },
];
const duration = 2400;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => 1 - (1 - clamp(n)) ** 3;
function useElapsed(animated: boolean, delay: number) {
  const reduced =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motion = animated && !reduced;
  const [elapsed, setElapsed] = useState(motion ? 0 : duration);
  useEffect(() => {
    if (!motion) {
      setElapsed(duration);
      return;
    }
    setElapsed(0);
    const started = Date.now() + delay;
    const timer = setInterval(() => {
      const next = Math.max(0, Math.min(duration, Date.now() - started));
      setElapsed(next);
      if (next === duration) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [motion, delay]);
  return motion ? elapsed : duration;
}

/** Data-driven website preview of the Skill's output; not a live PPT renderer. */
export function PptReportSlide({
  page,
  animated = false,
  wide = false,
  delay = 0,
}: {
  page: number;
  animated?: boolean;
  wide?: boolean;
  delay?: number;
}) {
  const elapsed = useElapsed(animated, delay);
  const extra = wide ? 200 : 0;
  const barScale = wide ? 37 : 27;
  const yearProgress = clamp((elapsed - 200) / 2000) * 3;
  const yearIndex = Math.min(3, Math.floor(yearProgress));
  const coords = retailGrowth.map((value, i) => [
    98 + i * (wide ? 226 : 174),
    377 - value * 18,
  ]);
  const points = coords.slice(0, yearIndex + 1);
  const from = coords[yearIndex],
    to = coords[Math.min(3, yearIndex + 1)];
  const fraction = yearProgress - yearIndex;
  const tip = [
    from[0] + (to[0] - from[0]) * fraction,
    from[1] + (to[1] - from[1]) * fraction,
  ];
  const line = [...points, tip].map((p) => p.join(",")).join(" ");
  const comparison = ease((elapsed - 250) / 1800);
  return (
    <svg
      viewBox={`0 0 ${960 + extra} 540`}
      className="ps-slide"
      data-motion={animated}
      role="img"
      aria-label={`电商行业调研报告：${reportPages[page]}`}
    >
      <rect width={960 + extra} height="540" fill="#f8f8f4" />
      <g
        fontFamily="Arial, PingFang SC, Microsoft YaHei, sans-serif"
        fill="#262724"
      >
        <text x="42" y="38" fontSize="14" letterSpacing="1">
          ZORA / 电商行业调研报告
        </text>
        <text
          x={918 + extra}
          y="38"
          textAnchor="end"
          fontSize="14"
          fill="#777870"
        >
          {page === 0 ? "2022—2025" : "2025 年度"} · 0{page + 1}
        </text>
        <path d={`M42 55H${918 + extra}`} stroke="#dedfd8" />
        {page === 0 ? (
          <>
            <text x="42" y="105" fontSize="34" fontWeight="600">
              网上零售增速，2025 年回升至 8.6%
            </text>
            <text x="42" y="139" fontSize="17" fill="#777870">
              全国网上零售额同比增速（%） · 各年官方可比口径
            </text>
            {[0, 4, 8, 12].map((tick) => (
              <g key={tick}>
                <path
                  d={`M82 ${377 - tick * 18}H${635 + extra * 0.78}`}
                  stroke="#e5e5df"
                />
                <text
                  x="68"
                  y={383 - tick * 18}
                  textAnchor="end"
                  fontSize="15"
                  fill="#777870"
                >
                  {tick}
                </text>
              </g>
            ))}
            <polygon points={`98,377 ${line} ${tip[0]},377`} fill="#e85b5017" />
            <polyline
              points={line}
              fill="none"
              stroke="#df6253"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {coords.map(([x, y], i) => (
              <g key={i}>
                <text
                  x={x}
                  y="412"
                  textAnchor="middle"
                  fontSize="17"
                  fill={yearIndex === i ? "#262724" : "#898a82"}
                >
                  {2022 + i}
                </text>
                <g opacity={yearProgress >= i ? 1 : 0.15}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={yearProgress >= i ? "#df6253" : "#d6d7cf"}
                  />
                  <text
                    x={x}
                    y={y - 17}
                    textAnchor="middle"
                    fontSize="23"
                    fontWeight="600"
                  >
                    {retailGrowth[i].toFixed(1)}%
                  </text>
                </g>
              </g>
            ))}
            <circle cx={tip[0]} cy={tip[1]} r="10" fill="#df625324" />
            <path d={`M${679 + extra} 165V430`} stroke="#dedfd8" />
            <text x={713 + extra} y="187" fontSize="17" fill="#777870">
              {2022 + yearIndex} 年同比增速
            </text>
            <text x={709 + extra} y="258" fontSize="66" fontWeight="500">
              {retailGrowth[yearIndex].toFixed(1)}
              <tspan fontSize="28">%</tspan>
            </text>
            <text x={713 + extra} y="319" fontSize="18">
              2024 → 2025
            </text>
            <text x={709 + extra} y="366" fontSize="26" fill="#c95647">
              7.2% → 8.6%
            </text>
            <text x={713 + extra} y="408" fontSize="15" fill="#777870">
              增速回升，需区分品类表现
            </text>
            <text x="42" y="457" fontSize="16">
              观察：2023 年增速较高，2024 年放缓，2025 年有所回升。
            </text>
          </>
        ) : page === 1 ? (
          <>
            <text x="42" y="105" fontSize="34" fontWeight="600">
              品类增长分化，吃类保持两位数增长
            </text>
            <text x="42" y="139" fontSize="17" fill="#777870">
              实物商品网上零售额同比增速（%）
            </text>
            <rect
              x={640 + extra}
              y="124"
              width="15"
              height="10"
              fill="#cccec5"
            />
            <text x={664 + extra} y="135" fontSize="14">
              2024
            </text>
            <rect
              x={738 + extra}
              y="124"
              width="15"
              height="10"
              fill="#df6253"
            />
            <text x={762 + extra} y="135" fontSize="14">
              2025
            </text>
            {[0, 5, 10, 15].map((tick) => (
              <g key={tick}>
                <path
                  d={`M${174 + tick * barScale} 166V419`}
                  stroke="#e7e7e0"
                />
                <text
                  x={174 + tick * barScale}
                  y="443"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#777870"
                >
                  {tick}%
                </text>
              </g>
            ))}
            {categoryGrowth.map((item, i) => {
              const y = 192 + i * 84;
              const value =
                item.previous + (item.current - item.previous) * comparison;
              const difference = item.current - item.previous;
              return (
                <g key={item.label}>
                  <text x="43" y={y + 19} fontSize="24">
                    {item.label}
                  </text>
                  <rect
                    x="174"
                    y={y - 9}
                    width={item.previous * barScale}
                    height="14"
                    rx="2"
                    fill="#cccec5"
                  />
                  <rect
                    x="174"
                    y={y + 13}
                    width={value * barScale}
                    height="24"
                    rx="2"
                    fill="#df6253"
                  />
                  <text
                    x={174 + value * barScale + 13}
                    y={y + 32}
                    fontSize="23"
                    fontWeight="600"
                  >
                    {value.toFixed(1)}%
                  </text>
                  <text
                    x={770 + extra}
                    y={y + 19}
                    fontSize="17"
                    fill={difference > 0 ? "#555d51" : "#b35d4e"}
                  >
                    {item.previous.toFixed(1)}% → {item.current.toFixed(1)}%
                  </text>
                </g>
              );
            })}
            <text x={770 + extra} y="170" fontSize="14" fill="#777870">
              2024 → 2025
            </text>
            <text x="42" y="478" fontSize="16">
              观察：吃类增速最高；穿类小幅加快，用类增速回落。
            </text>
          </>
        ) : (
          <>
            <text x="42" y="105" fontSize="34" fontWeight="600">
              实物网零占社零 26.1%，线上仍是重要渠道
            </text>
            <text x="42" y="139" fontSize="17" fill="#777870">
              2025 年社会消费品零售总额的渠道结构
            </text>
            <circle
              cx={243 + extra * 0.35}
              cy="298"
              r="114"
              stroke="#e5e6df"
              strokeWidth="31"
              fill="none"
            />
            <circle
              cx={243 + extra * 0.35}
              cy="298"
              r="114"
              stroke="#df6253"
              strokeWidth="31"
              fill="none"
              pathLength="100"
              strokeDasharray={`${26.1 * ease((elapsed - 200) / 1800)} 100`}
              transform={`rotate(-90 ${243 + extra * 0.35} 298)`}
            />
            <text
              x={243 + extra * 0.35}
              y="298"
              textAnchor="middle"
              fontSize="53"
              fontWeight="500"
            >
              {(26.1 * ease((elapsed - 200) / 1800)).toFixed(1)}
              <tspan fontSize="25">%</tspan>
            </text>
            <text
              x={243 + extra * 0.35}
              y="330"
              textAnchor="middle"
              fontSize="17"
              fill="#777870"
            >
              实物商品网上零售额占比
            </text>
            <rect
              x={116 + extra * 0.35}
              y="453"
              width="13"
              height="13"
              fill="#df6253"
            />
            <text x={138 + extra * 0.35} y="465" fontSize="14">
              实物网零
            </text>
            <rect
              x={254 + extra * 0.35}
              y="453"
              width="13"
              height="13"
              fill="#e5e6df"
            />
            <text x={276 + extra * 0.35} y="465" fontSize="14">
              其他社零 73.9%
            </text>
            <path d={`M${439 + extra * 0.55} 176V453`} stroke="#dedfd8" />
            <text x={480 + extra * 0.55} y="195" fontSize="17" fill="#777870">
              实物商品网上零售额
            </text>
            <text x={479 + extra * 0.55} y="255" fontSize="54">
              13.09<tspan fontSize="21"> 万亿元</tspan>
            </text>
            <text x={480 + extra * 0.55} y="289" fontSize="17">
              同比增长 5.2%
            </text>
            <path
              d={`M${480 + extra * 0.55} 316H${912 + extra}`}
              stroke="#dedfd8"
            />
            <text x={480 + extra * 0.55} y="354" fontSize="21" fontWeight="600">
              经营启示
            </text>
            <text x={480 + extra * 0.55} y="391" fontSize="18">
              按品类匹配线上投入，兼顾渠道协同。
            </text>
            <text x={480 + extra * 0.55} y="426" fontSize="16" fill="#777870">
              结合获客成本、毛利与复购验证策略。
            </text>
            <text x={480 + extra * 0.55} y="463" fontSize="13" fill="#777870">
              经营启示为分析建议，不代表统计结论。
            </text>
          </>
        )}
        <path d={`M42 495H${918 + extra}`} stroke="#dedfd8" />
        <text x="42" y="520" fontSize="11" fill="#777870">
          来源：国家统计局{" "}
          {page === 0
            ? "2022—2025 年公开数据；同比均为官方可比口径。"
            : page === 1
              ? "2024、2025 年全年数据；动画展示两年增速差异。"
              : "2025 年全年数据；金额四舍五入，社零含线下实物及餐饮等。"}
        </text>
        <text
          x={918 + extra}
          y="520"
          textAnchor="end"
          fontSize="12"
          fill="#777870"
        >
          研究节选
        </text>
      </g>
    </svg>
  );
}
