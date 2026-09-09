# Abdelilah Wajid — Portfolio

A new portfolio for Abdelilah Wajid, Product Engineer in Marrakech, Morocco. The site will explain his product decisions, engineering work and verification through real work, led by YouIn Guest Review.

**Status: Phase 1 application foundation.** `/en/` and `/ar/` provide a private, pre-rendered bilingual shell with original identity/fonts. The complete homepage and case study belong to later phases. There is no deployment. See the dated [verification record](docs/PHASE-1-VERIFICATION.md) for checks and limits. This repository has independent Git history; no application code or history was imported from the previous portfolio.

Public repository: [kanata-kan/abdelilah-wajid-portfolio](https://github.com/kanata-kan/abdelilah-wajid-portfolio), created with the owner's explicit authorization on September 9, 2026. The default branch is `main`.

English is the primary site language. Arabic is a complete second locale with genuine RTL layout. The adopted homepage design and exact bilingual copy are preserved as versioned contracts.

## Start here

1. Read [AGENTS.md](AGENTS.md), [project context](docs/PROJECT-CONTEXT.md) and [current state](docs/CURRENT-STATE.md).
2. Use [source authority](docs/SOURCE-OF-TRUTH.md) to resolve references and conflicts.
3. Check [open decisions](docs/OPEN-DECISIONS.md) and the [implementation roadmap](docs/IMPLEMENTATION-ROADMAP.md) before extending scope.

For Abdelilah: الأساس التقني ديال اللغتين موجود. افتح `/ar/` أو `/en/` محلياً؛ الصفحة الرئيسية الكاملة باقية للمرحلة الثانية، والنشر ما تدارش.

## Architecture direction

Next.js stable at implementation start, React, strict TypeScript, pnpm, App Router, Server Components by default, static-first public pages, CSS Modules and frozen tokens, local fonts, typed local content and repository-owned MDX for the case study. No CMS, database, monorepo or general animation framework in v1.

Actual compatible versions are pinned in `package.json`, `.node-version` and `pnpm-lock.yaml`: Node 24.20.0, pnpm 12.3.4, Next 16.3.4, React 19.2.8, TypeScript 6.0.3 and ESLint 9.39.5. [ADR-001](docs/architecture/ADR-001-foundation.md) records the compatibility decision.

## Repository map

```text
AGENTS.md                         short execution rules
assets/brand/                     canonical logo, source paths and selected icons
docs/
  architecture/                   three decision records
  design/v1.0/05-implementation/   exact imported copy, tokens, layout and fonts
  provenance/                     source and import fingerprints
  PROJECT-CONTEXT.md              purpose, scope and decision history
  CURRENT-STATE.md                dated execution handoff
  SOURCE-OF-TRUTH.md              authority and recovery rules
  OPEN-DECISIONS.md               owners, consequences and resolution gates
  CONTENT-AND-CLAIMS.md           evidence, attribution and content rules
  SEO-GEO.md                     locale URLs, discoverability and migration
  QA-AND-RELEASE.md               phased checks and release authority
  AI-EXECUTION-GUIDE.md           working procedure and context checks
  IMPLEMENTATION-ROADMAP.md       small phases with acceptance criteria
  ASSET-MANIFEST.md               readiness and exact asset mapping
  PHASE-0-VERIFICATION.md         verification evidence and limits
scripts/verify-docs.mjs            dependency-free reference integrity check
```

Full design boards, original guides, project snapshots and Guest Review evidence are in the separate local `portfolio-reference-materials` handoff, outside this Git repository. A clone does not include those private references. The source guide explains how to restore them before visual implementation.

## Run locally

With Node 24.20.0 and pnpm 12.3.4, from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://127.0.0.1:3000/en/` or `http://127.0.0.1:3000/ar/`. `/` intentionally has no route while D02 is unresolved. The preview locale controls are foundation utilities, not the finished homepage header/menu.

On this Windows workspace, pinned tools are also installed under ignored `.local/toolchain`. Run `node scripts/pnpm-local.mjs dev` or replace `dev` with any pnpm command. This avoids changing global tools or PowerShell policy. To restore the optional local tools:

```powershell
npm.cmd install --prefix .local/toolchain --no-save --package-lock=false node@24.20.0 pnpm@12.3.4
node scripts/pnpm-local.mjs install --frozen-lockfile
node scripts/pnpm-local.mjs check
```

`pnpm check` runs generated types, strict typecheck, lint, source/runtime-asset checks, five focused Node tests, production build and an HTTP smoke test that starts/stops its own server. `pnpm audit --json` checks installed packages against registry advisories. CI runs the same gate with read-only permissions; a workflow file alone is not a hosted CI result.

No environment variables are required locally. Optional `SITE_ORIGIN` must be a verified HTTPS origin; unset means canonical/alternate/OG URLs are omitted. Phase 1 is always noindex, has an empty sitemap and blocks crawlers in robots.txt. An origin alone cannot enable publication/indexing. These measures are not access control; the server binds to loopback by default.

Dictionaries and layout tokens import the frozen contracts directly. `src/` contains the app shell, locale registry, metadata and local-font loading; `public/` contains only four approved identity/icon assets. Case-study MDX and interaction suites are staged with the later pages/flows they test.

## Quality and constraints

Preserve the original SVG wordmark, exact content, design tokens, responsive order and font files. Do not invent business metrics, client adoption, testimonials, project imagery or contact details. The case study must distinguish Abdelilah's decisions, implementation direction and manual QA from AI assistance and team review.

Production portrait, secondary project captures, final destinations, source-version reconciliation and deployment choices remain tracked inputs. Public deployment, DNS changes and spending require explicit authorization. No production URL, screenshot or passing application badge is displayed as proof before it exists.

Code licensing is undecided. [Rights and attribution](RIGHTS.md) separates code, personal brand, third-party product material and font licenses.
