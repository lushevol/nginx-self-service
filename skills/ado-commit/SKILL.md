---
name: ado-commit
description: 'Generate commit messages from staged changes, prefix the first line with #ado_id resolved first from an explicit user-supplied work item ID, otherwise from a feasible branch-number candidate or a prior #ado_id commit header when inference is requested, create a working branch when the current branch is main/master/develop or a release/* branch, commit using sc-cli git commit, and immediately try to push with sc-cli git push after any successful commit. Use when the user asks to commit staged files under company workflow, wants the standard company commit flow, or wants a commit message generated for staged changes.'
argument-hint: 'Optional commit intent (for example: add nginx route for FSSDS cash projection)'
---

# SC CLI ADO Commit

## What This Skill Produces
- A commit message that always starts with `#ado_id` on the first line.
- A safe working branch when the current branch is `main`, `master`, `develop`, or `release/*`.
- A commit created with `sc-cli git commit`.
- After any successful commit, an immediate post-commit push attempt with `sc-cli git push`.

## When To Use
- User asks to generate a commit message for staged files.
- User asks to commit staged content with the standard company workflow.
- User asks to commit staged content even if they do not mention push explicitly, because the default company flow should push once the commit succeeds.
- Team policy requires `sc-cli` wrappers for git commit and push.
- Branch naming often contains an ADO work item number somewhere in the branch name, or recent commits already use the required `#<ado_id>` header.

## Procedure
1. Check staged scope.
- Run `git diff --staged --name-only` and `git diff --staged --stat`.
- If no staged files exist, stop and ask user to stage files first.

2. Ensure the branch is safe for this workflow.
- Run `git rev-parse --abbrev-ref HEAD`.
- If the current branch is `main`, `master`, `develop`, or matches `release/*`, create a new branch before continuing.
- If the user explicitly provided an ADO work item ID, use it when naming the new branch if practical.
- If the user did not provide an ADO work item ID and the current branch is protected, ask for the ADO work item ID first so the new branch can be created with the correct identifier.
- When creating a new working branch for this workflow, prefer the pattern `feature/<short-description>-<adoid>`.
- If the branch already matches `feature/<short-description>-<adoid>`, keep using it.

3. Resolve ADO ID.
- If the user explicitly provided an ADO work item ID, use it and skip branch-name and history inference.
- Run `git rev-parse --abbrev-ref HEAD`.
- If the current branch matches `feature/<short-description>-<adoid>`, treat the trailing numeric segment after the final `-` as the authoritative ADO ID when it is greater than `1000`, even if other numeric segments appear earlier in `<short-description>`.
- First inspect the current branch name for numeric segments and treat any number greater than `1000` as a feasible ADO ID candidate. The number does not need to appear at the end of the branch name.
- If the branch name contains exactly one feasible candidate, use it.
- If the branch name contains multiple feasible candidates, do not guess. If the branch matches the documented `feature/<short-description>-<adoid>` convention and the trailing segment after the final `-` is a feasible candidate, use that segment; otherwise stop and ask the user which ADO ID to use.
- If the branch name contains no feasible candidate, ask the user to input the ADO work item ID instead of guessing.
- Only inspect recent first-parent non-merge commits on the current branch for a prior commit whose first line starts with `#<ado_id>` when the user prefers not to provide the ID and asks the workflow to infer it.
- Reuse the ADO ID from history only when exactly one clear recent `#<ado_id>` header is found. If multiple different ADO IDs appear in the recent history, treat that as ambiguous and ask the user.
- If neither the branch name nor recent commit history yields a clear ADO ID, stop before commit or push and ask the user to confirm the intended branch and provide `ado_id` explicitly.

4. Draft commit message from staged diff.
- First line format (required): `#<ado_id> <type>: <short summary>`
- Use a conventional type where possible: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`.
- Add a concise body that reflects staged files and behavior changes.

5. Commit using company-required command.
- Always run `sc-cli git commit`.
- Never use plain `git commit`.
- If user requested message only, provide message text but do not commit.

6. Push after successful commit.
- Treat any request that actually asks you to create the commit as authorization for the standard follow-up push, unless the user explicitly asked for message-only output or explicitly said not to push.
- After a successful commit, immediately run `sc-cli git push`.
- If upstream is missing, first validate the publish remote: prefer the branch's configured remote if one exists; otherwise use `origin` only if it exists and is the standard publish remote for this repo; if neither condition is true, stop and ask which remote to use.
- If push fails, return the error output and note the next safe retry.

## Decision Logic
- No staged files:
  Ask user to stage files and rerun.
- Current branch is `main`, `master`, `develop`, or `release/*`:
  Create a new branch before commit or push. Use `feature/<short-description>-<adoid>` when creating it. If the branch name cannot be formed safely without an ADO ID, ask the user for the ADO work item ID first.
- User explicitly provided an ADO work item ID:
  Use it instead of branch-name or history inference.
- No feasible ADO ID in branch name:
  Ask the user to input the ADO work item ID. Only fall back to recent commit history when the user explicitly wants inference instead of supplying the ID.
- Multiple feasible ADO IDs in branch name:
  Stop and ask the user which one to use unless the branch matches the documented `feature/<short-description>-<adoid>` convention and the trailing segment after the final `-` is a feasible candidate under that convention.
- Multiple different `#<ado_id>` headers in recent commit history:
  Stop and ask the user which ADO ID to use.
- Branch and history are both ambiguous or missing an ADO ID:
  Stop before commit or push. Ask user to confirm the target branch and provide `ado_id`.
- Ambiguous commit intent:
  Propose one primary summary and one fallback summary.
- Commit command fails:
  Return error output, adjust command, retry safely.
- User explicitly asks not to push or asks for message only:
  Do not attempt `sc-cli git push`.
- Push command fails:
  Return error output. Retry with an explicit upstream-setting `sc-cli git push` variant only when the failure clearly indicates missing upstream or tracking configuration; otherwise stop and report the blocker.

## Quality Checks Before Commit
- First line starts exactly with `#<ado_id>`.
- ADO ID came from an explicit user input, a feasible branch-number candidate greater than `1000`, or from a clear prior commit header only when the user asked the workflow to infer it.
- The workflow did not guess between multiple feasible branch candidates or multiple different history candidates.
- The workflow did not keep working directly on `main`, `master`, `develop`, or `release/*`.
- Any branch created by the workflow follows `feature/<short-description>-<adoid>`.
- Message summary matches staged diff scope.
- Command used is `sc-cli git commit`.
- Treat a real commit request as approval to push unless the user explicitly asked for message-only output or explicitly said not to push.
- Current branch is the intended publish branch for this workflow.
- Successful commit is followed by a push attempt unless the user explicitly asked for message-only output or explicitly said not to push.

## Output Checklist
- Show staged file scope in summary.
- Show final commit message text.
- Confirm commit command used.
- Confirm whether the push succeeded or report the push blocker.

## Example Prompts
- `Use sc-cli-ado-commit to generate a commit message for my staged files.`
- `Commit staged changes with company flow and push them.`
- `Commit my staged changes using the company workflow.`
- `Generate message only, do not commit yet.`
- `Commit and push staged changes with company flow.`
