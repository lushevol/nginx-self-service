### Exiting solution

Current workflow is when user logon, it will get all the roles from EMS2 by a pre-defined entity list(Ratan). By checking these roles, if number of Roles > 1, then it has the permission to view all tiles, else failed to logon the portal.

### Proposed solution for Security control on tile level:

As a container, FMO Post Trade Portal will be available to everyone who has SC account(authentication), but will not be able to view each tile unless relevant role/permission assigned to the user.

Portal will not control the data entitlement( eg, who will be able to view the Trade Blotter Tile's data, or edit permission), these actions and management should belong to each Tile(application) itself.

when user logon, it will get all the roles from EMS2 by a pre-defined entity list for each Application onboarded.

Add new settings for each Tile:

Roles:

**Template1**: __empty__   (anyone can view)

**Trade Blotte**r: aaa ( only user has role "aaa" can see this tile)

**Cashflow Blotter**:  BBB (only user has role "BBB" can see this tile)

**CDU PS**: cdu_role(need provided by CDUPS team before onboarded to Post Trade Portal)
