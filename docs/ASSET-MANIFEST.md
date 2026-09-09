# Asset manifest

Updated: 2026-09-09. Every imported repository file is fingerprinted in [imports.json](provenance/imports.json). Original source identities are in [source-index.json](provenance/source-index.json). Original design paths below are package-relative, not assumed public URLs.

## Phase 1 runtime mapping — 2026-09-09

`public/brand/aw-primary-color.svg` copies the canonical lockup byte-for-byte. `public/favicon.svg`, `public/favicon.ico` and `public/apple-touch-icon.png` copy the corresponding originals. `scripts/verify-runtime-assets.mjs` verifies these four copies; the production HTTP smoke test also fetches and compares the served bytes. Intrinsic logo dimensions are the original 1425 × 326, with CSS controlling proportional display size.

`src/styles/fonts.ts` loads the five supplied WOFF2 files directly through next/font/local; the original font-face reference is not loaded a second time. All five generated font URLs were fetched and matched to source bytes. `src/lib/i18n/dictionaries.ts` and `src/styles/globals.css` import canonical copy/layout directly. The existing input inventory below preserves original source paths; its earlier future-use descriptions are superseded by this mapping. No private product media or design boards were copied to public assets.

## Available, preserved inputs

| Asset | Original package path | Repository / usage | Status |
| --- | --- | --- | --- |
| Primary lockup | `02-brand/Abdelilah-Wajid-Brand-Kit-v1.0/01-SVG/aw-primary-color.svg` | `assets/brand/aw-primary-color.svg`; future header | Original bytes, ready |
| Outlined master | `02-brand/Abdelilah-Wajid-Brand-Kit-v1.0/08-Source/aw-master-outlined.svg` | `assets/brand/aw-master-outlined.svg`; source reference | Original bytes, ready |
| Canonical paths | Brand kit `08-Source/canonical-paths.json` | `assets/brand/canonical-paths.json`; identity validation | Original bytes, ready; not permission to regenerate logo |
| Icons | Brand kit `05-Web-App/favicon.ico`, `favicon.svg`, `apple-touch-icon.png` | Same filenames in `assets/brand/`; later public asset mapping | Original bytes, not yet wired into an application |
| Fonts | `05-implementation/fonts/` | `docs/design/v1.0/05-implementation/fonts/` | Exact WOFF2, original TTF and OFL files preserved; production loads required WOFF2 only |
| Copy/tokens/layout | `05-implementation/` | `docs/design/v1.0/05-implementation/` | Frozen source; not application implementation |

Both primary SVG and outlined master SHA-256:

```text
E71BACB5D91395338AC862CC82EB225CE7D6F50A3522CC81B8AF0AA5C650BD4F
```

This also matches the mirrored original `aw-primary-color.svg.txt`. The source was copied byte-for-byte; no paths were redrawn or regenerated. Favicon artwork comes from the original kit, never the full lockup shrunk into a tiny icon.

## Reference-only media outside Git

The separate `portfolio-reference-materials/design/AW-Portfolio-Design-v1.0/` folder contains:

- `01-approved-views/home-{en,ar}-{desktop,mobile}.png`: four visually inspected design references. Desktop is 1024×1536; mobile boards are 1470×1070. These contain illustrative imagery and are not website screenshots or product evidence.
- `03-evidence/01-product-decisions.png`, `02-review-management.png`, `03-guest-experience.png`, `04-contextual-feedback-workflow.gif`, `05-feedback-in-dashboard.png`: source evidence, 1535×742 each. The homepage source is `02-review-management.png`.
- The original guides/adoption record, Guest Review source, source manifests and archive material needed for provenance. These are not runtime assets and must not be exposed by a static `public/` directory.

Product evidence has been located and hash-verified, but this task does not claim fresh behavior verification, privacy clearance of every frame or end-to-end GIF playback. Revalidate selected public media as required by [CONTENT-AND-CLAIMS](CONTENT-AND-CLAIMS.md).

## Unresolved production slots

| Slot | Current value | Owner input / required acceptance |
| --- | --- | --- |
| Portrait | Null; generated person only in design boards | Actual approved Abdelilah photo; crop/consent/currentness and factual alt |
| Electro Abidin thumbnail | Null | Real inventory/POS screenshot; role/privacy/scope review |
| ElMoussaif thumbnail | Null | Real transport-site screenshot; role/privacy/currentness review |
| YouIn preview | Genuine source present, not a newly approved derivative | Confirm framing/currentness; desktop contain, mobile left/top crop; no mirroring/recoloring |
| Separate YouIn logo | Null | Preserve logo inside genuine capture; separate official vector only if needed and supplied |
| Share/OG images | No final localized production asset selected | Create from approved real assets/copy only, review and verify actual URL/dimensions |

## Import and replacement procedure

1. Resolve a source ID and inspect the exact file. Verify its hash before copying; never substitute a similarly named historical image.
2. Keep immutable input paths in this manifest. Map the file to a proposed runtime path during Phase 1; no runtime/public placement exists yet.
3. For image derivatives record source/output hashes, dimensions, crop/redaction, reason, owner approval and verification date. Respect source aspect and intrinsic dimensions to avoid layout shift.
4. Preserve licenses and attribution. Do not treat a code license as permission for personal or third-party assets.
5. Verify actual rendered logo, font family/weights, image crop and media playback in both locales. File presence alone does not close that gate.

Run `node scripts/verify-docs.mjs` to detect accidental imported-file changes. Import hashes must not be refreshed to disguise an unapproved edit. Source PNGs and raw archives remain outside Git; import only genuinely needed production derivatives after scope and rights are resolved.
