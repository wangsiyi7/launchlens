# Supabase Backend

LaunchLens remains usable as a static browser app. Supabase is optional and adds a shared workspace snapshot for teams that want cross-device collaboration.

## What It Stores

- Project submission fields
- Readiness analysis
- Generated submission materials
- Idea archive and star-map relationships
- Agent run history
- Repo scan result

No service-role key is required or accepted in the UI. Use a Supabase project URL and anon key only.

## Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run [`supabase/schema.sql`](../supabase/schema.sql).
4. Open LaunchLens in Classic mode.
5. Fill in:
   - Supabase URL
   - Supabase anon key
   - Table: `launchlens_workspace`
   - Workspace key: a team-owned string such as `ucws-team-launchlens`
6. Click `Save Snapshot`.

## Security Note

The included SQL uses demo-friendly anon policies so a hackathon team can test quickly. Do not store secrets, private customer data, paid API keys, or confidential judging material in this table.

For production, replace the public policies with authenticated user/team policies and keep service-role keys server-side only.

## API Shape

The browser uses Supabase REST endpoints:

- `POST /rest/v1/launchlens_workspace?on_conflict=workspace_key`
- `GET /rest/v1/launchlens_workspace?workspace_key=eq.<workspace-key>&select=workspace_key,payload,updated_at&limit=1`

The payload follows the Codex workspace snapshot format documented in [`docs/CODEX_API.md`](CODEX_API.md).
