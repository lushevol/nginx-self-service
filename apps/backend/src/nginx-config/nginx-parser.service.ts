import { Injectable } from '@nestjs/common';

export interface LocationBlock {
  path: string;
  directives: Record<string, string>;
  raw: string;
}

export interface UpstreamBlock {
  name: string;
  servers: string[];
  raw: string;
}

@Injectable()
export class NginxParserService {
  parseLocations(content: string): LocationBlock[] {
    // Regex to match location blocks handling simple nested braces
    // Note: This is a simplified regex and might need a proper parser for complex nesting
    const locationRegex = /location\s+([^{]+)\s*{([^}]*)}/g;
    const blocks: LocationBlock[] = [];
    let match;

    while ((match = locationRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const path = match[1].trim();
      const body = match[2].trim();

      blocks.push({
        path,
        directives: this.parseDirectives(body),
        raw: fullMatch,
      });
    }
    return blocks;
  }

  parseUpstreams(content: string): UpstreamBlock[] {
    const upstreamRegex = /upstream\s+([^{]+)\s*{([^}]*)}/g;
    const blocks: UpstreamBlock[] = [];
    let match;

    while ((match = upstreamRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const name = match[1].trim();
      const body = match[2].trim();

      blocks.push({
        name,
        servers: this.parseServers(body),
        raw: fullMatch,
      });
    }
    return blocks;
  }

  private parseDirectives(body: string): Record<string, string> {
    const lines = body
      .split(';')
      .map((l) => l.trim())
      .filter((l) => l);
    const directives: Record<string, string> = {};
    for (const line of lines) {
      const [key, ...values] = line.split(/\s+/);
      if (key && values.length > 0) {
        directives[key] = values.join(' ');
      }
    }
    return directives;
  }

  private parseServers(body: string): string[] {
    const lines = body
      .split(';')
      .map((l) => l.trim())
      .filter((l) => l);
    const servers: string[] = [];
    for (const line of lines) {
      if (line.startsWith('server')) {
        servers.push(line.replace('server', '').trim());
      }
    }
    return servers;
  }

  generateLocationBlock(
    path: string,
    directives: Record<string, string>,
  ): string {
    const directiveLines = Object.entries(directives)
      .map(([key, value]) => `    ${key} ${value};`)
      .join('\n');
    return `location ${path} {\n${directiveLines}\n}`;
  }

  generateUpstreamBlock(name: string, servers: string[]): string {
    const serverLines = servers.map((s) => `    server ${s};`).join('\n');
    return `upstream ${name} {\n${serverLines}\n}`;
  }
}
