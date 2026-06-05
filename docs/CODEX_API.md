# Codex API Contract

LaunchLens now exposes a machine-readable workspace format so Codex can understand the project as a structured operating context, not only as UI text.

## Use Cases

- Give Codex the current project, readiness score, generated materials, and idea graph before development.
- Let Codex understand why features exist by reading `ideas`, `parentId`, and `relatedIds`.
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
- `externalReferences`: third-party methodology or source references, currently including `re-forge`

## Static Contract

- OpenAPI contract: [`api/openapi.json`](../api/openapi.json)
- Example payload: [`api/examples/codex-workspace-snapshot.json`](../api/examples/codex-workspace-snapshot.json)

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
2. Inspect `platform.ideas` and `platform.agentRuns` before changing code.
3. Make a scoped implementation change.
4. Run the re-forge-inspired gate for major upgrades: challenge assumptions, verify evidence, and update `CHANGELOG.md`.
5. Add a new idea or agent run summarizing the decision.
6. Save the updated snapshot back to Supabase or copy the JSON into the project notes.
