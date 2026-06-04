import { readFile } from "node:fs/promises";

const payloadPath = process.env.LAUNCHLENS_PAYLOAD || "project-payload.json";

function parseJsonArray(value, fieldName, errors) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) {
    errors.push(`${fieldName} must be a JSON array string.`);
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      errors.push(`${fieldName} must parse to an array.`);
      return [];
    }
    return parsed;
  } catch {
    errors.push(`${fieldName} must be valid JSON.`);
    return [];
  }
}

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isGitHubUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "github.com" || url.hostname.endsWith(".github.com"));
  } catch {
    return false;
  }
}

const payload = JSON.parse((await readFile(payloadPath, "utf8")).replace(/^\uFEFF/, ""));
const errors = [];
const warnings = [];

for (const field of ["name", "track", "tagline", "description", "demoUrl", "repoUrl", "techStack", "logoUrl"]) {
  if (typeof payload[field] !== "string" || !payload[field].trim()) {
    errors.push(`${field} is required.`);
  }
}

if (payload.tagline && payload.tagline.length > 200) {
  errors.push("tagline must be 200 characters or fewer.");
}

if (payload.description && payload.description.length > 2000) {
  errors.push("description must be 2000 characters or fewer.");
}

if (payload.demoUrl && !isHttpsUrl(payload.demoUrl)) {
  errors.push("demoUrl must be an HTTPS URL.");
}

if (payload.repoUrl && !isGitHubUrl(payload.repoUrl)) {
  errors.push("repoUrl must be an HTTPS GitHub URL.");
}

if (payload.logoUrl && !isHttpsUrl(payload.logoUrl)) {
  errors.push("logoUrl must be an HTTPS URL.");
}

const screenshotUrls = parseJsonArray(payload.screenshotUrls, "screenshotUrls", errors);
if (!screenshotUrls.some((url) => typeof url === "string" && isHttpsUrl(url))) {
  errors.push("At least one screenshot URL must be HTTPS.");
}

const teamMembers = parseJsonArray(payload.teamMembers, "teamMembers", errors);
if (!teamMembers.length) {
  errors.push("At least one team member is required.");
}

for (const [index, member] of teamMembers.entries()) {
  if (!member || typeof member !== "object") {
    errors.push(`teamMembers[${index}] must be an object.`);
    continue;
  }
  if (typeof member.name !== "string" || !member.name.trim()) {
    errors.push(`teamMembers[${index}].name is required.`);
  }
  if (/add submitting team members/i.test(member.name || "")) {
    errors.push("Replace the placeholder team member name before final submission.");
  }
}

if (/trycloudflare\.com/i.test(payload.demoUrl || "")) {
  warnings.push("demoUrl is a temporary Cloudflare tunnel. Prefer a stable GitHub Pages, Netlify, or Vercel URL before final judging.");
}

if (payload.repoUrl && /YOUR_ACCOUNT|YOUR_PUBLIC/i.test(payload.repoUrl)) {
  errors.push("repoUrl still contains a placeholder.");
}

if (errors.length) {
  console.error("Submission payload is not ready:");
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log("Submission payload validation passed.");
if (warnings.length) {
  console.log("Warnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}
