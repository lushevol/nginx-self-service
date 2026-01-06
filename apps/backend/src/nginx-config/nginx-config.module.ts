import { Module } from '@nestjs/common';
import { NginxParserService } from './nginx-parser.service';
import { AzureDevOpsService } from './azure-devops.service';
import { NginxConfigService } from './nginx-config.service';
import { NginxConfigController } from './nginx-config.controller';

import { PolicyValidator } from './validators/policy.validator';
import { ScopeValidator } from './validators/scope.validator';
import { SyntaxValidator } from './validators/syntax.validator';

@Module({
  controllers: [NginxConfigController],
  providers: [
    NginxParserService,
    AzureDevOpsService,
    NginxConfigService,
    PolicyValidator,
    ScopeValidator,
    SyntaxValidator,
  ],
  exports: [NginxParserService, AzureDevOpsService, NginxConfigService],
})
export class NginxConfigModule {}
