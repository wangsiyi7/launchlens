import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_BASE_URL = "https://evol.epicconnector.ai";
const DEFAULT_EVENT_SLUG = "ucws-singapore-hackathon---2026-cxgy";
const DEFAULT_OUTPUT = "data/ucws-project-wall.json";
const DEFAULT_MARKDOWN_OUTPUT = "data/ucws-project-wall.md";
const DEFAULT_LIMIT = 20;
const DEFAULT_SORTS = ["all", "popular", "judge", "stars"];
const DEFAULT_RANDOM_SEED = "launchlens-ucws-2026";

const categoryRules = [
  ["Agent", ["agent", "multi-agent", "workflow", "automation", "assistant", "copilot", "tool use"]],
  ["Skill", ["skill", "plugin", "codex", "prompt", "workflow template", "playbook"]],
  ["Application", ["app", "platform", "dashboard", "product", "mobile", "web", "interface"]],
  ["Deep Research", ["research", "report", "analysis", "insight", "knowledge", "paper"]],
  ["Developer Tool", ["github", "repo", "code", "developer", "api", "sdk", "testing", "deploy"]],
  ["Education", ["learn", "student", "education", "course", "teacher", "school", "training"]],
  ["Productivity", ["productivity", "task", "calendar", "meeting", "note", "workspace"]],
  ["Business", ["sales", "customer", "crm", "market", "business", "founder", "startup"]],
  ["Community", ["community", "social", "creator", "network", "collaboration"]],
  ["Data", ["data", "analytics", "database", "dashboard", "metric", "visualization"]],
];

function parseArgs(argv) {
  const options = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [key, ...rest] = arg.slice(2).split("=");
    const value = rest.length ? rest.join("=") : "true";
    options[key] = value;
  }
  return options;
}

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function splitCsv(value, fallback = []) {
  const list = String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length ? list : fallback;
}

function safeJsonParse(value, fallback) {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function absoluteUrl(value, baseUrl) {
  if (!value) return "";
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return String(value);
  }
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function textBlob(project) {
  return [
    project.name,
    project.tagline,
    project.description,
    project.track,
    project.techStack,
    project.teamMembers,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function classifyProject(project = {}) {
  const blob = textBlob(project);
  const categories = categoryRules
    .filter(([, keywords]) => keywords.some((keyword) => blob.includes(keyword)))
    .map(([category]) => category);

  return unique([
    ...splitCsv(project.track),
    ...categories,
    categories.length ? "" : "Unclassified",
  ]);
}

export function parseProjectLinks(project = {}) {
  const screenshotUrls = safeJsonParse(project.screenshotUrls, [])
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  const teamMembers = safeJsonParse(project.teamMembers, []);
  const teamLinks = Array.isArray(teamMembers)
    ? teamMembers.flatMap((member) => Object.values(member.links || {}).map((link) => String(link || "").trim()))
    : [];

  return {
    demoUrl: project.demoUrl || "",
    repoUrl: project.repoUrl || "",
    logoUrl: project.logoUrl || "",
    demoFileUrl: project.demoFileUrl || "",
    linkedinUrl: project.linkedinUrl || "",
    screenshotUrls,
    teamLinks: teamLinks.filter(Boolean),
  };
}

export function summarizeProject(project = {}) {
  const tagline = normalizeText(project.tagline);
  const description = normalizeText(project.description);
  const firstSentence = description.split(/(?<=[.!?。！？])\s+/)[0] || description;
  return normalizeText([tagline, firstSentence].filter(Boolean).join(" "));
}

export function readinessSignals(project = {}) {
  const links = parseProjectLinks(project);
  const techStack = splitCsv(project.techStack);
  const hasRepo = Boolean(links.repoUrl);
  const hasDemo = Boolean(links.demoUrl);
  const hasScreenshots = links.screenshotUrls.length > 0;
  const hasTeam = Boolean(project.teamMembers);
  const completeness = [project.name, project.tagline, project.description, hasRepo, hasDemo, hasScreenshots, hasTeam, techStack.length]
    .filter(Boolean).length;

  return {
    hasRepo,
    hasDemo,
    hasScreenshots,
    hasTeam,
    techStackCount: techStack.length,
    voteCount: Number(project.voteCount || 0),
    judgeVoteCount: Number(project.judgeVoteCount || 0),
    hackerVoteCount: Number(project.hackerVoteCount || 0),
    commentCount: Number(project.commentCount || 0),
    githubStars: project.githubStars == null ? null : Number(project.githubStars),
    completenessScore: Math.round((completeness / 8) * 100),
  };
}

export function normalizeProject(raw = {}, context = {}) {
  const baseUrl = context.baseUrl || DEFAULT_BASE_URL;
  const eventSlug = context.eventSlug || DEFAULT_EVENT_SLUG;
  const projectWallUrl = `${baseUrl}/events/${eventSlug}/project-wall`;
  const id = raw.id || raw.projectId || "";
  const links = parseProjectLinks(raw);
  const normalizedLinks = {
    demoUrl: absoluteUrl(links.demoUrl, baseUrl),
    repoUrl: absoluteUrl(links.repoUrl, baseUrl),
    logoUrl: absoluteUrl(links.logoUrl, baseUrl),
    demoFileUrl: absoluteUrl(links.demoFileUrl, baseUrl),
    linkedinUrl: absoluteUrl(links.linkedinUrl, baseUrl),
    screenshotUrls: links.screenshotUrls.map((url) => absoluteUrl(url, baseUrl)),
    teamLinks: links.teamLinks.map((url) => absoluteUrl(url, baseUrl)),
  };
  const normalized = {
    id,
    name: normalizeText(raw.name) || "Untitled project",
    tagline: normalizeText(raw.tagline),
    description: normalizeText(raw.description),
    track: normalizeText(raw.track),
    techStack: splitCsv(raw.techStack),
    teamMembers: safeJsonParse(raw.teamMembers, []),
    status: raw.status || "",
    createdAt: raw.createdAt || "",
    updatedAt: raw.updatedAt || "",
    projectWallUrl,
    projectUrl: id ? `${projectWallUrl}?projectId=${encodeURIComponent(id)}` : projectWallUrl,
    projectApiPath: id ? `/api/projects/${id}` : "",
    links: normalizedLinks,
    categories: classifyProject(raw),
    summary: summarizeProject(raw),
    signals: readinessSignals(raw),
    searchText: "",
    raw,
  };
  normalized.searchText = [
    normalized.name,
    normalized.tagline,
    normalized.description,
    normalized.track,
    normalized.techStack.join(" "),
    normalized.categories.join(" "),
    normalized.summary,
  ]
    .join(" ")
    .toLowerCase();
  return normalized;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json,text/plain,*/*",
      "user-agent": "LaunchLensCrawler/1.0 (+https://github.com/wangsiyi7/launchlens)",
    },
    ...options,
  });
  const text = await response.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text.slice(0, 1000) };
  }
  if (!response.ok || data?.success === false || data?.error) {
    const error = new Error(data?.error || response.statusText || "Request failed");
    error.status = response.status;
    error.url = url.replace(/token=[^&]+/g, "token=[redacted]");
    error.data = data;
    throw error;
  }
  return data;
}

function apiUrl(baseUrl, path, params = {}) {
  const url = new URL(path, baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url;
}

async function fetchEvent({ baseUrl, eventSlug }) {
  const data = await fetchJson(apiUrl(baseUrl, "/api/events", { slug: eventSlug }));
  if (!data?.success || !data.data?.id) {
    throw new Error(`Event not found for slug ${eventSlug}`);
  }
  return data.data;
}

async function fetchProjectPage({ baseUrl, eventId, token, sort, limit, offset, search, track, randomSeed }) {
  const params = { eventId, sort, limit, offset, token };
  if (search) params.search = search;
  if (track && track !== "All") params.track = track;
  if (sort === "all") params.randomSeed = randomSeed;
  const data = await fetchJson(apiUrl(baseUrl, "/api/projects", params), { cache: "no-store" });
  return Array.isArray(data.data) ? data.data : [];
}

async function fetchProjectDetail({ baseUrl, token, projectId }) {
  const data = await fetchJson(apiUrl(baseUrl, `/api/projects/${projectId}`, { token }), { cache: "no-store" });
  return data.data || null;
}

async function fetchComments({ baseUrl, token, projectId }) {
  const data = await fetchJson(apiUrl(baseUrl, `/api/projects/${projectId}/comments`, { token }), { cache: "no-store" });
  return Array.isArray(data.data) ? data.data : [];
}

function buildMarkdown(output) {
  const lines = [
    "# UCWS Project Wall Snapshot",
    "",
    `Generated: ${output.generatedAt}`,
    `Event: ${output.event.title}`,
    `Source: ${output.source.projectWallUrl}`,
    `Projects: ${output.totals.projects}`,
    "",
  ];

  if (output.errors.length) {
    lines.push("## Sync Notes", "");
    output.errors.forEach((error) => {
      lines.push(`- ${error.code}: ${error.message}`);
    });
    lines.push("");
  }

  lines.push("## Projects", "");
  output.projects.forEach((project, index) => {
    lines.push(`### ${index + 1}. ${project.name}`);
    lines.push("");
    if (project.tagline) lines.push(project.tagline, "");
    lines.push(`- Track: ${project.track || "Unknown"}`);
    lines.push(`- Categories: ${project.categories.join(", ")}`);
    lines.push(`- Votes: ${project.signals.voteCount} total / ${project.signals.judgeVoteCount} judge / ${project.signals.hackerVoteCount} hacker`);
    lines.push(`- Completeness: ${project.signals.completenessScore}`);
    if (project.links.demoUrl) lines.push(`- Demo: ${project.links.demoUrl}`);
    if (project.links.repoUrl) lines.push(`- Repository: ${project.links.repoUrl}`);
    lines.push(`- Project reference: ${project.projectUrl}`);
    lines.push("");
  });

  return lines.join("\n");
}

export async function syncUcwsProjectWall(options = {}) {
  const baseUrl = String(options.baseUrl || process.env.EPIC_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const eventSlug = options.eventSlug || process.env.EPIC_EVENT_SLUG || DEFAULT_EVENT_SLUG;
  const outputFile = options.output || process.env.UCWS_PROJECT_WALL_OUTPUT || DEFAULT_OUTPUT;
  const markdownFile = options.markdownOutput || process.env.UCWS_PROJECT_WALL_MARKDOWN || DEFAULT_MARKDOWN_OUTPUT;
  const token = options.token || process.env.EPIC_TOKEN || "";
  const limit = toNumber(options.limit || process.env.EPIC_PROJECT_LIMIT, DEFAULT_LIMIT);
  const sorts = splitCsv(options.sorts || process.env.EPIC_PROJECT_SORTS, DEFAULT_SORTS);
  const search = options.search || process.env.EPIC_PROJECT_SEARCH || "";
  const track = options.track || process.env.EPIC_PROJECT_TRACK || "";
  const randomSeed = options.randomSeed || process.env.EPIC_PROJECT_RANDOM_SEED || DEFAULT_RANDOM_SEED;
  const includeComments = Boolean(options.comments || process.env.EPIC_INCLUDE_COMMENTS === "1");
  const errors = [];
  const event = await fetchEvent({ baseUrl, eventSlug });
  const rawById = new Map();

  if (!token) {
    errors.push({
      code: "TOKEN_MISSING",
      message:
        "EPIC_TOKEN is required to read the authenticated Project Wall API. Log in to Epic Connector and provide the localStorage token as an environment variable.",
    });
  } else {
    for (const sort of sorts) {
      let offset = 0;
      for (;;) {
        try {
          const page = await fetchProjectPage({
            baseUrl,
            eventId: event.id,
            token,
            sort,
            limit,
            offset,
            search,
            track,
            randomSeed,
          });
          page.forEach((project) => {
            if (project?.id && !rawById.has(project.id)) rawById.set(project.id, project);
          });
          if (page.length < limit) break;
          offset += page.length;
        } catch (error) {
          errors.push({
            code: "PROJECT_LIST_FAILED",
            sort,
            offset,
            status: error.status || null,
            message: error.message,
            url: error.url || "",
          });
          break;
        }
      }
    }
  }

  const projects = [];
  for (const project of rawById.values()) {
    let hydrated = project;
    let comments = [];
    try {
      const detail = await fetchProjectDetail({ baseUrl, token, projectId: project.id });
      if (detail) hydrated = { ...project, ...detail };
    } catch (error) {
      errors.push({
        code: "PROJECT_DETAIL_FAILED",
        projectId: project.id,
        status: error.status || null,
        message: error.message,
      });
    }

    if (includeComments) {
      try {
        comments = await fetchComments({ baseUrl, token, projectId: project.id });
      } catch (error) {
        errors.push({
          code: "PROJECT_COMMENTS_FAILED",
          projectId: project.id,
          status: error.status || null,
          message: error.message,
        });
      }
    }

    const normalized = normalizeProject(hydrated, { baseUrl, eventSlug });
    if (includeComments) normalized.comments = comments;
    projects.push(normalized);
  }

  projects.sort((a, b) => b.signals.voteCount - a.signals.voteCount || a.name.localeCompare(b.name));

  const output = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    source: {
      baseUrl,
      eventSlug,
      eventApiPath: `/api/events?slug=${eventSlug}`,
      projectWallUrl: `${baseUrl}/events/${eventSlug}/project-wall`,
      projectListApiPath: "/api/projects",
      projectDetailApiPath: "/api/projects/{projectId}",
      sorts,
      limit,
      search,
      track,
      requiresToken: true,
    },
    event: {
      id: event.id,
      slug: event.slug,
      title: event.title,
      eventType: event.eventType,
      status: event.status,
      tracks: event.tracks || [],
      projectWallEnabled: event.projectWallEnabled,
      projectSubmitEnabled: event.projectSubmitEnabled,
      projectEditEnabled: event.projectEditEnabled,
    },
    totals: {
      projects: projects.length,
      withRepo: projects.filter((project) => project.signals.hasRepo).length,
      withDemo: projects.filter((project) => project.signals.hasDemo).length,
      withScreenshots: projects.filter((project) => project.signals.hasScreenshots).length,
      tracks: unique(projects.flatMap((project) => splitCsv(project.track))).length,
    },
    projects,
    projectLinks: projects.map((project) => ({
      id: project.id,
      name: project.name,
      projectUrl: project.projectUrl,
      projectApiPath: project.projectApiPath,
      repoUrl: project.links.repoUrl,
      demoUrl: project.links.demoUrl,
    })),
    errors,
  };

  if (!options.dryRun) {
    const absoluteOutput = resolve(outputFile);
    const absoluteMarkdown = resolve(markdownFile);
    await mkdir(dirname(absoluteOutput), { recursive: true });
    await writeFile(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    await mkdir(dirname(absoluteMarkdown), { recursive: true });
    await writeFile(absoluteMarkdown, buildMarkdown(output), "utf8");
  }

  return output;
}

async function runOnce(options) {
  const output = await syncUcwsProjectWall(options);
  console.log(
    JSON.stringify(
      {
        generatedAt: output.generatedAt,
        event: output.event.title,
        projects: output.totals.projects,
        errors: output.errors,
        output: options.output || process.env.UCWS_PROJECT_WALL_OUTPUT || DEFAULT_OUTPUT,
      },
      null,
      2,
    ),
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(`Usage:
  node tools/sync-ucws-project-wall.mjs
  EPIC_TOKEN=... node tools/sync-ucws-project-wall.mjs --sorts=all,popular,judge,stars
  node tools/sync-ucws-project-wall.mjs --watch --interval-minutes=30

Environment:
  EPIC_TOKEN                 Required for project list and detail APIs
  EPIC_EVENT_SLUG            Defaults to ${DEFAULT_EVENT_SLUG}
  EPIC_PROJECT_SORTS         Defaults to ${DEFAULT_SORTS.join(",")}
  EPIC_INCLUDE_COMMENTS=1    Also fetch project comments
`);
    return;
  }

  if (options.watch) {
    const intervalMinutes = toNumber(options["interval-minutes"] || process.env.EPIC_SYNC_INTERVAL_MINUTES, 30);
    await runOnce(options);
    setInterval(() => {
      runOnce(options).catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });
    }, intervalMinutes * 60 * 1000);
    return;
  }

  await runOnce(options);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isCli) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
