# Design v1.0 contract

`05-implementation/` is the byte-preserved implementation contract recovered from AW Portfolio Design v1.0.0 (2026-09-08).

It is **immutable source/provenance**, not the runtime application tree.

## Read by task

Use only the file that owns the question:

| Need | Canonical input |
| --- | --- |
| EN copy | `05-implementation/content/en.json` |
| AR copy | `05-implementation/content/ar.json` |
| colors/spacing/type/breakpoints | `05-implementation/design-tokens.json` |
| exact CSS numeric/layout contract | `05-implementation/layout-contract.css` |
| semantic/order contract | `05-implementation/homepage.structure.json` |
| action/navigation destinations | `05-implementation/links.json` |
| original media slots | `05-implementation/asset-slots.json` |
| supplied local fonts | `05-implementation/fonts/` |

Do not bulk-read the folder when one source is enough.

## Runtime boundary

Application source under `src/` must not import `docs/` directly.

Runtime-required immutable inputs are mirrored byte-for-byte into:

`src/generated/design-v1/`

with:

`node scripts/sync-runtime-contract.mjs`

The layout CSS is adapted deterministically into:

`src/styles/layout.generated.css`

with:

`node scripts/prepare-layout.mjs`

Run `pnpm check:contract` to verify both mirrors and the `src/` → `docs/` boundary.

Tests/verification scripts may intentionally read these canonical files to compare runtime behavior against the source contract.

## Provenance rule

Never rewrite an imported source merely to make application paths convenient. Approved design/content changes receive a recorded revision; runtime mirrors are then regenerated. Import hashes are not refreshed to hide unexplained differences.

Original package paths and runtime media mappings are documented in [ASSET-MANIFEST](../../ASSET-MANIFEST.md). Authority/conflict rules are in [SOURCE-OF-TRUTH](../../SOURCE-OF-TRUTH.md).
