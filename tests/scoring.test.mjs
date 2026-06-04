import assert from "node:assert/strict";

function countHits(text, terms) {
  const source = text.toLowerCase();
  return terms.reduce((count, term) => count + (source.includes(term) ? 1 : 0), 0);
}

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function analyze(project) {
  const combined = [
    project.name,
    project.tagline,
    project.audience,
    project.problem,
    project.solution,
    project.techStack,
    project.notes,
  ]
    .join(" ")
    .toLowerCase();

  const has = {
    name: project.name.length >= 3,
    tagline: project.tagline.length >= 24,
    audience: project.audience.length >= 10,
    problem: project.problem.length >= 40,
    solution: project.solution.length >= 60,
    demo: /^https?:\/\//i.test(project.demoUrl),
    repo: /^https?:\/\/(www\.)?github\.com\//i.test(project.repoUrl),
    stack: project.techStack.split(",").filter(Boolean).length >= 3,
    screenshot: project.screenshotUrls.length > 8,
    team: project.teamMembers.length > 4,
    notes: project.notes.length >= 280,
  };

  const community = clampScore(
    (has.name ? 10 : 0) +
      (has.tagline ? 18 : 0) +
      (has.problem ? 16 : 0) +
      (has.solution ? 16 : 0) +
      (has.demo ? 12 : 0) +
      (has.screenshot ? 10 : 0) +
      Math.min(18, countHits(combined, ["user", "community", "global", "share"]) * 3),
  );

  return { community, has };
}

const empty = analyze({
  name: "",
  tagline: "",
  audience: "",
  problem: "",
  solution: "",
  demoUrl: "",
  repoUrl: "",
  techStack: "",
  screenshotUrls: "",
  teamMembers: "",
  notes: "",
});

assert.equal(empty.community, 0);
assert.equal(empty.has.demo, false);

const strong = analyze({
  name: "LaunchLens",
  tagline: "Turn rough hackathon ideas into ready-to-submit Project Wall packages.",
  audience: "global hackathon teams and community reviewers",
  problem: "Builders need a clear user-facing submission under deadline pressure.",
  solution:
    "The app creates a structured review and export workflow so teams can share a demo, repo, screenshot, and product narrative.",
  demoUrl: "https://example.com",
  repoUrl: "https://github.com/example/launchlens",
  techStack: "HTML, CSS, JavaScript",
  screenshotUrls: "https://example.com/screenshot.png",
  teamMembers: "Alex - builder",
  notes:
    "This product helps users and community reviewers understand value. It supports a global hackathon workflow and makes the work easy to share.",
});

assert.equal(strong.has.demo, true);
assert.equal(strong.has.repo, true);
assert.ok(strong.community >= 80);

console.log("scoring tests passed");
