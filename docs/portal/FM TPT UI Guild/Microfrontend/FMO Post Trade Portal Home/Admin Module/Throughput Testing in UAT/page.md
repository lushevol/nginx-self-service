This page is discussing about the FMO Portal Auth Services Performance Testing in UAT with Admin Module feature deployed.

# Analytics

Here is the Production FMO Portal Statistic to check the trend and capacity.

The maximum number of unique users logged-in to the FMO Portal is 166 on March 4*th* 2025.

![image-2025-3-6_17-48-38.png](attachments/image-2025-3-6_17-48-38.png)

# JMETER

From the Analytic we know that there are 166 unique user so far. I am preparing 500 user with Ramp-up period 250 seconds (= JMeter will take 250 seconds to run 500 users thread), with loop count/ iteration is 5.

![image-2025-3-6_17-46-29.png](attachments/image-2025-3-6_17-46-29.png)

![image-2025-3-6_18-18-39.png](attachments/image-2025-3-6_18-18-39.png)

![image-2025-3-6_18-19-30.png](attachments/image-2025-3-6_18-19-30.png)

And we are using UAT server: [https://fmo-mfe.uk.dev.net:8453/](https://fmo-mfe.uk.dev.net:8453/) for this PT.

![image-2025-3-6_18-11-56.png](attachments/image-2025-3-6_18-11-56.png)

You can download the JMX file below.

📎 [fmo-mfe.uk.dev.net.jmx](attachments/fmo-mfe.uk.dev.net.jmx)

# Result

You can download the result below.

📎 [UAT-result.zip](attachments/UAT-result.zip)

Here is the summary:

- All 17500 requests received the OK response from the server.
- The maximum response time is 2023 milliseconds (2 seconds) for **/api/auth/v2/sso/validate**.
- There are 2 API endpoints with the response time is between 1 to 2 seconds, **/api/auth/v1/fmo/admin/importmap/active** and **/api/auth/v2/sso/login**
- The rest endpoints are below 1 second.
- These 3 endpoints **/api/auth/v2/sso/validate**, and **/api/auth/v2/sso/login, /api/auth/v2/sso/relogin **are having database query and getting data from EMS2 Services.
- This 1 endpoint **/api/auth/v1/fmo/admin/importmap/active **is having database query only.

![image-2025-3-6_18-1-20.png](attachments/image-2025-3-6_18-1-20.png)
