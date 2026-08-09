# Base

- UI functionality is based on** BAU release branch version: **
- UI Design based on new design in Figma.
- MFE Q1 delivery is based on the January 2023 Ratan UI state.
- Unit & manual regression test is mandatory.
- Rebuild application to MFE standard.

# Entries

| Scope | Application | Entry | Entry unique ID | Delivery | Story point | Sprint |
| --- | --- | --- | --- | --- | --- | --- |
| CN | Cashflow | cashflow.html | @fm/cn-settlement-cashflow | Q1 | 13 | 1 |
| BAU | Reuse CN Cashflow | cashflow.html | @fm/ratan-cashflow | Q1 | 8 | 5 |
| BAU | Trade | trade.html | @fm/ratan-trade | Q1 | 13 | 2 |
| BAU | Exceptions | validationExceptions.html | @fm/ratan-exceptions | Q1 | 13 | 1 |
| BAU | Exceptions | settlementExceptions.html | @fm/ratan-exceptions | Q1 | 5 | 3 |
| BAU | Rules | suppressionRules.html | @fm/ratan-rules | Q1 | 13 | 3 |
| BAU | Rules | settlementNstpRules.html | @fm/ratan-rules | Q1 | 5 | 4 |
| BAU | Rules | nettingRules.html | @fm/ratan-rules | Q1 | 5 | 4 |
| NEW | NEW | SCB SSO | - | Q1 | 8 | 2 |
| NEW | NEW | Close all the open Bugs Q1 | - | Q1 | - | 1-6 |

# Testing

- unit test is mandatory ==> use data-test-id
- manual regression is mandatory.
- automatic regression testing is optional for Q1.
- cypress automatic testing

# * New UI Design

UX Prototype

[https://www.figma.com/proto/cvsp1umuhAytw08hCNb0kk/One-UI-Concept---Tile-Menu-%26-Workspace?node-id=1092%3A71489&scaling=scale-down&page-id=1092%3A33711&starting-point-node-id=1092%3A111398&hide-ui=1](https://www.figma.com/proto/cvsp1umuhAytw08hCNb0kk/One-UI-Concept---Tile-Menu-%26-Workspace?node-id=1092%3A71489&scaling=scale-down&page-id=1092%3A33711&starting-point-node-id=1092%3A111398&hide-ui=1)

UI Design Export (View Only)

[https://www.figma.com/file/4GGGtcbx9gA3sh2lEjHkfJ/One-UI-Concept---Tile-Menu-%26-Workspace-%2F-Ratan-UI?node-id=1%3A11709&t=hJSQmNq8J48WXGcj-1](https://www.figma.com/file/4GGGtcbx9gA3sh2lEjHkfJ/One-UI-Concept---Tile-Menu-%26-Workspace-%2F-Ratan-UI?node-id=1%3A11709&t=hJSQmNq8J48WXGcj-1)

# Tasks

| Catalog | Name | Owner | Story Point | Sprint |
| --- | --- | --- | --- | --- |
| Refactoring | Cashflow Refactoring | | 8 | 4 |
| Style | Cashflow New UI Design | | 2 | 4 |
| Testing | Cashflow Unit Test | | 3 | 4 |
| **Milestone** | Demo: Cashflow | | 1 | 4 |
| Refactoring | Trade Refactoring | | 8 | 5 |
| Style | Trade New UI Design | | 2 | 5 |
| Testing | Trade Unit Test | | 3 | 5 |
| **Milestone** | Demo: Trade | | 1 | 5 |
| Refactoring | Exception Refactoring | | 8 | 1 |
| Style | Exception New UI Design | | 2 | 1 |
| Testing | Exception Unit Test | | 3 | 1 |
| Refactoring | Exception Pages Adaption (Settlement Exceptions) | | 5 | 2 |
| Refactoring | Exception Pages Adaption (Validation Exceptions) | | 5 | 2 |
| Style | Remove less by css-in-js from all application. | | 3 | 2 |
| **Milestone** | Demo: Exception | | 1 | 2 |
| Refactoring | Rules Refactoring | | 8 | 3 |
| Style | Rules New UI Design | | 2 | 3 |
| Testing | Rules Unit Test | | 3 | 3 |
| Refactoring | Rules Pages Adaption (3 pages) | | 10 | 3 |
| **Milestone** | Demo: Rules | | 1 | 3 |
| Bugfix | Close all the open Bugs Q1 | | - | 1-6 |
| CI/CD | Build New Pipelines | | 10 | 1 |
| Refactoring | Add Type Definitions (typescript) to shared modules. and core business modules | | - | 1-6 |
| **Q2** |
| Testing | Regression and unit test | | 10 | 3 |
| Release | UAT and feedback | | | 4-5 |

# Steps

1. Migrate iFrame to MFE framework.
2. Enhance and strong the project.
3. Sync new features.
4. Testing
