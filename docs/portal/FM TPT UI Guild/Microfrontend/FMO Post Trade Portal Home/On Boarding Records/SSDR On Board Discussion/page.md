# Problem Statement

## Concerns from PSS

1. report/download users use multiple entities (RR_) with same subject name as entity.
2. download users contain LM/FH which don't have any entity related to SSDR.

# Post Trade Portal Principles

1. User should have entities in EMS2 which already registered in Admin Module for tiles. 1. enhanced with advise from security team. WI: [https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/3483771](https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/3483771), email:
2. User should have respondent subjects under entity to get access to tiles.

# Discussion Results

## Problem no.1

We can enable multiple entity and skip subject checking for tenants who don't need subject checking, user has one of the list of entity can login to Portal and see SSDR tile.

- entity: supports multiple with comma.
- subject: can be skip validation if leave empty

## Problem no.2

<details>
<summary>Expand Details</summary>

### Option 1. Best Approach

Add EMS2 entity/subject for unentitled users.

#### Pro

- Principle is consistent for Portal authentication & authorization.

#### Con

- Require works from SSDR.

<details>
<summary>Expand Details</summary>

### ~~Middle Approach~~

~~Set up a guest system for Portal, all tenant service can submit "*add guest request*" request for temporary access on specific users. users will grant entitlements in a duration.~~

~~A guest request should contains information below,~~

- ~~tile (only allow to request tiles of your team)~~
- ~~userId~~
- ~~entity (sub list of tenant tile entity config)~~
- ~~subject (sub list of tenant tile subject config)~~
- ~~expired (max duration is 7 days)~~
- ~~access times (1 → infinite)~~

~~After request permitted, the user will grant entity and subject temporary.~~

~~Guest will be removed from the list after expired.~~

~~The max guest count depends on business requirements of tenant team.~~

~~All user login includes guests will be audit.~~

Post Trade Portal doesn't implement entitlement control out of existing system like ems2.

</details>

### Option 2. Delegate Approach

Delegate authorization to SSDR.

</details>

---

# Related Discussion / Agreement Appendix

## Story

[https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/10423771](https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/10423771)
