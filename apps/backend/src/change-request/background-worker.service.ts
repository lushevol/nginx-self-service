import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChangeRequestService } from './change-request.service';
import { AzureDevOpsService } from '../nginx-config/azure-devops.service';
import { NginxConfigService } from '../nginx-config/nginx-config.service';
import { RequestStatus } from './dto/request-status.enum';

const POLL_INTERVAL_MS = 10000;

@Injectable()
export class BackgroundWorkerService implements OnModuleInit {
  private readonly logger = new Logger(BackgroundWorkerService.name);
  private isRunning = false;

  constructor(
    private readonly changeRequestService: ChangeRequestService,
    private readonly adoService: AzureDevOpsService,
    private readonly configService: NginxConfigService,
  ) {}

  onModuleInit() {
    // Poll every 10 seconds
    setInterval(() => {
      void this.processQueue();
    }, POLL_INTERVAL_MS);
    this.logger.log('Background worker started');
  }

  async processQueue() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      const pending = await this.changeRequestService.findPending();
      if (pending.length === 0) {
        this.isRunning = false;
        return;
      }

      this.logger.log(`Found ${pending.length} pending change requests`);

      // Connectivity Loop Test
      const connected = await this.adoService.checkHealth();
      if (!connected) {
        this.logger.warn(
          'ADO Connectivity Loop: Offline. Skipping processing.',
        );
        this.isRunning = false;
        return;
      }

      for (const req of pending) {
        await this.processChangeRequest(req);
      }
    } catch (e) {
      this.logger.error('Error in background worker', e);
    } finally {
      this.isRunning = false;
    }
  }

  private async processChangeRequest(req: any) {
    try {
      // Re-use createPullRequest from NginxConfigService (or AdoService directly)
      // Since NginxConfigService calls validate + createPR, and we already validated on entry,
      // we can skip validation here or safe to do it again.
      const result = await this.configService.createPullRequest(
        req.team,
        req.environment,
        req.upstreamsConfig,
        req.locationsConfig,
      );

      const prIdMatch = result.prUrl.match(/pullrequest\/(\d+)/);
      const prId = prIdMatch ? prIdMatch[1] : 'unknown';

      await this.changeRequestService.updateStatus(
        req.id,
        RequestStatus.SUBMITTED,
        prId,
      );
      this.logger.log(`Submitted request ${req.id} as PR ${prId}`);
    } catch (e) {
      this.logger.error(`Failed to submit request ${req.id}: ${e}`);
    }
  }
}
