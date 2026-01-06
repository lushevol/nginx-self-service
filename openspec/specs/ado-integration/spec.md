# ado-integration Specification

## Purpose
TBD - created by archiving change implement-ado-service. Update Purpose after archive.
## Requirements
### Requirement: Real ADO Integration

The system MUST interact with real Azure DevOps repositories to manage configurations.

#### Scenario: Fetch Configuration from ADO

Given the application is configured with ADO credentials
When `getConfigs` is called for team "payment" and env "dev"
Then the service should fetch the content of `conf/payment.conf` from the `dev` branch of the configured repository.

#### Scenario: Create Configuration PR

Given a valid configuration change for team "payment"
When `createPR` is called with the new content
Then the service should create a new branch named `feature/config-update-payment-{timestamp}`
And commit the new content to `conf/payment.conf`
And create a Pull Request from the new branch to the `dev` branch (if env is dev).

