## MODIFIED Requirements

### Requirement: Npm-based Syntax Validation

The system MUST validate Nginx configuration syntax using an npm package (e.g., `nginx-conf`) to remove the dependency on the native `nginx` binary.

#### Scenario: Validate Configuration Structure

Given a configuration snippet
When `validate` is called
Then the system should parse the syntax using an internal parser
And return "Syntax Error" if braces are mismatched or directives are malformed
And NOT attempt to execute `nginx -t`.

#### Scenario: Fallback for Parsing

Given an invalid configuration
When `validate` is called
Then it should identify the line number or nature of the error from the parser exception.
