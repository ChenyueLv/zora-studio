# 课程优势模块 · 三版视觉设计稿

2026-09-19，为「课程优势」模块生成的设计探索，未修改网页实现。

生成服务：已授权的 Sub2API，模型 `gpt-image-2`，CLI 模式。三版初稿采用独立提示词并行生成；C 版另作一次定向图像编辑，移除重复问句并调整字重。

## 比较

| 方案 | 设计方向 | 适合的取舍 | 预览 |
| --- | --- | --- | --- |
| A | 紧凑对话墙 | 对话感与亲和力最强，六项优势并列可读 | [A 设计稿](a-conversation-wall.png) |
| B | 横向对谈 | 阅读顺序明确，整体更克制 | [B 设计稿](b-editorial-interview.png) |
| C | 大小组合排版 | 突出自研平台、导师、实战与答疑，体系和复用作为补充 | [C 精修设计稿](c-asymmetric-dialogue-refined.png) |

这些是生图设计稿。选定方向后，再用网站现有字体与真实内容实现响应式页面；图片中的英文装饰、图标和字体形态不代表最终代码或服务承诺。

## 可复现提示词

- [A 提示词](a-conversation-wall.txt)
- [B 提示词](b-editorial-interview.txt)
- [C 提示词](c-asymmetric-dialogue.txt)
- [C 精修提示词](c-refinement.txt)
- [批量任务参数](prompts.jsonl)
- [C 初稿](c-asymmetric-dialogue.png)

初稿实际输出均为 1536 × 1024 PNG。
