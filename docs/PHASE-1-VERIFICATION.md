# Phase 1 verification

Date: 2026-09-09. Scope: private application foundation in the existing desktop repository, starting from `b2f10f9`. D01 was already closed by owner baseline adoption. No new clone, later-phase page assembly, deployment or source synchronization.

Verified application commit: `15c3d93` — `feat: add verified bilingual application foundation`. The accompanying documentation commit records these results. Both are local; no push or hosted CI run was performed in this session.

## Toolchain

Project-local Node 24.20.0 / pnpm 12.3.4; Next + eslint-config-next 16.3.4; React/react-dom 19.2.8; TypeScript 6.0.3; ESLint 9.39.5; Node types 24.13.3. Exact direct versions and real resolution/integrity data are in package.json and pnpm-lock.yaml. Windows system Node 22.15.0 and pnpm 10.28.2 were not replaced.

Initial strict peer checks rejected TypeScript 7.0.2 / ESLint 10.10.0. The compatible pins satisfy the actual lint dependency ranges. ESLint 9 has a registry deprecation warning, tracked for the next compatible framework-tooling upgrade. Current advisories are separate from that support warning.

Sources checked on this date: [Next registry](https://registry.npmjs.org/next/latest), [React registry](https://registry.npmjs.org/react/latest), [TypeScript registry](https://registry.npmjs.org/typescript/latest), [pnpm registry](https://registry.npmjs.org/pnpm/latest), [Next installation](https://nextjs.org/docs/app/getting-started/installation), [pnpm build policy](https://pnpm.io/settings/build), [checkout release](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node release](https://github.com/actions/setup-node/releases/tag/v7.0.0). Compatible major versions were also queried directly from npm.

## Implemented

- Pre-rendered `/en/` and `/ar/`, server-only typed dictionaries importing frozen JSON directly; original SVG/icons, local WOFF2s, immutable layout/tokens and CSS Modules.
- A clearly labeled private foundation screen, one H1, real language links and skip link. No full homepage sections, menu, case page, fake image/contact destination or new business claim.
- Localized title/description, noindex metadata and response headers. Optional validated HTTPS origin derives self-canonical/reciprocal en/ar/OG URLs. No invented host, share image or x-default. Visible identity supports the minimal Person schema; URL-based graph awaits D07.
- Empty sitemap and private robots policy. D02 root/case/x-default decisions and D07/D08 release policy remain open. `/` is currently 404, not an adopted permanent root policy.
- A small request guard enforces exact locale casing before static-file resolution. Production HTTP testing reproduced `/EN/` incorrectly returning the `/en/` page on Windows; the guard fixed it without disabling static generation.
- Read-only CI workflow, pinned action release tags, no stored checkout credentials, deployment step or secrets. Hosted CI has not run for this work.

## Executed checks

- Initial canonical checks passed: 21 required files, 27 exact imported files and 73 bilingual text fields. Runtime checker compares four served asset copies with originals.
- Strict install and frozen-lockfile install passed. For the clean install, existing generated `node_modules` and `.next` were preserved under ignored `.local/phase1-initial-*`; a fresh `node_modules` was installed from the lockfile using the pnpm package cache. No clone or user files were deleted.
- Initial type generation/typecheck, lint and production build passed. Build prerendered both locales, robots, sitemap and the framework 404.
- Five focused Node tests passed: finite routes/directions, absent-origin metadata, reciprocal self-canonical URLs, invalid origins and script-safe truthful schema.
- Production HTTP smoke passed: real initial EN/AR HTML/copy/H1/lang/dir/metadata, locale links, noindex, six unknown/pending paths returning 404, slash normalization, all five original WOFF2s and four identity/icon assets fetched with matching bytes, robots and empty sitemap.
- `pnpm audit --json` returned zero advisories at every severity across the installed graph (408 dependencies reported). This is a dated registry result, not a perpetual guarantee.

Final clean-install gate passed: `node scripts/pnpm-local.mjs check` ran generated types, strict typecheck, lint, source/runtime validation, all five tests, production build and the full HTTP smoke suite successfully after the fresh frozen-lockfile install. The local launcher was corrected to expose both pinned Node and pnpm binaries to nested commands; it does not require system Corepack downloads or global PATH changes.

Browser inspection was attempted using the available browser connector. It returned `No browser is available`, and creating an in-app tab returned `Browser is not available: iab`. No visual, click-switching, computed-font or screenshot result is claimed. Gate 1's initial-HTML/asset/HTTP checks passed; broader browser checks remain for the next available browser session and Gate 2. A loopback-only production preview was started successfully on port 3000.

## Limits

No homepage design acceptance, responsive interaction suite, case evidence/media playback, final crawler policy, production-domain metadata, live CI, deployment or ChatGPT source replacement is claimed. Vitest/Playwright and MDX are staged with later logic/content; current meaningful tests use Node's built-in runner and real HTTP responses. The historical missing source revisions remain unrecovered; D01 was adoption, not proof of equivalence.
