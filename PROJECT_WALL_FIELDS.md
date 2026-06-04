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

The first use case is UCWS Singapore 2026, but the product is global: any hackathon, accelerator, or demo-day team can use the same workflow before submitting.

### Demo URL

Local review: `http://localhost:8080/launchlens/`

Temporary public demo URL:

```text
https://vendors-pride-returning-empirical.trycloudflare.com
```

Use this only while the local Cloudflare Quick Tunnel is running. Replace it with a stable GitHub Pages / Netlify / Vercel URL before final judging if possible.

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

Temporary public source URL while the Cloudflare Quick Tunnel is running:

```text
https://vendors-pride-returning-empirical.trycloudflare.com/SOURCE.md
```

### Tech Stack

HTML, CSS, JavaScript, browser localStorage, optional OpenAI-compatible chat completion endpoint

### Project Screenshot

Temporary public screenshot URL:

```text
https://vendors-pride-returning-empirical.trycloudflare.com/assets/screenshot.png
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

### Demo Video Script

1. Open LaunchLens.
2. Load the sample project.
3. Edit the required fields.
4. Run Review Agent.
5. Show the score cards and fix list.
6. Switch through Submission Pack, README, Pitch, and Sprint Plan.
7. Copy Markdown or download the JSON submission pack.

### LinkedIn URL

Add team or project page if available.
