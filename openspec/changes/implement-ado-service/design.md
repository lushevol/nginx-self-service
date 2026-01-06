# Design: Npm-based Validation Strategy

## Problem

The current `SyntaxValidator` attempts to run `nginx -t` to validate configuration. This introduces a hard dependency on the Nginx binary. If the binary is missing, validation is skipped or fails (depending on implementation), which is unreliable for a self-service portal that might run in a containerized backend separate from the Nginx instance.

## Solution

Use a JavaScript-based Nginx parser (e.g., `nginx-conf` or `@webantic/nginx-config-parser`) to validate the _syntax_ and _structure_ of the specific configuration block.

### Trade-offs

- **Pros**:
  - No external binary dependency.
  - Runs in any Node.js environment.
  - Faster (no process spawning).
- **Cons**:
  - "Loose" validation: It might pass valid syntax that is semantically invalid for Nginx (e.g., wrong directive context).
  - However, for _self-service_ snippets (locations/upstreams), structural validation is usually sufficient to prevent syntax errors that crash Nginx. Semantic errors can be caught by the PR review process or a CI pipeline that does run `nginx -t`.

## ADO Service Implementation

Standard usage of `azure-devops-node-api`.

- Store ADO connection as a singleton.
- Use `IGitApi` to interact with repositories.
- Assume `env` maps to branch names (e.g., `dev`, `prod`).
