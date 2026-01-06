import { Module } from '@nestjs/common';
import { NginxConfigModule } from './nginx-config/nginx-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NginxConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
