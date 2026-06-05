# Final Submission Runbook

This is the last-mile checklist for LaunchLens as a UCWS Singapore Hackathon 2026 Project Wall entry.

## Current Public Assets

| Asset | Status | URL or file |
| --- | --- | --- |
| GitHub repository | Ready | https://github.com/wangsiyi7/launchlens |
| Public demo | Ready | https://wangsiyi7.github.io/launchlens/ |
| Vercel deployment | Awaiting Vercel token | `node tools/deploy-vercel.mjs` |
| Copy-ready submission fields | Ready | `PROJECT_WALL_SUBMISSION.md` |
| Machine-readable payload | Ready | `project-payload.json` |
| Source package | Ready | `launchlens-source.zip` and `../LaunchLens_submission_pack.zip` |

## Project Wall Fields

Use the root-level `PROJECT_WALL_SUBMISSION.md` as the authoritative copy source. It contains the official project name, track, tagline, description, demo URL, repository URL, tech stack, screenshot URLs, logo URL, and team member field.

If Vercel is deployed, replace the Demo URL and asset URLs in:

- `PROJECT_WALL_SUBMISSION.md`
- `project-payload.json`
- `README.md`
- `docs/FINAL_READINESS_REPORT.md`

## Vercel Finalization

The repository includes `vercel.json` and `.vercelignore`, so Vercel can deploy the static app without a build step.

Token path:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:VERCEL_TOKEN="your-vercel-token"
node tools/deploy-vercel.mjs
```

After the script prints the production URL:

```powershell
$env:LAUNCHLENS_DEMO_URL="https://your-vercel-url.vercel.app/"
$env:LAUNCHLENS_REPO_URL="https://github.com/wangsiyi7/launchlens"
$env:LAUNCHLENS_TEAM_MEMBERS_JSON='[{"name":"Annie","role":"Team Captain","links":{"github":"https://github.com/Anniefsh/"}},{"name":"Yiang","role":"Technical Development","links":{"github":"https://github.com/3231656738-creator"}},{"name":"Hu Yinghui","role":"Product Manager","links":{"github":"https://github.com/hu-xiao-yu"}}]'
node tools/build-project-payload.mjs
node tools/validate-submission.mjs
node tools/final-readiness-report.mjs
```

Then update the visible markdown fields and push the final commit.

## Manual Project Wall Submission

1. Open the UCWS Project Wall form.
2. Copy fields from `PROJECT_WALL_SUBMISSION.md`.
3. Use `https://github.com/wangsiyi7/launchlens` as the repository URL.
4. Use the Vercel production URL if available; otherwise use `https://wangsiyi7.github.io/launchlens/` as the public demo URL.
5. Confirm the screenshots and logo load from the chosen demo domain.

## Validation Commands

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
npm.cmd test
node tools/validate-submission.mjs
```

Both commands should pass before any final copy-paste submission.

## Official Submission Notes

- Event: UCWS Singapore Hackathon 2026.
- Track: Application.
- Judging lens: Community Vote, AI Evaluation, Expert Judges.
- Current status: repository, public GitHub Pages demo, copy fields, payload, tests, and source package are ready.
- Remaining external dependency: Vercel account authorization if a Vercel URL is required.
