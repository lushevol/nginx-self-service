Abstract from Original Document: **[FMAA API]**

## **Environment Details**

| Environment | API | TLS Cert |
| --- | --- | --- |
| DEV | **Access Token:** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/access_token](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/access_token) ** ** **Validate Token:** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect) ** ** **Public Key:** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json) **User Details:** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails) **MFA** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token) **User Info** [https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=)<bankid,bankid,...> | |
| UAT | **Access Token:** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token) ** ** **Validate Token:** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/introspect](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/introspect) ** ** **Public Key:** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json) **User Details:** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails) **MFA** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token) **User Info** [https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=)<bankid,bankid,...> | Same cert attached in DEV. |
| PROD | **Access Token:** [https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/access_token](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token) ** ** **Validate Token:** [https://](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect)[fmaaprod](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token)[.gdc.standardchartered.com/v1/fmaa/oauth2/introspect](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect) ** ** **Public Key:** [https://](https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json)[fmaaprod](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token)[.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json](https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/.well-known/jwks.json) **User Details:** [https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails](https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/userDetails) **MFA** [https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token](https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/mfa/access_token) **User Info** [https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=](https://fmaaprod.gdc.standardchartered.com/v1/fmaa/oauth2/userInfo?userIds=)<bankid,bankid,...> | |

## **Client Credential Grant Type (machine-to-machine authentication):**

| 1. Client (machine) calls FMMA access_token (API) endpoint using OUD service account id & password (using OAuth2 spec) curl -k -X POST "[https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/access_token?grant_type=client_credentials](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/access_token?grant_type=client_credentials)" -H "accept: application/json" -H "Authorization: Basic #######################" → Authorization header: "Basic <<Base64 encoding of service_account_id:password>>" 2. If auth is successful from OUD, FMAA generates and returns access token else it returns unsuccessful response. <u>Successful authentication response (access_token contains JWT):</u> { **"access_token"**: "eyJhbGciOiJSUzI1NiIsInR...", "token_type": "bearer", "expires_in": 604799, "scope": "authentication", "jti": "e31426de-a434-4703-a17c-3e155ae0af9a" } <u>Unsuccessful authentication response:</u> <u>{</u> "path" : "/v1/fmaa/oauth2/access_token", "error" : "Unauthorized", "message" : "Password Validation failed for #########", "status" : 401, "timestamp" : "2021-04-16T02:19:03.264" } 4. Client machine calls secure service by passing access_token in the request 5 . Secure service calls FMAA introspect endpoint (API) by passing access_token & id curl -k --location --request GET '[https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJhdXRoZW50aWNhdGlvbiJdLCJleHAiOjE2MjIwMDgyNDgsImp0aSI6ImU1Y2RjMDMzLTlkOGItNGY5Yy1hYmI1LTVkMzIyZmZjMjRmYSIsImNsaWVudF9pZCI6InNydi5zYWJyZS5jZl9wcm9kX3JvLjAwMSJ9.Y8osvCCNvvffm-IqzCqA6kzkbxSbsFF0H7v2bKKHMNf0UtX9e5HLI0-0sJ7QQJGftcSRzX3oJETzZ0itbKRleJuihT5DhvTAtE4ybrHRhUUcV3KJaEERBN8ATSGYk3ZdHHSKBtFrJyQlwGHDUJl2WY_HhZABD4ztXXlCoL0oSPt0AO26JgfrpoAdFXdfkozQ0TyIfdW7eUFP4s1xht1F5y8lTDzMt83HJ0kbgnO9jlo9iWi84pEMO_KCnVtcBjnh7rjmZwTB6FlOSTqDQqI3h3H5N51L46_dlpQZwKYnFSuKYxL09R-avHjga3suiF6eKil7pEhidQximz7Cjx7eTw&app_id=TEST_APP&user_id=](https://fmaadev.gdc.standardchartered.com/v1/fmaa/oauth2/introspect?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjIwMDUwNzYsInVzZXJfbmFtZSI6InN2Yy5kcXNscnR0ZXN0LmRldiIsImF1dGhvcml0aWVzIjpbIm9hdXRoMiJdLCJqdGkiOiI2OTM0YjRiMy1hN2Q2LTQ3NzUtYWJiNi0zMGMyMmIxYjc5ZDEiLCJjbGllbnRfaWQiOiJzdmMuZHFzbHJ0dGVzdC5kZXYiLCJzY29wZSI6WyJhdXRoZW50aWNhdGlvbiJdfQ.C3u9hpvOwe_gajqVx2sivqr3CoHSSXP-uCV3usbyomTh3RXpCQIhpIUpfK8fxb1na3fJkKl6pK7To1R_ehaqFaxgVV5SWikQWmdNddfqf3cyh1N9oeQoczV_SNGhPBgUVRDkIrP66fNm_4Hnb6Tn3KAeQsVrIGNi28rwvkamSR61TVAX7RfIDaGTLj7wQWzQoy54JTixSUX4qRUYT2GAF-sl_uex2tO3x4ZDCinPktgZZLzYzOOV5On0WcQ5WcJqrfJEGNsaqPUG7Q36EOq438xEO1JjxFA0SAWoQ6LYg4uKtyIx_PWjufP6sba5m-ydd7mD1btm-MWmMpP_DtkKtw&app_id=Some_Secure_Service&user_id=scanner_fmedmi)########‘ → access_token - which was sent by client machine → app_id - mandatory param which is needed only for audit purpose (will not be validated against OUD) → user_id - token owner (service account id OR user id) will be validated against claims in JWT, if it is not passed - only signature & expiry of the token will be validated, not owner. 6. Validation happens in FMAA using JWKS and returns the response to secure service <u>Successful validation response:</u> { "user_id": "###########", "active": "true", "token_type": "Bearer", "app_id": "TEST_APP", "expires_in": 604744 } <u>UnSuccessful validation responses:</u> <u> </u> { "reason": "signature_verification_failed", "user_id": "##############", "active": "false", "token_type": "Bearer", "app_id": "TEST_APP" } { "reason": "token_expired", "user_id": "##############", "active": "false", "token_type": "Bearer", "app_id": "TEST_APP" } { "reason": "not valid owner for token", "active": "false" } <u> </u> |
| --- |

<u>**Contacts**</u>

**OUD: **OVD Tech Team <OVDTechTeam@[sc.com](http://sc.com)>; A, Sankar <Sankar.A@[sc.com](http://sc.com)>

**PIM team for password vault:** STS-PIM-OPS <[STS-PIM-OPS@sc.com](mailto:STS-PIM-OPS@sc.com)>

** **

<u>**Session Validity**</u>

Session validity for the generated tokens is similar to UVA and is as below:

Session validity for service accounts : 17 years (564192000 seconds)

Session validity for bank id : 7 days (604800 seconds)

<u>** **</u>

## <u>**Appendix**</u>

##### **Service Accounts:**

1. To onboard the service account(s) into FMAA, please use the attached template and update with the required details.
2. Also use the attached template for rollback script.
3. Once both the scripts are updated, please raise a Jira by attaching both the ldif scripts and assign to OUD team (A, Sankar <Sankar.A@[sc.com](http://sc.com/)>). Sample OUD Jira to refer: [OUD-15463](https://jira.global.standardchartered.com/browse/OUD-15463). **DO NOT CLONE THE JIRA AS THE OVD TEAM WILL REACH OUT TO REPORTER FOR ANY INFORMATION REQUIRED. IF CLONED, OVD TEAM WILL NOT BE ABLE TO REACH REPORTER AND JIRA COMPLETION MAY BE DELAYED.**

##### **Bank Ids:**

1. To onboard the bank id(s) into FMAA, please use the attached template and update with the required details.
2. Once the script is updated, please raise a Jira by attaching the ldif script and assign to OUD team (A, Sankar <Sankar.A@[sc.com](http://sc.com/)>). Sample OUD Jira to refer: [OUD-15463](https://jira.global.standardchartered.com/browse/OUD-15463). **DO NOT CLONE THE JIRA AS THE OVD TEAM WILL REACH OUT TO REPORTER FOR ANY INFORMATION REQUIRED. IF CLONED, OVD TEAM WILL NOT BE ABLE TO REACH REPORTER AND JIRA COMPLETION MAY BE DELAYED.**

**ID creation and contact **

1. Refer JIRA [OUD-18200](https://jira.global.standardchartered.com/browse/OUD-18200) as a sample this Jira is automated,create a new Jira and provide the details marked in create_users.ldif,this script is automatically get executed and user logs will be generated, if it is successful then user is created.
2. Accounts are created and managed in OUD (handled by [@OVD Tech Team](mailto:OVDTechTeam@sc.com)) whereas FMAA (managed by [@FMSD_UVA_DEV](mailto:FMSD_UVA_DEV@exchange.standardchartered.com)) provides authentication against the account which exist in OUD.

OUD Password reset -  [http://hklvatapp827.hk.standardchartered.com:8080/reset](http://hklvatapp827.hk.standardchartered.com:8080/reset)

** **
