This document describes about the implementation FMO Post Trade Portal in OpenFin.

The main objective of this implementation is to enable sharing data/ message between the applications, and this data/ message from one application, e.g. FMO Post Trade Portal, is used to request other application to perform some action, e.g. open particular page or tile.

The implementation is using Financial Desktop Connectivity and Collaboration Consortium (FDC3) <u>**[1](https://fdc3.finos.org/)**</u>

## 1.1 What is FDC3

FDC3 is an open standard for applications on financial desktop to interoperate and exchange data with each other.

Users benefit from a more joined-up experience, which reduces the "friction" in getting tasks done.

Applications can launch each other, respond to activity in other apps and request functionality from each other.

## 1.2 The Standard

The FDC3 standard consists of 3 main parts:

1. **The API**, create a consistent developer experience by adhering to the <u>[API standard](https://fdc3.finos.org/docs/api/spec)</u>.
2. **Intents**, use <u>[standardized verbs](https://fdc3.finos.org/docs/intents/spec)</u> to instruct other apps to take an action.
3. **Context Data**, share [ <u>context</u> ](https://fdc3.finos.org/docs/context/spec)between apps to eliminate re-keying and streamline workflow.

## 1.3 Functional Use Cases

These are some functional uses cases as explain in <u>[here](https://fdc3.finos.org/docs/api/spec#functional-use-cases)</u>.

1. Open an Application
2. Requesting Functionality From Another App
3. Send or broadcast Context
4. Retrieve Metadata about the Desktop Agent implementation
5. Reference apps or app instance(s) and retrieve their metadata

Continue to **[2. Getting Started]**

References:

1. [https://fdc3.finos.org/](https://fdc3.finos.org/)
2. [https://fdc3.finos.org/docs/api/spec](https://fdc3.finos.org/docs/api/spec)
3. [https://fdc3.finos.org/docs/intents/spec](https://fdc3.finos.org/docs/intents/spec)
4. [https://fdc3.finos.org/docs/context/spec](https://fdc3.finos.org/docs/context/spec)
