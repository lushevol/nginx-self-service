This document explain how to deploy the Frontend code to the UAT, Pilot (Staging), Production.

## The Artifacts

The main different between Backend and Frontend deployment is on the artifact. **The Frontend artifact is static files and it does not need scalable server and it deploys one version only (latest version).**

The Frontend deployment is to store/put the static files to the Server Machine that can be accessed from the Client Machine.

The static files are either JavaScript, Cascading Style Sheet (CSS), images (png, jpeg, svg, etc.), JavaScript Object Notation (JSON).

These static files are the deployment artifacts which produced by the Jenkins Pipeline Job.

In the diagram below, the artifacts are the files under the **dist **folder highlighted by **blue box**.

## Branching Strategy

The main important thing in the branching strategy is to minimize the routine and human interaction or manual process.

In the diagram below, there are only 3 Long Live Branches: TRUNK, RELEASE/PROD, and MAIN.

For every feature ticket, the developer can create new branch from TRUNK branch and should be merge again to the TRUNK branch through Pull Request (PR).

For every production bugs, the developer can create new branch from RELEASE/PROD branch. Once the fix is completed then developer creates PR to TRUNK to get UAT Signoff. Once the bug is tested and signed off by the UAT team, then developer can create PR to RELEASE/PROD branch.

In this approach the routines or human interaction or manual process are

1. Create Feature branch
2. Create Prod Bug branch
3. Create PR to TRUNK
4. Create PR to RELEASE/PROD
5. Create PR to MAIN

The deployment to the server machine (either UAT and/or PILOT and/or PROD) can be done by the Jenkins Pipeline.

All the Branching Patterns can be found in this document: [https://martinfowler.com/articles/branching-patterns.html](https://martinfowler.com/articles/branching-patterns.html)

Most of Finance Projects are using Release Train Model ([https://martinfowler.com/articles/branching-patterns.html#release-train](https://martinfowler.com/articles/branching-patterns.html#release-train)) because of Most of the System (either Frontend or Backend is still in the Monolith model)

The proposed model is following [https://trunkbaseddevelopment.com/](https://trunkbaseddevelopment.com/) because we are implementing the Micro-Frontend. Trade blotter and Cashflow blotter will have different repository and have different Agile team.

## Deployment Patterns

The important thing on the deployment is able to meet our needs, to serve the static files to the client (Desktop Browser, Mobile Browser, Mobile WebView, Openfin).

Moreover Frontend does not need a scalable server (the artifact is just static files) and it deploys the one version only (latest version).

From the available patterns below, the one that meet the requirement explained above is the Blue-green deployment.

We can set the BLUE is PRODUCTION and the GREEN is PILOT.

**Both PRODUCTION and PILOT are accessing the same Backend.**

![pattern.jpg](attachments/pattern.jpg)

## Jenkins Pipeline

As explained on the branching strategy, the branches that has link to the servers are TRUNK and RELEASE/PROD.

To make sure that the codes merged to TRUNK do not have any issue then for every git commit on the feature or production bug branch we should run the **npm test** and **npm run build**. If necessary we can run sonarqube scan only to make sure there is no issue on the codes before we merge to TRUNK branch.

It mean the Jenkins job should be triggered by the git push. Hence, we need to use Multibranch Pipeline ([https://www.jenkins.io/doc/book/pipeline/multibranch/](https://www.jenkins.io/doc/book/pipeline/multibranch/))

![image2023-1-10_12-37-22.png](attachments/image2023-1-10_12-37-22.png)

With the Multibranch Pipeline, We can run the job for every:

1. git push to any feature or production bugs branch (it will run checkout, npm install, npm test, npm run build, sonarqube). There is **no** 3<sup>rd</sup> party lib scanning, publish the artifact, and deploy.
2. PR merge to trunk branch (it will run checkout, install, test, build, sonarqube, **3<sup>rd</sup> party lib scanning, publish the artifact, deploy** )
3. PR merge to pilot/production (blue/green) branch (it will run checkout, install, test, build, sonarqube, 3<sup>rd</sup> party lib scanning, publish the artifact, and **it will create CR Jira for management approval before pilot/production deployment**)

The Pilot and Production deployment should be done manually and can be done by the specific team only.

To deploy the codes/artifact to Pilot or Production the Created JIRA should be approved by the production owner.

This is the example of jenkinsfile: [https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe_root_config/browse/.jenkinsfile?at=refs%2Fheads%2Fpipeline](https://bitbucket.global.standardchartered.com/projects/RATANRT/repos/mfe_root_config/browse/.jenkinsfile?at=refs%2Fheads%2Fpipeline)

![image2023-1-10_12-56-54.png](attachments/image2023-1-10_12-56-54.png)
