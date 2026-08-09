High level tasks on the enablement:

- Create AD account
- update extension attribute for the AD account
- SPN onboarding? [OAuth 2.0 client credentials flow on the Microsoft identity platform - Microsoft identity platform | Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
- Hashicorp integration for rotation
- Entra integration to retrieve token as service requestor
- Entra integration to validate token as service provider

**FMAA replacement solution is not finalized by central team till 10th Apr and applications machine to machine call which rely on FMAA for authentication and EMS2 for authorization are all pending.**

| OUD Service Account | Owner Application | Usage | New AD account | extensionAttribute2 updated | non-prod OUD | non-prod AD | SPN onboarded | EMS2 entitlement | Non-prod completed | Comments | Contact Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RATAN_PROD | RATAN | Integrate with various FM applications where RATAN as service requestor, authenticate with FMAA | | N | | | N | N | N | | |
| RATAN_EDMI_PROD | RATAN | RATAN service account to call Kong Gateway | | | | | | | | | |
| srv.51358.ratanone.001 | RATAN | RATAN service account to | | | | | | | | | |
| srv.fmmisratan.001 | FMMIS | FMMIS call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| srv.pacman.001 | PacMan | PacMan call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| RAZOR_MDS_U | RAZOR | collect from EMS2 RATAN_FUNC and not sure the usage yet | | | | | | | | | |
| fmdp_dqsl_batch | DQSL | DQSL batch call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| srv.51129.fmdataplatform.dqslrt.001 | FMDP | ???FMDP call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| srv.cis.mds | CIS | CIS call RATAN API with authenticate by FMAA and authorization by EMS2 | | | srv.cis.mds | NA | client_id: f08cb746-c74e-43b6-ad5d-5c21c1449356 | | | | @Hongkui Zhang |
| srv.ratan.001 | SSDR | EOD call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| [srv.51512.ps](http://srv.51512.ps) | CDU PS | CDU PS call RATAN API with authenticate by FMAA and authorization by EMS2 | | | | | | | | | |
| srv.fmoapp.001 | FMMIS | ？ | | | | | | | | | |
| FMO_ADMIN | RATAN | Portal Admin call RATAN API with authenticate by FMAA. | | | | | | | | | |
| srv.51507.ssdr.002 | SSDR | SSDR call RATAN API with authenticate by FMAA. | | | | | | | | No other dependency, only use this account to call FMAA query token to upload file to MFE admin | [Zhigang.ye@sc.com](mailto:Zhigang.ye@sc.com) |
| STAMP_ADMIN | STAMP | STAMP call RATAN API with authenticate by FMAA. | | | | | | | | No other dependency | Contact DL: [FMRPSTAMP@exchange.standardchartered.com](mailto:FMRPSTAMP@exchange.standardchartered.com) |
| FSS_PROD fss_prod | FSS | FSS call RATAN API with authenticate by FMAA. | | | | | | | | No other dependency, only use this account to call FMAA query token to upload file to MFE admin | @R1, Balakrishnan @Babu, Rineesh @Hegde, Dheeraj @Shaik, Mubarak @Chandra, Kotagiri Vinay @Rajan, Sunder |
| srv.liquser.001 | LoanIQ | LoanIQ call RATAN API with authenticate by FMAA. | | | | | | | | | |
| srv.ems2.001 | CES | CES call RATAN API with authenticate by FMAA. | | | | | | | | | |
| SSIPLUS_PROD | SSI+ | SSI+ call RATAN API with authenticate by FMAA. | | | | | | | | | |
