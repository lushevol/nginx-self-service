# The Scope

As the fundamental of FM application platform,  we only focus on the following part,

1. SSO & Tile level authorization validation
2. Interoperability
3. Action Matrix tracing
4. Central Notification center (in comming)

# Authentication Principles

Users who can login to Post Trade Portal should follow below principles,

1. User should granted at least one entity of applications registered in PTP. Users without any entity from PTP is not allowed to login as there is no functionalities provide.
2. If subject is required from tile, then user entitlements should full matches the entity/subject request from tile, otherwise can't access to the tile either.
3. If subject is not required from tile (leave empty when config in Admin Module), then only entity is being validated.

## Explanations

### No.1 minor entity required

User should have entities in EMS2 which already registered in Admin Module for tiles. At least one entity contains from tile entities set.

> **INFO**
> enhanced with advise from security team. WI: [https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/3483771](https://dev.azure.com/sc-ado/FMQPR/_workitems/edit/3483771), email:
