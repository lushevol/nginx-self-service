import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NginxConfigService } from './nginx-config.service';

export class ConfigDto {
  content: string;
}

@Controller('api/nginx/:team')
export class NginxConfigController {
  constructor(private readonly configService: NginxConfigService) {}

  @Post('validate')
  async validate(@Param('team') team: string, @Body() body: ConfigDto) {
    return this.configService.validateConfig(team, body.content);
  }

  @Post('submit/:env')
  async submit(
    @Param('team') team: string,
    @Param('env') env: string,
    @Body() body: ConfigDto,
  ) {
    return this.configService.createPullRequest(team, env, body.content);
  }

  @Get(':env')
  async getConfig(@Param('team') team: string, @Param('env') env: string) {
    return this.configService.getConfig(team, env);
  }
}
