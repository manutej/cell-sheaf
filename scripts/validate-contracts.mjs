#!/usr/bin/env node
/**
 * Validates this repo's contracts/ using the pinned kernel's validate-sheaf.mjs.
 * CI checks out the kernel to ./_kernel; local: clone swarm there or set KERNEL_ROOT.
 */
import { readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACTS = join(ROOT, "contracts");
const kernelRoot = process.env.KERNEL_ROOT ?? join(ROOT, "_kernel");
const validatorPath = join(kernelRoot, "scripts", "validate-sheaf.mjs");

if (!existsSync(validatorPath)) {
  console.error(
    `Kernel validator not found at ${validatorPath}. ` +
      "In CI this is populated automatically; locally: git clone manutej/cell-sheaf-swarm _kernel",
  );
  process.exit(1);
}

const { validateFile } = await import(pathToFileURL(validatorPath).href);

const files = readdirSync(CONTRACTS)
  .filter((f) => f.endsWith(".sheaf.json"))
  .map((f) => join(CONTRACTS, f));

if (!files.length) {
  console.error("no *.sheaf.json in contracts/");
  process.exit(1);
}

let bad = 0;
for (const f of files) {
  const { id, issues } = validateFile(f);
  if (issues.length) {
    bad += 1;
    console.error(`FAIL ${id ?? f}`);
    for (const i of issues) console.error(`  - ${i}`);
  } else {
    console.log(`ok  ${id}`);
  }
}

if (bad) process.exit(1);
