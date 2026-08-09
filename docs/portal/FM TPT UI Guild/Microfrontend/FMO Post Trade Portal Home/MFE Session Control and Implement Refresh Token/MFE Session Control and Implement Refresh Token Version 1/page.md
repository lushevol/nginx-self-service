Before we jump to proposed design, we need to understand the requirement (both security and user requirement) and technology/ approach that will be used and discussed here.

# Security Requirement

The FMO Post Trade portal is categorized under S-BIA 5.

Bellow picture describe the requirement on 2 types of Session Control

1. User Session
2. Machine to Machine session

**This document will discuss on the User Session control only.**

![session control.png](attachments/session control.png)

# Technology

## JSON Web Token

JSON web token (JWT), pronounced "jot", is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Again, JWT is a standard, meaning that all JWTs are tokens, but not all tokens are JWTs.

JWTs can be used in various ways:

- Authentication: When a user successfully logs in using their credentials, an ID token is returned. According to the OpenID Connect (OIDC) specs, an ID token is always a JWT.
- Authorization: Once a user is successfully logged in, an application may request to access routes, services, or resources (e.g., APIs) on behalf of that user. To do so, in every request, it must pass an Access Token, which may be in the form of a JWT. Single Sign-on (SSO) widely uses JWT because of the small overhead of the format, and its ability to easily be used across different domains.
- Information exchange: JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be certain that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with.

**Security of JWTs**

The information contained within the JSON object can be verified and trusted because it is digitally signed. Although JWTs can also be encrypted to provide secrecy between parties, Auth0-issued JWTs are JSON Web Signatures (JWS), meaning they are signed rather than encrypted. As such, we will focus on signed tokens, which can verify the integrity of the claims contained within them, while encrypted tokens hide those claims from other parties.

In general, JWTs can be signed using :

- a secret (with the HMAC algorithm)
- a public/private key pair using RSA or ECDSA (although Auth0 supports only HMAC and RSA). When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

Before a received JWT is used, it should be properly validated using its signature. **Note that a successfully validated token only means that the information contained within the token has not been modified by anyone else**. This doesn't mean that others weren't able to see the content, which is stored in plain text.

**Because of this, you should never store sensitive information inside a JWT** and should take other steps to ensure that JWTs are not intercepted, such as:

- by sending JWTs only over HTTPS,
- following best practices, and
- using only secure and up-to-date libraries.

(Source: [https://auth0.com/docs/secure/tokens/json-web-tokens](https://auth0.com/docs/secure/tokens/json-web-tokens))

## Implementing JWT in  Authentication process

The OpenID Connect protocol, in abstract, follows the following steps.

1. The RP (Client) sends a request to the OpenID Provider (OP).
2. The OP authenticates the End-User and obtains authorization.
3. The OP responds with an ID Token and **usually an Access Token**.
4. The RP can send a request with the Access Token to the UserInfo Endpoint.
5. The UserInfo Endpoint returns Claims about the End-User.

These steps are illustrated in the following diagram:
+--------+ +--------+
| | | |
| |---------(1) AuthN Request-------->| |
| | | |
| | +--------+ | |
| | | | | |
| | | End- |<--(2) AuthN & AuthZ-->| |
| | | User | | |
| RP | | | | OP |
| | +--------+ | |
| | | |
| |<--------(3) AuthN Response--------| |
| | | |
| |---------(4) UserInfo Request----->| |
| | | |
| |<--------(5) UserInfo Response-----| |
| | | |
+--------+ +--------+

The following Claims are used within the ID Token for all OAuth 2.0 flows used by OpenID Connect:

**iss**
**REQUIRED**. Issuer Identifier for the Issuer of the response. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
**sub**
**REQUIRED**. Subject Identifier. A locally unique and never reassigned identifier within the Issuer for the End-User, which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string.
**aud**
**REQUIRED**. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party as an audience value. It MAY also contain identifiers for other audiences. In the general case, the aud value is an array of case sensitive strings. In the common special case when there is one audience, the aud value MAY be a single case sensitive string.
**exp**
**REQUIRED**. Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.
**iat**
**REQUIRED**. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
**auth_time**
Time when the End-User authentication occurred. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time. **When a max_age request is made or when auth_time is requested as an Essential Claim, then this Claim is REQUIRED**; otherwise, its inclusion is OPTIONAL. (The auth_time Claim semantically corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] auth_time response parameter.)
**nonce**
String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. If present in the ID Token, Clients MUST verify that the nonce Claim Value is equal to the value of the nonce parameter sent in the Authentication Request. If present in the Authentication Request, Authorization Servers MUST include a nonce Claim in the ID Token with the Claim Value being the nonce value sent in the Authentication Request. Authorization Servers SHOULD perform no other processing on nonce values used. The nonce value is a case sensitive string.
**acr**
OPTIONAL. Authentication Context Class Reference. String specifying an Authentication Context Class Reference value that identifies the Authentication Context Class that the authentication performed satisfied. The value "0" indicates the End-User authentication did not meet the requirements of ISO/IEC 29115 [ISO29115] level 1. Authentication using a long-lived browser cookie, for instance, is one example where the use of "level 0" is appropriate. Authentications with level 0 SHOULD NOT be used to authorize access to any resource of any monetary value. (This corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] nist_auth_level 0.) An absolute URI or an RFC 6711 [RFC6711] registered name SHOULD be used as the acr value; registered names MUST NOT be used with a different meaning than that which is registered. Parties using this claim will need to agree upon the meanings of the values used, which may be context-specific. The acr value is a case sensitive string.
**amr**
OPTIONAL. Authentication Methods References. JSON array of strings that are identifiers for authentication methods used in the authentication. For instance, values might indicate that both password and OTP authentication methods were used. The definition of particular values to be used in the amr Claim is beyond the scope of this specification. Parties using this claim will need to agree upon the meanings of the values used, which may be context-specific. The amr value is an array of case sensitive strings.
**azp**
OPTIONAL. Authorized party - the party to which the ID Token was issued. If present, it MUST contain the OAuth 2.0 Client ID of this party. This Claim is only needed when the ID Token has a single audience value and that audience is different than the authorized party. It MAY be included even when the authorized party is the same as the sole audience. The azp value is a case sensitive string containing a StringOrURI value.

(source: [https://openid.net/specs/openid-connect-core-1_0.html#IDToken](https://openid.net/specs/openid-connect-core-1_0.html#IDToken))

## Comparing the Security Requirement and the JWT Specification

We can use

1. **exp **and **iat **to handle the idle session timeout requirement, and the formula is **exp** = **iat** + 15 minutes
2. **auth_time **and **max_age **to handle absolute session timeout. The **max_age** is a constant = 60 minutes.

The **auth_time **value will be generated when

1. user logged in to the application
2. reach the **max_age **and the user is still actively accessing the application

Every user activity can modified **exp** and **iat** value, to keep session a life for next 15 minutes, BUT the **auth_time **is still remain the same until reach the **max_age **as shown below.

If User 1 as shown above are still performing any activity on the application until reach **max_age**, then there will be no new Access token generated.

Inline with the **max_age** scenario, if there is no user activity for 15 minutes (idle timeout life span), then there will be no new Access token generated.

## Problem Statement

From above discussion, we can see 2 problems:

1. if you user did not do any activity for 15 minutes (idle session timeout life span), then the application will not be able to generate new Access Token
2. if you user reach 60 minutes (absolute timeout life span), then the application will not be able to generate new Access Token.

Hence, on both case above, user will not be able to continue working or using the application until user performs re-login (re-authenticate) again to create new Access Token.

## Proposed Solution

### Idle session timeout problem

- To prevent idle session timeout problem, we can give an alert/ pop-up to the user if there is no activity for 15 minutes as shown below.
- Since the Access Token 3 will be expired on **10:26 AM**, then we can not use it to extend the user session (to generate new Access Token) once it reaches 10:26 AM. Hence we generate Refresh Token as shown below.
- We call** /api/auth/refreshtoken** API to generate Refresh Token using the Access Token 3 at **10:25:35 AM**. We assume that 25 seconds is enough time to get the response from the server before the Action Token 3 is expired.
- The Refresh Token life span is 105 minutes, so total Access Token idle timeout + Refresh Token life span = 15 minutes + 225 minutes ~= 240 minutes. Therefore, the Refresh Token should be expired on 14:00 PM.
- Hence if the user did not click the Extend button until 14:00 PM, the application will be logged out automatically.

- If user click the Extend button (on the second alert/ pop-up) between 10:25:45 AM to 14:00 PM, which Refresh Token is still valid, then it will call **/api/auth/relogin** generate the new Access Token with the new **auth_time **value.
- Since user click on the Extend button on 11:00 AM as shown below, then the new auth_time is 11:00 AM.
- **Since Refresh Token does not have auth_time and max_age, then it does not have absolute timeout. Hence, there should be no issue with Absolute Timeout problem.**

****

### Absolute timeout problem

Lets take a look on the scenario as shown below, all Access Token have expired time is less than absolute time, except Access Token 7.

| Access Token | Idle Timeout & Absolute Timeout |
| --- | --- |
| Access Token 1 | exp (10:15 AM) < auth_time + 60 (11:00 AM) |
| Access Token 2 | exp (10:17 AM) < auth_time + 60 (11:00 AM) |
| Access Token 3 | exp (10:26 AM) < auth_time + 60 (11:00 AM) |
| Access Token 4 | exp (10:36 AM) < auth_time + 60 (11:00 AM) |
| Access Token 5 | exp (10:46 AM) < auth_time + 60 (11:00 AM) |
| Access Token 6 | exp (10:56 AM) < auth_time + 60 (11:00 AM) |
| Access Token 7 | exp (11:06 AM) **>** auth_time + 60 (11:00 AM) |

Therefore to solve the absolute timeout problem then we can set **auth_time **to **iat **value and **max_age** = **auth_time + 60** minutes as shown below.

Hence, we can achieve that expired time is less than absolute time.

| Access Token 7 | exp (11:06 AM) **<** auth_time + 60 (11:51 AM) |
| --- | --- |

We have some other User Requirement from <u>**[MFE Session Control and Implement Refresh Token Version 0]**</u>, such as

1. User is allowed login in **one device**, if change device or browser login will kick other session
2. JWT Blacklist DB to record all the used Refresh Token or Access Token to generate the new Access Token.

that we do not cover on this discussion. We will put these 2 items on our backlogs.

# Implementation Result for Idle Timeout

The last user activity was at **Thu, 03 Aug 2023 08:40:01 GMT**

![image2023-8-4_9-11-13.png](attachments/image2023-8-4_9-11-13.png) ![image2023-8-4_9-19-24.png](attachments/image2023-8-4_9-19-24.png)

| iat | exp |
| --- | --- |
| ![image2023-8-4_9-20-34.png](attachments/image2023-8-4_9-20-34.png) | ![image2023-8-4_9-21-16.png](attachments/image2023-8-4_9-21-16.png) |

The response of get Refresh Token api was at Thu, 03 Aug 2023 08:54:36 GMT

![image2023-8-4_9-13-3.png](attachments/image2023-8-4_9-13-3.png) ![image2023-8-4_9-24-2.png](attachments/image2023-8-4_9-24-2.png)

| iat | exp |
| --- | --- |
| ![image2023-8-4_9-25-31.png](attachments/image2023-8-4_9-25-31.png) | ![image2023-8-4_9-26-7.png](attachments/image2023-8-4_9-26-7.png) |

The get Refresh Token was completed within 591 milliseconds.

![image2023-8-4_9-45-12.png](attachments/image2023-8-4_9-45-12.png)
