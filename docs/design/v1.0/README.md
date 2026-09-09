# Design v1.0 implementation inputs

`05-implementation/` is a byte-for-byte copy from the recovered AW Portfolio Design v1.0.0 package dated 2026-09-08. It is a reference contract, not an application. Original CSS and TTF files are retained for provenance; Phase 1 should ship only needed WOFF2 weights through a single local-font loading path.

Upstream OFL notices retain their original line endings and trailing spaces. A narrow Git whitespace rule applies only to those two license files; their exact byte hashes are still validated. Authored files use normal whitespace checks.

Read [ADR-003](../../architecture/ADR-003-design-contract.md), then:

1. [English copy](05-implementation/content/en.json) and [Arabic copy](05-implementation/content/ar.json).
2. [Tokens](05-implementation/design-tokens.json), [layout contract](05-implementation/layout-contract.css), [fonts](05-implementation/fonts.css).
3. [Homepage structure](05-implementation/homepage.structure.json), [asset slots](05-implementation/asset-slots.json) and [links](05-implementation/links.json).

Original-path strings in JSON refer to the complete design package, not this directory. Use [ASSET-MANIFEST](../../ASSET-MANIFEST.md) to resolve them. The complete guide, adoption record and four final views are in the separately delivered local reference material, listed in [SOURCE-OF-TRUTH](../../SOURCE-OF-TRUTH.md).

Never rewrite an imported file merely to make its paths fit an application. Use an explicit runtime mapping and preserve the source for comparison. A future approved revision receives a new version, change reason and updated provenance; a hash change alone is not approval.
