# Codex API Contract

LaunchLens now exposes a machine-readable workspace format so Codex can understand the project as a structured operating context, not only as UI text.

## Use Cases

- Give Codex the current project, readiness score, generated materials, and idea graph before development.
- Let Codex understand why features exist by reading `ideas`, `parentId`, and `relatedIds`.
- Let Codex or Claude Code inspect the Hub through `graphOverview` and `selectedNeighborhood` before broad edits.
- Persist Codex-generated implementation notes back into the idea archive.
- Sync a team workspace through Supabase without adding a custom backend.

## In-App Export

Open `Classic` mode and use `Copy Codex API JSON`. The copied payload contains:

- `project`: Project Wall fields
- `analysis`: readiness score, field audit, and fixes
- `platform.ideas`: linked hackathon ideas
- `platform.agentRuns`: strategy, evidence, build, demo, tool, and risk agent outputs
- `generated`: Markdown materials
- `repoScan`: public GitHub evidence scan
- `graph`: Hub nodes and edges, including persisted coordinates and relation labels
- `interop`: supported agents, graph API routes, prompts, graph overview, and selected-node neighborhood
- `externalReferences`: third-party methodology or source references, currently including `re-forge` and `RepoScape`

## Static Contract

- OpenAPI contract: [`api/openapi.json`](../api/openapi.json)
- Example payload: [`api/examples/codex-workspace-snapshot.json`](../api/examples/codex-workspace-snapshot.json)

## Graph And Agent Bridge

LaunchLens follows a RepoScape-style topology-first pattern for agent context:

- `graphOverview`: compact project-wide counts, edge types, and high-degree hub nodes.
- `selectedNeighborhood`: token-budgeted nodes and edges around the current Hub selection.
- `Copy Graph Context`: copies the full `launchlens.agent.bridge` payload.
- `Copy Codex Command`: copies a Codex-ready instruction plus bridge JSON.
- `Copy Claude Code Command`: copies a Claude Code / ClaudeCodex-ready instruction plus bridge JSON.

Static LaunchLens exposes these through browser copy actions. A service-backed version should implement the same shapes at:

```http
GET /api/graph/overview
GET /api/graph/neighborhood?node=<node-id>&depth=1
GET /api/agent/bridge
```

## Supabase Integration

LaunchLens can save the same snapshot to Supabase:

```http
POST /rest/v1/launchlens_workspace?on_conflict=workspace_key
Prefer: resolution=merge-duplicates,return=representation
```

Codex or another tool can load:

```http
GET /rest/v1/launchlens_workspace?workspace_key=eq.<workspace-key>&select=workspace_key,payload,updated_at&limit=1
```

Use the anon key only for public/demo workspaces. For production, use Supabase Auth and stricter row-level-security policies.

## Recommended Codex Flow

1. Read the snapshot.
2. Inspect `interop.graphOverview` before changing code.
3. Inspect `interop.selectedNeighborhood` around the selected Hub node.
4. Read `platform.ideas` and `platform.agentRuns` for product intent.
5. Make a scoped implementation change.
6. Run the re-forge-inspired gate for major upgrades: challenge assumptions, verify evidence, and update `CHANGELOG.md`.
7. Add a new idea or agent run summarizing the decision.
8. Save the updated snapshot back to Supabase or copy the JSON into the project notes.
