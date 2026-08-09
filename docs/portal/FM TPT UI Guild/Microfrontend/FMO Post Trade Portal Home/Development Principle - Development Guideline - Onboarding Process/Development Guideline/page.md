1. Use Typescript
2. Use latest ReactJS version, **18.2.0**.
3. Use **Functional Component** instead of **Class Component**
4. Use **Categorical** folder structure instead of **Flat** folder structure 1. ![image2023-4-20_13-58-3.png](attachments/image2023-4-20_13-58-3.png)
5. Apply **Error Boundary** in all Components. 1. ![image2023-4-20_15-53-25.png](attachments/image2023-4-20_15-53-25.png) ![image2023-4-20_15-55-39.png](attachments/image2023-4-20_15-55-39.png)
6. Use **React hooks Context & Reducer** instead of **Redux** or **other third party State** library. It aims to reduce the third party library dependency.
7. As much as possible use **React Lazy Loading** to load the Tile.
8. As much as possible use **React memo**, **React useCallback**, and **React useMemo**.
9. Use **Material UI** to have consistent **Theme **and User Experience. The **Base Container** ([https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe-base.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe-base.git)) (See Development Guideline point #1 above) is providing the Theme Configuration as discuss in here [https://mui.com/material-ui/customization/default-theme/](https://mui.com/material-ui/customization/default-theme/)
10. Use **Style** function from **@mui/material/styles** or **css **function from **@emotion/css **to create the Style Class. Do **not **use **less **or **scss **or **sass **or **css file**. 1. ![image2023-4-20_16-22-18.png](attachments/image2023-4-20_16-22-18.png)
11. Separate the **React DOM**, **business logic** (**useController**), **style**, and **interface **into different file. 1. ![image2023-4-20_16-8-31.png](attachments/image2023-4-20_16-8-31.png) ![image2023-4-20_16-10-58.png](attachments/image2023-4-20_16-10-58.png) ![image2023-4-20_16-12-1.png](attachments/image2023-4-20_16-12-1.png) ![image2023-4-20_16-12-40.png](attachments/image2023-4-20_16-12-40.png)
12. Use **LF **as End of Line Sequence instead of **CLRF** 1. ![image2023-4-21_10-37-45.png](attachments/image2023-4-21_10-37-45.png)
13. Use **code formatter** provided by the Container and Tile Template.
14. **Start with writing the Unit Test** instead of Component or Function.
15. You can point to **Dev Server** for your** Local Import Map**, if you do not have access to the particular repository. (**[https://single-spa.js.org/docs/recommended-setup#local-development](https://single-spa.js.org/docs/recommended-setup#local-development)**) 1. ![image2023-4-21_10-34-12.png](attachments/image2023-4-21_10-34-12.png)
