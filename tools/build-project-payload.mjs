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
  tagline: "Turn rough hackathon ideas into scored, ready-to-submit Project Wall packages.",
  description:
    "LaunchLens is a browser-based submission evidence collaboration app for hackathon teams, solo builders, community reviewers, and demo-day organizers. Hackathon teams often build something real, but lose momentum at the final submission layer: unstable demo links, unclear repositories, missing screenshots, incomplete README paths, weak proof, and narratives that do not match how community voters, AI evaluators, and expert judges inspect work.\n\nLaunchLens turns that final handoff into an interactive Evidence Gate. Teams enter their Project Wall fields, then the app audits required evidence, scans public GitHub repository signals, scores readiness across Community Vote, AI Evaluation, and Expert Judges, and generates a copy-ready submission pack, README draft, pitch, sprint plan, and fix list.\n\nThe current version includes Temple Mode, a 2.5D spatial workflow with six clickable nodes for project story, evidence, score, optional LLM refinement, archive review, and final handoff. Classic Mode provides a stable operational view for field entry, evidence auditing, repo scanning, and material export.\n\nUCWS is the first use case, but LaunchLens is designed as a long-term collaboration tool for hackathons, accelerator demo days, open-source showcases, and internal product reviews.",
  demoUrl,
  repoUrl,
  techStack:
    "HTML, CSS, JavaScript, browser localStorage, GitHub Pages, Vercel-ready static deployment, 2.5D generated bitmap background, GitHub public API repo scanning, optional OpenAI-compatible chat completion endpoint",
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
