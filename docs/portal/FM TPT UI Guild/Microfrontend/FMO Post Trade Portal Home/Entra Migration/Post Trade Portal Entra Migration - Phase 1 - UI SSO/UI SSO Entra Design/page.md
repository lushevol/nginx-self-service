# Background

please refer to [Post Trade Portal Entra Migration - Phase 1 - UI SSO]

## UI

Current Logic: Authentication relied on legacy OneMFA SSO URL generation everywhere. Environment handling was embedded in conditional logic, and SSO used a single legacy flow.

After Migration: Authentication is dual-path with a feature-flagged switch: Entra SSO is the new path, OneMFA remains as fallback. Environment resolution is centralized, and tenant/client selection is environment-aware, enabling a clean migration without breaking legacy users.

### Pilot Strategy

| Timeline | Normal Users | Pilot Users | Fallback |
| --- | --- | --- | --- |
| when technical go live | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) ![image-2026-3-23_10-36-17.png](attachments/image-2026-3-23_10-36-17.png) | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/)?ENABLE_ENTRA_SSO=true ![image-2026-3-23_10-42-37.png](attachments/image-2026-3-23_10-42-37.png) | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/)?ENABLE_ENTRA_SSO=false ![image-2026-3-23_10-36-17.png](attachments/image-2026-3-23_10-36-17.png) |
| when business go live | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/) ![image-2026-3-23_10-42-37.png](attachments/image-2026-3-23_10-42-37.png) | - | [https://fmo-mfe.gdc.standardchartered.com:8453/](https://fmo-mfe.gdc.standardchartered.com:8453/)?ENABLE_ENTRA_SSO=false ![image-2026-3-23_10-36-17.png](attachments/image-2026-3-23_10-36-17.png) |

## Single-UI-Bff Service

**Scope**

- Replace OneMFA token exchange with Entra OAuth2 code exchange for SSO logins.
- Preserve legacy OUD username/password flow for non‑SSO.
- Keep entitlement and session handling unchanged.

**High‑Level Architecture**

- **OneMFA/OUD Entry point: **Post /v2/sso/login
- **Entra Entry point:** `POST /v3/sso/login`
- **SSO routing decision:** - If `code` is blank → OUD login (username/password). - If `code` present → SSO flow. - If Entra SSO indicators are present (blank `iss` and `client_id`) → Entra exchange. - Else → OneMFA exchange (fallback).
- **Post‑auth steps (unchanged):** - Build user info payload - Retrieve entitlements from EMS2 - Issue JWT + entitlements token - Log analytics - Clear session cookie

**Key Components**

- **Controller** - `JwtAuthenticationController` orchestrates the login flow, determines auth path, and handles token issuance.
- **Auth Services** - `OUDAuthenticationService`: LDAP for username/password. - `EntraAuthenticationService`: - Exchanges authorization code for tokens at Entra token endpoint. - Decodes `id_token` to build user info. - Uses `ClientAssertionGenUtil` for client assertion JWT. - `MFAAuthenticationService`: legacy OneMFA flow (kept as fallback).
- **Crypto/Token Utility** - `ClientAssertionGenUtil`: - Builds JWT client assertion using private key + cert thumbprint. - Loads key/cert from file system or classpath.
- **Configuration** - `EntraConfigProperties`: - Entra tenant/client IDs, endpoints, cert/key paths, redirect URI, scopes, timeouts.

**Sequence (SSO via Entra)**

1. Client sends `code` to `POST /v3/sso/login`.
2. Controller detects Entra SSO signals and calls `EntraAuthenticationService.authenticate`.
3. Entra service posts code exchange to Entra token endpoint with: - `client_id` - `client_assertion_type` - `client_assertion` (signed JWT) - `grant_type` - `scope` - `code` - `redirect_uri`
4. Entra responds with tokens; `id_token` is decoded to build user profile.
5. Controller builds entitlements, issues JWT and entitlements token, returns response.

**Data Flows**

- **Inputs:** `code`, optional SSO claims (`iss`, `client_id`)
- **Outputs:** JWT, entitlements token, drawer data, user info
- **External dependencies:** Entra token endpoint, EMS2 entitlements, LDAP

**Security Considerations**

- Client assertion JWT uses RSA private key; certificate thumbprint included in `x5t` header.
- Private key and certificate must be securely stored and rotated.
- Token endpoint URL is part of audience in client assertion.

**Backward Compatibility**

- OUD login unchanged for non‑SSO.
- OneMFA flow retained as fallback for SSO requests that are not detected as Entra SSO.

**Assumptions**

- Entra `id_token` contains claims: `name`, `given_name`, `family_name`, `email`, `locale`, `country`.
- Entra token endpoint accepts client assertion with `x5t` thumbprint.
