import { Module } from '@nestjs/common';
import { NginxConfigModule } from './nginx-config/nginx-config.module';
import { ConfigModule } from '@nestjs/config';

import { ChangeRequestModule } from './change-request/change-request.module';

@Module({
  imports: [NginxConfigModule, ChangeRequestModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
