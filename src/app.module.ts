import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { DownloadTemplateController } from './download-template/download-template.controller';
import { DownloadTemplateService } from './download-template/download-template.service';
import { DownloadTemplateModule } from './download-template/download-template.module';

@Module({
  imports: [HeroModule, DownloadTemplateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
