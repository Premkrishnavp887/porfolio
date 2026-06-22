# Portfolio Improvement Plan

Execution order with dependencies. Each phase is self-contained — stop and resume at any phase boundary.

---

## Phase 1 — Content & dead code cleanup

- [ ] **1a**: Fix `resumeUrl` in `profile.json` (currently `""` — Resume buttons do nothing)
- [ ] **1b**: Fill in achievement `year` fields in `achievements.json` (all 9 are `""`)
- [ ] **1c**: Fix Twitter/X social link in `profile.json` (currently `"#"`)
- [ ] **1d**: Update blog post `url` fields in `posts.json` (all 4 link to `"#"`)
- [ ] **1e**: Fix `.env.example` stray trailing quote (`GITHUB_TOKEN=enter your token"`)
- [ ] **1f**: Remove dead SSR files: `src/server.ts`, `src/start.ts`, `src/lib/config.server.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/api/example.functions.ts`
- [ ] **1g**: Uninstall unused deps: `date-fns`, `react-markdown`, `@tanstack/react-start`, `nitro`, `vite-tsconfig-paths`, `@tanstack/router-plugin`
- [ ] **1h**: Fix `vite.config.ts` — replace invalid `resolve: { tsconfigPaths: true }` with proper `vite-tsconfig-paths` plugin import (or remove if redundant)

## Phase 2 — Performance & bundle

- [ ] **2a**: Audit and remove unused shadcn/ui component files (~40 of 46 are unreachable)
- [ ] **2b**: Add `React.lazy()` + `Suspense` to below-fold sections in `index.tsx`: `GitHubStats`, `Achievements`, `WhoAmI`, `Blog`, `Contact`, `Particles`
- [ ] **2c**: Split vendor chunk by framework in `vite.config.ts` (react, framer-motion, tanstack, radix)

## Phase 3 — Real features

- [ ] **3a**: Replace `mailto:` contact form with a Vercel serverless function (`/api/contact`) using Resend or an email relay
- [ ] **3b**: Replace fake GitHub contribution heatmap with real data via GitHub GraphQL API (`contributionsView { contributionCalendar }`)
- [ ] **3c**: Fix `GITHUB_TOKEN` for production — Vite plugin or Vercel proxy so the token isn't exposed in the client bundle

## Phase 4 — SEO

- [ ] **4a**: Generate `sitemap.xml` via `vite-plugin-sitemap`
- [ ] **4b**: Add `robots.txt`
- [ ] **4c**: Add JSON-LD structured data (schema.org `Person`, `Project`, `BlogPosting`)
- [ ] **4d**: Add `og:image` and `twitter:image` meta tags

## Phase 5 — Polish

- [ ] **5a**: Add skip-to-content link for accessibility
- [ ] **5b**: Add `prefers-reduced-motion` checks to `CustomCursor`, ScrollProgress, `card-glow-hover`
- [ ] **5c**: Add focus trap to `CommandPalette`
- [ ] **5d**: Convert `hero-avatar.jpg` to WebP with lazy loading
