# Agent Cast 官方主页

Official website for [Agent Cast](https://github.com/atbeta/agent-cast) — HarmonyOS 原生「桌面 Agent 遥控器」。

中文为主,Astro 5.x + Tailwind CSS 4.x 构建,静态站点部署到 Vercel。

## Tech

- [Astro](https://astro.build) 5.x（静态输出,i18n `zh-CN` default + `en`）
- [Tailwind CSS](https://tailwindcss.com) 4.x via `@tailwindcss/vite`（CSS-first config）
- TypeScript strict
- pnpm 11.x

## Develop

```bash
pnpm install
pnpm dev      # local dev server (http://localhost:4321)
pnpm build    # production build → dist/
pnpm preview  # preview production build
```

## Structure

```
src/
├── layouts/
│   └── Layout.astro         # base layout (nav + footer + meta)
├── components/
│   ├── Nav.astro            # 顶部导航
│   ├── Footer.astro         # 页脚
│   ├── Hero.astro           # 首屏
│   ├── Features.astro       # 4 大特性
│   ├── SupportedAgents.astro # 支持的 Agent 状态表
│   ├── Architecture.astro   # 架构图 (inline SVG)
│   ├── Screenshots.astro    # 截图占位
│   └── Download.astro       # 下载 CTA
├── pages/
│   ├── index.astro          # 中文 landing
│   ├── guide.astro          # 使用指南(单页 + 锚点)
│   └── privacy.astro        # 隐私政策
└── styles/
    └── global.css           # Tailwind theme tokens + components
```

## Design Tokens

| Token | Value |
|---|---|
| Accent | `#007DFF` (HarmonyOS Blue) |
| BG | `#0a0a0b` (dark first) |
| Text | `#e8e8ea` |
| Sans | HarmonyOS Sans SC, Source Han Sans SC, system fallback |
| Mono | JetBrains Mono, Berkeley Mono, ui-monospace fallback |

## Deploy

Vercel 子域名 `agent-cast.vercel.app`,真域名 (`agent-cast.app`) 申请完成后改 CNAME。

## i18n

- 默认路由 `/` = 中文
- 英文子路由 `/en/`（暂未实现,优先级低）