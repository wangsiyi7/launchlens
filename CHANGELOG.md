# Changelog

All notable LaunchLens updates should be recorded here before pushing to GitHub and refreshing the public demo.

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

