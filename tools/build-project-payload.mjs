import { writeFile } from "node:fs/promises";

const demoUrl = process.env.LAUNCHLENS_DEMO_URL || "https://your-demo-url.example.com";
const repoUrl = process.env.LAUNCHLENS_REPO_URL || "https://github.com/YOUR_ACCOUNT/launchlens";
const screenshotUrl =
  process.env.LAUNCHLENS_SCREENSHOT_URL || `${demoUrl.replace(/\/$/, "")}/assets/screenshot.png`;
const logoUrl = process.env.LAUNCHLENS_LOGO_URL || `${demoUrl.replace(/\/$/, "")}/assets/logo.svg`;
const teamMembers = process.env.LAUNCHLENS_TEAM_MEMBERS || "Add submitting team members";

const payload = {
  name: "LaunchLens",
  track: "Application",
  tagline: "Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces.",
  description:
    "LaunchLens is a browser-based hackathon collaboration hub for teams, solo builders, community reviewers, and demo-day organizers. Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.\n\nLaunchLens turns that final handoff into an operating workspace. Teams can enter Project Wall fields, build a RepoScape-inspired idea star map, run focused project agents, archive relationships between ideas, audit required evidence, scan public GitHub repository signals, score readiness across Community Vote, AI Evaluation, and Expert Judges, and generate copy-ready submission materials.\n\nThe current version includes Hackathon Hub, a full-screen star-map view; Temple Mode, a 2.5D spatial workflow; Platform Console, a guided operating view; local strategy/evidence/build/demo/tool/risk agents; linked idea archive; Codex API JSON export; optional Supabase workspace sync; bilingual UX; and optional OpenAI-compatible LLM refinement.\n\nUCWS is the first use case, but LaunchLens is designed as a long-term collaboration platform for hackathons, accelerator demo days, open-source showcases, and internal product reviews.",
  demoUrl,
  repoUrl,
  techStack:
    "HTML, CSS, JavaScript, Canvas star-map rendering, browser localStorage, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, OpenAPI JSON contract, optional OpenAI-compatible chat completion endpoint",
  screenshotUrls: JSON.stringify([
    `${demoUrl.replace(/\/$/, "")}/assets/screenshot-hub.png`,
    `${demoUrl.replace(/\/$/, "")}/assets/screenshot-platform.png`,
    screenshotUrl,
  ]),
  logoUrl,
  demoFileUrl: null,
  linkedinUrl: null,
  teamMembers: JSON.stringify([
    {
      name: teamMembers,
      role: "Builder",
      links: {},
    },
  ]),
};

await writeFile("project-payload.json", JSON.stringify(payload, null, 2));
console.log("Wrote project-payload.json");
console.log(JSON.stringify(payload, null, 2));
