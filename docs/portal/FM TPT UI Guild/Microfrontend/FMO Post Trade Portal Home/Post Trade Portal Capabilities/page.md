#

# Single Entry for FM Applications

Post Trade Portal provides a unified entry point for all FM applications, streamlining access and improving user experience. Users can access multiple applications from a single portal, reducing complexity and improving efficiency.

![image-2025-10-8_12-51-46.png](attachments/image-2025-10-8_12-51-46.png)

# SSO & MFA

Post trade portal provides single sign-on for all on boarded tenants. With the unique authentication, new on boarding applications would integrate into it smoothly.

- Supports oAuth2.0 login for secure authentication.
- Multi-factor authentication (MFA) enhances security for all users.

![image-2025-10-8_12-55-14.png](attachments/image-2025-10-8_12-55-14.png)![image-2025-10-8_12-56-25.png](attachments/image-2025-10-8_12-56-25.png)

# Consistent Design System

The portal uses a consistent design system for all components and themes, ensuring a unified look and feel across applications.

- Refer to storybook for design guidelines: [Storybook](https://fmo-mfe-dev.uk.dev.net:8453/base/storybook/index.html)

![image-2025-10-8_12-48-6.png](attachments/image-2025-10-8_12-48-6.png)

### Dark Theme & Light Theme

![image-2025-10-8_12-58-40.png](attachments/image-2025-10-8_12-58-40.png)

![image-2025-10-8_12-58-49.png](attachments/image-2025-10-8_12-58-49.png)

# Interoperability

The portal supports interoperability between applications using System.Js and FDC3 standards.

- System.Js Calling enables dynamic module loading.
- (in processing) FDC3 facilitates communication and workflow between financial applications.

![image-2025-10-8_13-5-26-1.png](attachments/image-2025-10-8_13-5-26-1.png)

# Smooth Start Up

Boilerplates are provided to enable quick startup and onboarding to the portal.

- Developers can use <u>[ready-to-go templates](https://confluence.global.standardchartered.com/display/DSP/Getting+Started+with+Single-Spa+Micro-Frontend)</u> for rapid application integration.

# Admin Module

The portal includes an Admin Module for managing users, roles, and configurations.

- Refer to: <u>[Admin Module](https://confluence.global.standardchartered.com/display/DSP/Admin+Module)</u> documentation for details on administration features.

![image-2025-10-8_13-15-58.png](attachments/image-2025-10-8_13-15-58.png)

# Analytics

Analytics capabilities are integrated to provide insights into user activity and system performance.

- Refer to: <u>[Analytics](https://confluence.global.standardchartered.com/display/DSP/Analytics)</u> documentation for available metrics and reporting features.

![image-2025-10-8_13-13-42.png](attachments/image-2025-10-8_13-13-42.png)

# Tile Lifecycle (Tile, Workspace, importmap)

Users can open tiles (applications), create multiple workspaces, and close them as needed.

- Importmap is used for dynamic module resolution and management.

![image-2025-10-8_12-54-4.png](attachments/image-2025-10-8_12-54-4.png)

# RBAC

Role-Based Access Control (RBAC) is implemented using EMS2 Control.

- Ensures users have appropriate permissions based on their roles.

# Self Host Tenant Application

PTP Nginx routes tenant APIs and UIs to the corresponding implementations.

- Enables tenants to self-host their applications and APIs securely.

# Session Control and Token Refresh

Session management is handled by the MFE Session Control module.

- Implements Refresh Token for secure and seamless session renewal.
- Refer to: [MFE Session Control](https://confluence.global.standardchartered.com/display/DSP/MFE+Session+Control+and+Implement+Refresh+Token) documentation for implementation details.
