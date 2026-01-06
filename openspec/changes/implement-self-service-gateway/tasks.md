# Tasks

## 1. Foundation & Scaffolding

- [ ] Initialize NestJS module `NginxConfigModule`.
- [ ] Setup `azure-devops-node-api` client service.
- [ ] Create `NginxParserService` for parsing/generating config blocks.

## 2. Validation Engine

- [ ] Implement `PolicyValidator`: Check for forbidden directives (`root`, `alias`, etc.).
- [ ] Implement `ScopeValidator`: Enforce `/api/{team}` prefix structure.
- [ ] Implement `SyntaxValidator`: Mock or binary-based check for Nginx syntax.

## 3. ADO Integration

- [ ] Implement `GitService.getConfigs(env, team)`: Read content from ADO.
- [ ] Implement `GitService.createPR(env, team, configs)`: Branch -> Commit -> PR flow.

## 4. Frontend Editor

- [ ] Create `ConfigEditor` component with Monaco Editor (Raw) and Form (Wizard).
- [ ] Implement two-way binding: modifying Text updates Form, and vice versa.
- [ ] Add `TeamSelector` and `EnvSelector`.

## 5. End-to-End Flow

- [ ] Wiring: UI calls `validate` endpoint -> show errors.
- [ ] Wiring: UI calls `submit` endpoint -> show PR link.
- [ ] Verify Deployment: Merge PR -> Check Nginx reload on VM.
