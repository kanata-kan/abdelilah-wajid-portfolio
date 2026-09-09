# ADR-001 — Foundation

Date: 2026-09-08. Updated: 2026-09-09. Status: **stack implemented; actual compatible versions pinned during Phase 1**.

## Phase 1 compatibility decision — 2026-09-09

Registry rechecks confirmed Next 16.3.4, React/react-dom 19.2.8 and pnpm 12.3.4. A project-local Node 24.20.0 runtime was installed without changing system tools. The first strict install rejected TypeScript 7.0.2 and ESLint 10.10.0: Next's typescript-eslint 8.70.0 requires TypeScript >=4.8.4 <6.1.0, and its import/react/accessibility plugins require ESLint 9 or earlier. Pin TypeScript 6.0.3 and ESLint 9.39.5, the latest compatible registry versions observed, plus Node 24 types 24.13.3. No peer ranges or strict checks were bypassed. ESLint 9 emits a registry deprecation warning; track the Next plugin ecosystem upgrade before release. The installed-set audit found no known advisories at this check.

Use pnpm 12 `allowBuilds` with exact package versions for native dependency setup; replace the obsolete `onlyBuiltDependencies` setting. [pnpm build settings](https://pnpm.io/settings/build). Actual tool versions and checks are recorded in [Phase 1 verification](../PHASE-1-VERIFICATION.md). The table below preserves the earlier target snapshot, not the final installed selection.

## Context and decision

The site and repository must demonstrate clear engineering with limited runtime complexity. Start from a new standalone repository. Do not fork, clone, cherry-pick or copy application code from the old portfolio. A later public-URL inventory for migration does not require its code.

Use Next.js App Router, React and strict TypeScript with pnpm. Default to Server Components and pre-render public pages. Add small Client Components only for actual interaction, initially the mobile menu. Use CSS Modules plus the imported tokens, local Inter/IBM Plex Sans Arabic fonts, server-loaded typed JSON, and trusted local MDX for the separate case study.

No CMS, database, backend form, monorepo, Tailwind, UI kit or animation framework by default. Avoid remote content fetching for core text. Static-first is a rendering strategy; **it does not select `output: export`** or a hosting provider. Image optimization, redirects and headers must remain compatible with the eventual deployment model.

## Dated version selection

Live official registries checked 2026-09-08:

| Component | Selected target | Evidence / limit |
| --- | --- | --- |
| Node.js | 24.20.0 LTS, Krypton | Official release index; local machine currently has 22.15.0. No global runtime change performed. |
| Next.js | 16.3.4 | npm `latest`; requires Node >=20.9.0; supported stable 16 line. |
| React / react-dom | 19.2.8 / 19.2.8 | npm `latest`; satisfies Next's reported React 19 peer range. |
| TypeScript | 7.0.2 | npm `latest`; strict mode required; integration to be verified in Phase 1. |
| pnpm | 12.3.4 | npm `latest`; local machine currently has 10.28.2. No global package-manager change performed. |

See [toolchain record](../provenance/toolchain.json). At Phase 1 start recheck stable/security status, pin exact compatible versions in `package.json`, `packageManager` and runtime configuration, generate the actual `pnpm-lock.yaml`, and run a clean install/build. Record any changed version and reason. Do not invent a lockfile or call a dependency set verified merely because peer ranges match.

`@next/mdx` and `eslint-config-next` should match the chosen Next version. Select remaining MDX/type/lint tooling against that actual version during foundation. No canary framework, experimental compiler or cache feature is implied by “latest”.

## Planned application boundaries

```text
src/app/[locale]/layout.tsx          locale validation, lang/dir, font setup
src/app/[locale]/page.tsx            server-rendered homepage
src/app/[locale]/work/[slug]/        finite local case-study routes, later phase
src/app/sitemap.ts + robots.ts      environment-aware metadata routes
src/components/                     semantic sections, small interaction boundaries
src/content/en.json + ar.json       approved typed content, copied without rewriting
src/content/case-studies/           paired local MDX and typed editorial metadata
src/lib/i18n/                       finite locale/route registry
src/lib/seo/                        shared URL and metadata derivation
src/styles/                        tokens, base styles, CSS Modules
public/                            approved production assets only
```

These paths describe the intended architecture; Phase 1 implements the locale shell and metadata only. Dictionaries import immutable JSON directly from `docs/design/` instead of maintaining a second editable copy. Case-study routes and MDX are deferred to Phase 3. Keep core prose on the server. Validate unknown locale/slug requests with a real 404. Avoid importing an MDX tree based on user input; use an explicit local registry. MDX is executable content and must be trusted/reviewed repository material.

## Consequences and verification

Local content makes review and source comparison simple. It requires deliberate bilingual updates. Static rendering minimizes runtime work, while any dynamic feature must justify its cost. Use `next/font/local` or one equivalent local loading path; do not load the same font twice through the imported reference CSS and Next.

Foundation must introduce real `dev`, `build`, `start`, `lint`, `typecheck`, content-validation and CI commands. Use ESLint directly rather than assuming the removed `next lint` command exists. Run type generation before typecheck where the chosen Next configuration requires it. Stage Vitest and Playwright with actual risky logic/flows, not empty test suites. See [QA gates](../QA-AND-RELEASE.md).

Hosting constraints are recorded now; provider, plan and final origin must be resolved before release QA/launch, not before writing independent foundation code. Do not assume a free plan permits the intended professional use. Code licensing remains open; font and brand rights are separate.

## Technical references

Checked 2026-09-08: [Next installation](https://nextjs.org/docs/app/getting-started/installation), [support policy](https://nextjs.org/support-policy), [local MDX](https://nextjs.org/docs/app/guides/mdx), [Node release index](https://nodejs.org/dist/index.json), [Next registry](https://registry.npmjs.org/next/latest), [React registry](https://registry.npmjs.org/react/latest), [TypeScript registry](https://registry.npmjs.org/typescript/latest), [pnpm registry](https://registry.npmjs.org/pnpm/latest).
