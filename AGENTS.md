# AGENTS.md — astro-byte-zen

## What this is

Client-side static Single Page Application (SPA) built with React 19. **Not Astro** despite the repo name. Zero SSR — all rendering happens on the client after an empty HTML shell loads. Data-driven — most content lives in JSON files under `src/data/`.

## Quick start

```bash
bun install        # install deps (bun; npm-lock also present but bun is primary)
bun run dev        # dev server with HMR
bun run build      # production build (outputs to dist/client/)
bun run preview    # preview production build
bun run lint       # ESLint (typescript-eslint + react-hooks + prettier)
bun run format     # Prettier (printWidth 100, double quotes, trailing commas all)
```

No test runner configured.

## Architecture

- **Routing**: via TanStack Router, initialized by `getRouter()` from `src/router.tsx` and mounted through standard React 19 / ReactDOM client-side roots. Uses file-based route definitions in `src/routes/`. Currently has `/` (index) and `/projects/$slug`. The `__root.tsx` layout wraps all pages; keep `<Outlet />` intact.
- **Data layer**: `src/data/*.json` → parsed at build time via Zod schemas in `src/schemas/*.schema.ts` → re-exported from `src/data/index.ts`. Change content by editing JSON files, not components.
- **Components**: shadcn/ui primitives in `src/components/ui/`, portfolio sections in `src/components/portfolio/`, project detail in `src/components/project/`.
- **Entry point**: `index.html` at the project root loads `src/main.tsx`, which calls `getRouter()` and mounts the app via `createRoot()` from `react-dom/client`.
- **Deployment**: Static export via Vite 8. Vercel is configured with the "Vite/Other" framework preset pointing at `dist/client`.

## Stack

| Layer           | Choice                                                          |
| --------------- | --------------------------------------------------------------- |
| Framework       | React 19                                                       |
| Build           | Vite 8 + `@vitejs/plugin-react` + `@tailwindcss/vite`           |
| Styling         | Tailwind CSS v4 (`@tailwindcss/vite` plugin) + `tw-animate-css` |
| UI              | shadcn/ui (new-york style), lucide-react, framer-motion, sonner |
| Validation      | Zod                                                             |
| Lint            | ESLint (typescript-eslint recommended) + Prettier               |
| Package manager | Bun (primary; has 24h supply-chain guard in `bunfig.toml`)      |

## Conventions

- **Path alias**: `@/` → `src/` (configured in tsconfig.json and vite).
- **CSS**: Tailwind v4 utility-first. `@theme inline` + `@utility` blocks in `src/styles.css`. Theme is dark-first with a light variant via `.light` class on `<html>`.
- **Theme**: `dark`/`light`/`system` persisted to localStorage key `astro-portfolio-theme`. An inline script in `index.html` prevents flash.
- **React Refresh**: components should have stable export names (warn-only rule).
- **JSON data** files are validated by Zod schemas at import time. Add new fields to both the JSON and the corresponding schema.
- **`routeTree.gen.ts`** is in `.prettierignore` — don't format or edit manually.
- **Framer Motion** durations/springs/easing are centralized in `src/config/animationConfig.ts`.

## Important files

| File                        | Purpose                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| `src/routes/__root.tsx`     | App shell — 404, error boundary, theme, QueryClient, `<Outlet />` |
| `src/routes/index.tsx`      | Single-page portfolio root (Hero → Contact sections)              |
| `src/data/index.ts`         | Central data re-export (all JSON parsed through Zod)              |
| `vite.config.ts`            | Minimal — Vite config with `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths` |
| `src/main.tsx`              | Client entry — calls `getRouter()`, mounts `<RouterProvider>` via `createRoot` |
| `src/router.tsx`            | Router factory — `getRouter()` creates TanStack Router instance   |
| `src/config/themeConfig.ts` | Theme constants (storage key, supported themes)                   |
| `src/lib/config.server.ts`  | Server-only config pattern reference                              |

## Changelog

### 2026-06-17 — SSR-to-SPA migration

- **Architecture**: Migrated from TanStack Start / Nitro SSR to a fully client-side static SPA. Removed server entry points (`src/server.ts`, `src/start.ts`) and server-only code conventions. Entry point is now `index.html` → `src/main.tsx`, with router initialized via `getRouter()` from `src/router.tsx`.
- **Build**: Upgraded to Vite 8 (was Vite 7). Output directory changed from `dist/, .output/` to `dist/client/`.
- **Deployment**: Vercel now uses the "Vite/Other" static framework preset targeting `dist/client` instead of Nitro SSR.

### 2026-06-17 — Structural updates

- **Data & Schema**: Updated the achievements Zod enum schema parameter from `'Certification'` to `'Certificate'` to align with runtime datasets.
- **UI Branding**: Cleaned out raw bash terminal symbols (`~/` and `$`) from the Hero layout, changing them to explicit labels: `"Place: Ernakulam, Kalady, India"` and `"Current Status: DevOps Intern at SAM Corporate"`.
- **GitHub Integration**: Configured fetch request headers in `src/lib/github.ts` to read `process.env.GITHUB_TOKEN` securely. Made the profile schema robust against null values by changing the name field validator to `z.string().nullable().optional()`.
- **Grid Layout**: Restructured `src/components/portfolio/GitHubStats.tsx` to stack the Contribution activity board on top (`w-full`) and display repository components in a 2-column responsive grid below it, eliminating empty vertical whitespace.
