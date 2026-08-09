We are using EMS2 System for Application Authorization.

This is the way how we put the Entitlement in JWT to reduce the Request Header Size.

Entity: ExampleEntity 1

| Subject | ExampleEntity 1 Role 1 | ExampleEntity 1 Role 2 | ExampleEntity 1 Role N |
| --- | --- | --- | --- |
| ExampleEntity 1 Subject 1 | ExampleEntity 1 Role 1 Action 1 | ExampleEntity 1 Role 2 Action 1 | ExampleEntity 1 Role N Action 1 |
| ExampleEntity 1 Subject 2 | | ExampleEntity 1 Role 2 Action 2 | ExampleEntity 1 Role N Action 2 |
| ExampleEntity 1 Subject N | ExampleEntity 1 Role 1 Action N | ExampleEntity 1 Role 2 Action N | ExampleEntity 1 Role N Action N |

Entity: ExampleEntity 2

| Subject | ExampleEntity 2 Role 1 | ExampleEntity 2 Role 2 | ExampleEntity 2 Role N |
| --- | --- | --- | --- |
| ExampleEntity 2 Subject 1 | ExampleEntity 2 Role 1 Action 1 | ExampleEntity 2 Role 2 Action 1 | |
| ExampleEntity 2 Subject 2 | ExampleEntity 2 Role 1 Action 2 | ExampleEntity 2 Role 2 Action 2 | ExampleEntity 2 Role N Action 2 |
| ExampleEntity 2 Subject N | ExampleEntity 2 Role 1 Action N | ExampleEntity 2 Role 2 Action N | ExampleEntity 2 Role N Action N |

In JWT it will be formatted as  String array

**{**

**      "Enitity:Role" : {**

**             "Subject 1" : ["Action 1", ..., "Action N"],**

**             .....,**

**             "Subject N" : ["Action 1", ..., "Action N"],**

**       }**

**}**

If the user is assigned to (ExampleEntity 1, ExampleEntity 1 Role 1) and (ExampleEntity 2, ExampleEntity 2 Role N),  on the above example then the Entitlement will be as shown below

```js
{ 
   "ExampleEntity 1:ExampleEntity 1 Role 1": {
       "ExampleEntity 1 Subject 1" : ["ExampleEntity 1 Role 1 Action 1"],
       "ExampleEntity 1 Subject N" : ["ExampleEntity 1 Role 1 Action N"]
    },
	"ExampleEntity 2:ExampleEntity 2 Role N": {
       "ExampleEntity 2 Subject 2" : ["ExampleEntity 2 Role N Action 2"],
       "ExampleEntity 2 Subject N" : ["ExampleEntity 2 Role N Action N"]
    }
}

```

Bellow is JWT Payload example. The **entitlements **are stored as JSON String. The user Bank Id is stored in **sub**.

```
{
    "userInfo": "{\"entitlements\":\"{\\\"SSIPLUS:SSI_SUPER_USER\\\":{\\\"SEARCH\\\":[\\\"WRITE\\\"],\\\"VALIDATIONRULES\\\":[\\\"WRITE\\\"],\\\"STATIC\\\":[\\\"WRITE\\\"]},\\\"EMS2:EMS2_ADMIN\\\":{}}\",\"sub\":\"2001208\",\"iss\":\"single-ui-bff\",\"exp\":1690276516,\"iat\":1690275616,\"userLoginTime\":\"2023-07-25T17:00:14.9908493+08:00[Asia/Singapore]\",\"jti\":\"single-ui-bff-id\"}"
}
```

If you are using **[Single UI SDK V1.1.1]**, you can get the JWT payload from **@RequestAttribute("userInfo")**.

**userInfo **key contains three parts, **userId **(will be user bank id), **entitlements **(will be user raw entitlement message), and **version**.

```
{"entitlements":"{\"SSIPLUS:SSI_SUPER_USER\":{\"SEARCH\":[\"WRITE\"],\"VALIDATIONRULES\":[\"WRITE\"],\"STATIC\":[\"WRITE\"]},\"EMS2:EMS2_ADMIN\":{}}","userId":"2001208","version":"2"}
```

This is the **entitlements **example after converted into JSON Object

```js
{
  "SSIPLUS:SSI_SUPER_USER": {
     "SEARCH":["WRITE"],
     "VALIDATIONRULES":["WRITE"],
     "STATIC":["WRITE"]
  },
  "EMS2:EMS2_ADMIN":{ }
}
```
