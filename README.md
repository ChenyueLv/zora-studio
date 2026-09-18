# Zora Studio

AI 应用实战课程网站，使用 React、TypeScript 和 Vite 构建。前端工程位于 `huyml-rebuild/`。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
cd huyml-rebuild
npm ci
npm run dev -- --port 5173
```

课程页面：<http://127.0.0.1:5173/ai-course/hero?scene=office>

## 页面内容

- 课程首屏：PPT Skill、Vibe Coding 教务系统、AI 漫剧、音乐与智能助手互动演示。
- 适合人群、学习成果、课程大纲、师资介绍与作品展示。
- 响应式布局、作品切换、动画与预览弹窗。

页面中的课程演示、预设问答和原型不等同于已接入实时 AI 服务；班期、费用与部分师资资料仍需补充。

## 检查与构建

在 `huyml-rebuild/` 目录执行：

```bash
npm run validate
npm test
npm run build
npm run preview
```

生产输出为 `huyml-rebuild/dist/`。部署平台的项目根目录设为 `huyml-rebuild`，构建命令为 `npm run build`，输出目录为 `dist`。非资源路径需要回退到 `index.html`；工程中已包含 Vercel 和 Netlify 的路由配置。

## 主要文件

- `huyml-rebuild/src/pages/CourseHero.tsx`：课程首屏与作品切换。
- `huyml-rebuild/src/pages/course-hero.css`：首屏排版与动画。
- `huyml-rebuild/src/components/`：作品卡片、课程大纲、师资与其他页面模块。
- `huyml-rebuild/public/`：图片、音频、视频等运行资源。

项目还保留早期视觉参考页面与实现资料。素材来源和归属见 [THIRD_PARTY.md](huyml-rebuild/THIRD_PARTY.md)，原工程说明见 [README.md](huyml-rebuild/README.md)。
