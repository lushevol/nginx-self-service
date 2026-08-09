# Release Checklist Matrix

Use this matrix to decide which actions apply and what evidence should exist.

## Pre-onboarding

| Step | Applies to | What good evidence looks like |
| --- | --- | --- |
| Create a dedicated release-calendar request and prepare MO1-team notification | Formal onboarding or release submission | Request entry exists or the response explicitly flags it as still required |
| Get architecture and PO approval | New interface onboarding | Approval email, SI approval, architecture review, or prioritization proof |
| Get started with project setup | New interface onboarding | Repository, setup confirmation, or onboarding completion note |
| Prepare tile metadata | New interface and new tiles | Module, drawer, tile records, descriptions, screenshots |

## Development And Non-Prod Validation

| Step | Applies to | What good evidence looks like |
| --- | --- | --- |
| Create tiles, modules, drawers in Admin Module | New interface, new tiles | Admin Module export, screenshots, or confirmation from testing accounts |
| Deactivate instead of delete for retirements or removals | Tile modification or retirement | Plan or evidence showing records are deactivated rather than deleted |
| Grant testing permissions | New interface, new tiles | EMS2 evidence for maker and checker accounts |
| Prepare nginx config | New interface, new tiles when paths or upstreams are involved | Proxy file, upstream file, PR link, or attached config |
| Validate authentication integration | New interface and any new UI/API integration | Code evidence showing base service or mandatory auth validation path |
| Verify on Dev | New interface, new tiles | Evidence that tile is visible, clickable, correctly named, and functional |

## UAT Readiness

| Step | Applies to | What good evidence looks like |
| --- | --- | --- |
| Submit nginx config to Ratan | New interface, new tiles when relevant | Email thread, PR, or config handoff note |
| Verify UI and API loading in UAT | New interface, new tiles when relevant | UAT evidence, screenshots, curl output, or confirmation email |
| Provide target user group and counts | New interface, new tiles, user-impacting modifications | Counts, profiles, roles, or PT input |
| Prepare FMAA or OUD path when relevant | Conditional legacy path | Account creation or token status evidence |
| Grant EMS entitlements | New interface or any new tile access model | Entitlement screenshots or export |
| Verify entitlement control | New interface or any entitlement change | Positive and negative visibility proof |

## Prod Readiness

| Step | Applies to | What good evidence looks like |
| --- | --- | --- |
| Review release with Ratan | Every release | Confirmation from Shuai Lu or designated Ratan reviewer |
| Provide prod nginx proxy and upstream config | New interface, new tiles when relevant | Final prod files or approved PR |
| Provide UAT sign-off | Every release with user-visible change | Email or message explicitly approving tile behavior |
| Run network connectivity and firewall checks | Any new upstream, domain, or port | Curl validation, firewall registration, server or port confirmation |
| Create or update prod tiles | New interface, new tiles | API import evidence, Java import evidence, or admin action confirmation |
| Release EMS2 changes to prod | When entitlement configuration changes | CR or release evidence for EMS2 |
| Create or update OLA document | New interface, new users, or operationally relevant changes | OLA document plus PSS approval |
| Verify business user access to portal | Every release | Proof that target users can access portal website |
| Perform pen-test | New interface onboarding | Pen-test report or sign-off |

## Post-Prod

| Step | Applies to | What good evidence looks like |
| --- | --- | --- |
| Gather UVT sign-off | Every release requiring UVT | UVT approval email naming production validation |
| Notify new users | New interface or when new users are introduced | Announcement plan or completed notification |

## Use This Carefully

- A step can still apply to new tiles if the change alters user impact, operational support, or network topology.
- A step can be skipped only when the change clearly does not touch that control point.
- If evidence proves only part of a step, mark the remainder as missing instead of calling the whole step complete.