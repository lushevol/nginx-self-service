# Background

The legacy ForgeRock platform (OneMFA/OneDS) is scheduled for **<u>full decommissioning by September 2026</u>**, in alignment with the Bank's strategic transition to Microsoft Entra ID and Active Directory.

![image-2026-3-11_0-1-41.png](attachments/image-2026-3-11_0-1-41.png)

for more information

<u>[Guide to Onboarding Application into Entra](https://confluence.global.standardchartered.com/display/IAMENGG/Guide+to+Onboarding+Application+into+Entra)</u>

# Impacts

This document is focus on Post Trade Portal related functionalities impacts assessment,

| Case | Type | Enabled Env | External Dependency | Migration Target | Deadline | In Phase 1 ? |
| --- | --- | --- | --- | --- | --- | --- |
| UI Login with SSO | Authentication | Non-PROD/PROD | OneMFA (ForgeRock) | Entra (OpenID, OAuth2.0) | 24 April 2026​ for prod (as required from CIB Hackathon [Entra Migration - CIB Hackathon](https://confluence.global.standardchartered.com/display/IAMENGG/Entra+Migration+-+CIB+Hackathon)) Sep 2026 OneMFA FR full decommission | Yes |
| UI Login with Account/Credential | Authentication | Non-PROD | OUD (FRDS) | OpenDJ | - | No |
| Role/Entitlement Control | Authorization | Non-PROD/PROD | EMS2 | *EMS3* | - (Maybe 2027 Q1) | No |
| Tenant Tiles On Boarding (Admin Module) | Authentication | Non-PROD/PROD | FMAA | *TBC* | - | No |
| Session Management | Authentication | Non-PROD/PROD | - (Self Managed) | - | - | No |

# Change Brief

## Before Migration

1. User click on "Login With SSO"
2. Browser navigate to OneMFA platform.
3. User get OTP from ForgeRockAuthenticator on their phone
4. User type in OTP input box, click "submit"
5. Navigate back to Portal, sign in to home page with login API.

![image-2026-3-11_11-54-22.png](attachments/image-2026-3-11_11-54-22.png)

## After Migration

1. User click on "Login With SSO"
2. Browser navigate to MS Entra platform.
3. MS Entra platform display One Time Code.
4. User type code in MS Authenticator on their phone, tap "approve".
5. Navigate back to Portal, sign in to home page with login API.

![image-2026-3-10_23-22-39.png](attachments/image-2026-3-10_23-22-39.png)

> **INFO**
> Step 3, 4 are same as when sign in to ADO.

# Migration Strategy

Release phase will be progressively for users to make sure seamless

| Phase | Estimate Timeline | Description | Prerequisites |
| --- | --- | --- | --- |
| Non-Prod Verification | March | Complete POC and development integration on Non-Prod | - |
| Technical Release | April | The entry still keep OneMFA while enable Entra entrance for pilot users. | QA Verification Done |
| Seamless Switch | June | The entry change to Entra while still keep OneMFA for backup. | 1. All tenant team completed regression testing and sign off. 2. No issue observed from PROD or all issues are fixed. |
| Full Decommission | August (Deadline) | Remove OneMFA entry. | No issue reported from PROD |

# FAQ
