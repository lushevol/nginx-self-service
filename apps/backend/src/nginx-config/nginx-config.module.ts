import { Module } from '@nestjs/common';
import { NginxParserService } from './nginx-parser.service';
import { AzureDevOpsService } from './azure-devops.service';
import { NginxConfigService } from './nginx-config.service';
import { NginxConfigController } from './nginx-config.controller';
import { BackgroundWorkerService } from '../change-request/background-worker.service';

import { PolicyValidator } from './validators/policy.validator';
import { ScopeValidator } from './validators/scope.validator';
import { SyntaxValidator } from './validators/syntax.validator';

import { ChangeRequestModule } from '../change-request/change-request.module';

@Module({
  imports: [ChangeRequestModule],
  controllers: [NginxConfigController],
  providers: [
    NginxParserService,
    AzureDevOpsService,
    AzureDevOpsService,
    NginxConfigService,
    BackgroundWorkerService,
    PolicyValidator,
    ScopeValidator,
    SyntaxValidator,
  ],
  exports: [NginxParserService, AzureDevOpsService, NginxConfigService],
})
export class NginxConfigModule {}
