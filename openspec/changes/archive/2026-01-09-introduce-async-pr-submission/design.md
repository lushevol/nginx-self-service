# Design

## Architecture

```mermaid
sequenceDiagram
    participant UI as Frontend
    participant API as Backend API
    participant DB as Database
    participant Worker as Background Worker
    participant ADO as Azure DevOps

    UI->>API: POST /config (split payload)
    API->>DB: Insert "Pending" Change Request
    API-->>UI: Return Change ID

    UI->>API: DELETE /config/pending/:id
    API->>DB: Delete Request
    API-->>UI: 200 OK

    loop Every X seconds
        Worker->>DB: Fetch "Pending" Requests
        Worker->>ADO: Test Connectivity (Loop Test)
        alt Connected
            Worker->>ADO: Create Branch & PR
            Worker->>DB: Update Status "Submitted", Log PR ID
        else Disconnected
            Worker->>DB: Log connection failure (don't fail request yet)
        end
    end
```

## Database Schema

New table `change_requests`:

- `id`: UUID
- `team`: string
- `environment`: string
- `upstreams_config`: JSON/Text
- `locations_config`: JSON/Text
- `status`: PENDING | SUBMITTED | FAILED
- `pr_id`: string (nullable)
- `created_at`: timestamp
- `updated_at`: timestamp

## Config Splitting

- Frontend will send `{ upstreams: string, locations: string }`.
- Backend validation will validate blocks individually.
- Nginx generation will concatenate them.

## API Changes

- `POST /api/nginx/:team/submit/:env`: Submits a change request.
- `GET /api/nginx/:team/pending`: Lists pending requests.
- `DELETE /api/nginx/:team/pending/:id`: Abandons a pending request.
