#!/usr/bin/env node
/**
 * Headless check: imported contracts with no ok edge show UNVERIFIED_BANNER via insight bundle.
 * Page wiring still routes panel title/rows through CellSheafInsight.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadCellSheafInsight() {
  const bundlePath = join(root, "template/insight.bundle.js");
  const src = readFileSync(bundlePath, "utf8");
  if (!src.trim()) {
    console.error("insight.bundle.js is empty");
    process.exit(1);
  }
  const sandbox = {};
  runInContext(src, createContext(sandbox));
  const I = sandbox.CellSheafInsight;
  if (!I?.bannerText || !I?.UNVERIFIED_BANNER) {
    console.error("CellSheafInsight missing from insight.bundle.js");
    process.exit(1);
  }
  return I;
}

const { UNVERIFIED_BANNER, bannerText, importedGraph, repairLabel, repairs } =
  loadCellSheafInsight();

const contractPath =
  process.argv[2] || join(root, "contracts/fineract-charter-1k.sheaf.json");
const graph = JSON.parse(readFileSync(contractPath, "utf8"));

if (!importedGraph(graph)) {
  console.error("expected imported contract at", contractPath);
  process.exit(1);
}
if ((graph.restrictions || []).some((r) => r.status === "ok")) {
  console.error("expected imported contract with no ok restriction at", contractPath);
  process.exit(1);
}

const banner = bannerText(graph);
if (banner !== UNVERIFIED_BANNER) {
  console.error("bannerText mismatch:", banner);
  process.exit(1);
}

const boot = readFileSync(join(root, "template/volume.boot.js"), "utf8");
if (!boot.includes("CellSheafInsight.bannerText(graph)")) {
  console.error("volume.boot.js must use CellSheafInsight.bannerText");
  process.exit(1);
}
if (!boot.includes('banner ? "Check these" : "Look here"')) {
  console.error("panel title check/check these branch missing");
  process.exit(1);
}
if (!boot.includes("CellSheafInsight.repairLabel(r)")) {
  console.error("rowText must use CellSheafInsight.repairLabel");
  process.exit(1);
}

const top = repairs(graph)[0];
if (!top || !/\bcheck\b/i.test(repairLabel(top))) {
  console.error("expected · check repair label on imported contract");
  process.exit(1);
}

const specimen = JSON.parse(
  readFileSync(join(root, "contracts/swarm.sheaf.json"), "utf8"),
);
if (importedGraph(specimen)) {
  console.error("specimen must not be imported");
  process.exit(1);
}
if (bannerText(specimen) !== null) {
  console.error("authored specimen must not show topology banner");
  process.exit(1);
}

console.log("assert-unverified-default-view ok");
