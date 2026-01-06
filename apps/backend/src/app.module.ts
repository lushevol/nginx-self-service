import { Module } from '@nestjs/common';
import { NginxConfigModule } from './nginx-config/nginx-config.module';

@Module({
  imports: [NginxConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
