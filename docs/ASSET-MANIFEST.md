# Asset manifest

Updated: 2026-09-11.

Machine fingerprints for imported source files live in [provenance/imports.json](provenance/imports.json). This file records only current runtime mapping and unresolved media state.

## Runtime contract mapping

The frozen design contract remains under:

`docs/design/v1.0/05-implementation/`

Application source does not import that directory directly.

`scripts/sync-runtime-contract.mjs` mirrors the runtime-required immutable inputs byte-for-byte into `src/generated/design-v1/`:

- EN/AR content JSON,
- `links.json`,
- Inter variable WOFF2,
- four IBM Plex Sans Arabic WOFF2 weights.

`scripts/prepare-layout.mjs` adapts the frozen layout CSS into `src/styles/layout.generated.css`, removing only the reference font CSS import because fonts are loaded once through `next/font/local`.

`pnpm check:contract` verifies the mirror and source boundary.

## Canonical identity assets

Runtime public assets are byte-identical copies of the approved brand originals:

| Runtime path                        | Canonical source                    |
| ----------------------------------- | ----------------------------------- |
| `public/brand/aw-primary-color.svg` | `assets/brand/aw-primary-color.svg` |
| `public/favicon.svg`                | `assets/brand/favicon.svg`          |
| `public/favicon.ico`                | `assets/brand/favicon.ico`          |
| `public/apple-touch-icon.png`       | `assets/brand/apple-touch-icon.png` |

`scripts/verify-runtime-assets.mjs` checks their bytes.

The primary/outlining source identity remains immutable; no tracing, recoloring or path regeneration is permitted.

## Approved private-homepage media

| Role             | Runtime path                                                                   | Current source/status                                              |
| ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Portrait mobile  | `public/images/profile/abdelilah-wajid-product-engineer-portrait-mobile.webp`  | approved private-pass derivative, 800×600                          |
| Portrait desktop | `public/images/profile/abdelilah-wajid-product-engineer-portrait-desktop.webp` | approved private-pass derivative, 1200×800                         |
| YouIn homepage   | `public/images/work/youin/guest-review-management.webp`                        | derivative of genuine Review Management capture; no mirror/recolor |

Their recorded hashes are pinned by `scripts/verify-runtime-assets.mjs`.

Raw/source evidence stays outside the public runtime and is ignored from Git where documented.

## Unresolved media/release assets

- Electro Abidin capture — not supplied.
- ElMoussaif capture — not supplied.
- Final localized share/OG assets — release-stage decision.
- Separate YouIn logo — use only if an official source is later required/supplied; do not recreate it.

Missing secondary captures remain truthful noninteractive private-preview slots; do not substitute generated or unrelated proof.

## Change procedure

For a new/changed runtime asset:

1. identify the exact source and rights/provenance,
2. record any derivative crop/redaction/format change,
3. preserve the canonical source,
4. update the runtime mapping/hash check,
5. verify the affected locale/layout only,
6. run the full applicable media/release gate at milestone/release time.

Do not edit provenance hashes to conceal a changed source.
