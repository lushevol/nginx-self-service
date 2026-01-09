# diff-visualizer Specification

## Purpose
TBD - created by archiving change restrict-raw-editor. Update Purpose after archive.
## Requirements
### Requirement: Raw config view must display differences

The raw configuration view SHALL visually highlight differences between the original configuration (fetched from server) and the current configuration (modified in Wizard).

#### Scenario: User makes a change in Wizard

- Given the user has loaded the configuration
- And the user adds a new Upstream in the Wizard tab
- When the user switches to the "Raw" tab
- Then they should see the new upstream highlighted as an addition (green) in the Upstreams diff view

#### Scenario: User modifies a location in Wizard

- Given the user has loaded the configuration
- And the user changes a directive in a Location in the Wizard tab
- When the user switches to the "Raw" tab
- Then they should see the changed line highlighted in the Locations diff view

