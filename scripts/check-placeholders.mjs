#!/usr/bin/env node
/**
 * Pre-build placeholder report. Lists every "DUMMY:" marker and isPlaceholder: true flag
 * in /data, /content and /lib so fictional content can't ship unnoticed.
 * Warns by default; set STRICT_PLACEHOLDERS=1 (e.g. in the production deploy job) to fail the build.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const dirs = ["data", "content", "lib", "components/layout", "app"];
const exts = [".ts", ".tsx", ".mdx", ".md"];
const hits = new Map();

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (exts.some((e) => name.endsWith(e)) && name !== "README.md") {
      const text = readFileSync(path, "utf8");
      const dummy = (text.match(/DUMMY:/g) ?? []).length;
      const flagged = (text.match(/isPlaceholder:\s*true/g) ?? []).length;
      if (dummy || flagged) hits.set(relative(root, path), { dummy, flagged });
    }
  }
}

dirs.forEach((d) => walk(join(root, d)));

if (hits.size === 0) {
  console.log("✓ No placeholder content found.");
  process.exit(0);
}

const total = [...hits.values()].reduce((n, h) => n + h.dummy + h.flagged, 0);
console.warn(`\n⚠  ${total} placeholder markers in ${hits.size} files (see data/README.md):`);
for (const [file, { dummy, flagged }] of hits) {
  console.warn(`   ${file.padEnd(42)} DUMMY×${dummy}  isPlaceholder×${flagged}`);
}
console.warn("");
if (process.env.STRICT_PLACEHOLDERS === "1") {
  console.error("✗ STRICT_PLACEHOLDERS=1: refusing to build with placeholder content.");
  process.exit(1);
}
