# LaunchLens Deployment

LaunchLens is a static app. Deploy the `launchlens/` folder as the site root.

## Netlify

1. Create a new Netlify site from the `launchlens/` folder.
2. Build command: leave empty.
3. Publish directory: `.`.
4. After deploy, open the generated URL and confirm the app loads.
5. Add the URL to `SUBMISSION.md` and Project Wall.

The included `netlify.toml` already sets the publish directory and fallback route.

## Vercel

1. Import the repo into Vercel.
2. Set project root to `launchlens`.
3. Framework preset: Other.
4. Build command: leave empty.
5. Output directory: `.`.
6. Add the production URL to `SUBMISSION.md` and Project Wall.

## GitHub Pages

1. Push the repo to GitHub.
2. In repository settings, enable Pages.
3. Set Pages source to GitHub Actions.
4. The included `.github/workflows/pages.yml` will publish the static site.
5. Add the Pages URL to `SUBMISSION.md` and Project Wall.

Push helper:

```powershell
node tools/push-github.mjs https://github.com/YOUR_ACCOUNT/launchlens.git
```

Token-based create and publish helper:

```powershell
$env:GITHUB_TOKEN="your-github-token"
node tools/publish-github.mjs launchlens
```

This can create or reuse the GitHub repository, regenerate and commit `project-payload.json` with the expected GitHub Pages URL, then push `main`.

After GitHub Pages deploys, the likely public URL will be:

```text
https://YOUR_ACCOUNT.github.io/launchlens/
```

## Local validation

```bash
cd launchlens
node tools/serve.mjs
```

Open:

```text
http://localhost:8080/launchlens/
```

Run tests:

```bash
node tests/scoring.test.mjs
```

## Build Project Wall payload

After you have public demo and repo URLs:

```bash
set LAUNCHLENS_DEMO_URL=https://your-demo-url
set LAUNCHLENS_REPO_URL=https://github.com/your-account/launchlens
set LAUNCHLENS_TEAM_MEMBERS=Your Name
node tools/build-project-payload.mjs
```

PowerShell equivalent:

```powershell
$env:LAUNCHLENS_DEMO_URL="https://your-demo-url"
$env:LAUNCHLENS_REPO_URL="https://github.com/your-account/launchlens"
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
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
$env:LAUNCHLENS_TEAM_MEMBERS="Your Name"
node tools/complete-submission.mjs launchlens
```

The script loads the official event ID from:

```text
https://evol.epicconnector.ai/api/events?slug=ucws-singapore-hackathon---2026-cxgy
```

Then it posts `project-payload.json` to:

```text
https://evol.epicconnector.ai/api/projects
```

Do not share your token publicly.
