import { Injectable, BadRequestException } from '@nestjs/common';
import { NginxParserService } from './nginx-parser.service';
import { AzureDevOpsService } from './azure-devops.service';
import { ChangeRequestService } from '../change-request/change-request.service';
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
    private readonly changeRequestService: ChangeRequestService,
  ) {}

  async validateSplitConfig(
    team: string,
    upstreams: string,
    locations: string,
  ) {
    const combined = `${upstreams}\n${locations}`;
    return this.validateConfig(team, combined);
  }

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

  async submitConfig(
    team: string,
    env: string,
    upstreams: string,
    locations: string,
  ) {
    // 1. Validate
    await this.validateSplitConfig(team, upstreams, locations);

    // 2. Save pending request
    const id = await this.changeRequestService.create(
      team,
      env,
      upstreams,
      locations,
    );

    return {
      changeId: id,
      status: 'PENDING',
      message: 'Configuration submitted for processing',
    };
  }

  // Legacy method kept for reference or direct usage if needed
  async createPullRequest(
    team: string,
    env: string,
    upstreams: string,
    locations: string,
  ) {
    // Re-validate to be safe
    await this.validateSplitConfig(team, upstreams, locations);

    // Submit to ADO
    const prId = await this.adoService.createPR(
      env,
      team,
      upstreams,
      locations,
    );
    return {
      prUrl: `${process.env.ADO_ORG_URL}/${process.env.ADO_REPO_ID}/_git/repo/pullrequest/${prId}`,
    };
  }

  async getConfig(
    team: string,
    env: string,
  ): Promise<{ upstreams: string; locations: string }> {
    return this.adoService.getConfigs(env, team);
  }

  async getPendingRequests(team: string) {
    return this.changeRequestService.findAllByTeam(team);
  }

  async deleteRequest(id: string) {
    await this.changeRequestService.delete(id);
  }
}
