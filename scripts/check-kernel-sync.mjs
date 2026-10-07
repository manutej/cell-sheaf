#!/usr/bin/env node
/**
 * Ensures mirrored contracts and template/tokens.css match the pinned kernel checkout.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const kernelRoot = process.env.KERNEL_ROOT ?? join(ROOT, "_kernel");
const pinPath = join(ROOT, "docs", "SWARM_KERNEL_PIN.json");

function sha(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function fail(msg) {
  console.error(`sync check: ${msg}`);
  process.exit(1);
}

if (!existsSync(kernelRoot)) {
  fail(`kernel checkout missing at ${kernelRoot}`);
}

const pin = JSON.parse(readFileSync(pinPath, "utf8"));
const kernelHead = readFileSync(join(kernelRoot, ".git", "HEAD"), "utf8").trim();
if (kernelHead.startsWith("ref: ")) {
  const refName = kernelHead.slice(5);
  const refPath = join(kernelRoot, ".git", refName);
  if (existsSync(refPath)) {
    const resolved = readFileSync(refPath, "utf8").trim();
    if (pin.ref.length === 40 && resolved !== pin.ref) {
      console.warn(`warn: _kernel HEAD ${resolved.slice(0, 7)} != pin ${pin.ref.slice(0, 7)}`);
    }
  }
}

const tokensSurface = join(ROOT, "template", "tokens.css");
const tokensKernel = join(kernelRoot, "template", "tokens.css");
if (!existsSync(tokensSurface) || !existsSync(tokensKernel)) {
  fail("template/tokens.css missing on surface or kernel");
}
if (sha(tokensSurface) !== sha(tokensKernel)) {
  fail(
    "template/tokens.css differs from kernel at pin — sync from cell-sheaf-swarm or bump pin with documented intent",
  );
}

const surfaceSheaves = readdirSync(join(ROOT, "contracts")).filter((f) => f.endsWith(".sheaf.json"));
for (const file of surfaceSheaves) {
  const sPath = join(ROOT, "contracts", file);
  const surfaceDoc = JSON.parse(readFileSync(sPath, "utf8"));
  const kPath = join(kernelRoot, "contracts", file);
  // Bridge imports (x-sas, absent from kernel) are authored on the surface only.
  if (
    Object.prototype.hasOwnProperty.call(surfaceDoc, "x-sas") &&
    !existsSync(kPath)
  ) {
    continue;
  }
  if (!existsSync(kPath)) {
    fail(`contracts/${file} not present in kernel (unexpected surface-only contract)`);
  }
  if (sha(sPath) !== sha(kPath)) {
    fail(`contracts/${file} hash differs from kernel — sync from tagged release`);
  }
}

console.log("ok  kernel sync (tokens.css + mirrored contracts)");
