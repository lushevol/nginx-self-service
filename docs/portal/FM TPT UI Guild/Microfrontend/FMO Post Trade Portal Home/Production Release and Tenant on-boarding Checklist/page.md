This document explains the activity on the Production Release and Tenant on-boarding to the FMO Portal **including new Business User Location on-boarding or introducing new Tenant servers**.

Bellow are the required steps.

# Release Tenant EMS2 to production

Please approach EMS2 team to release EMS2 to production. These are the EMS2 Email:

1. [SABREChangeMgmt@exchange.standardchartered.com](mailto:SABREChangeMgmt@exchange.standardchartered.com)
2. [SABRE.PSS@sc.com](mailto:SABRE.PSS@sc.com)

Sample CR: CHG0657383

![image2025-2-21_12-18-51.png](attachments/image2025-2-21_12-18-51.png)

# Create or Update OLA Document

Request latest OLA template from RATAN PSS, update it base on your application metrics, ask for review and approval from your PSS then request review and approval from RATAN PSS.

DL:  [RATAN_PSS_SME@exchange.standardchartered.com](mailto:RATAN_PSS_SME@exchange.standardchartered.com)

# Perform PEN-TEST

Please perform Pen-Test for the tenant API. You can check other Pen-Test result on this page: <u>**[Security Testing]**</u>

Please share the Pen-Test result. You can update the same confluence page above.

You can approach FMO Portal Team to fix any issue reported.

# Business user can access Production FMO Portal

Please verify that Business user can access [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/), users can see the login page (there is no need to login).

Please check these emails, if Business users can not access  [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/).

📎 [RE Catalyst - FSSCOP Migration to FSS Services.msg](attachments/RE Catalyst - FSSCOP Migration to FSS Services.msg)

📎 [RE Catalyst - FSSCOP Migration to FSS Services-All.msg](attachments/RE Catalyst - FSSCOP Migration to FSS Services-All.msg)

# FMO Portal servers can access Tenant servers

Please verify that FMO Portal servers can access Tenant servers. These are the production FMO Portal servers.

NGINX/Load Balancer/ VIP:

- 10.4.194.240
- 10.4.194.241
- 10.4.197.240

MFE Services:

- [uklvapapp590.gdc.standardchartered.com](http://uklvapapp590.gdc.standardchartered.com) / 10.4.194.78
- [uklvapapp591.gdc.standardchartered.com](http://uklvapapp591.gdc.standardchartered.com) / 10.4.194.79
- [uklvapapp676.gdc.standardchartered.com](http://uklvapapp676.gdc.standardchartered.com) / 10.4.197.46
- [uklvasapp590.gdc.standardchartered.com](http://uklvasapp590.gdc.standardchartered.com) / 10.4.194.179
- [uklvasapp591.gdc.standardchartered.com](http://uklvasapp591.gdc.standardchartered.com) / 10.4.194.180
- [uklvasapp676.gdc.standardchartered.com](http://uklvasapp676.gdc.standardchartered.com) / 10.4.197.146

![](https://confluence.global.standardchartered.com/download/attachments/2636221681/image2023-9-5_13-12-22.png?version=1&modificationDate=1693890742000&api=v2)

To simply the configuration, We recommend that FMO Portal servers only access Tenant NGINX or Load Balancer. All the Tenant servers are behind the Tenant NGINX or Load Balancer.

With this approach, Tenant can have new server and port, and it will be on Tenant control.

Please check this email below to request the connection checking from FMO Portal servers to Tenant servers.

📎 [RE STAMP integrate with FMO Post Trade portal.msg](attachments/RE STAMP integrate with FMO Post Trade portal.msg)
 
📎 [RE RITM3089604 -- Create firewall configurations..msg](attachments/RE RITM3089604 -- Create firewall configurations..msg)

# Release Tenant Tiles to Production

Please follow this document: <u>**[Admin Module Release Flow]**</u> to release the Tiles to production.
