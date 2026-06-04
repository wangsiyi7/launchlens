# LaunchLens Source Access

This temporary public source page is provided for UCWS review while the stable GitHub repository is pending.

## Temporary source package

Download the current source bundle while the local temporary tunnel is running:

```text
launchlens-source.zip
```

Expected public URL while the Cloudflare Quick Tunnel is running:

```text
https://volume-obituaries-half-coaches.trycloudflare.com/launchlens-source.zip
```

## Stable GitHub repository

The project is already initialized as a local Git repository on branch `main`.

On GitHub Pages, the repository itself is the stable source of truth; the temporary zip URL is only a fallback for review before the GitHub repo is pushed.

When a GitHub remote or `GITHUB_TOKEN` is available, push with one of these commands:

```powershell
node tools/push-github.mjs https://github.com/YOUR_ACCOUNT/launchlens.git
```

or:

```powershell
$env:GITHUB_TOKEN="your-github-token"
node tools/publish-github.mjs launchlens
```

The final Project Wall `repoUrl` should be the GitHub repository URL. This temporary source page is only a review fallback while GitHub publishing is pending.

## Contents

- `index.html`, `styles.css`, `app.js`: the app
- `README.md`: project README
- `ASSETS.md`: repository asset index
- `PROJECT_WALL_FIELDS.md`: copy-paste Project Wall fields
- `SUBMISSION.md`: UCWS submission draft
- `FINAL_SUBMISSION_RUNBOOK.md`: final GitHub and Project Wall execution checklist
- `tests/scoring.test.mjs`: scoring logic test
- `tools/`: local serve, payload validation, GitHub, and Epic submit helpers
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow
