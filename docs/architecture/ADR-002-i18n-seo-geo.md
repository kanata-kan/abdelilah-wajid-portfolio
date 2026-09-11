# ADR-002 — EN/AR, SEO and GEO

Date: 2026-09-08. Updated: 2026-09-11. Status: **adopted**.

## Decision

The site uses two first-class locales from the first route:

- English: `/en/`, `lang="en"`, `dir="ltr"`
- Arabic: `/ar/`, `lang="ar"`, `dir="rtl"`

English is the default product language; Arabic is complete, not a partial preview.

Use one finite locale/route registry and server-loaded dictionaries. Preserve semantic DOM order, use logical CSS, and isolate embedded Latin text where needed. Mirror directional UI only; never mirror logos, portraits or product captures.

Locale switching preserves the equivalent page and a supported section hash. Do not use IP/geolocation redirects, browser-only language persistence or a silent English fallback. Unsupported locales and unknown routes return 404.

## Discoverability contract

For every **released equivalent page**:

- emit a self-canonical absolute URL,
- emit distinct localized title/description,
- emit reciprocal language alternatives only for real equivalents,
- derive URLs from shared route/origin configuration,
- include only indexable 200 pages in the sitemap,
- use truthful structured data supported by visible content/evidence.

GEO means clear, crawlable, evidence-backed information about a consistent person and real work. It does not mean fabricated authority, keyword stuffing, city-page spam or promises of search/AI visibility.

No fabricated ratings, organizations, credentials, outcomes or adoption signals are allowed in metadata or structured data.

## Unresolved policy

Root behavior, case-study routes, `x-default`, production origin, crawler policy and migration redirects remain explicit staged decisions. Their current status belongs in [OPEN-DECISIONS](../OPEN-DECISIONS.md), not in this ADR.

The current private implementation may intentionally remain noindex. A configured URL or successful build is not proof of deployment, crawlability or indexing.

## Consequences

Two complete locales increase editorial/QA work but keep the experience honest and predictable. A shared registry prevents canonical/hreflang/navigation drift. Pending destinations must remain non-links until approved.

## Verification

Verify initial HTML, `lang`/`dir`, route status, locale switching, metadata, reciprocal alternates and unavailable routes at the appropriate QA level. Detailed current behavior belongs in [SEO-GEO](../SEO-GEO.md) and [QA-AND-RELEASE](../QA-AND-RELEASE.md).
