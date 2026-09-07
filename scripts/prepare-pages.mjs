#!/usr/bin/env node
/**
 * Flatten a TanStack Start SPA build into dist/pages for GitHub Pages.
 * Copies the SPA shell to index.html + 404.html so deep links hydrate
 * instead of showing GitHub's default 404.
 */
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dest = "dist/pages";
const candidates = ["dist/client", "dist/public", ".output/public", "dist"];

function findClientDir() {
  for (const dir of candidates) {
    if (!existsSync(dir)) continue;
    if (existsSync(join(dir, "_shell.html")) || existsSync(join(dir, "index.html"))) {
      return dir;
    }
  }
  throw new Error(
    `Could not find SPA HTML. Looked in: ${candidates.join(", ")}. ` +
      "The pages build may have failed before emitting a shell.",
  );
}

const src = findClientDir();
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

for (const name of readdirSync(src)) {
  if (name === "pages") continue;
  cpSync(join(src, name), join(dest, name), { recursive: true });
}

const shell = existsSync(join(dest, "_shell.html"))
  ? join(dest, "_shell.html")
  : join(dest, "index.html");

if (!existsSync(shell)) {
  throw new Error(`No _shell.html or index.html in ${dest}`);
}

copyFileSync(shell, join(dest, "index.html"));
copyFileSync(shell, join(dest, "404.html"));
writeFileSync(join(dest, ".nojekyll"), "");

console.log(`Prepared GitHub Pages from ${src} -> ${dest}`);
