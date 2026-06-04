import { writeFile } from "node:fs/promises";

const demoUrl = process.env.LAUNCHLENS_DEMO_URL || "https://YOUR_PUBLIC_DEMO_URL";
const repoUrl = process.env.LAUNCHLENS_REPO_URL || "https://github.com/YOUR_ACCOUNT/launchlens";
const screenshotUrl =
  process.env.LAUNCHLENS_SCREENSHOT_URL || `${demoUrl.replace(/\/$/, "")}/assets/screenshot.png`;
const logoUrl = process.env.LAUNCHLENS_LOGO_URL || `${demoUrl.replace(/\/$/, "")}/assets/logo.svg`;
const teamMembers = process.env.LAUNCHLENS_TEAM_MEMBERS || "Add submitting team members";

const payload = {
  name: "LaunchLens",
  track: "Application",
  tagline: "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
  description:
    "LaunchLens is a browser-based submission copilot for hackathon teams, solo builders, community reviewers, and demo-day organizers. Builders often have real work but lose the last day converting product notes into clear submissions that voters, AI evaluators, and judges can understand quickly.\n\nLaunchLens runs a review agent over UCWS submission fields, scores readiness across community vote, AI evaluation, and expert judging, then generates Markdown, README, pitch, sprint plan, and fix-list outputs. It helps builders move from rough notes to a credible public submission in minutes.\n\nThe current version includes Temple Mode, a 2.5D spatial submission workflow with six clickable nodes for project story, evidence, score, Oracle LLM, generated archive, and final GitHub / Project Wall handoff. Classic Mode remains available for fast form editing and stable export.\n\nThe first use case is UCWS Singapore 2026, but the product is global: any hackathon, accelerator, or demo-day team can use the same workflow before submitting.",
  demoUrl,
  repoUrl,
  techStack:
    "HTML, CSS, JavaScript, browser localStorage, 2.5D generated bitmap background, optional OpenAI-compatible chat completion endpoint",
  screenshotUrls: JSON.stringify([screenshotUrl]),
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
