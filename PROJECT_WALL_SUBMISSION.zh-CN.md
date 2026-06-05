# LaunchLens UCWS Project Wall 提交材料（中文版）

这份文件用于复制到 UCWS Singapore Hackathon 2026 的 Epic Connector Project Wall。内容已经按 UCWS 官方事件页面的提交流程、赛道、评分结构和评审原则整理。

## 1. 直接复制字段

| 字段 | 内容 |
| --- | --- |
| Project Name | LaunchLens |
| Track | Application |
| Tagline | Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces. |
| 中文一句话 | 把黑客松想法变成可评分、可关联、可提交的项目工作区。 |
| Demo URL | https://wangsiyi7.github.io/launchlens/ |
| 推荐演示入口 | https://wangsiyi7.github.io/launchlens/?mode=hub |
| GitHub Repository URL | https://github.com/wangsiyi7/launchlens |
| Logo URL | https://wangsiyi7.github.io/launchlens/assets/logo.svg |
| Demo File URL | 不需要。当前 UCWS 官方事件接口显示 demoUploadEnabled=false，在线浏览器应用本身就是演示资产。 |
| LinkedIn URL | 未提供 |
| Team Member | wangsiyi7 - Builder - https://github.com/wangsiyi7 |

## 2. Screenshot URLs

```json
[
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-hub.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-platform.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-zh.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-mobile.png"
]
```

## 3. 项目描述（中文提交版）

LaunchLens 是一个面向黑客松团队、独立开发者、社区评审和 Demo Day 组织者的浏览器端协作平台。

很多黑客松项目并不是没有做出来，而是在最后提交阶段失去清晰度：Demo 链接不稳定，GitHub 仓库信息不完整，截图、README、技术栈、证据链和评审叙事之间无法对应，最终很难同时满足社区投票、AI 评估和专家评审的检查方式。

LaunchLens 把这个最后交付层变成一个可以持续运行的项目工作台。团队可以输入 Project Wall 字段，构建类似 RepoScape 的想法星图，运行本地项目 Agent，归档不同想法之间的关系，检查必须提交的证据，扫描公开 GitHub 仓库信号，并按 Community Vote、AI Evaluation、Expert Judges 三个维度评估提交准备度，最后生成可直接复制的提交材料。

当前版本包含 Hackathon Hub、2.5D Temple Mode、Platform Console、Agent Studio、Idea Archive、Evidence Gate、Repo Scanner、Codex API JSON 导出、可选 Supabase 同步、中英文界面，以及可选的 OpenAI-compatible LLM 文案优化入口。

UCWS 是 LaunchLens 的第一个完整使用场景，但它不是一次性填表工具。它被设计成一个长期黑客松协作平台，可以扩展到加速器 Demo Day、开源项目展示、内部创新评审和跨团队产品复盘。

## 4. Project Wall 英文描述（可直接粘贴）

LaunchLens is a browser-based hackathon collaboration hub for teams, solo builders, community reviewers, and demo-day organizers.

Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.

LaunchLens turns that final handoff into an operating workspace. Teams can enter Project Wall fields, build a RepoScape-inspired idea star map, run focused project agents, archive relationships between ideas, audit required evidence, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes Hackathon Hub, a full-screen star-map view; Temple Mode, a 2.5D spatial workflow; Platform Console, a guided operating view; local strategy/evidence/build/demo/tool/risk agents; linked idea archive; Codex API JSON export; optional Supabase workspace sync; bilingual UX; and optional OpenAI-compatible LLM refinement.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration platform for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## 5. 技术栈

| 层级 | 技术 |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Visual Interaction | Canvas star-map rendering, 2.5D generated bitmap background, hover particles, spatial node interaction |
| State | Browser localStorage, structured workspace snapshot |
| Agents | Local strategy, evidence, build, demo, tool-scout, and risk agents in JavaScript |
| Backend Option | Optional Supabase REST backend and SQL schema |
| Repository Signals | GitHub public API repo scanning |
| API Contract | OpenAPI JSON contract and Codex workspace snapshot example |
| Deployment | GitHub Pages, Vercel-ready static deployment, Netlify config |
| LLM Slot | Optional OpenAI-compatible chat completion endpoint supplied by the user |
| QA | Node.js tests, submission payload validator, public asset checks |

## 6. UCWS 标准适配

| UCWS 要求或评审口径 | LaunchLens 对应能力 |
| --- | --- |
| Application 赛道 | 已交付可直接访问的浏览器应用，而不是概念文档。 |
| Community Vote 30% | Hub 星图、清晰的演示入口、截图资产、中英文界面和可分享 Demo，降低社区理解成本。 |
| AI Evaluation 30% | 公开 GitHub 仓库、测试脚本、OpenAPI 合约、Supabase schema、提交 payload 校验、README 和静态部署配置，方便自动化检查工程完整度。 |
| Expert Judges 40% | 解决真实黑客松提交痛点，覆盖产品价值、执行质量、技术结构、商业复用和全球扩展潜力。 |
| Real product value over concepts | 核心功能不是描述想法，而是让团队录入、关联、审计、评分、导出和继续协作。 |
| Execution quality over polish | 可运行 Demo、仓库结构、测试、截图、API 合约、部署配置和提交流程全部落地。 |
| Global scalability over local-only relevance | 从 UCWS 出发，但可复用到其他黑客松、Demo Day、开源 Showcase 和内部产品评审。 |

## 7. 推荐评委阅读顺序

1. 打开 Demo URL: https://wangsiyi7.github.io/launchlens/
2. 进入 Hackathon Hub: https://wangsiyi7.github.io/launchlens/?mode=hub
3. 在星图输入一个项目想法，观察自动生成的节点、证据关系和操作建议。
4. 切换到 Platform Console，查看 Agent Studio、Demo Tutorial、Idea Archive、Evidence Gate、Repo Scanner 和 Export。
5. 打开 GitHub 仓库查看测试、OpenAPI、Supabase schema、提交材料和长期 skill/plugin 资产。

## 8. 演示脚本

1. 用一句话输入项目想法，例如：`A platform that helps hackathon teams turn rough ideas into final submissions.`
2. 在 Hub 星图中查看 idea、agent、evidence、tool、delivery 节点。
3. 点击节点，观察侧边详情、行动建议和关联关系。
4. 进入 Platform Console，运行本地 Agent，生成下一步建议。
5. 打开 Evidence Gate，确认 Demo、GitHub、截图、Logo、技术栈和团队信息是否完整。
6. 使用 Repo Scanner 检查公开仓库信号。
7. 导出 Project Wall copy 或 Codex workspace JSON，把内容传给后续开发、评审或提交流程。

## 9. 官方提交注意事项

UCWS 官方 Project Wall 需要登录 Epic Connector 后提交。匿名访问 Project API 会返回 401 Unauthorized，因此最终提交有两种方式：

1. 手动方式：登录 Epic Connector，创建或编辑项目，把本文件的字段逐项复制进去。
2. 脚本方式：提供有效的 EPIC_TOKEN 后，运行 `node tools/submit-project.mjs`。

如果 Demo URL 后续切换到 Vercel，请先替换本文件和 `project-payload.json` 中的 URL，再运行：

```powershell
node tools\validate-submission.mjs
```

## 10. 提交用 JSON 摘要

```json
{
  "name": "LaunchLens",
  "track": "Application",
  "tagline": "Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces.",
  "demoUrl": "https://wangsiyi7.github.io/launchlens/",
  "repoUrl": "https://github.com/wangsiyi7/launchlens",
  "logoUrl": "https://wangsiyi7.github.io/launchlens/assets/logo.svg",
  "teamMembers": [
    {
      "name": "wangsiyi7",
      "role": "Builder",
      "links": {
        "github": "https://github.com/wangsiyi7"
      }
    }
  ]
}
```

