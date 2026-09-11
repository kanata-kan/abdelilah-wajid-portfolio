# Implementation roadmap

Updated: 2026-09-11.

A roadmap describes sequence; it never grants permission. Current authorization is always `CURRENT-STATE.md`.

| Phase | Output | Status / exit gate |
| --- | --- | --- |
| 0 — Documentation | Independent repo, contracts, ADRs, provenance, guidance and real Git history | Completed/verified; historical limits recorded |
| 1 — Application foundation | Pinned toolchain, strict TS/Next shell, EN/AR routes, fonts/assets, metadata, tests/CI | Completed/verified |
| 2 — Homepage | Adopted EN/AR sections, navigation/menu, real/private-preview media, targeted/full QA | Implemented; automated Gate 2 checks passed; owner review/targeted fixes continue |
| 3 — Guest Review proof | Reviewed EN/AR case-study template/MDX, evidence/media, precise attribution | Not authorized yet; requires Phase 3 owner request |
| 4 — Release QA | Real release inputs, host/origin, migration/crawler policy, accessibility/performance review | Future; all release blockers resolved and candidate/rollback ready |
| 5 — Launch | Specifically authorized deployment/migration + production verification | Future; actual production paths verified |
| 6 — Learn | Review real technical/search/inquiry evidence after launch | Future; no outreach/automation implied |

## Current working rule

While Phase 2 remains active, prefer targeted visual/behavior fixes and proportional QA. Do not start Phase 3, provider setup, deployment, DNS, analytics, outreach, or release work because it appears later in this roadmap.

Resolve only the open decision that the current task actually touches. Release-stage inputs do not block unrelated private Phase 2 work.

## Implementation slices

For future authorized work, keep slices small and truthful: investigate → decide → implement the smallest complete change → targeted QA → gate verification at milestone boundary.

Avoid one huge generated commit and avoid meaningless “fix/final” commit chains. Keep the old production deployment recoverable until release authority is explicit.
