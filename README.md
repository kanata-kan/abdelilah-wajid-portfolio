# Abdelilah Wajid — Portfolio

A bilingual portfolio for Abdelilah Wajid, Product Engineer in Marrakech, Morocco. It demonstrates product/engineering judgment through real work, led by YouIn Guest Review.

**Status:** Phase 2 private EN/AR homepage implemented; automated Phase 2 checks passed; owner review and release inputs remain pending. The case study is still a later phase. No site deployment is claimed.

Public repository: `kanata-kan/abdelilah-wajid-portfolio` (`main`). The repository has independent Git history; no application code/history was imported from the old portfolio.

## Start here

For humans:

1. `docs/CURRENT-STATE.md` — current snapshot and next authorized step.
2. `docs/PROJECT-CONTEXT.md` — stable product intent/scope.
3. `docs/OPEN-DECISIONS.md` — only active unresolved choices.

For AI/Codex: follow `AGENTS.md`. Do **not** preload every document; it contains the context router and risk-based workflow.

For Abdelilah's cost-aware Codex workflow, see `docs/CODEX-USAGE.md`.

## Architecture

Pinned project direction: Next.js App Router, React, strict TypeScript, pnpm, Server Components by default, static-first public pages, CSS Modules/frozen tokens, local fonts, typed local content, and repository-owned MDX for the later case study. No CMS/database/general animation framework in v1 without a new decision.

The frozen design package remains under `docs/design/v1.0/05-implementation/` for provenance. Runtime-required contract inputs are mirrored into `src/generated/design-v1/`; application source does not import `docs/` directly. Use `pnpm sync:contract` only after an approved contract revision and `pnpm check:contract` to verify sync/boundary integrity.

Actual compatible versions are pinned in the real repository files. Architecture decisions live in the relevant ADRs.

## Documentation map

- `AGENTS.md` — short always-loaded execution contract and context router
- `docs/CURRENT-STATE.md` — hot current snapshot/index
- `docs/PROJECT-CONTEXT.md` — stable product context
- `docs/SOURCE-OF-TRUTH.md` — authority/conflict rules
- `docs/AI-EXECUTION-GUIDE.md` — MEDIUM/LARGE execution method
- `docs/OPEN-DECISIONS.md` — active unresolved choices only
- `docs/CONTENT-AND-CLAIMS.md` — claims, evidence and attribution
- `docs/SEO-GEO.md` — route/search/indexing contract
- `docs/QA-AND-RELEASE.md` — risk-based QA + full release gates
- `docs/ASSET-MANIFEST.md` — asset provenance/runtime mapping
- `docs/IMPLEMENTATION-ROADMAP.md` — sequence, not authorization
- `docs/PHASE-*-VERIFICATION.md` — cold historical evidence; read only when needed
- `docs/CODEX-USAGE.md` — human model/prompt/session cost guide

Private design/evidence originals remain outside the public Git repository in the owner-controlled reference handoff.

## Local run

From the real repository root with the pinned toolchain:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `/en/` or `/ar/` on the local server. Use the repository's real scripts/verification records for the current exact command set; do not infer a passing check from documentation alone.

## Quality constraints

Preserve approved copy/design/tokens/fonts/RTL and canonical brand assets. Never invent business metrics, adoption, testimonials, project imagery, contact details, production origin or deployment/indexing results.

Public deployment, DNS, spending and other external actions require explicit authorization for the concrete action. Code licensing remains undecided; see `RIGHTS.md`.
