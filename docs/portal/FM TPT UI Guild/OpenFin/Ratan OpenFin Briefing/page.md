#

# What's OpenFin

## A company

OpenFin is a fintech company that provides a secure, enterprise-grade runtime environment designed specifically for <u>**desktop**</u> applications in <u>**financial**</u> services industry.

> **INFO**
> OpenFin has been rebranded to **Here™**

## A desktop product

OpenFin is a web runtime and operating environment designed for enterprise app development. Built on web standards, OpenFin dramatically enhances the capabilities of web apps, enabling end-user experience and enterprise controls well beyond what is possible with browsers like Chrome and Edge or with frameworks like Electron and Chromium Embedded Framework.

### Benifits

- Desktop experience (shortcuts, start menu, offline access, caching, etc)
- Interoperability (cross application with minor efforts)
- Notification

# Architecture of OpenFin

OpenFin desktop product is built base on Electron and chromium.

![](https://confluence.global.standardchartered.com/download/attachments/3270865431/image-2025-3-14_12-13-31.png?version=1&modificationDate=1741925611000&api=v2)

Here is architecture of OpenFin

![](https://resources.here.io/docs/core/assets/images/Here-Core-architecture-31da5aaf48ccd44f5c8a0b39f8472c36.png)

For the current license, we don't have access to Here Core UI Components (expect part of Notification). Ratan solution is based on OpenFin Container.

For the current business cases in Market, we only focus on rendering applications and interoperability. (3rd-party integrations and Native Adapters are not in plan).

# Runtime & RVM Update

The **Runtime **component provides the runtime environment in which Here™ Core apps and platforms are executed.

![image-2025-12-25_23-42-35.png](attachments/image-2025-12-25_23-42-35.png)

The **Runtime Version Manager (RVM)** controls the installation and update of the Runtime. It is responsible for launching the Runtime in order to execute Here Core apps.

- [Installing itself and Runtime](https://resources.here.io/docs/core/manage/rvm/how-it-works#installation)
- [RVM error reporting](https://resources.here.io/docs/core/manage/data/error-reporting)
- [Hosting assets](https://resources.here.io/docs/core/manage/desktops/host-assets)
- [Enable HTTPS security features](https://resources.here.io/docs/core/manage/security/https-security)
- [Semantic versioning](https://resources.here.io/docs/core/develop/manifests/semantic-versioning)
- Multi-Runtime environments
- App Assets & Services
- OS-level features such as auto-launch on startup, branded shortcuts, splash screens, and download progress bar
- [License tracking](https://resources.here.io/docs/core/manage/data/license-data)
- etc.

> **INFO**
> All OpenFin version updates are published in [https://cdn.openfin.co/versions](https://cdn.openfin.co/versions/)

## FM Runtime Version Strategy

Both Ratan and Blade is specify runtime version to "**stable-v41**" which is 41.134.103.3**.**

It's formal approval to use this channel with approval through the Group Technology Standards.

![image-2025-12-25_23-47-1-1.png](attachments/image-2025-12-25_23-47-1-1.png)

# Manifest

A manifest is a unique bootstrap for an openfin instance.

> **INFO**
> A manifest is a JSON file that configures a *HERE Core app* or *platform*.

A simple manifest for launching

```js
{
   "startup_app": {
       "name": "post-trade-portal",
       "url": "https://fmo-mfe.gdc.standardchartered.com:8453",
       "uuid": "AUniqueIdentifierForYourApp",
       "autoShow": true
   },
   "runtime": {
       "version": "stable-v41"
   }
}
```

# New user on boarding

New users to openfin can refer to manual guide: [Ratan OpenFin Installation]

# License

RVM will report the usage of OpenFin license automatically, includes informations,

- **License key**: Unique identifier for your Here™ license
- **Machine ID**: Non-personal, anonymous unique ID for the machine and user account
- **App ID**: URL of the application manifest file
- Other config data and events ...

The OpenFin licenses are owned from a renewal perspective by Blade PSS. **Prathap Reddy** has been involved in this for a couple of years now and is familiar with the process. 
Blade currently pay 80% of the cost for 1,600 licenses with CAT pay 20% for 400 licenses.

**EXPAND: License sharing approval from Blade**

![image-2026-1-21_13-50-23.png](attachments/image-2026-1-21_13-50-23.png)

**EXPAND_END**

# User Journey

## Platform Provider

The **platform provider** is the communication hub that coordinates among all windows in a platform. This provider runs in a hidden window. With a custom provider, you can override or extend default platform behavior. [https://resources.here.io/docs/core/container/platform/customize#platform-behavior](https://resources.here.io/docs/core/container/platform/customize#platform-behavior)

In Ratan's case, we rewrite platform provider's behavior on routing intents.

# FDC3

***Financial Desktop Connectivity and Collaboration Consortium***

FDC3 is an <u>**open standard**</u> for applications on financial desktop to interoperate and exchange data with each other. we use FDC3 to implement interoperation actions.

For more details please refer:[Intent Declarations]

# Contracts

| SCB | CAT Team | - | Mohamed Ait Hassoune |
| --- | --- | --- | --- |
| Blade Team | Blade PSS | Prathap Reddy |
| OpenFin Official | HERE Support | Official Support | support@[here.io](http://here.io) |
| Jesper Bruun-olsen | Account Manager/PM | [jesper.bruun-olsen@openfin.co](mailto:jesper.bruun-olsen@openfin.co) |

# Approval & Prioritization Status

OpenFin as a Desktop capability solution is already approved in VAT.

[VAT Request - Blade H1 2025 - Financial Markets Virtual Architecture Team - Confluence](https://confluence.global.standardchartered.com/display/FMVAT/VAT+Request+-+Blade+H1+2025)

[Blade 2024 H2_Detailed Design_2024-07-31](https://confluence.global.standardchartered.com/display/ENTARCH/Blade+2024+H2_Detailed+Design_2024-07-31)

**The adoption for Openfin in Ratan is prioritized by CPO Mourad, Benjamin**

![image-2025-12-26_12-57-11.png](attachments/image-2025-12-26_12-57-11.png)

# Ratan Business Cases

## View Trade Details in Blade

[https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/11655834](https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/11655834)

## View Remaining Amount in Ratan

[FXU Remaining Amount via OpenFin]

# Release Phases

| Phase | Type | Deliverable | Timeline | Notes |
| --- | --- | --- | --- | --- |
| Phase 1 | Technical | User identification verification on PROD | End of July | No PSS support required. No impact to existing browser launched MO1 applications. |
| Phase 2 | Technical | Onboard cashflow blotter/trade blotter to OpenFin | End of Oct | |
| Phase 3 | Business | Onboard users to OpenFin interface | End of Nov | |

# Open Questions

## Entra sso supporting in OpenFin

Yes, OpenFin natively support Entra SSO.

## Desktop Owner Settings supporting

Blade is working on it.
