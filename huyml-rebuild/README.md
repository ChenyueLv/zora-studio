# HUYML · 可编辑前端重建

参考站点：[huyml.co](https://huyml.co/)。这是一套独立的 React + TypeScript + Vite 工程，可直接编辑组件、样式和内容数据，不依赖 Framer 编辑器或原站服务端。

## 运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev -- --port 5173
```

打开 http://127.0.0.1:5173/ 。停止服务用 Ctrl+C。

```bash
npm run validate   # TypeScript + 内容/资源完整性检查 + 生产构建
npm run preview    # 预览 dist 生产构建
npm run format     # 格式化源码
```

## 已实现

- Work：首页十九张作品卡片的 WebGL 折叠、循环滚动、惯性拖动、吸附、点击选择/进入详情；项目资料、计数、调色板随选择更新。
- 十九个独立项目路由：完整图片画廊、缩略图定位、滚动标题变化、图片放大、上一张/下一张、下一个项目及外站链接。
- About：原始 Rive 人物、展开/合拢、九个兴趣热点、实际故事文案与照片、Process & Approach 弹层、奖项/能力/客户列表。
- Playground：八十三项图片和视频实验、响应式瀑布流、大图与视频预览、键盘和触摸翻页。
- 全站导航、手机菜单、品牌翻转、Contact/Credits 卡片、复制邮箱、越南本地时钟、音效开关、Showreel、路由过渡。
- 弹层支持 Escape、背景关闭、焦点循环；图片入口和画廊支持键盘操作；桌面与手机布局。

## 修改位置

| 需要修改 | 文件 |
| --- | --- |
| 项目名称、介绍、封面、颜色、链接、图片顺序 | `src/data/projects.json` |
| Playground 图片/视频/标题/顺序 | `src/data/playground.json` |
| 九个人物热点的文案和照片 | `src/data/hobbies.json` |
| 联系方式、社交链接、奖项、能力、客户 | `src/data/site.ts` |
| 页面排版、颜色、字体、断点、动效样式 | `src/styles.css` |
| 3D 卡片形状、摄像机、速度、拖动/吸附 | `src/lib/GalleryScene.ts` |
| 3D 形变与纹理着色 | `src/shaders/gallery.vert`、`gallery.frag` |
| 人物 Rive 绑定与兴趣弹层 | `src/pages/About.tsx` |
| 视频、图片放大、预览交互 | `src/components/Media.tsx` |
| 全局导航与转场 | `src/App.tsx`、`src/components/Header.tsx` |
| 本地图片、字体、音效、Rive 资源 | `public/assets/` |

项目图片换成自己的文件后，更新 JSON 中的 `/assets/文件名` 以及原图 `width` / `height`。修改项目数量时，也请同步调整 `scripts/audit-content.mjs` 的基准数量。九个 Rive 热点的绑定顺序位于 `About.tsx` 的 `hobbyTriggers`。

## 技术与资源

使用 React、Vite、TypeScript、Three.js、GSAP、Rive 开源运行时。重建时已安装并应用 `frontend-design` skill（Anthropic 官方 skills 仓库），其文件位于 `~/.codex/skills/frontend-design/SKILL.md`。

图片、字体、音效、Rive 文件和 Rive WASM 已存放本地。Vimeo 视频入口仍通过原站公开播放器联网加载，实际可播放性取决于 Vimeo 的网络和嵌入权限。当前验证环境的播放器未成功加载、视频配置接口返回 403，已提供本地封面及直达 Vimeo 的链接。项目不含原站分析脚本。

原站的 Rive 插画与 GLSL 着色器作为视觉资源复用：Rive 文件可用 Rive 编辑器打开；HTML/CSS/React 组件在源码中编辑。原始素材和设计的作者归属见 `THIRD_PARTY.md`，不等同于依赖库的开源许可。

重建基于可公开观察到的界面。路由过渡、惯性参数、弹层运动是独立实现，未承诺逐帧一致。验证范围和实际结果见 `QA.md`。

## 部署

`npm run build` 生成 `dist/`。部署静态文件时，将所有非资源路径回退到 `/index.html`，以支持 `/about`、`/playground`、`/project/:slug` 的直接访问。已附 Netlify `_redirects` 和 Vercel 配置。

## 参考资料

`reference/` 保存本次重建使用的公开页面快照、组件参考和素材 URL 清单，不参与运行。`scripts/extract-reference.py` 从这些快照提取可编辑 JSON；重新执行会覆盖数据文件，请先保存自己的改动。此脚本需要 Python 的 `beautifulsoup4` 和 `requests`。
