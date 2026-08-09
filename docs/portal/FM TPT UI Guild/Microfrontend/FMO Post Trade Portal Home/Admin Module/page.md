# Overview

Currently, we maintain the Application Tiles at the source code.

![image2024-9-3_15-57-19.png](attachments/image2024-9-3_15-57-19.png) ![image2024-9-3_15-58-21.png](attachments/image2024-9-3_15-58-21.png)

# Problem

Hence, every time there is a new Application Tile on-board or existing Application Tile configuration change, then we need to:

1. modify the source code in the **51358-mfe-base **repository
2. create CR for production release.

# Proposed Solution

To make Application Tile onboarding or configuration change as a self-service, i.e. create Application Tiles for each tenant admin to maintain the Application Tile configuration, so that we can avoid the CR going forward as discussed in below email.

📎 [RE CHG0556561-UVT .msg](attachments/RE CHG0556561-UVT .msg)

![image2024-9-3_16-2-20.png](attachments/image2024-9-3_16-2-20.png)

This is the Draft for the Admin module:

#### <u>[Table Schema and Screen Draft]</u>

Additional point to discuss:

**<u>#1</u>**** **The new EMS2 Entity for the Admin Module. We have 2 options:

1. Create 1 EMS2 Entity with many Role, 1 Role for 1 team (Ratan, FSS, SS+, etc.) => 1 user can maintain 1 team only 1. EMS2 Entity: **POST_TRADE** | Subject/Role | Super Admin Role | Ratan Admin Role | SSIPLUS Admin Role | FSS Admin Role | Ratan Read-only | | | | | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | Admin Module Tiles | read-write all records | read-write Ratan Records | read-write SSIPLUS Records | read-write FSS Records | read-only Ratan Records | | | | |
2. ~~Create many EMS2 Entities, 1 EMS2 entity for 1 Team (Ratan, FSS, SS+, etc.) => 1 user can maintain multiple teams~~

Constraint: 1 user can have only 1 Role in particular EMS2 entity.

**<u>#2</u>**** **Do we need to create **new repository** or use the existing **51358-single-ui-bff**

=> We use 51358-single-ui-bff only

** **

**<u>#3</u>** New Database schema for the admin module and datasource url

```yml
PGSL_RDB_SCHEMA: post_trade_portal_service

jasypt:
  encryptor:
    password: ${RATAN_CIPHER_KEY}

spring:
  ldap:
    urls: ${OUD_URL}
  datasource:
    url: ${PGSL_RDB_URL}
    username: ${PGSL_RDB_USERNAME_HASHICORP}
    password: ${PGSL_RDB_JANUS_HASHICORP}
    driverClassName: ${PGSL_RDB_DRIVER}
  flyway:
    enabled: true
    url: ${PGSL_RDB_URL}
    user: ${PGSL_RDB_USERNAME_HASHICORP}
    password: ${PGSL_RDB_JANUS_HASHICORP}
    baseline-on-migrate: true
    baseline-version: 0
    placeholder-replacement: false
    table: post_trade_portal_service_schema_history
```
