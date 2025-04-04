import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';
import { HeroesClientService } from './hero.service';

@Controller('hero')
export class HeroController  {

  constructor(private readonly heroesClientService: HeroesClientService) {}

  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  // @Get()
  // getMany(): Observable<Hero[]> {
  //   const ids$ = new ReplaySubject<HeroById>();
  //   ids$.next({ id: 1 });
  //   ids$.next({ id: 2 });
  //   ids$.complete();

  //   const stream = this.heroesService.findMany(ids$.asObservable());
  //   return stream.pipe(toArray());
  // }

  @Get(':id')
  getById(@Param('id') id: string){    
    return this.heroesClientService.findOne(id);
  }

  @GrpcMethod('HeroesService')
  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('HeroesService')
  findMany(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}