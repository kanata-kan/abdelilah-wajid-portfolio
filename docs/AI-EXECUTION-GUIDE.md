# AI execution guide

Updated: 2026-09-11.

`AGENTS.md` is the entry point. This guide is for MEDIUM/LARGE or ambiguous work. It is not a checklist to run for every local edit.

## 1. Operating principle

Treat repository context like an indexed memory system:

1. identify the exact question,
2. fetch only the source that owns that question,
3. keep the useful result in the current task context,
4. expand only when evidence requires it.

Do not replay the project history before each task.

## 2. Workflow by task size

### SMALL

`Discovery → Implementation → Targeted QA`

Use when the task is local and the correct change is obvious after inspecting the affected files.

Avoid architecture analysis, broad documentation reads, full QA, and state updates unless the local task actually touches them.

### MEDIUM

`Discovery → Investigation → Decision → Implementation → Targeted QA`

Before implementation, answer only the relevant runtime questions:

- Who starts the flow?
- Which files/components/services own it?
- How does data/state move?
- What browser/server boundary matters?
- Where can the regression occur?
- What is the smallest change that fixes the real cause?

Do not investigate unrelated subsystems.

### LARGE

`Discovery → Investigation → Architecture/Decision → Small Plan → Small Phases → Review → QA → Validation`

Use for architecture, routing policy, public claims, cross-feature behavior, release work, or changes that alter project direction.

Break implementation into independently verifiable slices rather than one broad autonomous pass.

## 3. Investigation rules

Investigation should reduce uncertainty, not maximize repository coverage.

Prefer:

- known file paths,
- exact symbol search,
- one call path/data path at a time,
- existing tests for the affected behavior,
- the relevant ADR/contract section.

Avoid by default:

- full-repository scans,
- reading every README/doc linked from another doc,
- broad “improve/harden/polish everything” passes,
- opening the same unchanged source repeatedly,
- speculative refactors before the root cause is understood.

If a task needs Codex-style investigation first, finish the investigation/decision before asking for implementation.

## 4. Scope expansion gate

Expand scope only when one of these is true:

- the root cause crosses a subsystem boundary,
- a shared abstraction is actually responsible,
- the requested behavior cannot be correct without a related change,
- a security/data-integrity issue makes the narrow fix unsafe,
- a project contract explicitly requires the broader change.

When expanding, state the reason and affected surface briefly.

Do not convert optional cleanup into required scope.

## 5. Decision discipline

For consequential design/content/architecture changes:

- identify the current authoritative value,
- identify the proposed change,
- explain why the current value cannot satisfy the task,
- identify EN/AR, evidence, route, or release impact where relevant,
- obtain/use the required owner decision before changing the canonical contract.

Routine implementation inside an adopted contract does not require repeated permission requests.

Unknown input should block only the affected decision. Continue independent safe work without inventing the missing value.

## 6. Context retrieval

Use `AGENTS.md` as the router.

For a large specialist document:

1. search the exact heading/keyword,
2. read that section and enough surrounding context to apply it correctly,
3. do not continue into unrelated sections unless the task expands.

Historical evidence is cold context. Read a `PHASE-*-VERIFICATION.md` file only when the task needs historical proof, reproduction details, or a prior result.

Do not use stale historical state to override `CURRENT-STATE.md`.

## 7. Verification strategy

Pick the smallest check that can realistically catch the regression introduced by the change.

Examples:

- CSS breakpoint fix → affected viewport/locale + diff check.
- TypeScript logic change → relevant type/test check.
- menu behavior → targeted browser/keyboard flow.
- route/metadata change → affected HTTP/route/metadata tests.
- milestone/release → complete applicable QA gate.

Incremental checks reduce iteration cost; full gate verification still runs before milestone approval or release.

## 8. Git and repository hygiene

Before editing when repository state matters, inspect Git status and preserve unrelated changes.

Before a requested/appropriate commit, inspect exact staged files and staged diff.

Do not:

- fabricate history/authorship/timestamps,
- force-push without specific authority,
- commit secrets or raw private research/evidence,
- import old-repository history,
- change unrelated files to make a commit look cleaner.

## 9. End-of-task memory

Do not create a progress log entry for every edit.

Persist only durable information:

- owner decision,
- phase/milestone change,
- material implementation state,
- new blocker affecting the next step,
- gate-level verification result.

Store details in their owning document; keep `CURRENT-STATE.md` as a compact index/snapshot.

For SMALL tasks, the final report can be one short result/check/limit summary.

## 10. Fresh-session validation

A fresh-session guidance test is maintenance, not routine coding work.

Run it only when AI guidance/repository setup materially changes or guidance retrieval appears broken. Verify that the agent can locate current authorization, hard prohibitions, canonical content, source authority, open release inputs, and real commands.

Do not repeat this test in normal sessions when guidance is unchanged.
