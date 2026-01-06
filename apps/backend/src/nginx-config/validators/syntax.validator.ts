import { Injectable } from '@nestjs/common';
import { NginxConfFile } from 'nginx-conf';

const ALLOWED_DIRECTIVES = new Set([
  'user',
  'worker_processes',
  'error_log',
  'pid',
  'worker_connections',
  'include',
  'mime.type',
  'default_type',
  'log_format',
  'access_log',
  'sendfile',
  'keepalive_timeout',
  'server',
  'listen',
  'server_name',
  'location',
  'root',
  'index',
  'proxy_pass',
  'proxy_set_header',
  'proxy_connect_timeout',
  'proxy_send_timeout',
  'proxy_read_timeout',
  'upstream',
  'ssl_certificate',
  'ssl_certificate_key',
  'ssl_protocols',
  'ssl_ciphers',
  'return',
  'rewrite',
  'try_files',
  'client_max_body_size',
  'gzip',
  'gzip_types',
  'proxy_redirect',
  'proxy_buffering',
  'proxy_cache',
  'proxy_cache_valid',
  'proxy_cache_use_stale',
  'proxy_http_version',
  'ssl_prefer_server_ciphers',
  'ssl_session_cache',
  'ssl_session_timeout',
  'add_header',
  'real_ip_header',
  'set_real_ip_from',
  'allow',
  'deny',
]);

@Injectable()
export class SyntaxValidator {
  async validate(configContent: string): Promise<string | null> {
    // Structural check for braces (nginx-conf is too lenient)
    const openBraces = (configContent.match(/{/g) || []).length;
    const closeBraces = (configContent.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      return `Syntax Error: Mismatched braces (opened: ${openBraces}, closed: ${closeBraces})`;
    }

    // Heuristic Check for Semicolons
    const lines = configContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Skip empty, comments, or brace-only lines
      if (!line || line.startsWith('#') || line === '}' || line === '{')
        continue;
      // Skip lines that start with location or upstream (block openers)
      if (line.startsWith('upstream') || line.startsWith('location')) {
        if (!line.endsWith('{')) {
          // Block definitions usually end with {
          // But strict checking here might be flaky if formatting is weird
          // Let's assume block headers are okay if they don't end in ;
          continue;
        }
        continue;
      }
      // If it ends with {, it's a block start
      if (line.endsWith('{')) continue;
      // If it ends with }, it's a block end (potentially)
      if (line.endsWith('}')) continue;

      if (!line.endsWith(';')) {
        return `Syntax Error: Missing semicolon at line ${i + 1}: "${line}"`;
      }

      // Check for valid directive
      const directive = line.split(/\s+/)[0];
      if (!ALLOWED_DIRECTIVES.has(directive)) {
        return `Syntax Error: Unknown directive "${directive}" at line ${i + 1}. Did you mean something else?`;
      }
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
