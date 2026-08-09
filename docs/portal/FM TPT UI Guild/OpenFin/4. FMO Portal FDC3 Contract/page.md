| Platform | App Channel | Get Or Create App Channel | Add Context Listener | Intent Listener Name | Add Intent Listener | Payload to Change Theme | Open Tile in FMO Portal |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Provider | fmchannel | fdc3?.getOrCreateAppChannel("fmchannel") | channel?.addContextListener(**handleIntentListener**) | fmchannel.provider | fdc3?.addIntentListener("fmchannel.provider", **handleIntentListener**) | { type: "fmchannel", request: "changeTheme", theme: store.theme, } | launchView(`[https://fmo-mfe-dev.uk.dev.net:8453/?survey=no&openfintoken=${ContainerStore.token](https://fmo-mfe-dev.uk.dev.net:8453/?survey=no&openfintoken=${ContainerStore.token)}`, identity).then((d) => { console.log(d); }).catch((e) => { console.log(e) }); |
| Standalone React App | fmchannel | fdc3?.getOrCreateAppChannel("fmchannel") | channel?.addContextListener(**handleIntentListener**) | fmchannel.reactapp | fdc3?.addIntentListener("fmchannel.reactapp", **handleIntentListener**) | { type: "fmchannel", request: "changeTheme", theme: store.theme, } | Open new window - channel.broadcast({ type: "fmchannel", request: "openTile", url: `${address}?survey=no&container=${container}&module=${module}&tile=${tile}` }) Open new Tab (workspace) in all existing Platform view - fdc3.raiseIntent("**fmchannel.fmoportal**", { type: "fmchannel", request: "openTile", container, module, tile }) |
| FMO Portal | fmchannel | fdc3?.getOrCreateAppChannel("fmchannel") | channel?.addContextListener(**handleIntentListener**) | **fmchannel.fmoportal** | fdc3?.addIntentListener("**fmchannel.fmoportal**", **handleIntentListener**) | { type: "fmchannel", request: "changeTheme", theme: store.theme, } | \ |

## 4.1 Handle Context and Intent Listener

In this example, we use same method for Context and Intent Listener, i.e. **handleIntentListener**.

In real implementation, we can use different listener.

```js
const handleIntentListener = React.useCallback(
    (payload) => {
      if (payload?.request === "getToken") {
        sendToken()
      } else if (payload?.request === "openTile" && payload?.url) {
        const target = window.encodeURI(`${payload.url}&openfintoken=${ContainerStore.token}`);
        launchView(target).catch((e) => { console.error(e) });
      } else if (payload?.request === "changeTheme") {
        dispacthTheme(payload.theme);
      }
    },
    [sendToken, launchView, ContainerStore.token]
);
```

## 4.2 Launch View

```js
export const launchView = async (
  url: string,
  targetIdentity?: OpenFin_2.Identity
) => {
  if (window.fin) {
    const platform = fin.Platform.getCurrentSync();
    const viewOptions = {
      url,
      printName: "App",
      target: targetIdentity as OpenFin_2.Identity,
      width: "1400px",
      fdc3InteropApi: "1.2",
      intents: [
        {
          "name": "OpenTile",
          "displayName": "OpenTile",
          "contexts": ["fmchannel.provider"],
          "customConfig": {}
        }
      ],
    };
    return platform.createView(viewOptions, targetIdentity);
  }
};
```
