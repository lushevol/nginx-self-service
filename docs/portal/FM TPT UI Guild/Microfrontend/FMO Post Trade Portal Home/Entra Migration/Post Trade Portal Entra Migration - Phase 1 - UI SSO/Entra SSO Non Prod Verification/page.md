#

# Verification Guide

For non prod testing purpose, please follow guide below to create Dev AD account first.

> **INFO**
> Guide:
>
> [AD Account and Group Creation\Amendment Process]
>
> portal:
>
> [https://selfprovisioning.zone1.scb.net/#!/home](https://selfprovisioning.zone1.scb.net/#!/home)
>
> ![image-2026-3-16_18-38-48.png](attachments/image-2026-3-16_18-38-48.png)
>
> *update AD meta data if you are testing on them*
>
> [https://dev.azure.com/sc-ado/TTOQPR/_workitems/edit/13469568](https://dev.azure.com/sc-ado/TTOQPR/_workitems/edit/13469568)

> **INFO**
> Please be noticed that you need to register MS Authenticator before entra login
>
> [Technology & Innovation - Windows Hello for Business (WHfB) - Microsoft Authenticator App registrat…](https://scbnow01.service-now.com/myit?id=kb_article&sysparm_article=KB0038386)
>
>
>
> **Add your account to RATAN AD Group**
>
> on non prod, manual add to AD Group still required for Entra.
>
> ![image-2026-5-14_12-7-14.png](attachments/image-2026-5-14_12-7-14.png)

# UAT Sign-off Request

Please provide sign-off after UAT verification, make sure you have followed below sanity checking steps,

1. Login to platform via Entra SSO without any issue.
2. User basic inform is correct and expected, e.g. fullName, lastName, firstName, country, email, etc.
3. Entitlements (tiles visibility status) are expected.
4. Check if your services rely on user basic information, e.g. country. refer to

## UAT Signoff

| Team | Testing Users | Verification Result | Evidence |
| --- | --- | --- | --- |
| Ratan - C&A | 8230099 Zhang, Lin | Done | ![image-2026-5-7_15-18-30.png](attachments/image-2026-5-7_15-18-30.png) |
| Ratan - Settlement | 8192550 Ma, Shimeng | Done | ![image-2026-5-7_15-18-52.png](attachments/image-2026-5-7_15-18-52.png) |
| Ratan - Trade Control | 8221821 Zhong, Zihao | Done | ![image-2026-5-7_15-20-43.png](attachments/image-2026-5-7_15-20-43.png) |
| LoanIQIL_Admin | 2034395 Albin Paul, L [L.AlbinPaul@sc.com](mailto:L.AlbinPaul@sc.com); 8219965 Valdez, Esteen [Esteen.Valdez@sc.com](mailto:Esteen.Valdez@sc.com) 8219966 Ocay, Remmel [REMMEL.OCAY@sc.com](mailto:REMMEL.OCAY@sc.com); | Done | 📎 [FMO login through SSO! -Albin .eml](attachments/FMO login through SSO! -Albin .eml) |
| FSS | 1628505 Rajan, Sunder | Done | ![image-2026-4-29_11-27-5.png](attachments/image-2026-4-29_11-27-5.png) |
| SSDR | 1436278 Wang, Collin Hong | Done | 📎 [RE_ Post Trade Portal Entra Migration Notices.eml](attachments/RE_ Post Trade Portal Entra Migration Notices.eml) |
| SSI+ | Patha Praveen Kumar | Done | 📎 [Re_ [Action Required] Re_ Markets Operation Portal Entra Migration Announcement.eml](attachments/Re_ [Action Required] Re_ Markets Operation Portal Entra Migration Announcement.eml) |
| CES | | | |
| VPA | 8232142 Zhao, Libin | Done | ![image-2026-5-7_16-26-53.png](attachments/image-2026-5-7_16-26-53.png) |

# Non Prod Verification Steps

1. Go to [FMO Post Trade Portal](https://fmo-mfe.uk.dev.net:8453/)

2. Click on "Sign With SSO"

![image-2026-3-18_11-49-48.png](attachments/image-2026-3-18_11-49-48.png)

3. Direct to Entra

![image-2026-3-18_11-50-24.png](attachments/image-2026-3-18_11-50-24.png)

4. Type Dev AD account (@zone1.scbdev.net), for example: [1639796@zone1.scbdev.net.](mailto:1639796@zone1.scbdev.net.) If you don't have a Dev AD account, please follow the instruction to create one. <u>[AD Account and Group Creation\Amendment Process](https://confluence.global.standardchartered.com/pages/viewpage.action?pageId=3518171208)</u>

<u>**Please noticed that for NON-PROD, only scbdev domain account is feasible.**</u>

<u>**![image-2026-3-18_11-53-51.png](attachments/image-2026-3-18_11-53-51.png)**</u>

![image-2026-3-18_11-53-35.png](attachments/image-2026-3-18_11-53-35.png)

5. If Windows Hello pop up, then select "Use a different account", then type your dev ad account and password to finish the authentication.

> **INFO**
> Windows Hello is not working for Non Prod, only working on PROD.

![image-2026-3-18_11-54-10.png](attachments/image-2026-3-18_11-54-10.png)

![image-2026-3-18_11-54-42.png](attachments/image-2026-3-18_11-54-42.png)

![image-2026-3-18_11-54-50.png](attachments/image-2026-3-18_11-54-50.png)

6. Register your MS Authenticator for non prod.

![image-2026-5-14_23-29-13.png](attachments/image-2026-5-14_23-29-13.png)

![image-2026-5-14_23-29-23.png](attachments/image-2026-5-14_23-29-23.png)

![image-2026-5-14_23-29-33.png](attachments/image-2026-5-14_23-29-33.png)

7. wait for OTP come out, type in MS Authenticator your phone

![image-2026-3-30_13-30-37.png](attachments/image-2026-3-30_13-30-37.png)

![image-2026-3-30_13-31-7.png](attachments/image-2026-3-30_13-31-7.png)

8. Check if entitlements and basic user data is expected, provide the result to us.

![image-2026-4-24_8-29-51.png](attachments/image-2026-4-24_8-29-51.png)

# FAQ

## "No entitlements found" after back to portal

![image-2026-5-7_15-10-28.png](attachments/image-2026-5-7_15-10-28.png)

1. Make sure you have accessible tiles in portal, otherwise it will block users as they don't have anything to operate on Portal.
2. Check if your account is well configured in EMS2, verification link: [https://uklvauems01a.uk.standardchartered.com:16443/ems2/rest/account/1639796](https://uklvauems01a.uk.standardchartered.com:16443/ems2/rest/account/1639796), replace the last user if to yours.

## "Sign-in couldn't be completed"

![image-2026-5-7_15-9-41.png](attachments/image-2026-5-7_15-9-41.png)

follow to register your MS Authenticator

## "Sorry, but we're having trouble sign you in"

![image-2026-5-14_23-32-12.png](attachments/image-2026-5-14_23-32-12.png)

DONT use prod account, use dev account (@zone1.scbdev.net) instead. Follow step 4.
