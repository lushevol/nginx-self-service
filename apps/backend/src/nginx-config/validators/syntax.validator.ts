import { Injectable } from '@nestjs/common';
import { NginxConfFile } from 'nginx-conf';

@Injectable()
export class SyntaxValidator {
  async validate(configContent: string): Promise<string | null> {
    // Structural check for braces (nginx-conf is too lenient)
    const openBraces = (configContent.match(/{/g) || []).length;
    const closeBraces = (configContent.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      return `Syntax Error: Mismatched braces (opened: ${openBraces}, closed: ${closeBraces})`;
    }

    return new Promise((resolve) => {
      NginxConfFile.createFromSource(configContent, (err: unknown) => {
        if (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          resolve(`Nginx Validation Failed: ${errorMessage}`);
        } else {
          resolve(null);
        }
      });
    });
  }
}
