import { DownloadTemplateController } from './download-template.controller';
import { DownloadTemplateService } from './download-template.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [DownloadTemplateController],
    providers: [DownloadTemplateService],
})
export class DownloadTemplateModule {}
