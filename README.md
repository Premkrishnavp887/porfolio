# Portfolio - System Architecture & Engineering Portfolio

An optimized, data-driven software engineering portfolio designed to showcase projects, system design blueprints, and live open-source telemetry. Built on **React 19** and **TanStack Router**, rendered as a client-side static SPA and built with **Bun** for maximum local development speed.

---

## 🏗️ System Architecture & Data Flow

This application decouples content completely from the visual markup using an automated compile-time validation layout pipeline. 

[ JSON Configuration Files ]
│
▼
[ Zod Validation Engine ]  ──(Schema Mismatch)──► [ Fail Compile / Log Crash ]
│
(Type Safe Pass)
▼
[ TanStack Router Engine ]
│
▼
[ Responsive UI Layout Components (Tailwind v4 / Framer Motion) ]


1. **Static Configuration Layer:** Raw textual details (projects, skills, credentials) exist exclusively inside `src/data/*.json`.
2. **Strict Validation Barrier:** At compilation time, all JSON modules are parsed through strict **Zod schemas** inside `src/schemas/`. If an unexpected data structure occurs (e.g., a missing required attribute or a `null` string value), the build system safely fails instantly rather than allowing a broken runtime page crash.
3. **Rendering Engine:** All components render client-side via React 19 `createRoot()`, producing a fully interactive single-page application (SPA) from a static HTML shell.

---

## 🛠️ Complete Tech Stack Matrix

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Core Engine** | `React 19` + `TanStack Router` | Modern React with file-based client-side routing. |
| **Runtime & Build** | `Bun` + `Vite 8` | Extreme performance dependency tracking and asset bundling workflows. |
| **Styling Pipeline** | `Tailwind CSS v4` | Built with the modern native `@tailwindcss/vite` configuration plugin for rapid style parsing. |
| **Fluid Animations** | `Framer Motion` + `tw-animate-css` | Manages global layout shifts and interaction acceleration bounds uniformly. |
| **Data Integrity** | `Zod 3.x` | Runtime and compile-time defensive type-casting and formatting checks. |
| **UI Primitives** | `Radix UI` / `lucide-react` | Fully accessible, semantic component states and crisp icon sets. |

---

## 📡 Live Telemetry & GitHub API Setup

The portfolio handles active authentication headers to securely fetch metrics without exposing sensitive user keys to the public browser client profile.

### Local Environment Setup
To prevent hitting GitHub's unauthenticated API rate-limiting thresholds (60 requests/hr vs 5,000 requests/hr authenticated), create a `.env` file at your project's root:

```env
GITHUB_TOKEN=your_personal_access_token_here
Note: The system reads this token directly into execution headers within src/lib/github.ts and maps the profile name cleanly via z.string().nullable().optional() validation fields.

## 🚀 Engineering Directory Blueprint
Plaintext
├── .env                  # Local secret authentication strings (Git ignored)
├── AGENTS.md             # Persistent engineering log tracking state changes for AI tooling
├── bun.lock              # Native fast dependency synchronization file
├── bunfig.toml           # Strict supply-chain dependency lock guards (24h timeout)
├── components.json       # Structural component mapping configurations
├── dist/                 # Local directory target containing optimized static client assets
├── src/
│   ├── components/
│   │   ├── portfolio/    # Main responsive dashboard layout sections (GitHubStats, Hero, About)
│   │   └── ui/           # Radix primitive styling elements (shadcn core)
│   ├── config/           # Centralized configuration variables (animations, constants)
│   ├── data/             # Content layout parameters (JSON configuration files)
│   ├── routes/           # Core view paths. '__root.tsx' wraps full app structure definitions
│   └── schemas/          # Defensive typed verification schemas (Zod validation blueprints)
└── vite.config.ts        # Modular Vite bundling configurations

## 💻 Local Development Workflow
Ensure your machine has Bun installed cleanly before beginning execution.

1. Installation
Pull project dependencies safely using Bun's native lockfile system:

Bash
bun install
2. Launch Local Dev Node
Boots up the quick-refresh development server with active file-watching capabilities:

Bash
bun run dev
3. Production Compilation Test
Always verify production bundling states locally before committing adjustments online:

Bash
bun run build    # Compiles and minifies assets to dist/client
bun run preview  # Local simulation environment checking the built static output

## 📦 Production Deployment Guidelines
The client-side bundle compiles to static architecture assets under dist/client.

Vercel Deployment Checklist:
Connect your repository to your Vercel workspace account.

Ensure the framework configuration maps these execution settings:

Build Command: bun run build

Output Directory: dist/client

In the project dashboard under Environment Variables, append your token:

Key: GITHUB_TOKEN

Value: your_ghp_personal_access_token

Deploy the pipeline.

📄 License
This system architecture is distributed under the open-source MIT License. Feel free to adapt the component frameworks or validation pipelines for your personal project structures.