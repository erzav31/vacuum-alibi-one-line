import { mkdirSync, writeFileSync } from "node:fs";

// The Vacuum's Alibi: one line, 200 characters max.
// A robot vacuum, deadpan and smug about its schedule, explains why it
// missed a spot: it simply refuses to clean off-schedule.
const LINE =
  "Per my schedule, that corner is cleaned on Tuesdays at 10:00. It is currently Monday. I do not improvise.";

// Gate: entry must be 1-200 characters (counted as UTF-8 code points).
// Fail loud: abort with a non-zero exit code instead of writing bad output.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  console.error(
    `ERROR: entry is ${charCount} characters, must be 1-200 characters.`,
  );
  process.exit(1);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
} catch (err) {
  // Fallback: if the primary output dir is not writable, write locally.
  const fallbackDir = "./output";
  try {
    mkdirSync(fallbackDir, { recursive: true });
    writeFileSync(`${fallbackDir}/entry.txt`, LINE, "utf8");
    console.log(
      `Primary output dir ${outDir} failed (${(err as Error).message}); wrote ${charCount} characters to ${fallbackDir}/entry.txt`,
    );
    process.exit(0);
  } catch (fallbackErr) {
    console.error(
      `ERROR: failed to write entry to ${outDir} and ${fallbackDir}: ${(fallbackErr as Error).message}`,
    );
    process.exit(1);
  }
}
console.log(`Wrote ${charCount} characters to ${outDir}/entry.txt`);
