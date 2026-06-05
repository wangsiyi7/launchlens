# Codex Delivery Retrospective and Skill Specification

This document turns the LaunchLens delivery into a reusable Codex workflow. It is intentionally reflective: the point is not only to record what happened, but to extract a repeatable operating pattern for future competition, demo, GitHub, and deployment tasks.

## 1. First Reflection

The successful part of this project was not a single implementation trick. It was the eventual convergence of product thinking, working software, submission proof, repository structure, and public access.

The main mistake was spending too much early energy on Markdown artifacts before the app itself was strong enough. The documentation was useful, but it briefly became the center of gravity. The turning point came when the task was reframed from "generate submission docs" to "build a real Evidence Gate product that teams can use before Project Wall submission."

The second lesson was that public deployment and GitHub synchronization are not final polish. They are part of the product. A hackathon project is judged through links, screenshots, repository credibility, and a short window of attention. If the demo link, README, payload, and repository are weak, the product is not truly shipped.

The third lesson was to treat external authorization honestly. GitHub was completed because credentials were available. Vercel remained blocked because no Vercel login state or token existed. A mature workflow must create the deployment path and helper script, but must not claim deployment success without a real URL.

## 2. Actual Work Path

### Phase 0: Understand the Competition Surface

The work started by inspecting the UCWS Singapore Hackathon context, Project Wall expectations, likely scoring surfaces, and the visible structure of submitted projects.

Key inference:

- The project needed a public demo, GitHub repository, screenshots, logo, team fields, and a clear product narrative.
- The official Project Wall API required authentication for project submission, so manual copy fields and a machine-readable payload were both necessary.
- The selected track became `Application`, because the strongest submission was a usable app rather than only an agent prompt or research artifact.

Reusable rule:

- For competition work, first map the judging path, submission fields, public links, and authentication boundaries before building.

### Phase 1: Build the First Shippable App

The first version of LaunchLens focused on the basic promise: help a team convert rough hackathon information into submission-ready outputs.

Early artifacts included:

- `index.html`
- `app.js`
- `styles.css`
- `project-payload.json`
- validation and submission helper scripts
- screenshots and logo assets
- submission audit documents

This created useful scaffolding, but it still leaned too much toward documents. The app was functional, yet the product identity was not sharp enough.

Reusable rule:

- Build the smallest real product path first, then generate docs from the product. Do not let docs replace product behavior.

### Phase 2: GitHub and Public Demo Path

The project then moved toward public proof:

- Git repository initialized and repeatedly committed.
- GitHub remote created and pushed.
- GitHub Pages workflow added.
- Public demo verified at `https://wangsiyi7.github.io/launchlens/`.
- Submission pack and source archive generated.

Important operational issue:

- A local sync process repeatedly renamed `README.md` into `README-副本...md`.
- The fix was to preserve the remote README, ignore local duplicate files, and use Git archive output for clean packaging.

Reusable rule:

- Treat `git status`, remote raw file checks, and public HTTP checks as separate evidence surfaces. Passing one does not prove all three.

### Phase 3: Product Rethink

The user correctly challenged that too much effort had gone into Markdown. This forced a product-level rethink.

The better product became:

> LaunchLens is an Evidence Gate for hackathon submission readiness.

This changed the app from a document generator into a collaboration tool:

- Teams enter Project Wall fields.
- The app audits missing evidence.
- It scans GitHub repository signals.
- It scores readiness for community vote, AI evaluation, and expert judges.
- It gives transition suggestions between steps.
- It generates copy-ready materials only after evidence is visible.

Reusable rule:

- When criticized, do not defend the prior path. Re-derive the product from user value and judging context.

### Phase 4: Interaction and Visual Identity

The user wanted a beautiful spatial feeling inspired by an ancient architectural background. The app added:

- 2.5D Temple Mode
- six clickable workflow nodes
- subtle mouse particle effects
- mode switching between Temple and Classic views
- clear step transitions
- bilingual Chinese/English UX
- examples and workflow recommendations

The key design balance was to keep the background beautiful without making it noisy. The spatial layer became an entry point, while Classic Mode remained the stable operational tool.

Reusable rule:

- Add visual magic only after the core workflow is inspectable. Keep the operational mode available.

### Phase 5: Official-Style Repository Structure

The repository was reorganized for formal review:

- Root README became bilingual and formal.
- `PROJECT_WALL_SUBMISSION.md` became the copy source.
- `docs/` became the home for audits, runbooks, research, deployment, and readiness reports.
- tests remained in `tests/`.
- helper scripts remained in `tools/`.
- deployment configs were added for GitHub Pages, Vercel, and Netlify.

Reusable rule:

- The root should answer "what is this, where is the demo, how do I judge it, how do I run it?" in under one minute.

### Phase 6: Deployment and Final Gates

Verified gates:

- GitHub repository: ready.
- GitHub Pages demo: ready.
- Tests: passing.
- Payload validation: passing.
- Source package: generated.
- Project Wall copy: ready.

Blocked gate:

- Vercel production link required Vercel account authorization.

The mature response was to provide:

- `vercel.json`
- `.vercelignore`
- `tools/deploy-vercel.mjs`
- exact token deployment command
- documentation explaining the missing external input

Reusable rule:

- If deployment depends on external credentials, ship the deterministic deploy path and mark the credential gate explicitly.

## 3. Product Thinking Extracted

The business/product question was:

> What recurring pain does this solve beyond one hackathon?

The answer:

Hackathon teams need a pre-submission evidence layer. They often have a project but not a credible public package. LaunchLens turns final submission into a repeatable inspection workflow.

Primary users:

- solo builders
- hackathon teams
- community reviewers
- organizers
- accelerator demo-day teams
- open-source showcase maintainers

Core product value:

- reduces final-day chaos
- improves judging comprehension
- makes missing proof visible
- creates a stable handoff from build to public submission

Strategic positioning:

- not "AI writes my submission"
- instead "the team proves submission readiness through visible evidence"

## 4. Reusable Codex Workflow

Use this sequence for future competition-to-shipped-web-app tasks.

### Gate 1: External Surface Audit

Collect:

- event URL
- submission fields
- public examples
- track options
- judging criteria
- auth boundaries
- final deadline assumptions

Output:

- short strategy note
- selected track
- required field list
- unknowns and blocked APIs

### Gate 2: Product Decision

Ask:

- Who is the real user?
- What pain repeats beyond this event?
- What evidence will judges inspect?
- What must be interactive instead of written?
- What can be optional?

Output:

- one-sentence product thesis
- primary workflow
- minimum shippable app scope

### Gate 3: Build the App Early

Create:

- runnable app shell
- real state model
- visible interaction feedback
- sample data
- export/copy behavior
- responsive layout

Validation:

- run local server
- open app
- verify first screen is the product, not a landing page

### Gate 4: Add Evidence and Submission Logic

Create:

- field audit matrix
- scoring model
- missing-proof suggestions
- repository scanner when applicable
- copy-ready official fields
- machine-readable payload

Validation:

- unit tests for scoring and audit logic
- payload validator

### Gate 5: Visual Differentiation

Add only after Gate 3 and Gate 4:

- background visual system
- spatial or 2.5D metaphor
- subtle particles or hover feedback
- page switching transitions
- bilingual support if relevant

Validation:

- desktop and mobile screenshots
- no text overlap
- operational mode remains clear

### Gate 6: GitHub Credibility

Required:

- formal README
- clean root structure
- docs folder for supporting material
- tests folder
- tools folder
- deployment config
- pushed GitHub remote

Validation:

- `git status --short -uall`
- raw GitHub README HTTP 200
- Project Wall field file HTTP 200

### Gate 7: Public Demo

Preferred order:

1. GitHub Pages or static hosting that can be automated.
2. Vercel/Netlify when account authorization exists.
3. Temporary tunnel only for short review, never final judging.

Validation:

- public URL returns HTTP 200
- page contains app identity and key assets
- screenshots and logo load from public domain

### Gate 8: Final Package

Create:

- `PROJECT_WALL_SUBMISSION.md`
- `project-payload.json`
- final readiness report
- source archive
- deployment runbook

Validation:

- tests pass
- payload validation passes
- public links pass
- GitHub remote has latest commit

## 5. Commands Worth Reusing

```powershell
npm.cmd test
node tools/validate-submission.mjs
node tools/final-readiness-report.mjs
git status --short -uall
git log --oneline --decorate -5
```

Public checks:

```powershell
Invoke-WebRequest -Uri "https://github.com/OWNER/REPO" -UseBasicParsing
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/OWNER/REPO/main/README.md" -UseBasicParsing
Invoke-WebRequest -Uri "https://OWNER.github.io/REPO/" -UseBasicParsing
```

Vercel token deployment:

```powershell
$env:VERCEL_TOKEN="your-vercel-token"
node tools/deploy-vercel.mjs
```

## 6. Anti-Patterns to Avoid

- Writing a large documentation pack before the product interaction is strong.
- Calling a project deployed before a real public URL is verified.
- Treating an auth-required API as scriptable without a token.
- Letting temporary tunnel URLs enter final submission files.
- Leaving placeholders in Project Wall fields.
- Allowing local sync artifacts to pollute Git.
- Making visual effects the main product when judges need proof.

## 7. Skill Design Recommendation

The future skill should be concise and procedural. It should not include this whole story inside `SKILL.md`. Instead:

- `SKILL.md`: trigger rules, gates, commands, and required evidence.
- `references/delivery-replay.md`: this case study and detailed lessons.
- optional scripts: link checker, payload validator, static package builder.
- optional plugin wrapper: exposes the skill as a Codex plugin.

Recommended skill name:

```text
hackathon-project-delivery
```

Recommended trigger contexts:

- user wants to build a competition project
- user wants a hackathon submission
- user asks to ship a public demo and GitHub repo
- user asks for Project Wall, Devpost, demo-day, accelerator, or open-source showcase preparation

## 8. Success Definition

Do not mark a similar task complete until all applicable items are proven:

- app exists and runs
- public demo URL works
- GitHub repo works
- README is formal and bilingual if requested
- submission fields are copy-ready
- payload validates
- tests pass
- screenshots/logo exist and load
- final package is generated
- external auth blockers are named honestly

This is the main lesson: a Codex delivery is not complete when the code looks plausible. It is complete when the user's external review path is actually usable.

## 9. Current Skill and Plugin Artifacts

The reusable workflow has been materialized inside this repository as a reviewable plugin draft:

```text
plugins/hackathon-project-delivery/
  .codex-plugin/plugin.json
  skills/hackathon-project-delivery/SKILL.md
  skills/hackathon-project-delivery/agents/openai.yaml
  skills/hackathon-project-delivery/references/delivery-replay.md
```

The `SKILL.md` file is intentionally concise. It contains the trigger description, operating principle, workflow gates, required artifacts, validation commands, and failure rules. The detailed story is kept in `references/delivery-replay.md` so future Codex runs can load it only when the precedent is useful.

Validation performed:

```text
Skill is valid!
Plugin validation passed: C:\Users\35398\Desktop\UCWS 2026\launchlens\plugins\hackathon-project-delivery
```

The validation used the official Codex `skill-creator` and `plugin-creator` scripts with PyYAML installed into a temporary dependency directory, so the repository and global Python environment were not modified.

To turn this draft into an installed personal plugin later, copy or scaffold the same folder under the Codex personal plugin location and add a marketplace entry. Keep the repository copy as the source of truth until the user explicitly chooses to install it globally.
