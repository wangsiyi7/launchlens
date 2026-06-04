import assert from "node:assert/strict";

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function parseGithubRepoUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname.replace(/^\/|\/$/g, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/i, "") };
  } catch {
    return null;
  }
}

function listFromCsv(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function analyzeEvidence(project) {
  return {
    demo: isHttpsUrl(project.demoUrl),
    repo: Boolean(parseGithubRepoUrl(project.repoUrl)),
    screenshot: listFromCsv(project.screenshotUrls).some(isHttpsUrl),
    logo: isHttpsUrl(project.logoUrl),
    video: !project.demoVideoUrl || isHttpsUrl(project.demoVideoUrl),
    file: !project.demoFileUrl || isHttpsUrl(project.demoFileUrl),
  };
}

assert.deepEqual(parseGithubRepoUrl("https://github.com/wangsiyi7/launchlens.git"), {
  owner: "wangsiyi7",
  repo: "launchlens",
});
assert.equal(parseGithubRepoUrl("http://github.com/wangsiyi7/launchlens"), null);
assert.equal(parseGithubRepoUrl("https://example.com/wangsiyi7/launchlens"), null);

const weakEvidence = analyzeEvidence({
  demoUrl: "http://demo.example.com",
  repoUrl: "https://github.com/wangsiyi7/launchlens",
  screenshotUrls: "not-a-url",
  logoUrl: "",
  demoVideoUrl: "",
  demoFileUrl: "ftp://example.com/file.zip",
});

assert.equal(weakEvidence.demo, false);
assert.equal(weakEvidence.repo, true);
assert.equal(weakEvidence.screenshot, false);
assert.equal(weakEvidence.logo, false);
assert.equal(weakEvidence.video, true);
assert.equal(weakEvidence.file, false);

const strongEvidence = analyzeEvidence({
  demoUrl: "https://wangsiyi7.github.io/launchlens/",
  repoUrl: "https://github.com/wangsiyi7/launchlens",
  screenshotUrls: "https://example.com/a.png, https://example.com/b.jpg",
  logoUrl: "https://example.com/logo.svg",
  demoVideoUrl: "https://youtu.be/example",
  demoFileUrl: "",
});

assert.equal(strongEvidence.demo, true);
assert.equal(strongEvidence.repo, true);
assert.equal(strongEvidence.screenshot, true);
assert.equal(strongEvidence.logo, true);
assert.equal(strongEvidence.video, true);
assert.equal(strongEvidence.file, true);

console.log("evidence gate tests passed");
