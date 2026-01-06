import { Injectable } from '@nestjs/common';
import { LocationBlock } from '../nginx-parser.service';

@Injectable()
export class ScopeValidator {
  validate(teamName: string, locations: LocationBlock[]): string[] {
    const errors: string[] = [];
    const allowedPrefixes = [`/api/${teamName}`, `/static/${teamName}`];

    for (const block of locations) {
      const isValid = allowedPrefixes.some(
        (prefix) =>
          block.path === prefix || block.path.startsWith(prefix + '/'),
      );

      if (!isValid) {
        errors.push(
          `Location '${block.path}' violates isolation. Must start with /api/${teamName} or /static/${teamName}`,
        );
      }
    }

    return errors;
  }
}
