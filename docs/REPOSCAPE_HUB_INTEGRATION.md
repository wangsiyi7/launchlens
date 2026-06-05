# RepoScape-Inspired Hub Integration

LaunchLens references [`ThomasLix7/RepoScape`](https://github.com/ThomasLix7/RepoScape) as a product and interaction model for the Hackathon Hub.

## Why It Matters

RepoScape treats a project as a living graph instead of a flat list. That pattern fits LaunchLens because hackathon teams need to preserve how ideas, evidence, tools, agents, risks, and delivery steps relate to one another. A submit-ready project is not only a set of form fields; it is a network of decisions that future collaborators and agents need to inspect quickly.

## What LaunchLens Adopts

- An all-node HUD where the graph is the primary view, not a decorative background.
- Direct relationship inspection so every selected node explains its immediate neighbors.
- Draggable node positions and persistent viewport state for long-running workspace use.
- Distinct edge intent: `physical`, `cognitive`, `suspicious`, and `bridge`.
- Token-frugal agent context through `graphOverview` and `selectedNeighborhood`.
- Agent interoperability with Codex, Claude Code, ClaudeCodex, and RepoScape-compatible graph consumers.

## What LaunchLens Does Not Do

- It does not copy RepoScape source code, prompts, assets, daemon code, parser code, React components, or Skill files.
- It does not require RepoScape to run.
- It does not claim to parse source-code dependency graphs. LaunchLens graphs hackathon project intent, evidence, tools, and agent outputs.

## Product Placement

- `/?mode=hub`: draggable Canvas star map with search, filters, relationship inspection, and persisted node coordinates.
- Platform Console: Project Manager stores local workspace snapshots.
- Platform Console: Codex Bridge exports graph context and ready-to-paste commands.
- `api/openapi.json`: documents `graph/overview`, `graph/neighborhood`, and `agent/bridge` contract shapes.
- `api/examples/codex-workspace-snapshot.json`: sample graph and interop payload.

## Future Server Path

The current implementation is still static-first. To make the bridge fully service-backed, implement the OpenAPI contract behind:

```http
GET /api/graph/overview
GET /api/graph/neighborhood?node=<node-id>&depth=1
GET /api/agent/bridge
POST /rest/v1/launchlens_workspace?on_conflict=workspace_key
```

The static app already exports the same data shape through Copy Codex API JSON, Copy Graph Context, and optional Supabase snapshot sync.

## Source And License

- Repository: https://github.com/ThomasLix7/RepoScape
- License: MIT
- License file: https://github.com/ThomasLix7/RepoScape/blob/main/LICENSE
