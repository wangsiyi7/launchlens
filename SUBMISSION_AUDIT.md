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
| Local Git repo | Done | branch `main`, latest commit `ad760ee Add Project Wall payload and submit helpers` |
| Submission zip | Done | `../LaunchLens_submission_pack.zip` |
| Project payload generator | Done | `tools/build-project-payload.mjs` |
| Authenticated submit script | Done | `tools/submit-project.mjs`, requires `EPIC_TOKEN` |
| Safe local public-root server | Done | `tools/serve-public-root.mjs`, serves only `launchlens/` |
| Public demo URL | Pending account/deploy step | Requires selected hosting account |
| Public repo URL | Pending account/repo step | Requires GitHub or other repo host |
| Actual Project Wall submission | Pending login | Epic Connector `/api/projects` requires authenticated token |

## Known External Blockers

- Project Wall list and submission endpoint require login. Anonymous `/api/projects` requests return HTTP 401.
- Public deployment requires a chosen hosting account or explicit permission to create a new site.
- Public repo URL requires a chosen Git provider account.

## Fastest Completion Path

1. Push `launchlens/` to a GitHub repo.
2. Deploy `launchlens/` with Netlify, Vercel, or GitHub Pages.
3. Replace placeholder demo/repo URLs in `PROJECT_WALL_FIELDS.md`.
4. Log in to Epic Connector.
5. Submit the fields from `PROJECT_WALL_FIELDS.md`.
