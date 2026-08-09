| Items | Content | Examples |
| --- | --- | --- |
| Team | Data Distribution and Reporting (DDR) | *e.g. SSDR* |
| Onboarding Type | New tile on existing FSS Services interface - DDR tile will be onboarded under FSS Services container | - *New interface onboarding* - *New tiles for existing interfaces* - *Modify tiles for existing interfaces* |
| Tile Name(s) and Description | **Tile Name: **DDR FSSDS Reporting Platform **Description: **Reporting framework to provide visibility to reports received from upstream systems and forwarded to downstream | *List all impacted tile names with a short description.* |
| Approval Evidence | | *<u>(For new interface onboarding)</u> Provide architecture and PO approval for onboarding your business to MO1.* |
| Updated OLA | Approved by both FSS and RATAN PSS: | *(<u>For new interface onboarding or new users introduced</u>) Provide updated OLA which reviewed with RATAN PSS* |
| ADO Stories | [Generic Task 13428471 [FSS-RF] Activities required for MFE onboarding in production](https://dev.azure.com/sc-ado/FMQPR/_queries/edit/13428471/?queryId=c4b19155-0184-45e1-aa7e-2de6a1051c29) | *List the related ADO stories for these tiles.* |
| UAT Sign-off | Rahul to check with Jenifer for MSTR Black Rock UAT sign off Will get UAT sign off for business go-live, currently only tech go-live | *Attach UAT sign-off evidence (for example, email sign-off). Validate the following: * - *Tile visibility and rendering* - *Entitlement control for users* - *Functionality works without errors* |
| Technical Sign-off | | * * |
| Change Type | NGINX file change | *e.g. NGINX file change* |
| Change Content | | *Attach change files for **PROD** (for example, NGINX proxy/upstream change files).* |
| Accessibility Evidence | Need to raise firewall request to whitelist FSS Services - Lu Shuai will check with PSS regarding this - Check with infra team in parallel (Liqin) | *Attach connectivity validation evidence if new upstream ports are added.* |
| Target User Profile (EMS2 Entities/Subjects/Roles) | **Entities:** - FSS_UI_RF_AE - FSS_UI_RF_BD - FSS_UI_RF_BH - FSS_UI_RF_BW - FSS_UI_RF_CI - FSS_UI_RF_CN - FSS_UI_RF_GH - FSS_UI_RF_HK - FSS_UI_RF_ID - FSS_UI_RF_IN - FSS_UI_RF_KE - FSS_UI_RF_LK - FSS_UI_RF_MU - FSS_UI_RF_MY - FSS_UI_RF_NG - FSS_UI_RF_OM - FSS_UI_RF_PH - FSS_UI_RF_PK - FSS_UI_RF_QA - FSS_UI_RF_SA - FSS_UI_RF_SG - FSS_UI_RF_TZ - FSS_UI_RF_UG - FSS_UI_RF_VN - FSS_UI_RF_ZA - FSS_UI_RF_ZM - FSS_UI_RF_GL** ** Roles (CC applies to all country codes listed in above entities) : - FSS_UI_RF_**CC**_MASTER - FSS_UI_RF_**CC**_MAKER - FSS_UI_RF_**CC**_CHECKER - FSS_UI_RF_**CC**_PSS_USER - FSS_UI_RF_**CC**_BUSINESS_USER | *Provide profiles of target users, including EMS entities, subjects, and roles.* |
| Target User Count | Total Users: 700 New Users: 200 Maximum concurrent users: 20 | *e.g.* - *Total users: 10 * - *New users: 5 (excluding existing OLA users)* - *Maximum concurrent users: 4* |
| Target Technical Go-live Date | 20 June 2026 *Technical Go-Live planned on 20 June 2026. No change required from MFE after Technical Go-Live on 20 June.* | *e.g. 20 June 2026* |
| Target Business Go-Live Date | 27 June 2026 | * * |
| UVT Users | **UVT Users for Technical Go-Live:** DDR PSS | Surendran, Senthil Kumar | [SenthilKumar.Surendran@sc.com](mailto:SenthilKumar.Surendran@sc.com) | | --- | --- | | N, Manoj Kumar | [ManojKumar.N@sc.com](mailto:ManojKumar.N@sc.com) | **UVT Users for Business Go-Live:** Ops (provide users after tech go-live) | *Provide the users who will perform UVT. These users must provide UVT sign-off after deployment.* |
| Surendran, Senthil Kumar | [SenthilKumar.Surendran@sc.com](mailto:SenthilKumar.Surendran@sc.com) |
| N, Manoj Kumar | [ManojKumar.N@sc.com](mailto:ManojKumar.N@sc.com) |
| Product Owner | Avery, Duncan Stuart | *PO for your business* |
| Delivery Manager | Ranjan, Rahul | *DM for your business* |
| Support Email Contact | [FSS-Services-Support@sc.com](mailto:FSS-Services-Support@sc.com) | *Email group for onboarding support and issue handling* |
