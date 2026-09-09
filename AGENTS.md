# Execution contract

- Start with `docs/PROJECT-CONTEXT.md`, `docs/CURRENT-STATE.md`, then `docs/SOURCE-OF-TRUTH.md`. Read only the task-relevant ADRs, design contracts and evidence it identifies. Inspect Git status before editing.
- Current authorization is Phase 0 only. A roadmap is not permission to implement later phases. Follow the owner's latest explicit request; report a missing source instead of pretending to read it.
- Preserve the frozen EN/AR JSON, section order, tokens, local Inter/IBM Plex Sans Arabic files and responsive rules. Do not redesign, rewrite copy, add features or change claims without an explicit owner decision and a recorded revision. Technical fixes within the contract may proceed.
- Use only `assets/brand/aw-primary-color.svg` and the canonical outlined master. No redrawing, font substitute, path manipulation, recoloring, stretching or mirroring. Brand and product images stay unmirrored in RTL.
- EN uses `/en/`, `lang=en`, `dir=ltr`; AR uses `/ar/`, `lang=ar`, `dir=rtl`. Preserve semantic DOM order, isolate Latin fragments and use logical CSS. No silent English fallback or geolocation redirects.
- Follow ADR-001: Next.js stable, React, strict TypeScript, pnpm, App Router, Server Components, CSS Modules/tokens, local fonts/content/MDX, static-first. Do not introduce CMS, database, Tailwind or animation frameworks by default.
- SEO/GEO begins with the first route: HTML content, locale metadata, self-canonical URLs, reciprocal alternates, sitemap/robots and truthful structured data. Unresolved root/URL policy stays explicit; never invent a production origin.
- Never invent metrics, testimonials, adoption or revenue. Preserve attribution and evidence limits in `docs/CONTENT-AND-CLAIMS.md`. Generated previews are design references, never product proof or a real portrait.
- Null asset/link slots remain unresolved. No fake addresses, `href="#"`, dead buttons or false-success forms. Keep secondary rows informational. Follow the documented private-preview policy.
- Run `node scripts/verify-docs.mjs` and `git diff --check` for Phase 0. Application work must pass the real staged gates in `docs/QA-AND-RELEASE.md`; never claim an absent script or skipped check passed.
- Make small, truthful commits. No old-repo imports, backdating, fabricated authorship, force pushes, secrets or raw research archives in Git. Inspect exact staged files before committing.
- No public publishing, deployment, DNS, spending, client messages or applications without explicit authorization for that action. Remote destination/visibility and source disclosure must be resolved before a push.
- Update `docs/CURRENT-STATE.md` when progress or decisions change. Synced ChatGPT `sources/` are read-only; deliver replacement source files separately and state whether synchronization actually occurred.
- Use `docs/AI-EXECUTION-GUIDE.md` for the working procedure. Reply in Arabic/Darija first, briefly, with result, evidence, limits and next step.
