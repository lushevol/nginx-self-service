# Implement Self-Service Nginx Gateway

## Goal

Enable internal teams to onboard their web applications to a central Nginx Gateway securely and autonomously, using a "Padded Cell" architecture and GitOps workflow.

## Problem

Currently, onboarding new services to the Nginx Gateway is manual or lacks sufficient guardrails. We cannot trust teams to write safe configuration code directly, as they might use dangerous directives, hijack routes, or cause configuration conflicts that bring down the gateway.

## Solution

Build a "Self-Service Portal" that acts as a secure intermediary.

1.  **Strict Isolation**: Enforce `/api/{team_name}` and `/static/{team_name}` routing prefixes.
2.  **Padded Cell**: Restrict users to only `location` and `upstream` blocks. Block all other directives.
3.  **Validation**: Run Nginx syntax validation and custom policy checks (route collision, dangerous directives) on the backend before any code reaches the repository.
4.  **GitOps**: The portal commits validated configurations to Azure DevOps Repos via PR, triggering an approval and deployment pipeline.

## Key Constraints

- **Backend**: NestJS, using `azure-devops-node-api`.
- **Frontend**: React-based Wizard and Raw Text Editor (synchronized).
- **Infrastructure**: Configs stored in ADO, deployed to VMs running Nginx.
- **Validation**: Independent of VM (dry-run on backend).
