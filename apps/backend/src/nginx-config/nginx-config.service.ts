import { Injectable, BadRequestException } from '@nestjs/common';
import { NginxParserService } from './nginx-parser.service';
import { AzureDevOpsService } from './azure-devops.service';
import { PolicyValidator } from './validators/policy.validator';
import { ScopeValidator } from './validators/scope.validator';
import { SyntaxValidator } from './validators/syntax.validator';

@Injectable()
export class NginxConfigService {
  constructor(
    private readonly parser: NginxParserService,
    private readonly adoService: AzureDevOpsService,
    private readonly policyValidator: PolicyValidator,
    private readonly scopeValidator: ScopeValidator,
    private readonly syntaxValidator: SyntaxValidator,
  ) {}

  async validateConfig(team: string, content: string) {
    // 1. Syntax Check
    const syntaxError = await this.syntaxValidator.validate(content);
    if (syntaxError) {
      throw new BadRequestException(syntaxError);
    }

    // 2. Parse Blocks
    const locations = this.parser.parseLocations(content);
    // const upstreams = this.parser.parseUpstreams(content);

    // 3. Policy & Scope Check
    const policyErrors = this.policyValidator.validate(locations);
    const scopeErrors = this.scopeValidator.validate(team, locations);

    const allErrors = [...policyErrors, ...scopeErrors];
    if (allErrors.length > 0) {
      throw new BadRequestException({ messages: allErrors });
    }

    return { valid: true, parsed: { locations } };
  }

  async createPullRequest(team: string, env: string, content: string) {
    // Re-validate to be safe
    await this.validateConfig(team, content);

    // Submit to ADO
    const prId = await this.adoService.createPR(env, team, content);
    return {
      prUrl: `https://dev.azure.com/org/project/_git/repo/pullrequest/${prId}`,
    };
  }

  async getConfig(team: string, env: string): Promise<{ content: string }> {
    const content = await this.adoService.getConfigs(env, team);
    return { content };
  }
}
