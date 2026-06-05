# UCWS Project Radar

LaunchLens can mirror the UCWS Singapore Hackathon 2026 Project Wall into local JSON, commit it back to GitHub, and render it in the app as a searchable judge-facing radar.

## What It Syncs

- Event metadata from `https://evol.epicconnector.ai/api/events?slug=ucws-singapore-hackathon---2026-cxgy`
- Project list pages from `/api/projects?eventId=...`
- Each project detail from `/api/projects/{projectId}`
- Normalized links, tracks, categories, vote counts, repository/demo signals, screenshots, and team data

The Epic Connector Project Wall API requires an authenticated token. The script never writes the token into output files.

## Local Run

```powershell
cd "C:\Users\35398\Desktop\UCWS 2026\launchlens"
$env:EPIC_TOKEN="YOUR_EPIC_CONNECTOR_LOCALSTORAGE_TOKEN"
npm.cmd run sync:ucws
```

For a local 30-minute loop:

```powershell
$env:EPIC_TOKEN="YOUR_EPIC_CONNECTOR_LOCALSTORAGE_TOKEN"
npm.cmd run sync:ucws:watch
```

To use a 10-minute loop instead:

```powershell
node tools/sync-ucws-project-wall.mjs --watch --interval-minutes=10
```

## GitHub Automation

The workflow `.github/workflows/ucws-project-wall-sync.yml` runs every 30 minutes and commits changes to:

- `data/ucws-project-wall.json`
- `data/ucws-project-wall.md`

Set the repository secret:

```text
EPIC_TOKEN = your Epic Connector localStorage token
```

Then run the workflow manually once from GitHub Actions to confirm the token is valid.

## Output Contract

`data/ucws-project-wall.json` contains:

- `event`: event id, slug, title, tracks, and Project Wall flags
- `totals`: project count and evidence coverage counts
- `projects`: normalized project objects for the app
- `projectLinks`: compact enumerated project references
- `errors`: token or API errors, if any

When the token is missing, the file is still generated with event metadata and a `TOKEN_MISSING` error so the app can explain what is needed.
