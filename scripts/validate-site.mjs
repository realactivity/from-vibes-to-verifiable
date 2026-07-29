import { readFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const html = await readFile(path.join(root, "index.html"), "utf8");
const required = [
  "OpenClaw",
  "Microsoft Scout",
  "Tula",
  "Wren",
  "My Aria",
  "Waza",
  "mellowmushroom.realactivity.ai",
  "From-Vibes-to-Verifiable-M365-NYC-2026.pptx",
];

const errors = [];
for (const term of required) {
  if (!html.includes(term)) errors.push(`Missing required story term: ${term}`);
}

const localRefs = [
  ...html.matchAll(/(?:src|href)="([^"]+)"/g),
].map((match) => match[1])
  .filter((ref) => !/^(?:https?:|#|mailto:)/.test(ref));

for (const ref of new Set(localRefs)) {
  const clean = decodeURIComponent(ref.split("#")[0].split("?")[0]);
  try {
    await access(path.join(root, clean));
  } catch {
    errors.push(`Missing local reference: ${ref}`);
  }
}

const imageRefs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
if (imageRefs.some((ref) => /^https?:/.test(ref))) {
  errors.push("External image found; images must be project or repository sourced.");
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) errors.push(`Duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${localRefs.length} local references and ${required.length} story requirements.`);
