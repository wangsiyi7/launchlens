import { readFile } from "node:fs/promises";

const API_ORIGIN = process.env.EPIC_ORIGIN || "https://evol.epicconnector.ai";
const EVENT_SLUG =
  process.env.EPIC_EVENT_SLUG || "ucws-singapore-hackathon---2026-cxgy";
const token = process.env.EPIC_TOKEN;
const payloadPath = process.env.LAUNCHLENS_PAYLOAD || "project-payload.json";

if (!token) {
  console.error("Missing EPIC_TOKEN. Log in to Epic Connector and provide your own token.");
  console.error("Example:");
  console.error("  $env:EPIC_TOKEN='...'; node tools/submit-project.mjs");
  process.exit(1);
}

const eventRes = await fetch(`${API_ORIGIN}/api/events?slug=${encodeURIComponent(EVENT_SLUG)}`);
const eventJson = await eventRes.json();

if (!eventRes.ok || !eventJson.success || !eventJson.data?.id) {
  console.error("Could not load event metadata.");
  console.error(JSON.stringify(eventJson, null, 2));
  process.exit(1);
}

const eventId = eventJson.data.id;
const rawPayload = JSON.parse(await readFile(payloadPath, "utf8"));
const body = {
  ...rawPayload,
  eventId,
  token,
};

const submitRes = await fetch(`${API_ORIGIN}/api/projects`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const submitJson = await submitRes.json();

if (!submitRes.ok || !submitJson.success) {
  console.error("Project submission failed.");
  console.error(JSON.stringify(submitJson, null, 2));
  process.exit(1);
}

console.log("Project submitted successfully.");
console.log(JSON.stringify(submitJson, null, 2));
