<div align="center">

# 🔭 LaunchLens

### 把黑客松想法变成「可评分 · 可连接 · 可提交」的项目工作区

**面向 UCWS Singapore Hackathon 2026 的浏览器端黑客松项目协作与提交平台 —— 把最后的「提交」从一份静态表单，变成一个可操作的工作台。**

组织项目字段 · 构建想法星图 · 运行本地 Agent · 审计证据 · 扫描仓库 · 一键生成可提交材料

![type](https://img.shields.io/badge/type-Static%20Web%20App-1f6feb)
![render](https://img.shields.io/badge/render-Three.js%20%2B%20Canvas%20fallback-8957e5)
![deploy](https://img.shields.io/badge/deploy-Pages%20%7C%20Vercel%20%7C%20Netlify-2da44e)
![i18n](https://img.shields.io/badge/i18n-中文%20%7C%20English-d29922)
![track](https://img.shields.io/badge/UCWS%202026-Application-555)

**简体中文**　·　[**English**](README.en.md)

</div>

---

## ✨ 这是什么

**LaunchLens** 是为 **UCWS Singapore Hackathon 2026**（Application 赛道）打造的浏览器端项目协作与提交平台。它把项目字段、Demo 证据、GitHub 仓库信号、想法图谱、Agent 输出和最终提交材料组织在同一个可操作工作区里，帮助团队从「项目能跑」推进到「项目能被社区、AI 和专家清楚评审」。

它用原生 HTML / CSS / JavaScript 构建，**无需构建步骤**，可选 Three.js 3D 渲染并带 Canvas 兜底，可选 Supabase 后端做团队同步。所有面向用户的功能都在浏览器本地运行。

适用人群：**黑客松团队、独立开发者、社区评审、Demo Day 组织者。**

![LaunchLens Hub 截图](assets/screenshot-hub.png)

## 🧩 三种工作模式

| | 🏛️ Temple（神殿） | 🌌 Hackathon Hub（星图） | 🛠️ Platform Console（控制台） |
|:--|:--|:--|:--|
| 形态 | 2.5D 空间化流程入口 | 可拖拽的想法关系星图 | 引导式操作工作区 |
| 交互 | 拖拽工作台、滚轮视差、点击节点 | 拖拽 / 缩放 / 搜索节点 | 流程步骤 + 面板操作 |
| 内容 | Story / Proof / Score / Agent / Pack / Ship 六步，每步可下载 Markdown | 想法、Agent、证据、工具、交付节点连成一张图 | Agent Studio、演示教程、想法归档、工具推荐、Supabase 同步 |
| 渲染 | Three.js 动态工作台 + Canvas 兜底 | Canvas 2D 星图渲染 | 表单 + 面板 |

> 🔁 三种模式共享同一份本地工作区快照，可通过 `?mode=hub` 进入星图、`?lang=zh` 切换语言，Platform Console 为默认视图。

## 🚀 核心能力

- **Temple Mode** — 2.5D 空间化流程，六个可点击节点（Story / Proof / Score / Agent / Pack / Ship）串起项目故事、证据、评分、Agent、打包与交付，支持拖拽与视差，每步可下载 Markdown 产物。
- **Hackathon Hub** — 参考 RepoScape 的产品模式，把想法、Agent、证据、工具和交付流程节点放进一张可拖拽、可缩放、可搜索的星图，并持久化节点坐标。
- **Project Manager** — 本地保存 / 读取完整工作区快照：项目字段、Hub 坐标、想法、Agent 运行记录、仓库扫描与生成材料。
- **Agent Studio** — 内置策略、证据、构建、演示、工具侦察、风险与 Re-Forge Gate 共七个本地 Agent，输出可执行的下一步清单。
- **Evidence Gate** — 审计 Project Wall 所需字段：Demo、仓库、技术栈、截图、Logo、团队。
- **Repo Scanner** — 用 GitHub 公共 API 检查 README、入口文件、测试 / QA 路径、部署配置、近期提交（公共仓库无需鉴权）。
- **Codex Bridge** — 导出 `graphOverview`、`selectedNeighborhood` 和 workspace snapshot，供 Codex / Claude Code / ClaudeCodex 读取同一份项目上下文。
- **Idea Archive** — 带父节点与相关节点关系的想法记录，在 Hub 中可视化。
- **三维评分模型** — 加权计算社区清晰度（30%）、AI 可评估仓库信号（30%）、专家商业价值（40%）；阈值标签 `ready`（≥82）/ `close`（≥62）/ `early`（<62）。
- **双语 UX** — 中英文界面，评分术语、任务建议与生成产物均本地化。
- **可选 LLM 槽位** — 用户自带 OpenAI 兼容端点用于文案润色；密钥仅保存在你的浏览器本地（localStorage），不入仓库、无任何硬编码 Key。

## 🛠️ 技术栈

| 层 | 技术 |
|:--|:--|
| 前端 | HTML · CSS · JavaScript（单页、无构建步骤） |
| 视觉交互 | Three.js 0.165.0（CDN 动态导入）动态 Temple 工作台，本地 Canvas 兜底；拖拽与滚轮视差；Canvas 可拖拽星图渲染；逐步下载动作 |
| 状态 | 浏览器 localStorage，结构化工作区快照，持久化 Hub 坐标 |
| Agents | 策略 / 证据 / 构建 / 演示 / 工具侦察 / 风险 / Re-Forge Gate —— 七个纯前端 JavaScript Agent |
| 后端（可选） | Supabase REST 后端 + SQL schema |
| 仓库信号 | GitHub 公共 API 仓库扫描 |
| API 契约 | OpenAPI 图谱契约、Codex workspace snapshot 示例、Codex / ClaudeCodex bridge JSON |
| 部署 | GitHub Pages · Vercel-ready 静态部署 · Netlify 配置 |
| LLM 槽位（可选） | 用户提供的 OpenAI 兼容 chat completion 端点 |
| QA | Node.js 测试、提交 payload 校验器、公共资源检查 |

## 🏁 快速开始

**① 本地运行**

```powershell
npm.cmd run serve:public-root
```

打开浏览器：

```text
http://localhost:8081/
http://localhost:8081/?mode=hub
http://localhost:8081/?lang=zh
```

**② 体验入口** — 拖动 Temple 工作台、用滚轮做视差、点击 Story / Proof / Score / Agent / Pack / Ship 各步，并下载每步的 Markdown 产物。

**③ 运行测试 & 校验提交**

```powershell
npm.cmd test
node tools\validate-submission.mjs
```

> `npm test` 依次运行 4 个测试套件：`scoring`、`evidence-gate`、`platform-core`、`ucws-sync`。`validate-submission` 会拦截非 HTTPS 的 GitHub 链接和占位团队成员。

常用脚本：

```text
npm run serve:public-root   本地服务（http://localhost:8081/）
npm run test                运行全部测试
npm run payload             构建提交 payload
npm run validate:submission 校验提交 JSON
npm run sync:ucws           同步 UCWS 项目墙数据
```

## 🗂️ 仓库结构

```text
launchlens/
  index.html                  App shell（含模式 / 语言切换）
  app.js                      UI 逻辑、Hub 星图、Agent Bridge、项目持久化
  platform-core.js            纯平台模型、Agents、图谱 API、Supabase 请求
  styles.css                  Temple / Hub / Classic 响应式样式
  api/                        OpenAPI 契约与 Codex workspace 示例
  assets/                     Logo、截图、社交卡、视觉资源
  data/                       可选的 UCWS 项目墙同步输出
  docs/                       提交说明、API 文档、attribution、部署手册
  supabase/                   可选工作区表 schema
  tests/                      scoring / evidence-gate / platform-core / ucws-sync 测试
  tools/                      本地服务、payload、GitHub、Vercel、同步等工具
```

## 🔗 在线访问与链接

- **GitHub 仓库**：<https://github.com/wangsiyi7/launchlens>
- **GitHub Pages Demo**：<https://wangsiyi7.github.io/launchlens/>
- **Hub Demo**：<https://wangsiyi7.github.io/launchlens/?mode=hub>
- **Logo**：<https://wangsiyi7.github.io/launchlens/assets/logo.svg>
- **姊妹项目 · UCWS Project Searcher 仓库**：<https://github.com/wangsiyi7/ucws-project-aggregator>
- **姊妹项目 Demo**：<https://wangsiyi7.github.io/ucws-project-aggregator/>
- **Vercel**：已配置 `vercel.json`（启用 clean URLs），等待账号授权后发布生产链接。

## 📦 UCWS 提交材料

- 中文提交文案（默认）：[PROJECT_WALL_SUBMISSION.md](PROJECT_WALL_SUBMISSION.md)
- 中文提交文案：[PROJECT_WALL_SUBMISSION.zh-CN.md](PROJECT_WALL_SUBMISSION.zh-CN.md)
- 英文提交文案：[PROJECT_WALL_SUBMISSION.en.md](PROJECT_WALL_SUBMISSION.en.md)
- 机器可读 payload：[project-payload.json](project-payload.json)
- 字段说明：[docs/PROJECT_WALL_FIELDS.md](docs/PROJECT_WALL_FIELDS.md)

> **UCWS 契合度**：覆盖 Application 赛道，对接 Community Vote（30%）、AI Evaluation（30%）、Expert Judges（40%）；以可运行的浏览器应用交付，附带公共 GitHub 仓库、测试、API 契约、部署配置与提交 payload 校验器。

## 📚 外部参考与合规

LaunchLens **没有复制以下项目源码**；它们仅作为方法论或产品模式参考，并在 [`docs/ATTRIBUTION.md`](docs/ATTRIBUTION.md) 中保留许可证链接：

- [Akasxh/re-forge](https://github.com/Akasxh/re-forge)（MIT）：多 Agent 对抗校验、证据基底、跨会话记忆与能力演进模式的**方法论参考**。
- [ThomasLix7/RepoScape](https://github.com/ThomasLix7/RepoScape)（MIT）：图优先 HUD、物理 / 认知关系模型与 Agent 互操作模式的**产品参考**。
- [EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026](https://github.com/EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026)：UCWS 官方活动归档，**仅作引用，未复制**。

## 🗺️ Roadmap

**已完成**
- [x] Temple Mode（2.5D 空间化流程）、Hackathon Hub（Canvas 可拖拽星图）、Platform Console
- [x] Agent Studio：策略 / 证据 / 构建 / 演示 / 工具侦察 / 风险 / Re-Forge Gate 七个本地 Agent
- [x] Evidence Gate 字段审计 + Repo Scanner（GitHub 公共 API 仓库信号）
- [x] 三维评分模型与 `ready / close / early` 阈值标签
- [x] Codex / ClaudeCodex Bridge + `api/openapi.json` 图谱契约
- [x] 中英文双语 UX，本地化评分、任务建议与生成产物
- [x] GitHub Pages 上线，提交材料（中 / 英 / payload）齐备并通过校验
- [x] 姊妹项目 UCWS Project Searcher（聚合官方仓库、项目墙快照、commit 历史、Agent handoff）

**计划中**
- [ ] Vercel 生产部署（已配置 `vercel.json`，等待账号授权）
- [ ] 首个真实使用周期：带鉴权的 Project Wall 导入与完整项目列表
- [ ] 仓库健康度检查与多赛事模板
- [ ] 团队协作能力与 RepoScape 兼容的图谱持久化（服务端实现 `GET /api/graph/overview`、`/api/graph/neighborhood`、`/api/agent/bridge`）
- [ ] 可选 Supabase 后端跨设备团队工作区与可选 LLM 文案润色的进一步打磨

## 👥 团队

| 成员 | 角色 | GitHub |
|:--|:--|:--|
| Annie | Team Captain | <https://github.com/Anniefsh/> |
| Yiang | Technical Development | <https://github.com/3231656738-creator> |
| Hu Yinghui | Product Manager | <https://github.com/hu-xiao-yu> |

## 🙏 致谢与合规

为 **UCWS Singapore Hackathon 2026** 打造 · 把黑客松想法变成可评分、可连接、可提交的项目工作区。

外部项目以方法论 / 产品模式形式参考并署名，未复制任何源码，详见 [`docs/ATTRIBUTION.md`](docs/ATTRIBUTION.md)。

<div align="center"><sub>Made with ❤️ for hackathon builders · UCWS 2026 · Application Track</sub></div>