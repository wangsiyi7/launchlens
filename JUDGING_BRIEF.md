# LaunchLens Judging Brief

## One-Line Summary

LaunchLens turns rough hackathon notes into scored, copy-ready Project Wall submission materials, with a spatial Temple Mode and a reliable Classic Mode.

## Why This Project Exists

Hackathon teams often build working products, then lose the final hours translating that work into a clear public submission. UCWS submissions must satisfy community voters, AI evaluation, and expert judges at the same time. LaunchLens focuses on that final-mile problem.

## UCWS Fit

| UCWS Lens | LaunchLens Response |
| --- | --- |
| Real product value | Helps any UCWS builder prepare a stronger submission before deadline. |
| Execution quality | Complete bilingual browser app with scoring, generated outputs, copy/export, local autosave, Temple Mode, Classic Mode, and optional LLM refinement. |
| Global scalability | Works for hackathons, accelerators, pitch events, demo days, and product launch reviews beyond UCWS. |
| Community vote | Makes project value readable and shareable in minutes. |
| AI evaluation | Encourages GitHub repo URL, evidence fields, screenshots, tech stack, README, and structured submission copy. |
| Expert judges | Clarifies user pain, product workflow, proof, business relevance, and final submission readiness. |

## Product Walkthrough

1. Open LaunchLens.
2. Start in Temple Mode, the spatial submission workflow.
3. Click six nodes:
   - Project Altar: project story
   - Evidence Steps: demo, repo, screenshots, team
   - Score Gate: readiness score
   - Oracle LLM: optional OpenAI-compatible enhancement
   - Archive Hall: generated materials
   - Final Door: GitHub / Project Wall handoff
4. Switch to Classic Mode for direct form editing.
5. Run Review Agent.
6. Copy Markdown or download the submission JSON.

## Current Proof

- Local app: `http://127.0.0.1:8080/launchlens/`
- Desktop screenshot: `assets/screenshot.png`
- Mobile screenshot: `assets/screenshot-mobile.png`
- Spatial background: `assets/temple-background.png`
- Readiness report: `FINAL_READINESS_REPORT.md`
- Submission copy: `PROJECT_WALL_FIELDS.md`
- Final runbook: `FINAL_SUBMISSION_RUNBOOK.md`
- Test command: `node tests/scoring.test.mjs`

## What Makes It Different

LaunchLens is not a generic writing assistant. It is a deadline-focused submission copilot that maps directly to the UCWS Project Wall and scoring model. Temple Mode gives the project a memorable interface, while Classic Mode keeps the workflow practical and reliable.

The app supports English and Chinese across the UI, Temple nodes, score notes, fix list, generated outputs, and sample data, making it better suited for UCWS' global and Asia-based builder audience.

## Remaining External Inputs

The local package is ready. Final public submission still needs:

- GitHub repository URL
- Stable public demo URL
- Real team member names
- Epic Connector login or `EPIC_TOKEN`

These are intentionally blocked by `tools/validate-submission.mjs` until real values are provided.
