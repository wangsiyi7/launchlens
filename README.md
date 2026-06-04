# LaunchLens

Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.

LaunchLens is a browser-based submission copilot for UCWS Singapore Hackathon 2026 teams. It reviews required Project Wall fields, scores readiness against UCWS-style evaluation criteria, and generates Markdown, README, pitch, sprint plan, and fix-list outputs.

## Why this project

UCWS rewards projects with real user value, strong execution, and global scalability. Many teams have working software but lose time translating their work into a submission that community voters, automated evaluation, and expert judges can quickly understand. LaunchLens solves that last-mile problem.

## Features

- UCWS-aligned intake fields: name, track, tagline, description inputs, demo URL, repo URL, tech stack, screenshots, and team members.
- Readiness scoring for Community Vote, AI Evaluation, and Expert Judges.
- Actionable fix list ordered around submission risk.
- Generated submission pack, README, 90-second pitch, and final 24-hour sprint plan.
- Local autosave with `localStorage`.
- Markdown copy and JSON export.
- Optional OpenAI-compatible LLM enhancement using the user's own browser-side API key.

## Local demo

From the workspace root:

```bash
python -m http.server 8080
```

Open:

```text
http://localhost:8080/launchlens/
```

No build step or backend is required.

## GitHub publish

With a GitHub token that can create or push repositories:

```powershell
$env:GITHUB_TOKEN="your-github-token"
node tools/publish-github.mjs launchlens
```

The helper creates or reuses `launchlens`, updates the Project Wall payload with the GitHub repo and Pages URLs, commits that payload if needed, then pushes `main`.

For the final competition handoff, follow `FINAL_SUBMISSION_RUNBOOK.md`.

Before submitting to the Project Wall, validate the payload:

```powershell
node tools/validate-submission.mjs
```

With both GitHub and Epic Connector tokens available, the full completion command is:

```powershell
$env:GITHUB_TOKEN="your-github-token"
$env:EPIC_TOKEN="your-epic-token"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/complete-submission.mjs launchlens
```

## Tech stack

- HTML
- CSS
- JavaScript
- Browser localStorage
- Optional OpenAI-compatible chat completion endpoint

## UCWS submission fields

- Project name: LaunchLens
- Track: Application
- Tagline: Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.
- Demo URL for local review: `http://localhost:8080/launchlens/`
- Public demo URL: add the hosted URL after deployment
- Repo URL: add the GitHub repository URL after pushing
- Tech stack: HTML, CSS, JavaScript, localStorage, optional OpenAI-compatible API
- Screenshot: `assets/screenshot.png`
- Mobile screenshot: `assets/screenshot-mobile.png`
- Project logo: `assets/logo.svg`
- Social card: `assets/social-card.svg`

## Roadmap

- Authenticated Project Wall import using the user's own Epic Connector token.
- GitHub README fetch and repo-health checks through a small backend proxy.
- Multi-event templates for other hackathons and demo days.
- Team collaboration mode for 1-4 member UCWS teams.
