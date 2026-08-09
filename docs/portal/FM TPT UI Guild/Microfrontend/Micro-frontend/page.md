This document discuss what the Micro-frontend (**MFE**) is, what are the problems that MFE solves, and What are MFE approach/ framework currently available and How they can solve the problems.

At the end of discussion, We will show the MFE is working together with Micro-service (**MS**).

You can consider to check this PDF: **** before read this page.

We explain about: [Getting Started with Single-Spa Micro-Frontend]

## What are the problems that MFE solves?

To answer this question, let's check the MS and Monolith approach in the Back-End.

-----------------------------------------------------------

Martin Fowler explains 4 problems with Monolith application in [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html):

1. Change cycles are tied together - a change made to a small part of the application, requires the entire monolith to be rebuilt and deployed. [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
2. Over time it's often hard to keep a good modular structure, making it harder to keep changes that ought to only affect one module within that module.
3. Scaling needs greater resources.
4. Maintained by big group of people (developers, Tester, and etc.)

![image2022-12-7_16-34-21.png](attachments/image2022-12-7_16-34-21.png)

-----------------------------------------------------------

Chandler Harris explains the problems with Monolith approach in [https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith](https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith):

1. A large, monolithic application makes development more complex and slower.
2. You can’t scale individual components.
3. Any changes in the framework or language affects the entire application, making changes often expensive and time-consuming.
4. A monolith is constrained by the technologies already used in the monolith.
5. Small change to a monolithic application requires the redeployment of the entire monolith.

![image2022-12-7_16-45-14.png](attachments/image2022-12-7_16-45-14.png)

The Front-End is serving static files only, it is different with the the Back-End. Hence, the Front-End does not have a problem on the Scalability or Reliability.

Moreover, most of the static files are served from or even cached in CDN. Therefore, We can say that the problems We have on the Monolith Front-End (**FE**) are:

1. **Change cycles are tied together/ deployment** - a change made to a small part of the application, requires the entire monolith to be rebuilt and deployed.
2. **Development and Testing** - Over time it's often hard to keep a good modular structure, making it harder to keep changes that ought to only affect one module within that module. Any change needs to test all the modules.
3. **Team size** - it involves larger big group of people (developer, tester, etc.) which goes against the agile development approach.
4. **Technology agnostic** - We can only use 1 technology already use.

The discussion on the shifting from the Monolith Frontend to MFE is consider late compare to the MS on the backend. Hence, We still have an issue on working with agile approach. Due to, the front-end is still using the monolith approach.

> **The interesting fact that most of the Backend had shifted to MS but the Frontend are still on the Monolith approach.**

The discussion on the problem that We face on the Frontend is not just triggered by the Monolith approach.

The problem may arise when 2 or more applications merge/ join become 1 application.

In the BE, We can solve it by on boarding the Service or Services into the Gateway or by creating Proxy.

> **Since the FE is still monolith, there is no on-boarding process. Hence, there will be an issue on the ownership, everyone can access the Frontend code.**

As summary, We have 6 problems in the Monolith FE:

1. **Change cycles are tied together/ deployment** - a change made to a small part of the application, requires the entire monolith to be rebuilt and deployed.
2. **Development and Testing** - Over time it's often hard to keep a good modular structure, making it harder to keep changes that ought to only affect one module within that module. Any change needs to test all the modules.
3. **Team size** - it involves larger big group of people (developer, tester, etc.) which goes against the agile development approach.
4. **Technology agnostic** - We can only use 1 technology already use.
5. **No on-boarding process/ ownership issue/ repetitive components **- 2 or more applications (either using same technology or different) merge become 1 application there will be similar or same components. Everyone can access the codes.
6. **Branching Model** - It must use Train branching model ([https://martinfowler.com/articles/branching-patterns.html#release-train](https://martinfowler.com/articles/branching-patterns.html#release-train))

![image2022-12-8_11-49-15.png](attachments/image2022-12-8_11-49-15.png)

## What are MFE approach/ framework currently available?

The answer on the question, what are the MFE approach/ framework currently available, is straight forward. There are 2:

1. Module Federation – webpack 5: [https://webpack.js.org/concepts/module-federation/](https://webpack.js.org/concepts/module-federation/)
2. Single-SPA: [https://single-spa.js.org/](https://single-spa.js.org/)

> **Utilizing HTML tag iframe is not considered as MFE approach. Utilizing HTML tag iframe consider as work around that FE works/ features are too big to be developed and maintained by 1 team. **
>
> **Moreover, 2 different FE entity/ team can not share and/ or use the component each other.**

## How to share and consume the resources in Single-SPA?

First, we need to register all the module name and the address in one place, called as importmap.json.

![image2022-12-8_11-10-33.png](attachments/image2022-12-8_11-10-33.png)

Second, in any module that want to share any resources, they can just do simple export, similar with what we do in Monolith ReactJS application.

| poc_spa_q_mfe_container | poc_spa_q_mfe2_cdups | poc_spa_q_mfe3_ratanshell | poc_spa_q_mfe4_ratantrades |
| --- | --- | --- | --- |
| ![image2022-12-8_11-13-44.png](attachments/image2022-12-8_11-13-44.png) | ![image2022-12-8_11-14-29.png](attachments/image2022-12-8_11-14-29.png) | ![image2022-12-8_11-16-3.png](attachments/image2022-12-8_11-16-3.png) | ![image2022-12-8_11-17-6.png](attachments/image2022-12-8_11-17-6.png) |

The last one, in any module that want to consume the shared resources, they can just do simple import, (AGAIN) similar with what we do in Monolith ReactJS application.

| poc_spa_q_mfe_container | poc_spa_q_mfe2_cdups | poc_spa_q_mfe3_ratanshell | poc_spa_q_mfe4_ratantrades |
| --- | --- | --- | --- |
| ![image2022-12-8_11-20-48.png](attachments/image2022-12-8_11-20-48.png) | ![image2022-12-8_11-21-24.png](attachments/image2022-12-8_11-21-24.png) | ![image2022-12-8_11-22-28.png](attachments/image2022-12-8_11-22-28.png) | ![image2022-12-8_11-24-19.png](attachments/image2022-12-8_11-24-19.png) |

## How to share and consume the resources in Module Federation?

First, in any module that want to share any resources, developer needs to export and expose them in Webpack

| export the component | expose them in Webpack |
| --- | --- |
| ![image2022-12-8_12-0-51.png](attachments/image2022-12-8_12-0-51.png) | ![image2022-12-8_11-59-47.png](attachments/image2022-12-8_11-59-47.png) |

Second, in any module that want to consume any resources, developer needs to define the remote component in Webpack then imported.

| define the remote component in Webpack | import the component |
| --- | --- |
| ![image2022-12-8_12-4-24.png](attachments/image2022-12-8_12-4-24.png) | ![image2022-12-8_12-8-33.png](attachments/image2022-12-8_12-8-33.png) |

## Which one is better? Module Federation or Single-SPA?

We should understand how both approaches share the resources.

> **But! since Single-SPA is supporting both, as explained below image (source: [https://single-spa.js.org/docs/recommended-setup/#shared-dependencies](https://single-spa.js.org/docs/recommended-setup/#shared-dependencies)), Import Maps and Module Federation, the We should use Single-SPA.**

![image2022-12-8_11-2-50.png](attachments/image2022-12-8_11-2-50.png)

## How they can solve the problems?

Let's state the problem here:

1. **Change cycles are tied together/ deployment** - a change made to a small part of the application, requires the entire monolith to be rebuilt and deployed.
2. **Development and Testing** - Over time it's often hard to keep a good modular structure, making it harder to keep changes that ought to only affect one module within that module. Any change needs to test all the modules.
3. **Team size** - it involves larger big group of people (developer, tester, etc.) which goes against the agile development approach.
4. **Technology agnostic** - We can only use 1 technology already use.
5. **No on-boarding process/ ownership issue/ repetitive components **- 2 or more applications (either using same technology or different) merge become 1 application there will be similar or same components. Everyone can access the codes.
6. **Branching Model** - It must use Train branching model ([https://martinfowler.com/articles/branching-patterns.html#release-train](https://martinfowler.com/articles/branching-patterns.html#release-train))

### Solve problem no 5

Similar with Micro-services, there will be:

- a common parts or modules that will be share to all other MFE applications and remove the repetitive components
- specific parts or modules that belong to the specific application owner.

This specific parts or modules will be maintain in the Specific Code repository and maintained by the application owner.

Since, each module will have their own Code Repository, We solve the ownership issue.

The examples of the specific module as shown in below diagram (see on the end of this page) are:

- CDUPS Container which is loaded from the CDUPS Static Files. These static files will be generated and deployed from the **Code Repository - Continuous Deployment Pipeline** owned by the CDUPS team.
- RATAN Container which is loaded from the RATAN Static Files. These static files will be generated and deployed from the **Code Repository - Continuous Deployment Pipeline** owned by the RATAN team.
- N Container which is loaded from the N Static Files. These static files will be generated and deployed from the **Code Repository - Continuous Deployment Pipeline** owned by the N team.

The example of the common parts or modules as shown in below diagram (see on the end of this page) are:

- File configs (importmap.json, system.js, etc.)
- Base Container (Global Store, Global Routing, Theme, etc.)

These common parts or module will be maintained in 2 specific Code Repositories and all the static files will be generated and deployed from the **Code Repository - Continuous Deployment Pipeline** owned by New Team.

There will be 2 tasks that need to complete for the on-boarding process.

1. Backend: We needs to register new path routing on the NGINX and the New BE/ BFF
2. Frontend: We need to register new module on the** importmap.json** file and Global Routing in **poc_spa_q_mfe_container**, 1. ![image2022-12-8_11-10-33.png](attachments/image2022-12-8_11-10-33.png) 2. ![image2022-12-8_12-44-32.png](attachments/image2022-12-8_12-44-32.png)

### Solve problem no 1, 2, 3

Since the specific module has its own **Code Repository** and **Code Repository - Continuous Deployment Pipeline**, problem no 1, 2, 3 consider solved.

1. **Change cycles are tied together/ deployment** - a change can be made to a specific the application, do not require the entire monolith to be rebuilt and deployed.
2. **Development and Testing** - It becomes easy to keep a good modular structure and the changes only affect one module within that module and it needs to test on the modules only.
3. **Team size** - the ownership is clear, if the module is too big, it can be fracted into more small modules. Hence, it supports the agile development approach.

### Solve problem no 4

Again, since the specific module has its own **Code Repository,** and We are using Single-SPA, then any team can choose any Frontend JavaScript framework (source: [https://single-spa.js.org/](https://single-spa.js.org/)).

![image2022-12-8_12-56-1.png](attachments/image2022-12-8_12-56-1.png)

### Solve problem no 6

Again **Code Repository - Continuous Deployment Pipeline**, the team can shifted from Train branching model ([https://martinfowler.com/articles/branching-patterns.html#release-train](https://martinfowler.com/articles/branching-patterns.html#release-train)) to Trunk Based Development model ([https://trunkbaseddevelopment.com/](https://trunkbaseddevelopment.com/))

## MFE with MS Architecture Design

### **What is Micro-frontend Architecture?**

- Dividing a monolithic codebase into a smaller domain specific web application and each domain is owned by independent teams.
- Integrate multiple domain specific web application to a unified workspace built for productivity, UI operability and have common features to be shared, e.g SSO, Session Management, etc.

![Slide4.jpg](attachments/Slide4.jpg)

### **Our Implementation - MFE Container**

**![Slide9.jpg](attachments/Slide9.jpg)**

### **Our implementation – SSO with MFA**

**![MFE with MS Copy2.jpg](attachments/MFE with MS Copy2.jpg)**

### **Our implementation - Load Balancing in Production**

**![image2023-9-5_13-12-22.png](attachments/image2023-9-5_13-12-22.png)**

### **Our implementation - Deployment**

**![Slide11.jpg](attachments/Slide11.jpg)**
