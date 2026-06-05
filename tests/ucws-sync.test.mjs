import assert from "node:assert/strict";
import { classifyProject, normalizeProject, parseProjectLinks, readinessSignals } from "../tools/sync-ucws-project-wall.mjs";

const rawProject = {
  id: "project-123",
  name: "JudgeFlow Agent",
  tagline: "An AI agent that turns hackathon judging into a searchable review workspace.",
  description: "Judges can compare demos, repositories, and evidence without opening every tab manually.",
  track: "Agent, Application",
  techStack: "JavaScript, GitHub API, OpenAI-compatible API",
  demoUrl: "https://example.com/demo",
  repoUrl: "https://github.com/example/judgeflow",
  screenshotUrls: JSON.stringify(["/uploads/screenshot.png"]),
  teamMembers: JSON.stringify([
    {
      name: "Alex",
      role: "Builder",
      links: {
        github: "https://github.com/example",
      },
    },
  ]),
  voteCount: 9,
  judgeVoteCount: 2,
  hackerVoteCount: 7,
  commentCount: 3,
  githubStars: 42,
};

const categories = classifyProject(rawProject);
assert.ok(categories.includes("Agent"));
assert.ok(categories.includes("Application"));
assert.ok(categories.includes("Developer Tool"));

const links = parseProjectLinks(rawProject);
assert.equal(links.repoUrl, "https://github.com/example/judgeflow");
assert.deepEqual(links.screenshotUrls, ["/uploads/screenshot.png"]);
assert.deepEqual(links.teamLinks, ["https://github.com/example"]);

const normalized = normalizeProject(rawProject, {
  baseUrl: "https://evol.epicconnector.ai",
  eventSlug: "ucws-singapore-hackathon---2026-cxgy",
});

assert.equal(normalized.id, "project-123");
assert.equal(normalized.projectApiPath, "/api/projects/project-123");
assert.equal(
  normalized.projectUrl,
  "https://evol.epicconnector.ai/events/ucws-singapore-hackathon---2026-cxgy/project-wall?projectId=project-123",
);
assert.equal(normalized.links.screenshotUrls[0], "https://evol.epicconnector.ai/uploads/screenshot.png");
assert.ok(normalized.searchText.includes("judgeflow"));

const signals = readinessSignals(rawProject);
assert.equal(signals.hasRepo, true);
assert.equal(signals.hasDemo, true);
assert.equal(signals.hasScreenshots, true);
assert.equal(signals.githubStars, 42);
assert.ok(signals.completenessScore >= 75);

console.log("ucws sync tests passed");
