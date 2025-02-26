import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { GrpcClientService } from 'src/grpc/grpc.client';

@Module({
  providers: [AccountService, GrpcClientService],
  controllers: [AccountController],
})
export class AccountModule {}
