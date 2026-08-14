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
│   ├── Hero.astro           # 首屏 (右侧控制台手机 mockup)
│   ├── PhoneFrame.astro     # 可复用手机壳 (挖孔/状态栏/Home 指示条)
│   ├── mocks/               # App 界面忠实还原 mockup (cqw 缩放)
│   │   ├── ConsoleScreen.astro     # 控制台 (Hero + 截图 1)
│   │   ├── SessionsScreen.astro    # 会话列表 (截图 2)
│   │   ├── ChatScreen.astro        # 聊天页浅色 (截图 3)
│   │   ├── ApprovalScreen.astro    # 审批卡 (截图 4)
│   │   ├── QuestionScreen.astro    # Agent 提问卡 (截图 5)
│   │   ├── DarkChatScreen.astro    # 深色聊天 + Diff (截图 6)
│   │   └── (bits): MockAvatar / InstanceRow / SessionCard / TabBar / ChatHeader / ChatInput
│   ├── Features.astro       # 8 大特性
│   ├── SupportedAgents.astro # 支持的 Agent 状态表 (对齐 ProtocolRegistry)
│   ├── Architecture.astro   # 架构图 (inline SVG)
│   ├── Screenshots.astro    # 6 屏 mockup 网格 (可填 img 换真截图)
│   └── Download.astro       # 下载 CTA
├── pages/
│   ├── index.astro          # 中文 landing
│   ├── guide.astro          # 使用指南(单页 + 锚点)
│   └── privacy.astro        # 隐私政策
└── styles/
    └── global.css           # Tailwind theme tokens + components + mock UI
```

## Design Tokens

| Token | Value |
|---|---|
| Accent | `#2867E4` (App 真实 brand,对齐 `color.json`) |
| BG | `#0a0a0b` (dark first) |
| Text | `#e8e8ea` |
| App 浅色 | `bg #eef1f5 / surface #fff / fg #0f141c` (手机 mockup) |
| App 深色 | `bg #0e1014 / surface #191d24 / fg #e6ebf2` (手机 mockup) |
| Sans | HarmonyOS Sans SC, Source Han Sans SC, system fallback |
| Mono | JetBrains Mono, Berkeley Mono, ui-monospace fallback |

## Deploy

Vercel 子域名 `agent-cast.vercel.app`,真域名 (`agent-cast.app`) 申请完成后改 CNAME。

## i18n

- 默认路由 `/` = 中文
- 英文子路由 `/en/`（暂未实现,优先级低）