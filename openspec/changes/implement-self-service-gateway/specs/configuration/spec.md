# Spec: Configuration Management

## ADDED Requirements

### Requirement: Allowed Block Types

The system MUST restrict user input to only `location` and `upstream` Nginx blocks. All other global or `server` level directives are forbidden.

#### Scenario: User creates location block

- Given a user wants to route `/api/team/foo` to a backend
- When they submit a valid `location /api/team/foo { proxy_pass ... }` block
- Then the system accepts it

#### Scenario: User defines upstream

- Given a user wants to define a backend group
- When they submit `upstream team_backend { server 10.0.0.1:8080; }`
- Then the system enforces the `upstream {team_name}_{name}` naming convention
- And accepts the config if valid

### Requirement: Dangerous Directive Blocking

The system MUST aggressively parse and reject any configuration containing forbidden directives that could compromise the gateway security.

#### Scenario: Root access attempt

- Given a malicious user tries to use `root /etc/passwd`
- When the validator parses the config
- Then it detects the `root` directive and rejects the submission with a security violation error

#### Scenario: Lua script injection

- Given a user tries to embed `content_by_lua_block`
- When the validator runs
- Then it rejects the usage of Lua directives
