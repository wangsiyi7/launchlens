import { execFileSync } from "node:child_process";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repoName = process.env.GITHUB_REPO || process.argv[2] || "launchlens";
const isPrivate = /^(1|true|yes)$/i.test(process.env.GITHUB_PRIVATE || "");

if (!token) {
  console.error("Missing GITHUB_TOKEN or GH_TOKEN.");
  console.error("Example:");
  console.error("  $env:GITHUB_TOKEN='...'; node tools/publish-github.mjs launchlens");
  process.exit(1);
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    stdio: options.capture ? "pipe" : "inherit",
    encoding: "utf8",
    env: { ...process.env, ...(options.env || {}) },
  });
}

async function github(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  return { res, json };
}

const user = await github("/user");
if (!user.res.ok) {
  console.error("Could not authenticate with GitHub.");
  console.error(JSON.stringify(user.json, null, 2));
  process.exit(1);
}

const owner = process.env.GITHUB_OWNER || user.json.login;
const repoPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}`;
const existing = await github(repoPath);

if (!existing.res.ok) {
  const created = await github("/user/repos", {
    method: "POST",
    body: JSON.stringify({
      name: repoName,
      description: "LaunchLens: UCWS Project Wall readiness copilot for hackathon teams.",
      private: isPrivate,
      has_issues: true,
      has_projects: false,
      has_wiki: false,
      auto_init: false,
    }),
  });

  if (!created.res.ok) {
    console.error("Could not create GitHub repository.");
    console.error(JSON.stringify(created.json, null, 2));
    process.exit(1);
  }
}

const repoUrl = `https://github.com/${owner}/${repoName}`;
const remoteUrl = `${repoUrl}.git`;
const pagesUrl = `https://${owner}.github.io/${repoName}/`;

run("node", ["tools/build-project-payload.mjs"], {
  env: {
    LAUNCHLENS_DEMO_URL: pagesUrl,
    LAUNCHLENS_REPO_URL: repoUrl,
  },
});

const payloadStatus = run("git", ["status", "--short", "--", "project-payload.json"], { capture: true }).trim();
if (payloadStatus) {
  run("git", ["add", "project-payload.json"]);
  run("git", ["commit", "-m", "Update GitHub submission payload"]);
}

const remotes = run("git", ["remote"], { capture: true })
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (remotes.includes("origin")) {
  run("git", ["remote", "set-url", "origin", remoteUrl]);
} else {
  run("git", ["remote", "add", "origin", remoteUrl]);
}

run("git", ["branch", "-M", "main"]);

const basic = Buffer.from(`x-access-token:${token}`).toString("base64");
run("git", ["push", "-u", "origin", "main"], {
  env: {
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
    GIT_CONFIG_VALUE_0: `Authorization: Basic ${basic}`,
  },
});

console.log("LaunchLens pushed to GitHub.");
console.log(`Repo URL: ${repoUrl}`);
console.log(`Likely GitHub Pages URL: ${pagesUrl}`);
console.log("Enable Settings -> Pages -> Build and deployment -> Source: GitHub Actions if it is not already enabled.");
