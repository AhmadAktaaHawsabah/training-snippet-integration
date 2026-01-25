import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

interface TemplateData {
  [key: string]: string | number;
}
export function renderTemplate(templateName: string, data: TemplateData): string {
  const filePath = path.join(
    process.cwd(),
    'src/views/templates',
    `${templateName}.hbs`,
  );
  const source = fs.readFileSync(filePath, 'utf-8');
  const template = Handlebars.compile(source);
  return template(data);
}
