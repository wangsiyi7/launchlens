# LaunchLens Demo Video Script

Target length: 60-90 seconds.

## Scene 1: Open

Narration:

```text
This is LaunchLens, a UCWS Project Wall submission copilot for hackathon teams. It helps builders turn rough notes into a scored, ready-to-submit project package.
```

Action:

- Open `http://127.0.0.1:8080/launchlens/`.
- Show the Temple Mode first screen.
- Point out the readiness score and the six spatial workflow nodes.

## Scene 2: Temple Mode

Narration:

```text
The default experience is Temple Mode. Each node maps to a required part of the submission workflow: project story, evidence, scoring, optional LLM refinement, generated materials, and final handoff.
```

Action:

- Click `Project Altar`.
- Click `Evidence Steps`.
- Click `Score Gate`.
- Click `Oracle LLM`.
- Click `Archive Hall`.
- Click `Final Door`.

## Scene 3: Oracle LLM

Narration:

```text
Oracle LLM is a reserved OpenAI-compatible model slot. Teams can use their own endpoint, model, and API key to improve the current submission copy, while the key stays in the browser session.
```

Action:

- Click `Oracle LLM`.
- Click `Open Oracle`.
- Show the endpoint, model, and API key fields.

## Scene 4: Classic Mode

Narration:

```text
For speed and reliability, Classic Mode keeps the full two-column form. Teams can edit Project Wall fields directly and run the review agent at any time.
```

Action:

- Switch to `Classic`.
- Show project fields.
- Click `Run Review Agent`.
- Show Community Vote, AI Evaluation, and Expert Judges cards.

## Scene 5: Generated Outputs

Narration:

```text
LaunchLens generates the materials teams need for submission: a Project Wall pack, README, pitch, sprint plan, and fix list.
```

Action:

- Click `Submission Pack`.
- Click `README`.
- Click `Pitch`.
- Click `Sprint Plan`.
- Click `Fix List`.

## Scene 6: Final Handoff

Narration:

```text
Before final submission, LaunchLens validates that the team has real GitHub, demo, screenshot, logo, and team member values. This prevents accidental submission with placeholders.
```

Action:

- Show `FINAL_READINESS_REPORT.md`.
- Show `FINAL_SUBMISSION_RUNBOOK.md`.
- Mention that final Project Wall submission requires GitHub and Epic Connector login.

## Closing Line

```text
LaunchLens helps teams spend less time formatting submissions and more time proving what they built.
```
