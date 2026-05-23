#!/usr/bin/env node
// Validate one or more lesson MDX files by compiling them through the same
// next-mdx-remote/rsc + remark-math + rehype-katex pipeline used in production.
// Catches: bare {...} parsed as JSX, $ inside $...$, malformed math, unclosed
// JSX, etc. Fast feedback (~1s per file) vs `npm run build` (~30s for all).
//
// Usage:
//   node scripts/validate-mdx.mjs content/lessons/foo.mdx [...more.mdx]
//   node scripts/validate-mdx.mjs --all   (validates every file under content/lessons/)

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const LESSON_DIR = path.join(process.cwd(), "content", "lessons");

async function listAll() {
  const entries = await readdir(LESSON_DIR);
  return entries
    .filter((e) => e.endsWith(".mdx"))
    .map((e) => path.join("content/lessons", e));
}

async function validate(file) {
  const abs = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  const source = await readFile(abs, "utf8");
  try {
    await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      },
    });
    return { file, ok: true };
  } catch (err) {
    return { file, ok: false, error: err };
  }
}

async function main() {
  const args = process.argv.slice(2);
  let files;
  if (args.length === 0) {
    console.error(
      "Usage: node scripts/validate-mdx.mjs <path.mdx> [<more.mdx>...]\n" +
        "       node scripts/validate-mdx.mjs --all",
    );
    process.exit(2);
  }
  if (args[0] === "--all") {
    files = await listAll();
  } else {
    files = args;
  }

  let failed = 0;
  for (const file of files) {
    const result = await validate(file);
    if (result.ok) {
      console.log(`OK    ${file}`);
    } else {
      failed += 1;
      const err = result.error;
      const message = err && err.message ? err.message : String(err);
      const reason = err && err.reason ? `\n      reason: ${err.reason}` : "";
      const place =
        err && err.place
          ? `\n      at line ${err.place.start?.line ?? "?"}, column ${err.place.start?.column ?? "?"}`
          : err && err.line
            ? `\n      at line ${err.line}, column ${err.column ?? "?"}`
            : "";
      console.error(`FAIL  ${file}\n      ${message}${reason}${place}`);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} of ${files.length} file(s) failed MDX validation.`);
    process.exit(1);
  }
  console.log(`\nAll ${files.length} file(s) compiled cleanly.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
