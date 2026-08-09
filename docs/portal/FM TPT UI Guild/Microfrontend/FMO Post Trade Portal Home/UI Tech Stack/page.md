# What is React?

| | Original JS | React |
| --- | --- | --- |
| Language | JS | JS |
| Programming P[aradigm](https://cn.bing.com/dict/search?q=paradigm&FORM=BDVSP6&cc=cn) | Functional Programming var obj = document.getElementById("tradeId"); obj.innerText="tradeId: 55113322" | Reactive Programming const tradeIdComp= (props) => { const tradeId = props.tradeId; render (<childComp> {tradeId} </childComp>) } const childComp = (props, children) => { render (children) } |
| Architectural Patten | MVC ![image2025-1-14_16-26-49.png](attachments/image2025-1-14_16-26-49.png) Model changes will update the view by the web API directly, when update elements in a huge element pool, developer may make mistake and cause performance issue. | MVVM ![image2025-1-14_16-25-42.png](attachments/image2025-1-14_16-25-42.png) Data-binding between the Model and View, React create virtual dom tree (VM) to leverage the performance of the DOM rendering. developer don't have to write the coding for the basic DOM element update |
| **Pros** | on the condition of **small** project - one html include JS and css can fulfil the requirement | on the condition of **complex** enterprise project: - Easy to maintain business components and reuse them - Reduce the coding and enhancement of rendering perf: develop can business model and bind to component, react will auto render to the HTML. |

# What is Redux?

| | React | Redux |
| --- | --- | --- |
| Position | Framework | Lib |
| Usage | the foundation | for the shared data and context |

**Why we create a store? **

**the react component are the functions, without a shared store each function must define the param for get the data from caller**

![image2025-1-14_16-54-53.png](attachments/image2025-1-14_16-54-53.png)

**Main Concept of Redux: State, Action, Reducer**

- **The life cycle of state update in Redux**

![ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif](attachments/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

- **The way of triggering an update**

**![image2025-1-14_17-0-5.png](attachments/image2025-1-14_17-0-5.png)**

**![image2025-1-14_17-8-23.png](attachments/image2025-1-14_17-8-23.png)**

# Webpack, Single-spa and SystemJS

| | Mono Repo | Single-SPA |
| --- | --- | --- |
| Build Export File Type | HTML, JS, CSS | JS |
| JS Package | Original JS () | SystemJS |
| Plugins for building | html-plugin for create html less-plugin for convert css ts-loader for conver ts | ts-loader for covert ts single-spa-plugin for convert systemJS |
| runtime | use the script html, run the js in browser | require SystemJs lib maintain the register mapping and module import |
| | ![image2025-1-14_18-16-36.png](attachments/image2025-1-14_18-16-36.png) | ![image2025-1-14_18-7-57.png](attachments/image2025-1-14_18-7-57.png) |

**SystemJS** is a hookable, standards-based module loader

**single-spa** is a framework for bringing together multiple JavaScript microfrontends in a frontend application. is a framework for bringing together multiple JavaScript microfrontends in a frontend application.

| **SystemJS** | **single-spa** |
| --- | --- |
| - Define Module Name - Route Module Name and static file url - Import Module to page | - Mount the application by Module Name - Lifecycle of the application |

# Framework and Dependency

| Name | Type | Logo |
| --- | --- | --- |
| React | Framework | ![image2025-1-16_18-44-15.png](attachments/image2025-1-16_18-44-15.png) |
| Node.js | Framework | ![image2025-1-16_18-46-32.png](attachments/image2025-1-16_18-46-32.png) |
| Webpack | Build Tools | ![image2025-1-16_18-51-1.png](attachments/image2025-1-16_18-51-1.png) |
| Bable | Build Tools | ![image2025-1-16_18-47-54.png](attachments/image2025-1-16_18-47-54.png) |
| Typescript | Build Tools | ![image2025-1-16_18-52-10.png](attachments/image2025-1-16_18-52-10.png) |
| Redux | JS Library | ![image2025-1-16_19-0-17.png](attachments/image2025-1-16_19-0-17.png) |
| Less | Style Engine | ![image2025-1-16_19-0-42.png](attachments/image2025-1-16_19-0-42.png) |
| Emotion | Style Engine | ![image2025-1-16_19-14-49.png](attachments/image2025-1-16_19-14-49.png) |
| Jest | Testing | ![image2025-1-16_19-7-49.png](attachments/image2025-1-16_19-7-49.png) |
| aggrid | Component Library | ![image2025-1-16_19-5-4.png](attachments/image2025-1-16_19-5-4.png) |
| ant.design | Component Library | ![image2025-1-16_19-4-24.png](attachments/image2025-1-16_19-4-24.png) |
| MUI | Component Library | ![image2025-1-16_19-4-0.png](attachments/image2025-1-16_19-4-0.png) |
| lodash | JS Library | ![image2025-1-16_19-5-28.png](attachments/image2025-1-16_19-5-28.png) |
| dayjs | JS Library | ![image2025-1-16_19-6-10.png](attachments/image2025-1-16_19-6-10.png) |
| exceljs | Excel Export Tools | NA |
| axios | Connectivity | ![image2025-1-16_19-9-35.png](attachments/image2025-1-16_19-9-35.png) |
| GraphQL: Apollo Client | Connectivity | ![image2025-1-16_19-10-49.png](attachments/image2025-1-16_19-10-49.png) ![image2025-1-16_19-11-25.png](attachments/image2025-1-16_19-11-25.png) |
