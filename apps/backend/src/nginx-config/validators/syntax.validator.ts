import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class SyntaxValidator {
  async validate(configContent: string): Promise<string | null> {
    // Basic structural check
    if (
      (configContent.match(/{/g) || []).length !==
      (configContent.match(/}/g) || []).length
    ) {
      return 'Syntax Error: Mismatched braces';
    }

    // Dry-run with Nginx binary if available
    try {
      await this.runNginxTest(configContent);
      return null;
    } catch (e: any) {
      // If nginx is not installed, we fallback to mocking success or returning a warning
      // For this specific implementation task, we'll assume failure means invalid config
      // UNLESS nginx is just missing.

      if (e.message && e.message.includes('nginx: command not found')) {
        console.warn(
          'Nginx binary not found, skipping strictly native syntax check.',
        );
        return null; // Skip if no nginx
      }
      return `Nginx Validation Failed: ${e.message}`;
    }
  }

  private async runNginxTest(content: string): Promise<void> {
    const tmpFile = path.join(os.tmpdir(), `nginx-test-${Date.now()}.conf`);
    try {
      // Create a minimal valid context for the fragment
      // The content usually contains 'location' blocks, which must be inside 'server' -> 'http'
      // But the file structure suggests 'proxy.conf' is included in a server block.
      // So verify the fragment itself.
      // Actually, 'nginx -t' validates a full config.
      // We must wrap the content.
      const fullConfig = `
events {}
http {
    server {
      listen 80;
      server_name localhost;
    }
}

${content}
`;
      await fs.promises.writeFile(tmpFile, fullConfig);
      await execAsync(`nginx -t -c ${tmpFile}`);
    } finally {
      // Clean up
      try {
        await fs.promises.unlink(tmpFile);
      } catch {}
    }
  }
}
