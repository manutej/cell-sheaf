#!/usr/bin/env node
/**
 * Headless check for default headline copy via template/insight.bundle.js (CellSheafInsight.verdict).
 * Jane Street ingest contracts must not promise "may fold" on unverified edges.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadCellSheafInsight() {
  const bundlePath = join(ROOT, "template/insight.bundle.js");
  const src = readFileSync(bundlePath, "utf8");
  if (!src.trim()) {
    console.error("insight.bundle.js is empty");
    process.exit(1);
  }
  const sandbox = {};
  runInContext(src, createContext(sandbox));
  const I = sandbox.CellSheafInsight;
  if (!I?.verdict) {
    console.error("CellSheafInsight.verdict missing from insight.bundle.js");
    process.exit(1);
  }
  return I;
}

const { verdict } = loadCellSheafInsight();

const contractFile = process.argv[2] || "jane-street-puzzles.sheaf.json";
const contractPath = join(ROOT, "contracts", contractFile);
const graph = JSON.parse(readFileSync(contractPath, "utf8"));

const headline = verdict(graph);
if (/may fold/i.test(headline)) {
  console.error(`FAIL ${contractFile}: headline still promises fold: ${headline}`);
  process.exit(1);
}
if (/\bfix\b/i.test(headline)) {
  console.error(`FAIL ${contractFile}: headline still says fix: ${headline}`);
  process.exit(1);
}

const janeWithMeaning = JSON.parse(readFileSync(contractPath, "utf8"));
for (const r of janeWithMeaning.restrictions || []) {
  r.residualMeaning = r.residualMeaning || "Ingest edge meaning for headline-rule probe.";
}
const janeRmHeadline = verdict(janeWithMeaning);
if (/\bfix\b/i.test(janeRmHeadline) || /may fold/i.test(janeRmHeadline)) {
  console.error(
    `FAIL ${contractFile} with residualMeaning on every edge: ${janeRmHeadline}`,
  );
  process.exit(1);
}
if (!/link to missing page/i.test(janeRmHeadline)) {
  console.error(
    `FAIL ${contractFile} with residualMeaning: expected link to missing page: ${janeRmHeadline}`,
  );
  process.exit(1);
}

const swarm = JSON.parse(readFileSync(join(ROOT, "contracts", "swarm.sheaf.json"), "utf8"));
const swarmHeadline = verdict(swarm);
if (!/Fix .+ may fold|may fold/.test(swarmHeadline)) {
  console.error(`FAIL swarm.sheaf.json: verified specimen headline changed: ${swarmHeadline}`);
  process.exit(1);
}

console.log(`ok  ${contractFile} headline`);
console.log(`ok  swarm.sheaf.json headline preserved`);
