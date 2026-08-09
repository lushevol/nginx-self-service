This document discusses on

# Release flow to UAT and Production

Below is the high-level flow. The repository mentioned on the below diagram is owned by each team. Each team (RATAN, FSS, SSI+, etc.) should take responsibility for maintaining the Tile Configuration (adding new Tile or updating the existing configuration) in Development, UAT, and Production environment. This also includes creating **CR**, **ADO** **WI**, and **ADO** **Pipeline **for UAT and Production release.

These are the complete steps:

1. Modify any configuration (**Module Map**, **Drawer Category**, **Tile Configuration**) in **Development **environment (**[https://fmo-mfe-dev.uk.dev.net:8453/](https://fmo-mfe-dev.uk.dev.net:8453/)**). Please follow this <u>**[User Manual]**</u>.
2. Download the **Module Map**, **Drawer Category**, **Tile Configuration **CSV from the **Development **environment. We have provide **Export **button in **Module Map**, **Drawer Category**, **Tile Configuration** Tile to download the data as CSV file.
3. ![image2025-2-12_9-45-3.png](attachments/image2025-2-12_9-45-3.png)![image2025-2-11_16-14-1.png](attachments/image2025-2-11_16-14-1.png)
4. ![image2025-2-12_9-46-28.png](attachments/image2025-2-12_9-46-28.png)![image2025-2-11_16-14-24.png](attachments/image2025-2-11_16-14-24.png)
5. ![image2025-2-12_9-48-24.png](attachments/image2025-2-12_9-48-24.png)![image2025-2-11_16-14-45.png](attachments/image2025-2-11_16-14-45.png)
6. Create new repository or update your repository with these **Module Map**, **Drawer Category**, **Tile Configuration **CSV files.
7. The ADO pipeline for the repository mentioned on **step no 6**, should call the FMO Portal Admin service: **https://<<server_name>>:8453/api/auth/v1/fmo/admin/config/upload** with providing **FMAA JWT Token**.
8. The **<<server_name>>** mentioned in **step no 7** is listed below | ENV | URL | Description | | --- | --- | --- | | UAT | [https://fmo-mfe.uk.dev.net:8453/](https://fmo-mfe.uk.dev.net:8453/) | User Testing and Sign off | | STAGING | [https://fmo-mfe-preprod.pi.dev.net:8453/](https://fmo-mfe-preprod.pi.dev.net:8453/) | Rehearse and Deploy Testing, same env as Prod | | PROD | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) | For Buiness User |
9. <u>**If you are uploading the configs on your own service, please confirm that it can reach out to Admin Module Service on Prod, otherwise the upload won't success. **</u>

# ADO Pipeline with FMAA JWT Token

1. Each application needs to have service account in **FMAA/OUD**. Each application can create their **service account** via oud in both non-production and production. The oud password can integrate with [***hashicorp***](https://www.google.com/search?sca_esv=99b72eded8c7f00f&rlz=1C1GCEA_enSG1030SG1030&q=hashicorp&spell=1&sa=X&ved=2ahUKEwixhIull8CLAxUSR2wGHe4hCdQQkeECKAB6BAgIEAE). Refer: ** （**if can't access can view** [Reference of FMAA API]****）**
2. Service account and password will be converted to base64. With the service account id and password tenant converted to base64 can call the FMAA to get the JWT. 1. curl --location --request POST '**[https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token?grant_type=client_credentials](https://fmaauat.gdc.standardchartered.com/v1/fmaa/oauth2/access_token?grant_type=client_credentials)**' --header 'Authorization: Basic ##############' --data **Patten of Authorization header**: "Basic <<Base64 encoding of service_account_id:password>>" 2. ![image2025-2-13_16-12-11.png](attachments/image2025-2-13_16-12-11.png)
3. Use this JWT from FMAA to call the FMO upload API [ **https://<<server_name>>:8453/api/auth/v1/fmo/admin/config/upload** ] 1. ![image2025-2-14_10-59-23.png](attachments/image2025-2-14_10-59-23.png)
4. Inside the FMO upload API will verify the FMAA JWT before process the CSV files.

Please help me to update this table

| Team | FMAA Service Name |
| --- | --- |
| RATAN | RATAN_PROD |
| FSS | FSS_PROD |
| SSI+ | SSIPLUS_PROD |
| LOANIQ | srv.liquser.001 |
| SSDR | srv.51507.ssdr.002 |
| STAMP | |
| | |
| | |

# Example of New Repository

📎 [FMO-Tiles.zip](attachments/FMO-Tiles.zip)

Please download the example project to maintain your CSV files.

![image2025-2-17_17-12-34.png](attachments/image2025-2-17_17-12-34.png) ![image2025-2-17_17-13-40.png](attachments/image2025-2-17_17-13-40.png)

![image2025-2-17_17-16-36.png](attachments/image2025-2-17_17-16-36.png)

![image2025-2-17_17-18-33.png](attachments/image2025-2-17_17-18-33.png)

![image2025-2-17_17-20-55.png](attachments/image2025-2-17_17-20-55.png)

# Bulk insert for the first time into UAT and Production environment

For the first time bulk insert into UAT and Production Environment will be handled by **51358-single-ui-bff** repository production release.

![image2025-2-11_16-21-25.png](attachments/image2025-2-11_16-21-25.png)
