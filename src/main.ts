import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  // 🔹 Khởi động HTTP Server (REST API)
  const app = await NestFactory.create(AppModule);
  await app.listen(6002);
  console.log('🚀 HTTP Server is running on port 6002 ...');

  // 🔹 Khởi động gRPC Server
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'another',
      protoPath: path.join(__dirname, '../protos/product/product.proto'),
      url: '0.0.0.0:5002',
    },
  });

  console.log('🚀 gRPC Server is running on port 5002...');
  await grpcApp.listen();
}

bootstrap();
