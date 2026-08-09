## JIRA:

## Background

GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. [[https://graphql.org/learn/](https://graphql.org/learn/)]

GraphQL can be served and consumed over

1. HTTP [[https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md](https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md)]
2. **WebSocket **[[https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md)]
3. Server-Sent Events (**SSE**) [[https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md](https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md)]

**WebSocket **and **SSE **allow GraphQL **Subscription **operation type that allows a server to send data to its clients when a specific event happens [[https://www.howtographql.com/graphql-js/7-subscriptions/](https://www.howtographql.com/graphql-js/7-subscriptions/)]

### **Memory usage on the server**

The following amount of memory was roughly needed to handle 1,000 concurrent connections:

80 MB when plain WebSockets were used [[https://ably.com/topic/scaling-socketio#socket-io-vs-web-socket-vs-sock-js](https://ably.com/topic/scaling-socketio#socket-io-vs-web-socket-vs-sock-js)]

### **Max connection limit for websocket? [[https://repost.aws/questions/QUcKumuWXFS3WLYf3zs4gb0g/max-connection-limit-for-websocket](https://repost.aws/questions/QUcKumuWXFS3WLYf3zs4gb0g/max-connection-limit-for-websocket)]**

There is no explicit limit for WebSocket max connections.

However, we do have these limits that will restrict max connections indirectly:

- New connections per second per account (across all WebSocket APIs) per region : 500
- Connection duration for WebSocket APIs : 2 hours

Currently, all of them are hard limits and cannot be increased.

### WEBSOCKETS ADVANTAGES: [[https://ably.com/blog/websockets-vs-sse#web-sockets-advantages-and-disadvantages](https://ably.com/blog/websockets-vs-sse#web-sockets-advantages-and-disadvantages)]

- Fallback to HTTP: If you need to fall back to HTTP to get over the shortcomings of WebSockets mentioned below, this is possible to achieve using popular WebSockets-based libraries like Socket.IO, which have such fallbacks built-in.
- Resource efficiency: Due to being a low-level protocol, a single WebSocket connection can handle a high bandwidth on a single connection. WebSockets do not use 'XMLHttpRequest', and headers are not sent every time we need to get more information from the server. This minimizes the expensive data loads sent to the server.
- WebSockets offer bi-directional communication in realtime: Because WebSocket provides a full-duplex, bi-directional communication channel, the server can send messages to the client, and both can send messages at the same time. This makes two-way, multi-user realtime apps such as chat rooms possible and performant.
- Data format flexibility: WebSockets can transmit binary data and UTF-8 meaning that apps can support sending plain text and binary formats such as images and video.

### WEBSOCKETS DISADVANTAGES:

- Firewall blocking: Some enterprise firewalls with packet inspection have trouble dealing with WebSockets (notably SophosXG Firewall, WatchGuard, and McAfee Web Gateway).
- No built-in support for reconnection: When a WebSocket connection is closed (e.g. due to network issues), the client does not try to reconnect to the server, which means you’ll need to write extra code to poll the server, re-establishing the connection when it is available again.

### SERVER-SENT EVENTS ADVANTAGES: [[https://ably.com/blog/websockets-vs-sse#server-sent-events-advantages](https://ably.com/blog/websockets-vs-sse#server-sent-events-advantages)]

- Polyfillable: Server-Sent Events can be poly-filled with JavaScript in browsers that do not support it yet. This is useful for backward compatibility because you can rely on the existing implementation rather than having to write an alternative.
- Built-in support for reconnection: Server-Sent Event connections will reestablish a connection after it is lost, meaning less code to write to achieve an essential behavior.
- No firewall blocking: SSEs have no trouble with corporate firewalls doing packet inspection, which is important for supporting apps in enterprise settings.

### SERVER-SENT EVENTS DISADVANTAGES:

- Data format limitations. Server-Sent Events are limited to transporting UTF-8 messages; binary data is not supported.
- Limited concurrent connections. You can only have six concurrent open SSE connections per browser at any one time. This can be especially painful when you want to open multiple tabs with SSE connections. See 'Server-Sent Events and browser limits' for more information and workaround suggestions.
- SSE is mono-directional. You can only send messages from server to client. While this is useful for creating read-only realtime apps like stock tickers, it is limiting for many other types of realtime app.

<u>Compared to **WebSockets**, **SSE **is less complex and demanding, and easier to scale. [[https://ably.com/topic/websocket-alternatives#when-should-you-consider-a-web-socket-alternative](https://ably.com/topic/websocket-alternatives#when-should-you-consider-a-web-socket-alternative)]</u>

## Problem Statement

FMO TPT Portal is designed as Micro-FrontEnd (MFE) that allows users open many application Tiles in different workspaces.

Each Tile may have implemented GraphQL to query the data from the server and they may implement the **Subscription **operation type  that allows a server to send data to its clients for any mutation happens.

As result, it may create/open many **WebSocket **or **SSE **connections.

**SSE **has limitation on the number of concurrent connections, in another hand **WebSocket **has a problem on the enterprise firewalls, the number of concurrent connections as well, and no built-in support for reconnection.

## Objective

We want to use GraphQL Subscription over SSE instead of WebSocket.

Every user will have 1 SSE connection only.

Reduce the client browser resource usage.

## System Design

#### Option 1: Using simple REST API call

#### Option 2: Using GraphQL Subscription over WebSocket

#### Option 3: Using Kafka

## Notification Components

**[Table Schema]**

**[User Interface]**

**[Notification Store and React.useEffect]**

## POC

**[POC GraphQL over WebSocket] **using Spring Boot

**[POC GraphQL over SSE][POC GraphQL over SSE][POC GraphQL over SSE] **using NodeJS

**[POC SSE using Spring Boot]**

# Action Item

📎 [RE Notification (FMO Post Trade Portal Backlog).msg](attachments/RE Notification (FMO Post Trade Portal Backlog).msg)
