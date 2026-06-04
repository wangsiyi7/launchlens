# LaunchLens Space Interaction Spec

> 中文 | English

This spec captures the next interaction direction for LaunchLens. It is intentionally a product and implementation specification, not a UI rewrite. The current Classic Mode must remain available and submission-ready.

## Product Direction

LaunchLens should evolve from a classic submission form into a spatial submission workflow:

```text
LaunchLens Submission Temple
LaunchLens 提交神殿
```

The core product remains a UCWS Project Wall submission copilot. Temple Mode adds narrative, spatial memory, and stronger first-impression value without replacing the working tool.

Principles:

```text
Space is the story.
Hotspots are the workflow.
Panels are the tools.
Readiness is the progress.
LLM is the oracle.
Submission is the final door.
```

中文原则：

```text
空间是叙事。
热点是流程。
面板是工具。
评分是进度。
LLM 是神谕。
提交是主殿大门。
```

## Required Modes

LaunchLens should support two modes.

| Mode | Purpose | Notes |
| --- | --- | --- |
| Temple Mode | Spatial first impression, guided workflow, stronger product memory | Default visual experience for demos |
| Classic Mode | Fast form editing, reliable output generation, submission efficiency | Must preserve the current two-column tool layout |

Classic Mode is a safety rail. It must remain reachable from the top-level UI and must not be removed.

## Temple Nodes

| Node | Chinese label | Existing function | Interaction result |
| --- | --- | --- | --- |
| Project Gate | 项目入口 | project identity and problem framing | Shows project name, track, tagline, target users, problem, solution |
| Evidence Columns | 证据石柱 | required proof fields | Shows demo URL, repo URL, tech stack, screenshots, team members |
| Score Courtyard | 评分庭院 | readiness analysis | Shows overall readiness, Community Vote, AI Evaluation, Expert Judges, fix-list summary |
| Oracle LLM | 大模型神谕 | optional LLM enhancement | Shows endpoint, model, API key, Enhance Current Pack |
| Archive Hall | 档案侧厅 | generated outputs | Shows Submission Pack, README, Pitch, Sprint Plan, Fix List |
| Final Door | 提交之门 | final actions | Shows Run Review Agent, Generate Pack, Copy Markdown, Download Pack, GitHub and Project Wall checklist |

## Desktop Layout

```text
Full-screen original temple background
Top left: LaunchLens / UCWS Application Track
Top right: Temple / Classic toggle
Left bottom: project name, current space, readiness score
Scene: 6 clickable hotspots
Right side: active function panel
Bottom: lightweight workflow progress
```

Hotspot behavior:

```text
1. Highlight the active hotspot.
2. Pan or zoom the background slightly.
3. Switch the right-side panel to the mapped function.
4. Mark completed nodes with a visible completed state.
```

## Mobile Layout

Mobile must not depend on image-position hotspots.

```text
Top: LaunchLens and mode toggle
Middle: atmospheric temple background and current node title
Bottom: six space navigation buttons
Content: full-width panel or bottom drawer
```

Reason: object-fit and viewport cropping make precise background hotspots unreliable on mobile.

## Suggested Hotspot Coordinates

These are starter coordinates for a wide temple or ruins composition. They should be tuned after the final original background asset is selected.

| Node | Suggested desktop position |
| --- | --- |
| Project Gate | left 18%, top 72% |
| Evidence Columns | left 34%, top 44% |
| Score Courtyard | left 50%, top 62% |
| Oracle LLM | left 66%, top 42% |
| Archive Hall | left 78%, top 56% |
| Final Door | left 86%, top 76% |

## Event Mapping

Temple Mode should reuse the existing app logic instead of rewriting it.

```text
Project Gate
-> show base project fields

Evidence Columns
-> show demoUrl, repoUrl, techStack, screenshotUrls, teamMembers

Score Courtyard
-> show overallScore and scoreGrid

Oracle LLM
-> reveal llmPanel
-> show endpoint, model, API key, Enhance Current Pack

Archive Hall
-> show tabs and output
-> default to Submission Pack, allow README / Pitch / Sprint / Fix List

Final Door
-> show reviewBtn, generateBtn, copyBtn, downloadBtn
-> show GitHub publish and Project Wall final checklist
```

State model:

```js
mode = "temple" | "classic";
activeSpace = "gate" | "evidence" | "score" | "oracle" | "archive" | "final";
```

The existing functions should remain the source of truth:

```text
runAgent()
enhanceWithLlm()
copyMarkdown()
downloadPack()
setActiveTab()
```

## Oracle LLM Requirements

Oracle LLM must be a first-level node. It must not be hidden behind a secondary menu.

Panel fields:

```text
Endpoint
Model
API key
Enhance Current Pack
```

Required explanatory copy:

```text
API key is used only in this browser session and is not committed to GitHub.
Compatible with OpenAI-style chat/completions.
```

中文说明：

```text
API key 仅在当前浏览器会话中使用，不写入仓库。
兼容 OpenAI-style chat/completions。
```

## Final Door Requirements

Final Door must be a real submission node, not a decorative endpoint.

It should expose:

```text
Run Review Agent
Generate Pack
Copy Markdown
Download Pack
GitHub repo path
GitHub Pages / public demo path
Project Wall payload validation
Epic Connector submission path
```

## Background Asset Requirements

Do not use the Bing Spotlight reference image as a final asset. It can be used only as style inspiration.

The final background should be original or properly licensed.

Suggested generation prompt:

```text
ancient marble submission temple, sunlit stone columns, open courtyard, cinematic depth, subtle greenery, no people, wide interface background, elegant product UI, readable dark overlay space
```

Composition requirements:

```text
central courtyard
left and right colonnades
space for six hotspots
right side not too busy, so a panel can sit on top
no people
no embedded text
not too dark
not too visually noisy
```

## Implementation Scope

First implementation should include:

```text
Temple / Classic toggle
six hotspot buttons
right-side active panel
light background pan / zoom
Oracle LLM as a visible first-level node
Final Door with final actions
mobile bottom navigation
README and ASSETS updates
desktop and mobile screenshots
```

First implementation should not include:

```text
Three.js
real 3D models
camera walkthrough
particle systems
pathfinding
rewritten scoring logic
rewritten LLM logic
rewritten submission scripts
```

## Accessibility Requirements

- Hotspots must be semantic `<button>` elements.
- Every hotspot needs an `aria-label`.
- Keyboard navigation must reach every space node.
- Active state must not rely on color alone.
- Text panels must maintain sufficient contrast over the background.
- Classic Mode must remain available for users who prefer a conventional tool layout.

## Acceptance Criteria

```text
1. Within 10 seconds, users understand this is LaunchLens, a submission copilot.
2. Within 2 clicks, users can open Oracle LLM.
3. Within 2 clicks, users can generate a Submission Pack.
4. Within 2 clicks, users can find Download Pack.
5. Within 2 clicks, users can find GitHub / Project Wall final submission guidance.
6. Desktop hotspots are clickable and readable.
7. Mobile users can complete the full workflow without background hotspots.
8. Existing scoring tests continue to pass.
9. README explains Temple Mode and the optional LLM API.
10. ASSETS lists the space interaction spec and any background asset.
```

## English Summary

Temple Mode should make LaunchLens feel like a spatial submission workflow, while Classic Mode preserves the current fast, reliable form-based tool. The first version should be 2.5D: original background, six workflow hotspots, right-side panels, Oracle LLM as a first-level node, Final Door as the submission node, and mobile bottom navigation. It should not introduce Three.js or rewrite the working submission logic.
