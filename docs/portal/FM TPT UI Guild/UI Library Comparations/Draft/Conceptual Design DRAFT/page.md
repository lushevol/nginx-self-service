**Please open this document: [SI.CCIB.FM.22000358 - Material-UI Premium License](https://confluence.global.standardchartered.com/display/ENTARCH/SI.CCIB.FM.22000358+-+Material-UI+Premium+License)**

1. Solution Options Assessment

The objective of  this section is to drive tool/ application/ end-to-end solution options assessment for agreement with Domain Architecture. This is essential to ensure alignment to strategy and minimize technology duplication.

**1) Provide the rationale for buy vs build decision**

We need an ??? to give ......

2) **Conduct a comparative assessment of solution options to meet the initiative's requirements**

We assessed the following solutions and chose..... as the one most aligned to our needs. Some small scale PoCs were done ......

Comparison of key alternatives against .... see here:

| .... | MUI | ANTD | |
| --- | --- | --- | --- |
| Roadmap | [https://mui.com/material-ui/discover-more/roadmap/](https://mui.com/material-ui/discover-more/roadmap/) | It does not have technical development roadmap | |
| Documentation | [](https://mui.com/material-ui/getting-started/) [https://mui.com/material-ui/getting-started/](https://mui.com/material-ui/getting-started/) | [](https://ant.design/docs/react/getting-started) [https://ant.design/docs/react/getting-started](https://ant.design/docs/react/getting-started) | |
| Theming | [](https://mui.com/material-ui/customization/theming/) [https://mui.com/material-ui/customization/theming/](https://mui.com/material-ui/customization/theming/) | [](https://ant.design/docs/react/customize-theme) [https://ant.design/docs/react/customize-theme](https://ant.design/docs/react/customize-theme) | |
| Accessibility | ![image2023-7-5_14-35-27.png](attachments/image2023-7-5_14-35-27.png) | It is very limited | |
| Components | **** **INPUTS** - Autocomplete - Button - Button Group - Checkbox - Floating Action Button - Radio Group - Rating - Select - Slider - Switch - Text Field - Transfer List - Toggle Button **DATA DISPLAY** - Avatar - Badge - Chip - Divider - Icons - Material Icons - List - Table - Tooltip - Typography **FEEDBACK** - Alert - Backdrop - Dialog - Progress - Skeleton - Snackbar **SURFACES** - Accordion - App Bar - Card - Paper **NAVIGATION** - Bottom Navigation - Breadcrumbs - Drawer - Link - Menu - Pagination - Speed Dial - Stepper - Tabs **LAYOUT** - Box - Container - Grid - Grid v2 **NEW** - Stack - Image List - Hidden **UTILS** - Click-Away Listener - CSS Baseline - Modal - No SSR - Popover - Popper - Portal - Textarea Autosize - Transitions - useMediaQuery **MUI X** - Data Grid - Date & Time Pickers **LAB** - About the lab 🧪 - Masonry - Timeline - Tree View | **** **General** - Button - Icon - Typography **Layout** - Divider - Grid - Layout - Space **Navigation** - Anchor - Breadcrumb - Dropdown - Menu - Pagination - Steps **Data Entry** - AutoComplete - Cascader - Checkbox - ColorPicker - DatePicker - FormInput - InputNumber - Mentions - Radio - Rate - Select - Slider - Switch - TimePicker - Transfer - TreeSelect - Upload **Data Display** - Avatar - Badge - Calendar - Card - Carousel - Collapse - Descriptions - Empty - Image - List - Popover - QRCode - Segmented - Statistic - Table - Tabs - Tag - Timeline - Tooltip - Tour - Tree **Feedback** - Alert - Drawer - Message - Modal - Notification - Popconfirm - Progress - Result - Skeleton - Spin **Other** - Affix - App - ConfigProvider - FloatButton - Watermark | |
| Icons | [](https://mui.com/material-ui/material-icons/) [https://mui.com/material-ui/material-icons/](https://mui.com/material-ui/material-icons/) | [](https://ant.design/components/icon) [https://ant.design/components/icon](https://ant.design/components/icon) | |
| Data Grid | [](https://mui.com/x/react-data-grid/) [https://mui.com/x/react-data-grid/](https://mui.com/x/react-data-grid/) | | Community | Pro [](https://mui.com/x/react-data-grid/) | Premium [](https://mui.com/x/react-data-grid/) | | --- | --- | --- | --- | | **Column** | | | | | [Column groups](https://v5.mui.com/x/react-data-grid/column-groups/) | ✅ | ✅ | ✅ | | [Column spanning](https://v5.mui.com/x/react-data-grid/column-spanning/) | ✅ | ✅ | ✅ | | [Column resizing](https://v5.mui.com/x/react-data-grid/column-dimensions/#resizing) | ❌ | ✅ | ✅ | | [Column reorder](https://v5.mui.com/x/react-data-grid/column-ordering/) | ❌ | ✅ | ✅ | | [Column pinning](https://v5.mui.com/x/react-data-grid/column-pinning/) | ❌ | ✅ | ✅ | | **Row** | | | | | [Row height](https://v5.mui.com/x/react-data-grid/row-height/) | ✅ | ✅ | ✅ | | [Row spanning](https://v5.mui.com/x/react-data-grid/row-spanning/) | 🚧 | 🚧 | 🚧 | | [Row reordering](https://v5.mui.com/x/react-data-grid/row-ordering/) | ❌ | ✅ | ✅ | | [Row pinning](https://v5.mui.com/x/react-data-grid/row-pinning/) | ❌ | ✅ | ✅ | | **Selection** | | | | | [Single row selection](https://v5.mui.com/x/react-data-grid/selection/#single-row-selection) | ✅ | ✅ | ✅ | | [Checkbox selection](https://v5.mui.com/x/react-data-grid/selection/#checkbox-selection) | ✅ | ✅ | ✅ | | [Multiple row selection](https://v5.mui.com/x/react-data-grid/selection/#multiple-row-selection) | ❌ | ✅ | ✅ | | [Cell range selection](https://v5.mui.com/x/react-data-grid/selection/#range-selection) | ❌ | ❌ | 🚧 | | **Filtering** | | | | | [Quick filter](https://v5.mui.com/x/react-data-grid/filtering/#quick-filter) | ✅ | ✅ | ✅ | | [Column filters](https://v5.mui.com/x/react-data-grid/filtering/#single-and-multi-filtering) | ✅ | ✅ | ✅ | | [Multi-column filtering](https://v5.mui.com/x/react-data-grid/filtering/#multi-filtering) | ❌ | ✅ | ✅ | | **Sorting** | | | | | [Column sorting](https://v5.mui.com/x/react-data-grid/sorting/) | ✅ | ✅ | ✅ | | [Multi-column sorting](https://v5.mui.com/x/react-data-grid/sorting/#multi-sorting) | ❌ | ✅ | ✅ | | **Pagination** | | | | | [Pagination](https://v5.mui.com/x/react-data-grid/pagination/) | ✅ | ✅ | ✅ | | [Pagination > 100 rows per page](https://v5.mui.com/x/react-data-grid/pagination/#size-of-the-page) | ❌ | ✅ | ✅ | | **Editing** | | | | | [Row editing](https://v5.mui.com/x/react-data-grid/editing/#row-editing) | ✅ | ✅ | ✅ | | [Cell editing](https://v5.mui.com/x/react-data-grid/editing/#cell-editing) | ✅ | ✅ | ✅ | | **Import & export** | | | | | [CSV export](https://v5.mui.com/x/react-data-grid/export/#csv-export) | ✅ | ✅ | ✅ | | [Print](https://v5.mui.com/x/react-data-grid/export/#print-export) | ✅ | ✅ | ✅ | | [Clipboard](https://v5.mui.com/x/react-data-grid/export/#clipboard) | ❌ | 🚧 | 🚧 | | [Excel export](https://v5.mui.com/x/react-data-grid/export/#excel-export) | ❌ | ❌ | ✅ | | **Rendering** | | | | | [Customizable components](https://v5.mui.com/x/react-data-grid/components/) | ✅ | ✅ | ✅ | | [Column virtualization](https://v5.mui.com/x/react-data-grid/virtualization/#column-virtualization) | ✅ | ✅ | ✅ | | [Row virtualization > 100 rows](https://v5.mui.com/x/react-data-grid/virtualization/#row-virtualization) | ❌ | ✅ | ✅ | | **Group & Pivot** | | | | | [Tree data](https://v5.mui.com/x/react-data-grid/tree-data/) | ❌ | ✅ | ✅ | | [Master detail](https://v5.mui.com/x/react-data-grid/master-detail/) | ❌ | ✅ | ✅ | | [Row grouping](https://v5.mui.com/x/react-data-grid/row-grouping/) | ❌ | ❌ | ✅ | | [Aggregation](https://v5.mui.com/x/react-data-grid/aggregation/) | ❌ | ❌ | ✅ | | [Pivoting](https://v5.mui.com/x/react-data-grid/pivoting/) | ❌ | ❌ | 🚧 | | **Misc** | | | | | [Accessibility](https://v5.mui.com/x/react-data-grid/accessibility/) | ✅ | ✅ | ✅ | | [Keyboard navigation](https://v5.mui.com/x/react-data-grid/accessibility/#keyboard-navigation) | ✅ | ✅ | ✅ | | [Localization](https://v5.mui.com/x/react-data-grid/localization/) | ✅ | ✅ | ✅ | | It does not have Advance Data Grid module | |
| | Community | Pro [](https://mui.com/x/react-data-grid/) | Premium [](https://mui.com/x/react-data-grid/) |
| **Column** | | | |
| [Column groups](https://v5.mui.com/x/react-data-grid/column-groups/) | ✅ | ✅ | ✅ |
| [Column spanning](https://v5.mui.com/x/react-data-grid/column-spanning/) | ✅ | ✅ | ✅ |
| [Column resizing](https://v5.mui.com/x/react-data-grid/column-dimensions/#resizing) | ❌ | ✅ | ✅ |
| [Column reorder](https://v5.mui.com/x/react-data-grid/column-ordering/) | ❌ | ✅ | ✅ |
| [Column pinning](https://v5.mui.com/x/react-data-grid/column-pinning/) | ❌ | ✅ | ✅ |
| **Row** | | | |
| [Row height](https://v5.mui.com/x/react-data-grid/row-height/) | ✅ | ✅ | ✅ |
| [Row spanning](https://v5.mui.com/x/react-data-grid/row-spanning/) | 🚧 | 🚧 | 🚧 |
| [Row reordering](https://v5.mui.com/x/react-data-grid/row-ordering/) | ❌ | ✅ | ✅ |
| [Row pinning](https://v5.mui.com/x/react-data-grid/row-pinning/) | ❌ | ✅ | ✅ |
| **Selection** | | | |
| [Single row selection](https://v5.mui.com/x/react-data-grid/selection/#single-row-selection) | ✅ | ✅ | ✅ |
| [Checkbox selection](https://v5.mui.com/x/react-data-grid/selection/#checkbox-selection) | ✅ | ✅ | ✅ |
| [Multiple row selection](https://v5.mui.com/x/react-data-grid/selection/#multiple-row-selection) | ❌ | ✅ | ✅ |
| [Cell range selection](https://v5.mui.com/x/react-data-grid/selection/#range-selection) | ❌ | ❌ | 🚧 |
| **Filtering** | | | |
| [Quick filter](https://v5.mui.com/x/react-data-grid/filtering/#quick-filter) | ✅ | ✅ | ✅ |
| [Column filters](https://v5.mui.com/x/react-data-grid/filtering/#single-and-multi-filtering) | ✅ | ✅ | ✅ |
| [Multi-column filtering](https://v5.mui.com/x/react-data-grid/filtering/#multi-filtering) | ❌ | ✅ | ✅ |
| **Sorting** | | | |
| [Column sorting](https://v5.mui.com/x/react-data-grid/sorting/) | ✅ | ✅ | ✅ |
| [Multi-column sorting](https://v5.mui.com/x/react-data-grid/sorting/#multi-sorting) | ❌ | ✅ | ✅ |
| **Pagination** | | | |
| [Pagination](https://v5.mui.com/x/react-data-grid/pagination/) | ✅ | ✅ | ✅ |
| [Pagination > 100 rows per page](https://v5.mui.com/x/react-data-grid/pagination/#size-of-the-page) | ❌ | ✅ | ✅ |
| **Editing** | | | |
| [Row editing](https://v5.mui.com/x/react-data-grid/editing/#row-editing) | ✅ | ✅ | ✅ |
| [Cell editing](https://v5.mui.com/x/react-data-grid/editing/#cell-editing) | ✅ | ✅ | ✅ |
| **Import & export** | | | |
| [CSV export](https://v5.mui.com/x/react-data-grid/export/#csv-export) | ✅ | ✅ | ✅ |
| [Print](https://v5.mui.com/x/react-data-grid/export/#print-export) | ✅ | ✅ | ✅ |
| [Clipboard](https://v5.mui.com/x/react-data-grid/export/#clipboard) | ❌ | 🚧 | 🚧 |
| [Excel export](https://v5.mui.com/x/react-data-grid/export/#excel-export) | ❌ | ❌ | ✅ |
| **Rendering** | | | |
| [Customizable components](https://v5.mui.com/x/react-data-grid/components/) | ✅ | ✅ | ✅ |
| [Column virtualization](https://v5.mui.com/x/react-data-grid/virtualization/#column-virtualization) | ✅ | ✅ | ✅ |
| [Row virtualization > 100 rows](https://v5.mui.com/x/react-data-grid/virtualization/#row-virtualization) | ❌ | ✅ | ✅ |
| **Group & Pivot** | | | |
| [Tree data](https://v5.mui.com/x/react-data-grid/tree-data/) | ❌ | ✅ | ✅ |
| [Master detail](https://v5.mui.com/x/react-data-grid/master-detail/) | ❌ | ✅ | ✅ |
| [Row grouping](https://v5.mui.com/x/react-data-grid/row-grouping/) | ❌ | ❌ | ✅ |
| [Aggregation](https://v5.mui.com/x/react-data-grid/aggregation/) | ❌ | ❌ | ✅ |
| [Pivoting](https://v5.mui.com/x/react-data-grid/pivoting/) | ❌ | ❌ | 🚧 |
| **Misc** | | | |
| [Accessibility](https://v5.mui.com/x/react-data-grid/accessibility/) | ✅ | ✅ | ✅ |
| [Keyboard navigation](https://v5.mui.com/x/react-data-grid/accessibility/#keyboard-navigation) | ✅ | ✅ | ✅ |
| [Localization](https://v5.mui.com/x/react-data-grid/localization/) | ✅ | ✅ | ✅ |
| Date Picker | [](https://mui.com/x/react-data-grid/) [https://v5.mui.com/x/react-date-pickers/getting-started/](https://v5.mui.com/x/react-date-pickers/getting-started/) | | Community | Pro | | --- | --- | --- | | Date picker | ✅ | ✅ | | Date range picker | ❌ | ✅ | | Date time picker | ✅ | ✅ | | Time picker | ✅ | ✅ | | Date and Time pickers - Localization | ✅ | ✅ | | [](https://mui.com/x/react-data-grid/) [https://ant.design/components/date-picker](https://ant.design/components/date-picker) | | Free | | --- | --- | | Date picker | ✅ | | Date range picker | ✅ | | Date time picker | ✅ | | Time picker | ✅ | | Date and Time pickers - Localization | ✅ | | |
| | Community | Pro |
| Date picker | ✅ | ✅ |
| Date range picker | ❌ | ✅ |
| Date time picker | ✅ | ✅ |
| Time picker | ✅ | ✅ |
| Date and Time pickers - Localization | ✅ | ✅ |
| | Free |
| Date picker | ✅ |
| Date range picker | ✅ |
| Date time picker | ✅ |
| Time picker | ✅ |
| Date and Time pickers - Localization | ✅ |
| Bundle size | | | |
| Recommendation | | Pro | Premium | | --- | --- | | ❌ | ✅ | | ❌ | |
| Pro | Premium |
| ❌ | ✅ |

Check this for more detail: **[UI Library Comparations]**

| # | Assessment Criteria | | | |
| --- | --- | --- | --- | --- |
| 1 | **High-level design** | | | |
| 2 | **Strategic Alignment** | | | |
| 3 | **Alignment to Business Requirements** | | | |
| 4 | **Alignment to non-Functional Requirements** - Volume & Scalability - Geographical Scaling - Performance/ response time - Data Management - RBIA, SBIA, PIA, PCD | | | |
| 5 | **Time to Market <sup>##</sup>** | | | |
| 6 | **Implementation Feasibility<sup>##</sup>** | | | |
| 7 | **Ease of Operations<sup>##</sup>** | | | |
| 8 | **Cost to Implement<sup>##</sup>** | | | |
| 9 | **Risks** | | | Risk | Remediation | Remediation due date | | --- | --- | --- | --- | | 1 | N/A | | | | | | Risk | Remediation | Remediation due date | | --- | --- | --- | --- | | 1 | | | | | | | Risk | Remediation | Remediation due date | | --- | --- | --- | --- | | 1 | | | | |
| | Risk | Remediation | Remediation due date |
| 1 | N/A | | |
| | Risk | Remediation | Remediation due date |
| 1 | | | |
| | Risk | Remediation | Remediation due date |
| 1 | | | |
| 10 | **Assumptions** | | | Assumption | Action(s) to validate | Validation due date | | --- | --- | --- | --- | | 1 | N/A | | | | | | Assumption | Action(s) to validate | Validation due date | | --- | --- | --- | --- | | 1 | | | | | | | Assumption | Action(s) to validate | Validation due date | | --- | --- | --- | --- | | 1 | | | | |
| | Assumption | Action(s) to validate | Validation due date |
| 1 | N/A | | |
| | Assumption | Action(s) to validate | Validation due date |
| 1 | | | |
| | Assumption | Action(s) to validate | Validation due date |
| 1 | | | |
| 11 | **Constraints** | | | Constraint | Impact of constraint | Action to mitigate | Mitigation due date | | --- | --- | --- | --- | --- | | 1 | N/A | | | | | | | Constraint | Impact of constraint | Action to mitigate | Mitigation due date | | --- | --- | --- | --- | --- | | 1 | | | | | | | | Constraint | Impact of constraint | Action to mitigate | Mitigation due date | | --- | --- | --- | --- | --- | | 1 | | | | | |
| | Constraint | Impact of constraint | Action to mitigate | Mitigation due date |
| 1 | N/A | | | |
| | Constraint | Impact of constraint | Action to mitigate | Mitigation due date |
| 1 | | | | |
| | Constraint | Impact of constraint | Action to mitigate | Mitigation due date |
| 1 | | | | |

**Recommendation :**

** **

# 2. Reference Architecture

MANDATORY for any NEW vendor applications proposed by the solution (On-premise or Cloud) - provide the reference architecture as described by vendor. This may comprise of multiple views (capability, logical, technical/ deployment diagrams) provided by vendor.

# 3. Impacted Applications

Provide a list of all impacted business applications along with their rating - for new application, attach the initial rating (based on <u>[Initial R-BIA](https://thebridge.zone1.scb.net/docs/DOC-522619)</u>).

Has no direct impact on other systems. Is being onboarded as part of new Risk architecture

| Business Application ID | Business Application Name | Application Service/ Instance Name | Investment Status | BC Rating (based on R-BIA) | S-BIA Rating | Nature of Impact |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

# 4. Project Roadmap

For multi-phase implementations, provide a view of the project/ initiative roadmap to arrive at target state described in "1. Solution Options Assessment" (for recommended solution).

In multi-phased (particularly multi-year) implementations, it is likely that the roadmap will change in time (for upcoming phases) with new requirements/ vision refinement, and therefore must undergo update and re-assessment by ARFs/ Domain Tech Council.

| | | | |
| --- | --- | --- | --- |
| **Logical Diagram** | | | |
| **Expected Benefits** | | | |
| **Residual Risks/ Issues (if any)** | | | |

# 5. Landscape Simplification

Describe how the proposed solution supports following Technology objectives:

| | Objective | Response | Explanation/ Comments |
| --- | --- | --- | --- |
| 1 | If you plan to introduce a new cloud application, have you evaluated against <u>[Cloud Value Drivers](https://confluence.global.standardchartered.com/display/CLOUDSTRAT/%3CTemplate%3E+CVF_+Initiative+Name)</u> | | |
| 2 | Do you intend to decommission existing application(s) as part of this solution ? | | |
| 3 | Do you have any contain, disinvest or retire technologies (Technology Standard Catalogue) as part of the solution ? | | |
| 4 | Do you have any non-strategic (or non-standard) technologies (business applications/ utilities, OS, infra) as part of this solution ? | | |
| 5 | Will the solution increase the run-the-bank cost ? | | |

# 6. Review Log

| # | Date | Review Section | Status | Review Comments | Reviewer | Reviewer Role | Follow-up Actions | Action Updates |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | 1. Solution Options Assessment | | | | | | |
| 2 | | 2. Reference Architecture | | | | | | |
| 3 | | 3. Impacted Applications | | | | | | |
| 4 | | 4. Project Roadmap | | | | | | |
| 5 | | 5. Landscape Simplification | | | | | | |

# 7. Deviations

| # | Date | Deviation | Impacted Area | Deviation approved ? | Approver | Approver Role | Remediation | Remediation owner | Remediation date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | | | |

**Link: **Update [Chapter Approval Status](https://confluence.global.standardchartered.com/display/ENTARCH/2+Conceptual+Design__ClickHouse+Database#id-2ConceptualDesign__ClickHouseDatabase-status)

# 8. Decisions

| | Date | Decision | Approver | Approver Role | Rationale & Impact | Alternatives considered |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |

**Link: **Update **[Chapter Approval Status](https://confluence.global.standardchartered.com/display/ENTARCH/2+Conceptual+Design__ClickHouse+Database#id-2ConceptualDesign__ClickHouseDatabase-status)**

# Next Steps

This section must be reviewed by Domain Architecture Review Forum (ARF) whenever created/ updated.

- For new projects/ initiatives (or Conceptual Design created for first time) - Producer to raise to Architecture Review Forum (ARF) for review - ARF to review and raise to Domain Tech Council (DTC) for Approval - DTC to approve and invoke Solution Review Board (SRB) based on following applicability - [ ] Group strategic programs - [ ] New or emerging Technology Product with group or cross-domain impact - [ ] Programs with group or cross-domain impact - [ ] Material Cloud Arrangement Profile (MCAP) for PRA submission related - [ ] High invest technology initiatives (Total investment over 3 years >= USD 10M) - [ ] Recommended by Domain Chief Architects as a potential candidate for group adoption in the future - Once Approved by DTC, generate "Detailed Design" for Phase-1
- For existing projects/ initiatives if there is any section update(s) - Producer to raise to Architecture Review Forum (ARF) for review/ approval - ARF approves or identifies whether Domain Tech Council (DTC) approval is required - Once Approved, generate "Detailed Design" for Phase-2/+

**Link: **Update **[Chapter Approval Status](https://confluence.global.standardchartered.com/display/ENTARCH/2+Conceptual+Design__ClickHouse+Database#id-2ConceptualDesign__ClickHouseDatabase-status)**
