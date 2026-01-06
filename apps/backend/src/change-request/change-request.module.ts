import { Module } from '@nestjs/common';
import { ChangeRequestService } from './change-request.service';

@Module({
  providers: [ChangeRequestService],
  exports: [ChangeRequestService],
})
export class ChangeRequestModule {}
