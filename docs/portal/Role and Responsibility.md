I recommend splitting PSS into **Portal PSS** and **Application PSS**. This matches how enterprise banks typically operate: the Portal Team owns the platform, each application team owns its application, and each has its own operational support responsibilities.

---

# Updated Responsibility Matrix

| Area | Portal Team | Portal PSS | Tenant Application Team | Application PSS |
|------|-------------|------------|-------------------------|-----------------|
| Business Requirements | I | I | A/R | I |
| Solution Design | C | I | A/R | I |
| Application Development | I | I | A/R | I |
| Portal Integration | A/R | C | R | I |
| Integration Testing | C | I | A/R | C |
| End-to-End Testing | C | C | A/R | C |
| UAT | I | I | A/R | C |
| Release Planning | C | C | R | A |
| Production Deployment | R | C | R | A |
| Production Monitoring | C | A/R | C | A/R |
| Incident Management | C | A/R | C | A/R |
| Problem Management | C | A/R | C | A/R |
| Change Management | C | A/R | C | A/R |
| Capacity Planning | A/R | C | A/R | C |
| Disaster Recovery | A/R | R | A/R | R |
| Performance Testing | C | I | A/R | C |
| Security Assessment | I | I | A/R | C |
| Risk Acceptance | I | I | A | I |
| Compliance Approval | I | I | A/R | I |
| Vendor Management | I | I | A/R | C |
| Documentation | C | C | A/R | C |

---

# Portal Team

Responsible for the **platform**.

### Responsibilities

- Portal architecture
- Portal framework and runtime
- Design system and shared components
- Portal SDKs
- Integration standards
- Authentication framework
- Portal infrastructure
- Portal release management
- Portal roadmap
- Tenant onboarding
- Platform documentation

### Does NOT own

- Tenant application code
- Business functionality
- Third-party services
- Vendor management
- Tenant security approval
- Tenant production support

---

# Portal PSS

Responsible for **operating the Portal Platform**.

### Responsibilities

### Platform Operations

- Portal production availability
- Portal health monitoring
- Platform alert management
- Platform operational dashboards
- Platform log monitoring

### Incident Management

- Investigate platform incidents
- Restore portal service
- Coordinate platform outages
- Escalate tenant-specific incidents to Application PSS
- Coordinate major incidents involving multiple applications

### Change & Release

- Execute portal production deployment
- Execute portal rollback
- Support platform maintenance windows
- Platform configuration management

### Operational Support

- Portal infrastructure support
- Portal runtime issues
- Shared SDK/runtime issues
- Portal authentication platform issues
- Shared gateway issues
- Shared cache/session issues

### Does NOT own

- Tenant application defects
- Business logic failures
- Third-party cloud services
- Vendor incidents
- Application data issues
- Tenant integrations

---

# Tenant Application Team

Owns the **application** throughout its lifecycle.

### Responsibilities

### Functional

- Requirements
- Design
- Development
- Testing
- Documentation

### Technical

- Portal integration
- APIs
- Authentication implementation
- Data protection
- Performance
- Monitoring
- Logging

### Governance

- Security assessment
- Architecture approval
- Compliance
- Risk acceptance
- Third-party assessment

### Operations

- Release readiness
- Knowledge transfer
- Vendor coordination

---

# Application PSS

Responsible for **operating the tenant application** after production.

### Responsibilities

### Application Operations

- Application availability
- Health monitoring
- Business transaction monitoring
- Application logs
- Alert handling

### Incident Management

- Investigate application incidents
- Restore application service
- Root cause analysis
- Bug triage
- Escalate to development teams

### Third-party Services

- Vendor communication
- SaaS incidents
- Third-party outages
- API failures
- Certificate management
- Token issues

### Business Support

- Production defects
- Functional support
- User issues
- Data correction (where applicable)

### Change & Release

- Application deployment
- Application rollback
- Hotfix deployment
- Configuration changes

### Does NOT own

- Portal framework
- Portal infrastructure
- Shared SDK
- Shared authentication platform
- Portal gateway
- Other tenant applications

---

# Incident Ownership

| Incident | Owner |
|-----------|-------|
| Portal unavailable | Portal PSS |
| Portal authentication failure | Portal PSS |
| Portal framework defect | Portal Team |
| Shared SDK defect | Portal Team |
| Tenant application crash | Application PSS |
| Business logic issue | Tenant Application Team |
| Third-party SaaS outage | Application PSS |
| Third-party security vulnerability | Tenant Application Team |
| Third-party vendor communication | Tenant Application Team |
| Portal deployment failure | Portal PSS |
| Tenant deployment failure | Application PSS |
| API contract issue between Portal and Tenant | Portal Team + Tenant Application Team |
| Production bridge involving platform and application | Portal PSS (Incident Coordinator) + Application PSS (Application Lead) |

---

## Guiding Principles

1. **Portal Team owns the platform.**
2. **Portal PSS operates the platform in production.**
3. **Tenant Application Team owns the application and all implementation decisions.**
4. **Application PSS operates and supports the application in production.**
5. **Each team owns the risks introduced by the systems and integrations they control.**
6. **For incidents spanning the platform and one or more tenant applications, Portal PSS coordinates the incident response while each Application PSS remains responsible for diagnosis and resolution within its own application boundary.**

This separation is commonly used in enterprise platforms because it makes ownership unambiguous during onboarding, production support, and major incident management. It also scales well as more tenant applications are onboarded.