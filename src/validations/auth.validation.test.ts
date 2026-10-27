import { describe, expect, it } from 'vitest';

import { LoginSchema } from './auth.validation';

describe('LoginSchema', () => {
  it('aceita credenciais válidas', () => {
    const result = LoginSchema.safeParse({
      email: 'voce@email.com',
      password: '123',
      rememberMe: false,
    });

    expect(result.success).toBe(true);
  });

  it('usa as mensagens em português do zod configurado', () => {
    const result = LoginSchema.safeParse({
      email: 'invalido',
      password: '',
      rememberMe: false,
    });

    expect(
      result.error?.issues.map(({ path, message }) => [path[0], message]),
    ).toEqual([
      ['email', 'E-mail inválido'],
      ['password', 'Campo obrigatório'],
    ]);
  });
});
