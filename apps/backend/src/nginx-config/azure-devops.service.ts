import { Injectable, Logger } from '@nestjs/common';
import { getPersonalAccessTokenHandler, WebApi } from 'azure-devops-node-api';
import type { IGitApi } from 'azure-devops-node-api/GitApi';
import {
  type GitPullRequest,
  type GitRefUpdate,
  type GitPush,
  VersionControlChangeType,
  ItemContentType,
} from 'azure-devops-node-api/interfaces/GitInterfaces';

@Injectable()
export class AzureDevOpsService {
  private connection: WebApi;
  private gitApi: IGitApi | undefined;

  private readonly logger = new Logger(AzureDevOpsService.name, {
    timestamp: true,
  });

  constructor() {
    const orgUrl = process.env.ADO_ORG_URL || 'https://dev.azure.com/myorg';
    const token = process.env.ADO_PAT || '';
    const authHandler = getPersonalAccessTokenHandler(token);
    this.connection = new WebApi(orgUrl, authHandler, { ignoreSslError: true });
  }

  private async getGitApi(): Promise<IGitApi> {
    if (!this.gitApi) {
      try {
        await this.connection.connect();
        this.gitApi = await this.connection.getGitApi();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed to connect to Azure DevOps: ${errorMessage}`);
        throw error;
      }
    }
    return this.gitApi;
  }

  async checkHealth(): Promise<boolean> {
    try {
      await this.getGitApi();
      return true;
    } catch (e) {
      return false;
    }
  }

  async getConfigs(env: string, team: string): Promise<string> {
    const repoId = process.env.ADO_REPO_ID || 'nginx-repo';
    const versionDescriptor = {
      version: 'main',
      versionType: 0,
      versionOption: 0,
    };

    try {
      const git = await this.getGitApi();
      const item = await git.getItemContent(
        repoId,
        `nginx/${env}/${team}/nginx.conf`,
        '13ab4c56-8a75-401e-8356-c95092b24e76',
        undefined,
        0,
        true, // includeContent
        true,
        false,
        versionDescriptor,
      );

      const chunks: Buffer[] = [];
      for await (const chunk of item) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return Buffer.concat(chunks).toString('utf-8');
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      this.logger.warn(
        `Config not found for ${team} in ${env} (branch: ${env}): ${errorMessage}`,
      );
      // Fallback to default template if not found
      return '';
    }
  }

  async createPR(env: string, team: string, content: string): Promise<string> {
    const git = await this.getGitApi();
    const repoId = process.env.ADO_REPO_ID || 'nginx-repo';
    const timestamp = Date.now();
    const branchName = `refs/heads/feature/config-update-${team}-${timestamp}`;
    const targetRefName = `refs/heads/main`;

    // 1. Get Base Commit
    const refs = await git.getRefs(
      repoId,
      '13ab4c56-8a75-401e-8356-c95092b24e76',
      targetRefName.replace('refs/', ''),
    );
    if (!refs || refs.length === 0) {
      throw new Error(`Target branch ${targetRefName} not found`);
    }
    const baseCommit = refs[0].objectId;

    // 2. Create Branch
    const refUpdate: GitRefUpdate = {
      name: branchName,
      oldObjectId: '0000000000000000000000000000000000000000',
      newObjectId: baseCommit,
    };

    try {
      await git.updateRefs(
        [refUpdate],
        repoId,
        '13ab4c56-8a75-401e-8356-c95092b24e76',
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Failed to create branch ${branchName}: ${errorMessage}`,
      );
      throw new Error(`Failed to create branch ${branchName}: ${errorMessage}`);
    }

    // 3. Commit Changes
    const push: GitPush = {
      refUpdates: [
        {
          name: branchName,
          oldObjectId: baseCommit,
        },
      ],
      commits: [
        {
          comment: `Update config for ${team}`,
          changes: [
            {
              changeType: VersionControlChangeType.Edit,
              item: {
                path: `nginx/${env}/${team}/nginx.conf`,
              },
              newContent: {
                content: content,
                contentType: ItemContentType.RawText,
              },
            },
          ],
        },
      ],
    };

    try {
      await git.createPush(
        push,
        repoId,
        '13ab4c56-8a75-401e-8356-c95092b24e76',
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to push changes to ${branchName}: ${errorMessage}`,
      );
    }

    // 4. Create PR
    const pr: GitPullRequest = {
      sourceRefName: branchName,
      targetRefName: targetRefName,
      title: `Config Update for ${team}`,
      description: `Automated config update via Self-Service Portal`,
    };

    try {
      const createdPr = await git.createPullRequest(
        pr,
        repoId,
        '13ab4c56-8a75-401e-8356-c95092b24e76',
      );
      return createdPr.pullRequestId?.toString() || '0';
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create PR: ${errorMessage}`);
    }
  }
}
