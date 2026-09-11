# Execution contract

Always-loaded rules. Fetch detailed context only when needed.

## Scope and task size

Use the **smallest safe investigation and smallest correct change**. Do not turn a local request into a repo audit, redesign, refactor, polish/docs sweep, or later phase. Expand scope only when the root cause requires it.

- **SMALL** — local copy/style/asset/type/component or one narrow behavior.
- **MEDIUM** — one feature / several related files; runtime/data flow matters.
- **LARGE** — architecture, route/SEO policy, public claims, cross-feature refactor, milestone/release, or phase change.

## Context router

| Need | Read |
| --- | --- |
| phase / authorization / next step | `docs/CURRENT-STATE.md` |
| stable product scope | `docs/PROJECT-CONTEXT.md` |
| source conflict | `docs/SOURCE-OF-TRUTH.md` |
| claims / attribution | `docs/CONTENT-AND-CLAIMS.md` |
| routes / SEO / GEO | `docs/SEO-GEO.md` |
| unresolved choices | `docs/OPEN-DECISIONS.md` |
| media provenance | `docs/ASSET-MANIFEST.md` |
| QA / release | relevant `docs/QA-AND-RELEASE.md` section |
| architecture | relevant ADR only |
| historical proof | relevant `docs/PHASE-*-VERIFICATION.md` only |

Context budget:

- **SMALL:** touched files only; `CURRENT-STATE` only if scope/phase matters.
- **MEDIUM:** `CURRENT-STATE` + minimum specialist source.
- **LARGE:** `CURRENT-STATE` + `PROJECT-CONTEXT`; add only required ADR/source/specialist sections.

For large docs, find the heading/keyword and read that section only. Do not recursively follow links or reread unchanged context.

## Hard invariants

- Latest explicit owner request controls scope; roadmap/backlog is not permission.
- No new phase, publish/deploy, DNS, spending, client message, or external action without explicit authorization for that action.
- Preserve approved EN/AR copy, section order, tokens, responsive rules, local fonts and canonical brand assets unless explicitly revised.
- EN `/en/` is LTR; AR `/ar/` is real RTL. Preserve semantic DOM order, logical CSS and unmirrored brand/product imagery.
- Never invent metrics, adoption, testimonials, revenue, destinations, production origin, project proof, or successful form behavior.
- Keep the existing Next.js/React/strict TypeScript/pnpm/App Router/static-first architecture. No CMS/database/Tailwind/animation framework/new dependency by default.
- `docs/design/v1.0/05-implementation/` is frozen source; `src/generated/design-v1/` is the checked runtime mirror. Never hand-edit generated mirrors or import `docs/` from application source.
- Preserve unrelated changes and secrets. Report a discovered secret's location/risk without repeating its value.

## Execution and QA

- **SMALL:** `Discovery → Implementation → Targeted QA`
- **MEDIUM:** `Discovery → Investigation → Decision → Implementation → Targeted QA`
- **LARGE:** `Discovery → Investigation → Architecture/Decision → Small Plan → Small Phases → QA/Validation`

Use `docs/AI-EXECUTION-GUIDE.md` for MEDIUM/LARGE/ambiguous work. Investigate only the relevant runtime/data/browser path; no opportunistic “while here” fixes. Missing input blocks only the affected branch.

Verification:

- **SMALL:** narrowest relevant check + `git diff --check`.
- **MEDIUM:** affected tests/type/lint/browser checks + `git diff --check`.
- **LARGE / milestone / release:** complete applicable QA gate.

Do not repeat full builds/browser matrices/screenshots after every local edit unless risk requires it. Never report skipped/unavailable/failed checks as passed.

Update `docs/CURRENT-STATE.md` only for durable state changes, not routine fixes. Do not auto-commit every edit; when committing, inspect exact staged files and keep commits truthful/focused.

Reply in Arabic/Darija first; routine report: **result → checks/evidence → relevant limit → next step**.

## Next.js docs

When the generated rule below requires framework docs, read only the smallest relevant guide/section and reuse it within the same task.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
