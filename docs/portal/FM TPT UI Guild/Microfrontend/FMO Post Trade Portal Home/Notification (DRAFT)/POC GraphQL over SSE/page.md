## FrontEnd

**Root Config:**

`git clone --single-branch --branch feature/notification https:``//bitbucket``.[global.standardchartered.com](http://global.standardchartered.com)``/scm/ratanrt/mfe_root_config``.git`

**Base:**

`git clone --single-branch --branch feature/notification https:``//bitbucket``.[global.standardchartered.com](http://global.standardchartered.com)``/scm/ratanrt/mfe_base``.git`

## BackEnd (using NodeJS)

poc-mfe-notification-bff

`git clone --single-branch --branch main [https://bitbucket.global.standardchartered.com/scm/ratanrt/poc-mfe-notification-sse-bff.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/poc-mfe-notification-sse-bff.git)`

#### You can check this video for the result

**[Notification_SSE.mp4](https://standardcharteredbank-my.sharepoint.com/personal/2001208_zone1_scb_net/Documents/Documents/Notification_SSE.mp4?csf=1&web=1&e=djUIvs)**

#### Mutation

[http://localhost:4001/graphql?query=mutation+createNotification%28%24topic%3A+String%21%2C+%24message%3A+String%21%2C+%24payload%3A+String%21%29+%7B%0A++createNotification%28topic%3A+%24topic%2C+message%3A+%24message%2C+payload%3A+%24payload%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D%0A](http://localhost:4001/graphql?query=mutation+createNotification%28%24topic%3A+String%21%2C+%24message%3A+String%21%2C+%24payload%3A+String%21%29+%7B%0A++createNotification%28topic%3A+%24topic%2C+message%3A+%24message%2C+payload%3A+%24payload%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D%0A)

#### Subscription

[http://localhost:4001/graphql?query=subscription+notification%28%24topic%3A+String%21%2C+%24token%3A+String%21%29+%7B%0A++notification%28topic%3A+%24topic%2C+token%3A+%24token%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D%0A](http://localhost:4001/graphql?query=subscription+notification%28%24topic%3A+String%21%2C+%24token%3A+String%21%29+%7B%0A++notification%28topic%3A+%24topic%2C+token%3A+%24token%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D%0A)

#### Query

[http://localhost:4001/graphql?query=query+getNotification%28%24topic%3A+String%21%29%7B%0A++getNotification%28topic%3A+%24topic%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D](http://localhost:4001/graphql?query=query+getNotification%28%24topic%3A+String%21%29%7B%0A++getNotification%28topic%3A+%24topic%29+%7B%0A++++id%0A++++topic%0A++++message%0A++++payload%0A++%7D%0A%7D)
