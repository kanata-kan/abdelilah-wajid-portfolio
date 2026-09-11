# ADR-001 — Application foundation

Date: 2026-09-08. Updated: 2026-09-11. Status: **implemented and verified**.

## Decision

Use a standalone Next.js App Router application with React, strict TypeScript and pnpm.

Default to:

- Server Components for page/content rendering,
- small Client Components only for real interaction,
- static-first public pages,
- CSS Modules plus the adopted design contract,
- local Inter and IBM Plex Sans Arabic fonts,
- local typed bilingual content,
- repository-owned trusted MDX when the case study is authorized.

Do not introduce a CMS, database, backend contact form, monorepo, Tailwind, UI kit or animation framework without a new product/architecture decision.

The old portfolio repository is not a code, asset, architecture or Git-history dependency.

## Verified toolchain

The compatible pinned baseline is:

| Tool | Version |
| --- | --- |
| Node.js | 24.20.0 |
| pnpm | 12.3.4 |
| Next.js | 16.3.4 |
| React / react-dom | 19.2.8 |
| TypeScript | 6.0.3 |
| ESLint | 9.39.5 |
| eslint-config-next | 16.3.4 |

The first strict compatibility check rejected the then-latest TypeScript 7 / ESLint 10 combination because the installed Next lint stack did not support those majors. No peer ranges were bypassed. Historical compatibility evidence belongs in [Phase 1 verification](../PHASE-1-VERIFICATION.md) and [toolchain.json](../provenance/toolchain.json), not in routine execution context.

## Source and runtime boundary

The recovered design package under `docs/design/v1.0/05-implementation/` is an **immutable contract/provenance source**, not the application layer.

Runtime code must not import `docs/` directly.

Runtime-required contract files are copied byte-for-byte into:

`src/generated/design-v1/`

using:

`node scripts/sync-runtime-contract.mjs`

The generated runtime copy currently contains:

- EN/AR content JSON,
- navigation/action link JSON,
- the five required WOFF2 font files.

The numeric CSS contract is adapted deterministically into `src/styles/layout.generated.css` by `scripts/prepare-layout.mjs`, removing only the reference `fonts.css` import because fonts are loaded once through `next/font/local`.

`pnpm check:contract` verifies the runtime mirror, generated CSS and the rule that `src/` does not depend on `docs/` directly.

Tests and verification scripts may intentionally read the frozen `docs/` contract to compare application output against the authoritative baseline.

Generated runtime files are not edited manually. An approved design/content revision changes the canonical contract first, then the runtime mirror is regenerated and verified.

## Application boundaries

```text
src/app/[locale]/              locale layout and homepage
src/components/                reusable semantic/interaction components
src/generated/design-v1/       generated runtime mirror of frozen contract inputs
src/lib/i18n/                  locale registry and typed dictionaries
src/lib/seo/                   metadata/origin derivation
src/styles/                    local fonts, base styles and generated layout CSS
public/                        approved runtime/public assets only
docs/                          decisions, evidence, provenance and frozen contract
```

Unknown locales/routes return a real 404. Core prose remains local/server-rendered. Future MDX routes must use an explicit finite registry rather than user-controlled dynamic imports.

## Consequences

This keeps the application layer understandable without sacrificing traceability to the approved design package. It adds a small generated mirror, but drift is machine-checked and the frozen originals remain untouched.

Static-first is a rendering strategy, not a hosting-provider or `output: export` decision. Hosting, production origin and release policy remain separate staged decisions.

## Verification

Use the real repository scripts. Do not infer that a build/test passed from this ADR. Current implementation status and authorization live in [CURRENT-STATE](../CURRENT-STATE.md); staged QA lives in [QA-AND-RELEASE](../QA-AND-RELEASE.md).
