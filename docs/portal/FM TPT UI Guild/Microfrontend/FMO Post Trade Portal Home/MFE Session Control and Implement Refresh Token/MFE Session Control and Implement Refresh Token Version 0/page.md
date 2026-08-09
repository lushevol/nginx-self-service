# Requirement

1. **S-BIA 4-5** systems must have session control.
2. **Absolute Session Timeout** less than 60 minutes.
3. **Idle Session Timeout** less than 15minutes.
4. Implement **Appropriate Notification** for expiring sessions.
5. **Refresh Token** is designed for **re-authentication**, enabling user extend session without jump to SSO login, enhancing the user experience.
6. **Security Control** of refresh token must have. To block any malicious usage of refresh token. Once detect refresh token is reused, system will deny the user session and redirect to SSO login with MFA.
7. User is allowed login in **one device**, if change device or browser login will kick other session

# High Level Design Diagram

# Description

## 1. Token

### 1.1 Description

api: /api/auth/v1/sso/login, will generate 2 tokens

| Token | Expire | Usage |
| --- | --- | --- |
| access token | 15 minutes | All the application will use auth token only for user validate |
| refresh token | 24 hours | extend auth token for another 15 min |

### 1.2 Token Safety

All token under https will not be [doctored](https://cn.bing.com/dict/search?q=doctored&FORM=BDVSP6&cc=cn)

## 2. Use Session Lifecycle

## 3. UI Interval to Flag User No-Activity

create Interval 1 hours and 15 minutes

| Interval | Usage | Action | Demo |
| --- | --- | --- | --- |
| 10 min | Idle Session Control: for check if user idle reaches 10min | Popup "Session Information" Dialog with "Keep Working" button, "Log out" Buttion" and session expire time countdown. | ![Annotation 2023-06-12 152155.jpg](attachments/Annotation 2023-06-12 152155.jpg) |
| 15 min | Absolute Session Control: for check if user keep idle reaches 15 min | Update "Session Information" Dialog with "session has expired" text. Display "Extend Session" button, Logout button. | ![InkedAnnotation 2023-06-12 153037_LI.jpg](attachments/InkedAnnotation 2023-06-12 153037_LI.jpg) |

## 4. No-Activity reaches 10 mins

If no activity for 10 minutes will popup "Session Information" dialog with "Keep Working" button, "Log out" Buttion" and session expire time countdown.

## 5. No-Activity reaches 15 mins

If user keep no activity for another 5 minutes, update "Session Information" Dialog with "session has expired" text. Display "Extend Session" button, Logout button.

## 6. Extend Access Token when User Keep Active

Else in every user activity will call **<u>/api/auth/v1/sso/refresh</u>**, request single-ui-authorization header is token --> to extend token for another **15 minutes,**

PS: we will <u>**debounce**</u> the calls to avoid too many non-necessary validate call

we need single-ui-authorization in the response header. UI need to replace the old token in the store with the new one and reset the **15 minutes setinterval**

**Refresh Token is Saved both client and server side, server side will control the security.**

### **Refresh Token Lifecycle and Security Management**

****

## 7. Force logout when 24 hours

The application will **<u>force logout in 24 hours</u>**.

# Reference:

1. [https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/#Keeping-Refresh-Tokens-Secure](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/#Keeping-Refresh-Tokens-Secure)

2. S-BIA 4-5

![image2023-5-31_17-9-19.png](attachments/image2023-5-31_17-9-19.png)
