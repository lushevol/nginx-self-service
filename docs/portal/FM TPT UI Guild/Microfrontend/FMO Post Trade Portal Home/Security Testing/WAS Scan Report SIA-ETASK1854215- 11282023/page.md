## 150004 Path-Based Vulnerability

[https://fmo-mfe.uk.dev.net:8453/ssi_container/](https://fmo-mfe.uk.dev.net:8453/ssi_container/) => ** **

**The fix:**

**![image2024-4-24_15-39-11.png](attachments/image2024-4-24_15-39-11.png)**

## 150023 Directory Listing

[https://fmo-mfe.uk.dev.net:8453/](https://fmo-mfe.uk.dev.net:8453/) => all static file should be accessible without authentication, there is no sensitive information.
[https://fmo-mfe.uk.dev.net:8453/base/969cd8edbe67ad458695.svg](https://fmo-mfe.uk.dev.net:8453/base/969cd8edbe67ad458695.svg) => this is a static file (SVG file is similar with PNG or JPG for image file)
[https://fmo-mfe.uk.dev.net:8453/ssi_container](https://fmo-mfe.uk.dev.net:8453/ssi_container) => ** **

**The fix:**

![image2024-4-24_15-39-56.png](attachments/image2024-4-24_15-39-56.png)

## 150124 Clickjacking - Framable Page

![image2023-12-14_13-50-24.png](attachments/image2023-12-14_13-50-24.png)

**The fix:**

![image2024-4-24_15-42-40.png](attachments/image2024-4-24_15-42-40.png)

## 150263 Insecure Transport

![image2023-12-14_13-48-35.png](attachments/image2023-12-14_13-48-35.png)

## 150630 CORS header misconfigured

We removed Access-Control-Allow-Origin in UAT for all statics files

Access-Control-Allow-Origin:

![image2023-12-1_10-46-44.png](attachments/image2023-12-1_10-46-44.png)

**The fix:**

![image2024-4-24_15-45-22.png](attachments/image2024-4-24_15-45-22.png)

## 150202 Missing header: X-Content-Type-Options

We just implemented in UAT for all statics files

X-Content-Type-Options

![image2023-12-1_11-23-36.png](attachments/image2023-12-1_11-23-36.png)

**The fix:**

**![image2024-4-24_15-45-45.png](attachments/image2024-4-24_15-45-45.png)**

## 150042 Server Returns HTTP 5XX Error Code During Scanning

[https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/da/monitor](https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/da/monitor) => **should be fixed by Ratan team **

Should include PSID in request header or will return 500 error.

**![image2023-12-4_10-19-10.png](attachments/image2023-12-4_10-19-10.png)**

## 150375 PII Fields Found

![image2023-12-14_13-45-16.png](attachments/image2023-12-14_13-45-16.png)

## 150247 Web Server and Technologies Detected

We have implemented server_tokens, it does not work. We need to find another solutions.

- server_tokens off;

![image2023-12-1_11-4-54.png](attachments/image2023-12-1_11-4-54.png)

![image2023-12-1_11-3-39.png](attachments/image2023-12-1_11-3-39.png)

## 150528 Server Returns HTTP 4XX Error Code During Scanning

404 - Not Found => we do not have that service

401 - Unauthorized => they are protected API endpoint, you need to authenticated first.

404 [https://fmo-mfe.uk.dev.net:8453/api/analytics/](https://fmo-mfe.uk.dev.net:8453/api/analytics/)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/](https://fmo-mfe.uk.dev.net:8453/api/auth/)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/extend](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/extend)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/login](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/login)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/refreshtoken](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/refreshtoken)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/relogin](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/relogin)
404 [https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/validate](https://fmo-mfe.uk.dev.net:8453/api/auth/v2/sso/validate)
404 [https://fmo-mfe.uk.dev.net:8453/api/ratan/](https://fmo-mfe.uk.dev.net:8453/api/ratan/)
404 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/)
404 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/piolet/](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/piolet/)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/apiStatus](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/apiStatus)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/esLogging](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/esLogging)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/preference](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/preference)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/trade/](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/trade/)
401 [https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/trade/affirmation](https://fmo-mfe.uk.dev.net:8453/api/ratan/bff/v1/trade/affirmation)
404 [https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/](https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/)
404 [https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/da/](https://fmo-mfe.uk.dev.net:8453/api/ratan/v1/da/)
403 [https://fmo-mfe.uk.dev.net:8453/mfe_fssservices_container/](https://fmo-mfe.uk.dev.net:8453/mfe_fssservices_container/) ==> we can set the default index in nginx
403 [https://fmo-mfe.uk.dev.net:8453/ratan_container/](https://fmo-mfe.uk.dev.net:8453/ratan_container/) ==> we can set the default index in nginx

![image2023-12-1_11-18-35.png](attachments/image2023-12-1_11-18-35.png)

## 150621 List of JavaScript Links

Yes, there are required

[https://fmo-mfe.uk.dev.net:8453/js/external/runtime.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/runtime.min.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/import-map-overrides.js](https://fmo-mfe.uk.dev.net:8453/js/external/import-map-overrides.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/system.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/system.min.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/amd.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/amd.min.js)
[https://fmo-mfe.uk.dev.net:8453/base/](https://fmo-mfe.uk.dev.net:8453/base/)
[https://fmo-mfe.uk.dev.net:8453/base/base.js](https://fmo-mfe.uk.dev.net:8453/base/base.js)
[https://fmo-mfe.uk.dev.net:8453/config.js](https://fmo-mfe.uk.dev.net:8453/config.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/react-dom.production.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/react-dom.production.min.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/react.production.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/react.production.min.js)
[https://fmo-mfe.uk.dev.net:8453/js/external/single-spa.min.js](https://fmo-mfe.uk.dev.net:8453/js/external/single-spa.min.js)

### Vulnerability scan report

📎 [ETASK1854215-updated report.pdf](attachments/ETASK1854215-updated report.pdf)
