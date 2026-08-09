This document discusses on how to start working on a [Single-SPA](https://single-spa.js.org)

We prepare the example code to help anyone start working on Single-SPA.

This document explains how to run the example code on your local machine.

**We explain in detail how the Single-SPA is working in this document: <u>[Micro-frontend]</u>**

**Please follow this document to create new Tile configuration in Admin Module: <u>[User Manual]</u>**

### Source Code

Please download these zip files:

📎 [51358-mfe-root-config.zip](attachments/51358-mfe-root-config.zip)

📎 [51358-mfe-template-container.zip](attachments/51358-mfe-template-container.zip)

📎 [51358-mfe-template-tiles.zip](attachments/51358-mfe-template-tiles.zip)

## <u>Modify **package.json** file</u>

| | From | To |
| --- | --- | --- |
| 51358-mfe-root-config | ![image2024-4-3_10-16-58.png](attachments/image2024-4-3_10-16-58.png) | ![image2024-4-3_10-17-43.png](attachments/image2024-4-3_10-17-43.png) |
| 51358-mfe-template-container | ![image2024-4-3_10-19-35.png](attachments/image2024-4-3_10-19-35.png) | ![image2024-4-3_10-20-13.png](attachments/image2024-4-3_10-20-13.png) |
| 51358-mfe-template-tiles | ![image2025-1-16_9-21-58.png](attachments/image2025-1-16_9-21-58.png) | ![image2025-1-16_9-22-33.png](attachments/image2025-1-16_9-22-33.png) |

## <u>Run the code</u>

Let say that you put all the codes under **frontend **folder in your home folder.

![image2025-1-16_9-23-2.png](attachments/image2025-1-16_9-23-2.png)

### Run Frontend - 51358-mfe-root-config

Please use this command to install the dependency and run it

```
cd ~\frontend\51358-mfe-root-config
npm i
npm start
```

### Run Frontend - 51358-mfe-template-container

Please use this command to install the dependency and run it

```
cd ~\frontend\51358-mfe-template-container
npm i
npm start
```

### Run Frontend - 51358-mfe-template-tiles

Please use this command to install the dependency and run it

```
cd ~\frontend\51358-mfe-template-tiles
npm i
npm start
```

## <u>Result</u>

| Enter username and password then click login button. | Click on the New Tile button on the Application Bar then click on any Tile from the Template Category | It will add a Tile into the Workspace |
| --- | --- | --- |
| ![image2024-4-3_11-21-43.png](attachments/image2024-4-3_11-21-43.png) | ![image2024-4-3_11-23-40.png](attachments/image2024-4-3_11-23-40.png) | ![image2024-4-3_11-24-32.png](attachments/image2024-4-3_11-24-32.png) |
