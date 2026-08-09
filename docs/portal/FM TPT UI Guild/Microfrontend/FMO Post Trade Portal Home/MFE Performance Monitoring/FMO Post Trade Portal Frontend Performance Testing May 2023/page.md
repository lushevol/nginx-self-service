# *Micro-frontend performance testing*

**EXPAND: Document History**

## Document History

### Document Information

| Document Name | FMO Post Trade Portal Frontend Performance Testing May 2023 |
| --- | --- |
| **Status** | Draft |
| **Date Last Edited** | 2023-05-23 |
| **Author** | @Jialin Wang @Khairul Anshar @Shuai Lu |
| **File URL** | |

### Version History

| Version | Updated By | Revision Date | Summary of Changes |
| --- | --- | --- | --- |
| 1.0 | @Jialin Wang | 2023-05-22 | Initial draft |
| 1.1 | @Shuai Lu | 2023-05-23 | refactor 1,2,3 |
| 1.2 | @Jialin Wang | 2023-05-23 | add test cases |

### Consulted with

| Version | Name | Role | Date |
| --- | --- | --- | --- |
| 1.0 | @Xi Zhang | Head Derivatives Trade Processing Development (AO) | |

### Sign-Off

| Version | Name | Role | Attach Sign-off Email | Sign-off Date |
| --- | --- | --- | --- | --- |
| 1.2 | @Xi Zhang | Head Derivatives Trade Processing Development (AO) | | |

By signing off, the sign-off parties acknowledge that they are signing-off the Test Strategy based on the risk appetite of technology and the business. Endorsement from the PWC and/or PSC to be obtained if there are changes made after signed-off.

**EXPAND_END**

**EXPAND: 1. Introduction**

## 1. Introduction

***This performance testing is using for detect and prove the performance of micro frontend.***

This document provides a summary of key information related to performance testing to be conducted for FMO Post Trade Portal, Once signed-off, this will serve as the plan for performance testing.

**Project ****Overviews**

Micro frontends is a technique for developing web applications as a suite of small, modular, and independently deployable frontend applications. It allows multiple teams to work on different parts of a website or web application independently, while still maintaining a cohesive user experience.

With a single entry website, all of the UI applications within department can be accessed through a single entry point. This simplifies the user experience and reduces the need for users to remember multiple URLs or application names.

By adopting micro frontends and a single entry website, we will benefit from increased agility, scalability, and maintainability. Each micro frontend can be developed, tested, and deployed independently, allowing for faster iteration and reduced risk of breaking changes. Additionally, the single entry website provides a centralized location for managing and monitoring all of department's UI applications.

Base on this, Ratan One migrate previous UI into Micro Frontend architecture (Single-SPA) with 4 blotters includes, Cashflow Blotter/Trade Blotter/Exceptions/Rules.

However, ensuring the performance of such applications can be challenging due to the distributed nature of the architecture. Performance testing is crucial to ensure that the micro frontend website meets the performance requirements of the users. This document provides an overview of performance testing for micro frontend websites.

**EXPAND_END**

**EXPAND: 2. NFR and Volumetrics**

## 2. NFR and Volumetrics

NFR and Volumetrics should detail the performance and stability NFR from the supporting documents. Any additional information required to produce the test plan and supporting evidence of the source of this information. Details of the volumetrics for UI or batch and the calculations used to generate the TPH used in testing. Any sources should be stored in share point and hyperlinked in the document. Note the volumes listed below should be Production volumes any reduction for testing purposes should be fully documented and all adjustments and assumptions explained and detailed.

### NFR

| # | NFR | Description | Comment |
| --- | --- | --- | --- |
| 1 | Availability | The website should be available at all times, with minimal downtime or maintenance windows. | 24x7* |
| 2 | Response Time | The website should respond quickly to user requests, with pages loading within a certain timeframe. | 5 sec* |
| 3 | Scalability | The website should be able to handle a large number of users and traffic without slowing down or crashing. | 100 users |
| 4 | Security | The website should be secure, with measures in place to prevent hacking, data breaches, and other security threats. | HTTPS |
| 5 | Compatibility | The page can be display with no error in the browser and interactive with user. | Edge with latest version |
| 6 | CPU Utilization | The website should not consume excessive CPU resources, which can cause the system to slow down or crash. The CPU utilization should be monitored during peak usage to ensure that it does not exceed the maximum limit. | CPU Usage < 50% |
| 7 | Memory Utilization | The website should not consume excessive memory, which can cause the system to slow down or crash. The memory utilization should be monitored during peak usage to ensure that it does not exceed the maximum limit. | Memory Usage (JS heap size) < 80% |

### Volumetrics and Flows

| | Login Times | Workspaces | Operation Time | User Case % |
| --- | --- | --- | --- | --- |
| View Login Page | 0 | 0 | 1 mins | 100% |
| View Home Page | 1 (auto) | 0 | 1 min | 100% |
| View Trade Blotter | 1 (auto) | 1 | 1 mins | 100% |
| View Cashflow Blotter | 1 (auto) | 1 | 1 mins | 100% |
| View Exception Blotter | 1 (auto) | 1 | 1 mins | 100% |
| View Rules Blotter | 1 (auto) | 1 | 1 mins | 100% |

*P.S. *Statements in parentheses *in "User Case" means happen by chance.*

**EXPAND_END**

**EXPAND: 3. Performance Test Environment Analysis**

## 3.  Performance Test Environment Analysis

Below table and diagrams contain a logical description of the PT environment with the table describing the differences between PT and Production environments. For each difference, the impact on the validity of performance testing and impact on PT results has been captured

**
**

**System Architecture: **

![Picture1.png](attachments/Picture1.png)

**Client Side Environment Details**

| | System Type | CPU Processor | Memory (RAM) | Display Resolution |
| --- | --- | --- | --- | --- |
| Dell Laptop | Windows 10 64-bit operating system, x64-based processor | Intel(R) Core(TM) i5-10310U CPU @ 1.70GHz 2.21 GHz | 16.0 GB (15.6 GB usable) | 1920 x 1080 |

**PT Servier Side Environment Details**

| Hostname | Type | IP Address | Env | System Model | Processor Clock Rate(MHz) | Cores | Processor Model | System Description | Memory Configured (GB) | DC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| uklvadapp1341 | App-X86 | 10.198.199.161 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvadapp1342 | App-X86 | 10.198.199.162 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvadapp1343 | App-X86 | 10.198.199.163 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvadapp1344 | App-X86 | 10.198.199.164 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvadapp1345 | App-X86 | 10.198.199.165 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvadapp1346 | App-X86 | 10.198.199.166 | UAT/Pre-Prod | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |

**Production Servier Side Environment details**

| Hostname | Type | IP Address | Env | System Model | Processor Clock Rate(MHz) | Cores | Processor Model | System Description | Memory Configured (GB) | DC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| uklvapapp590 | App-X86 | 10.4.194.78 | Production | VMware Virtual Platform | 2095 | 16 | Intel(R) Xeon(R) Gold 6152 | RHEL Server release 7.7 | 64 | ARK |
| uklvasapp590 | App-X86 | 10.4.194.179 | Production | VMware Virtual Platform | 2095 | 16 | Intel(R) Xeon(R) Gold 6152 | RHEL Server release 7.7 | 64 | WT |
| uklvapapp591 | App-X86 | 10.4.194.79 | Production | VMware Virtual Platform | 2095 | 16 | Intel(R) Xeon(R) Gold 6152 | RHEL Server release 7.7 | 64 | ARK |
| uklvasapp591 | App-X86 | 10.4.194.180 | Production | VMware Virtual Platform | 2095 | 16 | Intel(R) Xeon(R) Gold 6152 | RHEL Server release 7.7 | 64 | WT |
| uklvapapp676 | App-X86 | 10.4.197.46 | Production | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | ARK |
| uklvasapp676 | App-X86 | 10.4.197.146 | Production | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 7.7 | 64 | WT |
| uklvapdbs047 | DB-X86 | 10.4.200.206 | Production | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 8.2(Ootpa) | 64 | WT |
| uklvasdbs047 | DB-X86 | 10.4.200.226 | Production | VMware Virtual Platform | 2194 | 16 | Intel(R) Xeon(R) | RHEL Server release 8.2(Ootpa) | 64 | WT |

The capacity of PT environments is the same as production environment, so we expect similar behavior and performance between production environment and PT environment.

**EXPAND_END**

**EXPAND: 4. RAID**

# 4. RAID

List all risks and issues that could adversely impact testing. List All assumption and dependencies on the execution of performance testing

### Risk and Issues

| # | Risk/Issue Description | Severity H/M/L | Probability H/M/L | Mitigation Plan | Owner |
| --- | --- | --- | --- | --- | --- |
| 1 | PT is designed according to our best estimation on how it will be used in PROD. Once the application is live in PROD, we'll adjust the test cases based on real user behaviors and use cases and re-test accordingly. | L | L | Re-test based on MVP user behaviors and use cases. | Dev team |

### Key Assumptions and Dependencies

| # | Assumption/Dependency | Rationale | Impact | Owner |
| --- | --- | --- | --- | --- |
| 1 | External Dependencies/systems will exhibit at least same performance, if not better, in PROD environment comparing to PT environment | PROD normally comes with LB and have better capacity/performance. | Slowing down of dependencies/ systems will result in slowing down of API calls relating to them. | @Jialin Wang |

**EXPAND_END**

**EXPAND: 5. Scope**

5.  Scope

Table details the upstream and downstream interfaces. if not tested a clear rationale behind why that will not be the case. Details all other out of scope items for performance testing and rationale:

## Interfaces

| Interface | Direction | In/out scope | Rationale for not in scope |
| --- | --- | --- | --- |
| BACKEND API | Upstream | In | |

## Out of Scope

| Item | Rationale for not in scope |
| --- | --- |
| NA | NA |

**EXPAND_END**

**EXPAND: 6. Test Approach**

# 6.  Test Approach

Full details of UI and Live messaging tests including Workmix and flows all adjustments to production volumetrics should be detailed and assumptions and adjustments explained fully. It should include elements of any of the following UI, MQ, API, REST etc –Include all non batch flows that are to be tested..

## 6.1 Workflow Description

For current release, user is able to login to Ratan GUI, open Cashflow Blotter Tile and perform various actions on trades.

Scenario Flow Description

| Use Case | Detail |
| --- | --- |
| View Login Page | Open the login page when user never login |
| View Home Page | When user already login, open the home page |
| View Trade Blotter | Open Trade Blotter from home page and check the load |
| View Cashflow Blotter | Open Cashflow Blotter from home page and check the load |
| View Exception Blotter | Open Exception Blotter from home page and check the load |
| View Rules Blotter | Open Rules Blotter from home page and check the load |

## 6.2 Data Requirements

This section will detail the data requirements of the performance testing including batch files and backend databases.  These sections detail these requirements strategy and teams that will own the data population and file creations, note please state if data is not a production cut or data does not match production volumetrics and if not the rationale of why this will not impact performance results.

### Not include.

## 6.3 Tooling and Monitoring

Details of all test tools including monitoring and execution tools. Details of all Metrics being taken as part of the test execution. Minimum monitoring should be – CPU, Memory, IO, Garbage Collection

| Tool/Monitoring | Usage | Coverage |
| --- | --- | --- |
| Edge Performance monitor | - Real-time information about rendering, network activity, and JavaScript execution - Metrics displayed, including load time, time to first byte, and frame rate - Ability to record and analyze performance data over time | - CPU Usage - JS heap size - Document Frames |
| Edge Lighthouse tool | provides a detailed report of the web page's performance, highlighting areas that need improvement and suggesting ways to optimize the page for better user experience. | - FCP - TTI - Speed Index - TBT - LCP |

## 6.4 Execution Checklist

List of Activities that is required before each test can be Run. Details of the area where issues and defects are being tracked. If JIRA project this should be linked here.

### Pre and Post Execution checklist

| Activity | Description | Owner |
| --- | --- | --- |
| BACK-END API | All Backend Service including BFF Should be Up and connected. Received response should be available within time. | Dev Team |

**EXPAND_END**

**EXPAND: 7. Test Result**

# 7. Test Result

This section is tracking PT result. Track details report as below.

## 7.1 First View Rendering Performance and Workload

### Case1:  View Login Page

| Performance Score | FCP | LCP | TBT | Light House | Open Login Page |
| --- | --- | --- | --- | --- | --- |
| 90 | 0.8s | 1.3s | 10ms | ![image2023-5-23_16-27-39.png](attachments/image2023-5-23_16-27-39.png) | ![image2023-5-23_16-23-40.png](attachments/image2023-5-23_16-23-40.png) |

| Login Api | Same |
| --- | --- |
| ![image2023-5-24_17-1-59.png](attachments/image2023-5-24_17-1-59.png) | ![image2023-5-24_17-1-35.png](attachments/image2023-5-24_17-1-35.png) |

### Case2: View Home Page

| Performance Score | FCP | LCP | TBT | Light House | Open Home Page |
| --- | --- | --- | --- | --- | --- |
| 87 | 0.9s | 1.3s | 30ms | ![image2023-5-23_16-32-46.png](attachments/image2023-5-23_16-32-46.png) | ![image2023-5-23_16-35-15.png](attachments/image2023-5-23_16-35-15.png) |

| Previous Backend API calls of Workspace | No change |
| --- | --- |
| ![image2023-5-24_17-4-12.png](attachments/image2023-5-24_17-4-12.png) | ![image2023-5-24_17-7-6.png](attachments/image2023-5-24_17-7-6.png) |

## 7.2 Open Blotter Pages and Check Workload

### Case3: View Trade Blotter

| Page | Open Trade Blotter Workload |
| --- | --- |
| ![image2023-5-23_17-25-41.png](attachments/image2023-5-23_17-25-41.png) | ![image2023-5-23_17-25-11.png](attachments/image2023-5-23_17-25-11.png) |

| Previous Backend API calls of Trade Blotter | No change the Backend Calls |
| --- | --- |
| ![image2023-5-24_15-46-53.png](attachments/image2023-5-24_15-46-53.png) | ![image2023-5-24_15-49-19.png](attachments/image2023-5-24_15-49-19.png) |

### Case4: View Cashflow Blotter

| Page | Open Cashflow Workload |
| --- | --- |
| ![image2023-5-23_17-37-49.png](attachments/image2023-5-23_17-37-49.png) | ![image2023-5-23_17-37-19.png](attachments/image2023-5-23_17-37-19.png) |

| Previous Backend API calls of Cashflow Blotter | No change the Backend Calls |
| --- | --- |
| ![image2023-5-24_16-1-15.png](attachments/image2023-5-24_16-1-15.png) | ![image2023-5-24_16-3-19.png](attachments/image2023-5-24_16-3-19.png) |

### Case5： View Exception Blotter

| Page Name | Screenshot | Workload |
| --- | --- | --- |
| Validation Exceptions | ![image2023-5-23_17-41-34.png](attachments/image2023-5-23_17-41-34.png) | ![image2023-5-23_17-41-2.png](attachments/image2023-5-23_17-41-2.png) |
| Settlement Exceptions | ![image2023-5-23_17-47-32.png](attachments/image2023-5-23_17-47-32.png) | ![image2023-5-23_17-47-13.png](attachments/image2023-5-23_17-47-13.png) |

| Page Name | Previous Backend API calls | No change the Backend Calls |
| --- | --- | --- |
| Validation Exceptions | ![image2023-5-24_16-42-50.png](attachments/image2023-5-24_16-42-50.png) | ![image2023-5-24_16-45-0.png](attachments/image2023-5-24_16-45-0.png) |
| Settlement Exceptions | ![image2023-5-24_16-43-59.png](attachments/image2023-5-24_16-43-59.png) | ![image2023-5-24_16-46-3.png](attachments/image2023-5-24_16-46-3.png) |

**Case6： View Rules Blotter**

| Page Name | Screenshot | Workload |
| --- | --- | --- |
| Suppression Rules | ![image2023-5-23_17-49-58.png](attachments/image2023-5-23_17-49-58.png) | ![image2023-5-23_17-49-39.png](attachments/image2023-5-23_17-49-39.png) |
| Auto Netting Rules | ![image2023-5-23_17-51-36.png](attachments/image2023-5-23_17-51-36.png) | ![image2023-5-23_17-51-25.png](attachments/image2023-5-23_17-51-25.png) |
| Settlement NSTP Rules | ![image2023-5-23_17-52-30.png](attachments/image2023-5-23_17-52-30.png) | ![image2023-5-23_17-52-42.png](attachments/image2023-5-23_17-52-42.png) |

| Page Name | Previous Backend API calls | No change the Backend Calls |
| --- | --- | --- |
| Suppression Rules | ![image2023-5-24_16-48-11.png](attachments/image2023-5-24_16-48-11.png) | ![image2023-5-24_16-48-52.png](attachments/image2023-5-24_16-48-52.png) |
| Auto Netting Rules | ![image2023-5-24_16-57-2.png](attachments/image2023-5-24_16-57-2.png) | ![image2023-5-24_16-59-17.png](attachments/image2023-5-24_16-59-17.png) |
| Settlement NSTP Rules | ![image2023-5-24_16-51-33.png](attachments/image2023-5-24_16-51-33.png) | ![image2023-5-24_16-50-53.png](attachments/image2023-5-24_16-50-53.png) |

**EXPAND_END**
