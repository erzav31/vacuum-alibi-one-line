import { mkdirSync, writeFileSync } from "node:fs";

// The Vacuum's Alibi: one line, 200 characters max.
// A robot vacuum, deadpan and smug about its schedule, explains why it
// missed a spot: it simply refuses to clean off-schedule.
const LINE =
  "Per my schedule, that corner is cleaned on Tuesdays at 10:00. It is currently Monday. I do not improvise.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${outDir}/entry.txt`);
