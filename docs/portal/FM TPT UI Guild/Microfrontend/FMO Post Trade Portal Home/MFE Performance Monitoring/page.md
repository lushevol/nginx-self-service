**<u>To make our MFE productions more efficiency with high performance, we will continuously monitor the performance metrics and optimize it.</u>**

*Following data will be updated once a week to see if we have made any performance turning all the time.*

*Testing is based on Dev: [https://fmo-mfe-dev.uk.dev.net:8453/](https://fmo-mfe-dev.uk.dev.net:8453/)*

# Lighthouse Monitoring

## Login Page with **cache-control: public, no-cache**

![image2023-5-15_10-59-52.png](attachments/image2023-5-15_10-59-52.png)

All the status code are 304: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)

The HTTP 304 Not Modified client redirection response code indicates that there is no need to retransmit the requested resources.

It is an implicit redirection to a cached resource. This happens when the request method is a safe method, such as GET or HEAD, or when the request is conditional and uses an If-None-Match or an If-Modified-Since header.

![image2023-5-15_12-40-40.png](attachments/image2023-5-15_12-40-40.png)

## After Login Page with **cache-control: public, no-cache**

![image2023-5-15_12-32-49.png](attachments/image2023-5-15_12-32-49.png)

![image2023-5-15_12-39-18.png](attachments/image2023-5-15_12-39-18.png)

## After Login Page & Trade Blotter with **cache-control: public, no-cache**

**![image2023-5-15_12-36-52.png](attachments/image2023-5-15_12-36-52.png)**

**![image2023-5-15_12-37-23.png](attachments/image2023-5-15_12-37-23.png)**

# Enable Gzip

| Before | After |
| --- | --- |
| ![image2023-3-21_16-4-51.png](attachments/image2023-3-21_16-4-51.png) | ![image2023-3-21_16-11-25.png](attachments/image2023-3-21_16-11-25.png) |

# **Cache Strategy**

**[MFE Cache Strategy]**
