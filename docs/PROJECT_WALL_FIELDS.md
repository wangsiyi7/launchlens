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

LaunchLens is a browser-based hackathon collaboration hub for hackathon teams, solo builders, community reviewers, and demo-day organizers. It turns the final Project Wall handoff into an operating workspace: teams enter official fields, build a RepoScape-inspired idea star map, run focused project agents, archive linked ideas, audit required proof, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.

The current version includes Hackathon Hub, a full-screen star-map view for ideas, agents, evidence, tools, and delivery steps; Temple Mode, a 2.5D spatial workflow with six clickable nodes; Platform Console, a guided operating view with Agent Studio, demo tutorial, idea archive, tool recommendations, Supabase sync, field entry, evidence auditing, repo scanning, and material export; plus a Codex API JSON contract for future tool integration.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Tech Stack

HTML, CSS, JavaScript, Canvas star-map rendering, browser localStorage, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, OpenAPI JSON contract, optional OpenAI-compatible chat completion endpoint

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

## Final Update If Vercel Is Used

After Vercel deployment, replace all `https://wangsiyi7.github.io/launchlens/` asset URLs with the Vercel production domain, then rerun:

```powershell
node tools/validate-submission.mjs
```
