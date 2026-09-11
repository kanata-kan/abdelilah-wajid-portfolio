# Codex usage — cost-aware working guide

Updated: 2026-09-11. Human guide; agents should not load this automatically.

Goal: keep engineering quality high while avoiding unnecessary context, tool calls and expensive reasoning.

## Model routing

Use the cheapest model that can reliably do the task:

- **Luna** — mechanical/local work: copy, CSS, simple asset changes, obvious type fixes, running known checks.
- **Terra** — default implementation model for most normal feature work.
- **Sol** — ambiguous bugs, multi-file reasoning, non-trivial refactors, architecture-sensitive feature work.
- **Astra** — rare escalation for genuinely difficult/blocked architecture or root-cause problems where Sol is not enough.

Do not use Astra/Sol by default for a task that can be stated as an exact local change.

## Prompt shape

A good Codex task normally needs only:

1. **Goal** — exact outcome.
2. **Scope** — affected area/file/route if known.
3. **Constraint** — what must not change.
4. **Verification** — the smallest realistic check.

Example:

> Fix the desktop Hero portrait width regression. Scope: Hero component/styles only unless the root cause proves shared. Preserve frozen copy/tokens and mobile layout. Verify the affected desktop breakpoint plus `git diff --check`. Do not run the full homepage suite unless the change expands beyond Hero.

Avoid prompts like:

> Review the whole repo, improve everything, fix all issues, run all tests, update all docs.

## Session discipline

- Use a fresh Codex session for a materially unrelated task rather than carrying a very long context forward.
- Do not paste project documentation into the prompt; let `AGENTS.md` route the agent to the exact source.
- If the relevant file/decision is already known, name it directly.
- If a task is blocked by one owner decision, stop the blocked branch instead of repeatedly investigating the whole project.
- Full audits/hardening passes should be explicit, rare LARGE tasks.

## Runtime/source boundary

For normal implementation work, stay inside `src/` and the directly affected runtime files. `src/generated/design-v1/` is a machine-synced mirror of the frozen contract and must not be hand-edited.

Open `docs/design/v1.0/05-implementation/` only when the task needs the canonical contract, provenance, or an approved contract revision. Tests/verification may compare runtime output to it intentionally.

This avoids dragging design provenance into routine component work while preserving exact source traceability.

## Quality rule

Saving credits must remove repeated context and repeated checks, not remove necessary reasoning.

Use targeted QA during iteration and full gate QA at milestone/release boundaries. Escalate model/context/checks only when risk or uncertainty expands.
