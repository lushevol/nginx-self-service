# Change Request Fields

Use this schema when drafting or reviewing a Markets Operations One change request.

## Core Fields

| Field | What to capture | Notes |
| --- | --- | --- |
| Team | Application or tenant team name, such as SSDR | Mandatory |
| Onboarding Type | `new interface`, `new tiles for existing interface`, or `modify tiles for existing interface` | Mandatory |
| Tile Name(s) and Description | Tile name, admin-module path, business description, screenshots | Mandatory for tile work |
| Approval Evidence | Architecture approval and PO approval or prioritization | Mandatory for new interface onboarding |
| Updated OLA | Updated OLA reviewed with RATAN PSS | Mandatory for new interface onboarding or when new users are introduced |
| ADO Stories | Relevant work items or delivery tracking links | Strongly expected |
| UAT/Tech Sign-off | Evidence that tiles render, entitlement works, and features work without errors | Mandatory |
| Change Type | Usually nginx file change | Default to this unless told otherwise |
| Change Content (PROD) | PROD proxy/upstream files, PR links, config snippets | Mandatory when config changes are part of release |
| Connection Validation Evidence | Validation for new upstreams, ports, or domains | Mandatory when connectivity changes are introduced |
| Target User Profile | EMS entities, subjects, roles, and any specific target population | Mandatory |
| Target User Count | Total users, new users, max concurrent users | Mandatory |
| Expect Portal Go-live Date | Date the portal-side change is expected to go live | Mandatory |
| Application Go-live Date | Tenant application deployment date | Mandatory |
| UVT Users | Users who will perform UVT after deployment | Mandatory |
| Product Owner | Business PO | Mandatory |
| Delivery Manager | Delivery manager | Mandatory |
| Support Email Contact | Group or distribution list for onboarding support | Mandatory |

## Operational Submission Actions

These are easy to miss because they are process steps rather than data fields.

| Action | When to enforce | What to look for |
| --- | --- | --- |
| Create a dedicated release-calendar request | Formal onboarding or release submission | User intent to submit, release note, or onboarding pack preparation |
| Notify the MO1 team after the update is completed | Formal onboarding or release submission | Explicit reminder or confirmation in the response |

## Practical Drafting Notes

- If screenshots or attachments exist but the user has not summarized them, extract the useful evidence instead of asking for a rewrite.
- If user counts are partially known, keep the known values and mark the missing values explicitly.
- If the user provides PR links for nginx or code, describe what those links are meant to prove and what additional validation is still needed.
- Never convert a missing item into an assumed approval.