# AGENTS.md — astro-byte-zen

## What this is

TanStack Start (React) single-page portfolio app. **Not Astro** despite the repo name. SSR via Nitro/h3. Data-driven — most content lives in JSON files under `src/data/`.

## Quick start

```bash
bun install        # install deps (bun; npm-lock also present but bun is primary)
bun run dev        # dev server with HMR
bun run build      # production build (outputs to dist/, .output/)
bun run preview    # preview production build
bun run lint       # ESLint (typescript-eslint + react-hooks + prettier)
bun run format     # Prettier (printWidth 100, double quotes, trailing commas all)
```

No test runner configured.

## Architecture

- **Routing**: file-based in `src/routes/` via TanStack Router. `routeTree.gen.ts` is auto-generated — do not edit. Currently has `/` (index) and `/projects/$slug`. The `__root.tsx` layout wraps all pages; keep `<Outlet />` intact.
- **Data layer**: `src/data/*.json` → parsed at build time via Zod schemas in `src/schemas/*.schema.ts` → re-exported from `src/data/index.ts`. Change content by editing JSON files, not components.
- **Components**: shadcn/ui primitives in `src/components/ui/`, portfolio sections in `src/components/portfolio/`, project detail in `src/components/project/`.
- **Server entry**: `src/server.ts` wraps TanStack Start's SSR with error capture (h3 swallows handler throws into JSON 500s). `src/start.ts` adds request middleware with error boundaries.
- **Server-only code**: files named `*.server.ts` (e.g. `src/lib/config.server.ts`) are excluded from the client bundle. Env vars must be read inside request handlers, not at module scope (Cloudflare Workers bind at request time).

## Stack

| Layer           | Choice                                                          |
| --------------- | --------------------------------------------------------------- |
| Framework       | React 19 + TanStack Start                                       |
| Build           | Vite 7 + `@lovable.dev/vite-tanstack-config`                    |
| Styling         | Tailwind CSS v4 (`@tailwindcss/vite` plugin) + `tw-animate-css` |
| UI              | shadcn/ui (new-york style), lucide-react, framer-motion, sonner |
| Validation      | Zod                                                             |
| Lint            | ESLint (typescript-eslint recommended) + Prettier               |
| Package manager | Bun (primary; has 24h supply-chain guard in `bunfig.toml`)      |

## Conventions

- **Path alias**: `@/` → `src/` (configured in tsconfig.json and vite).
- **CSS**: Tailwind v4 utility-first. `@theme inline` + `@utility` blocks in `src/styles.css`. Theme is dark-first with a light variant via `.light` class on `<html>`.
- **Theme**: `dark`/`light`/`system` persisted to localStorage key `astro-portfolio-theme`. An inline script in `__root.tsx` prevents flash.
- **Imports**: no `server-only` package (TanStack Start uses `*.server.ts` convention instead) — ESLint blocks it.
- **React Refresh**: components should have stable export names (warn-only rule).
- **JSON data** files are validated by Zod schemas at import time. Add new fields to both the JSON and the corresponding schema.
- **`routeTree.gen.ts`** is in `.prettierignore` — don't format or edit manually.
- **Framer Motion** durations/springs/easing are centralized in `src/config/animationConfig.ts`.

## Important files

| File                        | Purpose                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| `src/routes/__root.tsx`     | App shell — 404, error boundary, theme, QueryClient, `<Outlet />` |
| `src/routes/index.tsx`      | Single-page portfolio root (Hero → Contact sections)              |
| `src/server.ts`             | SSR error wrapper — entrypoint for Nitro build                    |
| `src/start.ts`              | TanStack Start instance with error middleware                     |
| `src/data/index.ts`         | Central data re-export (all JSON parsed through Zod)              |
| `vite.config.ts`            | Minimal — `@lovable.dev/vite-tanstack-config` handles most setup  |
| `src/config/themeConfig.ts` | Theme constants (storage key, supported themes)                   |
| `src/lib/config.server.ts`  | Server-only config pattern reference                              |

## Changelog

### 2026-06-17 — Structural updates

- **Data & Schema**: Updated the achievements Zod enum schema parameter from `'Certification'` to `'Certificate'` to align with runtime datasets.
- **UI Branding**: Cleaned out raw bash terminal symbols (`~/` and `$`) from the Hero layout, changing them to explicit labels: `"Place: Ernakulam, Kalady, India"` and `"Current Status: DevOps Intern at SAM Corporate"`.
- **GitHub Integration**: Configured fetch request headers in `src/lib/github.ts` to read `process.env.GITHUB_TOKEN` securely. Made the profile schema robust against null values by changing the name field validator to `z.string().nullable().optional()`.
- **Grid Layout**: Restructured `src/components/portfolio/GitHubStats.tsx` to stack the Contribution activity board on top (`w-full`) and display repository components in a 2-column responsive grid below it, eliminating empty vertical whitespace.
