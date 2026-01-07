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
import { PathUtil } from './utils/path.util';

@Injectable()
export class AzureDevOpsService {
  private connection: WebApi;
  private gitApi: IGitApi | undefined;

  private readonly logger = new Logger(AzureDevOpsService.name, {
    timestamp: true,
  });

  constructor() {
    const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
    const token = process.env.ADO_PAT ?? '';
    const authHandler = getPersonalAccessTokenHandler(token);
    this.connection = new WebApi(orgUrl, authHandler, {
      ignoreSslError: true,
      ...(process.env.PROXY_URL
        ? { proxy: { proxyUrl: process.env.PROXY_URL } }
        : {}),
    });
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
    } catch (_e) {
      return false;
    }
  }

  async getConfigs(
    env: string,
    team: string,
  ): Promise<{ upstreams: string; locations: string }> {
    const repoName = process.env.ADO_REPO ?? 'nginx-repo';
    const versionDescriptor = {
      version: 'main',
      versionType: 0,
      versionOption: 0,
    };

    const getFileContent = async (path: string): Promise<string> => {
      try {
        const git = await this.getGitApi();
        const item = await git.getItemContent(
          repoName,
          path,
          process.env.ADO_PROJECT,
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
        // Warning log but return empty string so we don't crash
        const errorMessage = e instanceof Error ? e.message : String(e);
        this.logger.warn(`Config not found at ${path}: ${errorMessage}`);
        return '';
      }
    };

    const [upstreams, locations] = await Promise.all([
      getFileContent(PathUtil.getUpstreamPath(env, team)),
      getFileContent(PathUtil.getProxyPath(env, team)),
    ]);

    return { upstreams, locations };
  }

  async createPR(
    env: string,
    team: string,
    upstreams: string,
    locations: string,
  ): Promise<string> {
    const git = await this.getGitApi();
    const repoName = process.env.ADO_REPO ?? '';
    const timestamp = Date.now();
    const branchName = `refs/heads/feature/config-update-${team}-${timestamp}`;
    const targetRefName = `refs/heads/main`;

    // 1. Get Base Commit & Current Content for Diff
    const refs = await git.getRefs(
      repoName,
      process.env.ADO_PROJECT,
      targetRefName.replace('refs/', ''),
    );
    if (!refs || refs.length === 0) {
      throw new Error(`Target branch ${targetRefName} not found`);
    }
    const baseCommit = refs[0].objectId;

    // Fetch current content to compare
    const { upstreams: curUpstreams, locations: curLocations } =
      await this.getConfigs(env, team);

    const upstreamsChanged = curUpstreams !== upstreams;
    const locationsChanged = curLocations !== locations;

    if (!upstreamsChanged && !locationsChanged) {
      throw new Error('No changes detected');
    }

    const changes: any[] = [];
    if (upstreamsChanged) {
      changes.push({
        changeType: VersionControlChangeType.Edit,
        item: {
          path: PathUtil.getUpstreamPath(env, team),
        },
        newContent: {
          content: upstreams,
          contentType: ItemContentType.RawText,
        },
      });
    }

    if (locationsChanged) {
      changes.push({
        changeType: VersionControlChangeType.Edit,
        item: {
          path: PathUtil.getProxyPath(env, team),
        },
        newContent: {
          content: locations,
          contentType: ItemContentType.RawText,
        },
      });
    }

    // 2. Create Branch
    const refUpdate: GitRefUpdate = {
      name: branchName,
      oldObjectId: '0000000000000000000000000000000000000000',
      newObjectId: baseCommit,
    };

    try {
      await git.updateRefs([refUpdate], repoName, process.env.ADO_PROJECT);
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
          changes: changes,
        },
      ],
    };

    try {
      await git.createPush(push, repoName, process.env.ADO_PROJECT);
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
        repoName,
        process.env.ADO_PROJECT,
      );
      return createdPr.pullRequestId?.toString() || '0';
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create PR: ${errorMessage}`);
    }
  }
}
