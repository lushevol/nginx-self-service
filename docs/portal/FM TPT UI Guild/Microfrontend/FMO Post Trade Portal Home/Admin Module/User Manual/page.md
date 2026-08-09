# Table of Contents

# Overview

**Users of this Admin Module should have technical background and understand how the static files of the Drawer and Import Map work**.

![image2025-1-3_10-49-39.png](attachments/image2025-1-3_10-49-39.png)

![image2025-1-3_11-29-31.png](attachments/image2025-1-3_11-29-31.png)

There are 3 Tiles in the Admin Module:

1. Module Mapping
2. Drawer Category
3. Tile Configuration

![image2025-1-3_10-51-25.png](attachments/image2025-1-3_10-51-25.png)

To get access to these 3 tiles, you need to have one of these EMS2 Entitlements/ Roles.

| **EMS2 Entity** | **ROLE/Subject** | **RATAN_ADMIN** | **SSI_ADMIN** | **FSS_ADMIN** | **STAMP_ADMIN** | **LOANIQ_ADMIN** | **SSDR_ADMIN** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FMO PORTAL ADMIN | /importmap | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE |
| FMO PORTAL ADMIN | /category | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE |
| FMO PORTAL ADMIN | /tile | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE | READ-WRITE |

Create admin roles for your team (new on boarding team)

![image-2026-1-8_9-38-58.png](attachments/image-2026-1-8_9-38-58.png)

We implement maker-checker approach to create and modify the records. **The maker-checker should be different user**.

then grant the role to maker and checker accounts.

Moreover, every changes on these 3 tiles will be recorded in their own Audit History Table.

![image2025-1-3_11-3-43.png](attachments/image2025-1-3_11-3-43.png)

This document will cover on how to

1. Create new record
2. Modify the existing record
3. Verify and activate the new or modified record
4. Deactivate the existing active record
5. View Audit History

in the Module Mapping, Drawer Category, and Tile Configuration.

# Module Mapping

## Create new record

To open **Module Mapping **tile, you can click the Module Map Icon from the Drawer.

![image2025-1-3_11-18-13.png](attachments/image2025-1-3_11-18-13.png)

To create new record, you can click on the **Create New** button as shown below.

![image2025-1-3_11-19-58.png](attachments/image2025-1-3_11-19-58.png)

Once the Popup Component is shown, please type the **Module Name** and the **Path**. Once done, you can click **Create **button.

![image2025-1-3_11-24-4.png](attachments/image2025-1-3_11-24-4.png)

The **Module Name** is referring to the Key name and the **Path **is referring to the Value of Import Map JSON object in the static file,

Please enter the **Module Name** without **@fm/** character and it should not contain any **spaces**.

The **@fm/ **will be automatically appended on **/api/auth/v1/fmo/admin/importmap/active** API.

![image2025-1-3_15-4-29.png](attachments/image2025-1-3_15-4-29.png)

![image2025-1-3_11-45-39.png](attachments/image2025-1-3_11-45-39.png)

After you click the **Create **button, the new record will be created with status is **un-verified** as shown below.

You need to ask other user to verify the record. Please follow this <u>[step](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Verifyandactivate)</u>.

![image2025-1-3_15-24-32.png](attachments/image2025-1-3_15-24-32.png)

## Modify the existing record

To modify or edit the existing record, you can click the **Pencil Icon** button as shown below.

![image2025-1-3_15-28-43.png](attachments/image2025-1-3_15-28-43.png)

Once the Popup Component is shown, you can modify the **Module Name** or the **Path**. Once done, you can click **Update **button.

![image2025-1-3_15-30-55.png](attachments/image2025-1-3_15-30-55.png)

Similar with the creating new record, the modified record will be updated with status is **un-verified**.

## Verify and activate

To verify the record, you can click the **Check Icon** button as shown below. This button will be enabled if the record status is **un-verified**.

![image2025-1-3_15-38-38.png](attachments/image2025-1-3_15-38-38.png)

Once the Popup Component is shown, different user can verify the **Module Name** or the **Path**. Once done, you can click **Verified **button.

![image2025-1-3_15-42-26.png](attachments/image2025-1-3_15-42-26.png)

As discussed above, **the maker-checker should be different user**, otherwise, it will show this error message as shown below.

![image2025-1-3_15-44-50.png](attachments/image2025-1-3_15-44-50.png)

## Deactivate the existing record

To deactivate the record, you can click the **Deactivate Icon** button as shown below. This button will be enabled if the record status is **verified**.

![image2025-1-3_15-48-33.png](attachments/image2025-1-3_15-48-33.png)

Once the Popup Component is shown, you can verify the **Module Name** or the **Path **before you click **Deactivate **button.

![image2025-1-3_15-50-55.png](attachments/image2025-1-3_15-50-55.png)

Similar with the creating new record or updating existing record, the deactivated record will be updated with status is **un-verified**.

![image2025-1-3_15-54-25.png](attachments/image2025-1-3_15-54-25.png)

## View audit history

To view the audit history, you can click the **History Icon** button as shown below.

![image2025-1-3_15-57-5.png](attachments/image2025-1-3_15-57-5.png)

Once the Popup Component is shown, you can view the history and events related to a specific record.

![image2025-1-3_16-0-44.png](attachments/image2025-1-3_16-0-44.png)

# Drawer Category

## Create new record

To open **Drawer Category **tile, you can click the Drawer Category Icon from the Drawer.

![image2025-1-3_16-6-59.png](attachments/image2025-1-3_16-6-59.png)

To create new record, you can click on the **Create New** button as shown below.

![image2025-1-3_16-8-37.png](attachments/image2025-1-3_16-8-37.png)

Once the Popup Component is shown, please type the **Category Label**. Once done, you can click **Create **button.

![image2025-1-3_16-10-29.png](attachments/image2025-1-3_16-10-29.png)

After you click the **Create **button, the new record will be created with status is **un-verified** as shown below.

You need to ask other user to verify the record. Please follow this <u>[step](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Verifyandactivate)</u>.

![image2025-1-3_16-13-11.png](attachments/image2025-1-3_16-13-11.png)

## Modify the existing record

Please follow the **Modify the existing record** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Modifytheexistingrecord)</u>.

## Verify and activate

Please follow the **Verify and activate** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Verifyandactivate)</u>.

## Deactivate the existing record

Please follow the **Deactivate the existing record** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Deactivatetheexistingrecord)</u>.

## View audit history

Please follow the **View audit history** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Viewaudithistory)</u>.

# Tile Configuration

## Create new record

To open **Tile Configuration **tile, you can click the Tile Configuration Icon from the Drawer.

![image2025-1-6_9-29-34.png](attachments/image2025-1-6_9-29-34.png)

To create new record, you need to select the Application Category and then click on the **Create New** button as shown below.

![image2025-1-6_9-33-24.png](attachments/image2025-1-6_9-33-24.png)![image2025-1-6_9-35-1.png](attachments/image2025-1-6_9-35-1.png)

Once the Popup Component is shown, please type the

1. **Tile Name**
2. **Description**
3. **Image URL for Dark Theme**. You can select from the drop down
4. **Image URL for Light Theme**. You can select from the drop down
5. **Container**. You can select from the drop down**.**
6. **Module Path**. Please enter the **value** without **/** character and it should not contain any **spaces.**
7. **Tile Path**. Please enter the **value** without **/** character and it should not contain any **spaces.**
8. **Role Subject**
9. **Role Entities**. You can type multiple entities separated by comma.
10. **Is Template?**. You can select from the drop down
11. **Email Support**

The **Module Path** and **Tile Path** value will be automatically appended with **/** character in the API.

![image2025-1-15_11-5-10.png](attachments/image2025-1-15_11-5-10.png)

The **Module Path** value should be equal to **Routing Path** value in your container.

![image2025-1-15_11-7-28.png](attachments/image2025-1-15_11-7-28.png)![image2025-1-15_11-15-2.png](attachments/image2025-1-15_11-15-2.png)

The **Tile Path** value should be equal to **Routing Path** value in your tile.

![image2025-1-15_11-16-12.png](attachments/image2025-1-15_11-16-12.png)![image2025-1-15_11-18-17.png](attachments/image2025-1-15_11-18-17.png)

The **Role Entities** separated comma value will be automatically converted in to the array object in the API.

![image2025-1-15_11-21-4.png](attachments/image2025-1-15_11-21-4.png)![image2025-1-8_10-49-26.png](attachments/image2025-1-8_10-49-26.png)

Once done, you can click **Create **button

![image2025-1-15_11-2-55.png](attachments/image2025-1-15_11-2-55.png)

After you click the **Create **button, the new record will be created with status is **un-verified**.

You need to ask other user to verify the record. Please follow this <u>[step](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Verifyandactivate)</u>.

## Modify the existing record

Please follow the **Modify the existing record** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Modifytheexistingrecord)</u>.

## Verify and activate

Please follow the **Verify and activate** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Verifyandactivate)</u>.

## Deactivate the existing record

Please follow the **Deactivate the existing record** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Deactivatetheexistingrecord)</u>.

## View audit history

Please follow the **View audit history** of Module Mapping section <u>[above](https://confluence.global.standardchartered.com/display/DSP/User+Manual#UserManual-Viewaudithistory)</u>.
