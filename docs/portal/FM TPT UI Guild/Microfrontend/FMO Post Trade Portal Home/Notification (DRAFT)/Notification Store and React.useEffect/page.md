interface **Notification **{
  id: string;
  user_id: string;
  topic: string;
  isRead: string;
  message: string;
  payload: string;
  muted: boolean;
  isShown: boolean;
  container: string;
  module:  string;
  tile:  string;
}

interface **RootModel **{
  user?: User;
  token?: string;
  errorMsg?: string;
  isLoading?: boolean;
  theme?: string;
  isOpenFin?: boolean;
  expiredIn?: number;
  iat?: number;
  userLoginTime?: Date;
  clientBus?: any;
  workspaces?: Workspace[] | [];
  currentWorkspace?: Workspace;
  drawer?: boolean;
  apiStatus?: ApiStatus;
  loginStatus?: LoginStatus;
  timeType?: string;
  openSubscribe?: boolean;
  **notifications?: Notification[] | [];**
}

To show the new or updated record, user can click on the **Open In New Tile **from

![image2023-5-17_10-14-9.png](attachments/image2023-5-17_10-14-9.png)

or

![image2023-5-17_10-14-36.png](attachments/image2023-5-17_10-14-36.png).

Another approach is using **React.useEffect** on the **store.notifications**. Any **Tile **can perform any action on the **notification.payload**.

```js
import { ContainerProvider } from "../../../Root/import";
...
const [ContainerStore] = ContainerProvider.useContext();
React.useEffect(() => {
   if (ContainerStore.notifications) {
       ContainerStore.notifications.forEach(notification => {
          console.info(notification.payload);
       });
   } 
}, [ContainerStore.notifications]);


```

We can also have list of callbacks. So each application can register their callback function that can be invoked if there is new notification (see line 15)

```js
      eventsource.onmessage = function (event) {
        const response: any = JSON.parse(event.data);
        const hooks = getHooks();
        const notification = {
          ...response?.data?.notification,
          isRead: false,
          isShown: false,
          muted: false,
        }
        let notifications = [
          ...(hooks.store.notifications || []),
          notification,
        ];
        dispacthNotifications(notifications);
        applicationCallbacks.forEach(callback => {
          try {
            callback(notification)
          } catch (e) { }
        });
      };
```
