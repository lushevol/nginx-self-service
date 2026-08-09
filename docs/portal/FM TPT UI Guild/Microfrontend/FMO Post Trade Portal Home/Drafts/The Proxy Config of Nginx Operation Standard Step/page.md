# Nginx Proxy Config Template

## **Upstream configs template**

| name | example value | description | upstream template / config |
| --- | --- | --- | --- |
| [upstream.name](http://upstream.name) | tenant-x-api | the description of upstream alias name | single server ``` upstream <upstream.name> { least_conn; server <upstream.server[0].host>:<upsteam.server[0].port>; } ``` multiple servers: ``` upstream <upstream.name> { least_conn; server <upsteam.server[0].host>:<upsteam.server[0].port>; server <upsteam.server[1].host>:<upsteam.server[1].port>; } ``` reference config: ``` upstream tenant-x-api { least_conn; server tenant-service-dev.uk.standardchartered.com:8456; } ``` |
| upstream.servers[0].host | [tenant-service-dev.uk.standardchartered.com](http://tanant-service-dev.uk.standardchartered.com) | server name or ip |
| upstream.servers[0].port | 8456 | server port |

## **Proxy configs template**

| name | example value | description | proxy template / config |
| --- | --- | --- | --- |
| location.match.path | /static/ ~ \.html$ | the rule to match the path of request | Http/Https: ``` location <location.match.path> { rewrite <location.rewrite_rule> break; proxy_redirect off; proxy_set_header Host uklvadfss0003a.uk.standardchartered.com:8092; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-Proto http; proxy_set_header X-Forwarded-For $remote_addr; proxy_set_header X-Forwarded-Host $remote_addr; proxy_pass <location.proxy_path.protocol>://<locatioin.proxy_path.upstream.name>; proxy_http_version 1.1; } ``` WebSocket: ``` location <location.match> { proxy_pass <location.proxy_path.protocol>://<locatioin.proxy_path.upstream.name>; # WebSocket proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; # basic header info proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; # timeout proxy_connect_timeout <location.request.timeout>; proxy_send_timeout <location.request.timeout>; proxy_read_timeout <location.request.timeout>; client_max_body_size <location.client_max_body_size>; } ``` |
| location.rewrite_rule | ^/static/(.*)$ /$1 break; | define the rule that rewrite request path to new path, if do nothing, the request will rewrite as same before |
| location.proxy_path.protocol | http https | upstream protocol |
| locatioin.proxy_path.upstream.name | tenant-x-api | the description of upstream alias name, keep same with upstream |
| location.request.timeout | 60 (default) 3600 7d 1h | the request timeout time, if the timeout period is exceeded, the websocket connection will be disconnected, used for websocket |
| location.client_max_body_size | 100M | the max size of request body for WebSocket |

## **Nginx proxy config form for tenant onboarding**

Download and open below attached html file and input your nginx proxy config,  then send generated config to Lu shuai or Fuhong Tang by email.

| # Nginx Proxy Config Info |
| --- |
| Basic Information | Tenant ID | |
| Business Unit/Department | |
| Environment( dev | uat | staging ) | |
| Contact Person | |
| Technical Contact Email | |
| Upstream Server Configuration | Upstream Service Name | |
| Server Host | |
| Server Port ( default: 80 ) | |
| Proxy Route Configuration | Match Path | |
| Path Rewrite | |
| Proxy Protocol ( http | https ) | |
| Upstream Service Name | |
| Enable WebSocket Proxy Support | |
| WebSocket Path | |
| WebSocket Timeout | |
| Advanced Settings | Max Request Body Size | |
| Send Timeout | |
| Load Balancing Method (default: least_conn) | |
| Self-defined Request Header | |

# Nginx proxy config non-prod environment maintain process

# UAT/STAGE environment configuration process

# UAT Env Update process

follow the process of non-prod proxy change, the difference the config change is in the repo and pipeline.

| | Current | Pain point | proposal |
| --- | --- | --- | --- |
| proxy code maintain | in the ratan-ansible repo | - the tenant configs are mix - no version control | - segregate the repo from ratan-ansible - segregate the config settings by tenant |
| deployment strategy | package by develop branch, deploy by rundeck manually | - depend on manual deployment - no config test before deployment cause failure | - update the deploy script include config-test and file rollback logic - trigger deploy by pipeline |

## **Deployment UAT and Stages Script Logic**
