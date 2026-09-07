import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static SPA build for GitHub Pages. Isolated from vite.config.ts so the
 * default Vercel/Nitro SSR pipeline stays untouched.
 *
 * Repo is a project site: https://njsilvestri22.github.io/Backrooms-Archive/
 * Override with PAGES_BASE=/ if you later move this to a custom domain or a
 * user/org site (username.github.io).
 */
const pagesBase = process.env.PAGES_BASE || "/Backrooms-Archive/";

export default defineConfig({
  base: pagesBase.endsWith("/") ? pagesBase : `${pagesBase}/`,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    viteReact(),
  ],
});
