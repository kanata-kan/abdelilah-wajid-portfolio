# ADR-002 — EN/AR, SEO and GEO

Date: 2026-09-08. Status: **EN/AR and discoverability foundations accepted; specific unresolved routing and crawler choices remain proposals**.

## Decision

Implement `/en/` and `/ar/` from the first route. English is primary; Arabic is complete. Use one finite locale registry, one semantic content model and server-loaded dictionaries. Set `lang` and `dir` on the document root. Use logical CSS and isolate mixed Latin fragments with `bdi` or explicit LTR spans. Mirror directional arrows, never logos, portraits or product captures.

Preserve equivalent page and supported section hash on locale changes. No IP redirect, browser-only language persistence or silent English fallback. Unsupported locales and unknown slugs must return 404. Copy-key parity alone does not prove semantic translation parity; review both.

Each released page has a self-canonical absolute URL, distinct localized title/description, and reciprocal language alternatives for real equivalent pages only. Derive sitemap, canonical, alternates, internal links and structured-data URLs from shared route/origin configuration. Publish only indexable 200 pages in the sitemap and real content-change dates in `lastmod`.

GEO means clear, crawlable, evidence-backed content about a consistent person and actual work. Start with semantically appropriate Person, WebSite and WebPage data where supported by the visible page. Add BreadcrumbList only with corresponding visible navigation. Article/ProfilePage are conditional choices, not a checklist of types to attach everywhere. No fabricated ratings, employer, organization, credentials or outcomes.

## Unresolved details

The imported `links.json` leaves the root language behavior and case-study destinations unresolved. The strategy proposes `/` → `/en/`, the paired `work/youin-guest-review/` paths, and `x-default` pointing to each equivalent English 200 page. Record them as **proposed** until D02 is resolved in [OPEN-DECISIONS](../OPEN-DECISIONS.md). The homepage trailing slashes are part of the handoff; normalize the full route set consistently after that decision.

`abdelilahwajid.com` is the existing domain and continuity intention, not a freshly verified deployment target. Confirm canonical HTTPS origin/host before release metadata. Search indexing and model-training crawler policy are separate decisions. No default training permission is inferred from the SEO goal.

## Consequences

Two full locales cost more editorial work but keep the experience honest and discoverable. No automatic locale redirection means predictable URLs. A central registry avoids conflicting canonical and alternate logic. Pending destinations must stay out of public navigation/sitemaps until functional; private development cannot silently promote them to approved links.

International visibility does not justify keyword stuffing, fabricated city pages or promises of rankings. Old URLs will be mapped from observed public routes to real equivalents, with permanent redirects when needed and 404/410 for genuine removals. No blanket homepage redirect.

## Verification and references

Test generated initial HTML, response status, reciprocal alternates, metadata, real route switching and unavailable pages. A build success or configuration file is not proof of deployed crawlability. Detailed acceptance cases are in [SEO-GEO](../SEO-GEO.md) and [QA-AND-RELEASE](../QA-AND-RELEASE.md).

Checked 2026-09-08: [Next internationalization](https://nextjs.org/docs/app/guides/internationalization), [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features). These support implementation principles, not guaranteed search results.
