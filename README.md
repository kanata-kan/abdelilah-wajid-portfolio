# Abdelilah Wajid — Portfolio

A new portfolio for Abdelilah Wajid, Product Engineer in Marrakech, Morocco. The site will explain his product decisions, engineering work and verification through real work, led by YouIn Guest Review.

**Status: Phase 0 documentation and repository foundation. There is no website application, deployment or application test result yet.** This repository starts with a new Git history; no application code or history was imported from the previous portfolio.

English is the primary site language. Arabic is a complete second locale with genuine RTL layout. The adopted homepage design and exact bilingual copy are preserved as versioned contracts.

## Start here

1. Read [AGENTS.md](AGENTS.md), [project context](docs/PROJECT-CONTEXT.md) and [current state](docs/CURRENT-STATE.md).
2. Use [source authority](docs/SOURCE-OF-TRUTH.md) to resolve references and conflicts.
3. Check [open decisions](docs/OPEN-DECISIONS.md) and the [implementation roadmap](docs/IMPLEMENTATION-ROADMAP.md) before extending scope.

For Abdelilah: هاد الريبو كيجمع المرجع التقني وقواعد التصميم والإثبات. الكود ديال الموقع ما بداش؛ النواقص والحدود موثقة بوضوح قبل المرحلة التالية.

## Architecture direction

Next.js stable at implementation start, React, strict TypeScript, pnpm, App Router, Server Components by default, static-first public pages, CSS Modules and frozen tokens, local fonts, typed local content and repository-owned MDX for the case study. No CMS, database, monorepo or general animation framework in v1.

The dated version selection is in [ADR-001](docs/architecture/ADR-001-foundation.md). These are recorded targets, not installed dependencies. Exact compatible versions and the real lockfile belong to the first application foundation commit.

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

## Run the current check

With Node.js available, from the repository root:

```sh
node scripts/verify-docs.mjs
git diff --check
```

The check validates document links, required files, imported-file hashes and EN/AR content shape. It does not test a website. There is deliberately no `pnpm dev`, `build`, `lint`, `typecheck` or CI workflow yet; [Phase 1](docs/IMPLEMENTATION-ROADMAP.md) adds real commands and runs them from a clean clone.

## Quality and constraints

Preserve the original SVG wordmark, exact content, design tokens, responsive order and font files. Do not invent business metrics, client adoption, testimonials, project imagery or contact details. The case study must distinguish Abdelilah's decisions, implementation direction and manual QA from AI assistance and team review.

Production portrait, secondary project captures, final destinations, source-version reconciliation and deployment choices remain tracked inputs. Public deployment, DNS changes and spending require explicit authorization. No production URL, screenshot or passing application badge is displayed as proof before it exists.

Code licensing is undecided. [Rights and attribution](RIGHTS.md) separates code, personal brand, third-party product material and font licenses.
