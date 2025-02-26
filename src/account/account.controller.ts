import { Controller, Get, Param } from '@nestjs/common';
import { GrpcClientService } from '../grpc/grpc.client';

@Controller('grpc/account')
export class AccountController {
  constructor(private readonly grpcClientService: GrpcClientService) {}

  @Get(':id')
  async getAccountClient(@Param('id') id: string) {
    const result = await this.grpcClientService.getAccount(id);
    return result;
  }
} 
