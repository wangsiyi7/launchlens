import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const token = process.env.VERCEL_TOKEN;
const resultPath = process.env.VERCEL_RESULT_PATH || "vercel-deploy-result.json";

if (!token) {
  console.error("Missing VERCEL_TOKEN.");
  console.error("Create a token at https://vercel.com/account/settings/tokens, then run:");
  console.error("  $env:VERCEL_TOKEN='...'; node tools/deploy-vercel.mjs");
  process.exit(1);
}

function run(command, args) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
}

let output = "";
try {
  output = run("npx.cmd", [
    "--yes",
    "vercel@latest",
    "deploy",
    ".",
    "--prod",
    "--yes",
    "--token",
    token,
  ]);
} catch (error) {
  const stdout = error.stdout?.toString() || "";
  const stderr = error.stderr?.toString() || "";
  console.error(`${stdout}${stderr}`.trim());
  process.exit(error.status || 1);
}

const urls = output.match(/https:\/\/[^\s]+/g) || [];
const deploymentUrl = urls.find((url) => !url.includes("vercel.com/docs")) || urls[0] || "";

if (!deploymentUrl) {
  console.error("Could not parse Vercel deployment URL.");
  console.error(output);
  process.exit(1);
}

const result = {
  deploymentUrl,
  output: output.trim(),
  deployedAt: new Date().toISOString(),
};

writeFileSync(resultPath, JSON.stringify(result, null, 2));
console.log(`Vercel deployment URL: ${deploymentUrl}`);
console.log(`Wrote ${resultPath}`);
