# 1. Release Principle Summary

To make Portal production releases more stable, predictable and less downtime which impacts business operation, we are using a fixed **Portal Release Window** model.

Portal will have **two (or three) planned release windows per month**:

| Release Window | Timing |
| --- | --- |
| 1st release window | **First Saturday** of the month |
| 2nd release window | **Third Saturday** of the month |
| 3rd release window | **Fifth Saturday **of the month |

Default release time:

> **Saturday 9:00 AM SGT**

Expected release duration:

> **24 hours**

A **half-year release calendar** will be published in advance.

---

# 2. What This Covers

This proposal covers **Portal production releases**, including:

| Request Type | Description |
| --- | --- |
| Existing tenant route update | Route change for a tenant already onboarded to Portal |
| New tenant onboarding | New tenant joining Portal |
| New tenant interface | New tenant interface or route integration |
| Function enhancement / Defect fix / New feature go-live | Portal-related functional change or production go-live item |

This proposal does **not** cover tenant-owned deployments.

| Area | Owner |
| --- | --- |
| Tenant UI, backend, service, database, infrastructure | Tenant team |

---

# 3. Release Window Rule

Portal releases will only happen during the planned release windows.

| Rule | Description |
| --- | --- |
| Regular release windows | First Saturday and third Saturday (and fifth Saturday) of each month |
| Default release time | Saturday 9:00 AM SGT - 7:00 PM SGT |
| Expected duration | 10 hours |
| Release calendar | Published half-yearly |
| No request by cut-off | No release for that window |

---

# 4. Cut-off Rule

> **WARNING**
> New Interface On Boarding require 30 days engagement before release

For each release window, the request cut-off is:

> **Monday EOD of the first week of the release window**

After cut-off:

> **Release scope is frozen.**

No new route update, onboarding request, function enhancement, defect fix, or production go-live item can be added after cut-off unless an exception is approved.

If no request is raised by cut-off:

> **No Portal release will be arranged for that window.**

---

# 5. Readiness Rule

All requests must complete the required checklist and validation **by the cut-off date**.

A request can only be included in the release window when it is ready for production planning.

Minimum readiness requirements:

| Existing Tenant Route Update | New Tenant Onboarding / New Interface | Function Enhancement / Defect Fix / New Feature |
| --- | --- | --- |
| Route configuration (Nginx configs) confirmed | Approved solution intent | Change scope confirmed |
| UAT sign-off | UAT sign-off | Testing completed |
| Connection check completed | Target users, user count, and profiles confirmed | Impact assessment completed |
| UVT plan and Tenant standby contact confirmed | Route configuration (nginx config) confirmed | Rollback plan prepared |
| Rollback plan prepared | Connection check completed | UVT plan prepared |
| User count/profiles change confirmed | Portal review completed | Standby contact confirmed |
| | OLA update completed | Release communication prepared |
| | UVT plan, standby contact, and rollback plan prepared |

<u>**please check [Admin Module Release Checklist Template] for details.**</u>

---

# 6. Change Freeze Period Rule

If a release window falls into a freeze period, there will be **no regular Portal release**.

Examples:

| Freeze Type |
| --- |
| Year-end freeze |
| DR freeze |
| Public holiday or business freeze |
| Other change freeze |

all reserved releases in period will be rescheduled or got dispensation approval.

---

# 7. UVT and Standby Rule

Tenant teams must be available during the release.

| Activity | Owner |
| --- | --- |
| Portal release execution | Portal team |
| Portal route enabling and rollback | Portal team |
| Tenant application validation | Tenant team |
| UVT execution | Tenant team |
| Tenant issue fixing and support | Tenant team |

If the tenant team is not available for UVT, the release should not proceed or should be rolled back based on the release decision.

---

# 8. Failed Release Handling

If a scheduled release fails, Portal team will assess the next action.

| Option | Rule |
| --- | --- |
| Postpone to next regular release window | Default option if business impact is acceptable |
| Postpone to next Saturday | Allowed if the release cannot wait two weeks but is not business critical |

For urgent release after a failed scheduled release:

| Step | Rule |
| --- | --- |
| Notification | Sent to all stakeholders by next Monday |
| Confirmation deadline | **All confirmations required by Monday EOD** |
| No concerns raised | Release will proceed |
| Concern raised | Release decision to be reviewed before proceeding |

---

# Proposed Policy Statement

Portal production releases will follow a fixed release-window model.

Portal will have two planned release windows per month: the **first Saturday** and the **third Saturday** (and the fifth Saturday)of each month. The default release time is **Saturday 9:00 AM SGT**, with an expected duration of **24 hours**. A half-year release calendar will be published in advance.

The request cut-off is **Monday EOD of the first week of the release window**. After cut-off, the release scope is frozen. If no request is raised by cut-off, no release will be arranged for that window.

All requests must complete the required checklist and validation by the cut-off date. This applies to existing tenant route updates, new tenant onboarding, new tenant interface integration, function enhancements, defect fixes, and new feature go-live items.

Tenant teams must be on standby during release and complete UVT after Portal route enabling.

Late requests move to the next eligible release window unless an exception is justified and approved. Out-of-cut-off requests require **PSS approval**. High-risk or non-standard exceptions require **senior approval**.

If a scheduled release fails, Portal team will assess whether to postpone it to the next regular release window, move it to the next Saturday, or treat it as an urgent release. For urgent release, notification will be sent before next Monday, and all confirmations are required by Monday EOD. If no concerns are raised, the release will proceed.

Portal release only covers **Portal route enabling, routing configuration, and Portal-owned production changes**. Tenant UI, backend, service, database, and infrastructure remain the responsibility of tenant teams.

---

# Final Release Calendar

| | Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Week 1 Proposal, Review and Testing Period | | - **[RATAN] **Change Review - **[Tenant] ****<u>Last Date for raising release request</u>** - **<u>[</u>Tenant<u>]</u>** **<u>R</u>**<u>**equest must complete all checklist and validations.**</u> | - **[RATAN] **Code review - **[RATAN]** Pipeline build | - **[RATAN]** PSS engagement | | | |
| - **[RATAN] **QA Testing (Functional, Integration, Regression Testing) |
| Week 2 Implementation Period | | - **[RATAN] **Release Approval | - **[RATAN]** PSS Pre-Cap | | | - **[RATAN] **Release - **[Tenant] **UVT Sign-Off |

## ![Image (2).jpeg](attachments/Image (2).jpeg)

**<u>For detail release calendar of each tenant team, please refer to [Markets Operations One Release Calendar]</u>**

# **<u>Stakeholders</u>**

| Service | PO | DL | Dev Team |
| --- | --- | --- | --- |
| RATAN - Settlement | Dinesh | Geoffrey Nick | |
| RATAN - Trade Control | Jeannie | Jay Liping | |
| FSS | | | [FSS_Services_Dev@exchange.standardchartered.com](mailto:FSS_Services_Dev@exchange.standardchartered.com) |
| SSDR | Crawford, Ewen (1634830) | Collin Zong, Liang | |
| SSI+ | | Thekkumpurath, Nithin | [SSIPLUS-DEV-SQUAD@exchange.standardchartered.com](mailto:SSIPLUS-DEV-SQUAD@exchange.standardchartered.com) |
| LoanIQ | Liu, Bryan Zhirong | Subramani1, Velmurugan | [LIQ-Project@sc.com](mailto:LIQ-Project@sc.com) |
| CES | | Jayan | [FMCESDev@exchange.standardchartered.com](mailto:FMCESDev@exchange.standardchartered.com) |
| VPA | | Gao, Mike Huancheng | [vpa_team@exchange.standardchartered.com](mailto:vpa_team@exchange.standardchartered.com) |
| STAMP | | Gao, Mike Huancheng | [FMRPSTAMP@exchange.standardchartered.com](mailto:FMRPSTAMP@exchange.standardchartered.com) |
