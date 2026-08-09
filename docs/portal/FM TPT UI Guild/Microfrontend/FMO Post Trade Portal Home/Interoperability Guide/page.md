Interoperability in the Markets Operation Portal defines how different applications work together across the platform. It establishes a standardized approach for exposing interfaces and enabling cross-application invocation.

## Modes

### Intent Navigation

Intent Navigation is a mode where a source tile raises an intent to a target tile with context data. Upon triggering the navigation, the target tile opens and loads the provided context as its initial data.

When an intent navigation is triggered, the screen transitions from the source tile to the target tile.

![image-2026-4-10_1-8-54.png](attachments/image-2026-4-10_1-8-54.png)

### Development

#### Subscribe Intent (Function Provider)

```js

```

#### Raise Intent (Function Consumer)

```

```

## Portal Interoperability Cooperation Mode

![image-2026-6-8_0-27-46.png](attachments/image-2026-6-8_0-27-46.png)

In the interoperability scenario, the feature lifecycle is not owned by one dedicated team end-to-end. Instead, it is a cross-team delivery model where multiple tenant teams cooperate to enable one business capability. The typical pattern is:

1. Team A is the requirement initiator and intent caller.
2. POs, users, or business stakeholders from Team A raise the requirement because their application needs to trigger a workflow, navigation, or action in another application.
3. Portal acts as the central interoperability layer.
4. Team A does not directly call Team B’s application. Instead, Team A raises a standardized intent to Portal. Portal receives the intent, performs routing, access control, context passing, and then dispatches it to the target provider application.
5. Team B is the intent provider and action handler.
6. Team B owns the receiving application. They need to implement the intent handler, consume the incoming context, perform the required business action, and optionally return a result/status to Portal or Team A.

### Key Dependency

The interoperability feature from Team A’s perspective is highly dependent on Team B’s delivery timeline.

Even if Team A finishes its own implementation, the full feature cannot be enabled unless Team B has also completed:

- intent registration
- intent handler implementation
- context contract agreement
- authorization readiness
- testing support
- release readiness
- production deployment

So the delivery is not just a Team A feature. It is a joint interoperability feature requiring synchronized planning, contract agreement, testing, and release coordination.

### Core Message for Leaders

This cooperation mode means interoperability delivery should be managed as a cross-team dependent feature, not as an isolated delivery by the requesting team.

Team A can own the business demand and caller-side implementation, but successful enablement requires Team B to commit delivery capacity and timeline. Portal provides the interoperability framework, governance, routing, and control layer, but it cannot remove the dependency between the caller and provider teams.

## Live Case

![image-2026-4-21_13-12-8.png](attachments/image-2026-4-21_13-12-8.png)
