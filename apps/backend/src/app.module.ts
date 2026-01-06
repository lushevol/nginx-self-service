import { Module } from '@nestjs/common';
import { NginxConfigModule } from './nginx-config/nginx-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NginxConfigModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
