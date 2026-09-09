# QA and release gates

Updated: 2026-09-09. An item is verified only when its actual result is recorded with commit, date, environment and evidence. Not run, unavailable and failed are distinct states. Do not mark a future checklist complete because a source package passed its own validation.

## Gate 0 — Repository and documentation

- Required documents exist; relative document links resolve.
- Imported brand/design inputs match original hashes; EN/AR keys and value types agree.
- Provenance distinguishes available originals, reported evidence and missing exact revisions.
- New Git root/history, no old-repo history, secrets, raw archive or unrelated user files staged.
- All null assets/destinations have an owner and stage; the historical Phase 0 scope did not authorize application work; the latest owner request now authorizes Phase 1 only.
- Run `node scripts/verify-docs.mjs`, `git diff --check`, inspect staged files and final history/status. Record limitations in [PHASE-0-VERIFICATION](PHASE-0-VERIFICATION.md).

This gate does not prove exact `(1)` source equivalence, website behavior, media playback or public readiness. D01 must be reconciled before declaring the latest-source intake complete.

## Gate 1 — First application foundation

After explicit Phase 1 authorization and required source reconciliation, pin actual compatible runtime/package versions and generate the lockfile. Create genuine scripts and a CI workflow in that phase. No passing badge until a real run exists; no production deployment action or secret required for CI.

From a clean dependency installation with the pinned toolchain (the current owner request prohibits another clone): frozen-lockfile install → generated types where needed → `pnpm typecheck` → `pnpm lint` → content/reference validation → `pnpm build`. Verify production start, EN/AR initial HTML, locale root attributes, local font requests, SVG loading and unknown-locale 404. Record package/security audit results against the actual installed versions and resolve material production risks.

Use read-only CI permissions, reproducible tooling and no untrusted pull-request secrets. Select current supported CI actions when creating the workflow; no hosted-account setting is assumed already enabled. Do not use an empty test command that always succeeds.

## Gate 2 — Homepage and interaction

| Path / risk | Required checks |
| --- | --- |
| Content and visual contract | Exact strings, tokens, local fonts, original logo, required sections, two secondary rows, one H1 and one announced work status |
| Responsive | EN + AR screenshots at 1024 and 390 after `document.fonts.ready`; inspect 320, 768, 960 and 1440; also 599/600 and 959/960 transitions when affected |
| Mobile hierarchy | Copy + both actions before portrait; intro → figure → reasoning; continuous page; no board labels or fixed screenshot height |
| RTL | Correct logical start/end, Arabic wrapping, Latin isolation, directional arrows; unmirrored artwork and product text |
| Navigation | Brand home, skip link, every section anchor, keyboard traversal, both locale directions with equivalent hash |
| Menu | Closed initially; open state and aria attributes; visible focus; selection closes; Escape closes and restores toggle focus; no hidden-focus targets or focus trap |
| Media | Genuine source, correct crop/aspect ratio, no broken assets, reserved dimensions; source-specific caption and alt |
| Accessibility | Contrast, 200% text zoom, reduced motion, accessible names and touch targets; automated checks plus manual keyboard review |
| Runtime | No relevant console/hydration error; no unexpected client fetch for main content; inspect shipped JavaScript and unnecessary font/image weight |

Introduce focused unit tests for meaningful logic such as route generation, invalid locales and content validation when implemented. Introduce Playwright for navigation, locale switching, CTA and menu flows when those flows exist. Do not build a broad testing platform or chase arbitrary coverage percentages.

Capture actual browser output for approval. Up to 1 CSS px track rounding is allowed, not arbitrary layout drift. Generated reference defects and font antialiasing are not implementation goals. Missing real assets may stay explicitly labeled in private previews; that does not pass the release gate.

## Gate 3 — Case study

Review the new page layout in EN/AR. Compare paired MDX with S09 and recorded page assembly. Verify claims, historical counts against primary references, AI/team attribution, source/permission scope and real media playback. Confirm final links, captions, reduced-motion behavior and a still fallback. Ensure the case study is a real indexable page only when released, not a decorative dead link.

## Gate 4 — Release candidate

Resolve all release-stage open decisions. Obtain the approved portrait, real secondary captures, final contact/profile destinations and approved case-study paths. No placeholder alt presenting mock imagery as fact, no empty `href`, fake address or false-success contact flow. For contact, verify the correct destination and meaningful behavior; sending a real message requires its own explicit authorization.

Re-run a clean production build and critical flow suite. Inspect generated and deployed candidate metadata, hreflang/canonical reciprocity, sitemap, robots, structured data, share image URLs, non-200 paths and redirect map. Test assets, noindex/environment boundaries and keyboard/accessibility manually. No known critical/serious accessibility failures or unresolved material functional/security failures.

Performance target: median mobile Lighthouse Performance >=90 across three consistent runs is an internal diagnostic, not the sole acceptance criterion. Record settings and inspect LCP element, layout shifts, interaction responsiveness, JavaScript, images and fonts. Field targets at the 75th percentile are LCP <=2.5s, INP <=200ms, CLS <=0.1 by device class, only when enough field data exists. [Web Vitals](https://web.dev/articles/vitals), checked 2026-09-09.

Record commit, screenshots/results, remaining caveats, host/plan, origin, migration map, production environment requirements and rollback procedure. No final provider, paid plan, DNS record or site connection is approved by this document.

## Gate 5 — Authorized launch

Present the concrete release candidate and rollback target to Abdelilah. Obtain explicit authorization for the actual publishing/DNS/spending action, preserving any already granted specific authority. Release only that reviewed state. Recheck production EN/AR, contact destination, 404s, redirects, assets and crawl directives after deployment; retain rollback evidence. Enable external webmaster/measurement services only within their authorized scope.

A green CI run is not deployment or verification. A deployment URL is not proof of indexing. Label site release `v1.0.0` only after its actual release; design package v1.0.0 and Phase 0 documents are not that site release.

## Result record

For each gate store: commit, date, environment/tool versions, checks run, pass/fail/not-run, evidence location, limitation, reviewer/owner decision and next action. Update [CURRENT-STATE](CURRENT-STATE.md). Do not publish a fresh-chat guidance QA result, CI result, browser screenshot or live test that was never performed.
