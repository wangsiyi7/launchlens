# LaunchLens Deployment

LaunchLens is a static app. Deploy the `launchlens/` folder as the site root.

## Vercel

LaunchLens is Vercel-ready. The app is static, so no build command is required.

Token-based deployment:

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:VERCEL_TOKEN="your-vercel-token"
node tools/deploy-vercel.mjs
```

Manual import:

1. Import `https://github.com/wangsiyi7/launchlens` into Vercel.
2. Framework preset: Other.
3. Build command: leave empty.
4. Output directory: `.`.
5. Deploy to production.
6. Add the production URL to `README.md`, `PROJECT_WALL_SUBMISSION.md`, and `project-payload.json`.

The included `vercel.json` sets static routing and basic security headers. The included `.vercelignore` excludes local archives, logs, and deployment result files.

## GitHub Pages

GitHub Pages is already configured through `.github/workflows/pages.yml`.

Current public demo:

```text
https://wangsiyi7.github.io/launchlens/
```

Use this as the fallback demo URL if Vercel deployment has not been authorized yet.

## Netlify

1. Create a new Netlify site from the `launchlens/` folder.
2. Build command: leave empty.
3. Publish directory: `.`.
4. After deploy, open the generated URL and confirm the app loads.
5. Add the URL to `PROJECT_WALL_SUBMISSION.md` and Project Wall.

The included `netlify.toml` already sets the publish directory and fallback route.

## Local validation

```bash
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
node tools/serve.mjs
```

Open:

```text
http://127.0.0.1:8080/launchlens/
```

Run tests:

```powershell
npm.cmd test
node tools/validate-submission.mjs
```

## Build Project Wall payload

After you have public demo and repo URLs:

```bash
set LAUNCHLENS_DEMO_URL=https://your-demo-url
set LAUNCHLENS_REPO_URL=https://github.com/your-account/launchlens
set LAUNCHLENS_TEAM_MEMBERS_JSON=[{"name":"Annie","role":"Team Captain","links":{"github":"https://github.com/Anniefsh/"}},{"name":"Yiang","role":"Technical Development","links":{"github":"https://github.com/3231656738-creator"}},{"name":"Hu Yinghui","role":"Product Manager","links":{"github":"https://github.com/hu-xiao-yu"}}]
node tools/build-project-payload.mjs
```

PowerShell equivalent:

```powershell
$env:LAUNCHLENS_DEMO_URL="https://your-vercel-url.vercel.app/"
$env:LAUNCHLENS_REPO_URL="https://github.com/wangsiyi7/launchlens"
$env:LAUNCHLENS_TEAM_MEMBERS_JSON='[{"name":"Annie","role":"Team Captain","links":{"github":"https://github.com/Anniefsh/"}},{"name":"Yiang","role":"Technical Development","links":{"github":"https://github.com/3231656738-creator"}},{"name":"Hu Yinghui","role":"Product Manager","links":{"github":"https://github.com/hu-xiao-yu"}}]'
node tools/build-project-payload.mjs
```

This writes `project-payload.json`.

Validate it before submitting:

```powershell
node tools/validate-submission.mjs
```

The validator intentionally blocks non-GitHub `repoUrl` values and placeholder team members, because the Project Wall form accepts GitHub repository links for hackathon project submissions.

## Submit to Epic Connector with your own token

The Project Wall API requires authentication. After logging in, provide your own token as `EPIC_TOKEN`:

```powershell
$env:EPIC_TOKEN="your-epic-token"
node tools/submit-project.mjs
```

If both tokens are available, you can publish to GitHub, validate the payload, and submit to Epic Connector in one sequence:

```powershell
$env:GITHUB_TOKEN="your-github-token"
$env:EPIC_TOKEN="your-epic-token"
$env:LAUNCHLENS_TEAM_MEMBERS_JSON='[{"name":"Annie","role":"Team Captain","links":{"github":"https://github.com/Anniefsh/"}},{"name":"Yiang","role":"Technical Development","links":{"github":"https://github.com/3231656738-creator"}},{"name":"Hu Yinghui","role":"Product Manager","links":{"github":"https://github.com/hu-xiao-yu"}}]'
node tools/complete-submission.mjs launchlens
```

For the current repository, manual Project Wall submission is preferred: copy the prepared fields from the root-level `PROJECT_WALL_SUBMISSION.md`.

The script loads the official event ID from:

```text
https://evol.epicconnector.ai/api/events?slug=ucws-singapore-hackathon---2026-cxgy
```

Then it posts `project-payload.json` to:

```text
https://evol.epicconnector.ai/api/projects
```

Do not share your token publicly.
