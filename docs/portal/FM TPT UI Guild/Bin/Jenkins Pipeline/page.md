This pipeline is developed based on the **MFE with MS Architecture Design Option 2** (discussed in [Micro-frontend]).

| Module | Bitbucket | Jenkins | Docker Image Type |
| --- | --- | --- | --- |
| Root Config | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_root_config.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_root_config.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_root_config/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_root_config/) | nginx:1.20.1-alpine |
| Base | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_base.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_base.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_base/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_base/) | nodejs-14:1-43 |
| Ratan Container | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_ratan_container.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_ratan_container.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_ratan_container/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_ratan_container/) | nodejs-14:1-43 |
| Ratan Trade Blotter | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_trades.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_trades.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_trades/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_trades/) | nodejs-14:1-43 |
| Cashflow Blotter | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_cashflow.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_cashflow.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_cashflow/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_cashflow/) | nodejs-14:1-43 |
| Container Template | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_template_container.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe_template_container.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_template_container/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_template_container/) | nodejs-14:1-43 |
| Tiles Template | [https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe-template-tiles.git](https://bitbucket.global.standardchartered.com/scm/ratanrt/mfe-template-tiles.git) | [https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe-template-tiles/](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe-template-tiles/) | nodejs-14:1-43 |

## Root Config

### Jenkins File

```groovy
#!groovy

node("docker && aws") {
  try {
    echo "start"
    def buildNum = env.BUILD_NUMBER
    echo "buildNum is ${buildNum}"
    def nodeHome = installTool "node-v16.14.0-linux-x64-golden-version"
    echo "nodeHome is ${nodeHome}"
    def imageNamespace = "ratan"
    def groupPath="com/scb/ratan-gui"

    def scmVars
    def serverTag
    def imgBuild

    withEnv(["NODE_HOME=${nodeHome}","PATH+NODE=${nodeHome}/bin"]) {
      stage("Checkout") {
        cleanWs();
        scmVars = checkout scm
        notifyStash();
      }

      def branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
      echo "branchName is ${branchName}"
      if (branchName != "main") {        
        def props = readJSON file: 'package.json'
        def projectName = props.name.replace("@fm/", "")
        def projectVersion = props.version +"."+ buildNum
        def moduleVersion = projectVersion +".DEV"
        if (branchName == "trunk") {
          moduleVersion = projectVersion +".TRUNK"
        }
        if (branchName == "prod") {
          moduleVersion = projectVersion +".RELEASE"
        }
        echo "projectName is ${projectName}"
        echo "projectVersion is ${projectVersion}"
        echo "moduleVersion is ${moduleVersion}"

        def mfeProjectName = "${projectName}-mfe"
        
        
        installNpx()
        stage("Build & Test") {
          sh '''
            node --version
            npm --version
            npm config set registry https://artifactory.global.standardchartered.com/artifactory/api/npm/npm-release
            npm config set always-auth false
            npm install
            npm test
            npm run build
            pwd
            ls dist
          '''
        }
        stage("Scan") {
          echo "run sonarqube scan here"
          if (branchName == "trunk" || branchName == "prod") {
            echo "run 3rd party library scan here"
          }
        }
        if (branchName == "trunk" || branchName == "prod" || branchName == "feature/pipeline") {
          stage("Publish") {
            zip zipFile: "${branchName}-${mfeProjectName}-${moduleVersion}.zip", dir:"dist/"
            uploadToArtifactory {
                pattern = "${branchName}-${mfeProjectName}-${moduleVersion}.zip"
                target = "generic-release/${groupPath}/${projectName}/"
            }
            sh '''
              rm -Rf node_modules
              rm -Rf coverage
            '''
            artifactoryDockerRegistry {
                serverTag = "${imageNamespace}/${mfeProjectName}:${moduleVersion}"
                imgBuild = docker.build(serverTag,"--build-arg BUILD_DIR=docker-${mfeProjectName} -f Dockerfile .")
                imgBuild.push()
            }
          }
        }
      }
    }
    
    
    currentBuild.result = 'SUCCESS'
  } catch(exc) {
    exc.printStackTrace()
    currentBuild.result = 'FAILURE'
  } finally {
    notifyStash()
  }
}

def installNpx() {
    try {
      stage('Npx Install') {
        sh '''
          node --version
          npm --version
          npm config set registry https://artifactory.global.standardchartered.com/artifactory/api/npm/npm-release
          npm config set always-auth false
          npm install -g npx
        '''
      }
    } catch(exc) {
    } finally {
    }
}
```

### Docker File

```groovy
FROM artifactory.global.standardchartered.com/nginx:1.20.1-alpine

WORKDIR /apps/ratanrt

USER root
RUN chgrp -R 0 /apps/ratanrt && \
    chmod -R g=u /apps/ratanrt
RUN chgrp -R 0 /etc/nginx && \
    chmod -R g=u /etc/nginx    
RUN mkdir -p /apps/ratanrt/mfe
RUN mkdir -p /apps/ratanrt/mfe/logs
RUN mkdir -p /apps/ratanrt/mfe/tmp
RUN mkdir -p /apps/ratanrt/mfe/dist

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.backup
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY dist /apps/ratanrt/mfe/dist
RUN ls /apps/ratanrt/mfe
RUN ls /apps/ratanrt/mfe/dist
RUN ls /etc/nginx
RUN ls /etc/nginx/conf.d
RUN cat /etc/nginx/nginx.conf
RUN cat /etc/nginx/conf.d/default.conf
RUN chown -R 10001:10001 /etc/nginx
RUN chown -R 10001:10001 /apps/ratanrt

USER 10001
```

### Nginx

```bash
# Web Engineering NGINX Configuration Template for NGINX-SSL Instance.
# user nginx;
worker_processes auto;
pid /apps/ratanrt/mfe/tmp/nginx.pid;

events {
    worker_connections 512;
    use epoll;
    multi_accept on;
}

http {
    client_body_temp_path /apps/ratanrt/mfe/tmp/client_temp;
    proxy_temp_path /apps/ratanrt/mfe/tmp/proxy_temp_path;
    fastcgi_temp_path /apps/ratanrt/mfe/tmp/fastcgi_temp;
    uwsgi_temp_path /apps/ratanrt/mfe/tmp/uwsgi_temp;
    scgi_temp_path /apps/ratanrt/mfe/tmp/scgi_temp;

    ##
    # Basic Settings
    ##

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 20;
    types_hash_max_size 2048;
    server_tokens off;
    autoindex off;
    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ##
    # SSL Settings
    ##

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    ##
    # Logging Settings
    ##

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;


    ##
    # Gzip Settings
    ##

    gzip on;
    gzip_min_length    300;
    gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    gzip_buffers 8 32k;
    # gzip_http_version 1.1;
    gzip_types text/plain text/css application/x-javascript text/xml application/xml text/javascript application/json;

    proxy_busy_buffers_size   512k;
    proxy_buffers   4 512k;
    proxy_buffer_size   256k;

    # Load configuration files
    include /etc/nginx/conf.d/*.conf;
}

```

```bash
upstream base {
   ip_hash;
   server 10.9.161.118:8001; 
}

upstream template_container {
   ip_hash;
   server 10.9.161.118:8007; 
}

upstream template {
   ip_hash;
   server 10.9.161.118:8006; 
}

upstream ratan_container {
   ip_hash;
   server 10.9.161.118:8009; 
}

upstream ratan_trade {
   ip_hash;
   server 10.9.161.118:8010; 
}

upstream ratan_cashflow {
   ip_hash;
   server 10.9.161.118:8008; 
}

upstream bff_auth {
   ip_hash;
   server 10.198.199.160:9999; 
}

upstream bff {
   ip_hash;
   server 10.198.199.160:8453; 
}

upstream ratan {
   ip_hash;
   server 10.198.199.160:8453; 
}

upstream stmcn {
   ip_hash;
   server 10.198.199.160:8453; 
}

server {
   listen             8000;
   server_name        localhost;  

   location /base/ {
      rewrite ^/base/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://base;
   }

   location /template_container/ {
      rewrite ^/template_container/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://template_container;
   }

   location /template/ {
      rewrite ^/template/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://template;
   }

   location /ratan_container/ {
      rewrite ^/ratan_container/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://ratan_container;
   }
   
   location /ratan_trade/ {
      rewrite ^/ratan_trade/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://ratan_trade;
   }

   location /ratan_cashflow/ {
      rewrite ^/ratan_cashflow/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://ratan_cashflow;
   }

   location /health {
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://base/health;
   }

   location /api/ {
      rewrite ^/api/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://bff_auth;
   }

   location /socket {      
      proxy_pass http://bff;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }

   location /bff {      
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://bff;
    }

   location /ratan/ {
      rewrite ^/ratan/(.*)$ /$1 break;
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://ratan;
    }

   location /stmcn {
      proxy_redirect    off;
      proxy_set_header  Host $host;
      proxy_set_header  X-Real-IP $remote_addr;
      proxy_set_header  X-Forwarded-Proto http;
      proxy_set_header  X-Forwarded-For $remote_addr;
      proxy_set_header  X-Forwarded-Host $remote_addr;
      proxy_pass http://stmcn;
    }

   location / {
      root /apps/ratanrt/mfe/dist;
      index index.html index.htm;
      try_files $uri $uri/ /index.html?$args;
      index index.html;
      proxy_hide_header X-Powered-By;
      proxy_pass_header Server;
   }

}


```

### importmap.json

```js
{
  "imports": {
    "single-spa": "/js/external/single-spa.min.js",
    "react": "/js/external/react.production.min.js",
    "react-dom": "/js/external/react-dom.production.min.js",
    "@fm/root-config": "/config.js",
    "@fm/base": "/base/base.js",
    "@fm/template_container": "/template_container/template_container.js",
    "@fm/template": "/template/template.js",
    "@fm/ratan_container": "/ratan_container/ratan_container.js",
    "@fm/ratancashflow": "/ratan_cashflow/ratancashflow.js",
    "@fm/ratantrades": "/ratan_trade/ratantrades.js"
  }
}


```

## Other Repositories are using NodeJS

### Jenkins File

```groovy
#!groovy

node("docker && aws") {
  try {
    echo "start"
    def buildNum = env.BUILD_NUMBER
    echo "buildNum is ${buildNum}"
    def nodeHome = installTool "node-v16.14.0-linux-x64-golden-version"
    echo "nodeHome is ${nodeHome}"
    def imageNamespace = "ratan"
    def groupPath="com/scb/ratan-gui"

    def scmVars
    def serverTag
    def imgBuild

    withEnv(["NODE_HOME=${nodeHome}","PATH+NODE=${nodeHome}/bin"]) {
      stage("Checkout") {
        cleanWs();
        scmVars = checkout scm
        notifyStash();
      }

      def branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
      echo "branchName is ${branchName}"
      if (branchName != "main") {        
        def props = readJSON file: 'package.json'
        def projectName = props.name.replace("@fm/", "")
        def projectVersion = props.version +"."+ buildNum
        def moduleVersion = projectVersion +".DEV"
        if (branchName == "trunk") {
          moduleVersion = projectVersion +".TRUNK"
        }
        if (branchName == "prod") {
          moduleVersion = projectVersion +".RELEASE"
        }
        echo "projectName is ${projectName}"
        echo "projectVersion is ${projectVersion}"
        echo "moduleVersion is ${moduleVersion}"

        def mfeProjectName = "${projectName}-mfe"
        
        
        installNpx()
        stage("Build & Test") {
          sh '''
            node --version
            npm --version
            npm config set registry https://artifactory.global.standardchartered.com/artifactory/api/npm/npm-release
            npm config set always-auth false
            npm install
            npm test
            npm run build
            pwd
            ls dist
          '''
        }
        stage("Scan") {
          echo "run sonarqube scan here"
          if (branchName == "trunk" || branchName == "prod") {
            echo "run 3rd party library scan here"
          }
        }
        if (branchName == "trunk" || branchName == "prod" || branchName == "feature/pipeline") {
          stage("Publish") {
            zip zipFile: "${branchName}-${mfeProjectName}-${moduleVersion}.zip", dir:"dist/"
            uploadToArtifactory {
                pattern = "${branchName}-${mfeProjectName}-${moduleVersion}.zip"
                target = "generic-release/${groupPath}/${projectName}/"
            }
            sh '''
              rm -Rf node_modules
              rm -Rf coverage
            '''
            artifactoryDockerRegistry {
                serverTag = "${imageNamespace}/${mfeProjectName}:${moduleVersion}"
                imgBuild = docker.build(serverTag,"--build-arg BUILD_DIR=docker-${mfeProjectName} -f Dockerfile .")
                imgBuild.push()
            }
          }
        }
      }
    }
    
    
    currentBuild.result = 'SUCCESS'
  } catch(exc) {
    exc.printStackTrace()
    currentBuild.result = 'FAILURE'
  } finally {
    notifyStash()
  }
}

def installNpx() {
    try {
      stage('Npx Install') {
        sh '''
          node --version
          npm --version
          npm config set registry https://artifactory.global.standardchartered.com/artifactory/api/npm/npm-release
          npm config set always-auth false
          npm install -g npx
        '''
      }
    } catch(exc) {
    } finally {
    }
}
```

### Docker File

```yml
# pull official base image
FROM artifactory.global.standardchartered.com/container-store/ubi8/nodejs-14:1-43

# set working directory
WORKDIR /apps/mfe

ARG EXEC_FILE=dist

USER root
RUN chgrp -R 0 /apps/mfe && \
    chmod -R g=u /apps/mfe

RUN pwd
RUN ls

COPY ${EXEC_FILE} /apps/mfe/dist

# install app dependencies
COPY server/package.json /apps/mfe
COPY server/package-lock.json /apps/mfe
COPY .env.server /apps/mfe/dist/.env
RUN ls /apps/mfe
RUN ls /apps/mfe/dist
RUN npm config set registry https://artifactory.global.standardchartered.com/artifactory/api/npm/npm-release
RUN npm config set always-auth false
RUN npm install -g npx
RUN npm install
RUN ls /apps/mfe/node_modules/.bin/

# add `/apps/mfe/node_modules/.bin` to $PATH
ENV PATH /apps/mfe/node_modules/.bin:$PATH

USER 10001
ENTRYPOINT ["node","/apps/mfe/dist/index.js"]
```

### NodeJS Server

![image2023-1-16_10-16-30.png](attachments/image2023-1-16_10-16-30.png)

## Docker Image

![image2023-1-16_9-51-33.png](attachments/image2023-1-16_9-51-33.png)

## Docker Container

![image2023-1-16_9-52-40.png](attachments/image2023-1-16_9-52-40.png)

## Bitbucket configuration to enable webhooks

Click on **Hooks **> **Webhooks to Jenkins for Bitbucket Server**

![image2023-1-17_18-24-38.png](attachments/image2023-1-17_18-24-38.png)

Jenkins URL: [https://jenkins.global.standardchartered.com](https://jenkins.global.standardchartered.com)

![image2023-1-17_18-26-25.png](attachments/image2023-1-17_18-26-25.png)

URL Parameters:

JOB_BRANCH_NAME=${BRANCH}
FORCE_REGENERATE=false

![image2023-1-19_14-26-54.png](attachments/image2023-1-19_14-26-54.png)

Any git commit to feature/* or bugfix/* it will trigger Monitor and Generator Job

![image2023-1-17_18-38-31.png](attachments/image2023-1-17_18-38-31.png)  ![image2023-1-17_18-39-8.png](attachments/image2023-1-17_18-39-8.png)

In the console output, you can see there is 1 webhooks triggered ([https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_root_config/job/mfe_root_config-generator/106/console](https://jenkins.global.standardchartered.com/job/RATANRT/job/mfe_root_config/job/mfe_root_config-generator/106/console))

![image2023-1-17_18-40-25.png](attachments/image2023-1-17_18-40-25.png)

This Job is triggered by the webhooks:

![image2023-1-17_18-42-21.png](attachments/image2023-1-17_18-42-21.png)

## Bitbucket configuration for Merge Check

Click on **Merge checks** > **Minimum successful builds**

![image2023-1-17_18-29-54.png](attachments/image2023-1-17_18-29-54.png)

Number of builds: 1

![image2023-1-17_18-31-52.png](attachments/image2023-1-17_18-31-52.png)

## Branch Permission

![image2023-1-20_9-55-0.png](attachments/image2023-1-20_9-55-0.png)
