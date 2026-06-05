# Project Wall Research Notes

## Sources checked

- Official event page: `https://evol.epicconnector.ai/events/ucws-singapore-hackathon---2026-cxgy`
- Project Wall page: `https://evol.epicconnector.ai/events/ucws-singapore-hackathon---2026-cxgy/project-wall`
- Event API: `https://evol.epicconnector.ai/api/events?slug=ucws-singapore-hackathon---2026-cxgy`
- Project API discovered from frontend chunk: `/api/projects?eventId={eventId}&sort={sort}&limit=20&offset={offset}`
- Public web search for UCWS-related repos, skills, and submissions

## Access finding

The Project Wall frontend loads the event metadata publicly, but the project list endpoint returns HTTP 401 without a logged-in Epic Connector token. The static page and frontend chunks confirm that project list data is fetched from `/api/projects`, but complete anonymous export is blocked.

Latest re-check on June 5, 2026 (Asia/Shanghai): event metadata is still public, project submission and editing are still enabled, current participants are 562, and the anonymous Project API still returns HTTP 401 for:

```text
https://evol.epicconnector.ai/api/projects?eventId=364d3219-5907-48b6-a34d-e95f90b10579&sort=popular&limit=20&offset=0
```

Additional live re-check on June 5, 2026 (Asia/Shanghai):

- The public Project Wall HTML returns HTTP 200 and renders the Project Wall shell.
- The static HTML does not embed project-card data or LaunchLens.
- The visible public links include Sign In, sponsor links, and support email, but not direct project-detail links.
- The active frontend chunks reference authenticated project operations:
  - `/api/projects/can-submit?eventId=...` with `Authorization: Bearer ${token}` and `credentials: "include"`.
  - `/api/projects/{projectId}/vote` with a token from localStorage.
  - `PUT /api/projects` for project updates, with the token included in the request body.
- Public web search did not expose a reliable index of the submitted UCWS Project Wall entries.

Conclusion: the official Project Wall is publicly visible as a shell, but the complete project list and submission actions require an authenticated Epic Connector session. LaunchLens can therefore be completed as a repository, demo, and copy-ready Project Wall package, while official publication still requires manual login or `EPIC_TOKEN`.

Event ID discovered:

```text
364d3219-5907-48b6-a34d-e95f90b10579
```

## Event facts from the official API

- Title: UCWS Singapore Hackathon -- 2026
- Format: hybrid
- Location: Singapore
- Participants: 562 current participants reported by the API on June 5, 2026
- Tracks: Agent, Skill, Application, DeepResearch
- Submission enabled: true
- Project edit enabled: true
- Demo Day: June 13, 2026

## Observed opportunity

Public search results and visible ecosystem context show many builder-tool, agent, and skill-plugin submissions. A fast project should avoid being another generic plugin and instead solve an immediate, shared pain for all teams.

LaunchLens targets that gap:

- It can be used by any UCWS team before submission.
- It maps directly to Project Wall fields.
- It mirrors the event's evaluation dimensions.
- It creates outputs that improve community clarity, AI-evaluable repo quality, and judge-facing product narrative.
- It is a complete browser app, so the demo is simple to deploy and test.

## Submission strategy

Track: Application

Positioning: a practical submission-readiness product for hackathon teams, not a generic writing assistant.

## GitHub repository finding

Official repo checked:

```text
https://github.com/EpicConnectorAI/UCWS-SINGAPORE-HACKATHON-2026
```

The official repository currently contains README, RESOURCES, SECURITY, and license files. It describes itself as an archive/showcase repository, but the live clone did not include a project submission folder or the referenced `docs/SUBMISSION_GUIDELINES.md`. The practical GitHub requirement for LaunchLens is therefore to push this project to its own GitHub repo and use that repo URL in the Evol Project Wall submission.

Primary proof:

- Working static app.
- Instant scoring and fix list.
- Markdown/JSON export.
- UCWS-specific field mapping.
- README and submission pack included in the repo.

Next step after deployment:

- Add public demo URL.
- Capture screenshot.
- Push repo to GitHub.
- Submit Project Wall fields from `SUBMISSION.md`.
