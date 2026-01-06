# Tasks

## 1. Foundation & Scaffolding

- [x] Initialize NestJS module `NginxConfigModule`.
- [x] Setup `azure-devops-node-api` client service.
- [x] Create `NginxParserService` for parsing/generating config blocks.

## 2. Validation Engine

- [x] Implement `PolicyValidator`: Check for forbidden directives (`root`, `alias`, etc.).
- [x] Implement `ScopeValidator`: Enforce `/api/{team}` prefix structure.
- [x] Implement `SyntaxValidator`: Mock or binary-based check for Nginx syntax.

## 3. ADO Integration

- [x] Implement `GitService.getConfigs(env, team)`: Read content from ADO.
- [x] Implement `GitService.createPR(env, team, configs)`: Branch -> Commit -> PR flow.

## 4. Frontend Editor

- [x] Create `ConfigEditor` component with Monaco Editor (Raw) and Form (Wizard).
- [x] Implement two-way binding: modifying Text updates Form, and vice versa.
- [x] Add `TeamSelector` and `EnvSelector`.

## 5. End-to-End Flow

- [x] Wiring: UI calls `validate` endpoint -> show errors.
- [x] Wiring: UI calls `submit` endpoint -> show PR link.
- [x] Verify Deployment: Merge PR -> Check Nginx reload on VM.
