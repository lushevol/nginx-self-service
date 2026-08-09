# Current Architecture

# Expected New Requirements & Changes in 2026 and Early 2027

1. FSS is going to off board portal
2. CDUPS and SSDR will on board to portal in 2026, more applications (PTS, FM SWIFTGATEWAY, MARS, etc) are going to on board in 2027-.
3. Refining requirement: Chatbot, NLP to interop workflows cross tiles.
4. Refining requirement: Telemetry, user activities monitoring & insight.
5. DC Migration

<details>
<summary>Expand Details</summary>

1. Refining requirement: Notification Center, a central bus for user based realtime notification.
2. Refining requirement: Dashboard, persona-based dashboard for remaining works.
3. Refining requirement: OpenFin.

</details>

# Performance State

| Metric | User Count | Data Source |
| --- | --- | --- |
| registering users | 2400 | OLA ![image-2026-4-16_14-29-25.png](attachments/image-2026-4-16_14-29-25.png) |
| predicted max concurrent users (hourly) | 250 |
| monitoring max concurrent users (hourly) | 60 | [PTP User E2E Test Case] |
| PT concurrent users (hourly) with SLA 5s | 757 | [PTP Test Result] |

PT results shows

4x (240 concurrent users) CPU: 11%, DB: 12%, Mem: (29G) 25%

6x (360 concurrent users) CPU: 12%, DB: 12%, Mem: (30G) 25%.

→ 12x (720 concurrent users) CPU:  13%, DB: 12%, Mem: (31) 26%.

[PTP Service Group Metric Collection]

### Total Users Change

FSS Off Boarding: - 750 users

CDUPS On Boarding: + 100 users

PTS On Boarding: + 300 users

Total users change: - 350 user

# Target Architecture

## Logical Architecture

<details>
<summary>Expand Details</summary>

</details>

# Target Deployment - SKE

## VM Size

| Component | Service | CPU | Memory | Storage Size | VM |
| --- | --- | --- | --- | --- | --- |
| Applications | mo1-auth-service | 16 | 32GB | 100GB | 4 |
| mo1-tile-management-service |
| mo1-telemetry-service |
| mo1-ai-service |
| Webserver, UI |
| Load Balance | Nginx | 4 | 8BG | - | 4 |
| Foundation | Database | 8 | 64GB | 500GB | 4 |
| Total | | 112 | 416GB | 2400GB | 12 |

Reference data

Current single-ui-bff instances are 2 x 2, memory 256MB each
