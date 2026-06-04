# LaunchLens Project Wall Submission

Use this file as the copy source for UCWS Singapore Hackathon 2026 Project Wall.

## Project Name

LaunchLens

## Track

Application

## Tagline

Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.

## Description

LaunchLens is a browser-based submission evidence collaboration app for hackathon teams, solo builders, community reviewers, and demo-day organizers.

Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.

LaunchLens turns that final handoff into an interactive Evidence Gate. Teams enter their Project Wall fields, then the app audits required evidence, scans public GitHub repository signals, scores readiness across Community Vote, AI Evaluation, and Expert Judges, and generates a copy-ready submission pack, README draft, pitch, sprint plan, and fix list.

The current version includes:

- Temple Mode: a 2.5D spatial workflow with six clickable nodes for project story, evidence, score, optional LLM refinement, archive review, and final handoff.
- Classic Mode: a stable operational view for field entry, evidence auditing, repo scanning, and material export.
- Evidence Gate: Project Wall coverage audit for demo, repo, tech stack, screenshots, logo, team, and optional demo assets.
- Repo Scanner: public GitHub checks for README, app entry, tests or QA path, deployment config, and recent commits.
- Bilingual UX: English and Chinese interface, scoring, task suggestions, and generated outputs.
- Optional LLM slot: user-supplied OpenAI-compatible endpoint, model, and API key for copy refinement.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Demo URL

https://wangsiyi7.github.io/launchlens/

## GitHub Repository URL

https://github.com/wangsiyi7/launchlens

## Tech Stack

HTML, CSS, JavaScript, browser localStorage, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, optional OpenAI-compatible chat completion endpoint

## Screenshot URLs

```json
[
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

LaunchLens should be evaluated as a working application, not only as a documentation generator. The core product behavior is the Evidence Gate: it converts submission readiness into visible, inspectable states and gives teams a practical sequence for improving their Project Wall submission.

The project intentionally keeps the frontend clean and operational. The 2.5D Temple Mode adds a spatial interaction layer, but the main value remains concrete: audit evidence, scan repository signals, score readiness, and prepare official submission fields.
