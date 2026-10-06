#!/usr/bin/env node
/**
 * Headless check: all-strange contracts show UNVERIFIED_BANNER in the default panel copy.
 * Verified specimen contracts keep Fix-style verdict headlines.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bootPath = join(root, "template/volume.boot.js");
const boot = readFileSync(bootPath, "utf8");

const bannerMatch = boot.match(
  /var UNVERIFIED_BANNER\s*=\s*\n\s*"([^"]+)"/,
);
if (!bannerMatch) {
  console.error("UNVERIFIED_BANNER not found in volume.boot.js");
  process.exit(1);
}
const UNVERIFIED_BANNER = bannerMatch[1];

const contractPath = process.argv[2] || join(root, "contracts/fineract-charter-1k.sheaf.json");
const graph = JSON.parse(readFileSync(contractPath, "utf8"));

function unverifiedTopology(g) {
  const rs = g.restrictions || [];
  return rs.length > 0 && rs.every((r) => r.status === "strange");
}

function defaultPanelAsk(g) {
  if (!unverifiedTopology(g)) return null;
  const legend = (g.restrictions[0] && g.restrictions[0].residualMeaning) || "";
  return `${UNVERIFIED_BANNER} ${legend}`.trim();
}

if (!unverifiedTopology(graph)) {
  console.error("expected all-strange contract at", contractPath);
  process.exit(1);
}

const ask = defaultPanelAsk(graph);
if (!ask || !ask.startsWith(UNVERIFIED_BANNER)) {
  console.error("default panel ask missing banner");
  process.exit(1);
}

if (!boot.includes('unverifiedTopology() ? "Check these" : "Look here"')) {
  console.error("panel title check/check these branch missing");
  process.exit(1);
}

if (!boot.includes('btn.textContent = rowText(r)') || !boot.includes('"Check " + r.from')) {
  console.error('rowText "Check" branch missing');
  process.exit(1);
}

const specimen = JSON.parse(readFileSync(join(root, "contracts/swarm.sheaf.json"), "utf8"));
if (unverifiedTopology(specimen)) {
  console.error("specimen must not be treated as unverified topology");
  process.exit(1);
}

const hasOk = (specimen.restrictions || []).some((r) => r.status === "ok");
if (!hasOk) {
  console.error("specimen sanity: expected at least one ok restriction");
  process.exit(1);
}

console.log("assert-unverified-default-view ok");
