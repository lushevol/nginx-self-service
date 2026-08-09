# Background

Analytics dashboards are essential tools for understanding how your users interact with your product or services.

They can give us an insight to increase adoption & accelerate time to value.

# Scope

To limit our analytics data, we are focusing only on these components:

1. Tile
2. Modal
3. Tab (Workspace)
4. Button
5. Switch
6. Dropdown

Each component has their own action or event that can be captured for the analysis purpose.

| Component | Action or Event |
| --- | --- |
| Tile | Open |
| Close |
| Modal | Open |
| Close |
| Tab | Click |
| Button | Click |
| Switch | Click |
| Dropdown | Select |

# Unique Identifier

We need to address the unique identifier for each component that can be differentiate to another.

To achieve this, we need these attributes for each component:

1. Container name
2. Tile name
3. Component name

For Switch, Dropdown or even Button and Tab, they may have value attribute that need to be captured for the analysis purpose.

# Additional Specific Attribute

In specific use case as shown below, we want to capture the filter/ search attributes and their value for every search button clicked by the user.

Hence, we need a custom attributes that can be used for different purpose.

![image2023-11-14_16-16-8.png](attachments/image2023-11-14_16-16-8.png)

# Model

With the detail requirement above, we define the model as shown below:

```js
interface AnalyticsData {
  container: string;
  tile: string;
  name?: string;
  value?: string;
  attribute1?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  attribute10?: string;
  attribute11?: string;
  attribute12?: string;
  attribute13?: string;
  attribute14?: string;
  attribute15?: string;
  attribute16?: string;
  attribute17?: string;
  attribute18?: string;
  attribute19?: string;
  attribute20?: string; 
}
```

The attribute 1 until 10, as shown above, can be used for the  filter/ search attribute values.

To capture the component type and its action or event, then we need another model as shown below.

The **singleUIAuthorization **is used to get the user information who did the action.

```js
type AnalyticsKeyType = "tile" | "modal" | "tab" | "button" | "dropdown" | "switch";
type AnalyticsTileOrModalEventType = "open" | "close";
type AnalyticsButtonOrTabOrSwitchEventType = "click";
type AnalyticsDropDownEventType = "select";

interface AnalyticsType {
  singleUIAuthorization?: string;
  key: AnalyticsKeyType;
  event: AnalyticsTileOrModalEventType | AnalyticsButtonOrTabOrSwitchEventType | AnalyticsDropDownEventType;
  container: string;
  tile: string;
  name?: string;
  value?: string;
  attribute1?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  attribute10?: string;
}
```

# A useAnalytics React Hook

To achieve an easy implementation, we create a custom React Hook called useAnalytics as shown below.

```js
const useAnalytics = () => {
  const [store] = useContext();
  const post = (data: AnalyticsType) => {
    postService("/analytics/v1/fmo/print?extend=false", data)
      .then((d) => console.info(d))
      .catch((e) => console.info(e));
  };
  const singleUIAuthorization = store.refreshToken || store.token;
  const TileEvent = (
    event: AnalyticsTileOrModalEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "tile",
      event,
      ...analyticsData,
    };
    post(data);
  };

  const ModalEvent = (
    event: AnalyticsTileOrModalEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "modal",
      event,
      ...analyticsData,
    };
    post(data);
  };

  const TabEvent = (
    event: AnalyticsButtonOrTabOrSwitchEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "tab",
      event,
      ...analyticsData,
    };
    post(data);
  };

  const ButtonEvent = (
    event: AnalyticsButtonOrTabOrSwitchEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "button",
      event,
      ...analyticsData,
    };
    post(data);
  };

  const SwitchEvent = (
    event: AnalyticsButtonOrTabOrSwitchEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "switch",
      event,
      ...analyticsData,
    };
    post(data);
  };

  const DropDownEvent = (
    event: AnalyticsDropDownEventType,
    analyticsData: AnalyticsData
  ) => {
    const data: AnalyticsType = {
      singleUIAuthorization,
      key: "dropdown",
      event,
      ...analyticsData,
    };
    post(data);
  };
  return {
    TileEvent,
    ModalEvent,
    TabEvent,
    ButtonEvent,
    DropDownEvent,
    SwitchEvent,
  };
};
```

Below the example how to use the useAnalytics React Hook

![image2023-11-14_16-38-34.png](attachments/image2023-11-14_16-38-34.png)

Everytime TileEvent, ModalEvent, TabEvent, ButtonEvent, DropDownEvent, SwitchEvent, is being invoked, it will call the **/api/analytics/v1/fmo/print?extend=false** API as shown below.

![image2023-11-14_16-45-57.png](attachments/image2023-11-14_16-45-57.png)

# User IP Address

To capture the user IP Address, we create the **getIp **method in the Single-UI-BFF as show below:

```java
    public String getIp(HttpServletRequest request) {
        String ip = request.getHeader(X_REAL_IP);
        if (Objects.isNull(ip)) {
            ip = request.getHeader(X_FORWARD_IP);
        }
        if (Objects.isNull(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
```
