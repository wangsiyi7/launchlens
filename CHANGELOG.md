# Changelog

All notable LaunchLens updates should be recorded here before pushing to GitHub and refreshing the public demo.

## 2026-06-06 - Judge-Focused Demo Interaction Pass

### Added

- Added a full-bleed dynamic workbench background on the Temple demo surface, with Three.js when available and a local canvas fallback when offline.
- Added drag and wheel-driven parallax controls so the homepage responds like a live demo workspace.
- Added a concise judge-scan summary on the Temple demo surface for value, proof, and export readiness.
- Added per-step Temple downloads so each selected Story, Proof, Score, Agent, Pack, or Ship section can be exported as Markdown.
- Added visible toast and click feedback for review, copy, export, step selection, and step download actions.

### Updated

- Simplified the main demo surface by removing duplicate floating Temple nodes and using the Launch Path as the primary step selector.
- Shortened top-level demo controls to make the web app feel faster to scan during judging.
- Refreshed Project Wall payload, English/Chinese copy-ready submission files, and final readiness report to describe the dynamic Temple workbench as the recommended demo entry.
- Refreshed Project Wall screenshot assets so public images show the dynamic Temple workbench, Hub graph, Platform Console, and mobile view.

### Verified

- Node.js syntax check and test suite passed.
- Submission payload validation passed.
- Chrome headless desktop and mobile screenshots were inspected.
- Screenshot pixel sampling confirmed the dynamic workbench area is non-blank.

## 2026-06-06 - Temple Launch Path Refinement

### Added

- Added a first-screen Launch Path strip in Temple Mode so users can see Story, Proof, Score, Agent, Pack, and Ship steps without leaving the spatial view.
- Reused the existing workflow readiness states across Temple nodes, mobile navigation, workflow rail, and the new Launch Path strip.

### Updated

- Tightened mobile toolbar layout to avoid cramped or clipped controls on narrow screens.
- Added page-level horizontal overflow guards for more stable mobile rendering.

### Verified

- Node.js test suite passed.
- Submission payload validation passed.
- Chrome headless desktop and mobile screenshots were inspected.

## 2026-06-06 - UCWS Project Searcher Skill Reference

### Updated

- Clarified the sibling `ucws-project-aggregator` project as a UCWS Project Searcher Skill rather than a duplicated official-content archive.
- Updated bilingual README wording to include bilingual submission forms, commit history, evidence norms, and Agent handoff flow.

### Verified

- Node.js test suite passed.
- Submission payload validation passed.

## 2026-06-05 - UCWS Public Snapshot Refresh

### Updated

- Refreshed the public UCWS event snapshot and readiness evidence.
- Updated current public participant count from 565 to 566.
- Fast-forwarded the `gh-pages` branch so the public demo serves the latest logo and submission assets.

### Verified

- GitHub Pages demo and Hub returned HTTP 200.
- Public logo asset returned the latest letter-integrated lizard SVG.
- Submission payload validation passed.

## 2026-06-05 - Letter-Integrated Lizard Logo Revision

### Updated

- Replaced the previous name-label logo treatment with a cleaner lizard-toned SVG emblem.
- Integrated Annie, Yiang, and Hu Yinghui through A/Y/H node marks instead of full pasted labels.
- Added lizard-skin scale texture, sampled jade/sandstone tones, and a quieter LaunchLens lens mark.

### Verified

- Rendered the SVG locally through headless Chrome for visual inspection.
- Submission payload validation passed.

## 2026-06-05 - Huiyoung Logo And Team Submission Update

### Updated

- Rebuilt `assets/logo.svg` as a lizard-green 汇young team emblem with Annie, Yiang, and Hu Yinghui identity marks.
- Updated English, Chinese, and root Project Wall submission files with the final team roles and GitHub links.
- Updated the Project Wall payload generator to emit structured team member JSON for Annie, Yiang, and Hu Yinghui.
- Refreshed deployment and final-submission runbooks to use `LAUNCHLENS_TEAM_MEMBERS_JSON`.
- Regenerated `project-payload.json` and `docs/FINAL_READINESS_REPORT.md`.

### Verified

- Submission payload validation passed.
- Node.js test suite passed.

## 2026-06-05 - UCWS Companion Aggregator Links

### Added

- Added links from the UCWS Project Radar UI to the official UCWS GitHub archive and the sibling `ucws-project-aggregator` local and Pages demo targets.
- Added the live `ucws-project-aggregator` GitHub repository link to the Project Radar link strip.
- Updated companion wording around the UCWS Project Searcher role, including official resources and commit history.
- Added `docs/UCWS_COMPANION_AGGREGATOR.md` to document the cross-repository data flow, commands, and demo targets.
- Added official UCWS repository attribution notes.

### Updated

- Updated the root README and documentation index with live companion aggregator repository/demo links and interop notes.

## 2026-06-05 - RepoScape-Inspired Hub And Agent Bridge

### Added

- Added a RepoScape-inspired Hub graph model with draggable nodes, persistent node coordinates, pan/zoom viewport storage, search, relation inspection, and clearer edge types.
- Added Codex Bridge and ClaudeCodex interoperability exports with `graphOverview`, `selectedNeighborhood`, and ready-to-copy agent commands.
- Added Project Manager for local workspace snapshots, including project fields, Hub coordinates, ideas, agent runs, generated materials, repo scan state, and Codex payload.
- Added OpenAPI contract paths for `GET /api/graph/overview`, `GET /api/graph/neighborhood`, and `GET /api/agent/bridge`.
- Added `docs/REPOSCAPE_HUB_INTEGRATION.md` and RepoScape attribution records.
- Restored and rewrote the root `README.md` as a formal bilingual GitHub landing page.

### Updated

- Updated the Hub screenshot asset to show the upgraded graph HUD.
- Updated Codex API examples with graph and interoperability payloads.
- Updated platform-core tests to protect RepoScape attribution, graph overview, neighborhood slicing, and ClaudeCodex support.

### Public Demo Status

- GitHub Pages demo: https://wangsiyi7.github.io/launchlens/
- GitHub Pages Hub demo: https://wangsiyi7.github.io/launchlens/?mode=hub
- Vercel production demo: pending account authorization. The repository keeps `vercel.json` ready for deployment.

## 2026-06-05 - Re-Forge Protocol Integration

### Added

- Added a re-forge-inspired Adversarial Gate step to the guided hackathon process.
- Added a Re-Forge Gate Agent to Agent Studio for upgrade audits, evidence checks, attribution reminders, and changelog discipline.
- Added re-forge to Tool Stack and Hub star-map recommendations with an external GitHub link.
- Added external references to the Codex API JSON export so downstream Codex work can see which outside project influenced the upgrade method.
- Added `docs/RE_FORGE_INTEGRATION.md` to explain how LaunchLens uses the re-forge methodology without copying its source code.
- Added `docs/ATTRIBUTION.md` to keep external project links and license notes auditable.

### Updated

- Updated platform-core tests to protect the Re-Forge Gate Agent, re-forge tool link, and MIT attribution metadata.
- Updated `docs/README.md` so future maintainers can find the new changelog, attribution, and integration notes.

### Public Demo Status

- GitHub Pages demo: https://wangsiyi7.github.io/launchlens/
- GitHub Pages Hub demo: https://wangsiyi7.github.io/launchlens/?mode=hub
- Vercel production demo: pending account authorization. The local environment currently has no `VERCEL_TOKEN`, and `vercel whoami` did not return an authenticated user in non-interactive mode.

## 2026-06-05 - Bilingual UCWS Submission Files

### Added

- Added `PROJECT_WALL_SUBMISSION.zh-CN.md` for Chinese copy-ready UCWS Project Wall submission.
- Added `PROJECT_WALL_SUBMISSION.en.md` for English copy-ready UCWS Project Wall submission.

### Verified

- Submission payload validation passed.
- GitHub Pages and raw GitHub links returned HTTP 200.

## 2026-06-05 - Hackathon Hub Platform Upgrade

### Added

- Added Hackathon Hub with Canvas star-map rendering for ideas, agents, evidence, tools, and process nodes.
- Added Platform Console with process guidance, Agent Studio, demo tutorial, idea archive, tool recommendations, optional Supabase sync, and Codex API export.
- Added optional Supabase workspace schema and documentation.
- Added OpenAPI contract and example Codex workspace snapshot.

### Verified

- Node.js tests passed.
- Public GitHub Pages demo returned HTTP 200.
