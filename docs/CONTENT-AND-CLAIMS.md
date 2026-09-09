# Content and claims

Updated: 2026-09-09. Content owner: Abdelilah Wajid. Evidence source: S09, Guest Review Source v1 dated 2026-09-07. This document is a publication control, not a new audit of YouIn.

## Content authority

Homepage strings are frozen in the [English](design/v1.0/05-implementation/content/en.json) and [Arabic](design/v1.0/05-implementation/content/ar.json) contract files, including explicit mobile variants, metadata and accessible labels. Do not rewrite them for SEO, fit text to generated line breaks, normalize project names differently, or change 2026 copyright automatically.

At implementation, copy the approved dictionaries into typed local content and verify key/type parity and exact values against the baseline. Keep content out of components. A missing Arabic key must fail validation rather than fall back silently to English. Runtime mappings may resolve approved destinations; they must not mutate the source contract.

S09 contains English portfolio-ready narrative and an Arabic reading copy. Later page assembly in S10 refines presentation, but does not constitute a final standalone-page visual design. Prepare paired local MDX in Phase 3, preserving meaning and attribution, with an explicit bilingual editorial review before release.

## Evidence levels

| Level | Meaning | Permitted wording |
| --- | --- | --- |
| Owner-reported | A dated statement by Abdelilah, with attribution | “Reported internal use” in documentation; approved public copy may use the supported internal-use status. |
| Source-documented | The supplied source records a PR, test result or behavior | Attribute the historical record; do not call it re-tested today. |
| Directly verified | Current inspection of the actual artifact or workflow | State method, date, environment and limits. |
| Hypothesis / proposal | An untested market claim or unapproved choice | Label it; never present as established performance or a finalized offer. |

For every new factual claim keep: claim ID, exact EN/AR wording, project/dates, contribution owner, evidence source/version, inspection date, allowed public scope and limitations. An approval cannot turn an unsupported statement into evidence.

## Claims register

| ID | Claim / permitted scope | Evidence and status | Restriction / next verification |
| --- | --- | --- | --- |
| C01 | Abdelilah Wajid, Product Engineer, Marrakech | S03 and adopted homepage copy | Do not invent employer, credentials or agency/studio status. |
| C02 | Guest Review MVP merged into the product | S09 records YouIn PR #11, merged 2026-08-10 | Source-documented; PR not reopened in this task. Obtain a stable verified evidence reference before using detailed PR statistics publicly. |
| C03 | Used internally | Owner statement recorded in S06/S09; exact approved homepage status | No external customer, beta adoption, revenue, growth, conversion or retention inference. Refresh market status before launch. |
| C04 | Product/domain decisions, implementation direction and manual QA | S09 attribution and described canonical documents | Separate Abdelilah, AI assistance and team review. Do not claim he wrote all code manually. |
| C05 | Review identity separated from access; review-scoped participation; history preserved | S09 §§5–7, genuine product evidence | Do not claim Product Decision 011 visibility was resolved; it remains deferred in the source. |
| C06 | 41 domain, 223 web, 85 extension tests; 12 commits, 82 changed files | Historical PR statistics recorded in S09 §§10–11 | Not portfolio test results and not current live verification. Never convert additions into manually authored lines. Exact counts require primary evidence validation before publication. |
| C07 | Electro Abidin: inventory/POS/FIFO | S03 + adopted short copy | Real capture, precise contribution and public display scope still needed. No business/performance metrics. |
| C08 | ElMoussaif: transport website, four languages, CMS | S03 + adopted short copy | Real capture/currentness needed. Generated thumbnail does not prove transport assets, partners or customer results. |
| C09 | Product Rescue offer | Adopted homepage presentation; market hypothesis in S03/S07 | No guaranteed outcome, unapproved rate, availability badge or delivery commitment. |

## Attribution for the case study

Abdelilah: problem ownership, research and product reasoning, domain boundaries, documentation/context, execution direction, review and manual end-to-end QA. ChatGPT: reasoning partner. Codex: primary executor of much of the code. Lamar: final review/acceptance according to the recorded account.

The original guest-feedback prototype existed. Do not say nothing existed beforehand or that this was a complete YouIn rewrite. The portfolio repository starts from scratch; that does not change the incremental engineering story inside the case study.

The available local state records Abdelilah saying Lamar approved displaying YouIn. Treat that as reported permission, not independent proof of unrestricted access to every screenshot, private URL or document. Reconcile exact asset scope before public use without asking again for the already recorded general permission.

## Visual evidence and privacy

The original five-part evidence sequence is Product Decisions → Review Management → Guest Experience → Contextual Feedback Workflow GIF → Feedback in Dashboard. Each source frame is 1535×742. The contact sheet is an index, not independent proof.

Keep original captures in the private reference handoff. Before selecting production derivatives inspect actual pixels for irrelevant private information, access links, customer identifiers and browser context. Record cropping/redaction, source hash, output hash and permission scope. Never fabricate a before/after screen, mirror product text, recolor the product, or use a generated screenshot as proof.

The design boards include an illustrative portrait and secondary project imagery. Do not publish the generated person as Abdelilah. Missing real assets may be represented by explicitly labeled slots in a private preview only. Never crop fictitious projects out of a design board and call them real evidence.

The workflow GIF has not been played end to end in this task. Before using it, test the actual delivered media and provide a still/poster and accessible text. Respect reduced motion; do not claim playback from file size or metadata.

## Content release gate

Release requires exact approved bilingual copy, truthful and current claims, resolved real media, appropriate attribution, reviewed alt/captions, verified destinations and documented source/permission limits. A blocked claim is omitted only through a recorded content/scope decision; do not silently redesign to avoid a missing input. No contact details or public profile links are inferred from Git configuration or unrelated files.
