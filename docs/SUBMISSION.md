# LaunchLens Submission Summary

LaunchLens is a browser-based Evidence Gate for hackathon teams. It helps builders turn rough project material into a clean, inspectable Project Wall package with demo links, repository evidence, screenshots, scoring, bilingual copy, and optional LLM refinement.

## Official Fields

| Field | Value |
| --- | --- |
| Project name | LaunchLens |
| Track | Application |
| Tagline | Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages. |
| Demo URL | https://wangsiyi7.github.io/launchlens/ |
| GitHub repository | https://github.com/wangsiyi7/launchlens |
| Logo URL | https://wangsiyi7.github.io/launchlens/assets/logo.svg |

For the full copy-ready version, use the root-level `PROJECT_WALL_SUBMISSION.md`.

## Description

LaunchLens is a browser-based submission evidence collaboration app for hackathon teams, solo builders, community reviewers, and demo-day organizers.

Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.

LaunchLens turns that final handoff into an interactive Evidence Gate. Teams enter their Project Wall fields, then the app audits required evidence, scans public GitHub repository signals, scores readiness across Community Vote, AI Evaluation, and Expert Judges, and generates a copy-ready submission pack, README draft, pitch, sprint plan, and fix list.

UCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.

## Tech Stack

- HTML
- CSS
- JavaScript
- Browser localStorage
- GitHub public API repository scanning
- GitHub Pages and Vercel-ready static deployment
- Optional OpenAI-compatible `chat/completions` endpoint

## Review Checklist

- Open the demo and confirm Temple Mode appears.
- Switch between Temple Mode and Classic Mode.
- Run the Evidence Gate review.
- Scan the GitHub repository URL.
- Confirm screenshots and logo URLs load.
- Run `npm.cmd test`.
- Run `node tools/validate-submission.mjs`.

## Vercel Note

Vercel deployment is configured but requires account authorization. Use `tools/deploy-vercel.mjs` with `VERCEL_TOKEN`; then replace the demo URL with the Vercel production URL if preferred.
