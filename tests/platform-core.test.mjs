import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Core = require("../platform-core.js");

const ideaA = Core.createIdea({
  id: "idea-a",
  title: "Supabase workspace sync",
  summary: "Persist team snapshots for collaboration.",
  tags: "backend, api, sync",
});

const ideaB = Core.createIdea({
  id: "idea-b",
  title: "Codex API export",
  summary: "Expose project context as structured JSON.",
  tags: "api, codex",
  parentId: "idea-a",
  relatedIds: "idea-a",
});

assert.equal(ideaA.title, "Supabase workspace sync");
assert.deepEqual(ideaA.tags, ["backend", "api", "sync"]);

const graph = Core.buildIdeaGraph([ideaA, ideaB]);
assert.equal(graph.nodes.length, 2);
assert.ok(graph.edges.some((edge) => edge.from === "idea-a" && edge.to === "idea-b"));

const agentResult = Core.buildAgentResult({
  agentId: "risk",
  language: "en",
  project: { name: "LaunchLens" },
  analysis: {
    overall: 64,
    has: { demo: false, repo: true, screenshot: false, logo: true, team: true, notes: false },
  },
  ideas: [ideaA, ideaB],
});

assert.equal(agentResult.agentId, "risk");
assert.ok(agentResult.summary.includes("risk"));
assert.ok(agentResult.checklist.length >= 3);
assert.deepEqual(agentResult.linkedIdeas, ["Supabase workspace sync", "Codex API export"]);

const forgeAgent = Core.buildAgentResult({
  agentId: "forge",
  language: "en",
  project: { name: "LaunchLens" },
  analysis: { overall: 80, has: {} },
  ideas: [ideaA, ideaB],
});

assert.equal(forgeAgent.agentId, "forge");
assert.ok(forgeAgent.title.includes("Re-Forge"));
assert.ok(forgeAgent.checklist.some((item) => item.includes("CHANGELOG")));

const tools = Core.toolRecommendations("en");
const reForgeTool = tools.find((tool) => tool.name === "re-forge");
assert.equal(reForgeTool?.url, "https://github.com/Akasxh/re-forge");

const references = Core.externalReferences("en");
assert.equal(references[0].license, "MIT");
assert.ok(references[0].use.includes("does not copy source code"));
assert.equal(references[1].name, "RepoScape");
assert.ok(references[1].use.includes("overview/neighborhood"));

const snapshot = Core.buildWorkspaceSnapshot({
  project: { name: "LaunchLens" },
  platform: { ideas: [ideaA, ideaB] },
  analysis: { overall: 72 },
  externalReferences: references,
});

assert.equal(snapshot.schemaVersion, Core.schemaVersion);
assert.equal(snapshot.project.name, "LaunchLens");
assert.equal(snapshot.externalReferences[0].name, "re-forge");

const hubGraph = {
  nodes: [
    { id: "project", type: "project", title: "LaunchLens" },
    { id: "idea-a", type: "idea", title: "Supabase sync" },
    { id: "agent-codex", type: "agent", title: "Codex Bridge" },
  ],
  edges: [
    { from: "project", to: "idea-a", type: "cognitive", relation: "parent" },
    { from: "agent-codex", to: "idea-a", type: "bridge", relation: "reads graph" },
  ],
};

const overview = Core.buildGraphOverview(hubGraph);
assert.equal(overview.nodeCount, 3);
assert.equal(overview.edgeTypes.bridge, 1);
assert.equal(overview.hubs[0].id, "idea-a");

const neighborhood = Core.buildGraphNeighborhood(hubGraph, "idea-a", 1, 4);
assert.equal(neighborhood.root, "idea-a");
assert.equal(neighborhood.nodes.length, 3);
assert.ok(neighborhood.edges.some((edge) => edge.relation === "reads graph"));

const interop = Core.buildAgentInterop({
  language: "en",
  project: { name: "LaunchLens" },
  graph: hubGraph,
  selectedNodeId: "idea-a",
});
assert.ok(interop.supportedAgents.includes("ClaudeCodex"));
assert.equal(interop.selectedNeighborhood.root, "idea-a");

const requests = Core.buildSupabaseRequests(
  {
    url: "https://example.supabase.co/",
    anonKey: "anon-test-key",
    table: "launchlens_workspace",
    workspaceKey: "ucws-team",
  },
  snapshot,
);

assert.equal(requests.upsert.options.method, "POST");
assert.equal(requests.upsert.options.headers.Prefer, "resolution=merge-duplicates,return=representation");
assert.ok(requests.upsert.url.includes("on_conflict=workspace_key"));
assert.ok(requests.select.url.includes("workspace_key=eq.ucws-team"));

assert.throws(() => Core.buildSupabaseRequests({ url: "", anonKey: "" }, snapshot));

console.log("platform core tests passed");
