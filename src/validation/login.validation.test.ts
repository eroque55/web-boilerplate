import { describe, expect, it } from 'vitest';

import { LoginSchema } from './login.validation';

describe('LoginSchema', () => {
  it('accepts valid credentials and normalizes email to lowercase', () => {
    const data = LoginSchema.parse({
      email: 'USER@EMAIL.COM',
      password: '123',
      requestRefresh: true,
    });

    expect(data.email).toBe('user@email.com');
    expect(data.requestRefresh).toBe(true);
  });

  it('returns localized error messages for invalid email and empty password', () => {
    const result = LoginSchema.safeParse({
      email: 'not-an-email',
      password: '',
      requestRefresh: false,
    });

    expect(result.success).toBe(false);

    const messages = result.error?.issues.map(issue => issue.message);
    expect(messages).toContain('E-mail inválido');
    expect(messages).toContain('Campo obrigatório');
  });
});
