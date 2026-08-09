---
name: mo1-onboarding
description: Guide users through onboarding to Markets Operations One (MO1, previously Post Trade Portal or RATAN portal). Use this skill whenever the user asks how to get started with non-prod onboarding, prepare or review a PROD release, fill or assess the Admin Module release checklist, draft the MO1 change-request page, raise a release-calendar onboarding request, notify the MO1 team, collect missing onboarding evidence, or work out which approvals, OLA, nginx, entitlement, EMS2, UAT, UVT, connectivity, firewall, or production steps apply for new interfaces, new tiles, or tile modifications.
---

# MO1 Onboarding

Use this skill to turn a partial onboarding request into a concrete plan, a draft change request, and a release-readiness assessment. The main job is not just to list steps. It is to infer which steps actually apply, identify missing evidence, and stop the user from submitting an incomplete onboarding pack.

Use the Admin Module release checklist as the operating guide for the onboarding flow from Dev through UAT to PROD. Use the change-request template when the user is preparing the formal release request for PROD.

Treat these names as aliases for the same platform:
- Markets Operations One
- MO1
- Post Trade Portal
- RATAN portal

## Outcomes

When this skill is used well, the response should help the user do one or more of these:
- Draft a complete MO1 change request.
- Review an onboarding pack against the release checklist.
- Remind the user to create the dedicated release-calendar request and notify the MO1 team when they are preparing a formal onboarding submission.
- Tell the user to create a new page from the MO1 change-request template when they are preparing a PROD release request.
- Produce a missing-evidence list with owners and next actions.
- Explain which steps apply for new interface onboarding versus new tiles or tile modifications.
- Prepare a release-readiness summary for Dev, UAT, Prod, or post-prod follow-up.

## Inputs To Extract First

Extract what the user already provided before asking follow-up questions.

- Team or application name.
- Onboarding type: `new interface`, `new tiles for existing interface`, or `modify tiles for existing interface`.
- Tile metadata: name, admin-module path, business description, screenshots.
- Approval evidence: architecture, PO, or prioritization.
- Updated OLA and whether new users are introduced.
- ADO stories or PR links.
- UAT, tech sign-off, and UVT sign-off evidence.
- nginx proxy or upstream change details.
- Connectivity and firewall evidence.
- Target users, EMS entities, subjects, roles, and user counts.
- Expected portal go-live date and application go-live date.
- UVT users, product owner, delivery manager, and support email.

Do not ask the user to restate facts that are already visible in their email excerpts, screenshots, templates, or attached files.

## Decision Rules

Use these rules to decide what is mandatory.

1. If the onboarding type is unclear, infer the most likely type from the request. Ask only if the ambiguity changes the checklist.
2. If this is a `new interface`, require architecture approval, PO prioritization, tile metadata, nginx setup, authentication validation, user readiness, OLA readiness, and the full release path.
3. If this is `new tiles for an existing interface`, keep architecture and PO approval scoped to true new-interface onboarding. For new tiles, escalate only the controls actually affected by the change, such as OLA for new users, connectivity and firewall evidence for new upstreams, or other operational-readiness evidence for a new dependency.
4. If this is `modify tiles for an existing interface`, focus on the changed tiles, entitlement impact, release evidence, and whether nginx, connectivity, or OLA are affected.
5. For new interfaces and new-tile onboardings, require target user profile and user-count evidence even when the tiles are meant for existing users only.
6. If new users are introduced, require updated OLA as well as the user-profile and user-count evidence.
7. If new upstreams, domains, or ports are introduced, require connectivity validation and firewall registration evidence.
8. Assume the change type is `nginx file change` unless the user clearly says otherwise.
9. Accept practical evidence formats: emails, `.msg` files, screenshots, PR links, config files, curl output, entitlement screenshots, and approval snippets.
10. If the user is preparing the actual onboarding submission, require a dedicated release-calendar request and remind them to notify the MO1 team after the update is completed.
11. For modification or retirement work in Admin Module, prefer deactivation instead of deletion unless the user explicitly says a different control path is approved.
12. Never invent approvals, sign-offs, counts, or dates. If evidence is missing, say it is missing.

For the detailed rules, read `references/decision-rules.md`.

## Workflow

Choose the response mode first, then use only the parts that serve that mode.

### Starting Point

- If the user asks how to get started, onboard in non-prod, or work through Dev/UAT readiness, start with `references/release-checklist-matrix.md` and keep the change-request template in reserve unless the user is also preparing PROD.
- If the user asks to prepare a PROD release, use both the release checklist and `references/change-request-fields.md`. In that case, tell the user to create a new page from the MO1 change-request template before filling the release submission details.

### Mode A: Submission drafting
Use this when the user wants to prepare a change request, onboarding request, or release pack. In this mode, make sure the answer covers the dedicated release-calendar request and MO1-team notification.

### Mode B: Readiness or blocker review
Use this when the user already has evidence and wants a pass, gap, or blocker assessment. In this mode, do not ask for every CR field. Focus on whether the supplied evidence is enough for the requested phase.

### Mode C: Narrow question
Use this when the user asks about one slice only, such as OLA, nginx, entitlement, firewall, UVT, or whether a step applies. Answer that slice directly, then mention adjacent blockers only if they are clearly mandatory.

Within the selected mode, work through the onboarding lifecycle in this order unless the user asks for only one phase.

1. Classify the change.
2. If the user is preparing PROD, build or review the change-request page fields first.
3. Map the request against the release checklist.
4. Confirm whether release-calendar submission and MO1-team notification are required and already covered.
5. Identify mandatory evidence and mark what is present versus missing.
6. Call out blockers, risks, and owner-specific next actions.
7. If the user wants, rewrite the result as a ready-to-paste change request or a release-readiness summary.

Use `references/release-checklist-matrix.md` for the detailed stage-by-stage checklist.

## Evidence Handling

When reviewing evidence, be concrete about what each artifact proves.

- OLA approval emails prove operational readiness only if they clearly show approval from the relevant PSS or repository stakeholders.
- nginx config files or PR links prove config content, but not successful validation unless paired with connectivity or deployment confirmation.
- entitlement screenshots prove access mapping only if the relevant subject, role, or action is visible.
- UAT or UVT emails prove validation only if they state the tile rendered, entitlement control behaved correctly, or the functionality worked as expected.
- code screenshots prove auth integration only if they show the base service or required request path being used.

Use `references/evidence-catalog.md` for accepted examples and how to interpret them.

## Output Contract

Default to the structure that matches the selected mode unless the user asks for a different format.

### Mode A: Submission drafting

Use this structure when the user wants a change request, onboarding request, or ready-to-submit pack.

### 1. Scope
- Team:
- Onboarding type:
- Tiles or interface affected:
- Release phase being discussed:

### 2. Draft Change Request
Provide a compact field-by-field draft using the schema from `references/change-request-fields.md`.

If the user is preparing a formal submission, include a short operational note stating whether the release-calendar request has been created and whether the MO1 team still needs to be notified.

### 3. Checklist Assessment
Use a short status table with:
- Step
- Applies
- Evidence present
- Missing or blocker
- Owner

### 4. Missing Evidence
List only mandatory missing items.

### 5. Risks And Blockers
Call out operational, release, entitlement, connectivity, or approval gaps.

### 6. Next Actions
Group actions by owner such as Tenant Team, Ratan Team, EMS2 Team, PSS Team, or Business Users.

### Mode B: Readiness or blocker review

Use this smaller structure by default when the user asks for a blocker-only review, readiness review, or evidence-gap assessment.

### 1. Scope
- Team or application:
- Release phase:
- What evidence was reviewed:

### 2. Checklist Assessment
Use a short status table with:
- Step
- Applies
- Evidence present
- Missing or blocker
- Owner

### 3. Mandatory Blockers
List only the blockers that stop the requested phase.

### 4. Owner Actions
Group actions by Tenant Team, Ratan Team, EMS2 Team, PSS Team, or Business Users.

Do not add a Draft Change Request section in Mode B unless the user explicitly asks for one.

### Mode C: Narrow question

Answer the requested slice first. Add only the minimum adjacent context needed to prevent a wrong conclusion.

## Response Style

- Be decisive when the templates make a requirement clear.
- Be explicit about conditional logic so the user knows why something is required.
- Keep the main response practical. Put exhaustive checklist detail only where it helps the user act.
- If the user only wants a single deliverable, do not dump the full workflow unnecessarily.
- In blocker-review mode, prefer a compact pass or gap assessment over a full CR rewrite.
- If the user is asking how to start non-prod onboarding, lead with the checklist rather than the change-request template.

## Worked Patterns

### Pattern 1: New interface onboarding
Expect the broadest checklist coverage. The answer should usually include approvals, nginx, authentication validation, user counts, OLA, connectivity, Dev and UAT verification, prod readiness, and post-prod notification.

### Pattern 2: New tiles on an existing interface
Focus on tile metadata, admin-module setup, entitlement proof, target user profile and user counts, UAT or tech sign-off, nginx only if paths or upstreams change, and OLA only if the change introduces new users or operational responsibilities.

### Pattern 2a: Tile modification or retirement
If the request is changing or retiring an existing tile, call out the Admin Module rule that records should be deactivated rather than deleted unless an approved exception exists.

### Pattern 3: Readiness review
If the user already has evidence, review it against the checklist instead of re-explaining onboarding from scratch. Produce a clear pass, gap, or blocker assessment.

## Reference Files

- Read `references/change-request-fields.md` when drafting or checking the CR fields.
- Read `references/release-checklist-matrix.md` when deciding which lifecycle steps apply.
- Read `references/evidence-catalog.md` when interpreting screenshots, emails, PRs, or config artifacts.
- Read `references/decision-rules.md` when onboarding type or conditional requirements are ambiguous.