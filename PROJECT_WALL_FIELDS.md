# Project Wall Fields

Use this file as the copy-paste source for the UCWS Project Wall submission.

## Required

### Project Name

LaunchLens

### Track

Application

### Tagline

Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.

### Description

LaunchLens is a browser-based submission copilot for hackathon teams, solo builders, community reviewers, and demo-day organizers. Builders often have real work but lose the last day converting product notes into clear submissions that voters, AI evaluators, and judges can understand quickly.

LaunchLens runs a review agent over UCWS submission fields, scores readiness across community vote, AI evaluation, and expert judging, then generates Markdown, README, pitch, sprint plan, and fix-list outputs. It helps builders move from rough notes to a credible public submission in minutes.

The current version includes Temple Mode, a 2.5D spatial submission workflow with six clickable nodes for project story, evidence, score, Oracle LLM, generated archive, and final GitHub / Project Wall handoff. Classic Mode remains available for fast form editing and stable export.

The first use case is UCWS Singapore 2026, but the product is global: any hackathon, accelerator, or demo-day team can use the same workflow before submitting.

### Demo URL

Local review: `http://localhost:8080/launchlens/`

Public demo URL:

```text
https://your-demo-url.example.com
```

Replace this placeholder with a stable GitHub Pages / Netlify / Vercel URL before final judging.

If using GitHub Pages:

```text
https://YOUR_ACCOUNT.github.io/launchlens/
```

### Repo URL

Add after pushing to GitHub.

If using the prepared GitHub project:

```text
https://github.com/YOUR_ACCOUNT/launchlens
```

Temporary public source URL:

```text
Not currently available. Use the GitHub repository URL after push.
```

Important: the final Project Wall Repo URL should be an HTTPS GitHub repository URL.

### Tech Stack

HTML, CSS, JavaScript, browser localStorage, 2.5D generated bitmap background, optional OpenAI-compatible chat completion endpoint

### Project Screenshot

Public screenshot URL:

```text
https://your-demo-url.example.com/assets/screenshot.png
```

Local screenshot file:

```text
assets/screenshot.png
```

### Team Members

Add the submitting team members.

## Optional

### Project Logo

`assets/logo.svg`

### JSON payload helper

After deployment, run:

```powershell
$env:LAUNCHLENS_DEMO_URL="https://your-demo-url"
$env:LAUNCHLENS_REPO_URL="https://github.com/your-account/launchlens"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/build-project-payload.mjs
```

This generates `project-payload.json`, which can be submitted manually or through `tools/submit-project.mjs` with your own Epic Connector token.

Before submitting, run:

```powershell
node tools/validate-submission.mjs
```

### Demo Video Script

1. Open LaunchLens.
2. Load the sample project.
3. Click through Temple Mode nodes: Project Altar, Evidence Steps, Score Gate, Oracle LLM, Archive Hall, and Final Door.
4. Switch to Classic Mode and edit the required fields.
5. Run Review Agent.
6. Show the score cards and fix list.
7. Open Oracle LLM to show the reserved model endpoint, model, and API key fields.
8. Switch through Submission Pack, README, Pitch, and Sprint Plan.
9. Copy Markdown or download the JSON submission pack.

### LinkedIn URL

Add team or project page if available.
