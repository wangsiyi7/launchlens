import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const pluginName = "hackathon-project-delivery";
const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const home = process.env.USERPROFILE || process.env.HOME;

if (!home) {
  console.error("Could not resolve USERPROFILE or HOME.");
  process.exit(1);
}

const sourceDir = resolve("plugins", pluginName);
const manifestPath = join(sourceDir, ".codex-plugin", "plugin.json");
const targetDir = process.env.CODEX_PLUGIN_TARGET || join(home, "plugins", pluginName);
const marketplacePath =
  process.env.CODEX_MARKETPLACE_PATH || join(home, ".agents", "plugins", "marketplace.json");

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function validateSource() {
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing plugin manifest: ${manifestPath}`);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest.name !== pluginName) {
    throw new Error(`Plugin manifest name must be ${pluginName}.`);
  }

  if (!existsSync(join(sourceDir, "skills", pluginName, "SKILL.md"))) {
    throw new Error("Missing skill SKILL.md.");
  }
}

function nextMarketplace() {
  const marketplace = readJson(marketplacePath, {
    name: "personal",
    interface: {
      displayName: "Personal",
    },
    plugins: [],
  });

  if (!Array.isArray(marketplace.plugins)) marketplace.plugins = [];

  const entry = {
    name: pluginName,
    source: {
      source: "local",
      path: `./plugins/${pluginName}`,
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL",
    },
    category: "Productivity",
  };

  const existingIndex = marketplace.plugins.findIndex((plugin) => plugin.name === pluginName);
  if (existingIndex >= 0) {
    marketplace.plugins[existingIndex] = entry;
  } else {
    marketplace.plugins.push(entry);
  }

  return marketplace;
}

validateSource();
const marketplace = nextMarketplace();

console.log("Hackathon Project Delivery plugin install plan");
console.log(`Source:      ${sourceDir}`);
console.log(`Target:      ${targetDir}`);
console.log(`Marketplace: ${marketplacePath}`);
console.log(`Mode:        ${apply ? "apply" : "dry-run"}`);

if (!apply) {
  console.log("");
  console.log("Dry run only. To install, run:");
  console.log("  node tools/install-codex-plugin.mjs --apply");
  process.exit(0);
}

mkdirSync(dirname(targetDir), { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true, force: true });

mkdirSync(dirname(marketplacePath), { recursive: true });
writeFileSync(marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`);

console.log("");
console.log("Installed plugin and updated marketplace entry.");
console.log("Restart Codex or refresh plugins if the app does not show it immediately.");
