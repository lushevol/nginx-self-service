import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { NginxConfigService } from './nginx-config.service';
import { ConfigDto } from './dto/config.dto';

@Controller('api/nginx/:team')
export class NginxConfigController {
  constructor(private readonly configService: NginxConfigService) {}

  @Post('validate')
  async validate(@Param('team') team: string, @Body() body: ConfigDto) {
    return this.configService.validateSplitConfig(
      team,
      body.upstreams,
      body.locations,
    );
  }

  @Post('submit/:env')
  async submit(
    @Param('team') team: string,
    @Param('env') env: string,
    @Body() body: ConfigDto,
  ) {
    return this.configService.submitConfig(
      team,
      env,
      body.upstreams,
      body.locations,
    );
  }

  @Get('pending')
  async getPending(@Param('team') team: string) {
    return this.configService.getPendingRequests(team);
  }

  @Delete('pending/:id')
  async deletePend(@Param('id') id: string) {
    return this.configService.deleteRequest(id);
  }

  @Get(':env')
  async getConfig(@Param('team') team: string, @Param('env') env: string) {
    return this.configService.getConfig(team, env);
  }
}
