# LaunchLens

> 中文 | [English](#english)

LaunchLens 是面向 **UCWS Singapore Hackathon 2026** 的提交证据协作应用。它帮助参赛团队把项目从“可以运行”推进到“可以被社区、AI 和专家评审清楚理解”，并为 Project Wall 最终提交生成结构化字段。

![LaunchLens desktop screenshot](assets/screenshot.png)

## 项目定位

黑客松团队常常不是缺少创意，而是缺少最后阶段的提交秩序：Demo 是否稳定、GitHub 是否可信、README 是否可读、截图与 Logo 是否齐全、评审是否能在两分钟内理解产品价值。LaunchLens 把这些提交证据整理成一个可交互的 Evidence Gate，而不只是生成一段文案。

LaunchLens 设计为长期可复用的开发者协作工具。UCWS 是第一个应用场景；同样的流程也适用于未来的黑客松、加速器 Demo Day、开源项目展示和团队内部项目复盘。

## 在线访问

- GitHub Repository: [https://github.com/wangsiyi7/launchlens](https://github.com/wangsiyi7/launchlens)
- GitHub Pages Demo: [https://wangsiyi7.github.io/launchlens/](https://wangsiyi7.github.io/launchlens/)
- Vercel Demo: 待部署后更新

## 核心能力

- **Evidence Gate**: 审计 Project Wall 字段，包括项目名、赛道、tagline、问题、解决方案、Demo、GitHub、技术栈、截图、Logo、团队和可选演示资产。
- **Repo Scanner**: 通过 GitHub 公共 API 检查仓库是否存在、是否包含 README、入口文件、测试/QA 路径、部署配置和近期提交活动。
- **Readiness Scoring**: 从 Community Vote、AI Evaluation、Expert Judges 三个角度给出可解释评分。
- **Workflow Rail**: 以六步流程串联项目输入、证据检查、评分、LLM 优化、材料归档和最终交接。
- **Temple Mode**: 2.5D 空间化工作流，使用轻量鼠标粒子和热点反馈营造仪式感，同时保持界面清晰。
- **Classic Mode**: 面向实际填表、审计和导出的稳定工具视图。
- **Bilingual UX**: 支持 English / 中文，界面、评分、任务建议和生成内容均可切换。
- **Optional LLM**: 预留 OpenAI-compatible `chat/completions` 入口，用户可自行提供 endpoint、model 和 API key 优化文案。

## 比赛适配

- Event: UCWS Singapore Hackathon 2026
- Track: Application
- Official reference: Project Wall submission workflow
- Submission copy: [PROJECT_WALL_SUBMISSION.md](PROJECT_WALL_SUBMISSION.md)
- Machine-readable payload: [project-payload.json](project-payload.json)

## 本地运行

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
node tools/serve.mjs
```

Open:

```text
http://127.0.0.1:8080/launchlens/
```

Useful routes:

```text
/?lang=zh
/?mode=classic
/?lang=zh&mode=classic
```

## 测试

```powershell
npm.cmd test
node tools/validate-submission.mjs
```

Current checks cover the readiness scoring model, Evidence Gate URL/repo logic, and Project Wall payload validation.

## 仓库结构

```text
launchlens/
  index.html                 App shell
  app.js                     Product logic, scoring, Evidence Gate, Repo Scanner
  styles.css                 Temple Mode, Classic Mode, responsive UI
  assets/                    Logo, screenshots, social card, Temple background
  tests/                     Scoring and Evidence Gate tests
  tools/                     Local server, GitHub publishing, payload validation
  docs/                      Research notes, runbooks, audits, interaction specs
  PROJECT_WALL_SUBMISSION.md Copy-ready competition fields
  project-payload.json       Machine-readable Project Wall payload
  vercel.json                Vercel static deployment config
```

## 部署

The application is static and can be deployed without a build step.

- GitHub Pages uses `.github/workflows/pages.yml`.
- Vercel uses `vercel.json`.
- Netlify uses `netlify.toml`.

## English

LaunchLens is a submission evidence collaboration app for **UCWS Singapore Hackathon 2026**. It helps teams move from “the project runs” to “the project can be understood, inspected, and judged” by turning demo links, repository evidence, screenshots, team data, and product narrative into a structured Project Wall submission.

## Product Positioning

Hackathon teams rarely fail only because they lack ideas. They often fail at the final submission layer: unstable demos, unclear repositories, incomplete screenshots, weak README paths, and narratives that do not match how community voters, AI reviewers, and expert judges evaluate work. LaunchLens addresses that handoff layer as an interactive Evidence Gate.

LaunchLens is intended as a reusable collaboration tool beyond this single hackathon. UCWS is the first scenario; the same workflow can support future hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Live Access

- GitHub Repository: [https://github.com/wangsiyi7/launchlens](https://github.com/wangsiyi7/launchlens)
- GitHub Pages Demo: [https://wangsiyi7.github.io/launchlens/](https://wangsiyi7.github.io/launchlens/)
- Vercel Demo: to be updated after deployment

## Capabilities

- **Evidence Gate**: audits Project Wall fields including project name, track, tagline, problem, solution, demo, GitHub repo, tech stack, screenshots, logo, team, and optional demo assets.
- **Repo Scanner**: checks public GitHub signals including README, app entry, tests or QA path, deployment config, and recent commits.
- **Readiness Scoring**: explains readiness across Community Vote, AI Evaluation, and Expert Judges.
- **Workflow Rail**: connects intake, evidence, scoring, LLM refinement, archive outputs, and final handoff.
- **Temple Mode**: a 2.5D spatial workflow with subtle pointer particles and node feedback.
- **Classic Mode**: a stable operational view for field entry, evidence review, and export.
- **Bilingual UX**: English and Chinese interface, scoring, tasks, and generated output.
- **Optional LLM**: supports OpenAI-compatible `chat/completions` with user-supplied endpoint, model, and API key.

## Hackathon Fit

- Event: UCWS Singapore Hackathon 2026
- Track: Application
- Submission copy: [PROJECT_WALL_SUBMISSION.md](PROJECT_WALL_SUBMISSION.md)
- Machine-readable payload: [project-payload.json](project-payload.json)

## Run Locally

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
node tools/serve.mjs
```

Open:

```text
http://127.0.0.1:8080/launchlens/
```

## Test

```powershell
npm.cmd test
node tools/validate-submission.mjs
```
