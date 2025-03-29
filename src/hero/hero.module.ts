import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { HeroController } from './hero.controller';
import { grpcClientOptions } from './grpc-client.options';
import { HeroesClientService } from './hero.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [HeroesClientService],
  controllers: [HeroController],
})
export class HeroModule {}