# Async PR Submission

## ADDED Requirements

### Requirement: Async Config Submission

The system SHALL handle config submissions asynchronously to prevent failure due to transient network issues or inactive tokens.

#### Scenario: Submit config change

Given a user submits a valid config
When the backend receives the request
Then it should save a pending change record to the database
And return the record ID immediately
And NOT call ADO synchronously

### Requirement: Background Processing

A background service SHALL process pending requests and reliably submit them to Azure DevOps.

#### Scenario: Background processing

Given a pending change request exists
And the ADO PAT is active
When the background worker runs
Then it should fetch the request
And successfully create a PR in ADO
And update the change record status to SUBMITTED

#### Scenario: ADO Connectivity Loop

Given a pending change request exists
And the ADO PAT is inactive
When the background worker runs
Then it should retry connectivity check
And NOT fail the request immediately
And wait for the next iteration
