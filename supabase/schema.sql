-- LaunchLens optional Supabase workspace backend.
-- Run this in the Supabase SQL editor for a hackathon/demo workspace.
-- For production, replace the demo policies with authenticated team policies.

create table if not exists public.launchlens_workspace (
  workspace_key text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.launchlens_workspace enable row level security;

-- Demo policy: public anon clients can read and upsert snapshots by workspace_key.
-- Use this only for non-sensitive hackathon workspaces.
create policy "launchlens_demo_select"
on public.launchlens_workspace
for select
using (true);

create policy "launchlens_demo_insert"
on public.launchlens_workspace
for insert
with check (true);

create policy "launchlens_demo_update"
on public.launchlens_workspace
for update
using (true)
with check (true);

create index if not exists launchlens_workspace_updated_at_idx
on public.launchlens_workspace (updated_at desc);
