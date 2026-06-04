# Final Submission Runbook

Use this as the last-mile checklist for submitting LaunchLens to the UCWS Singapore Hackathon 2026 Project Wall.

## Current Readiness

| Item | Status | Evidence |
| --- | --- | --- |
| Working app | Ready | `index.html`, `styles.css`, `app.js` |
| Local Git repo | Ready | branch `main` |
| Temporary public demo | Ready while tunnel runs | `https://volume-obituaries-half-coaches.trycloudflare.com` |
| Screenshots | Ready | `assets/screenshot.png`, `assets/screenshot-mobile.png` |
| Project Wall copy | Ready | `PROJECT_WALL_FIELDS.md`, `SUBMISSION.md` |
| GitHub repository | Needs account access | provide remote URL or `GITHUB_TOKEN` |
| Final Project Wall payload | Needs final GitHub URL and team names | `project-payload.json` currently uses temporary fallback values |
| Actual Project Wall submission | Needs Epic login token | `EPIC_TOKEN` |

## Official Constraints Already Reflected

- Event: UCWS Singapore Hackathon 2026.
- Tracks: Agent, Skill, Application, DeepResearch.
- Selected track: Application.
- Public Project Wall project list and project submission endpoint require authentication.
- Hackathon project form requires an HTTPS GitHub repository URL.
- Scoring lens: Community Vote, AI Evaluation, Expert Judges.

## Step 1: Publish To GitHub

Preferred token-based path:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:GITHUB_TOKEN="your-github-token"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/publish-github.mjs launchlens
```

What this does:

- Creates or reuses `https://github.com/YOUR_ACCOUNT/launchlens`.
- Generates `project-payload.json` with:
  - `repoUrl`: `https://github.com/YOUR_ACCOUNT/launchlens`
  - `demoUrl`: `https://YOUR_ACCOUNT.github.io/launchlens/`
- Commits the payload update if it changed.
- Pushes `main`.

Remote-only path, if the GitHub repo already exists and local Git authentication is available:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
node tools/push-github.mjs https://github.com/YOUR_ACCOUNT/launchlens.git
```

Then regenerate the payload:

```powershell
$env:LAUNCHLENS_DEMO_URL="https://YOUR_ACCOUNT.github.io/launchlens/"
$env:LAUNCHLENS_REPO_URL="https://github.com/YOUR_ACCOUNT/launchlens"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/build-project-payload.mjs
git add project-payload.json
git commit -m "Update final Project Wall payload"
git push
```

## Step 2: Enable GitHub Pages

In the GitHub repo:

1. Open Settings.
2. Open Pages.
3. Set Source to GitHub Actions.
4. Wait for `.github/workflows/pages.yml` to deploy.
5. Open the deployed site and confirm LaunchLens loads.

Expected URL:

```text
https://YOUR_ACCOUNT.github.io/launchlens/
```

## Step 3: Validate Payload

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
node tools/validate-submission.mjs
```

The validator must pass before automatic Project Wall submission. It blocks:

- non-GitHub repo URLs
- placeholder team member names
- missing HTTPS screenshot/logo/demo links
- malformed Project Wall array fields

## Step 4: Submit To Project Wall

Manual path:

- Open `PROJECT_WALL_FIELDS.md`.
- Copy fields into the UCWS Project Wall submission form.
- Use the GitHub repo URL as Repo URL.
- Use the GitHub Pages, Netlify, or Vercel URL as Demo URL.

Token-based path:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:EPIC_TOKEN="your-epic-token"
node tools/submit-project.mjs
```

One-command path, when both tokens are available:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:GITHUB_TOKEN="your-github-token"
$env:EPIC_TOKEN="your-epic-token"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/complete-submission.mjs launchlens
```

## Exact Project Wall Copy

Project name:

```text
LaunchLens
```

Track:

```text
Application
```

Tagline:

```text
Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.
```

Tech stack:

```text
HTML, CSS, JavaScript, browser localStorage, optional OpenAI-compatible chat completion endpoint
```

Description:

```text
LaunchLens is a browser-based submission copilot for hackathon teams, solo builders, community reviewers, and demo-day organizers. Builders often have real work but lose the last day converting product notes into clear submissions that voters, AI evaluators, and judges can understand quickly.

LaunchLens runs a review agent over UCWS submission fields, scores readiness across community vote, AI evaluation, and expert judging, then generates Markdown, README, pitch, sprint plan, and fix-list outputs. It helps builders move from rough notes to a credible public submission in minutes.

The first use case is UCWS Singapore 2026, but the product is global: any hackathon, accelerator, or demo-day team can use the same workflow before submitting.
```

## Do Not Submit These As Final Values

These are temporary fallbacks only:

```text
https://volume-obituaries-half-coaches.trycloudflare.com/SOURCE.md
https://volume-obituaries-half-coaches.trycloudflare.com/launchlens-source.zip
```

The final Repo URL must be:

```text
https://github.com/YOUR_ACCOUNT/launchlens
```
