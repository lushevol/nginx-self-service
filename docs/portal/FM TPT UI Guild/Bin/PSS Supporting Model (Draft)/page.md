# Features

## SSO Login with MFA

User can login with one click on "Sign in with SSO", during the login progress, user will input OTP.

![image2023-7-31_10-12-31.png](attachments/image2023-7-31_10-12-31.png)![image2023-7-31_11-20-34.png](attachments/image2023-7-31_11-20-34.png)

## Tile Menu Access Control

Tile menu control is based on EMS2, each team will provide their EMS2 entities to us and setup the user roles before go live.

We will enable the tile access if user has relative access permission, based on the api call to EMS2.

![image2023-7-31_10-19-18.png](attachments/image2023-7-31_10-19-18.png)

![image2023-7-31_10-20-11.png](attachments/image2023-7-31_10-20-11.png)

## Theme Switcher

By the switch button, user can set light or dark theme.

![image2023-7-31_10-31-56.png](attachments/image2023-7-31_10-31-56.png) ![image2023-7-31_10-32-16.png](attachments/image2023-7-31_10-32-16.png)

# Support Requirement

## Code Deployment

| Type | Name | Description | Repo |
| --- | --- | --- | --- |
| Frontend | Root config | HTML entry and static js import map | [https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe-root-config/browse](https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe-root-config/browse) |
| Frontend | Base container | Login and Work space page | [https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe-base/browse](https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe-base/browse) |
| Backend | Single ui bff | login and tile access control backend | [https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/single-ui-bff/browse](https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/single-ui-bff/browse) |
| Nginx | Nginx conf | Proxy rules and configs | NA |

## User Login Issue

If any user can't login, the error may caused by 3 factors:

1. MFA
2. Backend linkage to MFA
3. User's own password or OTP is wrong

If the error message code is 50x, tech team should be involved ASAP to investigate if it the backend issues.

## User Can't See Tile

**ANCHOR: cantsee**

If user can't see the tile, there is a simple workflow to analyze the user case:

Step1: suggest user self check EMS2 setting with their own PSS

1. If the SRM from already submit and approved
2. If the setting of EMS2 is correct (role, subject, action)

Step2:  our application error check

1. involve tech team to check application

## No Response When Click Tile

If user click the tile and no response (no new page opened), the error may cause by code, please involve tech team ASAP.

# Q&A

1. Is FM Post Trade Portal shown on VAT ? Yes
2. Can we support Login audit？ Yes
3. Can Application technical go live in Day 1, and business go live later? Yes, we recommend.
4. How the support scope with many application ? Will managed by each team and their PSS
5. How to control the user authorization ？Any user can login by SSO and access to home page.
6. How to control the user authentication ? Controlled by each team and relative EMS2 settings.
7. Can PSS account access to applications ? Only Ratan applications.

# Contacts

| Team | Dev Team | PSS |
| --- | --- | --- |
| RATAN | RATANONEUI | [FM_BPMS.SUPPORT@sc.com](mailto:FM_BPMS.SUPPORT@sc.com) |
| SSI+ | [FM-TPT-JavaX-Studio@exchange.standardchartered.com](mailto:FM-TPT-JavaX-Studio@exchange.standardchartered.com) | [FMProdMgt-SharedServices@exchange.standardchartered.com](mailto:FMProdMgt-SharedServices@exchange.standardchartered.com) |
| CDUPS | [CDUPS-Core@exchange.standardchartered.com](mailto:CDUPS-Core@exchange.standardchartered.com) | [CDU_Platform_Services-Core@exchange.standardchartered.com](mailto:CDU_Platform_Services-Core@exchange.standardchartered.com) |

# Maintenance Window

| Team | Alternative Entry for User | No User Access at Weekend | SLA |
| --- | --- | --- | --- |
| RATAN | No | Yes | ![image2023-9-28_11-0-16.png](attachments/image2023-9-28_11-0-16.png) |
| SSI+ | No | Yes | ![image2023-9-28_11-0-7.png](attachments/image2023-9-28_11-0-7.png) |
| CDUPS | Yes | -- | |

SSI+ feedback:

Infra maintenance (CVE) we follow existing model, devops follow the CVE patch prgress and verify.

Monthly release will notice use by Dev team.

Exception or emergency change will notice user by PSS

## Error Messages

| Error Type | Error Message or Display | Support Team | Action |
| --- | --- | --- | --- |
| Network | Open web page Blank Screen | RATAN PSS | Check Nginx and Network/VPN |
| Network | Loading Page Timeout | RATAN PSS | Check Nginx and Network/VPN |
| OUD | Login failed, account has been locked due to too many failed authentication attempts | RATAN PSS | Check user account |
| OUD | Login failed, user password is expired | RATAN PSS | Check user account |
| OUD | Login failed, please enter valid username and password | RATAN PSS | Check user account |
| OUD | Login failed, You must change your password before you will be allowed to request any other operations | RATAN PSS | Check user account |
| OUD | Login failed, OUD connection timeout, please try again later | RATAN PSS | Check user account |
| OUD | Login failed, OUD is unavailable, please try again later | RATAN PSS | Check user account |
| Nginx | API error code 404 | RATAN PSS | Check Nginx if the api reachable |
| EMS2 | User Can not see the SSI+ tile | RATAN PSS | route user check EMS2 setting with their own PSS |

# Error Message Route to PSS support

When api error message displays, should indicate which pss team user can catch up.
