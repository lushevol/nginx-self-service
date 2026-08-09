![image-2026-6-29_10-21-36.png](attachments/image-2026-6-29_10-21-36.png)

To maintain Portal’s security boundary, ownership model, and operational stability, tenant applications onboarded to Post Trade Portal / Markets Operation One must not directly depend on externally hosted libraries, services, or runtime resources from the Portal GUI.

All frontend components, libraries, scripts, SDKs, assets, and runtime dependencies exposed through Portal must be either:

1. Internally owned and packaged within the tenant application or approved internal bank repositories; or
2. Accessed through tenant-owned backend services within the tenant domain, with the tenant team taking responsibility for integration, proxying, security, resilience, and support.

Direct browser-side calls from a Portal-integrated GUI to third-party external libraries or services are not allowed unless an exception is formally reviewed and approved through the platform governance process.

## Rationale

Portal is designed as a controlled internal platform. All visible components and dependencies should remain within the bank’s managed technology boundary to ensure:

- clear ownership and support responsibility
- consistent security and compliance control
- predictable runtime behavior
- stable release and rollback management
- reduced exposure to third-party availability, licensing, and supply-chain risks
- no uncontrolled dependency introduced into the Portal runtime

## Accepted Implementation Options

Tenant teams may adopt one of the following approaches when a third-party capability is required, such as PDF editing:

### Option 1: Internalize the library

The tenant team downloads, reviews, packages, and imports the required library into its own project or approved internal artifact repository. After this, the dependency becomes part of the tenant-owned application package and must follow internal dependency management, vulnerability scanning, licensing review, version control, and release governance.

### Option 2: Backend proxy / service encapsulation

The tenant team encapsulates the external integration behind its own backend service or proxy within the tenant domain. The Portal GUI only calls tenant-owned endpoints through the standard Portal routing model. The tenant backend is responsible for calling the external service or library, handling security, error management, resilience, audit, and compliance requirements.

## Ownership Expectation

Both options require implementation effort from the tenant team. Portal will not directly host, call, or manage external third-party runtime dependencies on behalf of tenants.

The tenant team remains accountable for:

- technical implementation
- security review
- dependency approval
- licensing validation
- vulnerability management
- production support
- fallback and rollback approach
- user impact during external dependency failure

## Decision Rule

If a dependency is required by a tenant feature but is not owned, packaged, routed, or governed inside the bank-controlled boundary, it should not be directly introduced into the Portal GUI runtime.

The default answer for direct external GUI dependency is therefore No, unless the dependency is internalized or encapsulated behind a tenant-owned service.
