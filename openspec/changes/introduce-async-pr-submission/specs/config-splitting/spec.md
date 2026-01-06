# Config Splitting

## MODIFIED Requirements

### Requirement: Split Config Payload

The API and storage SHALL support separated upstream and location configurations.

#### Scenario: Split config structure

Given the config editor is opened
When the user saves upstreams and locations
Then the API should accept them as separate fields
And store them separately in the change request
