# ADR-003 — Preserve the adopted design

Date: 2026-09-08. Status: **homepage design v1.0 adopted in recovered source; exact `(1)` archive equivalence remains unverified**.

## Decision and authority

Use original SVG identity → written specification and exact JSON/CSS → four final homepage views → historical references. Product evidence independently governs factual claims. Do not recreate a system from a screenshot or blend older concepts into the baseline.

The recovered package's adoption record is dated September 8 and distinguishes adopted direction from numeric implementation choices fixed during handoff. It does not claim a native Figma layout, individually signed-off numbers or an approved production website. [Source provenance](../SOURCE-OF-TRUTH.md) records the missing exact archive revision.

## Non-negotiable contract

- Original `aw-primary-color.svg` and `aw-master-outlined.svg`, both SHA-256 `E71BACB5D91395338AC862CC82EB225CE7D6F50A3522CC81B8AF0AA5C650BD4F`. No re-tracing, font substitute or shape edits.
- Forest `#19302E`, Sage `#6C8B70`, Ivory `#FEFEFB`; other semantic color roles from the frozen tokens. Sage is decorative, not the default small-text color.
- Original full header lockup: 224 CSS px desktop, 200 tablet/mobile, narrow cap `viewport - 136px`, proportional height. This documented website exception does not alter the original brand kit. Keep clear space at least one quarter of rendered logo height.
- Inter EN, IBM Plex Sans Arabic AR, supplied local files and licenses. The UI fonts do not replace the outlined wordmark.
- Exactly two secondary project rows, never a generic card grid. No new stars, testimonials, metrics, gradients, glow, skyline, sticky header, scroll reveal or large animation dependency.

## Layout and behavior checkpoints

| Subject | Required behavior |
| --- | --- |
| Breakpoints | Mobile <600; tablet 600–959; desktop >=960 CSS px |
| Gutters / max width | 20 / 32 / 40 px; container max 1280 px |
| Hero | Desktop text at logical start, portrait at end; ratio 1.65:1, gap 32. Mobile copy → both actions → portrait → caption. |
| Featured work | DOM intro → figure → reasoning. Desktop narrative/image 1:2.1; figure spans rows. Mobile preserves DOM order. |
| Work variants | Mobile title/hidden role below 600; status under figure at >=960 and after result below 960; one announced instance. |
| Secondary rows | Electro then ElMoussaif. Text at logical start; thumbnails at end in both locales. Informational while links are null. |
| Portrait | 3:2 desktop, 4:3 below 960; cover at 50% 35%. Real approved image still needed. |
| YouIn | 16:10 desktop/tablet with contain and dark letterbox; 4:3 mobile, left/top cover crop. Never mirror/recolor. |
| Mobile menu | Below 960; inline panel, closed initially, navigation then locale links. aria-expanded/controls; Escape closes and restores toggle focus; selection closes. No modal trap. |
| Controls | 48px primary actions; menu links >=44px. 2px focus ring, 3px offset; 120ms fill transition only, disabled for reduced motion. |
| Footer | Full-bleed Forest, aligned inner container; no new oversized logo or contact form. |

All other sizes, line heights, copy fields, responsive visibility and semantic roles remain in the [frozen implementation inputs](../design/v1.0/README.md). Physical left/top coordinates for the YouIn crop are intentional image coordinates, not a reason to mirror product screenshots.

The mobile boards depict three consecutive scroll segments of **one continuous page**, not a carousel or three-column UI. Do not reproduce board borders, captions, incidental texture, screenshot line breaks or distorted product controls as real site elements. Natural content height wins over the 1536px source image height.

## Acceptance and revision

Inspect EN/AR at 1024 and 390 after fonts load; check 320, 768, 960 and 1440 for reflow. Check text zoom, keyboard flow, focus and real asset crops. Exact strings, token values, identity and structure must match; up to 1 CSS px of grid rounding is allowed. Font antialiasing and generated-image artifacts are not matching targets.

Approved implementation captures become a later regression baseline; they do not yet exist. Missing portrait/secondary captures block public release, not a private foundation. The separate case-study layout needs its own visual review in Phase 3.

Record and obtain an owner decision for appearance, wording or behavior changes before revising the baseline. Ordinary technical fixes preserving the contract can proceed within the authorized phase. See [AI guide](../AI-EXECUTION-GUIDE.md) and [QA gates](../QA-AND-RELEASE.md).
