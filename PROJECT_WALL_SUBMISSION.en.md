# LaunchLens UCWS Project Wall Submission (English)

Use this file as the copy source for UCWS Singapore Hackathon 2026 on Epic Connector Project Wall. It is structured around the official event workflow, Application track, scoring model, and judging principles.

## 1. Copy-Ready Fields

| Field | Value |
| --- | --- |
| Project Name | LaunchLens |
| Track | Application |
| Tagline | Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces. |
| Demo URL | https://wangsiyi7.github.io/launchlens/ |
| Recommended Demo Entry | https://wangsiyi7.github.io/launchlens/?mode=hub |
| GitHub Repository URL | https://github.com/wangsiyi7/launchlens |
| Logo URL | https://wangsiyi7.github.io/launchlens/assets/logo.svg |
| Demo File URL | Not required. The official event API currently reports demoUploadEnabled=false, and the live browser app is the demo artifact. |
| LinkedIn URL | Not provided |
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

## 3. Project Description

LaunchLens is a browser-based hackathon collaboration hub for teams, solo builders, community reviewers, and demo-day organizers.

Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.

LaunchLens turns that final handoff into an operating workspace. Teams can enter Project Wall fields, build a RepoScape-inspired idea star map, run focused project agents, archive relationships between ideas, audit required evidence, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes Hackathon Hub, a full-screen star-map view; Temple Mode, a 2.5D spatial workflow; Platform Console, a guided operating view; local strategy/evidence/build/demo/tool/risk agents; linked idea archive; Codex API JSON export; optional Supabase workspace sync; bilingual UX; and optional OpenAI-compatible LLM refinement.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration platform for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## 4. Tech Stack

| Layer | Technology |
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

## 5. UCWS Fit

| UCWS requirement or judging lens | LaunchLens response |
| --- | --- |
| Application track | Ships as a working browser application, not only a concept document. |
| Community Vote 30% | The Hub star map, clear demo entry, screenshot assets, bilingual UX, and shareable public demo reduce the time needed for community users to understand the product. |
| AI Evaluation 30% | Public GitHub repository, tests, OpenAPI contract, Supabase schema, submission payload validator, README path, and static deployment configuration make the project easier to inspect automatically. |
| Expert Judges 40% | The product addresses a real hackathon delivery problem and shows product value, technical execution, reuse potential, and global scalability. |
| Real product value over concepts | LaunchLens lets teams enter, connect, audit, score, export, and continue project work instead of merely describing an idea. |
| Execution quality over polish | The demo, repository, tests, screenshots, API contract, deployment config, and submission workflow are implemented. |
| Global scalability over local-only relevance | UCWS is the first use case, but the workflow applies to hackathons, demo days, open-source showcases, and internal product reviews. |

## 6. Recommended Judge Flow

1. Open the Demo URL: https://wangsiyi7.github.io/launchlens/
2. Enter Hackathon Hub: https://wangsiyi7.github.io/launchlens/?mode=hub
3. Type a project idea and inspect the generated idea, agent, evidence, tool, and delivery nodes.
4. Switch to Platform Console and review Agent Studio, Demo Tutorial, Idea Archive, Evidence Gate, Repo Scanner, and Export.
5. Open the GitHub repository to inspect tests, OpenAPI, Supabase schema, submission materials, and long-term skill/plugin assets.

## 7. Demo Script

1. Enter an idea, for example: `A platform that helps hackathon teams turn rough ideas into final submissions.`
2. Review the Hub star map and its idea, agent, evidence, tool, and delivery nodes.
3. Click nodes to inspect details, next actions, and linked relationships.
4. Open Platform Console and run the local agents for structured next steps.
5. Open Evidence Gate to confirm demo, GitHub, screenshots, logo, tech stack, and team coverage.
6. Use Repo Scanner to inspect public repository signals.
7. Export Project Wall copy or Codex workspace JSON for future development, judging, or submission flows.

## 8. Official Submission Notes

UCWS Project Wall submission requires an authenticated Epic Connector session. Anonymous Project API access returns 401 Unauthorized, so final submission has two options:

1. Manual submission: log into Epic Connector, create or edit the project, and paste the fields from this file.
2. Scripted submission: provide a valid EPIC_TOKEN and run `node tools/submit-project.mjs`.

If the demo URL is later switched to Vercel, replace the URL in this file and in `project-payload.json`, then run:

```powershell
node tools\validate-submission.mjs
```

## 9. Submission JSON Summary

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

