# Submission Audit

## Current State

| Requirement | Status | Evidence |
| --- | --- | --- |
| Working demo app | Done locally | `index.html`, `app.js`, `styles.css`; local server URL `http://localhost:8080/launchlens/` |
| UCWS-aligned fields | Done | `PROJECT_WALL_FIELDS.md`, `SUBMISSION.md` |
| Project description | Done | `SUBMISSION.md`, generated in app |
| README | Done | `README.md` |
| Screenshot | Done | `assets/screenshot.png`, `assets/screenshot-mobile.png` |
| Project logo | Done | `assets/logo.svg` |
| Deployment config | Done | `netlify.toml`, `vercel.json`, `DEPLOYMENT.md` |
| Local tests | Done | `node tests/scoring.test.mjs` |
| Local Git repo | Done | branch `main`; run `git log --oneline -1` for the latest commit |
| Submission zip | Done | `../LaunchLens_submission_pack.zip` |
| Temporary public source page | Done | `SOURCE.md`, public URL through Cloudflare tunnel |
| Temporary source bundle | Done | `launchlens-source.zip`, regenerated locally |
| Project payload generator | Done | `tools/build-project-payload.mjs` |
| Project payload validator | Done | `tools/validate-submission.mjs`; blocks non-GitHub repo URL and placeholder team member |
| Authenticated submit script | Done | `tools/submit-project.mjs`, requires `EPIC_TOKEN` |
| One-command publish and submit script | Done | `tools/complete-submission.mjs`, requires `GITHUB_TOKEN` and `EPIC_TOKEN` |
| Final submission runbook | Done | `FINAL_SUBMISSION_RUNBOOK.md` |
| Safe local public-root server | Done | `tools/serve-public-root.mjs`, serves only `launchlens/` |
| Temporary public demo URL | Done | `https://vendors-pride-returning-empirical.trycloudflare.com`, via Cloudflare Quick Tunnel |
| GitHub Pages workflow | Done | `.github/workflows/pages.yml` |
| GitHub push helper | Done | `tools/push-github.mjs`, requires a target GitHub remote |
| GitHub create/publish helper | Done | `tools/create-github-repo.mjs`, `tools/publish-github.mjs`, requires `GITHUB_TOKEN` |
| Official repo patch | Done | `../LaunchLens_official_repo_submission.patch` |
| Public demo URL | Pending account/deploy step | Requires selected hosting account |
| Public repo URL | Pending account/repo step | Requires GitHub or other repo host |
| Actual Project Wall submission | Pending login | Epic Connector `/api/projects` requires authenticated token |

## Known External Blockers

- Project Wall list and submission endpoint require login. Anonymous `/api/projects` requests return HTTP 401.
- Final repo URL must be an HTTPS GitHub URL. The temporary Cloudflare `SOURCE.md` page is only a fallback for review, not a final hackathon repo URL.
- Public deployment requires a chosen hosting account or explicit permission to create a new site.
- Public repo URL requires a chosen GitHub account, repo remote, or token.

## Fastest Completion Path

1. Push `launchlens/` to a GitHub repo.
2. Deploy `launchlens/` with Netlify, Vercel, or GitHub Pages.
3. Generate and validate `project-payload.json`.
4. Log in to Epic Connector.
5. Submit the fields from `PROJECT_WALL_FIELDS.md` or run `tools/submit-project.mjs`.
