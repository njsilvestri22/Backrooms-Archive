# The Liminal Archive

An interactive Backrooms field manual: analog-horror photographs, a numbered catalog, and a recovered M.E.G. binder.

Cluster I complete through Level 999, plus enigmatics, negatives, entities, objects, groups, phenomena, and persons of interest.

**Live site (GitHub Pages):** [https://njsilvestri22.github.io/Backrooms-Archive/](https://njsilvestri22.github.io/Backrooms-Archive/)

## What it is

The Liminal Archive compiles the Backrooms as the internet actually told them: the 2019 4chan copypasta, the wiki's numbered hell, and Kane Pixels' analog tear. Nothing here is official. Everything here has been walked.

- Noclip intro (the original copypasta)
- Catalog of levels, entities, objects, groups, phenomena, and persons
- List / card views, class and cluster filters, search (`Ctrl/Cmd+K`), Wander
- Survival field manual and origins timeline
- Optional fluorescent-hum audio

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints.

```bash
npm run typecheck
npm run build
```

## GitHub Pages

The default `npm run build` is a Vercel SSR bundle. GitHub Pages is static-only, so this repo also has a separate SPA export:

```bash
npm run build:pages
```

That emits `dist/pages` (SPA shell as `index.html` + `404.html`, plus `.nojekyll`). GitHub Actions deploys it on every push to `main`.

**One-time switch in the GitHub UI** (required the first time):

1. Open [Settings → Pages](https://github.com/njsilvestri22/Backrooms-Archive/settings/pages)
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Save. The next (or current) Actions run publishes the site.

After that, the archive is at:

[https://njsilvestri22.github.io/Backrooms-Archive/](https://njsilvestri22.github.io/Backrooms-Archive/)

You can also click **Actions → GitHub Pages → Run workflow** to republish without a new commit.

### Vercel (optional, full SSR)

Import this same repo in Vercel. The default `npm run build` already targets Vercel, so no extra config is needed.

## Stack

TanStack Start, React 19, Tailwind v4, Zustand (bookmarks / visited / audio in `localStorage`). No accounts. No database.

## Canons

The wiki is not Kane Pixels. Kane Pixels is not the copypasta. Multiple canons coexist on purpose.
