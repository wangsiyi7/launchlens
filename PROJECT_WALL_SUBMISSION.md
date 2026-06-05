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

LaunchLens turns that final handoff into an operating workspace. Teams can enter Project Wall fields, build a RepoScape-inspired idea star map, run focused project agents, archive relationships between ideas, audit required evidence, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes:

- Hackathon Hub: a full-screen star-map view that converts rough idea input into linked nodes for ideas, agents, evidence, tools, and delivery steps.
- Temple Mode: a 2.5D spatial workflow with six clickable nodes for project story, evidence, score, optional LLM refinement, archive review, and final handoff.
- Platform Console: a stable operational view for guided process steps, Agent Studio, demo tutorial, idea archive, tool recommendations, Supabase sync, field entry, evidence auditing, repo scanning, and material export.
- Agent Studio: local strategy, evidence, build, demo, tool-scout, and risk agents that generate actionable next steps without requiring an API key.
- Idea Archive: linked idea records with parent and related-node relationships, visualized inside the Hub.
- Evidence Gate: Project Wall coverage audit for demo, repo, tech stack, screenshots, logo, team, and optional demo assets.
- Repo Scanner: public GitHub checks for README, app entry, tests or QA path, deployment config, and recent commits.
- Codex API: a machine-readable workspace JSON contract for passing project context, idea graph, agent runs, generated materials, and evidence status into future Codex work.
- Optional Supabase backend: a static-friendly workspace snapshot layer for teams that want cross-device collaboration.
- Bilingual UX: English and Chinese interface, scoring, task suggestions, and generated outputs.
- Optional LLM slot: user-supplied OpenAI-compatible endpoint, model, and API key for copy refinement.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Demo URL

https://wangsiyi7.github.io/launchlens/

## GitHub Repository URL

https://github.com/wangsiyi7/launchlens

## Tech Stack

HTML, CSS, JavaScript, Canvas star-map rendering, browser localStorage, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, OpenAPI JSON contract, optional OpenAI-compatible chat completion endpoint

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
    "name": "wangsiyi7",
    "role": "Builder",
    "links": {
      "github": "https://github.com/wangsiyi7"
    }
  }
]
```

## Judge Notes

LaunchLens should be evaluated as a working application and long-term hackathon platform, not only as a documentation generator. The core product behavior is the Hackathon Hub plus Evidence Gate: it converts rough ideas into a visual project graph, connects those ideas to agents and evidence, and gives teams a practical sequence for improving their Project Wall submission.

The project intentionally keeps the frontend clean and operational. The 2.5D Temple Mode and Hub star map add spatial interaction and memorability, but the main value remains concrete: organize thinking, run local agents, archive idea relationships, audit evidence, scan repository signals, score readiness, export Codex-readable context, and prepare official submission fields.
