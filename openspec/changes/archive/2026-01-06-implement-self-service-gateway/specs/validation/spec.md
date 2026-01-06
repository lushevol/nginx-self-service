# Spec: Validation Engine

## ADDED Requirements

### Requirement: Dry-Run Nginx Syntax Check

The backend MUST validate the generated Nginx configuration against a real Nginx binary or a rigorous parser before attempting any commit.

#### Scenario: Invalid Nginx Syntax

- Given a user submits a config with a missing semicolon `;`
- When backend runs `nginx -t` on the snippet
- Then it captures the standard error `unexpected end of file, expecting ";"`
- And returns this error to the UI

### Requirement: Cross-Team Collision Detection

The validator MUST read all existing configurations from the repository to check for upstream name collisions or location overlaps.

#### Scenario: Duplicate Upstream Name

- Given team A has an upstream named `teamA_app` in the repo
- When team A tries to create a new config with the same upstream name `teamA_app` but different servers
- Then the validator flags a potential redefinition conflict (or allows update if intentional)
- But if team B tries to use `teamA_app` (if naming convention fails), it must be blocked.

### Requirement: Immediate Feedback Loop

Validation results MUST be returned synchronously or via immediate polling to the UI.

#### Scenario: Validation Failure

- Given a user clicks "Save" or "Validate"
- When the validation fails
- Then the UI displays the specific line number and error message from the validator
- And the "Submit PR" button remains disabled
