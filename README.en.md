<div align="center">

# 🔭 LaunchLens

### Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces

**A browser-based collaboration and submission platform for UCWS Singapore Hackathon 2026 — turning the final "submit" step from a static form into an interactive operating workspace.**

Organize project fields · build a visual idea graph · run local agents · audit evidence · scan repos · generate ready-to-submit materials

![type](https://img.shields.io/badge/type-Static%20Web%20App-1f6feb)
![render](https://img.shields.io/badge/render-Three.js%20%2B%20Canvas%20fallback-8957e5)
![deploy](https://img.shields.io/badge/deploy-Pages%20%7C%20Vercel%20%7C%20Netlify-2da44e)
![i18n](https://img.shields.io/badge/i18n-中文%20%7C%20English-d29922)
![track](https://img.shields.io/badge/UCWS%202026-Application-555)

[**简体中文**](README.md)　·　**English**

</div>

---

## ✨ What is this

**LaunchLens** is a browser-based project collaboration and submission platform built for **UCWS Singapore Hackathon 2026** (Application track). It brings project fields, demo evidence, GitHub repository signals, idea graphs, agent outputs, and final submission materials into one operating workspace, helping teams move from "the project runs" to "the project can be clearly judged by the community, AI, and experts."

It is built with vanilla HTML / CSS / JavaScript with **no build step**, ships optional Three.js 3D rendering with a Canvas fallback, and supports an optional Supabase backend for team sync. Every user-facing feature runs client-side in the browser.

Who it's for: **hackathon teams, solo builders, community reviewers, and demo-day organizers.**

![LaunchLens Hub screenshot](assets/screenshot-hub.png)

## 🧩 Three working modes

| | 🏛️ Temple | 🌌 Hackathon Hub | 🛠️ Platform Console |
|:--|:--|:--|:--|
| Form | 2.5D spatial workflow entry | Draggable star-map of idea relationships | Guided operational workspace |
| Interaction | Drag workbench, wheel parallax, click nodes | Drag / zoom / search nodes | Process steps + panel actions |
| Content | Six steps (Story / Proof / Score / Agent / Pack / Ship), each downloadable as Markdown | Ideas, agents, evidence, tools, delivery nodes linked into one graph | Agent Studio, demo tutorial, idea archive, tool recommendations, Supabase sync |
| Render | Three.js dynamic workbench + Canvas fallback | Canvas 2D star-map | Forms + panels |

> 🔁 All three modes share the same local workspace snapshot. Use `?mode=hub` for the star map and `?lang=zh` for language; Platform Console is the default view.

## 🚀 Core features

- **Temple Mode** — a 2.5D spatial workflow with six clickable steps (Story / Proof / Score / Agent / Pack / Ship) covering project story, evidence, scoring, agents, packaging, and delivery, with drag controls and subtle parallax; each step downloads a Markdown artifact.
- **Hackathon Hub** — a RepoScape-inspired, draggable, zoomable, searchable star map for ideas, agents, evidence, tools, and delivery-process nodes, with persisted node coordinates.
- **Project Manager** — saves and reloads full local workspace snapshots: project fields, Hub coordinates, ideas, agent runs, repo scans, and generated materials.
- **Agent Studio** — seven local agents (strategy, evidence, build, demo, tool-scout, risk, and Re-Forge Gate) generating actionable next-step checklists.
- **Evidence Gate** — audits Project Wall fields: demo, repo, tech stack, screenshots, logo, team.
- **Repo Scanner** — uses the public GitHub API to check README, app entry, tests/QA paths, deployment config, and recent commits (no auth needed for public repos).
- **Codex Bridge** — exports `graphOverview`, `selectedNeighborhood`, and workspace snapshots for Codex / Claude Code / ClaudeCodex interoperability over the same project context.
- **Idea Archive** — linked idea records with parent and related-node relationships, visualized in Hub.
- **Three-dimensional scoring** — weighted average of community clarity (30%), AI-evaluable repo signals (30%), and expert business value (40%); threshold labels `ready` (≥82) / `close` (≥62) / `early` (<62).
- **Bilingual UX** — English and Chinese interface with localized scoring terms, task suggestions, and generated outputs.
- **Optional LLM slot** — bring your own OpenAI-compatible endpoint for copy refinement; the key stays in your browser locally (localStorage), never committed, with no hardcoded keys.

## 🛠️ Tech stack

| Layer | Technology |
|:--|:--|
| Frontend | HTML · CSS · JavaScript (single page, no build step) |
| Visual interaction | Three.js 0.165.0 (CDN dynamic import) dynamic Temple workbench with local Canvas fallback; drag and wheel parallax; Canvas draggable star-map rendering; per-step download actions |
| State | Browser localStorage, structured workspace snapshot, persisted Hub coordinates |
| Agents | Strategy / evidence / build / demo / tool-scout / risk / Re-Forge Gate — seven client-side JavaScript agents |
| Backend (optional) | Optional Supabase REST backend + SQL schema |
| Repository signals | GitHub public API repo scanning |
| API contract | OpenAPI graph contract, Codex workspace snapshot example, Codex / ClaudeCodex bridge JSON |
| Deployment | GitHub Pages · Vercel-ready static deployment · Netlify config |
| LLM slot (optional) | User-supplied OpenAI-compatible chat completion endpoint |
| QA | Node.js tests, submission payload validator, public asset checks |

## 🏁 Quick start

**1. Run locally**

```powershell
npm.cmd run serve:public-root
```

Open in a browser:

```text
http://localhost:8081/
http://localhost:8081/?mode=hub
http://localhost:8081/?lang=zh
```

**2. Explore** — drag the Temple workbench, use the mouse wheel for parallax, click the Story / Proof / Score / Agent / Pack / Ship steps, and download each step's Markdown artifact.

**3. Run tests & validate the submission**

```powershell
npm.cmd test
node tools\validate-submission.mjs
```

> `npm test` runs four suites in sequence: `scoring`, `evidence-gate`, `platform-core`, `ucws-sync`. `validate-submission` blocks non-HTTPS GitHub URLs and placeholder team members.

Common scripts:

```text
npm run serve:public-root   Local server (http://localhost:8081/)
npm run test                Run all tests
npm run payload             Build the submission payload
npm run validate:submission Validate the submission JSON
npm run sync:ucws           Sync UCWS project wall data
```

## 🗂️ Repo structure

```text
launchlens/
  index.html                  App shell (mode / language switches)
  app.js                      UI logic, Hub graph, Agent Bridge, project persistence
  platform-core.js            Pure platform model, agents, graph APIs, Supabase requests
  styles.css                  Temple / Hub / Classic responsive styles
  api/                        OpenAPI contract and Codex workspace examples
  assets/                     Logo, screenshots, social card, visual assets
  data/                       Optional UCWS Project Wall sync output
  docs/                       Submission notes, API docs, attribution, deployment runbooks
  supabase/                   Optional workspace table schema
  tests/                      scoring / evidence-gate / platform-core / ucws-sync tests
  tools/                      Local server, payload, GitHub, Vercel, and sync utilities
```

## 🔗 Live & links

- **GitHub repository**: <https://github.com/wangsiyi7/launchlens>
- **GitHub Pages demo**: <https://wangsiyi7.github.io/launchlens/>
- **Hub demo**: <https://wangsiyi7.github.io/launchlens/?mode=hub>
- **Logo**: <https://wangsiyi7.github.io/launchlens/assets/logo.svg>
- **Sibling project · UCWS Project Searcher repo**: <https://github.com/wangsiyi7/ucws-project-aggregator>
- **Sibling project demo**: <https://wangsiyi7.github.io/ucws-project-aggregator/>
- **Vercel**: `vercel.json` is configured (clean URLs enabled); production deployment still needs account authorization.

## 📦 UCWS submission materials

- Copy-ready Chinese submission (default): [PROJECT_WALL_SUBMISSION.md](PROJECT_WALL_SUBMISSION.md)
- Copy-ready Chinese submission: [PROJECT_WALL_SUBMISSION.zh-CN.md](PROJECT_WALL_SUBMISSION.zh-CN.md)
- Copy-ready English submission: [PROJECT_WALL_SUBMISSION.en.md](PROJECT_WALL_SUBMISSION.en.md)
- Machine-readable payload: [project-payload.json](project-payload.json)
- Field notes: [docs/PROJECT_WALL_FIELDS.md](docs/PROJECT_WALL_FIELDS.md)

> **UCWS compatibility**: addresses the Application track and aligns with Community Vote (30%), AI Evaluation (30%), and Expert Judges (40%); it ships as a working browser application with a public GitHub repo, tests, an API contract, deployment config, and a submission payload validator.

## 📚 External references & compliance

LaunchLens **does not copy source code** from the projects below; they serve as methodology or product-pattern references, with license links preserved in [`docs/ATTRIBUTION.md`](docs/ATTRIBUTION.md):

- [Akasxh/re-forge](https://github.com/Akasxh/re-forge) (MIT): **methodology reference** for multi-agent adversarial gates, evidence substrate, cross-session memory, and capability-evolution patterns.
- [ThomasLix7/RepoScape](https://github.com/ThomasLix7/RepoScape) (MIT): **product reference** for the graph-first HUD, physical/cognitive relation model, and agent-interoperability patterns.
- [EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026](https://github.com/EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026): the official UCWS event archive, **referenced, not copied**.

## 🗺️ Roadmap

**Done**
- [x] Temple Mode (2.5D spatial workflow), Hackathon Hub (Canvas draggable star-map), Platform Console
- [x] Agent Studio: strategy / evidence / build / demo / tool-scout / risk / Re-Forge Gate local agents
- [x] Evidence Gate field auditing + Repo Scanner (GitHub public API repo signals)
- [x] Three-dimensional scoring model with `ready / close / early` threshold labels
- [x] Codex / ClaudeCodex Bridge + `api/openapi.json` graph contract
- [x] Bilingual UX with localized scoring, task suggestions, and generated outputs
- [x] Live on GitHub Pages, with submission materials (CN / EN / payload) prepared and validated
- [x] Sibling UCWS Project Searcher (aggregates official repo, Project Wall snapshots, commit history, agent handoff)

**Planned**
- [ ] Vercel production deployment (`vercel.json` configured, awaiting account authorization)
- [ ] First real use cycle: authenticated Project Wall import and full project-list ingestion
- [ ] Repo-health checks and multi-event templates
- [ ] Team collaboration features and RepoScape-compatible graph persistence (server implementation of `GET /api/graph/overview`, `/api/graph/neighborhood`, `/api/agent/bridge`)
- [ ] Further polish for the optional Supabase cross-device team workspace and the optional LLM copy refinement

## 👥 Team

| Member | Role | GitHub |
|:--|:--|:--|
| Annie | Team Captain | <https://github.com/Anniefsh/> |
| Yiang | Technical Development | <https://github.com/3231656738-creator> |
| Hu Yinghui | Product Manager | <https://github.com/hu-xiao-yu> |

## 🙏 Credits & compliance

Built for **UCWS Singapore Hackathon 2026** · turning hackathon ideas into scored, linked, and ready-to-submit project workspaces.

External projects are referenced as methodology / product patterns and attributed, with no source code copied — see [`docs/ATTRIBUTION.md`](docs/ATTRIBUTION.md).

<div align="center"><sub>Made with ❤️ for hackathon builders · UCWS 2026 · Application Track</sub></div>