import { Injectable } from '@nestjs/common';
import { LocationBlock } from '../nginx-parser.service';

@Injectable()
export class PolicyValidator {
  private readonly FORBIDDEN_DIRECTIVES = [
    'root',
    'alias',
    'rewrite',
    'include',
    'resolver',
  ];

  private readonly FORBIDDEN_PREFIXES = [
    'lua_',
    'content_by_lua',
    'access_by_lua',
    'more_', // openresty modules usually
  ];

  validate(locations: LocationBlock[]): string[] {
    const errors: string[] = [];

    for (const block of locations) {
      for (const directive of Object.keys(block.directives)) {
        if (this.FORBIDDEN_DIRECTIVES.includes(directive)) {
          errors.push(
            `Forbidden directive '${directive}' in location '${block.path}'`,
          );
        }

        if (
          this.FORBIDDEN_PREFIXES.some((prefix) => directive.startsWith(prefix))
        ) {
          errors.push(
            `Forbidden directive '${directive}' in location '${block.path}'`,
          );
        }
      }
    }

    return errors;
  }
}
