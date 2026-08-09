# **Problem Statement**

In our usual Nginx configuration process, when we receive updates from tenants, we often cannot trace who made the changes or when. Furthermore, after manually configuring Nginx, unexpected errors inevitably occur during testing Nginx syntax or starting Nginx. These errors can disrupt other's use of the development environment. Manually correcting errors or rolling back Nginx configurations is extremely difficult. Therefore, we decided to build a version control process for updating Nginx configurations in the development environment.

# **Solution Design**

## **Organize Configuration**

Organize all MFE-related configurations in Nginx into a single folder and initialize the Git repository.

## **Create a new repository**

Please have your operations team create a new nginx configuration repository and grant them the necessary permissions.

## ** ****Update configuration**

- Receive emails from tenants regarding nginx configuration updates.
- Create a new git branch
- Update nginx configuration
- Commit a git commit
- Merge the code into the main branch and submit a pull request (pr).

## **Communicate with DevOps about the feasibility of writing and executing the** **pipeline script.**

## **Write the pipeline script and its execution logic.**

- Pull the nginx configuration update from the specified git version to the specified folder.
- Execute `nginx_ctl.sh configtest` to check for syntax errors.
- If there are syntax errors, roll back to the specified git version of the nginx configuration before the update and execute `nginx_ctl.sh start`.
- If there are no errors, execute `nginx_ctl.sh restart`.
- If an error occurs during restart, similarly, roll back to the specified git version of the nginx configuration before the update and execute `nginx_ctl.sh start`.
- If no errors occur, the nginx configuration update was successful.

## **Testing the effectiveness of nginx automatic deployment**
