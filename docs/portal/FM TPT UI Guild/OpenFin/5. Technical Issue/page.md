There are 2 libraries that can be used in FDC3 implementation.

1. **fdc3-2.1**: **npm:@finos/fdc3@2.1.x**, <u>[https://github.com/finos/FDC3?tab=readme-ov-file#readme](https://github.com/finos/FDC3?tab=readme-ov-file#readme)</u>
2. **openfin-fdc3**:**^0.2.3** , <u>[https://github.com/HadoukenIO/fdc3-service#readme](https://github.com/HadoukenIO/fdc3-service#readme)</u>

![image2024-9-2_10-2-50.png](attachments/image2024-9-2_10-2-50.png)

Both libraries can be used to implement the broadcast message feature without any issue. But, FDC3 features can only work within their library . e.g.  **fdc3-2.1 **can not receive a broadcast message from **openfin-fdc3**.

![image2024-9-2_11-20-51.png](attachments/image2024-9-2_11-20-51.png)

FDC3 Intent feature can be implemented easily in **openfin-fdc3**.

Intent feature using **fdc3-2.1 **is throwing and error.

![image2024-9-2_11-41-14.png](attachments/image2024-9-2_11-41-14.png)

![image2024-9-2_11-40-2.png](attachments/image2024-9-2_11-40-2.png)

Intent feature using **openfin-fdc3**** **has no issue.

![image2024-9-2_11-42-42.png](attachments/image2024-9-2_11-42-42.png)

![image2024-9-2_11-44-44.png](attachments/image2024-9-2_11-44-44.png)

Hence, this POC is using both:

1. **fdc3-2.1** is using for broadcasting message.
2. **openfin-fdc3 **is using for raising intent.
