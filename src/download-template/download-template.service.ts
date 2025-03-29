import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as path from 'path';

@Injectable()
export class DownloadTemplateService {
    async generateTemplate(): Promise<string> {
        // Đường dẫn template mẫu
        const templatePath = path.resolve('./src/templates/download-template.xlsx');
        const outputPath = path.resolve('./src/templates/template-filled.xlsx');
    
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(templatePath);
    
        const worksheet = workbook.getWorksheet(1);

        const units = [
            {_id: '1', name: 'Course Resource'}
        ]
        const chapters =  [
            {_id: '5', name: 'Chapter 1', parent_id: '1'},
            {_id: '2', name: 'Chapter 2', parent_id: '1'},
            {_id: '3', name: 'Chapter 3', parent_id: '1'},
            {_id: '4', name: 'Chapter 4', parent_id: '1'},
        ]

        const lessons = [
            {_id: '6', name: 'Lesson 1', parent_id: '5'},
            {_id: '7', name: 'Lesson 2', parent_id: '5'},
            {_id: '8', name: 'Lesson 3', parent_id: '2'},
            {_id: '9', name: 'Lesson 4', parent_id: '2'},
            {_id: '10', name: 'Lesson 5', parent_id: '3'},
            {_id: '11', name: 'Lesson 6', parent_id: '3'},
            {_id: '12', name: 'Lesson 7', parent_id: '4'},
            {_id: '13', name: 'Lesson 8', parent_id: '4'},
            {_id: '14', name: 'Lesson 9', parent_id: '4'},
        ]

        const combinedData = lessons.map((lesson) => {
            const chapter = chapters.find((ch) => ch._id === lesson.parent_id);
            const unit = units.find((un) => un._id === chapter?.parent_id);
        
            return {
              unitName: unit?.name || '',
              chapterName: chapter?.name || '',
              lessonName: lesson.name,
            };
          });
    
        const data = [
          { productCode: 'P001', productName: 'Physics Book', productType: 'Book' },
          { productCode: 'P002', productName: 'Math Kit', productType: 'Kit' },
        ];
    
        data.forEach((item, index) => {
          const row = worksheet.getRow(index + 2);
          row.getCell(1).value = item.productCode;
          row.getCell(2).value = item.productName;
          row.getCell(3).value = item.productType;
          row.commit();
        });
    
        await workbook.xlsx.writeFile(outputPath);
        return outputPath;
      }
}
