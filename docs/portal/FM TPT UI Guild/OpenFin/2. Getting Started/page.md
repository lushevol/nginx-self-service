An FDC3-compliant Desktop Agent exposes an FDC3 Standard API to applications they have launched. When an App is launched by a Desktop Agent and is given access to the Agent's API to interoperate, it is running in that Desktop Agent's context.

Examples of Desktop Agents include:

1. Autobahn
2. io.Connect
3. OpenFin
4. Refinitiv Eikon

Before we deep dive into the the Code, lets understand about OpenFin and OpenFin Container.

## 1.2 OpenFin

OpenFin is a runtime and operating environment designed for enterprise app development. Built on web standards, OpenFin dramatically enhances the capabilities of web apps, enabling end-user experience and enterprise controls well beyond what is possible with browsers like Chrome and Edge or with frameworks like Electron and Chromium Embedded Framework. **<u>[2](https://developers.openfin.co/of-docs/docs/what-is-openfin)</u>**

OpenFin Container is a desktop runtime application environment that enables communication between all of your apps (web, legacy, third-party) for the enterprise desktop. It is built on top of Google Chromium and GitHub Electron and combines advanced interoperability <u>**[3](https://developers.openfin.co/of-docs/docs/container-overview)**</u>

### 1.2.1 Platform provider

The platform provider is the communication hub that coordinates among all the windows in a platform application. The provider runs in a hidden window and enables application providers to extend or overwrite default platform behavior through platform overrides. This is where you can control how your application will look and feel to create a custom branded experience.

### 1.2.2 Platform window

Platform windows act as a “frame” for your platform views and can display UI controllers such as **minimize**, **maximize **and **close**. These are child windows of the platform provider and may contain one or many platform views.

### 1.2.3 Platform view

Platform views provide your application's content and they reside within a platform window. The content (a web application) is loaded into a view and attached to a platform window. Views have their own JavaScript context that is distinct and unconnected to the window’s context; they have no DOM representation within the window. This allows views to move between windows without refreshing or otherwise destroying the context. Views can be tabbed or tables and enable the end-user to arrange the layout of a platform window.

## 1.3 Download the source code

In this example, we will use default OpenFin Platform Window.

| OpenFin Agent | ### Platform provider | ### Platform view | ### Platform view | ### Platform view | .npmrc |
| --- | --- | --- | --- | --- | --- |
| 📎 [OpenFinAgent.zip](attachments/OpenFinAgent.zip) | 📎 [Provider.zip](attachments/Provider.zip) | 📎 [fdc3-workbench.zip](attachments/fdc3-workbench.zip) | 📎 [ReactApp.zip](attachments/ReactApp.zip) | We will use Dev server: [https://fmo-mfe-dev.uk.dev.net:8453/](https://fmo-mfe-dev.uk.dev.net:8453/) | 📎 [.npmrc](attachments/.npmrc) |

### 1.3.1 Platform provider

```bash
cd Provider
npm i
npm start
```

Make sure, there service is up and running with no errors.

![image2024-8-27_20-4-23.png](attachments/image2024-8-27_20-4-23.png)

### 1.3.2 Platform view

```bash
cd ReactApp
npm i
npm start
```

Make sure, there service is up and running with no errors.

![image2024-8-27_20-5-42.png](attachments/image2024-8-27_20-5-42.png)

### 1.3.3 Platform view

```bash
cd fdc3-workbench
npm i
npm start
```

Make sure, there service is up and running with no errors.

![image2024-9-2_10-50-21.png](attachments/image2024-9-2_10-50-21.png)

### 1.3.4 OpenFin Agent

```bash
cd OpenFinAgent
npm i
```

Make sure, Platform provider and view are up and running, then run **npm start**.

![image2024-8-27_20-10-16.png](attachments/image2024-8-27_20-10-16.png)

It will display the OpenFin Provider Window.

![image2024-8-27_20-11-4.png](attachments/image2024-8-27_20-11-4.png)

Continue to **[3. Application Interoperability]**
