# Evidence Catalog

Use these examples to judge whether the user supplied acceptable onboarding evidence.

## Approval Evidence

- Architecture approval email or review outcome.
- Product owner prioritization or approval note.
- Solution intent or design approval referencing onboarding to the portal.

What it proves:
- The business and architecture stakeholders approved the onboarding direction.

What it does not prove:
- That release configuration, entitlements, or production readiness are complete.

## OLA Evidence

- Reviewed OLA document.
- Email approval from RATAN PSS and tenant-side PSS or named approvers.

What it proves:
- Operational support alignment and approved service coverage.

What it does not prove:
- Technical release readiness by itself.

## nginx And Connectivity Evidence

- Proxy and upstream config files.
- PR links for nginx changes.
- Email confirmation that server addresses and proxy headers were reviewed.
- Curl output or environment validation showing the endpoint is reachable.
- Firewall registration or production IP registration entries.

What it proves:
- Intended network routing and, when paired with tests, functional connectivity.

What it does not prove:
- User-visible tile behavior unless combined with UAT or UVT evidence.

## Authentication Evidence

- Code snippet or screenshot showing the request service exposed from base is used.
- Backend validation proof using the required Single UI SDK or equivalent mandated mechanism.

What it proves:
- The implementation is following the expected authentication integration path.

What it does not prove:
- That the deployed environment is correctly configured end to end.

## Entitlement Evidence

- Admin Module or EMS screenshots showing tile-to-role or subject-to-action assignment.
- Export of tiles, modules, drawers, or entitlement mappings.

What it proves:
- Configuration exists for tile visibility or access control.

What it does not prove:
- That a real user experienced the correct allow or deny behavior unless paired with validation evidence.

## UAT And UVT Evidence

- Email stating tile visibility, entitlement control, and functionality worked as expected.
- Screenshot of the live screen during UAT or UVT.
- Message explicitly approving production validation after deployment.

What it proves:
- User or tester confirmation that the functionality behaved correctly in the target environment.

What it does not prove:
- That all configuration dependencies were reviewed if the sign-off is vague.

## How To Write Findings

When evidence is present, say exactly what it covers.

Example:
`The attached UVT sign-off proves the SSDR report-download tile worked in production after nginx go-live, but it does not replace the need to show firewall registration if new upstream ports were introduced.`