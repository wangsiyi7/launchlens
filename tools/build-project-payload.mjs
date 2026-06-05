import { writeFile } from "node:fs/promises";

const demoUrl = process.env.LAUNCHLENS_DEMO_URL || "https://wangsiyi7.github.io/launchlens/";
const repoUrl = process.env.LAUNCHLENS_REPO_URL || "https://github.com/wangsiyi7/launchlens";
const screenshotUrl =
  process.env.LAUNCHLENS_SCREENSHOT_URL || `${demoUrl.replace(/\/$/, "")}/assets/screenshot.png`;
const logoUrl = process.env.LAUNCHLENS_LOGO_URL || `${demoUrl.replace(/\/$/, "")}/assets/logo.svg`;
const defaultTeamMembers = [
  {
    name: "Annie",
    role: "Team Captain",
    links: {
      github: "https://github.com/Anniefsh/",
    },
  },
  {
    name: "Yiang",
    role: "Technical Development",
    links: {
      github: "https://github.com/3231656738-creator",
    },
  },
  {
    name: "Hu Yinghui",
    role: "Product Manager",
    links: {
      github: "https://github.com/hu-xiao-yu",
    },
  },
];
const teamMembers = process.env.LAUNCHLENS_TEAM_MEMBERS_JSON
  ? JSON.parse(process.env.LAUNCHLENS_TEAM_MEMBERS_JSON)
  : defaultTeamMembers;

const payload = {
  name: "LaunchLens",
  track: "Application",
  tagline: "Turn hackathon ideas into scored, linked, and ready-to-submit project workspaces.",
  description:
    "LaunchLens is a browser-based hackathon collaboration hub for teams, solo builders, community reviewers, and demo-day organizers. It solves the final submission-layer problem: unstable demo links, unclear repositories, missing screenshots, weak README paths, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.\n\nTeams enter Project Wall fields, build a RepoScape-inspired idea star map, drag and persist graph nodes, inspect direct relationships, run focused project agents, archive linked ideas, audit evidence, scan public GitHub repository signals, score readiness, and generate copy-ready submission materials.\n\nThe current version includes Hackathon Hub, Project Manager, Codex Bridge for Codex/Claude Code/ClaudeCodex interoperability, 2.5D Temple Mode, Platform Console, local strategy/evidence/build/demo/tool/risk agents, Re-Forge Gate Agent, Codex API JSON export, optional Supabase workspace sync, bilingual UX, and optional OpenAI-compatible LLM refinement.\n\nLaunchLens references Akasxh/re-forge and ThomasLix7/RepoScape as MIT-licensed methodology/product references only; it does not copy their source code, prompts, assets, or setup files. UCWS is the first use case, but LaunchLens is designed as a reusable platform for future hackathons, demo days, open-source showcases, and product reviews.",
  demoUrl,
  repoUrl,
  techStack:
    "HTML, CSS, JavaScript, Canvas draggable star-map rendering, browser localStorage workspace persistence, optional Supabase REST backend, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, OpenAPI graph contract, Codex/ClaudeCodex bridge JSON, optional OpenAI-compatible chat completion endpoint, re-forge-inspired adversarial gate methodology reference, RepoScape-inspired graph HUD product reference",
  screenshotUrls: JSON.stringify([
    `${demoUrl.replace(/\/$/, "")}/assets/screenshot-hub.png`,
    `${demoUrl.replace(/\/$/, "")}/assets/screenshot-platform.png`,
    screenshotUrl,
  ]),
  logoUrl,
  demoFileUrl: null,
  linkedinUrl: null,
  teamMembers: JSON.stringify(teamMembers),
};

await writeFile("project-payload.json", JSON.stringify(payload, null, 2));
console.log("Wrote project-payload.json");
console.log(JSON.stringify(payload, null, 2));
