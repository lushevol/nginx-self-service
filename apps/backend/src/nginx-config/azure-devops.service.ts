import { Injectable } from '@nestjs/common';
import * as azdev from 'azure-devops-node-api';
import { IGitApi } from 'azure-devops-node-api/GitApi';
import {
  GitPullRequest,
  GitRefUpdate,
} from 'azure-devops-node-api/interfaces/GitInterfaces';

@Injectable()
export class AzureDevOpsService {
  private connection: azdev.WebApi;
  private gitApi: IGitApi | undefined;

  constructor() {
    const orgUrl = process.env.ADO_ORG_URL || 'https://dev.azure.com/myorg';
    const token = process.env.ADO_PAT || '';
    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    this.connection = new azdev.WebApi(orgUrl, authHandler);
  }

  private async getGitApi(): Promise<IGitApi> {
    if (!this.gitApi) {
      this.gitApi = await this.connection.getGitApi();
    }
    return this.gitApi;
  }

  async getConfigs(env: string, team: string): Promise<string> {
    // In real impl, we would use this.gitApi.getItem(repo, path...)
    return `# Config for ${team} in ${env}\nlocation /api/${team}/demo {\n    proxy_pass http://${team}_backend;\n}\nupstream ${team}_backend {\n    server 127.0.0.1:3000;\n}`;
  }

  async createPR(env: string, team: string, content: string): Promise<string> {
    const git = await this.getGitApi();
    const repoId = process.env.ADO_REPO_ID || 'nginx-repo';
    const timestamp = Date.now();
    const branchName = `refs/heads/feature/config-update-${team}-${timestamp}`;

    // 1. Create Branch (simplification)
    // await git.updateRefs([...], repoId);

    // 2. Commit Changes
    // await git.createPush(...)

    // 3. Create PR
    const pr: GitPullRequest = {
      sourceRefName: branchName,
      targetRefName: `refs/heads/${env}`,
      title: `Config Update for ${team}`,
      description: `Automated config update via Self-Service Portal`,
    };

    // const createdPr = await git.createPullRequest(pr, repoId);
    // return createdPr.pullRequestId?.toString() || '0';

    return '12345';
  }
}
