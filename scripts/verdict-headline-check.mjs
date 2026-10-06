#!/usr/bin/env node
/**
 * Headless check for default headline copy (template/volume.boot.js verdictText).
 * Jane Street ingest contracts must not promise "may fold" on unverified edges.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const contractFile = process.argv[2] || "jane-street-puzzles.sheaf.json";
const contractPath = join(ROOT, "contracts", contractFile);
const graph = JSON.parse(readFileSync(contractPath, "utf8"));

const bootSrc = readFileSync(join(ROOT, "template", "volume.boot.js"), "utf8");
const start = bootSrc.indexOf("function unverifiedTopology");
const end = bootSrc.indexOf("function focusText");
if (start < 0 || end < 0) {
  console.error("could not slice verdict helpers from volume.boot.js");
  process.exit(1);
}

const sandbox = { graph, console };
runInContext(bootSrc.slice(start, end), createContext(sandbox));

const headline = sandbox.verdictText();
if (/may fold/i.test(headline)) {
  console.error(`FAIL ${contractFile}: headline still promises fold: ${headline}`);
  process.exit(1);
}

const swarmPath = join(ROOT, "contracts", "swarm.sheaf.json");
const swarm = JSON.parse(readFileSync(swarmPath, "utf8"));
sandbox.graph = swarm;
const swarmHeadline = sandbox.verdictText();
if (!/Fix .+ may fold|may fold/.test(swarmHeadline)) {
  console.error(`FAIL swarm.sheaf.json: verified specimen headline changed: ${swarmHeadline}`);
  process.exit(1);
}

console.log(`ok  ${contractFile} headline`);
console.log(`ok  swarm.sheaf.json headline preserved`);
