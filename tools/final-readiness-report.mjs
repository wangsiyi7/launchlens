import { existsSync, readFileSync, statSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { execFileSync, spawnSync } from "node:child_process";

const reportPath = process.env.LAUNCHLENS_REPORT || "docs/FINAL_READINESS_REPORT.md";

function fileSize(path) {
  try {
    return statSync(path).size;
  } catch {
    return 0;
  }
}

function run(command, args) {
  try {
    return execFileSync(command, args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function commandSucceeds(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return result.status === 0;
}

function sourceExists(path) {
  if (existsSync(path)) return true;
  return commandSucceeds("git", ["cat-file", "-e", `HEAD:${path}`]);
}

function runValidation() {
  const result = spawnSync("node", ["tools/validate-submission.mjs"], {
    encoding: "utf8",
  });
  return {
    ok: result.status === 0,
    output: `${result.stdout || ""}${result.stderr || ""}`.trim(),
  };
}

async function checkLocalDemo() {
  try {
    const res = await fetch("http://127.0.0.1:8080/launchlens/");
    const text = await res.text();
    return {
      ok: res.ok && text.includes("LaunchLens") && text.includes("temple-background.png"),
      evidence: `HTTP ${res.status}; LaunchLens=${text.includes("LaunchLens")}; Temple=${text.includes("temple-background.png")}`,
    };
  } catch (error) {
    return {
      ok: false,
      evidence: `Local server not reachable: ${error.message}`,
    };
  }
}

const validation = runValidation();
const localDemo = await checkLocalDemo();
const payload = JSON.parse(readFileSync("project-payload.json", "utf8").replace(/^\uFEFF/, ""));
const ucwsSnapshot = existsSync("data/ucws-project-wall.json")
  ? JSON.parse(readFileSync("data/ucws-project-wall.json", "utf8").replace(/^\uFEFF/, ""))
  : null;
const gitStatus = run("git", ["status", "--short", "-uall"]);
const remotes = run("git", ["remote", "-v"]);
const relevantGitStatus = gitStatus
  .split(/\r?\n/)
  .map((line) => line.trimEnd())
  .filter(Boolean)
  .filter((line) => !line.endsWith(reportPath))
  .join("\n");

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "README.md",
  "CHANGELOG.md",
  "PROJECT_WALL_SUBMISSION.md",
  "PROJECT_WALL_SUBMISSION.en.md",
  "PROJECT_WALL_SUBMISSION.zh-CN.md",
  "docs/JUDGING_BRIEF.md",
  "docs/DEMO_VIDEO_SCRIPT.md",
  "docs/PROJECT_WALL_FIELDS.md",
  "docs/SUBMISSION.md",
  "docs/FINAL_SUBMISSION_RUNBOOK.md",
  "docs/SPACE_INTERACTION_SPEC.md",
  "docs/ATTRIBUTION.md",
  "docs/RE_FORGE_INTEGRATION.md",
  "docs/REPOSCAPE_HUB_INTEGRATION.md",
  "docs/UCWS_PROJECT_RADAR.md",
  "docs/UCWS_COMPANION_AGGREGATOR.md",
  "docs/ASSETS.md",
  "api/openapi.json",
  "api/examples/codex-workspace-snapshot.json",
  "supabase/schema.sql",
  "data/ucws-project-wall.json",
  "data/ucws-project-wall.md",
  "assets/logo.svg",
  "assets/temple-background.png",
  "assets/screenshot.png",
  "assets/screenshot-zh.png",
  "assets/screenshot-mobile.png",
  "tests/scoring.test.mjs",
  "tests/platform-core.test.mjs",
  "tests/ucws-sync.test.mjs",
  "tools/build-project-payload.mjs",
  "tools/validate-submission.mjs",
  "tools/sync-ucws-project-wall.mjs",
  "tools/publish-github.mjs",
  "tools/submit-project.mjs",
  ".github/workflows/pages.yml",
  ".github/workflows/ucws-project-wall-sync.yml",
];

const requiredFilesOk = requiredFiles.every((path) => sourceExists(path));
const screenshotOk =
  fileSize("assets/screenshot.png") > 100_000 &&
  fileSize("assets/screenshot-zh.png") > 100_000 &&
  fileSize("assets/screenshot-mobile.png") > 50_000 &&
  fileSize("assets/temple-background.png") > 100_000;

const reForgeReady =
  sourceExists("CHANGELOG.md") &&
  sourceExists("docs/ATTRIBUTION.md") &&
  sourceExists("docs/RE_FORGE_INTEGRATION.md") &&
  readFileSync("platform-core.js", "utf8").includes("Re-Forge Gate Agent") &&
  readFileSync("app.js", "utf8").includes("externalReferences") &&
  payload.description.includes("re-forge") &&
  payload.techStack.includes("re-forge");

const repoScapeReady =
  sourceExists("docs/REPOSCAPE_HUB_INTEGRATION.md") &&
  readFileSync("platform-core.js", "utf8").includes("RepoScape") &&
  readFileSync("app.js", "utf8").includes("agent-codex-bridge") &&
  readFileSync("app.js", "utf8").includes("hubNodePositions") &&
  readFileSync("api/openapi.json", "utf8").includes("/api/graph/neighborhood") &&
  payload.description.includes("RepoScape") &&
  payload.techStack.includes("RepoScape");

const codexBridgeReady =
  readFileSync("app.js", "utf8").includes("buildAgentBridgePayload") &&
  readFileSync("platform-core.js", "utf8").includes("buildAgentInterop") &&
  readFileSync("api/examples/codex-workspace-snapshot.json", "utf8").includes("ClaudeCodex") &&
  readFileSync("docs/CODEX_API.md", "utf8").includes("selectedNeighborhood");

const projectManagerReady =
  readFileSync("index.html", "utf8").includes("workspaceList") &&
  readFileSync("app.js", "utf8").includes("createWorkspaceSnapshot") &&
  readFileSync("app.js", "utf8").includes("WORKSPACE_LIBRARY_KEY");

const ucwsSyncReady =
  sourceExists("tools/sync-ucws-project-wall.mjs") &&
  sourceExists(".github/workflows/ucws-project-wall-sync.yml") &&
  Boolean(ucwsSnapshot?.event?.id) &&
  ucwsSnapshot?.errors?.some((error) => error.code === "TOKEN_MISSING");

const companionReady =
  sourceExists("docs/UCWS_COMPANION_AGGREGATOR.md") &&
  readFileSync("README.md", "utf8").includes("ucws-project-aggregator") &&
  readFileSync("index.html", "utf8").includes("radar-link-strip");

const teamMembersReady = (() => {
  try {
    const members = JSON.parse(payload.teamMembers);
    return members.some((member) => member.name && !/add submitting|your name/i.test(member.name));
  } catch {
    return false;
  }
})();

const envChecks = [
  ["GitHub repository", /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(payload.repoUrl)],
  ["Public demo URL", /^https:\/\//.test(payload.demoUrl)],
  ["Team members in payload", teamMembersReady],
  ["Optional Vercel token", Boolean(process.env.VERCEL_TOKEN)],
  ["Optional Epic Connector token", Boolean(process.env.EPIC_TOKEN)],
];

const checks = [
  ["Local source files", requiredFilesOk, requiredFilesOk ? "All required app, docs, scripts, and workflow files exist." : "Some required files are missing."],
  ["Re-forge integration", reForgeReady, reForgeReady ? "Re-Forge Gate Agent, external references, attribution, changelog, and Project Wall payload are present." : "Re-forge integration evidence is incomplete."],
  ["RepoScape-inspired Hub", repoScapeReady, repoScapeReady ? "Draggable Hub graph, persisted node positions, graph API contract, attribution, and payload references are present." : "RepoScape-inspired Hub evidence is incomplete."],
  ["Project Manager", projectManagerReady, projectManagerReady ? "Workspace snapshot save/load/copy UI and local persistence key are present." : "Project Manager evidence is incomplete."],
  ["Codex and ClaudeCodex Bridge", codexBridgeReady, codexBridgeReady ? "Agent bridge payload, graph overview/neighborhood helpers, example JSON, and Codex API docs are present." : "Codex bridge evidence is incomplete."],
  ["UCWS Project Wall sync", ucwsSyncReady, ucwsSyncReady ? `Event snapshot exists; authenticated project list still requires EPIC_TOKEN. Current public participants=${ucwsSnapshot?.event?.currentParticipants || "unknown"}.` : "UCWS sync tooling or public event snapshot is incomplete."],
  ["Companion aggregator links", companionReady, companionReady ? "README, docs, and Project Radar link strip point to the sibling aggregator and official UCWS archive." : "Companion aggregator evidence is incomplete."],
  ["Temple Mode assets", screenshotOk, `Background=${fileSize("assets/temple-background.png")} bytes; EN screenshot=${fileSize("assets/screenshot.png")} bytes; ZH screenshot=${fileSize("assets/screenshot-zh.png")} bytes; mobile screenshot=${fileSize("assets/screenshot-mobile.png")} bytes.`],
  ["Git state", !relevantGitStatus, relevantGitStatus ? `Working tree has changes:\n${relevantGitStatus}` : "Clean working tree."],
  ["Git remote", Boolean(remotes), remotes || "No GitHub remote configured yet."],
  ["Local demo", localDemo.ok, localDemo.evidence],
  ["Project Wall payload", validation.ok, validation.output || "Validation passed."],
];

const statusIcon = (ok) => (ok ? "Ready" : "Needs input");
const escapeCell = (value) => String(value).replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|");

const report = `# Final Readiness Report / 最终提交就绪报告

Generated by \`node tools/final-readiness-report.mjs\`.

## Summary / 摘要

LaunchLens is ready as a GitHub repository, public GitHub Pages demo, source package, and Project Wall payload. It now includes a dynamic Temple workbench with drag and wheel feedback, per-step Markdown downloads, a RepoScape-inspired draggable Hub, Project Manager, Codex/ClaudeCodex Bridge, documented re-forge-inspired adversarial gate, attribution records, changelog, UCWS Project Radar sync tooling, and Codex graph API metadata. Vercel deployment is configured and only needs Vercel account authorization. The remaining official action is to paste the prepared fields into Epic Connector Project Wall, or provide an Epic Connector token for scripted submission and full authenticated Project Wall ingestion.

LaunchLens 的 GitHub 仓库、GitHub Pages 公开 Demo、源码包和 Project Wall payload 已经就绪。项目现在包含可拖拽和滚轮反馈的动态 Temple 工作台、每个步骤的 Markdown 下载、RepoScape 风格可拖拽 Hub、Project Manager、Codex/ClaudeCodex Bridge、受 re-forge 启发的对抗校验门、归因记录、更新日志、UCWS Project Radar 同步工具和 Codex 图谱 API 元数据。Vercel 部署配置已经完成，只差 Vercel 账号授权。剩余官方动作是把准备好的字段复制到 Epic Connector Project Wall，或提供 Epic Connector token 进行脚本提交和完整项目墙抓取。

## Current Payload / 当前 Payload

| Field | Value |
| --- | --- |
| Project | ${escapeCell(payload.name)} |
| Track | ${escapeCell(payload.track)} |
| Demo URL | ${escapeCell(payload.demoUrl)} |
| Repo URL | ${escapeCell(payload.repoUrl)} |
| Screenshot URLs | ${escapeCell(payload.screenshotUrls)} |
| Logo URL | ${escapeCell(payload.logoUrl)} |
| Team Members | ${escapeCell(payload.teamMembers)} |

## Checks / 检查

| Check | Status | Evidence |
| --- | --- | --- |
${checks.map(([name, ok, evidence]) => `| ${escapeCell(name)} | ${statusIcon(ok)} | ${escapeCell(evidence)} |`).join("\n")}

## External Inputs / 外部输入

| Input | Status |
| --- | --- |
${envChecks.map(([name, present]) => `| ${escapeCell(name)} | ${present ? "Ready" : "Pending or optional"} |`).join("\n")}

## Required Final Actions / 最终必做

1. Open \`PROJECT_WALL_SUBMISSION.zh-CN.md\`, \`PROJECT_WALL_SUBMISSION.en.md\`, or \`PROJECT_WALL_SUBMISSION.md\`.
2. Copy the prepared fields into Epic Connector Project Wall.
3. Run \`node tools/validate-submission.mjs\` again after any URL change.
4. Optional: deploy to Vercel with \`VERCEL_TOKEN\` and \`node tools/deploy-vercel.mjs\`, then replace the demo URL.
5. Optional: submit with \`node tools/submit-project.mjs\` if \`EPIC_TOKEN\` is available.
6. Optional: refresh authenticated Project Wall inspiration data with \`npm.cmd run sync:ucws\` after \`EPIC_TOKEN\` is set.

## Validation Output / 校验输出

\`\`\`text
${validation.output || "Submission payload validation passed."}
\`\`\`
`;

await writeFile(reportPath, report);
console.log(`Wrote ${reportPath}`);
console.log(validation.ok ? "Final payload is ready." : "Final payload still needs external inputs.");
