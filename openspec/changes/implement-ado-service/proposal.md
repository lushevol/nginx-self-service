# Implement ADO Service and Npm-based Validation

## Goal

Implement the actual logic for `AzureDevOpsService` to interact with Azure DevOps repositories and replace the `nginx` binary dependency in `SyntaxValidator` with an npm package (e.g., `nginx-conf`).

## Motivation

- **ADO Integration**: The current service is using mock data. We need real integration to fetch configs and create PRs to fully support the self-service workflow.
- **Portability**: The current syntax validator relies on `nginx` being installed on the host. Moving to an npm-based solution checks syntax structurally without external system dependencies, making the backend easier to run in various environments (dev, CI) without pre-installed Nginx.
