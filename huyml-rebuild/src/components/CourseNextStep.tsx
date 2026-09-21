import { useEffect, useRef, useState } from "react";
import "./course-next-step.css";

const WECHAT_ID = "Zora_studio9";

export function CourseNextStep() {
  const [copyMessage, setCopyMessage] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyWechatId() {
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopyMessage("已复制");
    } catch {
      setCopyMessage("请长按或选中微信号复制");
    }
    copyTimer.current = setTimeout(() => setCopyMessage(""), 2400);
  }

  return (
    <section
      className="course-next-step"
      id="course-info"
      aria-labelledby="course-info-title"
    >
      <div className="cn-inner">
        <div className="cn-invitation">
          <span>AI 应用体系实战课</span>
          <h2 id="course-info-title">
            带上你的目标，
            <br />
            做出自己的作品。
          </h2>
          <p>
            从学习、求职、工作到创作与商业探索，
            <br />把 AI 方法串成自己的 SOP，再把想法变成产品与作品。
          </p>
        </div>
        <div className="cn-details">
          <dl>
            <div>
              <dt>课程时长</dt>
              <dd>3 天 / 18 小时</dd>
            </div>
            <div>
              <dt>课堂方式</dt>
              <dd>讲解、动手跟练、点评答疑</dd>
            </div>
            <div>
              <dt>开课信息</dt>
              <dd>10 月 3–5 日（国庆）· 广东·深圳</dd>
            </div>
          </dl>
          <a className="cn-primary" href="#schedule">
            查看三天课程安排 <span aria-hidden="true">↗</span>
          </a>
          <a className="cn-secondary" href="#audience">
            了解适合人群与学习收获
          </a>
        </div>
        <figure className="cn-qr" id="course-registration" tabIndex={-1}>
          <a
            className="cn-qr-image"
            href="/assets/course-consultation-qr.png"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="放大查看课程咨询二维码"
          >
            <img
              src="/assets/course-consultation-qr.png"
              alt="课程咨询微信二维码"
              width="696"
              height="700"
              loading="lazy"
            />
          </a>
          <figcaption>
            <span className="cn-qr-heading">
              <span className="cn-qr-title">了解详情</span>
              <span className="cn-qr-name">· Zora Studio</span>
            </span>
            <span className="cn-qr-contact">
              <span>微信号：</span>
              <button
                className="cn-wechat-id"
                type="button"
                onClick={copyWechatId}
                aria-label={`复制微信号 ${WECHAT_ID}`}
              >
                {WECHAT_ID}
              </button>
              <span className="cn-copy-status" role="status">
                {copyMessage}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
