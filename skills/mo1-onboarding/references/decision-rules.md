# Decision Rules

Use these rules to reduce unnecessary back-and-forth and keep the guidance consistent.

## Platform Alias Rule

Treat `MO1`, `Markets Operations One`, `Post Trade Portal`, and `RATAN portal` as the same onboarding destination unless the user explicitly distinguishes them.

## Onboarding-Type Rule

Infer the onboarding type from the request.

- `new interface`: the team is onboarding a new business interface or first-time UI presence to MO1.
- `new tiles`: the team already has an interface and is adding additional tiles.
- `modify tiles`: existing tiles are being changed without clearly introducing a new interface.

Ask only when the answer changes mandatory steps.

## New Users Rule

If the request introduces new users, new roles, or new operational coverage, automatically require:
- updated OLA evidence
- target user profile
- target user counts
- entitlement planning or proof

## User Profile And Count Rule

For new interfaces and new-tile onboardings, require target user profile and target user counts even when no brand-new users are being introduced. The OLA escalation is conditional; the profile and count evidence are not.

## Connectivity Rule

If the request mentions new upstreams, domains, ports, server addresses, firewall registration, or connectivity testing, automatically require:
- prod change content for proxy or upstream config
- connection validation evidence
- firewall or server registration evidence where relevant

## Release Review Rule

Every release should be treated as requiring review with the Ratan team. Do not mark the release ready if this review is explicitly mandatory in the template and still absent.

## Operational Submission Rule

If the user is asking for a formal onboarding request, release submission, or ready-to-paste pack, require two operational actions in the output:
- create the dedicated release-calendar request
- notify the MO1 team after the update is completed

If the user is asking only for a technical or blocker review, mention these only when they are relevant to the next action.

## Modification Rule

If the request involves changing, retiring, or removing an Admin Module record, preserve the template rule that deletion should be avoided and deactivation should be used instead unless the user supplies an approved exception.

## Evidence Sufficiency Rule

Do not treat one artifact as proof for multiple controls unless it clearly covers them.

Examples:
- A PR link for nginx proves the proposed config but not successful connectivity.
- An entitlement screenshot proves configuration but not actual user experience.
- A UAT email proves behavior in test scope but not prod UVT.

## Output Rule

Prefer action-oriented output over generic narration.

- If the user asks for drafting help, produce ready-to-paste fields.
- If the user asks for a review, produce gaps, blockers, and owner actions.
- If the user asks what applies, classify the change and explain the minimum required evidence.
- If the user asks for a blocker-only review, do not force a full CR field-by-field rewrite.

## Starting Point Rule

- For non-prod onboarding questions, start with the Admin Module release checklist and treat it as the guide through Dev and UAT.
- For PROD preparation, use both the release checklist and the change-request template, and tell the user to create a new page from the MO1 change-request template before filling submission details.