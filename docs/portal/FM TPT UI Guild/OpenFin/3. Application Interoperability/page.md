As explained in **<u>[2. Getting Started]</u>**, the platform provider is the communication hub that coordinates among all the windows including the authentication process.

## 3.1 Platform provider authentication

Once user is authenticated it will display list of application that can be run on the Platform view.

In real implementation, we should **not **use Platform provider to display list of application, because the Platform provider should run in a hidden window after authenticated.

To simplify this POC, we just use Platform provider to display list of application. In below example we can see:

1. Blade
2. Standalone React App
3. FDC3-Workbench
4. FMO Post Trade Portal.

![image2024-9-2_11-34-41.png](attachments/image2024-9-2_11-34-41.png)

> **INFO**
> Every time this Platform provider open the application (Blade, Standalone React App, FMO Apps Portal), it will include the **OpenFin Provider Token** token to the URL query parameters.
>
> Hence the user does not need to login again on the application (Blade, Standalone React App, FMO Apps Portal).

To test, we can just simple click or open the FMO Apps Portal. It will use the **OpenFin Provider Token **to authenticate the user.

## 3.2 Functional use cases

As explained in **[1. Overview]**, we can demo on these items:

1. Open an Application
2. Requesting Functionality From Another App
3. Send or broadcast Context

To start with, please close the FMO Apps Portal from step 3.1 above and open the Standalone React App from the Platform provider.

![image2024-8-27_22-4-30.png](attachments/image2024-8-27_22-4-30.png)

It will open this Platform view:

![image2024-8-27_20-50-30.png](attachments/image2024-8-27_20-50-30.png)

### 3.2.1 Open an application

There are 3 use cases in the Standalone React App. To test the first use case, we can just click **Open FMO Portal** button.

It will open and display FMO Portal with additional Tile in the new Platform view window that requested from the Standalone React App.

![image2024-8-27_20-59-30.png](attachments/image2024-8-27_20-59-30.png)

We can also open new Tile in FMO Portal by clicking the **Open Tile** button.

It will open and display Tile as new tab (workspace) that requested from the Standalone React App.

This Tile will be open in the existing Platform view window.

![image2024-8-27_21-10-18.png](attachments/image2024-8-27_21-10-18.png)

### 3.2.2 Requesting Functionality From Another App

To test the second use case, we can just click **Change Theme** button.

![image2024-8-27_20-58-26.png](attachments/image2024-8-27_20-58-26.png)

Then it will change all the window to Light Theme.

![image2024-8-27_21-0-28.png](attachments/image2024-8-27_21-0-28.png)

### 3.2.3 Send or broadcast Context

To test the third use case, we can just enter any text in the Message text input then click **Broadcast Message **button.

![image2024-8-27_21-15-1.png](attachments/image2024-8-27_21-15-1.png)

Continue to **[4. FMO Portal FDC3 Contract]**
