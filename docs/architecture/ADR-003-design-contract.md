# ADR-003 — Preserve the adopted design contract

Date: 2026-09-08. Updated: 2026-09-11. Status: **adopted**.

## Decision and authority

Implement the adopted homepage from the canonical identity files and frozen written contract. Use final visual references only where the written contract does not specify a value/behavior.

Do not reconstruct the system from screenshots, average conflicting values, or blend superseded concepts into the baseline. Product evidence independently governs factual claims.

The immutable implementation source lives under:

`docs/design/v1.0/05-implementation/`

Runtime mirrors/adapters may be generated from it, but the imported source itself is not rewritten to fit application structure.

## Non-negotiable contract

- Use the canonical outlined identity assets; no tracing, font substitution, path manipulation, stretching or mirroring.
- Preserve Forest `#19302E`, Sage `#6C8B70`, Ivory `#FEFEFB` and the semantic token roles in the frozen contract.
- Header lockup: 224 CSS px desktop, 200 tablet/mobile, narrow cap `viewport - 136px`, proportional height.
- EN uses Inter; AR uses IBM Plex Sans Arabic from supplied local files. UI fonts never replace the outlined wordmark.
- Keep exactly two secondary project rows: Electro Abidin then ElMoussaif. Do not convert the homepage to a generic card grid.
- Do not add testimonials, stars, invented metrics, gradients/glow, sticky header, scroll-reveal system or a large animation dependency without a new decision.

## Layout and behavior checkpoints

| Subject | Required behavior |
| --- | --- |
| Breakpoints | mobile <600; tablet 600–959; desktop >=960 CSS px |
| Gutters / max width | 20 / 32 / 40 px; container max 1280 px |
| Hero | Desktop text at logical start and portrait at end; 1.65:1 columns, 32 px gap. Mobile copy → actions → portrait → caption. |
| Featured work | DOM order intro → figure → reasoning. Desktop text/image 1:2.1; mobile preserves semantic order. |
| Work variants | Mobile title/role rules below 600; exactly one visible/announced status at every width. |
| Secondary rows | Text at logical start, media at end in both locales; non-clickable while destinations are unresolved. |
| Portrait | 3:2 desktop, 4:3 below 960; cover at 50% 35%. |
| YouIn media | 16:10 desktop/tablet with contain; 4:3 mobile with documented crop; never mirror/recolor. |
| Mobile menu | Below 960, closed initially, inline panel, Escape closes/restores focus, selection closes, no modal trap. |
| Controls | 48 px primary actions; menu targets >=44 px; 2 px focus ring / 3 px offset; minimal reduced-motion-safe transition. |
| Footer | Full-bleed Forest with aligned inner container; no invented contact form. |

Exact copy, token values, semantic roles and further numeric rules remain in the frozen implementation inputs.

The mobile reference boards represent consecutive parts of one continuous page, not a carousel or multi-panel website. Do not reproduce board framing, incidental texture, screenshot line breaks or distorted product UI.

## Asset state separation

This ADR defines **behavior**, not whether a particular media slot is currently filled. Current approved derivatives, unresolved captures and provenance live in [ASSET-MANIFEST](../ASSET-MANIFEST.md) and [CURRENT-STATE](../CURRENT-STATE.md).

## Revision rule

Technical fixes that preserve the approved appearance/copy/behavior may proceed within the authorized phase. Changes to approved wording, assets, behavior or design direction require an owner decision and a new recorded contract revision.

Use proportional QA while iterating; run the complete applicable design gate before milestone approval/release.
