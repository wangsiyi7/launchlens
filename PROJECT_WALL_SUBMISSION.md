# LaunchLens Project Wall Submission

Use this file as the copy source for UCWS Singapore Hackathon 2026 Project Wall.

## Project Name

LaunchLens

## Track

Application

## Tagline

Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces.

## Description

LaunchLens is a browser-based hackathon collaboration hub for teams, solo builders, community reviewers, and demo-day organizers.

Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.

LaunchLens turns that final handoff into an operating workspace. The homepage is a live Temple workbench rather than a static landing page: judges can drag the 3D workspace, use the mouse wheel for subtle parallax, scan value/proof/export readiness, click Story/Proof/Score/Agent/Pack/Ship, and download a Markdown extract for each step.

Teams can then enter Project Wall fields, build a RepoScape-inspired idea star map, drag and persist graph nodes, inspect direct relationships, run focused project agents, archive relationships between ideas, audit required evidence, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes:

- Dynamic Temple Workbench: a full-bleed Three.js homepage with local Canvas fallback, drag controls, subtle wheel parallax, judge-scan value/proof/export signals, click feedback, and per-step Markdown downloads.
- Hackathon Hub: a full-screen draggable star-map view that converts rough idea input into linked nodes for ideas, agents, evidence, tools, and delivery steps.
- Project Manager: local workspace snapshots for project fields, Hub coordinates, ideas, Agent runs, generated materials, and repo scan state.
- Codex Bridge: graph context exports for Codex, Claude Code, ClaudeCodex, and RepoScape-compatible graph consumers.
- Temple Mode: a spatial workflow with six clickable steps for project story, evidence, score, optional LLM refinement, archive review, and final handoff.
- Platform Console: a stable operational view for guided process steps, Agent Studio, demo tutorial, idea archive, tool recommendations, Supabase sync, field entry, evidence auditing, repo scanning, and material export.
- Agent Studio: local strategy, evidence, build, demo, tool-scout, and risk agents that generate actionable next steps without requiring an API key.
- Idea Archive: linked idea records with parent and related-node relationships, visualized inside the Hub.
- Evidence Gate: Project Wall coverage audit for demo, repo, tech stack, screenshots, logo, team, and optional demo assets.
- Repo Scanner: public GitHub checks for README, app entry, tests or QA path, deployment config, and recent commits.
- Codex API: a machine-readable workspace JSON contract for passing project context, graph overview, selected-node neighborhood, idea graph, agent runs, generated materials, and evidence status into future Codex or ClaudeCodex work.
- Optional Supabase backend: a static-friendly workspace snapshot layer for teams that want cross-device collaboration.
- Bilingual UX: English and Chinese interface, scoring, task suggestions, and generated outputs.
- Optional LLM slot: user-supplied OpenAI-compatible endpoint, model, and API key for copy refinement.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Demo URL

https://wangsiyi7.github.io/launchlens/

## GitHub Repository URL

https://github.com/wangsiyi7/launchlens

## Tech Stack

HTML, CSS, JavaScript, Three.js dynamic Temple workbench with local Canvas fallback, drag and wheel parallax controls, Canvas draggable star-map rendering, browser localStorage workspace persistence, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, GitHub public API repo scanning, OpenAPI graph contract, Codex/ClaudeCodex bridge JSON, optional OpenAI-compatible chat completion endpoint

## Screenshot URLs

```json
[
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-hub.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-platform.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-zh.png",
  "https://wangsiyi7.github.io/launchlens/assets/screenshot-mobile.png"
]
```

## Logo URL

https://wangsiyi7.github.io/launchlens/assets/logo.svg

## Demo File URL

Not required. The live browser app is the demo artifact.

## LinkedIn URL

Not provided.

## Team Members

```json
[
  {
    "name": "Annie",
    "role": "Team Captain",
    "links": {
      "github": "https://github.com/Anniefsh/"
    }
  },
  {
    "name": "Yiang",
    "role": "Technical Development",
    "links": {
      "github": "https://github.com/3231656738-creator"
    }
  },
  {
    "name": "Hu Yinghui",
    "role": "Product Manager",
    "links": {
      "github": "https://github.com/hu-xiao-yu"
    }
  }
]
```

## Judge Notes

LaunchLens should be evaluated as a working application and long-term hackathon platform, not only as a documentation generator. The core product behavior starts on the dynamic Temple workbench: a judge can immediately drag the workspace, inspect value/proof/export readiness, click each submission step, and download step-level artifacts. The Hackathon Hub and Evidence Gate then convert rough ideas into a visual project graph, connect those ideas to agents and evidence, and give teams a practical sequence for improving their Project Wall submission.

The project intentionally keeps the frontend operational. The dynamic Temple workbench and Hub star map add spatial interaction and memorability, but the main value remains concrete: organize thinking, drag and persist project graph nodes, run local agents, archive idea relationships, audit evidence, scan repository signals, score readiness, export Codex/ClaudeCodex-readable graph context, and prepare official submission fields.
