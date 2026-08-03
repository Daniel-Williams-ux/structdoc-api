import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { validateExtraction } from "../lib/validateExtraction.js";

const samplesDir = join(process.cwd(), "samples");

const files = readdirSync(samplesDir).filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.log("No sample files in samples/ — add JSON payloads for DOC-101.");
  process.exit(0);
}

let failed = 0;

for (const file of files) {
  const raw = readFileSync(join(samplesDir, file), "utf8");
  const payload = JSON.parse(raw);
  const result = validateExtraction(payload);
  const expectValid = file.startsWith("valid-");

  const ok = result.valid === expectValid;
  const status = ok ? "OK" : "FAIL";
  console.log(`${status}  ${file}  (expected valid=${expectValid}, got valid=${result.valid})`);

  if (!ok) {
    failed += 1;
    if (result.errors) {
      console.log(JSON.stringify(result.errors, null, 2));
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} sample(s) did not match expectation.`);
  process.exit(1);
}

console.log("\nAll samples matched expectation.");
