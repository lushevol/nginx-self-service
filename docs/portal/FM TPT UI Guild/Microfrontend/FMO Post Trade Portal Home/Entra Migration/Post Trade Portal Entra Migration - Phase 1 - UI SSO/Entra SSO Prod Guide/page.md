> **INFO**
> This guide is for pilot users after technical go live in May 2026, if you are not pilot users then nothing is expected to be changed for you BAU work.

# Step 1. Register MS Authenticator app

For all the users, please refer to below link to install and register MS authenticator for MS ENTRA login.

<u>>> [Technology & Innovation - Windows Hello for Business (WHfB) - Microsoft Authenticator App registrat…](https://scbnow01.service-now.com/myit?id=kb_article&sysparm_article=KB0038386) <<</u>

# Step 2. Sign in

1. Go to Markets Operation Portal site: [https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes)

2. Click on "Sign in with SSO" button

![image-2026-4-29_22-53-28.png](attachments/image-2026-4-29_22-53-28.png)

>> If you have signed in to other system with Entra (ADO/Service Now/Axess/etc), you may not require following steps, the portal will be login directly. <<

# Step 3. Entra Authentication

Windows 11 will by default prompt with WHFB (Windows Hello PIN or Windows Hello Face), please pass the authentication.

![](https://confluence.global.standardchartered.com/download/attachments/3659013607/image-2026-3-18_11-54-10.png?version=1&modificationDate=1773806050000&api=v2)

## Step 3.1 if Windows Hello PIN or Windows Hello Face not feasible for your device

If WHFB not working, you can manually select MS Authenticator instead.

# Step 4. Redirect to portal and login successfully

After authentication success in entra, the browser will redirect to the portal and perform login automatically. Now you can perform your BAU work.

***Please notice that session in Entra is 1 hour, means it will not require authenticate in Entra again if you relogin in 1 hour.***

![](https://confluence.global.standardchartered.com/download/attachments/3659013607/image-2026-3-30_13-31-7.png?version=1&modificationDate=1774848669000&api=v2)

# Rollout Calendar

Pilot users can always switch back to legacy sso if Entra is not working well, please visit the portal via [https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no) to switch back to OneMFA.

| Time Duration | Episode | Normal Users Default Entry | Pilot Users Default Entry | Fall Back Entry |
| --- | --- | --- | --- | --- |
| ~~Mid May - June~~ 23rd May | Technical Go Live | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) **OneMFA** | [https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes) **Entra** ***This link is only active temporary, you should revisit it after browser relaunch or PC restart.*** | [https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no) **OneMFA** |
| ~~June - Auguest~~ 20th June | Business Go Live | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) **Entra** | - | [https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=no) **OneMFA** |
| After September | OneMFA Decommission | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) **Entra** | - | - |

# Known Difference

The user information data stored in AD is not quit the same matching with OUD (FRDS), here is migration difference,

> **WARNING**
> Use delicate entitlement system instead.

| field | OUD Sample | AD Sample | Changed after migration |
| --- | --- | --- | --- |
| firstName | Qing | Qing | No |
| lastName | Zhang | Zhang1 | Yes |
| fullName | Zhang1, Qing | Zhang1, Qing | No |
| country | China | CN | Yes |
| emailId | Qing.Zhang1@sc.com | Qing.Zhang1@sc.com | No |
| locale | - | - | Yes (missing after migration) |
| userId | 8230535 | 8230535 | No |
| title | | | |

- last name in AD: now has extra order number.
- country in AD: now is country code instead of full name.
- locale in AD: missing, no value.

Please take case if your services has subscribed these values for audit.

```js
// Please check if you have read value from user info exposed from base.
const { getHooks } = Hooks;


const hooks = getHooks();
const { oud } = hooks?.store?.user ?? {};
const { country, lastName, locale } = oud ?? {};

// Please check if you have read value from OUD field in JWT token.

CHECK YOUR BACKEND SERVICES IMPLEMENTATION IF THEY READ FROM JWT TOKEN


```

## Sample on PROD response

```
"userInfo": "{\"max_age\":1779252636,\"sub\":\"1639796\",\"auth_time\":1779249036,\"iss\":\"single-ui-bff\",\"id\":\"BB10330C08EBFC787C2571502362B980\",\"exp\":1779249936,\"iat\":1779249036,\"jti\":\"single-ui-bff-id\",\"oud\":\"{\\\"lastName\\\":\\\"Lu\\\",\\\"firstName\\\":\\\"Shuai\\\",\\\"country\\\":\\\"CN\\\",\\\"fullName\\\":\\\"Lu, Shuai\\\",\\\"emailId\\\":\\\"Shuai.Lu@sc.com\\\",\\\"locale\\\":null,\\\"userId\\\":\\\"1639796\\\"}\"}",
"oud": "{\"lastName\":\"Lu\",\"firstName\":\"Shuai\",\"country\":\"CN\",\"fullName\":\"Lu, Shuai\",\"emailId\":\"Shuai.Lu@sc.com\",\"locale\":null,\"userId\":\"1639796\"}",
```

# Pilot Users

Pilot users need to visit link below to enable entra sso

[https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes](https://fmo-mfe.gdc.standardchartered.com:8453/?ENABLE_ENTRA_SSO=yes)

After first time visiting with the link, the sso will switch to Entra by default and no further ENABLE_ENTRA_SSO flag required.

| Business | Owners | Prod Pilot Users | Prod UVT Sign-off | Rollout Signoff |
| --- | --- | --- | --- | --- |
| Ratan - Settlement | @Arockia Dinesh @Ruiheng Cao @Long Wang | @Wei Ming Eeh (1577762) @Gokulakrishnan R (1254467) @Cordelia Sumita K Thirunavukarasu (1129381) @D52, Vignesh (1405593) Subesh Shakya (1531346) Thiyagarajan K (1221334) Sabreen N, Naufia (2027311) M, Manjunath (2007316) L, Vikas (2004876) M, Logeashwari (1404876) Leong, Weng Hien (1521279) Siew, Zhan Hoong (1533263) Abd Kadir, Nur Iylia (1489487) Anthony, Reena Mary (1603659) Yong, Damian Kok Loong (1607900) Rujal Lal Joshi (1328902) Nilima Shakya (1493132) Mahhiyuddin, Amir Mustaqim (1456022) Nanthagopal, Logeswari (2036413) Shankar M, Shiva (1434424) Rayenston, Vijay (1353118) K, Deepak (2018468) Dinesh, Arockia (1289935) Sarika T (1345476) | | 📎 [[Action Required] Re_ Post Trade Portal Entra Migration Notices - Settlement.eml](attachments/[Action Required] Re_ Post Trade Portal Entra Migration Notices - Settlement.eml) |
| Ratan - Trade | @Jeannie Wee @Jay Zhou @Wayne Wang | <u>Trade Validation</u> Takagi, Piotr (2025650) Raghavan, Anand Talari, Damodar (1663077) Sivaraman, Venusala (1489465) Lee, Zhen Yu (2007961) Mohan, Durkes (2026480) Loo, Jia Wen (1641336) <u>Exception Management</u> PS, Gayathri [Gayathri.PS@sc.com](mailto:Gayathri.PS@sc.com) [Manikandan.Subramanian@sc.com](mailto:Manikandan.Subramanian@sc.com) [Suresh.Ashok@sc.com](mailto:Suresh.Ashok@sc.com) [Gireesh.V@sc.com](mailto:Gireesh.V@sc.com) [NurulZaiti.Soaidi@sc.com](mailto:NurulZaiti.Soaidi@sc.com) [WeiKee.Ang@sc.com](mailto:WeiKee.Ang@sc.com) [Deepak.S2@sc.com](mailto:Deepak.S2@sc.com) [Nidhi.Dixit@sc.com](mailto:Nidhi.Dixit@sc.com) <u>FOS</u> [Vajresh.Prabhu@sc.com](mailto:Vajresh.Prabhu@sc.com) (1549476) [Prabavati.Munusamy@sc.com](mailto:Prabavati.Munusamy@sc.com) (1585188) [JiaYing.Teh@sc.com](mailto:JiaYing.Teh@sc.com) [Devendra.Pise@sc.com](mailto:Devendra.Pise@sc.com) (1502914) [Nikhil.SinghPawar@sc.com](mailto:Nikhil.SinghPawar@sc.com) [Punith.KumarS@sc.com](mailto:Punith.KumarS@sc.com) [Sharath.S@sc.com](mailto:Sharath.S@sc.com) (2010916) [Ravi.Shankar2@sc.com](mailto:Ravi.Shankar2@sc.com) (2011071) | | C&A 📎 [Re_ [Action Required] Re_ Post Trade Portal Entra Migration Notices - C&A.eml](attachments/Re_ [Action Required] Re_ Post Trade Portal Entra Migration Notices - C&A.eml) |
| FSS | @Madhuri Mamidi @Dheeraj Hegde @Mahalakshmi M @Balakrishnan R | PFB the final list for FSS Services – 51786 for ENTRA UVT verification | S. No | FSS Services Tile Name | Module Name | SPOC Details | | --- | --- | --- | --- | | 1 | FSS Peregrine DAC | Peregrine | <u>[Kaushik.VS@sc.com](mailto:Kaushik.VS@sc.com)</u> <u>[K.Prabakaran@sc.com](mailto:K.Prabakaran@sc.com)</u> | | 2 | FSS Rule Management | China ETF | <u>[SerenaShiYun.Fan@sc.com](mailto:SerenaShiYun.Fan@sc.com)</u> | | 3 | Payments- Reference | | 4 | Payments -Transaction | | 5 | BAP Digitization | FSS BAP | <u>[DarrenWeiHao.Tay@sc.com](mailto:DarrenWeiHao.Tay@sc.com)</u> | | 6 | FSS Reference Management | Mirror Memo | YTD | | 7 | FSS Payment Transaction | YTD | | 8 | FSS Rule Management | YTD | | 9 | FSS Business Rules | YTD | | 10 | FA - Reference | Fees & accural | <u>[AndyLi.Wang@sc.com](mailto:AndyLi.Wang@sc.com)</u>, <u>[Deepak.M4@sc.com](mailto:Deepak.M4@sc.com)</u>, <u>[Suresh.Rajandran@sc.com](mailto:Suresh.Rajandran@sc.com)</u> | | 11 | FA - Transaction | | 12 | FX True Up & RIK | LGI | <u>[Bryan.Lee1@sc.com](mailto:Bryan.Lee1@sc.com)</u> | | 13 | FSS Funds Reference | | 14 | FSS Swing Price Metrics | FSI | <u>[Peishi.Ke@sc.com](mailto:Peishi.Ke@sc.com)</u> | | 15 | FSS Fair Price Metrics | | 16 | FSS Funds Reference | | 17 | Billing -Evat | EVAT Billing - MY | <u>[VinodKumar.Manoharan@sc.com](mailto:VinodKumar.Manoharan@sc.com)</u> | | 18 | Billing -Evat | EVAT Billing - GH | <u>[GummaRajuSai.RamCharan@sc.com](mailto:GummaRajuSai.RamCharan@sc.com)</u> | | 19 | FSS - Billing | Billing Module | <u>[Krishnan.Srikanth@sc.com](mailto:Krishnan.Srikanth@sc.com)</u>, <u>[Jayapal.Kuppuswamy@sc.com](mailto:Jayapal.Kuppuswamy@sc.com)</u> | | 20 | Exception Dashboard | Custody Dashboards | [KotagiriVinay.Chandra@sc.com](mailto:KotagiriVinay.Chandra@sc.com), [Aishwarya.SathisKumarIlavarasi@sc.com](mailto:Aishwarya.SathisKumarIlavarasi@sc.com) | | ![image-2026-5-26_10-57-28.png](attachments/image-2026-5-26_10-57-28.png) ![image-2026-5-26_10-57-47.png](attachments/image-2026-5-26_10-57-47.png) 📎 [RE_ FSS Services - RATAN Entra Migration Support - 16th May 2026.eml](attachments/RE_ FSS Services - RATAN Entra Migration Support - 16th May 2026.eml) ![image-2026-5-26_14-32-56.png](attachments/image-2026-5-26_14-32-56.png) | 📎 [RE_ Entra Rollout Pre-Cap for Markets Operation Portal - FSS Signoff.eml](attachments/RE_ Entra Rollout Pre-Cap for Markets Operation Portal - FSS Signoff.eml) |
| S. No | FSS Services Tile Name | Module Name | SPOC Details |
| 1 | FSS Peregrine DAC | Peregrine | <u>[Kaushik.VS@sc.com](mailto:Kaushik.VS@sc.com)</u> <u>[K.Prabakaran@sc.com](mailto:K.Prabakaran@sc.com)</u> |
| 2 | FSS Rule Management | China ETF | <u>[SerenaShiYun.Fan@sc.com](mailto:SerenaShiYun.Fan@sc.com)</u> |
| 3 | Payments- Reference |
| 4 | Payments -Transaction |
| 5 | BAP Digitization | FSS BAP | <u>[DarrenWeiHao.Tay@sc.com](mailto:DarrenWeiHao.Tay@sc.com)</u> |
| 6 | FSS Reference Management | Mirror Memo | YTD |
| 7 | FSS Payment Transaction | YTD |
| 8 | FSS Rule Management | YTD |
| 9 | FSS Business Rules | YTD |
| 10 | FA - Reference | Fees & accural | <u>[AndyLi.Wang@sc.com](mailto:AndyLi.Wang@sc.com)</u>, <u>[Deepak.M4@sc.com](mailto:Deepak.M4@sc.com)</u>, <u>[Suresh.Rajandran@sc.com](mailto:Suresh.Rajandran@sc.com)</u> |
| 11 | FA - Transaction |
| 12 | FX True Up & RIK | LGI | <u>[Bryan.Lee1@sc.com](mailto:Bryan.Lee1@sc.com)</u> |
| 13 | FSS Funds Reference |
| 14 | FSS Swing Price Metrics | FSI | <u>[Peishi.Ke@sc.com](mailto:Peishi.Ke@sc.com)</u> |
| 15 | FSS Fair Price Metrics |
| 16 | FSS Funds Reference |
| 17 | Billing -Evat | EVAT Billing - MY | <u>[VinodKumar.Manoharan@sc.com](mailto:VinodKumar.Manoharan@sc.com)</u> |
| 18 | Billing -Evat | EVAT Billing - GH | <u>[GummaRajuSai.RamCharan@sc.com](mailto:GummaRajuSai.RamCharan@sc.com)</u> |
| 19 | FSS - Billing | Billing Module | <u>[Krishnan.Srikanth@sc.com](mailto:Krishnan.Srikanth@sc.com)</u>, <u>[Jayapal.Kuppuswamy@sc.com](mailto:Jayapal.Kuppuswamy@sc.com)</u> |
| 20 | Exception Dashboard | Custody Dashboards | [KotagiriVinay.Chandra@sc.com](mailto:KotagiriVinay.Chandra@sc.com), [Aishwarya.SathisKumarIlavarasi@sc.com](mailto:Aishwarya.SathisKumarIlavarasi@sc.com) |
| CES | @Jayan Balanathan | | | 📎 [RE_ Entra Rollout Pre-Cap for Markets Operation Portal - CES Signoff.eml](attachments/RE_ Entra Rollout Pre-Cap for Markets Operation Portal - CES Signoff.eml) |
| LoanIQ | @Velmurugan Subramani | | | 📎 [RE_ Entra Rollout Pre-Cap for Markets Operation Portal - LoanIQ.eml](attachments/RE_ Entra Rollout Pre-Cap for Markets Operation Portal - LoanIQ.eml) |
| SSDR | @Liang Zong | @Hong Wang @Dandan Tian | ![image-2026-5-26_11-5-42.png](attachments/image-2026-5-26_11-5-42.png) | 📎 [RE_ Entra Rollout Pre-Cap for Markets Operation Portal - SSDR Signoff.eml](attachments/RE_ Entra Rollout Pre-Cap for Markets Operation Portal - SSDR Signoff.eml) |
| SSI+ | @Nithin Thekkumpurath | @Shiva Shankar M @Megha M | | 📎 [RE_ Entra Rollout Pre-Cap for Markets Operation Portal - SSI+ Signoff.eml](attachments/RE_ Entra Rollout Pre-Cap for Markets Operation Portal - SSI+ Signoff.eml) |
| CDUPS | @Amol Ashok Ghorpade @Fazal Kuniyil | @Manjit Kaur A/P Swaran Singh @Barameswari Sinniah @Pavitra Thirumalai | | NA |
| STAMP | @Abdel Salam Aymeric Ndiaye | @Ravi kumar A | | 📎 [Re_ Entra Rollout Pre-Cap for Markets Operation Portal - STAMP.eml](attachments/Re_ Entra Rollout Pre-Cap for Markets Operation Portal - STAMP.eml) |
