import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

interface TemplateData {
  [key: string]: string | number;
}
@Injectable()
export class TemplateService {
  render(templateName: string, data: TemplateData): string {
    const filePath = path.join(process.cwd(),'src/views/templates',`${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = Handlebars.compile(source);
    return template(data);
  }
}

4;
