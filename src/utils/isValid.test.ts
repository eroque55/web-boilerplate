import { describe, expect, it } from 'vitest';

import {
  isValidCnpj,
  isValidCpf,
  isValidDate,
  isValidPhone,
  isValidTime,
} from './isValid';

describe('isValid', () => {
  it('valida CPF pelos dígitos verificadores', () => {
    expect(isValidCpf('529.982.247-25')).toBe(true);
    expect(isValidCpf('529.982.247-24')).toBe(false);
    expect(isValidCpf('111.111.111-11')).toBe(false);
    expect(isValidCpf('123')).toBe(false);
  });

  it('valida CNPJ numérico e alfanumérico', () => {
    expect(isValidCnpj('11.222.333/0001-81')).toBe(true);
    expect(isValidCnpj('11.222.333/0001-82')).toBe(false);
    expect(isValidCnpj('12.ABC.345/01DE-35')).toBe(true);
    expect(isValidCnpj('00.000.000/0000-00')).toBe(false);
  });

  it('valida telefone com DDD', () => {
    expect(isValidPhone('(11) 98765-4321')).toBe(true);
    expect(isValidPhone('(11) 3333-4444')).toBe(true);
    expect(isValidPhone('(11) 88765-4321')).toBe(false);
    expect(isValidPhone('(00) 98765-4321')).toBe(false);
  });

  it('valida data dd/MM/yyyy e hora HH:mm', () => {
    expect(isValidDate('27/10/2026')).toBe(true);
    expect(isValidDate('31/02/2026')).toBe(false);
    expect(isValidDate('2026-10-27')).toBe(false);
    expect(isValidTime('23:59')).toBe(true);
    expect(isValidTime('24:00')).toBe(false);
  });
});
