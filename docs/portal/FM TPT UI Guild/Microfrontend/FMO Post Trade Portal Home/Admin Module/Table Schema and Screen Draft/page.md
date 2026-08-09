## Table Schema

### Application Category

| Column | Data Type | Description |
| --- | --- | --- |
| category_id | Number | Primary Key |
| label | String | |
| ems2_role | String | who can access this and child records |
| disabled | Boolean | |
| created_by | String | |
| created_date | Date | |
| last_updated_by | String | |
| last_updated_date | Date | |

This Application Category table is used to record these categories highlighted below picture.

![image2024-9-3_15-36-57.png](attachments/image2024-9-3_15-36-57.png)

### Application Tile

| Column | Data Type | Description |
| --- | --- | --- |
| tile_id | Number | Primary Key |
| category_id | Number | Foreign Key (Parent Key) |
| title | String | |
| imageDarkTheme | String | |
| imageLightTheme | String | |
| disabled | Boolean | |
| container | String | |
| module | String | |
| tile | String | |
| ems2_subject | String | who can see this Tile in the drawer |
| isTemplate | String | |
| emailSupport | String | |
| created_by | String | |
| created_date | Date | |
| last_updated_by | String | |
| last_updated_date | Date | |

This Application Tile table is used to record these Tile configuration.

![image2024-9-3_15-45-41.png](attachments/image2024-9-3_15-45-41.png)

![image2024-9-3_15-40-23.png](attachments/image2024-9-3_15-40-23.png)

### Tile Authorization

| Column | Data Type | Description |
| --- | --- | --- |
| authorization_id | Number | Primary Key |
| tile_id | Number | Foreign Key (Parent Key) |
| ems2_entity | String | who can see this Tile in the drawer |
| disabled | Boolean | |
| created_by | String | |
| created_date | Date | |
| last_updated_by | String | |
| last_updated_date | Date | |

This Tile Authorization table is used to record these Entity configuration.

![image2024-9-3_15-48-45.png](attachments/image2024-9-3_15-48-45.png)

## Application Screen

### Application Category Screen

| ID | Category Label | EMS2 Role | Is Disabled? | Created By | Created Date | Last Updated By | Last Updated Date | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Cashflow | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

### New or Edit Application Category Form Screen

### Application Tile Screen

| Application Category | Template | |
| --- | --- | --- |

| ID | Category Label | Title | Image Light Theme URL | Image Dark Theme URL | Container Path | Module Path | Tile Path | Email Support | EMS2 Subject | Is Disabled? | Is Template? | Created By | Created Date | Last Updated By | Last Updated Date | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | | | | | | | | | | |
| 2 | | | | | | | | | | | | | | | | |
| 3 | | | | | | | | | | | | | | | | |

### Tile Authorization Screen

| Application Category | Template | |
| --- | --- | --- |
| **Application Tile** | **Analytics** | |

| ID | Category Label | Tile Title | EMS2 Entity | Is Disabled? | Created By | Created Date | Last Updated By | Last Updated Date | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |
| 3 | | | | | | | | | |

Any user that has Admin Module EMS2 Entity and Subject can see these Tiles:

![image2024-8-28_11-56-54.png](attachments/image2024-8-28_11-56-54.png)
