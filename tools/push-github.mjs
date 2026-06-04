import { execFileSync } from "node:child_process";

const remoteUrl = process.env.GITHUB_REMOTE || process.argv[2];

if (!remoteUrl) {
  console.error("Missing GitHub remote URL.");
  console.error("Usage:");
  console.error("  node tools/push-github.mjs https://github.com/YOUR_ACCOUNT/launchlens.git");
  console.error("or:");
  console.error("  $env:GITHUB_REMOTE='https://github.com/YOUR_ACCOUNT/launchlens.git'; node tools/push-github.mjs");
  process.exit(1);
}

function git(args, options = {}) {
  return execFileSync("git", args, {
    stdio: options.capture ? "pipe" : "inherit",
    encoding: "utf8",
  });
}

const remotes = git(["remote"], { capture: true })
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (remotes.includes("origin")) {
  git(["remote", "set-url", "origin", remoteUrl]);
} else {
  git(["remote", "add", "origin", remoteUrl]);
}

git(["branch", "-M", "main"]);
git(["push", "-u", "origin", "main"]);

console.log("Pushed LaunchLens to GitHub.");
console.log(`Repo URL: ${remoteUrl.replace(/\.git$/, "")}`);
console.log("If GitHub Pages is enabled for Actions, the demo URL will appear in the Pages deployment.");
