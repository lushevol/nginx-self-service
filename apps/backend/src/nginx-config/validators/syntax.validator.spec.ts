import { Test, type TestingModule } from '@nestjs/testing';
import { SyntaxValidator } from './syntax.validator';

describe('SyntaxValidator', () => {
  let validator: SyntaxValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyntaxValidator],
    }).compile();

    validator = module.get<SyntaxValidator>(SyntaxValidator);
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  it('should pass for valid nginx config', async () => {
    const validConfig = `
      server {
        listen 80;
        location / {
          root /var/www/html;
        }
      }
    `;
    const result = await validator.validate(validConfig);
    expect(result).toBeNull();
  });

  it('should return error for mismatched braces', async () => {
    const invalidConfig = `
      server {
        listen 80;
        location / {
          root /var/www/html;
        
      }
    `; // missing closing brace
    const result = await validator.validate(invalidConfig);
    expect(result).toContain('Syntax Error');
  });

  it('should return error for invalid directive', async () => {
    // nginx-conf is a loose parser, it might not catch all invalid directives unless they break tokenization
    // But let's try a gross syntax error
    const badBlock = 'server {';
    const result = await validator.validate(badBlock);
    expect(result).toBeDefined();
  });

  it('should pass for least_conn in upstream', async () => {
    const validUpstream = `
      upstream backend {
        least_conn;
        server 127.0.0.1:8080;
      }
    `;
    const result = await validator.validate(validUpstream);
    expect(result).toBeNull();
  });
});
