import { Module } from '@nestjs/common';
import { GrpcClientService } from './grpc/grpc.client';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AccountModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
