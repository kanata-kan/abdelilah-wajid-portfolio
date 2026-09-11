# QA and release gates

Updated: 2026-09-11.

Verification is risk-based during implementation and complete at milestone/release boundaries. `PASS`, `FAIL`, `NOT RUN`, `UNAVAILABLE`, and `BLOCKED` are distinct states.

A local/feature check does not declare a full gate passed. Never claim a skipped/unavailable check passed.

## Verification levels

### LOCAL
For SMALL changes. Verify only the changed surface plus realistic regression risk. Always run `git diff --check`.

Examples: affected viewport for CSS, targeted test/typecheck for logic, affected keyboard flow for menu behavior.

### FEATURE
For MEDIUM changes spanning a feature/several related files. Run the affected subset of the current gate: targeted tests, relevant type/lint/browser checks, and `git diff --check`.

### GATE
For phase completion, owner approval, release candidate, or broad change. Run the complete applicable gate and record evidence.

Before a gate is declared complete, run its full required checks even if incremental checks already passed.

# Gate 0 — Repository and documentation

Use for repository/documentation foundation, not routine app edits.

Full gate:

- required documents/relative links resolve,
- imported brand/design inputs match recorded fingerprints,
- EN/AR key/type parity holds,
- provenance distinguishes originals/reported evidence/missing revisions,
- repository history is independent; no old-repo history, secrets, raw archives or unrelated user files staged,
- unresolved assets/destinations remain explicit.

Run `node scripts/verify-docs.mjs`, `git diff --check`, inspect staged files/status/history, and record limits in `PHASE-0-VERIFICATION.md`.

This gate does not prove missing-source equivalence, website behavior, media playback, or public readiness.

# Gate 1 — Application foundation

Use when foundation/toolchain/configuration is changed or for full foundation re-verification.

Full gate from clean pinned tooling:

`frozen install → generated types (if needed) → typecheck → lint → content/reference validation → build`

Also verify production start, EN/AR initial HTML, `lang`/`dir`, local fonts, canonical SVG loading, unsupported locale 404, and actual dependency/security audit.

CI must use real reproducible checks and safe permissions; an always-successful placeholder test is invalid.

During later phases, rerun only the Gate 1 check affected by the change unless foundation risk is broad.

# Gate 2 — Homepage and interaction

## Content / visual contract
Verify exact approved strings/tokens/fonts/logo/sections, exactly two secondary rows, one H1 and the announced work status when affected. A local section change does not require comparing the entire homepage.

## Responsive
Incremental visual work: test the affected locale + breakpoint and one nearby breakpoint when regression risk exists.

Full Gate 2 approval:

- capture EN + AR at 1024 and 390 after fonts are ready,
- inspect 320, 768, 960 and 1440,
- inspect 599/600 and 959/960 only when the affected CSS uses those transitions.

## Mobile hierarchy
When relevant verify copy + both actions before portrait, intro → figure → reasoning, continuous page, and no board labels/fixed screenshot height.

## RTL
When RTL/shared logical layout is affected verify logical start/end, Arabic wrapping, Latin isolation, directional arrows, and unmirrored artwork/product text.

## Navigation / menu
When affected verify brand home, skip link, section anchors, keyboard traversal, equivalent locale hashes, menu initial/open state, ARIA, focus visibility, selection close, Escape close/focus restore, and no hidden-focus targets/unintended trap.

## Media
For changed media verify genuine source, intended crop/aspect ratio, load success, reserved dimensions, caption and alt. Do not inspect unrelated media.

## Accessibility
Incrementally test only affected concerns. Full Gate 2 includes contrast, 200% text/reflow review, reduced motion, accessible names, touch targets, automated checks and manual keyboard review.

## Runtime / tests
When relevant inspect console/hydration errors, unexpected client fetches, JS impact, and font/image weight. Add focused tests for meaningful logic/flows; do not build a broad testing platform or chase arbitrary coverage.

## Gate 2 approval evidence
Before declaring Gate 2 complete, run the full applicable checks, capture actual browser output and record limits. Up to 1 CSS px track rounding is acceptable; generated-reference defects/font antialiasing are not implementation targets. Private placeholder media does not satisfy its release requirement.

# Gate 3 — Guest Review case study

Run only when Phase 3 is authorized.

Verify EN/AR page layout, paired MDX against the adopted source, page assembly, claims/counts against appropriate evidence, AI/team attribution, source/permission scope, actual media playback, final links/captions, reduced motion and still fallback.

The case study becomes indexable only when actually released; an unresolved/decorative link is not a release.

# Gate 4 — Release candidate

Run only for an actual release candidate.

Resolve release-stage inputs: real secondary captures, final contact/profile destinations, approved case-study paths, host/origin/rollback target and release policy. No empty/fake destinations, mock imagery presented as fact, or false-success contact behavior.

Run a clean production build and critical flow suite. Inspect candidate metadata, hreflang/canonical reciprocity, sitemap, robots, structured data, share images, non-200 paths, redirects, assets and noindex/environment boundaries. Perform manual keyboard/accessibility review.

No known critical/serious accessibility failure or material functional/security failure may remain unresolved.

### Performance diagnostic
Median mobile Lighthouse target: `>= 90` across three consistent runs, recorded with settings. Inspect LCP, layout shifts, interaction responsiveness, JavaScript, images and fonts. Field targets (only with sufficient real data): LCP <= 2.5s, INP <= 200ms, CLS <= 0.1. Never invent field data.

Record commit, screenshots/results, caveats, host/plan, origin, migration map, production requirements and rollback procedure. This gate does not itself authorize a provider, paid plan, DNS change or launch.

# Gate 5 — Authorized launch

Present the concrete release candidate and rollback target. Obtain explicit authorization for the actual publish/DNS/spending action unless that exact action is already specifically authorized.

Release only the reviewed state. After deployment verify production EN/AR, contact destination, 404s, redirects, assets and crawl directives; retain rollback evidence. Enable external webmaster/measurement services only within approved scope.

A green CI run is not deployment. A deployment URL is not proof of indexing. Use website release `v1.0.0` only after the actual site release.

# Recording rules

- **LOCAL:** checks run + result + relevant limitation; no full gate record.
- **FEATURE:** affected feature + relevant checks/result/evidence + blocker/limit.
- **GATE:** gate, commit, date, environment/tool versions, checks, status, evidence location, limitations, reviewer/owner decision and next action.

Update `CURRENT-STATE.md` only when the result materially changes durable project state.

# Efficiency rules

Prefer the narrowest verification that can catch a realistic regression.

Do not routinely rerun complete gates, unchanged screenshots/locales/breakpoints, full builds, bundle inspections, or old evidence. Expand verification when risk expands; run the full applicable gate before milestone approval/release.
