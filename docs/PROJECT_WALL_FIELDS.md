# Project Wall Fields

The authoritative copy source is the root-level `PROJECT_WALL_SUBMISSION.md`. This file keeps a shorter field map for quick review.

## Required Fields

| Field | Value |
| --- | --- |
| Project Name | LaunchLens |
| Track | Application |
| Tagline | Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces. |
| Demo URL | https://wangsiyi7.github.io/launchlens/ |
| Repository URL | https://github.com/wangsiyi7/launchlens |
| Logo URL | https://wangsiyi7.github.io/launchlens/assets/logo.svg |

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

## Description

LaunchLens is a browser-based hackathon collaboration hub for hackathon teams, solo builders, community reviewers, and demo-day organizers. It turns the final Project Wall handoff into an operating workspace: teams enter official fields, build a RepoScape-inspired idea star map, drag and persist graph nodes, inspect direct relationships, run focused project agents, archive linked ideas, audit required proof, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes Hackathon Hub, a full-screen draggable star-map view for ideas, agents, evidence, tools, and delivery steps; Project Manager for saved workspaces; Codex Bridge for Codex, Claude Code, ClaudeCodex, and graph-consumer interoperability; Temple Mode, a 2.5D spatial workflow with six clickable nodes; Platform Console, a guided operating view with Agent Studio, demo tutorial, idea archive, tool recommendations, Supabase sync, field entry, evidence auditing, repo scanning, and material export; plus a Codex API JSON contract for future tool integration.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Tech Stack

HTML, CSS, JavaScript, Canvas draggable star-map rendering, browser localStorage workspace persistence, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, OpenAPI graph contract, Codex/ClaudeCodex bridge JSON, optional OpenAI-compatible chat completion endpoint

## External Methodology Reference

LaunchLens references `Akasxh/re-forge` as an MIT-licensed methodology source for adversarial gates, evidence substrate, cross-session memory, and capability evolution:

```text
https://github.com/Akasxh/re-forge
```

LaunchLens does not copy source code from `re-forge`; it uses the project as a protocol reference and records attribution in `docs/ATTRIBUTION.md`.

LaunchLens also references `ThomasLix7/RepoScape` as an MIT-licensed product reference for graph-first HUDs, physical/cognitive graph relations, token-frugal graph APIs, and agent interoperability:

```text
https://github.com/ThomasLix7/RepoScape
```

LaunchLens does not copy source code from `RepoScape`; it uses the project as a product/interaction reference and records attribution in `docs/ATTRIBUTION.md`.

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

## Final Update If Vercel Is Used

After Vercel deployment, replace all `https://wangsiyi7.github.io/launchlens/` asset URLs with the Vercel production domain, then rerun:

```powershell
node tools/validate-submission.mjs
```
