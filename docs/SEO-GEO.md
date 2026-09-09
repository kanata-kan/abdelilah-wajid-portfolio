# SEO and GEO execution contract

Updated: 2026-09-09. Owner: Abdelilah Wajid. Technical direction: [ADR-002](architecture/ADR-002-i18n-seo-geo.md). All routes below are a contract/plan; no new application responses have been tested yet.

## Route and destination register

| Page/action | EN | AR | State |
| --- | --- | --- | --- |
| Homepage | `/en/` | `/ar/` | Adopted route contract; not implemented |
| Work / Approach / About / Contact | `#work`, `#approach`, `#about`, `#contact` | Same semantic hashes | Adopted per-locale home anchors |
| Guest Review page | `/en/work/youin-guest-review/` | `/ar/work/youin-guest-review/` | Proposed in S07; source links remain null |
| Root `/` | Fixed redirect to `/en/` | No automatic geo choice | Proposed; D02 unresolved |
| Final contact CTA | Null | Null | Owner must supply actual destination |
| Secondary work | Informational | Informational | Do not create clickable rows without real destinations |

For a case-study page linking to a homepage section, use the current locale's homepage plus the hash, not a hash targeting a nonexistent local section. Never include a proposed or unavailable route in a public sitemap or language alternate.

## Initial HTML and metadata

Implement main copy, headings, work narrative and navigation as semantic initial HTML. Use one H1, proper heading levels and ordinary anchors. Core content must remain readable with client JavaScript disabled. Client interaction must not turn the entire homepage into a client-only document.

A central finite route registry maps locale, page ID, slug, section IDs and publication state. It supplies canonical URLs, alternate-language links, sitemap entries, internal navigation and structured-data identifiers. Canonicals are self-referencing; Arabic must not canonicalize to English. Query/trailing-slash/host normalization must be consistent. The recorded homepage contract uses trailing slashes.

Use the approved localized title/description fields; new case-study metadata requires reviewed content. Include absolute canonical and alternates, localized Open Graph and Twitter metadata with real approved share images/dimensions/alt. Do not invent an image URL or `sameAs` profile. An environment variable name such as `SITE_ORIGIN` is an implementation proposal, not a configured production domain.

Reciprocal `en`/`ar` alternatives must reference actual equivalent 200 pages. The proposal for `x-default` is each pair's English page; resolve D02 first. The locale switch must preserve the equivalent page and an existing corresponding section hash. Unsupported locales/slugs should produce 404, never a fallback 200 shell. [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), checked 2026-09-08.

## Indexing environments

- Development: local only. No indexing or publication assertion.
- Preview: access-protected where available; add correct noindex headers/metadata for accessible previews. `robots.txt` is not access control. Blocking crawl can prevent a crawler from seeing noindex; it does not guarantee exclusion.
- Production: explicitly validated origin, intended indexable 200 routes, consistent sitemap, intentional robots/crawler policy and no accidental preview noindex. Read actual deployed headers and HTML after authorized release.

Sitemap includes only released, canonical, indexable pages. Set `lastmod` from a meaningful content change, not every build. Do not copy handoff archives, raw transcripts or private media to `public/`. Draft case-study routes must remain inaccessible to public indexing until ready.

Search Console, Bing Webmaster Tools, sitemap submission and any IndexNow integration are release tasks requiring the relevant account/domain authority. None is configured in Phase 0. Verify current vendor instructions when enabling them.

## Evidence-led GEO

Keep the entity consistent: Abdelilah Wajid, Product Engineer, Marrakech. Explain the problem, role, decision, implementation, verification, outcome and limitations in visible text. Connect homepage proof to the case study and the real contact path. Do not replace substance with technology lists or hidden keyword blocks.

Google's AI search features rely on established SEO fundamentals; no special AI file or special schema is required. `llms.txt` is not a release requirement or a promise of citation. [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), checked 2026-09-08.

Use only schema that describes the actual visible page. Person/WebSite/WebPage are the initial semantic candidates, not guarantees of rich results. A real visible breadcrumb may use BreadcrumbList. Article/ProfilePage require an actual semantic match after the page exists. Keep stable IDs and verified profile links; no fake reviews, ratings, employer, awards or Organization entity. [Structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), checked 2026-09-09.

OpenAI's search crawler and training crawler serve different purposes and can be controlled separately. Do not infer a model-training permission from the SEO objective. Record the owner's policy in D08 and verify both robots and hosting/firewall behavior during release QA. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), checked 2026-09-09.

## Existing-site migration

The existing domain is `abdelilahwajid.com`; its live URLs, canonical host, traffic and ownership/deployment configuration were not re-audited in Phase 0. Do not invent a finished redirect map from historic conversations.

Before replacement, inventory observed public URLs, sitemaps, downloadable media/CV and any accessible owner-supplied traffic evidence. Record for each: old URL, observed status/date, new equivalent, decision (keep/301/308/404/410), reason and tested final response. Account for any old French routes even though v1 has no French locale. Do not generate a fake French translation or redirect all removed pages to home.

Preserve useful paths when possible. Changed paths redirect permanently to their closest real equivalent, without chains or loops. Pages with no equivalent receive the appropriate removal response. Coordinate canonical/hreflang/internal links with the map. Reuse no old application code. Keep the prior deployment recoverable and verify redirect behavior after authorization. [Google site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), checked 2026-09-09.

## Acceptance and measurement

For each real page, inspect response status, initial text, lang/dir, title/description, canonical, reciprocal alternates, share images and schema. Parse sitemap/robots and follow listed URLs. Check both locales with and without JavaScript, unknown locales/slugs, query variants and the final contact path. A rich-results tool alone does not prove schema truth or indexing.

After authorized launch, measure page/query visibility, appropriate traffic, case-study visits and qualified inquiries separately. An email click is not a sent message or a lead. No guaranteed ranking, AI citation or revenue. Field performance without enough data is “insufficient data”; a lab score cannot replace it. See [QA-AND-RELEASE](QA-AND-RELEASE.md).
