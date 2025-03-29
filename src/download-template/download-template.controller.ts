import { DownloadTemplateService } from './download-template.service';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('template')
export class DownloadTemplateController {
  constructor(private readonly templateService: DownloadTemplateService) {}

  @Get('download')
  async downloadTemplate(@Res() res: Response) {
    const filePath = await this.templateService.generateTemplate();
    res.download(filePath, 'template-filled.xlsx');
  }
}
