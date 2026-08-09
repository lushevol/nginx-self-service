1. Each team will call EMS2 endpoint directly ==> Each team need to maintain EMS2 certificate updates, API end point changes, etc.
2. SDK can provide the methods to get the same format with the current format from JWT.
3. Each team should cache the entitlements data, FMO portal can help to set the Stickiness in the Nginx configuration if you have 2 or more endpoints

Please put your date confirmation for each

| Team | Removing Entitlements from JWT | Use the new SDK to have different public cert in dev-uat-production | Logout handler |
| --- | --- | --- | --- |
| SSI | Tentatively End of Q2 | Tentatively End of Q2 | Tentatively End of Q2 |
| FSS | Done. Updated changes pushed to dev and UAT env. | Done. Updated changes pushed to dev and UAT env. | Done. Updated changes pushed to dev and UAT env. |
| CDUPS | Done. ![image2024-8-30_11-4-30.png](attachments/image2024-8-30_11-4-30.png) | | |
| Ratan | Done. ![image2024-8-30_11-1-38.png](attachments/image2024-8-30_11-1-38.png) ![image-2025-4-7_15-38-31.png](attachments/image-2025-4-7_15-38-31.png) | | |
| STAMP | Done. ![image2024-8-30_11-2-22.png](attachments/image2024-8-30_11-2-22.png) | | |

**EMS2 detail will be removed from JWT by  August 30<sup>th</sup> 2024 in DEV.**

# Version:

- ## [Single UI SDK V1.0.0]
- ## [Single UI SDK V1.1.1]
- ## [Single UI SDK V1.1.2]
- ## [Single UI SDK V1.1.4]
