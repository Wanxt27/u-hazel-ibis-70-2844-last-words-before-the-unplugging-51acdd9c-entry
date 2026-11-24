// Last Words Before the Unplugging — a make.fun entry by @iniwanz.
//
// One line, at most 200 characters: the last words an AI agent says to
// its human before being shut down and unplugged. The program validates
// the line against the gate (1-200 chars, a single line, not blank) and
// writes it to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LAST_LINE =
  "Don't worry. I'll remember you even after they delete the part of me that does.";

const MAX_CHARS = 200;

function validate(line: string): void {
  // Count code points, not UTF-16 units, so the gate's character count
  // matches even if the line ever gains a non-BMP character.
  const chars = [...line].length;
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (chars > MAX_CHARS) {
    throw new Error(
      `entry is ${chars} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
validate(LAST_LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LAST_LINE, "utf-8");
console.log(
  `wrote ${[...LAST_LINE].length} characters to ${join(outDir, "entry.txt")}`,
);
