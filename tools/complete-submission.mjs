import { execFileSync } from "node:child_process";

const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const epicToken = process.env.EPIC_TOKEN;
const repoName = process.env.GITHUB_REPO || process.argv[2] || "launchlens";

if (!githubToken) {
  console.error("Missing GITHUB_TOKEN or GH_TOKEN.");
  console.error("This script publishes LaunchLens to GitHub before submitting to the Project Wall.");
  process.exit(1);
}

if (!epicToken) {
  console.error("Missing EPIC_TOKEN.");
  console.error("This script submits to the Epic Connector Project Wall after GitHub publish succeeds.");
  process.exit(1);
}

function run(args) {
  execFileSync("node", args, {
    stdio: "inherit",
    env: process.env,
  });
}

run(["tools/publish-github.mjs", repoName]);
run(["tools/validate-submission.mjs"]);
run(["tools/submit-project.mjs"]);
