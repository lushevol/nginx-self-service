## FrontEnd

**Root Config:**

`git clone --single-branch --branch feature/notification https:``//bitbucket``.[global.standardchartered.com](http://global.standardchartered.com)``/scm/ratanrt/mfe_root_config``.git`

**Base:**

`git clone --single-branch --branch feature/notification https:``//bitbucket``.[global.standardchartered.com](http://global.standardchartered.com)``/scm/ratanrt/mfe_base``.git`

## BackEnd (using Spring Boot)

poc-mfe-notification-bff

`git clone --single-branch --branch main [https://bitbucket.global.standardchartered.com/scm/ratanrt/poc-mfe-notification-bff.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/poc-mfe-notification-bff.git)`

#### You can check this video for the result

**[Notification.mp4](https://standardcharteredbank-my.sharepoint.com/personal/2001208_zone1_scb_net/_layouts/15/guestaccess.aspx?share=ERk8sjHaxudNt38FxU2yNMkBE7msL8QQT0MirlcvACKGHA&e=iPDwrg)**

#### Swagger

[http://localhost:9090/swagger-ui/index.html#/notification/createNotification](http://localhost:9090/swagger-ui/index.html#/notification/createNotification)

#### Mutation

[http://localhost:9090/graphiql?query=mutation%20createNotification(%24topic%3A%20String!%2C%20%24message%3A%20String!%2C%20%24payload%3A%20String!)%20%7B%0A%20%20createNotification(topic%3A%20%24topic%2C%20message%3A%20%24message%2C%20payload%3A%20%24payload)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D&operationName=createNotification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%2C%22message%22%3A%20%22message%22%2C%20%22payload%22%3A%20%22payload%22%0A%7D](http://localhost:9090/graphiql?query=mutation%20createNotification(%24topic%3A%20String!%2C%20%24message%3A%20String!%2C%20%24payload%3A%20String!)%20%7B%0A%20%20createNotification(topic%3A%20%24topic%2C%20message%3A%20%24message%2C%20payload%3A%20%24payload)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D&operationName=createNotification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%2C%22message%22%3A%20%22message%22%2C%20%22payload%22%3A%20%22payload%22%0A%7D)

#### Subscription

[http://localhost:9090/graphiql?query=subscription%20notification(%24topic%3A%20String!%2C%20%24token%3A%20String!)%20%7B%0A%20%20notification(topic%3A%20%24topic%2C%20token%3A%20%24token)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D%0A&operationName=notification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%2C%0A%20%20%22token%22%3A%20%22abc%22%0A%7D](http://localhost:9090/graphiql?query=subscription%20notification(%24topic%3A%20String!%2C%20%24token%3A%20String!)%20%7B%0A%20%20notification(topic%3A%20%24topic%2C%20token%3A%20%24token)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D%0A&operationName=notification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%2C%0A%20%20%22token%22%3A%20%22abc%22%0A%7D)

#### Query

[http://localhost:9090/graphiql?query=query%20getNotification(%24topic%3A%20String!)%20%7B%0A%20%20getNotification(topic%3A%20%24topic)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D%0A&operationName=getNotification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%0A%7D](http://localhost:9090/graphiql?query=query%20getNotification(%24topic%3A%20String!)%20%7B%0A%20%20getNotification(topic%3A%20%24topic)%20%7B%0A%20%20%20%20id%0A%20%20%20%20topic%0A%20%20%20%20message%0A%20%20%20%20payload%0A%20%20%20%20createdAt%0A%20%20%7D%0A%7D%0A&operationName=getNotification&variables=%7B%0A%20%20%22topic%22%3A%20%22x%22%0A%7D)
