# Project Context

## Purpose

A secure, self-service Nginx Gateway Portal using a GitOps workflow. The system allows internal teams to onboard their web applications to a central Nginx Gateway with strict isolation and validation ("Padded Cell" architecture).

## Tech Stack

- **Backend:** NestJS (TypeScript)
- **UI:** Webpack 5 + Ant Design 6
- **ORM:** Drizzle ORM + SQLite
- **Monorepo:** pnpm workspace + turbo
- **Infrastructure:** Nginx Open Source (running on VMs)
- **Source Control:** Azure DevOps Repos (Node.js API client)
- **CI/CD:** Azure Pipelines

## Project Conventions

### Code Style

- Strict isolation of team resources.
- Validation logic must run independently of the target VM.

### Architecture Patterns

- **GitOps:** Configuration managed via ADO Repos. Deployment via PR merge.
- **Padded Cell:** Users can only modify safe primitives (locations/upstreams) within their namespace.
- **No Trust:** Backend assumes all user input is potentially dangerous.

### Testing Strategy

- Nginx syntax validation (dry-run) on backend before PR creation.

## Domain Context

- **Team Name:** Distinct identifier for isolation (e.g., `/api/{team_name}`).
- **Environments:** Dev, UAT, Prod. No automatic promotion.

## Important Constraints

- **Routing:** Only `/api/{team_name}` or `/static/{team_name}` allowed.
- **Directives:** Dangerous directives (`root`, `alias`, `lua_`, `include`) are blocked.
- **Validation:** Must return error logs to UI immediately if checks fail.
- **Upstreams:** User-defined upstreams must be namespaced to prevent collisions.

## External Dependencies

- Azure DevOps API (for Repos and PRs)
- Nginx (target runtime)
