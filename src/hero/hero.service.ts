import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { HeroesService } from "./interfaces/hero-service.interface";

@Injectable()
export class HeroesClientService implements OnModuleInit {
    constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}
    private heroesService: HeroesService;

    onModuleInit() {
        this.heroesService = this.client.getService<HeroesService>('HeroesService');
    }

    async findOne(id: string) {
        const result = await this.heroesService.findOne({ id: +id }).toPromise();
        
        return result;
    }
}