import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it } from 'vitest';

import { handleError } from './handleError';

const buildAxiosError = (data: unknown) =>
  new AxiosError(
    'Request failed with status code 400',
    'ERR_BAD_REQUEST',
    undefined,
    undefined,
    {
      data,
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: new AxiosHeaders() },
    },
  );

describe('handleError', () => {
  it('returns plain strings directly', () => {
    expect(handleError('Sessão expirada')).toBe('Sessão expirada');
  });

  it('extracts { message } from Axios responses', () => {
    expect(
      handleError(buildAxiosError({ message: 'Credenciais inválidas' })),
    ).toBe('Credenciais inválidas');
  });

  it('extracts Strapi { error: { message } } from Axios responses', () => {
    expect(
      handleError(buildAxiosError({ error: { message: 'Usuário bloqueado' } })),
    ).toBe('Usuário bloqueado');
  });

  it('extracts first item from NestJS { message: string[] } validation responses', () => {
    expect(
      handleError(buildAxiosError({ message: ['E-mail já cadastrado'] })),
    ).toBe('E-mail já cadastrado');
  });

  it('falls back to the default message when Axios response has no message', () => {
    expect(handleError(buildAxiosError({}))).toBe(
      'Houve um imprevisto, tente novamente mais tarde',
    );
  });

  it('returns Error.message for standard Error instances', () => {
    expect(handleError(new Error('Sem conexão com a internet!'))).toBe(
      'Sem conexão com a internet!',
    );
  });
});
