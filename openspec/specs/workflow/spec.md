# workflow Specification

## Purpose
TBD - created by archiving change implement-self-service-gateway. Update Purpose after archive.
## Requirements
### Requirement: Automated PR Creation

Upon successful validation, the system MUST interact with Azure DevOps to persist the configuration change as a Pull Request.

#### Scenario: Successful Submission

- Given a valid configuration for team "alpha" in "dev"
- When the user clicks "Submit"
- Then the backend creates a branch `config/alpha/dev/{timestamp}`
- And commits `proxy.conf` and `upstreams.conf` to `/nginx/dev/alpha/`
- And creates a Pull Request merging to `dev` branch
- And returns the PR URL to the user

### Requirement: Repository Structure Enforcement

The system MUST maintain a strict directory structure in the git repository to ensure predictable deployment paths.

#### Scenario: Directory Consistency

- Given a ne w team "beta"
- When they submit their first config
- Then the system recursively creates `/nginx/{env}/beta/` folders in the repo
- And places the config files there

### Requirement: Manual Promotion Workflow

There is no automatic promotion between environments; users MUST explicitly drive the process.

#### Scenario: Promoting to Prod

- Given a user is satisfied with "Dev"
- When they switch to the "Prod" tab in UI
- Then they can import the "Dev" config
- And modify it for Prod (e.g., change upstream IPs)
- And submit a new PR targetting the `prod` branch

