# Attention

currently we use branch feature/RATANBAU-13239947_upgradebootversion to build one **SNAPSHOT **package 
        <dependency>
            <groupId>com.scb.fmoportal</groupId>
            <artifactId>fmoportal-auth-sdk</artifactId>
            <version>2.0.0-SNAPSHOT</version>
        </dependency>
**after do some regression testing**, can build one offical version 2.0.0 to let user integration

relavent code change:

1. PR: [Pull request 2804155: #13239947 upgradebootversion - Repos](https://dev.azure.com/sc-ado/FMQPR/_git/51358-single-ui-sdk-starter/pullrequest/2804155?_a=files) branch feature/RATANBAU-13239947_upgradebootversion checkout from branch develop-java17, which has the latest code matching doc: [Single UI SDK V1.1.4 - Derivative Strategy Projects - Confluence](https://confluence.global.standardchartered.com/display/DSP/Single+UI+SDK+V1.1.4) branch release/v2.0.0 checkout from branch release/java17

# Third Package Version Dependent List

| spring-boot-dependencies | 4.0.6 | | |
| --- | --- | --- | --- |
| spring-cloud-dependencies | 2025.1.1 | | |
| jackson-databind | 2.21.2 | | |
| | | | |

# Chage Log

1. speparate JwtConfiguration to ensure query-service can use it normally
2. move pub key to property in AuthProperties since ado sonar limitation
3. change Base64 import package following boot version upgrading
4. change relavent import clasuse due to boot version upgrading
