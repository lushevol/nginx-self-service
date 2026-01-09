# read-only-raw-config Specification

## Purpose
TBD - created by archiving change restrict-raw-editor. Update Purpose after archive.
## Requirements
### Requirement: Raw config view must be read-only

The raw configuration view in the frontend SHALL NOT allow user input or text modification.

#### Scenario: User attempts to type in raw view

- Given the user is on the "Raw" tab
- When they attempt to type or paste text into the code block
- Then the content should remain unchanged

