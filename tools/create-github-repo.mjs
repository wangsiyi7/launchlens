const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const repoName = process.env.GITHUB_REPO || process.argv[2] || "launchlens";
const description =
  process.env.GITHUB_DESCRIPTION ||
  "LaunchLens: UCWS Project Wall readiness copilot for hackathon teams.";
const isPrivate = /^(1|true|yes)$/i.test(process.env.GITHUB_PRIVATE || "");

if (!token) {
  console.error("Missing GITHUB_TOKEN or GH_TOKEN.");
  console.error("Create a GitHub personal access token with repo permissions, then run:");
  console.error("  $env:GITHUB_TOKEN='...'; node tools/create-github-repo.mjs launchlens");
  process.exit(1);
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

const userResponse = await github("/user");
if (!userResponse.res.ok) {
  console.error("Could not authenticate with GitHub.");
  console.error(JSON.stringify(userResponse.json, null, 2));
  process.exit(1);
}

const owner = process.env.GITHUB_OWNER || userResponse.json.login;
const check = await github(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}`);

if (check.res.ok) {
  console.log("Repository already exists.");
  console.log(check.json.html_url);
  process.exit(0);
}

const create = await github("/user/repos", {
  method: "POST",
  body: JSON.stringify({
    name: repoName,
    description,
    private: isPrivate,
    has_issues: true,
    has_projects: false,
    has_wiki: false,
    auto_init: false,
  }),
});

if (!create.res.ok) {
  console.error("Could not create GitHub repository.");
  console.error(JSON.stringify(create.json, null, 2));
  process.exit(1);
}

console.log("Repository created.");
console.log(create.json.html_url);
