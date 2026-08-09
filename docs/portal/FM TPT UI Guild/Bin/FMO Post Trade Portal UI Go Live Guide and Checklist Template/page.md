Place the go live task to the list and will not forget anything to deliver.

# Should

- Each Task should has a owner
- Status: start, done, block, delay

# Guide of Deploying Package

## 1.Find Package

[https://artifactory.global.standardchartered.com/](https://artifactory.global.standardchartered.com/)

![Annotation 2023-03-22 100456.jpg](attachments/Annotation 2023-03-22 100456.jpg)

Jenkins → Application → Trunk → Main → Publish

![Annotation 2023-03-22 100617.jpg](attachments/Annotation 2023-03-22 100617.jpg)

## 2.Deploy 1.0.0-XXXXXX.TRUNK

## ![image2023-3-22_10-19-19.png](attachments/image2023-3-22_10-19-19.png)

# Guide of config tile menu for UAT and Dev

## UAT Menu Config

mfe-base: \src\components\Drawer\common\TilesConfig.uat.ts

## DEV Menu Config

mfe-base: \src\components\Drawer\common\TilesConfig.dev.ts

![Annotation 2023-03-22 103018.jpg](attachments/Annotation 2023-03-22 103018.jpg)

# Checklist Template

| Task Name | Description | Owner | Status |
| --- | --- | --- | --- |
| Build application package and deploy to dev | Merge branch to trunk Jenkins will build and deploy to dev. Jenkins → Application → Trunk → Main ![Annotation 2023-03-22 100208.jpg](attachments/Annotation 2023-03-22 100208.jpg) | | |
| Deploy application package to UAT | Find the package name, place it to Jenkins deploy pipeline > **INFO** > Deploy Package Guide | | |
| Deploy base container to UAT | Deploy the base container with new entries. When deployment executed, the entries will display in the Tile Menu in UAT > **INFO** > Guide of config tile menu for UAT | | |
| Nginx Config | 1. Update Static File proxy rules and Api proxy rules 2. Testing on dev 3. Sync the file to Devops, and update UAT nginx | | |
| Unit Test and Pass SonarQube and AppScan | UT coverage should more than 60%, and pass the scans. | | |
| Regression Test | Run Regression Auto Test, all cases should pass | | |
