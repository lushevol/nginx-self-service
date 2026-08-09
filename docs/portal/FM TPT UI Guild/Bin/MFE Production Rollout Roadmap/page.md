# 1. High Level Roadmap

![image2023-2-23_16-42-8.png](attachments/image2023-2-23_16-42-8.png)

# 2. Detailed Aspects

| # | Items | Components Progress Status | Owner | Remarks |
| --- | --- | --- | --- | --- |
| 1 | blotters migration including new UX implementation | - [x] Trade Blotter - [x] Cashflow Blotter - [x] Rule Blotter - [x] Exception Blotter - [x] New UX implementation | @Jialin Wang | 2023-02-23 Nick: 1. The blotter migration is in progress, migration itself is done for trade blotter, cashflow blotter, exception blotter, and partial of rule blotter 2. The new UX design is just kickoff, need feedbacks from Juanita, this is something not clear so far |
| 2 | DevOps for packaging and deployment (new domain, nginx configuration, packaging) | - [x] New Domain Initialization - [ ] Nginx Configuration for MFE - [ ] Frontend Packaging - [ ] New Backend SSO Service - [ ] New Backend SDK - [ ] Existed Rule Service - [ ] Existed Auth Service - [ ] Existed API Gateway - [ ] Existed BFF | @Hui Zhang @Long Wang | 2023-02-23 Nick: DevOps: 1. we will request a new DNS for MFE frontend and to do configuration accordingly onto nginx 2. ability of building the release packages for frontend and backend packages, including the release version of the SDK 3. to build the release packages for all relevant codes |
| 3 | Function regression | - [ ] Trade Blotter UI - [ ] Cashflow Blotter UI - [ ] Rule Blotter UI - [ ] Exception Blotter UI - [ ] Business Regression | @Jialin Wang | 2023-02-23 Nick: 1. we will have to re-init the automation test cases for the new MFE implementation on cypress, which will require a lot efforts for it |
| 4 | PSS/user engagement and signoff | - User Signoff For - [ ] Trade Blotter - [ ] Cashflow Blotter - [ ] Rule Blotter - [ ] Exception Blotter - PSS Signoff For TBU | | 2023-02-23 N/A |
| 5 | Production Release preparation | - SIA - RAT - CR - ??? | | |
