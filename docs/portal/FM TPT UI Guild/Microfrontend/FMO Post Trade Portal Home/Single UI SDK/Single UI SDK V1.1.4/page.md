Please follow this document to use the Single UI SDK:

## [Java 8]

## [Java 17]

With this SDK you can get the EMS2 entitlements with 2 options.

1. Calling directly the EMS2 API
2. Extracting from the Entitlement Token

**Note:**

**Single-UI-Authorization and Entitlement Token are different. User can not use Entitlement Token for the authentication or login process.**

## Calling directly the EMS2 API

To minimize the effort on the code changes, the SDK provide a method that can be invoked in your code. The method is shown below.

![image2024-1-12_16-37-16.png](attachments/image2024-1-12_16-37-16.png)

Below code is an example of how to call the method in your code. You can just pass the **userId **from the **userInfo **request attribute.

![image2024-1-12_16-39-6.png](attachments/image2024-1-12_16-39-6.png)

The **userInfo **request attribute will be extracted from the **Single-UI-Authorization** request header as shown below.

![image2024-1-12_16-41-9.png](attachments/image2024-1-12_16-41-9.png)

With this approach, each team need to maintain:

1. EMS2 certificate updates,
2. API end point changes,
3. etc.

Below image is an example how to use SSL certificate when we run the Springboot application.

![image2024-1-12_16-47-42.png](attachments/image2024-1-12_16-47-42.png)

![image2024-1-12_16-49-38.png](attachments/image2024-1-12_16-49-38.png)

## Extracting from the Entitlement Token

You can get the entitlement from token. The SDK provides a method to validate the token and get entitlement as shown below.

As mentioned before: **Single-UI-Authorization and Entitlement Token are different. User can not use Entitlement Token for the authentication or login process.**

The implementation is shown in line 83 shown below.

![image2024-1-12_16-54-6.png](attachments/image2024-1-12_16-54-6.png)

Below code is an example of how to call the method in your code. You can just pass the **token **from the request body.

![image2024-1-12_17-5-51.png](attachments/image2024-1-12_17-5-51.png)

Below is the result example.

![image2024-1-12_17-6-52.png](attachments/image2024-1-12_17-6-52.png)
